import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import * as Utils from '~/utils'

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

interface Props {
  name: string
  rarity: 1 | 2 | 3 | 4 | 5
  quantity: number
  type: 'gem' | 'boss'
}

export default function Item({ name, rarity, quantity, type }: Props) {
  return (
    <RemixReact.Link prefetch="intent" to={`./${name}?type=${type}`}>
      <Tooltip text={name}>
        <div className={clsx('rounded-b-md bg-gray-3 shadow-sm')}>
          <div
            className={clsx(
              backgroundImage[rarity],
              'rounded-t-md rounded-br-2xl bg-contain'
            )}
          >
            <Image
              src={`/item/${Utils.getImageSrc(name)}.png`}
              alt={name}
              className="h-16 w-16 rounded-br-2xl"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center">
            <span className="sr-only">Quantity {quantity}</span>
            <p className="text-sm text-gray-11" aria-hidden>
              {quantity}
            </p>
          </div>
        </div>
      </Tooltip>
    </RemixReact.Link>
  )
}
