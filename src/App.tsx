import { useEffect } from 'react';

import './App.css';
import { useColorScheme } from './hooks';
import { COLOR_SCHEME } from './theme/color-scheme';
import { AppHeader } from './components/app-header/app-header';
import { AppTimers } from './components/app-timers/app-timers';

export default function App() {
  const colorScheme = useColorScheme(COLOR_SCHEME.DARK);

  useEffect(function syncColorSchemeWithDom() {
    if (document) {
      document.documentElement.setAttribute('data-theme', colorScheme.value);
    }
  }, [colorScheme.value]);

  return (
    <div className="app">
      <header>
        <AppHeader
          colorScheme={colorScheme.option}
          onColorSchemeChange={colorScheme.select}
        />
      </header>
      <main>
        <AppTimers max={8} />
      </main>
    </div>
  );
}
