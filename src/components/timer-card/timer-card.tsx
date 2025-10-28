import { useCallback, useState } from 'react';

import { isTimerEmpty } from '../../functions';
import { type TimerConfig } from '../../types';
import { TimerCardDisplay } from '../timer-card-display/timer-card-display';
import { TimerCardForm } from '../timer-card-form/timer-card-form';

export type TimerCardProps = {
  config: TimerConfig;
  onUpdate: (timer: TimerConfig) => void;
  onRemove: (timerId: TimerConfig['id']) => void;
};

export function TimerCard(props: TimerCardProps) {
  const [isEditing, setIsEditing] = useState(isTimerEmpty(props.config));
  const [isMaximized, setIsMaximized] = useState(false);

  const onRemove = useCallback(
    () => props.onRemove(props.config.id),
    [props.config],
  );

  const handleStartEditing = useCallback(() => setIsEditing(true), []);
  const handleCancelEditing = useCallback(() => setIsEditing(false), []);
  const handleMaximizeSize = useCallback(() => setIsMaximized(true), []);
  const handleCompressSize = useCallback(() => setIsMaximized(false), []);

  const handleSaveTimer = useCallback((config: TimerConfig) => {
    props.onUpdate(config);
    setIsEditing(false);
  }, [props.onUpdate]);

  if (isEditing) {
    return (
      <TimerCardForm
        config={props.config}
        isMaximized={isMaximized}
        onMaximizeSize={handleMaximizeSize}
        onCompressSize={handleCompressSize}
        onCancelEditing={handleCancelEditing}
        onSave={handleSaveTimer}
        onRemove={onRemove}
      />
    );
  }

  return (
    <TimerCardDisplay
      config={props.config}
      isMaximized={isMaximized}
      onMaximizeSize={handleMaximizeSize}
      onCompressSize={handleCompressSize}
      onStartEditing={handleStartEditing}
      onRemove={onRemove}
    />
  );
}