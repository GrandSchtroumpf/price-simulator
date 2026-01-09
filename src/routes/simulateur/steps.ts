import { $ } from "@qwik.dev/core";
import StepKey from "./[stepKey]";

export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
export type InputTypes = string | string[] | number | number[] | boolean;

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export type Step = {
  controls: ControlTypes[];
  label: string;
  materials?: any;
  times?: any;
};

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
  required: boolean;
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
  options: {
    label: string;
    value: string;
    checked?: boolean;
  }[];
}

interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
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

// const interiorDoorTest = {
//   amount: number({
//     name: 'amount',
//     value: 1,
//     min: 1,
//   }),
// };

// const test: Step = {
//   label: "test",
//   controls: [
//     {
//       name: 'start',
//       kind: 'checklist',
//       legend: 'Travaux à réaliser',
//       options: [
//         {
//           label: 'Fenêtre',
//           value: 'window'
//         },
//         {
//           label: 'Portail',
//           value: 'fence'
//         },
//         {
//           label: 'Escalier',
//           value: 'stairs'
//         },
//       ]
//     }
//   ]
// };

const window: Step = {
  label: 'Fenêtre',
  times: $((item: Item) => {
    let totalTime = 0;
    if (item.stepKey !== 'window') return;
    totalTime += (timeTable.window['installation'] || 0);
    for (const value of Object.values(item.data)) {
      if (typeof value === "string" && value in timeTable.window) {
        totalTime += timeTable.window[value];
      }
    }
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
    return totalMaterials;
  }),
  controls: [
    {
      name: 'removal',
      kind: 'checkbox',
      label: "Dépose d'une fenêtre existante ?",
      required: false,
    },
    {
      name: 'size',
      kind: 'radiogroup',
      legend: "Dimensions de la fenêtre ?",
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
      legend: "Type de vitrage ?",
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
      legend: "Type de matériaux ?",
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
      legend: "Finitions ?",
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

const door: Step = {
  label: 'Porte',
  times: $((item: Item) => {
    let totalTime = 0;
    if (item.stepKey !== 'door') return totalTime;
    totalTime += (timeTable[item.stepKey]['removal'] * Number(item.data['removal'])) || 0;
    totalTime += (timeTable[item.stepKey]['installation'] * Number(item.data['installation'])) || 0;
  }),
  materials: $((item: Item) => {
    let totalMaterials = 0;
    if (item.stepKey !== 'door') return totalMaterials;
  }),
  controls: [
    number({
      label: 'Combien de portes avez-vous à déposer ?',
      name: 'removal',
      min: 0,
      max: 10
    }),
    number({
      label: 'Combien de portes souhaitez-vous installer ?',
      name: 'installation',
      min: 0,
      max: 10
    })
  ]
}

const stairs: Step = {
  label: 'Escalier',
  controls: [
  ]
}

const furniture: Step = {
  label: 'Mobilier',
  controls: [
  ]
}

const floor: Step = {
  label: 'Sol',
  controls: [
  ]
}

const gate: Step = {
  label: 'Portail',
  controls: [
  ]
}

export const finalStep: Step = {
  label: "Informations complémentaires",
  // price: $((items: Item[]) => {
  //   let totalTime = 0;
  //   let totalMaterial = 0;
  //   for (const item of items) {
  //     const step = stepsRecord[item.stepKey];
  //     for (const control of step.controls) {
  //       if (control.kind === 'input' && control.type === 'number') {
  //         const value = item.data[control.name];
  //         totalTime += (timeTable[item.stepKey][control.name] * Number(value));
  //         totalTime += timeTable[item.stepKey][control.name];
  //       }
  //     }
  //   };
  // }),
  controls: [
    {
      kind: 'radiogroup',
      legend: 'Type de logement',
      name: 'accommodation',
      options: [
        {
          label: "Maison",
          value: "house",
        },
        {
          label: "Appartement",
          value: "flat",
        },
        {
          label: "Autre",
          value: "other",
        },
      ]
    },
    {
      kind: 'radiogroup',
      legend: 'Type de construction',
      name: 'age',
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

const HOURLY_RATE = 20;

const timeTable: Record<StepKey, any> = {
  door: {
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
  door: {
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
}


export const stepsRecord = {
  window,
  door,
  stairs,
  furniture,
  floor,
}