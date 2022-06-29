import * as React from 'react'

type BaseProps = {
  children: React.ReactNode
}

type ButtonProps = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export function Avatar({ children }: BaseProps) {
  return (
    <div className="focus-ring-2-primary-7-bg-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-7 shadow-sm">
      {children}
    </div>
  )
}

export const AvatarButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="focus-ring-2-primary-7-bg-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-7 shadow-sm"
        {...props}
      >
        {children}
      </button>
    )
  }
)
AvatarButton.displayName = 'AvatarButton'
