import * as RemixNode from '@remix-run/node'

export async function loader() {
  return RemixNode.redirect('/inventory/all')
}
