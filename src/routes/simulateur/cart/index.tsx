import { $, component$, useContext, useSignal, useStyles$ } from "@qwik.dev/core";
import { cartContext } from "../layout";
import { dynamicFormRecord } from "../forms/index";
import { finalForm } from "../forms/finalForm"
import { displayPrice } from "~/utils/price";
import { DynamicControl } from "../../../components/controls";
import styles from './index.css?inline';
import { getDynamicFormLabelList, parseDisplayValue, mailto } from "~/utils/helpers";
import { useLocation, useNavigate } from "@qwik.dev/router";


export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useContext(cartContext);
  const finalEstimation = useSignal<string>('');

  const onSubmit = $(async (form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    if (!isValid) return;
    const price = finalForm.finalPrice?.(cart);
    finalEstimation.value = await displayPrice(price);
  });

  return (
    <main id="cart">
      <header>
        <button onClick$={() => {
          const pathName = location.prevUrl?.pathname;
          if (pathName?.endsWith('simulateur/')) {
            history.back();
          } else {
            navigate('..');
          }
        }} aria-label="Retour à la liste">
          <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <h1>Validation devis</h1>
      </header>
      <div>
        {cart.map((_, i) => {
          const { dynamicFormKey, data } = cart[i];
          const dynamicForm = dynamicFormRecord[dynamicFormKey];
          const labelList = getDynamicFormLabelList(dynamicFormKey, dynamicForm);
          const price = dynamicForm.price?.(cart[i]);
          return (
            <details key={i} name="cart">
              <summary>
                <svg class="chevron" height="24px" width="24px" viewBox="0 -960 960 960" fill="currentColor">
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
                <h3>{dynamicForm.label}</h3>
                <a href={`/simulateur/${dynamicFormKey}?index=${i}`} aria-label="modifier">
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
                    <th>Prix</th>
                    <td>{displayPrice(price)}</td>
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
        {finalForm.controls.map((control) => (
          <DynamicControl key={control.name} control={control} />
        ))}
        {!finalEstimation.value && <button type='submit'>Valider</button>}
      </form>
      {finalEstimation.value && (
        <article id="final-estimation">
          <h2>Votre estimation est de {finalEstimation}</h2>
          <p>NB: Le prix affiché est un prix indicatif et ne constitue pas un devis ferme et définitif</p>
          <a class="mailto" href={mailto(cart)}>Contacter Erwan Richard</a>
        </article>
      )}
    </main>
  )
});