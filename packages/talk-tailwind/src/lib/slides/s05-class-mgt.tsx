import {
  Heading1,
  Heading2,
  Heading3,
  Interface2Xl,
  PBody,
} from '@ageorgedev/design-system';
import { CodeBlock } from '@ageorgedev/design-system';
import {
  ComparisonRow,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S05ClassManagement() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #2
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          DRY tailwind styles
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={<Heading2>What do you do about this?</Heading2>}
      >
        <CodeBlock lang="html" text={fullTailwindWithoutComponents}></CodeBlock>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>Maintaining strings in Javascript</Heading2>}
      >
        <ComparisonRow
          left={<CodeBlock lang="javascript" text={jsMgt}></CodeBlock>}
          right={
            <>
              <PBody>
                Manage the tailwind classes in javascript like regular strings
              </PBody>
              <PBody>Make sure you don't split the class names</PBody>
              <PBody>
                Works pretty well in <em>React</em>
              </PBody>
              <PBody>
                Works passably well in <em>Angular</em>. Bit more awkward
                getting the strings onto
                <br /> the templates since they need to be part of the component
                class.
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>Componentisation</Heading2>}>
        <ComparisonRow
          left={
            <>
              <Interface2Xl>React</Interface2Xl>
              <CodeBlock lang="tsx" text={reactComponent}></CodeBlock>
            </>
          }
          right={
            <>
              <Interface2Xl>Angular</Interface2Xl>
              <CodeBlock lang="typescript" text={angularComponent}></CodeBlock>
              <CodeBlock lang="html" text={angularComponentExample}></CodeBlock>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>Looks better already</Heading2>}>
        <CodeBlock lang="html" text={fixedTailwindWithComponents}></CodeBlock>
      </SlideTypeRegular>

      <SlideTypeRegular
        callout="Opinion"
        heading={<Heading2>Best of both worlds</Heading2>}
      >
        <div className="flex items-start gap-7">
          <CodeBlock lang="tsx" text={advancedComponent}></CodeBlock>
          <div className="flex flex-col items-start gap-7 text-left">
            <CodeBlock lang="tsx" text={advancedComponentUsage}></CodeBlock>
            <PBody>
              Similar can be somewhat achieved in Angular using
              <br />
              static fields in Components/Directives
            </PBody>
          </div>
        </div>
      </SlideTypeRegular>
    </section>
  );
}

// Code blocks

const jsMgt = `// DO NOT BREAK UP TAILWIND CLASS NAMES

const CommonStyles = "text-2xl bg-primary-100";

const MoreStyles = cls("shadow-sm px-2", otherStyles);

const Variants = {
  primary: 'bg-primary-300 hover:bg-primary-400',
  secondary: 'bg-secondary-200 hover:text-white'
}`;

const reactComponent = `export function Card({ 
  className, ...otherProps
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...otherProps}

      className={\`shadow border-gray border-2 mb-4 
      \${className ?? ''}\`}
    />
  );
}`;
const angularComponent = `@Directive({
  selector: '[appCard]',
})
export class CardDirective {
  @HostBinding('class') classes 
    = 'shadow border-gray border-2 mb-4';
}`;

const angularComponentExample = `<section class='bg-grey' appCard>Notes</section>`;

const advancedComponent = `type Heading1Props = React.PropsWithChildren &
  React.HTMLAttributes<HTMLHeadingElement>;

function Heading1({ 
  className, children, ...otherProps 
}: Heading1Props) {
  return (
    <h1 {...otherProps} 
      className={Heading1.classes + ' ' + (className ?? '') }
    >
      {children}
    </h1>
  );
}

Heading1.classes = 'text-2xl font-bold md:text-3xl';`;

const advancedComponentUsage = `<Heading1>Hello There</Heading1>

<section 
  className={Heading1.classes + ' bg-blue-100 rounded'}>

  <p>A section with common styling</p>
  <span>Pretty nifty</p>
</section>`;

const fullTailwindWithoutComponents = `<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <h3 className="font-bold text-xl mb-3">
      John Doe
    </h3>
    <p className="text-gray-700 text-base mb-2">
      Professional Web developer with several years of experience
    </p>
    <p className="text-gray-700 text-base">
      Loves basketball
    </p>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      Web Developer
    </span>
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      UI/UX Designer
    </span>
  </div>
</div>`;

const fixedTailwindWithComponents = `<Card>
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <Heading2 className='mb-3'>John Doe</Heading2>
    <Body strength="subtle" className='mb-2'>
      Professional Web developer with several years of experience
    </Body>
    <Body strength="subtle">
      Loves basketball
    </Body>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <SkillBadge>
      Web Developer
    </SkillBadge>
    <SkillBadge>
      UI/UX Designer
    </SkillBadge>
    <SkillBadge>Photographer</SkillBadge>
  </div>
</Card>`;
