import { useEffect, useMemo, useState } from 'react';

import { COLOR_SCHEME, COLOR_SCHEME_OPTION, type ColorScheme, type ColorSchemeOption } from '../theme/color-scheme';
import { useLocalStorage } from './local-storage';
import { useWindowMediaQuery } from './window-media-query';

export function useColorScheme(
  defaultScheme: ColorScheme = COLOR_SCHEME.LIGHT,
) {
  const [selected, setSelected] = useState<ColorSchemeOption>(
    COLOR_SCHEME_OPTION.SYSTEM,
  );
  const systemLight = useWindowMediaQuery('(prefers-color-scheme: light)');
  const systemDark = useWindowMediaQuery('(prefers-color-scheme: dark)');
  const localStorage = useLocalStorage<ColorScheme>({
    key: 'timerz.colorScheme',
    serialize: (colorScheme: ColorScheme) => colorScheme as string,
    deserialize: (colorScheme: string) => colorScheme as ColorScheme,
  });

  useEffect(function syncLocalStorageToSelected() {
    if (!localStorage.initialized) {
      return;
    }

    const stored = localStorage.stored;
    if (stored === null) {
      return;
    }

    setSelected(stored as ColorSchemeOption);
  }, [localStorage.initialized]);

  const colorScheme = useMemo(function pickColorScheme() {

    // If present, use stored color schema
    if (localStorage.stored !== null) {
      return localStorage.stored;
    }

    // If present, use user-selected color schema
    if (selected !== COLOR_SCHEME_OPTION.SYSTEM) {
      return selected;
    }

    // Match system color scheme
    if (systemLight) {
      return COLOR_SCHEME.LIGHT;
    }

    if (systemDark) {
      return COLOR_SCHEME.DARK;
    }

    // Fallback to default scheme
    return defaultScheme;
  }, [selected, localStorage.stored, systemLight, systemDark]);

  function select(colorSchemeOption: ColorSchemeOption) {
    setSelected(colorSchemeOption);

    if (colorSchemeOption === COLOR_SCHEME_OPTION.SYSTEM) {
      localStorage.clear();
    } else {
      localStorage.store(colorSchemeOption as ColorScheme);
    }
  }

  return {
    option: selected,
    value: colorScheme,

    select,
  };
}