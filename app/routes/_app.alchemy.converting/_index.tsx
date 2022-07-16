import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import { getInventoryByType } from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const inventory = await getInventoryByType({
    type: [DB.ItemType.ASCENSION_GEM, DB.ItemType.TALENT_BOSS],
    accountId,
  })

  const items = [
    ...ItemData.getItemsByType({
      type: DB.ItemType.ASCENSION_GEM,
      userItems: inventory,
    }),
    ...ItemData.getItemsByType({
      type: DB.ItemType.TALENT_BOSS,
      userItems: inventory,
    }),
  ].filter((item) => !item.name.includes('Brilliant Diamond'))

  return RemixNode.json({ items })
}

export default function AlchemyConvertingPage() {
  const { items } = RemixReact.useLoaderData<typeof loader>()

  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2">
      <div className="col-span-1 flex flex-wrap items-center gap-4">
        {items.map((item) => (
          <Item
            key={item.name}
            name={item.name}
            rarity={item.rarity}
            quantity={item.quantity ?? 0}
          />
        ))}
      </div>
      <div className="col-span-1">
        <RemixReact.Outlet />
      </div>
    </div>
  )
}

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

function Item({
  name,
  rarity,
  quantity,
}: {
  name: string
  rarity: 1 | 2 | 3 | 4 | 5
  quantity: number
}) {
  return (
    <RemixReact.Link prefetch="intent" to={`./${name}`}>
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