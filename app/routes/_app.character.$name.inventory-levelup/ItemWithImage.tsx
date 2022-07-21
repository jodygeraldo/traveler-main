import clsx from 'clsx'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import type * as ItemData from '~/data/items'
import * as Utils from '~/utils'

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

export default function ItemWithImage({
  item,
  items,
}: {
  item: Pick<ItemData.ItemWithQuantity, 'name' | 'quantity' | 'type' | 'rarity'>
  items?: Pick<
    ItemData.ItemWithQuantity,
    'name' | 'quantity' | 'type' | 'rarity'
  >[]
}) {
  const correspondingItem = items?.find((i) => i.name === item.name)
  const correspondingItemQuantity =
    (correspondingItem && correspondingItem.quantity) ?? 0
  const itemQuantity = item.quantity ?? 0

  return (
    <li key={item.name}>
      <Tooltip text={item.name}>
        <div
          className={clsx(
            correspondingItem
              ? correspondingItemQuantity >= itemQuantity
                ? 'bg-success-3'
                : 'bg-danger-3'
              : 'bg-gray-3',
            'rounded-b-md shadow-sm'
          )}
        >
          <div
            className={clsx(
              backgroundImage[item.rarity],
              'rounded-t-md rounded-br-2xl bg-contain'
            )}
          >
            <Image
              src={`/item/${Utils.getImageSrc(item.name)}.png`}
              alt={item.name}
              className="h-16 w-16 rounded-br-2xl"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center">
            <span className="sr-only">Quantity {item.quantity}</span>
            <p
              id={`test-${Utils.toSnakeCase(item.name)}-quantity`}
              className="text-sm text-gray-11"
              aria-hidden
            >
              {item.quantity ?? 0}
            </p>
          </div>
        </div>
      </Tooltip>
    </li>
  )
}
