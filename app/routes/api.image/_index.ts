import type * as RemixNode from '@remix-run/node'
import * as RemixImageSharp from 'remix-image-sharp'
import * as RemixImageServer from 'remix-image/server'


export const loader: RemixNode.LoaderFunction = ({ request }) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  
  const config: RemixImageServer.LoaderConfig = {
    selfUrl: `http://${host}`,
    cache: new RemixImageServer.DiskCache(),
    transformer: RemixImageSharp.sharpTransformer,
    fallbackFormat: RemixImageServer.MimeType.PNG,
    defaultOptions: {
      contentType: RemixImageServer.MimeType.WEBP,
    },
  }
  
  return RemixImageServer.imageLoader(config, request)
}
