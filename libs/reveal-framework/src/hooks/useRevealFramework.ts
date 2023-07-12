import { RefObject, useEffect, useRef } from 'react';

export function useRevealFramework(ref: RefObject<HTMLElement>) {
  const revealInstance = useRef<Reveal.Api>();
  useEffect(() => {
    (async () => {
      if (!ref.current) return;

      const Reveal = (await import('reveal.js')).default;
      const deck = new Reveal(ref.current, {
        embedded: true,
        keyboardCondition: 'focused',
        controlsTutorial: false,
        disableLayout: true,
        transition: 'fade',
      });

      deck.initialize().then((evt) => {
        // Hack for dev
        deck.slide(6, 1);
        revealInstance.current = deck;
      });
    })();
  }, []);

  return [revealInstance] as const;
}
