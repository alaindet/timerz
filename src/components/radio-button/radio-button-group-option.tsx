import { useContext, type PropsWithChildren } from 'react';

import { RadioButtonGroupContext } from './context';

export type RadioButtonGroupOptionProps = PropsWithChildren & {
  id: string;
  value: string,
};

export function __RadioButtonGroupOption({
  id,
  value,
  children
}: RadioButtonGroupOptionProps) {
  const context = useContext(RadioButtonGroupContext)!;

  const ariaChecked = context.value === value ? 'true' : 'false';
  const parentId = context.id;
  const optionId = `${parentId}-${id}`;

  function handleSelectOption() {
    context.select(value);
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={ariaChecked}
      tabIndex={0}
      id={optionId}
      className="radio-button-group__option"
      onClick={handleSelectOption}
    >
      {children}
    </button>
  );
}