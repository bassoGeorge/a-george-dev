import { highSkill } from './Skill.css';
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

const bSkill =
  (type: SkillType) =>
  (name: string, level: SkillLevel = 5): SkillProps => ({
    name,
    level,
    type,
  });

type SkillClassMap = Record<SkillLevel, string>;

const levelClassesForTool: SkillClassMap = {
  3: 'bg-rc-p-accent-200',
  4: 'bg-rc-p-accent-400 text-cc-neutral-inverse-500',
  5: highSkill + ' bg-rc-p-accent-500 text-cc-neutral-inverse-500',
};

const levelClassesForTech: SkillClassMap = {
  3: 'bg-rc-s-accent-300',
  4: 'bg-rc-s-accent-400 text-cc-neutral-inverse-500',
  5: highSkill + ' bg-rc-s-accent-500 text-cc-neutral-inverse-500',
};

const levelClassesForHuman: SkillClassMap = {
  3: 'bg-rc-timber-100 text-cc-neutral-inverse-500 opacity-50',
  4: 'bg-rc-timber-200 text-cc-neutral-inverse-500 opacity-60',
  5: highSkill + ' bg-rc-timber-300 text-cc-neutral-inverse-500 opacity-70',
};

const levelClasses: Record<SkillType, SkillClassMap> = {
  tool: levelClassesForTool,
  technique: levelClassesForTech,
  human: levelClassesForHuman,
};

const skillMapper =
  (type: SkillType) =>
  ([name, level]: [string, SkillLevel]) => ({
    name,
    level,
    type,
  });

const toolSkills: SkillProps[] = map(skillMapper('tool'), [
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
]);

const techSkills: SkillProps[] = map(skillMapper('technique'), [
  ['Performance', 4],
  ['Frontend serving strategies', 5],
  ['Atomic design', 5],
  ['Utility-first CSS', 5],
  ['Monorepo', 5],
  ['Micro frontends', 3],
  ['CSS-in-JS', 4],
  ['Multi-platform apps', 3],
  ['CI/CD', 4],
  ['Functional programming', 5],
  ['CSS animations', 5],
  ['Bundlers', 3],
  ['Accessibility', 4],
]);

const humanSkills: SkillProps[] = map(skillMapper('human'), [
  ['Mentoring', 5],
  ['Team leadership', 4],
  ['Training skills', 5],
  ['Estimations', 5],
  ['Prioritisation', 4],
]);

export const AllSkills: SkillProps[] = [
  ...toolSkills,
  ...techSkills,
  ...humanSkills,
];
