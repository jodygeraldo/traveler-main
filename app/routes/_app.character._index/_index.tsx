import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Zod from 'zod'
import Button from '~/components/Button'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Search from '~/components/Search'
import * as Cookie from '~/cookies'
import * as CharacterData from '~/data/characters'
import useSearchFilter from '~/hooks/useSearchFilter'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import CharacterGrid from './CharacterGrid'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Characters - Traveler Main',
})

export async function action({ request }: RemixNode.ActionArgs) {
  const formData = await request.formData()
  const userPref = await Cookie.getUserPrefsCookie(request)
  userPref.characterView = formData.get('characterView') ?? 'grid'

  return RemixNode.json(null, {
    headers: {
      'Set-Cookie': await Cookie.userPrefs.serialize(userPref),
    },
  })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId: accId,
  })
  const characters = CharacterData.getCharacters(userCharacters)

  const characterView = await Cookie.getCharacterViewPref(request)

  return RemixNode.json({ characters, view: characterView })
}

export default function CharactersPage() {
  const { characters, view } = RemixReact.useLoaderData<typeof loader>()
  const fetcher = RemixReact.useFetcher()

  const optimisticView = fetcher.submission
    ? Zod.string().parse(fetcher.submission.formData.get('characterView'))
    : view

  const { searchItems, showSearch, changeHandler } = useSearchFilter({
    items: characters,
    searchBy: 'name',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <main>
        <div className="space-y-12">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
                Characters
              </h1>

              <fetcher.Form
                action="/character?index"
                method="post"
                replace={true}
                className="ml-6 flex items-center rounded-lg bg-gray-3 p-0.5"
              >
                <button
                  type="submit"
                  name="characterView"
                  value="list"
                  className={clsx(
                    optimisticView === 'list'
                      ? 'bg-gray-2 shadow-sm'
                      : 'hover:bg-gray-2 hover:shadow-sm',
                    'rounded-md p-1.5 text-gray-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-8'
                  )}
                >
                  {optimisticView === 'list' ? (
                    <Icon.Solid
                      name="viewList"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon.Outline
                      name="viewList"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">Use list view</span>
                </button>
                <button
                  type="submit"
                  name="characterView"
                  value="grid"
                  className={clsx(
                    optimisticView === 'list'
                      ? 'hover:bg-gray-2 hover:shadow-sm'
                      : 'bg-gray-2 shadow-sm',
                    'ml-0.5 rounded-md p-1.5 text-gray-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-8'
                  )}
                >
                  {optimisticView === 'list' ? (
                    <Icon.Outline
                      name="viewGrid"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon.Solid
                      name="viewGrid"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">Use grid view</span>
                </button>
              </fetcher.Form>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <RemixReact.Link to="./bulk-update">
                <Button>Bulk update</Button>
              </RemixReact.Link>

              <Search
                changeHandler={changeHandler}
                placeholder="Search character"
              />
            </div>
          </div>

          {optimisticView === 'list' ? (
            <CharacterList characters={showSearch ? searchItems : characters} />
          ) : (
            <CharacterGrid characters={showSearch ? searchItems : characters} />
          )}
        </div>
      </main>
    </div>
  )
}

function CharacterList({
  characters,
}: {
  characters: CharacterData.Character[]
}) {
  return (
    <div className="overflow-hidden rounded-md bg-gray-2 shadow">
      <ul className="divide-y divide-gray-6">
        {characters.map((character) => (
          <CharacterListItem key={character.name} character={character} />
        ))}
      </ul>
    </div>
  )
}

function CharacterListItem({
  character,
}: {
  character: CharacterData.Character
}) {
  return (
    <li>
      <RemixReact.Link
        to={`/character/${character.name}`}
        prefetch="intent"
        className="block hover:bg-gray-3"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={`/character/${Utils.getImageSrc(character.name)}.png`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <Image
                  src={`/element/${Utils.getImageSrc(character.vision)}.png`}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute -top-1.5 -left-1.5 h-4 w-4"
                />
              </div>

              <div>
                <h2 className="truncate font-medium text-gray-12">
                  {character.name}
                </h2>

                <div className="flex gap-4 text-gray-11">
                  <p>Lv. {character.progression?.level ?? 1}</p>
                  <p>Ascension {character.progression?.ascension ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="hidden gap-4 text-gray-11 sm:flex">
              <CellWithImage
                src={`/talent/normal_attack_${Utils.getImageSrc(
                  character.weapon
                )}.png`}
                quantity={character.progression?.normalAttack ?? 1}
                text={character.talent[0]}
              />
              <CellWithImage
                src={`/talent/elemental_skill_${Utils.getImageSrc(
                  character.name
                )}.png`}
                quantity={character.progression?.elementalSkill ?? 1}
                text={character.talent[1]}
              />
              <CellWithImage
                src={`/talent/elemental_burst_${Utils.getImageSrc(
                  character.name
                )}.png`}
                quantity={character.progression?.elementalBurst ?? 1}
                text={character.talent[2]}
              />
            </div>

            <Icon.Solid name="chevronRight" className="text-gray-11" />
          </div>
        </div>
      </RemixReact.Link>
    </li>
  )
}
