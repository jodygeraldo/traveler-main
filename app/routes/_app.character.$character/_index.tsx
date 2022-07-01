import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import Tabs from '~/components/Tabs'
import { validateCharacter } from '~/data/characters'
import { useActiveNavigation } from '~/utils'

type LoaderData = {
  characterName: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { character: characterName } = params
  invariant(characterName)

  const validCharacter = validateCharacter(characterName)
  if (!validCharacter) {
    throw json(`Character ${characterName} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  return json<LoaderData>({ characterName })
}

export default function CharacterLayout() {
  const { characterName } = useLoaderData() as LoaderData

  const tabs = [
    { name: 'Required Items', to: '.', active: useActiveNavigation('.') },
    {
      name: 'Inventory Level Up',
      to: './inventory-levelup',
      active: useActiveNavigation('./inventory-levelup'),
    },
    {
      name: 'Manual Level Up',
      to: './manual-levelup',
      active: useActiveNavigation('./manual-levelup'),
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        {characterName}
      </h1>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <Tabs tabs={tabs} />
        <main className="pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
