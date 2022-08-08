import * as RadixToolbar from '@radix-ui/react-toolbar'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'

const visions = [
  {
    value: 'anemo',
    label: 'Anemo',
    image: '/element/anemo.png',
  },
  {
    value: 'geo',
    label: 'Geo',
    image: '/element/geo.png',
  },
  {
    value: 'electro',
    label: 'Electro',
    image: '/element/electro.png',
  },
  //   {
  //     value: 'dendro',
  //     label: 'Dendro',
  //     image: "/element/dendro.png",
  //   },
  {
    value: 'pyro',
    label: 'Pyro',
    image: '/element/pyro.png',
  },
  {
    value: 'hydro',
    label: 'Hydro',
    image: '/element/hydro.png',
  },
  {
    value: 'cryo',
    label: 'Cryo',
    image: '/element/cryo.png',
  },
]

const weapons = [
  {
    value: 'bow',
    label: 'Bow',
    image: '/weapon/bow.png',
  },
  {
    value: 'catalyst',
    label: 'Catalyst',
    image: '/weapon/catalyst.png',
  },
  {
    value: 'claymore',
    label: 'Claymore',
    image: '/weapon/claymore.png',
  },
  {
    value: 'polearm',
    label: 'Polearm',
    image: '/weapon/polearm.png',
  },
  {
    value: 'sword',
    label: 'Sword',
    image: '/weapon/sword.png',
  },
]

const regions = [
  {
    value: 'mondstadt',
    label: 'Mondstadt',
    image: '/region/mondstadt.png',
  },
  {
    value: 'liyue',
    label: 'Liyue',
    image: '/region/liyue.png',
  },
  {
    value: 'inazuma',
    label: 'Inazuma',
    image: '/region/inazuma.png',
  },
  // {
  //   value: 'sumeru',
  //   label: 'Sumeru',
  //   image: '/region/sumeru.png',
  // },
]

export default function Toolbar() {
  const [searchParams, setSearchParams] = RemixReact.useSearchParams()

  function handleVisionChange(vision: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newSearchParams.has('vision') && vision === '') {
      newSearchParams.delete('vision')
    } else {
      newSearchParams.set('vision', vision)
    }

    setSearchParams(newSearchParams)
  }

  function handleWeaponChange(weapon: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newSearchParams.has('weapon') && weapon === '') {
      newSearchParams.delete('weapon')
    } else {
      newSearchParams.set('weapon', weapon)
    }

    setSearchParams(newSearchParams)
  }

  function handleRegionChange(region: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newSearchParams.has('region') && region === '') {
      newSearchParams.delete('region')
    } else {
      newSearchParams.set('region', region)
    }

    setSearchParams(newSearchParams)
  }

  function handleRarityChange(rarity: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newSearchParams.has('rarity') && rarity === '') {
      newSearchParams.delete('rarity')
    } else {
      newSearchParams.set('rarity', rarity)
    }

    setSearchParams(newSearchParams)
  }

  return (
    <>
      {/* Horizontal */}
      <RadixToolbar.Root
        orientation="horizontal"
        className="bg-gray-2 p-4 sm:rounded-md lg:hidden"
      >
        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character vision filter"
          defaultValue={searchParams.get('vision') || ''}
          onValueChange={handleVisionChange}
          className="space-x-1"
        >
          {visions.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator
          orientation="horizontal"
          className="my-4 mx-0.5 h-px w-auto bg-gray-6"
        />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character waepon filter"
          defaultValue={searchParams.get('weapon') || ''}
          onValueChange={handleWeaponChange}
          className="space-x-1"
        >
          {weapons.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator
          orientation="horizontal"
          className="my-4 mx-0.5 h-px w-auto bg-gray-6"
        />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character region filter"
          defaultValue={searchParams.get('region') || ''}
          onValueChange={handleRegionChange}
          className="space-x-1"
        >
          {regions.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator
          orientation="horizontal"
          className="my-4 mx-0.5 h-px w-auto bg-gray-6"
        />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character rarity filter"
          defaultValue={searchParams.get('rarity') || ''}
          onValueChange={handleRarityChange}
          className="space-x-1"
        >
          <ToggleItem value="4" label="4 star">
            <Icon.Solid
              name="star"
              className="h-6 w-6 text-rarity-4"
              aria-hidden
            />
          </ToggleItem>
          <ToggleItem value="5" label="5 star">
            <Icon.Solid
              name="star"
              className="h-6 w-6 text-rarity-5"
              aria-hidden
            />
          </ToggleItem>
        </RadixToolbar.ToggleGroup>
      </RadixToolbar.Root>

      {/* Vertical (lg+) */}
      <RadixToolbar.Root className="hidden rounded-md bg-gray-2 px-2.5 py-2 lg:flex">
        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character vision filter"
          className="space-x-1"
          defaultValue={searchParams.get('vision') || ''}
          onValueChange={handleVisionChange}
        >
          {visions.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator className="mx-4 my-0.5 h-auto w-px bg-gray-6" />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character waepon filter"
          className="space-x-1"
          defaultValue={searchParams.get('weapon') || ''}
          onValueChange={handleWeaponChange}
        >
          {weapons.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator className="mx-4 my-0.5 h-auto w-px bg-gray-6" />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character region filter"
          className="space-x-1"
          defaultValue={searchParams.get('region') || ''}
          onValueChange={handleRegionChange}
        >
          {regions.map(({ value, label, image }) => (
            <ToggleItem key={value} value={value} label={label}>
              <Image
                src={image}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </ToggleItem>
          ))}
        </RadixToolbar.ToggleGroup>

        <RadixToolbar.Separator className="mx-4 my-0.5 h-auto w-px bg-gray-6" />

        <RadixToolbar.ToggleGroup
          type="single"
          aria-label="Character rarity filter"
          className="space-x-1"
          defaultValue={searchParams.get('rarity') || ''}
          onValueChange={handleRarityChange}
        >
          <ToggleItem value="4" label="4 star">
            <Icon.Solid
              name="star"
              className="h-6 w-6 text-rarity-4"
              aria-hidden
            />
          </ToggleItem>
          <ToggleItem value="5" label="5 star">
            <Icon.Solid
              name="star"
              className="h-6 w-6 text-rarity-5"
              aria-hidden
            />
          </ToggleItem>
        </RadixToolbar.ToggleGroup>
      </RadixToolbar.Root>
    </>
  )
}

function ToggleItem({
  value,
  label,
  children,
}: {
  value: string
  label: string
  children: React.ReactNode
}) {
  return (
    <RadixToolbar.ToggleItem
      value={value}
      aria-label={label}
      className={clsx(
        'rounded-md bg-gray-3 p-2 transition-colors hover:bg-gray-4',
        'radix-state-on:bg-gray-5',
        'focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-primary-8'
      )}
    >
      <Tooltip text={label} sideOffset={8}>
        {children}
      </Tooltip>
    </RadixToolbar.ToggleItem>
  )
}
