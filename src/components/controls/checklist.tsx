import { component$, useId, useStyles$ } from '@qwik.dev/core';
import type { ControlTypes } from '~/types/simulator';
import styles from './checkbox.css?inline';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  useStyles$(styles)
  const id = useId();
  if (control.kind !== 'checklist') return null;

  return (
    <div>
      <p id={id}>{control.legend}</p>
      <div role='group' aria-labelledby={id}>
        {control.options.map((option) => (
          <div key={option.value} class="checkbox">
            <input type="checkbox" id={option.value} name={control.name} value={option.value} checked={option.checked} required={option.required} disabled={option.disabled} />
            <label for={option.value}>
              <div class="svg-container">
                <svg width="20" height="20" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="none" d="M 4 13 L 9 19 L 20 5" />
                </svg>
              </div>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
});