import type { ValidationErrors } from './types';

export function validateFlag(value: any): ValidationErrors | null {

  if (typeof value !== 'boolean') {
    return {
      flag: 'not a boolean value',
    };
  }

  return null;
}