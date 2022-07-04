import * as RemixImage from 'remix-image'
import * as Utils from '~/utils'
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
        <RemixImage.Image
          src={`/image/item/${Utils.getImageSrc(text)}.png`}
          alt={text}
          className="h-8 w-8 flex-shrink-0"
          responsive={[{ size: { width: 32, height: 32 } }]}
          dprVariants={[1, 2, 3]}
        />
      </Tooltip>
      <span className="ml-1 tabular-nums">{quantity.toLocaleString()}</span>
    </div>
  )
}
