import type * as CharacterType from '~/types/character'
import CharacterGridItem from './CharacterGridItem'

interface Props {
  characters: (CharacterType.Character & {
    progression: CharacterType.Progression
  })[]
}

export default function CharacterGrid({ characters }: Props) {
  return (
    <div>
      <ul
        id="grid-view"
        className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {characters.map((character) => (
          <CharacterGridItem key={character.name} {...character} />
        ))}
      </ul>
    </div>
  )
}
