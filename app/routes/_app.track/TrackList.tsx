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
  }[]
}

export default function TrackList({ tracks }: Props) {
  return (
    <div className="overflow-hidden rounded-md bg-gray-2 shadow">
      <ul id="list-view" className="divide-y divide-gray-6">
        {tracks.map((track) => (
          <li key={track.id} className="sm:flex sm:justify-between">
            {/* <div className="relative flex flex-col items-center justify-between border-r border-gray-4 py-4 px-2 sm:px-3">
              <div aria-hidden />
              <Icon.Solid
                name="viewList"
                className="h-6 w-6 cursor-move text-gray-11 hover:text-gray-12"
              />
              <div className="">
                <label htmlFor="priority" className="sr-only">
                  Order priority
                </label>
                <input
                  type="text"
                  name="priority"
                  id="priority"
                  className="h-4 w-8 border-gray-7 bg-gray-2 p-1 text-center text-xs focus:border-primary-8 focus:ring-primary-8"
                  defaultValue={track.priority || 0}
                />
              </div>
            </div> */}
            <RemixReact.Link
              to={`./${Utils.slugify(track.name)}`}
              className="flex items-center py-4 px-4 sm:flex-1 sm:px-6"
            >
              <div className="flex min-w-0 flex-1 items-center">
                <div className="flex-shrink-0">
                  <Image
                    src={`/character/${Utils.getImageSrc(track.name)}.png`}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1 px-4 lg:grid lg:grid-cols-2 lg:gap-4">
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

              <div className="hidden md:grid md:grid-cols-6 md:gap-2">
                <ItemImage name="Slime Concentrate" />
              </div>
            </RemixReact.Link>

            <div className="flex items-center gap-4 border-t border-gray-4 py-4 px-4 sm:justify-start sm:border-t-0 sm:border-l sm:px-6">
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
                Update
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
        className="h-4 w-4 text-gray-11"
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
