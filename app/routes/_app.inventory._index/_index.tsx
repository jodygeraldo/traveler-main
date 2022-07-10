import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import ItemList from '~/components/ItemList'
import * as ItemData from '~/data/items'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'

export { action } from '~/actions/inventory'

interface LoaderData {
  items: ReturnType<typeof ItemData.getAllItems>
}
export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  const accountId = await Session.requireAccountId(request)
  const inventory = await InventoryModel.getInventory({ accountId })
  const items = ItemData.getAllItems(inventory)

  return RemixNode.json<LoaderData>({ items })
}

export default function InventoryPage() {
  const { items } = RemixReact.useLoaderData<LoaderData>()

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Inventory
      </h1>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Common</h2>
        <ItemList items={items.common} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          Ascension Gem
        </h2>
        <ItemList items={items.ascensionGem} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          Ascension Boss
        </h2>
        <ItemList items={items.ascensionBoss} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          Local Specialty
        </h2>
        <ItemList items={items.localSpecialty} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          Talent Book
        </h2>
        <ItemList items={items.talentBook} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          Talent Boss
        </h2>
        <ItemList items={items.talentBoss} />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Special</h2>
        <ItemList items={items.special} />
      </div>
    </div>
  )
}

export const ErrorBoundary: RemixNode.ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        INTERNAL SERVER ERROR
      </h1>

      <p className="mt-1 font-medium leading-6 text-gray-11">{error.message}</p>
    </div>
  )
}
