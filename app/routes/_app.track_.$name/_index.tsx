import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'
import ProgressionField from './ProgressionField'

const FormDataSchema = Zod.object({
  kind: Zod.enum([
    'Ascension',
    'Normal Attack',
    'Elemental Skill',
    'Elemental Burst',
  ]),
  control: Zod.enum(['increment', 'decrement']),
  level: Zod.number().nonnegative(),
  targetLevel: Zod.number().nonnegative().optional(),
})

export async function action({ params, request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = Zod.string()
    .transform((n) => Utils.deslugify(n))
    .parse(params.name)
  if (!CharacterUtils.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { kind, control, level, targetLevel } = result.data

  const progression: {
    level?: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  } = {}

  const ascensionToLevelOnIncrease = [20, 40, 50, 60, 70, 90] as const
  const ascensionToLevelOnDecrease = [1, 20, 40, 50, 60, 70, 80] as const
  const ascensionToLevel =
    control === 'increment'
      ? ascensionToLevelOnIncrease
      : ascensionToLevelOnDecrease
  const levelTo =
    ascensionToLevel[
      control === 'increment' ? level : level - 1 < 0 ? 0 : level - 1
    ]
  const progressTo = control === 'increment' ? level + 1 : level - 1

  if (kind === 'Ascension') {
    progression.level = levelTo > (targetLevel ?? 0) ? targetLevel : levelTo
    progression.ascension = progressTo
  }
  if (kind === 'Normal Attack') progression.normalAttack = progressTo
  if (kind === 'Elemental Skill') progression.elementalSkill = progressTo
  if (kind === 'Elemental Burst') progression.elementalBurst = progressTo

  await CharacterModel.updateCharacter({
    name,
    progression,
    accountId,
  })

  return RemixNode.json(null, { statusText: 'SUCCESS' })
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = Zod.string()
    .transform((n) => Utils.deslugify(n))
    .parse(params.name)

  if (!CharacterUtils.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const track = await CharacterModel.getUserTrackCharacter({
    name,
    accountId,
  })
  if (!track) {
    throw RemixNode.json(
      { message: `You don't have track character with name ${name}` },
      { status: 404 }
    )
  }

  const materials = CharacterUtils.getItemsQuantity({ name, ...track })

  if (!Array.isArray(materials)) throw new Error('materials is not an array')

  const currentMaterials = CharacterUtils.getItemsQuantity({
    currentOnly: true,
    name,
    ...track,
  })

  if (Array.isArray(currentMaterials))
    throw new Error('materials is not an object')

  return RemixNode.json({
    track,
    currentMaterials,
    materials,
  })
}

export default function TrackDetailPage() {
  const { track, materials, currentMaterials } =
    RemixReact.useLoaderData<typeof loader>()
  const name = Utils.deslugify(RemixReact.useParams().name ?? '')

  const currentMaterialArray: {
    kind: string
    progression: { current: number; target: number }
    material: { key: string; value: number }[]
  }[] = []

  if (currentMaterials.ascension.length !== 0) {
    currentMaterialArray.push({
      kind: 'Ascension',
      progression: {
        current: track.ascension.current,
        target: track.ascension.current + 1,
      },
      material: currentMaterials.ascension,
    })
  }
  if (currentMaterials.normalAttack.length !== 0) {
    currentMaterialArray.push({
      kind: 'Normal Attack',
      progression: {
        current: track.normalAttack.current,
        target: track.normalAttack.current + 1,
      },
      material: currentMaterials.normalAttack,
    })
  }
  if (currentMaterials.elementalSkill.length !== 0) {
    currentMaterialArray.push({
      kind: 'Elemental Skill',
      progression: {
        current: track.elementalSkill.current,
        target: track.elementalSkill.current + 1,
      },
      material: currentMaterials.elementalSkill,
    })
  }
  if (currentMaterials.elementalBurst.length !== 0) {
    currentMaterialArray.push({
      kind: 'Elemental Burst',
      progression: {
        current: track.elementalBurst.current,
        target: track.elementalBurst.current + 1,
      },
      material: currentMaterials.elementalBurst,
    })
  }

  const tracking = [
    {
      label: 'Level',
      current: track.level.current,
      target: track.level.target,
    },
    {
      label: 'Ascension',
      current: track.ascension.current,
      target: track.ascension.target,
    },
    {
      label: 'Normal Attack',
      current: track.normalAttack.current,
      target: track.normalAttack.target,
    },
    {
      label: 'Elemental Skill',
      current: track.elementalSkill.current,
      target: track.elementalSkill.target,
    },
    {
      label: 'Elemental Burst',
      current: track.elementalBurst.current,
      target: track.elementalBurst.target,
    },
  ]

  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
        Track Detail
      </h1>
      <div className="mt-12 grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="tracking-overview">
            <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
              <h2 className="sr-only" id="tracking-overview">
                Tracking Overview
              </h2>
              <div className="bg-gray-2 p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="sm:flex sm:items-center sm:space-x-5">
                    <div className="flex-shrink-0 text-center">
                      <Image
                        className="mx-auto h-20 w-20 rounded-full"
                        src={`/character/${Utils.getImageSrc(name)}.png`}
                        alt=""
                        width={80}
                      />
                    </div>
                    <h3 className="mt-4 text-center text-xl font-bold text-gray-12 sm:mt-0 sm:pt-1 sm:text-left sm:text-2xl">
                      {name}
                    </h3>
                  </div>
                  <div className="mt-5 flex justify-center sm:mt-0">
                    <Button.Link
                      to={`/character/${Utils.slugify(name)}/manual-levelup`}
                      className="text-center"
                    >
                      Edit level
                    </Button.Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 divide-y divide-gray-6 border-t border-gray-6 bg-gray-3 sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
                {tracking.map((track) => (
                  <div
                    key={track.label}
                    className="px-6 py-5 text-center text-sm font-medium"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {track.target && track.current !== track.target ? (
                        <>
                          <span className="text-gray-12">{track.current}</span>
                          <span className="sr-only">to</span>
                          <Icon.Solid
                            name="arrowSmRight"
                            className="h-5 w-5"
                            aria-hidden
                          />
                          <span className="text-gray-12">{track.target}</span>
                        </>
                      ) : (
                        <span className="text-gray-12">{track.current}</span>
                      )}
                    </div>
                    <span className="text-gray-11">{track.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="update-progression">
            <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
              <h2 className="sr-only" id="update-progression">
                Update progression
              </h2>
              <div className="divide-y divide-gray-6">
                {currentMaterialArray.map(({ kind, progression, material }) => (
                  <ProgressionField
                    key={kind}
                    kind={kind}
                    progression={progression}
                    materials={material}
                    targetLevel={track.level.target}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="announcements-title">
            <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
              <div className="p-6">
                <h2
                  className="font-medium text-gray-12"
                  id="announcements-title"
                >
                  Materials
                </h2>
                <div className="mt-6 flow-root">
                  {materials.map((m) => (
                    <div key={m.key} className="flex items-center gap-2">
                      <Image
                        src={`/item/${Utils.getImageSrc(m.key)}.png`}
                        className="h-5 w-5"
                        alt=""
                        width={20}
                        height={20}
                      />
                      <span className="truncate capitalize text-gray-11">
                        {m.key}
                      </span>
                      <span className="text-xs tabular-nums text-gray-12 xs:text-sm">
                        x{m.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
