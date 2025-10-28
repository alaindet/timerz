import type { ValidationErrors, ValidatorFn } from "./types";

export function createValidator(
  ...validatorFns: ValidatorFn[]
): ValidatorFn {
  return (value: any) => {
    let errors: ValidationErrors = {};

    for (const validatorFn of validatorFns) {
      const validatorErrors = validatorFn(value);
      if (validatorErrors !== null) {
        errors = { ...errors, ...validatorErrors };
      }
    }

    if (Object.keys(errors).length === 0) {
      return null;
    }

    return errors;
  };
}