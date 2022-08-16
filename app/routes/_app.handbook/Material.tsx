import Image from '~/components/Image'
import * as Utils from '~/utils'

export default function Material({
  materials,
}: {
  materials: { key: string; value: number }[]
}) {
  return (
    <section aria-labelledby="material-title">
      <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
        <div className="p-6">
          <h2 className="font-medium text-gray-12" id="material-title">
            Combined track materials
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-8 sm:grid-cols-2 2xl:grid-cols-3">
            {materials.map((m) => (
              <div key={m.key} className="flex items-center gap-2">
                <Image
                  src={`/item/${Utils.getImageSrc(m.key)}.png`}
                  className="h-5 w-5"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="truncate capitalize text-gray-11">
                  {m.key}
                </span>
                <span className="text-xs tabular-nums text-gray-12 xs:text-sm">
                  x{m.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
