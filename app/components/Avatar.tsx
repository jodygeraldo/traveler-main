import * as React from 'react'
import * as RadixAvatar from '@radix-ui/react-avatar'

type Props = {
  imageUrl?: string
  fallback: string
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export function Avatar({ imageUrl, fallback }: Props) {
  return <AvatarImage imageUrl={imageUrl} fallback={fallback} />
}

export const AvatarButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ imageUrl, fallback, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="focus-ring-2-primary-7-bg-1 h-8 w-8 rounded-full"
        {...props}
      >
        <AvatarImage imageUrl={imageUrl} fallback={fallback} />
      </button>
    )
  }
)
AvatarButton.displayName = 'AvatarButton'

function AvatarImage({ imageUrl, fallback }: Props) {
  return (
    <RadixAvatar.Root className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-9">
      {imageUrl ? (
        <>
          <span className="sr-only">{fallback}</span>
          <RadixAvatar.Image src={imageUrl} className="h-full w-full rounded-full" alt="" />
        </>
      ) : null}
      <RadixAvatar.Fallback delayMs={600} className="text-sm font-medium leading-none text-white">
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
