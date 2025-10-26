import { FaComputer, FaMoon, FaSun } from 'react-icons/fa6';

import { type ColorSchemeOption, COLOR_SCHEME_OPTION } from '../../theme/color-scheme';
import { RadioButtonGroup } from '../radio-button/radio-button-group';

const { SYSTEM, DARK, LIGHT } =COLOR_SCHEME_OPTION;

export type ThemeSwitcherProps = {
  value: ColorSchemeOption;
  onChange: (option: ColorSchemeOption) => void;
};

export function ThemeSwitcher({
  value,
  onChange,
}: ThemeSwitcherProps) {

  function handleControlChange(option: string) {
    onChange(option as ColorSchemeOption);
  }

  return (
    <RadioButtonGroup
      id="theme-switcher"
      value={value}
      onChange={handleControlChange}
    >
      <RadioButtonGroup.Title>
        Theme
      </RadioButtonGroup.Title>

      <RadioButtonGroup.Option id={SYSTEM} value={SYSTEM}>
        <FaComputer /> System
      </RadioButtonGroup.Option>

      <RadioButtonGroup.Option id={DARK} value={DARK}>
        <FaMoon /> Dark
      </RadioButtonGroup.Option>

      <RadioButtonGroup.Option id={LIGHT} value={LIGHT}>
        <FaSun /> Light
      </RadioButtonGroup.Option>
    </RadioButtonGroup>
  );
}