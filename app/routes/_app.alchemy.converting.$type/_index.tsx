import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Zod from 'zod'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import ItemList from './ItemList'

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const type = Zod.enum(['all', 'ascension-gem', 'talent-boss']).parse(
    params.type
  )
  let itemNames: string[] = []

  if (type === 'all') {
    itemNames = [
      'Dust of Azoth',
      'Dream Solvent',
      ...ItemData.getConvertableItemNames(),
    ]
  } else {
    const parsedType =
      type === 'ascension-gem'
        ? DB.ItemType.ASCENSION_GEM
        : DB.ItemType.TALENT_BOSS
    itemNames = [
      type === 'ascension-gem' ? 'Dust of Azoth' : 'Dream Solvent',
      ...ItemData.getConvertableItemNamesByType({
        type: parsedType,
      }),
    ]
  }

  const inventory = await InventoryModel.getRequiredItems({
    itemNames,
    accountId,
  })

  const convertableItems = ItemData.getConvertableItems({
    userItems: inventory,
    type: type === 'all' ? undefined : type,
  })

  return RemixNode.json({ ...convertableItems })
}

export default function AlchemyConvertingPage() {
  const items = RemixReact.useLoaderData<typeof loader>()

  if (
    Utils.hasOwnProperty(items, 'ascensionGemConvertable') &&
    Utils.hasOwnProperty(items, 'talentBossConvertable')
  ) {
    const {
      ascensionGemConvertable,
      ascensionGemConverter,
      talentBossConvertable,
      talentBossConverter,
    } = items
    return (
      <>
        <div>
          <ItemList
            heading="Ascension Gem"
            convert="convert-gem"
            converter={ascensionGemConverter}
            convertable={ascensionGemConvertable}
          />
        </div>
        <div className="mt-12">
          <ItemList
            heading="Talent Boss"
            convert="convert-boss"
            converter={talentBossConverter}
            convertable={talentBossConvertable}
          />
        </div>

        <RemixReact.Outlet />
      </>
    )
  }

  if (
    Utils.hasOwnProperty(items, 'ascensionGemConvertable') &&
    !Utils.hasOwnProperty(items, 'talentBossConvertable')
  ) {
    const { ascensionGemConvertable, ascensionGemConverter } = items
    return (
      <>
        <ItemList
          heading="Ascension Gem"
          convert="convert-gem"
          converter={ascensionGemConverter}
          convertable={ascensionGemConvertable}
        />
        <RemixReact.Outlet />
      </>
    )
  }

  if (
    !Utils.hasOwnProperty(items, 'ascensionGemConvertable') &&
    Utils.hasOwnProperty(items, 'talentBossConvertable')
  ) {
    const { talentBossConvertable, talentBossConverter } = items
    return (
      <>
        <ItemList
          heading="Talent Boss"
          convert="convert-boss"
          converter={talentBossConverter}
          convertable={talentBossConvertable}
        />
        <RemixReact.Outlet />
      </>
    )
  }
}
