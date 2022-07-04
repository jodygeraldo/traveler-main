import invariant from 'tiny-invariant'
import * as DB from '~/db.server'
import type * as Utils from '~/utils'
import * as UserModel from './user.server'

export type CharacterInfer = Utils.depromisify<
  ReturnType<typeof getUserCharacter>
>
export type CharactersInfer = Utils.depromisify<
  ReturnType<typeof getUserCharacters>
>

export async function getUserCharacters({
  accId,
  isTraveler,
}: {
  accId: string
  isTraveler?: boolean
}) {
  const userCharacters = await DB.e
    .select(DB.e.UserCharacter, (userCharacter) => ({
      characters: (c) => ({
        name: true,
        '@level': true,
        '@ascension': true,
        '@normal_attack': true,
        '@elemental_skill': true,
        '@elemental_burst': true,
        filter: isTraveler ? DB.e.op(c.name, 'ilike', 'Traveler%') : undefined,
      }),
      filter: DB.e.op(userCharacter.owner, '=', UserModel.Account(accId)),
    }))
    .run(DB.client)

  return userCharacters?.characters
}

export async function getUserCharacter({
  name,
  accId,
}: {
  name: string
  accId: string
}) {
  const userCharacters = await DB.e
    .select(DB.e.UserCharacter, (userCharacter) => ({
      characters: (c) => ({
        name: true,
        '@level': true,
        '@ascension': true,
        '@normal_attack': true,
        '@elemental_skill': true,
        '@elemental_burst': true,
        filter: DB.e.op(c.name, '=', name),
      }),
      filter: DB.e.op(userCharacter.owner, '=', UserModel.Account(accId)),
    }))
    .run(DB.client)

  invariant(
    userCharacters,
    'there is no characters associated with this account'
  )
  return userCharacters.characters.length > 0
    ? userCharacters?.characters[0]
    : null
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

    const charactersToUpsert = DB.e.json(travelersToUpsert)

    await DB.e
      .update(DB.e.UserCharacter, (userCharacter) => ({
        filter: DB.e.op(userCharacter.owner, '=', UserModel.Account(accId)),
        set: {
          characters: {
            '+=': DB.e.op(
              'distinct',
              DB.e.for(
                DB.e.json_array_unpack(charactersToUpsert),
                (character) =>
                  DB.e.select(DB.e.Character, (c) => ({
                    filter: DB.e.op(
                      c.name,
                      '=',
                      DB.e.cast(DB.e.str, character.name)
                    ),
                    '@level': DB.e.cast(DB.e.int16, character.level),
                    '@ascension': DB.e.cast(DB.e.int16, character.ascension),
                    '@normal_attack': DB.e.cast(
                      DB.e.int16,
                      character.normal_attack
                    ),
                    '@elemental_skill': DB.e.cast(
                      DB.e.int16,
                      character.elemental_skill
                    ),
                    '@elemental_burst': DB.e.cast(
                      DB.e.int16,
                      character.elemental_burst
                    ),
                  }))
              )
            ),
          },
        },
      }))
      .run(DB.client)

    return
  }

  const itemToUpsert = DB.e.select(DB.e.Character, (c) => ({
    '@level': DB.e.int16(progression.level),
    '@ascension': DB.e.int16(progression.ascension),
    '@normal_attack': DB.e.int16(progression.normalAttack),
    '@elemental_skill': DB.e.int16(progression.elementalSkill),
    '@elemental_burst': DB.e.int16(progression.elementalBurst),
    filter: DB.e.op(c.name, '=', name),
  }))

  await DB.e
    .update(DB.e.UserCharacter, (userCharacter) => ({
      filter: DB.e.op(userCharacter.owner, '=', UserModel.Account(accId)),
      set: {
        characters: { '+=': itemToUpsert },
      },
    }))
    .run(DB.client)
}
