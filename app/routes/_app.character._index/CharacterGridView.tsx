import clsx from 'clsx'
import * as Button from '~/components/Button'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'
import ContextMenu from './ContextMenu'
import Dialog from './Dialog'
import TalentGroup from './TalentGroup'

type Props = { characters: CharacterType.CharacterWithProgression[] }

export default function CharacterGridView({ characters }: Props) {
  return (
    <div className="sm:px-6 lg:px-8">
      <ul
        id="grid-view"
        className="grid grid-cols-1 gap-y-4 gap-x-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {characters.map((character) => (
          <CharacterGridItem key={character.name} {...character} />
        ))}
      </ul>
    </div>
  )
}

export function CharacterGridItem({
  name,
  vision,
  weapon,
  talent,
  progression,
}: CharacterType.CharacterWithProgression) {
  return (
    <li className="bg-gray-2 sm:rounded-md">
      <div className="block sm:rounded-md">
        <ContextMenu name={name} progression={progression}>
          <div className="flex items-center rounded-md">
            <div className="relative flex-shrink-0 rounded-l-md pl-4 sm:pl-6">
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
                className="absolute top-0 left-4 h-6 w-6 sm:left-6"
                width={24}
                height={24}
              />
            </div>
            <div
              className={clsx(
                'flex-1 py-4 pl-2 pr-4 sm:pr-6',
                'gap-4 xs:flex xs:items-center xs:justify-between'
              )}
            >
              <div>
                <h2 className="text-sm font-medium text-gray-12 xs:text-base">
                  {name}
                </h2>

                <div className="flex gap-4 text-gray-11 sm:block">
                  <p>Lv. {progression.level}</p>
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
        </ContextMenu>

        <div className="flex items-center justify-between gap-4 px-4 pb-4 sm:px-6">
          <Dialog name={name} progression={progression}>
            <Button.Base variant="basic" className="w-full">
              Edit level
            </Button.Base>
          </Dialog>

          <Button.Link
            to={`./${Utils.slugify(name)}/required-items`}
            prefetch="intent"
            id={`${name}-character-page-link`}
            styles="button"
            className="w-full"
          >
            Detail
          </Button.Link>
        </div>
      </div>
    </li>
  )
}
