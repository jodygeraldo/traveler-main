import * as React from 'react'
import * as Icons from '~/icons/index'

interface OutlineProps extends React.SVGAttributes<SVGElement> {
  name: Icons.iconOutlineId
}

interface SolidProps extends React.SVGAttributes<SVGElement> {
  name: Icons.iconSolidId
}

export function IconOutline({ name, ...props }: OutlineProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <use href={`${Icons.outline[name]}#${name}`} />
    </svg>
  )
}

export function IconSolid({ name, ...props }: SolidProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <use href={`${Icons.solid[name]}#${name}`} />
    </svg>
  )
}

export const Solid = IconSolid
export const Outline = IconOutline
