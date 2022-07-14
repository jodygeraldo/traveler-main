import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import Button from '~/components/Button'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Character Bulk Update - Traveler Main',
})

const ParamsSchema = Zod.object({
  name: Zod.array(Zod.string()),
  level: Zod.array(Zod.number().min(1).max(90)),
  ascension: Zod.array(Zod.number().min(0).max(6)),
  normalAttack: Zod.array(Zod.number().min(1).max(10)),
  elementalSkill: Zod.array(Zod.number().min(1).max(10)),
  elementalBurst: Zod.array(Zod.number().min(1).max(10)),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    console.log(result.errors)
    return RemixNode.json({ errors: result.errors }, { status: 400 })
  }

  let data: {
    characterName: string
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
    ownerId: string
  }[] = []

  result.data.name.forEach((name, index) => {
    data.push({
      characterName: name,
      level: result.data.level[index],
      ascension: result.data.ascension[index],
      normalAttack: result.data.normalAttack[index],
      elementalSkill: result.data.elementalSkill[index],
      elementalBurst: result.data.elementalBurst[index],
      ownerId: accountId,
    })
  })

  await CharacterModel.updateUserCharacters(data)

  return RemixNode.redirect('/character')
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId: accId,
  })
  const characters = CharacterData.getCharactersProgression(userCharacters)

  return RemixNode.json({ characters })
}

export default function CharacterBulkUpdatePage() {
  const { characters } = RemixReact.useLoaderData<typeof loader>()

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <main>
        <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
          Character Bulk Update
        </h1>

        <div className="mt-8 rounded-md bg-info-6 p-2 text-gray-12">
          The save button will save all entries in the form.
        </div>

        <div className="mt-8 space-y-12">
          <RemixReact.Form method="post">
            <div className="space-y-4">
              {characters.map((character) => (
                <div key={character.name}>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-medium leading-6 text-gray-12">
                      {character.name}
                    </h2>

                    <Button type="submit">Save</Button>
                  </div>
                  <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                    <input type="hidden" name="name[]" value={character.name} />
                    <div className="w-full">
                      <InputField
                        id={`${character.name}-level`}
                        name="level[]"
                        label="Level"
                        defaultValue={character.progression.level}
                        min={1}
                        max={90}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        id={`${character.name}-ascension`}
                        name="ascension[]"
                        label="Ascension"
                        defaultValue={character.progression.ascension}
                        min={0}
                        max={6}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        id={`${character.name}-normal-attack`}
                        name="normalAttack[]"
                        label="Normal Attack"
                        defaultValue={character.progression.normalAttack}
                        min={1}
                        max={10}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        id={`${character.name}-elemental-skill`}
                        name="elementalSkill[]"
                        label="Elemental Skill"
                        defaultValue={character.progression.elementalSkill}
                        min={1}
                        max={10}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        id={`${character.name}-elemental-burst`}
                        name="elementalBurst[]"
                        label="Elemental Burst"
                        defaultValue={character.progression.elementalBurst}
                        min={1}
                        max={10}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RemixReact.Form>
        </div>
      </main>
    </div>
  )
}

function InputField({
  id,
  name,
  label,
  defaultValue,
  error,
  min,
  max,
}: {
  label: string
  name: string
  defaultValue?: string | number
  error?: string
  id: string
  min?: number
  max?: number
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-12">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
        defaultValue={defaultValue}
        min={min}
        max={max}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
      />
      <p className="mt-2 text-sm text-danger-9" id={`${id}-error`}>
        {error}
      </p>
    </>
  )
}
