import * as RemixReact from '@remix-run/react'
import * as ReactDOMClient from 'react-dom/client'

ReactDOMClient.hydrateRoot(document, <RemixReact.RemixBrowser />)
