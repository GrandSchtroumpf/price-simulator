import { $, QRL } from "@qwik.dev/core";
import { AnswerResponse } from ".";

type FormType = 'menu' | 'number';
export type Step = MenuStep | NumberStep;
export type StepKey = keyof typeof steps;

export interface FormField {
  label: string;
  min?: number;
  max?: number;
  placeholder?: string;
  value?: number;
  next?: string;
}


export interface Option {
  label: string;
  next?: string;
  price: number;
}

interface BaseStep {
  id?: number;
  description: string;
  next: QRL<(this: Step, value: string) => string>;
  display: QRL<(value: AnswerResponse) => string>;
  type: FormType;
}

export interface MenuStep extends BaseStep {
  type: 'menu';
  options: Record<string, Option>;
}

export interface NumberStep extends BaseStep {
  type: 'number';
  options: Record<string, FormField>
}
const FALLBACK_STEP = 'task';

function getNextStep(nextStep?: StepKey) {
  return $(function (this: Step, value: string) {
    const next = this.options[value]?.next ?? nextStep;
    return next ?? FALLBACK_STEP;
  });
}

const task: MenuStep = {
  type: 'menu',
  description: "Type de travaux",
  next: getNextStep('intervention'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return task.options[value].label;
  }),
  options: {
    supply: { price: 100, label: "Fourniture" },
    installation: { price: 100, label: "Pose" },
    complete: { price: 100, label: "Fourniture & Pose" },
    repairs: { price: 100, label: "Réparation" },
    replacement: { price: 100, label: "Remplacement" },
  }
}

const intervention: MenuStep = {
  type: 'menu',
  description: "Type d'intervention",
  next: getNextStep(),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return intervention.options[value].label;
  }),
  options: {
    inner: { price: 100, label: "Intérieur", next: "interior" },
    outer: { price: 100, label: "Extérieur", next: "exterior" },
  }
}

const interior: MenuStep = {
  description: "Ouvrage",
  type: 'menu',
  next: getNextStep(),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interior.options[value].label;
  }),
  options: {
    door: { price: 100, label: "Porte", next: "interiorDoorDimensions" },
    stairs: { price: 100, label: "Escalier", next: "interiorStairsDimensions" },
    furnishings: { price: 100, label: "Ameublement", next: "furnishingType" },
    flooring: { price: 100, label: "Sol", next: "floorDimensions" },
    // wall: { price: 100, label: "Murs" },
    // ceiling: { price: 100, label: "Plafond" },
  }
}

const exterior: MenuStep = {
  description: "Type d'intervention",
  type: 'menu',
  next: getNextStep('exterior'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return exterior.options[value].label;
  }),
  options: {
    window: { price: 100, label: "Fenêtre" },
    fence: { price: 100, label: "Cloture" },
    blinds: { price: 100, label: "Volets" },
    door: { price: 100, label: "Porte" },
    deck: { price: 100, label: "Terrasse" },
  }
}

const interiorDoorDimensions: MenuStep = {
  description: "Dimensions",
  type: 'menu',
  next: getNextStep('interiorDoorMaterials'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorDoorDimensions.options[value].label;
  }),
  options: {
    classic: { price: 100, label: "Standard" },
    custom: { price: 100, label: "Sur-mesure" },
  }

}

const interiorDoorMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: getNextStep('interiorDoorType'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorDoorMaterials.options[value].label;
  }),
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const interiorDoorType: MenuStep = {
  description: "Type de porte",
  type: 'menu',
  next: getNextStep('interiorDoorFinitions'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorDoorType.options[value].label;
  }),
  options: {
    battant: { price: 100, label: "Battante" },
    sliding: { price: 100, label: "Coulissante" },
    other: { price: 100, label: "Autre" },
  }
}

const interiorDoorFinitions: MenuStep = {
  description: "Finitions",
  type: 'menu',
  next: getNextStep('confirmation'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorDoorFinitions.options[value].label;
  }),
  options: {
    varnish: { price: 100, label: "Vernis" },
    paint: { price: 100, label: "Peinture" },
    raw: { price: 100, label: "Brut" },
  }
}

const interiorStairsDimensions: MenuStep = {
  description: "Hauteur sous plafond",
  type: 'menu',
  next: getNextStep('interiorStairsMaterials'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorStairsDimensions.options[value].label;
  }),
  options: {
    little: { price: 100, label: "Petite" },
    standard: { price: 100, label: "Standard" },
    high: { price: 100, label: "Haute" },
  }
}

const interiorStairsMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: getNextStep('interiorStairsFinitions'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorStairsMaterials.options[value].label;
  }),
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const interiorStairsFinitions: MenuStep = {
  description: "Type de finition",
  type: 'menu',
  next: getNextStep('confirmation'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return interiorStairsFinitions.options[value].label;
  }),
  options: {
    varnish: { price: 100, label: "Vernis" },
    paint: { price: 100, label: "Peinture" },
    raw: { price: 100, label: "Brut" },
  }
}

const furnishingType: MenuStep = {
  description: "Type de meuble",
  type: 'menu',
  next: getNextStep('furnishingDimensions'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return furnishingType.options[value].label;
  }),
  options: {
    table: { price: 100, label: "Table" },
    chair: { price: 100, label: "Chaise" },
    storage: { price: 100, label: "Rangement" },
    kitchen: { price: 100, label: "Cuisine" },
  }
}

const furnishingDimensions: MenuStep = {
  description: "Dimensions du meuble",
  type: 'menu',
  next: getNextStep('furnishingMaterials'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return furnishingDimensions.options[value].label;
  }),
  options: {
    small: { price: 100, label: "Petite" },
    medium: { price: 100, label: "Moyenne" },
    big: { price: 100, label: "Grande" },
  }
}

const furnishingMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: getNextStep('confirmation'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return furnishingMaterials.options[value].label;
  }),
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const floorDimensions: NumberStep = {
  description: "Surface de la pièce",
  type: 'number',
  next: getNextStep('floorType'),
  display: $((value: AnswerResponse) => {
    if (typeof value === 'string') throw new Error('Wrong answer type for Number Step');
    let res = '';
    for (const [key, number] of Object.entries(value)) {
      res += `${floorDimensions.options[key].label}: ${number}m `
    };
    return res;
  }),
  options: {
    width: { label: "largeur", min: 0, max: 100 },
    length: { label: "longueur", min: 0, max: 100 },
  }
}

const floorType: MenuStep = {
  description: "Type de parquet",
  type: 'menu',
  next: getNextStep('confirmation'),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return floorType.options[value].label;
  }),
  options: {
    solid: { price: 100, label: "Massif" },
    laminated: { price: 100, label: "Stratifié" },
    floating: { price: 100, label: "Flottant" },
  }
}

const confirmation: MenuStep = {
  description: "Validation",
  type: 'menu',
  next: getNextStep(),
  display: $((value: AnswerResponse) => {
    if (typeof value !== 'string') throw new Error('Wrong answer type for Menu Step');
    return confirmation.options[value].label;
  }),
  options: {
    confirm: { price: 100, label: "Contacter Erwan", next: 'mail' },
    more: { price: 100, label: "Ajouter d'autres éléments au devis", next: "task" },
  }
}

export const steps: Record<string, Step> = {
  task,
  intervention,
  interior,
  exterior,
  interiorDoorDimensions,
  interiorDoorMaterials,
  interiorDoorType,
  interiorDoorFinitions,
  interiorStairsDimensions,
  interiorStairsMaterials,
  interiorStairsFinitions,
  furnishingType,
  furnishingDimensions,
  furnishingMaterials,
  floorDimensions,
  floorType,
  confirmation
}