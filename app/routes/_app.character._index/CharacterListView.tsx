import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'
import ContextMenu from './ContextMenu'
import TalentGroup from './TalentImage'

type Props = { characters: CharacterType.CharacterWithProgression[] }

export default function CharacterListView({ characters }: Props) {
  return (
    <div className="rounded-md shadow sm:px-6 lg:px-8">
      <ul id="list-view" className="divide-y divide-gray-6">
        {characters.map((character) => (
          <CharacterListItem key={character.name} {...character} />
        ))}
      </ul>
    </div>
  )
}

function CharacterListItem({
  name,
  vision,
  weapon,
  progression,
  talent,
}: CharacterType.CharacterWithProgression) {
  return (
    <li className="bg-gray-2 transition-colors hover:bg-gray-3 sm:first-of-type:rounded-t-md sm:last-of-type:rounded-b-md">
      <ContextMenu name={name} progression={progression}>
        <RemixReact.Link
          id={`${name}-character-page-link`}
          to={`./${Utils.slugify(name)}/required-items`}
          prefetch="intent"
          className={clsx(
            'block',
            'focus:outline focus:outline-2 focus:outline-primary-8 sm:focus:rounded-md',
            'radix-state-open:outline radix-state-open:outline-2 radix-state-open:outline-primary-8 sm:radix-state-open:rounded-md'
          )}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={`/character/${Utils.getImageSrc(name)}.png`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <Image
                  src={`/element/${Utils.getImageSrc(vision)}.png`}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute -top-1.5 -left-1.5 h-4 w-4"
                />
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-12 xs:text-base">
                  {name}
                </h2>

                <div className="flex gap-4 text-gray-11">
                  <p>Lv. {progression.level}</p>
                  <p>Ascension {progression.ascension}</p>
                </div>
              </div>
            </div>

            <div className="hidden gap-4 text-gray-11 sm:flex">
              <TalentGroup
                name={name}
                weapon={weapon}
                talent={talent}
                progression={progression}
                size="md"
              />
            </div>

            <Icon.Solid
              name="chevronRight"
              className="hidden text-gray-11 sm:block"
            />
          </div>
        </RemixReact.Link>
      </ContextMenu>
    </li>
  )
}
