import { compose, curryN, fromPairs, map, toPairs } from 'ramda';

type KeyT = string;

function _mapKeys<S>(
  mapper: (key: KeyT) => string,
  obj: Record<KeyT, S>
): Record<string, S> {
  return compose(
    fromPairs,
    map(([key, value]: [KeyT, S]) => [mapper(key), value] as const),
    toPairs
  )(obj);
}
export const mapKeys = curryN(2, _mapKeys);
