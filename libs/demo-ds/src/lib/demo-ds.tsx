import styles from './demo-ds.module.scss';

/* eslint-disable-next-line */
export interface DemoDsProps {}

export function DemoDs(props: DemoDsProps) {
  return (
    <div>
      <h1>Welcome to DemoDs!</h1>
      <p className={styles.example}>This is a design system component</p>
      <p>This component has now been updated</p>
    </div>
  );
}

export default DemoDs;
