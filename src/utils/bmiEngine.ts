export interface BMIInput {
  unit: 'metric' | 'imperial';
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightKg: number;
  weightLbs: number;
  age: number;
  gender: 'male' | 'female';
}

export type BMICategory =
  | 'severe_underweight'
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obese_class_1'
  | 'obese_class_2'
  | 'obese_class_3';

export interface BMIResult {
  bmi: number;
  category: BMICategory;
  categoryLabel: string;
  categoryColor: string;
  colorToken: string;
  idealWeightMinKg: number;
  idealWeightMaxKg: number;
  idealWeightMinLbs: number;
  idealWeightMaxLbs: number;
  weightDiffKg: number;
  weightDiffLbs: number;
  ponderalIndex: number;
  bmiPrime: number;
  heightMeters: number;
  weightKg: number;
  summaryText: string;
}

export function calculateBMI(input: BMIInput): BMIResult {
  let heightMeters = 0;
  let weightKg = 0;

  if (input.unit === 'metric') {
    heightMeters = (input.heightCm || 170) / 100;
    weightKg = input.weightKg || 70;
  } else {
    const totalInches = (input.heightFt || 5) * 12 + (input.heightIn || 8);
    heightMeters = totalInches * 0.0254;
    weightKg = (input.weightLbs || 154) * 0.45359237;
  }

  // Safety fallback
  if (heightMeters <= 0) heightMeters = 1.7;
  if (weightKg <= 0) weightKg = 70;

  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));
  const ponderalIndex = Number((weightKg / Math.pow(heightMeters, 3)).toFixed(2));
  const bmiPrime = Number((bmi / 25).toFixed(2));

  // Ideal weight range based on WHO normal range (18.5 - 24.9)
  const idealWeightMinKg = Number((18.5 * heightMeters * heightMeters).toFixed(1));
  const idealWeightMaxKg = Number((24.9 * heightMeters * heightMeters).toFixed(1));
  const idealWeightMinLbs = Number((idealWeightMinKg * 2.20462).toFixed(1));
  const idealWeightMaxLbs = Number((idealWeightMaxKg * 2.20462).toFixed(1));

  let category: BMICategory = 'normal';
  let categoryLabel = 'Normal Weight';
  let categoryColor = '#047857'; // M3 Tertiary Green
  let colorToken = 'var(--accent-emerald)';
  let summaryText = 'You have a healthy body weight for your height according to WHO standards.';
  let weightDiffKg = 0;
  let weightDiffLbs = 0;

  if (bmi < 16.0) {
    category = 'severe_underweight';
    categoryLabel = 'Severe Thinness';
    categoryColor = '#0284c7';
    colorToken = 'var(--accent-cyan)';
    weightDiffKg = Number((idealWeightMinKg - weightKg).toFixed(1));
    weightDiffLbs = Number((idealWeightMinLbs - (weightKg * 2.20462)).toFixed(1));
    summaryText = `You are below the recommended healthy weight range by approximately ${weightDiffKg} kg.`;
  } else if (bmi < 18.5) {
    category = 'underweight';
    categoryLabel = 'Underweight';
    categoryColor = '#0284c7';
    colorToken = 'var(--accent-cyan)';
    weightDiffKg = Number((idealWeightMinKg - weightKg).toFixed(1));
    weightDiffLbs = Number((idealWeightMinLbs - (weightKg * 2.20462)).toFixed(1));
    summaryText = `You are slightly below the healthy weight range by about ${weightDiffKg} kg.`;
  } else if (bmi < 25.0) {
    category = 'normal';
    categoryLabel = 'Healthy Weight';
    categoryColor = '#047857';
    colorToken = 'var(--accent-emerald)';
    weightDiffKg = 0;
    weightDiffLbs = 0;
    summaryText = 'Your BMI is in the optimal healthy zone associated with lowest health risks.';
  } else if (bmi < 30.0) {
    category = 'overweight';
    categoryLabel = 'Overweight';
    categoryColor = '#b45309';
    colorToken = 'var(--accent-amber)';
    weightDiffKg = Number((weightKg - idealWeightMaxKg).toFixed(1));
    weightDiffLbs = Number(((weightKg * 2.20462) - idealWeightMaxLbs).toFixed(1));
    summaryText = `You are approximately ${weightDiffKg} kg above the recommended upper healthy weight boundary.`;
  } else if (bmi < 35.0) {
    category = 'obese_class_1';
    categoryLabel = 'Obesity Class I';
    categoryColor = '#be123c';
    colorToken = 'var(--accent-rose)';
    weightDiffKg = Number((weightKg - idealWeightMaxKg).toFixed(1));
    weightDiffLbs = Number(((weightKg * 2.20462) - idealWeightMaxLbs).toFixed(1));
    summaryText = `Your BMI falls into Obesity Class I. Adopting a calorie-controlled diet and exercise is recommended.`;
  } else if (bmi < 40.0) {
    category = 'obese_class_2';
    categoryLabel = 'Obesity Class II';
    categoryColor = '#be123c';
    colorToken = 'var(--accent-rose)';
    weightDiffKg = Number((weightKg - idealWeightMaxKg).toFixed(1));
    weightDiffLbs = Number(((weightKg * 2.20462) - idealWeightMaxLbs).toFixed(1));
    summaryText = `Your BMI falls into Obesity Class II. Consulting a healthcare provider for guided weight loss is advised.`;
  } else {
    category = 'obese_class_3';
    categoryLabel = 'Obesity Class III';
    categoryColor = '#be123c';
    colorToken = 'var(--accent-rose)';
    weightDiffKg = Number((weightKg - idealWeightMaxKg).toFixed(1));
    weightDiffLbs = Number(((weightKg * 2.20462) - idealWeightMaxLbs).toFixed(1));
    summaryText = `Your BMI falls into severe Obesity Class III. Professional medical evaluation is strongly recommended.`;
  }

  return {
    bmi,
    category,
    categoryLabel,
    categoryColor,
    colorToken,
    idealWeightMinKg,
    idealWeightMaxKg,
    idealWeightMinLbs,
    idealWeightMaxLbs,
    weightDiffKg,
    weightDiffLbs,
    ponderalIndex,
    bmiPrime,
    heightMeters,
    weightKg: Number(weightKg.toFixed(1)),
    summaryText
  };
}
