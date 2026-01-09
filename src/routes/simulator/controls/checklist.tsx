import { $, component$, useId } from '@qwik.dev/core';
import { ControlTypes } from '../steps';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  if (control.kind !== 'checklist') return null;
  const id = useId();

  return (
    <div>
      <p id={id}>{control.legend}</p>
      <div role='group' aria-labelledby={id}>
        {control.options.map((option) => (
          <div>
            <input type="checkbox" id={option.value} name={control.name} value={option.value} checked={option.checked} />
            <label for={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
});