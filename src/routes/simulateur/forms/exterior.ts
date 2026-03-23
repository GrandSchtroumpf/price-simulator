import { $ } from "@qwik.dev/core";
import type { DynamicForm, Item, PriceData } from "~/types/simulator";
import { writePriceData } from "~/utils/price";

const getSurfacePriceData = (type: string, surface: number): PriceData | PriceData[] => {
  switch (type) {
    case "window": {
      if (surface < 1) return writePriceData('multiplier', 1);
      if (surface < 1.5) return writePriceData('multiplier', 1.20);
      if (surface < 2) {
        return [
          writePriceData('multiplier', 1.42, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.35, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 2.5) {
        return [
          writePriceData('multiplier', 2.06, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.81, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 3) {
        return [
          writePriceData('multiplier', 2.56, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.40, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 3.5) {
        return [
          writePriceData('multiplier', 2.90, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.65, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface <= 4) {
        return [
          writePriceData('multiplier', 3.22, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.87, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      };
      return writePriceData('multiplier', 1);
    };
    case "windowDoor": {
      if (surface < 1.5) return writePriceData('multiplier', 1);
      if (surface < 2) {
        return [
          writePriceData('multiplier', 1.28, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.08, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 2.5) {
        return [
          writePriceData('multiplier', 1.55, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.16, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 3) {
        return [
          writePriceData('multiplier', 1.78, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.24, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 3.5) {
        return [
          writePriceData('multiplier', 1.90, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.32, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 4) {
        return [
          writePriceData('multiplier', 2.18, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.42, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 4.5) {
        return [
          writePriceData('multiplier', 2.45, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.56, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 5) {
        return [
          writePriceData('multiplier', 2.70, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.70, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 5.5) {
        return [
          writePriceData('multiplier', 2.88, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.84, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 6) {
        return [
          writePriceData('multiplier', 3.15, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 1.98, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 6.5) {
        return [
          writePriceData('multiplier', 3.41, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.19, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 7) {
        return [
          writePriceData('multiplier', 3.63, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.44, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface <= 7.5) {
        return [
          writePriceData('multiplier', 3.85, { conditions: ['materials', '==', 'plastic'] }),
          writePriceData('multiplier', 2.68, { conditions: ['materials', '==', 'aluminum'] }),
        ]
      }
      if (surface < 8) return writePriceData('multiplier', 2.92, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 8.5) return writePriceData('multiplier', 3.10, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 9) return writePriceData('multiplier', 3.28, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 9.5) return writePriceData('multiplier', 3.46, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 10) return writePriceData('multiplier', 3.65, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 10.5) return writePriceData('multiplier', 3.72, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 11) return writePriceData('multiplier', 3.79, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 11.5) return writePriceData('multiplier', 3.86, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 12) return writePriceData('multiplier', 3.93, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 12.5) return writePriceData('multiplier', 4, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 13) return writePriceData('multiplier', 4.06, { conditions: ['materials', '==', 'aluminum'] });
      if (surface < 13.5) return writePriceData('multiplier', 4.11, { conditions: ['materials', '==', 'aluminum'] });
      if (surface <= 14) return writePriceData('multiplier', 4.15, { conditions: ['materials', '==', 'aluminum'] });
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
            writePriceData('addition', 284, { conditions: ['openings', '==', 'window'] }),
            writePriceData('addition', 420, { conditions: ['openings', '==', 'windowDoor'] }),
          ]
        },
        {
          label: "Alu",
          value: "aluminum",
          priceData: [
            writePriceData('addition', 560, { conditions: ['openings', '==', 'window'] }),
            writePriceData('addition', 850, { conditions: ['openings', '==', 'windowDoor'] }),
          ]
        }
      ]
    },
    {
      legend: "Surface",
      kind: "multiples",
      name: "surface",
      priceData:
        $((item: Item) => {
          const type = String(item.data['openings']);
          const width = Number(item.data['surface.width']);
          const height = Number(item.data['surface.height']);
          //Convert cm to m
          const surface = (width / 100) * (height / 100);
          const priceData = getSurfacePriceData(type, surface);
          return priceData;
        })
      ,
      inputs: [{
        label: "Largeur de l'ouverture (en cm)",
        kind: "input",
        type: "number",
        name: "width",
        min: 0,
        errors: $((item) => {
          const errors: string[] = [];
          if (!item) return errors;
          const type = String(item.data['openings']);
          const height = Number(item.data['surface.height']);
          const minRefs: Record<string, number> = { window: 70, windowDoor: 70, bay: 80, gallandage: 80 };
          const maxRefs: Record<string, number> = { window: 220, windowDoor: 300, bay: 600, gallandage: 300};
          if (height < minRefs[type]) errors.push(`La hauteur est inférieur aux limites standard: ${minRefs[type]}cm`);
          if (height > maxRefs[type]) errors.push(`La hauteur est supérieur aux limites standard: ${maxRefs[type]}cm`);
          return errors;
        }),
        required: true,
      },
      {
        label: "Hauteur de l'ouverture (en cm)",
        kind: "input",
        type: "number",
        name: "height",
        min: 0,
        errors: $((item) => {
          const errors: string[] = [];
          if (!item) return errors;
          const type = String(item.data['openings']);
          const width = Number(item.data['surface.width']);
          const minRefs: Record<string, number> = { window: 60, windowDoor: 155, bay: 170, gallandage: 170 };
          const maxRefs: Record<string, number> = { window: 180, windowDoor: 235, bay: 235, gallandage: 235 };
          if (width < minRefs[type]) errors.push(`La largeur est inférieur aux limites standard: ${minRefs[type]}cm`);
          if (width > maxRefs[type]) errors.push(`La largeur est supérieur aux limites standard: ${maxRefs[type]}cm`);
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
          priceData: [
            writePriceData('multiplier', 0.20, { conditions: ['materials', '==', 'aluminum'], column: { control: 'materials', name: 'option-1' } }),
            writePriceData('multiplier', 0.30, { conditions: ['materials', '==', 'plastic'], column: { control: 'materials', name: 'option-1' } }),
          ]
        },
        {
          label: "Volet roulant",
          value: "store",
          priceData: [
            writePriceData('multiplier', 0.45, { conditions: ['materials', '==', 'aluminum'], column: { control: 'materials', name: 'option-2' } }),
            writePriceData('multiplier', 0.80, { conditions: ['materials', '==', 'plastic'], column: { control: 'materials', name: 'option-2' } }),
          ]
        },
      ]
    },
  ]
}