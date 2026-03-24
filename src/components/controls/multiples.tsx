import { component$, useAsyncComputed$, useStyles$ } from '@qwik.dev/core';
import type { ControlTypes, Item } from '~/types/simulator';
import styles from './input.css?inline';

interface InputMultiplesProps {
  control: ControlTypes;
  item?: Item;
}

const DynamicInput = component$((props: { control: ControlTypes, item?: Item }) => {
  useStyles$(styles);
  const { control, item } = props;
  if (control.kind !== "input") return null;
  const errors = useAsyncComputed$(async ({ track }) => {
    track(() => control);
    if ('errors' in control && control.errors && item) {
      return control.errors(item);
    }
    return [];
  });
  return (
    <>
      <input {...props.control} />
      <ul>
        {errors.value.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
    </>
  )
});

export default component$<InputMultiplesProps>(({ control, item }) => {
  if (control.kind !== "multiples") return null;

  return (
    <>
      {control.inputs.map((input) => {
        return (
          <div key={input.name} class="input-field">
            <label>{input.label}</label>
            <DynamicInput control={input} item={item} />
          </div>
        )
      })}
    </>
  );
});