import type * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as ReactDOMServer from 'react-dom/server'

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: RemixNode.EntryContext
) {
	const markup = ReactDOMServer.renderToString(
		<RemixReact.RemixServer context={remixContext} url={request.url} />
	)

	responseHeaders.set('Content-Type', 'text/html')

	return new Response('<!DOCTYPE html>' + markup, {
		status: responseStatusCode,
		headers: responseHeaders,
	})
}
