import logoUrl from '~/assets/logoipsum-logo-15.svg'

interface Props {
	logo?: boolean
	text?: boolean
}

export default function Logo({ logo = true, text = false }: Props) {
	// logo with text
	if (logo && text) {
		return <img className="block h-8 w-auto" src={logoUrl} alt="Qomik" />
	}

	// text only
	if (text && !logo) {
		return <img className="block h-8 w-auto" src={logoUrl} alt="Qomik" />
	}

	// logo only (default)
	return <img className="block h-8 w-auto" src={logoUrl} alt="Qomik" />
}
