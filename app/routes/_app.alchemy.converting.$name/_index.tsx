import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Zod from 'zod'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import ConvertItem from './ConvertItem'

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const name = Zod.string().parse(params.name)
  const isValidItem = ItemData.validateItem({
    name,
    type: [DB.ItemType.ASCENSION_GEM, DB.ItemType.TALENT_BOSS],
    excludePattern: 'Brilliant Diamond',
  })

  if (!isValidItem) {
    throw RemixNode.json(
      {
        message: `${name} is not an ascension gems or a talent boss material`,
      },
      { status: 404, statusText: 'Item is not valid' }
    )
  }

  const type = Zod.enum(['gem', 'boss']).safeParse(
    new URL(request.url).searchParams.get('type')
  )
  if (!type.success) {
    throw RemixNode.json(
      { message: `Expecting parameter type with value of 'gem' or 'boss'` },
      { status: 400, statusText: 'Missing type parameter' }
    )
  }

  const converter = ItemData.getConverterItems({ name, type: type.data })
  const userSpecialItem = await InventoryModel.getRequiredItems({
    itemNames: [converter.special.name],
    accountId,
  })
  converter.special.quantity.owned =
    userSpecialItem.length > 0 ? userSpecialItem[0].quantity : 0

  return RemixNode.json({ converter })
}

const ItemParams = Zod.object({
  name: Zod.string(),
  type: Zod.enum([
    'COMMON',
    'ASCENSION_GEM',
    'ASCENSION_BOSS',
    'LOCAL_SPECIALTY',
    'TALENT_BOOK',
    'TALENT_BOSS',
    'SPECIAL',
  ]),
  rarity: Zod.number(),
  quantity: Zod.number().optional(),
})

export default function AlchemyConvertingTabPage() {
  const name = Zod.string().parse(RemixReact.useParams().name)
  const items = Zod.object({ items: Zod.array(ItemParams) }).parse(
    Utils.useMatchesData('routes/_app.alchemy.converting/_index')
  ).items
  const itemFind = items.find((item) => item.name === name)
  const item = ItemParams.parse(itemFind)

  const { converter } = RemixReact.useLoaderData<typeof loader>()
  const itemsConverter = converter.items.map((name) => {
    const itemData = ItemParams.parse(items.find((i) => i.name === name))
    return {
      name,
      rarity: itemData.rarity as 1 | 2 | 3 | 4 | 5,
      quantity: {
        owned: itemData.quantity ?? 0,
        required: 1,
      },
    }
  })

  return (
    <ConvertItem
      name={item.name}
      rarity={item.rarity as 1 | 2 | 3 | 4 | 5}
      specialConverter={converter.special}
      itemsConverter={itemsConverter}
    />
  )
}

export function CatchBoundary() {
  const caught = RemixReact.useCatch()

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        ERROR {caught.status} - {caught.statusText}
      </h1>

      <p className="mt-1 font-medium leading-6 text-gray-11">
        {caught.data.message}
      </p>
    </div>
  )
}
