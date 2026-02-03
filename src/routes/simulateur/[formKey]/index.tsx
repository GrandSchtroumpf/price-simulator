import { component$, $, useContext, useComputed$ } from "@qwik.dev/core";
import { useLocation, useNavigate } from "@qwik.dev/router";
import type { DynamicForm, Item, DynamicFormKey, ControlTypes } from "~/types/simulator";
import { dynamicFormRecord } from "~/routes/simulateur/forms";
import { displayPrice } from "~/utils/price";
import { isConditionValid } from "~/utils/conditions";
import { DynamicControl } from "~/components/controls";
import { cartContext } from "~/routes/simulateur/layout";
import { unwrapStore, useAsyncComputed$, useId, useSignal, useStyles$, useVisibleTask$ } from "@qwik.dev/core/internal";
import styles from './index.css?inline';

const convertControls = (data: FormData, form: DynamicForm) => {
  const formObj: Record<string, any> = {};
  for (const control of form.controls) {
    switch (control.kind) {
      case 'checkbox': {
        formObj[control.name] = !!data.get(control.name);
        break;
      };
      case 'checklist': {
        formObj[control.name] = data.getAll(control.name);
        break;
      };
      case 'radiogroup': {
        formObj[control.name] = data.get(control.name);
        break;
      }
      case 'input': {
        if ('type' in control) {
          formObj[control.name] = control.type === 'number'
            ? Number(data.get(control.name))
            : data.get(control.name);
        }
        break;
      };
    }
  }
  return formObj;
};

const writeControls = (editItem: Item, controls: ControlTypes[]) => {
  if (!editItem) return controls;
  for (const [key, value] of Object.entries(editItem.data)) {
    const control = controls.find(c => c.name === key);
    if (control?.kind === 'input') control.value = value as string;
    if (control?.kind === 'checkbox') control.checked = !!value; // TODO: verify
    if (control?.kind === 'checklist') {
      const values = value as string[];
      for (const option of control.options) {
        if (values.includes(option.value)) option.checked = true;
      }
    }
    if (control?.kind === 'radiogroup') {
      for (const option of control.options) {
        if (value === option.value) option.checked = true;
      }
    }
  }
  return controls;
};


export default component$(() => {
  useStyles$(styles);
  const id = useId();
  const cart = useContext(cartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const index = useSignal<undefined | number>(undefined)
  const item = useSignal<Item>();
  const formKey = location.params['formKey'];
  if (!(formKey in dynamicFormRecord)) return null;
  const dynamicForm = dynamicFormRecord[formKey as DynamicFormKey];

  const itemPrice = useAsyncComputed$(({ track }) => {
    track(item);
    const next = item.value;
    if (!next) return Promise.resolve('');
    const dynamicFormPrice = dynamicFormRecord[next.dynamicFormKey].price?.(next);
    return displayPrice(dynamicFormPrice);
  });

  const controls = useComputed$(() => {
    const next = item.value;
    const copy = structuredClone(dynamicForm.controls);
    for (const control of copy) {
      if (control.kind === 'radiogroup') {
        for (const option of control.options) {
          if (!isConditionValid(next, option.dependsOn)) {
            option.disabled = true;
            option.checked = false;
          } else {
            option.disabled = false;
          }
        }
      }
      if (control.kind === 'checklist') {
        for (const option of control.options) {
          if (!isConditionValid(next, option.dependsOn)) {
            option.disabled = true;
            option.checked = false;
          } else {
            option.disabled = false;
          }
        }
      }
      if (control.kind === 'input') {
        control.disabled = !isConditionValid(next, control.dependsOn);
      }
    };
    if (typeof index.value === 'number' && next) {
      return writeControls(next, copy);
    }
    return copy;
  });

  useVisibleTask$(() => {
    const editIndex = location.url.searchParams.get('index');
    console.log(editIndex, location, location.params, cart, unwrapStore(cart));
    if (typeof editIndex === 'string') {
      index.value = Number(editIndex);
      item.value = cart[index.value];
    }
  })


  const onSubmit = $((event: SubmitEvent, form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    if (!isValid) return;
    const submitter: HTMLButtonElement = event.submitter as HTMLButtonElement;
    const formData = new FormData(form);
    const formObj = convertControls(formData, dynamicForm);
    const formItem = { dynamicFormKey: formKey as DynamicFormKey, data: formObj };
    item.value = formItem;
    if (typeof index.value === 'number') {
      cart.splice(Number(index), 1, formItem);
    } else {
      cart.push(formItem);
    }
    if (submitter.value === 'more') {
      history.back();
    } else {
      navigate('/simulateur/cart');
    }
  });
  const onInput = $(async (_: Event, form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formObj = convertControls(formData, dynamicForm);
    const dynamicFormItem = { dynamicFormKey: formKey as DynamicFormKey, data: formObj };
    item.value = dynamicFormItem;
  })

  return (
    <main id="form">
      <img src={`/imgs/simulator/${formKey}.webp`} width="1344" height="756" />
      <div class="card-content">
        <header>
          <button onClick$={() => history.back()} aria-label="Retour à la liste sans enregistrer">
            <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </button>
          <h1>{dynamicForm.label}</h1>
          {itemPrice.value && <output form={id} aria-label="Prix total">{itemPrice.value}</output>}
        </header>
        <div class="step-price">
          <p>Estimation : Remplissez les informations ci-dessous pour obtenir un prix indicatif</p>
        </div>
        <form id={id} preventdefault:submit onSubmit$={onSubmit} onChange$={onInput} onInput$={onInput}>
          {controls.value.map((control) => {
            return <DynamicControl key={control.name} control={control} />
          })}
          <footer>
            <button name="redirect" value='more' type='submit'>Autres travaux</button>
            <button name="redirect" value='finalise' type='submit'>Voir devis</button>
          </footer>
        </form>
      </div>
    </main>
  )
});

export const onStaticGenerate = async () => ({
  params: Object.keys(dynamicFormRecord).map((formKey) => ({ formKey })),
});