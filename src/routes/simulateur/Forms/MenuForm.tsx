import { $, component$, QRL, type Signal } from '@qwik.dev/core';
import { Answer } from '..';
import { steps } from '../steps';
import { Option } from '../steps';
import { StepKey } from '..';
import { transitionName } from '..';

interface MenuProps {
  add: QRL<(answer: Answer, nextOption?: string) => any>;
  current: Signal<string>;
}

const getOptions = (question: StepKey) => {
  const step = steps[question];
  if (step.type === 'menu') return Object.entries(step.props.options);
  return [];
}

export default component$<MenuProps>(({ add, current }) => {

  const addAnswer = $((option: Option) => {
    const answer: Answer = {
      question: current.value,
      option: option.key,
    };
    add(answer, option.next);
  });

  return (
    <menu id="menu">
      {getOptions(current.value).map(([key, option]) => (
        <button key={key} style={transitionName(key)} onClick$={() => addAnswer(option)} role="menuitem">
          {option.label}
        </button>
      ))}
    </menu>
  );
});