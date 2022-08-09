import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Badge from '~/components/Badge'
import * as Button from '~/components/Button'
import Image from '~/components/Image'
import SidebarSub from '~/components/Sidebar'
import Tooltip from '~/components/Tooltip'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'

const navigation = [
  {
    name: 'Profile',
    to: './profile',
  },
  {
    name: 'Material',
    to: './material',
  },
]

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const name = CharacterUtils.parseCharacterNameOrThrow({
    name: params.name,
    doDesglugify: true,
  })

  return RemixNode.json({
    character: CharacterUtils.getCharacter(name),
    trackStatus: await CharacterModel.getUserCharacterTrackStatus({
      name,
      accountId,
    }),
  })
}

export default function CharacterLayout() {
  const { character, trackStatus } = RemixReact.useLoaderData<typeof loader>()

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <div className="sticky top-6">
            <SidebarSub navigation={navigation} />
          </div>
        </div>

        <main className="mt-8 lg:col-span-10 lg:mt-0">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
                  {character.name}
                </h1>
                <div className="flex items-center gap-2 rounded-full bg-gray-2 px-2 py-1 shadow">
                  <Tooltip text={Utils.toCapitalized(character.weapon)}>
                    <Image
                      src={`/weapon/${Utils.getImageSrc(character.weapon)}.png`}
                      alt={character.weapon}
                      className="h-6 w-6"
                      width={24}
                      height={24}
                    />
                  </Tooltip>
                  <Tooltip text={Utils.toCapitalized(character.vision)}>
                    <Image
                      src={`/element/${Utils.getImageSrc(
                        character.vision
                      )}.png`}
                      alt={character.vision}
                      className="h-6 w-6"
                      width={24}
                      height={24}
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <Badge.Base variant="info" size="sm" squared>
                  {`${character.rarity}-STARS`}
                </Badge.Base>
                {character.region !== 'UNKNOWN' && (
                  <Badge.Base variant="info" size="sm" squared>
                    {`${character.region}`}
                  </Badge.Base>
                )}
                {trackStatus.tracked && (
                  <RemixReact.Link
                    to={`/track/${Utils.slugify(character.name)}`}
                  >
                    <Badge.Base variant="info" size="sm" squared hoverable>
                      TRACKED
                    </Badge.Base>
                  </RemixReact.Link>
                )}
              </div>
            </div>

            {!trackStatus.isMaxLevel && !trackStatus.tracked ? (
              <div className="mt-4">
                <Button.Link
                  styles="button"
                  to={`/track/add?${Utils.slugify(character.name)}`}
                  className="w-full sm:w-auto"
                >
                  Track
                </Button.Link>
              </div>
            ) : null}
          </div>

          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
