import * as HeadlessUI from '@headlessui/react'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
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
  level: Zod.number().min(1).max(90),
  ascension: Zod.number().min(0).max(6),
  normalAttack: Zod.number().min(1).max(10),
  elementalSkill: Zod.number().min(1).max(10),
  elementalBurst: Zod.number().min(1).max(10),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    return RemixNode.json({ errors: result.errors }, { status: 400 })
  }

  const { name, ...progression } = result.data

  if (!UtilsServer.Character.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const errors = UtilsServer.Character.validateAscensionRequirement(progression)
  if (errors) {
    return RemixNode.json({ errors }, { status: 400 })
  }

  await CharacterModel.upsertCharacterTrack({
    name,
    ...progression,
    accountId,
  })

  return RemixNode.redirect('/track')
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const slugName = new URL(request.url).searchParams.get('name')
  if (!slugName) {
    throw RemixNode.json({ message: 'Missing name parameter' }, { status: 400 })
  }

  const name = Utils.deslugify(slugName)

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

  return RemixNode.json({ trackCharacter })
}

export default function TrackUpdatePage() {
  const [searchParams] = RemixReact.useSearchParams()
  const name = Utils.deslugify(searchParams.get('name') || '')
  const { trackCharacter } = RemixReact.useLoaderData<typeof loader>()
  const actionData = RemixReact.useActionData<typeof action>()

  const navigate = RemixReact.useNavigate()
  const transition = RemixReact.useTransition()
  const busy = transition.state === 'submitting'

  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    setOpen(true)
  }, [])

  const timerRef = React.useRef<NodeJS.Timeout>()
  function handleClose() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(false)

    const timer = setTimeout(() => {
      navigate('..')
    }, 500)
    timerRef.current = timer
  }

  return (
    <HeadlessUI.Transition.Root show={open} as={React.Fragment}>
      <HeadlessUI.Dialog
        as="div"
        className="relative z-10"
        onClose={handleClose}
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
              <HeadlessUI.Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <HeadlessUI.Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <RemixReact.Form
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
                            <Button.Icon onClick={handleClose}>
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
                          currentTarget={trackCharacter.targetLevel}
                          currentValue={trackCharacter.userCharacter.level}
                          max={90}
                          error={actionData?.errors?.level}
                        />

                        <ProgressionField
                          label="Ascension"
                          name="ascension"
                          currentTarget={trackCharacter.targetAscension}
                          currentValue={trackCharacter.userCharacter.ascension}
                          max={6}
                          error={actionData?.errors?.ascension}
                        />

                        <ProgressionField
                          id="normal-attack"
                          label="Normal Attack"
                          name="normalAttack"
                          currentTarget={trackCharacter.targetNormalAttack}
                          currentValue={
                            trackCharacter.userCharacter.normalAttack
                          }
                          max={10}
                          error={actionData?.errors?.normalAttack}
                        />

                        <ProgressionField
                          id="elemental-skill"
                          label="Elemental Skill"
                          name="elementalSkill"
                          currentTarget={trackCharacter.targetElementalSkill}
                          currentValue={
                            trackCharacter.userCharacter.elementalSkill
                          }
                          max={10}
                          error={actionData?.errors?.elementalSkill}
                        />

                        <ProgressionField
                          id="elemental-burst"
                          label="Elemental Burst"
                          name="elementalBurst"
                          currentTarget={trackCharacter.targetElementalBurst}
                          currentValue={
                            trackCharacter.userCharacter.elementalBurst
                          }
                          max={10}
                          error={actionData?.errors?.elementalBurst}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-6 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <Button.Base
                          type="button"
                          variant="basic"
                          disabled={busy}
                          onClick={handleClose}
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
                  </RemixReact.Form>
                </HeadlessUI.Dialog.Panel>
              </HeadlessUI.Transition.Child>
            </div>
          </div>
        </div>
      </HeadlessUI.Dialog>
    </HeadlessUI.Transition.Root>
  )
}