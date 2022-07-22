import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  name: CharacterType.Name | 'Aether' | 'Lumine'
}

export default function ConstellationImage({ name }: Props) {
  return (
    <Image
      src={`/constellation/${Utils.getImageSrc(name)}.png`}
      alt=""
      className="h-8 w-8 flex-shrink-0"
      width={32}
      height={32}
    />
  )
}
