import invariant from 'tiny-invariant'
import type * as DB from '~/db.server'
import type * as InventoryModel from '~/models/inventory.server'

export interface Item {
  name: string
  rarity: 1 | 2 | 3 | 4 | 5
  quantity?: number | null
}

const special: Item[] = [
  { name: 'Crown of Insight', rarity: 5 },
  { name: 'Dream Solvent', rarity: 4 },
  { name: 'Dust of Azoth', rarity: 2 },
]

const common: Item[] = [
  { name: 'Slime Concentrate', rarity: 3 },
  { name: 'Slime Secretions', rarity: 2 },
  { name: 'Slime Condensate', rarity: 1 },
  { name: 'Ominous Mask', rarity: 3 },
  { name: 'Stained Mask', rarity: 2 },
  { name: 'Damaged Mask', rarity: 1 },
  { name: 'Forbidden Curse Scroll', rarity: 3 },
  { name: 'Sealed Scroll', rarity: 2 },
  { name: 'Divining Scroll', rarity: 1 },
  { name: 'Weathered Arrowhead', rarity: 3 },
  { name: 'Sharp Arrowhead', rarity: 2 },
  { name: 'Firm Arrowhead', rarity: 1 },
  { name: 'Black Crystal Horn', rarity: 4 },
  { name: 'Black Bronze Horn', rarity: 3 },
  { name: 'Heavy Horn', rarity: 2 },
  { name: 'Ley Line Sprout', rarity: 4 },
  { name: 'Dead Ley Line Leaves', rarity: 3 },
  { name: 'Dead Ley Line Branch', rarity: 2 },
  { name: 'Chaos Core', rarity: 4 },
  { name: 'Chaos Circuit', rarity: 3 },
  { name: 'Chaos Device', rarity: 2 },
  { name: 'Mist Grass Wick', rarity: 4 },
  { name: 'Mist Grass', rarity: 3 },
  { name: 'Mist Grass Pollen', rarity: 2 },
  { name: "Inspector's Sacrificial Knife", rarity: 4 },
  { name: "Agent's Sacrificial Knife", rarity: 3 },
  { name: "Hunter's Sacrificial Knife", rarity: 2 },
  { name: "Lieutenant's Insignia", rarity: 3 },
  { name: "Sergeant's Insignia", rarity: 2 },
  { name: "Recruit's Insignia", rarity: 1 },
  { name: 'Golden Raven Insignia', rarity: 3 },
  { name: 'Silver Raven Insignia', rarity: 2 },
  { name: 'Treasure Hoarder Insignia', rarity: 1 },
  { name: 'Energy Nectar', rarity: 3 },
  { name: 'Shimmering Nectar', rarity: 2 },
  { name: 'Whopperflower Nectar', rarity: 1 },
  { name: 'Fossilized Bone Shard', rarity: 4 },
  { name: 'Sturdy Bone Shard', rarity: 3 },
  { name: 'Fragile Bone Shard', rarity: 2 },
  { name: 'Famed Handguard', rarity: 3 },
  { name: 'Kageuchi Handguard', rarity: 2 },
  { name: 'Old Handguard', rarity: 1 },
  { name: 'Chaos Oculus', rarity: 4 },
  { name: 'Chaos Axis', rarity: 3 },
  { name: 'Chaos Gear', rarity: 2 },
  { name: 'Polarizing Prism', rarity: 4 },
  { name: 'Crystal Prism', rarity: 3 },
  { name: 'Dismal Prism', rarity: 2 },
  { name: 'Spectral Nucleus', rarity: 3 },
  { name: 'Spectral Heart', rarity: 2 },
  { name: 'Spectral Husk', rarity: 1 },
  { name: 'Concealed Talon', rarity: 4 },
  { name: 'Concealed Unguis', rarity: 3 },
  { name: 'Concealed Claw', rarity: 2 },
  { name: 'Deathly Statuette', rarity: 4 },
  { name: 'Dark Statuette', rarity: 3 },
  { name: 'Gloomy Statuette', rarity: 2 },
  { name: 'Crystalline Cyst Dust', rarity: 3 },
  { name: 'Luminescent Pollen', rarity: 2 },
  { name: 'Fungal Spores', rarity: 1 },
]

const ascensionGem: Item[] = [
  { name: 'Brilliant Diamond Gemstone', rarity: 5 },
  { name: 'Brilliant Diamond Chunk', rarity: 4 },
  { name: 'Brilliant Diamond Fragment', rarity: 3 },
  { name: 'Brilliant Diamond Sliver', rarity: 2 },
  { name: 'Agnidus Agate Gemstone', rarity: 5 },
  { name: 'Agnidus Agate Chunk', rarity: 4 },
  { name: 'Agnidus Agate Fragment', rarity: 3 },
  { name: 'Agnidus Agate Sliver', rarity: 2 },
  { name: 'Varunada Lazurite Gemstone', rarity: 5 },
  { name: 'Varunada Lazurite Chunk', rarity: 4 },
  { name: 'Varunada Lazurite Fragment', rarity: 3 },
  { name: 'Varunada Lazurite Sliver', rarity: 2 },
  { name: 'Vajrada Amethyst Gemstone', rarity: 5 },
  { name: 'Vajrada Amethyst Chunk', rarity: 4 },
  { name: 'Vajrada Amethyst Fragment', rarity: 3 },
  { name: 'Vajrada Amethyst Sliver', rarity: 2 },
  { name: 'Vayuda Turquoise Gemstone', rarity: 5 },
  { name: 'Vayuda Turquoise Chunk', rarity: 4 },
  { name: 'Vayuda Turquoise Fragment', rarity: 3 },
  { name: 'Vayuda Turquoise Sliver', rarity: 2 },
  { name: 'Shivada Jade Gemstone', rarity: 5 },
  { name: 'Shivada Jade Chunk', rarity: 4 },
  { name: 'Shivada Jade Fragment', rarity: 3 },
  { name: 'Shivada Jade Sliver', rarity: 2 },
  { name: 'Prithiva Topaz Gemstone', rarity: 5 },
  { name: 'Prithiva Topaz Chunk', rarity: 4 },
  { name: 'Prithiva Topaz Fragment', rarity: 3 },
  { name: 'Prithiva Topaz Sliver', rarity: 2 },
]

const ascensionBoss: Item[] = [
  { name: 'Hurricane Seed', rarity: 4 },
  { name: 'Lightning Prism', rarity: 4 },
  { name: 'Basalt Pillar', rarity: 4 },
  { name: 'Hoarfrost Core', rarity: 4 },
  { name: 'Everflame Seed', rarity: 4 },
  { name: 'Cleansing Heart', rarity: 4 },
  { name: 'Juvenile Jade', rarity: 4 },
  { name: 'Crystalline Bloom', rarity: 4 },
  { name: 'Marionette Core', rarity: 4 },
  { name: 'Perpetual Heart', rarity: 4 },
  { name: 'Smoldering Pearl', rarity: 4 },
  { name: 'Dew of Repudiation', rarity: 4 },
  { name: 'Storm Beads', rarity: 4 },
  { name: 'Riftborn Regalia', rarity: 4 },
  { name: "Dragonheir's False Fin", rarity: 4 },
  { name: 'Runic Fang', rarity: 4 },
]

const localSpecialty: Item[] = [
  { name: 'Calla Lily', rarity: 1 },
  { name: 'Wolfhook', rarity: 1 },
  { name: 'Valberry', rarity: 1 },
  { name: 'Cecilia', rarity: 1 },
  { name: 'Windwheel Aster', rarity: 1 },
  { name: 'Philanemo Mushroom', rarity: 1 },
  { name: 'Jueyun Chili', rarity: 1 },
  { name: 'Noctilucous Jade', rarity: 1 },
  { name: 'Silk Flower', rarity: 1 },
  { name: 'Glaze Lily', rarity: 1 },
  { name: 'Qingxin', rarity: 1 },
  { name: 'Starconch', rarity: 1 },
  { name: 'Violetgrass', rarity: 1 },
  { name: 'Small Lamp Grass', rarity: 1 },
  { name: 'Dandelion Seed', rarity: 1 },
  { name: 'Cor Lapis', rarity: 1 },
  { name: 'Onikabuto', rarity: 1 },
  { name: 'Sakura Bloom', rarity: 1 },
  { name: 'Crystal Marrow', rarity: 1 },
  { name: 'Dendrobium', rarity: 1 },
  { name: 'Naku Weed', rarity: 1 },
  { name: 'Sea Ganoderma', rarity: 1 },
  { name: 'Sango Pearl', rarity: 1 },
  { name: 'Amakumo Fruit', rarity: 1 },
  { name: 'Fluorescent Fungus', rarity: 1 },
]

const talentBook: Item[] = [
  { name: 'Philosophies of Freedom', rarity: 4 },
  { name: 'Guide to Freedom', rarity: 3 },
  { name: 'Teachings of Freedom', rarity: 2 },
  { name: 'Philosophies of Prosperity', rarity: 4 },
  { name: 'Guide to Prosperity', rarity: 3 },
  { name: 'Teachings of Prosperity', rarity: 2 },
  { name: 'Philosophies of Transience', rarity: 4 },
  { name: 'Guide to Transience', rarity: 3 },
  { name: 'Teachings of Transience', rarity: 2 },
  { name: 'Philosophies of Elegance', rarity: 4 },
  { name: 'Guide to Elegance', rarity: 3 },
  { name: 'Teachings of Elegance', rarity: 2 },
  { name: 'Philosophies of Resistance', rarity: 4 },
  { name: 'Guide to Resistance', rarity: 3 },
  { name: 'Teachings of Resistance', rarity: 2 },
  { name: 'Philosophies of Diligence', rarity: 4 },
  { name: 'Guide to Diligence', rarity: 3 },
  { name: 'Teachings of Diligence', rarity: 2 },
  { name: 'Philosophies of Ballad', rarity: 4 },
  { name: 'Guide to Ballad', rarity: 3 },
  { name: 'Teachings of Ballad', rarity: 2 },
  { name: 'Philosophies of Gold', rarity: 4 },
  { name: 'Guide to Gold', rarity: 3 },
  { name: 'Teachings of Gold', rarity: 2 },
  { name: 'Philosophies of Light', rarity: 4 },
  { name: 'Guide to Light', rarity: 3 },
  { name: 'Teachings of Light', rarity: 2 },
]

const talentBoss: Item[] = [
  { name: "Dvalin's Plume", rarity: 5 },
  { name: "Dvalin's Claw", rarity: 5 },
  { name: "Dvalin's Sigh", rarity: 5 },
  { name: 'Tail of Boreas', rarity: 5 },
  { name: 'Ring of Boreas', rarity: 5 },
  { name: 'Spirit Locket of Boreas', rarity: 5 },
  { name: 'Tusk of Monoceros Caeli', rarity: 5 },
  { name: 'Shard of a Foul Legacy', rarity: 5 },
  { name: 'Shadow of the Warrior', rarity: 5 },
  { name: "Dragon Lord's Crown", rarity: 5 },
  { name: 'Bloodjade Branch', rarity: 5 },
  { name: 'Gilded Scale', rarity: 5 },
  { name: 'Molten Moment', rarity: 5 },
  { name: 'Ashen Heart', rarity: 5 },
  { name: 'Hellfire Butterfly', rarity: 5 },
  { name: 'Mudra of the Malefic General', rarity: 5 },
  { name: 'Tears of the Calamitous God', rarity: 5 },
  { name: 'The Meaning of Aeons', rarity: 5 },
]

export function getAllItems(inventory: InventoryModel.InventoryInfer) {
  invariant(inventory, 'cannot find associated inventory for this account')

  return {
    special: getAllItemsInCategory({
      category: 'special',
      items: inventory.special,
    }),
    common: getAllItemsInCategory({
      category: 'common',
      items: inventory.common,
    }),
    ascensionGem: getAllItemsInCategory({
      category: 'ascension_gem',
      items: inventory.ascension_gem,
    }),
    ascensionBoss: getAllItemsInCategory({
      category: 'ascension_boss',
      items: inventory.ascension_boss,
    }),
    localSpecialty: getAllItemsInCategory({
      category: 'local_specialty',
      items: inventory.local_specialty,
    }),
    talentBook: getAllItemsInCategory({
      category: 'talent_book',
      items: inventory.talent_book,
    }),
    talentBoss: getAllItemsInCategory({
      category: 'talent_boss',
      items: inventory.talent_boss,
    }),
  }
}

export function getAllItemsInCategory({
  category,
  items,
}: {
  category: keyof DB.Type.Inventory
  items: {
    name: string
    '@quantity': number | null
  }[]
}) {
  function getUpdatedItems(itemsToUpdate: Item[]) {
    return items.forEach((dbItem) => {
      const idx = itemsToUpdate.findIndex((item) => item.name === dbItem.name)
      itemsToUpdate[idx].quantity = dbItem['@quantity'] ?? 0
    })
  }

  if (category === 'special') {
    const updatedItems = special
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'common') {
    const updatedItems = common
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'ascension_gem') {
    const updatedItems = ascensionGem
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'ascension_boss') {
    const updatedItems = ascensionBoss
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'local_specialty') {
    const updatedItems = localSpecialty
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'talent_book') {
    const updatedItems = talentBook
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'talent_boss') {
    const updatedItems = talentBoss
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  invariant(false, `Unknown category: ${category}`)
}

export function getItemsInCategory({
  category,
  names,
  items,
}: {
  category: keyof DB.Type.Inventory
  names: string[]
  items: {
    name: string
    '@quantity': number | null
  }[]
}) {
  function getUpdatedItems(itemsToUpdate: Item[]) {
    return itemsToUpdate.forEach((item, index) => {
      const dbItemIndex = items.findIndex((dbItem) => item.name === dbItem.name)
      if (dbItemIndex === -1) return
      itemsToUpdate[index].quantity = items[dbItemIndex]['@quantity'] ?? 0
    })
  }

  if (category === 'special') {
    const updatedItems = special
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'common') {
    const updatedItems = common
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'ascension_gem') {
    const updatedItems = ascensionGem
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'ascension_boss') {
    const updatedItems = ascensionBoss
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'local_specialty') {
    const updatedItems = localSpecialty
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'talent_book') {
    const updatedItems = talentBook
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  if (category === 'talent_boss') {
    const updatedItems = talentBoss
      .filter((item) => names.includes(item.name))
      .map((item) => {
        return { ...item, quantity: 0 }
      })
    getUpdatedItems(updatedItems)
    return updatedItems
  }

  invariant(false, `Unknown category: ${category}`)
}
