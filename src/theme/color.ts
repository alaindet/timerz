export const THEME_COLOR_NAME = {
  GREEN: 'Green',
  BLUE: 'Blue',
  RED: 'Red',
  TEAL: 'Teal',
  PURPLE: 'Purple',
  YELLOW: 'Yellow',
} as const;

export type ThemeColorName = typeof THEME_COLOR_NAME[
  keyof typeof THEME_COLOR_NAME
];