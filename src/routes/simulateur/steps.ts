import { $, QRL } from "@qwik.dev/core";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;
type DependsOperators = '<' | '>' | '<=' | '>=' | '=' | 'in' | 'out';
type DependsValue = string | number | string[] | number[];
export type Conditions = [string, DependsOperators, DependsValue];
export interface Range {
  min: number;
  max: number;
}

interface PriceData {
  type: 'multiplier' | 'addition' | 'fix';
  value: Range;
  time?: number;
  conditions?: Conditions;
}

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export interface Step {
  controls: ControlTypes[];
  label: string;
  price?: QRL<(cart: Item) => Range>;
};

interface FinalStep extends Omit<Step, 'price'> {
  finalPrice?: QRL<(cart: Item[]) => Promise<Range>>;
}

export interface Control<T> {
  kind: T;
  name: string;
  class?: string;
}

interface Input extends Control<'input'> {
  label?: string;
  required?: boolean;
  pattern?: string;
  inputmode?: string;
  readonly?: boolean
  placeholder?: string;
  priceData?: PriceData | PriceData[];
  dependsOn?: Conditions;
  disabled?: boolean;
}

interface CheckBox extends Control<'checkbox'> {
  label: string;
  required?: boolean;
  checked?: boolean;
  priceData?: PriceData | PriceData[];
  dependsOn?: Conditions;
}

interface InputNumber extends Input {
  value?: number;
  type: 'number';
  min?: number;
  max?: number;
  step?: number | 'any';
}

interface InputString extends Input {
  value?: string;
  type: 'text' | 'search' | 'url' | 'email' | 'password';
  maxlength?: number;
  minlength?: number;
}

export interface CheckList extends Control<'checklist'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
    priceData?: PriceData | PriceData[];
    dependsOn?: Conditions;
    disabled?: boolean;
  }[];
}

interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
    priceData?: PriceData | PriceData[];
    dependsOn?: Conditions;
    disabled?: boolean;
  }[];
}

const number = (p: Omit<InputNumber, 'kind' | 'type'>): InputNumber => ({
  kind: 'input',
  type: 'number',
  ...p
});

const toArray = <T>(value?: T | T[]) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

const getPriceData = (control: ControlTypes, value: InputTypes) => {
  if (control.kind === "input" && control.type === 'number') {
    const prices = toArray(control.priceData);
    return prices.map((price) => ({
      ...price,
      value: {
        min: Number(value) * price.value.min,
        max: Number(value) * price.value.max,
      }
    }))
  };
  if (control.kind === 'radiogroup') {
    const option = control.options.find((option) => option.value === value);
    if (option?.priceData) return toArray(option.priceData);
  }
  if (control.kind === 'checklist') {
    const priceData = [];
    const values = Array.isArray(value) ? value : [value];
    for (const v of values) {
      const option = control.options.find((option) => option.value === v);
      priceData.push(...toArray(option?.priceData));
    }
    return priceData;
  }
};


function isIn<T>(array: T[], value: T) {
  if (Array.isArray(value)) {
    for (const v of value) {
      const included = array.includes(v);
      if (included) return true;
    }
  } else {
    return array.includes(value);
  }
}

export const isConditionValid = (item?: Item, dependsOn?: Conditions) => {
  if (!item && dependsOn) return false;
  if (!dependsOn) return true;
  if (!item) return true;
  const [key, operator, value] = dependsOn;
  if (operator === '=') return item.data[key] === value;
  if (operator === '<') return item.data[key] < value;
  if (operator === '<=') return item.data[key] <= value;
  if (operator === 'in') {
    if (!Array.isArray(value)) throw 'Value should be an array with in operator';
    const itemValue = item.data[key];
    return isIn(value, itemValue);
  }
  throw 'Unsupported operator';
};

const getPrice = (item: Item) => {
  const step = stepsRecord[item.stepKey];
  const addition = { min: 0, max: 0 };
  const multiplier = { min: 1, max: 1 };
  const fix = { min: 0, max: 0 };
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = step.controls.find(c => c.name === controlName);
    if (!control) continue;
    const priceData = getPriceData(control, value);
    const prices = Array.isArray(priceData) ? priceData : [priceData];
    for (const price of prices) {
      if (price?.conditions) {
        if (!isConditionValid(item, price.conditions)) continue;
      }
      if (!price?.value) continue;
      const { min, max } = price.value;
      if (price.type === 'fix') {
        fix.min += min ?? 0;
        fix.max += max ?? 0;
      }
      if (price.type === 'addition') {
        addition.min += min ?? 0;
        addition.max += max ?? 0;
      }
      if (price.type === 'multiplier') {
        multiplier.min *= min ?? 1;
        multiplier.max *= max ?? 1;
      }
    }
  }
  return {
    min: Math.floor(addition.min * multiplier.min + fix.min),
    max: Math.floor(addition.max * multiplier.max + fix.max),
  };
};

const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export async function displayPrice(pricePromise?: Promise<Range>): Promise<string> {
  const price = await pricePromise;
  if (!price) return '';
  if (price.min === price.max) return currency.format(price.min);
  return (currency as any).formatRange(price.min, price.max);
}


const writePriceData = (
  type: PriceData['type'],
  range: number | Range,
  conditions?: Conditions
): PriceData => {
  const value = typeof range === 'number'
    ? { min: range, max: range }
    : range;
  return { type, value, conditions }
};

const floor: Step = {
  label: 'Sol',
  price: $((item: Item) => getPrice(item)),
  controls: [
    number({
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
      required: true,
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

const interior: Step = {
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
          writePriceData('multiplier', 1 + 0.05 * i, ['materials', '=', 'glass']),
          writePriceData('multiplier', 1.1 + 0.05 * i, ['materials', '=', 'stone']),
          writePriceData('multiplier', 1.3 + 0.05 * i, ['materials', '=', 'wood']),
        ]
      }))
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
          writePriceData('multiplier', 1 + 0.05 * i, ['materials', '=', 'glass']),
          writePriceData('multiplier', 1.1 + 0.05 * i, ['materials', '=', 'stone']),
          writePriceData('multiplier', 1.35 + 0.05 * i, ['materials', '=', 'wood']),
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
      legend: "Création de pièce",
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
      required: true,
      options: [
        {
          label: "Bandes",
          value: "bands",
          priceData: writePriceData('addition', 40)
        },
        {
          label: "Ponçage des bandes",
          value: "bandSanding",
          priceData: writePriceData('addition', 25)
        },
        {
          label: "Peinture",
          value: "paint",
          priceData: writePriceData('addition', 65)
        }
      ]
    }
  ]
}

const deck: Step = {
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

const doors: Step = {
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

const test: Step = {
  label: 'Test',
  price: $((item: Item) => getPrice(item)),
  controls: [
    {
      legend: "Start",
      name: "start",
      kind: "checklist",
      options: [
        {
          label: "Avec start",
          value: "withStart",
          priceData: writePriceData('addition', 300)
        },
        {
          label: "Sans start",
          value: "withoutStart",
          priceData: writePriceData('multiplier', 2),
          dependsOn: ['start', 'in', ['withStart']]
        }
      ]
    }
  ]
}


const stairs: Step = {
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

export const finalStep: FinalStep = {
  label: "Informations complémentaires",
  finalPrice: $(async (cart: Item[]) => {
    let totalMinPrice = 0;
    let totalMaxPrice = 0;
    for (const item of cart) {
      const step = stepsRecord[item.stepKey];
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


export const stepsRecord = {
  interior,
  deck,
  doors,
  stairs,
  floor,
  test
}