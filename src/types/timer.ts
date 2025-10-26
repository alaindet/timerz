export type TimerConfig = {
  name: string;
  minutes: number;
  color: string;
};

export type TimerState = {
  id: string;
  elapsedSeconds: number;
  isRunning: boolean;
};

export type Timer = TimerConfig & TimerState;