import { component$, useStyles$ } from '@qwik.dev/core';
import { ControlTypes } from '../../routes/simulateur/forms';
import styles from './input.css?inline';

interface InputNumberProps {
  control: ControlTypes;
}

const DynamicInput = component$((props: { control: ControlTypes }) => {
  useStyles$(styles);
  const { control } = props;
  const inputType = control.kind === 'input' && control.type;
  if (!inputType) return null;
  return <input {...props.control} />
});

export default component$<InputNumberProps>(({ control }) => {
  if (control.kind !== 'input') return null;

  return (
    <div class="input-field">
      <label>{control.label}</label>
      <DynamicInput control={control} />
    </div>
  );
});