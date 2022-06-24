import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonLink,
  ButtonLinkExternal,
} from '~/components/Button'
import Icon from '~/components/Icon'

export default function Test() {
  return (
    <div className="mt-10 grid place-items-center space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-gray-12">Button - </h2>
        <Button focusRing={3} variant="primary">
          Huh
        </Button>
        <Button variant="secondary">Hih</Button>
        <Button variant="basic">Hih</Button>
        <Button variant="success">Hih</Button>
        <Button variant="warning">Hih</Button>
        <Button variant="info">Hih</Button>
        <Button variant="danger">Hih</Button>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-gray-12">Button Icon - </h2>
        <ButtonIcon>
          <Icon
            type="outline"
            name="filter"
            className="h-6 w-6 text-gray-11 group-hover:text-gray-12"
          />
        </ButtonIcon>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-gray-12">Button Link - </h2>
        <ButtonLink to="/buttons">This is internal link</ButtonLink>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-gray-12">Button External - </h2>
        <ButtonLinkExternal kind="text" href="/buttons">
          This one is external link
        </ButtonLinkExternal>
      </div>
      <div className="-space-y-px">
        <h2 className="text-lg font-medium text-gray-12">Button Group</h2>
        <ButtonGroup position="left">
          <Icon
            type="solid"
            name="viewGrid"
            className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
          />
        </ButtonGroup>
        <ButtonGroup>
          <Icon
            type="solid"
            name="viewGrid"
            className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
          />
        </ButtonGroup>
        <ButtonGroup position="right">
          <Icon
            type="solid"
            name="viewGrid"
            className="h-5 w-5 text-gray-11 group-hover:text-gray-12"
          />
        </ButtonGroup>
      </div>
    </div>
  )
}
