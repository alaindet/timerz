import type { ValidatorFn } from './types';

export function validateMinLength(threshold: number): ValidatorFn {
  return (value: any) => {
    if (typeof value !== 'string') {
      return {
        minLength: 'Value must be a string',
      };
    }

    if (value.length < threshold) {
      return {
        minLength: `Length must be greater than ${threshold}`,
      };
    }

    return null;
  };
}