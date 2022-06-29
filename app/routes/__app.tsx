import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import Icon from '~/components/Icon'
import clsx from 'clsx'
import { Link, NavLink, Outlet } from '@remix-run/react'
import Logo from '~/components/Logo'
import { AvatarButton } from '~/components/Avatar'
import { ButtonIcon } from '~/components/Button'
import { useUser } from '~/utils'

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
}

const navigation = [
  { name: 'Character', to: '/character' },
  { name: 'Inventory', to: '/inventory' },
]
const userNavigation = [
  { name: 'Your Profile', to: '/profile' },
  { name: 'Settings', to: '/setting' },
  { name: 'Sign out', to: '/signout' },
]

function AppNavbar() {
  function toggleOverflowHiddenToBody() {
    document.body.classList.toggle('overflow-hidden')
  }

  const user = useUser()

  return (
    <Popover
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
                  <Link to="/" className="focus-ring-2-primary-8-bg-2 rounded-md">
                    <Logo />
                  </Link>

                  <nav className="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
                    {navigation.map((item) => (
                      <NavLink
                        prefetch="intent"
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? 'bg-gray-5 text-gray-12'
                              : 'text-gray-11 hover:bg-gray-4 hover:text-gray-12',
                            'focus-ring-2-gray-7-inset inline-flex items-center rounded-md py-2 px-3 text-sm font-medium'
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button onClick={toggleOverflowHiddenToBody} as={ButtonIcon} type="button">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <Icon type="outline" name="x" className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Icon type="outline" name="menu" className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:flex lg:items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button as={AvatarButton}>
                      {user.account[0] && 'A1'}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-3 p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              className={clsx(
                                active && 'bg-gray-4 text-gray-12',
                                'block rounded-md py-2 px-4 text-sm text-gray-11 disabled:text-gray-8'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? 'bg-gray-5 text-gray-12'
                        : 'text-gray-11 hover:bg-gray-4 hover:text-gray-12',
                      'focus-ring-2-gray-7-inset block rounded-md py-2 px-3 text-base font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="border-t border-gray-6 pt-4 pb-3">
              <div className="mx-auto max-w-3xl space-y-1 px-2 sm:px-4">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="focus-ring-2-gray-7-inset block rounded-md py-2 px-3 text-base font-medium text-gray-11 hover:bg-gray-4 hover:text-gray-12"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}
