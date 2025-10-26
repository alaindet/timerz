import { useEffect, useState } from 'react';

export function useWindowMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(function syncWindowMediaQuery() {
    if (!window || !window.matchMedia) {
      return;
    }

    const onMediaQueryListChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    const mql = window.matchMedia(query);
    mql.addEventListener('change', onMediaQueryListChange);
    return () => mql.removeEventListener('change', onMediaQueryListChange);
  }, []);

  return matches;
}