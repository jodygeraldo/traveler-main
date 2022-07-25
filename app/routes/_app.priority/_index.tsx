import EmptyState from './EmptyState'

export default function PriorityPage() {
  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-primary-12 sm:truncate sm:text-3xl">
        Priority
      </h1>

      <div className="mt-12">
        <EmptyState />
      </div>
    </main>
  )
}
