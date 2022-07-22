import type * as ReactTable from '@tanstack/react-table'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import * as Utils from '~/utils/index'

interface Ascension {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
}

export const ascension: ReactTable.ColumnDef<Ascension>[] = [
  {
    header: 'Phase',
    accessorKey: 'phase',
    cell(props) {
      const value = props.getValue<{ from: number; to: number }>()
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
      const value = props.getValue<number>()
      return <CellWithImage src="/item/mora.png" quantity={value} text="Mora" />
    },
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell(props) {
      const value = props.getValue<{ name: string; quantity: number }>()
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
      const value = props.getValue<{ name: string; quantity: number }>()
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
      const value = props.getValue<{ name: string; quantity: number }>()
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
      const value = props.getValue<
        { name: string; quantity: number } | undefined
      >()
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

interface Talent {
  level: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  book: { name: string; quantity: number }
  boss?: { name: string; quantity: number }
  special?: { name: string; quantity: number }
}

export const talent: ReactTable.ColumnDef<Talent>[] = [
  {
    header: 'Level',
    accessorKey: 'level',
    cell(props) {
      const value = props.getValue<{ from: number; to: number }>()
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
      return (
        <CellWithImage
          src="/item/mora.png"
          quantity={props.getValue<number>()}
          text="Mora"
        />
      )
    },
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell(props) {
      const value = props.getValue<{ name: string; quantity: number }>()
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
      const value = props.getValue<{ name: string; quantity: number }>()
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
      const value = props.getValue<
        { name: string; quantity: number } | undefined
      >()
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
      const value = props.getValue<
        { name: string; quantity: number } | undefined
      >()
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
