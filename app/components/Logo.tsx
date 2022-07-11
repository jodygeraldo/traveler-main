import logoUrl from '~/assets/logoipsum-logo-15.svg'

interface Props {
  logo?: boolean
  text?: boolean
  className?: string
}

export default function Logo({ logo = true, text = false, className }: Props) {
  // logo with text
  if (logo && text) {
    return <img className={className} src={logoUrl} alt="Qomik" />
  }

  // text only
  if (text && !logo) {
    return <img className={className} src={logoUrl} alt="Qomik" />
  }

  // logo only (default)
  return <img className={className} src={logoUrl} alt="Qomik" />
}
