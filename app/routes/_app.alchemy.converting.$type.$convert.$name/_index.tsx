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

const FormDataSchema = Zod.object({
  itemConverter: Zod.string(),
  quantity: Zod.number().positive(),
  specialItemName: Zod.string(),
  specialItemQuantity: Zod.number().positive(),
})

const ParamsSchema = Zod.object({
  type: Zod.enum(['all', 'ascension-gem', 'talent-boss']),
  convert: Zod.enum(['convert-gem', 'convert-boss']),
  name: Zod.string(),
})

interface ActionData {
  error: {
    message: string
  }
}

export async function action({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const parsedParams = ParamsSchema.safeParse(params)

  if (!parsedParams.success) {
    throw RemixNode.json(
      { message: `Params is set properly` },
      { status: 400, statusText: 'Invalid params' }
    )
  }

  const { name, type } = parsedParams.data

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { specialItemName, specialItemQuantity, itemConverter, quantity } =
    result.data

  const itemToConvert = {
    name,
    converter: {
      special: {
        name: specialItemName,
        quantity: specialItemQuantity * quantity,
      },
      item: {
        name: itemConverter,
        quantity: quantity,
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

  return RemixNode.redirect(`/alchemy/converting/${type}`)
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  await Session.requireAccountId(request)

  const result = ParamsSchema.safeParse(params)

  if (!result.success) {
    throw RemixNode.json(
      { message: `Expecting convert type of 'convert-gem' or 'convert-boss'` },
      { status: 400, statusText: 'Invalid convert type' }
    )
  }

  const { name, convert } = result.data

  const itemType =
    convert === 'convert-boss'
      ? DB.ItemType.TALENT_BOSS
      : DB.ItemType.ASCENSION_GEM

  const isValidItem = ItemData.isValidConvertable({
    name,
    type: itemType,
  })

  if (!isValidItem) {
    throw RemixNode.json(
      {
        message: `${name} is not ${
          convert === 'convert-boss' ? 'talent boss material' : 'ascension gem'
        }`,
      },
      { status: 404, statusText: 'Invalid Item' }
    )
  }

  const converter = ItemData.getConverterItems({
    name,
    type: itemType,
  })

  return RemixNode.json({ converter })
}

const ItemParams = Zod.object({
  name: Zod.string(),
  rarity: Zod.number(),
  quantity: Zod.number(),
})

export default function AlchemyConvertingTabPage() {
  const actionData = RemixReact.useActionData<ActionData>()

  const { name, convert } = ParamsSchema.parse(RemixReact.useParams())

  const { converter } = RemixReact.useLoaderData<typeof loader>()

  const items = Zod.union([
    Zod.object({
      convertable: Zod.array(ItemParams),
      converter: ItemParams,
    }),
    Zod.object({
      ascensionGem: Zod.object({
        convertable: Zod.array(ItemParams),
        converter: ItemParams,
      }),
      talentBoss: Zod.object({
        convertable: Zod.array(ItemParams),
        converter: ItemParams,
      }),
    }),
  ]).parse(Utils.useMatchesData('routes/_app.alchemy.converting.$type/_index'))

  if (
    Utils.hasOwnProperty(items, 'convertable') &&
    Utils.hasOwnProperty(items, 'converter')
  ) {
    const specialConverter = {
      ...items.converter,
      requiredQuantity: converter.specialRequiredQuantity,
    }

    const itemsConverter = converter.items
      .map((name) => {
        const itemData = ItemParams.parse(
          items.convertable.find((i) => i.name === name)
        )

        return {
          name,
          rarity: itemData.rarity,
          quantity: itemData.quantity,
          requiredQuantity: 1,
        }
      })
      .filter((item) => item.quantity > 0)

    const itemFind = items.convertable.find((item) => item.name === name)
    const item = ItemParams.parse(itemFind)

    return (
      <ConvertItem
        name={name}
        rarity={item.rarity}
        specialConverter={specialConverter}
        itemsConverter={itemsConverter}
        error={actionData?.error}
      />
    )
  }

  const convertItem =
    convert === 'convert-boss' ? items.talentBoss : items.ascensionGem
  const specialConverter = {
    ...convertItem.converter,
    requiredQuantity: converter.specialRequiredQuantity,
  }

  const itemsConverter = converter.items
    .map((name) => {
      const itemData = ItemParams.parse(
        convertItem.convertable.find((i) => i.name === name)
      )

      return {
        name,
        rarity: itemData.rarity,
        quantity: itemData.quantity,
        requiredQuantity: 1,
      }
    })
    .filter((item) => item.quantity > 0)

  const itemFind = convertItem.convertable.find((item) => item.name === name)
  const item = ItemParams.parse(itemFind)

  return (
    <ConvertItem
      name={name}
      rarity={item.rarity}
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
