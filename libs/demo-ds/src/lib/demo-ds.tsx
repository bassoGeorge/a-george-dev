import { greenText } from './demo-ds.css';

/* eslint-disable-next-line */
export interface DemoDsProps {}

export function DemoDs(props: DemoDsProps) {
  return (
    <div className={'p-5 mt-10'}>
      <h1 className={'text-3xl'}>Welcome to DemoDs!</h1>
      <ul>
        <li className="text-blue-500">
          If this statement is blue, then tailwind is applied correctly
        </li>
        <li className={greenText}>
          If this statement is in secondary accent pink, then VanillaExtract is
          working well along with global styles
        </li>
      </ul>
    </div>
  );
}

export default DemoDs;
