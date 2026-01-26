import { $ } from "@qwik.dev/core";
import { DynamicForm, Item } from "~/types/simulator";
import { number } from "~/utils/helpers";
import { getPrice, writePriceData } from "~/utils/price";

export const interior: DynamicForm = {
  label: "Aménagement intérieur",
  price: $((item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      min: 1,
      priceData: writePriceData('multiplier', 1)
    }),
    {
      legend: "Étage",
      name: "room",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "RDC Neuf",
          value: "groundLevelNew",
          priceData: writePriceData('addition', 152)
        },
        {
          label: "RDC rénovation",
          value: "groundLevelRenovation",
          priceData: writePriceData('addition', 174)
        },
        {
          label: "Étage",
          value: "floorLevel",
          priceData: writePriceData('addition', 174)
        },
        {
          label: "Combles",
          value: "attic",
          priceData: writePriceData('addition', 216)
        },
        {
          label: "Combles complexes",
          value: "atticComplex",
          priceData: writePriceData('addition', 234)
        },
      ]
    },
    {
      legend: "Types d'isolant",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Laine de verre",
          value: "glass",
        },
        {
          label: "Laine de roche",
          value: "stone",
        },
        {
          label: "Laine de bois",
          value: "wood",
        },
      ]
    },
    {
      legend: "Épaisseur isolant mur (millimètres)",
      name: "wallThickness",
      kind: "radiogroup",
      required: true,
      options: [100, 120, 140, 160, 180, 200].map((mm, i) => ({
        label: `${mm} mm`,
        value: `wallThickness${mm}`,
        priceData: [
          writePriceData('multiplier', 1 + 0.05 * i, ['materials', '==', 'glass']),
          writePriceData('multiplier', 1.1 + 0.05 * i, ['materials', '==', 'stone']),
          writePriceData('multiplier', 1.3 + 0.05 * i, ['materials', '==', 'wood']),
        ]
      }))
    },
    {
      legend: "Type de plafond",
      name: "ceilingType",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Plafond droit",
          value: "straight",
          priceData: writePriceData('multiplier', 1)
        },
        {
          label: "Pente",
          value: "sloped",
          priceData: writePriceData('multiplier', 1.15)
        },
        {
          label: "Mixte (Droit et pente)",
          value: "mixte",
          priceData: writePriceData('multiplier', 1.20)
        },
        {
          label: "Pente jusqu'au faitage",
          value: "fullySoped",
          priceData: writePriceData('multiplier', 1.25)
        }
      ]
    },
    {
      legend: "Épaisseur isolant plafond (millimètres)",
      name: "ceilingThickness",
      kind: "radiogroup",
      required: true,
      options: [240, 260, 280, 300, 320, 340].map((mm, i) => ({
        label: `${mm} mm`,
        value: `ceilingThickness${mm}`,
        priceData: [
          writePriceData('multiplier', 1 + 0.05 * i, ['materials', '==', 'glass']),
          writePriceData('multiplier', 1.1 + 0.05 * i, ['materials', '==', 'stone']),
          writePriceData('multiplier', 1.35 + 0.05 * i, ['materials', '==', 'wood']),
        ]
      }))
    },
    {
      legend: "Hauteur sous plafond",
      name: "height",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Jusqu'à 2m60",
          value: "height260",
          priceData: writePriceData('multiplier', 1)
        },
        {
          label: "Entre 2m60 et 3m50",
          value: "height350",
          priceData: writePriceData('multiplier', 1.10)
        },
        {
          label: "Entre 3m50 et 4m50",
          value: "height450",
          priceData: writePriceData('multiplier', 1.20)
        },
        {
          label: "Au delà de 4m50",
          value: "heightMore",
          priceData: writePriceData('multiplier', 1.35)
        }
      ]
    },
    {
      legend: "Création de pièce (avec pose de porte)",
      name: "roomCreation",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Chambre",
          value: "bedroom",
          priceData: [
            writePriceData('multiplier', 1.05),
            writePriceData('fix', 300)
          ]
        },
        {
          label: "Salle de bain",
          value: "bathroom",
          priceData: [
            writePriceData('multiplier', 1.10),
            writePriceData('fix', 300)
          ]
        },
        {
          label: "WC",
          value: "lavatory",
          priceData: [
            writePriceData('multiplier', 1.05),
            writePriceData('fix', 300)
          ]
        }
      ]
    },
    {
      legend: "Finitions",
      name: "finish",
      kind: "checklist",
      options: [
        {
          label: "Bandes",
          value: "bands",
          priceData: [
            writePriceData('addition', 40),
            writePriceData('multiplier', 1.20, ['ceilingType', 'out', ['straight']]),
          ]
        },
        {
          label: "Ponçage des bandes",
          value: "bandSanding",
          dependsOn: ['finish', 'in', ['bands']],
          priceData: [
            writePriceData('addition', 25),
            writePriceData('multiplier', 1.20, ['ceilingType', 'out', ['straight']]),
          ]
        },
        {
          label: "Peinture",
          value: "paint",
          dependsOn: ['finish', 'array-contains', ['bands', 'bandSanding']],
          priceData: [
            writePriceData('addition', 65),
            writePriceData('multiplier', 1.20, ['ceilingType', 'out', ['straight']]),
          ]
        }
      ]
    }
  ]
}