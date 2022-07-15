import Image from '~/components/Image'
import * as Utils from '~/utils'

export default function ConstellationImage({ name }: { name: string }) {
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
