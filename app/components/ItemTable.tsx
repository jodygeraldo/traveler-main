/* eslint-disable react/jsx-key */
import clsx from 'clsx'
import type { Column } from 'react-table'
import { useTable } from 'react-table'
import Switch from './Switch'

type Props = {
  uid: string
  heading: string
  switchLabel: string
  switchState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  columns: Column<any>[]
  data: {}[]
}

export default function ItemTable({ heading, switchLabel, switchState, columns, data }: Props) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

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
              <table className="min-w-full divide-y divide-gray-8" {...getTableProps()}>
                <thead className="bg-gray-2">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, idx) => (
                        <th
                          scope="col"
                          className={clsx(
                            idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                            'min-w-[6rem] whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-12'
                          )}
                          {...column.getHeaderProps()}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-6" {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell, idx) => {
                          return (
                            <td
                              className={clsx(
                                idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                                'whitespace-nowrap py-2 text-sm font-medium text-gray-11'
                              )}
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
