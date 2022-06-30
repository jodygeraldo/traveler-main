import clsx from 'clsx'
import * as React from 'react'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'

type BaseProps = {
  className?: string
  children: React.ReactNode
}

interface BadgeProps extends BaseProps {
  variant?: Variant
  size?: 'xs' | 'sm'
  squared?: boolean
  roundedFull?: boolean
}

interface BadgeRarityProps extends BaseProps {
  rarity: 1 | 2 | 3 | 4 | 5
}

const colorVariant: Record<Variant, string> = {
  primary: 'bg-primary-4 text-primary-11',
  secondary: 'bg-gray-4 text-gray-11',
  success: 'bg-success-4 text-success-11',
  danger: 'bg-danger-4 text-danger-11',
  warning: 'bg-warning-4 text-warning-11',
  info: 'bg-info-4 text-info-11',
}

const rarityVariant: Record<BadgeRarityProps['rarity'], string> = {
  1: 'bg-rarity-1/20 text-rarity-1',
  2: 'bg-rarity-2/20 text-rarity-2',
  3: 'bg-rarity-3/20 text-rarity-3',
  4: 'bg-rarity-4/20 text-rarity-4',
  5: 'bg-rarity-5/20 text-rarity-5',
}

export function Badge({
  variant = 'primary',
  size = 'xs',
  squared = false,
  roundedFull = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        className,
        colorVariant[variant],
        size === 'xs' ? 'text-xs' : 'text-sm',
        !roundedFull && size === 'xs' && !squared && 'px-2.5',
        !roundedFull && size === 'sm' && !squared && 'px-3',
        !roundedFull && size === 'xs' && squared && 'rounded px-2',
        !roundedFull && size === 'sm' && squared && 'rounded-md px-2.5',
        roundedFull && 'p-1',
        !squared && 'rounded-full',
        'inline-flex items-center py-0.5 font-medium'
      )}
    >
      {children}
    </span>
  )
}

export function BadgeRarity({ rarity, children, className }: BadgeRarityProps) {
  return (
    <span
      className={clsx(
        className,
        rarityVariant[rarity],
        'inline-flex items-center rounded py-0.5 px-2 text-xs font-medium'
      )}
    >
      {children}
    </span>
  )
}
