import type { TimerConfig, TimerTheme } from '../types/timer';

const EMPTY_TIMER_THEME: TimerTheme = {
  value: '',
  label: '',
  cssBackground: '',
  cssText: '',
};

export function createEmptyTimer(): TimerConfig {
  return {
    id: String(Math.random()).slice(2),
    name: '',
    theme: { ...EMPTY_TIMER_THEME },
    minutes: 0,
  };
}

export function isTimerEmpty(timer: TimerConfig): boolean {
  return (
    timer.name === '' &&
    timer.theme.value === EMPTY_TIMER_THEME.value &&
    timer.minutes === 0
  );
}