export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];
export type StepKey = keyof typeof stepsRecord;
type InputTypes = string | string[] | number | number[];

export interface Item {
  stepKey: StepKey;
  data: Record<string, InputTypes>;
}

export type Step = {
  controls: ControlTypes[];
  label: string;
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
  controls: [
    number({
      label: 'Combien de fenêtres avez-vous à déposer ?',
      name: 'removal',
      min: 0,
      max: 10,
    }),
    number({
      label: 'Combien de fenêtres souhaitez-vous installer ?',
      name: 'installation',
      min: 0,
      max: 10
    })
  ]
}

const door: Step = {
  label: 'Porte',
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

export const stepsRecord = {
  window,
  door,
  stairs,
  furniture,
  floor,
}