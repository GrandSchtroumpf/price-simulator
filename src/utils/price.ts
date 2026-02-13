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

const getRoundedRange = (range: Range) => {
  const roundNumber = (n: number) => {
    const ordre = n < 100 ? 10 : 100;
    return Math.floor(n / ordre) * ordre;
  }
  const { min, max } = range;
  if (min !== 0 && min === max) {
    range.min = min - (min * 0.10);
    range.max = max + (max * 0.10);
  }
  return {
    min: roundNumber(range.min),
    max: roundNumber(range.max)
  }
}

const generatePriceTypes = () => {
  const addition = { min: 0, max: 0 };
  const multiplier = { min: 1, max: 1 };
  const fix = { min: 0, max: 0 };
  return { addition, multiplier, fix };
}

const writePriceTypes = (
  item: Item,
  priceTypes: { addition: Range, multiplier: Range, fix: Range },
  price: PriceData
) => {
  const { addition, multiplier, fix } = priceTypes;
  if (price?.conditions) if (!isConditionValid(item, price.conditions)) return;
  if (!price?.value) return;
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

const calcRange = (obj: { addition: Range, multiplier: Range, fix: Range }) => {
  const { addition, multiplier, fix } = obj;
  return {
    min: Math.floor(addition.min * multiplier.min + fix.min),
    max: Math.floor(addition.max * multiplier.max + fix.max),
  }
}
export const getPrice = (item: Item, dynamicFormRecord: Record<DynamicFormKey, DynamicForm>) => {
  const form: DynamicForm = dynamicFormRecord[item.dynamicFormKey];
  const priceTypes: Record<string, { addition: Range, multiplier: Range, fix: Range }> = { primary: generatePriceTypes() };
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = form.controls.find(c => c.name === controlName);
    if (!control) continue;
    const priceData = getPriceData(control, value);
    const prices = Array.isArray(priceData) ? priceData : [priceData];
    for (const price of prices) {
      if (!price) continue;
      if (!price.secondary) {
        writePriceTypes(item, priceTypes.primary, price);
      } else {
        if (!priceTypes[price.secondary]) {
          priceTypes[price.secondary] = generatePriceTypes();
          const sControl = form.controls.find((control) => control.name === price?.secondary);
          const sValue = item.data[price.secondary];
          if (!sControl || !sValue) continue;
          const sPrices = getPriceData(sControl, sValue);
          if (!sPrices) continue;
          for (const sPrice of sPrices) {
            writePriceTypes(item, priceTypes[price.secondary], sPrice);
          }
        }
        writePriceTypes(item, priceTypes[price.secondary], price);
      }
    }
  }
  const finalRange = { min: 0, max: 0 };
  for (const values of Object.values(priceTypes)) {
    const range = calcRange(values);
    finalRange.min += range.min;
    finalRange.max += range.max;
  }
  return getRoundedRange(finalRange);
};

const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export function displayPrice(price: Range): string {
  if (!price) return '';
  if (price.min === price.max) return currency.format(price.min);
  return (currency as any).formatRange(price.min, price.max);
}

export const writePriceData = (
  type: PriceData['type'],
  range: number | Range,
  conditions?: Conditions,
  secondary?: string
): PriceData => {
  const value = typeof range === 'number'
    ? { min: range, max: range }
    : range;
  return { type, value, conditions, secondary }
};