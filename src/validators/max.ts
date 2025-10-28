import type { ValidatorFn } from './types';

export function validateMax(threshold: number): ValidatorFn {
  return (value: any) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return {
        max: 'Value must be a number',
      };
    }

    if (value > threshold) {
      return {
        max: `Value must be less than ${threshold}`,
      };
    }

    return null;
  };
}