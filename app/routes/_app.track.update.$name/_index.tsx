import * as HeadlessUI from '@headlessui/react'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as UtilsServer from '~/utils/index.server'
import ProgressionField from './ProgressionField'

const FormDataSchema = Zod.object({
  name: Zod.string(),
  level: Zod.number().min(1).max(90).optional(),
  ascension: Zod.number().min(0).max(6).optional(),
  normalAttack: Zod.number().min(1).max(10).optional(),
  elementalSkill: Zod.number().min(1).max(10).optional(),
  elementalBurst: Zod.number().min(1).max(10).optional(),
  levelCurrent: Zod.number().min(1).max(90).optional(),
  ascensionCurrent: Zod.number().min(0).max(6).optional(),
  normalAttackCurrent: Zod.number().min(1).max(10).optional(),
  elementalSkillCurrent: Zod.number().min(1).max(10).optional(),
  elementalBurstCurrent: Zod.number().min(1).max(10).optional(),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    return RemixNode.json({ ok: false, errors: result.errors }, { status: 400 })
  }

  const { name, ...data } = result.data

  if (!UtilsServer.Character.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const progression = {
    level: data.level
      ? data.level !== data.levelCurrent
        ? data.level
        : undefined
      : undefined,
    normalAttack: data.normalAttack
      ? data.normalAttack !== data.normalAttackCurrent
        ? data.normalAttack
        : undefined
      : undefined,
    elementalSkill: data.elementalSkill
      ? data.elementalSkill !== data.elementalSkillCurrent
        ? data.elementalSkill
        : undefined
      : undefined,
    elementalBurst: data.elementalBurst
      ? data.elementalBurst !== data.elementalBurstCurrent
        ? data.elementalBurst
        : undefined
      : undefined,
  }

  const requireCheckProgression = {
    // if not set it means ascension is on max level(6)
    ascension: data.ascension ? data.ascension : 6,
    ...progression,
  }
  const errors = UtilsServer.Character.validateAscensionRequirement(
    requireCheckProgression
  )
  if (errors) {
    return RemixNode.json({ ok: false, errors }, { status: 400 })
  }

  await CharacterModel.updateTrackCharacter({
    name,
    ascension: data.ascension,
    ...progression,
    accountId,
  })

  return RemixNode.json({ ok: true, errors: {} }, { statusText: 'SUCCESS' })
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

  return RemixNode.json({ track })
}

export default function TrackUpdatePage() {
  const name = Utils.deslugify(RemixReact.useParams().name || '')
  const { track } = RemixReact.useLoaderData<typeof loader>()

  const fetcher = RemixReact.useFetcher<{
    ok: boolean
    errors: {
      [key: string]: string
    }
  }>()

  const navigate = RemixReact.useNavigate()
  const busy = fetcher.state === 'submitting'

  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (fetcher.data?.ok) {
      setOpen(false)
    }
  }, [fetcher.data])

  return (
    <HeadlessUI.Transition.Root show={open} as={React.Fragment}>
      <HeadlessUI.Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpen(false)}
      >
        <HeadlessUI.Transition.Child
          as={React.Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay-black-12 transition-opacity" />
        </HeadlessUI.Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <AnimatePresence
                exitBeforeEnter
                onExitComplete={() => navigate('/track')}
              >
                {open && (
                  <motion.div
                    className="flex max-w-full"
                    transition={{
                      x: { duration: 0.5 },
                      default: { ease: 'easeInOut' },
                    }}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                  >
                    <HeadlessUI.Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                      <fetcher.Form
                        method="post"
                        className="flex h-full flex-col overflow-y-scroll bg-gray-2 shadow-xl"
                      >
                        <div className="flex-1">
                          <div className="bg-gray-3 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between space-x-3">
                              <HeadlessUI.Dialog.Title className="text-lg font-medium text-gray-12">
                                Update {name} Track
                              </HeadlessUI.Dialog.Title>

                              <div className="flex h-7 items-center">
                                <Button.Icon onClick={() => setOpen(false)}>
                                  <span className="sr-only">Close panel</span>
                                  <Icon.Outline
                                    name="x"
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </Button.Icon>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-6 sm:py-0">
                            <input type="hidden" name="name" value={name} />

                            <ProgressionField
                              label="Level"
                              name="level"
                              value={track.level}
                              max={90}
                              error={fetcher.data?.errors?.level}
                            />

                            <ProgressionField
                              label="Ascension"
                              name="ascension"
                              value={track.ascension}
                              max={6}
                              error={fetcher.data?.errors?.ascension}
                            />

                            <ProgressionField
                              id="normal-attack"
                              label="Normal Attack"
                              name="normalAttack"
                              value={track.normalAttack}
                              max={10}
                              error={fetcher.data?.errors?.normalAttack}
                            />

                            <ProgressionField
                              id="elemental-skill"
                              label="Elemental Skill"
                              name="elementalSkill"
                              value={track.elementalSkill}
                              max={10}
                              error={fetcher.data?.errors?.elementalSkill}
                            />

                            <ProgressionField
                              id="elemental-burst"
                              label="Elemental Burst"
                              name="elementalBurst"
                              value={track.elementalBurst}
                              max={10}
                              error={fetcher.data?.errors?.elementalBurst}
                            />
                          </div>
                        </div>

                        <div className="flex-shrink-0 border-t border-gray-6 px-4 py-5 sm:px-6">
                          <div className="flex justify-end space-x-3">
                            <Button.Base
                              type="button"
                              variant="basic"
                              disabled={busy}
                              onClick={() => setOpen(false)}
                            >
                              Cancel
                            </Button.Base>

                            <Button.Base
                              id="update-track"
                              type="submit"
                              disabled={busy}
                            >
                              {busy ? 'Updating...' : 'Update'}
                            </Button.Base>
                          </div>
                        </div>
                      </fetcher.Form>
                    </HeadlessUI.Dialog.Panel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </HeadlessUI.Dialog>
    </HeadlessUI.Transition.Root>
  )
}
