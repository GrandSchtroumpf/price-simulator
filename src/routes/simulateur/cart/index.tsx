import { $, component$, useContext, useSignal, useStyles$ } from "@qwik.dev/core";
import { cartContext } from "../layout";
import { type Step, stepsRecord, finalStep, InputTypes, finalElementsMultiplier } from "../steps";
import { DynamicControl } from "../controls";
import styles from './index.css?inline';

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
  useStyles$(styles);
  const cart = useContext(cartContext);
  const finalEstimation = useSignal(0);

  const onSubmit = $(async (form: HTMLFormElement) => {
    let price = await finalStep.price(cart);
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    for (const value of Object.values(formObj)) {
      const v = String(value);
      if (v in finalElementsMultiplier) {
        const multiplier = finalElementsMultiplier[v];
        if (multiplier > 0) price += price * multiplier;
      }
    }
    if (price > 0) finalEstimation.value = Math.floor(price);
    setTimeout(() => {
      document.getElementById('final-estimation')?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  });

  return (
    <main id="cart">
      <header>
        <button onClick$={() => history.back()} aria-label="Retour à la liste">
          <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <h1>Validation devis</h1>
      </header>
      <div>
        {cart.map((_, i) => {
          const { stepKey, data } = cart[i];
          const step = stepsRecord[stepKey];
          const labelList = getStepLabelList(stepKey, step);
          return (
            <details key={i} name="cart">
              <summary>
                <svg class="chevron" height="24px" width="24px" viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
                <h3>{step.label}</h3>
                <a href={`../${stepKey}?index=${i}`} aria-label="modifier">
                  <svg aria-hidden height="24px" width="24px" viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </a>
                <button onClick$={() => cart.splice(i, 1)} aria-label="supprimer">
                  <svg aria-hidden height="24px" width="24px" viewBox="0 -960 960 960" fill="currentColor">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </summary>
              <table>
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key}>
                      <th>{labelList[key]}</th>
                      <td>{parseDisplayValue(value, labelList)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Temps</th>
                    <td>{step.times({ stepKey, data })} hours</td>
                  </tr>
                  <tr>
                    <th>Matériaux</th>
                    <td>{step.materials({ stepKey, data })} €</td>
                  </tr>
                </tfoot>
              </table>
            </details>
          )
        })}
      </div>

      <hgroup>
        <h2>Informations complémentaires</h2>
        <p>Ces informations sont nécessaires à la réalisation du devis</p>
      </hgroup>
      <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
        {finalStep.controls.map((control) => (
          <DynamicControl key={control.name} control={control} />
        ))}
        <button type='submit'>Valider</button>
      </form>
      {finalEstimation.value > 0 && (
        <article id="final-estimation">
          <h2>Votre estimation est de {finalEstimation} €</h2>
          <p>NB: Le prix affiché est un prix indicatif et ne constitue pas un devis ferme et définitif</p>
        </article>
      )}
    </main>
  )
});