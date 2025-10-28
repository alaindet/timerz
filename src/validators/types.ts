export type ValidationErrors = {
  [key: string]: any;
};

export type ValidatorFn = (value: any) => ValidationErrors | null;