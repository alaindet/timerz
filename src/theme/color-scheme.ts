import { type FormOption } from '../types';

export const COLOR_SCHEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type ColorScheme = typeof COLOR_SCHEME[
  keyof typeof COLOR_SCHEME
];

export const COLOR_SCHEME_OPTION = {
  SYSTEM: 'system',
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type ColorSchemeOption = typeof COLOR_SCHEME_OPTION[
  keyof typeof COLOR_SCHEME_OPTION
];

export const COLOR_SCHEME_OPTIONS: FormOption<ColorSchemeOption>[] = [
  { value: COLOR_SCHEME_OPTION.SYSTEM, label: 'System' },
  { value: COLOR_SCHEME_OPTION.DARK, label: 'Dark' },
  { value: COLOR_SCHEME_OPTION.LIGHT, label: 'Light' },
];