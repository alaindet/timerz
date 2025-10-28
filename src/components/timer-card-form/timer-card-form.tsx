import { useCallback, useMemo, type FormEvent } from 'react';
import { FaCompress, FaExpand, FaFloppyDisk, FaTrashCan, FaXmark } from 'react-icons/fa6';
import clsx from 'clsx';

import { useFormControl } from '../../hooks';
import { THEME_COLOR_NAME } from '../../theme/color';
import type { TimerConfig } from '../../types';
import { validateMax, validateMaxLength, validateMin, validateMinLength, validateRequired } from '../../validators';
import { RadioButtonGroup } from '../radio-button/radio-button-group';
import './timer-card-form.css';

export type TimerCardFormProps = {
  config: TimerConfig;
  isMaximized: boolean;
  onMaximizeSize: () => void;
  onCompressSize: () => void;
  onCancelEditing: () => void;
  onSave: (config: TimerConfig) => void;
  onRemove: () => void;
};

export function TimerCardForm({
  config,
  isMaximized,
  onMaximizeSize,
  onCompressSize,
  onCancelEditing,
  onSave,
  onRemove,
}: TimerCardFormProps) {

  const nameControl = useFormControl({
    id: 'name',
    initialValue: config.name,
    validators: [
      validateRequired,
      validateMinLength(3),
      validateMaxLength(100),
    ],
  });

  const minutesControl = useFormControl({
    id: 'minutes',
    initialValue: config.minutes,
    valueFn: (rawValue: string) => {
      const parsed = parseInt(rawValue);
      return isNaN(parsed) ? '' : parsed;
    },
    validators: [
      validateRequired,
      validateMin(1),
      validateMax(240),
    ],
  });

  const colorControl = useFormControl({
    id: 'color',
    initialValue: config.color,
    validators: [
      validateRequired,
    ],
  });

  const handleColorControlChange = useCallback(
    (option: string) => colorControl.setValue(option),
    [colorControl],
  );

  const isValid = useMemo(() => (
    nameControl.valid &&
    minutesControl.valid &&
    colorControl.valid
  ), [
    nameControl.valid,
    minutesControl.valid,
    colorControl.valid,
  ]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    handleSaveTimer();
  }

  function handleSaveTimer() {
    if (!isValid) {
      return;
    }

    const newConfig: TimerConfig = {
      id: config.id,
      name: nameControl.value,
      minutes: +minutesControl.value,
      color: colorControl.value,
    };

    onSave(newConfig);
  }

  return (
    <div className={clsx(
      'timer-card-form',
      { '--maximize-timer': isMaximized },
    )}>
      <div className="timer-card-form__header">
        <div className="timer-card-form__buttons">

          {/* Button: Remove */}
          <button type="button" onClick={onRemove}>
            <FaTrashCan /> Remove
          </button>

          {/* Button: Toggle size */}
          {isMaximized ? (
            <button type="button" onClick={onCompressSize}>
              <FaCompress /> Compress
            </button>
          ) : (
            <button type="button" onClick={onMaximizeSize}>
              <FaExpand /> Maximize
            </button>
          )}

          {/* Button: Cancel */}
          <button type="button" onClick={onCancelEditing}>
            <FaXmark /> Cancel
          </button>

          {/* Button: Save */}
          <button
            type="button"
            onClick={handleSaveTimer}
            disabled={!isValid}
          >
            <FaFloppyDisk /> Save
          </button>
        </div>

      </div>

      <form
        className="timer-card-form__form"
        onSubmit={handleSubmit}
      >
        <div className="form-controls-row">

          {/* Name */}
          <div className="form-control">
            <label htmlFor="field-name">Name</label>
            <input
              type="text"
              id="field-name"
              value={nameControl.value}
              onChange={nameControl.onChange}
              placeholder="Name..."
            />

            {(
              nameControl.touched &&
              nameControl.hasError('required')
            ) && (
              <div className="error-message">
                Required
              </div>
            )}

            {(
              nameControl.touched &&
              nameControl.hasAnyError('minLength', 'maxLength')
            ) && (
              <div className="error-message">
                Must be between 3 and 100 characters long
              </div>
            )}
          </div>

          {/* Minutes */}
          <div className="form-control">
            <label htmlFor="field-minutes">Minutes</label>
            <input
              type="number"
              id="field-minutes"
              value={minutesControl.value}
              onChange={minutesControl.onChange}
              placeholder="Minutes..."
            />

            {(
              minutesControl.touched &&
              minutesControl.hasError('required')
            ) && (
              <div className="error-message">
                Required
              </div>
            )}

            {(
              minutesControl.touched &&
              minutesControl.hasAnyError('min', 'max')
            ) && (
              <div className="error-message">
                Must be between 1 and 120
              </div>
            )}
          </div>

        </div>
        <div className="form-controls-row">

          {/* TODO: Color */}
          <div className="form-control">
            <RadioButtonGroup
              id="field-color"
              value={colorControl.value}
              stacked
              onChange={handleColorControlChange}
            >
              <RadioButtonGroup.Title>
                <label htmlFor="field-color">Color</label>
              </RadioButtonGroup.Title>
              {Object.values(THEME_COLOR_NAME).map(color => (
                <RadioButtonGroup.Option
                  key={color}
                  id={color}
                  value={color}
                  className="color-option"
                >
                  <div
                    className="color-option-swatch"
                    style={{
                      '--_color-bg': `var(--tmz-color-${color.toLowerCase()})`,
                    }}
                  ></div>
                  {color}
                </RadioButtonGroup.Option>
              ))}
            </RadioButtonGroup>

            {(
              colorControl.touched &&
              colorControl.hasError('required')
            ) && (
              <div className="error-message">
                Required
              </div>
            )}
          </div>

        </div>
      </form>
    </div>
  );
}
