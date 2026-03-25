import { $ } from "@qwik.dev/core";
import type { DynamicForm, Item, PriceData } from "~/types/simulator";
import { writePriceData } from "~/utils/price";

const getPriceData = (coef: number, material: string) => writePriceData("multiplier", coef, { conditions: ['materials', '==', `${material}`] });

const getSurfacePriceData = (type: string, surface: number): PriceData | PriceData[] => {
  switch (type) {
    case "window": {
      if (surface < 1) return writePriceData('multiplier', 1);
      if (surface < 1.5) return writePriceData('multiplier', 1.20);
      if (surface < 2) {
        return [
          getPriceData(1.42, 'plastic'),
          getPriceData(1.35, 'aluminum'),
        ]
      }
      if (surface < 2.5) {
        return [
          getPriceData(2.06, 'plastic'),
          getPriceData(1.81, 'aluminum'),
        ]
      }
      if (surface < 3) {
        return [
          getPriceData(2.56, 'plastic'),
          getPriceData(2.40, 'aluminum'),
        ]
      }
      if (surface < 3.5) {
        return [
          getPriceData(2.90, 'plastic'),
          getPriceData(2.65, 'aluminum'),
        ]
      }
      if (surface <= 4) {
        return [
          getPriceData(3.22, 'plastic'),
          getPriceData(2.87, 'aluminum'),
        ]
      };
      return writePriceData('multiplier', 1);
    };
    case "windowDoor": {
      if (surface < 1.5) return writePriceData('multiplier', 1);
      if (surface < 2) {
        return [
          getPriceData(1.28, 'plastic'),
          getPriceData(1.08, 'aluminum'),
        ]
      }
      if (surface < 2.5) {
        return [
          getPriceData(1.56, 'plastic'),
          getPriceData(1.16, 'aluminum'),
        ]
      }
      if (surface < 3) {
        return [
          getPriceData(1.78, 'plastic'),
          getPriceData(1.24, 'aluminum'),
        ]
      }
      if (surface < 3.5) {
        return [
          getPriceData(1.90, 'plastic'),
          getPriceData(1.32, 'aluminum'),
        ]
      }
      if (surface < 4) {
        return [
          getPriceData(2.18, 'plastic'),
          getPriceData(1.42, 'aluminum'),
        ]
      }
      if (surface < 4.5) {
        return [
          getPriceData(2.45, 'plastic'),
          getPriceData(1.56, 'aluminum'),
        ]
      }
      if (surface < 5) {
        return [
          getPriceData(2.70, 'plastic'),
          getPriceData(1.70, 'aluminum'),
        ]
      }
      if (surface < 5.5) {
        return [
          getPriceData(2.88, 'plastic'),
          getPriceData(1.84, 'aluminum'),
        ]
      }
      if (surface < 6) {
        return [
          getPriceData(3.15, 'plastic'),
          getPriceData(1.98, 'aluminum'),
        ]
      }
      if (surface < 6.5) {
        return [
          getPriceData(3.41, 'plastic'),
          getPriceData(2.19, 'aluminum'),
        ]
      }
      if (surface < 7) {
        return [
          getPriceData(3.63, 'plastic'),
          getPriceData(2.44, 'aluminum'),
        ]
      }
      if (surface <= 7.5) {
        return [
          getPriceData(3.85, 'plastic'),
          getPriceData(2.68, 'aluminum'),
        ]
      }
      return writePriceData('multiplier', 1);
    }
    case 'bay': {
      if (surface < 1.5) return writePriceData('multiplier', 1);
      if (surface < 2) return writePriceData('multiplier', 1.08);
      if (surface < 2.5) return writePriceData('multiplier', 1.16);
      if (surface < 3) return writePriceData('multiplier', 1.24);
      if (surface < 3.5) return writePriceData('multiplier', 1.32);
      if (surface < 4) return writePriceData('multiplier', 1.42);
      if (surface < 4.5) return writePriceData('multiplier', 1.56);
      if (surface < 5) return writePriceData('multiplier', 1.70);
      if (surface < 5.5) return writePriceData('multiplier', 1.84);
      if (surface < 6) return writePriceData('multiplier', 1.98);
      if (surface < 6.5) return writePriceData('multiplier', 2.19);
      if (surface < 7) return writePriceData('multiplier', 2.44);
      if (surface < 7.5) return writePriceData('multiplier', 2.68);
      if (surface < 8) return writePriceData('multiplier', 2.92);
      if (surface < 8.5) return writePriceData('multiplier', 3.10);
      if (surface < 9) return writePriceData('multiplier', 3.28);
      if (surface < 9.5) return writePriceData('multiplier', 3.46);
      if (surface < 10) return writePriceData('multiplier', 3.65);
      if (surface < 10.5) return writePriceData('multiplier', 3.72);
      if (surface < 11) return writePriceData('multiplier', 3.79);
      if (surface < 11.5) return writePriceData('multiplier', 3.86);
      if (surface < 12) return writePriceData('multiplier', 3.93);
      if (surface < 12.5) return writePriceData('multiplier', 4);
      if (surface < 13) return writePriceData('multiplier', 4.06);
      if (surface < 13.5) return writePriceData('multiplier', 4.11);
      if (surface <= 14) return writePriceData('multiplier', 4.15);
      return writePriceData('multiplier', 1);
    }
    case 'gallandage': {
      if (surface < 1.5) return writePriceData('multiplier', 1);
      if (surface < 2) return writePriceData('multiplier', 1.12);
      if (surface < 2.5) return writePriceData('multiplier', 1.24);
      if (surface < 3) return writePriceData('multiplier', 1.47);
      if (surface < 3.5) return writePriceData('multiplier', 1.69);
      if (surface < 4) return writePriceData('multiplier', 1.82);
      if (surface < 4.5) return writePriceData('multiplier', 1.95);
      if (surface < 5) return writePriceData('multiplier', 2.05);
      if (surface < 5.5) return writePriceData('multiplier', 2.15);
      if (surface < 6) return writePriceData('multiplier', 2.28);
      if (surface < 6.5) return writePriceData('multiplier', 2.42);
      if (surface < 7) return writePriceData('multiplier', 2.78);
      if (surface < 7.5) return writePriceData('multiplier', 2.83);
      if (surface < 8) return writePriceData('multiplier', 2.92);
      if (surface < 8.5) return writePriceData('multiplier', 3.08);
      if (surface <= 9) return writePriceData('multiplier', 3.28);
      return writePriceData('multiplier', 1);
    }
    default: throw new Error('Corresponding opening not found');
  }
}

const getOptionsPriceData = (type: string, width: number): PriceData | PriceData[] => {
  switch (type) {
    case 'window': {
      if (width < 1) {
        return [
          getPriceData(2.3, 'plastic'),
          getPriceData(1.57, 'aluminum'),
        ]
      }
      if (width < 1.2) {
        return [
          getPriceData(2.1, 'plastic'),
          getPriceData(1.47, 'aluminum'),
        ]
      }
      if (width < 1.8) {
        return [
          getPriceData(1.88, 'plastic'),
          getPriceData(1.38, 'aluminum'),
        ]
      }
      if (width >= 1.8) {
        return [
          getPriceData(1.68, 'plastic'),
          getPriceData(1.3, 'aluminum'),
        ]
      }
      return writePriceData('multiplier', 1);
    }
    case 'windowDoor': {
      if (width < 1) {
        return [
          getPriceData(1.98, 'plastic'),
          getPriceData(1.45, 'aluminum'),
        ]
      }
      if (width < 1.2) {
        return [
          getPriceData(1.80, 'plastic'),
          getPriceData(1.32, 'aluminum'),
        ]
      }
      if (width < 1.8) {
        return [
          getPriceData(1.75, 'plastic'),
          getPriceData(1.36, 'aluminum'),
        ]
      }
      if (width < 2.2) {
        return [
          getPriceData(1.63, 'plastic'),
          getPriceData(1.3, 'aluminum'),
        ]
      }
      if (width < 2.7) {
        return [
          getPriceData(1.60, 'plastic'),
          getPriceData(1.28, 'aluminum'),
        ]
      }
      if (width >= 2.7) {
        return [
          getPriceData(1.55, 'plastic'),
          getPriceData(1.26, 'aluminum'),
        ]
      }
      return writePriceData('multiplier', 1);
    }
    case 'bay': {
      if (width < 1.2) return writePriceData('multiplier', 1.39);
      if (width < 1.6) return writePriceData('multiplier', 1.37);
      if (width < 2) return writePriceData('multiplier', 1.35);
      if (width < 2.4) return writePriceData('multiplier', 1.33);
      if (width < 2.7) return writePriceData('multiplier', 1.31);
      if (width >= 2.7) return writePriceData('multiplier', 1.30);
      return writePriceData('multiplier', 1);
    }
    case 'gallandage': {
      if (width < 1.2) return writePriceData('multiplier', 1.34);
      if (width < 1.6) return writePriceData('multiplier', 1.32);
      if (width < 2) return writePriceData('multiplier', 1.30);
      if (width < 2.4) return writePriceData('multiplier', 1.27);
      if (width < 2.7) return writePriceData('multiplier', 1.25);
      if (width >= 2.7) return writePriceData('multiplier', 1.24);
      return writePriceData('multiplier', 1);
    }
    default: throw new Error('Corresponding opening not found');
  }
}

export const exterior: DynamicForm = {
  label: 'Aménagement extérieur',
  errors: "Les dimensions saisies sortent de la plage standard du simulateur. Valider le formulaire et cliquer sur 'contacter Erwan' pour un devis personnalisé",
  controls: [
    {
      legend: "Type d'ouverture",
      name: "openings",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Fenêtre",
          value: "window",
        },
        {
          label: "Porte-fenêtre",
          value: "windowDoor",
        },
        {
          label: "Baie vitrée",
          value: "bay",
        },
        {
          label: "Baie vitrée à galandage",
          value: "gallandage",
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
          conditions: ['openings', 'in', ['window', 'windowDoor']],
          priceData: [
            writePriceData('addition', 280, { conditions: ['openings', '==', 'window'] }),
            writePriceData('addition', 390, { conditions: ['openings', '==', 'windowDoor'] }),
          ]
        },
        {
          label: "Alu",
          value: "aluminum",
          priceData: [
            writePriceData('addition', 623, { conditions: ['openings', '==', 'window'] }),
            writePriceData('addition', 768, { conditions: ['openings', '==', 'windowDoor'] }),
            writePriceData('addition', 945, { conditions: ['openings', '==', 'bay'] }),
            writePriceData('addition', 1056, { conditions: ['openings', '==', 'gallandage'] }),
          ]
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
        const priceData = getSurfacePriceData(type, surface);
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
          const type = String(item.data['openings']);
          const width = Number(item.data['surface.width']);
          const minRefs: Record<string, number> = { window: 70, windowDoor: 70, bay: 80, gallandage: 80 };
          const maxRefs: Record<string, number> = { window: 220, windowDoor: 300, bay: 600, gallandage: 400 };
          if (width < minRefs[type]) errors.push(`La largeur est inférieur aux limites standard: ${minRefs[type]}cm`);
          if (width > maxRefs[type]) errors.push(`La largeur est supérieur aux limites standard: ${maxRefs[type]}cm`);
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
          const type = String(item.data['openings']);
          const height = Number(item.data['surface.height']);
          const minRefs: Record<string, number> = { window: 60, windowDoor: 155, bay: 170, gallandage: 170 };
          const maxRefs: Record<string, number> = { window: 180, windowDoor: 235, bay: 235, gallandage: 220 };
          if (height < minRefs[type]) errors.push(`La hauteur est inférieur aux limites standard: ${minRefs[type]}cm`);
          if (height > maxRefs[type]) errors.push(`La hauteur est supérieur aux limites standard: ${maxRefs[type]}cm`);
          return errors;
        }),
        required: true,
      }]
    },
    {
      legend: "Options",
      name: "options",
      kind: 'checklist',
      options: [
        {
          label: "Vitrage de sécurité",
          value: "safety",
          priceData: $((item: Item) => {
            const materials = String(item.data['materials']);
            const width = Number(item.data['surface.width']);
            const height = Number(item.data['surface.height']);
            //Convert cm to m
            const surface = (width / 100) * (height / 100);
            const base = materials === 'plastic' ? 112 : 100;
            const value = surface * base;
            return writePriceData('fix', value);
          })
        },
        {
          label: "Volet roulant",
          value: "store",
          priceData: $((item: Item) => {
            if (!item.data['openings']) return;
            const type = String(item.data['openings']);
            const width = Number(item.data['surface.width']);
            const widthMeters = width / 100;
            const priceData = getOptionsPriceData(type, widthMeters);
            return priceData;
          })
        },
      ]
    },
  ]
}