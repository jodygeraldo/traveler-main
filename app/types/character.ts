import type * as DB from '~/db.server'
import type * as ItemType from '~/types/item'

export type Name =
  | 'Albedo'
  | 'Aloy'
  | 'Amber'
  | 'Arataki Itto'
  | 'Barbara'
  | 'Beidou'
  | 'Bennett'
  | 'Chongyun'
  | 'Diluc'
  | 'Diona'
  | 'Eula'
  | 'Fischl'
  | 'Ganyu'
  | 'Gorou'
  | 'Hu Tao'
  | 'Jean'
  | 'Kaedehara Kazuha'
  | 'Kaeya'
  | 'Kamisato Ayaka'
  | 'Kamisato Ayato'
  | 'Keqing'
  | 'Klee'
  | 'Kujou Sara'
  | 'Kuki Shinobu'
  | 'Lisa'
  | 'Mona'
  | 'Ningguang'
  | 'Noelle'
  | 'Qiqi'
  | 'Raiden Shogun'
  | 'Razor'
  | 'Rosaria'
  | 'Sangonomiya Kokomi'
  | 'Sayu'
  | 'Shenhe'
  | 'Shikanoin Heizou'
  | 'Sucrose'
  | 'Tartaglia'
  | 'Thoma'
  | 'Traveler Anemo'
  | 'Traveler Geo'
  | 'Traveler Electro'
  | 'Venti'
  | 'Xiangling'
  | 'Xiao'
  | 'Xingqiu'
  | 'Xinyan'
  | 'Yae Miko'
  | 'Yanfei'
  | 'Yelan'
  | 'Yoimiya'
  | 'Yun Jin'
  | 'Zhongli'

export type Weapon = DB.Weapon
export type Vision = DB.Vision
export type Region = DB.Region

export type Character = {
  name: Name
  weapon: Weapon
  vision: Vision
  region: Region
  rarity: 4 | 5
  talent: [normalAttack: string, elementalSkill: string, elementalBurst: string]
  tags?: string[]
}

export type CharacterDetail = {
  name: Name
  title: string
  description: string
  affiliation: string
  constellation: string
  hp: number
  atk: number
  def: number
  ascensionBonus: {
    stat: string
    value: number
    fixedValue?: boolean
  }
}

export type AscensionMaterial = {
  gem: ItemType.AscensionGemGroupName
  boss?: ItemType.AscensionBoss
  local: ItemType.LocalSpecialty
  common: ItemType.CharacterCommonGroup
}
export type TalentMaterial = {
  book: (
    | ItemType.TalentBookTeachings
    | ItemType.TalentBookGuide
    | ItemType.TalentBookPhilosophies
  )[]
  boss: ItemType.TalentBoss
  common: ItemType.CharacterCommonGroup
  special: 'Crown of Insight'
}

export type ProgressionMaterial = {
  name: Name
  ascension: AscensionMaterial
  talent: TalentMaterial | TalentMaterial[]
}

export type AscensionPhase = {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
}

export type TalentPhase = {
  level: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  book: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
  special?: { name: string; quantity: number }
}

export type Progression = {
  level: number
  ascension: number
  normalAttack: number
  elementalSkill: number
  elementalBurst: number
}

export type TrackProgression = {
  level: { current: number; target: number | null }
  ascension: { current: number; target: number | null }
  normalAttack: { current: number; target: number | null }
  elementalSkill: { current: number; target: number | null }
  elementalBurst: { current: number; target: number | null }
}

export type CharacterNameWithProgression = {
  name: Name
  progression: Progression
}

export type CharacterWithProgression = Character & {
  progression: Progression
}
