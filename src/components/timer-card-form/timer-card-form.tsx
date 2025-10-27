import { FaTrashCan } from 'react-icons/fa6';

import type { Timer } from '../../types';
import './timer-card-form.css';
import { useReducer, type ChangeEvent, type FormEvent } from 'react';

type TimerCardFormValue = {
  name: string;
  minutes: number;
  color: string;
};

export type TimerCardFormProps = {
  timer: Timer;
  onSave: (timer: Timer) => void;
  onRemove: (timerId: Timer['id']) => void;
};

export function TimerCardForm({
  timer,
  onSave,
  onRemove,
}: TimerCardFormProps) {

  const formInitialValue: TimerCardFormValue = {
    name: timer.name,
    minutes: timer.minutes,
    color: timer.color,
  };

  const [state, dispatch] = useReducer<TimerCardFormValue, any>(
    formReducer,
    formInitialValue,
  );

  function formReducer(state: TimerCardFormValue, action: any) {
    return {
      ...state,
      [action.controlName as keyof TimerCardFormValue]: action.value,
    };
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  function handleUpdateNameControl(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as string;
    dispatch({ controlName: 'name', value });
  }

  function handleUpdateMinutesControl(event: ChangeEvent<HTMLInputElement>) {
    const _value = event.target.value as string;
    const value = parseInt(_value);
    dispatch({ controlName: 'minutes', value });
  }

  function handleUpdateColorControl(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as string;
    dispatch({ controlName: 'color', value });
  }

  return (
    <div className="timer-form-card">
      <div className="timer-form-card__header">
        <button type="button" onClick={() => onRemove(timer.id)}>
          <FaTrashCan /> Remove
        </button>
      </div>
      <form
        className="timer-form-card__form"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="form-control">
          <label htmlFor="field-name">Name</label>
          <input
            type="text"
            id="field-name"
            value={state.name}
            onChange={handleUpdateNameControl}
            placeholder="Name..."
            required
          />
        </div>

        {/* Minutes */}
        <div className="form-control">
          <label htmlFor="field-minutes">Minutes</label>
          <input
            type="number"
            id="field-minutes"
            value={state.minutes}
            onChange={handleUpdateMinutesControl}
            placeholder="Minutes..."
            required
            min={1}
            max={99}
          />
        </div>

        {/* TODO: Color */}
        <div className="form-control">
          <label htmlFor="field-color">Color</label>
          <input
            type="text"
            id="field-color"
            value={state.color}
            onChange={handleUpdateColorControl}
            placeholder="Color..."
            required
          />
        </div>
      </form>
    </div>
  );
}