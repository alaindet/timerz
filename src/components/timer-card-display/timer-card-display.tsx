import { useEffect, useMemo, useRef, useState } from 'react';
import { FaCompress, FaExpand, FaPause, FaPen, FaPlay, FaTrashCan } from 'react-icons/fa6';
import clsx from 'clsx';

import { splitDigits } from '../../functions';
import type { TimerConfig } from '../../types';
import { SevenSegmentsDigit } from '../seven-segments-digit/seven-segments-digit';
import './timer-card-display.css';

export type TimerCardDisplayProps = {
  config: TimerConfig;
  isMaximized: boolean;
  onMaximizeSize: () => void;
  onCompressSize: () => void;
  onStartEditing: () => void;
  onRemove: () => void;
};

export function TimerCardDisplay({
  config,
  isMaximized,
  onMaximizeSize,
  onCompressSize,
  onStartEditing,
  onRemove,
}: TimerCardDisplayProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isExpired = useMemo(() => {
    const totalSeconds = config.minutes * 60;
    return totalSeconds - elapsed <= 0;
  }, [config, elapsed]);

  function handlePause() {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
    }
    setIsRunning(false);
  }

  function handlePlay() {
    setIsRunning(true);
  }

  useEffect(function startTimer() {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsed(prev => prev + 1)
      }, 1_000);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  useEffect(function timerExpired() {
    const totalSeconds = config.minutes * 60;
    if (elapsed >= totalSeconds) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    }
  }, [config, elapsed]);

  const digits = useMemo(() => {
    const totalSeconds = config.minutes * 60;
    const currentSeconds = totalSeconds - elapsed;

    if (currentSeconds <= 0) {
      return {
        minutes: [0, 0],
        seconds: [0, 0],
      };
    }

    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds - minutes * 60;

    return {
      minutes: splitDigits(minutes),
      seconds: splitDigits(seconds),
    };
  }, [config, elapsed]);

  const cssStyle = useMemo(() => {
    const color = config.color.toLowerCase();
    const cssBackground = `var(--tmz-color-${color})`;
    const cssText = `var(--tmz-color-${color}-text)`;

    return {
      backgroundColor: cssBackground,
      color: cssText,
      '--seven-segments-digit-background': cssBackground,
      '--seven-segments-digit-on': cssText,
      '--seven-segments-digit-off': cssText,
      '--seven-segments-digit-off-opacity': 0.07,
    };
  }, [config]);

  return (
    <div
      style={cssStyle}
      className={clsx({
        'timer-card-display': true,
        '--maximize-timer': isMaximized,
        '--running': isRunning,
        '--expired': isExpired,
      })}
    >
      <div className="timer-card-display__header">

        {/* Button: Remove */}
        <button type="button" onClick={onRemove}>
          <FaTrashCan /> Remove
        </button>

        {/* Button: Toggle size */}
        {isMaximized ? (
          <button type="button" onClick={onCompressSize}>
            <FaCompress /> Compress
          </button>
        ) : (
          <button type="button" onClick={onMaximizeSize}>
            <FaExpand /> Maximize
          </button>
        )}

        {/* Button: Edit */}
        <button type="button" onClick={onStartEditing}>
          <FaPen /> Edit
        </button>

        {/* Button: Play/Pause */}
        {isRunning ? (
          <button type="button" onClick={handlePause}>
            <FaPause /> Pause
          </button>  
        ): (
          <button type="button" onClick={handlePlay}>
            <FaPlay /> Play
          </button>
        )}
      </div>
      <div className="timer-card-display__content">
        <h2 className="timer-card-display__title">{config.name}</h2>
        <div className="timer-card-display__digits">
          {digits.minutes.map((digit, index) => (
            <SevenSegmentsDigit key={index} value={digit} />
          ))}
          
          <div className="timer-card-display__digits-separator">:</div>

          {digits.seconds.map((digit, index) => (
            <SevenSegmentsDigit key={index} value={digit} />
          ))}
        </div>
      </div>
    </div>
  );
}