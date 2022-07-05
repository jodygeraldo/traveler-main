import * as RemixImage from 'remix-image'
import * as Utils from '~/utils'
import Tooltip from './Tooltip'

interface Props {
  talentName: string[]
  name: string
  weapon?: string
  talent: ('Normal_Attack' | 'Elemental_Skill' | 'Elemental_Burst')[]
}

export default function CharacterCustomFirstCell({
  talentName,
  name,
  weapon,
  talent,
}: Props) {
  return talent.map((type, idx) => (
    <Tooltip key={talentName[idx]} text={talentName[idx]}>
      <RemixImage.Image
        src={`/image/talent/${type}_${
          type === 'Normal_Attack' ? weapon : Utils.getImageSrc(name)
        }.png`}
        alt=""
        className="h-6 w-6 flex-shrink-0"
        responsive={[{ size: { width: 24, height: 24 } }]}
        dprVariants={[1, 2, 3]}
      />
    </Tooltip>
  ))
}
