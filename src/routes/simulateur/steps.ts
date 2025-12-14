export interface Option {
  key: string;
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
    supply: { price: 100, key: "supply", label: "Fourniture" },
    installation: { price: 100, key: "installation", label: "Pose" },
    complete: { price: 100, key: "complete", label: "Fourniture & Pose" },
    repairs: { price: 100, key: "repairs", label: "Réparation" },
    replacement: { price: 100, key: "replacement", label: "Remplacement" },
  }
}

const intervention = {
  description: "Type d'intervention",
  options: {
    inner: { price: 100, key: "inner", label: "Intérieur", next: "interior" },
    outer: { price: 100, key: "outer", label: "Extérieur", next: "exterior" },
  }
}

const interior = {
  description: "Ouvrage",
  options: {
    door: { price: 100, key: "door", label: "Porte", next: "interiorDoorDimensions" },
    stairs: { price: 100, key: "stairs", label: "Escalier", next: "interiorStairsDimensions" },
    furnishings: { price: 100, key: "furnishings", label: "Ameublement", next: "furnishingType" },
    flooring: { price: 100, key: "flooring", label: "Sol", next: "floorDimensions" },
    // wall: { price: 100, key: "wall", label: "Murs" },
    // ceiling: { price: 100, key: "ceiling", label: "Plafond" },
  }
}

const exterior = {
  description: "Type d'intervention",
  options: {
    window: { price: 100, key: "window", label: "Fenêtre" },
    blinds: { price: 100, key: "blinds", label: "Volets" },
    door: { price: 100, key: "door", label: "Porte" },
    fence: { price: 100, key: "fence", label: "Cloture" },
    deck: { price: 100, key: "deck", label: "Terrasse" },
  }
}

const interiorDoorDimensions = {
  description: "Dimensions",
  next: "interiorDoorMaterials",
  options: {
    classic: { price: 100, key: "classic", label: "Standard" },
    custom: { price: 100, key: "custom", label: "Sur-mesure" },
  }
}

const interiorDoorMaterials = {
  description: "Type de matériaux",
  next: "interiorDoorType",
  options: {
    low: { price: 100, key: "low", label: "Entrée de gamme" },
    mid: { price: 100, key: "mid", label: "Moyenne gamme" },
    high: { price: 100, key: "high", label: "Haut de gamme" },
  }
}

const interiorDoorType = {
  description: "Type de porte",
  next: "interiorDoorFinitions",
  options: {
    battant: { price: 100, key: "battant", label: "Battante" },
    sliding: { price: 100, key: "sliding", label: "Coulissante" },
    other: { price: 100, key: "other", label: "Autre" },
  }
}

const interiorDoorFinitions = {
  description: "Finitions",
  next: "confirmation",
  options: {
    varnish: { price: 100, key: "varnish", label: "Vernis" },
    paint: { price: 100, key: "paint", label: "Peinture" },
    raw: { price: 100, key: "raw", label: "Brut" },
  }
}

const interiorStairsDimensions = {
  description: "Hauteur sous plafond",
  next: "interiorStairsMaterials",
  options: {
    little: { price: 100, key: "little", label: "Petite" },
    standard: { price: 100, key: "standard", label: "Standard" },
    high: { price: 100, key: "high", label: "Haute" },
  }
}

const interiorStairsMaterials = {
  description: "Type de matériaux",
  next: "interiorStairsFinitions",
  options: {
    low: { price: 100, key: "low", label: "Entrée de gamme" },
    mid: { price: 100, key: "mid", label: "Moyenne gamme" },
    high: { price: 100, key: "high", label: "Haut de gamme" },
  }
}

const interiorStairsFinitions = {
  description: "Type de finition",
  next: "confirmation",
  options: {
    varnish: { price: 100, key: "varnish", label: "Vernis" },
    paint: { price: 100, key: "paint", label: "Peinture" },
    raw: { price: 100, key: "raw", label: "Brut" },
  }
}

const furnishingType = {
  description: "Type de meuble",
  next: "furnishingDimensions",
  options: {
    table: { price: 100, key: "table", label: "Table" },
    chair: { price: 100, key: "chair", label: "Chaise" },
    storage: { price: 100, key: "storage", label: "Rangement" },
    kitchen: { price: 100, key: "kitchen", label: "Cuisine" },
  }
}

const furnishingDimensions = {
  description: "Dimensions du meuble",
  next: "furnishingMaterials",
  options: {
    small: { price: 100, key: "small", label: "Petite" },
    medium: { price: 100, key: "medium", label: "Moyenne" },
    big: { price: 100, key: "big", label: "Grande" },
  }
}

const furnishingMaterials = {
  description: "Type de matériaux",
  next: "confirmation",
  options: {
    low: { price: 100, key: "low", label: "Entrée de gamme" },
    mid: { price: 100, key: "mid", label: "Moyenne gamme" },
    high: { price: 100, key: "high", label: "Haut de gamme" },
  }
}

const floorDimensions = {
  description: "Taille de la pièce",
  next: "floorType",
  options: {
    small: { price: 100, key: "small", label: "Petite" },
    medium: { price: 100, key: "medium", label: "Moyenne" },
    big: { price: 100, key: "big", label: "Grande" },
  }
}

const floorType = {
  description: "Type de parquet",
  next: "confirmation",
  options: {
    solid: { price: 100, key: "solid", label: "Massif" },
    laminated: { price: 100, key: "laminated", label: "Stratifié" },
    floating: { price: 100, key: "floating", label: "Flottant" },
  }
}

const confirmation = {
  description: "Validation",
  options: {
    confirm: { price: 100, key: "confirm", label: "Contacter Erwan" },
    more: { price: 100, key: "more", label: "Ajouter d'autres éléments au devis", next: "task" },
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
