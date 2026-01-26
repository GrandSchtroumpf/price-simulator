import { DynamicForm, Item } from "~/types/simulator"
import { getPrice, writePriceData } from "~/utils/price"
import { number } from "~/utils/helpers"
import { $ } from "@qwik.dev/core"

export const deck: DynamicForm = {
  label: "Terrasse",
  price: $((item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      min: 1,
      priceData: writePriceData('multiplier', 1)
    }),
    {
      legend: "Niveau",
      name: "level",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Sol",
          value: "groundLevel",
          priceData: writePriceData('multiplier', { min: 1, max: 1.1 })
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithStairs",
          priceData: writePriceData('multiplier', { min: 1.3, max: 1.4 })
        },
        {
          label: "Surélevé sans escalier",
          value: "elevatedWithoutStairs",
          priceData: writePriceData('multiplier', { min: 1.1, max: 1.2 })
        },
      ]
    },
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Douglas",
          value: "douglas",
          priceData: writePriceData('addition', { min: 100, max: 110 })
        },
        {
          label: "Composite",
          value: "composite",
          priceData: writePriceData('addition', { min: 120, max: 150 })
        },
        {
          label: "Autoclave",
          value: "treated",
          priceData: writePriceData('addition', { min: 250, max: 270 })
        },
      ]
    },
    {
      legend: "Garde corps",
      name: "guardrail",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Sans garde corps",
          value: "withoutGuard",
          priceData: writePriceData('addition', { min: 0, max: 5 })
        },
        {
          label: "Bois",
          value: "woodGuard",
          priceData: writePriceData('addition', { min: 10, max: 15 })
        },
        {
          label: "Alu",
          value: "aluminumGuard",
          priceData: writePriceData('addition', { min: 15, max: 20 })
        },
      ]
    }
  ]
}