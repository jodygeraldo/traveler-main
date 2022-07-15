import type * as CharacterData from '~/data/characters'
import CharacterListItem from './CharacterListItem'

interface Props {
  characters: CharacterData.Character[]
}

export default function CharacterList({ characters }: Props) {
  return (
    <div className="overflow-hidden rounded-md bg-gray-2 shadow">
      <ul className="divide-y divide-gray-6">
        {characters.map((character) => (
          <CharacterListItem
            key={character.name}
            name={character.name}
            vision={character.vision}
            weapon={character.weapon}
            progression={character.progression}
            talent={character.talent}
          />
        ))}
      </ul>
    </div>
  )
}
