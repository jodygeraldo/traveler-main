import * as Item from './Item'

interface Craftable {
  name: string
  rarity: number
  quantity: number
}

interface Props {
  heading: string
  craft: 'craft-enhancement' | 'craft-ascension' | 'craft-talent'
  items: {
    craftable: Craftable[]
    crafterNonCraftable: Craftable[]
  }
}

export default function ItemList({ heading, craft, items }: Props) {
  return (
    <>
      <h2 className="text-lg font-medium leading-6 text-gray-12">{heading}</h2>

      <div className="mt-4 flex flex-wrap gap-4">
        {items.crafterNonCraftable.map((item) => (
          <Item.Item
            key={item.name}
            name={item.name}
            rarity={item.rarity}
            quantity={item.quantity}
            width={12}
            height={12}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {items.craftable.map((item) => (
          <Item.ItemLink
            key={item.name}
            craft={craft}
            name={item.name}
            rarity={item.rarity}
            quantity={item.quantity}
          />
        ))}
      </div>
    </>
  )
}
