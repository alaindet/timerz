import clsx from 'clsx';
import { useCallback, useState } from 'react';

import { createEmptyTimer } from '../../functions';
import type { TimerConfig } from '../../types';
import { TimerCardEmpty } from '../timer-card-empty/timer-card-empty';
import { TimerCard } from '../timer-card/timer-card';
import './app-timers.css';

export type AppTimersProps = {
  max: number;
};

export function AppTimers({
  max,
}: AppTimersProps) {
  const [timers, setTimers] = useState<TimerConfig[]>([]);

  const handleCreateEmptyTimer = useCallback(() => {
    setTimers(prev => [...prev, createEmptyTimer()]);
  }, [timers]);

  const handleRemoveTimer = useCallback((timerId: TimerConfig['id']) => {
    setTimers(prev => prev.filter(t => t.id !== timerId));
  }, []);

  const handleUpdateTimer = useCallback((timer: TimerConfig) => {
    setTimers(prev => prev.map(t => t.id === timer.id ? timer : t));
  }, []);

  return (
    <div className={clsx(
      'app-timers',
      { '--one-child': timers.length <= 1 },
    )}>
      {timers.map(timer => (
        <TimerCard
          key={timer.id}
          config={timer}
          onUpdate={handleUpdateTimer}
          onRemove={handleRemoveTimer}
        />
      ))}

      {timers.length < max && (
        <TimerCardEmpty onClick={handleCreateEmptyTimer} />
      )}
    </div>
  );
}
