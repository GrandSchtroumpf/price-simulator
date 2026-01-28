import { $ } from "@qwik.dev/core";
import type { DynamicForm, Item } from "~/types/simulator";
import { inputNumber } from "~/utils/helpers";
import { dynamicFormRecord } from ".";
import { getPrice, writePriceData } from "~/utils/price";

export const door: DynamicForm = {
  label: 'Portes',
  price: $((item: Item) => getPrice(item, dynamicFormRecord)),
  controls: [
    inputNumber({
      label: "Nombre de portes intérieurs",
      name: "interiorDoor",
      min: 1,
      priceData: writePriceData('addition', 300)
    })
  ]
}