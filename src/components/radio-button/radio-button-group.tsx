/*
 * TODO
 * - [ ] Implement the roving tabindex: the first or selected option has
 *   tabindex = 0, while other options have tabindex = -1 so that tabbing on the
 *   group only selects the first/selected. Then, moving arrows moves the focus
 *   programmatically to non-focusable options and the tabindex=0 "moves" through
 *   options (the selected is 0, others are -1)
 */
import { useCallback, type PropsWithChildren, Children, isValidElement } from 'react';

import './radio-button-group.css';
import { RadioButtonGroupContext, type RadioButtonGroupContextType } from './context';
import { __RadioButtonGroupTitle } from './radio-button-group-title';
import { __RadioButtonGroupOption } from './radio-button-group-option';

export type RadionButtonGroupProps = PropsWithChildren & {
  id: string;
  value?: string | null;
  onChange: (option: string) => void;
};

export function RadioButtonGroup({
  id,
  value = null,
  onChange,
  children,
}: RadionButtonGroupProps) {

  const select = useCallback(
    (newValue: string) => onChange(newValue),
    [onChange],
  );

  const context: RadioButtonGroupContextType = {
    id,
    titleId: `${id}-title`,
    select,
    value,
  };

  const flatChildren = Children.toArray(children);
  const titleChild = flatChildren.find(child => {
    return isValidElement(child) && child.type === __RadioButtonGroupTitle;
  });
  const optionsChildren = flatChildren.filter(child => {
    return isValidElement(child) && child.type === __RadioButtonGroupOption;
  });

  return (
    <RadioButtonGroupContext.Provider value={context}>
      <div
        className="radio-button-group"
        role="radiogroup"
        aria-labelledby={context.titleId}
      >
        {titleChild}
        <div className="radio-button-group__options">
          {optionsChildren}
        </div>
      </div>
    </RadioButtonGroupContext.Provider>
  );
}

RadioButtonGroup.Title = __RadioButtonGroupTitle;
RadioButtonGroup.Option = __RadioButtonGroupOption;