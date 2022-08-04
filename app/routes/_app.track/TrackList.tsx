import * as RemixReact from '@remix-run/react'
import * as Framer from 'framer-motion'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  userTracks: ({
    id: string
    name: string
    priority: number | null
    itemNames: string[]
  } & CharacterType.TrackProgression)[]
}

export default function TrackList({ userTracks }: Props) {
  const [tracks, setTracks] = React.useState(userTracks)
  const [draggable, setDraggable] = React.useState(false)
  // const controls = Framer.useDragControls()
  const { submit } = RemixReact.useFetcher()

  function handleDrop() {
    setDraggable(false)

    const orders = tracks.map((track, i) => ({
      id: track.id,
      priority: i,
    }))

    submit(
      { intent: 'reorder', orders: JSON.stringify(orders) },
      { method: 'post', action: '/track?index', replace: true }
    )
  }

  return (
    <Framer.LazyMotion strict features={Framer.domMax}>
      <div className="overflow-hidden rounded-md bg-gray-2 shadow">
        <Framer.Reorder.Group
          axis="y"
          values={tracks}
          onReorder={setTracks}
          id="list-view"
          className="divide-y divide-gray-6"
        >
          {tracks.map((track) => (
            <Framer.Reorder.Item
              key={track.id}
              value={track}
              dragListener={draggable}
              onDragEnd={handleDrop}
              // dragListener={false}
              // dragControls={controls}
              className="divide-y divide-gray-4 sm:flex sm:justify-between sm:divide-x sm:divide-y-0"
            >
              <div className="flex items-center divide-x divide-gray-4 sm:flex-1">
                <div className="relative flex items-center justify-center py-4 px-2 sm:flex-col sm:px-3">
                  <div aria-hidden />
                  <div
                    onMouseEnter={() => setDraggable(true)}
                    onMouseLeave={() => setDraggable(false)}
                    onTouchStart={() => setDraggable(true)}
                    //  onPointerDown={(e) => controls.start(e)}
                  >
                    <span className="sr-only">Drag handle</span>
                    <Icon.Base
                      name="dragDotsHandle2"
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                      className="h-6 w-6 cursor-grab text-gray-11 hover:text-gray-12"
                      aria-hidden
                    />
                  </div>
                </div>
                <RemixReact.Link
                  to={`./${Utils.slugify(track.name)}`}
                  className="flex-1 py-4 px-4 hover:bg-gray-3 focus:outline focus:outline-primary-8 sm:flex sm:flex-1 sm:items-center sm:px-6"
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
                        {track.itemNames.length === 0 && (
                          <p className="text-sm text-gray-11">
                            Progression are on track
                          </p>
                        )}
                        <ul>
                          <LevelTrack name="Level" level={track.level} />
                          <LevelTrack
                            name="Ascension"
                            level={track.ascension}
                          />
                          <LevelTrack
                            name="Normal Attack"
                            level={track.normalAttack}
                          />
                          <LevelTrack
                            name="Elemental Skill"
                            level={track.elementalSkill}
                          />
                          <LevelTrack
                            name="Elemental Burst"
                            level={track.elementalBurst}
                          />
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:grid lg:grid-cols-6 lg:gap-1">
                    {track.itemNames.map((name) => (
                      <ItemImage key={name} name={name} />
                    ))}
                  </div>
                </RemixReact.Link>
              </div>

              <div className="flex items-center gap-4 py-4 px-4 sm:justify-start sm:px-6">
                <RemixReact.Form method="post" replace className="w-full">
                  <input type="hidden" name="name" value={track.name} />
                  <Button.Base
                    type="submit"
                    name="intent"
                    value="delete"
                    variant="danger"
                    className="w-full"
                  >
                    delete
                  </Button.Base>
                </RemixReact.Form>
                <Button.Link
                  styles="button"
                  to={`./update/${Utils.slugify(track.name)}`}
                  variant="info"
                  className="w-full"
                >
                  Edit
                </Button.Link>
              </div>
            </Framer.Reorder.Item>
          ))}
        </Framer.Reorder.Group>
      </div>
    </Framer.LazyMotion>
  )
}

function LevelTrack({
  name,
  level,
}: {
  name: string
  level: {
    current: number
    target: number | null
  }
}) {
  if (level.current === level.target || level.target === null) {
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
