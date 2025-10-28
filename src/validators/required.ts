import type { ValidationErrors } from './types';

export function validateRequired(value: any): ValidationErrors | null {
  if (value === null || value === undefined || value === '') {
    return {
      required: true,
    };
  }

  return null;
}