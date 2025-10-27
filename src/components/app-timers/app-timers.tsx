import { useState } from 'react';
import clsx from 'clsx';

import './app-timers.css';
import type { Timer } from '../../types';
import { TimerCardEmpty } from '../timer-card-empty/timer-card-empty';
import { createEmptyTimer } from '../../functions';
import { TimerCard } from '../timer-card/timer-card';

export type AppTimersProps = {
  max: number;
};

export function AppTimers({
  max,
}: AppTimersProps) {
  const [timers, setTimers] = useState<Timer[]>([
    {
      name: 'Magic',
      minutes: 60,
      color: 'Green',
      id: '123456789',
      elapsedSeconds: 0,
      isRunning: false,
    },
  ]);

  function handleCreateTimer() {
    if (timers.length >= max) return;
    const timer = createEmptyTimer();
    setTimers(prev => [...prev, timer]);
  }

  function handleRemoveTimer(timerId: Timer['id']) {
    console.log('handleRemoveTimer', timerId);
    setTimers(prev => prev.filter(t => t.id === timerId));
  }

  function handleUpdateTimer(timer: Timer) {
    console.log('handleUpdateTimer', timer);
    setTimers(prev => prev.map(t => t.id === timer.id ? timer : t));
  }

  function handlePlayTimer(timerId: Timer['id']) {
    console.log('handlePlayTimer', timerId);
  }

  function handlePauseTimer(timerId: Timer['id']) {
    console.log('handlePauseTimer', timerId);
  }

  function handleSaveTimer(timer: Timer) {
    console.log('handleSaveTimer', timer);
  }

  return (
    <div className={clsx(
      'app-timers',
      { '--one-child': timers.length === 1 },
    )}>

      {timers.map(timer => (
        <TimerCard
          key={timer.id}
          timer={timer}
          onPlay={handlePlayTimer}
          onPause={handlePauseTimer}
          onSave={handleSaveTimer}
          onRemove={handleRemoveTimer}
        />
      ))}

      {timers.length < max && (
        <TimerCardEmpty onClick={handleCreateTimer} />
      )}
    </div>
  );
}