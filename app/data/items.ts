import * as DB from '~/db.server'

export interface Item {
  name: string
  type: DB.ItemType
  rarity: 1 | 2 | 3 | 4 | 5
  convertable: boolean
  craft:
    | false
    | {
        craftable: false
      }
    | {
        craftable: true
        crafter: {
          name: string
          quantity: number
        }
        refundable: boolean
        doublable: boolean
      }
  quantity?: number
}

export const items: Item[] = [
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
      crafter: {
        name: 'Slime Secretions',
        quantity: 3,
      },
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
      crafter: {
        name: 'Slime Condensate',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Ominous Mask',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Stained Mask',
        quantity: 3,
      },
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
      crafter: {
        name: 'Damaged Mask',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Forbidden Curse Scroll',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Sealed Scroll',
        quantity: 3,
      },
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
      crafter: {
        name: 'Divining Scroll',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Weathered Arrowhead',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Sharp Arrowhead',
        quantity: 3,
      },
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
      crafter: {
        name: 'Firm Arrowhead',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Black Crystal Horn',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Black Bronze Horn',
        quantity: 3,
      },
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
      crafter: {
        name: 'Heavy Horn',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Ley Line Sprout',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Dead Ley Line Leaves',
        quantity: 3,
      },
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
      crafter: {
        name: 'Dead Ley Line Branch',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Chaos Core',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Chaos Circuit',
        quantity: 3,
      },
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
      crafter: {
        name: 'Chaos Device',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Mist Grass Wick',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Mist Grass',
        quantity: 3,
      },
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
      crafter: {
        name: 'Mist Grass Pollen',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: "Inspector's Sacrificial Knife",
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: "Agent's Sacrificial Knife",
        quantity: 3,
      },
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
      crafter: {
        name: "Hunter's Sacrificial Knife",
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: "Lieutenant's Insignia",
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: "Sergeant's Insignia",
        quantity: 3,
      },
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
      crafter: {
        name: "Recruit's Insignia",
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Golden Raven Insignia',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Silver Raven Insignia',
        quantity: 3,
      },
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
      crafter: {
        name: 'Treasure Hoarder Insignia',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Energy Nectar',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Shimmering Nectar',
        quantity: 3,
      },
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
      crafter: {
        name: 'Whopperflower Nectar',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Fossilized Bone Shard',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Sturdy Bone Shard',
        quantity: 3,
      },
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
      crafter: {
        name: 'Fragile Bone Shard',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Famed Handguard',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Kageuchi Handguard',
        quantity: 3,
      },
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
      crafter: {
        name: 'Old Handguard',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Chaos Oculus',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Chaos Axis',
        quantity: 3,
      },
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
      crafter: {
        name: 'Chaos Gear',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Polarizing Prism',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Crystal Prism',
        quantity: 3,
      },
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
      crafter: {
        name: 'Dismal Prism',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Spectral Nucleus',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Spectral Heart',
        quantity: 3,
      },
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
      crafter: {
        name: 'Spectral Husk',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Concealed Talon',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Concealed Unguis',
        quantity: 3,
      },
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
      crafter: {
        name: 'Concealed Claw',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Deathly Statuette',
    type: DB.ItemType.COMMON,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Dark Statuette',
        quantity: 3,
      },
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
      crafter: {
        name: 'Gloomy Statuette',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Crystalline Cyst Dust',
    type: DB.ItemType.COMMON,
    rarity: 3,
    craft: {
      craftable: true,
      crafter: {
        name: 'Luminescent Pollen',
        quantity: 3,
      },
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
      crafter: {
        name: 'Fungal Spores',
        quantity: 3,
      },
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
      crafter: {
        name: 'Agnidus Agate Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Agnidus Agate Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Agnidus Agate Sliver',
        quantity: 3,
      },
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
    },
    convertable: true,
  },
  {
    name: 'Varunada Lazurite Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      crafter: {
        name: 'Varunada Lazurite Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Varunada Lazurite Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Varunada Lazurite Sliver',
        quantity: 3,
      },
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
    },
    convertable: true,
  },
  {
    name: 'Vajrada Amethyst Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      crafter: {
        name: 'Vajrada Amethyst Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Vajrada Amethyst Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Vajrada Amethyst Sliver',
        quantity: 3,
      },
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
    },
    convertable: true,
  },
  {
    name: 'Vayuda Turquoise Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      crafter: {
        name: 'Vayuda Turquoise Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Vayuda Turquoise Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Vayuda Turquoise Sliver',
        quantity: 3,
      },
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
    },
    convertable: true,
  },
  {
    name: 'Shivada Jade Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      crafter: {
        name: 'Shivada Jade Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Shivada Jade Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Shivada Jade Sliver',
        quantity: 3,
      },
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
    },
    convertable: true,
  },
  {
    name: 'Prithiva Topaz Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
    craft: {
      craftable: true,
      crafter: {
        name: 'Prithiva Topaz Chunk',
        quantity: 3,
      },
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
      crafter: {
        name: 'Prithiva Topaz Fragment',
        quantity: 3,
      },
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
      crafter: {
        name: 'Prithiva Topaz Sliver',
        quantity: 3,
      },
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
      crafter: {
        name: 'Guide to Freedom',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Freedom',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Resistance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Resistance',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Resistance',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Ballad',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Ballad',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Ballad',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Prosperity',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Prosperity',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Prosperity',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Diligence',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Diligence',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Diligence',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Gold',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Gold',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Gold',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Transience',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Transience',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Transience',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Elegance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Elegance',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Elegance',
        quantity: 3,
      },
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
    },
    convertable: false,
  },
  {
    name: 'Philosophies of Light',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
    craft: {
      craftable: true,
      crafter: {
        name: 'Guide to Light',
        quantity: 3,
      },
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
      crafter: {
        name: 'Teachings of Light',
        quantity: 3,
      },
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
