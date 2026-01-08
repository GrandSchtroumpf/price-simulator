import { component$, $, useContext, useComputed$ } from "@qwik.dev/core";
import { useLocation, useNavigate } from "@qwik.dev/router";
import { Item, Step, StepKey, stepsRecord } from "../steps";
import { DynamicControl } from "../controls";
import { cartContext } from "../layout";
import { unwrapStore } from "@qwik.dev/core/internal";

const convertControls = (data: FormData, step: Step) => {
  const formObj: Record<string, any> = {};
  for (const control of step.controls) {
    switch (control.kind) {
      case 'checkbox': {
        formObj[control.name] = data.getAll(control.name);
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
    typeof index === "string"
      ? cart.splice(Number(index), 1, item)
      : cart.push(item);
    navigate('..');
  });


  return (
    <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
      {controls.value.map((control) => <DynamicControl control={control} />)}
      <button type='submit'>Valider</button>
    </form>
  )
});
