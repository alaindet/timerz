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