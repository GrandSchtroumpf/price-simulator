import { Item, Conditions } from "~/types/simulator";
import { isIn } from "./helpers";

export const isConditionValid = (item?: Item, dependsOn?: Conditions) => {
  if (!item && dependsOn) return false;
  if (!dependsOn) return true;
  if (!item) return true;
  const [key, operator, value] = dependsOn;
  if (operator === '==') return item.data[key] === value;
  if (operator === '<') return item.data[key] < value;
  if (operator === '<=') return item.data[key] <= value;
  if (operator === 'in') {
    if (!Array.isArray(value)) throw 'Value should be an array with in operator';
    const itemValue = item.data[key];
    return isIn(value, itemValue);
  }
  if (operator === 'array-contains') {
    if (!Array.isArray(value)) throw 'Value should be an array with array-contains operator';
    if (!Array.isArray(item.data[key])) throw 'Value of the item should be an array with array-contains operator';
    const itemValue = item.data[key];
    return value.every((v) => isIn(itemValue, v));
  }
  if (operator === 'out') {
    if (!Array.isArray(value)) throw 'Value should be an array with in operator';
    const itemValue = item.data[key];
    return !isIn(value, itemValue);
  }
  throw 'Unsupported operator';
};