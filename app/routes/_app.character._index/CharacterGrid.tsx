import type * as CharacterData from '~/data/characters'
import CharacterGridItem from './CharacterGridItem'

interface Props {
  characters: CharacterData.Character[]
}

export default function CharacterGrid({ characters }: Props) {
  return (
    <div>
      <ul id="grid-view" className="flex flex-wrap gap-5">
        {characters.map((character) => (
          <li key={character.name}>
            <CharacterGridItem
              name={character.name}
              vision={character.vision}
              rarity={character.rarity}
              level={character.progression?.level}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
