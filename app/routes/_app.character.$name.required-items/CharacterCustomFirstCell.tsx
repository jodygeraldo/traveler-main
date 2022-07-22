import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  talentName: string[]
  name: CharacterType.Name
  weapon?: CharacterType.Weapon
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
        src={`/talent/${type}_${
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
