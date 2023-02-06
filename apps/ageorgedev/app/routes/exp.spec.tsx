import { loader } from './exp';
import type { LoaderArgs } from '@remix-run/node';
import { vi } from 'vitest';

vi.mock('../models/characters.server', () => ({
  async getAllCharactersFromDb() {
    return [
      {
        name: 'Test',
        type: 'Test Char',
      },
    ];
  },
}));

describe('Exp route loader', () => {
  it('works as expected', async () => {
    const result = await loader({} as LoaderArgs).then((res) => res.json());
    expect(result).toEqual({
      data: [
        {
          name: 'Test',
          type: 'Test Char',
        },
      ],
      dummy: 'Just dummy updates v2',
    });
  });
});
