import { component$, useContext, $ } from "@qwik.dev/core";
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

const ItemCard = component$((props: { index: number, cart: Item[] }) => {
  const { index, cart } = props;
  const { stepKey, data } = cart[index]
  const step = stepsRecord[stepKey];
  const labelList = getStepLabelList(stepKey, step);

  return (
    <section>
      <div>
        <h3>{step.label}</h3>
        <a href={`../${stepKey}?index=${index}`}>Edit</a>
        <button onClick$={() => { cart.splice(index, 1) }}>Delete</button>
      </div>
      <ul>
        {Object.entries(data).map(([key, value]) => {
          const displayValue = value instanceof Array
            ? value.map((answer) => labelList[answer]).join(' / ')
            : value;
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
      {cart.map((_, i) => {
        return <ItemCard index={i} cart={cart} />
      })}
    </>
  )
});