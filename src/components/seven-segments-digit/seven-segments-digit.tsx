import type { SevenSegmentsSegmentState, SevenSegmentsValue } from './types';
import { SEVEN_SEGMENTS_NAMES, SEVEN_SEGMENTS_VALUE_TO_STATE, SEGMENT_SVG_PATHS } from './constants';
import './seven-segments-digit.css';

export type SevenSegmentDigitProps = {
  value?: number;
  gap?: number; // Pixels
};

export function SevenSegmentsDigit({
  value = -1,
  gap = 8,
}: SevenSegmentDigitProps) {

  if (isNaN(value) || value < -1 || value > 9) {
    throw new Error('Provide a 1-digit number');
  }

  const _value = value as SevenSegmentsValue;

  const paths = SEVEN_SEGMENTS_VALUE_TO_STATE[_value]
    .map((isActive: boolean, index: number) => {
      const name = SEVEN_SEGMENTS_NAMES[index];
      const path = SEGMENT_SVG_PATHS[name];
      return { name, path, isActive };
    }) as SevenSegmentsSegmentState[];

  return (
    <div className="seven-segments-digit">
      <svg viewBox="0 0 200 320">
        {paths.map(({ name, path, isActive }) => (
          <path
            key={name}
            d={path}
            data-digital-segment
            data-state={isActive ? 'on' : 'off'}
            fill="white"
            stroke="black"
            strokeWidth={gap}
          />
        ))}
      </svg>
    </div>
  );
}