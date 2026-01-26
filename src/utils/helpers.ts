import { dynamicFormRecord } from "~/routes/simulateur/forms";
import { DynamicForm, InputNumber, InputTypes, Item } from "~/types/simulator";

export const number = (p: Omit<InputNumber, 'kind' | 'type'>): InputNumber => ({
  kind: 'input',
  type: 'number',
  ...p
});

export const toArray = <T>(value?: T | T[]) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

export function isIn<T>(array: T[], value: T) {
  if (Array.isArray(value)) {
    for (const v of value) {
      const included = array.includes(v);
      if (included) return true;
    }
  } else {
    return array.includes(value);
  }
}

export const getDynamicFormLabelList = (stepKey: string, dynamicForm: DynamicForm) => {
  const labelList: Record<string, string> = {};
  labelList[stepKey] = dynamicForm.label;
  for (const control of dynamicForm.controls) {
    if (control.kind === 'input' || control.kind === 'checkbox') {
      labelList[control.name] = control.label || control.name;
    }
    if (control.kind === 'checklist' || control.kind === 'radiogroup') {
      labelList[control.name] = control.legend || control.name;
      for (const option of control.options) {
        labelList[option.value] = option.label;
      }
    }
  }
  return labelList;
}

export const parseDisplayValue = (value: InputTypes, labels: Record<string, string>) => {
  let parsedValue = value;
  if (typeof value === 'string') parsedValue = labels[value];
  if (typeof value === 'boolean') parsedValue = value ? 'Oui' : 'Non';
  if (value instanceof Array) parsedValue = value.map((answer) => labels[answer]).join(' / ');
  return parsedValue;
};

export const mailto = (cart: Item[]) => {
  const list = [];
  for (const item of cart) {
    const { dynamicFormKey, data } = item;
    const dynamicForm = dynamicFormRecord[dynamicFormKey];
    const labelList = getDynamicFormLabelList(dynamicFormKey, dynamicForm);
    list.push(`${dynamicForm.label}:`)
    for (const [key, value] of Object.entries(data)) {
      list.push(`- ${labelList[key]}: ${parseDisplayValue(value, labelList)}`);
    }
    list.push('');
  }
  const mailto = 'erwanrichard.lpm@gmail.com';
  const subject = encodeURIComponent('Estimation - Devis');
  const body = encodeURIComponent(list.join('\n'));
  return `mailto:${mailto}?subject=${subject}&body=${body}`;
}
