import * as DB from '~/db.server'

export interface ItemWithQuantity {
  name: string
  type: DB.ItemType
  rarity: 1 | 2 | 3 | 4 | 5
  convertable: boolean
  craft:
    | false
    | {
        craftable: boolean
        refundable: boolean
        doublable: boolean
      }
  quantity?: number
}

const items: ItemWithQuantity[] = [
  {
    name: 'Crown of Insight',
    type: DB.ItemType.SPECIAL,
    rarity: 5,
    craft: false,
    convertable: false,
  },
  {
    name: 'Dream Solvent',
    type: DB.ItemType.SPECIAL,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Dust of Azoth',
    type: DB.ItemType.SPECIAL,
    rarity: 2,
    craft: false,
    convertable: false,
  },
  {
    name: 'Slime Concentrate',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Slime Secretions',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Slime Condensate',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Ominous Mask',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Stained Mask',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Damaged Mask',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Forbidden Curse Scroll',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Sealed Scroll',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Divining Scroll',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Weathered Arrowhead',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Sharp Arrowhead',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Firm Arrowhead',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Black Crystal Horn',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Black Bronze Horn',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Heavy Horn',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Ley Line Sprout',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Dead Ley Line Leaves',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Dead Ley Line Branch',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Core',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Circuit',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Device',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Mist Grass Wick',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Mist Grass',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Mist Grass Pollen',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Inspector's Sacrificial Knife",
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Agent's Sacrificial Knife",
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Hunter's Sacrificial Knife",
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Lieutenant's Insignia",
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Sergeant's Insignia",
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Recruit's Insignia",
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Golden Raven Insignia',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Silver Raven Insignia',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Treasure Hoarder Insignia',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Energy Nectar',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Shimmering Nectar',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Whopperflower Nectar',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Fossilized Bone Shard',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Sturdy Bone Shard',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Fragile Bone Shard',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Famed Handguard',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Kageuchi Handguard',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Old Handguard',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Oculus',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Axis',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Chaos Gear',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Polarizing Prism',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Crystal Prism',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Dismal Prism',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Spectral Nucleus',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Spectral Heart',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Spectral Husk',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Concealed Talon',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Concealed Unguis',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Concealed Claw',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Deathly Statuette',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Dark Statuette',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Gloomy Statuette',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Crystalline Cyst Dust',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Luminescent Pollen',
    type: DB.ItemType.COMMON,
    rarity: 2,
    craft: {
      craftable: true,
      doublable: true,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Fungal Spores',
    type: DB.ItemType.COMMON,
    rarity: 1,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Brilliant Diamond Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: false,
    convertable: false,
  },
  {
    name: 'Brilliant Diamond Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Brilliant Diamond Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: false,
    convertable: false,
  },
  {
    name: 'Brilliant Diamond Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: false,
    convertable: false,
  },
  {
    name: 'Agnidus Agate Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Agnidus Agate Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Agnidus Agate Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Agnidus Agate Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Varunada Lazurite Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Varunada Lazurite Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Varunada Lazurite Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Varunada Lazurite Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vajrada Amethyst Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vajrada Amethyst Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vajrada Amethyst Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vajrada Amethyst Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vayuda Turquoise Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vayuda Turquoise Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vayuda Turquoise Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Vayuda Turquoise Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Shivada Jade Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Shivada Jade Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Shivada Jade Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Shivada Jade Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Prithiva Topaz Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Prithiva Topaz Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Prithiva Topaz Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Prithiva Topaz Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: true,
  },
  {
    name: 'Hurricane Seed',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Lightning Prism',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Basalt Pillar',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Hoarfrost Core',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Everflame Seed',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Cleansing Heart',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Juvenile Jade',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Crystalline Bloom',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Marionette Core',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Perpetual Heart',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Smoldering Pearl',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Dew of Repudiation',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Storm Beads',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Riftborn Regalia',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: "Dragonheir's False Fin",
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Runic Fang',
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
    craft: false,
    convertable: false,
  },
  {
    name: 'Wolfhook',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Valberry',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Cecilia',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Windwheel Aster',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Philanemo Mushroom',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Small Lamp Grass',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Calla Lily',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Dandelion Seed',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Cor Lapis',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Jueyun Chili',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Noctilucous Jade',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Silk Flower',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Glaze Lily',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Qingxin',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Starconch',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Violetgrass',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Onikabuto',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Sakura Bloom',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Crystal Marrow',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Dendrobium',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Naku Weed',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Sea Ganoderma',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Sango Pearl',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Amakumo Fruit',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Fluorescent Fungus',
    type: DB.ItemType.LOCAL_SPECIALTY,
    rarity: 1,
    craft: false,
    convertable: false,
  },
  {
    name: 'Philosophies of Freedom',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Freedom',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Freedom',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Resistance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Resistance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Resistance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Ballad',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Ballad',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Ballad',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Prosperity',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Prosperity',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Prosperity',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Diligence',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Diligence',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Diligence',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Gold',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Gold',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Gold',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Transience',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Transience',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Transience',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Elegance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Elegance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Elegance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Light',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Guide to Light',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 3,
    craft: {
      craftable: true,
      doublable: true,
      refundable: true,
    },
    convertable: false,
  },
  {
    name: 'Teachings of Light',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 2,
    craft: {
      craftable: false,
      doublable: false,
      refundable: false,
    },
    convertable: false,
  },
  {
    name: "Dvalin's Plume",
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: "Dvalin's Claw",
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: "Dvalin's Sigh",
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Tail of Boreas',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Ring of Boreas',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Spirit Locket of Boreas',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Tusk of Monoceros Caeli',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Shard of a Foul Legacy',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Shadow of the Warrior',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: "Dragon Lord's Crown",
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Bloodjade Branch',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Gilded Scale',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Molten Moment',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Hellfire Butterfly',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Ashen Heart',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Mudra of the Malefic General',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'Tears of the Calamitous God',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
  {
    name: 'The Meaning of Aeons',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
    craft: false,
    convertable: true,
  },
]

export function getAllItems(
  inventory: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
) {
  return {
    special: getItemsByType({
      type: DB.ItemType.SPECIAL,
      userItems: inventory,
    }),
    common: getItemsByType({
      type: DB.ItemType.COMMON,
      userItems: inventory,
    }),
    ascensionGem: getItemsByType({
      type: DB.ItemType.ASCENSION_GEM,
      userItems: inventory,
    }),
    ascensionBoss: getItemsByType({
      type: DB.ItemType.ASCENSION_BOSS,
      userItems: inventory,
    }),
    localSpecialty: getItemsByType({
      type: DB.ItemType.LOCAL_SPECIALTY,
      userItems: inventory,
    }),
    talentBook: getItemsByType({
      type: DB.ItemType.TALENT_BOOK,
      userItems: inventory,
    }),
    talentBoss: getItemsByType({
      type: DB.ItemType.TALENT_BOSS,
      userItems: inventory,
    }),
  }
}

export function getItemsByType({
  type,
  userItems,
}: {
  type: DB.ItemType
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
}) {
  const result = items.filter((item) => item.type === type)

  userItems.forEach((userItem) => {
    const itemIndex = result.findIndex(
      (item) => item.name === userItem.itemName
    )
    if (itemIndex !== -1) result[itemIndex].quantity = userItem.quantity
  })

  return result
}

export function getItemsByNames({
  names,
  userItems,
}: {
  names: string[]
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
}) {
  const result = items.filter((item) => names.includes(item.name))

  result.forEach((item, index) => {
    const itemIndex = userItems.findIndex(
      (userItem) => item.name === userItem.itemName
    )
    if (itemIndex !== -1) result[index].quantity = userItems[itemIndex].quantity
  })

  return result
}

export function getConverterItems({
  name,
  type,
}: {
  name: string
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  if (type === 'ASCENSION_GEM') {
    const tmpGems = items.filter((item) => {
      const baseFilter =
        item.type === DB.ItemType.ASCENSION_GEM &&
        item.name !== name &&
        !item.name.includes('Brilliant Diamond')

      if (name.includes('Gemstone'))
        return baseFilter && item.name.includes('Gemstone')
      if (name.includes('Chunk'))
        return baseFilter && item.name.includes('Chunk')
      if (name.includes('Fragment'))
        return baseFilter && item.name.includes('Fragment')
      return baseFilter && item.name.includes('Sliver')
    })
    return {
      specialRequiredQuantity: name.includes('Gemstone')
        ? 27
        : name.includes('Chunk')
        ? 9
        : name.includes('Fragment')
        ? 3
        : 1,
      items: tmpGems.map((item) => item.name),
    }
  }

  const tmpBosses = items.filter((item) => {
    const baseFilter =
      item.type === DB.ItemType.TALENT_BOSS && item.name !== name

    if (talentBossGroup.dvalin.includes(name))
      return baseFilter && talentBossGroup.dvalin.includes(item.name)
    if (talentBossGroup.andrius.includes(name))
      return baseFilter && talentBossGroup.andrius.includes(item.name)
    if (talentBossGroup.childe.includes(name))
      return baseFilter && talentBossGroup.childe.includes(item.name)
    if (talentBossGroup.azhdaha.includes(name))
      return baseFilter && talentBossGroup.azhdaha.includes(item.name)
    if (talentBossGroup.signora.includes(name))
      return baseFilter && talentBossGroup.signora.includes(item.name)
    return baseFilter && talentBossGroup.raiden.includes(item.name)
  })
  return {
    specialRequiredQuantity: 1,
    items: tmpBosses.map((item) => item.name),
  }
}

const talentBossGroup = {
  dvalin: ["Dvalin's Plume", "Dvalin's Claw", "Dvalin's Sigh"],
  andrius: ['Tail of Boreas', 'Ring of Boreas', 'Spirit Locket of Boreas'],
  childe: [
    'Tusk of Monoceros Caeli',
    'Shard of a Foul Legacy',
    'Shadow of the Warrior',
  ],
  azhdaha: ["Dragon Lord's Crown", 'Bloodjade Branch', 'Gilded Scale'],
  signora: ['Molten Moment', 'Hellfire Butterfly', 'Ashen Heart'],
  raiden: [
    'Mudra of the Malefic General',
    'Tears of the Calamitous God',
    'The Meaning of Aeons',
  ],
}

export function getConvertableItemNames() {
  return items.filter((item) => item.convertable).map((item) => item.name)
}

export function getConvertableItemNamesByType({ type }: { type: DB.ItemType }) {
  return items
    .filter((item) => item.convertable && item.type === type)
    .map((item) => item.name)
}

export function isValidConvertable({
  name,
  type,
}: {
  type: DB.ItemType
  name: string
}) {
  return getConvertableItemNamesByType({ type }).includes(name)
}

export function getCraftItemNames() {
  return items.filter((item) => item.craft).map((item) => item.name)
}

export function getCraftItemNamesByType({ type }: { type: DB.ItemType }) {
  return items
    .filter((item) => item.craft && item.type === type)
    .map((item) => item.name)
}

export function isValidCraftable({
  name,
  type,
}: {
  type: DB.ItemType
  name: string
}) {
  return items
    .filter((item) => item.craft && item.craft.craftable && item.type === type)
    .map((item) => item.name)
    .includes(name)
}

function getCraftable({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type: 'COMMON' | 'ASCENSION_GEM' | 'TALENT_BOOK'
}) {
  const craftable = items
    .filter((item) => item.craft && item.craft.craftable && item.type === type)
    .map((item) => {
      const userItem = userItems.find(
        (userItem) => userItem.itemName === item.name
      )

      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem ? userItem.quantity : 0,
      }
    })

  const crafterNonCraftable = items
    .filter((item) => item.craft && !item.craft.craftable && item.type === type)
    .map((item) => {
      const userItem = userItems.find(
        (userItem) => userItem.itemName === item.name
      )

      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem ? userItem.quantity : 0,
      }
    })

  return { craftable, crafterNonCraftable }
}

export function getCraftableItems({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type?: 'enhancement' | 'ascension' | 'talent'
}) {
  if (type === 'enhancement') {
    const craftable = getCraftable({ userItems, type: 'COMMON' })

    return craftable
  }

  if (type === 'ascension') {
    const craftable = getCraftable({ userItems, type: 'ASCENSION_GEM' })

    return craftable
  }

  if (type === 'talent') {
    const craftable = getCraftable({ userItems, type: 'TALENT_BOOK' })

    return craftable
  }

  return {
    enhancementCrafable: getCraftable({ userItems, type: 'COMMON' }),
    ascensionCrafable: getCraftable({ userItems, type: 'ASCENSION_GEM' }),
    talentCrafable: getCraftable({ userItems, type: 'TALENT_BOOK' }),
  }
}

function getConvertable({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  const convertable = items
    .filter((item) => item.convertable && item.type === type)
    .map((item) => {
      const userItem = userItems.find(
        (userItem) => userItem.itemName === item.name
      )

      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem ? userItem.quantity : 0,
      }
    })

  const specialItem = {
    name: type === 'ASCENSION_GEM' ? 'Dust of Azoth' : 'Dream Solvent',
    rarity: type === 'ASCENSION_GEM' ? 2 : 4,
  }

  const userConverter = userItems.find(
    (item) => item.itemName === specialItem.name
  )?.quantity
  const converter = {
    name: specialItem.name,
    rarity: specialItem.rarity,
    quantity: userConverter ? userConverter : 0,
  } as const

  return { convertable, converter }
}

export function getConvertableItems({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type?: 'ascension-gem' | 'talent-boss'
}) {
  if (type === 'ascension-gem') {
    const { convertable, converter } = getConvertable({
      userItems,
      type: 'ASCENSION_GEM',
    })

    return { convertable, converter }
  }

  if (type === 'talent-boss') {
    const { convertable, converter } = getConvertable({
      userItems,
      type: 'TALENT_BOSS',
    })

    return { convertable, converter }
  }

  const {
    convertable: ascensionGemConvertable,
    converter: ascensionGemConverter,
  } = getConvertable({ userItems, type: 'ASCENSION_GEM' })

  const { convertable: talentBossConvertable, converter: talentBossConverter } =
    getConvertable({ userItems, type: 'TALENT_BOSS' })

  return {
    ascensionGem: {
      convertable: ascensionGemConvertable,
      converter: ascensionGemConverter,
    },
    talentBoss: {
      convertable: talentBossConvertable,
      converter: talentBossConverter,
    },
  }
}
