import Image from './Image'
import Tooltip from './Tooltip'

interface Props {
  src?: string
  quantity?: number
  text?: string
}

export default function CellWithImage({ src, quantity, text }: Props) {
  if (!(text && quantity)) {
    return null
  }

  return (
    <div className="flex items-center">
      <Tooltip text={text}>
        <Image
          src={src ?? ''}
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
