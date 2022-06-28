import { useFetcher } from '@remix-run/react'
import type { Inventory } from 'dbschema/edgeql-js'
import { BadgeRarity } from '~/components/Badge'
import Icon from '~/components/Icon'
import type { Item } from '~/data/items'
import { useDebounce } from '~/hooks/useDebounce'
import { getImageSrc } from '~/utils'

export default function ItemList({
  items,
  category,
}: {
  items: Item[]
  category: keyof Inventory
}) {
  const { Form, submit } = useFetcher()

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    submit(e.currentTarget, { method: 'post', replace: true })
  }

  const debouncedHandleChange = useDebounce(handleChange, 500)

  return (
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.name} className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-6 bg-gray-2">
            <img
              src={`/image/item/${getImageSrc(item.name)}.png`}
              alt=""
              className="max-h-10 w-10 flex-shrink-0 pl-2"
            />
            <div className="flex-1 space-y-1 truncate px-4 py-2 text-sm">
              <h3 className="truncate font-medium text-gray-12">{item.name}</h3>
              <BadgeRarity rarity={2}>
                <span className="sr-only">rarity</span>
                <Icon type="solid" name="star" aria-hidden={true} className="h-4 w-4" />
                <span className="ml-1">3</span>
              </BadgeRarity>
            </div>
            <Form
              onChange={(e) => {
                // handleChange(e)
                debouncedHandleChange(e)
              }}
              className="w-20 pr-2"
            >
              <input type="hidden" name="name" value={item.name} />
              <input type="hidden" name="category" value={category} />
              <div>
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="w-full rounded-md border-gray-7 bg-gray-2 tabular-nums text-gray-11 shadow-sm focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8 sm:text-sm"
                  defaultValue={item.quantity ?? 0}
                  min={0}
                />
              </div>
            </Form>
          </div>
        </li>
      ))}
    </ul>
  )
}
