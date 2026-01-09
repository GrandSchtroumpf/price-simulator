import { component$ } from '@qwik.dev/core';
import { ControlTypes } from '../steps';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  if (control.kind !== 'checkbox') return null;

  return (
    <div>
      <input type="checkbox" id={control.name} name={control.name} checked={control.checked} />
      <label for={control.name}>{control.label}</label>
    </div>
  );
});