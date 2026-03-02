import { QRL } from "@qwik.dev/core";
import { dynamicFormRecord } from "../routes/simulateur/forms/index";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type DynamicFormKey = keyof typeof dynamicFormRecord;
export type InputTypes = string | string[] | number | number[] | boolean;
type ConditionsOperators = '<' | '>' | '<=' | '>=' | '==' | 'in' | 'out' | 'array-contains';
type ConditionsValue = string | number | string[] | number[];
export type Conditions = [string, ConditionsOperators, ConditionsValue];
export interface Range {
  min: number;
  max: number;
}

export interface Item {
  dynamicFormKey: DynamicFormKey;
  data: Record<string, InputTypes>;
}

export interface DynamicForm {
  controls: ControlTypes[];
  label: string;
  subTitle?: string;
};

export interface FinalDynamicForm extends Omit<DynamicForm, 'price'> {
  finalPrice?: QRL<(cart: Item[]) => Promise<Range>>;
}

export interface PriceData {
  type: 'multiplier' | 'addition' | 'fix';
  value: Range;
  time?: number;
  conditions?: Conditions;
  column?: string;
  rangeOnly?: boolean;
}

export interface Control<T> {
  kind: T;
  name: string;
  class?: string;
}

export interface Input extends Control<'input'> {
  label?: string;
  required?: boolean;
  pattern?: string;
  inputmode?: string;
  readonly?: boolean
  placeholder?: string;
  priceData?: PriceData | PriceData[];
  conditions?: Conditions;
  disabled?: boolean;
}

export interface CheckBox extends Control<'checkbox'> {
  label: string;
  value: string;
  required?: boolean;
  checked?: boolean;
  disabled?: boolean;
  priceData?: PriceData | PriceData[];
  conditions?: Conditions;
}

export interface InputNumber extends Input {
  value?: number;
  type: 'number';
  min?: number;
  max?: number;
  step?: number | 'any';
}

export interface InputString extends Input {
  value?: string;
  type: 'text' | 'search' | 'url' | 'email' | 'password';
  maxlength?: number;
  minlength?: number;
}

export interface CheckList extends Control<'checklist'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
    required?: boolean;
    priceData?: PriceData | PriceData[];
    conditions?: Conditions;
    disabled?: boolean;
  }[];
}

export interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
    priceData?: PriceData | PriceData[];
    conditions?: Conditions;
    disabled?: boolean;
  }[];
}