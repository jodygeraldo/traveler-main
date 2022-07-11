import * as React from 'react'

interface BaseProps {
  src: string
  alt: string
  className?: string
  width: number
  height?: number
}

interface Props
  extends BaseProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof BaseProps> {}

const Image = React.forwardRef<HTMLImageElement, Props>(
  ({ src, alt, className, width, height, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={`//images.weserv.nl/?url=https://traveler-main.fly.dev${src}&w=${width}${
          height ? '&h=' + height : ''
        }&output=webp`}
        alt={alt}
        className={className}
        width={width}
        height={height}
        {...props}
      />
    )
  }
)
Image.displayName = 'Image'

export default Image
