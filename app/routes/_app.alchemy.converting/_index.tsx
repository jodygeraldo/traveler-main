import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import { getInventoryByType } from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Item from './Item'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const inventory = await getInventoryByType({
    type: [
      DB.ItemType.ASCENSION_GEM,
      DB.ItemType.TALENT_BOSS,
      DB.ItemType.SPECIAL,
    ],
    accountId,
  })

  const SPECIAL_ITEMS = ['Dust of Azoth', 'Dream Solvent']

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

  const special = ItemData.getItemsByType({
    type: DB.ItemType.SPECIAL,
    userItems: inventory,
  }).filter((item) => SPECIAL_ITEMS.includes(item.name))

  const dustOfAzoth = special.find((item) => item.name === 'Dust of Azoth')
  const dreamSolvent = special.find((item) => item.name === 'Dream Solvent')
  invariant(dustOfAzoth)
  invariant(dreamSolvent)

  return RemixNode.json({ items, dustOfAzoth, dreamSolvent })
}

export default function AlchemyConvertingPage() {
  const { items, dustOfAzoth, dreamSolvent } =
    RemixReact.useLoaderData<typeof loader>()

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

          <div className="mt-4 flex">
            <Item.Item
              name={dustOfAzoth.name}
              rarity={dustOfAzoth.rarity}
              quantity={dustOfAzoth.quantity ?? 0}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {ascensionGemItems.map((item) => (
              <Item.ItemLink
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

          <div className="mt-4 flex">
            <Item.Item
              name={dreamSolvent.name}
              rarity={dreamSolvent.rarity}
              quantity={dreamSolvent.quantity ?? 0}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {talentBossItems.map((item) => (
              <Item.ItemLink
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
