import { useCallback, useState } from 'react';

import type { Timer } from '../../types';
import { TimerCardForm } from '../timer-card-form/timer-card-form';
import { TimerCardDisplay } from '../timer-card-display/timer-card-display';
import { isTimerEmpty } from '../../functions';

export type TimerCardProps = {
  timer: Timer;
  onPlay: (timerId: Timer['id']) => void;
  onPause: (timerId: Timer['id']) => void;
  onSave: (timer: Timer) => void;
  onRemove: (timerId: Timer['id']) => void;
};

export function TimerCard({
  timer,
  onPlay,
  onPause,
  onSave,
  onRemove,
}: TimerCardProps) {
  const [isEditing, setIsEditing] = useState(isTimerEmpty(timer));

  const handleSaveTimer = useCallback((timer: Timer) => {
    onSave(timer);
    setIsEditing(false);
  }, [onSave, setIsEditing]);

  if (isEditing) {
    return (
      <TimerCardForm
        timer={timer}
        onSave={handleSaveTimer}
        onRemove={onRemove}
      />
    );
  }

  return (
    <TimerCardDisplay
      timer={timer}
      onPlay={onPlay}
      onPause={onPause}
      onRemove={onRemove}
    />
  );
}