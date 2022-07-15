import * as RemixReact from '@remix-run/react'
import AppNavbar from './AppNavbar'

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <RemixReact.Outlet />
    </>
  )
}
