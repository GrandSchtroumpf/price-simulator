import type { ControlTypes, InputTypes, Item, PriceData, Conditions, Range, DynamicForm, DynamicFormKey, GetPriceData } from "~/types/simulator";
import { isConditionValid } from "./conditions";
import { toArray } from "./helpers";

const getPriceDataContent = (price: GetPriceData, item: Item) => {
  if ('getHash' in price) return price(item);
  return price;
}

const getPriceData = (control: ControlTypes, value: InputTypes, item: Item) => {
  if (control.kind === "input" && control.type === 'number') {
    const prices = toArray(control.priceData);
    const getPrices = prices.map(async (rawPrice) => {
      const price = await getPriceDataContent(rawPrice, item);
      return {
        ...price,
        value: {
          min: price.rangeOnly ? price.value.min : Number(value) * price.value.min,
          max: price.rangeOnly ? price.value.max : Number(value) * price.value.max,
        }
      }
    });
    return Promise.all(getPrices);
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
  const average = (min + max) / 2;
  return {
    min: roundNumber(average - (average * 0.10)),
    max: roundNumber(average + (average * 0.10))
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

 
export const getPrice = async (item: Item, dynamicFormRecord: Record<DynamicFormKey, DynamicForm>) => {
  const form: DynamicForm = dynamicFormRecord[item.dynamicFormKey];
  const priceTypes: Record<string, { addition: Range, multiplier: Range, fix: Range }> = { primary: generatePriceTypes() };
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = form.controls.find(c => c.name === controlName);
    if (!control) continue;
    const priceData = await getPriceData(control, value, item);
    const prices = Array.isArray(priceData) ? priceData : [priceData];
    for (const rawPrice of prices) {
      if (!rawPrice) continue;
      const price = await getPriceDataContent(rawPrice, item);
      if (!price.column) {
        writePriceTypes(item, priceTypes.primary, price);
      } else {
        const column = price.column;
        if (!priceTypes[column.name]) {
          priceTypes[column.name] = generatePriceTypes();
          const sControl = form.controls.find((control) => control.name === column.control);
          const sValue = item.data[column.control];
          if (!sControl || !sValue) continue;
          const sPrices = await getPriceData(sControl, sValue, item);
          if (!sPrices) continue;
          for (const sStuff of sPrices) {
            const sPrice = await getPriceDataContent(sStuff, item);
            writePriceTypes(item, priceTypes[column.name], sPrice);
          }
        }
        writePriceTypes(item, priceTypes[column.name], price);
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
  options?: {
    conditions?: Conditions,
    column?: {
      control: string;
      name?: string;
    },
    rangeOnly?: boolean
  }
): PriceData => {
  const { conditions, column, rangeOnly } = options ?? {};
  const normalizedColumn = column && {
    control: column.control,
    name: column.name ?? column.control
  }
  const value = typeof range === 'number'
    ? { min: range, max: range }
    : range;
  return { type, value, conditions, column: normalizedColumn, rangeOnly }
};