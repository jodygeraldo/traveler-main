import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
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

  const isValidItem = ItemData.validateItem({
    name: name,
    type:
      convert === 'convert-boss'
        ? DB.ItemType.TALENT_BOSS
        : DB.ItemType.ASCENSION_GEM,
    excludePattern: 'Brilliant Diamond',
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
    type: convert === 'convert-gem' ? 'gem' : 'boss',
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

  const { name } = ParamsSchema.parse(RemixReact.useParams())

  const { converter } = RemixReact.useLoaderData<typeof loader>()

  console.log(
    Utils.useMatchesData('routes/_app.alchemy.converting.$type/_index')
  )
  const items = Zod.object({
    ascensionGemConvertable: Zod.array(ItemParams).optional(),
    ascensionGemConverter: ItemParams.optional(),
    talentBossConvertable: Zod.array(ItemParams).optional(),
    talentBossConverter: ItemParams.optional(),
  }).parse(Utils.useMatchesData('routes/_app.alchemy.converting.$type/_index'))

  if (
    Utils.hasOwnProperty(items, 'ascensionGemConvertable') &&
    Utils.hasOwnProperty(items, 'ascensionGemConverter')
  ) {
    const { ascensionGemConvertable, ascensionGemConverter } = items
    invariant(ascensionGemConvertable)
    invariant(ascensionGemConverter)

    const itemFind = ascensionGemConvertable.find((item) => item.name === name)
    const item = ItemParams.parse(itemFind)
    const specialConverter = {
      ...ascensionGemConverter,
      requiredQuantity: converter.specialRequiredQuantity,
    }

    const itemsConverter = converter.items
      .map((name) => {
        const itemData = ItemParams.parse(
          ascensionGemConvertable.find((i) => i.name === name)
        )
        return {
          name,
          rarity: itemData.rarity,
          quantity: itemData.quantity,
          requiredQuantity: 1,
        }
      })
      .filter((item) => item.quantity > 0)

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

  if (
    Utils.hasOwnProperty(items, 'talentBossConvertable') &&
    Utils.hasOwnProperty(items, 'talentBossConverter')
  ) {
    const { talentBossConvertable, talentBossConverter } = items
    invariant(talentBossConvertable)
    invariant(talentBossConverter)

    const itemFind = talentBossConvertable.find((item) => item.name === name)
    const item = ItemParams.parse(itemFind)
    const specialConverter = {
      ...talentBossConverter,
      requiredQuantity: converter.specialRequiredQuantity,
    }

    const itemsConverter = converter.items
      .map((name) => {
        const itemData = ItemParams.parse(
          talentBossConvertable.find((i) => i.name === name)
        )
        return {
          name,
          rarity: itemData.rarity,
          quantity: itemData.quantity,
          requiredQuantity: 1,
        }
      })
      .filter((item) => item.quantity > 0)
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
