import * as RemixReact from '@remix-run/react'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  name: CharacterType.Name
  vision: CharacterType.Vision
  weapon: CharacterType.Weapon
  progression: CharacterType.Progression
  talent: CharacterType.Character['talent']
}

export default function CharacterListItem({
  name,
  vision,
  weapon,
  progression,
  talent,
}: Props) {
  return (
    <li>
      <RemixReact.Link
        id={`${name}-character-page-link`}
        to={`/character/${name}`}
        prefetch="intent"
        className="block hover:bg-gray-3"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
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
                <h2 className="truncate font-medium text-gray-12">{name}</h2>

                <div className="flex gap-4 text-gray-11">
                  <p>Lv. {progression.level}</p>
                  <p>Ascension {progression.ascension}</p>
                </div>
              </div>
            </div>

            <div className="hidden gap-4 text-gray-11 sm:flex">
              <CellWithImage
                src={`/talent/normal_attack_${Utils.getImageSrc(weapon)}.png`}
                quantity={progression.normalAttack}
                text={talent[0]}
              />
              <CellWithImage
                src={`/talent/elemental_skill_${Utils.getImageSrc(name)}.png`}
                quantity={progression.elementalSkill}
                text={talent[1]}
              />
              <CellWithImage
                src={`/talent/elemental_burst_${Utils.getImageSrc(name)}.png`}
                quantity={progression.elementalBurst}
                text={talent[2]}
              />
            </div>

            <Icon.Solid name="chevronRight" className="text-gray-11" />
          </div>
        </div>
      </RemixReact.Link>
    </li>
  )
}
