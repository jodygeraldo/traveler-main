import invariant from 'tiny-invariant'
import e, * as DB from '~/db.server'
import type * as Utils from '~/utils'
import * as UserModel from './user.server'

export type CharacterInfer = Utils.depromisify<
  ReturnType<typeof getUserCharacter>
>
export type CharactersInfer = Utils.depromisify<
  ReturnType<typeof getUserCharacters>
>

const client = DB.client

export async function getUserCharacters({
  accId,
  isTraveler,
}: {
  accId: string
  isTraveler?: boolean
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
      filter: e.op(userCharacter.owner, '=', UserModel.getAccountById(accId)),
    }))
    .run(client)

  return userCharacters?.characters
}

export async function getUserCharacter({
  name,
  accId,
}: {
  name: string
  accId: string
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
        filter: e.op(c.name, '=', name),
      }),
      filter: e.op(userCharacter.owner, '=', UserModel.getAccountById(accId)),
    }))
    .run(client)

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

    const charactersToUpsert = e.json(travelersToUpsert)

    await e
      .update(e.UserCharacter, (userCharacter) => ({
        filter: e.op(userCharacter.owner, '=', UserModel.getAccountById(accId)),
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
                  '@elemental_skill': e.cast(
                    e.int16,
                    character.elemental_skill
                  ),
                  '@elemental_burst': e.cast(
                    e.int16,
                    character.elemental_burst
                  ),
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
      filter: e.op(userCharacter.owner, '=', UserModel.getAccountById(accId)),
      set: {
        characters: { '+=': itemToUpsert },
      },
    }))
    .run(client)
}

export interface AscensionItem {
  name: string
  quantity: number
  type: 'common' | 'ascension_gem' | 'local_specialty' | 'ascension_boss'
}
export interface TalentItem {
  name: string
  quantity: number
  type: 'common' | 'talent_book' | 'talent_boss' | 'special'
}

export async function upsertTravelerInventoryLevelUp({
  kind,
  name,
  level,
  characterLevel,
  accId,
  data,
}: {
  kind:
    | 'Ascension'
    | 'Talent Normal Attack'
    | 'Talent Elemental Skill'
    | 'Talent Elemental Burst'
  name: string
  level: number
  characterLevel: number
  accId: string
  data:
    | {
        ascension: true
        items: AscensionItem[]
      }
    | {
        ascension: false
        items: TalentItem[]
      }
}) {
  if (kind === 'Ascension' && data.ascension) {
    let otherTraveler1 = 'Traveler Anemo'
    let otherTraveler2 = 'Traveler Geo'
    if (name.includes('Anemo')) otherTraveler1 = 'Traveler Electro'
    if (name.includes('Geo')) otherTraveler2 = 'Traveler Anemo'

    await client.transaction(async (tx) => {
      await tx.query(
        `
      UPDATE UserCharacter 
      FILTER .owner.id = <uuid>$accId
      SET {
        characters += (
          SELECT Character {
            @level := <int64>$characterLevel,
            @ascension := <int64>$level,
          }
          FILTER .name = <str>$name
        ),
      }
      `,
        { name, characterLevel, level, accId }
      )

      await tx.query(
        `
      UPDATE UserCharacter 
      FILTER .owner.id = <uuid>$accId
      SET {
        characters += (
          SELECT Character {
            @level := <int64>$characterLevel,
            @ascension := <int64>$level,
          }
          FILTER .name = <str>$otherTraveler1
        ),
      }
      `,
        { otherTraveler1, characterLevel, level, accId }
      )

      await tx.query(
        `
      UPDATE UserCharacter 
      FILTER .owner.id = <uuid>$accId
      SET {
        characters += (
          SELECT Character {
            @level := <int64>$characterLevel,
            @ascension := <int64>$level,
          }
          FILTER .name = <str>$otherTraveler2
        ),
      }
      `,
        { otherTraveler2, characterLevel, level, accId }
      )

      const { name: commonName, quantity: commonQuantity } = data.items[0]
      const { name: gemName, quantity: gemQuantity } = data.items[1]
      const { name: localName, quantity: localQuantity } = data.items[2]
      let bossData = {
        bossName: '',
        bossQuantity: 0,
      }
      if (data.items.length > 3) {
        bossData.bossName = data.items[3].name
        bossData.bossQuantity = data.items[3].quantity
      }
      const { bossName, bossQuantity } = bossData

      await tx.query(
        `
      WITH commonPrevValue := (SELECT assert_single((SELECT Inventory.common@quantity 
          FILTER Inventory.common.name = <str>$commonName
        ))),
          gemPrevValue := (SELECT assert_single((SELECT Inventory.ascension_gem@quantity 
          FILTER Inventory.ascension_gem.name = <str>$gemName
        ))),
          localPrevValue := (SELECT assert_single((SELECT Inventory.local_specialty@quantity 
          FILTER Inventory.local_specialty.name = <str>$localName
        ))),
          bossPrevValue := (SELECT assert_single((SELECT Inventory.ascension_boss@quantity 
          FILTER Inventory.ascension_boss.name = <str>$bossName
        ))),
      UPDATE Inventory
      FILTER .owner.id = <uuid>$accId
      SET {
        common += (
          SELECT CommonMaterial {
            @quantity := commonPrevValue - <int64>$commonQuantity,
          }
          FILTER .name = <str>$commonName
        ),
        ascension_gem += (
          SELECT AscensionGem {
            @quantity := gemPrevValue - <int64>$gemQuantity,
          }
          FILTER .name = <str>$gemName
        ),
        local_specialty += (
          SELECT LocalSpecialty {
            @quantity := localPrevValue - <int64>$localQuantity,
          }
          FILTER .name = <str>$localName
        ),
        ascension_boss += (
          SELECT AscensionBossMaterial {
            @quantity := bossPrevValue - <int64>$bossQuantity,
          }
          FILTER .name = <str>$bossName
        )
      }
      `,
        {
          commonName,
          commonQuantity,
          gemName,
          gemQuantity,
          localName,
          localQuantity,
          bossName,
          bossQuantity,
          accId,
        }
      )
    })
  }

  if (kind !== 'Ascension' && !data.ascension) {
    await client.transaction(async (tx) => {
      if (kind === 'Talent Normal Attack') {
        await tx.query(
          `
        UPDATE UserCharacter 
        FILTER .owner.id = <uuid>$accId
        SET {
          characters += (
            SELECT Character {
              @normal_attack := <int64>$level,
            }
            FILTER .name = <str>$name
          ),
        }
        `,
          { name, level, accId }
        )
      }

      if (kind === 'Talent Elemental Skill') {
        await tx.query(
          `
        UPDATE UserCharacter 
        FILTER .owner.id = <uuid>$accId
        SET {
          characters += (
            SELECT Character {
              @elemental_skill := <int64>$level,
            }
            FILTER .name = <str>$name
          ),
        }
        `,
          { name, level, accId }
        )
      }

      if (kind === 'Talent Elemental Burst') {
        await tx.query(
          `
        UPDATE UserCharacter 
        FILTER .owner.id = <uuid>$accId
        SET {
          characters += (
            SELECT Character {
              @elemental_burst := <int64>$level,
            }
            FILTER .name = <str>$name
          ),
        }
        `,
          { name, level, accId }
        )
      }

      const { name: commonName, quantity: commonQuantity } = data.items[0]
      const { name: bookName, quantity: bookQuantity } = data.items[1]
      let bossData = {
        bossName: '',
        bossQuantity: 0,
      }
      if (data.items.length > 2) {
        bossData.bossName = data.items[2].name
        bossData.bossQuantity = data.items[2].quantity
      }
      const { bossName, bossQuantity } = bossData
      let specialData = {
        specialName: '',
        specialQuantity: 0,
      }
      if (data.items.length > 3) {
        specialData.specialName = data.items[3].name
        specialData.specialQuantity = data.items[3].quantity
      }
      const { specialName, specialQuantity } = specialData

      await tx.query(
        `
      WITH commonPrevValue := (SELECT assert_single((SELECT Inventory.common@quantity 
          FILTER Inventory.common.name = <str>$commonName
        ))),
          bookPrevValue := (SELECT assert_single((SELECT Inventory.talent_book@quantity 
          FILTER Inventory.talent_book.name = <str>$bookName
        ))),
          bossPrevValue := (SELECT assert_single((SELECT Inventory.talent_boss@quantity 
          FILTER Inventory.talent_boss.name = <str>$bossName
        ))),
          specialPrevValue := (SELECT assert_single((SELECT Inventory.special@quantity 
          FILTER Inventory.special.name = <str>$specialName
        ))),
      UPDATE Inventory
      FILTER .owner.id = <uuid>$accId
      SET {
        common += (
          SELECT CommonMaterial {
            @quantity := commonPrevValue - <int64>$commonQuantity,
          }
          FILTER .name = <str>$commonName
        ),
        talent_book += (
          SELECT TalentBook {
            @quantity := bookPrevValue - <int64>$bookQuantity,
          }
          FILTER .name = <str>$bookName
        ),
        talent_boss += (
          SELECT TalentBossMaterial {
            @quantity := bossPrevValue - <int64>$bossQuantity,
          }
          FILTER .name = <str>$bossName
        ),
        special += (
          SELECT SpecialItem {
            @quantity := specialPrevValue - <int64>$specialQuantity,
          }
          FILTER .name = <str>$specialName
        )
      }
      `,
        {
          commonName,
          commonQuantity,
          bookName,
          bookQuantity,
          bossName,
          bossQuantity,
          specialName,
          specialQuantity,
          accId,
        }
      )
    })
  }
}
