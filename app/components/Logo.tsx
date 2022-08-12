import * as React from 'react'
import logoTextUrl from '~/assets/logoipsum-222.svg'
import logoUrl from '~/assets/logoipsum-logo-15.svg'

export default function Logo({
  ...props
}: Omit<React.ComponentPropsWithRef<'img'>, 'src'>) {
  return <img {...props} src={logoUrl} alt={props.alt} />
}

export function LogoWithText({
  ...props
}: Omit<React.ComponentPropsWithRef<'img'>, 'src'>) {
  return <img {...props} src={logoTextUrl} alt={props.alt} />
}

export const WithText = LogoWithText
export const WithoutText = Logo
