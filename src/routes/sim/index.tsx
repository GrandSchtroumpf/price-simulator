import { component$, useStore, JSXOutput, $, QRL, useSignal, useComputed$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { ControlTypes, ControlKind, stepsRecord } from "./steps";
import Checklist from "./forms/checklist";
import Input from "./forms/input";

export default component$(() => {
  const currentIndex = useSignal(0);
  const steps = useStore([stepsRecord.window]);
  const currentStep = useComputed$(() => steps[currentIndex.value]);

  const buildTree = $((value: string[]) => {
    for (const stepKey of value) {
      steps.push(stepsRecord[stepKey]);
    }
    currentIndex.value++;
    console.log(value);
  });

  const buildNode = $(() => {

  });

  const convertData = $((data: FormData) => {
    const formObj: Record<string, any> = {};
    for (const control of currentStep.value.controls) {
      formObj[control.name] = (control.kind === 'checkbox' || control.kind === 'checklist')
        ? data.getAll(control.name)
        : data.get(control.name);
    }
    console.log(formObj);
  });

  const onSubmit = $((form: HTMLFormElement) => {
    const formData = new FormData(form);
    convertData(formData);
  });

  const DynamicControl = component$((props: { control: ControlTypes }) => {
    const controlComponents: Record<ControlKind, JSXOutput> = {
      checklist: <Checklist {...props} />,
      input: <Input {...props} />,
      checkbox: <section></section>,
      radiogroup: <section></section>,
    };
    return controlComponents[props.control.kind];
  });

  return (
    <main>
      <section>
        <form preventdefault:submit onsubmit$={(_, form) => onSubmit(form)}>
          {currentStep.value.controls.map((control) => (
            <DynamicControl control={control} />
          ))}
          <input type="text" name="test" />
          <button type='submit'>Prochaine étape</button>
        </form>
      </section>
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
