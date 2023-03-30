import { highSkill } from './Skill.css';

type SkillType = 'tool' | 'technique';
type SkillLevel = 3 | 4 | 5;

type SkillProps = {
  name: string;
  type: SkillType;
  level: SkillLevel;
};

export function Skill(props: SkillProps) {
  const colorStyles =
    props.type === 'tool' ? 'bg-rc-p-accent-200' : 'bg-rc-s-accent-200';

  const levelSet =
    props.type === 'tool' ? levelClassesForTool : levelClassesForTech;
  const newClasses = levelSet[props.level];

  return (
    <div className={`${newClasses} inline-block px-3 py-1 font-interface`}>
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

const tool = bSkill('tool');
const tech = bSkill('technique');

export const AllSkills: SkillProps[] = [
  tool('React'),
  tool('Angular'),
  tool('React Native', 3),
  tool('Nx', 4),
  tool('Storybook', 4),
  tool('Jest'),
  tool('Vitest', 4),
  tool('Testing Library'),
  tech('Component Design'),
  tech('Mono Repo', 4),
  tech('Design Systems', 4),
  tech('Micro Frontends', 3),
  tech('CI/CD', 3),
];

const levelClasses: Record<SkillLevel, string> = {
  3: 'opacity-60',
  4: 'opacity-80',
  5: highSkill,
};

const levelClassesForTool: Record<SkillLevel, string> = {
  3: 'bg-rc-p-accent-200',
  4: 'bg-rc-p-accent-300 text-cc-neutral-inverse-500',
  5: highSkill + ' bg-rc-p-accent-400 text-cc-neutral-inverse-500',
};

const levelClassesForTech: Record<SkillLevel, string> = {
  3: 'bg-rc-s-accent-200',
  4: 'bg-rc-s-accent-300',
  5: highSkill + ' bg-rc-s-accent-400 text-cc-neutral-inverse-500',
};
