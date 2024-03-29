import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Logo from '~/components/Logo'
import useUser from '~/hooks/useUser'

const navigation = [
  { name: 'Character', to: '/character' },
  { name: 'Track', to: '/track' },
]

export default function AppNavbar() {
  function toggleOverflowHiddenToBody() {
    if (document && document.body) {
      document.body.classList.toggle('overflow-hidden')
    }
  }

  const user = useUser()

  return (
    <HeadlessUIReact.Popover
      as="header"
      className={({ open }) =>
        clsx(
          open && 'menu-open fixed inset-0 z-40 overflow-y-auto',
          'bg-gray-2 shadow-sm lg:static lg:overflow-y-visible'
        )
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center space-x-8">
                  <RemixReact.Link
                    to="/character"
                    className="rounded-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-gray-2"
                  >
                    <Logo className="block h-8 w-auto" />
                  </RemixReact.Link>

                  <nav
                    className="hidden lg:flex lg:space-x-4 lg:py-2"
                    aria-label="Global"
                  >
                    {navigation.map((item) => (
                      <RemixReact.NavLink
                        id={`${item.name}-link-desktop`}
                        prefetch="intent"
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? 'bg-gray-5 text-gray-12'
                              : 'text-gray-11 hover:bg-gray-4 hover:text-gray-12',
                            'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7'
                          )
                        }
                      >
                        {item.name}
                      </RemixReact.NavLink>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <HeadlessUIReact.Popover.Button
                  onClick={toggleOverflowHiddenToBody}
                  as={Button.Icon}
                  type="button"
                >
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <Icon.Outline
                      name="x"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon.Outline
                      name="menu"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </HeadlessUIReact.Popover.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:flex lg:items-center">
                {/* Profile dropdown */}
                <HeadlessUIReact.Menu as="div">
                  <HeadlessUIReact.Menu.Button
                    data-testid="avatar-dropdown"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-9 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-offset-2 focus:ring-offset-gray-1"
                  >
                    <Image
                      src="/character/traveler.png"
                      alt={`Account ${user.accounts[0].name}`}
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                    />
                  </HeadlessUIReact.Menu.Button>

                  <HeadlessUIReact.Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <HeadlessUIReact.Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-3 p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <RemixReact.Form method="post" action="/logout">
                        <HeadlessUIReact.Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={clsx(
                                active && 'bg-gray-4 text-gray-12',
                                'block w-full rounded-md py-2 px-4 text-left text-sm text-gray-11 disabled:text-gray-8'
                              )}
                            >
                              <span id="signout">Sign out</span>
                            </button>
                          )}
                        </HeadlessUIReact.Menu.Item>
                      </RemixReact.Form>
                    </HeadlessUIReact.Menu.Items>
                  </HeadlessUIReact.Transition>
                </HeadlessUIReact.Menu>
              </div>
            </div>
          </div>

          <HeadlessUIReact.Popover.Panel
            as="nav"
            className="lg:hidden"
            aria-label="Global"
          >
            <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
              {navigation.map((item) => (
                <RemixReact.NavLink
                  id={`${item.name}-link-mobile`}
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? 'bg-gray-5 text-gray-12'
                        : 'text-gray-11 hover:bg-gray-4 hover:text-gray-12',
                      'block rounded-md py-2 px-3 text-base font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7'
                    )
                  }
                >
                  {item.name}
                </RemixReact.NavLink>
              ))}
            </div>
            <div className="border-t border-gray-6 pt-4 pb-3">
              <div className="mx-auto max-w-3xl space-y-1 px-2 sm:px-4">
                <RemixReact.Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="block w-full rounded-md py-2 px-3 text-left text-base font-medium text-gray-11 hover:bg-gray-4 hover:text-gray-12 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7"
                  >
                    Sign out
                  </button>
                </RemixReact.Form>
              </div>
            </div>
          </HeadlessUIReact.Popover.Panel>
        </>
      )}
    </HeadlessUIReact.Popover>
  )
}
