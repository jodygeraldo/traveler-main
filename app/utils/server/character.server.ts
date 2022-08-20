import * as RemixNode from '@remix-run/node'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as CharacterData from '~/data/character.server'
import type * as DB from '~/db.server'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

export function getMissingCharacters(names: string[]) {
  return CharacterData.characters
    .filter((character) => !names.includes(character.name))
    .map((character) => character.name)
}

export function isValidCharacterName(
  name: string | undefined
): name is CharacterType.Name {
  return CharacterData.characters.some((character) => character.name === name)
}

export function parseCharacterNameOrThrow({
  name,
  doDesglugify,
}: {
  name: string | undefined
  doDesglugify?: boolean
}): CharacterType.Name {
  const BaseSchema = Zod.string()
  const Schema = doDesglugify
    ? BaseSchema.transform((str) => Utils.deslugify(str))
    : BaseSchema

  const updatedName = Schema.parse(name)

  if (!isValidCharacterName(updatedName)) {
    throw RemixNode.json(`Character ${updatedName} not found`, {
      status: 404,
      statusText: 'Character Not Found',
    })
  }

  return updatedName
}

const DEFAULT_PROGRESSION: CharacterType.Progression = {
  level: 1,
  ascension: 0,
  normalAttack: 1,
  elementalSkill: 1,
  elementalBurst: 1,
}

export function getCharacters(
  userCharacters: Omit<DB.UserCharacter, 'id' | 'ownerId'>[]
) {
  return CharacterData.characters.map((character) => {
    const userCharacter = userCharacters.find(
      (userCharacter) => userCharacter.name === character.name
    )
    if (!userCharacter) {
      return {
        ...character,
        progression: DEFAULT_PROGRESSION,
      }
    }

    const { name, ...progression } = userCharacter
    return {
      ...character,
      progression,
    }
  })
}

export function getCharactersProgression(
  userCharacters: Omit<DB.UserCharacter, 'id' | 'ownerId'>[]
) {
  return CharacterData.characters.map((character) => {
    const userCharacter = userCharacters.find((c) => c.name === character.name)
    if (!userCharacter) {
      return {
        name: character.name,
        progression: DEFAULT_PROGRESSION,
      }
    }

    const { name, ...progression } = userCharacter
    return {
      name: character.name,
      progression,
    }
  })
}

export function getCharacter(name: CharacterType.Name) {
  const character = CharacterData.characters.find((c) => c.name === name)
  invariant(character, `Character ${name} not found`)
  return character
}

export function getCharacterWithProgression({
  name,
  progression,
}: {
  name: CharacterType.Name
  progression: CharacterType.Progression | null
}) {
  const character = CharacterData.characters.find(
    (character) => character.name === name
  )!

  if (!progression) return { ...character, progression: DEFAULT_PROGRESSION }
  return { ...character, progression }
}

export function getCharacterProgression({
  name,
  progression,
}: {
  name: CharacterType.Name
  progression: CharacterType.Progression | null
}) {
  if (!progression) return { name, progression: DEFAULT_PROGRESSION }
  return { name, progression }
}

export function getCharacterDetail(name: CharacterType.Name) {
  const character = CharacterData.charactersDetail.find((c) => c.name === name)
  invariant(character, `Character ${name} not found`)
  return character
}

export function getRequiredMaterial(name: CharacterType.Name) {
  const character = CharacterData.characterMaterial.find(
    (character) => character.name === name
  )!
  const isTraveler = character.name.includes('Traveler')

  const ascensionMaterial = getAscensionMaterial(character.ascension)

  if (Array.isArray(character.talent)) {
    return {
      ascensionMaterial,
      talentMaterial: {
        normal: getTalentMaterial(character.talent[0], {
          isTraveler,
        }),
        elemental: getTalentMaterial(character.talent[1], {
          isTraveler,
        }),
      },
    }
  }

  const talentMaterial = getTalentMaterial(character.talent, {
    isTraveler,
  })

  return {
    ascensionMaterial,
    talentMaterial,
  }
}

function getAscensionMaterial({
  gem,
  boss,
  local,
  common,
}: CharacterType.AscensionMaterial): CharacterType.AscensionPhase[] {
  return [
    {
      phase: { from: 0, to: 1 },
      mora: 20_000,
      common: { name: common[0], quantity: 3 },
      gem: { name: `${gem} Sliver`, quantity: 1 },
      local: { name: local, quantity: 3 },
    },
    {
      phase: { from: 1, to: 2 },
      mora: 40_000,
      common: { name: common[0], quantity: 15 },
      gem: { name: `${gem} Fragment`, quantity: 3 },
      local: { name: local, quantity: 10 },
      boss: boss ? { name: boss, quantity: 2 } : undefined,
    },
    {
      phase: { from: 2, to: 3 },
      mora: 60_000,
      common: { name: common[1], quantity: 12 },
      gem: { name: `${gem} Fragment`, quantity: 6 },
      local: { name: local, quantity: 20 },
      boss: boss ? { name: boss, quantity: 4 } : undefined,
    },
    {
      phase: { from: 3, to: 4 },
      mora: 80_000,
      common: { name: common[1], quantity: 18 },
      gem: { name: `${gem} Chunk`, quantity: 3 },
      local: { name: local, quantity: 30 },
      boss: boss ? { name: boss, quantity: 8 } : undefined,
    },
    {
      phase: { from: 4, to: 5 },
      mora: 100_000,
      common: { name: common[2], quantity: 12 },
      gem: { name: `${gem} Chunk`, quantity: 6 },
      local: { name: local, quantity: 45 },
      boss: boss ? { name: boss, quantity: 12 } : undefined,
    },
    {
      phase: { from: 5, to: 6 },
      mora: 120_000,
      common: { name: common[2], quantity: 24 },
      gem: { name: `${gem} Gemstone`, quantity: 6 },
      local: { name: local, quantity: 60 },
      boss: boss ? { name: boss, quantity: 20 } : undefined,
    },
  ]
}

function getTalentMaterial(
  { book, boss, common, special }: CharacterType.TalentMaterial,
  options?: { isTraveler: boolean }
): CharacterType.TalentPhase[] {
  const isTraveler = options?.isTraveler ?? false

  return [
    {
      level: { from: 1, to: 2 },
      mora: 12_500,
      common: { name: common[0], quantity: 3 },
      book: { name: book[0], quantity: 3 },
    },
    {
      level: { from: 2, to: 3 },
      mora: 17_500,
      common: { name: common[1], quantity: 3 },
      book: { name: book[1], quantity: 2 },
    },
    {
      level: { from: 3, to: 4 },
      mora: 25_000,
      common: { name: common[1], quantity: 4 },
      book: { name: book[isTraveler ? 2 : 1], quantity: 4 },
    },
    {
      level: { from: 4, to: 5 },
      mora: 30_000,
      common: { name: common[1], quantity: 6 },
      book: { name: book[isTraveler ? 3 : 1], quantity: 6 },
    },
    {
      level: { from: 5, to: 6 },
      mora: 37_500,
      common: { name: common[1], quantity: 9 },
      book: { name: book[isTraveler ? 4 : 1], quantity: 9 },
    },
    {
      level: { from: 6, to: 7 },
      mora: 120_000,
      common: { name: common[2], quantity: 4 },
      book: { name: book[isTraveler ? 5 : 2], quantity: 4 },
      boss: { name: boss, quantity: 1 },
    },
    {
      level: { from: 7, to: 8 },
      mora: 260_000,
      common: { name: common[2], quantity: 6 },
      book: { name: book[isTraveler ? 6 : 2], quantity: 6 },
      boss: { name: boss, quantity: 1 },
    },
    {
      level: { from: 8, to: 9 },
      mora: 450_000,
      common: { name: common[2], quantity: 9 },
      book: { name: book[isTraveler ? 7 : 2], quantity: 12 },
      boss: { name: boss, quantity: 2 },
    },
    {
      level: { from: 9, to: 10 },
      mora: 700_000,
      common: { name: common[2], quantity: 12 },
      book: { name: book[isTraveler ? 8 : 2], quantity: 16 },
      boss: { name: boss, quantity: 2 },
      special: { name: special, quantity: 1 },
    },
  ]
}

export function validateAscensionRequirement(progression: {
  level?: number
  ascension: number
  normalAttack?: number
  elementalSkill?: number
  elementalBurst?: number
}) {
  function getErrorMessage(
    on: 'level' | 'normal attack' | 'elemental skill' | 'elemental burst',
    phase: number,
    maxLevel: number,
    minLevel?: number
  ) {
    if (minLevel)
      return `${on} on ascension ${phase} is between ${minLevel} and ${maxLevel}`
    return `Maximum ${on} on ascension ${phase} is ${maxLevel}`
  }

  function parseData({
    phase,
    minLevel,
    maxLevel,
    maxTalent,
  }: {
    phase: number
    minLevel: number
    maxLevel: number
    maxTalent: number
  }) {
    const LevelSchema = progression.level
      ? Zod.number().refine((val) => val <= maxLevel && val >= minLevel, {
          message: getErrorMessage('level', phase, maxLevel, minLevel),
        })
      : Zod.undefined()

    const NormalAttackSchema = progression.normalAttack
      ? Zod.number().refine((val) => val <= maxTalent, {
          message: getErrorMessage('normal attack', phase, maxTalent),
        })
      : Zod.undefined()

    const ElementalSkillSchema = progression.elementalSkill
      ? Zod.number().refine((val) => val <= maxTalent, {
          message: getErrorMessage('elemental skill', phase, maxTalent),
        })
      : Zod.undefined()

    const ElementalBurstSchema = progression.elementalBurst
      ? Zod.number().refine((val) => val <= maxTalent, {
          message: getErrorMessage('elemental burst', phase, maxTalent),
        })
      : Zod.undefined()

    const Schema = Zod.object({
      level: LevelSchema,
      ascension: Zod.number(),
      normalAttack: NormalAttackSchema,
      elementalSkill: ElementalSkillSchema,
      elementalBurst: ElementalBurstSchema,
    })

    return Schema.safeParse(progression)
  }

  function narrowErrors(errors: Zod.ZodIssue[]): { [key: string]: string } {
    return Object.assign(
      {},
      ...errors.map((error) => ({
        [error.path[0]]: error.message,
      }))
    )
  }

  switch (progression.ascension) {
    case 0: {
      const parsedData = parseData({
        phase: 0,
        minLevel: 1,
        maxLevel: 20,
        maxTalent: 1,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 1: {
      const parsedData = parseData({
        phase: 1,
        minLevel: 20,
        maxLevel: 40,
        maxTalent: 1,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 2: {
      const parsedData = parseData({
        phase: 2,
        minLevel: 40,
        maxLevel: 50,
        maxTalent: 2,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 3: {
      const parsedData = parseData({
        phase: 3,
        minLevel: 50,
        maxLevel: 60,
        maxTalent: 4,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 4: {
      const parsedData = parseData({
        phase: 4,
        minLevel: 60,
        maxLevel: 70,
        maxTalent: 6,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 5: {
      const parsedData = parseData({
        phase: 5,
        minLevel: 70,
        maxLevel: 80,
        maxTalent: 8,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    }
    case 6:
      const parsedData = parseData({
        phase: 6,
        minLevel: 80,
        maxLevel: 90,
        maxTalent: 10,
      })
      if (!parsedData.success) return narrowErrors(parsedData.error.issues)
      return
    default:
      invariant(
        false,
        `validateAscensionRequirement called with ascension: ${progression.ascension}, expected 0-6`
      )
  }
}

export function getItemsToRetrieve(name: CharacterType.Name) {
  const characterData = CharacterData.characterMaterial.find(
    (c) => c.name === name
  )!

  const { ascension, talent } = characterData

  function getAscensionGems(name: string) {
    return [
      `${name} Sliver`,
      `${name} Fragment`,
      `${name} Chunk`,
      `${name} Gemstone`,
    ]
  }

  const talentMaterial = {
    common: Array.isArray(talent)
      ? talent.reduce((prev, cur) => [...prev, ...cur.common], [] as string[])
      : talent.common,
    book: Array.isArray(talent)
      ? talent.reduce((prev, cur) => [...prev, ...cur.book], [] as string[])
      : talent.book,
    boss: Array.isArray(talent)
      ? talent.reduce((prev, cur) => [...prev, cur.boss], [] as string[])
      : [talent.boss],
  }

  return [
    ascension.common,
    getAscensionGems(ascension.gem),
    ascension.local,
    ascension.boss ?? [],
    talentMaterial.common,
    talentMaterial.book,
    talentMaterial.boss,
    'Crown of Insight',
  ].flat()
}

export function getUnlock(ascension: number) {
  const levelUnlocked = [
    { from: 20, to: 40 },
    { from: 40, to: 50 },
    { from: 50, to: 60 },
    { from: 60, to: 70 },
    { from: 70, to: 80 },
    { from: 80, to: 90 },
  ]
  const talentUnlocked = [
    { from: 1, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 4, to: 6 },
    { from: 6, to: 8 },
    { from: 8, to: 10 },
  ]

  return ascension === 6
    ? undefined
    : {
        level: levelUnlocked[ascension],
        talent: talentUnlocked[ascension],
      }
}

export function getCharactersTrackItems(
  tracks: ({
    id: string
    name: string
    priority: number | null
  } & CharacterType.TrackProgression)[]
) {
  function getIncludedItems({
    itemNames,
    includedIndexArray,
    minIndex,
    maxIndex,
  }: {
    itemNames: string[]
    includedIndexArray: number[][]
    minIndex: number
    maxIndex: number
  }) {
    const includedItemsIndex = Array.from(
      // get all included items and then remove duplicates
      new Set(includedIndexArray.slice(minIndex, maxIndex).flat())
      // sort items by index
    ).sort((a, b) => a - b)

    // loop throught all items and filter out the ones that are not included or undefined
    return includedItemsIndex
      .map((i) => itemNames[i])
      .filter((n) => n !== undefined)
  }

  function getIncludedTalentItems({
    itemNames: fullItemNames,
    normalAttack,
    elementalSkill,
    elementalBurst,
  }: {
    itemNames: string[]
    normalAttack: { current: number; target: number | null }
    elementalSkill: { current: number; target: number | null }
    elementalBurst: { current: number; target: number | null }
  }) {
    const minIndex = Math.min(
      normalAttack.target ? normalAttack.current - 1 : 9,
      elementalSkill.target ? elementalSkill.current - 1 : 9,
      elementalBurst.target ? elementalBurst.current - 1 : 9
    )

    const maxIndex = Math.max(
      normalAttack.target ? normalAttack.target - 1 : 0,
      elementalSkill.target ? elementalSkill.target - 1 : 0,
      elementalBurst.target ? elementalBurst.target - 1 : 0
    )

    if (minIndex === maxIndex || minIndex === 9 || maxIndex === 0) return []

    // Characters (-Traveler)
    if (fullItemNames.length === 17) {
      const itemNames = fullItemNames.slice(9)

      const includedIndexArray = [
        [0, 3],
        [1, 4],
        [1, 4],
        [1, 4],
        [1, 4],
        [2, 5, 6],
        [2, 5, 6],
        [2, 5, 6],
        [2, 5, 6, 7],
      ]

      return getIncludedItems({
        itemNames,
        includedIndexArray,
        minIndex,
        maxIndex,
      })
    }

    // Travelers (-Geo vision)
    if (fullItemNames.length === 22) {
      const itemNames = fullItemNames.slice(8)

      const includedIndexArray = [
        [0, 3],
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
        [2, 8, 12],
        [2, 9, 12],
        [2, 10, 12],
        [2, 11, 12, 13],
      ]

      return getIncludedItems({
        itemNames,
        includedIndexArray,
        minIndex,
        maxIndex,
      })
    }

    // Traveler Geo
    if (fullItemNames.length === 35) {
      const itemNames = fullItemNames.slice(8)

      const includedIndexArrayNormal = [
        [0, 6],
        [1, 7],
        [1, 8],
        [1, 9],
        [1, 10],
        [2, 11, 24],
        [2, 12, 24],
        [2, 13, 24],
        [2, 14, 24, 26],
      ]

      const includedNormal = getIncludedItems({
        itemNames,
        includedIndexArray: includedIndexArrayNormal,
        minIndex: normalAttack.target ? normalAttack.current - 1 : 9,
        maxIndex: normalAttack.target ? normalAttack.target - 1 : 0,
      })

      const minIndexElemental = Math.min(
        elementalSkill.target ? elementalSkill.current - 1 : 9,
        elementalBurst.target ? elementalBurst.current - 1 : 9
      )

      const maxIndexElemental = Math.max(
        elementalSkill.target ? elementalSkill.target - 1 : 0,
        elementalBurst.target ? elementalBurst.target - 1 : 0
      )

      const includedIndexArrayElemental = [
        [3, 15],
        [4, 16],
        [4, 17],
        [4, 18],
        [4, 19],
        [5, 20, 25],
        [5, 21, 25],
        [5, 22, 25],
        [5, 23, 25, 26],
      ]

      const includedElemental = getIncludedItems({
        itemNames,
        includedIndexArray: includedIndexArrayElemental,
        minIndex: minIndexElemental,
        maxIndex: maxIndexElemental,
      })

      return Array.from(new Set([...includedNormal, ...includedElemental]))
    }

    return []
  }

  function getIncludedAscensionItems({
    name,
    itemNames: fullItemNames,
    ascension,
  }: {
    name: CharacterType.Name
    itemNames: string[]
    ascension: { current: number; target: number | null }
  }): string[] {
    const isTraveler = name.includes('Traveler')

    const itemNames = fullItemNames.slice(0, isTraveler ? 8 : 9)

    if (
      !ascension.target ||
      ascension.current === ascension.target ||
      ascension.target === 0
    ) {
      return []
    }

    const includedIndexArray = [
      [0, 2, 7],
      [0, 3, 7, 8],
      [1, 3, 7, 8],
      [1, 4, 7, 8],
      [2, 4, 7, 8],
      [2, 5, 7, 8],
    ]

    return getIncludedItems({
      itemNames,
      includedIndexArray,
      minIndex: ascension.current,
      maxIndex: ascension.target,
    })
  }

  return tracks.map((track) => {
    const name = parseCharacterNameOrThrow({ name: track.name })

    const itemNames = getItemsToRetrieve(name)

    const includedAscensionItems = getIncludedAscensionItems({
      name,
      itemNames,
      ascension: track.ascension,
    })

    const includedTalentItems = getIncludedTalentItems({
      itemNames,
      normalAttack: track.normalAttack,
      elementalSkill: track.elementalSkill,
      elementalBurst: track.elementalBurst,
    })

    return {
      ...track,
      itemNames: Array.from(
        new Set([...includedAscensionItems, ...includedTalentItems])
      ),
    }
  })
}

type KV = { key: string; value: number }

export function getItemsQuantity({
  currentOnly = false,
  name,
  ascension,
  normalAttack,
  elementalSkill,
  elementalBurst,
}: {
  currentOnly?: boolean
  name: CharacterType.Name
} & CharacterType.TrackProgression) {
  const { ascensionMaterial, talentMaterial } = getRequiredMaterial(name)

  const materialWithValue = {
    ascension: [] as KV[],
    normalAttack: [] as KV[],
    elementalSkill: [] as KV[],
    elementalBurst: [] as KV[],
  }

  if (ascension.target && ascension.current < ascension.target) {
    materialWithValue.ascension = getUpdatedMaterial({
      materials: ascensionMaterial,
      progression: {
        current: ascension.current,
        target: currentOnly ? ascension.current + 1 : ascension.target,
      },
    })
  }

  const skipTalent = [0, 0, 2, 4, 6, 8, 10]

  if (
    normalAttack.target &&
    normalAttack.current < normalAttack.target &&
    (currentOnly ? normalAttack.current < skipTalent[ascension.current] : true)
  ) {
    materialWithValue.normalAttack = getUpdatedMaterial({
      materials:
        'normal' in talentMaterial ? talentMaterial.normal : talentMaterial,
      progression: {
        current: normalAttack.current - 1,
        target: currentOnly ? normalAttack.current : normalAttack.target - 1,
      },
    })
  }

  if (
    elementalSkill.target &&
    elementalSkill.current < elementalSkill.target &&
    (currentOnly
      ? elementalSkill.current < skipTalent[ascension.current]
      : true)
  ) {
    materialWithValue.elementalSkill = getUpdatedMaterial({
      materials:
        'elemental' in talentMaterial
          ? talentMaterial.elemental
          : talentMaterial,
      progression: {
        current: elementalSkill.current - 1,
        target: currentOnly
          ? elementalSkill.current
          : elementalSkill.target - 1,
      },
    })
  }

  if (
    elementalBurst.target &&
    elementalBurst.current < elementalBurst.target &&
    (currentOnly
      ? elementalBurst.current < skipTalent[ascension.current]
      : true)
  ) {
    materialWithValue.elementalBurst = getUpdatedMaterial({
      materials:
        'elemental' in talentMaterial
          ? talentMaterial.elemental
          : talentMaterial,
      progression: {
        current: elementalBurst.current - 1,
        target: currentOnly
          ? elementalBurst.current
          : elementalBurst.target - 1,
      },
    })
  }

  if (currentOnly) {
    return materialWithValue
  }

  return combineDuplicateKey({
    skipPreprocess: true,
    arr: [
      ...materialWithValue.ascension,
      ...materialWithValue.normalAttack,
      ...materialWithValue.elementalSkill,
      ...materialWithValue.elementalBurst,
    ],
  })
}

function getUpdatedMaterial({
  materials,
  progression,
}: {
  materials: CharacterType.AscensionPhase[] | CharacterType.TalentPhase[]
  progression: {
    current: number
    target: number
  }
}) {
  return combineDuplicateKey({
    skipPreprocess: false,
    arr: materials.slice(progression.current, progression.target).map((m) => {
      if (Utils.hasOwnProperty(m, 'local')) {
        return {
          mora: m.mora,
          [m.common.name]: m.common.quantity,
          [m.local.name]: m.local.quantity,
          [m.gem.name]: m.gem.quantity,
          [m.boss?.name ?? 'delete_this']: m.boss?.quantity ?? 0,
        }
      }

      return {
        mora: m.mora,
        [m.common.name]: m.common.quantity,
        [m.book.name]: m.book.quantity,
        [m.special?.name ?? 'delete_this']: m.special?.quantity ?? 0,
        [m.boss?.name ?? 'delete_this']: m.boss?.quantity ?? 0,
      }
    }),
  })
}

export function combineDuplicateKey(
  obj:
    | { skipPreprocess: false; arr: { [k: string]: number }[] }
    | { skipPreprocess: true; arr: KV[] }
) {
  let tmpArr: KV[] = []

  if (!obj.skipPreprocess) {
    obj.arr.forEach((m) => {
      Object.keys(m).forEach((k) => {
        tmpArr.push({
          key: k,
          value: m[k],
        })
      })
    })
  } else {
    tmpArr = obj.arr
  }

  // combine value of array with same value of object key
  return tmpArr.reduce((acc, cur) => {
    if (cur.key === 'delete_this') return acc
    const idx = acc.findIndex((a) => a.key === cur.key)
    if (idx === -1) {
      acc.push(cur)
    } else {
      acc[idx].value += cur.value
    }
    return acc
  }, [] as typeof tmpArr)
}
