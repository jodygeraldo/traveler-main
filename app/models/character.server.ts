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

export async function updateUserCharacters(
  data: {
    characterName: string
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
    ownerId: string
  }[]
) {
  await prisma.$transaction(async (tx) => {
    await tx.userCharacter.deleteMany({
      where: { ownerId: data[0].ownerId },
    })

    await tx.userCharacter.createMany({
      data,
    })
  })
}

export async function updateCharacterByInventory({
  name,
  kind,
  level,
  materials,
  accountId,
}: {
  name: string
  level?: number
  accountId: string
  materials: {
    name: string
    quantity: number
    rarity: number
    type:
      | 'COMMON'
      | 'ASCENSION_GEM'
      | 'ASCENSION_BOSS'
      | 'LOCAL_SPECIALTY'
      | 'TALENT_BOOK'
      | 'TALENT_BOSS'
      | 'SPECIAL'
  }[]
  kind:
    | 'Ascension'
    | 'Talent Normal Attack'
    | 'Talent Elemental Skill'
    | 'Talent Elemental Burst'
}) {
  await prisma.$transaction(async (tx) => {
    if (kind === 'Ascension') {
      await tx.userCharacter.updateMany({
        where: {
          ownerId: accountId,
          characterName: {
            contains: name.includes('Traveler') ? 'Traveler' : name,
          },
        },
        data: {
          level,
          ascension: { increment: 1 },
        },
      })
    }

    if (kind !== 'Ascension') {
      const toUpdate: Record<
        typeof kind,
        'normalAttack' | 'elementalSkill' | 'elementalBurst'
      > = {
        'Talent Normal Attack': 'normalAttack',
        'Talent Elemental Skill': 'elementalSkill',
        'Talent Elemental Burst': 'elementalBurst',
      }
      // by design this should only find one character
      await tx.userCharacter.updateMany({
        where: {
          ownerId: accountId,
          characterName: name,
        },
        data: {
          [toUpdate[kind]]: { increment: 1 },
        },
      })
    }

    await tx.inventory.updateMany({
      where: {
        ownerId: accountId,
        itemName: materials[0].name,
      },
      data: {
        quantity: {
          decrement: materials[0].quantity,
        },
      },
    })

    await tx.inventory.updateMany({
      where: {
        ownerId: accountId,
        itemName: materials[1].name,
      },
      data: {
        quantity: {
          decrement: materials[1].quantity,
        },
      },
    })

    if (materials.length > 2) {
      await tx.inventory.updateMany({
        where: {
          ownerId: accountId,
          itemName: materials[2].name,
        },
        data: {
          quantity: {
            decrement: materials[2].quantity,
          },
        },
      })
    }

    if (materials.length > 3) {
      await tx.inventory.updateMany({
        where: {
          ownerId: accountId,
          itemName: materials[3].name,
        },
        data: {
          quantity: {
            decrement: materials[3].quantity,
          },
        },
      })
    }
  })
}
