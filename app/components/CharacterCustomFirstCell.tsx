import * as RemixImage from 'remix-image'
import * as Utils from '~/utils'
import Tooltip from './Tooltip'

interface Props {
	talentName: string
	name: string
	weapon?: string
	talent: 'Normal_Attack' | 'Elemental_Skill' | 'Elemental_Burst'
}

export default function CharacterCustomFirstCell({
	talentName,
	name,
	weapon,
	talent,
}: Props) {
	return (
		<Tooltip key={talentName} text={talentName}>
			<RemixImage.Image
				src={`/image/talent/${talent}_${
					talent === 'Normal_Attack' ? weapon : Utils.getImageSrc(name)
				}.png`}
				alt=""
				className="h-6 w-6 flex-shrink-0"
				responsive={[{ size: { width: 24, height: 24 } }]}
				options={{ contentType: RemixImage.MimeType.WEBP }}
				dprVariants={[1, 2, 3]}
			/>
		</Tooltip>
	)
}
