import { component$, JSXOutput } from "@qwik.dev/core";
import type { ControlTypes, ControlKind } from "~/types/simulator";
import Checklist from "./checklist";
import Checkbox from "./checkbox";
import Input from "./input";
import Multiples from "./multiples";
import Radio from "./radio";

export const DynamicControl = component$((props: { control: ControlTypes }) => {
  const controlComponents: Record<ControlKind, JSXOutput> = {
    checklist: <Checklist {...props} />,
    input: <Input {...props} />,
    radiogroup: <Radio {...props} />,
    checkbox: <Checkbox {...props} />,
    multiples: <Multiples {...props} />,
  };
  return controlComponents[props.control.kind];
});