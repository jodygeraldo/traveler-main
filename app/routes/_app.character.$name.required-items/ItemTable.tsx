import * as ReactTable from '@tanstack/react-table'
import clsx from 'clsx'
import Switch from '~/components/Switch'

interface BaseProps {
  heading: React.ReactNode
  switchLabel: string
  switchState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  table: ReactTable.Table<any>
  customAddionalFirstCellElement?: React.ReactNode[]
}

interface OtherCharacterProps extends BaseProps {
  ascensionPhase?: number
  talentLevel?: [number, number, number]
}

interface TravelerProps extends BaseProps {
  talentLevel: number | [number, number]
}

export function ItemTable({
  heading,
  switchLabel,
  switchState,
  ascensionPhase,
  table,
  talentLevel,
  customAddionalFirstCellElement,
}: OtherCharacterProps) {
  return (
    <div className="mt-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="inline-flex items-center text-xl font-semibold text-gray-12">
            {heading}
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <Switch state={switchState} label={switchLabel} />
        </div>
      </div>
      {!switchState[0] ? (
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 px-4 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-8">
                  <thead className="bg-gray-3">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, idx) => (
                          <th
                            key={header.id}
                            scope="col"
                            className={clsx(
                              idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                              'min-w-[6rem] whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-12'
                            )}
                          >
                            {header.isPlaceholder
                              ? null
                              : ReactTable.flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-6">
                    {table.getRowModel().rows.map((row, idxRow) => (
                      <tr
                        key={row.id}
                        className={clsx(
                          ascensionPhase === idxRow && 'bg-gray-2',
                          Array.isArray(talentLevel) &&
                            talentLevel.includes(idxRow + 1) &&
                            'bg-gray-2'
                        )}
                      >
                        {row.getVisibleCells().map((cell, idxCell) => (
                          <td
                            key={cell.id}
                            className={clsx(
                              idxCell === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                              'whitespace-nowrap py-2 text-sm font-medium text-gray-11'
                            )}
                          >
                            {idxCell === 0 ? (
                              <div className="flex items-center gap-2">
                                {ReactTable.flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                                <span className="hidden items-center gap-1 md:inline-flex">
                                  {talentLevel?.[0] === idxRow + 1 &&
                                    customAddionalFirstCellElement?.[0]}
                                  {talentLevel?.[1] === idxRow + 1 &&
                                    customAddionalFirstCellElement?.[1]}
                                  {talentLevel?.[2] === idxRow + 1 &&
                                    customAddionalFirstCellElement?.[2]}
                                </span>
                              </div>
                            ) : (
                              ReactTable.flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
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
      ) : null}
    </div>
  )
}

export function ItemTableElementalTraveler({
  heading,
  switchLabel,
  switchState,
  table,
  talentLevel,
  customAddionalFirstCellElement,
}: TravelerProps) {
  return (
    <div className="mt-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="inline-flex items-center text-xl font-semibold text-gray-12">
            {heading}
          </h2>
        </div>
        <div className="mt-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <Switch state={switchState} label={switchLabel} />
        </div>
      </div>
      {!switchState[0] ? (
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 px-4 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-8">
                  <thead className="bg-gray-3">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, idx) => (
                          <th
                            key={header.id}
                            scope="col"
                            className={clsx(
                              idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                              'min-w-[6rem] whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-12'
                            )}
                          >
                            {header.isPlaceholder
                              ? null
                              : ReactTable.flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="divide-y divide-gray-6">
                    {table.getRowModel().rows.map((row, idxRow) => (
                      <tr
                        key={row.id}
                        className={clsx(
                          Number.isInteger(talentLevel) &&
                            talentLevel === idxRow + 1 &&
                            'bg-gray-2',
                          Array.isArray(talentLevel) &&
                            talentLevel.includes(idxRow + 1) &&
                            'bg-gray-2'
                        )}
                      >
                        {row.getVisibleCells().map((cell, idxCell) => (
                          <td
                            key={cell.id}
                            className={clsx(
                              idxCell === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                              'whitespace-nowrap py-2 text-sm font-medium text-gray-11'
                            )}
                          >
                            {idxCell === 0 ? (
                              <div className="flex items-center gap-2">
                                {ReactTable.flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                                {Array.isArray(talentLevel) ? (
                                  <span className="hidden items-center gap-1 md:inline-flex">
                                    {talentLevel?.[0] === idxRow + 1 &&
                                      customAddionalFirstCellElement?.[0]}
                                    {talentLevel?.[1] === idxRow + 1 &&
                                      customAddionalFirstCellElement?.[1]}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              ReactTable.flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
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
      ) : null}
    </div>
  )
}

export const Table = ItemTable
export const ElementalTravelerTable = ItemTableElementalTraveler
