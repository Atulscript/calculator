// Advanced Health & Fitness Calculation Engines matching calculator.net health tools

export interface OneRepMaxResult {
  oneRepMax: number;
  formulaUsed: string;
  percentages: Array<{ percent: number; weight: number; reps: number }>;
}

export function calculateOneRepMax(
  weightLifted: number,
  repsPerformed: number
): OneRepMaxResult {
  const reps = Math.min(30, Math.max(1, repsPerformed));
  if (reps === 1) {
    return {
      oneRepMax: weightLifted,
      formulaUsed: 'Direct 1RM',
      percentages: [
        { percent: 100, weight: weightLifted, reps: 1 },
        { percent: 95, weight: Math.round(weightLifted * 0.95), reps: 2 },
        { percent: 90, weight: Math.round(weightLifted * 0.90), reps: 4 },
        { percent: 85, weight: Math.round(weightLifted * 0.85), reps: 6 },
        { percent: 80, weight: Math.round(weightLifted * 0.80), reps: 8 },
        { percent: 75, weight: Math.round(weightLifted * 0.75), reps: 10 },
        { percent: 70, weight: Math.round(weightLifted * 0.70), reps: 12 }
      ]
    };
  }

  // Epley formula: w * (1 + r / 30)
  const epley = weightLifted * (1 + reps / 30);
  // Brzycki formula: w * (36 / (37 - r))
  const brzycki = reps < 37 ? weightLifted * (36 / (37 - reps)) : epley;
  const avg1RM = Math.round((epley + brzycki) / 2);

  const table = [100, 95, 90, 85, 80, 75, 70, 65, 60, 50].map((pct, idx) => {
    const repEstimates = [1, 2, 4, 6, 8, 10, 12, 15, 20, 25];
    return {
      percent: pct,
      weight: Math.round(avg1RM * (pct / 100)),
      reps: repEstimates[idx]
    };
  });

  return {
    oneRepMax: avg1RM,
    formulaUsed: 'Epley & Brzycki Composite',
    percentages: table
  };
}

export interface PaceResult {
  pacePerKmMinutes: number;
  pacePerKmSeconds: number;
  pacePerMileMinutes: number;
  pacePerMileSeconds: number;
  speedKmh: number;
  speedMph: number;
  projections: {
    fiveK: string;
    tenK: string;
    halfMarathon: string;
    marathon: string;
  };
}

export function calculatePace(
  distanceVal: number,
  distanceUnit: 'km' | 'miles',
  hours: number,
  minutes: number,
  seconds: number
): PaceResult {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0 || distanceVal <= 0) {
    return {
      pacePerKmMinutes: 0,
      pacePerKmSeconds: 0,
      pacePerMileMinutes: 0,
      pacePerMileSeconds: 0,
      speedKmh: 0,
      speedMph: 0,
      projections: { fiveK: '0:00', tenK: '0:00', halfMarathon: '0:00', marathon: '0:00' }
    };
  }

  const distanceKm = distanceUnit === 'km' ? distanceVal : distanceVal * 1.60934;
  const distanceMiles = distanceUnit === 'miles' ? distanceVal : distanceVal / 1.60934;

  const secondsPerKm = totalSeconds / distanceKm;
  const secondsPerMile = totalSeconds / distanceMiles;

  const speedKmh = Math.round((distanceKm / (totalSeconds / 3600)) * 10) / 10;
  const speedMph = Math.round((distanceMiles / (totalSeconds / 3600)) * 10) / 10;

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = Math.round(secs % 60);
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  return {
    pacePerKmMinutes: Math.floor(secondsPerKm / 60),
    pacePerKmSeconds: Math.round(secondsPerKm % 60),
    pacePerMileMinutes: Math.floor(secondsPerMile / 60),
    pacePerMileSeconds: Math.round(secondsPerMile % 60),
    speedKmh,
    speedMph,
    projections: {
      fiveK: formatTime(secondsPerKm * 5),
      tenK: formatTime(secondsPerKm * 10),
      halfMarathon: formatTime(secondsPerKm * 21.0975),
      marathon: formatTime(secondsPerKm * 42.195)
    }
  };
}

export interface ActivityCaloriesResult {
  caloriesBurned: number;
  mets: number;
  equivalentSteps: number;
}

export function calculateActivityCalories(
  weightKg: number,
  durationMinutes: number,
  activityType: 'running' | 'cycling' | 'walking' | 'swimming' | 'weightlifting' | 'hiit' | 'yoga'
): ActivityCaloriesResult {
  const metMap: Record<string, number> = {
    running: 9.8,
    cycling: 7.5,
    walking: 3.5,
    swimming: 8.0,
    weightlifting: 5.0,
    hiit: 8.5,
    yoga: 3.0
  };

  const mets = metMap[activityType] || 5.0;
  // Calories = METs * weight (kg) * (duration in hours)
  const caloriesBurned = Math.round(mets * weightKg * (durationMinutes / 60));
  // 1 calorie ≈ roughly 20-25 steps
  const equivalentSteps = Math.round(caloriesBurned * 22);

  return {
    caloriesBurned,
    mets,
    equivalentSteps
  };
}

export interface GFRResult {
  egfr: number;
  stage: string;
  description: string;
  color: string;
}

export function calculateGFR(
  serumCreatinineMgDl: number,
  age: number,
  gender: 'male' | 'female'
): GFRResult {
  // CKD-EPI 2021 Creatinine Equation (Race-free)
  const scr = serumCreatinineMgDl;
  const kappa = gender === 'female' ? 0.7 : 0.9;
  const alpha = gender === 'female' ? -0.241 : -0.302;
  const genderFactor = gender === 'female' ? 1.012 : 1.0;

  const minRatio = Math.min(scr / kappa, 1);
  const maxRatio = Math.max(scr / kappa, 1);

  const egfr = Math.round(
    142 *
      Math.pow(minRatio, alpha) *
      Math.pow(maxRatio, -1.2) *
      Math.pow(0.9938, age) *
      genderFactor
  );

  let stage = 'Stage 1';
  let description = 'Normal kidney function';
  let color = 'var(--accent-emerald)';

  if (egfr >= 90) {
    stage = 'Stage 1';
    description = 'Normal or high kidney function';
    color = 'var(--accent-emerald)';
  } else if (egfr >= 60) {
    stage = 'Stage 2';
    description = 'Mildly decreased kidney function';
    color = 'var(--md-sys-color-primary)';
  } else if (egfr >= 45) {
    stage = 'Stage 3a';
    description = 'Mild to moderately decreased kidney function';
    color = 'var(--accent-amber)';
  } else if (egfr >= 30) {
    stage = 'Stage 3b';
    description = 'Moderately to severely decreased kidney function';
    color = 'var(--accent-amber)';
  } else if (egfr >= 15) {
    stage = 'Stage 4';
    description = 'Severely decreased kidney function';
    color = 'var(--accent-red)';
  } else {
    stage = 'Stage 5';
    description = 'Kidney failure (dialysis or transplant consultation)';
    color = 'var(--accent-red-deep)';
  }

  return { egfr, stage, description, color };
}

export interface TargetHeartRateResult {
  maxHeartRate: number;
  zones: Array<{
    name: string;
    minBpm: number;
    maxBpm: number;
    benefit: string;
    color: string;
  }>;
}

export function calculateTargetHeartRate(
  age: number,
  restingHR: number = 65
): TargetHeartRateResult {
  // Tanaka formula: 208 - (0.7 * age)
  const maxHR = Math.round(208 - 0.7 * age);
  const hrr = Math.max(30, maxHR - restingHR); // Heart Rate Reserve (Karvonen)

  const calcZone = (lowPct: number, highPct: number) => ({
    minBpm: Math.round(restingHR + hrr * lowPct),
    maxBpm: Math.round(restingHR + hrr * highPct)
  });

  const z1 = calcZone(0.50, 0.60);
  const z2 = calcZone(0.60, 0.70);
  const z3 = calcZone(0.70, 0.80);
  const z4 = calcZone(0.80, 0.90);
  const z5 = calcZone(0.90, 1.00);

  return {
    maxHeartRate: maxHR,
    zones: [
      { name: 'Zone 1: Very Light', minBpm: z1.minBpm, maxBpm: z1.maxBpm, benefit: 'Active recovery, warm up and cool down', color: 'var(--md-sys-color-primary)' },
      { name: 'Zone 2: Light (Fat Burn)', minBpm: z2.minBpm, maxBpm: z2.maxBpm, benefit: 'Aerobic base building & optimal fat oxidation', color: 'var(--accent-emerald)' },
      { name: 'Zone 3: Moderate (Aerobic)', minBpm: z3.minBpm, maxBpm: z3.maxBpm, benefit: 'Cardiovascular endurance and lung capacity', color: 'var(--accent-amber)' },
      { name: 'Zone 4: Hard (Anaerobic)', minBpm: z4.minBpm, maxBpm: z4.maxBpm, benefit: 'Lactate threshold & high-speed performance', color: 'var(--accent-amber)' },
      { name: 'Zone 5: Maximum (VO2 Max)', minBpm: z5.minBpm, maxBpm: z5.maxBpm, benefit: 'Peak sprint power & neuro-muscular adaptation', color: 'var(--accent-red)' }
    ]
  };
}
