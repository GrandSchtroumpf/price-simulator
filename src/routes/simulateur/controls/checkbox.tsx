import { component$, useStyles$ } from '@qwik.dev/core';
import { ControlTypes } from '../steps';
import styles from './checkbox.css?inline';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  useStyles$(styles)
  if (control.kind !== 'checkbox') return null;

  return (
    <div class="checkbox">
      <input type="checkbox" id={control.name} name={control.name} checked={control.checked} />
      <label for={control.name}>
        <div class="svg-container">
          <svg width="20" height="20" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="none" d="M 4 13 L 9 19 L 20 5" />
          </svg>
        </div>
        {control.label}
      </label>
    </div>
  );
});