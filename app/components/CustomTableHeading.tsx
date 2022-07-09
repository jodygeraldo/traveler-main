import * as RemixImage from 'remix-image'
import * as Utils from '~/utils'
import Tooltip from './Tooltip'

interface Props {
  talentName: string[]
  name: string
  weapon: string
}

export function CharacterCustomTableHeading({
  talentName,
  name,
  weapon,
}: Props) {
  const talent = [
    'Normal_Attack',
    'Elemental_Skill',
    'Elemental_Burst',
  ] as const
  return (
    <>
      Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent.map((t, i) => (
          <Tooltip key={talentName[i]} text={talentName[i]}>
            <RemixImage.Image
              src={`/image/talent/${t}_${
                t === 'Normal_Attack' ? weapon : Utils.getImageSrc(name)
              }.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0"
              width={32}
              height={32}
              responsive={[{ size: { width: 32, height: 32 } }]}
              dprVariants={[1, 2, 3]}
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
  const elemental = ['Elemental_Skill', 'Elemental_Burst'] as const
  return (
    <>
      {talent === 'normal' ? 'Normal Attack' : 'Elemental'} Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent === 'elemental' ? (
          elemental.map((t, i) => (
            <Tooltip key={talentName[i]} text={talentName[i]}>
              <RemixImage.Image
                src={`/image/talent/${t}_${Utils.getImageSrc(name)}.png`}
                alt=""
                className="h-8 w-8 flex-shrink-0"
                width={32}
                height={32}
                responsive={[{ size: { width: 32, height: 32 } }]}
                dprVariants={[1, 2, 3]}
              />
            </Tooltip>
          ))
        ) : (
          <Tooltip text={talentName}>
            <RemixImage.Image
              src={`/image/talent/Normal_Attack_Sword.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0"
              width={32}
              height={32}
              responsive={[{ size: { width: 32, height: 32 } }]}
              dprVariants={[1, 2, 3]}
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
