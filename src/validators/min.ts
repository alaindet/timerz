import type { ValidatorFn } from './types';

export function validateMin(threshold: number): ValidatorFn {
  return (value: any) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return {
        min: 'Value must be a number',
      };
    }

    if (value < threshold) {
      return {
        min: `Value must be greater than ${threshold}`,
      };
    }

    return null;
  };
}