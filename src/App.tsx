import { useEffect } from 'react';

import './App.css';
import { useColorScheme } from './hooks';
import { COLOR_SCHEME } from './theme/color-scheme';
import { ThemeSwitcher } from './components/theme-switcher/theme-switcher';

export default function App() {
  const colorScheme = useColorScheme(COLOR_SCHEME.DARK);

  useEffect(function setColorSchemeToDom() {
    if (!document) return;
    document.documentElement.setAttribute('data-theme', colorScheme.value);
  }, [colorScheme.value]);

  return (
    <div className="app">
      <header>
        <h1 className="app-title">Timerz</h1>
        <div className="header-controls">
          <ThemeSwitcher
            value={colorScheme.option}
            onChange={colorScheme.select}
          />
        </div>
      </header>
      <main>
        <p>TODO: Content here</p>
      </main>
    </div>
  )
}