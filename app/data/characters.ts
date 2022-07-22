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
  region: DB.Region
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

export const characters: Character[] = [
  {
    name: 'Albedo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.GEO,
    region: DB.Region.MONDSTADT,
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
    region: DB.Region.UNKNOWN,
    rarity: 5,
    talent: ['Rapid Fire', 'Frozen Wilds', 'Prophecies of Dawn'],
  },
  {
    name: 'Amber',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Sharpshooter', 'Explosive Puppet', 'Fiery Rain'],
  },
  {
    name: 'Arataki Itto',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Whisper of Water', 'Let the Show Begin♪', 'Shining Miracle♪'],
  },
  {
    name: 'Beidou',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ELECTRO,
    region: DB.Region.LIYUE,
    rarity: 4,
    talent: ['Oceanborne', 'Tidecaller', 'Stormbreaker'],
  },
  {
    name: 'Bennett',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.PYRO,
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Strike of Fortune', 'Passion Overload', 'Fantastic Voyage'],
  },
  {
    name: 'Chongyun',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    region: DB.Region.LIYUE,
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
    region: DB.Region.MONDSTADT,
    rarity: 5,
    talent: ['Tempered Sword', 'Searing Onslaught', 'Dawn'],
  },
  {
    name: 'Diona',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Kätzlein Style', 'Icy Paws', 'Signature Mix'],
  },
  {
    name: 'Eula',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.CRYO,
    region: DB.Region.MONDSTADT,
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
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Bolts of Downfall', 'Nightrider', 'Midnight Phantasmagoria'],
  },
  {
    name: 'Ganyu',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.CRYO,
    region: DB.Region.LIYUE,
    rarity: 5,
    talent: ['Liutian Archery', 'Trail of the Qilin', 'Celestial Shower'],
  },
  {
    name: 'Gorou',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.GEO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.LIYUE,
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
    region: DB.Region.MONDSTADT,
    rarity: 5,
    talent: ['Favonius Bladework', 'Gale Blade', 'Dandelion Breeze'],
  },
  {
    name: 'Kaedehara Kazuha',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    region: DB.Region.INAZUMA,
    rarity: 5,
    talent: ['Garyuu Bladework', 'Chihayaburu', 'Kazuha Slash'],
  },
  {
    name: 'Kaeya',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Ceremonial Bladework', 'Frostgnaw', 'Glacial Waltz'],
  },
  {
    name: 'Kamisato Ayaka',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.INAZUMA,
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
    region: DB.Region.LIYUE,
    rarity: 5,
    talent: ['Yunlai Swordsmanship', 'Stellar Restoration', 'Starward Sword'],
  },
  {
    name: 'Klee',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.PYRO,
    region: DB.Region.MONDSTADT,
    rarity: 5,
    talent: ['Kaboom!', 'Jumpy Dumpty', "Sparks 'n' Splash"],
  },
  {
    name: 'Kujou Sara',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ELECTRO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.INAZUMA,
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
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Lightning Touch', 'Violet Arc', 'Lightning Rose'],
  },
  {
    name: 'Mona',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.HYDRO,
    region: DB.Region.MONDSTADT,
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
    region: DB.Region.LIYUE,
    rarity: 4,
    talent: ['Sparkling Scatter', 'Jade Screen', 'Starshatter'],
  },
  {
    name: 'Noelle',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.GEO,
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Favonius Bladework - Maid', 'Breastplate', 'Sweeping Time'],
  },
  {
    name: 'Qiqi',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.CRYO,
    region: DB.Region.LIYUE,
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
    region: DB.Region.INAZUMA,
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
    region: DB.Region.MONDSTADT,
    rarity: 4,
    talent: ['Steel Fang', 'Claw and Thunder', 'Lightning Fang'],
  },
  {
    name: 'Rosaria',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.CRYO,
    region: DB.Region.MONDSTADT,
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
    region: DB.Region.INAZUMA,
    rarity: 5,
    talent: ['The Shape of Water', "Kurage's Oath", "Nereid's Ascension"],
  },
  {
    name: 'Sayu',
    weapon: DB.Weapon.CLAYMORE,
    vision: DB.Vision.ANEMO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.LIYUE,
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
    region: DB.Region.INAZUMA,
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
    region: DB.Region.MONDSTADT,
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
    region: DB.Region.SNEZHNAYA,
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
    region: DB.Region.INAZUMA,
    rarity: 4,
    talent: ['Swiftshatter Spear', 'Blazing Blessing', 'Crimson Ooyoroi'],
  },
  {
    name: 'Traveler Anemo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ANEMO,
    region: DB.Region.UNKNOWN,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Palm Vortex', 'Gust Surge'],
  },
  {
    name: 'Traveler Geo',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.GEO,
    region: DB.Region.UNKNOWN,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Starfell Sword', 'Wake of Earth'],
  },
  {
    name: 'Traveler Electro',
    weapon: DB.Weapon.SWORD,
    vision: DB.Vision.ELECTRO,
    region: DB.Region.UNKNOWN,
    rarity: 5,
    talent: ['Foreign Thundershock', 'Lightning Blade', 'Bellowing Thunder'],
  },
  {
    name: 'Venti',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.ANEMO,
    region: DB.Region.MONDSTADT,
    rarity: 5,
    talent: ['Divine Marksmanship', 'Skyward Sonnet', "Wind's Grand Ode"],
  },
  {
    name: 'Xiangling',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.PYRO,
    region: DB.Region.LIYUE,
    rarity: 4,
    talent: ['Dough-Fu', 'Guoba Attack', 'Pyronado'],
  },
  {
    name: 'Xiao',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.ANEMO,
    region: DB.Region.LIYUE,
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
    region: DB.Region.LIYUE,
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
    region: DB.Region.LIYUE,
    rarity: 4,
    talent: ['Dance on Fire', 'Sweeping Fervor', 'Riff Revolution'],
  },
  {
    name: 'Yae Miko',
    weapon: DB.Weapon.CATALYST,
    vision: DB.Vision.ELECTRO,
    region: DB.Region.INAZUMA,
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
    region: DB.Region.LIYUE,
    rarity: 4,
    talent: ['Seal of Approval', 'Signed Edict', 'Done Deal'],
  },
  {
    name: 'Yelan',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.HYDRO,
    region: DB.Region.LIYUE,
    rarity: 5,
    talent: ['Stealthy Bowshot', 'Lingering Lifeline', 'Depth-Clarion Dice'],
  },
  {
    name: 'Yoimiya',
    weapon: DB.Weapon.BOW,
    vision: DB.Vision.PYRO,
    region: DB.Region.INAZUMA,
    rarity: 5,
    talent: ['Firework Flare-Up', 'Niwabi Fire-Dance', 'Ryuukin Saxifrage'],
  },
  {
    name: 'Yun Jin',
    weapon: DB.Weapon.POLEARM,
    vision: DB.Vision.GEO,
    region: DB.Region.LIYUE,
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
    region: DB.Region.LIYUE,
    rarity: 5,
    talent: ['Rain of Stone', 'Dominus Lapidis', 'Planet Befall'],
  },
]

export interface AscensionMaterial {
  gem: string
  boss?: string
  local: string
  common: string[]
}
export interface TalentMaterial {
  book: string[]
  boss: string
  common: string[]
  special: string
}

export interface CharacterMaterial {
  name: string
  ascension: AscensionMaterial
  talent: TalentMaterial | TalentMaterial[]
}

export const characterMaterial: CharacterMaterial[] = [
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


