// Comprehensive Health & Fitness Calculation Engines

export interface BodyFatNavyInput {
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number; // required for females
}

export interface BodyFatNavyResult {
  bodyFatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
  category: 'Essential Fat' | 'Athletes' | 'Fitness' | 'Average' | 'Above Average / Obese';
  idealRange: string;
}

export function calculateBodyFatNavy(input: BodyFatNavyInput): BodyFatNavyResult {
  const { gender, heightCm, weightKg, neckCm, waistCm, hipCm = 95 } = input;

  let bodyFatPercent = 0;
  if (gender === 'male') {
    // US Navy formula for Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const diff = Math.max(1, waistCm - neckCm);
    const denom = 1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm);
    bodyFatPercent = 495 / denom - 450;
  } else {
    // US Navy formula for Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const diff = Math.max(1, waistCm + hipCm - neckCm);
    const denom = 1.29579 - 0.35004 * Math.log10(diff) + 0.221 * Math.log10(heightCm);
    bodyFatPercent = 495 / denom - 450;
  }

  bodyFatPercent = Math.min(60, Math.max(3, bodyFatPercent));
  const roundedBF = Math.round(bodyFatPercent * 10) / 10;
  const fatMassKg = Math.round(((weightKg * roundedBF) / 100) * 10) / 10;
  const leanMassKg = Math.round((weightKg - fatMassKg) * 10) / 10;

  let category: BodyFatNavyResult['category'] = 'Average';
  let idealRange = '14 - 17%';

  if (gender === 'male') {
    idealRange = '10 - 20%';
    if (roundedBF < 6) category = 'Essential Fat';
    else if (roundedBF <= 13) category = 'Athletes';
    else if (roundedBF <= 17) category = 'Fitness';
    else if (roundedBF <= 24) category = 'Average';
    else category = 'Above Average / Obese';
  } else {
    idealRange = '18 - 28%';
    if (roundedBF < 14) category = 'Essential Fat';
    else if (roundedBF <= 20) category = 'Athletes';
    else if (roundedBF <= 24) category = 'Fitness';
    else if (roundedBF <= 31) category = 'Average';
    else category = 'Above Average / Obese';
  }

  return {
    bodyFatPercent: roundedBF,
    fatMassKg,
    leanMassKg,
    category,
    idealRange
  };
}

export interface WaterIntakeInput {
  weightKg: number;
  activityMinutesDaily: number;
  climate: 'temperate' | 'hot' | 'very_hot';
}

export interface WaterIntakeResult {
  dailyLiters: number;
  dailyOunces: number;
  dailyGlasses: number; // 250ml / 8oz glasses
  hourlyPaceLiters: number; // spread over 14 waking hours
}

export function calculateWaterIntake(input: WaterIntakeInput): WaterIntakeResult {
  const { weightKg, activityMinutesDaily, climate } = input;
  // Baseline: 35ml per kg of body weight
  let totalMl = weightKg * 35;

  // Add 350ml for every 30 minutes of exercise
  totalMl += (activityMinutesDaily / 30) * 350;

  // Climate adjustments
  if (climate === 'hot') totalMl *= 1.12;
  if (climate === 'very_hot') totalMl *= 1.25;

  const dailyLiters = Math.round((totalMl / 1000) * 10) / 10;
  const dailyOunces = Math.round(dailyLiters * 33.814);
  const dailyGlasses = Math.round(totalMl / 250);
  const hourlyPaceLiters = Math.round((dailyLiters / 14) * 100) / 100;

  return {
    dailyLiters,
    dailyOunces,
    dailyGlasses,
    hourlyPaceLiters
  };
}

export interface IdealWeightInput {
  gender: 'male' | 'female';
  heightCm: number;
}

export interface IdealWeightResult {
  devineKg: number;
  robinsonKg: number;
  millerKg: number;
  hamwiKg: number;
  averageKg: number;
  healthyBmiRangeMinKg: number;
  healthyBmiRangeMaxKg: number;
}

export function calculateIdealWeight(input: IdealWeightInput): IdealWeightResult {
  const { gender, heightCm } = input;
  const heightInches = heightCm / 2.54;
  const inchesOver5Ft = Math.max(0, heightInches - 60);

  let devine = 0;
  let robinson = 0;
  let miller = 0;
  let hamwi = 0;

  if (gender === 'male') {
    // Devine (1974): 50.0 kg + 2.3 kg per inch over 5 ft
    devine = 50.0 + 2.3 * inchesOver5Ft;
    // Robinson (1983): 52 kg + 1.9 kg per inch over 5 ft
    robinson = 52.0 + 1.9 * inchesOver5Ft;
    // Miller (1983): 56.2 kg + 1.41 kg per inch over 5 ft
    miller = 56.2 + 1.41 * inchesOver5Ft;
    // Hamwi (1964): 48.0 kg + 2.7 kg per inch over 5 ft
    hamwi = 48.0 + 2.7 * inchesOver5Ft;
  } else {
    // Devine: 45.5 kg + 2.3 kg
    devine = 45.5 + 2.3 * inchesOver5Ft;
    // Robinson: 49.0 kg + 1.7 kg
    robinson = 49.0 + 1.7 * inchesOver5Ft;
    // Miller: 53.1 kg + 1.36 kg
    miller = 53.1 + 1.36 * inchesOver5Ft;
    // Hamwi: 45.5 kg + 2.2 kg
    hamwi = 45.5 + 2.2 * inchesOver5Ft;
  }

  const averageKg = Math.round(((devine + robinson + miller + hamwi) / 4) * 10) / 10;

  // WHO BMI range 18.5 - 24.9
  const heightM = heightCm / 100;
  const healthyBmiRangeMinKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyBmiRangeMaxKg = Math.round(24.9 * heightM * heightM * 10) / 10;

  return {
    devineKg: Math.round(devine * 10) / 10,
    robinsonKg: Math.round(robinson * 10) / 10,
    millerKg: Math.round(miller * 10) / 10,
    hamwiKg: Math.round(hamwi * 10) / 10,
    averageKg,
    healthyBmiRangeMinKg,
    healthyBmiRangeMaxKg
  };
}

export interface HeartRateZonesInput {
  age: number;
  restingHeartRate: number;
}

export interface HeartRateZone {
  zone: number;
  name: string;
  minBpm: number;
  maxBpm: number;
  percentage: string;
  benefits: string;
}

export interface HeartRateZonesResult {
  maxHeartRateTraditional: number; // 220 - age
  maxHeartRateTanaka: number; // 208 - 0.7 * age
  heartRateReserve: number; // Max HR - Resting HR
  zones: HeartRateZone[];
}

export function calculateHeartRateZones(input: HeartRateZonesInput): HeartRateZonesResult {
  const { age, restingHeartRate = 60 } = input;
  const maxTraditional = 220 - age;
  const maxTanaka = Math.round(208 - 0.7 * age);
  const maxHR = maxTanaka; // Tanaka is medically preferred
  const hrr = Math.max(20, maxHR - restingHeartRate);

  // Karvonen formula: Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR
  const getBpm = (pct: number) => Math.round(restingHeartRate + hrr * pct);

  const zones: HeartRateZone[] = [
    {
      zone: 1,
      name: 'Active Recovery & Warm-Up',
      minBpm: getBpm(0.5),
      maxBpm: getBpm(0.6),
      percentage: '50% - 60%',
      benefits: 'Improves overall health, aids recovery, gentle fat burn'
    },
    {
      zone: 2,
      name: 'Aerobic Base & Fat Burning',
      minBpm: getBpm(0.6),
      maxBpm: getBpm(0.7),
      percentage: '60% - 70%',
      benefits: 'Builds endurance, maximizes fat oxidation, sustainable for hours'
    },
    {
      zone: 3,
      name: 'Aerobic Fitness & Tempo',
      minBpm: getBpm(0.7),
      maxBpm: getBpm(0.8),
      percentage: '70% - 80%',
      benefits: 'Expands lung capacity, increases cardiovascular efficiency'
    },
    {
      zone: 4,
      name: 'Anaerobic Threshold / Hard Effort',
      minBpm: getBpm(0.8),
      maxBpm: getBpm(0.9),
      percentage: '80% - 90%',
      benefits: 'Increases lactate threshold, high calorie burn, speeds up race pace'
    },
    {
      zone: 5,
      name: 'Maximum VO2 Max Effort',
      minBpm: getBpm(0.9),
      maxBpm: maxHR,
      percentage: '90% - 100%',
      benefits: 'Develops peak power, sprint velocity, neuromuscular speed'
    }
  ];

  return {
    maxHeartRateTraditional: maxTraditional,
    maxHeartRateTanaka: maxTanaka,
    heartRateReserve: hrr,
    zones
  };
}

export interface MacroInput {
  dailyCalories: number;
  dietPlan: 'balanced' | 'high_protein' | 'low_carb' | 'keto';
}

export interface MacroResult {
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbCalories: number;
  fatCalories: number;
  distributionPct: { protein: number; carbs: number; fats: number };
}

export function calculateMacros(input: MacroInput): MacroResult {
  const { dailyCalories, dietPlan } = input;

  let proteinPct = 30;
  let carbPct = 40;
  let fatPct = 30;

  switch (dietPlan) {
    case 'high_protein':
      proteinPct = 40;
      carbPct = 35;
      fatPct = 25;
      break;
    case 'low_carb':
      proteinPct = 35;
      carbPct = 20;
      fatPct = 45;
      break;
    case 'keto':
      proteinPct = 20;
      carbPct = 5;
      fatPct = 75;
      break;
    case 'balanced':
    default:
      proteinPct = 30;
      carbPct = 45;
      fatPct = 25;
      break;
  }

  const proteinCalories = (dailyCalories * proteinPct) / 100;
  const carbCalories = (dailyCalories * carbPct) / 100;
  const fatCalories = (dailyCalories * fatPct) / 100;

  // Protein = 4 kcal/g, Carbs = 4 kcal/g, Fats = 9 kcal/g
  const proteinGrams = Math.round(proteinCalories / 4);
  const carbGrams = Math.round(carbCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    proteinGrams,
    carbGrams,
    fatGrams,
    proteinCalories: Math.round(proteinCalories),
    carbCalories: Math.round(carbCalories),
    fatCalories: Math.round(fatCalories),
    distributionPct: { protein: proteinPct, carbs: carbPct, fats: fatPct }
  };
}

export interface PregnancyInput {
  method: 'lmp' | 'conception';
  date: string; // YYYY-MM-DD
  cycleLengthDays?: number; // default 28
}

export interface PregnancyResult {
  dueDate: string; // YYYY-MM-DD
  dueDateFormatted: string;
  weeksPregnant: number;
  daysPregnant: number;
  totalDays: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
  babyMilestone: string;
}

export function calculatePregnancyDueDate(input: PregnancyInput): PregnancyResult {
  const { method, date, cycleLengthDays = 28 } = input;
  const baseDate = new Date(date);
  const now = new Date();

  let dueDateObj = new Date(baseDate);

  if (method === 'lmp') {
    // Naegele's rule: LMP + 280 days + (cycleLength - 28)
    const cycleOffset = cycleLengthDays - 28;
    dueDateObj.setDate(dueDateObj.getDate() + 280 + cycleOffset);
  } else {
    // Conception date + 266 days
    dueDateObj.setDate(dueDateObj.getDate() + 266);
  }

  const lmpEquivalent = new Date(dueDateObj);
  lmpEquivalent.setDate(lmpEquivalent.getDate() - 280);

  const diffMs = now.getTime() - lmpEquivalent.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const weeksPregnant = Math.floor(totalDays / 7);
  const daysPregnant = totalDays % 7;

  const remainingMs = dueDateObj.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));

  let trimester: 1 | 2 | 3 = 1;
  if (weeksPregnant >= 28) trimester = 3;
  else if (weeksPregnant >= 13) trimester = 2;

  let babyMilestone = 'Heart starts beating; neural tube begins forming';
  if (weeksPregnant >= 36) babyMilestone = 'Full term approaching! Baby practicing breathing';
  else if (weeksPregnant >= 28) babyMilestone = 'Third trimester! Baby can blink and sense light';
  else if (weeksPregnant >= 20) babyMilestone = 'Halfway point! Hearing develops and movements are felt';
  else if (weeksPregnant >= 12) babyMilestone = 'Second trimester starts! All vital organs formed';

  return {
    dueDate: dueDateObj.toISOString().split('T')[0],
    dueDateFormatted: dueDateObj.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    weeksPregnant,
    daysPregnant,
    totalDays,
    trimester,
    daysRemaining,
    babyMilestone
  };
}
