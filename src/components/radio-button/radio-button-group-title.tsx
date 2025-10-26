import { useContext, type PropsWithChildren } from 'react';

import { RadioButtonGroupContext } from './context';

export type RadioButtonGroupTitleProps = PropsWithChildren;

export function __RadioButtonGroupTitle({
  children,
}: RadioButtonGroupTitleProps) {
  const context = useContext(RadioButtonGroupContext)!;

  return (
    <div
      className="radio-button-group__title"
      id={context.titleId}
    >
      {children}
    </div>
  );
}