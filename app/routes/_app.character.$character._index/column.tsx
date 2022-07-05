import type * as ReactTable from '@tanstack/react-table';
import * as Icon from '~/components/Icon';
import TableCell from '~/components/TableCell';

interface Ascension {
  phase: { from: number; to: number }
  mora: number
  common: { name: string; quantity: number }
  gem: { name: string; quantity: number }
  local: { name: string; quantity: number }
  boss: { name: string; quantity: number }
}

export const ascension: ReactTable.ColumnDef<Ascension>[] = [
  {
    header: 'Phase',
    accessorKey: 'phase',
    cell: ({ getValue }) => (
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
    cell: ({ getValue }) => <TableCell quantity={getValue()} text="Mora" />,
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue().quantity} text={getValue().name} />
    ),
  },
  {
    header: 'Gem',
    accessorKey: 'gem',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue().quantity} text={getValue().name} />
    ),
  },
  {
    header: 'Local Specialty',
    accessorKey: 'local',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue().quantity} text={getValue().name} />
    ),
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue()?.quantity} text={getValue()?.name} />
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
    cell: ({ getValue }) => (
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
    cell: ({ getValue }) => <TableCell quantity={getValue()} text="Mora" />,
  },
  {
    header: 'Common',
    accessorKey: 'common',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue().quantity} text={getValue().name} />
    ),
  },
  {
    header: 'Book',
    accessorKey: 'book',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue().quantity} text={getValue().name} />
    ),
  },
  {
    header: 'Boss',
    accessorKey: 'boss',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue()?.quantity} text={getValue()?.name} />
    ),
  },
  {
    header: 'Special',
    accessorKey: 'special',
    cell: ({ getValue }) => (
      <TableCell quantity={getValue()?.quantity} text={getValue()?.name} />
    ),
  },
]
