import type { LoaderFunction } from '@remix-run/node'
import { sharpTransformer } from 'remix-image-sharp'
import type { LoaderConfig } from 'remix-image/server'
import { DiskCache, imageLoader, MimeType } from 'remix-image/server'

const config: LoaderConfig = {
  selfUrl: 'http://localhost:3000',
  cache: new DiskCache(),
  transformer: sharpTransformer,
  fallbackFormat: MimeType.PNG,
}

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request)
}
