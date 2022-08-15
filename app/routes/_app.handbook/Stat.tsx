export default function Stat({
  stats,
}: {
  stats: { name: string; value: number }[]
}) {
  return (
    <section aria-labelledby="stat-title">
      <h2 id="stat-title" className="sr-only">
        Progresion
      </h2>
      <div className="grid grid-cols-1 divide-y divide-gray-6 overflow-hidden rounded-lg bg-gray-2 shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-start px-4 py-5 sm:p-6 md:block"
          >
            <p className="text-8xl tabular-nums text-primary-9">{stat.value}</p>
            <p className="text-sm font-medium text-gray-12 xs:text-base">
              {stat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
