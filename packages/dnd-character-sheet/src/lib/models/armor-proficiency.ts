export const ArmorProficiency = {
  LightArmor: 'Light Armor',
  MediumArmor: 'Medium Armor',
  HeavyArmor: 'Heavy Armor',
  Shield: 'Shield',
} as const;

export type ArmorProficiency =
  (typeof ArmorProficiency)[keyof typeof ArmorProficiency];

export const ALL_ARMOR_PROFICIENCIES: ArmorProficiency[] = [
  ArmorProficiency.LightArmor,
  ArmorProficiency.MediumArmor,
  ArmorProficiency.HeavyArmor,
  ArmorProficiency.Shield,
];
