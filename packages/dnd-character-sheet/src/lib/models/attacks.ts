import type { Ability } from './abilities';
import type { DamageType } from './damage-type';
import type { WeaponMasteryProperty } from './weapon-properties';

export type Attack = {
  name: string;
  damage: AttackDamage[];
  masteryProperty?: WeaponMasteryProperty; // easier to just keep this here than in weapon attack
  hasMasteryByDefault?: boolean;
  attackBonusMod?: number;
  damageMod?: number;
  notProficient?: boolean;
  notes?: string;
} & (WeaponAttack | SpellWithAttack | SpellWithSave);

export type SpellWithSave = {
  kind: 'spell-with-save';
  ability?: Ability;
  saveAbility: Ability;
};

export type SpellWithAttack = {
  kind: 'spell-with-attack';
  ability?: Ability;
};

export type WeaponAttack = {
  kind: 'weapon';
  ability: typeof Ability.Strength | typeof Ability.Dexterity;
};

export type AttackDamage = {
  dice: string;
  type: DamageType;
  disableModifier?: boolean;
};
