import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
// import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
// import type * as CharacterType from '~/types/character'
import * as UtilsServer from '~/utils/index.server'
import DataGrid from './DataGrid'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Character Bulk Update - Traveler Main',
})

const FormDataSchema = Zod.object({
  name: Zod.array(Zod.string()),
  level: Zod.array(Zod.number().min(1).max(90)),
  ascension: Zod.array(Zod.number().min(0).max(6)),
  normalAttack: Zod.array(Zod.number().min(1).max(10)),
  elementalSkill: Zod.array(Zod.number().min(1).max(10)),
  elementalBurst: Zod.array(Zod.number().min(1).max(10)),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const formData = await request.formData()
  console.log(formData.get('name'))
  console.log(formData.get('kind'))
  console.log(formData.get('value'))

  return null
  // const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  // if (!result.success) {
  //   return RemixNode.json({ errors: result.errors }, { status: 400 })
  // }

  // let data: {
  //   name: CharacterType.Name
  //   level: number
  //   ascension: number
  //   normalAttack: number
  //   elementalSkill: number
  //   elementalBurst: number
  //   ownerId: string
  // }[] = []

  // result.data.name.forEach((name, index) => {
  //   const validCharacter = UtilsServer.Character.validateCharacter(name)
  //   if (!validCharacter) {
  //     throw RemixNode.json(`Character ${name} not found`, {
  //       status: 404,
  //       statusText: 'Character Not Found',
  //     })
  //   }

  //   data.push({
  //     name,
  //     level: result.data.level[index],
  //     ascension: result.data.ascension[index],
  //     normalAttack: result.data.normalAttack[index],
  //     elementalSkill: result.data.elementalSkill[index],
  //     elementalBurst: result.data.elementalBurst[index],
  //     ownerId: accountId,
  //   })
  // })

  // await CharacterModel.updateUserCharacters(data)

  // return RemixNode.redirect('/character')
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

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <main>
          <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
            Characters Bulk Update
          </h1>

          <div className="mt-8 rounded-md bg-info-6 p-2 text-gray-12">
            The data will be saved automatically while you are editing the value
            of the fields. You can also save the data by clicking the "Save"
            button.
          </div>

          <RemixReact.Form method="post" id="character-update" />

          <div className="mt-12">
            <DataGrid characters={characters} />
          </div>
        </main>
      </div>
    </div>
  )
}
