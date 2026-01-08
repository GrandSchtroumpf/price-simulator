import { component$, JSXOutput } from "@qwik.dev/core";
import type { ControlTypes, ControlKind } from "../steps";
import Checklist from "./checklist";
import Input from "./input";
import Radio from "./radio";

export const DynamicControl = component$((props: { control: ControlTypes }) => {
  const controlComponents: Record<ControlKind, JSXOutput> = {
    checklist: <Checklist {...props} />,
    input: <Input {...props} />,
    radiogroup: <Radio {...props} />,
    checkbox: <section></section>,
  };
  return controlComponents[props.control.kind];
});