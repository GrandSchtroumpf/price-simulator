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
  materials: QRL<(cart: Item) => number>;
  times: QRL<(cart: Item) => number>;
};

interface FinalStep extends Omit<Step, 'times' | 'materials'> {
  price: QRL<(cart: Item[]) => number>;
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
  materials: $((item: Item) => {
    if (!item) return 0;
    return 0;
  }),
  times: $(() => 0),
  controls: [
    number({
      label: "Surface en m²",
      name: "surace",
      value: 1,
      min: 1
    }),
    {
      legend: "Type de matériaux",
      name: "metarials",
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
  materials: $(() => 0),
  times: $(() => 0),
  controls: [
    number({
      label: "Surface en m²",
      name: "surace",
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
  materials: $(() => 0),
  times: $(() => 0),
  controls: [
    number({
      label: "Surface en m²",
      name: "surace",
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
          value: "floorLevel"
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
      legend: "Garde corps",
      name: "guardrail",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Sans garde corps",
          value: "without"
        },
        {
          label: "Bois",
          value: "wood"
        },
        {
          label: "Alu",
          value: "aluminum"
        },
      ]
    }
  ]
}


const stairs: Step = {
  label: 'Escalier',
  materials: $(() => 0),
  times: $(() => 0),
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
      name: "step",
      kind: "radiogroup",
      required: true,
      options: [
        {
          label: "Avec garde-corps",
          value: "withGardrail"
        },
        {
          label: "Sans garde-corps",
          value: "withoutGardrail"
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
      name: "guardrail",
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
  price: $(() => 0),
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