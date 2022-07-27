import prisma from '~/db.server'
import type * as CharacterType from '~/types/character'

const DEFAULT_PROGRESSION = {
  level: 1,
  ascension: 0,
  normalAttack: 1,
  elementalSkill: 1,
  elementalBurst: 1,
}

export async function getUserCharacters({ accountId }: { accountId: string }) {
  return prisma.userCharacter.findMany({
    where: {
      ownerId: accountId,
    },
    select: {
      name: true,
      level: true,
      ascension: true,
      normalAttack: true,
      elementalSkill: true,
      elementalBurst: true,
    },
  })
}

export async function getUserTrackableCharactersName(accountId: string) {
  const maxCharactersName = (
    await prisma.userCharacter.findMany({
      where: {
        ownerId: accountId,
        level: { equals: 90 },
        ascension: { equals: 6 },
        normalAttack: { equals: 10 },
        elementalSkill: { equals: 10 },
        elementalBurst: { equals: 10 },
      },
      select: { name: true },
    })
  ).map((character) => character.name)

  const charactersName = (
    await prisma.characterTrack.findMany({
      where: { ownerId: accountId },
      select: { name: true },
    })
  ).map((character) => character.name)

  return Array.from(new Set([...maxCharactersName, ...charactersName]))
}

export async function getUserCharacter({
  name,
  accountId,
}: {
  name: CharacterType.Name
  accountId: string
}) {
  return prisma.userCharacter.findUnique({
    where: {
      name_ownerId: {
        name,
        ownerId: accountId,
      },
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

export async function getUserTrackCharacters(accountId: string) {
  return prisma.characterTrack.findMany({
    where: { ownerId: accountId },
    select: {
      id: true,
      name: true,
      priority: true,
      targetLevel: true,
      targetAscension: true,
      targetNormalAttack: true,
      targetElementalSkill: true,
      targetElementalBurst: true,
      userCharacter: {
        select: {
          level: true,
          ascension: true,
          normalAttack: true,
          elementalSkill: true,
          elementalBurst: true,
        },
      },
    },
    orderBy: [{ priority: { sort: 'asc', nulls: 'last' } }, { name: 'asc' }],
  })
}

export async function getUserTrackCharacter({
  name,
  accountId,
}: {
  name: string
  accountId: string
}) {
  return prisma.characterTrack.findUnique({
    where: { name_ownerId: { name, ownerId: accountId } },
    select: {
      targetLevel: true,
      targetAscension: true,
      targetNormalAttack: true,
      targetElementalSkill: true,
      targetElementalBurst: true,
      userCharacter: {
        select: {
          level: true,
          ascension: true,
          normalAttack: true,
          elementalSkill: true,
          elementalBurst: true,
        },
      },
    },
  })
}

export async function upsertCharacter({
  name,
  progression,
  accountId,
}: {
  name: CharacterType.Name
  progression: {
    level: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  }
  accountId: string
}) {
  if (name.includes('Traveler')) {
    const characters = await prisma.userCharacter.findMany({
      where: {
        ownerId: accountId,
        name: {
          contains: 'Traveler',
        },
      },
    })

    let names = ['Traveler Geo', 'Traveler Electro']
    if (name.includes('Geo')) names[0] = 'Traveler Anemo'
    if (name.includes('Electro')) names[1] = 'Traveler Geo'

    if (characters.length === 0) {
      await prisma.userCharacter.createMany({
        data: [
          {
            ownerId: accountId,
            name,
            ...DEFAULT_PROGRESSION,
            ...progression,
          },
          {
            ownerId: accountId,
            name: names[0],
            ...progression,
            ...DEFAULT_PROGRESSION,
          },
          {
            ownerId: accountId,
            name: names[1],
            ...progression,
            ...DEFAULT_PROGRESSION,
          },
        ],
      })
    } else {
      await prisma.$transaction([
        prisma.userCharacter.update({
          where: { id: characters.find((c) => c.name === name)!.id },
          data: { ...progression },
        }),
        prisma.userCharacter.updateMany({
          where: {
            ownerId: accountId,
            name: {
              contains: 'Traveler',
            },
          },
          data: {
            level: progression.level,
            ascension: progression.ascension,
          },
        }),
      ])
    }

    return
  }

  const character = await prisma.userCharacter.findFirst({
    where: {
      ownerId: accountId,
      name,
    },
  })

  await prisma.userCharacter.upsert({
    where: { id: character?.id ?? '' },
    create: {
      ownerId: accountId,
      name,
      ...DEFAULT_PROGRESSION,
      ...progression,
    },
    update: {
      ...progression,
    },
  })
}

export async function updateCharacterByInventory({
  name,
  kind,
  level,
  materials,
  accountId,
}: {
  name: CharacterType.Name
  level?: number
  accountId: string
  materials: {
    name: string
    quantity: number
    rarity: number
  }[]
  kind:
    | 'Ascension'
    | 'Talent Normal Attack'
    | 'Talent Elemental Skill'
    | 'Talent Elemental Burst'
}) {
  if (kind === 'Ascension') {
    await prisma.userCharacter.updateMany({
      where: {
        ownerId: accountId,
        name: {
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
    await prisma.userCharacter.updateMany({
      where: {
        ownerId: accountId,
        name,
      },
      data: {
        [toUpdate[kind]]: { increment: 1 },
      },
    })
  }

  const ItemsToUpdate = [
    prisma.inventory.updateMany({
      where: {
        ownerId: accountId,
        name: materials[0].name,
      },
      data: {
        quantity: {
          decrement: materials[0].quantity,
        },
      },
    }),
    prisma.inventory.updateMany({
      where: {
        ownerId: accountId,
        name: materials[1].name,
      },
      data: {
        quantity: {
          decrement: materials[1].quantity,
        },
      },
    }),
  ]

  if (materials.length > 2) {
    ItemsToUpdate.push(
      prisma.inventory.updateMany({
        where: {
          ownerId: accountId,
          name: materials[2].name,
        },
        data: {
          quantity: {
            decrement: materials[2].quantity,
          },
        },
      })
    )
  }

  if (materials.length > 3) {
    ItemsToUpdate.push(
      prisma.inventory.updateMany({
        where: {
          ownerId: accountId,
          name: materials[3].name,
        },
        data: {
          quantity: {
            decrement: materials[3].quantity,
          },
        },
      })
    )
  }

  await prisma.$transaction(ItemsToUpdate)
}

export function upsertCharacterTrack({
  name,
  level,
  ascension,
  normalAttack,
  elementalSkill,
  elementalBurst,
  accountId,
}: {
  name: CharacterType.Name
  level: number
  ascension: number
  normalAttack: number
  elementalSkill: number
  elementalBurst: number
  accountId: string
}) {
  return prisma.userCharacter.upsert({
    where: {
      name_ownerId: {
        name,
        ownerId: accountId,
      },
    },
    create: {
      name,
      ownerId: accountId,
      ...DEFAULT_PROGRESSION,
      track: {
        create: {
          targetLevel: level,
          targetAscension: ascension,
          targetNormalAttack: normalAttack,
          targetElementalSkill: elementalSkill,
          targetElementalBurst: elementalBurst,
        },
      },
    },
    update: {
      track: {
        upsert: {
          create: {
            targetLevel: level,
            targetAscension: ascension,
            targetNormalAttack: normalAttack,
            targetElementalSkill: elementalSkill,
            targetElementalBurst: elementalBurst,
          },
          update: {
            targetLevel: level,
            targetAscension: ascension,
            targetNormalAttack: normalAttack,
            targetElementalSkill: elementalSkill,
            targetElementalBurst: elementalBurst,
          },
        },
      },
    },
  })
}

export function updateTrackCharacter({
  name,
  level,
  ascension,
  normalAttack,
  elementalSkill,
  elementalBurst,
  accountId,
}: {
  name: CharacterType.Name
  level: number
  ascension: number
  normalAttack: number
  elementalSkill: number
  elementalBurst: number
  accountId: string
}) {
  return prisma.characterTrack.update({
    where: { name_ownerId: { name, ownerId: accountId } },
    data: {
      targetLevel: level,
      targetAscension: ascension,
      targetNormalAttack: normalAttack,
      targetElementalSkill: elementalSkill,
      targetElementalBurst: elementalBurst,
    },
  })
}

export function deleteTrackCharacter({
  name,
  accountId,
}: {
  name: string
  accountId: string
}) {
  return prisma.characterTrack.delete({
    where: { name_ownerId: { name, ownerId: accountId } },
  })
}
