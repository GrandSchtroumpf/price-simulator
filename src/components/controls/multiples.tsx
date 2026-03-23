import { component$, useStyles$ } from '@qwik.dev/core';
import type { ControlTypes, Item } from '~/types/simulator';
import styles from './input.css?inline';

interface InputMultiplesProps {
  control: ControlTypes;
  item?: Item;
}

const DynamicInput = component$((props: { control: ControlTypes }) => {
  useStyles$(styles);
  const { control } = props;
  if (control.kind !== "input") return null;
  return <input {...props.control} />
}); 

export default component$<InputMultiplesProps>(({ control }) => {
  if (control.kind !== "multiples") return null;

  return (
    <>
      {control.inputs.map((input) => {
        return (
          <div key={input.name} class="input-field">
            <label>{input.label}</label>
            <DynamicInput control={input} />
          </div>
        )
      })}
    </>
  );
});