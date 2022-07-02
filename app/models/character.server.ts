import invariant from 'tiny-invariant'
import { client, e } from '~/db.server'
import type { depromisify } from '~/utils'
import { Account } from './user.server'

export type CharacterInfer = depromisify<ReturnType<typeof getUserCharacter>>
export type CharactersInfer = depromisify<ReturnType<typeof getUserCharacters>>

export async function getUserCharacters({
  accId,
  isTraveler,
}: {
  accId: string
  isTraveler: boolean
}) {
  const userCharacters = await e
    .select(e.UserCharacter, (userCharacter) => ({
      characters: (c) => ({
        name: true,
        '@level': true,
        '@ascension': true,
        '@normal_attack': true,
        '@elemental_skill': true,
        '@elemental_burst': true,
        filter: isTraveler ? e.op(c.name, 'ilike', 'Traveler%') : undefined,
      }),
      filter: e.op(userCharacter.owner, '=', Account(accId)),
    }))
    .run(client)

  return userCharacters?.characters
}

export async function getUserCharacter({ name, accId }: { name: string; accId: string }) {
  const userCharacters = await e
    .select(e.UserCharacter, (userCharacter) => ({
      characters: (c) => ({
        name: true,
        '@level': true,
        '@ascension': true,
        '@normal_attack': true,
        '@elemental_skill': true,
        '@elemental_burst': true,
        filter: e.op(c.name, '=', name),
      }),
      filter: e.op(userCharacter.owner, '=', Account(accId)),
    }))
    .run(client)

  invariant(userCharacters, 'there is no characters associated with this account')
  return userCharacters.characters.length > 0 ? userCharacters?.characters[0] : null
}

export async function upsertCharacter({
  name,
  progression,
  accId,
  otherTravelers,
}: {
  name: string
  progression: {
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }
  accId: string
  otherTravelers?: {
    name: string
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }[]
}) {
  if (otherTravelers) {
    const travelerToUpsert = [
      {
        name,
        level: progression.level,
        ascension: progression.ascension,
        normal_attack: progression.normalAttack,
        elemental_skill: progression.elementalSkill,
        elemental_burst: progression.elementalBurst,
      },
    ]

    const travelersToUpsert = otherTravelers
      .map((traveler) => ({
        name: traveler.name,
        level: progression.level,
        ascension: progression.ascension,
        normal_attack: traveler.normalAttack,
        elemental_skill: traveler.elementalSkill,
        elemental_burst: traveler.elementalBurst,
      }))
      .concat(travelerToUpsert)

    const charactersToUpsert = e.json(travelersToUpsert)

    await e
      .update(e.UserCharacter, (userCharacter) => ({
        filter: e.op(userCharacter.owner, '=', Account(accId)),
        set: {
          characters: {
            '+=': e.op(
              'distinct',
              e.for(e.json_array_unpack(charactersToUpsert), (character) =>
                e.select(e.Character, (c) => ({
                  filter: e.op(c.name, '=', e.cast(e.str, character.name)),
                  '@level': e.cast(e.int16, character.level),
                  '@ascension': e.cast(e.int16, character.ascension),
                  '@normal_attack': e.cast(e.int16, character.normal_attack),
                  '@elemental_skill': e.cast(e.int16, character.elemental_skill),
                  '@elemental_burst': e.cast(e.int16, character.elemental_burst),
                }))
              )
            ),
          },
        },
      }))
      .run(client)

    return
  }

  const itemToUpsert = e.select(e.Character, (c) => ({
    '@level': e.int16(progression.level),
    '@ascension': e.int16(progression.ascension),
    '@normal_attack': e.int16(progression.normalAttack),
    '@elemental_skill': e.int16(progression.elementalSkill),
    '@elemental_burst': e.int16(progression.elementalBurst),
    filter: e.op(c.name, '=', name),
  }))

  await e
    .update(e.UserCharacter, (userCharacter) => ({
      filter: e.op(userCharacter.owner, '=', Account(accId)),
      set: {
        characters: { '+=': itemToUpsert },
      },
    }))
    .run(client)
}
