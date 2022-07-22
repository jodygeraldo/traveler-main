import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Zod from 'zod'
import * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils/index'
import * as UtilsServer from '~/utils/index.server'
import ItemList from './ItemList'

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const type = Zod.enum(['all', 'enhancement', 'ascension', 'talent']).parse(
    params.type
  )
  let itemNames: string[] = []

  if (type === 'all') {
    itemNames = UtilsServer.Item.getCraftItemNames()
  } else {
    const parsedType =
      type === 'enhancement'
        ? DB.ItemType.COMMON
        : type === 'ascension'
        ? DB.ItemType.ASCENSION_GEM
        : DB.ItemType.TALENT_BOOK

    itemNames = UtilsServer.Item.getCraftItemNamesByType({
      type: parsedType,
    })
  }

  const inventory = await InventoryModel.getRequiredItems({
    itemNames,
    accountId,
  })

  const craftable = UtilsServer.Item.getCraftableItems({
    userItems: inventory,
    type: type === 'all' ? undefined : type,
  })

  return RemixNode.json(craftable)
}

export default function AlchemyConvertingPage() {
  const items = RemixReact.useLoaderData<typeof loader>()
  const craft = Zod.enum(['all', 'enhancement', 'ascension', 'talent']).parse(
    RemixReact.useParams().type
  )

  if (
    Utils.hasOwnProperty(items, 'craftable') &&
    Utils.hasOwnProperty(items, 'crafterNonCraftable')
  ) {
    let props: {
      heading: string
      craft: 'craft-enhancement' | 'craft-ascension' | 'craft-talent'
    } = {
      heading: 'Enhancement',
      craft: 'craft-enhancement',
    }

    if (craft === 'ascension') {
      props.heading = 'Ascension'
      props.craft = 'craft-ascension'
    }

    if (craft === 'talent') {
      props.heading = 'Talent'
      props.craft = 'craft-talent'
    }

    return (
      <>
        <div>
          <ItemList heading={props.heading} craft={props.craft} items={items} />
        </div>

        <RemixReact.Outlet />
      </>
    )
  }

  return (
    <>
      <div>
        <ItemList
          heading="Enhancement"
          craft="craft-enhancement"
          items={items.enhancementCraftable}
        />
      </div>
      <div className="mt-12">
        <ItemList
          heading="Ascension"
          craft="craft-ascension"
          items={items.ascensionCraftable}
        />
      </div>
      <div className="mt-12">
        <ItemList
          heading="Talent"
          craft="craft-talent"
          items={items.talentCraftable}
        />
      </div>

      <RemixReact.Outlet />
    </>
  )
}
