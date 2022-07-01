import type { ColumnDef } from '@tanstack/react-table'
import Icon from '~/components/Icon'
import TableCell from '~/components/TableCell'
import type { TravelerAscension } from '~/data/characters'

export const ascensionColumns: ColumnDef<TravelerAscension>[] = [
  {
    accessorKey: 'phase',
    header: 'Phase',
    cell: (c) => (
      <div className="flex items-center gap-1">
        <span className="tabular-nums">{c.getValue().from}</span>
        <span className="sr-only">To</span>
        <Icon type="solid" name="arrowSmRight" aria-hidden className="h-4 w-4" />
        <span className="tabular-nums">{c.getValue().to}</span>
      </div>
    ),
  },
  {
    accessorKey: 'mora',
    header: 'Mora',
    cell: (c) => <TableCell quantity={c.getValue()} text="Mora" />,
  },
  {
    accessorKey: 'gem',
    header: 'Gem',
    cell: (c) => <TableCell quantity={c.getValue().quantity} text={c.getValue().name} />,
  },
  {
    accessorKey: 'local',
    header: () => 'Local Specialty',
    cell: (c) => <TableCell quantity={c.getValue().quantity} text={c.getValue().name} />,
  },
  {
    accessorKey: 'common',
    header: () => 'Common',
    cell: (c) => <TableCell quantity={c.getValue().quantity} text={c.getValue().name} />,
  },
]
