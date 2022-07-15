import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import ItemList from '~/components/ItemList'
import Search from '~/components/Search'
import * as ItemData from '~/data/items'
import useSearchFilter from '~/hooks/useSearchFilter'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'

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

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const inventory = await InventoryModel.getInventory({ accountId })
  const items = ItemData.getAllItems(inventory)

  return RemixNode.json({ items })
}

export default function InventoryPage() {
  const { items } = RemixReact.useLoaderData<typeof loader>()

  const fullItems = React.useMemo(
    () => [
      ...items.common,
      ...items.ascensionGem,
      ...items.ascensionBoss,
      ...items.localSpecialty,
      ...items.talentBook,
      ...items.talentBoss,
      ...items.special,
    ],
    [items]
  )

  const { searchItems, showSearch, changeHandler } = useSearchFilter({
    items: fullItems,
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

      <div className="space-y-12">
        {showSearch ? (
          <>
            <h2 className="text-lg font-medium leading-6 text-gray-12">
              Search
            </h2>
            <ItemList items={searchItems} />
          </>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Common
              </h2>
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
              <h2 className="text-lg font-medium leading-6 text-gray-12">
                Special
              </h2>
              <ItemList items={items.special} />
            </div>
          </>
        )}
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
