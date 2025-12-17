import { component$, QRL, type Signal } from '@qwik.dev/core';
import { steps, type StepKey } from '../steps';
import { transitionName } from '..';

interface MenuProps {
  onChange: QRL<(key: string) => any>;
  current: Signal<string>;
}

const getOptions = (question: StepKey) => {
  const step = steps[question];
  if (step.type === 'menu') return Object.entries(step.options);
  return [];
}

export default component$<MenuProps>(({ onChange, current }) => {
  return (
    <menu id="menu">
      {getOptions(current.value).map(([key, option]) => (
        <button key={key} style={transitionName(key)} onClick$={() => onChange(key)} role="menuitem">
          {option.label}
        </button>
      ))}
    </menu>
  );
});