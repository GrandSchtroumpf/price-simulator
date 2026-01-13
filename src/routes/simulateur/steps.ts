import { $, QRL } from "@qwik.dev/core";
import StepKey from "./[stepKey]";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export interface Step {
  controls: ControlTypes[];
  label: string;
  price?: QRL<(item: Item) => number>;
};

interface FinalStep extends Omit<Step, 'price'> {
  finalPrice?: QRL<(cart: Item[]) => Promise<number>>;
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
})

const floor: Step = {
  label: 'Sol',
  price: $((item: Item) => {
    const materialPrices: Record<string, number> = {
      hard: 200,
      plastic: 100,
      vinyl: 150
    };
    const material = String(item.data['materials']);
    const surface = Number(item.data['surface']);
    const pricePerSquare = materialPrices[material] * surface;
    return Math.floor(pricePerSquare || 0);
  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      required: true,
      value: 1,
      min: 1
    }),
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
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
    const material = String(item.data['materials']);
    const surface = Number(item.data['surface']);
    const pricePerSquare = materialPrices[material] * surface;
    const price = pricePerSquare * multipliers[String(item.data['room'])];
    return Math.floor(price || 0);
  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1
    }),
    {
      legend: "Pièce",
      name: "room",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Rez de chaussée",
          value: "groundLevel"
        },
        {
          label: "Etage",
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
    const material = String(item.data['materials']);
    const option = String(item.data['guardrail']);
    const surface = Number(item.data['surface']);
    const pricePerSquare = (materialPrices[material] + flatModifiers[option]) * surface;
    const price = pricePerSquare * multipliers[String(item.data['level'])];
    return Math.floor(price || 0);
  }),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1
    }),
    {
      legend: "Niveau",
      name: "level",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Sol",
          value: "groundLevel"
        },
        {
          label: "Surélevé avec éscalier",
          value: "elevatedWithStairs"
        },
        {
          label: "Surélevé avec éscalier",
          value: "elevatedWithoutStairs"
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
    const unitType = String(item.data['type']);
    const material = String(item.data['materials']);
    const optionA = String(item.data['step']);
    const optionB = String(item.data['guardrail']);
    const pricePerUnit = unitPrice[unitType] + materialPrices[material];
    const price = pricePerUnit + flatModifiers[optionA] + flatModifiers[optionB];
    return Math.floor(price || 0);
  }),
  controls: [
    {
      legend: "Contre marche",
      name: "step",
      kind: "radiogroup",
      required: true,
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