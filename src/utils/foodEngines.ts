// Comprehensive Food & Cooking Calculation Engines

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface ScaledRecipeResult {
  multiplier: number;
  ingredients: Array<{
    id: string;
    name: string;
    originalAmount: number;
    scaledAmount: number;
    unit: string;
    formatted: string;
  }>;
}

export function calculateRecipeScale(
  ingredients: RecipeIngredient[],
  originalServings: number,
  targetServings: number
): ScaledRecipeResult {
  const multiplier = originalServings > 0 ? targetServings / originalServings : 1;

  const scaled = ingredients.map(ing => {
    const scaledAmount = Math.round(ing.amount * multiplier * 100) / 100;
    return {
      id: ing.id,
      name: ing.name,
      originalAmount: ing.amount,
      scaledAmount,
      unit: ing.unit,
      formatted: `${scaledAmount} ${ing.unit} ${ing.name}`.trim()
    };
  });

  return {
    multiplier: Math.round(multiplier * 100) / 100,
    ingredients: scaled
  };
}

export const BAKING_DENSITIES: Record<string, { name: string; gramsPerCup: number }> = {
  all_purpose_flour: { name: 'All-Purpose Flour (unbleached)', gramsPerCup: 120 },
  bread_flour: { name: 'Bread Flour', gramsPerCup: 127 },
  cake_flour: { name: 'Cake Flour', gramsPerCup: 114 },
  granulated_sugar: { name: 'Granulated White Sugar', gramsPerCup: 200 },
  brown_sugar_packed: { name: 'Brown Sugar (packed)', gramsPerCup: 213 },
  powdered_sugar: { name: 'Powdered / Confectioners Sugar', gramsPerCup: 120 },
  butter: { name: 'Butter', gramsPerCup: 227 },
  cocoa_powder: { name: 'Cocoa Powder (unsweetened)', gramsPerCup: 85 },
  rolled_oats: { name: 'Rolled Oats', gramsPerCup: 90 },
  honey_syrup: { name: 'Honey / Maple Syrup', gramsPerCup: 340 }
};

export interface BakingConversionResult {
  grams: number;
  ounces: number;
  cups: number;
  tablespoons: number;
  teaspoons: number;
}

export function calculateBakingConversion(
  ingredientKey: string,
  value: number,
  fromUnit: 'cups' | 'tbsp' | 'tsp' | 'grams' | 'ounces'
): BakingConversionResult {
  const density = BAKING_DENSITIES[ingredientKey] || BAKING_DENSITIES.all_purpose_flour;
  const gPerCup = density.gramsPerCup;

  let totalGrams = 0;
  switch (fromUnit) {
    case 'cups':
      totalGrams = value * gPerCup;
      break;
    case 'tbsp':
      totalGrams = (value / 16) * gPerCup;
      break;
    case 'tsp':
      totalGrams = (value / 48) * gPerCup;
      break;
    case 'ounces':
      totalGrams = value * 28.3495;
      break;
    case 'grams':
      totalGrams = value;
      break;
  }

  const cups = totalGrams / gPerCup;
  const tablespoons = cups * 16;
  const teaspoons = cups * 48;
  const ounces = totalGrams / 28.3495;

  return {
    grams: Math.round(totalGrams * 10) / 10,
    ounces: Math.round(ounces * 100) / 100,
    cups: Math.round(cups * 100) / 100,
    tablespoons: Math.round(tablespoons * 10) / 10,
    teaspoons: Math.round(teaspoons * 10) / 10
  };
}

export interface MeatRoastGuide {
  name: string;
  ovenTempF: number;
  ovenTempC: number;
  minutesPerLb: number;
  usdaSafeTempF: number;
  usdaSafeTempC: number;
  restingMinutes: number;
}

export const MEAT_ROAST_TABLE: Record<string, MeatRoastGuide> = {
  whole_turkey: {
    name: 'Whole Turkey (unstuffed)',
    ovenTempF: 325,
    ovenTempC: 165,
    minutesPerLb: 15,
    usdaSafeTempF: 165,
    usdaSafeTempC: 74,
    restingMinutes: 20
  },
  whole_chicken: {
    name: 'Whole Chicken',
    ovenTempF: 375,
    ovenTempC: 190,
    minutesPerLb: 20,
    usdaSafeTempF: 165,
    usdaSafeTempC: 74,
    restingMinutes: 15
  },
  beef_rib_roast: {
    name: 'Beef Prime Rib (medium-rare)',
    ovenTempF: 350,
    ovenTempC: 175,
    minutesPerLb: 18,
    usdaSafeTempF: 145,
    usdaSafeTempC: 63,
    restingMinutes: 20
  },
  pork_loin: {
    name: 'Pork Loin Roast',
    ovenTempF: 350,
    ovenTempC: 175,
    minutesPerLb: 25,
    usdaSafeTempF: 145,
    usdaSafeTempC: 63,
    restingMinutes: 10
  },
  leg_of_lamb: {
    name: 'Leg of Lamb (medium)',
    ovenTempF: 325,
    ovenTempC: 165,
    minutesPerLb: 25,
    usdaSafeTempF: 145,
    usdaSafeTempC: 63,
    restingMinutes: 15
  }
};

export interface CookingTimeResult {
  guide: MeatRoastGuide;
  totalMinutes: number;
  hours: number;
  minutes: number;
  ovenTempFormatted: string;
  internalTargetFormatted: string;
}

export function calculateCookingTime(meatKey: string, weightLbs: number): CookingTimeResult {
  const guide = MEAT_ROAST_TABLE[meatKey] || MEAT_ROAST_TABLE.whole_turkey;
  const totalMinutes = Math.round(weightLbs * guide.minutesPerLb);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    guide,
    totalMinutes,
    hours,
    minutes,
    ovenTempFormatted: `${guide.ovenTempF}°F (${guide.ovenTempC}°C)`,
    internalTargetFormatted: `${guide.usdaSafeTempF}°F (${guide.usdaSafeTempC}°C)`
  };
}

export interface CoffeeRatioPreset {
  name: string;
  ratioWaterToCoffee: number;
  grindSize: string;
}

export const COFFEE_PRESETS: Record<string, CoffeeRatioPreset> = {
  pourover: { name: 'Pour-Over (V60, Kalita)', ratioWaterToCoffee: 15, grindSize: 'Medium-Fine' },
  french_press: { name: 'French Press', ratioWaterToCoffee: 12, grindSize: 'Coarse' },
  chemex: { name: 'Chemex', ratioWaterToCoffee: 16, grindSize: 'Medium-Coarse' },
  aeropress: { name: 'AeroPress', ratioWaterToCoffee: 11, grindSize: 'Fine' },
  cold_brew: { name: 'Cold Brew Concentrate', ratioWaterToCoffee: 8, grindSize: 'Extra Coarse' },
  espresso: { name: 'Espresso', ratioWaterToCoffee: 2, grindSize: 'Very Fine' }
};

export interface CoffeeRatioResult {
  coffeeGrams: number;
  waterGramsMl: number;
  waterFluidOunces: number;
  cupsYield: number; // 180ml (6oz) cups
  grindSize: string;
}

export function calculateCoffeeRatio(
  methodKey: string,
  inputValue: number,
  mode: 'by_coffee' | 'by_water'
): CoffeeRatioResult {
  const preset = COFFEE_PRESETS[methodKey] || COFFEE_PRESETS.pourover;
  let coffeeGrams = 0;
  let waterGramsMl = 0;

  if (mode === 'by_coffee') {
    coffeeGrams = inputValue;
    waterGramsMl = inputValue * preset.ratioWaterToCoffee;
  } else {
    waterGramsMl = inputValue;
    coffeeGrams = preset.ratioWaterToCoffee > 0 ? inputValue / preset.ratioWaterToCoffee : 0;
  }

  const waterFluidOunces = waterGramsMl / 29.5735;
  const cupsYield = waterGramsMl / 180;

  return {
    coffeeGrams: Math.round(coffeeGrams * 10) / 10,
    waterGramsMl: Math.round(waterGramsMl),
    waterFluidOunces: Math.round(waterFluidOunces * 10) / 10,
    cupsYield: Math.round(cupsYield * 10) / 10,
    grindSize: preset.grindSize
  };
}
