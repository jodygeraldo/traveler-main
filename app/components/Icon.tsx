import * as React from 'react'

type IconId =
  | 'academicCap'
  | 'adjustments'
  | 'annotation'
  | 'archive'
  | 'arrowCircleDown'
  | 'arrowCircleLeft'
  | 'arrowCircleRight'
  | 'arrowCircleUp'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowNarrowDown'
  | 'arrowNarrowLeft'
  | 'arrowNarrowRight'
  | 'arrowNarrowUp'
  | 'arrowRight'
  | 'arrowSmDown'
  | 'arrowSmLeft'
  | 'arrowSmRight'
  | 'arrowSmUp'
  | 'arrowUp'
  | 'arrowsExpand'
  | 'atSymbol'
  | 'backspace'
  | 'badgeCheck'
  | 'ban'
  | 'breaker'
  | 'bell'
  | 'bookOpen'
  | 'bookmarkAlt'
  | 'bookmark'
  | 'briefcase'
  | 'cake'
  | 'calculator'
  | 'calendar'
  | 'camera'
  | 'cash'
  | 'chartBar'
  | 'chartPie'
  | 'chartSquareBar'
  | 'chatAlt2'
  | 'chatAlt'
  | 'chat'
  | 'checkCircle'
  | 'check'
  | 'chevronDoubleDown'
  | 'chevronDoubleLeft'
  | 'chevronDoubleRight'
  | 'chevronDoubleUp'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'chip'
  | 'clipboardCheck'
  | 'clipboardCopy'
  | 'clipboardList'
  | 'clipboard'
  | 'clock'
  | 'cloudDownload'
  | 'cloudUpload'
  | 'cloud'
  | 'code'
  | 'cog'
  | 'collection'
  | 'colorSwatch'
  | 'creditCard'
  | 'cubeTransparent'
  | 'cube'
  | 'currencyBangladeshi'
  | 'currencyDollar'
  | 'currencyEuro'
  | 'currencyPound'
  | 'currencyRupee'
  | 'currencyYen'
  | 'cursorClick'
  | 'database'
  | 'desktopComputer'
  | 'deviceMobile'
  | 'deviceTablet'
  | 'documentAdd'
  | 'documentDownload'
  | 'documentDuplicate'
  | 'documentRemove'
  | 'documentReport'
  | 'documentSearch'
  | 'documentText'
  | 'document'
  | 'dotsCircleHorizontal'
  | 'dotsHorizontal'
  | 'dotsVertical'
  | 'download'
  | 'duplicate'
  | 'emojiHappy'
  | 'emojiSad'
  | 'exclamationCircle'
  | 'exclamation'
  | 'externalLink'
  | 'eyeOff'
  | 'eye'
  | 'fastForward'
  | 'film'
  | 'filter'
  | 'fingerPrint'
  | 'fire'
  | 'flag'
  | 'folderAdd'
  | 'folderDownload'
  | 'folderOpen'
  | 'folderRemove'
  | 'folder'
  | 'gift'
  | 'globeAlt'
  | 'globe'
  | 'hand'
  | 'hashtag'
  | 'heart'
  | 'home'
  | 'identification'
  | 'inboxIn'
  | 'inbox'
  | 'informationCircle'
  | 'key'
  | 'library'
  | 'lightBulb'
  | 'lightningBolt'
  | 'link'
  | 'locationMarker'
  | 'lockClosed'
  | 'lockOpen'
  | 'login'
  | 'logout'
  | 'mailOpen'
  | 'mail'
  | 'map'
  | 'menuAlt1'
  | 'menuAlt2'
  | 'menuAlt3'
  | 'menuAlt4'
  | 'menu'
  | 'microphone'
  | 'minusCircle'
  | 'minusSm'
  | 'minus'
  | 'moon'
  | 'musicNote'
  | 'newspaper'
  | 'officeBuilding'
  | 'paperAirplane'
  | 'paperClip'
  | 'pause'
  | 'pencilAlt'
  | 'pencil'
  | 'phoneIncoming'
  | 'phoneMissedCall'
  | 'phoneOutgoing'
  | 'phone'
  | 'photograph'
  | 'play'
  | 'plusCircle'
  | 'plusSm'
  | 'plus'
  | 'presentationChartBar'
  | 'presentationChartLine'
  | 'printer'
  | 'puzzle'
  | 'qrcode'
  | 'questionMarkCircle'
  | 'receiptRefund'
  | 'receiptTax'
  | 'refresh'
  | 'reply'
  | 'rewind'
  | 'rss'
  | 'saveAs'
  | 'save'
  | 'scale'
  | 'scissors'
  | 'searchCircle'
  | 'search'
  | 'selector'
  | 'server'
  | 'share'
  | 'shieldCheck'
  | 'shieldExclamation'
  | 'shoppingBag'
  | 'shoppingCart'
  | 'sortAscending'
  | 'sortDescending'
  | 'sparkles'
  | 'speakerphone'
  | 'star'
  | 'statusOffline'
  | 'statusOnline'
  | 'stop'
  | 'sun'
  | 'support'
  | 'switchHorizontal'
  | 'switchVertical'
  | 'table'
  | 'tag'
  | 'template'
  | 'terminal'
  | 'thumbDown'
  | 'thumbUp'
  | 'ticket'
  | 'translate'
  | 'trash'
  | 'trendingDown'
  | 'trendingUp'
  | 'truck'
  | 'upload'
  | 'userAdd'
  | 'userCircle'
  | 'userGroup'
  | 'userRemove'
  | 'user'
  | 'users'
  | 'variable'
  | 'videoCamera'
  | 'viewBoards'
  | 'viewGridAdd'
  | 'viewGrid'
  | 'viewList'
  | 'volumeOff'
  | 'volumeUp'
  | 'wifi'
  | 'xCircle'
  | 'x'
  | 'zoomIn'
  | 'zoomOut'

interface Props extends React.SVGAttributes<SVGElement> {
  name: IconId
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (_, g) => `-${(g as string).toLowerCase()}`)
}

interface Custom extends React.SVGAttributes<SVGElement> {
  name: 'dragDotsHandle2'
  width?: number
  height?: number
  viewBox?: string
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export default function Icon({
  name,
  type,
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  fill,
  stroke,
  strokeWidth,
  ...props
}: Custom) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      {...props}
    >
      <use href={`/icon/custom/${camelToKebab(name)}.svg#${name}`} />
    </svg>
  )
}

export function IconOutline({ name, ...props }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <use href={`/icon/outline/${camelToKebab(name)}.svg#${name}`} />
    </svg>
  )
}

export function IconSolid({ name, ...props }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <use href={`/icon/solid/${camelToKebab(name)}.svg#${name}`} />
    </svg>
  )
}

export const Base = Icon
export const Solid = IconSolid
export const Outline = IconOutline
