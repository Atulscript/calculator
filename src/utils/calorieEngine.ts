export type Gender = 'male' | 'female';
export type UnitSystem = 'metric' | 'imperial';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
export type BMRFormula = 'mifflin' | 'harris';

export interface CalorieInput {
  gender: Gender;
  age: number;
  unitSystem: UnitSystem;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightKg: number;
  weightLbs: number;
  activityLevel: ActivityLevel;
  formula: BMRFormula;
}

export interface MacroSplit {
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
}

export interface CalorieGoalTarget {
  name: string;
  description: string;
  calories: number;
  paceDescription: string;
  macros: MacroSplit;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  effectiveWeightKg: number;
  effectiveHeightCm: number;
  targets: {
    maintenance: CalorieGoalTarget;
    mildLoss: CalorieGoalTarget;
    standardLoss: CalorieGoalTarget;
    extremeLoss: CalorieGoalTarget;
    mildGain: CalorieGoalTarget;
    muscleGain: CalorieGoalTarget;
  };
}

export function calculateCalories(input: CalorieInput): CalorieResult {
  const {
    gender,
    age,
    unitSystem,
    heightCm,
    heightFt,
    heightIn,
    weightKg,
    weightLbs,
    activityLevel,
    formula
  } = input;

  // Normalize weight to kg and height to cm
  let w = weightKg;
  let h = heightCm;

  if (unitSystem === 'imperial') {
    w = (weightLbs || 0) * 0.45359237;
    h = ((heightFt || 0) * 12 + (heightIn || 0)) * 2.54;
  }

  w = Math.max(20, Math.min(300, w || 70));
  h = Math.max(80, Math.min(250, h || 170));
  const safeAge = Math.max(12, Math.min(100, age || 25));

  // Compute BMR
  let bmr = 0;
  if (formula === 'harris') {
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * safeAge);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * safeAge);
    }
  } else {
    // Mifflin-St Jeor (default clinical gold standard)
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * safeAge) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * safeAge) - 161;
    }
  }

  // Activity multipliers
  let multiplier = 1.2;
  switch (activityLevel) {
    case 'sedentary':
      multiplier = 1.2;
      break;
    case 'light':
      multiplier = 1.375;
      break;
    case 'moderate':
      multiplier = 1.55;
      break;
    case 'active':
      multiplier = 1.725;
      break;
    case 'very-active':
      multiplier = 1.9;
      break;
  }

  const tdee = Math.round(bmr * multiplier);
  const roundedBmr = Math.round(bmr);

  const computeMacros = (cals: number, proteinRatio = 0.3, carbRatio = 0.45, fatRatio = 0.25): MacroSplit => {
    const proteinCals = cals * proteinRatio;
    const carbCals = cals * carbRatio;
    const fatCals = cals * fatRatio;
    return {
      proteinGrams: Math.round(proteinCals / 4),
      carbGrams: Math.round(carbCals / 4),
      fatGrams: Math.round(fatCals / 9)
    };
  };

  const maintenanceCals = tdee;
  const mildLossCals = Math.max(1200, tdee - 250);
  const standardLossCals = Math.max(1200, tdee - 500);
  const extremeLossCals = Math.max(1200, tdee - 1000);
  const mildGainCals = tdee + 250;
  const muscleGainCals = tdee + 500;

  return {
    bmr: roundedBmr,
    tdee,
    effectiveWeightKg: Math.round(w * 10) / 10,
    effectiveHeightCm: Math.round(h),
    targets: {
      maintenance: {
        name: 'Maintain Current Weight',
        description: 'Stay at your current body weight without gaining or losing fat.',
        calories: maintenanceCals,
        paceDescription: '0 kg / week',
        macros: computeMacros(maintenanceCals, 0.25, 0.5, 0.25)
      },
      mildLoss: {
        name: 'Mild Weight Loss',
        description: 'Sustainable, gentle fat loss with minimal dietary fatigue.',
        calories: mildLossCals,
        paceDescription: '-0.25 kg (-0.5 lb) / week',
        macros: computeMacros(mildLossCals, 0.3, 0.45, 0.25)
      },
      standardLoss: {
        name: 'Standard Weight Loss',
        description: 'Recommended healthy fat loss target recommended by dietitians.',
        calories: standardLossCals,
        paceDescription: '-0.5 kg (-1.0 lb) / week',
        macros: computeMacros(standardLossCals, 0.35, 0.4, 0.25)
      },
      extremeLoss: {
        name: 'Fast Weight Loss',
        description: 'Aggressive deficit for urgent cutting. Maintain high protein intake.',
        calories: extremeLossCals,
        paceDescription: '-1.0 kg (-2.0 lbs) / week',
        macros: computeMacros(extremeLossCals, 0.4, 0.35, 0.25)
      },
      mildGain: {
        name: 'Clean Lean Bulking',
        description: 'Slow surplus to prioritize lean muscle hypertrophy over fat gain.',
        calories: mildGainCals,
        paceDescription: '+0.25 kg (+0.5 lb) / week',
        macros: computeMacros(mildGainCals, 0.3, 0.5, 0.2)
      },
      muscleGain: {
        name: 'Hypertrophy Muscle Gain',
        description: 'Solid caloric surplus for intense strength training and mass building.',
        calories: muscleGainCals,
        paceDescription: '+0.5 kg (+1.0 lb) / week',
        macros: computeMacros(muscleGainCals, 0.28, 0.52, 0.2)
      }
    }
  };
}
