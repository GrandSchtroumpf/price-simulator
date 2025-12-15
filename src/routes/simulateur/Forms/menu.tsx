import { component$, type QRL } from '@qwik.dev/core';
import { Option } from '../steps';

interface MenuProps {
  options: [string, Option][];
  onSelect$: QRL<(option: Option) => void>;
}

export default component$<MenuProps>(({ options, onSelect$ }) => {
  return (
    <menu id="menu">
      {options.map(([key, option]) => (
        <button
          key={key}
          onClick$={() => onSelect$(option)}
          role="menuitem"
        >
          {option.label}
        </button>
      ))}
    </menu>
  );
});