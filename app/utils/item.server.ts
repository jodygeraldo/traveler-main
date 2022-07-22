import * as ItemData from '~/data/item.server'
import * as DB from '~/db.server'
import type * as ItemType from '~/types/item'

export function validateItem(name: string | undefined): name is ItemType.Name {
  return ItemData.items.findIndex((i) => i.name === name) !== -1
}

export function getAllItems(
  inventory: Pick<DB.Inventory, 'name' | 'quantity'>[]
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
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
}) {
  return ItemData.items
    .filter((item) => item.type === type)
    .map((item) => {
      const userItem = userItems.find((userItem) => userItem.name === item.name)
      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem?.quantity ? userItem.quantity : 0,
      }
    })
}

export function getItemsByNames({
  names,
  userItems,
}: {
  names: string[]
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
}) {
  return ItemData.items
    .filter((item) => names.includes(item.name))
    .map((item) => {
      const userItem = userItems.find((userItem) => userItem.name === item.name)
      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem?.quantity ? userItem.quantity : 0,
      }
    })
}

export function getConverterItems({
  name,
  type,
}: {
  name: string
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  if (type === 'ASCENSION_GEM') {
    const gems = ItemData.items.filter((item) => {
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
      items: gems.map((item) => item.name),
    }
  }

  const bosses = ItemData.items.filter((item) => {
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
    items: bosses.map((item) => item.name),
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

export function getCrafterItem(name: ItemType.Name) {
  return ItemData.items.find((item) => item.name === name)!
    .craft as ItemType.CraftableItem
}

export function getConvertableItemNames() {
  return ItemData.items
    .filter((item) => item.convertable)
    .map((item) => item.name)
}

export function getConvertableItemNamesByType(
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
) {
  return ItemData.items
    .filter((item) => item.convertable && item.type === type)
    .map((item) => item.name)
}

export function isValidConvertable({
  name,
  type,
}: {
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
  name: ItemType.Name
}) {
  return getConvertableItemNamesByType(type).includes(name)
}

export function getCraftItemNames() {
  return ItemData.items.filter((item) => item.craft).map((item) => item.name)
}

export function getCraftItemNamesByType({ type }: { type: DB.ItemType }) {
  return ItemData.items
    .filter((item) => item.craft && item.type === type)
    .map((item) => item.name)
}

export function isValidCraftable({
  name,
  type,
}: {
  type: DB.ItemType
  name: ItemType.Name
}) {
  return ItemData.items
    .filter((item) => item.craft && item.craft.craftable && item.type === type)
    .map((item) => item.name)
    .includes(name)
}

function getCraftable({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
  type: 'COMMON' | 'ASCENSION_GEM' | 'TALENT_BOOK'
}) {
  const craftable = ItemData.items
    .filter(
      (item) =>
        item.craft && item.craft.craftable !== 'Material' && item.type === type
    )
    .map((item) => {
      const userItem = userItems.find((userItem) => userItem.name === item.name)

      return {
        name: item.name,
        rarity: item.rarity,
        quantity: userItem ? userItem.quantity : 0,
      }
    })

  const crafterNonCraftable = ItemData.items
    .filter(
      (item) =>
        item.craft && item.craft.craftable === 'Material' && item.type === type
    )
    .map((item) => {
      const userItem = userItems.find((userItem) => userItem.name === item.name)

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
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
  type?: 'COMMON' | 'ASCENSION_GEM' | 'TALENT_BOOK'
}) {
  if (type === 'COMMON') {
    const craftable = getCraftable({ userItems, type })

    return craftable
  }

  if (type === 'ASCENSION_GEM') {
    const craftable = getCraftable({ userItems, type })

    return craftable
  }

  if (type === 'TALENT_BOOK') {
    const craftable = getCraftable({ userItems, type })

    return craftable
  }

  return {
    enhancementCraftable: getCraftable({ userItems, type: 'COMMON' }),
    ascensionCraftable: getCraftable({ userItems, type: 'ASCENSION_GEM' }),
    talentCraftable: getCraftable({ userItems, type: 'TALENT_BOOK' }),
  }
}

function getConvertable({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  const convertable = ItemData.items
    .filter((item) => item.convertable && item.type === type)
    .map((item) => {
      const userItem = userItems.find((userItem) => userItem.name === item.name)

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
    (item) => item.name === specialItem.name
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
  userItems: Pick<DB.Inventory, 'name' | 'quantity'>[]
  type?: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  if (type === 'ASCENSION_GEM') {
    const { convertable, converter } = getConvertable({
      userItems,
      type,
    })

    return { convertable, converter }
  }

  if (type === 'TALENT_BOSS') {
    const { convertable, converter } = getConvertable({
      userItems,
      type,
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
