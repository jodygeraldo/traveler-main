import * as RemixReact from '@remix-run/react'
import * as Button from '~/components/Button'
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
          <li
            key={track.id}
            className="sm:flex sm:items-center sm:justify-between"
          >
            <RemixReact.Link
              to="./add"
              className="inline-block h-full flex-1 py-4 pl-4 sm:pl-6"
            >
              {track.name}
            </RemixReact.Link>
            <div className="flex items-center justify-between gap-4 divide-x border-t border-gray-4 py-4 px-4 sm:justify-start sm:border-t-0 sm:border-l sm:px-6">
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
