import { component$, useAsyncComputed$, useId, useStyles$ } from '@qwik.dev/core';
import type { ControlTypes, Item } from '~/types/simulator';
import styles from './input.css?inline';

interface InputMultiplesProps {
  control: ControlTypes;
  item?: Item;
}

const DynamicInput = component$((props: { control: ControlTypes, id: string, item?: Item }) => {
  useStyles$(styles);
  const { control, id, item } = props;
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
      <input id={id} {...props.control} />
      <ul>
        {errors.value.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
    </>
  )
});

export default component$<InputMultiplesProps>(({ control, item }) => {
  if (control.kind !== "multiples") return null;
  const id = useId();

  return (
    <div role="group">
      {control.inputs.map((input) => {
        return (
          <div key={input.name} class="input-field">
            <label for={id}>{input.label}</label>
            <DynamicInput control={input} id={id} item={item} />
          </div>
        )
      })}
    </div>
  );
});