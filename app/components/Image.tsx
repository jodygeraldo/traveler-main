import clsx from 'clsx'
import * as React from 'react'

interface BaseProps {
  src: string
  alt: string
  className?: string
  width: number | string
  height?: number | string
  centered?: boolean
}

interface Props
  extends BaseProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BaseProps> {}

const PUBLIC_URL =
  'https://zgdynxzpcpwowgbwrwik.supabase.co/storage/v1/object/public/tm-image'

const Image = React.forwardRef<HTMLImageElement, Props>(
  ({ src, alt, className, width, height, centered, ...props }, ref) => {
    const getSrcSet = React.useCallback(
      (dpr = 1) => {
        const w =
          typeof width === 'number' ? `${width * dpr}px` : width || 'auto'
        const h =
          typeof height === 'number' ? `${height * dpr}px` : height || 'auto'

        return `//images.weserv.nl/?url=${PUBLIC_URL}${src}&w=${w}&h=${h}&output=webp`
      },
      [height, src, width]
    )

    const srcSet = React.useMemo(() => {
      return `${getSrcSet(1)} 1x, ${getSrcSet(2)} 2x, ${getSrcSet(
        3
      )} 3x, ${getSrcSet(4)} 4x`
    }, [getSrcSet])

    return (
      <picture
        className={clsx(centered && 'justify-center', 'flex flex-shrink-0')}
      >
        <source
          srcSet={srcSet}
          type="image/webp"
          width={width}
          height={height}
        />
        <img
          ref={ref}
          src={`//images.weserv.nl/?url=${PUBLIC_URL}${src}&w=${width}${
            height ? '&h=' + height : ''
          }&output=png&af`}
          alt={alt}
          className={className}
          width={width}
          height={height}
          {...props}
        />
      </picture>
    )
  }
)
Image.displayName = 'Image'

export default Image
