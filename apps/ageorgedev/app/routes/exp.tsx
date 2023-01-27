import {json, LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export function loader(args: LoaderArgs) {
  return json({
    data: [
      {
        name: 'Geralt of Rivia',
        type: 'Witcher'
      },
      {
        name: 'Zoltan Chevay',
        type: 'Dwarf'
      }
    ]
  })
}

export default function Exp() {
  const { data } = useLoaderData<typeof loader>()

  return <>
    <h3>Experimental page with loader info</h3>
    <ul>
    { data.map(character => (
        <li key={character.name}>{character.name} - {character.type}</li>
    ))}
    </ul>
  </>
}
