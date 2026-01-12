import { component$ } from '@qwik.dev/core';
import { ControlTypes } from '../steps';

interface InputNumberProps {
  control: ControlTypes;
}

const DynamicInput = component$((props: { control: ControlTypes }) => {
  const { control } = props;
  const inputType = control.kind === 'input' && control.type;
  if (!inputType) return null;
  return <input {...props.control} />
});

export default component$<InputNumberProps>(({ control }) => {
  if (control.kind !== 'input') return null;

  return (
    <>
      <label>{control.label}</label>
      <DynamicInput control={control} />
    </>
  );
});