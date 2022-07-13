import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as DB from '~/db.server'
import type * as ItemData from './items'

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
  'Samachurl Scrolls': [
    'Divining Scroll',
    'Sealed Scroll',
    'Forbidden Curse Scroll',
  ],
  'Hilichurl Arrowheads': [
    'Firm Arrowhead',
    'Sharp Arrowhead',
    'Weathered Arrowhead',
  ],
  'Fatui Insignia': [
    "Recruit's Insignia",
    "Sergeant's Insignia",
    "Lieutenant's Insignia",
  ],
  'Treasure Hoarder Insignias': [
    'Treasure Hoarder Insignia',
    'Silver Raven Insignia',
    'Golden Raven Insignia',
  ],
  'Whopperflower Nectar': [
    'Whopperflower Nectar',
    'Shimmering Nectar',
    'Energy Nectar',
  ],
  'Nobushi Handguards': [
    'Old Handguard',
    'Kageuchi Handguard',
    'Famed Handguard',
  ],
  'Spectral Cores': ['Spectral Husk', 'Spectral Heart', 'Spectral Nucleus'],
  'Fungal Spore Powder': [
    'Fungal Spores',
    'Luminescent Pollen',
    'Crystalline Cyst Dust',
  ],
}

export interface Character {
  name: string
  weapon: DB.Weapon
  vision: DB.Vision
  rarity: 4 | 5
  talent: [string, string, string]
  progression?: {
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }
}

const characters: Character[] = [
  {
    name: 'Albedo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: [
      'Favonius Bladework - Weiss',
      'Abiogenesis: Solar Isotoma',
      'Rite of Progeniture: Tectonic Tide',
    ],
  },
  {
    name: 'Aloy',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: ['Rapid Fire', 'Frozen Wilds', 'Prophecies of Dawn'],
  },
  {
    name: 'Amber',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Sharpshooter', 'Explosive Puppet', 'Fiery Rain'],
  },
  {
    name: 'Arataki Itto',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: [
      'Fight Club Legend',
      'Masatsu Zetsugi: Akaushi Burst!',
      'Royal Descent: Behold, Itto the Evil!',
    ],
  },
  {
    name: 'Barbara',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 4,
    talent: ['Whisper of Water', 'Let the Show Begin♪', 'Shining Miracle♪'],
  },
  {
    name: 'Beidou',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Oceanborne', 'Tidecaller', 'Stormbreaker'],
  },
  {
    name: 'Bennett',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Strike of Fortune', 'Passion Overload', 'Fantastic Voyage'],
  },
  {
    name: 'Chongyun',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: [
      'Demonbane',
      "Spirit Blade: Chonghua's Layered Frost",
      'Spirit Blade: Cloud-Parting Star',
    ],
  },
  {
    name: 'Diluc',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: ['Tempered Sword', 'Searing Onslaught', 'Dawn'],
  },
  {
    name: 'Diona',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: ['Kätzlein Style', 'Icy Paws', 'Signature Mix'],
  },
  {
    name: 'Eula',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Favonius Bladework - Edel',
      'Icetide Vortex',
      'Glacial Illumination',
    ],
  },
  {
    name: 'Fischl',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Bolts of Downfall', 'Nightrider', 'Midnight Phantasmagoria'],
  },
  {
    name: 'Ganyu',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: ['Liutian Archery', 'Trail of the Qilin', 'Celestial Shower'],
  },
  {
    name: 'Gorou',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: [
      'Ripping Fang Fletching',
      'Inuzaka All-Round Defense',
      'Juuga: Forward Unto Victory',
    ],
  },
  {
    name: 'Hu Tao',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: [
      'Secret Spear of Wangsheng',
      'Guide to Afterlife',
      'Spirit Soother',
    ],
  },
  {
    name: 'Jean',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: ['Favonius Bladework', 'Gale Blade', 'Dandelion Breeze'],
  },
  {
    name: 'Kaedehara Kazuha',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: ['Garyuu Bladework', 'Chihayaburu', 'Kazuha Slash'],
  },
  {
    name: 'Kaeya',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: ['Ceremonial Bladework', 'Frostgnaw', 'Glacial Waltz'],
  },
  {
    name: 'Kamisato Ayaka',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Kamisato Art - Kabuki',
      'Kamisato Art: Hyouka',
      'Kamisato Art: Soumetsu',
    ],
  },
  {
    name: 'Kamisato Ayato',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Kamisato Art - Marobashi',
      'Kamisato Art: Kyouka',
      'Kamisato Art: Suiyuu',
    ],
  },
  {
    name: 'Keqing',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: ['Yunlai Swordsmanship', 'Stellar Restoration', 'Starward Sword'],
  },
  {
    name: 'Klee',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: ['Kaboom!', 'Jumpy Dumpty', "Sparks 'n' Splash"],
  },
  {
    name: 'Kujou Sara',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: [
      'Tengu Bowmanship',
      'Tengu Stormcall',
      'Subjugation: Koukou Sendou',
    ],
  },
  {
    name: 'Kuki Shinobu',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: [
      "Shinobu's Shadowsword",
      'Sanctifying Ring',
      'Gyoei Narukami Kariyama Rite',
    ],
  },
  {
    name: 'Lisa',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Lightning Touch', 'Violet Arc', 'Lightning Rose'],
  },
  {
    name: 'Mona',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Ripple of Fate',
      'Mirror Reflection of Doom',
      'Stellaris Phantasm',
    ],
  },
  {
    name: 'Ningguang',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: ['Sparkling Scatter', 'Jade Screen', 'Starshatter'],
  },
  {
    name: 'Noelle',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: ['Favonius Bladework - Maid', 'Breastplate', 'Sweeping Time'],
  },
  {
    name: 'Qiqi',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Ancient Sword Art',
      'Adeptus Art: Herald of Frost',
      'Adeptus Art: Preserver of Fortune',
    ],
  },
  {
    name: 'Raiden Shogun',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: [
      'Origin',
      'Transcendence: Baleful Omen',
      'Secret Art: Musou Shinsetsu',
    ],
  },
  {
    name: 'Razor',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Steel Fang', 'Claw and Thunder', 'Lightning Fang'],
  },
  {
    name: 'Rosaria',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: [
      'Spear of the Church',
      'Ravaging Confession',
      'Rites of Termination',
    ],
  },
  {
    name: 'Sangonomiya Kokomi',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: ['The Shape of Water', "Kurage's Oath", "Nereid's Ascension"],
  },
  {
    name: 'Sayu',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ANEMO,
    rarity: 4,
    talent: [
      'Shuumatsuban Ninja Blade',
      'Yoohoo Art: Fuuin Dash',
      'Yoohoo Art: Mujina Flurry',
    ],
  },
  {
    name: 'Shenhe',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Dawnstar Piercer',
      'Spring Spirit Summoning',
      "Divine Maiden's Deliverance",
    ],
  },
  {
    name: 'Shikanoin Heizou',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ANEMO,
    rarity: 4,
    talent: [
      'Fudou Style Martial Arts',
      'Heartstopper Strike',
      'Windmuster Kick',
    ],
  },
  {
    name: 'Sucrose',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ANEMO,
    rarity: 4,
    talent: [
      'Wind Spirit Creation',
      'Astable Anemohypostasis Creation - 6308',
      'Forbidden Creation - Isomer 75 / Type II',
    ],
  },
  {
    name: 'Tartaglia',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Cutting Torrent',
      'Foul Legacy: Raging Tide',
      'Havoc: Obliteration',
    ],
  },
  {
    name: 'Thoma',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Swiftshatter Spear', 'Blazing Blessing', 'Crimson Ooyoroi'],
  },
  {
    name: 'Traveler Anemo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Palm Vortex', 'Gust Surge'],
  },
  {
    name: 'Traveler Geo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Starfell Sword', 'Wake of Earth'],
  },
  {
    name: 'Traveler Electro',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Lightning Blade', 'Bellowing Thunder'],
  },
  {
    name: 'Venti',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: ['Divine Marksmanship', 'Skyward Sonnet', "Wind's Grand Ode"],
  },
  {
    name: 'Xiangling',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Dough-Fu', 'Guoba Attack', 'Pyronado'],
  },
  {
    name: 'Xiao',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: [
      'Whirlwind Thrust',
      'Lemniscatic Wind Cycling',
      'Bane of All Evil',
    ],
  },
  {
    name: 'Xingqiu',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.HYDRO,
    rarity: 4,
    talent: [
      'Guhua Style',
      'Guhua Sword: Fatal Rainscreen',
      'Guhua Sword: Raincutter',
    ],
  },
  {
    name: 'Xinyan',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Dance on Fire', 'Sweeping Fervor', 'Riff Revolution'],
  },
  {
    name: 'Yae Miko',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: [
      'Spiritfox Sin-Eater',
      'Yakan Evocation: Sesshou Sakura',
      'Great Secret Art: Tenko Kenshin',
    ],
  },
  {
    name: 'Yanfei',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Seal of Approval', 'Signed Edict', 'Done Deal'],
  },
  {
    name: 'Yelan',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: ['Stealthy Bowshot', 'Lingering Lifeline', 'Depth-Clarion Dice'],
  },
  {
    name: 'Yoimiya',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: ['Firework Flare-Up', 'Niwabi Fire-Dance', 'Ryuukin Saxifrage'],
  },
  {
    name: 'Yun Jin',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: [
      'Cloud-Grazing Strike',
      'Opening Flourish',
      "Cliffbreaker's Banner",
    ],
  },
  {
    name: 'Zhongli',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: ['Rain of Stone', 'Dominus Lapidis', 'Planet Befall'],
  },
]

export function getCharacters(
  userCharacters: Omit<DB.UserCharacter, 'id' | 'ownerId'>[]
) {
  const updatedCharacters = [...characters]

  userCharacters.forEach((character) => {
    const { characterName, ...progression } = character
    const idx = updatedCharacters.findIndex((c) => c.name === characterName)
    if (idx !== -1) updatedCharacters[idx].progression = progression
  })

  return updatedCharacters
}

export function getCharactersProgression(
  userCharacters: Omit<DB.UserCharacter, 'id' | 'ownerId'>[]
) {
  const defaultProgression: Character['progression'] = {
    level: 1,
    ascension: 0,
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  }
  return characters.map((character) => {
    const userCharacter = userCharacters.find(
      (c) => c.characterName === character.name
    )
    return {
      name: character.name,
      progression: userCharacter
        ? {
            level: userCharacter.level,
            ascension: userCharacter.ascension,
            normalAttack: userCharacter.normalAttack,
            elementalSkill: userCharacter.elementalSkill,
            elementalBurst: userCharacter.elementalBurst,
          }
        : defaultProgression,
    }
  })
}

export function validateCharacter(name: string) {
  return characters.findIndex((c) => c.name === name) !== -1
}

export function getCharacter({
  name,
  progression,
}: {
  name: string
  progression: Omit<DB.UserCharacter, 'id' | 'ownerId' | 'characterName'> | null
}) {
  const character = characters.find((character) => character.name === name)
  invariant(character, 'Character not found')

  if (!progression) return character
  return { ...character, progression }
}

interface AscensionMaterial {
  gem: string
  boss?: string
  local: string
  common: string[]
}
interface TalentMaterial {
  book: string[]
  boss: string
  common: string[]
  special: string
}

interface CharacterMaterial {
  name: string
  ascension: AscensionMaterial
  talent: TalentMaterial | TalentMaterial[]
}

const characterMaterial: CharacterMaterial[] = [
  {
    name: 'Albedo',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Basalt Pillar',
      local: 'Cecilia',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Tusk of Monoceros Caeli',
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Aloy',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Crystalline Bloom',
      local: 'Crystal Marrow',
      common: commonMaterials['Spectral Cores'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Molten Moment',
      common: commonMaterials['Spectral Cores'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Amber',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Small Lamp Grass',
      common: commonMaterials['Hilichurl Arrowheads'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: "Dvalin's Sigh",
      common: commonMaterials['Hilichurl Arrowheads'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Arataki Itto',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Riftborn Regalia',
      local: 'Onikabuto',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: [
        'Teachings of Elegance',
        'Guide to Elegance',
        'Philosophies of Elegance',
      ],
      boss: 'Ashen Heart',
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Barbara',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Cleansing Heart',
      local: 'Philanemo Mushroom',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Ring of Boreas',
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Beidou',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Lightning Prism',
      local: 'Noctilucous Jade',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
      boss: "Dvalin's Sigh",
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Bennett',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Windwheel Aster',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dvalin's Plume",
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Chongyun',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Cor Lapis',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: "Dvalin's Sigh",
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Diluc',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Small Lamp Grass',
      common: commonMaterials['Fatui Insignia'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dvalin's Plume",
      common: commonMaterials['Fatui Insignia'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Diona',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Calla Lily',
      common: commonMaterials['Hilichurl Arrowheads'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Shard of a Foul Legacy',
      common: commonMaterials['Hilichurl Arrowheads'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Eula',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Crystalline Bloom',
      local: 'Dandelion Seed',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dragon Lord's Crown",
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Fischl',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Lightning Prism',
      local: 'Small Lamp Grass',
      common: commonMaterials['Hilichurl Arrowheads'],
    },
    talent: {
      book: [
        'Teachings of Ballad',
        'Guide to Ballad',
        'Philosophies of Ballad',
      ],
      boss: 'Spirit Locket of Boreas',
      common: commonMaterials['Hilichurl Arrowheads'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Ganyu',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Qingxin',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: 'Shadow of the Warrior',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Gorou',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Perpetual Heart',
      local: 'Sango Pearl',
      common: commonMaterials['Spectral Cores'],
    },
    talent: {
      book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
      boss: 'Molten Moment',
      common: commonMaterials['Spectral Cores'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Hu Tao',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Juvenile Jade',
      local: 'Silk Flower',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: 'Shard of a Foul Legacy',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Jean',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Hurricane Seed',
      local: 'Dandelion Seed',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dvalin's Plume",
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kaedehara Kazuha',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Marionette Core',
      local: 'Sea Ganoderma',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: 'Gilded Scale',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kaeya',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Calla Lily',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Ballad',
        'Guide to Ballad',
        'Philosophies of Ballad',
      ],
      boss: 'Spirit Locket of Boreas',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kamisato Ayaka',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Perpetual Heart',
      local: 'Sakura Bloom',
      common: commonMaterials['Nobushi Handguards'],
    },
    talent: {
      book: [
        'Teachings of Elegance',
        'Guide to Elegance',
        'Philosophies of Elegance',
      ],
      boss: 'Bloodjade Branch',
      common: commonMaterials['Nobushi Handguards'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kamisato Ayato',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Dew of Repudiation',
      local: 'Sakura Bloom',
      common: commonMaterials['Nobushi Handguards'],
    },
    talent: {
      book: [
        'Teachings of Elegance',
        'Guide to Elegance',
        'Philosophies of Elegance',
      ],
      boss: 'Mudra of the Malefic General',
      common: commonMaterials['Nobushi Handguards'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Keqing',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Lightning Prism',
      local: 'Cor Lapis',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Ring of Boreas',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Klee',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Philanemo Mushroom',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Ring of Boreas',
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kujou Sara',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Storm Beads',
      local: 'Dendrobium',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Elegance',
        'Guide to Elegance',
        'Philosophies of Elegance',
      ],
      boss: 'Ashen Heart',
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Kuki Shinobu',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Runic Fang',
      local: 'Naku Weed',
      common: commonMaterials['Spectral Cores'],
    },
    talent: {
      book: [
        'Teachings of Elegance',
        'Guide to Elegance',
        'Philosophies of Elegance',
      ],
      boss: 'Tears of the Calamitous God',
      common: commonMaterials['Spectral Cores'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Lisa',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Lightning Prism',
      local: 'Valberry',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: [
        'Teachings of Ballad',
        'Guide to Ballad',
        'Philosophies of Ballad',
      ],
      boss: "Dvalin's Claw",
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Mona',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Cleansing Heart',
      local: 'Philanemo Mushroom',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: 'Ring of Boreas',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Ningguang',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Basalt Pillar',
      local: 'Glaze Lily',
      common: commonMaterials['Fatui Insignia'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Spirit Locket of Boreas',
      common: commonMaterials['Fatui Insignia'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Noelle',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Basalt Pillar',
      local: 'Valberry',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dvalin's Claw",
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Qiqi',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Violetgrass',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Tail of Boreas',
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Raiden Shogun',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Storm Beads',
      local: 'Amakumo Fruit',
      common: commonMaterials['Nobushi Handguards'],
    },
    talent: {
      book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
      boss: 'Molten Moment',
      common: commonMaterials['Nobushi Handguards'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Razor',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: 'Lightning Prism',
      local: 'Wolfhook',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Resistance',
        'Guide to Resistance',
        'Philosophies of Resistance',
      ],
      boss: "Dvalin's Claw",
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Rosaria',
    ascension: {
      gem: 'Shivada Jade',
      boss: 'Hoarfrost Core',
      local: 'Valberry',
      common: commonMaterials['Fatui Insignia'],
    },
    talent: {
      book: [
        'Teachings of Ballad',
        'Guide to Ballad',
        'Philosophies of Ballad',
      ],
      boss: 'Shadow of the Warrior',
      common: commonMaterials['Fatui Insignia'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Sangonomiya Kokomi',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Dew of Repudiation',
      local: 'Sango Pearl',
      common: commonMaterials['Spectral Cores'],
    },
    talent: {
      book: [
        'Teachings of Transience',
        'Guide to Transience',
        'Philosophies of Transience',
      ],
      boss: 'Hellfire Butterfly',
      common: commonMaterials['Spectral Cores'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Sayu',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Marionette Core',
      local: 'Crystal Marrow',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
      boss: 'Gilded Scale',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Shenhe',
    ascension: {
      gem: 'Shivada Jade',
      boss: "Dragonheir's False Fin",
      local: 'Qingxin',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Hellfire Butterfly',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Shikanoin Heizou',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Runic Fang',
      local: 'Onikabuto',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Transience',
        'Guide to Transience',
        'Philosophies of Transience',
      ],
      boss: 'Hellfire Butterfly',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Sucrose',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Hurricane Seed',
      local: 'Windwheel Aster',
      common: commonMaterials['Whopperflower Nectar'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Spirit Locket of Boreas',
      common: commonMaterials['Whopperflower Nectar'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Tartaglia',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Cleansing Heart',
      local: 'Starconch',
      common: commonMaterials['Fatui Insignia'],
    },
    talent: {
      book: [
        'Teachings of Freedom',
        'Guide to Freedom',
        'Philosophies of Freedom',
      ],
      boss: 'Shard of a Foul Legacy',
      common: commonMaterials['Fatui Insignia'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Thoma',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Smoldering Pearl',
      local: 'Fluorescent Fungus',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Transience',
        'Guide to Transience',
        'Philosophies of Transience',
      ],
      boss: 'The Meaning of Aeons',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Traveler Anemo',
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
    name: 'Traveler Geo',
    ascension: {
      gem: 'Brilliant Diamond',
      local: 'Windwheel Aster',
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
    ],
  },
  {
    name: 'Traveler Electro',
    ascension: {
      gem: 'Brilliant Diamond',
      local: 'Windwheel Aster',
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
  {
    name: 'Venti',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Hurricane Seed',
      local: 'Qingxin',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: [
        'Teachings of Ballad',
        'Guide to Ballad',
        'Philosophies of Ballad',
      ],
      boss: 'Tail of Boreas',
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Xiangling',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Jueyun Chili',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: "Dvalin's Claw",
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Xiao',
    ascension: {
      gem: 'Vayuda Turquoise',
      boss: 'Juvenile Jade',
      local: 'Qingxin',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Shadow of the Warrior',
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Xingqiu',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Cleansing Heart',
      local: 'Silk Flower',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
      boss: 'Tail of Boreas',
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Xinyan',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Everflame Seed',
      local: 'Violetgrass',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
      boss: 'Tusk of Monoceros Caeli',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Yae Miko',
    ascension: {
      gem: 'Vajrada Amethyst',
      boss: "Dragonheir's False Fin",
      local: 'Sea Ganoderma',
      common: commonMaterials['Nobushi Handguards'],
    },
    talent: {
      book: ['Teachings of Light', 'Guide to Light', 'Philosophies of Light'],
      boss: 'The Meaning of Aeons',
      common: commonMaterials['Nobushi Handguards'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Yanfei',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Juvenile Jade',
      local: 'Noctilucous Jade',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
      boss: 'Bloodjade Branch',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Yelan',
    ascension: {
      gem: 'Varunada Lazurite',
      boss: 'Runic Fang',
      local: 'Starconch',
      common: commonMaterials['Treasure Hoarder Insignias'],
    },
    talent: {
      book: [
        'Teachings of Prosperity',
        'Guide to Prosperity',
        'Philosophies of Prosperity',
      ],
      boss: 'Gilded Scale',
      common: commonMaterials['Treasure Hoarder Insignias'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Yoimiya',
    ascension: {
      gem: 'Agnidus Agate',
      boss: 'Smoldering Pearl',
      local: 'Naku Weed',
      common: commonMaterials['Samachurl Scrolls'],
    },
    talent: {
      book: [
        'Teachings of Transience',
        'Guide to Transience',
        'Philosophies of Transience',
      ],
      boss: "Dragon Lord's Crown",
      common: commonMaterials['Samachurl Scrolls'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Yun Jin',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Riftborn Regalia',
      local: 'Glaze Lily',
      common: commonMaterials['Hilichurl Masks'],
    },
    talent: {
      book: [
        'Teachings of Diligence',
        'Guide to Diligence',
        'Philosophies of Diligence',
      ],
      boss: 'Ashen Heart',
      common: commonMaterials['Hilichurl Masks'],
      special: 'Crown of Insight',
    },
  },
  {
    name: 'Zhongli',
    ascension: {
      gem: 'Prithiva Topaz',
      boss: 'Basalt Pillar',
      local: 'Cor Lapis',
      common: commonMaterials['Slime'],
    },
    talent: {
      book: ['Teachings of Gold', 'Guide to Gold', 'Philosophies of Gold'],
      boss: 'Tusk of Monoceros Caeli',
      common: commonMaterials['Slime'],
      special: 'Crown of Insight',
    },
  },
]

export interface CharacterAscension {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
}

export interface CharacterTalent {
  level: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  book: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
  special?: { name: string; quantity: number }
}

export function getRequiredMaterial({ name }: { name: string }) {
  const character = characterMaterial.find(
    (character) => character.name === name
  )
  invariant(character)
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
}: CharacterMaterial['ascension']): CharacterAscension[] {
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
  { book, boss, common, special }: TalentMaterial,
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

export function validateAscensionRequirement({
  progression,
}: Pick<Character, 'progression'>) {
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

  switch (progression?.ascension ?? 0) {
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
      invariant(false, 'IMPOSSIBLE')
  }
}

export function getItemsToRetrieve(name: string) {
  const characterData = characterMaterial.find((c) => c.name === name)
  invariant(characterData)

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

export function checkAscend({
  ascension = 0,
  level = 1,
}: {
  ascension?: number
  level?: number
}) {
  if (ascension === 0)
    return { isAbleToAscend: level === 20, requiredLevel: 20 }
  if (ascension === 1)
    return { isAbleToAscend: level === 40, requiredLevel: 40 }
  if (ascension === 2)
    return { isAbleToAscend: level === 50, requiredLevel: 50 }
  if (ascension === 3)
    return { isAbleToAscend: level === 60, requiredLevel: 60 }
  if (ascension === 4)
    return { isAbleToAscend: level === 70, requiredLevel: 70 }
  if (ascension === 5)
    return { isAbleToAscend: level === 80, requiredLevel: 80 }
  // just a placeholder
  return { isAbleToAscend: true, requiredLevel: 90 }
}

export function getCharacterInventoryLevelUpData({
  name,
  progression,
  itemNames,
  userItems,
}: {
  name: string
  progression: Omit<DB.UserCharacter, 'id' | 'ownerId' | 'characterName'> | null
  itemNames: string[]
  userItems: ItemData.ItemWithQuantity[]
}) {
  const defaultProgression = {
    level: 1,
    ascension: 0,
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  }

  const { ascension, normalAttack, elementalSkill, elementalBurst } =
    progression ? progression : defaultProgression

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
  const items = userItems.filter((item) => !excludedItems.includes(item.name))

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
    const { ascensionMaterial, talentMaterial } = getRequiredMaterial({ name })
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

  function isPossibleToLevel(material?: CharacterTalent | CharacterAscension) {
    if (!material) {
      return
    }

    // https://fettblog.eu/typescript-hasownproperty/
    function hasOwnProperty<X extends {}, Y extends PropertyKey>(
      obj: X,
      prop: Y
    ): obj is X & Record<Y, unknown> {
      return obj.hasOwnProperty(prop)
    }

    let materials = [material.common]

    if (hasOwnProperty(material, 'book')) {
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

  function getCurrentItems(items: ItemData.ItemWithQuantity[]) {
    const itemSchema = Zod.array(
      Zod.object({
        name: Zod.string(),
        type: Zod.nativeEnum(DB.ItemType),
        quantity: Zod.number(),
        rarity: Zod.nativeEnum({
          a: 1,
          b: 2,
          c: 3,
          d: 4,
          e: 5,
        } as const),
      })
    ).optional()
    type ItemSchema = Zod.infer<typeof itemSchema>

    const material = getCurrentMaterial()
    let parsedAscensionMaterial: ItemSchema
    let parsedTalentNormalMaterial: ItemSchema
    let parsedTalentElSkillMaterial: ItemSchema
    let parsedTalentElBurstMaterial: ItemSchema

    if (material.ascension) {
      const ascMat = material.ascension

      let ascensionMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
        | undefined
      ascensionMaterial = [ascMat.common, ascMat.gem, ascMat.local]
      if (ascMat.boss) {
        ascensionMaterial = [...ascensionMaterial, ascMat.boss]
      }

      const tmpAscMat = ascensionMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          type: correspondingItem.type,
          rarity: correspondingItem.rarity,
        }
      })

      parsedAscensionMaterial = itemSchema.parse(tmpAscMat)
    }

    if (material.talent.normal) {
      const talNormMat = material.talent.normal

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
        | undefined
      talentMaterial = [talNormMat.common, talNormMat.book]
      if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
      if (talNormMat.special)
        talentMaterial = [...talentMaterial, talNormMat.special]

      const tmpTalentMat = talentMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          type: correspondingItem.type,
          rarity: correspondingItem.rarity,
        }
      })
      parsedTalentNormalMaterial = itemSchema.parse(tmpTalentMat)
    }

    if (material.talent.elementalSkill) {
      const talNormMat = material.talent.elementalSkill

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
        | undefined
      talentMaterial = [talNormMat.common, talNormMat.book]
      if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
      if (talNormMat.special)
        talentMaterial = [...talentMaterial, talNormMat.special]

      const tmpTalentMat = talentMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          type: correspondingItem.type,
          rarity: correspondingItem.rarity,
        }
      })
      parsedTalentElSkillMaterial = itemSchema.parse(tmpTalentMat)
    }

    if (material.talent.elementalBurst) {
      const talMat = material.talent.elementalBurst

      let talentMaterial:
        | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
        | undefined
      talentMaterial = [talMat.common, talMat.book]
      if (talMat.boss) talentMaterial = [...talentMaterial, talMat.boss]
      if (talMat.special) talentMaterial = [...talentMaterial, talMat.special]

      const tmpTalentMat = talentMaterial?.map((item) => {
        const correspondingItem = items.find((i) => i.name === item.name)
        invariant(correspondingItem)
        return {
          ...item,
          type: correspondingItem.type,
          rarity: correspondingItem.rarity,
        }
      })
      parsedTalentElBurstMaterial = itemSchema.parse(tmpTalentMat)
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
