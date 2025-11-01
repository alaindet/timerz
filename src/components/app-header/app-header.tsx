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
      <h1 className="header__title">Timerz</h1>
      <div className="header__right">
        <ThemeSwitcher
          value={colorScheme}
          onChange={onColorSchemeChange}
        />
      </div>
    </>
  );
}