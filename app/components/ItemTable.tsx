import type { Table } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import Switch from './Switch'

type Props = {
  heading: string
  switchLabel: string
  switchState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  table: Table<any>
}

export default function ItemTable({ heading, switchLabel, switchState, table }: Props) {
  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-12">{heading}</h2>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Switch state={switchState} label={switchLabel} />
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 px-4 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-8">
                <thead className="bg-gray-2">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, idx) => (
                        <th
                          scope="col"
                          className={clsx(
                            idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                            'min-w-[6rem] whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-12'
                          )}
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-6">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, idx) => (
                        <td
                          className={clsx(
                            idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                            'whitespace-nowrap py-2 text-sm font-medium text-gray-11'
                          )}
                          key={cell.id}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
