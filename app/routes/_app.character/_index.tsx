import * as RemixReact from '@remix-run/react'

export default function CharacterLayout() {
	return (
		<div className="py-10">
			<RemixReact.Outlet />
		</div>
	)
}
