import { useEffect } from 'react';

export default function useRevealJs() {
  useEffect(() => {
    (async () => {
      const Reveal = (await import('reveal.js')).default;
      const deck = new Reveal();
      deck.initialize();
    })();
  }, []);
}
