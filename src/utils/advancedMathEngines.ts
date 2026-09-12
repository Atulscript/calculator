// Advanced Math Calculation Engines matching calculator.net math tools

export interface TriangleResult {
  area: number;
  perimeter: number;
  semiPerimeter: number;
  anglesDeg: { A: number; B: number; C: number };
  type: string;
}

export function calculateTriangle(a: number, b: number, c: number): TriangleResult {
  if (a + b <= c || a + c <= b || b + c <= a || a <= 0 || b <= 0 || c <= 0) {
    return {
      area: 0,
      perimeter: 0,
      semiPerimeter: 0,
      anglesDeg: { A: 0, B: 0, C: 0 },
      type: 'Invalid Triangle'
    };
  }

  const perimeter = a + b + c;
  const s = perimeter / 2;
  const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));

  // Law of cosines for angles
  const toDeg = (rad: number) => Math.round((rad * 180) / Math.PI * 10) / 10;
  const angleA = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
  const angleB = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
  const angleC = Math.round((180 - angleA - angleB) * 10) / 10;

  let type = 'Scalene';
  if (a === b && b === c) type = 'Equilateral';
  else if (a === b || b === c || a === c) type = 'Isosceles';
  if (Math.abs(angleA - 90) < 0.1 || Math.abs(angleB - 90) < 0.1 || Math.abs(angleC - 90) < 0.1) {
    type += ' Right Triangle';
  }

  return {
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    semiPerimeter: Math.round(s * 100) / 100,
    anglesDeg: { A: angleA, B: angleB, C: angleC },
    type
  };
}

export interface VolumeResult {
  volume: number;
  surfaceArea: number;
  shapeName: string;
}

export function calculateVolume(
  shape: 'cylinder' | 'sphere' | 'cone' | 'box',
  dim1: number, // r or length
  dim2: number = 0, // h or width
  dim3: number = 0 // height for box
): VolumeResult {
  let volume = 0;
  let surfaceArea = 0;

  if (shape === 'cylinder') {
    const r = dim1;
    const h = dim2;
    volume = Math.PI * r * r * h;
    surfaceArea = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
  } else if (shape === 'sphere') {
    const r = dim1;
    volume = (4 / 3) * Math.PI * Math.pow(r, 3);
    surfaceArea = 4 * Math.PI * r * r;
  } else if (shape === 'cone') {
    const r = dim1;
    const h = dim2;
    const slant = Math.sqrt(r * r + h * h);
    volume = (1 / 3) * Math.PI * r * r * h;
    surfaceArea = Math.PI * r * (r + slant);
  } else if (shape === 'box') {
    const l = dim1;
    const w = dim2;
    const h = dim3;
    volume = l * w * h;
    surfaceArea = 2 * (l * w + l * h + w * h);
  }

  return {
    volume: Math.round(volume * 100) / 100,
    surfaceArea: Math.round(surfaceArea * 100) / 100,
    shapeName: shape.charAt(0).toUpperCase() + shape.slice(1)
  };
}

export interface QuadraticResult {
  discriminant: number;
  root1: string;
  root2: string;
  vertex: { x: number; y: number };
  nature: string;
}

export function calculateQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) {
    // Linear equation bx + c = 0
    const x = b !== 0 ? -c / b : 0;
    return {
      discriminant: 0,
      root1: x.toString(),
      root2: 'N/A (Linear)',
      vertex: { x: 0, y: 0 },
      nature: 'Linear Equation'
    };
  }

  const d = b * b - 4 * a * c;
  const vx = -b / (2 * a);
  const vy = c - (b * b) / (4 * a);

  let root1 = '';
  let root2 = '';
  let nature = '';

  if (d > 0) {
    const r1 = (-b + Math.sqrt(d)) / (2 * a);
    const r2 = (-b - Math.sqrt(d)) / (2 * a);
    root1 = (Math.round(r1 * 1000) / 1000).toString();
    root2 = (Math.round(r2 * 1000) / 1000).toString();
    nature = 'Two Distinct Real Roots';
  } else if (d === 0) {
    const r = -b / (2 * a);
    root1 = (Math.round(r * 1000) / 1000).toString();
    root2 = root1;
    nature = 'One Repeated Real Root';
  } else {
    const realPart = Math.round((-b / (2 * a)) * 1000) / 1000;
    const imagPart = Math.round((Math.sqrt(-d) / (2 * a)) * 1000) / 1000;
    root1 = `${realPart} + ${Math.abs(imagPart)}i`;
    root2 = `${realPart} - ${Math.abs(imagPart)}i`;
    nature = 'Two Complex Conjugate Roots';
  }

  return {
    discriminant: Math.round(d * 100) / 100,
    root1,
    root2,
    vertex: { x: Math.round(vx * 100) / 100, y: Math.round(vy * 100) / 100 },
    nature
  };
}

export interface StatisticsDatasetResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  range: number;
  variance: number;
  standardDeviation: number;
}

export function calculateStatisticsDataset(numbers: number[]): StatisticsDatasetResult {
  if (numbers.length === 0) {
    return { count: 0, sum: 0, mean: 0, median: 0, modes: [], range: 0, variance: 0, standardDeviation: 0 };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const count = sorted.length;
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

  // Modes
  const freq: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of sorted) {
    freq[n] = (freq[n] || 0) + 1;
    if (freq[n] > maxFreq) maxFreq = freq[n];
  }
  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const key in freq) {
      if (freq[key] === maxFreq) modes.push(Number(key));
    }
  }

  const range = sorted[count - 1] - sorted[0];

  // Variance & Std Dev (Sample n-1)
  const variance = count > 1
    ? sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (count - 1)
    : 0;
  const standardDeviation = Math.sqrt(variance);

  return {
    count,
    sum: Math.round(sum * 100) / 100,
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    modes,
    range: Math.round(range * 100) / 100,
    variance: Math.round(variance * 100) / 100,
    standardDeviation: Math.round(standardDeviation * 100) / 100
  };
}

export interface CombinatoricsResult {
  permutations: number;
  combinations: number;
}

export function calculateCombinatorics(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0 || r > n) {
    return { permutations: 0, combinations: 0 };
  }

  // factorial helper
  const fact = (num: number): number => {
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  const permutations = fact(n) / fact(n - r);
  const combinations = permutations / fact(r);

  return {
    permutations: Math.round(permutations),
    combinations: Math.round(combinations)
  };
}

export interface BaseConverterResult {
  decimal: string;
  binary: string;
  hex: string;
  octal: string;
}

export function convertBase(value: string, fromBase: 2 | 8 | 10 | 16): BaseConverterResult {
  const dec = parseInt(value, fromBase);
  if (isNaN(dec)) {
    return { decimal: '0', binary: '0', hex: '0', octal: '0' };
  }

  return {
    decimal: dec.toString(10),
    binary: dec.toString(2),
    hex: dec.toString(16).toUpperCase(),
    octal: dec.toString(8)
  };
}
