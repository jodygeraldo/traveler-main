import { Menu, Popover, Transition } from '@headlessui/react'
import { Form, Link, NavLink, Outlet } from '@remix-run/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { ButtonIcon } from '~/components/Button'
import Icon from '~/components/Icon'
import Logo from '~/components/Logo'
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
									<Link
										to="/"
										className="rounded-md focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-gray-2"
									>
										<Logo />
									</Link>

									<nav
										className="hidden lg:flex lg:space-x-8 lg:py-2"
										aria-label="Global"
									>
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
														'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
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
								<Popover.Button
									onClick={toggleOverflowHiddenToBody}
									as={ButtonIcon}
									type="button"
								>
									<span className="sr-only">Open menu</span>
									{open ? (
										<Icon
											type="outline"
											name="x"
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<Icon
											type="outline"
											name="menu"
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Popover.Button>
							</div>
							<div className="hidden lg:relative lg:z-10 lg:flex lg:items-center">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-4 flex-shrink-0">
									<div>
										<Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-7 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-7 focus:ring-offset-2 focus:ring-offset-gray-1">
											{user.accounts[0] && 'A1'}
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
											<Form method="post" action="/logout">
												<Menu.Item>
													{({ active }) => (
														<button
															type="submit"
															className={clsx(
																active && 'bg-gray-4 text-gray-12',
																'block w-full rounded-md py-2 px-4 text-left text-sm text-gray-11 disabled:text-gray-8'
															)}
														>
															Sign out
														</button>
													)}
												</Menu.Item>
											</Form>
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
											'block rounded-md py-2 px-3 text-base font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
										)
									}
								>
									{item.name}
								</NavLink>
							))}
						</div>
						<div className="border-t border-gray-6 pt-4 pb-3">
							<div className="mx-auto max-w-3xl space-y-1 px-2 sm:px-4">
								<Form method="post" action="/logout">
									<button
										type="submit"
										className="block w-full rounded-md py-2 px-3 text-left text-base font-medium text-gray-11 hover:bg-gray-4 hover:text-gray-12 focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7"
									>
										Sign out
									</button>
								</Form>
							</div>
						</div>
					</Popover.Panel>
				</>
			)}
		</Popover>
	)
}
