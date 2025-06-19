import { RefObject, useEffect, useRef } from 'react';

export function useRevealFramework(elementRef: RefObject<HTMLElement | null>) {
  const revealInstance = useRef<Reveal.Api | null>(null);
  useEffect(() => {
    (async () => {
      if (!elementRef.current) return;

      const Reveal = (await import('reveal.js')).default;
      const deck = new Reveal(elementRef.current, {
        embedded: true,
        keyboardCondition: 'focused',
        controlsTutorial: false,
        disableLayout: true,
        transition: 'fade',
      });

      deck.initialize().then((evt) => {
        // Hack for dev
        // deck.slide(6, 1);
        revealInstance.current = deck;
      });
    })();
  }, []);

  return [revealInstance] as const;
}
