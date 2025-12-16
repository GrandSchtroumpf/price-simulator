import { component$, Signal, useComputed$ } from "@qwik.dev/core";
import { steps } from "../steps";

interface NumberProps {
  current: Signal<string>;
}

export default component$<NumberProps>(({ current }) => {
  const step = useComputed$(() => steps[current.value]);
  if (step.value.type !== 'number') return null;

  return (
    <form preventdefault:submit onsubmit$={() => {console.log("sup")}}>
      {Object.entries(step.value.props.fields).map(([key, fields]) => {
        return (
          <>
            <label for={key}>{fields.label}</label>
            <input
              type="number"
              name={key}
              min={fields.min}
              max={fields.max}
            />
          </>
        )
      })}
      <button type="submit">Valider</button>
    </form>
  );
});