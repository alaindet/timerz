import { CgMathPlus } from 'react-icons/cg';

import './timer-card-empty.css';

export type TimerCardEmptyProps = {
  onClick: () => void;
};

export function TimerCardEmpty({
  onClick
}: TimerCardEmptyProps) {
  return (
    <div className="timer-card-empty">
      <h2 id="timer-card-empty-title">
        Create New Timer
      </h2>
      <button
        type="button"
        aria-labelledby="timer-card-empty-title"
        onClick={onClick}
      >
        <CgMathPlus size="3rem" />
      </button>
    </div>
  );
}