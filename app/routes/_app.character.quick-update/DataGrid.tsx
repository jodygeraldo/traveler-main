import type * as RemixReact from '@remix-run/react'
import * as ReactTable from '@tanstack/react-table'
import clsx from 'clsx'
import * as React from 'react'
import Image from '~/components/Image'
import type * as CharacterType from '~/types/character'
import * as Utils from '~/utils'

interface Props {
  characters: {
    name: CharacterType.Name
    progression: {
      level: number
      ascension: number
      normalAttack: number
      elementalSkill: number
      elementalBurst: number
    }
  }[]
  submit: RemixReact.SubmitFunction
}

export default function DataGrid({ characters, submit }: Props) {
  const handleSubmit = React.useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      e.preventDefault()
      const name = e.currentTarget.value
      const $form = e.currentTarget.form
      if (!$form) return

      const level = ($form.querySelector(`#${name}-level`) as HTMLInputElement)
        .value
      const ascension = (
        $form.querySelector(`#${name}-ascension`) as HTMLInputElement
      ).value
      const normalAttack = (
        $form.querySelector(`#${name}-normal-attack`) as HTMLInputElement
      ).value
      const elementalSkill = (
        $form.querySelector(`#${name}-elemental-skill`) as HTMLInputElement
      ).value
      const elementalBurst = (
        $form.querySelector(`#${name}-elemental-burst`) as HTMLInputElement
      ).value

      const formData = new FormData()
      formData.append('name', name)
      formData.append('level', level)
      formData.append('ascension', ascension)
      formData.append('normalAttack', normalAttack)
      formData.append('elementalSkill', elementalSkill)
      formData.append('elementalBurst', elementalBurst)

      submit(formData, {
        method: 'post',
        action: '/character/quick-update',
        replace: true,
      })
    },
    [submit]
  )

  const columnHelper =
    ReactTable.createColumnHelper<CharacterType.CharacterProgression>()

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Image
              src={`/character/${Utils.getImageSrc(info.getValue())}.png`}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span>{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor('progression.level', {
        header: 'Level',
        cell: (info) => {
          return (
            <input
              form="character-update"
              title={`${info.row.original.name} level`}
              id={`${info.row.original.name}-level`}
              name={`${info.row.original.name}-level`}
              type="number"
              min={1}
              max={90}
              defaultValue={info.getValue()}
              className="rounded-md border-none bg-transparent text-gray-11 focus:border-primary-8 focus:text-gray-12 focus:ring-primary-8"
            />
          )
        },
      }),
      columnHelper.accessor('progression.ascension', {
        header: 'Ascension',
        cell: (info) => {
          return (
            <input
              form="character-update"
              title={`${info.row.original.name} Ascension`}
              id={`${info.row.original.name}-ascension`}
              name={`${info.row.original.name}-ascension`}
              type="number"
              min={0}
              max={6}
              defaultValue={info.getValue()}
              className="rounded-md border-none bg-transparent text-gray-11 focus:border-primary-8 focus:text-gray-12 focus:ring-primary-8"
            />
          )
        },
        size: 20,
        minSize: 20,
        maxSize: 20,
      }),
      columnHelper.accessor('progression.normalAttack', {
        header: 'Normal Attack',
        cell: (info) => {
          return (
            <input
              form="character-update"
              title={`${info.row.original.name} normal attack`}
              id={`${info.row.original.name}-normal-attack`}
              name={`${info.row.original.name}-normal-attack`}
              type="number"
              min={1}
              max={10}
              defaultValue={info.getValue()}
              className="rounded-md border-none bg-transparent text-gray-11 focus:border-primary-8 focus:text-gray-12 focus:ring-primary-8"
            />
          )
        },
      }),
      columnHelper.accessor('progression.elementalSkill', {
        header: 'Elemental Skill',
        cell: (info) => {
          return (
            <input
              form="character-update"
              title={`${info.row.original.name} elemental skill`}
              id={`${info.row.original.name}-elemental-skill`}
              name={`${info.row.original.name}-elemental-skill`}
              type="number"
              min={1}
              max={10}
              defaultValue={info.getValue()}
              className="rounded-md border-none bg-transparent text-gray-11 focus:border-primary-8 focus:text-gray-12 focus:ring-primary-8"
            />
          )
        },
      }),
      columnHelper.accessor('progression.elementalBurst', {
        header: 'Elemental Burst',
        cell: (info) => {
          return (
            <input
              form="character-update"
              title={`${info.row.original.name} elemental burst`}
              id={`${info.row.original.name}-elemental-burst`}
              name={`${info.row.original.name}-elemental-burst`}
              type="number"
              min={1}
              max={10}
              defaultValue={info.getValue()}
              className="rounded-md border-none bg-transparent text-gray-11 focus:border-primary-8 focus:text-gray-12 focus:ring-primary-8"
            />
          )
        },
      }),
      columnHelper.accessor('name', {
        id: 'action',
        header: () => <span className="sr-only">Save</span>,
        cell: (info) => (
          <button
            id={`${info.getValue()}-save`}
            type="submit"
            onClick={handleSubmit}
            onKeyDown={handleSubmit}
            name="name"
            value={info.getValue()}
            className="rounded-md border border-transparent bg-primary-9 py-1 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-10 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-gray-3"
          >
            Save
          </button>
        ),
      }),
    ],
    [columnHelper, handleSubmit]
  )

  const table = ReactTable.useReactTable({
    data: characters,
    columns,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  return (
    <div className="flex flex-col">
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
                          'whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-12'
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
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell, idx) => (
                      <td
                        key={cell.id}
                        className={clsx(
                          idx === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-2',
                          'whitespace-nowrap py-2 text-sm font-medium text-gray-11'
                        )}
                      >
                        {ReactTable.flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
  )
}
