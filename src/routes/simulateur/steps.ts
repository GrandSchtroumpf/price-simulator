import { $, QRL } from "@qwik.dev/core";
import StepKey from "./[stepKey]";

const HOURLY_RATE = 20;
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
  price: QRL<(cart: Item[]) => Promise<number>>;
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

const window: Step = {
  label: 'Fenêtre',
  times: $((item: Item) => {
    let totalTime = 0;
    if (item.stepKey !== 'window') return 0;
    totalTime += (timeTable.window['installation'] || 0);
    for (const value of Object.values(item.data)) {
      if (typeof value === "string" && value in timeTable.window) {
        totalTime += timeTable.window[value];
      }
    }
    if (item.data['unit']) totalTime = totalTime * Number(item.data['unit']);
    return totalTime;
  }),
  materials: $((item: Item) => {
    let totalMaterials = 0;
    if (item.stepKey !== 'window') return totalMaterials;
    for (const value of Object.values(item.data)) {
      const size = item.data['size'];
      if (typeof value === 'string') {
        if (size && typeof size === "string") {
          totalMaterials += (materialsTable.window[size][value] || 0);
        } else {
          totalMaterials += (materialsTable.window[value] || 0);
        }
      }
    }
    if (item.data['unit']) totalMaterials = totalMaterials * Number(item.data['unit']);
    return totalMaterials;
  }),
  controls: [
    number({
      label: "Nombre d'unité",
      name: 'unit',
      min: 1,
      value: 1,
      required: true
    }),
    {
      name: 'removal',
      kind: 'checkbox',
      label: "Dépose d'une fenêtre existante"
    },
    {
      name: 'size',
      kind: 'radiogroup',
      legend: "Dimensions de la fenêtre",
      required: true,
      options: [
        {
          value: 'small',
          label: 'Petite (-1 mètre)'
        },
        {
          value: 'medium',
          label: 'Moyenne (1 à 2 mètres)'
        },
        {
          value: 'large',
          label: 'Grande (+ 2 mètres)'
        }
      ]
    },
    {
      name: 'type',
      kind: 'radiogroup',
      legend: "Type de vitrage",
      required: true,
      options: [
        {
          value: 'standard',
          label: 'Double vitrage standard'
        },
        {
          value: 'thermic',
          label: 'Double thérmique / phonique'
        },
        {
          value: 'secured',
          label: 'Anti effraction'
        },
        {
          value: 'complete',
          label: 'Toutes options'
        },
      ]
    },
    {
      name: 'meterials',
      kind: 'radiogroup',
      legend: "Type de matériaux",
      required: true,
      options: [
        {
          value: 'plastic',
          label: 'PVC'
        },
        {
          value: 'wood',
          label: 'Bois'
        },
        {
          value: 'aluminum',
          label: 'Aluminium'
        }
      ]
    },
    {
      name: 'finish',
      kind: 'radiogroup',
      legend: "Finitions",
      required: true,
      options: [
        {
          value: 'raw',
          label: 'Brut'
        },
        {
          value: 'painted',
          label: 'Couleurs'
        },
        {
          value: 'varnish',
          label: 'Vernis'
        }
      ]
    }
  ]
}

const interiorDoor: Step = {
  label: "Porte d'intérieur",
  times: $((item: Item) => {
    if (!item) return 0;
    return 0;
  }),
  materials: $((item: Item) => {
    const totalMaterials = 0;
    if (item.stepKey !== 'interiorDoor') return totalMaterials;
    return totalMaterials;
  }),
  controls: [
    {
      name: 'replace',
      kind: 'checkbox',
      label: "Remplacement d'hussieries existantes ?",
    },
    {
      name: 'size',
      kind: 'radiogroup',
      legend: "Dimensions de la porte ?",
      required: true,
      options: [
        {
          value: 'standard',
          label: 'Standard'
        },
        {
          value: 'custom',
          label: 'Sur mesure'
        }
      ]
    },
    {
      name: 'type',
      kind: 'radiogroup',
      legend: "Type de porte ?",
      required: true,
      options: [
        {
          value: 'swing',
          label: 'Battante'
        },
        {
          value: 'sliding',
          label: 'Coulissante'
        },
        {
          value: 'gallandage',
          label: 'Galandage'
        }
      ]
    },
    {
      name: 'type',
      kind: 'radiogroup',
      legend: "Type de finitions?",
      required: true,
      options: [
        {
          value: 'wood',
          label: 'Bois'
        },
        {
          value: 'flush',
          label: 'Isoplane'
        },
        {
          value: 'pannel',
          label: 'Postfromée'
        },
        {
          value: 'glass',
          label: 'Verre'
        },
        {
          value: 'veneer',
          label: 'Plaqué bois'
        }
      ]
    },
  ]
}

const stairs: Step = {
  label: 'Escalier',
  materials: $(() => 0),
  times: $(() => 0),
  controls: [
  ]
}

const furniture: Step = {
  label: 'Mobilier',
  materials: $(() => 0),
  times: $(() => 0),
  controls: [
  ]
}

const floor: Step = {
  label: 'Sol',
  materials: $(() => 0),
  times: $(() => 0),
  controls: [
  ]
}

// const gate: Step = {
//   label: 'Portail',
//   controls: [
//   ]
// }

export const finalStep: FinalStep = {
  label: "Informations complémentaires",
  price: $(async (cart: Item[]) => {
    let totalMaterials = 0;
    let totalTime = 0;
    for (const item of cart) {
      const step = stepsRecord[item.stepKey];
      totalMaterials += await step.materials(item);
      totalTime += await step.times(item);
    };
    if (totalTime < 8) totalTime = 8;
    const finalEstimation = totalMaterials + (totalTime * HOURLY_RATE);
    return finalEstimation;
  }),
  controls: [
    {
      kind: 'radiogroup',
      legend: 'Type de logement',
      name: 'accommodation',
      required: true,
      options: [
        {
          label: "Maison",
          value: "house",
        },
        {
          label: "Appartement",
          value: "flat",
        }
      ]
    },
    {
      kind: 'radiogroup',
      legend: 'Type de construction',
      name: 'age',
      required: true,
      options: [
        {
          label: "Ancien",
          value: "ancient",
        },
        {
          label: "Rénové",
          value: "renovated",
        },
        {
          label: "Récent",
          value: "new",
        },
      ]
    },
    {
      kind: 'radiogroup',
      legend: 'Quelle est la distance entre votre bien et la ville de Redon',
      name: 'location',
      required: true,
      options: [
        {
          label: "Inférieur à 10km",
          value: "close",
        },
        {
          label: "Entre 10km et 20km",
          value: "near",
        },
        {
          label: "Supérieur à 20km",
          value: "far",
        },
      ]
    },
  ]
}

const timeTable: Record<StepKey, any> = {
  interiorDoor: {
    removal: 0.5,
    installation: 1,
  },
  window: {
    removal: 2,
    installation: 3,
    small: -1,
    medium: 0,
    large: 1,
  },
  stairs: {
    removal: 2,
    installation: 3,
  },
  furniture: {},
  floor: {},
};

const materialsTable: Record<StepKey, any> = {
  interiorDoor: {
    high: 1000,
    medium: 500,
    low: 100
  },
  window: {
    small: {
      standard: 1000,
      thermic: 500,
      secured: 100,
      complete: 100,
      plastic: 100,
      wood: 100,
      aluminum: 100,
      raw: 100,
      painted: 100,
      varnish: 100,
    },
    medium: {
      standard: 1000,
      thermic: 500,
      secured: 100,
      complete: 100,
      plastic: 100,
      wood: 100,
      aluminum: 100,
      raw: 100,
      painted: 100,
      varnish: 100,
    },
    large: {
      standard: 1000,
      thermic: 500,
      secured: 100,
      complete: 100,
      plastic: 100,
      wood: 100,
      aluminum: 100,
      raw: 100,
      painted: 100,
      varnish: 100,
    },
    standard: 1000,
    thermic: 500,
    secured: 100,
    complete: 100,
    plastic: 100,
    wood: 100,
    aluminum: 100,
    raw: 100,
    painted: 100,
    varnish: 100,
  },
  stairs: {
    standard: 2000,
    custom: 5000,
  },
  furniture: {},
  floor: {},
};

export const finalElementsMultiplier: Record<string, number> = {
  house: 0,
  flat: 0.2,
  ancient: 0.4,
  renovated: 0.3,
  new: 0.2,
  close: 0,
  near: 0.2,
  far: 0.3
};


export const stepsRecord = {
  window,
  interiorDoor,
  stairs,
  furniture,
  floor,
}