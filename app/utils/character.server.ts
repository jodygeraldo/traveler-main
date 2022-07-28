import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as CharacterData from '~/data/character.server'
import type * as DB from '~/db.server'
import type * as CharacterType from '~/types/character'
import type * as ItemType from '~/types/item'
import * as Utils from '~/utils'

export function getMissingCharacters(names: string[]) {
  return CharacterData.characters
    .filter((character) => !names.includes(character.name))
    .map((character) => character.name)
}

export function validateCharacter(
  name: string | undefined
): name is CharacterType.Name {
  return CharacterData.characters.findIndex((c) => c.name === name) !== -1
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

export function getCharacter({
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

export function validateAscensionRequirement(
  progression: CharacterType.Progression
) {
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
    const schema = Zod.object({
      level: Zod.number().refine((val) => val <= maxLevel && val >= minLevel, {
        message: getErrorMessage('level', phase, maxLevel, minLevel),
      }),
      ascension: Zod.number(),
      normalAttack: Zod.number().refine((val) => val <= maxTalent, {
        message: getErrorMessage('normal attack', phase, maxTalent),
      }),
      elementalSkill: Zod.number().refine((val) => val <= maxTalent, {
        message: getErrorMessage('elemental skill', phase, maxTalent),
      }),
      elementalBurst: Zod.number().refine((val) => val <= maxTalent, {
        message: getErrorMessage('elemental burst', phase, maxTalent),
      }),
    })

    return schema.safeParse(progression)
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

export function getAscendStatus({
  ascension = 0,
  level = 1,
}: {
  ascension?: number
  level?: number
}) {
  switch (ascension) {
    case 0:
      return { isAbleToAscend: level === 20, requiredLevel: 20 }
    case 1:
      return { isAbleToAscend: level === 40, requiredLevel: 40 }
    case 2:
      return { isAbleToAscend: level === 50, requiredLevel: 50 }
    case 3:
      return { isAbleToAscend: level === 60, requiredLevel: 60 }
    case 4:
      return { isAbleToAscend: level === 70, requiredLevel: 70 }
    case 5:
      return { isAbleToAscend: level === 80, requiredLevel: 80 }
    case 6:
      return { isAbleToAscend: true, requiredLevel: 90 }
    default:
      invariant(
        false,
        `validateAscensionRequirement called with ascension: ${ascension}, expected 0-6`
      )
  }
}

export function getCharacterInventoryLevelUpData({
  name,
  progression,
  itemNames,
  userItems,
}: {
  name: CharacterType.Name
  progression: CharacterType.Progression | null
  itemNames: string[]
  userItems: {
    name: ItemType.Name
    rarity: 1 | 2 | 3 | 4 | 5
    quantity: number
  }[]
}) {
  const { ascension, normalAttack, elementalSkill, elementalBurst } =
    progression ? progression : DEFAULT_PROGRESSION

  function isTalentGreaterThan(
    talent: 'all' | 'normal' | 'elemental',
    level: number
  ) {
    if (talent === 'all')
      return (
        normalAttack > level && elementalSkill > level && elementalBurst > level
      )
    if (talent === 'normal') return normalAttack > level
    if (talent === 'elemental')
      return elementalSkill > level && elementalBurst > level
  }

  const excludedAscensionItems: string[] = []
  if (ascension > 0) excludedAscensionItems.push(itemNames[3])
  if (ascension > 1 && name.includes('Traveler'))
    excludedAscensionItems.push(itemNames[0])
  if (ascension > 2) excludedAscensionItems.push(itemNames[4])
  if (ascension > 3 && name.includes('Traveler'))
    excludedAscensionItems.push(itemNames[1])
  if (ascension > 4) excludedAscensionItems.push(itemNames[5])
  if (ascension > 5) excludedAscensionItems.push(itemNames[6], itemNames[7])
  if (ascension > 5 && name.includes('Traveler'))
    excludedAscensionItems.push(itemNames[2])
  if (ascension > 5 && !name.includes('Traveler'))
    excludedAscensionItems.push(itemNames[8])

  function getExcludedTalentItems() {
    const excludedTalentItems: string[] = []

    // Characters (-Traveler)
    if (itemNames.length === 17) {
      if (isTalentGreaterThan('all', 1))
        excludedTalentItems.push(itemNames[9], itemNames[12])
      if (isTalentGreaterThan('all', 5))
        excludedTalentItems.push(itemNames[10], itemNames[13])
      if (isTalentGreaterThan('all', 9))
        excludedTalentItems.push(
          itemNames[11],
          itemNames[14],
          itemNames[15],
          itemNames[16]
        )
    }

    // Travelers (-Geo vision)
    if (itemNames.length === 22) {
      if (isTalentGreaterThan('all', 1))
        excludedTalentItems.push(itemNames[8], itemNames[11])
      if (isTalentGreaterThan('all', 3)) excludedTalentItems.push(itemNames[13])
      if (isTalentGreaterThan('all', 4)) excludedTalentItems.push(itemNames[14])
      if (isTalentGreaterThan('all', 5))
        excludedTalentItems.push(itemNames[9], itemNames[15])
      if (isTalentGreaterThan('all', 7)) excludedTalentItems.push(itemNames[17])
      if (isTalentGreaterThan('all', 8)) excludedTalentItems.push(itemNames[18])
      if (isTalentGreaterThan('all', 9))
        excludedTalentItems.push(
          itemNames[10],
          itemNames[19],
          itemNames[20],
          itemNames[21]
        )
    }

    // Traveler Geo
    if (itemNames.length === 35) {
      if (isTalentGreaterThan('normal', 1))
        excludedTalentItems.push(itemNames[8], itemNames[14])
      if (isTalentGreaterThan('normal', 3))
        excludedTalentItems.push(itemNames[16])
      if (isTalentGreaterThan('normal', 4))
        excludedTalentItems.push(itemNames[17])
      if (isTalentGreaterThan('normal', 5))
        excludedTalentItems.push(itemNames[9], itemNames[18])
      if (isTalentGreaterThan('normal', 7))
        excludedTalentItems.push(itemNames[20])
      if (isTalentGreaterThan('normal', 8))
        excludedTalentItems.push(itemNames[21])
      if (isTalentGreaterThan('normal', 9))
        excludedTalentItems.push(itemNames[10], itemNames[22], itemNames[32])
      if (isTalentGreaterThan('elemental', 1))
        excludedTalentItems.push(itemNames[11], itemNames[23])
      if (isTalentGreaterThan('elemental', 3))
        excludedTalentItems.push(itemNames[25])
      if (isTalentGreaterThan('elemental', 4))
        excludedTalentItems.push(itemNames[26])
      if (isTalentGreaterThan('elemental', 5))
        excludedTalentItems.push(itemNames[12], itemNames[27])
      if (isTalentGreaterThan('elemental', 7))
        excludedTalentItems.push(itemNames[29])
      if (isTalentGreaterThan('elemental', 8))
        excludedTalentItems.push(itemNames[30])
      if (isTalentGreaterThan('elemental', 9))
        excludedTalentItems.push(itemNames[13], itemNames[31], itemNames[33])
      if (isTalentGreaterThan('all', 9)) excludedTalentItems.push(itemNames[34])
    }

    return excludedTalentItems
  }

  const excludedTalentItems = getExcludedTalentItems()

  const excludedItems = [...excludedAscensionItems, ...excludedTalentItems]
  const items = userItems
    .filter((item) => !excludedItems.includes(item.name))
    .map((item) => ({
      name: item.name,
      rarity: item.rarity,
      quantity: item.quantity,
    }))

  const materials = getCurrentMaterial()
  const possibleToLevel = {
    ascension: isPossibleToLevel(materials.ascension),
    normalAttack: isPossibleToLevel(materials.talent.normal),
    elementalSkill: isPossibleToLevel(materials.talent.elementalSkill),
    elementalBurst: isPossibleToLevel(materials.talent.elementalBurst),
  }
  const material = getCurrentItems(items)

  return { items, material, possibleToLevel }

  function getCurrentMaterial() {
    const { ascensionMaterial, talentMaterial } = getRequiredMaterial(name)
    const curAscensionMaterial = ascensionMaterial.at(ascension)

    const skipTalent = [0, 0, 2, 4, 6, 8, 10]

    const curTalentNormalMaterial =
      normalAttack >= skipTalent[ascension]
        ? undefined
        : Array.isArray(talentMaterial)
        ? talentMaterial.at(normalAttack - 1)
        : talentMaterial.normal.at(normalAttack - 1)
    const curTalentElementalSkillMaterial =
      elementalSkill >= skipTalent[ascension]
        ? undefined
        : Array.isArray(talentMaterial)
        ? talentMaterial.at(elementalSkill - 1)
        : talentMaterial.elemental.at(elementalSkill - 1)
    const curTalentElementalBurstMaterial =
      elementalBurst >= skipTalent[ascension]
        ? undefined
        : Array.isArray(talentMaterial)
        ? talentMaterial.at(elementalBurst - 1)
        : talentMaterial.elemental.at(elementalBurst - 1)

    return {
      ascension: curAscensionMaterial,
      talent: {
        normal: curTalentNormalMaterial,
        elementalSkill: curTalentElementalSkillMaterial,
        elementalBurst: curTalentElementalBurstMaterial,
      },
    }
  }

  function isPossibleToLevel(
    material?: CharacterType.TalentPhase | CharacterType.AscensionPhase
  ) {
    if (!material) {
      return
    }

    let materials = [material.common]

    if (Utils.hasOwnProperty(material, 'book')) {
      materials = [...materials, material.book]
      if (material.boss) materials = [...materials, material.boss]
      if (material.special) materials = [...materials, material.special]
    } else {
      materials = [...materials, material.gem, material.local]
      if (material.boss) materials = [...materials, material.boss]
    }

    return materials.every((material) => {
      const tmp = items.find((i) => i.name === material.name)
      if (!tmp) return false
      const tmpQuantity = tmp.quantity ?? 0
      if (tmpQuantity < material.quantity) return false
      return true
    })
  }

  function getCurrentItems(items: typeof userItems) {
    type ItemType = {
      name: ItemType.Name
      rarity: 1 | 2 | 3 | 4 | 5
      quantity: number
    }

    const material = getCurrentMaterial()
    let parsedAscensionMaterial: ItemType[] | undefined
    let parsedTalentNormalMaterial: ItemType[] | undefined
    let parsedTalentElSkillMaterial: ItemType[] | undefined
    let parsedTalentElBurstMaterial: ItemType[] | undefined

    if (material.ascension) {
      const ascMat = material.ascension

      let ascensionMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[] = [
        ascMat.common,
        ascMat.gem,
        ascMat.local,
      ]
      if (ascMat.boss) {
        ascensionMaterial = [...ascensionMaterial, ascMat.boss]
      }

      parsedAscensionMaterial = ascensionMaterial.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          name: correspondingItem.name,
          rarity: correspondingItem.rarity,
        }
      })
    }

    if (material.talent.normal) {
      const talNormMat = material.talent.normal

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[] = [
        talNormMat.common,
        talNormMat.book,
      ]
      if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
      if (talNormMat.special)
        talentMaterial = [...talentMaterial, talNormMat.special]

      parsedTalentNormalMaterial = talentMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          name: correspondingItem.name,
          rarity: correspondingItem.rarity,
        }
      })
    }

    if (material.talent.elementalSkill) {
      const talNormMat = material.talent.elementalSkill

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[] = [
        talNormMat.common,
        talNormMat.book,
      ]
      if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
      if (talNormMat.special)
        talentMaterial = [...talentMaterial, talNormMat.special]

      parsedTalentElSkillMaterial = talentMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          name: correspondingItem.name,
          rarity: correspondingItem.rarity,
        }
      })
    }

    if (material.talent.elementalBurst) {
      const talMat = material.talent.elementalBurst

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[] = [
        talMat.common,
        talMat.book,
      ]
      if (talMat.boss) talentMaterial = [...talentMaterial, talMat.boss]
      if (talMat.special) talentMaterial = [...talentMaterial, talMat.special]

      parsedTalentElBurstMaterial = talentMaterial.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)!
        return {
          ...item,
          name: correspondingItem.name,
          rarity: correspondingItem.rarity,
        }
      })
    }

    return {
      ascension: parsedAscensionMaterial,
      talent: {
        normal: parsedTalentNormalMaterial,
        elementalSkill: parsedTalentElSkillMaterial,
        elementalBurst: parsedTalentElBurstMaterial,
      },
    }
  }
}

export function getCharactersTrackItems(
  tracks: {
    id: string
    name: string
    priority: number | null
    targetLevel: number
    targetAscension: number
    targetNormalAttack: number
    targetElementalSkill: number
    targetElementalBurst: number
    userCharacter: CharacterType.Progression
  }[]
) {
  function getExcludedTalentItems({
    itemNames,
    normalAttack,
    elementalSkill,
    elementalBurst,
  }: {
    itemNames: string[]
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }) {
    function isTalentGreaterThan(
      talent: 'all' | 'normal' | 'elemental',
      level: number
    ) {
      if (talent === 'all')
        return (
          normalAttack > level &&
          elementalSkill > level &&
          elementalBurst > level
        )
      if (talent === 'normal') return normalAttack > level
      if (talent === 'elemental')
        return elementalSkill > level && elementalBurst > level
    }

    const excludedTalentItems: string[] = []

    // Characters (-Traveler)
    if (itemNames.length === 17) {
      if (isTalentGreaterThan('all', 1))
        excludedTalentItems.push(itemNames[9], itemNames[12])
      if (isTalentGreaterThan('all', 5))
        excludedTalentItems.push(itemNames[10], itemNames[13])
      if (isTalentGreaterThan('all', 9))
        excludedTalentItems.push(
          itemNames[11],
          itemNames[14],
          itemNames[15],
          itemNames[16]
        )
    }

    // Travelers (-Geo vision)
    if (itemNames.length === 22) {
      if (isTalentGreaterThan('all', 1))
        excludedTalentItems.push(itemNames[8], itemNames[11])
      if (isTalentGreaterThan('all', 3)) excludedTalentItems.push(itemNames[13])
      if (isTalentGreaterThan('all', 4)) excludedTalentItems.push(itemNames[14])
      if (isTalentGreaterThan('all', 5))
        excludedTalentItems.push(itemNames[9], itemNames[15])
      if (isTalentGreaterThan('all', 7)) excludedTalentItems.push(itemNames[17])
      if (isTalentGreaterThan('all', 8)) excludedTalentItems.push(itemNames[18])
      if (isTalentGreaterThan('all', 9))
        excludedTalentItems.push(
          itemNames[10],
          itemNames[19],
          itemNames[20],
          itemNames[21]
        )
    }

    // Traveler Geo
    if (itemNames.length === 35) {
      if (isTalentGreaterThan('normal', 1))
        excludedTalentItems.push(itemNames[8], itemNames[14])
      if (isTalentGreaterThan('normal', 3))
        excludedTalentItems.push(itemNames[16])
      if (isTalentGreaterThan('normal', 4))
        excludedTalentItems.push(itemNames[17])
      if (isTalentGreaterThan('normal', 5))
        excludedTalentItems.push(itemNames[9], itemNames[18])
      if (isTalentGreaterThan('normal', 7))
        excludedTalentItems.push(itemNames[20])
      if (isTalentGreaterThan('normal', 8))
        excludedTalentItems.push(itemNames[21])
      if (isTalentGreaterThan('normal', 9))
        excludedTalentItems.push(itemNames[10], itemNames[22], itemNames[32])
      if (isTalentGreaterThan('elemental', 1))
        excludedTalentItems.push(itemNames[11], itemNames[23])
      if (isTalentGreaterThan('elemental', 3))
        excludedTalentItems.push(itemNames[25])
      if (isTalentGreaterThan('elemental', 4))
        excludedTalentItems.push(itemNames[26])
      if (isTalentGreaterThan('elemental', 5))
        excludedTalentItems.push(itemNames[12], itemNames[27])
      if (isTalentGreaterThan('elemental', 7))
        excludedTalentItems.push(itemNames[29])
      if (isTalentGreaterThan('elemental', 8))
        excludedTalentItems.push(itemNames[30])
      if (isTalentGreaterThan('elemental', 9))
        excludedTalentItems.push(itemNames[13], itemNames[31], itemNames[33])
      if (isTalentGreaterThan('all', 9)) excludedTalentItems.push(itemNames[34])
    }

    return excludedTalentItems
  }

  return tracks.map((track) => {
    if (!validateCharacter(track.name)) {
      throw new Error('Invalid character name')
    }
    const itemNames = getItemsToRetrieve(track.name)

    const { ascension, normalAttack, elementalSkill, elementalBurst } =
      track.userCharacter

    const excludedAscensionItems: string[] = []
    if (ascension > 0) excludedAscensionItems.push(itemNames[3])
    if (ascension > 1 && track.name.includes('Traveler'))
      excludedAscensionItems.push(itemNames[0])
    if (ascension > 2) excludedAscensionItems.push(itemNames[4])
    if (ascension > 3 && track.name.includes('Traveler'))
      excludedAscensionItems.push(itemNames[1])
    if (ascension > 4) excludedAscensionItems.push(itemNames[5])
    if (ascension > 5) excludedAscensionItems.push(itemNames[6], itemNames[7])
    if (ascension > 5 && track.name.includes('Traveler'))
      excludedAscensionItems.push(itemNames[2])
    if (ascension > 5 && !track.name.includes('Traveler'))
      excludedAscensionItems.push(itemNames[8])

    const excludedTalentItems = getExcludedTalentItems({
      itemNames,
      normalAttack,
      elementalSkill,
      elementalBurst,
    })

    const excludedItems = [...excludedAscensionItems, ...excludedTalentItems]
    const items = itemNames.filter((name) => !excludedItems.includes(name))

    return {
      ...track,
      itemNames: Array.from(new Set(items)),
    }
  })
}
