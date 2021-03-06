import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import SidebarSub from '~/components/Sidebar'
import * as UtilsServer from '~/utils/index.server'
import ConstellationImage from './ConstellationImage'

const navigation = [
  {
    name: 'Required Items',
    to: './required-items',
  },
  {
    name: 'Inventory Level Up',
    to: './inventory-levelup',
  },
  {
    name: 'Manual Level Up',
    to: './manual-levelup',
  },
]

export async function loader({ params }: RemixNode.LoaderArgs) {
  const { name } = params
  const validCharacter = UtilsServer.Character.validateCharacter(name)
  if (!validCharacter) {
    throw RemixNode.json(`Character ${name} not found`, {
      status: 404,
      statusText: 'Character Not Found',
    })
  }

  return RemixNode.json({ name })
}

export default function CharacterLayout() {
  const { name } = RemixReact.useLoaderData<typeof loader>()

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <div className="sticky top-6">
            <SidebarSub navigation={navigation} />
          </div>
        </div>

        <main className="mt-8 lg:col-span-10 lg:mt-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
              {name}
            </h1>
            {name.includes('Traveler') ? (
              <div className="flex items-center rounded-full bg-gray-2 p-1">
                <ConstellationImage name="Aether" />
                <ConstellationImage name="Lumine" />
              </div>
            ) : (
              <div className="rounded-full bg-gray-2 p-1">
                <ConstellationImage name={name} />
              </div>
            )}
          </div>

          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
