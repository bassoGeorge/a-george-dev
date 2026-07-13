import type { Spell } from '../models/spellcasting.js';

type SpellMods = Pick<
  Spell,
  'freeUses' | 'alwaysPrepared' | 'notes' | 'alternativeAbility'
>;

export function withSpellMods(spell: Spell, mods: SpellMods): Spell {
  return { ...spell, ...mods };
}
