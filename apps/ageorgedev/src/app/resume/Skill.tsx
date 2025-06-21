import styles from './Skill.module.css';
import { map } from 'ramda';

type SkillType = 'tool' | 'technique' | 'human';
type SkillLevel = 3 | 4 | 5;

type SkillProps = {
  name: string;
  type: SkillType;
  level: SkillLevel;
};

export function Skill(props: SkillProps) {
  const styleClasses = levelClasses[props.type][props.level];

  return (
    <div
      className={`${styleClasses} inline-block px-3 py-1 font-interface text-sm`}
    >
      {props.name}
    </div>
  );
}

type SkillClassMap = Record<SkillLevel, string>;

const primaryAccentColorClasses: SkillClassMap = {
  3: 'bg-rc-p-accent-200 opacity-80',
  4: 'bg-rc-p-accent-300 text-cc-neutral-inverse',
  5: styles.highSkill + ' bg-rc-p-accent-400 text-cc-neutral-inverse',
};

const secondaryAccentColorClasses: SkillClassMap = {
  3: 'bg-rc-s-accent-200 opacity-80',
  4: 'bg-rc-s-accent-300 text-cc-neutral-subtle',
  5: styles.highSkill + ' bg-rc-s-accent-400 text-cc-neutral-inverse',
};

const levelClassesForHuman: SkillClassMap = {
  3: 'bg-rc-timber-100 text-cc-neutral-inverse opacity-30',
  4: 'bg-rc-timber-200 text-cc-neutral-inverse opacity-50',
  5: styles.highSkill + ' bg-rc-timber-300 text-cc-neutral-inverse opacity-60',
};

const levelClasses: Record<SkillType, SkillClassMap> = {
  tool: primaryAccentColorClasses,
  technique: secondaryAccentColorClasses,
  human: levelClassesForHuman,
};

const skillMapper =
  (type: SkillType) =>
  ([name, level]: [string, SkillLevel]) => ({
    name,
    level,
    type,
  });

export const toolSkills: SkillProps[] = map(skillMapper('tool'), [
  ['React', 5],
  ['Angular', 5],
  ['HTML / CSS', 5],
  ['React Native', 3],
  ['Testing Library', 4],
  ['Remix', 4],
  ['NextJS', 3],
  ['RxJS', 4],
  ['Redux', 4],
  ['AgGrid', 3],
  ['Node', 4],
  ['Ramda', 4],
]);

export const techSkills: SkillProps[] = map(skillMapper('technique'), [
  ['Performance', 4],
  ['Micro frontends', 3],
  ['Frontend serving strategies', 5],
  ['Atomic design', 5],
  ['Utility-first CSS', 5],
  ['Monorepo', 5],
  ['CSS-in-JS', 4],
  ['CI/CD', 4],
  ['Bundlers', 3],
  ['Multi-platform apps', 3],
  ['Functional programming', 5],
  ['Accessibility', 4],
  ['CSS animations', 5],
]);

export const humanSkills: SkillProps[] = map(skillMapper('human'), [
  ['Mentoring', 4],
  ['Estimation', 4],
  ['Architectural decision making', 5],
  ['Business value articulation', 3],
  ['Prioritisation', 4],
  ['Leadership', 3],
  ['Stakeholder management', 5],
  ['Training', 5],
]);

export const AllSkills: SkillProps[] = [
  ...toolSkills,
  ...techSkills,
  ...humanSkills,
];
