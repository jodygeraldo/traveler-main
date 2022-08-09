import clsx from 'clsx'
import * as React from 'react'

interface BaseProps {
  src: string
  alt: string
  className?: string
  width: number
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
    return (
      <picture
        className={clsx(centered && 'justify-center', 'flex flex-shrink-0')}
      >
        <source
          srcSet={`//images.weserv.nl/?url=${PUBLIC_URL}${src}&w=${width}${
            height ? '&h=' + height : ''
          }&output=webp`}
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
