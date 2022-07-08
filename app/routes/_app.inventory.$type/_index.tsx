import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import ItemList from '~/components/ItemList'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export { action } from '~/actions/inventory'

interface LoaderData {
  items: ItemData.ItemWithQuantity[]
  type: DB.ItemType
}
export const loader: RemixNode.LoaderFunction = async ({ params, request }) => {
  const { type: typeParams } = params
  invariant(typeParams, 'type is required')
  const parsedType = Zod.nativeEnum(DB.ItemType).safeParse(
    Utils.toConstCase(typeParams)
  )

  if (!parsedType.success) {
    throw RemixNode.json(
      { category: typeParams },
      { status: 404, statusText: 'Page Not Found' }
    )
  }
  const type = parsedType.data

  const accountId = await Session.requireAccountId(request)
  const inventory = await InventoryModel.getInventoryByType({
    type,
    accountId,
  })

  const items = ItemData.getItemsByType({
    type,
    userItems: inventory,
  })

  return RemixNode.json<LoaderData>({ items, type })
}

export default function InventoryCategoryPage() {
  const { items, type } = RemixReact.useLoaderData<LoaderData>()
  console.log(items, type)

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Inventory
      </h1>

      <div>
        <h2 className="text-lg font-medium leading-6 text-gray-12">
          {Utils.toCapitalized(type)}
        </h2>
        <ItemList items={items} />
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