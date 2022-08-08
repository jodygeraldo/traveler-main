import clsx from 'clsx'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

export default function TalentGroup({
  name,
  weapon,
  talent,
  progression,
  size,
}: {
  name: CharacterType.Name
  weapon: CharacterType.Weapon
  talent: CharacterType.Character['talent']
  progression: Pick<
    CharacterType.Progression,
    'normalAttack' | 'elementalSkill' | 'elementalBurst'
  >
  size?: 'sm' | 'md' | 'lg'
}) {
  const talents = [
    {
      type: 'normal_attack',
      label: talent[0],
      level: progression.normalAttack,
    },
    {
      type: 'elemental_skill',
      label: talent[1],
      level: progression.elementalSkill,
    },
    {
      type: 'elemental_burst',
      label: talent[2],
      level: progression.elementalBurst,
    },
  ] as const

  return (
    <>
      {talents.map((talent) => (
        <Talent
          key={talent.label}
          size={size}
          name={name}
          weapon={weapon}
          {...talent}
        />
      ))}
    </>
  )
}

const sizes: Record<'sm' | 'md' | 'lg', [string, number]> = {
  sm: ['h-6 w-6', 24],
  md: ['h-6 w-6 sm:h-8 sm:w-8', 32],
  lg: ['h-6 w-6 sm:h-8 sm:w-8 h-10 w-10', 40],
}

export function Talent({
  name,
  weapon,
  type,
  label,
  level,
  size = 'sm',
}: {
  name: CharacterType.Name
  weapon: CharacterType.Weapon
  type: 'normal_attack' | 'elemental_skill' | 'elemental_burst'
  label: string
  level: number
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div className="flex items-center gap-0.5">
      <Tooltip text={label}>
        <Image
          src={`/talent/${type}_${Utils.getImageSrc(
            type === 'normal_attack' ? weapon : name
          )}.png`}
          alt={label}
          className={clsx(
            sizes[size][0],
            'flex-shrink-0 rounded-full bg-primary-9'
          )}
          width={sizes[size][1]}
          height={sizes[size][1]}
        />
      </Tooltip>
      <span className="text-sm font-medium tabular-nums text-gray-11">
        {level}
      </span>
    </div>
  )
}
