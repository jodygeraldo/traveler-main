import Image from '~/components/Image'
import * as Utils from '~/utils'
import Tooltip from './Tooltip'

interface Props {
  talentName: string[]
  name: string
  weapon?: string
  talent: ('normal_attack' | 'elemental_skill' | 'elemental_burst')[]
}

export default function CharacterCustomFirstCell({
  talentName,
  name,
  weapon,
  talent,
}: Props) {
  return talent.map((type, idx) => (
    <Tooltip key={talentName[idx]} text={talentName[idx]}>
      <Image
        src={`/image/talent/${type}_${
          type === 'normal_attack'
            ? weapon?.toLowerCase()
            : Utils.getImageSrc(name)
        }.png`}
        alt=""
        className="h-6 w-6 flex-shrink-0"
        width={24}
        height={24}
      />
    </Tooltip>
  ))
}
