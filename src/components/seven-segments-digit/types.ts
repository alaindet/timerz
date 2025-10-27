export type SevenSegmentsValue = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SevenSegmentsName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export type SevenSegmentsState = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
];

export type SevenSegmentsSegmentState = {
  name: SevenSegmentsName;
  path: string;
  color: string;
};