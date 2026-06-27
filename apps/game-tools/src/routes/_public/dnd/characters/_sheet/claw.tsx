import {
  Ability,
  ArmorProficiency,
  type Character,
  CharacterClass,
  Skill,
  StandardCharacterSheet,
} from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';

const ClawCharacter: Character = {
  name: 'Claw',
  species: 'Shifter',
  background: 'Scribe',
  classes: [
    {
      name: CharacterClass.Rogue,
      subclass: 'Arcane Trickster',
      level: 3,
    },
  ],
  abilities: {
    [Ability.Strength]: 8,
    [Ability.Dexterity]: 16,
    [Ability.Constitution]: 12,
    [Ability.Intelligence]: 16,
    [Ability.Wisdom]: 12,
    [Ability.Charisma]: 10,
  },
  savingThrowProficiencies: [Ability.Dexterity, Ability.Intelligence],
  skillProficiencies: [
    Skill.Acrobatics,
    Skill.SleightOfHand,
    Skill.Stealth,
    Skill.Investigation,
    Skill.Insight,
    Skill.Perception,
    Skill.Deception,
    Skill.Intimidation,
  ],
  skillExpertise: [Skill.Perception, Skill.Stealth],
  baseArmorClass: 14,
  speed: 30,
  hitPoints: {
    maximum: 22,
  },
  attacks: [],
  equipment: [],
  features: [],
  armorProficiencies: [ArmorProficiency.LightArmor],
  weaponProficiencies: [
    'Simple weapons',
    'Martial weapons that have the Finesse or Light property',
  ],
  toolProficiencies: ["Thieves' tools", "Calligrapher's supplies"],
  languages: ['Common', 'Gnomish', "Thieves's Cant"],
};

export const Route = createFileRoute('/_public/dnd/characters/_sheet/claw')({
  component: RouteComponent,
  staticData: {
    character: {
      name: ClawCharacter.name,
      level: ClawCharacter.classes.reduce((acc, { level }) => acc + level, 0),
      description: 'Shifter Arcane Trickster',
    },
  },
});

function RouteComponent() {
  return <StandardCharacterSheet data={ClawCharacter} />;
}
