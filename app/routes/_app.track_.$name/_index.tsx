import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as Breadcrumb from '~/components/Breadcrumb'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'
import Dialog from './Dialog'
import ProgressionField from './ProgressionField'

const FormDataSchema = Zod.object({
  kind: Zod.enum([
    'edit',
    'delete',
    'Ascension',
    'Normal Attack',
    'Elemental Skill',
    'Elemental Burst',
  ]),
  control: Zod.enum(['increment', 'decrement']).optional(),
  level: Zod.number().nonnegative().optional(),
  targetLevel: Zod.number().nonnegative().optional(),
  editName: Zod.string().optional(),
  editAscension: Zod.number().optional(),
  editLevel: Zod.number().optional(),
  editNormalAttack: Zod.number().optional(),
  editElementalSkill: Zod.number().optional(),
  editElementalBurst: Zod.number().optional(),
  deleteName: Zod.string().optional(),
})

export async function action({ params, request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)
  const name = CharacterUtils.parseCharacterNameOrThrow({
    name: params.name,
    doDesglugify: true,
  })

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { kind, control, level, targetLevel, deleteName, ...editProgression } =
    result.data

  if (kind === 'delete') {
    await CharacterModel.deleteTrackCharacter({
      name: Zod.string().parse(deleteName),
      accountId,
    })

    return RemixNode.redirect('/track')
  }

  if (kind === 'edit') {
    const name = Zod.string().parse(editProgression.editName)

    const progression = {
      ascension: Zod.number().parse(editProgression.editAscension),
      level: editProgression.editLevel,
      normalAttack: editProgression.editNormalAttack,
      elementalSkill: editProgression.editElementalSkill,
      elementalBurst: editProgression.editElementalBurst,
    }

    const parsedName = CharacterUtils.parseCharacterNameOrThrow({ name })

    const errors = CharacterUtils.validateAscensionRequirement(progression)
    if (errors) {
      return RemixNode.json({ success: false, errors }, { status: 400 })
    }

    await CharacterModel.upsertCharacter({
      name: parsedName,
      progression,
      accountId,
    })

    return RemixNode.json({ success: true, errors: {} })
  }

  const progression: {
    level?: number
    ascension?: number
    normalAttack?: number
    elementalSkill?: number
    elementalBurst?: number
  } = {}

  invariant(control !== undefined, 'control is required')
  invariant(level !== undefined, 'level is required')

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
  const name = CharacterUtils.parseCharacterNameOrThrow({
    name: params.name,
    doDesglugify: true,
  })

  const [track, trackStatus] = await Promise.all([
    CharacterModel.getUserTrackCharacter({
      name,
      accountId,
    }),
    CharacterModel.getUserCharacterTrackStatus({
      name,
      accountId,
    }),
  ])
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
    trackStatus,
  })
}

export default function TrackDetailPage() {
  const { track, materials, currentMaterials, trackStatus } =
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
    <>
      <Breadcrumb.Component
        backLinkLabel="Back to track list"
        backLinkTo="/track"
      />

      <div className="my-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="sr-only">Track Detail</h1>

          <div className="grid grid-cols-1 items-start gap-4 2xl:grid-cols-3 2xl:gap-8">
            <div className="grid grid-cols-1 gap-4 2xl:col-span-2">
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
                        <Dialog
                          name={name}
                          progression={{
                            level: track.level.current,
                            ascension: track.ascension.current,
                            normalAttack: track.normalAttack.current,
                            elementalSkill: track.elementalSkill.current,
                            elementalBurst: track.elementalBurst.current,
                          }}
                        >
                          <Button.Base variant="basic" className="text-center">
                            Edit level
                          </Button.Base>
                        </Dialog>
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
                              <span className="text-gray-12">
                                {track.current}
                              </span>
                              <span className="sr-only">to</span>
                              <Icon.Solid
                                name="arrowSmRight"
                                className="h-5 w-5"
                                aria-hidden
                              />
                              <span className="text-gray-12">
                                {track.target}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-12">
                              {track.current}
                            </span>
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
                    {currentMaterialArray.map(
                      ({ kind, progression, material }) => (
                        <ProgressionField
                          key={kind}
                          kind={kind}
                          progression={progression}
                          materials={material}
                          targetLevel={track.level.target}
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            </div>
            {trackStatus.isMaxLevel || materials.length !== 0 ? (
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="side-title">
                  <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
                    <div className="p-6">
                      <h2 className="font-medium text-gray-12" id="side-title">
                        {trackStatus.isMaxLevel ? 'Max level' : 'Materials'}
                      </h2>
                      {trackStatus.isMaxLevel && (
                        <RemixReact.Form replace={true} method="post">
                          <p className="mt-6 text-sm text-gray-11">
                            Your character is already on max levels.
                          </p>
                          <input type="hidden" name="deleteName" value={name} />
                          <Button.Base
                            type="submit"
                            name="kind"
                            value="delete"
                            className="mt-2 w-full"
                            variant="info"
                          >
                            Delete Track
                          </Button.Base>
                        </RemixReact.Form>
                      )}
                      {materials.length !== 0 && (
                        <div className="mt-6 flow-root">
                          {materials.map((m) => (
                            <div
                              key={m.key}
                              className="flex items-center gap-2"
                            >
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
                      )}
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export const handle = {
  breadcrumb: () => <Breadcrumb.Link to=".">Track Detail</Breadcrumb.Link>,
}
