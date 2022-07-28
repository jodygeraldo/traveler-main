import * as RemixReact from '@remix-run/react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import * as Utils from '~/utils'

interface Props {
  tracks: {
    id: string
    name: string
    priority: number | null
    userCharacter: {
      level: number
      ascension: number
      normalAttack: number
      elementalSkill: number
      elementalBurst: number
    }
    targetLevel: number
    targetAscension: number
    targetNormalAttack: number
    targetElementalSkill: number
    targetElementalBurst: number
    itemNames: string[]
  }[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <div className="overflow-hidden rounded-md bg-gray-2 shadow">
      <ul id="list-view" className="divide-y divide-gray-6">
        {tracks.map((track) => (
          <li
            key={track.id}
            className="divide-y divide-gray-4 sm:flex sm:justify-between sm:divide-x sm:divide-y-0"
          >
            <div className="flex items-center divide-x divide-gray-4 sm:flex-1">
              <div className="relative flex items-center justify-center py-4 px-2 sm:flex-col sm:px-3">
                <div aria-hidden />
                <div>
                  <span className="sr-only">Drag handle</span>
                  <Icon.Base
                    name="dragDotsHandle2"
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    fill="none"
                    className="h-6 w-6 cursor-move text-gray-11 hover:text-gray-12"
                    aria-hidden
                  />
                </div>
              </div>
              <RemixReact.Link
                to={`./${Utils.slugify(track.name)}`}
                className="py-4 px-4 hover:bg-gray-3 sm:flex sm:flex-1 sm:items-center sm:px-6"
              >
                <div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={`/character/${Utils.getImageSrc(track.name)}.png`}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="mt-2 min-w-0 flex-1 sm:mt-0 sm:px-4 xl:grid xl:grid-cols-2 xl:gap-4">
                    <div className="flex items-center">
                      <p className="truncate text-sm font-medium text-primary-12">
                        {track.name}
                      </p>
                    </div>
                    <div>
                      <ul>
                        <LevelTrack
                          name="Level"
                          level={{
                            current: track.userCharacter.level,
                            target: track.targetLevel,
                          }}
                        />
                        <LevelTrack
                          name="Ascension"
                          level={{
                            current: track.userCharacter.ascension,
                            target: track.targetAscension,
                          }}
                        />
                        <LevelTrack
                          name="Normal Attack"
                          level={{
                            current: track.userCharacter.normalAttack,
                            target: track.targetNormalAttack,
                          }}
                        />
                        <LevelTrack
                          name="Elemental Skill"
                          level={{
                            current: track.userCharacter.elementalSkill,
                            target: track.targetElementalSkill,
                          }}
                        />
                        <LevelTrack
                          name="Elemental Burst"
                          level={{
                            current: track.userCharacter.elementalBurst,
                            target: track.targetElementalBurst,
                          }}
                        />
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hidden md:grid md:grid-cols-4 md:gap-1 lg:grid-cols-6">
                  {track.itemNames.map((name) => (
                    <ItemImage key={name} name={name} />
                  ))}
                </div>
              </RemixReact.Link>
            </div>

            <div className="flex items-center gap-4 py-4 px-4 sm:justify-start sm:px-6">
              <RemixReact.Form
                method="post"
                replace
                className="w-full sm:order-2"
              >
                <Button.Base
                  type="submit"
                  name="delete"
                  value={track.name}
                  variant="danger"
                  className="w-full"
                >
                  delete
                </Button.Base>
              </RemixReact.Form>
              <Button.Link
                styles="button"
                to={`./update?name=${Utils.slugify(track.name)}`}
                variant="info"
                className="w-full sm:order-1"
              >
                Edit
              </Button.Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LevelTrack({
  name,
  level,
}: {
  name: string
  level: {
    current: number
    target: number
  }
}) {
  if (level.current === level.target) {
    return null
  }

  return (
    <li className="flex items-center gap-2 text-sm font-medium">
      <span className="text-gray-11">{name}</span>{' '}
      <span className="text-gray-12">{level.current}</span>
      <span className="sr-only">to</span>
      <Icon.Solid
        name="arrowSmRight"
        aria-hidden
        className="h-4 w-4 flex-shrink-0 text-gray-11"
      />
      <span className="text-gray-12">{level.target}</span>
    </li>
  )
}

function ItemImage({ name }: { name: string }) {
  return (
    <Tooltip text={name}>
      <Image
        src={`/item/${Utils.getImageSrc(name)}.png`}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
    </Tooltip>
  )
}
