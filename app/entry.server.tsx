import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import isbot from 'isbot'
import * as ReactDOMServer from 'react-dom/server'
import * as Stream from 'stream'

const ABORT_DELAY = 5000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: RemixNode.EntryContext
) {
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady'

  return new Promise((resolve, reject) => {
    let didError = false
    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      <RemixReact.RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          const body = new Stream.PassThrough()

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new RemixNode.Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            })
          )
          pipe(body)
        },
        onShellError(err: unknown) {
          reject(err)
        },
        onError(error: unknown) {
          didError = true
          console.error(error)
        },
      }
    )
    setTimeout(abort, ABORT_DELAY)
  })
}
