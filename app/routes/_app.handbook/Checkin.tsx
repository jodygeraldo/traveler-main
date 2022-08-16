import * as Button from '~/components/Button'

export default function Checkin() {
  const hoyolabCheckinUrl =
    'https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481'

  return (
    <section aria-labelledby="checkin-title" className="h-full">
      <div className="h-full rounded-lg bg-gray-2 p-6 shadow">
        <div className="flex h-full flex-col">
          <h2 className="font-medium text-gray-12" id="checkin-title">
            Hoyolab daily check-in
          </h2>

          <p className="mt-6 flex-1 text-sm text-gray-11">
            Check-in to get free rewards
          </p>

          <Button.LinkExternal
            href={hoyolabCheckinUrl}
            className="mt-6 w-full justify-center"
          >
            Check-in
          </Button.LinkExternal>
        </div>
      </div>
    </section>
  )
}
