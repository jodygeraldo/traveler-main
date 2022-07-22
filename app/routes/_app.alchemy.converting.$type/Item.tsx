import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import * as Utils from '~/utils'

const backgroundImage: Record<number, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

interface Props {
  name: string
  rarity: number
  quantity: number
  convert: 'convert-gem' | 'convert-boss'
  width?: number
  height?: number
}

export function ItemLink({
  name,
  rarity,
  quantity,
  convert,
  width = 16,
  height = 16,
}: Props) {
  return (
    <RemixReact.Link prefetch="intent" to={`./${convert}/${name}`}>
      <Item
        name={name}
        rarity={rarity}
        quantity={quantity}
        width={width}
        height={height}
      />
    </RemixReact.Link>
  )
}

export function Item({
  name,
  rarity,
  quantity,
  width = 16,
  height = 16,
}: Omit<Props, 'convert'>) {
  return (
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
            className={clsx(`w-${width} h-${height} rounded-br-2xl`)}
            width={width * 4}
            height={height * 4}
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
  )
}
