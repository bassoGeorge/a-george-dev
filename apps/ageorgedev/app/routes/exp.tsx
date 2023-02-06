import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllCharactersFromDb } from '../models/characters.server';

export async function loader(args: LoaderArgs) {
  return json({
    data: await getAllCharactersFromDb(),
    dummy: 'Just dummy updates v2',
  });
}

export default function Exp() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <h3>Experimental page with loader info</h3>
      <ul>
        {data.map((character) => (
          <li key={character.name}>
            {character.name} - {character.type}
          </li>
        ))}
      </ul>
    </>
  );
}
