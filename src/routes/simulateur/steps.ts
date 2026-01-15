import { $, QRL } from "@qwik.dev/core";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;
export interface Range {
  min: number;
  max?: number;
}

interface PriceData {
  type: 'multiplier' | 'addition';
  value?: Range;
  time?: number;
}

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export interface Step {
  controls: ControlTypes[];
  label: string;
  price?: QRL<(cart: Item) => Promise<{ min: number, max: number }>>;
};

interface FinalStep extends Omit<Step, 'price'> {
  finalPrice?: QRL<(cart: Item[]) => Promise<{ min: number, max: number }>>;
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
    if (control.priceData) return { ...control.priceData, value: { min: Number(value) } };
  };
  if (control.kind === 'radiogroup') {
    const option = control.options.find((option) => option.value === value);
    if (option?.priceData) return option.priceData;
  }
};

const getPrice = (item: Item) => {
  const step = stepsRecord[item.stepKey];
  let minAddition = 0;
  let maxAddition = 0;
  let minMultiplier = 1;
  let maxMultiplier = 1;
  for (const [controlName, value] of Object.entries(item.data)) {
    const control = step.controls.find(c => c.name === controlName);
    if (!control) continue;
    const priceData = getPriceData(control, value);
    if (!priceData?.value) continue;
    const { min, max } = priceData.value;
    if (priceData.type === 'addition') {
      minAddition += min ?? 0;
      maxAddition += max ?? min ?? 0;
    }
    if (priceData.type === 'multiplier') {
      minMultiplier *= min ?? 1;
      maxMultiplier *= max ?? min ?? 1;
    }
  }
  return {
    min: Math.floor(minAddition * minMultiplier),
    max: Math.floor(maxAddition * maxMultiplier),
  };
};

const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
export async function displayPrice(pricePromise?: Promise<Range>) {
  const price = await pricePromise;
  if (!price) return;
  if (price.min === price.max) return currency.format(price.min);
  return (currency as any).formatRange(price.min, price.max);
}


const writePriceData = (
  type: PriceData['type'],
  min?: number,
  max?: number,
  time?: PriceData['time']
): PriceData => {
  const priceData = { type };
  const value = { min, max };
  if (min || max) Object.assign(priceData, { value });
  if (time) Object.assign(priceData, time);
  return priceData
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
          priceData: writePriceData('addition', 200, 250)
        },
        {
          label: "Stratifié",
          value: "plastic",
          priceData: writePriceData('addition', 100, 150)
        },
        {
          label: "Vinyle-PVC",
          value: "vinyl",
          priceData: writePriceData('addition', 150, 200)
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
          priceData: writePriceData('multiplier', 1, 1.1)
        },
        {
          label: "Étage",
          value: "floorLevel",
          priceData: writePriceData('multiplier', 1.1, 1.2)
        },
        {
          label: "Combles",
          value: "attic",
          priceData: writePriceData('multiplier', 1.2, 1.3)
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
          priceData: writePriceData('addition', 100, 120)
        },
        {
          label: "Laine de roche",
          value: "rock",
          priceData: writePriceData('addition', 150, 180)
        },
        {
          label: "Laine de bois",
          value: "wood",
          priceData: writePriceData('addition', 250, 280)
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
          priceData: writePriceData('multiplier', 1, 1.1)
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithStairs",
          priceData: writePriceData('multiplier', 1.3, 1.4)
        },
        {
          label: "Surélevé avec escalier",
          value: "elevatedWithoutStairs",
          priceData: writePriceData('multiplier', 1.1, 1.2)
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
          priceData: writePriceData('addition', 100, 110)
        },
        {
          label: "Composite",
          value: "composite",
          priceData: writePriceData('addition', 150, 120)
        },
        {
          label: "Autoclave",
          value: "treated",
          priceData: writePriceData('addition', 250, 270)
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
          priceData: writePriceData('addition', 0, 5)
        },
        {
          label: "Bois",
          value: "woodGuard",
          priceData: writePriceData('addition', 10, 15)
        },
        {
          label: "Alu",
          value: "aluminumGuard",
          priceData: writePriceData('addition', 15, 20)
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
          priceData: writePriceData('addition', 100, 120)
        },
        {
          label: "Sans contre-marche",
          value: "withoutStep",
          priceData: writePriceData('addition', 0, 20)
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
          priceData: writePriceData('addition', 300, 330)
        },
        {
          label: "Sans garde-corps",
          value: "withoutGuardrail",
          priceData: writePriceData('addition', 0, 30)
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
          priceData: writePriceData('addition', 1000, 1500)
        },
        {
          label: "Quart tournant",
          value: "quarter",
          priceData: writePriceData('addition', 1500, 2000)
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
          priceData: writePriceData('addition', 0, 500)
        },
        {
          label: "Pin",
          value: "pine",
          priceData: writePriceData('addition', 1000, 1500)
        },
        {
          label: "Limon",
          value: "stringer",
          priceData: writePriceData('addition', 1500, 2000)
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
      const itemPrice = step.price ? await step.price(item) : { min: 0, max: 0 };
      totalMinPrice += itemPrice.min;
      totalMaxPrice += itemPrice.max;
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
  stairs,
  floor,
}