import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as UtilsServer from '~/utils/index.server'
import DataGrid from './DataGrid'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Character Bulk Update - Traveler Main',
})

const FormDataSchema = Zod.object({
  name: Zod.string(),
  level: Zod.number().min(1).max(90),
  ascension: Zod.number().min(0).max(6),
  normalAttack: Zod.number().min(1).max(10),
  elementalSkill: Zod.number().min(1).max(10),
  elementalBurst: Zod.number().min(1).max(10),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)
  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }
  const { name, ...progression } = result.data

  const validCharacter = UtilsServer.Character.validateCharacter(name)
  if (!validCharacter) {
    throw RemixNode.json(`Character ${name} not found`, {
      status: 404,
      statusText: 'Character Not Found',
    })
  }

  await CharacterModel.upsertCharacter({
    name,
    progression,
    accountId,
  })

  return null
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId: accId,
  })
  const characters =
    UtilsServer.Character.getCharactersProgression(userCharacters)

  return RemixNode.json({ characters })
}

export default function CharacterBulkUpdatePage() {
  const { characters } = RemixReact.useLoaderData<typeof loader>()
  const fetcher = RemixReact.useFetcher()

  // TODO: saved automatically while editing

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <main>
          <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
            Characters Bulk Update
          </h1>

          {/* <div className="mt-8 rounded-md bg-info-6 p-2 text-gray-12">
            The data will be saved automatically while you are editing the value
            of the fields. You can also save the data by clicking the "Save"
            button.
          </div> */}

          <fetcher.Form method="post" replace>
            <div className="mt-12">
              <DataGrid characters={characters} submit={fetcher.submit} />
            </div>
          </fetcher.Form>
        </main>
      </div>
    </div>
  )
}
