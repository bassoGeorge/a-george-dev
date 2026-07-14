import {
  Ability,
  type Character,
  CharacterClass,
  SPELL,
  withSpellMods,
} from '@ageorgedev/dnd-character-sheet';
import { Zoynari2Data } from './zoynari-2';

export const Zoynari3Data: Character = {
  ...Zoynari2Data,
  customDescription: 'Kalashtar Cleric of the Light',
  classes: [
    {
      name: CharacterClass.Cleric,
      subclass: 'Light Domain',
      level: 3,
    },
  ],
  features: [
    ...Zoynari2Data.features,
    {
      name: 'Radiance of Dawn',
      cost: '1 Channel Divinity',
      castingTime: 'Action',
      description:
        'Emit light in a 30ft sphere originating at yourself. Dispels any magical darkness. Each creature of your choice in range makes a Con. saving throw, taking 2d10+<%= level.Cleric %> Radiant damage, or half as much on success.',
    },
    {
      name: 'Warding flare',
      castingTime: 'Reaction',
      cost: '1 Warding flare',
      description:
        'When a creature you can see within 30ft of yourself makes an attack roll, you can take a reaction to impose Disadvantage by causing a light to flare.',
      resource: {
        id: 'wardingFlare',
        name: 'Warding flare',
        count: {
          kind: 'ability',
          ability: Ability.Wisdom,
        },
        refresh: {
          kind: 'long-rest',
        },
      },
    },
  ],
  spellcasting: {
    ...(Zoynari2Data.spellcasting as NonNullable<Character['spellcasting']>),
    slots: {
      1: 4,
      2: 2,
    },
    numberOfPreparedSpells: 6,
    spells: [
      ...(Zoynari2Data.spellcasting?.spells as NonNullable<
        Character['spellcasting']
      >['spells']),
      withSpellMods(SPELL.BurningHands, { alwaysPrepared: true }),
      withSpellMods(SPELL.FaerieFire, { alwaysPrepared: true }),
      withSpellMods(SPELL.ScorchingRay, { alwaysPrepared: true }),
      withSpellMods(SPELL.SeeInvisibility, { alwaysPrepared: true }),
      SPELL.LocateObject,
    ],
  },
};
