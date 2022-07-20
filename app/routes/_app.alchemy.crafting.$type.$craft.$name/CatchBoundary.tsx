import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import Button from '~/components/Button'

interface Props {
  status: any
  statusText: any
  message: any
}

export default function CatchBoundaryComponent({
  status,
  statusText,
  message,
}: Props) {
  const navigate = RemixReact.useNavigate()

  return (
    <HeadlessUIReact.Dialog
      className="relative z-10"
      open={true}
      onClose={() => navigate('..')}
    >
      <div className="fixed inset-0 bg-overlay-black-12" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <HeadlessUIReact.Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <HeadlessUIReact.Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-12"
              >
                ERROR {status} - {statusText}
              </HeadlessUIReact.Dialog.Title>

              <HeadlessUIReact.Dialog.Description className="mt-1 font-medium leading-6 text-gray-11">
                {message}
              </HeadlessUIReact.Dialog.Description>

              <div className="w-full mt-8">
                <Button
                  type="button"
                  variant="basic"
                  className="w-full"
                  onClick={() => navigate('..')}
                >
                  Close
                </Button>
              </div>
            </div>
          </HeadlessUIReact.Dialog.Panel>
        </div>
      </div>
    </HeadlessUIReact.Dialog>
  )
}
