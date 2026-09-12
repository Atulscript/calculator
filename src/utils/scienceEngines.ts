// Comprehensive Physics & Science Calculation Engines

export interface SpeedDistanceTimeResult {
  solvedValue: number;
  solvedUnit: string;
  speedMph: number;
  speedKmh: number;
  speedMs: number;
  distanceMiles: number;
  distanceKm: number;
  timeHours: number;
  timeFormatted: string;
}

export function calculateSpeedDistanceTime(
  solveFor: 'speed' | 'distance' | 'time',
  speedVal?: number, // in km/h
  distVal?: number, // in km
  timeVal?: number // in hours
): SpeedDistanceTimeResult {
  let sKmh = speedVal || 0;
  let dKm = distVal || 0;
  let tHr = timeVal || 0;

  if (solveFor === 'speed') {
    sKmh = tHr > 0 ? dKm / tHr : 0;
  } else if (solveFor === 'distance') {
    dKm = sKmh * tHr;
  } else {
    tHr = sKmh > 0 ? dKm / sKmh : 0;
  }

  const speedMph = sKmh * 0.621371;
  const speedMs = sKmh / 3.6;
  const distanceMiles = dKm * 0.621371;

  const totalMin = Math.round(tHr * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const timeFormatted = `${h}h ${m}m`;

  let solvedValue = 0;
  let solvedUnit = '';
  if (solveFor === 'speed') {
    solvedValue = Math.round(sKmh * 100) / 100;
    solvedUnit = 'km/h';
  } else if (solveFor === 'distance') {
    solvedValue = Math.round(dKm * 100) / 100;
    solvedUnit = 'km';
  } else {
    solvedValue = Math.round(tHr * 100) / 100;
    solvedUnit = 'hours';
  }

  return {
    solvedValue,
    solvedUnit,
    speedMph: Math.round(speedMph * 100) / 100,
    speedKmh: Math.round(sKmh * 100) / 100,
    speedMs: Math.round(speedMs * 100) / 100,
    distanceMiles: Math.round(distanceMiles * 100) / 100,
    distanceKm: Math.round(dKm * 100) / 100,
    timeHours: Math.round(tHr * 100) / 100,
    timeFormatted
  };
}

export const MATERIAL_DENSITIES: Record<string, { name: string; densityKgM3: number; densityGCm3: number }> = {
  water: { name: 'Pure Water (4°C)', densityKgM3: 1000, densityGCm3: 1.0 },
  steel: { name: 'Structural Steel', densityKgM3: 7850, densityGCm3: 7.85 },
  aluminum: { name: 'Aluminum', densityKgM3: 2700, densityGCm3: 2.7 },
  gold: { name: 'Pure Gold (24k)', densityKgM3: 19300, densityGCm3: 19.3 },
  ice: { name: 'Ice (0°C)', densityKgM3: 917, densityGCm3: 0.917 },
  concrete: { name: 'Concrete', densityKgM3: 2400, densityGCm3: 2.4 },
  air: { name: 'Air (sea level, 20°C)', densityKgM3: 1.204, densityGCm3: 0.001204 },
  oak: { name: 'Oak Wood (seasoned)', densityKgM3: 750, densityGCm3: 0.75 }
};

export interface DensityResult {
  densityKgM3: number;
  densityGCm3: number;
  massKg: number;
  massGrams: number;
  volumeM3: number;
  volumeLiters: number;
  specificGravity: number; // relative to water
}

export function calculateDensityMassVolume(
  solveFor: 'density' | 'mass' | 'volume',
  densityKgM3?: number,
  massKg?: number,
  volumeM3?: number
): DensityResult {
  let rho = densityKgM3 || 1000;
  let m = massKg || 1;
  let v = volumeM3 || 0.001;

  if (solveFor === 'density') {
    rho = v > 0 ? m / v : 0;
  } else if (solveFor === 'mass') {
    m = rho * v;
  } else {
    v = rho > 0 ? m / rho : 0;
  }

  const densityGCm3 = rho / 1000;
  const massGrams = m * 1000;
  const volumeLiters = v * 1000;
  const specificGravity = rho / 1000;

  return {
    densityKgM3: Math.round(rho * 100) / 100,
    densityGCm3: Math.round(densityGCm3 * 1000) / 1000,
    massKg: Math.round(m * 100) / 100,
    massGrams: Math.round(massGrams * 10) / 10,
    volumeM3: Math.round(v * 10000) / 10000,
    volumeLiters: Math.round(volumeLiters * 100) / 100,
    specificGravity: Math.round(specificGravity * 1000) / 1000
  };
}

export interface ForceResult {
  forceNewtons: number;
  forcePounds: number; // lbf
  momentumKgmS: number;
  kineticEnergyJoules: number;
}

export function calculateForce(massKg: number, accelerationMs2: number, velocityMs = 0): ForceResult {
  const forceN = massKg * accelerationMs2;
  const forceLbf = forceN * 0.224809;
  const momentum = massKg * velocityMs;
  const ke = 0.5 * massKg * Math.pow(velocityMs, 2);

  return {
    forceNewtons: Math.round(forceN * 100) / 100,
    forcePounds: Math.round(forceLbf * 100) / 100,
    momentumKgmS: Math.round(momentum * 100) / 100,
    kineticEnergyJoules: Math.round(ke * 100) / 100
  };
}

export interface OhmsLawResult {
  voltage: number; // Volts
  current: number; // Amperes
  resistance: number; // Ohms
  power: number; // Watts
  formulasUsed: string[];
}

export function calculateOhmsLaw(
  v?: number,
  i?: number,
  r?: number,
  p?: number
): OhmsLawResult {
  let voltage = v;
  let current = i;
  let resistance = r;
  let power = p;
  const formulasUsed: string[] = [];

  // Count knowns
  if (voltage !== undefined && current !== undefined) {
    resistance = current !== 0 ? voltage / current : 0;
    power = voltage * current;
    formulasUsed.push('R = V / I', 'P = V × I');
  } else if (voltage !== undefined && resistance !== undefined) {
    current = resistance !== 0 ? voltage / resistance : 0;
    power = resistance !== 0 ? (voltage * voltage) / resistance : 0;
    formulasUsed.push('I = V / R', 'P = V² / R');
  } else if (voltage !== undefined && power !== undefined) {
    current = voltage !== 0 ? power / voltage : 0;
    resistance = power !== 0 ? (voltage * voltage) / power : 0;
    formulasUsed.push('I = P / V', 'R = V² / P');
  } else if (current !== undefined && resistance !== undefined) {
    voltage = current * resistance;
    power = current * current * resistance;
    formulasUsed.push('V = I × R', 'P = I² × R');
  } else if (current !== undefined && power !== undefined) {
    voltage = current !== 0 ? power / current : 0;
    resistance = current !== 0 ? power / (current * current) : 0;
    formulasUsed.push('V = P / I', 'R = P / I²');
  } else if (resistance !== undefined && power !== undefined) {
    voltage = Math.sqrt(power * resistance);
    current = resistance !== 0 ? Math.sqrt(power / resistance) : 0;
    formulasUsed.push('V = √(P × R)', 'I = √(P / R)');
  } else {
    // Default fallback: 12V and 100 Ohms
    voltage = 12;
    resistance = 100;
    current = 0.12;
    power = 1.44;
    formulasUsed.push('Default 12V circuit');
  }

  return {
    voltage: Math.round((voltage || 0) * 1000) / 1000,
    current: Math.round((current || 0) * 1000) / 1000,
    resistance: Math.round((resistance || 0) * 1000) / 1000,
    power: Math.round((power || 0) * 1000) / 1000,
    formulasUsed
  };
}
