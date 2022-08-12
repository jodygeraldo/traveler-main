import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'

type KindProps = 'button' | 'icon' | 'group' | 'buttonLink' | 'text'
type VariantProps =
  | 'primary'
  | 'secondary'
  | 'basic'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
type FocusRingProps = 1 | 2 | 3 | 'group' | 'inset'
type PositionProps = 'left' | 'middle' | 'right'

interface BaseProps {
  children: React.ReactNode
  className?: string
}

interface ButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  type?: 'button' | 'submit' | 'reset'
  variant?:
    | 'primary'
    | 'secondary'
    | 'basic'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
  focusRing?: 1 | 2 | 3
}

interface ButtonIconProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  type?: 'button' | 'submit' | 'reset'
}

interface ButtonLinkProps
  extends BaseProps,
    Omit<RemixReact.LinkProps, keyof BaseProps> {
  prefetch?: 'intent' | 'render' | 'none'
  styles?: 'button' | 'buttonLink'
  variant?:
    | 'primary'
    | 'secondary'
    | 'basic'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
  focusRing?: 1 | 2 | 3
}

interface ButtonLinkExternalProps
  extends BaseProps,
    Omit<React.LinkHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  kind?: 'buttonLink' | 'text'
  focusRing?: 1 | 2 | 3
}

interface ButtonGroupProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  type?: 'button' | 'submit' | 'reset'
  position?: 'left' | 'middle' | 'right'
  active?: boolean
}

interface ButtonMenuProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  type?: 'button' | 'submit' | 'reset'
  isRadix?: boolean
}

const baseStyles: Record<KindProps, string> = {
  button:
    'group inline-flex items-center justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm',
  icon: 'group text-gray-11 hover:enabled:text-gray-12 inline-flex items-center rounded-md border border-transparent p-2 text-sm font-medium shadow-sm disabled:text-gray-6',
  group:
    'group relative inline-flex items-center justify-between text-sm transition p-2 border disabled:bg-gray-6',
  text: 'group inline-flex items-center rounded-md text-sm font-semibold text-gray-11 hover:enabled:text-gray-12 focus:ring-primary-8',
  buttonLink:
    'group inline-flex items-center rounded-md text-sm border border-gray-7 px-4 py-2 font-medium text-gray-11 shadow-sm hover:border-primary-8 focus:ring-primary-8',
}

const variantStyles: Record<VariantProps, string> = {
  primary:
    'bg-primary-9 text-white hover:bg-primary-10 focus:ring-primary-8 disabled:bg-primary-6 disabled:text-primary-11',
  secondary:
    'bg-primary-3 text-primary-11 hover:bg-primary-4 focus:ring-primary-8 disabled:bg-primary-6',
  basic:
    'bg-gray-3 text-gray-11 hover:bg-gray-4 focus:ring-primary-8 disabled:bg-gray-6',
  success:
    'bg-success-3 text-success-11 hover:bg-success-4 focus:ring-success-8 disabled:bg-success-6',
  warning:
    'bg-warning-3 text-warning-11 hover:bg-warning-4 focus:ring-warning-8 disabled:bg-warning-6',
  info: 'bg-info-3 text-info-11 hover:bg-info-4 focus:ring-info-8 disabled:bg-info-6',
  danger:
    'bg-danger-3 text-danger-11 hover:bg-danger-4 focus:ring-danger-8 disabled:bg-danger-6',
}

const focusRingStyles: Record<FocusRingProps, string> = {
  1: 'focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-1',
  2: 'focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-2',
  3: 'focus:z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-3',
  group: 'focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-8',
  inset:
    'focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-8',
}

const positionStyles: Record<PositionProps, string> = {
  left: 'rounded-l-md',
  right: 'rounded-r-md',
  middle: 'rounded-none',
}

const activeStyles: Record<'true' | 'false', string> = {
  true: 'border-primary-7 bg-primary-5 text-primary-11',
  false: 'border-gray-7 bg-gray-2 text-gray-11 hover:bg-gray-3',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      focusRing = 2,
      variant = 'primary',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          baseStyles['button'],
          variantStyles[variant],
          focusRingStyles[focusRing],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ type = 'button', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          baseStyles['icon'],
          focusRingStyles['inset'],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ButtonIcon.displayName = 'ButtonIcon'

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      prefetch,
      styles: as = 'buttonLink',
      variant = 'primary',
      focusRing = 2,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <RemixReact.Link
        prefetch={prefetch}
        ref={ref}
        className={clsx(
          baseStyles[as],
          as === 'button' && variantStyles[variant],
          focusRingStyles[focusRing],
          className
        )}
        {...props}
      >
        {children}
      </RemixReact.Link>
    )
  }
)
ButtonLink.displayName = 'ButtonLink'

const ButtonLinkExternal = React.forwardRef<
  HTMLAnchorElement,
  ButtonLinkExternalProps
>(
  (
    { kind = 'buttonLink', focusRing = 2, className, children, ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          baseStyles[kind],
          focusRingStyles[focusRing],
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
ButtonLinkExternal.displayName = 'ButtonLinkExternal'

const ButtonGroup = React.forwardRef<HTMLButtonElement, ButtonGroupProps>(
  (
    {
      type = 'button',
      position = 'middle',
      active,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          baseStyles['group'],
          focusRingStyles['group'],
          positionStyles[position],
          activeStyles[active ? 'true' : 'false'],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'

const ButtonMenu = React.forwardRef<HTMLButtonElement, ButtonMenuProps>(
  ({ type = 'button', isRadix = false, children, ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'w-full rounded-md py-2 px-4',
        'text-left text-sm text-gray-11',
        'radix-disabled:text-gray-8',
        'radix-highlighted:bg-gray-4 radix-highlighted:text-gray-12 radix-highlighted:outline-none radix-state-open:text-gray-12'
      )}
      {...props}
    >
      {children}
    </button>
  )
)
ButtonMenu.displayName = 'ButtonMenu'

export default Button
export { ButtonIcon, ButtonLink, ButtonLinkExternal, ButtonGroup, ButtonMenu }
export const Base = Button
export const Icon = ButtonIcon
export const Link = ButtonLink
export const LinkExternal = ButtonLinkExternal
export const Group = ButtonGroup
export const Menu = ButtonMenu
