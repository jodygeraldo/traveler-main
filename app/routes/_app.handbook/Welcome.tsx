export default function Welcome() {
  return (
    <section aria-labelledby="welcome-title" className="h-full">
      <div className="h-full rounded-lg bg-gray-2 p-6 shadow">
        <div className="flex h-full flex-col">
          <h2 className="font-medium text-gray-12" id="welcome-title">
            Welcome to Traveler Main
          </h2>

          <p className="mt-6 flex-1 text-sm text-gray-11">
            App for Genshin Impact nerds to track characters progression
          </p>

          <div className="mt-4">
            <p className="text-xs text-gray-11">
              Traveler Main is an open source project, you can contribute to it
              on{' '}
              <a
                href="https://github.com/jodygeraldo/traveler-main"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-12"
              >
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
