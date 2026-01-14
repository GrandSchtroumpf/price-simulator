import { $, QRL } from "@qwik.dev/core";
import StepKey from "./[stepKey]";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;

interface PriceData {
  type: 'multiplier' | 'addition';
  value?: number;
  time?: number;
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
}

interface Input extends Control<'input'> {
  label?: string;
  required?: boolean;
  pattern?: string;
  inputmode?: string;
  readonly?: boolean
  placeholder?: string;
  priceData?: PriceData;
}

interface CheckBox extends Control<'checkbox'> {
  label: string;
  required?: boolean;
  checked?: boolean;
  priceData?: PriceData;
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
    priceData?: PriceData;
  }[];
}

interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
    checked?: boolean;
    priceData?: PriceData;
  }[];
}

const number = (p: Omit<InputNumber, 'kind' | 'type'>): InputNumber => ({
  kind: 'input',
  type: 'number',
  ...p
});

const getPriceData = (control: ControlTypes, value: InputTypes) => {
  if (control.kind === "input" && control.type === 'number') {
    if (control.priceData) return { ...control.priceData, value: Number(value) };
  };
  if (control.kind === 'radiogroup') {
    const option = control.options.find((option) => option.value === value);
    if (option?.priceData) {
      return option?.priceData;
    }
  }
};

const getPrice = $((item: Item) => {
  const step = stepsRecord[item.stepKey];
  const dataRecord: Record<string, number[]> = {};
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = step.controls.find((control) => control.name === controlName);
    if (!control) return 0;
    const priceData = getPriceData(control, value);
    if (!priceData || typeof priceData.value !== 'number') return 0;
    if (!dataRecord[priceData.type]) dataRecord[priceData.type] = [];
    dataRecord[priceData.type].push(priceData.value)
  }
  const base = (dataRecord['addition']?.reduce((a: number, b: number) => a + b, 0) || 1);
  const multipliers = (dataRecord['multiplier']?.reduce((a: number, b: number) => a * b, 1) || 1);
  return Math.floor(base * multipliers) || 0;
});


const writePriceData = (type: PriceData['type'], value?: PriceData['value'], time?: PriceData['time']) => {
  return { type, value, time };
};

const floor: Step = {
  label: 'Sol',
  price: $(async (item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      required: true,
      value: 1,
      min: 1,
      priceData: writePriceData('multiplier')
    }),
    {
      legend: "Type de matériaux",
      name: "materials",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Massif",
          value: "hard",
          priceData: writePriceData('multiplier', 200)
        },
        {
          label: "Stratifié",
          value: "plastic",
          priceData: writePriceData('multiplier', 100)
        },
        {
          label: "Vinyle-PVC",
          value: "vinyl",
          priceData: writePriceData('multiplier', 150)
        },
      ]
    }
  ]
}

const interior: Step = {
  label: "Aménagement/Isolation intérieur",
  price: $(async (item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1,
      priceData: writePriceData('multiplier')
    }),
    {
      legend: "Pièce",
      name: "room",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Rez de chaussée",
          value: "groundLevel",
          priceData: writePriceData('multiplier', 1)
        },
        {
          label: "Étage",
          value: "floorLevel",
          priceData: writePriceData('multiplier', 1.1)
        },
        {
          label: "Combles",
          value: "attic",
          priceData: writePriceData('multiplier', 1.2)
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
          value: "glass",
          priceData: writePriceData('multiplier', 100)
        },
        {
          label: "Laine de roche",
          value: "rock",
          priceData: writePriceData('multiplier', 150)
        },
        {
          label: "Laine de bois",
          value: "wood",
          priceData: writePriceData('multiplier', 250)
        },
      ]
    }
  ]
}

const deck: Step = {
  label: "Terrasse",
  price: $(async (item: Item) => getPrice(item)),
  controls: [
    number({
      label: "Surface en m²",
      name: "surface",
      value: 1,
      min: 1,
      priceData: writePriceData('multiplier')
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
          priceData: writePriceData('multiplier', 1)
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithStairs",
          priceData: writePriceData('multiplier', 1.3)
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithoutStairs",
          priceData: writePriceData('multiplier', 1.1)
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
          priceData: writePriceData('multiplier', 100)
        },
        {
          label: "Composite",
          value: "composite",
          priceData: writePriceData('multiplier', 150)
        },
        {
          label: "Autoclave",
          value: "treated",
          priceData: writePriceData('multiplier', 200)
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
          priceData: writePriceData('addition', 0)
        },
        {
          label: "Bois",
          value: "woodGuard",
          priceData: writePriceData('addition', 10)
        },
        {
          label: "Alu",
          value: "aluminumGuard",
          priceData: writePriceData('addition', 15)
        },
      ]
    }
  ]
}


const stairs: Step = {
  label: 'Escalier',
  price: $(async (item: Item) => getPrice(item)),
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
          priceData: writePriceData('addition', 100)
        },
        {
          label: "Sans contre-marche",
          value: "withoutStep",
          priceData: writePriceData('addition', 0)
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
          priceData: writePriceData('addition', 300)
        },
        {
          label: "Sans garde-corps",
          value: "withoutGuardrail",
          priceData: writePriceData('addition', 0)
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
          priceData: writePriceData('addition', 1000)
        },
        {
          label: "Quart tournant",
          value: "quarter",
          priceData: writePriceData('addition', 1500)
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
          priceData: writePriceData('addition', 0)
        },
        {
          label: "Pin",
          value: "pine",
          priceData: writePriceData('addition', 1000)
        },
        {
          label: "Limon",
          value: "stringer",
          priceData: writePriceData('addition', 1500)
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