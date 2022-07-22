import type * as ReactTable from '@tanstack/react-table'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

export const ascension: ReactTable.ColumnDef<CharacterType.AscensionPhase>[] = [
  {
    header: 'Phase',
    accessorKey: 'phase',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['phase']>()
      return (
        <div className="flex items-center gap-1">
          <span className="tabular-nums">{value.from}</span>
          <span className="sr-only">To</span>
          <Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
          <span className="tabular-nums">{value.to}</span>
        </div>
      )
    },
  },
  {
    header: 'Mora',
    accessorKey: 'mora',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['mora']>()
      return <CellWithImage src="/item/mora.png" quantity={value} text="Mora" />
    },
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['common']>()
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Gem',
    accessorKey: 'gem',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['gem']>()
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Local Specialty',
    accessorKey: 'local',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['local']>()
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell(props) {
      const value = props.getValue<CharacterType.AscensionPhase['boss']>()
      if (!value) return null
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
]

export const talent: ReactTable.ColumnDef<CharacterType.TalentPhase>[] = [
  {
    header: 'Level',
    accessorKey: 'level',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['level']>()
      return (
        <div className="flex items-center gap-1">
          <span className="tabular-nums">{value.from}</span>
          <span className="sr-only">To</span>
          <Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
          <span className="tabular-nums">{value.to}</span>
        </div>
      )
    },
  },
  {
    header: 'Mora',
    accessorKey: 'mora',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['mora']>()
      return <CellWithImage src="/item/mora.png" quantity={value} text="Mora" />
    },
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['common']>()
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Book',
    accessorKey: 'book',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['book']>()
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['boss']>()
      if (!value) return null
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
  {
    header: 'Special',
    accessorKey: 'special',
    cell(props) {
      const value = props.getValue<CharacterType.TalentPhase['special']>()
      if (!value) return null
      return (
        <CellWithImage
          src={`/item/${Utils.getImageSrc(value.name)}.png`}
          quantity={value.quantity}
          text={value.name}
        />
      )
    },
  },
]
