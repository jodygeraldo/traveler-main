import * as RadixHoverCard from '@radix-ui/react-hover-card'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import Image from 'remix-image'
import type { Character } from '~/data/characters'
import { getCharacters } from '~/data/characters'
import { getUserCharacters } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import { getImageSrc } from '~/utils'

type LoaderData = {
  characters: ReturnType<typeof getCharacters>
}

export const loader: LoaderFunction = async ({ request }) => {
  const accId = await requireAccountId(request)

  const userCharacters = await getUserCharacters({ accId })
  const characters = getCharacters(userCharacters)

  return json<LoaderData>({ characters })
}

export default function CharactersPage() {
  const { characters } = useLoaderData() as LoaderData

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <main>
        <div className="space-y-12">
          <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
            Character
          </h1>

          <CharacterList characters={characters} />
        </div>
      </main>
    </div>
  )
}

const backgroundImage: Record<4 | 5 | '5s', string> = {
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
  '5s': 'bg-image-rarity-5s',
}

function CharacterList({ characters }: { characters: Character[] }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-5">
        {characters.map((character) => (
          <li key={character.name}>
            <HoverCard character={character}>
              <Link to={`./${character.name}`} prefetch="intent">
                <div className="group rounded-b-md bg-gray-3 shadow-sm hover:bg-gray-4">
                  <div
                    className={clsx(
                      backgroundImage[character.name === 'Aloy' ? '5s' : character.rarity],
                      'rounded-t-md rounded-br-3xl'
                    )}
                  >
                    <Image
                      src={`/image/character/${getImageSrc(character.name)}.png`}
                      alt={character.name}
                      className="h-24 w-24 rounded-br-3xl"
                      responsive={[{ size: { width: 96, height: 96 } }]}
                      dprVariants={[1, 2, 3]}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <span className="sr-only">Level {character.progression?.level ?? 1}</span>
                    <p className="text-sm text-gray-11 group-hover:text-gray-12" aria-hidden>
                      Lv. {character.progression?.level ?? 1}
                    </p>
                  </div>
                </div>
              </Link>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HoverCard({ character, children }: { character: Character; children: React.ReactNode }) {
  return (
    <RadixHoverCard.Root openDelay={300}>
      <RadixHoverCard.Trigger asChild>{children}</RadixHoverCard.Trigger>
      <RadixHoverCard.Content
        side="top"
        sideOffset={5}
        className="motion-safe:data-side-top:slideUpAndFade motion-safe:data-side-right:slideRightAndFade motion-safe:data-side-bottom:slideDownAndFade motion-safe:data-side-left:slideLeftAndFade"
      >
        <div className="w-48 rounded-md bg-gray-3 p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium leading-6 text-primary-12">{character.name}</h2>
            <div className="flex shrink-0 items-center space-x-1">
              {Array.isArray(character.vision) ? (
                character.vision.map((vision) => (
                  <div key={`${character.name}-${vision}`}>
                    <span className="sr-only">{character.vision} vision</span>
                    <img
                      src={`/image/element/${vision.toLowerCase()}.png`}
                      alt=""
                      className="h-4 w-4"
                      aria-hidden
                    />
                  </div>
                ))
              ) : (
                <div>
                  <span className="sr-only">{character.vision} vision</span>
                  <img
                    src={`/image/element/${character.vision.toLowerCase()}.png`}
                    alt=""
                    className="h-4 w-4"
                    aria-hidden
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-1 text-gray-11">
            <p>Ascension: {character.progression?.ascension ?? 0}</p>
            <p>Normal attack: {character.progression?.normalAttack ?? 1}</p>
            <p>Elemental Skill: {character.progression?.elementalSkill ?? 1}</p>
            <p>Elemental Burst: {character.progression?.elementalBurst ?? 1}</p>
          </div>
        </div>
        <RadixHoverCard.Arrow className="fill-gray-3" />
      </RadixHoverCard.Content>
    </RadixHoverCard.Root>
  )
}
