import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  talentName: string[]
  name: CharacterType.Name
  weapon: CharacterType.Weapon
}

export function CharacterCustomTableHeading({
  talentName,
  name,
  weapon,
}: Props) {
  const talent = [
    'normal_attack',
    'elemental_skill',
    'elemental_burst',
  ] as const
  return (
    <>
      Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent.map((t, i) => (
          <Tooltip key={talentName[i]} text={talentName[i]}>
            <Image
              src={`/talent/${t}_${
                t === 'normal_attack'
                  ? weapon.toLowerCase()
                  : Utils.getImageSrc(name)
              }.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-9"
              width={32}
              height={32}
            />
          </Tooltip>
        ))}
      </span>
    </>
  )
}

export function TravelerGeoCustomTableHeading({
  talentName,
  name,
  talent,
}:
  | {
      talentName: [string, string]
      name: string
      talent: 'elemental'
    }
  | {
      talentName: string
      name: string
      talent: 'normal'
    }) {
  const elemental = ['elemental_skill', 'elemental_burst'] as const
  return (
    <>
      {talent === 'normal' ? 'Normal Attack' : 'Elemental'} Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent === 'elemental' ? (
          elemental.map((t, i) => (
            <Tooltip key={talentName[i]} text={talentName[i]}>
              <Image
                src={`/talent/${t}_${Utils.getImageSrc(name)}.png`}
                alt=""
                className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-9"
                width={32}
                height={32}
              />
            </Tooltip>
          ))
        ) : (
          <Tooltip text={talentName}>
            <Image
              src={`/talent/normal_attack_sword.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0 rounded-full bg-primary-9"
              width={32}
              height={32}
            />
          </Tooltip>
        )}
      </span>
    </>
  )
}

const Character = CharacterCustomTableHeading
const TravelerGeo = TravelerGeoCustomTableHeading
export { Character, TravelerGeo }
