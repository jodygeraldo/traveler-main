import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'

ReactDOMClient.hydrateRoot(
  document,
  <React.StrictMode>
    <RemixReact.RemixBrowser />
  </React.StrictMode>
)
