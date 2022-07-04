import type * as RemixNode from '@remix-run/node'
import * as RemixImageSharp from 'remix-image-sharp'
import * as RemixImageServer from 'remix-image/server'

const config: RemixImageServer.LoaderConfig = {
  selfUrl: 'http://localhost:3000',
  cache: new RemixImageServer.DiskCache(),
  transformer: RemixImageSharp.sharpTransformer,
  fallbackFormat: RemixImageServer.MimeType.PNG,
}

export const loader: RemixNode.LoaderFunction = ({ request }) => {
  return RemixImageServer.imageLoader(config, request)
}
