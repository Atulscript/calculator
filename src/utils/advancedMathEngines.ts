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

// ---------------------------------------------------------------------------
// Number theory: GCF / LCM, prime factorisation, powers and logarithms.
// ---------------------------------------------------------------------------

export interface PrimeFactorisation {
  n: number;
  factors: { prime: number; exponent: number }[];
  expanded: string;
  exponentForm: string;
  isPrime: boolean;
  divisorCount: number;
  valid: boolean;
}

/**
 * Trial division up to sqrt(n), which is ample for the integers a person types
 * into a web form. Values above MAX_FACTORABLE are rejected rather than left to
 * spin, since the worst case is a large prime.
 */
const MAX_FACTORABLE = 1e12;

export function primeFactorise(input: number): PrimeFactorisation {
  const n = Math.floor(Math.abs(input));
  const empty: PrimeFactorisation = {
    n, factors: [], expanded: '', exponentForm: '', isPrime: false,
    divisorCount: 0, valid: false
  };
  if (!Number.isFinite(n) || n < 2 || n > MAX_FACTORABLE) return empty;

  const factors: { prime: number; exponent: number }[] = [];
  let remaining = n;
  for (let d = 2; d * d <= remaining; d += d === 2 ? 1 : 2) {
    let exponent = 0;
    while (remaining % d === 0) { remaining /= d; exponent++; }
    if (exponent) factors.push({ prime: d, exponent });
  }
  // Whatever survives the loop is itself prime.
  if (remaining > 1) factors.push({ prime: remaining, exponent: 1 });

  const expanded = factors
    .flatMap(f => Array(f.exponent).fill(f.prime))
    .join(' × ');
  const exponentForm = factors
    .map(f => (f.exponent === 1 ? `${f.prime}` : `${f.prime}^${f.exponent}`))
    .join(' × ');
  // d(n) = product of (exponent + 1) over the distinct primes.
  const divisorCount = factors.reduce((acc, f) => acc * (f.exponent + 1), 1);

  return {
    n, factors, expanded, exponentForm,
    isPrime: factors.length === 1 && factors[0].exponent === 1,
    divisorCount, valid: true
  };
}

export interface GcfLcmResult {
  numbers: number[];
  gcf: number;
  lcm: number;
  euclidSteps: string[];
  factorisations: { n: number; exponentForm: string }[];
  coprime: boolean;
  valid: boolean;
}

export function calculateGcfLcm(input: number[]): GcfLcmResult {
  const numbers = input
    .map(n => Math.floor(Math.abs(n)))
    .filter(n => Number.isFinite(n) && n > 0);
  const empty: GcfLcmResult = {
    numbers, gcf: 0, lcm: 0, euclidSteps: [], factorisations: [],
    coprime: false, valid: false
  };
  if (numbers.length < 2) return empty;

  const gcdPair = (a: number, b: number): number => (b === 0 ? a : gcdPair(b, a % b));
  const gcf = numbers.reduce((a, b) => gcdPair(a, b));
  // Divide before multiplying so the intermediate value cannot overflow.
  const lcm = numbers.reduce((a, b) => (a / gcdPair(a, b)) * b);

  // Euclid's algorithm on the first pair, shown so the answer is checkable.
  const euclidSteps: string[] = [];
  let [x, y] = [Math.max(numbers[0], numbers[1]), Math.min(numbers[0], numbers[1])];
  while (y !== 0 && euclidSteps.length < 20) {
    const q = Math.floor(x / y);
    const r = x % y;
    euclidSteps.push(`${x} = ${q} × ${y} + ${r}`);
    [x, y] = [y, r];
  }

  return {
    numbers, gcf, lcm, euclidSteps,
    factorisations: numbers.map(n => ({ n, exponentForm: primeFactorise(n).exponentForm || `${n}` })),
    coprime: gcf === 1,
    valid: Number.isFinite(lcm)
  };
}

export interface ExponentResult {
  base: number;
  exponent: number;
  result: number;
  display: string;
  scientific: string;
  expansion: string;
  valid: boolean;
  note: string;
}

export function calculatePower(base: number, exponent: number): ExponentResult {
  const empty = (note: string): ExponentResult => ({
    base, exponent, result: NaN, display: '—', scientific: '—',
    expansion: '', valid: false, note
  });
  // 0^0 has no agreed value in this context, and a negative base with a
  // fractional exponent leaves the reals.
  if (base === 0 && exponent === 0) return empty('0⁰ is undefined.');
  if (base === 0 && exponent < 0) return empty('Division by zero: 0 to a negative power is undefined.');
  if (base < 0 && !Number.isInteger(exponent)) {
    return empty('A negative base with a fractional exponent has no real result.');
  }

  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result)) return empty('Result is too large to represent.');

  const display = Number.isInteger(result) && Math.abs(result) < 1e15
    ? result.toLocaleString()
    : result.toPrecision(10).replace(/\.?0+$/, '');

  let expansion = '';
  if (Number.isInteger(exponent) && exponent > 1 && exponent <= 8) {
    expansion = Array(exponent).fill(base).join(' × ') + ` = ${display}`;
  } else if (Number.isInteger(exponent) && exponent < 0 && exponent >= -8) {
    expansion = `1 ÷ (${Array(-exponent).fill(base).join(' × ')})`;
  }

  return {
    base, exponent, result, display,
    scientific: result === 0 ? '0' : result.toExponential(6),
    expansion, valid: true, note: ''
  };
}

export interface LogarithmResult {
  value: number;
  base: number;
  log: number;
  ln: number;
  log10: number;
  log2: number;
  changeOfBase: string;
  valid: boolean;
  note: string;
}

export function calculateLogarithm(value: number, base: number): LogarithmResult {
  const empty = (note: string): LogarithmResult => ({
    value, base, log: NaN, ln: NaN, log10: NaN, log2: NaN,
    changeOfBase: '', valid: false, note
  });
  if (!(value > 0)) return empty('The logarithm is only defined for values greater than zero.');
  if (!(base > 0) || base === 1) return empty('The base must be positive and not equal to 1.');

  const round = (n: number) => Math.round(n * 1e8) / 1e8;
  const log = Math.log(value) / Math.log(base);

  return {
    value, base,
    log: round(log),
    ln: round(Math.log(value)),
    log10: round(Math.log10(value)),
    log2: round(Math.log2(value)),
    // The identity the result is computed from, so it can be checked by hand.
    changeOfBase: `log${base}(${value}) = ln(${value}) ÷ ln(${base}) = ${round(Math.log(value))} ÷ ${round(Math.log(base))}`,
    valid: true, note: ''
  };
}
