import type { SevenSegmentsSegmentState, SevenSegmentsValue } from './types';
import { SEVEN_SEGMENTS_NAMES, SEVEN_SEGMENTS_VALUE_TO_STATE, SEGMENT_SVG_PATHS } from './constants';

export type SevenSegmentDigitProps = {
  value?: number;
  colorBackground?: string;
  colorOn?: string;
  colorOff?: string;
};

export function SevenSegmentsDigit({
  value = -1,
  colorBackground = '#ffffff',
  colorOn = '#000000',
  colorOff = '#f0f0f0',
}: SevenSegmentDigitProps) {

  if (isNaN(value) || value < -1 || value > 9) {
    throw new Error('Provide a 1-digit number');
  }

  const _value = value as SevenSegmentsValue;

  const paths = SEVEN_SEGMENTS_VALUE_TO_STATE[_value]
    .map((isActive: boolean, index: number) => {
      const name = SEVEN_SEGMENTS_NAMES[index];
      const path = SEGMENT_SVG_PATHS[name];
      return {
        name,
        path,
        color: isActive ? colorOn : colorOff,
      };
    }) as SevenSegmentsSegmentState[];

  return (
    <div>
      <svg viewBox="0 0 200 320">
        {paths.map(({ name, path, color }) => (
          <path
            key={name}
            d={path}
            fill={color}
            stroke={colorBackground}
            strokeWidth="8"
          />
        ))}
      </svg>
    </div>
  );
}