import invariant from 'tiny-invariant'
import type { CharacterInfer, CharactersInfer } from '~/models/character.server'

const characters: CharacterDetail[] = [
  {
    name: 'Albedo',
    vision: 'Geo',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Freedom'],
      talentBoss: 'Tusk of Monoceros Caeli',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Basalt Pillar',
      localSpecialty: 'Cecilia',
    },
  },
  {
    name: 'Aloy',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Spectral Cores',
      talentBook: ['Freedom'],
      talentBoss: 'Molten Moment',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Crystalline Bloom',
      localSpecialty: 'Crystal Marrow',
    },
  },
  {
    name: 'Amber',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Arrowheads',
      talentBook: ['Freedom'],
      talentBoss: "Dvalin's Sigh",
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Small Lamp Grass',
    },
  },
  {
    name: 'Arataki Itto',
    vision: 'Geo',
    rarity: 5,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Elegance'],
      talentBoss: 'Ashen Heart',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Riftborn Regalia',
      localSpecialty: 'Onikabuto',
    },
  },
  {
    name: 'Barbara',
    vision: 'Hydro',
    rarity: 4,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Freedom'],
      talentBoss: 'Ring of Boreas',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Cleansing Heart',
      localSpecialty: 'Philanemo Mushroom',
    },
  },
  {
    name: 'Beidou',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Gold'],
      talentBoss: "Dvalin's Sigh",
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Lightning Prism',
      localSpecialty: 'Noctilucous Jade',
    },
  },
  {
    name: 'Bennett',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Resistance'],
      talentBoss: "Dvalin's Plume",
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Windwheel Aster',
    },
  },
  {
    name: 'Chongyun',
    vision: 'Cryo',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Diligence'],
      talentBoss: "Dvalin's Sigh",
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Cor Lapis',
    },
  },
  {
    name: 'Diluc',
    vision: 'Pyro',
    rarity: 5,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Fatui Insignia',
      talentBook: ['Resistance'],
      talentBoss: "Dvalin's Plume",
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Small Lamp Grass',
    },
  },
  {
    name: 'Diona',
    vision: 'Cryo',
    rarity: 4,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Arrowheads',
      talentBook: ['Freedom'],
      talentBoss: 'Shard of a Foul Legacy',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Calla Lily',
    },
  },
  {
    name: 'Eula',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Resistance'],
      talentBoss: "Dragon Lord's Crown",
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Crystalline Bloom',
      localSpecialty: 'Dandelion Seed',
    },
  },
  {
    name: 'Fischl',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Arrowheads',
      talentBook: ['Ballad'],
      talentBoss: 'Spirit Locket of Boreas',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Lightning Prism',
      localSpecialty: 'Small Lamp Grass',
    },
  },
  {
    name: 'Ganyu',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Diligence'],
      talentBoss: 'Shadow of the Warrior',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Qingxin',
    },
  },
  {
    name: 'Gorou',
    vision: 'Geo',
    rarity: 4,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Spectral Cores',
      talentBook: ['Light'],
      talentBoss: 'Molten Moment',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Perpetual Heart',
      localSpecialty: 'Sango Pearl',
    },
  },
  {
    name: 'Hu Tao',
    vision: 'Pyro',
    rarity: 5,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Diligence'],
      talentBoss: 'Shard of a Foul Legacy',
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Juvenile Jade',
      localSpecialty: 'Silk Flower',
    },
  },
  {
    name: 'Jean',
    vision: 'Anemo',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Resistance'],
      talentBoss: "Dvalin's Plume",
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Hurricane Seed',
      localSpecialty: 'Dandelion Seed',
    },
  },
  {
    name: 'Kaedehara Kazuha',
    vision: 'Anemo',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Diligence'],
      talentBoss: 'Gilded Scale',
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Marionette Core',
      localSpecialty: 'Sea Ganoderma',
    },
  },
  {
    name: 'Kaeya',
    vision: 'Cryo',
    rarity: 4,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Ballad'],
      talentBoss: 'Spirit Locket of Boreas',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Calla Lily',
    },
  },
  {
    name: 'Kamisato Ayaka',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Nobushi Handguards',
      talentBook: ['Elegance'],
      talentBoss: 'Bloodjade Branch',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Perpetual Heart',
      localSpecialty: 'Sakura Bloom',
    },
  },
  {
    name: 'Kamisato Ayato',
    vision: 'Hydro',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Nobushi Handguards',
      talentBook: ['Elegance'],
      talentBoss: 'Mudra of the Malefic General',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Dew of Repudiation',
      localSpecialty: 'Sakura Bloom',
    },
  },
  {
    name: 'Keqing',
    vision: 'Electro',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Prosperity'],
      talentBoss: 'Ring of Boreas',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Lightning Prism',
      localSpecialty: 'Cor Lapis',
    },
  },
  {
    name: 'Klee',
    vision: 'Pyro',
    rarity: 5,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Freedom'],
      talentBoss: 'Ring of Boreas',
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Philanemo Mushroom',
    },
  },
  {
    name: 'Kujou Sara',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Elegance'],
      talentBoss: 'Ashen Heart',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Storm Beads',
      localSpecialty: 'Dendrobium',
    },
  },
  {
    name: 'Kuki Shinobu',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Spectral',
      talentBook: ['Elegance'],
      talentBoss: 'Tears of the Calamitous God',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Runic Fang',
      localSpecialty: 'Naku Weed',
    },
  },
  {
    name: 'Lisa',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Ballad'],
      talentBoss: "Dvalin's Claw",
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Lightning Prism',
      localSpecialty: 'Valberry',
    },
  },
  {
    name: 'Mona',
    vision: 'Hydro',
    rarity: 5,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Resistance'],
      talentBoss: 'Ring of Boreas',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Cleansing Heart',
      localSpecialty: 'Philanemo Mushroom',
    },
  },
  {
    name: 'Ningguang',
    vision: 'Geo',
    rarity: 4,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Fatui Insignia',
      talentBook: ['Prosperity'],
      talentBoss: 'Spirit Locket of Boreas',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Basalt Pillar',
      localSpecialty: 'Glaze Lily',
    },
  },
  {
    name: 'Noelle',
    vision: 'Geo',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Resistance'],
      talentBoss: "Dvalin's Claw",
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Basalt Pillar',
      localSpecialty: 'Valberry',
    },
  },
  {
    name: 'Qiqi',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Prosperity'],
      talentBoss: 'Tail of Boreas',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Violetgrass',
    },
  },
  {
    name: 'Raiden Shogun',
    vision: 'Electro',
    rarity: 5,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Nobushi Handguards',
      talentBook: ['Light'],
      talentBoss: 'Molten Moment',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Storm Beads',
      localSpecialty: 'Amakumo Fruit',
    },
  },
  {
    name: 'Razor',
    vision: 'Electro',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Resistance'],
      talentBoss: "Dvalin's Claw",
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: 'Lightning Prism',
      localSpecialty: 'Wolfhook',
    },
  },
  {
    name: 'Rosaria',
    vision: 'Cryo',
    rarity: 4,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Fatui Insignia',
      talentBook: ['Ballad'],
      talentBoss: 'Shadow of the Warrior',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: 'Hoarfrost Core',
      localSpecialty: 'Valberry',
    },
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: 'Hydro',
    rarity: 5,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Spectral Cores',
      talentBook: ['Transience'],
      talentBoss: 'Hellfire Butterfly',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Dew of Repudiation',
      localSpecialty: 'Sango Pearl',
    },
  },
  {
    name: 'Sayu',
    vision: 'Anemo',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Light'],
      talentBoss: 'Gilded Scale',
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Marionette Core',
      localSpecialty: 'Crystal Marrow',
    },
  },
  {
    name: 'Shenhe',
    vision: 'Cryo',
    rarity: 5,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Prosperity'],
      talentBoss: 'Hellfire Butterfly',
      ascensionGem: 'Shivada Jade',
      ascensionBoss: "Dragonheir's False Fin",
      localSpecialty: 'Qingxin',
    },
  },
  {
    name: 'Sucrose',
    vision: 'Anemo',
    rarity: 4,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Whopperflower Nectar',
      talentBook: ['Freedom'],
      talentBoss: 'Spirit Locket of Boreas',
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Hurricane Seed',
      localSpecialty: 'Windwheel Aster',
    },
  },
  {
    name: 'Tartaglia',
    vision: 'Hydro',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Fatui Insignia',
      talentBook: ['Freedom'],
      talentBoss: 'Shard of a Foul Legacy',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Cleansing Heart',
      localSpecialty: 'Starconch',
    },
  },
  {
    name: 'Thoma',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Transience'],
      talentBoss: 'Hellfire Butterfly',
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Smoldering Pearl',
      localSpecialty: 'Fluorescent Fungus',
    },
  },
  {
    name: 'Traveler',
    vision: ['Anemo', 'Geo', 'Electro'],
    rarity: 5,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Freedom', 'Resistance', 'Ballad'],
      talentBoss: "Dvalin's Sigh",
      talentCommon: 'Hilichurl Masks',
      ascensionGem: 'Brilliant Diamond',
      localSpecialty: 'Windwheel Aster',
    },
  },
  // {
  //   name: 'Traveler Geo',
  //   vision: 'Geo',
  //   rarity: 5,
  //   weapon: 'Sword',
  //   material: {
  //     crown: 'Crown of Insight',
  //     common: 'Samachurl Scrolls',
  //     talentBook: ['Freedom', 'Resistance', 'Ballad'],
  //     talentBoss: "Dvalin's Sigh",
  //     talentCommon: 'Hilichurl Masks',
  //     ascensionGem: 'Brilliant Diamond',
  //     localSpecialty: 'Windwheel Aster',
  //   },
  // },
  // {
  //   name: 'Traveler Electro',
  //   vision: 'Electro',
  //   rarity: 5,
  //   weapon: 'Sword',
  //   material: {
  //     crown: 'Crown of Insight',
  //     common: 'Nobushi Handguards',
  //     talentBook: ['Transience', 'Elegance', 'Light'],
  //     talentBoss: "Dragon Lord's Crown",
  //     talentCommon: 'Hilichurl Masks',
  //     ascensionGem: 'Brilliant Diamond',
  //     localSpecialty: 'Windwheel Aster',
  //   },
  // },
  {
    name: 'Venti',
    vision: 'Anemo',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Ballad'],
      talentBoss: 'Tail of Boreas',
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Hurricane Seed',
      localSpecialty: 'Qingxin',
    },
  },
  {
    name: 'Xiangling',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Diligence'],
      talentBoss: "Dvalin's Claw",
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Jueyun Chili',
    },
  },
  {
    name: 'Xiao',
    vision: 'Anemo',
    rarity: 5,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Prosperity'],
      talentBoss: 'Shadow of the Warrior',
      ascensionGem: 'Vayuda Turquoise',
      ascensionBoss: 'Juvenile Jade',
      localSpecialty: 'Qingxin',
    },
  },
  {
    name: 'Xingqiu',
    vision: 'Hydro',
    rarity: 4,
    weapon: 'Sword',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Gold'],
      talentBoss: 'Tail of Boreas',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Cleansing Heart',
      localSpecialty: 'Silk Flower',
    },
  },
  {
    name: 'Xinyan',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Claymore',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Gold'],
      talentBoss: 'Tusk of Monoceros Caeli',
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Everflame Seed',
      localSpecialty: 'Violetgrass',
    },
  },
  {
    name: 'Yae Miko',
    vision: 'Electro',
    rarity: 5,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Nobushi Handguards',
      talentBook: ['Light'],
      talentBoss: 'The Meaning of Aeons',
      ascensionGem: 'Vajrada Amethyst',
      ascensionBoss: "Dragonheir's False Fin",
      localSpecialty: 'Sea Ganoderma',
    },
  },
  {
    name: 'Yanfei',
    vision: 'Pyro',
    rarity: 4,
    weapon: 'Catalyst',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Gold'],
      talentBoss: 'Bloodjade Branch',
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Juvenile Jade',
      localSpecialty: 'Noctilucous Jade',
    },
  },
  {
    name: 'Yelan',
    vision: 'Hydro',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Treasure Hoarder Insignias',
      talentBook: ['Prosperity'],
      talentBoss: 'Gilded Scale',
      ascensionGem: 'Varunada Lazurite',
      ascensionBoss: 'Runic Fang',
      localSpecialty: 'Starconch',
    },
  },
  {
    name: 'Yoimiya',
    vision: 'Pyro',
    rarity: 5,
    weapon: 'Bow',
    material: {
      crown: 'Crown of Insight',
      common: 'Samachurl Scrolls',
      talentBook: ['Transience'],
      talentBoss: "Dragon Lord's Crown",
      ascensionGem: 'Agnidus Agate',
      ascensionBoss: 'Smoldering Pearl',
      localSpecialty: 'Naku Weed',
    },
  },
  {
    name: 'Yun Jin',
    vision: 'Geo',
    rarity: 4,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Hilichurl Masks',
      talentBook: ['Diligence'],
      talentBoss: 'Ashen Heart',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Riftborn Regalia',
      localSpecialty: 'Glaze Lily',
    },
  },
  {
    name: 'Zhongli',
    vision: 'Geo',
    rarity: 5,
    weapon: 'Polearm',
    material: {
      crown: 'Crown of Insight',
      common: 'Slime',
      talentBook: ['Gold'],
      talentBoss: 'Tusk of Monoceros Caeli',
      ascensionGem: 'Prithiva Topaz',
      ascensionBoss: 'Basalt Pillar',
      localSpecialty: 'Cor Lapis',
    },
  },
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

export interface CharacterDetail extends Character {
  weapon: string
  material: {
    crown: string
    common: string
    talentBook: string[]
    talentBoss: string
    talentCommon?: string
    ascensionGem: string
    ascensionBoss?: string
    localSpecialty: string
  }
}

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

export function getCharacter(name: string, characterData: CharacterInfer): CharacterDetail | null {
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
