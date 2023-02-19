import { anotherTry } from './demo-ds.css';

/* eslint-disable-next-line */
export interface DemoDsProps {}

export function DemoDs(props: DemoDsProps) {
  return (
    <div className={'p-5 mt-10'}>
      <h1 className={'text-md'}>Welcome to DemoDs!</h1>
      <p className={'text-blue-500 ' + anotherTry}>
        This is a design system component with tailwind styles. Should be blue
      </p>
    </div>
  );
}

export default DemoDs;
