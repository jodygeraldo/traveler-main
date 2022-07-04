import * as RadixTooltip from '@radix-ui/react-tooltip'
import * as React from 'react'

interface Props {
  text: string
  children: React.ReactNode
}

export default function Tooltip({ text, children }: Props) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        side="top"
        className="motion-safe:scaleIn origin-[var(--radix-tooltip-content-transform-origin)] rounded-md bg-gray-3 p-2 shadow-lg"
      >
        <span className="text-sm">{text}</span>
        <RadixTooltip.Arrow className="fill-gray-3" />
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  )
}
