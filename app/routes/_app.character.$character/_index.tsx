import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixImage from 'remix-image'
import invariant from 'tiny-invariant'
import Tabs from '~/components/Tabs'
import * as CharacterData from '~/data/characters'
import * as Utils from '~/utils'

interface LoaderData {
  characterName: string
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const { character: characterName } = params
  invariant(characterName)

  const validCharacter = CharacterData.validateCharacter(characterName)
  if (!validCharacter) {
    throw RemixNode.json(`Character ${characterName} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  return RemixNode.json<LoaderData>({ characterName })
}

export default function CharacterLayout() {
  const { characterName } = RemixReact.useLoaderData() as LoaderData

  const tabs = [
    { name: 'Required Items', to: '.', active: Utils.useActiveNavigation('.') },
    {
      name: 'Inventory Level Up',
      to: './inventory-levelup',
      active: Utils.useActiveNavigation('./inventory-levelup'),
    },
    {
      name: 'Manual Level Up',
      to: './manual-levelup',
      active: Utils.useActiveNavigation('./manual-levelup'),
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
          {characterName}
        </h1>
        <div className="rounded-full bg-gray-2 p-1">
          <RemixImage.Image
            src={`/image/constellation/${Utils.getImageSrc(characterName)}.png`}
            alt=""
            className="h-8 w-8 flex-shrink-0"
            responsive={[{ size: { width: 32, height: 32 } }]}
            dprVariants={[1, 2, 3]}
          />
        </div>
      </div>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <Tabs tabs={tabs} />
        <main className="pb-16">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
