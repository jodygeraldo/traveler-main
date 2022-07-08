import clsx from 'clsx'
import * as RemixImage from 'remix-image'
import * as Utils from '~/utils'
import Tooltip from './Tooltip'

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

interface Props {
  item: {
    name: string
    quantity: number
    rarity: 1 | 2 | 3 | 4 | 5
  }
  items?: {
    quantity: number
    name: string
    rarity: 1 | 2 | 3 | 4 | 5
  }[]
}

export default function ItemWithImage({ item, items }: Props) {
  const correspondingItem = items?.find((i) => i.name === item.name)

  return (
    <li key={item.name}>
      <Tooltip text={item.name}>
        <div
          className={clsx(
            correspondingItem
              ? correspondingItem.quantity >= item.quantity
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
            <RemixImage.Image
              src={`/image/item/${Utils.getImageSrc(item.name)}.png`}
              alt={item.name}
              className="h-16 w-16 rounded-br-2xl"
              responsive={[{ size: { width: 64, height: 64 } }]}
              dprVariants={[1, 2, 3]}
            />
          </div>
          <div className="text-center">
            <span className="sr-only">Quantity {item.quantity}</span>
            <p className="text-sm text-gray-11" aria-hidden>
              {item.quantity}
            </p>
          </div>
        </div>
      </Tooltip>
    </li>
  )
}
