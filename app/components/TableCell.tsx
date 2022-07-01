import Image, { MimeType } from 'remix-image'
import { getImageSrc } from '~/utils'
import Tooltip from './Tooltip'

type Props = {
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
          src={`/image/item/${getImageSrc(text)}.png`}
          alt={text}
          className="h-8 w-8 flex-shrink-0"
          responsive={[{ size: { width: 32, height: 32 } }]}
          options={{ contentType: MimeType.WEBP }}
          dprVariants={[1, 2, 3]}
        />
      </Tooltip>
      <span className="ml-1 tabular-nums">{quantity.toLocaleString()}</span>
    </div>
  )
}
