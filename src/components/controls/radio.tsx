import { component$, useId, useStyles$ } from '@qwik.dev/core';
import type { ControlTypes } from '~/types/simulator';
import styles from './radio.css?inline';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  useStyles$(styles);
  if (control.kind !== 'radiogroup') return null;
  const id = useId();

  return (
    <div class="radiogroup-container">
      <p id={id}>{control.legend}</p>
      <div role="radiogroup" aria-labelledby={id}>
        {control.options.map((option) => (
          <>
            <input type="radio" id={option.value} name={control.name} value={option.value} checked={option.checked} required={control.required} disabled={option.disabled} />
            <label for={option.value}>{option.label}</label>
          </>
        ))}
      </div>
    </div>
  );
});