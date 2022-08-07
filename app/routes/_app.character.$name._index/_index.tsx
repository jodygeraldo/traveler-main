import * as RemixNode from '@remix-run/node'

export function loader({ request }: RemixNode.LoaderArgs) {
  return RemixNode.redirect(`${new URL(request.url).toString()}/required-items`)
}
