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

export type Weapon = 'BOW' | 'CATALYST' | 'CLAYMORE' | 'POLEARM' | 'SWORD'

export type Vision =
  | 'ANEMO'
  | 'CRYO'
  | 'DENDRO'
  | 'ELECTRO'
  | 'GEO'
  | 'HYDRO'
  | 'PYRO'

export type Region =
  | 'MONDSTADT'
  | 'LIYUE'
  | 'INAZUMA'
  | 'SUMERU'
  | 'FONTAINE'
  | 'NATLAN'
  | 'SNEZHNAYA'
  | 'UNKNOWN'

export interface Character {
  name: Name
  weapon: Weapon
  vision: Vision
  region: Region
  rarity: 4 | 5
  talent: [normalAttack: string, elementalSkill: string, elementalBurst: string]
}

export interface AscensionMaterial {
  gem: ItemType.AscensionGemGroupName
  boss?: ItemType.AscensionBoss
  local: ItemType.LocalSpecialty
  common: ItemType.CommonGroup
}
export interface TalentMaterial {
  book: (
    | ItemType.TalentBookTeachings
    | ItemType.TalentBookGuide
    | ItemType.TalentBookPhilosophies
  )[]
  boss: ItemType.TalentBoss
  common: ItemType.CommonGroup
  special: 'Crown of Insight'
}

export interface ProgressionMaterial {
  name: Name
  ascension: AscensionMaterial
  talent: TalentMaterial | TalentMaterial[]
}

export interface AscensionPhase {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
}

export interface TalentPhase {
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
