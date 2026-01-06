export type ControlTypes = CheckList | CheckBox | RadioGroup | InputNumber | InputString;
export type ControlKind = ControlTypes['kind'];

export type Step = {
  controls: ControlTypes[];
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
    value: string
  }[];
}

interface RadioGroup extends Control<'radiogroup'> {
  legend: string;
  options: {
    label: string;
    value: string
  }[];
}

const number = (p: Omit<InputNumber, 'kind' | 'type'>): InputNumber => ({
  kind: 'input',
  type: 'number',
  ...p
})

const interiorDoorTest = {
  amount: number({
    name: 'amount',
    value: 1,
    min: 1,
  }),
};

// export const root: Step = {
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

export const window: Step = {
  controls: [
    number({
      label: 'Combien de fenêtres avez-vous à déposer ?',
      name: 'removal',
      min: 0,
      max: 10
    }),
    number({
      label: 'Combien de fenêtres souhaitez-vous installer ?',
      name: 'installation',
      min: 0,
      max: 10
    })
  ]
}

export const door: Step = {
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

export const stepsRecord = {
  window,
  door
}

export const stepKeys = Object.keys(stepsRecord);