import * as RadixDialog from '@radix-ui/react-dialog'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Icon from '~/components/Icon'
import * as Link from '~/components/Link'
import * as Logo from '~/components/Logo'
import useUser from '~/hooks/useUser'

const navigation = [
  { name: 'Character', to: '/character' },
  { name: 'Track', to: '/track' },
]

export default function AppLayout() {
  return (
    <>
      <DesktopSidebar />
      <MainContainer />
    </>
  )
}

function MainContainer() {
  return (
    <div className="flex flex-col lg:pl-64">
      <MobileTopbar />

      <main className="flex-1">
        <RemixReact.Outlet />
      </main>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-6 lg:bg-gray-2 lg:pt-5">
      <div className="flex flex-shrink-0 items-center px-4">
        <Logo.LogoWithText className="h-8 w-auto" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <RemixReact.NavLink
              key={item.name}
              to={item.to}
              prefetch="intent"
              className={({ isActive }) =>
                clsx(
                  isActive
                    ? 'bg-gray-5 text-gray-12'
                    : 'text-gray-11 hover:bg-gray-4',
                  'flex rounded-md px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7'
                )
              }
            >
              {item.name}
            </RemixReact.NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-6">
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

function MobileSidebar() {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger
        type="button"
        className="border-r border-gray-6 px-4 text-white focus:bg-gray-3 focus:outline-none lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Icon.Outline name="menuAlt2" className="h-6 w-6" aria-hidden="true" />
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        <div className="relative z-40 ">
          <RadixDialog.Overlay className="fixed inset-0 bg-overlay-black-12 transition-opacity" />

          <div className="fixed inset-0 z-40 flex">
            <RadixDialog.Content className="relative flex max-w-xs flex-1 flex-col bg-gray-2 pt-5 pb-4">
              <div className="absolute top-0 right-0 -mr-12">
                <RadixDialog.Close
                  aria-label="Close"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7"
                >
                  <Icon.Solid name="x" className="h-6 w-6 text-gray-11" />
                </RadixDialog.Close>
              </div>

              <div className="flex flex-shrink-0 items-center px-4">
                <Logo.LogoWithText className="h-8 w-auto" />
              </div>

              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <RemixReact.NavLink
                        key={item.name}
                        to={item.to}
                        prefetch="intent"
                        className={({ isActive }) =>
                          clsx(
                            isActive
                              ? 'bg-gray-5 text-gray-12'
                              : 'text-gray-11 hover:bg-gray-4',
                            'flex rounded-md px-2 py-2 font-medium leading-5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-7'
                          )
                        }
                      >
                        {item.name}
                      </RemixReact.NavLink>
                    ))}
                  </div>
                </nav>
              </div>
            </RadixDialog.Content>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
            <div className="w-14 flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

function MobileTopbar() {
  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-6 bg-gray-2 lg:hidden">
      <MobileSidebar />

      <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

function ProfileMenu() {
  const { accounts } = useUser()

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger className="group flex w-full items-center justify-between rounded-md p-4 text-sm font-medium text-gray-11 hover:bg-gray-4 hover:text-gray-12 focus:bg-gray-3 focus:outline-none radix-state-open:bg-gray-5 radix-state-open:text-gray-12 lg:rounded-none">
        <span>{accounts[0].name}</span>
        <Icon.Solid name="chevronDown" className="ml-4 h-4 w-4" />
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          side="top"
          align="center"
          className="mx-2 mt-2 w-60 rounded-md bg-gray-3 p-1 shadow-lg ring-1 ring-overlay-black-1 origin-radix-context-menu [animation:scaleIn_150ms_ease-out] focus:outline-none"
        >
          <RadixDropdownMenu.Item asChild>
            <Link.Menu to="/logout">Sign out</Link.Menu>
          </RadixDropdownMenu.Item>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
