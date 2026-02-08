import type { TimerTheme } from '../types';

export const TIMER_THEME: Record<string, TimerTheme> = {
  red: {
    value: 'red',
    label: 'Red',
    cssBackground: '#d51212',
    cssText: '#ffffff',
  },
  green: {
    value: 'green',
    label: 'Green',
    cssBackground: '#116925',
    cssText: '#ffffff',
  },
  blue: {
    value: 'blue',
    label: 'Blue',
    cssBackground: '#1738a7',
    cssText: '#ffffff',
  },
  orange: {
    value: 'orange',
    label: 'Orange',
    cssBackground: '#e16d00',
    cssText: '#ffffff',
  },
  killBill: {
    value: 'killBill',
    label: 'Kill Bill',
    cssBackground: '#000000',
    cssText: '#eadd21',
  },
  watch: {
    value: 'watch',
    label: 'Watch',
    cssBackground: '#aab59d',
    cssText: '#101209',
  },
  alarm: {
    value: 'alarm',
    label: 'Alarm',
    cssBackground: '#200c0c',
    cssText: '#ff244c',
  },
  matrix: {
    value: 'matrix',
    label: 'Matrix',
    cssBackground: '#020703',
    cssText: '#3edf3b',
  },
  transparent: {
    value: 'transparent',
    label: 'Transparent',
    cssBackground: 'var(--tmz-color-background)',
    cssText: 'var(--tmz-color-text)',
  },
} as const;