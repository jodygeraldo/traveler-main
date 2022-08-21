import * as RadixDialog from '@radix-ui/react-dialog'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import type { Variants } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import * as Logo from '~/components/Logo'
import useUser from '~/hooks/useUser'

const navigation = [
  { name: 'Handbook', to: '/handbook' },
  { name: 'Character', to: '/character' },
  { name: 'Track', to: '/track' },
  { name: 'Resource', to: '/resource' },
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
        <Footer />
      </main>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-6 lg:bg-gray-2 lg:pt-5">
      <RemixReact.Link
        to="/character"
        prefetch="intent"
        className="flex flex-shrink-0 items-center px-4"
      >
        <Logo.LogoWithText className="h-8 w-auto" />
      </RemixReact.Link>
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
          <ProfileMenu dataTestId="desktop-profile-dropdown" />
        </div>
      </div>
    </div>
  )
}

const sidebarVariants: Variants = {
  hidden: {
    x: -9999,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
  show: {
    x: 0,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
}

const overlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

function MobileSidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger
        type="button"
        className="border-r border-gray-6 px-4 text-white focus:bg-gray-3 focus:outline-none lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Icon.Outline name="menuAlt2" className="h-6 w-6" aria-hidden="true" />
      </RadixDialog.Trigger>

      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            <div className="relative z-40">
              <RadixDialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-overlay-black-12"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                />
              </RadixDialog.Overlay>

              <div className="fixed inset-0 z-40 flex">
                <RadixDialog.Content asChild>
                  <motion.div
                    className="relative flex max-w-xs flex-1 flex-col bg-gray-2 pt-5 pb-4"
                    variants={sidebarVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
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
                  </motion.div>
                </RadixDialog.Content>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
                <div className="w-14 flex-shrink-0" aria-hidden="true" />
              </div>
            </div>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  )
}

function MobileTopbar() {
  return (
    <div className="sticky top-0 z-20 flex h-16 flex-shrink-0 border-b border-gray-6 bg-gray-2 lg:hidden">
      <MobileSidebar />

      <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <ProfileMenu dataTestId="mobile-profile-dropdown" />
        </div>
      </div>
    </div>
  )
}

function ProfileMenu({ dataTestId }: { dataTestId: string }) {
  const logoutSubmit = RemixReact.useSubmit()

  const { accounts } = useUser()

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger
        data-testid={dataTestId}
        className="group flex w-full items-center justify-between rounded-md p-4 text-sm font-medium text-gray-11 hover:bg-gray-4 hover:text-gray-12 focus:bg-gray-3 focus:outline-none radix-state-open:bg-gray-5 radix-state-open:text-gray-12 lg:rounded-none"
      >
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
            <Button.Menu
              onClick={() =>
                logoutSubmit(null, {
                  action: '/logout',
                  method: 'post',
                  replace: true,
                })
              }
            >
              Sign out
            </Button.Menu>
          </RadixDropdownMenu.Item>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}

function Footer() {
  return (
    <footer>
      <div className="max-w-prose px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-gray-9">
          TravelerMain is a open source project by{' '}
          <a
            href="https://jodygeraldo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-11 hover:text-gray-12 hover:underline"
          >
            Jody Geraldo
          </a>
          . The code is licensed under the MIT License. All Genshin Impact
          related contents and materials are copyright by{' '}
          <a
            href="https://www.hoyoverse.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-11 hover:text-gray-12 hover:underline"
          >
            HoYoverse
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
