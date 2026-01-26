import { $ } from "@qwik.dev/core";
import { DynamicForm, Item } from "~/types/simulator";
import { getPrice, writePriceData } from "~/utils/price";

export const stairs: DynamicForm = {
  label: 'Escalier',
  price: $((item: Item) => getPrice(item)),
  controls: [
    {
      legend: "Contre marche",
      name: "step",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Avec contre-marche",
          value: "withStep",
          priceData: writePriceData('addition', { min: 100, max: 120 })
        },
        {
          label: "Sans contre-marche",
          value: "withoutStep",
          priceData: writePriceData('addition', { min: 0, max: 20 })
        }
      ]
    },
    {
      legend: "Garde-corps",
      name: "guardrail",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Avec garde-corps",
          value: "withGuardrail",
          priceData: writePriceData('addition', { min: 300, max: 330 })
        },
        {
          label: "Sans garde-corps",
          value: "withoutGuardrail",
          priceData: writePriceData('addition', { min: 0, max: 30 })
        }
      ]
    },
    {
      legend: "Type d'escalier",
      name: "type",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Droit",
          value: "straight",
          priceData: writePriceData('addition', { min: 1000, max: 1500 })
        },
        {
          label: "Quart tournant",
          value: "quarter",
          priceData: writePriceData('addition', { min: 1500, max: 2000 })
        }
      ]
    },
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Hêtre",
          value: "beech",
          priceData: writePriceData('addition', { min: 0, max: 500 })
        },
        {
          label: "Pin",
          value: "pine",
          priceData: writePriceData('addition', { min: 1000, max: 1500 })
        },
        {
          label: "Limon",
          value: "stringer",
          priceData: writePriceData('addition', { min: 1500, max: 2000 })
        },
      ]
    }
  ]
}