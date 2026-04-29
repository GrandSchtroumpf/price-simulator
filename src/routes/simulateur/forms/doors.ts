import { $ } from "@qwik.dev/core";
import type { DynamicForm, Item } from "~/types/simulator";
import { writePriceData } from "~/utils/price";

const getBasePriceData = (price: number, material: string) => writePriceData("addition", price, { conditions: ['materials', '==', `${material}`] });
const getSurfacePriceData = (coef: number, material: string) => writePriceData("multiplier", coef, { conditions: ['materials', '==', `${material}`] });

const getBasePrice = (type: string, width: number) => {
  switch (type) {
    case 'classic': {
      if (width <= 105) {
        return [
          getBasePriceData(1147, 'plastic'),
          getBasePriceData(1757, 'aluminum'),
        ];
      }
      return [
        getBasePriceData(1665, 'plastic'),
        getBasePriceData(2647, 'aluminum'),
      ]
    };
    case 'traditional': {
      if (width <= 105) {
        return [
          getBasePriceData(1611, 'plastic'),
          getBasePriceData(2529, 'aluminum'),
        ]
      }
      return [
        getBasePriceData(2140, 'plastic'),
        getBasePriceData(3380, 'aluminum'),
      ]
    };
    case 'modern': {
      if (width <= 105) {
        return [
          getBasePriceData(1597, 'plastic'),
          getBasePriceData(2614, 'aluminum'),
        ]
      }
      return [
        getBasePriceData(2113, 'plastic'),
        getBasePriceData(3432, 'aluminum'),
      ]
    };
    default: throw new Error('Corresponding door type not found');
  }
}

const getSurfacePrice = (type: string, width: number, surface: number) => {
  if (type === "classic") {
    if (surface < 1.75) {
      if (width <= 105) return writePriceData('multiplier', 1)
    }
    if (surface < 2) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.03, 'plastic'),
          getSurfacePriceData(1.07, 'aluminum'),
        ]
      }
    }
    if (surface < 2.25) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.06, 'plastic'),
          getSurfacePriceData(1.15, 'aluminum'),
        ]
      }
    }
    if (surface < 2.42) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.08, 'plastic'),
          getSurfacePriceData(1.23, 'aluminum'),
        ]
      }
    }
    if (surface < 2.75) {
      if (width > 105) return writePriceData('multiplier', 1)
    }
    if (surface < 3.25) {
      if (width > 105) {
        return [
          getSurfacePriceData(1.07, 'plastic'),
          getSurfacePriceData(1.8, 'aluminum'),
        ]
      }
    }
    if (surface < 3.75) {
      if (width > 105) {
        return [
          getSurfacePriceData(1.15, 'plastic'),
          getSurfacePriceData(1.16, 'aluminum'),
        ]
      }
    }
    if (surface <= 4) {
      if (width > 105) return getSurfacePriceData(1.22, 'aluminum')
    }
    if (surface > 4) {
      return writePriceData('multiplier', 1);
    }
  } else if (type === "modern" || type === "traditional") {
    if (surface < 1.75) {
      if (width <= 105) return writePriceData('multiplier', 1)
    }
    if (surface < 2) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.03, 'plastic'),
          getSurfacePriceData(1.03, 'aluminum'),
        ]
      }
    }
    if (surface < 2.25) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.06, 'plastic'),
          getSurfacePriceData(1.06, 'aluminum'),
        ]
      }
    }
    if (surface < 2.42) {
      if (width <= 105) {
        return [
          getSurfacePriceData(1.08, 'plastic'),
          getSurfacePriceData(1.09, 'aluminum'),
        ]
      }
    }
    if (surface < 2.75) {
      if (width > 105) return writePriceData('multiplier', 1)
    }
    if (surface < 3.25) {
      if (width > 105) {
        return [
          getSurfacePriceData(1.07, 'plastic'),
          getSurfacePriceData(1.05, 'aluminum'),
        ]
      }
    }
    if (surface < 3.75) {
      if (width > 105) {
        return getSurfacePriceData(1.15, 'plastic')
      }
    }
    if (surface <= 4) {
      if (width > 105) {
        return getSurfacePriceData(1.13, 'aluminum')
      }
    }
    if (surface > 4) {
      return writePriceData('multiplier', 1);
    }
  }
}


export const doors: DynamicForm = {
  label: 'Portes extérieures',
  errors: "Les dimensions saisies sortent de la plage standard du simulateur. Valider le formulaire et cliquer sur 'contacter Erwan' pour un devis personnalisé",
  controls: [
    {
      legend: "Type de porte",
      name: "openings",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Classique",
          value: "classic",
        },
        {
          label: "Traditionnelle",
          value: "traditional",
        },
        {
          label: "Moderne",
          value: "modern",
        }
      ]
    },
    {
      legend: "Matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "PVC",
          value: "plastic",
          priceData: $((item: Item) => {
            const type = String(item.data['openings']);
            const width = Number(item.data['surface.width']);
            return getBasePrice(type, width);
          })
        },
        {
          label: "Alu",
          value: "aluminum",
          priceData: $((item: Item) => {
            const type = String(item.data['openings']);
            const width = Number(item.data['surface.width']);
            return getBasePrice(type, width);
          })
        }
      ]
    },
    {
      legend: "Surface",
      kind: "multiples",
      name: "surface",
      priceData: $((item: Item) => {
        if (!item.data['openings']) return;
        const type = String(item.data['openings']);
        const width = Number(item.data['surface.width']);
        const height = Number(item.data['surface.height']);
        //Convert cm to m
        const surface = (width / 100) * (height / 100);
        const priceData = getSurfacePrice(type, width, surface);
        return priceData;
      }),
      inputs: [{
        label: "Largeur de l'ouverture (en cm)",
        kind: "input",
        type: "number",
        name: "surface.width",
        min: 1,
        errors: $((item) => {
          const errors: string[] = [];
          if (!item) return errors;
          const width = Number(item.data['surface.width']);
          const minWidth = 80;
          const maxWidth = 160;
          if (width < minWidth) errors.push(`La largeur est inférieur aux limites standard: ${minWidth}cm`);
          if (width > maxWidth) errors.push(`La largeur est supérieur aux limites standard: ${maxWidth}cm`);
          return errors;
        }),
        required: true,
      },
      {
        label: "Hauteur de l'ouverture (en cm)",
        kind: "input",
        type: "number",
        name: "surface.height",
        min: 1,
        errors: $((item) => {
          const errors: string[] = [];
          if (!item) return errors;
          const height = Number(item.data['surface.height']);
          const minHeight = 200;
          const maxHeight = 230;
          if (height < minHeight) errors.push(`La hauteur est inférieur aux limites standard: ${minHeight}cm`);
          if (height > maxHeight) errors.push(`La hauteur est supérieur aux limites standard: ${maxHeight}cm`);
          return errors;
        }),
        required: true,
      }]
    }
  ]
}