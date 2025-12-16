import { component$, QRL, useStyles$, type Signal } from '@qwik.dev/core';
import { Answer } from '..';
import { steps } from '../steps';
import { Option } from '../steps';
import { StepKey } from '..';
import { transitionName } from '..';
import styles from '../index.css?inline';

interface MenuProps {
  add: QRL<(option: Option) => any>;
  current: Signal<string>;
}

const getOption = (answer: Answer) => {
  const step = steps[answer.question];
  if (step.type === 'menu') {
    return step.props.options[answer.option];
  }
}
const getOptions = (question: StepKey) => {
  const step = steps[question];
  if (step.type === 'menu') return Object.entries(step.props.options);
  return [];
}

export default component$<MenuProps>(({ add, current }) => {
  useStyles$(styles);
  return (
    <menu id="menu">
      {getOptions(current.value).map(([key, option]) => (
        <button key={key} style={transitionName(key)} onClick$={() => add(option)} role="menuitem">
          {option.label}
        </button>
      ))}
    </menu>
  );
});