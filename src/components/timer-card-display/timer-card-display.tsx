import { useMemo } from 'react';
import { FaPause, FaPlay, FaTrashCan } from 'react-icons/fa6';

import { splitDigits } from '../../functions/split-digits';
import type { Timer } from '../../types';
import { SevenSegmentsDigit } from '../seven-segments-digit/seven-segments-digit';
import './timer-card-display.css';

export type TimerCardDisplayProps = {
  timer: Timer;
  onPlay: (timerId: Timer['id']) => void;
  onPause: (timerId: Timer['id']) => void;
  onRemove: (timerId: Timer['id']) => void;
};

export function TimerCardDisplay({
  timer,
  onPlay,
  onPause,
  onRemove,
}: TimerCardDisplayProps) {
  const digits = useMemo(() => {
    const totalSeconds = timer.minutes * 60;
    const currentSeconds = totalSeconds - timer.elapsedSeconds;
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    return [...splitDigits(minutes), ...splitDigits(seconds)];
  }, [timer]);

  return (
    <div className="timer-card-display">
      <div className="timer-card-display__header">
        <button type="button" onClick={() => onRemove(timer.id)}>
          <FaTrashCan /> Remove
        </button>

        {timer.isRunning ? (
          <button type="button" onClick={() => onPause(timer.id)}>
            <FaPause /> Pause
          </button>  
        ): (
          <button type="button" onClick={() => onPlay(timer.id)}>
            <FaPlay /> Play
          </button>
        )}
      </div>
      <div className="timer-card-display__content">
        <h2 className="timer-card-display__title">{timer.name}</h2>
        <div className="timer-card-display__digits">
          <SevenSegmentsDigit
            value={digits[0]}
            colorBackground={'#000000'}
            colorOn={'#ffffff'}
            colorOff="#000000"
          />
          <SevenSegmentsDigit
            value={digits[1]}
            colorBackground={'#000000'}
            colorOn={'#ffffff'}
            colorOff="#000000"
          />
          <span className="timer-card-display__digits-separator">:</span>
          <SevenSegmentsDigit
            value={digits[2]}
            colorBackground={'#000000'}
            colorOn={'#ffffff'}
            colorOff="#000000"
          />
          <SevenSegmentsDigit
            value={digits[3]}
            colorBackground={'#000000'}
            colorOn={'#ffffff'}
            colorOff="#000000"
          />
        </div>
      </div>
    </div>
  );
}