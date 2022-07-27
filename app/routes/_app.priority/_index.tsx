import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import EmptyState from './EmptyState'
import TrackList from './TrackList'

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const formData = await request.formData()
  const name = Zod.string().parse(formData.get('delete'))

  await CharacterModel.deleteTrackCharacter({ name, accountId })

  return null
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const charactersTrack = await CharacterModel.getUserTrackCharacters(accountId)
  return RemixNode.json({ charactersTrack })
}

export default function PriorityPage() {
  const { charactersTrack } = RemixReact.useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
          Priority
        </h1>

        <Button.Link
          styles="button"
          to="./add"
          className="mt-4 w-full sm:mt-0 sm:w-auto"
        >
          Track new character
        </Button.Link>
      </div>

      <div className="mt-12">
        {charactersTrack.length > 0 ? (
          <div>
            <TrackList tracks={charactersTrack} />
            <pre>{JSON.stringify(charactersTrack, null, 2)}</pre>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
      <RemixReact.Outlet />
    </main>
  )
}
