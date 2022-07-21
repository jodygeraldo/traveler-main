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
import CraftItem from './CraftItem'

const FormDataSchema = Zod.object({
  quantity: Zod.number().positive(),
  crafterName: Zod.string(),
  crafterQuantity: Zod.number().positive(),
  bonusQuantity: Zod.number().optional().default(0),
  bonusType: Zod.enum(['Refund', 'Bonus']).optional(),
})

const ParamsSchema = Zod.object({
  type: Zod.enum(['all', 'enhancement', 'ascension', 'talent']),
  craft: Zod.enum(['craft-enhancement', 'craft-ascension', 'craft-talent']),
  name: Zod.string(),
})

interface ActionData {
  error: {
    message: string
  }
}

export async function action({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const { name, type } = ParamsSchema.parse(params)

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    console.log(result.errors)
    throw new Error('Invalid data')
  }

  const { crafterName, crafterQuantity, quantity, bonusQuantity, bonusType } =
    result.data

  const error = await InventoryModel.craftItem({
    name,
    quantity,
    crafterName,
    crafterQuantity: crafterQuantity * quantity,
    bonusType,
    bonusQuantity,
    accountId,
  })

  if (error) {
    return RemixNode.json<ActionData>({ error }, { status: 400 })
  }

  return RemixNode.redirect(`/alchemy/crafting/${type}`)
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  await Session.requireAccountId(request)

  const result = ParamsSchema.safeParse(params)

  if (!result.success) {
    throw RemixNode.json(
      {
        message: `Expecting craft type of 'craft-enhancement' or 'craft-ascension' or 'craft-talent'`,
      },
      { status: 400, statusText: 'Invalid craft type' }
    )
  }

  const { name, craft } = result.data

  const itemType =
    craft === 'craft-enhancement'
      ? DB.ItemType.COMMON
      : craft === 'craft-ascension'
      ? DB.ItemType.ASCENSION_GEM
      : DB.ItemType.TALENT_BOOK

  const isValidItem = ItemData.isValidCraftable({ name, type: itemType })

  if (!isValidItem) {
    const message = `${name} is not ${
      craft === 'craft-enhancement'
        ? 'common material'
        : craft === 'craft-ascension'
        ? 'ascension gem'
        : 'talent book'
    }`

    throw RemixNode.json(
      { message },
      { status: 404, statusText: 'Invalid Item' }
    )
  }

  const item = ItemData.getCrafterItem(name)
  console.log(item);

  return RemixNode.json({ item })
}

const ItemParams = Zod.object({
  name: Zod.string(),
  rarity: Zod.number(),
  quantity: Zod.number(),
})

export default function AlchemyConvertingTabPage() {
  const actionData = RemixReact.useActionData<ActionData>()

  const { name, craft } = ParamsSchema.parse(RemixReact.useParams())

  const { item } = RemixReact.useLoaderData<typeof loader>()

  const items = Zod.union([
    Zod.object({
      craftable: Zod.array(ItemParams),
      crafterNonCraftable: Zod.array(ItemParams),
    }),
    Zod.object({
      enhancementCraftable: Zod.object({
        craftable: Zod.array(ItemParams),
        crafterNonCraftable: Zod.array(ItemParams),
      }),
      ascensionCraftable: Zod.object({
        craftable: Zod.array(ItemParams),
        crafterNonCraftable: Zod.array(ItemParams),
      }),
      talentCraftable: Zod.object({
        craftable: Zod.array(ItemParams),
        crafterNonCraftable: Zod.array(ItemParams),
      }),
    }),
  ]).parse(Utils.useMatchesData('routes/_app.alchemy.crafting.$type/_index'))

  if (
    Utils.hasOwnProperty(items, 'craftable') &&
    Utils.hasOwnProperty(items, 'crafterNonCraftable')
  ) {
    const craftItem = ItemParams.parse(
      items.craftable.find((i) => i.name === name)
    )
    const allItems = [...items.craftable, ...items.crafterNonCraftable]
    const userCrafter = ItemParams.parse(
      allItems.find((i) => i.name === item.crafter.name)
    )

    return (
      <CraftItem
        name={name}
        rarity={craftItem.rarity}
        crafter={{
          ...userCrafter,
          requiredQuantity: item.crafter.quantity,
        }}
        refundable={item.refundable}
        doublable={item.doublable}
        error={actionData?.error}
      />
    )
  }

  const craftItems =
    craft === 'craft-enhancement'
      ? items.enhancementCraftable
      : craft === 'craft-ascension'
      ? items.ascensionCraftable
      : items.talentCraftable
  const craftItem = ItemParams.parse(
    craftItems.craftable.find((i) => i.name === name)
  )
  const allItems = [...craftItems.craftable, ...craftItems.crafterNonCraftable]
  const userCrafter = ItemParams.parse(
    allItems.find((i) => i.name === item.crafter.name)
  )

  return (
    <CraftItem
      name={name}
      rarity={craftItem.rarity}
      crafter={{
        ...userCrafter,
        requiredQuantity: item.crafter.quantity,
      }}
      refundable={item.refundable}
      doublable={item.doublable}
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
