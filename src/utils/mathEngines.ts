// Comprehensive Math & Numbers Calculation Engines

export interface FractionInput {
  num1: number;
  den1: number;
  whole1?: number;
  num2: number;
  den2: number;
  whole2?: number;
  operation: '+' | '-' | '*' | '/';
}

export interface FractionResult {
  resultNum: number;
  resultDen: number;
  wholeNumber: number;
  remainderNum: number;
  decimalValue: number;
  isNegative: boolean;
  steps: string[];
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function calculateFractions(input: FractionInput): FractionResult {
  const { num1, den1, whole1 = 0, num2, den2, whole2 = 0, operation } = input;

  // Convert mixed to improper
  const improperNum1 = whole1 >= 0 ? whole1 * den1 + num1 : whole1 * den1 - num1;
  const improperNum2 = whole2 >= 0 ? whole2 * den2 + num2 : whole2 * den2 - num2;

  let rawNum = 0;
  let rawDen = den1 * den2;
  const steps: string[] = [];

  steps.push(`First fraction: ${improperNum1}/${den1}`);
  steps.push(`Second fraction: ${improperNum2}/${den2}`);

  switch (operation) {
    case '+':
      rawNum = improperNum1 * den2 + improperNum2 * den1;
      rawDen = den1 * den2;
      steps.push(`Common denominator: ${den1} × ${den2} = ${rawDen}`);
      steps.push(`Add numerators: (${improperNum1} × ${den2}) + (${improperNum2} × ${den1}) = ${rawNum}`);
      break;
    case '-':
      rawNum = improperNum1 * den2 - improperNum2 * den1;
      rawDen = den1 * den2;
      steps.push(`Common denominator: ${den1} × ${den2} = ${rawDen}`);
      steps.push(`Subtract numerators: (${improperNum1} × ${den2}) - (${improperNum2} × ${den1}) = ${rawNum}`);
      break;
    case '*':
      rawNum = improperNum1 * improperNum2;
      rawDen = den1 * den2;
      steps.push(`Multiply numerators: ${improperNum1} × ${improperNum2} = ${rawNum}`);
      steps.push(`Multiply denominators: ${den1} × ${den2} = ${rawDen}`);
      break;
    case '/':
      rawNum = improperNum1 * den2;
      rawDen = den1 * improperNum2;
      steps.push(`Invert second fraction: ${den2}/${improperNum2}`);
      steps.push(`Multiply: (${improperNum1} × ${den2}) / (${den1} × ${improperNum2}) = ${rawNum}/${rawDen}`);
      break;
  }

  if (rawDen < 0) {
    rawNum = -rawNum;
    rawDen = -rawDen;
  }

  const divisor = gcd(rawNum, rawDen);
  const resultNum = rawNum / divisor;
  const resultDen = rawDen / divisor;

  if (divisor > 1) {
    steps.push(`Simplify by dividing by GCD (${divisor}): ${resultNum}/${resultDen}`);
  }

  const isNegative = resultNum < 0;
  const absNum = Math.abs(resultNum);
  const wholeNumber = Math.floor(absNum / resultDen) * (isNegative ? -1 : 1);
  const remainderNum = absNum % resultDen;
  const decimalValue = Math.round((resultNum / resultDen) * 10000) / 10000;

  return {
    resultNum,
    resultDen,
    wholeNumber,
    remainderNum,
    decimalValue,
    isNegative,
    steps
  };
}

export interface CourseGrade {
  id: string;
  name: string;
  credits: number;
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
  courseType?: 'regular' | 'honors' | 'ap';
}

export interface GPAResult {
  unweightedGPA: number;
  weightedGPA: number;
  totalCredits: number;
  totalGradePoints: number;
}

export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  D: 1.0,
  F: 0.0
};

export function calculateGPA(courses: CourseGrade[]): GPAResult {
  let totalCredits = 0;
  let totalUnweightedPoints = 0;
  let totalWeightedPoints = 0;

  for (const c of courses) {
    const basePts = GRADE_POINTS[c.grade] ?? 0;
    let weightAdd = 0;
    if (c.courseType === 'honors') weightAdd = 0.5;
    if (c.courseType === 'ap') weightAdd = 1.0;

    totalCredits += c.credits;
    totalUnweightedPoints += basePts * c.credits;
    totalWeightedPoints += (basePts + weightAdd) * c.credits;
  }

  const unweightedGPA = totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0;
  const weightedGPA = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

  return {
    unweightedGPA: Math.round(unweightedGPA * 100) / 100,
    weightedGPA: Math.round(weightedGPA * 100) / 100,
    totalCredits,
    totalGradePoints: Math.round(totalUnweightedPoints * 100) / 100
  };
}

export interface RatioResult {
  simplifiedA: number;
  simplifiedB: number;
  simplifiedString: string;
  scalingFactor: number;
  solvedMissingValue?: number;
}

export function calculateRatio(
  a: number,
  b: number,
  c?: number,
  d?: number
): RatioResult {
  const divisor = gcd(Math.round(a), Math.round(b));
  const simpA = Math.round(a / divisor);
  const simpB = Math.round(b / divisor);

  let solvedMissing: number | undefined;
  // If user provides a, b, and c and wants to solve for d (a/b = c/d -> d = b*c/a)
  if (c !== undefined && d === undefined && a !== 0) {
    solvedMissing = (b * c) / a;
  } else if (c === undefined && d !== undefined && b !== 0) {
    // a/b = c/d -> c = a*d/b
    solvedMissing = (a * d) / b;
  }

  return {
    simplifiedA: simpA,
    simplifiedB: simpB,
    simplifiedString: `${simpA} : ${simpB}`,
    scalingFactor: b !== 0 ? Math.round((a / b) * 1000) / 1000 : 0,
    solvedMissingValue: solvedMissing !== undefined ? Math.round(solvedMissing * 100) / 100 : undefined
  };
}

export interface StatisticsResult {
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  sum: number;
  count: number;
  sampleVariance: number;
  populationVariance: number;
  sampleStdDev: number;
  populationStdDev: number;
}

export function calculateStatistics(numbers: number[]): StatisticsResult {
  const count = numbers.length;
  if (count === 0) {
    return {
      mean: 0,
      median: 0,
      mode: [],
      min: 0,
      max: 0,
      range: 0,
      sum: 0,
      count: 0,
      sampleVariance: 0,
      populationVariance: 0,
      sampleStdDev: 0,
      populationStdDev: 0
    };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;

  // Median
  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  // Mode
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of sorted) {
    frequency[n] = (frequency[n] || 0) + 1;
    if (frequency[n] > maxFreq) maxFreq = frequency[n];
  }
  const mode: number[] = [];
  if (maxFreq > 1) {
    for (const [k, v] of Object.entries(frequency)) {
      if (v === maxFreq) mode.push(Number(k));
    }
  }

  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  // Variance & StdDev
  const squaredDiffs = sorted.map(v => Math.pow(v - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((acc, v) => acc + v, 0);

  const populationVariance = sumSquaredDiffs / count;
  const sampleVariance = count > 1 ? sumSquaredDiffs / (count - 1) : 0;

  const populationStdDev = Math.sqrt(populationVariance);
  const sampleStdDev = Math.sqrt(sampleVariance);

  return {
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    mode,
    min,
    max,
    range,
    sum: Math.round(sum * 100) / 100,
    count,
    sampleVariance: Math.round(sampleVariance * 1000) / 1000,
    populationVariance: Math.round(populationVariance * 1000) / 1000,
    sampleStdDev: Math.round(sampleStdDev * 1000) / 1000,
    populationStdDev: Math.round(populationStdDev * 1000) / 1000
  };
}

export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  unique = false
): number[] {
  const results: number[] = [];
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  const range = high - low + 1;

  if (unique && count > range) {
    count = range;
  }

  const used = new Set<number>();
  while (results.length < count) {
    const val = Math.floor(Math.random() * range) + low;
    if (unique) {
      if (!used.has(val)) {
        used.add(val);
        results.push(val);
      }
    } else {
      results.push(val);
    }
  }

  return results;
}
