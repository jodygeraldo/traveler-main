import Item from './Item'

interface Craftable {
  name: string
  rarity: number
  quantity: number
}

interface Props {
  heading: string
  craft: 'craft-enhancement' | 'craft-ascension' | 'craft-talent'
  craftable: Craftable[]
}

export default function ItemList({ heading, craft, craftable }: Props) {
  return (
    <>
      <h2 className="text-lg font-medium leading-6 text-gray-12">{heading}</h2>

      <div className="mt-6 flex flex-wrap gap-4">
        {craftable.map((item) => (
          <Item
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
