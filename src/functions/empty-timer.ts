import { TIMER_THEME } from '../theme/theme';
import type { TimerConfig } from '../types/timer';

export function createEmptyTimer(): TimerConfig {
  return {
    id: String(Math.random()).slice(2),
    name: '',
    elapsedSeconds: 0,
    theme: { ...TIMER_THEME.transparent },
    minutes: 60,
  };
}

export function isTimerEmpty(timer: TimerConfig): boolean {
  return timer.name === '';
}