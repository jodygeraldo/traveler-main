import * as RadixHoverCard from '@radix-ui/react-hover-card'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import Button from '~/components/Button'
import Image from '~/components/Image'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Characters - Traveler Main',
})

interface LoaderData {
  characters: CharacterData.Character[]
}

export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  const accId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId: accId,
  })
  const characters = CharacterData.getCharacters(userCharacters)

  return RemixNode.json<LoaderData>({ characters })
}

export default function CharactersPage() {
  const { characters } = RemixReact.useLoaderData() as LoaderData

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <main>
        <div className="space-y-12">
          <div>
            <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
              Character
            </h1>

            <div className="mt-2">
              <RemixReact.Link to="./bulk-update">
                <Button>Bulk update</Button>
              </RemixReact.Link>
            </div>
          </div>

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

function CharacterList({
  characters,
}: {
  characters: CharacterData.Character[]
}) {
  return (
    <div>
      <ul className="flex flex-wrap gap-5">
        {characters.map((character) => (
          <li key={character.name}>
            <HoverCard character={character}>
              <RemixReact.Link to={`./${character.name}`} prefetch="intent">
                <div className="group relative rounded-b-md bg-gray-3 shadow-sm hover:bg-gray-4">
                  <div className="absolute top-0 left-0">
                    <span className="sr-only">{character.vision} vision</span>
                    <Image
                      src={`/image/element/${character.vision.toLowerCase()}.png`}
                      alt=""
                      className="h-6 w-6"
                      aria-hidden
                      width={24}
                      height={24}
                    />
                  </div>

                  <div
                    className={clsx(
                      backgroundImage[
                        character.name === 'Aloy' ? '5s' : character.rarity
                      ],
                      'rounded-t-md rounded-br-3xl'
                    )}
                  >
                    <Image
                      src={`/image/character/${Utils.getImageSrc(
                        character.name
                      )}.png`}
                      alt={character.name}
                      className="h-24 w-24 rounded-br-3xl"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <span className="sr-only">
                      Level {character.progression?.level ?? 1}
                    </span>
                    <p
                      className="text-sm text-gray-11 group-hover:text-gray-12"
                      aria-hidden
                    >
                      Lv. {character.progression?.level ?? 1}
                    </p>
                  </div>
                </div>
              </RemixReact.Link>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  )
}

function HoverCard({
  character,
  children,
}: {
  character: CharacterData.Character
  children: React.ReactNode
}) {
  return (
    <RadixHoverCard.Root openDelay={300}>
      <RadixHoverCard.Trigger asChild>{children}</RadixHoverCard.Trigger>
      <RadixHoverCard.Content
        side="top"
        className="motion-safe:slideAndFade rounded-md bg-gray-3 p-4 shadow-lg"
      >
        <h2 className="text-lg font-medium leading-6 text-primary-12">
          {character.name}
        </h2>
        <div className="flex items-center gap-4">
          <div className="mt-1 w-full text-gray-11">
            <p>Ascension {character.progression?.ascension ?? 0}</p>
            <div className="flex w-full items-center gap-3">
              <span className="inline-flex items-center gap-0.5">
                <Image
                  src={`/image/talent/normal_attack_${character.weapon.toLowerCase()}.png`}
                  alt={character.talent[0]}
                  className="h-5 w-5 flex-shrink-0"
                  width={20}
                  height={20}
                />
                <span>{character.progression?.normalAttack ?? 1}</span>
              </span>
              <span className="inline-flex items-center gap-0.5">
                <Image
                  src={`/image/talent/elemental_skill_${Utils.getImageSrc(
                    character.name
                  )}.png`}
                  alt={character.talent[1]}
                  className="h-5 w-5 flex-shrink-0"
                  width={20}
                  height={20}
                />
                <span>{character.progression?.elementalSkill ?? 1}</span>
              </span>
              <span className="inline-flex items-center gap-0.5">
                <Image
                  src={`/image/talent/elemental_burst_${Utils.getImageSrc(
                    character.name
                  )}.png`}
                  alt={character.talent[2]}
                  className="h-5 w-5 flex-shrink-0"
                  width={20}
                  height={20}
                />
                <span>{character.progression?.elementalBurst ?? 1}</span>
              </span>
            </div>
          </div>
        </div>
        <RadixHoverCard.Arrow className="fill-gray-3" />
      </RadixHoverCard.Content>
    </RadixHoverCard.Root>
  )
}
