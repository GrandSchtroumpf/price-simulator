import type { ControlTypes, InputTypes, Item, PriceData, Conditions, Range, DynamicForm, DynamicFormKey } from "~/types/simulator";
import { isConditionValid } from "./conditions";
import { toArray } from "./helpers";

const getPriceData = (control: ControlTypes, value: InputTypes) => {
  if (control.kind === "input" && control.type === 'number') {
    const prices = toArray(control.priceData);
    return prices.map((price) => ({
      ...price,
      value: {
        min: Number(value) * price.value.min,
        max: Number(value) * price.value.max,
      }
    }))
  };
  if (control.kind === 'radiogroup') {
    const option = control.options.find((option) => option.value === value);
    if (option?.priceData) return toArray(option.priceData);
  }
  if (control.kind === 'checklist') {
    const priceData = [];
    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      const option = control.options.find((option) => option.value === v);
      priceData.push(...toArray(option?.priceData));
    }
    return priceData;
  }
};

export const getPrice = (item: Item, dynamicFormRecord: Record<DynamicFormKey, DynamicForm>) => {
  const form: DynamicForm = dynamicFormRecord[item.dynamicFormKey];
  const addition = { min: 0, max: 0 };
  const multiplier = { min: 1, max: 1 };
  const fix = { min: 0, max: 0 };
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = form.controls.find(c => c.name === controlName);
    if (!control) continue;
    const priceData = getPriceData(control, value);
    const prices = Array.isArray(priceData) ? priceData : [priceData];
    for (const price of prices) {
      if (price?.conditions) {
        if (!isConditionValid(item, price.conditions)) continue;
      }
      if (!price?.value) continue;
      const { min, max } = price.value;
      if (price.type === 'fix') {
        fix.min += min ?? 0;
        fix.max += max ?? 0;
      }
      if (price.type === 'addition') {
        addition.min += min ?? 0;
        addition.max += max ?? 0;
      }
      if (price.type === 'multiplier') {
        multiplier.min *= min ?? 1;
        multiplier.max *= max ?? 1;
      }
    }
  }
  return {
    min: Math.floor(addition.min * multiplier.min + fix.min),
    max: Math.floor(addition.max * multiplier.max + fix.max),
  };
};

const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export async function displayPrice(pricePromise?: Promise<Range>): Promise<string> {
  const price = await pricePromise;
  if (!price) return '';
  if (price.min === price.max) return currency.format(price.min);
  return (currency as any).formatRange(price.min, price.max);
}

export const writePriceData = (
  type: PriceData['type'],
  range: number | Range,
  conditions?: Conditions
): PriceData => {
  const value = typeof range === 'number'
    ? { min: range, max: range }
    : range;
  return { type, value, conditions }
};