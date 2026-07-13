import { mergeDeepRight } from 'ramda';
import type { Spell } from '../models/spellcasting.js';

type SpellMods = Pick<
  Spell,
  'freeUses' | 'alwaysPrepared' | 'notes' | 'alternativeAbility' | 'components'
>;

export function withSpellMods(spell: Spell, mods: SpellMods): Spell {
  return mergeDeepRight(spell, mods);
}
export function withMaterial(spell: Spell): Spell {
  return withSpellMods(spell, { components: { materialConsumed: true } });
}
