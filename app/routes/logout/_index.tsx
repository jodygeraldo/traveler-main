import * as RemixNode from '@remix-run/node'
import * as Session from '~/session.server'

export async function action({ request }: RemixNode.ActionArgs) {
  return Session.logout(request)
}

export function loader() {
  return RemixNode.redirect('/')
}
