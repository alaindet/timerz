import { useContext, type PropsWithChildren } from 'react';
import clsx from 'clsx';

import { RadioButtonGroupContext } from './context';

export type RadioButtonGroupOptionProps = PropsWithChildren & {
  id: string;
  value: string;
  style?: Object;
  className?: string;
};

export function __RadioButtonGroupOption({
  id,
  value,
  children,
  style,
  className,
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
      style={style}
      aria-checked={ariaChecked}
      tabIndex={0}
      id={optionId}
      className={clsx('radio-button-group__option', className)}
      onClick={handleSelectOption}
    >
      {children}
    </button>
  );
}