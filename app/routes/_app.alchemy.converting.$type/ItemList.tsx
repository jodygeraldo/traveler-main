import * as Item from './Item'

interface Convertable {
  name: string
  rarity: number
  quantity: number
}

interface Props {
  heading: string
  convert: 'convert-gem' | 'convert-boss'
  converter: Convertable
  convertable: Convertable[]
}

export default function ItemList({ heading, convert, converter, convertable }: Props) {
  return (
    <>
      <h2 className="text-lg font-medium leading-6 text-gray-12">{heading}</h2>

      <div className="mt-4 flex">
        <Item.Item
          name={converter.name}
          rarity={converter.rarity}
          quantity={converter.quantity}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {convertable.map((item) => (
          <Item.ItemLink
            key={item.name}
            convert={convert}
            name={item.name}
            rarity={item.rarity}
            quantity={item.quantity}
          />
        ))}
      </div>
    </>
  )
}
