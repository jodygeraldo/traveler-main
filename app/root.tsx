import * as RadixTooltip from '@radix-ui/react-tooltip'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as Session from './session.server'
import tailwindStylesheetUrl from './tailwind.css'

export const links: RemixNode.LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }]
}

export const meta: RemixNode.MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Traveler Main',
  viewport: 'width=device-width,initial-scale=1',
})

interface LoaderData {
  user: Awaited<ReturnType<typeof Session.getUser>>
}

export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  return RemixNode.json<LoaderData>({
    user: await Session.getUser(request),
  })
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <RemixReact.Meta />
        <RemixReact.Links />
      </head>
      <body className="h-full bg-gray-1">
        <RadixTooltip.Provider delayDuration={500}>
          <RemixReact.Outlet />
        </RadixTooltip.Provider>
        <RemixReact.ScrollRestoration />
        <RemixReact.Scripts />
        <RemixReact.LiveReload />
      </body>
    </html>
  )
}
