import {
  Heading1,
  Heading2,
  Heading3,
  Interface2Xl,
  PBody,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
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

      <SlideTypeRegular heading={<Heading2>Best of both worlds</Heading2>}>
        <div className="flex gap-7 items-start">
          <CodeBlock lang="tsx" text={advancedComponent}></CodeBlock>
          <CodeBlock lang="tsx" text={advancedComponentUsage}></CodeBlock>
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
  selector: '[appCard],app-card',
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
      className={MyHeading1.classes + ' ' + (className ?? '') }
    >
      {children}
    </h1>
  );
}

Heading1.classes = 'text-2xl font-bold desktop:text-3xl';`;

const advancedComponentUsage = `<Heading1>Hello There</Heading1>

<section 
  className={Heading1.classes + ' bg-blue-100 rounded'}>

  <p>A section with common styling</p>
  <span>Pretty nifty</p>
</section>`;
