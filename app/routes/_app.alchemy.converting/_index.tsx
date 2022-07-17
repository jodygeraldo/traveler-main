import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import { getInventoryByType } from '~/models/inventory.server'
import * as Session from '~/session.server'
import Item from './Item'

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
    }).filter((item) => !item.name.includes('Brilliant Diamond')),

    ...ItemData.getItemsByType({
      type: DB.ItemType.TALENT_BOSS,
      userItems: inventory,
    }),
  ]

  return RemixNode.json({ items })
}

export default function AlchemyConvertingPage() {
  const { items } = RemixReact.useLoaderData<typeof loader>()

  const ascensionGemItems = items.filter(
    (item) => item.type === 'ASCENSION_GEM'
  )
  const talentBossItems = items.filter((item) => item.type === 'TALENT_BOSS')

  return (
    <>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="col-span-1">
          <h2 className="text-lg font-medium leading-6 text-gray-12">
            Ascension Gems
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {ascensionGemItems.map((item) => (
              <Item
                key={item.name}
                type="gem"
                name={item.name}
                rarity={item.rarity}
                quantity={item.quantity ?? 0}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1 self-start">
          <h2 className="text-lg font-medium leading-6 text-gray-12">
            Talent Boss
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {talentBossItems.map((item) => (
              <Item
                key={item.name}
                type="boss"
                name={item.name}
                rarity={item.rarity}
                quantity={item.quantity ?? 0}
              />
            ))}
          </div>
        </div>
      </div>
      <RemixReact.Outlet />
    </>
  )
}
