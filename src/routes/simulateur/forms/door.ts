import { $ } from "@qwik.dev/core";
import { DynamicForm, Item } from "~/types/simulator";
import { number } from "~/utils/helpers";
import { getPrice, writePriceData } from "~/utils/price";

export const door: DynamicForm = {
  label: 'Portes',
  price: $((item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Nombre de portes intérieurs",
      name: "interiorDoor",
      min: 1,
      priceData: writePriceData('addition', 300)
    })
  ]
}