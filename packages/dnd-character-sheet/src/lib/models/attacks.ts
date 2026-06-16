import type { AbilityName } from './abilities'

export type Attack = {
  name: string
  damage: AttackDamage[]
  masteryProperty?: string
  attackBonusMod?: number
  damageMod?: number
  notProficient?: boolean
  notes?: string
} & (WeaponAttack | SpellWithAttack | SpellWithSave)

export type SpellWithSave = {
  kind: 'spell-with-save'
  ability?: AbilityName
  saveAbility: AbilityName
}

export type SpellWithAttack = {
  kind: 'spell-with-attack'
  ability?: AbilityName
}

export type WeaponAttack = {
  kind: 'weapon'
  ability: Extract<AbilityName, 'strength' | 'dexterity'>
}

export type AttackDamage = {
  dice: string
  type: string
  disableModifier?: boolean
}
