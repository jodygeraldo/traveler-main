import * as RadixTooltip from '@radix-ui/react-tooltip'
import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import NProgress from 'nprogress'
import * as React from 'react'
import * as Session from './session.server'
import tailwindStylesheetUrl from './tailwind.css'

NProgress.configure({ showSpinner: false })

export const links: RemixNode.LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/font/inter-3.19/inter.css' },
    { rel: 'stylesheet', href: tailwindStylesheetUrl },
  ]
}

export const meta: RemixNode.MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Traveler Main',
  viewport: 'width=device-width,initial-scale=1',
  description:
    'Traveler Main is an app for Genshin Impact nerds to use to track progression of characters to the max',
  keywords: 'Genshin Impact,progression,items',
})

export async function loader({ request }: RemixNode.LoaderArgs) {
  return RemixNode.json({
    user: await Session.getUser(request),
  })
}

export default function App() {
  const transition = RemixReact.useTransition()
  const fetchers = RemixReact.useFetchers()

  const state = React.useMemo<'idle' | 'loading'>(
    function getGlobalState() {
      let states = [
        transition.state,
        ...fetchers.map((fetcher) => fetcher.state),
      ]
      if (states.every((state) => state === 'idle')) return 'idle'
      return 'loading'
    },
    [transition.state, fetchers]
  )

  React.useEffect(() => {
    if (state === 'loading') NProgress.start()
    if (state === 'idle') NProgress.done()
  }, [state])

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

export const unstable_shouldReload: RemixReact.ShouldReloadFunction = ({
  submission,
  prevUrl,
}) => {
  return (
    !!submission &&
    (prevUrl.pathname === '/login' ||
      prevUrl.pathname === '/join' ||
      prevUrl.pathname === '/logout')
  )
}
