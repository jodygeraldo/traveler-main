import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import ItemList from '~/components/ItemList'
import Search from '~/components/Search'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import useSearchFilter from '~/hooks/useSearchFilter'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const ParamsSchema = Zod.object({
    name: Zod.string(),
    quantity: Zod.number().min(0).max(9999),
  })

  const { name, quantity } = await RemixParamsHelper.getFormDataOrFail(
    request,
    ParamsSchema
  )

  await InventoryModel.upsertInventoryItem({
    accountId,
    name,
    quantity,
  })

  return null
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const { type: typeParams } = params
  invariant(typeParams, 'type is required')
  const parsedType = Zod.nativeEnum({
    ...DB.ItemType,
    ALL: 'ALL' as const,
  }).safeParse(Utils.toConstCase(typeParams))

  if (!parsedType.success) {
    throw RemixNode.json(
      { category: typeParams },
      { status: 404, statusText: 'Page Not Found' }
    )
  }
  const type = parsedType.data

  const accountId = await Session.requireAccountId(request)

  if (type === 'ALL') {
    const inventory = await InventoryModel.getInventory({ accountId })
    const items = ItemData.getAllItems(inventory)

    return RemixNode.json({ items })
  }

  const inventory = await InventoryModel.getInventoryByType({
    type,
    accountId,
  })

  const items = ItemData.getItemsByType({
    type,
    userItems: inventory,
  })

  return RemixNode.json({ items, type })
}

export default function InventoryCategoryPage() {
  const data = RemixReact.useLoaderData<typeof loader>()

  const combinedItems = React.useMemo(
    () =>
      Array.isArray(data.items)
        ? [...data.items]
        : [
            ...data.items.common,
            ...data.items.ascensionGem,
            ...data.items.ascensionBoss,
            ...data.items.localSpecialty,
            ...data.items.talentBook,
            ...data.items.talentBoss,
            ...data.items.special,
          ],
    [data.items]
  )

  const { searchItems, showSearch, changeHandler } = useSearchFilter({
    items: combinedItems,
    searchBy: 'name',
  })

  return (
    <div className="space-y-12">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
          Inventory
        </h1>

        <div className="mt-2 sm:mt-0">
          <Search changeHandler={changeHandler} />
        </div>
      </div>

      {Utils.hasOwnProperty(data, 'type') ? (
        <div>
          {showSearch ? (
            <>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Search
              </h2>
              <ItemList items={searchItems} />
            </>
          ) : (
            <>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                {Utils.toCapitalized(data.type)}
              </h2>
              <ItemList items={data.items} />
            </>
          )}
        </div>
      ) : showSearch ? (
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-12">Search</h2>
          <ItemList items={searchItems} />
        </div>
      ) : (
        <div className="space-y-12">
          <>
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Common
              </h2>
              <ItemList items={data.items.common} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Ascension Gem
              </h2>
              <ItemList items={data.items.ascensionGem} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Ascension Boss
              </h2>
              <ItemList items={data.items.ascensionBoss} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Local Specialty
              </h2>
              <ItemList items={data.items.localSpecialty} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Talent Book
              </h2>
              <ItemList items={data.items.talentBook} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Talent Boss
              </h2>
              <ItemList items={data.items.talentBoss} />
            </div>

            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Special
              </h2>
              <ItemList items={data.items.special} />
            </div>
          </>
        </div>
      )}
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
