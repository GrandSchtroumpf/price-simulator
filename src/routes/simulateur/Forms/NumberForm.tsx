import { component$, QRL, $ } from "@qwik.dev/core";
import type { Step } from "../steps";

interface NumberProps {
  onChange: QRL<(value: Record<string, number>) => void>;
  step: Step;
}

export default component$<NumberProps>(({ step, onChange }) => {

  const onSubmit = $((form: HTMLFormElement) => {
    if (step.type !== 'number') return;
    const formData = new FormData(form);
    const formValue: Record<string, number> = {}
    for (const [key, value] of formData.entries()) {
      formValue[key] = Number(value);
    }
    onChange(formValue);
  });

  if (step.type !== 'number') return null;

  return (
    <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
      {Object.entries(step.options).map(([key, option]) => {
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