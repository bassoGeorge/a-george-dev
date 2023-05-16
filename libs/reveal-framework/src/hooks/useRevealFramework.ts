import { useEffect } from 'react';

export function useRevealFramework() {
  useEffect(() => {
    (async () => {
      const Reveal = (await import('reveal.js')).default;
      const deck = new Reveal();
      deck.initialize({
        controlsTutorial: false,
      });
    })();
  }, []);
}
