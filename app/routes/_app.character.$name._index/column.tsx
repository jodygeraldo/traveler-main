import type * as ReactTable from '@tanstack/react-table'
import CellWithImage from '~/components/CellWithImage'
import * as Icon from '~/components/Icon'
import * as Utils from '~/utils'

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
    cell: ({
      getValue,
    }: {
      getValue: () => {
        from: number
        to: number
      }
    }) => (
      <div className="flex items-center gap-1">
        <span className="tabular-nums">{getValue().from}</span>
        <span className="sr-only">To</span>
        <Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
        <span className="tabular-nums">{getValue().to}</span>
      </div>
    ),
  },
  {
    header: 'Mora',
    accessorKey: 'mora',
    cell: ({ getValue }) => (
      <CellWithImage
        src={getValue() ? `/item/${Utils.getImageSrc('mora')}.png` : undefined}
        quantity={getValue()}
        text="Mora"
      />
    ),
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name: string
        quantity: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue().name)}.png`
            : undefined
        }
        quantity={getValue().quantity}
        text={getValue().name}
      />
    ),
  },
  {
    header: 'Gem',
    accessorKey: 'gem',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name: string
        quantity: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue().name)}.png`
            : undefined
        }
        quantity={getValue().quantity}
        text={getValue().name}
      />
    ),
  },
  {
    header: 'Local Specialty',
    accessorKey: 'local',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name: string
        quantity: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue().name)}.png`
            : undefined
        }
        quantity={getValue().quantity}
        text={getValue().name}
      />
    ),
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name?: string
        quantity?: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue()?.name ?? '')}.png`
            : undefined
        }
        quantity={getValue()?.quantity}
        text={getValue()?.name}
      />
    ),
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
    cell: ({
      getValue,
    }: {
      getValue: () => {
        from: number
        to: number
      }
    }) => (
      <div className="flex items-center gap-1">
        <span className="tabular-nums">{getValue().from}</span>
        <span className="sr-only">To</span>
        <Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
        <span className="tabular-nums">{getValue().to}</span>
      </div>
    ),
  },
  {
    header: 'Mora',
    accessorKey: 'mora',
    cell: ({ getValue }) => (
      <CellWithImage
        src={getValue() ? `/item/${Utils.getImageSrc('mora')}.png` : undefined}
        quantity={getValue()}
        text="Mora"
      />
    ),
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name: string
        quantity: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue().name)}.png`
            : undefined
        }
        quantity={getValue().quantity}
        text={getValue().name}
      />
    ),
  },
  {
    header: 'Book',
    accessorKey: 'book',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name: string
        quantity: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue().name)}.png`
            : undefined
        }
        quantity={getValue().quantity}
        text={getValue().name}
      />
    ),
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name?: string
        quantity?: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue()?.name ?? '')}.png`
            : undefined
        }
        quantity={getValue()?.quantity}
        text={getValue()?.name}
      />
    ),
  },
  {
    header: 'Special',
    accessorKey: 'special',
    cell: ({
      getValue,
    }: {
      getValue: () => {
        name?: string
        quantity?: number
      }
    }) => (
      <CellWithImage
        src={
          getValue()
            ? `/item/${Utils.getImageSrc(getValue()?.name ?? '')}.png`
            : undefined
        }
        quantity={getValue()?.quantity}
        text={getValue()?.name}
      />
    ),
  },
]
