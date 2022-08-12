import * as RemixReact from '@remix-run/react'
import * as Icon from '~/components/Icon'

export default function Breadcrumb({
  backLinkTo,
  backLinkLabel,
}: {
  backLinkTo: string
  backLinkLabel: string
}) {
  const matches = RemixReact.useMatches()

  return (
    <>
      <nav
        className="flex border-b border-gray-6 bg-gray-2"
        aria-label="Breadcrumb"
      >
        <div className="flex px-4 py-3 sm:hidden sm:px-6 lg:px-8">
          <RemixReact.Link
            to={backLinkTo}
            prefetch="intent"
            className="group inline-flex space-x-3 text-sm font-medium text-gray-11 hover:text-gray-12"
          >
            <Icon.Solid
              name="arrowLeft"
              className="h-5 w-5 flex-shrink-0 text-gray-11 group-hover:text-gray-12"
            />
            <span>{backLinkLabel}</span>
          </RemixReact.Link>
        </div>
        <ol className="mx-auto hidden w-full space-x-4 px-4 sm:flex sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center">
              <RemixReact.Link
                prefetch="intent"
                to={backLinkTo}
                className="text-gray-10 hover:text-gray-11"
              >
                <Icon.Solid
                  name="home"
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">{backLinkLabel}</span>
              </RemixReact.Link>
            </div>
          </li>
          {matches
            .filter((match) => match.handle && match.handle.breadcrumb)
            .map((match, index) => (
              <li key={index} className="flex">
                <div className="flex items-center">
                  <svg
                    className="h-full w-6 flex-shrink-0 text-gray-6"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  {match.handle?.breadcrumb(match)}
                </div>
              </li>
            ))}
        </ol>
      </nav>
    </>
  )
}

function BreadcrumbLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <RemixReact.NavLink
      prefetch="intent"
      to={to}
      className="ml-4 text-sm font-medium text-gray-11 hover:text-gray-12"
    >
      {children}
    </RemixReact.NavLink>
  )
}

export const Component = Breadcrumb
export const Link = BreadcrumbLink
