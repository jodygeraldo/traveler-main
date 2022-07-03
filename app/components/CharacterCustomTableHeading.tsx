import Image, { MimeType } from 'remix-image'
import { getImageSrc } from '~/utils'
import Tooltip from './Tooltip'

export default function CharacterCustomTableHeading({
  talentName,
  name,
  weapon,
}: {
  talentName: string[]
  name: string
  weapon: string
}) {
  const talent = ['Normal_Attack', 'Elemental_Skill', 'Elemental_Burst'] as const
  return (
    <>
      Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent.map((t, i) => (
          <Tooltip key={talentName[i]} text={talentName[i]}>
            <Image
              src={`/image/talent/${t}_${t === 'Normal_Attack' ? weapon : getImageSrc(name)}.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0"
              responsive={[{ size: { width: 32, height: 32 } }]}
              options={{ contentType: MimeType.WEBP }}
              dprVariants={[1, 2, 3]}
            />
          </Tooltip>
        ))}
      </span>
    </>
  )
}
