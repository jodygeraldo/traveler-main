import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'

interface BaseProps {
  children: React.ReactNode
  className?: string
}

interface ButtonMenuProps
  extends BaseProps,
    Omit<RemixReact.LinkProps, keyof BaseProps> {
  prefetch?: 'intent' | 'render' | 'none'
  type?: 'button' | 'submit' | 'reset'
}

const LinkMenu = React.forwardRef<HTMLAnchorElement, ButtonMenuProps>(
  ({ children, ...props }, ref) => (
    <RemixReact.Link
      ref={ref}
      className={clsx(
        'inline-block w-full rounded-md py-2 px-4',
        'text-left text-sm text-gray-11',
        'radix-disabled:text-gray-8',
        'radix-highlighted:bg-gray-4 radix-highlighted:text-gray-12 radix-highlighted:outline-none radix-state-open:text-gray-12'
      )}
      {...props}
    >
      {children}
    </RemixReact.Link>
  )
)
LinkMenu.displayName = 'LinkMenu'

const Menu = LinkMenu
export { LinkMenu, Menu }
