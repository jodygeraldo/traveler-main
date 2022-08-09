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
import type * as CharacterTypes from '~/types/character'
import * as CharacterUtils from '~/utils/server/character.server'
import Combobox from './Combobox'
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

  const parsedName = CharacterUtils.parseCharacterNameOrThrow({ name })

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
    ascension: data.ascension || data.ascension === 0 ? data.ascension : 6,
    ...progression,
  }
  const errors = CharacterUtils.validateAscensionRequirement(
    requireCheckProgression
  )
  if (errors) {
    return RemixNode.json({ ok: false, errors }, { status: 400 })
  }

  await CharacterModel.upsertCharacterTrack({
    name: parsedName,
    ascension: data.ascension,
    ...progression,
    accountId,
  })

  return RemixNode.json({ ok: true, errors: {} }, { statusText: 'SUCCESS' })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const userNonTrackableCharacterNames =
    await CharacterModel.getUserNonTrackableCharactersName(accountId)
  const trackableCharacterNames = CharacterUtils.getMissingCharacters(
    userNonTrackableCharacterNames
  )

  const DEFAULT_PROGRESSION = {
    level: 1,
    ascension: 0,
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  }

  const url = new URL(request.url)
  const nameQuery = url.searchParams.get('name')

  let firstCharacter: CharacterTypes.CharacterNameWithProgression | undefined

  const name = nameQuery
    ? CharacterUtils.parseCharacterNameOrThrow({
        name: nameQuery,
        doDesglugify: true,
      })
    : undefined

  if (trackableCharacterNames.length > 0) {
    const characterProgression = await CharacterModel.getUserCharacter({
      name: name
        ? trackableCharacterNames.includes(name)
          ? name
          : trackableCharacterNames[0] ?? ''
        : trackableCharacterNames[0] ?? '',
      accountId,
    })

    firstCharacter = {
      name: name ? name : trackableCharacterNames[0],
      progression: characterProgression || DEFAULT_PROGRESSION,
    }
  }

  return RemixNode.json({
    trackableCharacterNames,
    firstCharacter,
  })
}

export default function AddTrackPage() {
  const { trackableCharacterNames, firstCharacter } =
    RemixReact.useLoaderData<typeof loader>()

  const submitFetcher = RemixReact.useFetcher<{
    ok: boolean
    errors: {
      [key: string]: string
    }
  }>()

  const navigate = RemixReact.useNavigate()
  const busy = submitFetcher.state === 'submitting'

  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (submitFetcher.data?.ok) {
      setOpen(false)
    }
  }, [submitFetcher.data])

  const progressionfetcher =
    RemixReact.useFetcher<CharacterTypes.CharacterNameWithProgression>()

  function handleFetchProgression(name: string) {
    if (name === '') return
    progressionfetcher.load('/api/get-character-progression?name=' + name)
  }

  const character = progressionfetcher.data

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
                      <submitFetcher.Form
                        method="post"
                        className="flex h-full flex-col overflow-y-scroll bg-gray-2 shadow-xl"
                      >
                        <div className="flex-1">
                          <div className="bg-gray-3 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between space-x-3">
                              <HeadlessUI.Dialog.Title className="text-lg font-medium text-gray-12">
                                Track a character
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
                            {trackableCharacterNames.length > 0 ? (
                              <>
                                <Combobox
                                  options={trackableCharacterNames}
                                  defaultValue={firstCharacter?.name}
                                  fetchProgressionHandler={
                                    handleFetchProgression
                                  }
                                />

                                {(firstCharacter || character) && (
                                  <>
                                    <div className="px-4 sm:px-6 sm:py-5">
                                      <p className="text-gray-11">
                                        Last updated progression for{' '}
                                        <span className="text-gray-12">
                                          {character
                                            ? character.name
                                            : firstCharacter.name}
                                        </span>
                                      </p>
                                    </div>

                                    <ProgressionField
                                      label="Level"
                                      name="level"
                                      currentValue={
                                        character
                                          ? character.progression.level
                                          : firstCharacter.progression.level
                                      }
                                      min={
                                        character
                                          ? character.progression.level
                                          : firstCharacter.progression.level
                                      }
                                      max={90}
                                      error={submitFetcher.data?.errors?.level}
                                    />

                                    <ProgressionField
                                      label="Ascension"
                                      name="ascension"
                                      currentValue={
                                        character
                                          ? character.progression.ascension
                                          : firstCharacter.progression.ascension
                                      }
                                      min={
                                        character
                                          ? character.progression.ascension
                                          : firstCharacter.progression.ascension
                                      }
                                      max={6}
                                      error={
                                        submitFetcher.data?.errors?.ascension
                                      }
                                    />

                                    <ProgressionField
                                      id="normal-attack"
                                      label="Normal Attack"
                                      name="normalAttack"
                                      currentValue={
                                        character
                                          ? character.progression.normalAttack
                                          : firstCharacter.progression
                                              .normalAttack
                                      }
                                      min={
                                        character
                                          ? character.progression.normalAttack
                                          : firstCharacter.progression
                                              .normalAttack
                                      }
                                      max={10}
                                      error={
                                        submitFetcher.data?.errors?.normalAttack
                                      }
                                    />

                                    <ProgressionField
                                      id="elemental-skill"
                                      label="Elemental Skill"
                                      name="elementalSkill"
                                      currentValue={
                                        character
                                          ? character.progression.elementalSkill
                                          : firstCharacter.progression
                                              .elementalSkill
                                      }
                                      min={
                                        character
                                          ? character.progression.elementalSkill
                                          : firstCharacter.progression
                                              .elementalSkill
                                      }
                                      max={10}
                                      error={
                                        submitFetcher.data?.errors
                                          ?.elementalSkill
                                      }
                                    />

                                    <ProgressionField
                                      id="elemental-burst"
                                      label="Elemental Burst"
                                      name="elementalBurst"
                                      currentValue={
                                        character
                                          ? character.progression.elementalBurst
                                          : firstCharacter.progression
                                              .elementalBurst
                                      }
                                      min={
                                        character
                                          ? character.progression.elementalBurst
                                          : firstCharacter.progression
                                              .elementalBurst
                                      }
                                      max={10}
                                      error={
                                        submitFetcher.data?.errors
                                          ?.elementalBurst
                                      }
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <div className="mt-12 px-4 text-center sm:px-6">
                                <h3 className="text-lg font-medium leading-6 text-gray-12">
                                  No trackable character
                                </h3>
                                <p className="text-gray-11">
                                  You don't have any characters that can be
                                  tracked. This means that you already have all
                                  characters maxed out and/or tracked.
                                </p>
                              </div>
                            )}
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
                              {trackableCharacterNames.length > 0
                                ? 'Cancel'
                                : 'Close'}
                            </Button.Base>
                            {trackableCharacterNames.length > 0 && (
                              <Button.Base
                                id="track"
                                type="submit"
                                disabled={busy}
                              >
                                {busy ? 'Tracking...' : 'Track'}
                              </Button.Base>
                            )}
                          </div>
                        </div>
                      </submitFetcher.Form>
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
