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
import * as UtilsServer from '~/utils/index.server'

const FormDataSchema = Zod.object({
  kind: Zod.enum([
    'Ascension',
    'Normal Attack',
    'Elemental Skill',
    'Elemental Burst',
  ]),
  control: Zod.enum(['increment', 'decrement']),
  level: Zod.number().nonnegative(),
})

export async function action({ params, request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = Zod.string()
    .transform((n) => Utils.deslugify(n))
    .parse(params.name)
  if (!UtilsServer.Character.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { kind, control, level } = result.data

  const progression: {
    level?: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  } = {}

  const ascensionToLevel = [40, 50, 60, 70, 80, 90] as const
  const toLevel = control === 'increment' ? level + 1 : level - 1

  if (kind === 'Ascension') {
    progression.level = ascensionToLevel[toLevel - 1]
    progression.ascension = toLevel
  }
  if (kind === 'Normal Attack') progression.normalAttack = toLevel
  if (kind === 'Elemental Skill') progression.elementalSkill = toLevel
  if (kind === 'Elemental Burst') progression.elementalBurst = toLevel

  await CharacterModel.upsertCharacter({
    name,
    progression,
    accountId,
  })

  return null
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = Zod.string()
    .transform((n) => Utils.deslugify(n))
    .parse(params.name)

  if (!UtilsServer.Character.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const trackCharacter = await CharacterModel.getUserTrackCharacter({
    name,
    accountId,
  })
  if (!trackCharacter) {
    throw RemixNode.json(
      { message: `You don't have track character with name ${name}` },
      { status: 404 }
    )
  }

  const material = UtilsServer.Character.getItemsQuantity({
    name,
    progression: trackCharacter.userCharacter,
    targetProgression: {
      level: trackCharacter.targetLevel,
      ascension: trackCharacter.targetAscension,
      normalAttack: trackCharacter.targetNormalAttack,
      elementalSkill: trackCharacter.targetElementalSkill,
      elementalBurst: trackCharacter.targetElementalBurst,
    },
  })

  const currentMaterial = UtilsServer.Character.getCurrentItemsQuantity({
    name,
    progression: trackCharacter.userCharacter,
    targetProgression: {
      level: trackCharacter.targetLevel,
      ascension: trackCharacter.targetAscension,
      normalAttack: trackCharacter.targetNormalAttack,
      elementalSkill: trackCharacter.targetElementalSkill,
      elementalBurst: trackCharacter.targetElementalBurst,
    },
  })

  return RemixNode.json({ trackCharacter, currentMaterial, material })
}

export default function TrackDetailPage() {
  const { trackCharacter, material, currentMaterial } =
    RemixReact.useLoaderData<typeof loader>()
  const name = Utils.deslugify(RemixReact.useParams().name ?? '')

  const currentMaterialArray: {
    kind: string
    progression: { from: number; to: number }
    material: { key: string; value: number }[]
  }[] = []

  if (currentMaterial.ascension.length !== 0) {
    currentMaterialArray.push({
      kind: 'Ascension',
      progression: {
        from: trackCharacter.userCharacter.ascension,
        to: trackCharacter.userCharacter.ascension + 1,
      },
      material: currentMaterial.ascension,
    })
  }
  if (currentMaterial.normalAttack.length !== 0) {
    currentMaterialArray.push({
      kind: 'Normal Attack',
      progression: {
        from: trackCharacter.userCharacter.normalAttack,
        to: trackCharacter.userCharacter.normalAttack + 1,
      },
      material: currentMaterial.normalAttack,
    })
  }
  if (currentMaterial.elementalSkill.length !== 0) {
    currentMaterialArray.push({
      kind: 'Elemental Skill',
      progression: {
        from: trackCharacter.userCharacter.elementalSkill,
        to: trackCharacter.userCharacter.elementalSkill + 1,
      },
      material: currentMaterial.elementalSkill,
    })
  }
  if (currentMaterial.elementalBurst.length !== 0) {
    currentMaterialArray.push({
      kind: 'Elemental Burst',
      progression: {
        from: trackCharacter.userCharacter.elementalBurst,
        to: trackCharacter.userCharacter.elementalBurst + 1,
      },
      material: currentMaterial.elementalBurst,
    })
  }

  const tracking = [
    {
      label: 'Level',
      from: trackCharacter.userCharacter.level,
      to: trackCharacter.targetLevel,
    },
    {
      label: 'Ascension',
      from: trackCharacter.userCharacter.ascension,
      to: trackCharacter.targetAscension,
    },
    {
      label: 'Normal Attack',
      from: trackCharacter.userCharacter.normalAttack,
      to: trackCharacter.targetNormalAttack,
    },
    {
      label: 'Elemental Skill',
      from: trackCharacter.userCharacter.elementalSkill,
      to: trackCharacter.targetElementalSkill,
    },
    {
      label: 'Elemental Burst',
      from: trackCharacter.userCharacter.elementalBurst,
      to: trackCharacter.targetElementalBurst,
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
                      {track.from === track.to ? (
                        <span className="text-gray-12">{track.to}</span>
                      ) : (
                        <>
                          <span className="text-gray-12">{track.from}</span>
                          <span className="sr-only">to</span>
                          <Icon.Solid
                            name="arrowSmRight"
                            className="h-5 w-5"
                            aria-hidden
                          />
                          <span className="text-gray-12">{track.to}</span>
                        </>
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
                  {material.map((m) => (
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

function ProgressionField({
  kind,
  materials,
  progression,
}: {
  kind: string
  progression: {
    from: number
    to: number
  }
  materials: {
    key: string
    value: number
  }[]
}) {
  const fetcher = RemixReact.useFetcher()

  const busy = fetcher.state === 'submitting'

  return (
    <fetcher.Form method="post" className="p-6">
      <h4 className="font-medium text-gray-12">{kind}</h4>

      <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div className="mt-4 sm:flex sm:items-center sm:gap-8">
          <div className="flex items-center">
            <span className="text-6xl text-gray-12">{progression.from}</span>
            <span className="sr-only">to</span>
            <Icon.Solid
              name="arrowSmRight"
              className="h-10 w-10 text-gray-11"
              aria-hidden
            />
            <span className="text-6xl text-gray-12">{progression.to}</span>
          </div>
          <div>
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

        {/* use inventory system?? */}
        {/* <input
          type="hidden"
          name="materials"
          value={JSON.stringify(materials)}
        /> */}

        <input type="hidden" name="level" value={progression.from} />
        <input type="hidden" name="kind" value={kind} />
        <div className="hidden -space-x-px sm:block">
          <Button.Group
            type="submit"
            name="control"
            value="decrement"
            position="left"
          >
            <span className="sr-only">Decrease level</span>
            <Icon.Solid
              name="chevronLeft"
              className="h-5 w-5 text-gray-11"
              aria-hidden
            />
          </Button.Group>
          <Button.Group
            type="submit"
            name="control"
            value="increment"
            position="right"
          >
            <span className="sr-only">Increase level</span>
            <Icon.Solid
              name="chevronRight"
              className="h-5 w-5 text-gray-11"
              aria-hidden
            />
          </Button.Group>
        </div>

        <div className="mt-4 w-full xs:flex xs:items-center xs:gap-4 sm:hidden">
          <Button.Base
            type="submit"
            name="control"
            variant="secondary"
            value="decrement"
            className="mt-4 w-full sm:mt-0 sm:w-auto"
          >
            {busy ? 'Decreasing level...' : 'Decrease level'}
          </Button.Base>
          <Button.Base
            type="submit"
            name="control"
            value="increment"
            className="mt-4 w-full sm:mt-0 sm:w-auto"
          >
            {busy ? 'Increasing level...' : 'Increase level'}
          </Button.Base>
        </div>
      </div>
    </fetcher.Form>
  )
}
