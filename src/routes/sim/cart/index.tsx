import { component$, useContext } from "@qwik.dev/core";
import { cartContext } from "../layout";
import { type Item, type Step, stepsRecord } from "../steps";

const getStepLabelList = (stepKey: string, step: Step) => {
  const labelList: Record<string, string> = {};
  labelList[stepKey] = step.label;
  for (const control of step.controls) {
    if (control.kind === 'input') {
      labelList[control.name] = control.label || control.name;
    }
    if (control.kind === 'checklist') {
      labelList[control.name] = control.legend || control.name;
      for (const option of control.options) {
        labelList[option.value] = option.label;
      }
    }
  }
  return labelList;
}

const ItemCard = component$((props: { item: Item, index: number }) => {
  const { item, index } = props;
  const { stepKey, data } = item;
  const step = stepsRecord[stepKey];
  const labelList = getStepLabelList(stepKey, step);
  return (
    <section>
      <div>
        <h3>{step.label}</h3>
        <a href={`../${stepKey}?index=${index}`}>Edit</a>
      </div>
      <ul>
        {Object.entries(data).map(([key, value]) => {
          const v = value;
          const displayValue = v instanceof Array
            ? v.map((answer) => labelList[answer]).join(' / ')
            : v;
          return <li>{labelList[key]} {displayValue}</li>
        })}
      </ul>
    </section>
  )
});

export default component$(() => {
  const cart = useContext(cartContext);
  return (
    <>
      <h1>Validation devis</h1>
      {cart.map((item: Item, i) => {
        return <ItemCard item={item} index={i} />
      })}
    </>
  )
});