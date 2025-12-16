import { component$, Signal, useComputed$, QRL, $ } from "@qwik.dev/core";
import { steps } from "../steps";
import { Answer } from "..";

interface NumberProps {
  add: QRL<(answer: Answer, nextOption?: string) => any>;
  current: Signal<string>;
}

export default component$<NumberProps>(({ current, add }) => {
  const step = useComputed$(() => steps[current.value]);

  const onSubmit = $((form: HTMLFormElement) => {
    if (step.value.type !== 'number') return;
    const formData = new FormData(form);
    const formValue: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      const label = step.value.props.fields[key].label;
      formValue[key] = `${label}: ${value}`;
    }
    const answer: Answer = {
      question: current.value,
      option: '',
      formValue
    };
    add(answer);
  });

  if (step.value.type !== 'number') return null;

  return (
    <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
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