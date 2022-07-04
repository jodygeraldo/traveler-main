import * as React from 'react'
import type { iconOutlineId, iconSolidId } from '~/icons/index'
import { outline, solid } from '~/icons/index'

interface OutlineProps extends React.SVGAttributes<SVGElement> {
	type: 'outline'
	name: iconOutlineId
}

interface SolidProps extends React.SVGAttributes<SVGElement> {
	type: 'solid'
	name: iconSolidId
}

type Props = OutlineProps | SolidProps

export default function Icon({ type, name, ...props }: Props) {
	if (type === 'outline') {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				{...props}
			>
				<use href={`${outline[name]}#${name}`} />
			</svg>
		)
	}

	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="currentColor"
			{...props}
		>
			<use href={`${solid[name]}#${name}`} />
		</svg>
	)
}
