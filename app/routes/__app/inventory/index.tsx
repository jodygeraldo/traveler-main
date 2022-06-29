import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ItemList from '~/components/ItemList'
import { getAllItems } from '~/data/items'
import { getInventory } from '~/models/inventory.server'
import { requireAccountId } from '~/session.server'

export { action } from '~/actions/inventory'

type LoaderData = {
  items: ReturnType<typeof getAllItems>
}
export const loader: LoaderFunction = async ({ request }) => {
  const accId = await requireAccountId(request)
  const inventory = await getInventory({ accId })
  const items = getAllItems(inventory)

  return json<LoaderData>({ items })
}

export default function InventoryPage() {
  const { items } = useLoaderData<LoaderData>()

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Inventory
      </h1>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Common</h2>
        <ItemList items={items.common} category="common" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Ascension Gem</h2>
        <ItemList items={items.ascensionGem} category="ascension_gem" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Ascension Boss</h2>
        <ItemList items={items.ascensionBoss} category="ascension_boss" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Local Specialty</h2>
        <ItemList items={items.localSpecialty} category="local_specialty" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Talent Book</h2>
        <ItemList items={items.talentBook} category="talent_book" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Talent Boss</h2>
        <ItemList items={items.talentBoss} category="talent_boss" />
      </div>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">Special</h2>
        <ItemList items={items.special} category="special" />
      </div>
    </div>
  )
}
