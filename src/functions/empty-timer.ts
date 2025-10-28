import type { TimerConfig } from '../types/timer';

export function createEmptyTimer(): TimerConfig {
  return {
    id: String(Math.random()).slice(2),
    name: '',
    color: '',
    minutes: 0,
  };
}

export function isTimerEmpty(timer: TimerConfig): boolean {
  return (
    timer.name === '' &&
    timer.color === '' &&
    timer.minutes === 0
  );
}