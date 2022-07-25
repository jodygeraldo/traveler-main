import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

const backgroundImage: Record<4 | 5 | '5s', string> = {
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
  '5s': 'bg-image-rarity-5s',
}

interface Props {
  name: CharacterType.Name
  vision: CharacterType.Vision
  rarity: CharacterType.Character['rarity']
  level: number
}

export default function CharacterGridItem({
  name,
  vision,
  rarity,
  level = 1,
}: Props) {
  return (
    <div>
      <RemixReact.Link
        id={`${name}-character-page-link`}
        to={`./${Utils.slugify(name)}/required-items`}
        prefetch="intent"
      >
        <div className="group relative rounded-b-md bg-gray-3 shadow-sm hover:bg-gray-4">
          <div className="absolute top-0 left-0">
            <span className="sr-only">{vision} vision</span>
            <Image
              src={`/element/${vision.toLowerCase()}.png`}
              alt=""
              className="h-6 w-6"
              aria-hidden
              width={24}
              height={24}
            />
          </div>

          <div
            className={clsx(
              backgroundImage[name === 'Aloy' ? '5s' : rarity],
              'rounded-t-md rounded-br-3xl'
            )}
          >
            <Image
              src={`/character/${Utils.getImageSrc(name)}.png`}
              alt={name}
              className="h-24 w-24 rounded-br-3xl"
              width={96}
              height={96}
            />
          </div>
          <div className="mt-1 text-center">
            <span className="sr-only">Level {level}</span>
            <p
              className="text-sm text-gray-11 group-hover:text-gray-12"
              aria-hidden
            >
              Lv. {level}
            </p>
          </div>
        </div>
      </RemixReact.Link>
    </div>
  )
}
