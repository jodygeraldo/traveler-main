import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as DB from '~/db.server'

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
      'Normal Attack: Favonius Bladework - Weiss',
      'Abiogenesis: Solar Isotoma',
      'Rite of Progeniture: Tectonic Tide',
    ],
  },
  {
    name: 'Aloy',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: ['Normal Attack: Rapid Fire', 'Frozen Wilds', 'Prophecies of Dawn'],
  },
  {
    name: 'Amber',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Normal Attack: Sharpshooter', 'Explosive Puppet', 'Fiery Rain'],
  },
  {
    name: 'Arataki Itto',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: [
      'Normal Attack: Fight Club Legend',
      'Masatsu Zetsugi: Akaushi Burst!',
      'Royal Descent: Behold, Itto the Evil!',
    ],
  },
  {
    name: 'Barbara',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 4,
    talent: [
      'Normal Attack: Whisper of Water',
      'Let the Show Begin♪',
      'Shining Miracle♪',
    ],
  },
  {
    name: 'Beidou',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Normal Attack: Oceanborne', 'Tidecaller', 'Stormbreaker'],
  },
  {
    name: 'Bennett',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: [
      'Normal Attack: Strike of Fortune',
      'Passion Overload',
      'Fantastic Voyage',
    ],
  },
  {
    name: 'Chongyun',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: [
      'Normal Attack: Demonbane',
      "Spirit Blade: Chonghua's Layered Frost",
      'Spirit Blade: Cloud-Parting Star',
    ],
  },
  {
    name: 'Diluc',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: ['Normal Attack: Tempered Sword', 'Searing Onslaught', 'Dawn'],
  },
  {
    name: 'Diona',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: ['Normal Attack: Kätzlein Style', 'Icy Paws', 'Signature Mix'],
  },
  {
    name: 'Eula',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Normal Attack: Favonius Bladework - Edel',
      'Icetide Vortex',
      'Glacial Illumination',
    ],
  },
  {
    name: 'Fischl',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: [
      'Normal Attack: Bolts of Downfall',
      'Nightrider',
      'Midnight Phantasmagoria',
    ],
  },
  {
    name: 'Ganyu',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Normal Attack: Liutian Archery',
      'Trail of the Qilin',
      'Celestial Shower',
    ],
  },
  {
    name: 'Gorou',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: [
      'Normal Attack: Ripping Fang Fletching',
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
      'Normal Attack: Secret Spear of Wangsheng',
      'Guide to Afterlife',
      'Spirit Soother',
    ],
  },
  {
    name: 'Jean',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: [
      'Normal Attack: Favonius Bladework',
      'Gale Blade',
      'Dandelion Breeze',
    ],
  },
  {
    name: 'Kaedehara Kazuha',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: ['Normal Attack: Garyuu Bladework', 'Chihayaburu', 'Kazuha Slash'],
  },
  {
    name: 'Kaeya',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: [
      'Normal Attack: Ceremonial Bladework',
      'Frostgnaw',
      'Glacial Waltz',
    ],
  },
  {
    name: 'Kamisato Ayaka',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Normal Attack: Kamisato Art - Kabuki',
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
      'Normal Attack: Kamisato Art - Marobashi',
      'Kamisato Art: Kyouka',
      'Kamisato Art: Suiyuu',
    ],
  },
  {
    name: 'Keqing',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: [
      'Normal Attack: Yunlai Swordsmanship',
      'Stellar Restoration',
      'Starward Sword',
    ],
  },
  {
    name: 'Klee',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: ['Normal Attack: Kaboom!', 'Jumpy Dumpty', "Sparks 'n' Splash"],
  },
  {
    name: 'Kujou Sara',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: [
      'Normal Attack: Tengu Bowmanship',
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
      "Normal Attack: Shinobu's Shadowsword",
      'Sanctifying Ring',
      'Gyoei Narukami Kariyama Rite',
    ],
  },
  {
    name: 'Lisa',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Normal Attack: Lightning Touch', 'Violet Arc', 'Lightning Rose'],
  },
  {
    name: 'Mona',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Normal Attack: Ripple of Fate',
      'Mirror Reflection of Doom',
      'Stellaris Phantasm',
    ],
  },
  {
    name: 'Ningguang',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: ['Normal Attack: Sparkling Scatter', 'Jade Screen', 'Starshatter'],
  },
  {
    name: 'Noelle',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: [
      'Normal Attack: Favonius Bladework - Maid',
      'Breastplate',
      'Sweeping Time',
    ],
  },
  {
    name: 'Qiqi',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    rarity: 5,
    talent: [
      'Normal Attack: Ancient Sword Art',
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
      'Normal Attack: Origin',
      'Transcendence: Baleful Omen',
      'Secret Art: Musou Shinsetsu',
    ],
  },
  {
    name: 'Razor',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ELECTRO,
    rarity: 4,
    talent: ['Normal Attack: Steel Fang', 'Claw and Thunder', 'Lightning Fang'],
  },
  {
    name: 'Rosaria',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.CRYO,
    rarity: 4,
    talent: [
      'Normal Attack: Spear of the Church',
      'Ravaging Confession',
      'Rites of Termination',
    ],
  },
  {
    name: 'Sangonomiya Kokomi',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Normal Attack: The Shape of Water',
      "Kurage's Oath",
      "Nereid's Ascension",
    ],
  },
  {
    name: 'Sayu',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ANEMO,
    rarity: 4,
    talent: [
      'Normal Attack: Shuumatsuban Ninja Blade',
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
      'Normal Attack: Dawnstar Piercer',
      'Spring Spirit Summoning',
      "Divine Maiden's Deliverance",
    ],
  },
  {
    name: 'Sucrose',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ANEMO,
    rarity: 4,
    talent: [
      'Normal Attack: Wind Spirit Creation',
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
      'Normal Attack: Cutting Torrent',
      'Foul Legacy: Raging Tide',
      'Havoc: Obliteration',
    ],
  },
  {
    name: 'Thoma',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: [
      'Normal Attack: Swiftshatter Spear',
      'Blazing Blessing',
      'Crimson Ooyoroi',
    ],
  },
  {
    name: 'Traveler Anemo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: [
      'Normal Attack: Foreign Thundershock',
      'Palm Vortex',
      'Gust Surge',
    ],
  },
  {
    name: 'Traveler Geo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: [
      'Normal Attack: Foreign Thundershock',
      'Starfell Sword',
      'Wake of Earth',
    ],
  },
  {
    name: 'Traveler Electro',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: [
      'Normal Attack: Foreign Thundershock',
      'Lightning Blade',
      'Bellowing Thunder',
    ],
  },
  {
    name: 'Venti',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: [
      'Normal Attack: Divine Marksmanship',
      'Skyward Sonnet',
      "Wind's Grand Ode",
    ],
  },
  {
    name: 'Xiangling',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Normal Attack: Dough-Fu', 'Guoba Attack', 'Pyronado'],
  },
  {
    name: 'Xiao',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.ANEMO,
    rarity: 5,
    talent: [
      'Normal Attack: Whirlwind Thrust',
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
      'Normal Attack: Guhua Style',
      'Guhua Sword: Fatal Rainscreen',
      'Guhua Sword: Raincutter',
    ],
  },
  {
    name: 'Xinyan',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: [
      'Normal Attack: Dance on Fire',
      'Sweeping Fervor',
      'Riff Revolution',
    ],
  },
  {
    name: 'Yae Miko',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ELECTRO,
    rarity: 5,
    talent: [
      'Normal Attack: Spiritfox Sin-Eater',
      'Yakan Evocation: Sesshou Sakura',
      'Great Secret Art: Tenko Kenshin',
    ],
  },
  {
    name: 'Yanfei',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.PYRO,
    rarity: 4,
    talent: ['Normal Attack: Seal of Approval', 'Signed Edict', 'Done Deal'],
  },
  {
    name: 'Yelan',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.HYDRO,
    rarity: 5,
    talent: [
      'Normal Attack: Stealthy Bowshot',
      'Lingering Lifeline',
      'Depth-Clarion Dice',
    ],
  },
  {
    name: 'Yoimiya',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    rarity: 5,
    talent: [
      'Normal Attack: Firework Flare-Up',
      'Niwabi Fire-Dance',
      'Ryuukin Saxifrage',
    ],
  },
  {
    name: 'Yun Jin',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.GEO,
    rarity: 4,
    talent: [
      'Normal Attack: Cloud-Grazing Strike',
      'Opening Flourish',
      "Cliffbreaker's Banner",
    ],
  },
  {
    name: 'Zhongli',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.GEO,
    rarity: 5,
    talent: [
      'Normal Attack: Rain of Stone',
      'Dominus Lapidis',
      'Planet Befall',
    ],
  },
]

export function getCharacters(userCharacters: DB.UserCharacter[]) {
  const updatedCharacters = [...characters]

  userCharacters.forEach((character) => {
    const { id, ownerId, characterName, ...progression } = character
    const idx = updatedCharacters.findIndex((c) => c.name === characterName)
    if (idx !== -1) updatedCharacters[idx].progression = progression
  })

  return updatedCharacters
}

export function validateCharacter(name: string) {
  return characters.findIndex((c) => c.name === name) !== -1
}

export function getCharacter({
  name,
  userCharacter,
}: {
  name: string
  userCharacter: DB.UserCharacter | null
}): Character {
  const character = characters.find((character) => character.name === name)
  invariant(character, 'Character not found')

  if (!userCharacter) return character
  const { id, ownerId, characterName, ...progression } = userCharacter
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
      boss: 'Hellfire Butterfly',
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

// interface ItemsToRetrieve {
//   ascension: {
//     baseCommon: string[]
//     ascensionGem: string[]
//     ascensionBoss: string | undefined
//     localSpecialty: string
//   }
//   talent: {
//     talentCommon: string[]
//     talentBook: string[]
//     talentBoss: string[]
//     special: string
//   }
// }

// export function getItemsToRetrieve({
//   name,
// }: {
//   name: string
// }): ItemsToRetrieve | undefined {
//   const characterData = characterMaterial.find((c) => c.name === name)
//   if (!characterData) {
//     return
//   }

//   const { ascension, talent } = characterData

//   function getAscensionGems(name: string) {
//     return [
//       `${name} Sliver`,
//       `${name} Fragment`,
//       `${name} Chunk`,
//       `${name} Gemstone`,
//     ]
//   }

//   const ascensionMaterial = {
//     baseCommon: ascension.common,
//     ascensionGem: getAscensionGems(ascension.gem),
//     ascensionBoss: ascension.boss,
//     localSpecialty: ascension.local,
//   }

//   const talentMaterial = {
//     talentCommon: Array.isArray(talent)
//       ? talent.reduce((prev, cur) => [...prev, ...cur.common], [] as string[])
//       : talent.common,
//     talentBook: Array.isArray(talent)
//       ? talent.reduce((prev, cur) => [...prev, ...cur.book], [] as string[])
//       : talent.book,
//     talentBoss: Array.isArray(talent)
//       ? talent.reduce((prev, cur) => [...prev, cur.boss], [] as string[])
//       : [talent.boss],
//     special: 'Crown of Insight',
//   }

//   return {
//     ascension: ascensionMaterial,
//     talent: talentMaterial,
//   }
// }

// export function getCharacterInventoryLevelUpData({
//   name,
//   characterData,
//   material,
//   requiredItems,
// }: {
//   name: string
//   characterData: CharacterModel.CharacterInfer
//   material: ItemsToRetrieve
//   requiredItems: InventoryModel.RequiredItemsInfer
// }) {
//   const { ascensionMaterial, talentMaterial } = getRequiredMaterial({ name })

//   const {
//     level: characterLevel,
//     ascension,
//     ...talent
//   }: Omit<CharacterProgression, 'name'> = characterData
//     ? {
//         level: characterData['@level'] ?? 1,
//         ascension: characterData['@ascension'] ?? 0,
//         normalAttack: characterData['@normal_attack'] ?? 1,
//         elementalSkill: characterData['@elemental_skill'] ?? 1,
//         elementalBurst: characterData['@elemental_burst'] ?? 1,
//       }
//     : {
//         level: 1,
//         ascension: 0,
//         normalAttack: 1,
//         elementalSkill: 1,
//         elementalBurst: 1,
//       }

//   const levelUnlocked = [
//     { from: 20, to: 40 },
//     { from: 40, to: 50 },
//     { from: 50, to: 60 },
//     { from: 60, to: 70 },
//     { from: 70, to: 80 },
//     { from: 80, to: 90 },
//     { from: 9999, to: 9999 },
//   ]
//   const talentUnlocked = [
//     { from: 1, to: 1 },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { from: 4, to: 6 },
//     { from: 6, to: 8 },
//     { from: 8, to: 10 },
//     { from: 9999, to: 9999 },
//   ]

//   const unlockable = {
//     level: levelUnlocked[ascension],
//     talent: talentUnlocked[ascension],
//   }

//   function getCurrentMaterial({
//     ascension,
//     talent,
//     skipTalentIfHigherOrEqualThan = 0,
//   }: {
//     ascension: number
//     talent?: {
//       normalAttack: number
//       elementalSkill: number
//       elementalBurst: number
//     }
//     skipTalentIfHigherOrEqualThan?: number
//   }) {
//     const curAscensionMaterial = ascensionMaterial.at(ascension)

//     if (!talent) {
//       return {
//         ascension: curAscensionMaterial,
//         talent: {
//           normal: undefined,
//           elementalSkill: undefined,
//           elementalBurst: undefined,
//         },
//       }
//     }

//     const { normalAttack, elementalSkill, elementalBurst } = talent

//     const curTalentNormalMaterial =
//       normalAttack >= skipTalentIfHigherOrEqualThan
//         ? undefined
//         : Array.isArray(talentMaterial)
//         ? talentMaterial.at(normalAttack - 1)
//         : talentMaterial.normal.at(normalAttack - 1)
//     const curTalentElementalSkillMaterial =
//       elementalSkill >= skipTalentIfHigherOrEqualThan
//         ? undefined
//         : Array.isArray(talentMaterial)
//         ? talentMaterial.at(elementalSkill - 1)
//         : talentMaterial.elemental.at(elementalSkill - 1)
//     const curTalentElementalBurstMaterial =
//       elementalBurst >= skipTalentIfHigherOrEqualThan
//         ? undefined
//         : Array.isArray(talentMaterial)
//         ? talentMaterial.at(elementalBurst - 1)
//         : talentMaterial.elemental.at(elementalBurst - 1)

//     return {
//       ascension: curAscensionMaterial,
//       talent: {
//         normal: curTalentNormalMaterial,
//         elementalSkill: curTalentElementalSkillMaterial,
//         elementalBurst: curTalentElementalBurstMaterial,
//       },
//     }
//   }

//   function getAscensionRequiredItems(material: ItemsToRetrieve['ascension']) {
//     const common = ItemData.getItemsInCategory({
//       category: 'common',
//       names: [...material.baseCommon],
//       items: requiredItems.common,
//     })
//     const ascensionGem = ItemData.getItemsInCategory({
//       category: 'ascension_gem',
//       names: material.ascensionGem,
//       items: requiredItems.ascension_gem,
//     })
//     const ascensionBoss = ItemData.getItemsInCategory({
//       category: 'ascension_boss',
//       names: [material.ascensionBoss ?? ''],
//       items: requiredItems.ascension_boss,
//     })
//     const localSpecialty = ItemData.getItemsInCategory({
//       category: 'local_specialty',
//       names: [material.localSpecialty],
//       items: requiredItems.local_specialty,
//     })
//     return [...common, ...ascensionGem, ...ascensionBoss, ...localSpecialty]
//   }

//   function getTalentRequiredItems(material: ItemsToRetrieve['talent']) {
//     const common = ItemData.getItemsInCategory({
//       category: 'common',
//       names: [...material.talentCommon],
//       items: requiredItems.common,
//     })
//     const talentBook = ItemData.getItemsInCategory({
//       category: 'talent_book',
//       names: material.talentBook,
//       items: requiredItems.talent_book,
//     })
//     const talentBoss = ItemData.getItemsInCategory({
//       category: 'talent_boss',
//       names: material.talentBoss,
//       items: requiredItems.talent_boss,
//     })
//     const special = ItemData.getItemsInCategory({
//       category: 'special',
//       names: [material.special],
//       items: requiredItems.special,
//     })
//     return [...common, ...talentBook, ...talentBoss, ...special]
//   }

//   function isEqual({
//     value,
//     on,
//   }: {
//     value: number
//     on: 'all' | 'normal' | 'elemental'
//   }) {
//     const { normalAttack, elementalSkill, elementalBurst } = talent

//     let talentArray = [normalAttack, elementalSkill, elementalBurst]
//     if (on === 'normal') talentArray = [normalAttack]
//     if (on === 'elemental') talentArray = [elementalSkill, elementalBurst]

//     return talentArray.every((v) => v === value)
//   }

//   function getNumberToSlice({
//     on,
//     op,
//     value,
//     expect,
//   }: {
//     on: 'all' | 'normal' | 'elemental'
//     op: '>=' | '==='
//     value: number[]
//     expect: number[]
//   }) {
//     const { normalAttack, elementalSkill, elementalBurst } = talent

//     let talentArray = [normalAttack, elementalSkill, elementalBurst]
//     if (on === 'normal') talentArray = [normalAttack]
//     if (on === 'elemental') talentArray = [elementalSkill, elementalBurst]

//     let numberToSlice = 0
//     value.every((num, i) => {
//       const tmp = talentArray.every((v) => {
//         if (op === '>=') return v >= num
//         if (op === '===') return v === num
//         return false
//       })

//       if (tmp) {
//         numberToSlice = expect[i]
//         return false
//       }

//       return true
//     })

//     return numberToSlice
//   }

//   function isPossibleToLevel({
//     inventory,
//     material,
//   }: {
//     inventory: ReturnType<typeof getTalentRequiredItems>
//     material?: CharacterTalent | CharacterAscension
//   }) {
//     if (!material) {
//       return
//     }

//     // https://fettblog.eu/typescript-hasownproperty/
//     function hasOwnProperty<X extends {}, Y extends PropertyKey>(
//       obj: X,
//       prop: Y
//     ): obj is X & Record<Y, unknown> {
//       return obj.hasOwnProperty(prop)
//     }

//     let materials = [material.common]

//     if (hasOwnProperty(material, 'book')) {
//       materials = [...materials, material.book]
//       if (material.boss) materials = [...materials, material.boss]
//       if (material.special) materials = [...materials, material.special]
//     } else {
//       materials = [...materials, material.gem, material.local]
//       if (material.boss) materials = [...materials, material.boss]
//     }

//     return materials.every((material) => {
//       const tmp = inventory.find((i) => i.name === material.name)
//       if (!tmp) return false
//       if (tmp.quantity < material.quantity) return false
//       return true
//     })
//   }

//   const itemSchema = Zod.array(
//     Zod.object({
//       name: Zod.string(),
//       quantity: Zod.number(),
//       rarity: Zod.nativeEnum({
//         a: 1,
//         b: 2,
//         c: 3,
//         d: 4,
//         e: 5,
//       } as const),
//     })
//   ).optional()
//   type ItemSchema = Zod.infer<typeof itemSchema>

//   function getCurrentItems(
//     currentMaterial: ReturnType<typeof getCurrentMaterial>,
//     items: {
//       quantity: number
//       name: string
//       rarity: 1 | 2 | 3 | 4 | 5
//     }[]
//   ) {
//     let parsedAscensionMaterial: ItemSchema
//     let parsedTalentNormalMaterial: ItemSchema
//     let parsedTalentElSkillMaterial: ItemSchema
//     let parsedTalentElBurstMaterial: ItemSchema

//     if (currentMaterial.ascension) {
//       const ascMat = currentMaterial.ascension

//       let ascensionMaterial:
//         | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
//         | undefined
//       ascensionMaterial = [ascMat.common, ascMat.gem, ascMat.local]
//       if (ascMat.boss) {
//         ascensionMaterial = [...ascensionMaterial, ascMat.boss]
//       }

//       const tmpAscMat = ascensionMaterial?.map((item) => {
//         const tmp = items.find((i) => i.name === item.name)
//         return {
//           ...item,
//           rarity: tmp ? tmp.rarity : 1,
//         }
//       })

//       parsedAscensionMaterial = itemSchema.parse(tmpAscMat)
//     }

//     if (currentMaterial.talent.normal) {
//       const talNormMat = currentMaterial.talent.normal

//       let talentMaterial:
//         | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
//         | undefined
//       talentMaterial = [talNormMat.common, talNormMat.book]
//       if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
//       if (talNormMat.special)
//         talentMaterial = [...talentMaterial, talNormMat.special]

//       const tmpTalentMat = talentMaterial?.map((item) => {
//         const tmp = items.find((i) => i.name === item.name)
//         return {
//           ...item,
//           rarity: tmp ? tmp.rarity : 1,
//         }
//       })
//       parsedTalentNormalMaterial = itemSchema.parse(tmpTalentMat)
//     }

//     if (currentMaterial.talent.elementalSkill) {
//       const talNormMat = currentMaterial.talent.elementalSkill

//       let talentMaterial:
//         | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
//         | undefined
//       talentMaterial = [talNormMat.common, talNormMat.book]
//       if (talNormMat.boss) talentMaterial = [...talentMaterial, talNormMat.boss]
//       if (talNormMat.special)
//         talentMaterial = [...talentMaterial, talNormMat.special]

//       const tmpTalentMat = talentMaterial?.map((item) => {
//         const tmp = items.find((i) => i.name === item.name)
//         return {
//           ...item,
//           rarity: tmp ? tmp.rarity : 1,
//         }
//       })
//       parsedTalentElSkillMaterial = itemSchema.parse(tmpTalentMat)
//     }

//     if (currentMaterial.talent.elementalBurst) {
//       const talMat = currentMaterial.talent.elementalBurst

//       let talentMaterial:
//         | { name: string; quantity: number; rarity?: 1 | 2 | 3 | 4 | 5 }[]
//         | undefined
//       talentMaterial = [talMat.common, talMat.book]
//       if (talMat.boss) talentMaterial = [...talentMaterial, talMat.boss]
//       if (talMat.special) talentMaterial = [...talentMaterial, talMat.special]

//       const tmpTalentMat = talentMaterial?.map((item) => {
//         const tmp = items.find((i) => i.name === item.name)
//         return {
//           ...item,
//           rarity: tmp ? tmp.rarity : 1,
//         }
//       })
//       parsedTalentElBurstMaterial = itemSchema.parse(tmpTalentMat)
//     }

//     return {
//       ascension: parsedAscensionMaterial,
//       talent: {
//         normal: parsedTalentNormalMaterial,
//         elementalSkill: parsedTalentElSkillMaterial,
//         elementalBurst: parsedTalentElBurstMaterial,
//       },
//     }
//   }

//   switch (ascension) {
//     case 0: {
//       const items = [
//         ...getAscensionRequiredItems(material.ascension),
//         ...getTalentRequiredItems(material.talent),
//       ]

//       const currentMaterial = getCurrentMaterial({ ascension })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 20
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: undefined,
//           elementalSkill: undefined,
//           elementalBurst: undefined,
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 1: {
//       const ascensionMaterial: ItemsToRetrieve['ascension'] = {
//         ...material.ascension,
//         ascensionGem: material.ascension.ascensionGem.slice(1),
//       }

//       const items = [
//         ...getAscensionRequiredItems(ascensionMaterial),
//         ...getTalentRequiredItems(material.talent),
//       ]

//       const currentMaterial = getCurrentMaterial({ ascension })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 40
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: undefined,
//           elementalSkill: undefined,
//           elementalBurst: undefined,
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 2: {
//       const ascensionMaterial: ItemsToRetrieve['ascension'] = {
//         ...material.ascension,
//         baseCommon: material.ascension.baseCommon.slice(1),
//         ascensionGem: material.ascension.ascensionGem.slice(1),
//       }

//       const numberToSlice = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [2],
//           expect: [1],
//         })

//       let talentMaterial: ItemsToRetrieve['talent'] = {
//         ...material.talent,
//         talentCommon: material.talent.talentCommon.slice(numberToSlice('all')),
//         talentBook: material.talent.talentBook.slice(numberToSlice('all')),
//       }

//       // traveler geo
//       if (material.talent.talentBook.length === 18) {
//         const talentNormalCommon = material.talent.talentCommon.filter(
//           (_, i) => i < 3
//         )
//         const talentElementalCommon = material.talent.talentCommon.slice(-3)

//         talentMaterial = {
//           ...talentMaterial,
//           talentCommon: [
//             ...talentNormalCommon.slice(numberToSlice('normal')),
//             ...talentElementalCommon.slice(numberToSlice('elemental')),
//           ],
//         }
//       }

//       const items = [
//         ...getAscensionRequiredItems(ascensionMaterial),
//         ...getTalentRequiredItems(talentMaterial),
//       ]

//       const currentMaterial = getCurrentMaterial({
//         ascension,
//         talent,
//         skipTalentIfHigherOrEqualThan: 2,
//       })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 50
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.normal,
//           }),
//           elementalSkill: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalSkill,
//           }),
//           elementalBurst: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalBurst,
//           }),
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 3: {
//       const ascensionMaterial: ItemsToRetrieve['ascension'] = {
//         ...material.ascension,
//         baseCommon: material.ascension.baseCommon.slice(1),
//         ascensionGem: material.ascension.ascensionGem.slice(2),
//       }

//       const numberToSlice2 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [2],
//           expect: [1],
//         })

//       const numberToSlice42 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [4, 2],
//           expect: [3, 1],
//         })

//       let talentMaterial: ItemsToRetrieve['talent'] = {
//         ...material.talent,
//         talentCommon: material.talent.talentCommon.slice(numberToSlice2('all')),
//         talentBook: material.talent.talentBook.slice(numberToSlice2('all')),
//       }

//       // traveler
//       if (material.talent.talentBook.length === 9) {
//         talentMaterial = {
//           ...talentMaterial,
//           talentBook: [
//             ...material.talent.talentBook.slice(numberToSlice42('all')),
//           ],
//         }
//       }

//       // traveler geo
//       if (material.talent.talentBook.length === 18) {
//         const talentNormalBook = material.talent.talentBook.filter(
//           (_, i) => i < 9
//         )
//         const talentElementalBook = material.talent.talentBook.slice(-9)
//         const talentNormalCommon = material.talent.talentCommon.filter(
//           (_, i) => i < 3
//         )
//         const talentElementalCommon = material.talent.talentCommon.slice(-3)

//         talentMaterial = {
//           ...talentMaterial,
//           talentCommon: [
//             ...talentNormalCommon.slice(numberToSlice2('normal')),
//             ...talentElementalCommon.slice(numberToSlice2('elemental')),
//           ],
//           talentBook: [
//             ...talentNormalBook.slice(numberToSlice42('normal')),
//             ...talentElementalBook.slice(numberToSlice42('elemental')),
//           ],
//         }
//       }

//       const items = [
//         ...getAscensionRequiredItems(ascensionMaterial),
//         ...getTalentRequiredItems(talentMaterial),
//       ]

//       const currentMaterial = getCurrentMaterial({
//         ascension,
//         talent,
//         skipTalentIfHigherOrEqualThan: 4,
//       })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 60
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.normal,
//           }),
//           elementalSkill: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalSkill,
//           }),
//           elementalBurst: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalBurst,
//           }),
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 4: {
//       const ascensionMaterial: ItemsToRetrieve['ascension'] = {
//         ...material.ascension,
//         baseCommon: material.ascension.baseCommon.slice(2),
//         ascensionGem: material.ascension.ascensionGem.slice(2),
//       }

//       const numberToSlice62 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [6, 2],
//           expect: [2, 1],
//         })

//       const numberToSlice6542 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [6, 5, 4, 2],
//           expect: [5, 4, 3, 1],
//         })

//       let talentMaterial: ItemsToRetrieve['talent'] = {
//         ...material.talent,
//         talentCommon: material.talent.talentCommon.slice(
//           numberToSlice62('all')
//         ),
//         talentBook: material.talent.talentBook.slice(numberToSlice62('all')),
//       }

//       // traveler
//       if (material.talent.talentBook.length === 9) {
//         talentMaterial = {
//           ...talentMaterial,
//           talentBook: [
//             ...material.talent.talentBook.slice(numberToSlice6542('all')),
//           ],
//         }
//       }

//       // traveler geo
//       if (material.talent.talentBook.length === 18) {
//         const talentNormalBook = material.talent.talentBook.filter(
//           (_, i) => i < 9
//         )
//         const talentElementalBook = material.talent.talentBook.slice(-9)
//         const talentNormalCommon = material.talent.talentCommon.filter(
//           (_, i) => i < 3
//         )
//         const talentElementalCommon = material.talent.talentCommon.slice(-3)

//         talentMaterial = {
//           ...talentMaterial,
//           talentCommon: [
//             ...talentNormalCommon.slice(numberToSlice62('normal')),
//             ...talentElementalCommon.slice(numberToSlice62('elemental')),
//           ],
//           talentBook: [
//             ...talentNormalBook.slice(numberToSlice6542('normal')),
//             ...talentElementalBook.slice(numberToSlice6542('elemental')),
//           ],
//         }
//       }

//       const items = [
//         ...getAscensionRequiredItems(ascensionMaterial),
//         ...getTalentRequiredItems(talentMaterial),
//       ]

//       const currentMaterial = getCurrentMaterial({
//         ascension,
//         talent,
//         skipTalentIfHigherOrEqualThan: 6,
//       })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 70
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.normal,
//           }),
//           elementalSkill: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalSkill,
//           }),
//           elementalBurst: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalBurst,
//           }),
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 5: {
//       const ascensionMaterial: ItemsToRetrieve['ascension'] = {
//         ...material.ascension,
//         baseCommon: material.ascension.baseCommon.slice(2),
//         ascensionGem: material.ascension.ascensionGem.slice(3),
//       }

//       const numberToSlice62 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [6, 2],
//           expect: [2, 1],
//         })

//       const numberToSlice86542 = (on: 'all' | 'normal' | 'elemental') =>
//         getNumberToSlice({
//           on,
//           op: '>=',
//           value: [8, 6, 5, 4, 2],
//           expect: [7, 5, 4, 3, 1],
//         })

//       let talentMaterial: ItemsToRetrieve['talent'] = {
//         ...material.talent,
//         talentCommon: material.talent.talentCommon.slice(
//           numberToSlice62('all')
//         ),
//         talentBook: material.talent.talentBook.slice(numberToSlice62('all')),
//       }

//       // traveler
//       if (material.talent.talentBook.length === 9) {
//         talentMaterial = {
//           ...talentMaterial,
//           talentBook: [
//             ...material.talent.talentBook.slice(numberToSlice86542('all')),
//           ],
//         }
//       }

//       // traveler geo
//       if (material.talent.talentBook.length === 18) {
//         const talentNormalBook = material.talent.talentBook.filter(
//           (_, i) => i < 9
//         )
//         const talentElementalBook = material.talent.talentBook.slice(-9)
//         const talentNormalCommon = material.talent.talentCommon.filter(
//           (_, i) => i < 3
//         )
//         const talentElementalCommon = material.talent.talentCommon.slice(-3)

//         talentMaterial = {
//           ...talentMaterial,
//           talentCommon: [
//             ...talentNormalCommon.slice(numberToSlice62('normal')),
//             ...talentElementalCommon.slice(numberToSlice62('elemental')),
//           ],
//           talentBook: [
//             ...talentNormalBook.slice(numberToSlice86542('normal')),
//             ...talentElementalBook.slice(numberToSlice86542('elemental')),
//           ],
//         }
//       }

//       const items = [
//         ...getAscensionRequiredItems(ascensionMaterial),
//         ...getTalentRequiredItems(talentMaterial),
//       ]

//       const currentMaterial = getCurrentMaterial({
//         ascension,
//         talent,
//         skipTalentIfHigherOrEqualThan: 8,
//       })

//       const possibleToLevel = {
//         ascension:
//           characterLevel === 80
//             ? isPossibleToLevel({
//                 inventory: items,
//                 material: currentMaterial.ascension,
//               })
//             : false,
//         talent: {
//           normal: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.normal,
//           }),
//           elementalSkill: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalSkill,
//           }),
//           elementalBurst: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalBurst,
//           }),
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     case 6: {
//       if (isEqual({ on: 'all', value: 10 })) {
//         return undefined
//       }

//       const numberToSlice = getNumberToSlice({
//         on: 'all',
//         op: '>=',
//         value: [6, 2],
//         expect: [2, 1],
//       })

//       let talentMaterial: ItemsToRetrieve['talent'] = {
//         ...material.talent,
//         talentCommon: material.talent.talentCommon.slice(numberToSlice),
//         talentBook: material.talent.talentBook.slice(numberToSlice),
//       }

//       // traveler
//       if (material.talent.talentBook.length === 9) {
//         const numberToSlice = getNumberToSlice({
//           on: 'all',
//           op: '>=',
//           value: [9, 8, 6, 5, 4, 2],
//           expect: [8, 7, 5, 4, 3, 1],
//         })
//         talentMaterial = {
//           ...talentMaterial,
//           talentBook: [...material.talent.talentBook.slice(numberToSlice)],
//         }
//       }

//       // traveler geo
//       if (material.talent.talentBook.length === 18) {
//         const talentNormalBook = material.talent.talentBook.filter(
//           (_, i) => i < 9
//         )
//         const talentElementalBook = material.talent.talentBook.slice(-9)
//         const talentNormalCommon = material.talent.talentCommon.filter(
//           (_, i) => i < 3
//         )
//         const talentElementalCommon = material.talent.talentCommon.slice(-3)

//         const numberToSliceCommon = (on: 'normal' | 'elemental') =>
//           getNumberToSlice({
//             on,
//             op: '>=',
//             value: [6, 2],
//             expect: [2, 1],
//           })

//         const numberToSliceBook = (on: 'normal' | 'elemental') =>
//           getNumberToSlice({
//             on,
//             op: '>=',
//             value: [9, 8, 6, 5, 4, 2],
//             expect: [8, 7, 5, 4, 3, 1],
//           })

//         talentMaterial = {
//           ...talentMaterial,
//           talentCommon: [
//             ...talentNormalCommon.slice(
//               isEqual({ value: 10, on: 'normal' })
//                 ? 3
//                 : numberToSliceCommon('normal')
//             ),
//             ...talentElementalCommon.slice(
//               isEqual({ value: 10, on: 'elemental' })
//                 ? 3
//                 : numberToSliceCommon('elemental')
//             ),
//           ],
//           talentBook: [
//             ...talentNormalBook.slice(
//               isEqual({ value: 10, on: 'normal' })
//                 ? 9
//                 : numberToSliceBook('normal')
//             ),
//             ...talentElementalBook.slice(
//               isEqual({ value: 10, on: 'elemental' })
//                 ? 9
//                 : numberToSliceBook('elemental')
//             ),
//           ],
//         }
//       }

//       const items = getTalentRequiredItems(talentMaterial)
//       const currentMaterial = getCurrentMaterial({
//         ascension,
//         talent,
//         skipTalentIfHigherOrEqualThan: 10,
//       })

//       const possibleToLevel = {
//         ascension: undefined,
//         talent: {
//           normal: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.normal,
//           }),
//           elementalSkill: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalSkill,
//           }),
//           elementalBurst: isPossibleToLevel({
//             inventory: items,
//             material: currentMaterial.talent.elementalBurst,
//           }),
//         },
//       }

//       const currentItems = getCurrentItems(currentMaterial, items)

//       return {
//         characterLevel,
//         ascension,
//         talent,
//         items,
//         currentMaterial: currentItems,
//         possibleToLevel,
//         unlockable,
//       }
//     }
//     default:
//       invariant(false, 'IMPOSSIBLE')
//   }
// }
