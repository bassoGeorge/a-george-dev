'use client';
import { Heading4 } from '@ageorgedev/atoms';
import { ThemeProvider } from '@ageorgedev/molecules';
// import { HomeAboveFold } from '../components/HomeAboveFold/HomeAboveFold';
import styles from './page.module.css';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <ThemeProvider>
      <Heading4 as="p" className="text-cc-neutral-subtle">
        Architecting web experiences since 2016
      </Heading4>
      <p className={styles.experimental}>Testing this shit</p>
    </ThemeProvider>
  );
}
