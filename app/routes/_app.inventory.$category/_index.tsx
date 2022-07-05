import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import ItemList from '~/components/ItemList'
import * as ItemData from '~/data/items'
import type * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export { action } from '~/actions/inventory'

interface LoaderData {
  items: ReturnType<typeof ItemData.getItems>
  category: keyof DB.Type.Inventory
}
export const loader: RemixNode.LoaderFunction = async ({ params, request }) => {
  const { category: categoryParams } = params
  invariant(categoryParams, 'category is required')
  const ParamsSchema = Zod.enum([
    'common',
    'ascension_gem',
    'ascension_boss',
    'local_specialty',
    'talent_book',
    'talent_boss',
    'special',
  ])

  const parsedCategory = ParamsSchema.safeParse(
    Utils.toSnakeCase(categoryParams)
  )
  if (!parsedCategory.success) {
    throw RemixNode.json(
      { category: categoryParams },
      { status: 404, statusText: 'Page Not Found' }
    )
  }

  const accId = await Session.requireAccountId(request)
  const inventory = await InventoryModel.getInventoryCategory({
    category: parsedCategory.data,
    accId,
  })
  const items = ItemData.getItems({
    category: parsedCategory.data,
    items: inventory,
  })

  return RemixNode.json<LoaderData>({ items, category: parsedCategory.data })
}

export default function InventoryCategoryPage() {
  const { items, category } = RemixReact.useLoaderData<LoaderData>()

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Inventory
      </h1>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          {Utils.toCapitalized(category)}
        </h2>
        <ItemList items={items} category={category} />
      </div>
    </div>
  )
}

export const unstable_shouldReload: RemixReact.ShouldReloadFunction = ({
  submission,
}) => {
  return !!submission && submission.method !== 'POST'
}

export function CatchBoundary() {
  const caught = RemixReact.useCatch()

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        ERROR {caught.status} - {caught.statusText}
      </h1>

      <p className="mt-1 font-medium leading-6 text-gray-11">
        Category: {caught.data.category} not found
      </p>
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
