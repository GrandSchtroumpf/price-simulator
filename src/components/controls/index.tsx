import { component$, JSXOutput } from "@qwik.dev/core";
import type { ControlTypes, ControlKind } from "../../routes/simulateur/forms";
import Checklist from "./checklist";
import Checkbox from "./checkbox";
import Input from "./input";
import Radio from "./radio";

export const DynamicControl = component$((props: { control: ControlTypes }) => {
  const controlComponents: Record<ControlKind, JSXOutput> = {
    checklist: <Checklist {...props} />,
    input: <Input {...props} />,
    radiogroup: <Radio {...props} />,
    checkbox: <Checkbox {...props} />,
  };
  return controlComponents[props.control.kind];
});