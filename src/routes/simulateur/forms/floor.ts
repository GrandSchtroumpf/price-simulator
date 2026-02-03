import { $ } from "@qwik.dev/core";
import type { DynamicForm, Item } from "~/types/simulator";
import { inputNumber } from "~/utils/helpers";
import { getPrice, writePriceData } from "~/utils/price";
import { dynamicFormRecord } from ".";

export const floor: DynamicForm = {
  label: 'Sol',
  price: $((item: Item) => getPrice(item, dynamicFormRecord)),
  controls: [
    inputNumber({
      label: "Surface en m²",
      name: "surface",
      required: true,
      min: 1,
      priceData: writePriceData('multiplier', 1)
    }),
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Stratifié",
          value: "plastic",
          priceData: writePriceData('addition', 54)
        },
        {
          label: "Stratifié Premium",
          value: "plasticPremium",
          priceData: writePriceData('addition', 85)
        },
        {
          label: "Contrecollé",
          value: "laminated",
          priceData: writePriceData('addition', 100)
        },
        {
          label: "Contrecollé Premium",
          value: "laminatedPremium",
          priceData: writePriceData('addition', 140)
        },
        {
          label: "Chêne Massif",
          value: "hardOak",
          priceData: writePriceData('addition', { min: 200, max: 250 })
        },
        {
          label: "Massif Premium",
          value: "hardPremium",
          priceData: writePriceData('addition', { min: 225, max: 250 })
        },
      ]
    },
    {
      legend: "Type de pose",
      name: "laidType",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Flottant",
          value: "floating",
          priceData: writePriceData('multiplier', 1),
          dependsOn: ['materials', 'in', ['plastic', 'plasticPremium']]
        },
        {
          label: "Collé",
          value: "glued",
          priceData: writePriceData('multiplier', 1.15),
          dependsOn: ['materials', 'in', ['hardOak', 'hardPremium', 'laminated', 'laminatedPremium']]
        },
        {
          label: "Cloué",
          value: "nailed",
          priceData: writePriceData('multiplier', 1.35),
          dependsOn: ['materials', 'in', ['hardOak', 'hardPremium', 'laminatedPremium']]
        }
      ]
    },
    {
      legend: "Format",
      name: "format",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Joint",
          value: "join",
          priceData: writePriceData('multiplier', 1),
        },
        {
          label: "Bâtons rompu",
          value: "fitsStarts",
          priceData: writePriceData('multiplier', 1.35),
        },
        {
          label: "Coupe de Pierre",
          value: "stone",
          priceData: writePriceData('multiplier', 1.35),
        },
        {
          label: "En échelle",
          value: "ladder",
          priceData: writePriceData('multiplier', 1.35),
        },
        {
          label: "Pointe de hongrie",
          value: "arrow",
          priceData: writePriceData('multiplier', 1.65),
          dependsOn: ['materials', 'in', ['hardOak', 'hardPremium', 'laminated', 'laminatedPremium']]
        },
        {
          label: "Fougère",
          value: "fern",
          priceData: writePriceData('multiplier', 1.65),
          dependsOn: ['materials', 'in', ['hardOak', 'hardPremium', 'laminated', 'laminatedPremium']]
        }
      ]
    },
    {
      legend: "État du support",
      name: "supportState",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Prêt à poser",
          value: "ready",
          priceData: writePriceData('addition', 1),
        },
        {
          label: "Légèrement irrégulier",
          value: "irregular",
          priceData: writePriceData('addition', 18),
        },
        {
          label: "Dégradé",
          value: "deteriorated",
          priceData: writePriceData('addition', 35),
        }
      ]
    },
    {
      legend: "Options",
      name: "options",
      kind: "checklist",
      options: [
        {
          label: "Plinthe MDF",
          value: "plinth",
          priceData: writePriceData('addition', Math.sqrt(12)),
        },
        {
          label: "Barre de seuil",
          value: "bar",
          priceData: writePriceData('addition', Math.sqrt(8)),
        },
        {
          label: "Sous couche compatible plancher chauffant",
          value: "heatTreated",
          priceData: writePriceData('addition', 4.5),
        }
      ]
    }
  ]
}