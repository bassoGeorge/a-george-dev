import {
  Ability,
  type Character,
  Skill,
} from '@ageorgedev/dnd-character-sheet';

export const RustyData: Character = {
  name: 'Rusty',
  species: 'Warforged',
  background: 'Archaeologist',
  classes: [
    {
      name: 'Artificer',
      level: 3,
      subclass: 'Artillerist',
    },
  ],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 16,
    [Ability.Constitution]: 14,
    [Ability.Intelligence]: 17,
    [Ability.Wisdom]: 10,
    [Ability.Charisma]: 8,
  },
  savingThrowProficiencies: [Ability.Constitution, Ability.Intelligence],
  skillProficiencies: [
    Skill.Athletics,
    Skill.Acrobatics,
    Skill.Arcana,
    Skill.History,
    Skill.Investigation,
    Skill.Perception,
    Skill.Survival,
    Skill.Intimidation,
  ],
  skillExpertise: [],
  baseArmorClass: 16,
  speed: 30,
  hitPoints: {
    maximum: 27,
  },
  armorProficiencies: ['Light Armor', 'Medium Armor', 'Shield'],
  weaponProficiencies: [],
  toolProficiencies: [
    "Cartographer's Tools",
    "Thieves' Tools",
    "Tinker's Tools",
    "Smith's Tools",
    "Navigator's Tools",
    "Woodcarver's Tools",
  ],
  languages: ['Common'],
  attacks: [
    {
      kind: 'weapon',
      name: 'Heavy Crossbow',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d10', type: 'Piercing' }],
      notes: 'Ammunition (80/320 bolt), 2-handed, Loading',
    },
    {
      kind: 'weapon',
      name: 'Dagger',
      ability: Ability.Dexterity,
      damage: [{ dice: '1d4', type: 'Piercing' }],
      notes: 'Finesse, Light, Thrown (range 20/60)',
    },
    {
      kind: 'spell-with-attack',
      name: 'Fire Bolt',
      damage: [{ dice: '1d10', type: 'Fire' }],
      notes: '120 ft range',
    },
  ],
  features: [
    {
      name: "Tinker's Magic",
      castingTime: 'Action',
      description:
        "While holding Tinker's Tools, you can create one item in an unoccupied space within 5 ft of yourself. Choose the item from the Tinker's Magic List (find them in the next sheet). The items last until you finish a Long Rest",
      resource: {
        id: 'TinkerMagic',
        name: "Tinker's Magic",
        count: {
          kind: 'fixed',
          value: 2,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
    {
      name: 'Replicate Magic Item',
      description: `
      You have learned arcane plans that you use to make magic items. 
      On finishing a Long Rest, you can create 1 or 2 different magic items from these plans. The items last until you die. You can only have 2 such created magic items at any given point, creating another one will make the oldest one vanish.
      You know the following plans:
      <ol>
      <li>Rope of Climbing</li>
      <li>Goggles of Night</li>
      <li>Wand of Secrets</li>
      <li>Repeating Shot</li>
      </ol>
      `,
    },
    {
      name: 'Wand Crafting',
      description:
        'When you craft a magic Wand, the amount of time required to craft is halved',
    },
    {
      // TODO: how to describe a resource used once per long rest, and then more with using spell slots
      name: 'Eldritch Canon',
      castingTime: 'Action',
      description: `
      <em>Once per Long Rest or spend spell slots for additional invocations.</em>
      Using Smith's Tools, or Woodcarver's Tools, you create a Small or Tiny Eldritch Canon in an unoccupied space on a horizontal surface within 5 ft. 
      `,
    },
  ],
  equipment: [],
};
