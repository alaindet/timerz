import { useCallback, useEffect, useMemo, type FormEvent } from 'react';
import { FaCompress, FaExpand, FaFloppyDisk, FaTrashCan, FaXmark } from 'react-icons/fa6';
import clsx from 'clsx';

import { useFormControl } from '../../hooks';
import { TIMER_THEME } from '../../theme/theme';
import type { TimerConfig, TimerTheme } from '../../types';
import { validateFlag, validateMax, validateMaxLength, validateMin, validateMinLength, validateRequired } from '../../validators';
import { RadioButtonGroup } from '../radio-button/radio-button-group';
import './timer-card-form.css';
import { parseDuration } from '../../functions';

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

  const themeControl = useFormControl({
    id: 'theme',
    initialValue: config.theme.value,
    validators: [
      validateRequired,
    ],
  });

  const preserveElapsedControl = useFormControl({
    id: 'preserveEnabled',
    initialValue: true,
    validators: [
      validateRequired,
      validateFlag,
    ],
  });

  const handleThemeControlChange = useCallback(
    (option: string) => themeControl.setValue(option),
    [themeControl],
  );

  const isValid = useMemo(() => (
    nameControl.valid &&
    minutesControl.valid &&
    themeControl.valid &&
    preserveElapsedControl.valid
  ), [
    nameControl.valid,
    minutesControl.valid,
    themeControl.valid,
    preserveElapsedControl.valid,
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

    const theme: TimerTheme = TIMER_THEME[themeControl.value];

    console.log('debug form', {
      preserve: preserveElapsedControl.value,
      elapsedBefore: config.elapsedSeconds,
      elapsedAfter: preserveElapsedControl.value ? config.elapsedSeconds : 0,
    });

    const newConfig: TimerConfig = {
      id: config.id,
      name: nameControl.value,
      minutes: +minutesControl.value,
      elapsedSeconds: preserveElapsedControl.value
        ? config.elapsedSeconds
        : 0,
      theme,
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
            <label htmlFor={'field-name-' + config.id}>Name</label>
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
            <label htmlFor={'field-minutes-' + config.id}>Minutes</label>
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
                Must be between 1 and 240
              </div>
            )}
          </div>

        </div>
        {config.elapsedSeconds > 0 && (
          <div className="form-control-rows">

            {/* Flag: Preseve elapsed time */}
            <div className="form-control">
              <label
                htmlFor={'field-preserve-elapsed-' + config.id}
                className="checkbox"
              >
                <input
                  type="checkbox"
                  id="field-preserve-elapsed"
                  checked={preserveElapsedControl.value}
                  onChange={preserveElapsedControl.onToggle}
                />
                <span className="checkbox-label" onClick={preserveElapsedControl.onToggle}>
                  Preserve elapsed time?
                  ({parseDuration.natural(config.elapsedSeconds)})
                </span>
              </label>

              {(
                preserveElapsedControl.touched &&
                preserveElapsedControl.hasError('required')
              ) && (
                <div className="error-message">
                  Required
                </div>
              )}

              {(
                preserveElapsedControl.touched &&
                preserveElapsedControl.hasError('flag')
              ) && (
                <div className="error-message">
                  Must be a boolean flag
                </div>
              )}
            </div>

          </div>
        )}
        <div className="form-controls-row">

          {/* Theme */}
          <div className="form-control">
            <RadioButtonGroup
              id={'field-color-' + config.id}
              value={themeControl.value}
              stacked
              onChange={handleThemeControlChange}
            >
              <RadioButtonGroup.Title>
                <label htmlFor="field-theme">Theme</label>
              </RadioButtonGroup.Title>
              {Object.entries(TIMER_THEME).map(([key, theme]) => (
                <RadioButtonGroup.Option
                  key={key + config.id}
                  id={key + config.id}
                  value={key}
                  className="color-option"
                >
                  <div className="color-option-swatch" style={{
                    backgroundColor: theme.cssBackground,
                    color: theme.cssText,
                  }}>42</div>
                  {theme.label}
                </RadioButtonGroup.Option>
              ))}
            </RadioButtonGroup>

            {(
              themeControl.touched &&
              themeControl.hasError('required')
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