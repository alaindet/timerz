import type { ColorSchemeOption } from '../../theme/color-scheme';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

export type AppHeaderProps = {
  colorScheme: ColorSchemeOption;
  onColorSchemeChange: (colorSchemeOption: ColorSchemeOption) => void;
};

export function AppHeader({
  colorScheme,
  onColorSchemeChange,
}: AppHeaderProps) {
  return (
    <>
      <h1 className="app-title">Timerz</h1>
      <div className="header-controls">
        <ThemeSwitcher
          value={colorScheme}
          onChange={onColorSchemeChange}
        />
      </div>
    </>
  );
}