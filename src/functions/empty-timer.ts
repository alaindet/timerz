import type { Timer } from '../types/timer';

export function createEmptyTimer(): Timer {
  return {
    id: String(Math.random()).slice(2),
    name: '',
    color: '',
    minutes: 0,
    elapsedSeconds: 0,
    isRunning: false,
  };
}

export function isTimerEmpty(timer: Timer): boolean {
  return (
    timer.name === '' &&
    timer.color === '' &&
    timer.minutes === 0 &&
    timer.elapsedSeconds === 0 &&
    timer.isRunning === false
  );
}