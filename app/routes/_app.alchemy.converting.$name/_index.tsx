import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import CatchBoundaryComponent from './CatchBoundary'
import ConvertItem from './ConvertItem'

const ParamsSchema = Zod.object({
  itemConverter: Zod.string(),
  quantity: Zod.number().positive(),
  specialItemName: Zod.string(),
  specialItemQuantity: Zod.number().positive(),
})

interface ActionData {
  error: {
    message: string
  }
}

export async function action({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = Zod.string().parse(params.name)

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const itemToConvert = {
    name,
    converter: {
      special: {
        name: result.data.specialItemName,
        quantity: result.data.specialItemQuantity * result.data.quantity,
      },
      item: {
        name: result.data.itemConverter,
        quantity: result.data.quantity,
      },
    },
  }

  const error = await InventoryModel.convertItem({
    ...itemToConvert,
    accountId,
  })

  if (error) {
    return RemixNode.json<ActionData>({ error }, { status: 400 })
  }

  return RemixNode.redirect('/alchemy/converting')
}

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
  const actionData = RemixReact.useActionData<ActionData>()

  const name = Zod.string().parse(RemixReact.useParams().name)
  const [searchParams] = RemixReact.useSearchParams()
  const type = Zod.enum(['gem', 'boss']).parse(searchParams.get('type'))

  const { items, dustOfAzoth, dreamSolvent } = Zod.object({
    items: Zod.array(ItemParams),
    dustOfAzoth: ItemParams,
    dreamSolvent: ItemParams,
  }).parse(Utils.useMatchesData('routes/_app.alchemy.converting/_index'))

  const itemFind = items.find((item) => item.name === name)
  const item = ItemParams.parse(itemFind)

  const { converter } = RemixReact.useLoaderData<typeof loader>()
  const specialConverter = {
    ...converter.special,
    quantity: {
      owned:
        type === 'gem' ? dustOfAzoth.quantity ?? 0 : dreamSolvent.quantity ?? 0,
      required: converter.special.quantity.required,
    },
  }

  const itemsConverter = converter.items
    .map((name) => {
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
    .filter((item) => item.quantity.owned > 0)

  return (
    <ConvertItem
      name={item.name}
      rarity={item.rarity as 1 | 2 | 3 | 4 | 5}
      specialConverter={specialConverter}
      itemsConverter={itemsConverter}
      error={actionData?.error}
    />
  )
}

export function CatchBoundary() {
  const caught = RemixReact.useCatch()

  return (
    <CatchBoundaryComponent
      status={caught.status}
      statusText={caught.statusText}
      message={caught.data.message}
    />
  )
}
