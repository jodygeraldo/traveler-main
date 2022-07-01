import Image, { MimeType } from 'remix-image'
import { getImageSrc } from '~/utils'
import Tooltip from './Tooltip'

type Props = {
  quantity: number
  text: string
}

export default function TableCell({ quantity, text }: Props) {
  return (
    <div className="flex items-center">
      <Tooltip text={text}>
        <Image
          src={`/image/item/${getImageSrc(text)}.png`}
          alt={text}
          className="h-6 w-6 flex-shrink-0"
          responsive={[{ size: { width: 24, height: 24 } }]}
          options={{ contentType: MimeType.WEBP }}
          dprVariants={[1, 2, 3]}
        />
      </Tooltip>
      <span className="ml-1 tabular-nums">{quantity}</span>
    </div>
  )
}
