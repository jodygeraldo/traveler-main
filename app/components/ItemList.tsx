import { useFetcher } from '@remix-run/react'
import type { Inventory } from 'dbschema/edgeql-js'
import { useRef } from 'react'
import Image, { MimeType } from 'remix-image'
import { BadgeRarity } from '~/components/Badge'
import Icon from '~/components/Icon'
import type { Item } from '~/data/items'
import { getImageSrc } from '~/utils'

export default function ItemList({
  items,
  category,
}: {
  items: Item[]
  category: keyof Inventory
}) {
  const { Form, submit } = useFetcher()

  let timerRef = useRef<NodeJS.Timeout>()
  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    if (timerRef.current) clearTimeout(timerRef.current)
    let $form = e.currentTarget
    const quantity = ($form.querySelector('#quantity') as HTMLInputElement).value
    if (quantity === '') return
    let timer = setTimeout(() => submit($form, { method: 'post', replace: true }), 500)
    timerRef.current = timer
  }

  return (
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.name} className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-6 bg-gray-2">
            <Image
              src={`/image/item/${getImageSrc(item.name)}.png`}
              alt=""
              className="max-h-10 w-10 flex-shrink-0 pl-2"
              responsive={[{ size: { width: 40 } }]}
              options={{ contentType: MimeType.WEBP }}
              loading="lazy"
              dprVariants={[1, 2, 3]}
            />
            <div className="flex-1 space-y-1 truncate px-4 py-2 text-sm">
              <h3 className="truncate font-medium text-gray-12">{item.name}</h3>
              <BadgeRarity rarity={item.rarity}>
                <span className="sr-only">rarity</span>
                <Icon type="solid" name="star" aria-hidden={true} className="h-4 w-4" />
                <span className="ml-1">{item.rarity}</span>
              </BadgeRarity>
            </div>
            <Form method="post" onChange={handleChange} className="w-20 pr-2">
              <input type="hidden" name="name" value={item.name} />
              <input type="hidden" name="category" value={category} />
              <div>
                <label htmlFor="quantity" className="sr-only">
                  {item.name} Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="w-full rounded-md border-gray-7 bg-gray-2 tabular-nums text-gray-11 shadow-sm focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8 sm:text-sm"
                  defaultValue={item.quantity ?? 0}
                  required
                  min={0}
                  max={9999}
                />
              </div>
            </Form>
          </div>
        </li>
      ))}
    </ul>
  )
}
