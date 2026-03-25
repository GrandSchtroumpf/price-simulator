import { component$, $, useContext, useComputed$ } from "@qwik.dev/core";
import { useLocation, useNavigate } from "@qwik.dev/router";
import type { DynamicForm, Item, DynamicFormKey, ControlTypes } from "~/types/simulator";
import { dynamicFormRecord } from "~/routes/simulateur/forms";
import { displayPrice, getPrice } from "~/utils/price";
import { isConditionValid } from "~/utils/conditions";
import { DynamicControl } from "~/components/controls";
import { cartContext, FormImg, formImgs } from "~/routes/simulateur/layout";
import { getItemControlsErrors } from "~/utils/helpers";
import { useId, useSignal, useStyles$, useTask$, useVisibleTask$ } from "@qwik.dev/core/internal";
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
      };
      case 'multiples': {
        const names = control.inputs.map((input) => input.name);
        for (const name of names) {
          if (data.get(name)) formObj[name] = Number(data.get(name));
        }
        break;
      };
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
    const controlName = key.includes('.') ? key.split('.')[0] : key;
    const control = controls.find(c => c.name === controlName);
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
    if (control?.kind === 'multiples') {
      for (const input of control.inputs) {
        if (input.name === key) input.value = Number(value);
      }
    }
  }
  return controls;
};

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as T;

  const clone = {} as any;
  for (const key in obj) {
    if (key in obj) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone as T;
}

export default component$(() => {
  useStyles$(styles);
  const id = useId();
  const { cart, editIndex } = useContext(cartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const index = useSignal<undefined | number>(undefined)
  const item = useSignal<Item>();
  const formKey = location.params['formKey'];
  if (!(formKey in dynamicFormRecord)) return null;
  const dynamicForm = dynamicFormRecord[formKey as DynamicFormKey];


  const errors = useSignal<string[]>([]);
  const itemPrice = useSignal('');

  const controls = useComputed$(() => {
    const next = item.value;
    const copy = deepClone(dynamicForm.controls);
    for (const control of copy) {
      if (control.kind === 'radiogroup') {
        for (const option of control.options) {
          if (!isConditionValid(next, option.conditions)) {
            option.disabled = true;
            option.checked = false;
          } else {
            option.disabled = false;
          }
        }
      }
      if (control.kind === 'checklist') {
        for (const option of control.options) {
          if (!isConditionValid(next, option.conditions)) {
            option.disabled = true;
            option.checked = false;
          } else {
            option.disabled = false;
          }
        }
      }
      if (control.kind === 'input') {
        control.disabled = !isConditionValid(next, control.conditions);
      }
    };
    if (typeof index.value === 'number' && next) {
      return writeControls(next, copy);
    }
    return copy;
  });


  useTask$(async ({ track }) => {
    const next = track(item);
    if (!next) {
      itemPrice.value = '';
    } else {
      const dynamicForm = dynamicFormRecord[next.dynamicFormKey];
      const nextPrice = await getPrice(next, dynamicForm);
      if (errors.value.length) {
        itemPrice.value = "";
      } else {
        itemPrice.value = await displayPrice(nextPrice);
      }
    }
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(editIndex);
    if (typeof editIndex.value === 'number') {
      index.value = editIndex.value;
      item.value = cart[editIndex.value];
    }
    cleanup(() => {
      editIndex.value = undefined;
    })
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
    const isValid = form.checkValidity();
    if (!isValid) {
      errors.value = [];
    } else {
      const controlErrors = await getItemControlsErrors(dynamicFormItem, dynamicForm);
      if (controlErrors.length) {
        errors.value = [...controlErrors]
      } else {
        errors.value = [];
      }
    }
  })

  return (
    <main id="form">
      <img src={formImgs[formKey as FormImg]} width="1200" height="655" alt="" />
      <div class="card-content">
        <header>
          <button class="btn-icon" onClick$={() => history.back()} aria-label="Retour à la liste sans enregistrer">
            <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </button>
          <hgroup>
            <h1>{dynamicForm.label}</h1>
            <p>{dynamicForm.subTitle}</p>
          </hgroup>
          {itemPrice.value && <output form={id} aria-label="Prix total">{itemPrice.value}</output>}
        </header>
        <div class="step-price">
          <p>Estimation : Remplissez les informations ci-dessous pour obtenir un prix indicatif.</p>
          {errors.value.length > 0 && <p>⚠️ <i>{dynamicFormRecord[formKey as DynamicFormKey].errors}</i> ⚠️</p>}
        </div>
        <form id={id} preventdefault:submit onSubmit$={onSubmit} onChange$={onInput} onInput$={onInput}>
          {controls.value.map((control) => {
            return <DynamicControl key={control.name} control={control} item={item.value} />
          })}
          <footer>
            <button class="btn-outline" name="redirect" value='more' type='submit'>Autres travaux</button>
            <button class="btn-fill" name="redirect" value='finalise' type='submit'>Voir devis</button>
          </footer>
        </form>
      </div>
    </main>
  )
});

export const onStaticGenerate = async () => ({
  params: Object.keys(dynamicFormRecord).map((formKey) => ({ formKey })),
});