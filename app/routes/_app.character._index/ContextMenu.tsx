import * as RadixContextMenu from '@radix-ui/react-context-menu'
import clsx from 'clsx'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import * as Link from '~/components/Link'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

type Props = {
  name: string
  progression: CharacterType.Progression
  children: React.ReactNode
}

type DisableMenus = {
  normalAttack?: boolean
  elementalSkill?: boolean
  elementalBurst?: boolean
}

function getDisableMenus(
  disableOn: number,
  progression: {
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }
): DisableMenus {
  return {
    normalAttack: progression.normalAttack === disableOn,
    elementalSkill: progression.elementalSkill === disableOn,
    elementalBurst: progression.elementalBurst === disableOn,
  }
}

export default function ContextMenu({ name, progression, children }: Props) {
  const disableLevel80 = progression.ascension === 6 && progression.level === 80
  const disableLevel90 = progression.ascension === 6 && progression.level === 90

  const disableMenus6 = getDisableMenus(6, progression)
  const disabledTrigger6 = Object.values(disableMenus6).every(Boolean)

  const disableMenus8 = getDisableMenus(8, progression)
  const disabledTrigger8 = Object.values(disableMenus8).every(Boolean)

  const disableMenus10 = getDisableMenus(10, progression)
  const disabledTrigger10 = Object.values(disableMenus10).every(Boolean)

  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger asChild>{children}</RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <RadixContextMenu.Content
          className={clsx(
            'mt-2 w-48 rounded-md bg-gray-3 p-1 shadow-lg ring-1 ring-overlay-black-1',
            'focus:outline-none'
          )}
        >
          <RadixContextMenu.Item asChild>
            <Link.Menu to={`./quick-update/${Utils.slugify(name)}`}>
              Edit progression
            </Link.Menu>
          </RadixContextMenu.Item>

          <RadixContextMenu.Separator className="my-1 h-px bg-gray-6" />

          <RadixContextMenu.Label className="px-4 py-2 text-sm font-medium text-gray-12">
            Set ascension level 6
          </RadixContextMenu.Label>
          <RadixContextMenu.Group>
            <RadixContextMenu.Item asChild disabled={disableLevel80}>
              <Button.Menu isRadix disabled={disableLevel80}>
                Level 80
              </Button.Menu>
            </RadixContextMenu.Item>
            <RadixContextMenu.Item asChild disabled={disableLevel90}>
              <Button.Menu isRadix disabled={disableLevel90}>
                Level 90
              </Button.Menu>
            </RadixContextMenu.Item>
          </RadixContextMenu.Group>

          <RadixContextMenu.Separator className="my-1 h-px bg-gray-6" />

          <RadixContextMenu.Sub>
            <SubTrigger disabled={disabledTrigger6}>
              Set talent level 6
            </SubTrigger>
            <SubContent disableMenus={disableMenus6} />
          </RadixContextMenu.Sub>

          <RadixContextMenu.Sub>
            <SubTrigger disabled={disabledTrigger8}>
              Set talent level 8
            </SubTrigger>
            <SubContent disableMenus={disableMenus8} />
          </RadixContextMenu.Sub>

          <RadixContextMenu.Sub>
            <SubTrigger disabled={disabledTrigger10}>
              Set talent level 10
            </SubTrigger>
            <SubContent disableMenus={disableMenus10} />
          </RadixContextMenu.Sub>
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  )
}

function SubTrigger({
  children,
  ...props
}: RadixContextMenu.ContextMenuSubTriggerProps &
  React.RefAttributes<HTMLDivElement>) {
  return (
    <RadixContextMenu.SubTrigger
      className={clsx(
        'relative',
        'w-full rounded-md py-2 px-4',
        'select-none text-left text-sm text-gray-11',
        'radix-disabled:text-gray-8 radix-highlighted:bg-gray-4 radix-highlighted:text-gray-12 radix-highlighted:outline-none radix-state-open:text-gray-12'
      )}
      {...props}
    >
      <span>{children}</span>
      <Icon.Solid
        name="chevronRight"
        className="absolute right-0 top-1/2 -translate-y-1/2"
      />
    </RadixContextMenu.SubTrigger>
  )
}

function SubContent({
  disableMenus,
  ...props
}: {
  disableMenus: DisableMenus
} & RadixContextMenu.ContextMenuSubContentProps &
  React.RefAttributes<HTMLDivElement>) {
  const disableAllTalentsOption =
    Object.values(disableMenus).filter(Boolean).length === 2

  return (
    <RadixContextMenu.SubContent
      className={clsx(
        'mt-2 w-48 rounded-md bg-gray-3 p-1 shadow-lg ring-1 ring-overlay-black-1',
        'focus:outline-none'
      )}
      {...props}
    >
      <RadixContextMenu.Group>
        <RadixContextMenu.Item asChild disabled={disableMenus.normalAttack}>
          <Button.Menu isRadix disabled={disableMenus.normalAttack}>
            Normal attack
          </Button.Menu>
        </RadixContextMenu.Item>
        <RadixContextMenu.Item asChild disabled={disableMenus.elementalSkill}>
          <Button.Menu isRadix disabled={disableMenus.elementalSkill}>
            Elemental skill
          </Button.Menu>
        </RadixContextMenu.Item>
        <RadixContextMenu.Item asChild disabled={disableMenus.elementalBurst}>
          <Button.Menu isRadix disabled={disableMenus.elementalBurst}>
            Elemental burst
          </Button.Menu>
        </RadixContextMenu.Item>
        <RadixContextMenu.Item asChild disabled={disableAllTalentsOption}>
          <Button.Menu isRadix disabled={disableAllTalentsOption}>
            All talents
          </Button.Menu>
        </RadixContextMenu.Item>
      </RadixContextMenu.Group>
    </RadixContextMenu.SubContent>
  )
}
