import * as RemixReact from '@remix-run/react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'

type Props = {
  id: string
  title: string
  description: string
  url: string
  userRole: 'USER' | 'ADMIN'
  status: 'PUBLISHED' | 'PENDING' | 'DRAFT'
}

export default function ResourceCard({
  id,
  title,
  description,
  url,
  status,
  userRole,
}: Props) {
  const [searchParams] = RemixReact.useSearchParams()

  return (
    <section
      aria-labelledby={`resources-${title}-title`}
      className="min-h-full"
    >
      {userRole === 'USER' ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-full rounded-lg bg-gray-3 p-6 shadow hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-7"
        >
          <h2
            className="font-medium text-gray-12"
            id={`resources-${title}-title`}
          >
            {title}
          </h2>

          <p className="mt-2 text-gray-11">{description}</p>
          <Icon.Solid
            name="externalLink"
            className="absolute top-2 right-2 text-gray-11 group-hover:text-gray-12"
            aria-hidden
          />
        </a>
      ) : (
        <div className="group relative flex h-full flex-col justify-between rounded-lg bg-gray-3 p-6 shadow focus:outline-none focus:ring-2 focus:ring-primary-7">
          <Icon.Solid
            name="externalLink"
            className="absolute top-2 right-2 text-gray-11"
            aria-hidden
          />
          <div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-12 hover:underline"
              id={`resources-${title}-title`}
            >
              {title}
            </a>

            <p className="mt-2 text-gray-11">{description}</p>
          </div>

          <RemixReact.Form
            method="post"
            className="mt-4 space-y-2 sm:flex sm:items-center sm:gap-4 sm:space-y-0"
          >
            <input type="hidden" name="id" value={id} />
            {status !== 'PUBLISHED' && (
              <Button.Base
                type="submit"
                name="intent"
                value="setToPublished"
                variant="secondary"
                className="w-full"
              >
                Set to published
              </Button.Base>
            )}
            <Button.Link
              to={`edit?id=${id}&${searchParams.toString()}`}
              type="submit"
              styles="button"
              variant="info"
              className="w-full"
            >
              Edit
            </Button.Link>
            <Button.Base
              type="submit"
              name="intent"
              value="delete"
              variant="danger"
              className="w-full"
            >
              Delete
            </Button.Base>
          </RemixReact.Form>
        </div>
      )}
    </section>
  )
}
