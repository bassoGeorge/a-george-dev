import { useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <S01Intro />
        <S02Fundamentals />
      </div>
    </div>
  );
}

export default TalkTailwind;
