import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RPH from 'remix-params-helper'
import * as Zod from 'zod'
import PageHeading from '~/components/PageHeading'
import * as CharacterModel from '~/models/character.server'
import * as UserModel from '~/models/user.server'
import * as Session from '~/session.server'
import * as HandbookUtils from '~/utils/server/handbook.server'
import Checkin from './Checkin'
import Farmable from './Farmable'
import Material from './Material'
import Priority from './priority'
import ServerSelect from './ServerSelect'
import Stat from './Stat'
import Welcome from './Welcome'

const FormDataSchema = Zod.object({
  server: Zod.enum(['NA', 'EU', 'ASIA']),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RPH.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid server')
  }

  await UserModel.updateAccountServer({ server: result.data.server, accountId })

  return null
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const user = await Session.requireUser(request)

  const [characters, charactersTrack] = await Promise.all([
    CharacterModel.getUserCharacters(user.accounts[0].id),
    CharacterModel.getUserTrackCharacters(user.accounts[0].id),
  ])

  return RemixNode.json({
    server: HandbookUtils.getGenshinDailyReset(user.accounts[0].server),
    farmable: HandbookUtils.getFarmable(user.accounts[0].server),
    stats: HandbookUtils.getStats(characters),
    materials: HandbookUtils.getCharactersTrackMaterials(charactersTrack),
    priority: HandbookUtils.getTopPriorityCharacter(charactersTrack),
  })
}

export default function HandbookPage() {
  const { server, farmable, stats, materials, priority } =
    RemixReact.useLoaderData<typeof loader>()

  return (
    <>
      <PageHeading title="Handbook">
        <ServerSelect server={server} />
      </PageHeading>

      <div className="my-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
          <div className="md:col-span-3">
            <Welcome />
          </div>

          <div className="md:col-span-3">
            <Checkin />
          </div>

          <div className="md:col-span-6 md:row-span-3 xl:col-span-6">
            <Farmable todayFarmable={farmable} />
          </div>

          <div className="md:col-span-6">
            <Stat stats={stats} />
          </div>

          <div className="md:col-span-2 lg:col-span-6 xl:col-span-2">
            <Priority priority={priority} />
          </div>

          {materials.length > 0 ? (
            <div className="md:col-span-4 lg:col-span-6 xl:col-span-4">
              <Material materials={materials} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
