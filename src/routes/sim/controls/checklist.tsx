import { $, component$, QRL } from '@qwik.dev/core';
import { ControlTypes } from '../steps';

interface CheckListProps {
  control: ControlTypes;
}

export default component$<CheckListProps>(({ control }) => {
  if (control.kind !== 'checklist') return null;

  const onSubmit = $((form: HTMLFormElement) => {
    const formData = new FormData(form);
    const checked = [...formData.keys()];
  });

  return (
    <div role='group'>
      <p>{control.legend}</p>
      {control.options.map((option) => (
        <div>
          <input type="checkbox" id={option.value} name={control.name} value={option.value} checked={option.checked} />
          <label for={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
});