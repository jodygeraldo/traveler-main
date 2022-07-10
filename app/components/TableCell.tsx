import * as Utils from '~/utils'
import Image from './Image'
import Tooltip from './Tooltip'

interface Props {
  quantity?: number
  text?: string
}

export default function TableCell({ quantity, text }: Props) {
  if (!(text && quantity)) {
    return null
  }

  return (
    <div className="flex items-center">
      <Tooltip text={text}>
        <Image
          src={`/image/item/${Utils.getImageSrc(text)}.png`}
          alt={text}
          className="h-8 w-8 flex-shrink-0"
          width={32}
          height={32}
        />
      </Tooltip>
      <span className="ml-1 tabular-nums">{quantity.toLocaleString()}</span>
    </div>
  )
}
