import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as CharacterUtils from '~/utils/server/character.server'
import EmptyState from './EmptyState'
import TrackList from './TrackList'

const FormDataSchema = Zod.object({
  intent: Zod.enum(['delete', 'reorder']),
  name: Zod.string().optional(),
  orders: Zod.string().optional(),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { intent, name, orders } = result.data

  if (intent === 'delete') {
    await CharacterModel.deleteTrackCharacter({
      name: Zod.string().parse(name),
      accountId,
    })
  }

  if (intent === 'reorder') {
    await CharacterModel.updateCharacterTrackOrder({
      orders: Zod.object({
        id: Zod.string(),
        priority: Zod.number().nonnegative(),
      })
        .array()
        .parse(JSON.parse(Zod.string().parse(orders))),
      accountId,
    })
  }

  return RemixNode.json(null, { statusText: 'SUCCESS' })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const tracks = await CharacterModel.getUserTrackCharacters(accountId)

  const tracksWithItems = CharacterUtils.getCharactersTrackItems(tracks)

  return RemixNode.json({ tracksWithItems })
}

export default function TrackPage() {
  const { tracksWithItems } = RemixReact.useLoaderData<typeof loader>()
  const name = RemixReact.useParams().name || ''

  const { pathname, key } = RemixReact.useLocation()

  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
          Tracks
        </h1>

        <Button.Link
          styles="button"
          to="./add"
          className="mt-4 w-full sm:mt-0 sm:w-auto"
        >
          Track new character
        </Button.Link>
      </div>

      <div key={key} className="mt-12">
        {tracksWithItems.length > 0 ? (
          <TrackList userTracks={tracksWithItems} />
        ) : (
          <EmptyState />
        )}
      </div>

      {pathname === `/track/add` || pathname === `/track/update/${name}` ? (
        <RemixReact.Outlet />
      ) : null}
    </main>
  )
}
