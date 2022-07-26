import * as HeadlessUI from '@headlessui/react'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import type * as CharacterTypes from '~/types/character'
import { getMissingCharacters } from '~/utils/character.server'
import Combobox from './Combobox'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const userCharactersName = await CharacterModel.getUserTrackCharactersName(
    accountId
  )
  const nonTrackCharacterNames = getMissingCharacters(userCharactersName)

  return RemixNode.json({ nonTrackCharacterNames })
}

export default function AddPriorityPage() {
  const { nonTrackCharacterNames } = RemixReact.useLoaderData<typeof loader>()

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

  const fetcher = RemixReact.useFetcher<CharacterTypes.Progression>()

  function handleFetchProgression(name: string) {
    fetcher.load('/api/get-character-progression?name=' + name)
  }

  console.log(fetcher.data)

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
                  <form className="flex h-full flex-col overflow-y-scroll bg-gray-2 shadow-xl">
                    <div className="flex-1">
                      <div className="bg-gray-3 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <HeadlessUI.Dialog.Title className="text-lg font-medium text-gray-12">
                            Track a character
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
                        <Combobox
                          options={nonTrackCharacterNames}
                          fetchProgressionHandler={handleFetchProgression}
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
                        <Button.Base id="track" type="submit" disabled={busy}>
                          {busy ? 'Tracking...' : 'Track'}
                        </Button.Base>
                      </div>
                    </div>
                  </form>
                </HeadlessUI.Dialog.Panel>
              </HeadlessUI.Transition.Child>
            </div>
          </div>
        </div>
      </HeadlessUI.Dialog>
    </HeadlessUI.Transition.Root>
  )
}
