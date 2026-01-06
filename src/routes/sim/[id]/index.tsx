import { component$, JSXOutput, $, useContext } from "@qwik.dev/core";
import { useLocation, useNavigate } from "@qwik.dev/router";
import { StepKey, stepsRecord } from "../steps";
import { ControlTypes, ControlKind } from "../steps";
import Checklist from "../controls/checklist";
import Input from "../controls/input";
import { cartContext } from "../layout";

export default component$(() => {
  const cart = useContext(cartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.params;
  if (!(id in stepsRecord)) return null;
  const step = stepsRecord[id as StepKey];

  const DynamicControl = component$((props: { control: ControlTypes }) => {
    const controlComponents: Record<ControlKind, JSXOutput> = {
      checklist: <Checklist {...props} />,
      input: <Input {...props} />,
      checkbox: <section></section>,
      radiogroup: <section></section>,
    };
    return controlComponents[props.control.kind];
  });

  const convertData = $((data: FormData) => {
    const formObj: Record<string, any> = {};
    for (const control of step.controls) {
      formObj[control.name] = (control.kind === 'checkbox' || control.kind === 'checklist')
        ? data.getAll(control.name)
        : data.get(control.name);
    }
    console.log(formObj);
    cart.push(formObj);
    navigate('..')
  });

  const onSubmit = $((form: HTMLFormElement) => {
    const formData = new FormData(form);
    convertData(formData);
  });


  return (
    <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
      {step.controls.map((control) => (
        <DynamicControl control={control} />
      ))}
      <button type='submit'>Valider</button>
    </form>
  )
});
