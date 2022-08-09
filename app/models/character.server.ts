import * as Zod from 'zod'
import prisma from '~/db.server'
import * as Redis from '~/redis.server'
import type * as CharacterType from '~/types/character'

const DEFAULT_PROGRESSION = {
  level: 1,
  ascension: 0,
  normalAttack: 1,
  elementalSkill: 1,
  elementalBurst: 1,
}

function getRedisCharacterKeys(accountId: string, name: string) {
  const travelers = ['Traveler Anemo', 'Traveler Geo', 'Traveler Electro']
  const keysWithName = travelers.includes(name)
    ? travelers
        .map((name) => [
          `getUserCharacter:${name}:${accountId}`,
          `getUserTrackCharacter:${name}:${accountId}`,
          `getUserCharacterTrackStatus:${name}:${accountId}`,
        ])
        .flat()
    : [
        `getUserCharacter:${name}:${accountId}`,
        `getUserTrackCharacter:${name}:${accountId}`,
        `getUserCharacterTrackStatus:${name}:${accountId}`,
      ]

  return [
    ...keysWithName,
    `getUserCharacters:${accountId}`,
    `getUserNonTrackableCharactersName:${accountId}`,
    `getUserTrackCharacters:${accountId}`,
  ]
}

const UserCharacterSchema = Zod.object({
  name: Zod.string(),
  level: Zod.number(),
  ascension: Zod.number(),
  normalAttack: Zod.number(),
  elementalSkill: Zod.number(),
  elementalBurst: Zod.number(),
})

export async function getUserCharacters(accountId: string) {
  const UserCharactersSchema = UserCharacterSchema.array()

  const userCharactersCache = await Redis.getSafe({
    key: `getUserCharacters:${accountId}`,
    schema: UserCharactersSchema,
  })

  if (userCharactersCache) return userCharactersCache

  const userCharacters = await prisma.userCharacter.findMany({
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

  await Redis.set(`getUserCharacters:${accountId}`, userCharacters)

  return userCharacters
}

export async function getUserNonTrackableCharactersName(accountId: string) {
  const userNonTrackableCharactersNameCache = await Redis.getSafe({
    key: `getUserNonTrackableCharactersName:${accountId}`,
    schema: Zod.string().array(),
  })

  if (userNonTrackableCharactersNameCache)
    return userNonTrackableCharactersNameCache

  const [userMaxLevelCharacters, userTrackedCharacters] = await Promise.all([
    prisma.userCharacter.findMany({
      where: {
        ownerId: accountId,
        level: { equals: 90 },
        ascension: { equals: 6 },
        normalAttack: { equals: 10 },
        elementalSkill: { equals: 10 },
        elementalBurst: { equals: 10 },
      },
      select: { name: true },
    }),
    prisma.characterTrack.findMany({
      where: { ownerId: accountId },
      select: { name: true },
    }),
  ])

  const userNonTrackableCharactersName = Array.from(
    new Set([
      ...userMaxLevelCharacters.map((c) => c.name),
      ...userTrackedCharacters.map((c) => c.name),
    ])
  )

  Redis.set(
    `getUserNonTrackableCharactersName:${accountId}`,
    userNonTrackableCharactersName
  )

  return userNonTrackableCharactersName
}

export async function getUserCharacter({
  name,
  accountId,
}: {
  name: CharacterType.Name
  accountId: string
}) {
  const userCharacterCache = await Redis.getSafe({
    key: `getUserCharacter:${name}:${accountId}`,
    schema: UserCharacterSchema.nullable(),
  })

  if (userCharacterCache) return userCharacterCache

  const userCharacter = await prisma.userCharacter.findUnique({
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

  await Redis.set(`getUserCharacter:${name}:${accountId}`, userCharacter)

  return userCharacter
}

const UserTrackCharacterSchema = Zod.object({
  level: Zod.object({
    current: Zod.number(),
    target: Zod.number().nullable(),
  }),
  ascension: Zod.object({
    current: Zod.number(),
    target: Zod.number().nullable(),
  }),
  normalAttack: Zod.object({
    current: Zod.number(),
    target: Zod.number().nullable(),
  }),
  elementalSkill: Zod.object({
    current: Zod.number(),
    target: Zod.number().nullable(),
  }),
  elementalBurst: Zod.object({
    current: Zod.number(),
    target: Zod.number().nullable(),
  }),
})

export async function getUserTrackCharacters(accountId: string) {
  const UserTrackCharactersSchema = UserTrackCharacterSchema.extend({
    id: Zod.string(),
    name: Zod.string(),
    priority: Zod.number().nullable(),
  }).array()

  const userTrackCharactersCache = await Redis.getSafe({
    key: `getUserTrackCharacters:${accountId}`,
    schema: UserTrackCharactersSchema,
  })

  if (userTrackCharactersCache) return userTrackCharactersCache

  const userTrackCharacters = await prisma.characterTrack.findMany({
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

  const updatedUserTrackCharacters = userTrackCharacters.map((character) => ({
    id: character.id,
    name: character.name,
    priority: character.priority,
    level: {
      current: character.userCharacter.level,
      target: character.targetLevel,
    },
    ascension: {
      current: character.userCharacter.ascension,
      target: character.targetAscension,
    },
    normalAttack: {
      current: character.userCharacter.normalAttack,
      target: character.targetNormalAttack,
    },
    elementalSkill: {
      current: character.userCharacter.elementalSkill,
      target: character.targetElementalSkill,
    },
    elementalBurst: {
      current: character.userCharacter.elementalBurst,
      target: character.targetElementalBurst,
    },
  }))

  await Redis.set(
    `getUserTrackCharacters:${accountId}`,
    updatedUserTrackCharacters
  )

  return updatedUserTrackCharacters
}

export async function getUserTrackCharacter({
  name,
  accountId,
}: {
  name: string
  accountId: string
}) {
  const userTrackCharacterCache = await Redis.getSafe({
    key: `getUserTrackCharacter:${name}:${accountId}`,
    schema: UserTrackCharacterSchema.nullable(),
  })

  if (userTrackCharacterCache) return userTrackCharacterCache

  const userTrackCharacter = await prisma.characterTrack.findUnique({
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

  if (!userTrackCharacter) return null

  const updatedUserTrackCharacter = {
    level: {
      current: userTrackCharacter.userCharacter.level,
      target: userTrackCharacter.targetLevel,
    },
    ascension: {
      current: userTrackCharacter.userCharacter.ascension,
      target: userTrackCharacter.targetAscension,
    },
    normalAttack: {
      current: userTrackCharacter.userCharacter.normalAttack,
      target: userTrackCharacter.targetNormalAttack,
    },
    elementalSkill: {
      current: userTrackCharacter.userCharacter.elementalSkill,
      target: userTrackCharacter.targetElementalSkill,
    },
    elementalBurst: {
      current: userTrackCharacter.userCharacter.elementalBurst,
      target: userTrackCharacter.targetElementalBurst,
    },
  }

  await Redis.set(
    `getUserTrackCharacter:${name}:${accountId}`,
    updatedUserTrackCharacter
  )

  return updatedUserTrackCharacter
}

export async function getUserCharacterTrackStatus({
  name,
  accountId,
}: {
  name: CharacterType.Name
  accountId: string
}) {
  const UserCharacterTrackStatusSchema = Zod.object({
    tracked: Zod.boolean(),
    isMaxLevel: Zod.boolean(),
  })

  const userCharacterTrackStatusCache = await Redis.getSafe({
    key: `getUserCharacterTrackStatus:${name}:${accountId}`,
    schema: UserCharacterTrackStatusSchema,
  })

  if (userCharacterTrackStatusCache) return userCharacterTrackStatusCache

  const character = await prisma.userCharacter.findUnique({
    where: { name_ownerId: { name, ownerId: accountId } },
    include: { track: true },
  })

  const status = {
    tracked: false,
    isMaxLevel: false,
  }

  if (!character) {
    await Redis.set(`getUserCharacterTrackStatus:${name}:${accountId}`, status)
    return status
  }

  status.tracked = character.track !== null
  status.isMaxLevel =
    character.level === 90 &&
    character.ascension === 6 &&
    character.normalAttack === 10 &&
    character.elementalSkill === 10 &&
    character.elementalBurst === 10

  await Redis.set(`getUserCharacterTrackStatus:${name}:${accountId}`, status)
  return status
}

export async function updateCharacter({
  name,
  progression,
  accountId,
}: {
  name: CharacterType.Name
  progression: {
    level?: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  }
  accountId: string
}) {
  try {
    if (name.includes('Traveler')) {
      await prisma.$transaction([
        prisma.userCharacter.update({
          where: { name_ownerId: { name, ownerId: accountId } },
          data: { ...progression },
        }),
        prisma.userCharacter.updateMany({
          where: {
            ownerId: accountId,
            name: {
              contains: 'Traveler',
            },
            NOT: { name },
          },
          data: {
            level: progression.level,
            ascension: progression.ascension,
          },
        }),
      ])

      await Redis.del(getRedisCharacterKeys(accountId, name))
    } else {
      await prisma.userCharacter.upsert({
        where: { name_ownerId: { name, ownerId: accountId } },
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

      await Redis.del(getRedisCharacterKeys(accountId, name))
    }
  } catch (error) {
    console.error(error)
  }
}

export async function upsertCharacter({
  name,
  progression,
  accountId,
}: {
  name: CharacterType.Name
  progression: {
    level?: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  }
  accountId: string
}) {
  try {
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
        return prisma.userCharacter.createMany({
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
        return prisma.$transaction([
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
              NOT: { name },
            },
            data: {
              level: progression.level,
              ascension: progression.ascension,
            },
          }),
        ])
      }
    } else {
      await prisma.userCharacter.upsert({
        where: { name_ownerId: { name, ownerId: accountId } },
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

    await Redis.del(getRedisCharacterKeys(accountId, name))
  } catch (error) {
    console.error(error)
  }
}

export async function upsertCharacterTrack({
  name,
  level,
  ascension,
  normalAttack,
  elementalSkill,
  elementalBurst,
  accountId,
}: {
  name: CharacterType.Name
  level?: number
  ascension?: number
  normalAttack?: number
  elementalSkill?: number
  elementalBurst?: number
  accountId: string
}) {
  try {
    await prisma.userCharacter.upsert({
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

    await Redis.del(getRedisCharacterKeys(accountId, name))
  } catch (error) {
    console.error(error)
  }
}

export async function updateTrackCharacter({
  name,
  level,
  ascension,
  normalAttack,
  elementalSkill,
  elementalBurst,
  accountId,
}: {
  name: CharacterType.Name
  level?: number
  ascension?: number
  normalAttack?: number
  elementalSkill?: number
  elementalBurst?: number
  accountId: string
}) {
  try {
    await prisma.characterTrack.update({
      where: { name_ownerId: { name, ownerId: accountId } },
      data: {
        targetLevel: level,
        targetAscension: ascension,
        targetNormalAttack: normalAttack,
        targetElementalSkill: elementalSkill,
        targetElementalBurst: elementalBurst,
      },
    })

    await Redis.del([
      `getUserNonTrackableCharactersName:${accountId}`,
      `getUserTrackCharacters:${accountId}`,
      `getUserTrackCharacter:${name}:${accountId}`,
    ])
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTrackCharacter({
  name,
  accountId,
}: {
  name: string
  accountId: string
}) {
  try {
    await prisma.characterTrack.delete({
      where: { name_ownerId: { name, ownerId: accountId } },
    })

    await Redis.del([
      `getUserNonTrackableCharactersName:${accountId}`,
      `getUserTrackCharacters:${accountId}`,
      `getUserTrackCharacter:${name}:${accountId}`,
      `getUserCharacterTrackStatus:${name}:${accountId}`
    ])
  } catch (error) {
    console.error(error)
  }
}

export async function updateCharacterTrackOrder({
  orders,
  accountId,
}: {
  orders: {
    id: string
    priority: number
  }[]
  accountId: string
}) {
  try {
    const queries = orders.map((order) =>
      prisma.characterTrack.update({
        where: { id: order.id },
        data: { priority: order.priority },
      })
    )
    await prisma.$transaction(queries)

    await Redis.del(`getUserTrackCharacters:${accountId}`)
  } catch (error) {
    console.error(error)
  }
}
