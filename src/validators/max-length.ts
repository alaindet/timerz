import type { ValidatorFn } from './types';

export function validateMaxLength(threshold: number): ValidatorFn {
  return (value: any) => {
    if (typeof value !== 'string') {
      return {
        maxLength: 'Value must be a string',
      };
    }

    if (value.length > threshold) {
      return {
        maxLength: `Length must be less than ${threshold}`,
      };
    }

    return null;
  };
}