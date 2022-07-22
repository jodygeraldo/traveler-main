import * as ItemData from '~/data/items'
import * as DB from '~/db.server'

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
  const result = ItemData.items.filter((item) => item.type === type)

  userItems.forEach((userItem) => {
    const itemIndex = result.findIndex(
      (item) => item.name === userItem.itemName
    )
    if (itemIndex !== -1) result[itemIndex].quantity = userItem.quantity
  })

  return result.map((item) => ({
    name: item.name,
    rarity: item.rarity,
    quantity: item.quantity || 0,
  }))
}

export function getItemsByNames({
  names,
  userItems,
}: {
  names: string[]
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
}) {
  const result = ItemData.items.filter((item) => names.includes(item.name))

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
    const tmpGems = ItemData.items.filter((item) => {
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

  const tmpBosses = ItemData.items.filter((item) => {
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

export function getCrafterItem(name: string) {
  return ItemData.items
    .filter((item) => item.craft && item.craft.craftable && item.name === name)
    .map((item) => {
      // @ts-ignore
      const craft = item.craft as {
        craftable: true
        crafter: {
          name: string
          quantity: number
        }
        refundable: boolean
        doublable: boolean
      }
      return {
        ...craft,
      }
    })[0]
}

export function getConvertableItemNames() {
  return ItemData.items
    .filter((item) => item.convertable)
    .map((item) => item.name)
}

export function getConvertableItemNamesByType({ type }: { type: DB.ItemType }) {
  return ItemData.items
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
  name: string
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
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type: 'COMMON' | 'ASCENSION_GEM' | 'TALENT_BOOK'
}) {
  const craftable = ItemData.items
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

  const crafterNonCraftable = ItemData.items
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
    enhancementCraftable: getCraftable({ userItems, type: 'COMMON' }),
    ascensionCraftable: getCraftable({ userItems, type: 'ASCENSION_GEM' }),
    talentCraftable: getCraftable({ userItems, type: 'TALENT_BOOK' }),
  }
}

function getConvertable({
  userItems,
  type,
}: {
  userItems: Pick<DB.Inventory, 'itemName' | 'quantity'>[]
  type: 'ASCENSION_GEM' | 'TALENT_BOSS'
}) {
  const convertable = ItemData.items
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
