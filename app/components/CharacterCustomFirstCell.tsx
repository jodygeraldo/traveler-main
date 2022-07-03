import Image, { MimeType } from 'remix-image'
import { getImageSrc } from '~/utils'
import Tooltip from './Tooltip'

export default function CharacterCustomFirstCell({
  talentName,
  name,
  weapon,
  talent,
}: {
  talentName: string
  name: string
  weapon?: string
  talent: 'Normal_Attack' | 'Elemental_Skill' | 'Elemental_Burst'
}) {
  return (
    <Tooltip key={talentName} text={talentName}>
      <Image
        src={`/image/talent/${talent}_${
          talent === 'Normal_Attack' ? weapon : getImageSrc(name)
        }.png`}
        alt=""
        className="h-6 w-6 flex-shrink-0"
        responsive={[{ size: { width: 24, height: 24 } }]}
        options={{ contentType: MimeType.WEBP }}
        dprVariants={[1, 2, 3]}
      />
    </Tooltip>
  )
}
