export type TimerTheme = {
  value: string;
  label: string;
  cssBackground: string;
  cssText: string;
};

export type TimerConfig = {
  id: string;
  name: string;
  minutes: number;
  elapsedSeconds: number;
  theme: TimerTheme;
};