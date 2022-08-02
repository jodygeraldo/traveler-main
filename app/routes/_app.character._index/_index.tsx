import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Zod from 'zod'
import * as Icon from '~/components/Icon'
import Search from '~/components/Search'
import * as Cookie from '~/cookies'
import useSearchFilter from '~/hooks/useSearchFilter'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as CharacterUtils from '~/utils/server/character.server'
import CharacterGrid from './CharacterGrid'
import CharacterList from './CharacterList'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Characters - Traveler Main',
})

export async function action({ request }: RemixNode.ActionArgs) {
  const formData = await request.formData()
  const userPref = await Cookie.getUserPrefsCookie(request)
  userPref.characterView = formData.get('characterView') ?? 'grid'

  return RemixNode.json(null, {
    statusText: 'SUCCESS',
    headers: {
      'Set-Cookie': await Cookie.userPrefs.serialize(userPref),
    },
  })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId,
  })
  const characters = CharacterUtils.getCharacters(userCharacters)

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
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
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
              id="switch-list-view"
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
              id="switch-grid-view"
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

        <div className="mt-4 sm:mt-0">
          <Search
            changeHandler={changeHandler}
            placeholder="Search character"
          />
        </div>
      </div>

      {/* <div className="mt-4 flex items-center gap-4">
        <Button.Link
          styles="button"
          prefetch="intent"
          to="./quick-update"
          id="quick-update"
        >
          Quick update
        </Button.Link>

      </div> */}

      <div className="mt-12">
        {optimisticView === 'list' ? (
          <CharacterList characters={showSearch ? searchItems : characters} />
        ) : (
          <CharacterGrid characters={showSearch ? searchItems : characters} />
        )}
      </div>
    </main>
  )
}
