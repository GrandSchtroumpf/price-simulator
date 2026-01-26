import { $ } from "@qwik.dev/core";
import type { FinalDynamicForm, Item } from "~/types/simulator";
import { dynamicFormRecord } from ".";

export const finalForm: FinalDynamicForm = {
  label: "Informations complémentaires",
  finalPrice: $(async (cart: Item[]) => {
    let totalMinPrice = 0;
    let totalMaxPrice = 0;
    for (const item of cart) {
      const step = dynamicFormRecord[item.dynamicFormKey];
      const itemPrice = await step.price?.(item);
      if (itemPrice?.min) {
        totalMinPrice += itemPrice.min;
        totalMaxPrice += itemPrice.max ?? itemPrice.min;
      }
    }
    return {
      min: Math.floor(totalMinPrice),
      max: Math.floor(totalMaxPrice)
    };
  }),
  controls: [
    {
      kind: 'radiogroup',
      legend: 'Quelle est la distance entre votre bien et la ville de Redon',
      name: 'location',
      required: true,
      options: [
        {
          label: "Inférieur à 20km",
          value: "close",
        },
        {
          label: "Entre 20km et 40km",
          value: "near",
        },
        {
          label: "Entre 40km et 60km",
          value: "distant",
        },
        {
          label: "Supérieur à 60km",
          value: "far",
        },
      ]
    },
  ]
}