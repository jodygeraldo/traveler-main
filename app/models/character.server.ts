import invariant from 'tiny-invariant'
import { e, client } from '~/db.server'
import type { depromisify } from '~/utils'
import { Account } from './user.server'

export type CharacterInfer = depromisify<ReturnType<typeof getUserCharacter>>
export type CharactersInfer = depromisify<ReturnType<typeof getUserCharacters>>

export async function getUserCharacters({ accId }: { accId: string }) {
  const userCharacters = await e
    .select(e.UserCharacter, (userCharacter) => ({
      characters: {
        name: true,
        '@level': true,
        '@ascension': true,
        '@normal_attack': true,
        '@elemental_skill': true,
        '@elemental_burst': true,
      },
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
}: {
  name: string
  progression: {
    level: number
    asecension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }
  accId: string
}) {
  const itemToUpsert = e.select(e.Character, (c) => ({
    '@level': e.int16(progression.level),
    '@ascension': e.int16(progression.asecension),
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
