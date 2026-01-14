import { $, QRL } from "@qwik.dev/core";
import StepKey from "./[stepKey]";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;

interface PriceTable {
  addition?: Record<string, number>;
  multiplier?: Record<string, number>;
}

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export interface Step {
  controls: ControlTypes[];
  label: string;
  price?: QRL<(cart: Item) => Promise<number>>;
};

interface FinalStep extends Omit<Step, 'price'> {
  finalPrice?: QRL<(cart: Item[]) => Promise<number>>;
}

export interface Control<T> {
  kind: T;
  name: string;
  class?: string;
  calcType?: 'addition' | 'multiplier';
}

interface Input extends Control<'input'> {
  label?: string;
  required?: boolean;
  pattern?: string;
  inputmode?: string;
  readonly?: boolean
  placeholder?: string;
}

interface CheckBox extends Control<'checkbox'> {
  label: string;
  required?: boolean;
  checked?: boolean;
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
  }[];
}

interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
}

const number = (p: Omit<InputNumber, 'kind' | 'type'>): InputNumber => ({
  kind: 'input',
  type: 'number',
  ...p
});

const getPrice = $((item: Item, stepKey: StepKey, priceTable: PriceTable) => {
  const step = stepsRecord[stepKey];
  const dataRecord: Record<string, any> = {}
  for (const control of step.controls) {
    if (!control.calcType) continue;
    if (!dataRecord[control.calcType]) dataRecord[control.calcType] = [];
    const itemValue = item.data[control.name];
    if (typeof itemValue === 'number') {
      dataRecord[control.calcType].push(itemValue);
    } else if (typeof itemValue === 'string') {
      const priceData = priceTable[control.calcType]?.[itemValue];
      dataRecord[control.calcType].push(priceData);
    }
  }
  const base = (dataRecord['addition']?.reduce((a: number, b: number) => a + b, 0) || 1);
  const multipliers = (dataRecord['multiplier']?.reduce((a: number, b: number) => a * b, 1) || 1);
  return Math.floor(base * multipliers)
});

const floor: Step = {
  label: 'Sol',
  price: $(async (item: Item) => {
    const materialPrices: Record<string, number> = {
      hard: 200,
      plastic: 100,
      vinyl: 150
    };
    return getPrice(item, 'floor', { multiplier: materialPrices });
  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      required: true,
      value: 1,
      min: 1,
      calcType: 'multiplier'
    }),
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      calcType: 'multiplier',
      options: [
        {
          label: "Massif",
          value: "hard"
        },
        {
          label: "Stratifié",
          value: "plastic"
        },
        {
          label: "Vinyle-PVC",
          value: "vinyl"
        },
      ]
    }
  ]
}

const interior: Step = {
  label: "Aménagement/Isolation intérieur",
  price: $((item: Item) => {
    const materialPrices: Record<string, number> = {
      glass: 100,
      rock: 150,
      wood: 250
    };
    const multipliers: Record<string, number> = {
      groundLevel: 1,
      floorLevel: 1.1,
      attic: 1.2,
    };
    return getPrice(item, 'interior', { multiplier: { ...materialPrices, ...multipliers } });

  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1,
      calcType: 'multiplier',
    }),
    {
      legend: "Pièce",
      name: "room",
      kind: "radiogroup",
      required: true,
      calcType: 'multiplier',
      options: [
        {
          label: "Rez de chaussée",
          value: "groundLevel",
        },
        {
          label: "Étage",
          value: "floorLevel"
        },
        {
          label: "Combles",
          value: "attic"
        },
      ]
    },
    {
      legend: "Types de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      calcType: 'multiplier',
      options: [
        {
          label: "Laine de verre",
          value: "glass"
        },
        {
          label: "Laine de roche",
          value: "rock"
        },
        {
          label: "Laine de bois",
          value: "wood"
        },
      ]
    }
  ]
}

const deck: Step = {
  label: "Terrasse",
  price: $((item: Item) => {
    const materialPrices: Record<string, number> = {
      douglas: 100,
      composite: 150,
      treated: 250
    };
    const flatModifiers: Record<string, number> = {
      withoutGuard: 0,
      woodGuard: 10,
      aluminumGuard: 15
    };
    const multipliers: Record<string, number> = {
      groundLevel: 1,
      elevatedWithStairs: 1.3,
      elevatedWithoutStairs: 1.1,
    };
    return getPrice(item, 'deck', { multiplier: { ...materialPrices, ...multipliers }, addition: flatModifiers });
  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1,
      calcType: 'multiplier'
    }),
    {
      legend: "Niveau",
      name: "level",
      kind: "radiogroup",
      required: true,
      calcType: 'multiplier',
      options: [
        {
          label: "Sol",
          value: "groundLevel"
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithStairs"
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithoutStairs"
        },
      ]
    },
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      calcType: 'multiplier',
      options: [
        {
          label: "Douglas",
          value: "douglas"
        },
        {
          label: "Composite",
          value: "composite"
        },
        {
          label: "Autoclave",
          value: "treated"
        },
      ]
    },
    {
      legend: "Garde corps",
      name: "guardrail",
      kind: "radiogroup",
      calcType: 'addition',
      required: true,
      options: [
        {
          label: "Sans garde corps",
          value: "withoutGuard"
        },
        {
          label: "Bois",
          value: "woodGuard"
        },
        {
          label: "Alu",
          value: "aluminumGuard"
        },
      ]
    }
  ]
}


const stairs: Step = {
  label: 'Escalier',
  price: $((item: Item) => {
    const unitPrice: Record<string, number> = {
      straight: 1000,
      quarter: 1500,
    }
    const materialPrices: Record<string, number> = {
      beech: 0,
      pine: 1000,
      stringer: 1500
    };
    const flatModifiers: Record<string, number> = {
      withStep: 100,
      withoutStep: 0,
      withGuardrail: 300,
      withoutGuardrail: 0,
    };
    return getPrice(item, 'stairs', { addition: { ...materialPrices, ...unitPrice, ...flatModifiers } });
  }),
  controls: [
    {
      legend: "Contre marche",
      name: "step",
      kind: "radiogroup",
      required: true,
      calcType: 'addition',
      options: [
        {
          label: "Avec contre-marche",
          value: "withStep"
        },
        {
          label: "Sans contre-marche",
          value: "withoutStep"
        }
      ]
    },
    {
      legend: "Garde-corps",
      name: "guardrail",
      kind: "radiogroup",
      required: true,
      calcType: 'addition',
      options: [
        {
          label: "Avec garde-corps",
          value: "withGuardrail"
        },
        {
          label: "Sans garde-corps",
          value: "withoutGuardrail"
        }
      ]
    },
    {
      legend: "Type d'escalier",
      name: "type",
      kind: "radiogroup",
      required: true,
      calcType: 'addition',
      options: [
        {
          label: "Droit",
          value: "straight"
        },
        {
          label: "Quart tournant",
          value: "quarter"
        }
      ]
    },
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      calcType: 'addition',
      options: [
        {
          label: "Hêtre",
          value: "beech"
        },
        {
          label: "Pin",
          value: "pine"
        },
        {
          label: "Limon",
          value: "stringer"
        },
      ]
    }
  ]
}

export const finalStep: FinalStep = {
  label: "Informations complémentaires",
  finalPrice: $(async (cart: Item[]) => {
    let totalPrice = 0;
    for (const item of cart) {
      const step = stepsRecord[item.stepKey];
      const itemPrice = step.price ? await step.price(item) : 0;
      totalPrice += itemPrice;
    }
    return Math.floor(totalPrice);
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
  stairs,
  floor,
}