// import invariant from 'tiny-invariant'
import prisma from '~/db.server'
// import type * as Utils from '~/utils'
// import * as UserModel from './user.server'

export async function getUserCharacters({ accountId }: { accountId: string }) {
  return prisma.userCharacter.findMany({
    where: {
      ownerId: accountId,
    },
    select: {
      characterName: true,
      level: true,
      ascension: true,
      normalAttack: true,
      elementalSkill: true,
      elementalBurst: true,
    },
  })
}

export async function getUserCharacter({
  name,
  accountId,
}: {
  name: string
  accountId: string
}) {
  return prisma.userCharacter.findFirst({
    where: {
      ownerId: accountId,
      characterName: name,
    },
    select: {
      level: true,
      ascension: true,
      normalAttack: true,
      elementalSkill: true,
      elementalBurst: true,
    },
  })
}

export async function upsertCharacter({
  name,
  progression,
  accountId,
}: {
  name: string
  progression: {
    level: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  }
  accountId: string
}) {
  const defaultProgression = {
    ascension: 0,
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  }

  if (name.includes('Traveler')) {
    return await prisma.$transaction(async (tx) => {
      const characters = await tx.userCharacter.findMany({
        where: {
          ownerId: accountId,
          characterName: {
            contains: 'Traveler',
          },
        },
      })

      let names = ['Traveler Geo', 'Traveler Electro']
      if (name.includes('Geo')) names[0] = 'Traveler Anemo'
      if (name.includes('Electro')) names[1] = 'Traveler Geo'

      if (characters.length === 0) {
        await tx.userCharacter.createMany({
          data: [
            {
              ownerId: accountId,
              characterName: name,
              ...defaultProgression,
              ...progression,
            },
            {
              ownerId: accountId,
              characterName: names[0],
              ...progression,
              ...defaultProgression,
            },
            {
              ownerId: accountId,
              characterName: names[1],
              ...progression,
              ...defaultProgression,
            },
          ],
        })
      } else {
        await tx.userCharacter.update({
          where: { id: characters.find((c) => c.characterName === name)!.id },
          data: { ...progression },
        })

        await tx.userCharacter.updateMany({
          where: {
            ownerId: accountId,
            characterName: {
              contains: 'Traveler',
            },
          },
          data: {
            level: progression.level,
            ascension: progression.ascension,
          },
        })
      }
    })
  }

  await prisma.$transaction(async (tx) => {
    const character = await tx.userCharacter.findFirst({
      where: {
        ownerId: accountId,
        characterName: name,
      },
    })

    if (character) {
      await tx.userCharacter.update({
        where: { id: character.id },
        data: { ...progression },
      })
    } else {
      await tx.userCharacter.create({
        data: {
          ownerId: accountId,
          characterName: name,
          ...defaultProgression,
          ...progression,
        },
      })
    }
  })
}

// export interface AscensionItem {
//   name: string
//   quantity: number
//   type: 'common' | 'ascension_gem' | 'local_specialty' | 'ascension_boss'
// }
// export interface TalentItem {
//   name: string
//   quantity: number
//   type: 'common' | 'talent_book' | 'talent_boss' | 'special'
// }

// export async function upsertTravelerInventoryLevelUp({
//   kind,
//   name,
//   level,
//   characterLevel,
//   accId,
//   data,
// }: {
//   kind:
//     | 'Ascension'
//     | 'Talent Normal Attack'
//     | 'Talent Elemental Skill'
//     | 'Talent Elemental Burst'
//   name: string
//   level: number
//   characterLevel: number
//   accId: string
//   data:
//     | {
//         ascension: true
//         items: AscensionItem[]
//       }
//     | {
//         ascension: false
//         items: TalentItem[]
//       }
// }) {
//   if (kind === 'Ascension' && data.ascension) {
//     let otherTraveler1 = 'Traveler Anemo'
//     let otherTraveler2 = 'Traveler Geo'
//     if (name.includes('Anemo')) otherTraveler1 = 'Traveler Electro'
//     if (name.includes('Geo')) otherTraveler2 = 'Traveler Anemo'

//     await client.transaction(async (tx) => {
//       await tx.query(
//         `
//       UPDATE UserCharacter
//       FILTER .owner.id = <uuid>$accId
//       SET {
//         characters += (
//           SELECT Character {
//             @level := <int64>$characterLevel,
//             @ascension := <int64>$level,
//           }
//           FILTER .name = <str>$name
//         ),
//       }
//       `,
//         { name, characterLevel, level, accId }
//       )

//       await tx.query(
//         `
//       UPDATE UserCharacter
//       FILTER .owner.id = <uuid>$accId
//       SET {
//         characters += (
//           SELECT Character {
//             @level := <int64>$characterLevel,
//             @ascension := <int64>$level,
//           }
//           FILTER .name = <str>$otherTraveler1
//         ),
//       }
//       `,
//         { otherTraveler1, characterLevel, level, accId }
//       )

//       await tx.query(
//         `
//       UPDATE UserCharacter
//       FILTER .owner.id = <uuid>$accId
//       SET {
//         characters += (
//           SELECT Character {
//             @level := <int64>$characterLevel,
//             @ascension := <int64>$level,
//           }
//           FILTER .name = <str>$otherTraveler2
//         ),
//       }
//       `,
//         { otherTraveler2, characterLevel, level, accId }
//       )

//       const { name: commonName, quantity: commonQuantity } = data.items[0]
//       const { name: gemName, quantity: gemQuantity } = data.items[1]
//       const { name: localName, quantity: localQuantity } = data.items[2]
//       let bossData = {
//         bossName: '',
//         bossQuantity: 0,
//       }
//       if (data.items.length > 3) {
//         bossData.bossName = data.items[3].name
//         bossData.bossQuantity = data.items[3].quantity
//       }
//       const { bossName, bossQuantity } = bossData

//       await tx.query(
//         `
//       WITH commonPrevValue := (SELECT assert_single((SELECT Inventory.common@quantity
//           FILTER Inventory.common.name = <str>$commonName
//         ))),
//           gemPrevValue := (SELECT assert_single((SELECT Inventory.ascension_gem@quantity
//           FILTER Inventory.ascension_gem.name = <str>$gemName
//         ))),
//           localPrevValue := (SELECT assert_single((SELECT Inventory.local_specialty@quantity
//           FILTER Inventory.local_specialty.name = <str>$localName
//         ))),
//           bossPrevValue := (SELECT assert_single((SELECT Inventory.ascension_boss@quantity
//           FILTER Inventory.ascension_boss.name = <str>$bossName
//         ))),
//       UPDATE Inventory
//       FILTER .owner.id = <uuid>$accId
//       SET {
//         common += (
//           SELECT CommonMaterial {
//             @quantity := commonPrevValue - <int64>$commonQuantity,
//           }
//           FILTER .name = <str>$commonName
//         ),
//         ascension_gem += (
//           SELECT AscensionGem {
//             @quantity := gemPrevValue - <int64>$gemQuantity,
//           }
//           FILTER .name = <str>$gemName
//         ),
//         local_specialty += (
//           SELECT LocalSpecialty {
//             @quantity := localPrevValue - <int64>$localQuantity,
//           }
//           FILTER .name = <str>$localName
//         ),
//         ascension_boss += (
//           SELECT AscensionBossMaterial {
//             @quantity := bossPrevValue - <int64>$bossQuantity,
//           }
//           FILTER .name = <str>$bossName
//         )
//       }
//       `,
//         {
//           commonName,
//           commonQuantity,
//           gemName,
//           gemQuantity,
//           localName,
//           localQuantity,
//           bossName,
//           bossQuantity,
//           accId,
//         }
//       )
//     })
//   }

//   if (kind !== 'Ascension' && !data.ascension) {
//     await client.transaction(async (tx) => {
//       if (kind === 'Talent Normal Attack') {
//         await tx.query(
//           `
//         UPDATE UserCharacter
//         FILTER .owner.id = <uuid>$accId
//         SET {
//           characters += (
//             SELECT Character {
//               @normal_attack := <int64>$level,
//             }
//             FILTER .name = <str>$name
//           ),
//         }
//         `,
//           { name, level, accId }
//         )
//       }

//       if (kind === 'Talent Elemental Skill') {
//         await tx.query(
//           `
//         UPDATE UserCharacter
//         FILTER .owner.id = <uuid>$accId
//         SET {
//           characters += (
//             SELECT Character {
//               @elemental_skill := <int64>$level,
//             }
//             FILTER .name = <str>$name
//           ),
//         }
//         `,
//           { name, level, accId }
//         )
//       }

//       if (kind === 'Talent Elemental Burst') {
//         await tx.query(
//           `
//         UPDATE UserCharacter
//         FILTER .owner.id = <uuid>$accId
//         SET {
//           characters += (
//             SELECT Character {
//               @elemental_burst := <int64>$level,
//             }
//             FILTER .name = <str>$name
//           ),
//         }
//         `,
//           { name, level, accId }
//         )
//       }

//       const { name: commonName, quantity: commonQuantity } = data.items[0]
//       const { name: bookName, quantity: bookQuantity } = data.items[1]
//       let bossData = {
//         bossName: '',
//         bossQuantity: 0,
//       }
//       if (data.items.length > 2) {
//         bossData.bossName = data.items[2].name
//         bossData.bossQuantity = data.items[2].quantity
//       }
//       const { bossName, bossQuantity } = bossData
//       let specialData = {
//         specialName: '',
//         specialQuantity: 0,
//       }
//       if (data.items.length > 3) {
//         specialData.specialName = data.items[3].name
//         specialData.specialQuantity = data.items[3].quantity
//       }
//       const { specialName, specialQuantity } = specialData

//       await tx.query(
//         `
//       WITH commonPrevValue := (SELECT assert_single((SELECT Inventory.common@quantity
//           FILTER Inventory.common.name = <str>$commonName
//         ))),
//           bookPrevValue := (SELECT assert_single((SELECT Inventory.talent_book@quantity
//           FILTER Inventory.talent_book.name = <str>$bookName
//         ))),
//           bossPrevValue := (SELECT assert_single((SELECT Inventory.talent_boss@quantity
//           FILTER Inventory.talent_boss.name = <str>$bossName
//         ))),
//           specialPrevValue := (SELECT assert_single((SELECT Inventory.special@quantity
//           FILTER Inventory.special.name = <str>$specialName
//         ))),
//       UPDATE Inventory
//       FILTER .owner.id = <uuid>$accId
//       SET {
//         common += (
//           SELECT CommonMaterial {
//             @quantity := commonPrevValue - <int64>$commonQuantity,
//           }
//           FILTER .name = <str>$commonName
//         ),
//         talent_book += (
//           SELECT TalentBook {
//             @quantity := bookPrevValue - <int64>$bookQuantity,
//           }
//           FILTER .name = <str>$bookName
//         ),
//         talent_boss += (
//           SELECT TalentBossMaterial {
//             @quantity := bossPrevValue - <int64>$bossQuantity,
//           }
//           FILTER .name = <str>$bossName
//         ),
//         special += (
//           SELECT SpecialItem {
//             @quantity := specialPrevValue - <int64>$specialQuantity,
//           }
//           FILTER .name = <str>$specialName
//         )
//       }
//       `,
//         {
//           commonName,
//           commonQuantity,
//           bookName,
//           bookQuantity,
//           bossName,
//           bossQuantity,
//           specialName,
//           specialQuantity,
//           accId,
//         }
//       )
//     })
//   }
// }
