import type { SevenSegmentsValue, SevenSegmentsState, SevenSegmentsName } from './types';

export const SEVEN_SEGMENTS_NAMES: SevenSegmentsName[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
] as const;

export const SEVEN_SEGMENTS_VALUE_TO_STATE: Record<
  SevenSegmentsValue,
  SevenSegmentsState
> = {
  [-1]: [false, false, false, false, false, false, false],
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
} as const;

// Segments are named as of
// https://en.wikipedia.org/wiki/Seven-segment_display
// Assumed a 200x320 viewbox
export const SEGMENT_SVG_PATHS: Record<SevenSegmentsName, string> = {
  // Top horizontal (a)
  a: 'M 20 20 L 40 0 L 160 0 L 180 20 L 160 40 L 40 40 Z',

  // Top right vertical (b)
  b: 'M 180 20 L 200 40 L 200 40 L 200 140 L 180 160 L 160 140 L 160 40 Z',

  // Bottom right vertical (c)
  c: 'M 180 160 L 200 180 L 200 280 L 180 300 L 160 280 L  160 180 Z',

  // Bottom horizontal (d)
  d: 'M 180 300 L 160 320 L 40 320 L 20 300 L 40 280 L 160 280 Z',

  // Bottom left vertical (e)
  e: 'M 20 300 L 0 280 L 0 180 L 20 160 L 40 180 L 40 280 Z',

  // Top left vertical (f)
  f: 'M 20 160 L 0 140 L 0 40 L 20 20 L 40 40 L 40 140 Z',

  // Middle horizontal (g)
  g: 'M 20 160 L 40 140 L 160 140 L 180 160 L 160 180 L 40 180 Z',
} as const;