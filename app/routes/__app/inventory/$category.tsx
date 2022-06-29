import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { ShouldReloadFunction } from '@remix-run/react'
import { useCatch, useLoaderData } from '@remix-run/react'
import type { Inventory } from 'dbschema/edgeql-js'
import invariant from 'tiny-invariant'
import ItemList from '~/components/ItemList'
import { getItems } from '~/data/items'
import { getInventoryCategory } from '~/models/inventory.server'
import { requireAccountId } from '~/session.server'
import { toCapitalized, toSnakeCase } from '~/utils'

export { action } from '~/actions/inventory'

type LoaderData = {
  items: ReturnType<typeof getItems>
  category: keyof Inventory
}
export const loader: LoaderFunction = async ({ params, request }) => {
  const { category } = params
  invariant(typeof category === 'string')

  const snakeCaseCategory = toSnakeCase(category)
  if (
    snakeCaseCategory !== 'common' &&
    snakeCaseCategory !== 'ascension_gem' &&
    snakeCaseCategory !== 'ascension_boss' &&
    snakeCaseCategory !== 'local_specialty' &&
    snakeCaseCategory !== 'talent_book' &&
    snakeCaseCategory !== 'talent_boss' &&
    snakeCaseCategory !== 'special'
  ) {
    throw json({ category }, { status: 404, statusText: 'Page Not Found' })
  }

  const accId = await requireAccountId(request)
  const inventory = await getInventoryCategory({ category: snakeCaseCategory, accId })
  const items = getItems({ category: snakeCaseCategory, items: inventory })

  return json<LoaderData>({ items, category: snakeCaseCategory })
}

export default function InventoryCategoryPage() {
  const { items, category } = useLoaderData<LoaderData>()

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Inventory
      </h1>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">{toCapitalized(category)}</h2>
        <ItemList items={items} category={category} />
      </div>
    </div>
  )
}

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
  return !!submission && submission.method !== 'POST'
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        ERROR {caught.status} - {caught.statusText}
      </h1>

      <p className="mt-1 text-lg font-medium leading-6 text-gray-11">
        Category: {caught.data.category} not found
      </p>
    </div>
  )
}
