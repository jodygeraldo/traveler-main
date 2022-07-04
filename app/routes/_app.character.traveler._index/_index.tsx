import * as RemixNode from '@remix-run/node'

export const loader: RemixNode.LoaderFunction = () => {
	return RemixNode.redirect('/character/traveler/anemo')
}
