import { mapKeys } from './ramda-additions';

describe('mapKeys', () => {
  it('works directly', () => {
    expect(mapKeys((key) => key + '__test', { name: 'test', age: 10 })).toEqual(
      {
        name__test: 'test',
        age__test: 10,
      }
    );
  });

  it('works in curried format', () => {
    const pref = mapKeys((k) => 'test--' + k);
    expect(
      pref({
        a: {
          name: 'test',
        },
        b: 'something',
      })
    ).toEqual({
      'test--a': {
        name: 'test',
      },
      'test--b': 'something',
    });
  });
});
