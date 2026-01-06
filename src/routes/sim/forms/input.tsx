import { $, component$, QRL } from '@qwik.dev/core';
import { ControlTypes } from '../steps';

interface InputNumberProps {
  control: ControlTypes;
}

export default component$<InputNumberProps>(({ control }) => {
  if (control.kind !== 'input' || control.type !== 'number') return;

  const onSubmit = $((form: HTMLFormElement) => {
    const formData = new FormData(form);
  });

  return (
    <>
      <label>{control.label}</label>
      <input type='number' name={control.name} min={control.min} max={control.max} />
    </>
  );
});