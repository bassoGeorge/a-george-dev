'use client';
import { Heading4 } from '@ageorgedev/atoms';
import { ThemeProvider } from '@ageorgedev/molecules';
// import { HomeAboveFold } from '../components/HomeAboveFold/HomeAboveFold';

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
    </ThemeProvider>
  );
}