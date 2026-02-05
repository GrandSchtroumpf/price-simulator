import { component$ } from '@qwik.dev/core';
import type { ControlTypes } from '~/types/simulator';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  if (control.kind !== 'checkbox') return null;
  return (
    <div class="checkbox">
      <input type="checkbox" id={control.name} name={control.name} value={control.value} checked={control.checked} required={control.required} disabled={control.disabled} />
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