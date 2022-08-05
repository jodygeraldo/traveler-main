import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'
import TalentGroup from './TalentImage'

export default function CharacterGridItem({
  name,
  vision,
  rarity,
  weapon,
  talent,
  progression,
}: CharacterType.Character & { progression: CharacterType.Progression }) {
  return (
    <li className="rounded-md bg-gray-2 transition-colors hover:bg-gray-3">
      <RemixReact.Link
        id={`${name}-character-page-link`}
        to={`./${Utils.slugify(name)}/required-items`}
        prefetch="intent"
        className="inline-block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-gray-1"
      >
        <div className="flex items-center rounded-md">
          <div className="relative flex-shrink-0 rounded-l-md">
            <Image
              src={`/character/${Utils.getImageSrc(name)}.png`}
              alt={name}
              className="h-16 w-16 xs:h-20 xs:w-20"
              width={80}
              height={80}
            />

            <Image
              src={`/element/${Utils.getImageSrc(vision)}.png`}
              alt={vision}
              className="absolute top-0 left-0 h-6 w-6"
              width={24}
              height={24}
            />

            <span className="absolute top-0 right-0">
              <span className="sr-only">Rarity {rarity}</span>
              <Icon.Solid
                name="star"
                className={clsx(
                  rarity === 5 ? 'text-rarity-5' : 'text-rarity-4',
                  'ml-0.5 h-5 w-5'
                )}
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="flex-1 py-4 pl-4 pr-4 sm:pr-6">
            <div className="gap-4 xs:flex xs:items-center xs:justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-12 xs:text-base">
                  {name}
                </h2>

                <div className="mt-2 text-sm font-medium text-gray-11">
                  <p>Level {progression.level}</p>
                  <p>Ascension {progression.ascension}</p>
                </div>
              </div>

              <div className="mt-1 flex items-center gap-1 xs:mt-0 xs:block xs:space-y-1">
                <TalentGroup
                  name={name}
                  weapon={weapon}
                  talent={talent}
                  progression={progression}
                />
              </div>
            </div>
          </div>
        </div>
      </RemixReact.Link>
    </li>
  )
}
