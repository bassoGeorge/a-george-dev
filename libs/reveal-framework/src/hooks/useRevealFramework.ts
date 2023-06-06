import { RefObject, useEffect } from 'react';

export function useRevealFramework(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    (async () => {
      if (!ref.current) return;

      const Reveal = (await import('reveal.js')).default;
      const deck = new Reveal(ref.current, {
        embedded: true,
        keyboardCondition: 'focused',
        controlsTutorial: false,
        disableLayout: true,
      });
      deck.initialize();
    })();
  }, []);
}
