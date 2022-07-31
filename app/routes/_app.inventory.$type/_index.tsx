import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as DB from '~/db.server'
import useSearchFilter from '~/hooks/useSearchFilter'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as UtilsServer from '~/utils/index.server'
import Container from './Container'
import ItemList from './ItemList'

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

  return RemixNode.json(null, { statusText: 'SUCCESS' })
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const parsedType = Zod.nativeEnum({
    ...DB.ItemType,
    ALL: 'ALL' as const,
  }).safeParse(Utils.toConstCase(params.type ?? ''))

  if (!parsedType.success) {
    throw RemixNode.json(
      { message: `Type ${params.type} is not valid` },
      { status: 404, statusText: 'Page Not Found' }
    )
  }
  const type = parsedType.data

  const accountId = await Session.requireAccountId(request)

  if (type === 'ALL') {
    const inventory = await InventoryModel.getInventory({ accountId })
    const items = UtilsServer.Item.getAllItems(inventory)

    return RemixNode.json({ items })
  }

  const inventory = await InventoryModel.getInventoryByType({
    type,
    accountId,
  })

  const items = UtilsServer.Item.getItemsByType({
    type,
    userItems: inventory,
  })

  return RemixNode.json({ items, type })
}

export default function InventoryCategoryPage() {
  const data = RemixReact.useLoaderData<typeof loader>()

  const combinedItems = Array.isArray(data.items)
    ? [...data.items]
    : [
        ...data.items.common,
        ...data.items.ascensionGem,
        ...data.items.ascensionBoss,
        ...data.items.localSpecialty,
        ...data.items.talentBook,
        ...data.items.talentBoss,
        ...data.items.special,
      ]

  const { searchItems, showSearch, changeHandler } = useSearchFilter({
    items: combinedItems,
    searchBy: 'name',
  })

  if (showSearch) {
    return (
      <Container changeHandler={changeHandler}>
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-12">Search</h2>
          <ItemList items={searchItems} />
        </div>
      </Container>
    )
  }

  if (Utils.hasOwnProperty(data, 'type')) {
    return (
      <Container changeHandler={changeHandler}>
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-12">
            {Utils.toCapitalized(data.type)}
          </h2>
          <ItemList items={data.items} />
        </div>
      </Container>
    )
  }

  return (
    <Container changeHandler={changeHandler}>
      <div className="space-y-12">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-12">Common</h2>
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
      </div>
    </Container>
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
