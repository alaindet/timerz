import { useCallback, useMemo, useState, type ChangeEvent } from 'react';

import { createValidator, type ValidatorFn } from '../validators';

export type FormControlHookArgs<T extends any = any> = {
  id: string;
  initialValue: T;
  valueFn?: (rawValue: string) => T;
  validators?: ValidatorFn[];
};

export function useFormControl<T extends any = any>({
  id,
  initialValue,
  valueFn,
  validators = [],
}: FormControlHookArgs<T>) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const validator = useCallback(createValidator(...validators), [validators]);
  const errors = useMemo(() => validator(value), [value, validator]);
  const valid = useMemo(() => errors === null, [errors]);

  function onChange(event: ChangeEvent<any>) {
    setTouched(true);
    const value = valueFn
      ? valueFn(event.target.value)
      : (event.target.value as T);

    setValue(value);
  }

  function reset() {
    setValue(initialValue);
    setTouched(false);
  }

  function touch() {
    setTouched(true);
  }

  const hasError = useCallback(
    (key: string) => key in (errors ?? {}),
    [errors],
  );

  const hasAnyError = useCallback(
    (...keys: string[]) => {
      const errs = errors ?? {};
      
      for (const key of keys) {
        if (key in errs) {
          return true;
        }
      }

      return false;
    },
    [errors],
  );

  return {
    id,
    value,
    touched,
    errors,
    valid,

    onChange,
    hasError,
    hasAnyError,
    setValue,
    reset,
    touch,
  };
}