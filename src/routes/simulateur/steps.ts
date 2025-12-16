type FormType = 'menu' | 'number';
type Step = MenuStep | NumberStep;

export interface FormField {
  key: string;
  label: string;
  min?: number;
  max?: number;
  placeholder?: string;
  value?: number;
}


export interface Option {
  key: string;
  label: string;
  next?: string;
  price: number;
}

interface BaseStep {
  id?: number;
  description: string;
  next?: string;
  type: FormType;
}

export interface MenuStep extends BaseStep {
  type: 'menu';
  props: {
    options: Record<string, Option>;
  };
}

interface NumberStep extends BaseStep {
  type: 'number';
  props: {
    fields: Record<string, FormField>
  }
}

const task: MenuStep = {
  next: "intervention",
  type: 'menu',
  description: "Type de travaux",
  props: {
    options: {
      supply: { price: 100, key: "supply", label: "Fourniture" },
      installation: { price: 100, key: "installation", label: "Pose" },
      complete: { price: 100, key: "complete", label: "Fourniture & Pose" },
      repairs: { price: 100, key: "repairs", label: "Réparation" },
      replacement: { price: 100, key: "replacement", label: "Remplacement" },
    }
  }
}

const intervention: MenuStep = {
  description: "Type d'intervention",
  type: 'menu',
  props: {
    options: {
      inner: { price: 100, key: "inner", label: "Intérieur", next: "interior" },
      outer: { price: 100, key: "outer", label: "Extérieur", next: "exterior" },
    }
  }
}

const interior: MenuStep = {
  description: "Ouvrage",
  type: 'menu',
  props: {
    options: {
      door: { price: 100, key: "door", label: "Porte", next: "interiorDoorDimensions" },
      stairs: { price: 100, key: "stairs", label: "Escalier", next: "interiorStairsDimensions" },
      furnishings: { price: 100, key: "furnishings", label: "Ameublement", next: "furnishingType" },
      flooring: { price: 100, key: "flooring", label: "Sol", next: "floorDimensions" },
      // wall: { price: 100, key: "wall", label: "Murs" },
      // ceiling: { price: 100, key: "ceiling", label: "Plafond" },
    }
  }
}

const exterior: MenuStep = {
  description: "Type d'intervention",
  type: 'menu',
  props: {
    options: {
      window: { price: 100, key: "window", label: "Fenêtre" },
      fence: { price: 100, key: "fence", label: "Cloture" },
      blinds: { price: 100, key: "blinds", label: "Volets" },
      door: { price: 100, key: "door", label: "Porte" },
      deck: { price: 100, key: "deck", label: "Terrasse" },
    }
  }
}

const interiorDoorDimensions: MenuStep = {
  description: "Dimensions",
  type: 'menu',
  next: "interiorDoorMaterials",
  props: {
    options: {
      classic: { price: 100, key: "classic", label: "Standard" },
      custom: { price: 100, key: "custom", label: "Sur-mesure" },
    }
  }
}

const interiorDoorMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: "interiorDoorType",
  props: {
    options: {
      low: { price: 100, key: "low", label: "Entrée de gamme" },
      mid: { price: 100, key: "mid", label: "Moyenne gamme" },
      high: { price: 100, key: "high", label: "Haut de gamme" },
    }
  }
}

const interiorDoorType: MenuStep = {
  description: "Type de porte",
  type: 'menu',
  next: "interiorDoorFinitions",
  props: {
    options: {
      battant: { price: 100, key: "battant", label: "Battante" },
      sliding: { price: 100, key: "sliding", label: "Coulissante" },
      other: { price: 100, key: "other", label: "Autre" },
    }
  }
}

const interiorDoorFinitions: MenuStep = {
  description: "Finitions",
  type: 'menu',
  next: "confirmation",
  props: {
    options: {
      varnish: { price: 100, key: "varnish", label: "Vernis" },
      paint: { price: 100, key: "paint", label: "Peinture" },
      raw: { price: 100, key: "raw", label: "Brut" },
    }
  }
}

const interiorStairsDimensions: MenuStep = {
  description: "Hauteur sous plafond",
  type: 'menu',
  next: "interiorStairsMaterials",
  props: {
    options: {
      little: { price: 100, key: "little", label: "Petite" },
      standard: { price: 100, key: "standard", label: "Standard" },
      high: { price: 100, key: "high", label: "Haute" },
    }
  }
}

const interiorStairsMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: "interiorStairsFinitions",
  props: {
    options: {
      low: { price: 100, key: "low", label: "Entrée de gamme" },
      mid: { price: 100, key: "mid", label: "Moyenne gamme" },
      high: { price: 100, key: "high", label: "Haut de gamme" },
    }
  }
}

const interiorStairsFinitions: MenuStep = {
  description: "Type de finition",
  type: 'menu',
  next: "confirmation",
  props: {
    options: {
      varnish: { price: 100, key: "varnish", label: "Vernis" },
      paint: { price: 100, key: "paint", label: "Peinture" },
      raw: { price: 100, key: "raw", label: "Brut" },
    }
  }
}

const furnishingType: MenuStep = {
  description: "Type de meuble",
  type: 'menu',
  next: "furnishingDimensions",
  props: {
    options: {
      table: { price: 100, key: "table", label: "Table" },
      chair: { price: 100, key: "chair", label: "Chaise" },
      storage: { price: 100, key: "storage", label: "Rangement" },
      kitchen: { price: 100, key: "kitchen", label: "Cuisine" },
    }
  }
}

const furnishingDimensions: MenuStep = {
  description: "Dimensions du meuble",
  type: 'menu',
  next: "furnishingMaterials",
  props: {
    options: {
      small: { price: 100, key: "small", label: "Petite" },
      medium: { price: 100, key: "medium", label: "Moyenne" },
      big: { price: 100, key: "big", label: "Grande" },
    }
  }
}

const furnishingMaterials: MenuStep = {
  description: "Type de matériaux",
  type: 'menu',
  next: "confirmation",
  props: {
    options: {
      low: { price: 100, key: "low", label: "Entrée de gamme" },
      mid: { price: 100, key: "mid", label: "Moyenne gamme" },
      high: { price: 100, key: "high", label: "Haut de gamme" },
    }
  }
}

// const floorDimensions: MenuStep = {
//   description: "Taille de la pièce",
//   type: 'menu',
//   next: "floorType",
//   props: {
//     options: {
//       small: { price: 100, key: "small", label: "Petite" },
//       medium: { price: 100, key: "medium", label: "Moyenne" },
//       big: { price: 100, key: "big", label: "Grande" },
//     }
//   }
// }

const floorDimensions: NumberStep = {
  description: "Surface de la pièce",
  type: 'number',
  next: "floorType",
  props: {
    fields: {
      width: { key: "width", label: "largeur", min: 0, max: 100 },
      length: { key: "length", label: "longueur", min: 0, max: 100 },
    }
  }
}

const floorType: MenuStep = {
  description: "Type de parquet",
  type: 'menu',
  next: "confirmation",
  props: {
    options: {
      solid: { price: 100, key: "solid", label: "Massif" },
      laminated: { price: 100, key: "laminated", label: "Stratifié" },
      floating: { price: 100, key: "floating", label: "Flottant" },
    }
  }
}

const confirmation: MenuStep = {
  description: "Validation",
  type: 'menu',
  props: {
    options: {
      confirm: { price: 100, key: "confirm", label: "Contacter Erwan" },
      more: { price: 100, key: "more", label: "Ajouter d'autres éléments au devis", next: "task" },
    }
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