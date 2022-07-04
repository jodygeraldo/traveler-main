import { Switch as HeadlessUISwitch } from '@headlessui/react'
import clsx from 'clsx'
import * as React from 'react'

type Props = {
	label: string
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function Switch({ label, state }: Props) {
	const [enabled, setEnabled] = state

	return (
		<HeadlessUISwitch.Group as="div" className="flex items-center">
			<HeadlessUISwitch.Label as="span" className="mr-3">
				<span className="text-sm font-medium text-gray-12">{label}</span>
			</HeadlessUISwitch.Label>
			<HeadlessUISwitch
				checked={enabled}
				onChange={setEnabled}
				className={clsx(
					enabled ? 'bg-primary-9' : 'bg-gray-6',
					'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-offset-2 focus:ring-offset-gray-1'
				)}
			>
				<span
					aria-hidden="true"
					className={clsx(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-gray-12 shadow ring-0 transition duration-200 ease-in-out'
					)}
				/>
			</HeadlessUISwitch>
		</HeadlessUISwitch.Group>
	)
}
