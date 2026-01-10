import { component$, $, useContext, useComputed$ } from "@qwik.dev/core";
import { Link, StaticGenerateHandler, useLocation, useNavigate } from "@qwik.dev/router";
import { Item, Step, StepKey, stepsRecord } from "../steps";
import { DynamicControl } from "../controls";
import { cartContext } from "../layout";
import { unwrapStore, useStyles$ } from "@qwik.dev/core/internal";
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

const writeControls = (editItem: Item, step: Step) => {
  const controls = step.controls;
  const copy = structuredClone(unwrapStore(controls));
  if (!editItem) return step.controls;
  for (const [key, value] of Object.entries(editItem.data)) {
    const control = copy.find(c => c.name === key);
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
  return copy;
};


export default component$(() => {
  useStyles$(styles);
  const cart = useContext(cartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { stepKey } = location.params;
  if (!(stepKey in stepsRecord)) return null;
  const step = stepsRecord[stepKey as StepKey];
  const index = location.url.searchParams.get('index');

  const controls = useComputed$(() => {
    if (typeof index === 'string') {
      const editItem = cart[Number(index)];
      const controls = writeControls(editItem, step);
      return controls;
    }
    return step.controls;
  });

  const onSubmit = $((form: HTMLFormElement) => {
    const formData = new FormData(form);
    const formObj = convertControls(formData, step);
    const item = { stepKey: stepKey as StepKey, data: formObj };
    if (typeof index === 'string') {
      cart.splice(Number(index), 1, item);
    } else {
      cart.push(item);
    }
    navigate('..');
  });


  return (
    <>
      <main id="form" style={{['--transition-name']: `${stepKey}-background`}}>
        <img src={`/imgs/simulator/${stepKey}.webp`} width="1344" height="756" style={{viewTransitionName: `${stepKey}-img`}} />
        <div class="card-content">
          <header>
            <Link href=".." aria-label="Retour à la liste sans enregistrer">
              <svg width="24px" height="24px" viewBox="0 -960 960 960" fill="currentColor">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
              </svg>
            </Link>
            <h1 style={{viewTransitionName: `${stepKey}-title`}} >{step.label}</h1>
          </header>
          <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
            {controls.value.map((control, i) => <DynamicControl key={i} control={control} />)}
            <button type='submit'>Valider</button>
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