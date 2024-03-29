import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RPH from 'remix-params-helper'
import * as Zod from 'zod'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as CharacterUtils from '~/utils/server/character.server'
import CharacterGridView from './CharacterGridView'
import Toolbar from './Filter'
import SearchCharacter from './SearchCharacter'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Characters - Traveler Main',
})

const FormDataSchema = Zod.object({
  name: Zod.string(),
  ascension: Zod.number(),
  level: Zod.number().optional(),
  normalAttack: Zod.number().optional(),
  elementalSkill: Zod.number().optional(),
  elementalBurst: Zod.number().optional(),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RPH.getFormData(request, FormDataSchema)
  if (!result.success) {
    return RemixNode.json(
      { success: result.success, errors: result.errors },
      { status: 400 }
    )
  }

  const { name, ...progression } = result.data

  const parsedName = CharacterUtils.parseCharacterNameOrThrow({ name })

  const errors = CharacterUtils.validateAscensionRequirement(progression)
  if (errors) {
    return RemixNode.json({ success: false, errors }, { status: 400 })
  }

  await CharacterModel.upsertCharacter({
    name: parsedName,
    progression,
    accountId,
  })

  return RemixNode.json({ success: true, errors: {} })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters(accountId)
  const characters = CharacterUtils.getCharacters(userCharacters)

  return RemixNode.json({ characters })
}

export default function CharactersPage() {
  const { characters } = RemixReact.useLoaderData<typeof loader>()

  const [searchParams] = RemixReact.useSearchParams()
  const vision = searchParams.get('vision')
  const weapon = searchParams.get('weapon')
  const region = searchParams.get('region')
  const rarity = searchParams.get('rarity')
  const q = searchParams.get('q')

  const filteredCharacters = characters.filter((c) => {
    if (vision && c.vision !== vision.toUpperCase()) return false
    if (weapon && c.weapon !== weapon.toUpperCase()) return false
    if (region && c.region !== region.toUpperCase()) return false
    if (rarity && c.rarity.toString() !== rarity) return false
    if (q && !c.name.toLowerCase().includes(q.toLowerCase())) return false

    return true
  })

  return (
    <main className="mx-auto max-w-3xl py-10 lg:max-w-7xl">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
          Characters
        </h1>

        <div className="mt-4 sm:mt-0">
          <SearchCharacter />
        </div>
      </div>

      <div className="mt-8 sm:px-6 lg:px-8">
        <Toolbar />
      </div>

      <div className="mt-4">
        {filteredCharacters.length > 0 ? (
          <CharacterGridView characters={filteredCharacters} />
        ) : (
          <div className="text-center">
            <p className="text-gray-11">No characters found</p>
          </div>
        )}
      </div>
    </main>
  )
}

export const unstable_shouldReload: RemixReact.ShouldReloadFunction = ({
  submission,
}) => {
  return !!submission && submission.method !== 'GET'
}
