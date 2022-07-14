import * as RadixHoverCard from '@radix-ui/react-hover-card'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Zod from 'zod'
import Button from '~/components/Button'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Cookie from '~/cookies'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Characters - Traveler Main',
})

export const action: RemixNode.ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const userPref = await Cookie.getUserPrefsCookie(request)
  userPref.characterView = formData.get('characterView') ?? 'grid'

  return RemixNode.json(null, {
    headers: {
      'Set-Cookie': await Cookie.userPrefs.serialize(userPref),
    },
  })
}

interface LoaderData {
  characters: CharacterData.Character[]
  view: 'list' | 'grid'
}

export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  const accId = await Session.requireAccountId(request)

  const userCharacters = await CharacterModel.getUserCharacters({
    accountId: accId,
  })
  const characters = CharacterData.getCharacters(userCharacters)

  const characterView = await Cookie.getCharacterViewPref(request)

  return RemixNode.json<LoaderData>({ characters, view: characterView })
}

export default function CharactersPage() {
  const { characters, view } = RemixReact.useLoaderData() as LoaderData
  const fetcher = RemixReact.useFetcher()

  const optimisticView = fetcher.submission
    ? Zod.string().parse(fetcher.submission.formData.get('characterView'))
    : view

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <main>
        <div className="space-y-12">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
                Characters
              </h1>

              <fetcher.Form
                action="/character?index"
                method="post"
                replace={true}
                className="ml-6 flex items-center rounded-lg bg-gray-3 p-0.5"
              >
                <button
                  type="submit"
                  name="characterView"
                  value="list"
                  className={clsx(
                    optimisticView === 'list'
                      ? 'bg-gray-2 shadow-sm'
                      : 'hover:bg-gray-2 hover:shadow-sm',
                    'rounded-md p-1.5 text-gray-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-8'
                  )}
                >
                  {optimisticView === 'list' ? (
                    <Icon.Solid
                      name="viewList"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon.Outline
                      name="viewList"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">Use list view</span>
                </button>
                <button
                  type="submit"
                  name="characterView"
                  value="grid"
                  className={clsx(
                    optimisticView === 'list'
                      ? 'hover:bg-gray-2 hover:shadow-sm'
                      : 'bg-gray-2 shadow-sm',
                    'ml-0.5 rounded-md p-1.5 text-gray-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-8'
                  )}
                >
                  {optimisticView === 'list' ? (
                    <Icon.Outline
                      name="viewGrid"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon.Solid
                      name="viewGrid"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">Use grid view</span>
                </button>
              </fetcher.Form>
            </div>

            <div className="mt-2">
              <RemixReact.Link to="./bulk-update">
                <Button>Bulk update</Button>
              </RemixReact.Link>
            </div>
          </div>

          {optimisticView === 'list' ? (
            <CharacterList characters={characters} />
          ) : (
            <CharacterGrid characters={characters} />
          )}
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

function CharacterGrid({
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
                      src={`/element/${character.vision.toLowerCase()}.png`}
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
                      src={`/character/${Utils.getImageSrc(
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

function CharacterList({
  characters,
}: {
  characters: CharacterData.Character[]
}) {
  return (
    <div className="overflow-hidden rounded-md bg-gray-2 shadow">
      <ul className="divide-y divide-gray-6">
        {characters.map((character) => (
          <CharacterListItem key={character.name} character={character} />
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
                  src={`/talent/normal_attack_${character.weapon.toLowerCase()}.png`}
                  alt={character.talent[0]}
                  className="h-5 w-5 flex-shrink-0"
                  width={20}
                  height={20}
                />
                <span>{character.progression?.normalAttack ?? 1}</span>
              </span>
              <span className="inline-flex items-center gap-0.5">
                <Image
                  src={`/talent/elemental_skill_${Utils.getImageSrc(
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
                  src={`/talent/elemental_burst_${Utils.getImageSrc(
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

function CharacterListItem({
  character,
}: {
  character: CharacterData.Character
}) {
  return (
    <li>
      <RemixReact.Link
        to={`/character/${character.name}`}
        prefetch="intent"
        className="block hover:bg-gray-3"
      >
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={`/character/${Utils.getImageSrc(character.name)}.png`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <Image
                  src={`/element/${Utils.getImageSrc(character.vision)}.png`}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute -top-1.5 -left-1.5 h-4 w-4"
                />
              </div>

              <div>
                <h2 className="truncate font-medium text-gray-12">
                  {character.name}
                </h2>

                <div className="flex gap-4 text-gray-11">
                  <p>Lv. {character.progression?.level ?? 1}</p>
                  <p>Ascension {character.progression?.ascension ?? 0}</p>
                </div>
              </div>
            </div>

            <div className="hidden gap-4 text-gray-11 sm:flex">
              <CellWithImage
                src={`/talent/normal_attack_${Utils.getImageSrc(
                  character.weapon
                )}.png`}
                quantity={character.progression?.normalAttack ?? 1}
                text={character.talent[0]}
              />
              <CellWithImage
                src={`/talent/elemental_skill_${Utils.getImageSrc(
                  character.name
                )}.png`}
                quantity={character.progression?.elementalSkill ?? 1}
                text={character.talent[1]}
              />
              <CellWithImage
                src={`/talent/elemental_burst_${Utils.getImageSrc(
                  character.name
                )}.png`}
                quantity={character.progression?.elementalBurst ?? 1}
                text={character.talent[2]}
              />
            </div>

            <Icon.Solid name="chevronRight" className="text-gray-11" />
          </div>
        </div>
      </RemixReact.Link>
    </li>
  )
}
