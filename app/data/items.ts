import * as DB from '~/db.server'

export interface ItemWithQuantity {
  name: string
  type: DB.ItemType
  rarity: 1 | 2 | 3 | 4 | 5
  quantity?: number
}

const items: ItemWithQuantity[] = [
  { name: 'Crown of Insight', type: DB.ItemType.SPECIAL, rarity: 5 },
  { name: 'Dream Solvent', type: DB.ItemType.SPECIAL, rarity: 4 },
  { name: 'Dust of Azoth', type: DB.ItemType.SPECIAL, rarity: 2 },
  { name: 'Slime Concentrate', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Slime Secretions', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Slime Condensate', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Ominous Mask', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Stained Mask', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Damaged Mask', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Forbidden Curse Scroll', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Sealed Scroll', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Divining Scroll', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Weathered Arrowhead', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Sharp Arrowhead', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Firm Arrowhead', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Black Crystal Horn', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Black Bronze Horn', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Heavy Horn', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Ley Line Sprout', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Dead Ley Line Leaves', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Dead Ley Line Branch', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Chaos Core', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Chaos Circuit', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Chaos Device', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Mist Grass Wick', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Mist Grass', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Mist Grass Pollen', type: DB.ItemType.COMMON, rarity: 2 },
  {
    name: "Inspector's Sacrificial Knife",
    type: DB.ItemType.COMMON,
    rarity: 4,
  },
  { name: "Agent's Sacrificial Knife", type: DB.ItemType.COMMON, rarity: 3 },
  { name: "Hunter's Sacrificial Knife", type: DB.ItemType.COMMON, rarity: 2 },
  { name: "Lieutenant's Insignia", type: DB.ItemType.COMMON, rarity: 3 },
  { name: "Sergeant's Insignia", type: DB.ItemType.COMMON, rarity: 2 },
  { name: "Recruit's Insignia", type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Golden Raven Insignia', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Silver Raven Insignia', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Treasure Hoarder Insignia', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Energy Nectar', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Shimmering Nectar', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Whopperflower Nectar', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Fossilized Bone Shard', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Sturdy Bone Shard', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Fragile Bone Shard', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Famed Handguard', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Kageuchi Handguard', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Old Handguard', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Chaos Oculus', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Chaos Axis', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Chaos Gear', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Polarizing Prism', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Crystal Prism', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Dismal Prism', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Spectral Nucleus', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Spectral Heart', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Spectral Husk', type: DB.ItemType.COMMON, rarity: 1 },
  { name: 'Concealed Talon', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Concealed Unguis', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Concealed Claw', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Deathly Statuette', type: DB.ItemType.COMMON, rarity: 4 },
  { name: 'Dark Statuette', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Gloomy Statuette', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Crystalline Cyst Dust', type: DB.ItemType.COMMON, rarity: 3 },
  { name: 'Luminescent Pollen', type: DB.ItemType.COMMON, rarity: 2 },
  { name: 'Fungal Spores', type: DB.ItemType.COMMON, rarity: 1 },
  {
    name: 'Brilliant Diamond Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  {
    name: 'Brilliant Diamond Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
  },
  {
    name: 'Brilliant Diamond Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  {
    name: 'Brilliant Diamond Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
  },
  {
    name: 'Agnidus Agate Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  { name: 'Agnidus Agate Chunk', type: DB.ItemType.ASCENSION_GEM, rarity: 4 },
  {
    name: 'Agnidus Agate Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  { name: 'Agnidus Agate Sliver', type: DB.ItemType.ASCENSION_GEM, rarity: 2 },
  {
    name: 'Varunada Lazurite Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  {
    name: 'Varunada Lazurite Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
  },
  {
    name: 'Varunada Lazurite Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  {
    name: 'Varunada Lazurite Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
  },
  {
    name: 'Vajrada Amethyst Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  {
    name: 'Vajrada Amethyst Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
  },
  {
    name: 'Vajrada Amethyst Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  {
    name: 'Vajrada Amethyst Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
  },
  {
    name: 'Vayuda Turquoise Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  {
    name: 'Vayuda Turquoise Chunk',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 4,
  },
  {
    name: 'Vayuda Turquoise Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  {
    name: 'Vayuda Turquoise Sliver',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 2,
  },
  { name: 'Shivada Jade Gemstone', type: DB.ItemType.ASCENSION_GEM, rarity: 5 },
  { name: 'Shivada Jade Chunk', type: DB.ItemType.ASCENSION_GEM, rarity: 4 },
  { name: 'Shivada Jade Fragment', type: DB.ItemType.ASCENSION_GEM, rarity: 3 },
  { name: 'Shivada Jade Sliver', type: DB.ItemType.ASCENSION_GEM, rarity: 2 },
  {
    name: 'Prithiva Topaz Gemstone',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 5,
  },
  { name: 'Prithiva Topaz Chunk', type: DB.ItemType.ASCENSION_GEM, rarity: 4 },
  {
    name: 'Prithiva Topaz Fragment',
    type: DB.ItemType.ASCENSION_GEM,
    rarity: 3,
  },
  { name: 'Prithiva Topaz Sliver', type: DB.ItemType.ASCENSION_GEM, rarity: 2 },
  { name: 'Hurricane Seed', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Lightning Prism', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Basalt Pillar', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Hoarfrost Core', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Everflame Seed', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Cleansing Heart', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Juvenile Jade', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Crystalline Bloom', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Marionette Core', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Perpetual Heart', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Smoldering Pearl', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Dew of Repudiation', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Storm Beads', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Riftborn Regalia', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  {
    name: "Dragonheir's False Fin",
    type: DB.ItemType.ASCENSION_BOSS,
    rarity: 4,
  },
  { name: 'Runic Fang', type: DB.ItemType.ASCENSION_BOSS, rarity: 4 },
  { name: 'Wolfhook', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Valberry', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Cecilia', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Windwheel Aster', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Philanemo Mushroom', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Small Lamp Grass', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Calla Lily', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Dandelion Seed', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Cor Lapis', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Jueyun Chili', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Noctilucous Jade', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Silk Flower', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Glaze Lily', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Qingxin', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Starconch', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Violetgrass', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Onikabuto', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Sakura Bloom', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Crystal Marrow', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Dendrobium', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Naku Weed', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Sea Ganoderma', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Sango Pearl', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Amakumo Fruit', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Fluorescent Fungus', type: DB.ItemType.LOCAL_SPECIALTY, rarity: 1 },
  { name: 'Philosophies of Freedom', type: DB.ItemType.TALENT_BOOK, rarity: 4 },
  { name: 'Guide to Freedom', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Freedom', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  {
    name: 'Philosophies of Resistance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
  },
  { name: 'Guide to Resistance', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Resistance', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  { name: 'Philosophies of Ballad', type: DB.ItemType.TALENT_BOOK, rarity: 4 },
  { name: 'Guide to Ballad', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Ballad', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  {
    name: 'Philosophies of Prosperity',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
  },
  { name: 'Guide to Prosperity', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Prosperity', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  {
    name: 'Philosophies of Diligence',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
  },
  { name: 'Guide to Diligence', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Diligence', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  { name: 'Philosophies of Gold', type: DB.ItemType.TALENT_BOOK, rarity: 4 },
  { name: 'Guide to Gold', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Gold', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  {
    name: 'Philosophies of Transience',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
  },
  { name: 'Guide to Transience', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Transience', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  {
    name: 'Philosophies of Elegance',
    type: DB.ItemType.TALENT_BOOK,
    rarity: 4,
  },
  { name: 'Guide to Elegance', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Elegance', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  { name: 'Philosophies of Light', type: DB.ItemType.TALENT_BOOK, rarity: 4 },
  { name: 'Guide to Light', type: DB.ItemType.TALENT_BOOK, rarity: 3 },
  { name: 'Teachings of Light', type: DB.ItemType.TALENT_BOOK, rarity: 2 },
  { name: "Dvalin's Plume", type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: "Dvalin's Claw", type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: "Dvalin's Sigh", type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Tail of Boreas', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Ring of Boreas', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Spirit Locket of Boreas', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Tusk of Monoceros Caeli', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Shard of a Foul Legacy', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Shadow of the Warrior', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: "Dragon Lord's Crown", type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Bloodjade Branch', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Gilded Scale', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Molten Moment', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Hellfire Butterfly', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  { name: 'Ashen Heart', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
  {
    name: 'Mudra of the Malefic General',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
  },
  {
    name: 'Tears of the Calamitous God',
    type: DB.ItemType.TALENT_BOSS,
    rarity: 5,
  },
  { name: 'The Meaning of Aeons', type: DB.ItemType.TALENT_BOSS, rarity: 5 },
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
