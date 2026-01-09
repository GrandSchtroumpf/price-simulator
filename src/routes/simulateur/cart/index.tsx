import { component$, useContext } from "@qwik.dev/core";
import { cartContext } from "../layout";
import { type Step, stepsRecord, finalStep, InputTypes } from "../steps";
import { DynamicControl } from "../controls";

const getStepLabelList = (stepKey: string, step: Step) => {
  const labelList: Record<string, string> = {};
  labelList[stepKey] = step.label;
  for (const control of step.controls) {
    if (control.kind === 'input' || control.kind === 'checkbox') {
      labelList[control.name] = control.label || control.name;
    }
    if (control.kind === 'checklist' || control.kind === 'radiogroup') {
      labelList[control.name] = control.legend || control.name;
      for (const option of control.options) {
        labelList[option.value] = option.label;
      }
    }
  }
  return labelList;
}

const parseDisplayValue = (value: InputTypes, labels: Record<string, string>) => {
  let parsedValue = value;
  if (typeof value === 'string') parsedValue = labels[value];
  if (typeof value === 'boolean') parsedValue = value ? 'Oui' : 'Non';
  if (value instanceof Array) parsedValue = value.map((answer) => labels[answer]).join(' / ');
  return parsedValue;
};

export default component$(() => {
  const cart = useContext(cartContext);
  return (
    <>
      <h1>Validation devis</h1>
      {cart.map((_, i) => {
        const { stepKey, data } = cart[i];
        const step = stepsRecord[stepKey];
        const labelList = getStepLabelList(stepKey, step);
        return (
          <section>
            <div>
              <h3>{step.label}</h3>
              <a href={`../${stepKey}?index=${i}`}>Edit</a>
              <button onClick$={() => cart.splice(i, 1)}>Delete</button>
            </div>
            <ul>
              <li>Temps: {step.times({ stepKey, data })} hours / Matériaux: {step.materials({ stepKey, data })} €</li>
              {Object.entries(data).map(([key, value]) => {
                return (
                  <>
                    <li>{labelList[key]} {parseDisplayValue(value, labelList)}</li>
                  </>
                )
              })}
            </ul>
          </section>
        )
      })}

      <h2>{finalStep.label}</h2>
      <form preventdefault:submit onsubmit$={(_, form) => { console.log(new FormData(form)) }}>
        {finalStep.controls.map((control) => (
          <DynamicControl control={control} />
        ))}
        <button type='submit'>Valider</button>
      </form>
    </>
  )
});