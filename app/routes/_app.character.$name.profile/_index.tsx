import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import Image from '~/components/Image'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'

export async function loader({ params }: RemixNode.LoaderArgs) {
  const name = CharacterUtils.parseCharacterNameOrThrow({
    name: params.name,
    doDesglugify: true,
  })

  return RemixNode.json({ character: CharacterUtils.getCharacterDetail(name) })
}

export default function CharacterProfilePage() {
  const { character } = RemixReact.useLoaderData<typeof loader>()

  return (
    <div className="mt-8 items-start md:flex">
      <Image
        src={`/character/full_v2/${Utils.getImageSrc(character.name)}.png`}
        alt=""
        width={384}
        height="auto"
        className="h-auto sm:w-96"
        centered
      />

      <div className="mx-auto mt-6 max-w-5xl">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="sr-only">Description</dt>
            <dd className="mt-1 max-w-prose space-y-5 text-sm text-gray-12">
              {character.description}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-11">Title</dt>
            <dd className="mt-1 text-sm text-gray-12">{character.title}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-11">Affiliation</dt>
            <dd className="mt-1 text-sm text-gray-12">
              {character.affiliation}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-11">Constellation</dt>
            <dd className="mt-1 text-sm text-gray-12">
              {character.constellation}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <h3 className="font-medium text-gray-12">
              Base Stats
              <span className="text-sm text-gray-11"> - based on Lv.90</span>
            </h3>
            <dl className="mt-1 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-11">HP</dt>
                <dd className="mt-1 text-sm text-gray-12">{character.hp}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-11">ATK</dt>
                <dd className="mt-1 text-sm text-gray-12">{character.atk}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-11">DEF</dt>
                <dd className="mt-1 text-sm text-gray-12">{character.def}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-11">
                  {character.ascensionBonus.stat}
                </dt>
                <dd className="mt-1 text-sm text-gray-12">
                  {character.ascensionBonus.fixedValue
                    ? character.ascensionBonus.value
                    : `${character.ascensionBonus.value}%`}
                </dd>
              </div>
            </dl>
          </div>
        </dl>
      </div>
    </div>
  )
}
