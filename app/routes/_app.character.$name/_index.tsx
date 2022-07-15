import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as CharacterData from '~/data/characters'
import CharacterTabs from './CharacterTabs'
import ConstellationImage from './ConstellationImage'

export async function loader({ params }: RemixNode.LoaderArgs) {
  const { name } = params
  invariant(name)

  const validCharacter = CharacterData.validateCharacter(name)
  if (!validCharacter) {
    throw RemixNode.json(`Character ${name} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  return RemixNode.json({ name })
}

export default function CharacterLayout() {
  const { name } = RemixReact.useLoaderData<typeof loader>()

  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
          {name}
        </h1>
        {name.includes('Traveler') ? (
          <div className="flex items-center rounded-full bg-gray-2 p-1">
            <ConstellationImage name="aether" />
            <ConstellationImage name="lumine" />
          </div>
        ) : (
          <div className="rounded-full bg-gray-2 p-1">
            <ConstellationImage name={name} />
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <CharacterTabs />
        <main className="pb-16">
          <RemixReact.Outlet />
        </main>
      </div>
    </>
  )
}
