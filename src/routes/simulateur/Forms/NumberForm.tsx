import { component$, Signal, useComputed$, QRL, $ } from "@qwik.dev/core";
import { steps } from "../steps";
import { Answer } from "..";

interface NumberProps {
  onChange: QRL<(value: Record<string, number>) => any>;
  current: Signal<string>;
}

export default component$<NumberProps>(({ current, onChange }) => {
  const step = useComputed$(() => steps[current.value]);

  const onSubmit = $((form: HTMLFormElement) => {
    if (step.value.type !== 'number') return;
    const formData = new FormData(form);
    const formValue: Record<string, number> = {}
    for (const [key, value] of formData.entries()) {
      formValue[key] = Number(value);
    }
    onChange(formValue);
  });

  if (step.value.type !== 'number') return null;

  return (
    <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
      {Object.entries(step.value.options).map(([key, option]) => {
        return (
          <>
            <label for={key}>{option.label}</label>
            <input
              id={key}
              type="number"
              name={key}
              min={option.min}
              max={option.max}
            />
          </>
        )
      })}
      <button type="submit">Valider</button>
    </form>
  );
});