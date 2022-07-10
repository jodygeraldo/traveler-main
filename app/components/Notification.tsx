import * as HeadlessUIReact from '@headlessui/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Icon from './Icon'

export default function Notification({ success }: { success?: boolean }) {
  const [show, setShow] = React.useState(success !== undefined)

  React.useEffect(() => {
    if (success !== undefined) {
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success, setShow])

  if (success === undefined) {
    return null
  }

  return (
    <HeadlessUIReact.Portal>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-10 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <HeadlessUIReact.Transition
            show={show}
            as={React.Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                success ? 'bg-success-12' : 'bg-danger-12',
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-gray-7 ring-opacity-5'
              )}
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-1">
                      {success ? 'Level up successful' : 'Level up failed'}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className={clsx(
                        success
                          ? 'bg-success-12 focus:ring-success-8 focus:ring-offset-success-12 '
                          : 'bg-danger-12 focus:ring-danger-8 focus:ring-offset-danger-12 ',
                        'inline-flex rounded-md text-gray-1 focus:outline-none focus:ring-2 focus:ring-offset-2'
                      )}
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <Icon.Outline
                        name="x"
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </HeadlessUIReact.Transition>
        </div>
      </div>
    </HeadlessUIReact.Portal>
  )
}
