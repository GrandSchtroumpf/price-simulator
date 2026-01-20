import { component$, $, useContext, useComputed$ } from "@qwik.dev/core";
import { StaticGenerateHandler, useLocation, useNavigate } from "@qwik.dev/router";
import { ControlTypes, DependsOn, displayPrice, Item, Step, StepKey, stepsRecord } from "../steps";
import { DynamicControl } from "../controls";
import { cartContext } from "../layout";
import { useAsyncComputed$, useId, useSignal, useStyles$, useVisibleTask$ } from "@qwik.dev/core/internal";
import styles from './index.css?inline';

const convertControls = (data: FormData, step: Step) => {
  const formObj: Record<string, any> = {};
  for (const control of step.controls) {
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

function isIn<T>(array: T[], value: T) {
  return array.includes(value);
}

export default component$(() => {
  useStyles$(styles);
  const id = useId();
  const cart = useContext(cartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const index = useSignal<undefined | number>(undefined)
  const item = useSignal<Item>();
  const { stepKey } = location.params;
  if (!(stepKey in stepsRecord)) return null;
  const step = stepsRecord[stepKey as StepKey];


  const itemPrice = useAsyncComputed$(({ track }) => {
    const next = track(item);
    if (!next) return Promise.resolve('');
    const stepPrice = stepsRecord[next.stepKey].price?.(next);
    return displayPrice(stepPrice);
  });

  const controls = useComputed$(() => {
    const shouldDisable = (item?: Item, dependsOn?: DependsOn) => {
      if (!item && dependsOn) return true;
      if (!dependsOn) return false;
      if (!item) return false;
      const [key, operator, value] = dependsOn;
      if (operator === '=') return item.data[key] === value;
      if (operator === '<') return item.data[key] < value;
      if (operator === '<=') return item.data[key] <= value;
      if (operator === 'in') {
        if (!Array.isArray(value)) throw 'Value should be an array with in operator';
        const itemValue = item.data[key];
        return isIn(value, itemValue);
      }
      throw 'Unsupported operator';
    };
    const next = item.value;
    const copy = structuredClone(step.controls);
    for (const control of copy) {
      if (control.kind === 'radiogroup') {
        for (const option of control.options) {
          if (shouldDisable(next, option.dependsOn)) {
            option.disabled = true;
            option.checked = false;
          } else {
            option.disabled = false;
          }
        }
      }
      if (control.kind === 'input') {
        control.disabled = shouldDisable(next, control.dependsOn);
      }
    };
    if (typeof index.value === 'number') {
      const editItem = cart[index.value];
      const controls = writeControls(editItem, copy);
      return controls;
    }
    return copy;
  });

  useVisibleTask$(() => {
    const editIndex = location.url.searchParams.get('index');
    if (editIndex) {
      index.value = Number(editIndex);
    } else {
      index.value = undefined;
    }
  });

  const onSubmit = $((event: SubmitEvent, form: HTMLFormElement) => {
    const isValid = form.checkValidity();
    if (!isValid) return;
    const submitter: HTMLButtonElement = event.submitter as HTMLButtonElement;
    const formData = new FormData(form);
    const formObj = convertControls(formData, step);
    const stepItem = { stepKey: stepKey as StepKey, data: formObj };
    item.value = stepItem;
    if (typeof index === 'string') {
      cart.splice(Number(index), 1, stepItem);
    } else {
      cart.push(stepItem);
    }
    if (submitter.value === 'more') {
      history.back();
    } else {
      navigate('../cart');
    }
  });

  const onInput = $(async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formObj = convertControls(formData, step);
    const stepItem = { stepKey: stepKey as StepKey, data: formObj };
    item.value = stepItem;
  })

  return (
    <>
      <main id="form" style={{ ['--transition-name']: `${stepKey}-background` }}>
        <img src={`/imgs/simulator/${stepKey}.webp`} width="1344" height="756" style={{ viewTransitionName: `${stepKey}-img` }} />
        <div class="card-content">
          <header>
            <button onClick$={() => history.back()} aria-label="Retour à la liste sans enregistrer">
              <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
            <h1 style={{ viewTransitionName: `${stepKey}-title` }} >{step.label}</h1>
            {itemPrice.value && <output form={id} aria-label="Prix total">{itemPrice.value}</output>
            }
          </header>
          <div class="step-price">
            <p>Estimation : Remplissez les informations ci-dessous pour obtenir un prix indicatif</p>
          </div>
          <form id={id} preventdefault:submit onSubmit$={onSubmit} onInput$={(_, form) => onInput(form)}>
            {controls.value.map((control) => <DynamicControl key={JSON.stringify(control)} control={control} />)}
            <footer>
              <button name="redirect" value='more' type='submit'>Autres travaux</button>
              <button name="redirect" value='finalise' type='submit'>Voir devis</button>
            </footer>
          </form>
        </div>
      </main>
    </>
  )
});

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: Object.keys(stepsRecord).map(stepKey => ({ stepKey })),
  };
};