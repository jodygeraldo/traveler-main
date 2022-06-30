import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { CharacterDetail } from '~/data/characters'
import { getCharacter } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'

type LoaderData = {
  character: CharacterDetail
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const userCharacter = await getUserCharacter({ name: characterName, accId })
  const character = getCharacter({ name: characterName, characterData: userCharacter })
  if (!character) {
    throw json(`Character ${characterName} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  return json<LoaderData>({ character })
}

export default function CharacterPage() {
  const { character } = useLoaderData() as LoaderData

  return <h1>{character.name}</h1>
}
