import { component$, QRL } from '@qwik.dev/core';
import type { Step } from '../steps';
import { transitionName } from '..';

interface MenuProps {
  onChange: QRL<(value: string) => void>;
  step: Step;
}

export default component$<MenuProps>(({ onChange, step }) => {
  return (
    <menu id="menu">
      {Object.entries(step.options).map(([key, option]) => (
        <button key={key} style={transitionName(key)} onClick$={() => onChange(key)} role="menuitem">
          {option.label}
        </button>
      ))}
    </menu>
  );
});