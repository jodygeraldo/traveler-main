import { Outlet } from '@remix-run/react'

export default function CharacterLayout() {
	return (
		<div className="py-10">
			<Outlet />
		</div>
	)
}
