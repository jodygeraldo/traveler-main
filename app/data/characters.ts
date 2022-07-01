import invariant from 'tiny-invariant'
import type { CharacterInfer, CharactersInfer } from '~/models/character.server'

type CommonMaterial =
  | 'Slime'
  | 'Hilichurl Masks'
  | 'Samachurl Scrolls'
  | 'Hilichurl Arrowheads'
  | 'Fatui Insignia'
  | 'Treasure Hoarder Insignias'
  | 'Whopperflower Nectar'
  | 'Nobushi Handguards'
  | 'Spectral Cores'
  | 'Fungal Spore Powder'

const commonMaterials: Record<CommonMaterial, string[]> = {
  Slime: ['Slime Condensate', 'Slime Secretions', 'Slime Concentrate'],
  'Hilichurl Masks': ['Damaged Mask', 'Stained Mask', 'Ominous Mask'],
  'Samachurl Scrolls': ['Divining Scroll', 'Sealed Scroll', 'Forbidden Curse Scroll'],
  'Hilichurl Arrowheads': ['Firm Arrowhead', 'Sharp Arrowhead', 'Weathered Arrowhead'],
  'Fatui Insignia': ["Recruit's Insignia", "Sergeant's Insignia", "Lieutenant's Insignia"],
  'Treasure Hoarder Insignias': [
    'Treasure Hoarder Insignia',
    'Silver Raven Insignia',
    'Golden Raven Insignia',
  ],
  'Whopperflower Nectar': ['Whopperflower Nectar', 'Shimmering Nectar', 'Energy Nectar'],
  'Nobushi Handguards': ['Old Handguard', 'Kageuchi Handguard', 'Famed Handguard'],
  'Spectral Cores': ['Spectral Husk', 'Spectral Heart', 'Spectral Nucleus'],
  'Fungal Spore Powder': ['Fungal Spores', 'Luminescent Pollen', 'Crystalline Cyst Dust'],
}

const characters: Character[] = [
  { name: 'Albedo', vision: 'Geo', rarity: 5 },
  { name: 'Aloy', vision: 'Cryo', rarity: 5 },
  { name: 'Amber', vision: 'Pyro', rarity: 4 },
  { name: 'Arataki Itto', vision: 'Geo', rarity: 5 },
  { name: 'Barbara', vision: 'Hydro', rarity: 4 },
  { name: 'Beidou', vision: 'Electro', rarity: 4 },
  { name: 'Bennett', vision: 'Pyro', rarity: 4 },
  { name: 'Chongyun', vision: 'Cryo', rarity: 4 },
  { name: 'Diluc', vision: 'Pyro', rarity: 5 },
  { name: 'Diona', vision: 'Cryo', rarity: 4 },
  { name: 'Eula', vision: 'Cryo', rarity: 5 },
  { name: 'Fischl', vision: 'Electro', rarity: 4 },
  { name: 'Ganyu', vision: 'Cryo', rarity: 5 },
  { name: 'Gorou', vision: 'Geo', rarity: 4 },
  { name: 'Hu Tao', vision: 'Pyro', rarity: 5 },
  { name: 'Jean', vision: 'Anemo', rarity: 5 },
  { name: 'Kaedehara Kazuha', vision: 'Anemo', rarity: 5 },
  { name: 'Kaeya', vision: 'Cryo', rarity: 4 },
  { name: 'Kamisato Ayaka', vision: 'Cryo', rarity: 5 },
  { name: 'Kamisato Ayato', vision: 'Hydro', rarity: 5 },
  { name: 'Keqing', vision: 'Electro', rarity: 5 },
  { name: 'Klee', vision: 'Pyro', rarity: 5 },
  { name: 'Kujou Sara', vision: 'Electro', rarity: 4 },
  { name: 'Kuki Shinobu', vision: 'Electro', rarity: 4 },
  { name: 'Lisa', vision: 'Electro', rarity: 4 },
  { name: 'Mona', vision: 'Hydro', rarity: 5 },
  { name: 'Ningguang', vision: 'Geo', rarity: 4 },
  { name: 'Noelle', vision: 'Geo', rarity: 4 },
  { name: 'Qiqi', vision: 'Cryo', rarity: 5 },
  { name: 'Raiden Shogun', vision: 'Electro', rarity: 5 },
  { name: 'Razor', vision: 'Electro', rarity: 4 },
  { name: 'Rosaria', vision: 'Cryo', rarity: 4 },
  { name: 'Sangonomiya Kokomi', vision: 'Hydro', rarity: 5 },
  { name: 'Sayu', vision: 'Anemo', rarity: 4 },
  { name: 'Shenhe', vision: 'Cryo', rarity: 5 },
  { name: 'Sucrose', vision: 'Anemo', rarity: 4 },
  { name: 'Tartaglia', vision: 'Hydro', rarity: 5 },
  { name: 'Thoma', vision: 'Pyro', rarity: 4 },
  { name: 'Traveler', vision: ['Anemo', 'Geo', 'Electro'], rarity: 5 },
  { name: 'Venti', vision: 'Anemo', rarity: 5 },
  { name: 'Xiangling', vision: 'Pyro', rarity: 4 },
  { name: 'Xiao', vision: 'Anemo', rarity: 5 },
  { name: 'Xingqiu', vision: 'Hydro', rarity: 4 },
  { name: 'Xinyan', vision: 'Pyro', rarity: 4 },
  { name: 'Yae Miko', vision: 'Electro', rarity: 5 },
  { name: 'Yanfei', vision: 'Pyro', rarity: 4 },
  { name: 'Yelan', vision: 'Hydro', rarity: 5 },
  { name: 'Yoimiya', vision: 'Pyro', rarity: 5 },
  { name: 'Yun Jin', vision: 'Geo', rarity: 4 },
  { name: 'Zhongli', vision: 'Geo', rarity: 5 },
]

export interface Character {
  name: string
  vision: string | string[]
  rarity: 4 | 5
  progression?: {
    level?: number | null
    ascension?: number | null
    normalAttack?: number | null
    elementalSkill?: number | null
    elementalBurst?: number | null
  }
}

export interface CharacterMinimal extends Omit<Character, 'vision' | 'rarity'> {}

export function getCharacters(userCharacters: CharactersInfer): Character[] {
  invariant(userCharacters, 'there is no characters associated with this account')

  const updatedCharacters = characters

  userCharacters.forEach((character) => {
    const idx = updatedCharacters.findIndex((c) => c.name === character.name)

    if (idx === -1) {
      return
    }

    updatedCharacters[idx].progression = {
      level: character['@level'],
      ascension: character['@ascension'],
      normalAttack: character['@normal_attack'],
      elementalSkill: character['@elemental_skill'],
      elementalBurst: character['@elemental_burst'],
    }
  })

  return updatedCharacters
}

export function getCharacter({
  name,
  characterData,
}: {
  name: string
  characterData: CharacterInfer
}): CharacterMinimal | null {
  const character = characters.find((character) => character.name === name)
  if (!character) {
    return null
  }
  const updatedCharacter = characterData
    ? {
        ...character,
        progression: {
          level: characterData['@level'],
          ascension: characterData['@ascension'],
          normalAttack: characterData['@normal_attack'],
          elementalSkill: characterData['@elemental_skill'],
          elementalBurst: characterData['@elemental_burst'],
        },
      }
    : character
  return updatedCharacter
}

const characterMaterial = [
  {
    name: 'Albedo',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Basalt Pillar',
      local: 'Cecilia',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: ['Teachings of Freedom', 'Guide to Freedom', 'Philosophies of Freedom'],
      boss: 'Tusk of Monoceros Caeli',
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
]

const travelerMaterial = [
  {
    vision: 'Anemo',
    ascension: {
      gem: 'Brilliant Diamond',
      local: 'Windwheel Aster',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Resistance',
        'Guide to Ballad',
        'Guide to Freedom',
        'Guide to Resistance',
        'Philosophies of Ballad',
        'Philosophies of Freedom',
        'Philosophies of Resistance',
        'Philosophies of Ballad',
      ],
      boss: "Dvalin's Sigh",
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    vision: 'Geo',
    ascension: {
      gem: 'Brilliant Diamond',
      localSpecialty: 'Windwheel Aster',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: [
      {
        book: [
          'Teachings of Freedom',
          'Guide to Resistance',
          'Guide to Ballad',
          'Guide to Freedom',
          'Guide to Resistance',
          'Philosophies of Ballad',
          'Philosophies of Freedom',
          'Philosophies of Resistance',
          'Philosophies of Ballad',
        ],
        boss: "Dvalin's Sigh",
        common: commonMaterials['Samachurl Scrolls'],
        special: 'Crown of Insight',
      },
      {
        book: [
          'Teachings of Prosperity',
          'Guide to Diligence',
          'Guide to Gold',
          'Guide to Prosperity',
          'Guide to Diligence',
          'Philosophies of Gold',
          'Philosophies of Prosperity',
          'Philosophies of Diligence',
          'Philosophies of Gold',
        ],
        boss: 'Tail of Boreas',
        common: commonMaterials['Hilichurl Arrowheads'],
        special: 'Crown of Insight',
      },
      {
        book: [
          'Teachings of Prosperity',
          'Guide to Diligence',
          'Guide to Gold',
          'Guide to Prosperity',
          'Guide to Diligence',
          'Philosophies of Gold',
          'Philosophies of Prosperity',
          'Philosophies of Diligence',
          'Philosophies of Gold',
        ],
        boss: 'Tail of Boreas',
        common: commonMaterials['Hilichurl Arrowheads'],
        special: 'Crown of Insight',
      },
    ],
  },
  {
    vision: 'Electro',
    ascension: {
      gem: 'Brilliant Diamond',
      localSpecialty: 'Windwheel Aster',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Transience',
        'Guide to Elegance',
        'Guide to Light',
        'Guide to Transience',
        'Guide to Elegance',
        'Philosophies of Light',
        'Philosophies of Transience',
        'Philosophies of Elegance',
        'Philosophies of Light',
      ],
      boss: "Dragon Lord's Crown",
      common: commonMaterials['Nobushi Handguards'],
      special: 'Crown of Insight',
    },
  },
]

export type TravelerAscension = {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
}

export type CharacterAscension = {
  boss?: { name: string; quantity: number }
} & TravelerAscension

export type CharacterTalent = {
  level: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  book: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
  special?: { name: string; quantity: number }
}

export function getTravelerRequiredMaterial({ vision }: { vision: string }) {
  const traveler = travelerMaterial.find((traveler) => traveler.vision === vision)
  invariant(traveler)

  const ascensionMaterial: TravelerAscension[] = [
    {
      phase: { from: 0, to: 1 },
      mora: 20_000,
      common: { name: 'Damaged Mask', quantity: 3 },
      gem: { name: 'Brilliant Diamond Sliver', quantity: 1 },
      local: { name: 'Windwheel Aster', quantity: 3 },
    },
    {
      phase: { from: 1, to: 2 },
      mora: 40_000,
      common: { name: 'Damaged Mask', quantity: 15 },
      gem: { name: 'Brilliant Diamond Fragment', quantity: 3 },
      local: { name: 'Windwheel Aster', quantity: 10 },
    },
    {
      phase: { from: 2, to: 3 },
      mora: 60_000,
      common: { name: 'Stained Mask', quantity: 12 },
      gem: { name: 'Brilliant Diamond Fragment', quantity: 6 },
      local: { name: 'Windwheel Aster', quantity: 20 },
    },
    {
      phase: { from: 3, to: 4 },
      mora: 80_000,
      common: { name: 'Stained Mask', quantity: 18 },
      gem: { name: 'Brilliant Diamond Chunk', quantity: 3 },
      local: { name: 'Windwheel Aster', quantity: 30 },
    },
    {
      phase: { from: 4, to: 5 },
      mora: 100_000,
      common: { name: 'Ominous Mask', quantity: 12 },
      gem: { name: 'Brilliant Diamond Chunk', quantity: 6 },
      local: { name: 'Windwheel Aster', quantity: 45 },
    },
    {
      phase: { from: 5, to: 6 },
      mora: 120_000,
      common: { name: 'Ominous Mask', quantity: 24 },
      gem: { name: 'Brilliant Diamond Gemstone', quantity: 6 },
      local: { name: 'Windwheel Aster', quantity: 60 },
    },
  ]

  if (Array.isArray(traveler.talent)) {
    return {
      ascensionMaterial,
      talentMaterial: {
        normal: getCharacterTalentMaterial(traveler.talent[0], { isTraveler: true }),
        elemental: getCharacterTalentMaterial(traveler.talent[1], { isTraveler: true }),
      },
    }
  }

  return {
    ascensionMaterial,
    talentMaterial: {
      normal: getCharacterTalentMaterial(traveler.talent, { isTraveler: true }),
      elemental: getCharacterTalentMaterial(traveler.talent, { isTraveler: true }),
    },
  }
}

export function getCharacterRequiredMaterial({ name }: { name: string }) {
  const character = characterMaterial.find((character) => character.name === name)
  invariant(character)

  return {
    ascensionMaterial: getCharacterAscensionMaterial(character.ascension),
    talentMaterial: getCharacterTalentMaterial(character.talent),
  }
}

function getCharacterAscensionMaterial({
  gem,
  boss,
  local,
  common,
}: {
  gem: string
  boss: string
  local: string
  common: string[]
}): CharacterAscension[] {
  return [
    {
      phase: { from: 0, to: 1 },
      mora: 20_000,
      common: { name: common[1], quantity: 3 },
      gem: { name: `${gem} Sliver`, quantity: 1 },
      local: { name: local, quantity: 3 },
    },
    {
      phase: { from: 1, to: 2 },
      mora: 40_000,
      common: { name: common[1], quantity: 15 },
      gem: { name: `${gem} Fragment`, quantity: 3 },
      local: { name: local, quantity: 10 },
      boss: { name: boss, quantity: 2 },
    },
    {
      phase: { from: 2, to: 3 },
      mora: 60_000,
      common: { name: common[1], quantity: 12 },
      gem: { name: `${gem} Fragment`, quantity: 6 },
      local: { name: local, quantity: 20 },
      boss: { name: boss, quantity: 4 },
    },
    {
      phase: { from: 3, to: 4 },
      mora: 80_000,
      common: { name: common[1], quantity: 18 },
      gem: { name: `${gem} Chunk`, quantity: 3 },
      local: { name: local, quantity: 30 },
      boss: { name: boss, quantity: 8 },
    },
    {
      phase: { from: 4, to: 5 },
      mora: 100_000,
      common: { name: common[2], quantity: 12 },
      gem: { name: `${gem} Chunk`, quantity: 6 },
      local: { name: local, quantity: 45 },
      boss: { name: boss, quantity: 12 },
    },
    {
      phase: { from: 5, to: 6 },
      mora: 120_000,
      common: { name: common[2], quantity: 24 },
      gem: { name: `${gem} Gemstone`, quantity: 6 },
      local: { name: local, quantity: 60 },
      boss: { name: boss, quantity: 20 },
    },
  ]
}

function getCharacterTalentMaterial(
  {
    book,
    boss,
    common,
    special,
  }: {
    book: string[]
    boss: string
    common: string[]
    special: string
  },
  options?: { isTraveler: boolean }
): CharacterTalent[] {
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
