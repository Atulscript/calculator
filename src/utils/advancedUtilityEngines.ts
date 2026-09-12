// Advanced Utility & Engineering Calculation Engines matching calculator.net tools

export interface ElectricityCostResult {
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  dailyKwh: number;
  monthlyKwh: number;
  annualKwh: number;
}

export function calculateElectricityCost(
  wattage: number,
  hoursPerDay: number,
  costPerKwh: number // in currency units (e.g. 0.15 $/kWh or 8 INR/kWh)
): ElectricityCostResult {
  const dailyKwh = (wattage * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30.4167; // average month length
  const annualKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * costPerKwh;
  const monthlyCost = monthlyKwh * costPerKwh;
  const annualCost = annualKwh * costPerKwh;

  return {
    dailyCost: Math.round(dailyCost * 100) / 100,
    monthlyCost: Math.round(monthlyCost * 100) / 100,
    annualCost: Math.round(annualCost * 100) / 100,
    dailyKwh: Math.round(dailyKwh * 100) / 100,
    monthlyKwh: Math.round(monthlyKwh * 10) / 10,
    annualKwh: Math.round(annualKwh * 10) / 10
  };
}

export interface BTUSizingResult {
  recommendedBTU: number;
  acTons: number;
  roomAreaSqFt: number;
}

export function calculateBTU(
  roomLengthFt: number,
  roomWidthFt: number,
  sunExposure: 'normal' | 'sunny' | 'shaded' = 'normal',
  occupants: number = 2
): BTUSizingResult {
  const area = roomLengthFt * roomWidthFt;
  let baseBTU = 5000;

  if (area <= 150) baseBTU = 5000;
  else if (area <= 250) baseBTU = 6000;
  else if (area <= 350) baseBTU = 8000;
  else if (area <= 450) baseBTU = 10000;
  else if (area <= 550) baseBTU = 12000;
  else if (area <= 700) baseBTU = 14000;
  else if (area <= 1000) baseBTU = 18000;
  else if (area <= 1500) baseBTU = 24000;
  else baseBTU = 30000;

  if (sunExposure === 'sunny') baseBTU *= 1.1;
  if (sunExposure === 'shaded') baseBTU *= 0.9;
  if (occupants > 2) baseBTU += (occupants - 2) * 600;

  const recommendedBTU = Math.round(baseBTU);
  const acTons = Math.round((recommendedBTU / 12000) * 10) / 10;

  return {
    recommendedBTU,
    acTons,
    roomAreaSqFt: Math.round(area)
  };
}

export interface HorsepowerResult {
  horsepower: number;
  kilowatts: number;
  metricHorsepower: number;
}

export function calculateHorsepower(torqueLbFt: number, rpm: number): HorsepowerResult {
  // HP = (Torque * RPM) / 5252
  const hp = (torqueLbFt * rpm) / 5252;
  const kw = hp * 0.7457;
  const ps = hp * 1.01387; // Metric HP / PS

  return {
    horsepower: Math.round(hp * 10) / 10,
    kilowatts: Math.round(kw * 10) / 10,
    metricHorsepower: Math.round(ps * 10) / 10
  };
}

export interface StairResult {
  numberOfRisers: number;
  exactRiserHeightInches: number;
  numberOfTreads: number;
  totalRunInches: number;
  stairAngleDegrees: number;
  stringerLengthInches: number;
}

export function calculateStairs(
  totalRiseInches: number,
  targetRiserHeightInches: number = 7.5,
  treadDepthInches: number = 10
): StairResult {
  const numRisers = Math.max(1, Math.round(totalRiseInches / targetRiserHeightInches));
  const exactRiser = totalRiseInches / numRisers;
  const numTreads = numRisers - 1;
  const totalRun = numTreads * treadDepthInches;
  const stringerLength = Math.sqrt(totalRiseInches * totalRiseInches + totalRun * totalRun);
  const angle = (Math.atan2(totalRiseInches, totalRun) * 180) / Math.PI;

  return {
    numberOfRisers: numRisers,
    exactRiserHeightInches: Math.round(exactRiser * 100) / 100,
    numberOfTreads: numTreads,
    totalRunInches: Math.round(totalRun * 100) / 100,
    stairAngleDegrees: Math.round(angle * 10) / 10,
    stringerLengthInches: Math.round(stringerLength * 100) / 100
  };
}

export interface TimeCardResult {
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
}

export function calculateTimeCard(
  totalHoursWorked: number,
  hourlyWage: number,
  overtimeThreshold: number = 40,
  overtimeMultiplier: number = 1.5
): TimeCardResult {
  const regularHours = Math.min(totalHoursWorked, overtimeThreshold);
  const overtimeHours = Math.max(0, totalHoursWorked - overtimeThreshold);

  const regularPay = regularHours * hourlyWage;
  const overtimePay = overtimeHours * hourlyWage * overtimeMultiplier;
  const grossPay = regularPay + overtimePay;

  return {
    regularHours: Math.round(regularHours * 100) / 100,
    overtimeHours: Math.round(overtimeHours * 100) / 100,
    totalHours: Math.round(totalHoursWorked * 100) / 100,
    regularPay: Math.round(regularPay * 100) / 100,
    overtimePay: Math.round(overtimePay * 100) / 100,
    grossPay: Math.round(grossPay * 100) / 100
  };
}

export interface BandwidthResult {
  downloadTimeSeconds: number;
  formattedTime: string;
  transferSpeedMBs: number;
}

export function calculateBandwidth(
  fileSizeMB: number,
  speedMbps: number
): BandwidthResult {
  // Speed in megabits per second -> Megabytes per second = Mbps / 8
  const speedMBs = speedMbps / 8;
  const totalSeconds = speedMBs > 0 ? fileSizeMB / speedMBs : 0;

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);

  let formattedTime = `${s}s`;
  if (h > 0) formattedTime = `${h}h ${m}m ${s}s`;
  else if (m > 0) formattedTime = `${m}m ${s}s`;

  return {
    downloadTimeSeconds: Math.round(totalSeconds * 10) / 10,
    formattedTime,
    transferSpeedMBs: Math.round(speedMBs * 100) / 100
  };
}

export function intToRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Out of Range (1 - 3999)';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let roman = '';
  let n = num;
  for (let i = 0; i < val.length; i++) {
    while (n >= val[i]) {
      roman += syms[i];
      n -= val[i];
    }
  }
  return roman;
}

export interface TireDimensions {
  widthMm: number;
  aspectRatio: number;
  wheelDiameterInches: number;
  sidewallInches: number;
  sidewallMm: number;
  diameterInches: number;
  diameterMm: number;
  circumferenceInches: number;
  circumferenceMm: number;
  revsPerMile: number;
}

export interface TireComparisonResult {
  tire1: TireDimensions;
  tire2: TireDimensions;
  diameterDiffInches: number;
  diameterDiffPercent: number;
  sidewallDiffInches: number;
  circumferenceDiffInches: number;
  speedometerErrorPercent: number;
  speedAt60Mph: number;
  speedAt100Kmh: number;
  speedComparisons: { indicated: number; actual: number }[];
}

function computeSingleTire(widthMm: number, aspectRatio: number, wheelDiameterInches: number): TireDimensions {
  const sidewallMm = widthMm * (aspectRatio / 100);
  const sidewallInches = sidewallMm / 25.4;
  const diameterInches = wheelDiameterInches + 2 * sidewallInches;
  const diameterMm = diameterInches * 25.4;
  const circumferenceInches = Math.PI * diameterInches;
  const circumferenceMm = Math.PI * diameterMm;
  const revsPerMile = circumferenceInches > 0 ? 63360 / circumferenceInches : 0;

  return {
    widthMm,
    aspectRatio,
    wheelDiameterInches,
    sidewallInches: Math.round(sidewallInches * 100) / 100,
    sidewallMm: Math.round(sidewallMm * 10) / 10,
    diameterInches: Math.round(diameterInches * 100) / 100,
    diameterMm: Math.round(diameterMm * 10) / 10,
    circumferenceInches: Math.round(circumferenceInches * 100) / 100,
    circumferenceMm: Math.round(circumferenceMm * 10) / 10,
    revsPerMile: Math.round(revsPerMile)
  };
}

export function calculateTireComparison(
  w1: number, a1: number, r1: number,
  w2: number, a2: number, r2: number
): TireComparisonResult {
  const tire1 = computeSingleTire(w1, a1, r1);
  const tire2 = computeSingleTire(w2, a2, r2);

  const diameterDiffInches = Math.round((tire2.diameterInches - tire1.diameterInches) * 100) / 100;
  const diameterDiffPercent = tire1.diameterInches > 0 
    ? Math.round(((tire2.diameterInches - tire1.diameterInches) / tire1.diameterInches) * 1000) / 10
    : 0;

  const sidewallDiffInches = Math.round((tire2.sidewallInches - tire1.sidewallInches) * 100) / 100;
  const circumferenceDiffInches = Math.round((tire2.circumferenceInches - tire1.circumferenceInches) * 100) / 100;

  const ratio = tire1.diameterInches > 0 ? tire2.diameterInches / tire1.diameterInches : 1;
  const speedAt60Mph = Math.round(60 * ratio * 10) / 10;
  const speedAt100Kmh = Math.round(100 * ratio * 10) / 10;

  const speeds = [20, 30, 45, 60, 75, 90];
  const speedComparisons = speeds.map(spd => ({
    indicated: spd,
    actual: Math.round(spd * ratio * 10) / 10
  }));

  return {
    tire1,
    tire2,
    diameterDiffInches,
    diameterDiffPercent,
    sidewallDiffInches,
    circumferenceDiffInches,
    speedometerErrorPercent: diameterDiffPercent,
    speedAt60Mph,
    speedAt100Kmh,
    speedComparisons
  };
}

export interface GasMileageResult {
  mpgUS: number;
  mpgUK: number;
  litersPer100Km: number;
  costPerMile: number;
  costPerKm: number;
  totalCost: number;
}

export function calculateGasMileage(
  distanceMiles: number,
  gallonsUsed: number,
  pricePerGallon: number
): GasMileageResult {
  const mpgUS = gallonsUsed > 0 ? distanceMiles / gallonsUsed : 0;
  const mpgUK = mpgUS * 1.20095;
  const litersPer100Km = mpgUS > 0 ? 235.214583 / mpgUS : 0;
  const totalCost = gallonsUsed * pricePerGallon;
  const costPerMile = distanceMiles > 0 ? totalCost / distanceMiles : 0;
  const costPerKm = costPerMile / 1.60934;

  return {
    mpgUS: Math.round(mpgUS * 10) / 10,
    mpgUK: Math.round(mpgUK * 10) / 10,
    litersPer100Km: Math.round(litersPer100Km * 10) / 10,
    costPerMile: Math.round(costPerMile * 100) / 100,
    costPerKm: Math.round(costPerKm * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100
  };
}

export interface RoofingResult {
  roofAreaSqFt: number;
  roofSquares: number;
  bundlesNeeded: number;
  estimatedCost: number;
}

export function calculateRoofing(
  baseLengthFt: number,
  baseWidthFt: number,
  pitchRise: number = 6, // rise per 12" run
  wastePercent: number = 10,
  costPerSquare: number = 120
): RoofingResult {
  // Pitch slope factor = sqrt(12^2 + rise^2) / 12
  const slopeFactor = Math.sqrt(144 + pitchRise * pitchRise) / 12;
  const baseArea = baseLengthFt * baseWidthFt;
  const roofAreaSqFt = Math.round(baseArea * slopeFactor);
  const squaresWithWaste = (roofAreaSqFt / 100) * (1 + wastePercent / 100);
  const roofSquares = Math.round(squaresWithWaste * 10) / 10;
  const bundlesNeeded = Math.ceil(roofSquares * 3);
  const estimatedCost = Math.round(roofSquares * costPerSquare);

  return {
    roofAreaSqFt,
    roofSquares,
    bundlesNeeded,
    estimatedCost
  };
}

