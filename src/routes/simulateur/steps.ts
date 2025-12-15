export interface Option {
  label: string;
  next?: string;
  price: number;
}

interface Step {
  id?: number;
  description: string;
  next?: string;
  options: Record<string, Option>;
}

const task = {
  next: "intervention",
  type: 'choice',
  description: "Type de travaux",
  options: {
    supply: { price: 100, label: "Fourniture" },
    installation: { price: 100, label: "Pose" },
    complete: { price: 100, label: "Fourniture & Pose" },
    repairs: { price: 100, label: "Réparation" },
    replacement: { price: 100, label: "Remplacement" },
  }
}

const intervention = {
  description: "Type d'intervention",
  options: {
    inner: { price: 100, label: "Intérieur", next: "interior" },
    outer: { price: 100, label: "Extérieur", next: "exterior" },
  }
}

const interior = {
  description: "Ouvrage",
  options: {
    door: { price: 100, label: "Porte", next: "interiorDoorDimensions" },
    stairs: { price: 100, label: "Escalier", next: "interiorStairsDimensions" },
    furnishings: { price: 100, label: "Ameublement", next: "furnishingType" },
    flooring: { price: 100, label: "Sol", next: "floorDimensions" },
    // wall: { price: 100, label: "Murs" },
    // ceiling: { price: 100, label: "Plafond" },
  }
}

const exterior = {
  description: "Type d'intervention",
  options: {
    window: { price: 100, label: "Fenêtre" },
    blinds: { price: 100, label: "Volets" },
    door: { price: 100, label: "Porte" },
    fence: { price: 100, label: "Cloture" },
    deck: { price: 100, label: "Terrasse" },
  }
}

const interiorDoorDimensions = {
  description: "Dimensions",
  next: "interiorDoorMaterials",
  options: {
    classic: { price: 100, label: "Standard" },
    custom: { price: 100, label: "Sur-mesure" },
  }
}

const interiorDoorMaterials = {
  description: "Type de matériaux",
  next: "interiorDoorType",
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const interiorDoorType = {
  description: "Type de porte",
  next: "interiorDoorFinitions",
  options: {
    battant: { price: 100, label: "Battante" },
    sliding: { price: 100, label: "Coulissante" },
    other: { price: 100, label: "Autre" },
  }
}

const interiorDoorFinitions = {
  description: "Finitions",
  next: "confirmation",
  options: {
    varnish: { price: 100, label: "Vernis" },
    paint: { price: 100, label: "Peinture" },
    raw: { price: 100, label: "Brut" },
  }
}

const interiorStairsDimensions = {
  description: "Hauteur sous plafond",
  next: "interiorStairsMaterials",
  options: {
    little: { price: 100, label: "Petite" },
    standard: { price: 100, label: "Standard" },
    high: { price: 100, label: "Haute" },
  }
}

const interiorStairsMaterials = {
  description: "Type de matériaux",
  next: "interiorStairsFinitions",
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const interiorStairsFinitions = {
  description: "Type de finition",
  next: "confirmation",
  options: {
    varnish: { price: 100, label: "Vernis" },
    paint: { price: 100, label: "Peinture" },
    raw: { price: 100, label: "Brut" },
  }
}

const furnishingType = {
  description: "Type de meuble",
  next: "furnishingDimensions",
  options: {
    table: { price: 100, label: "Table" },
    chair: { price: 100, label: "Chaise" },
    storage: { price: 100, label: "Rangement" },
    kitchen: { price: 100, label: "Cuisine" },
  }
}

const furnishingDimensions = {
  description: "Dimensions du meuble",
  next: "furnishingMaterials",
  options: {
    small: { price: 100, label: "Petite" },
    medium: { price: 100, label: "Moyenne" },
    big: { price: 100, label: "Grande" },
  }
}

const furnishingMaterials = {
  description: "Type de matériaux",
  next: "confirmation",
  options: {
    low: { price: 100, label: "Entrée de gamme" },
    mid: { price: 100, label: "Moyenne gamme" },
    high: { price: 100, label: "Haut de gamme" },
  }
}

const floorDimensions = {
  description: "Taille de la pièce",
  next: "floorType",
  options: {
    small: { price: 100, label: "Petite" },
    medium: { price: 100, label: "Moyenne" },
    big: { price: 100, label: "Grande" },
  }
}

const floorType = {
  description: "Type de parquet",
  next: "confirmation",
  options: {
    solid: { price: 100, label: "Massif" },
    laminated: { price: 100, label: "Stratifié" },
    floating: { price: 100, label: "Flottant" },
  }
}

const confirmation = {
  description: "Validation",
  options: {
    confirm: { price: 100, label: "Contacter Erwan" },
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
