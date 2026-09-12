// Comprehensive Construction & DIY Calculation Engines

export interface SquareFootageInput {
  lengthFeet: number;
  widthFeet: number;
  wastePercent: number; // e.g. 10%
  pricePerSqFt?: number;
}

export interface SquareFootageResult {
  rawSqFt: number;
  wasteSqFt: number;
  totalSqFt: number;
  totalSqMeters: number;
  estimatedCost: number;
}

export function calculateSquareFootage(input: SquareFootageInput): SquareFootageResult {
  const { lengthFeet, widthFeet, wastePercent = 10, pricePerSqFt = 0 } = input;
  const rawSqFt = lengthFeet * widthFeet;
  const wasteSqFt = (rawSqFt * wastePercent) / 100;
  const totalSqFt = rawSqFt + wasteSqFt;
  const totalSqMeters = totalSqFt * 0.092903;
  const estimatedCost = totalSqFt * pricePerSqFt;

  return {
    rawSqFt: Math.round(rawSqFt * 10) / 10,
    wasteSqFt: Math.round(wasteSqFt * 10) / 10,
    totalSqFt: Math.round(totalSqFt * 10) / 10,
    totalSqMeters: Math.round(totalSqMeters * 100) / 100,
    estimatedCost: Math.round(estimatedCost * 100) / 100
  };
}

export interface PaintInput {
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  doorsCount: number;
  windowsCount: number;
  coatsCount: number;
  coverageSqFtPerGallon?: number; // default 350 sq ft/gal
}

export interface PaintResult {
  wallAreaSqFt: number;
  netAreaSqFt: number;
  totalAreaToPaintSqFt: number;
  gallonsNeeded: number;
  litersNeeded: number;
  recommendedCans1Gal: number;
}

export function calculatePaintQuantity(input: PaintInput): PaintResult {
  const {
    lengthFeet,
    widthFeet,
    heightFeet,
    doorsCount = 1,
    windowsCount = 2,
    coatsCount = 2,
    coverageSqFtPerGallon = 350
  } = input;

  const perimeter = 2 * (lengthFeet + widthFeet);
  const wallArea = perimeter * heightFeet;

  // Typical door is 21 sq ft, typical window is 15 sq ft
  const deductions = doorsCount * 21 + windowsCount * 15;
  const netArea = Math.max(0, wallArea - deductions);
  const totalAreaToPaint = netArea * coatsCount;

  const gallons = totalAreaToPaint / coverageSqFtPerGallon;
  const liters = gallons * 3.78541;

  return {
    wallAreaSqFt: Math.round(wallArea),
    netAreaSqFt: Math.round(netArea),
    totalAreaToPaintSqFt: Math.round(totalAreaToPaint),
    gallonsNeeded: Math.round(gallons * 10) / 10,
    litersNeeded: Math.round(liters * 10) / 10,
    recommendedCans1Gal: Math.ceil(gallons)
  };
}

export interface ConcreteInput {
  shape: 'slab' | 'footing' | 'column';
  lengthFeet?: number;
  widthFeet?: number;
  thicknessInches?: number;
  diameterInches?: number;
  depthFeet?: number;
  quantity?: number;
}

export interface ConcreteResult {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  bags60lb: number;
  bags80lb: number;
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const { shape, lengthFeet = 10, widthFeet = 10, thicknessInches = 4, diameterInches = 12, depthFeet = 4, quantity = 1 } = input;
  let cubicFeet = 0;

  if (shape === 'column') {
    const radiusFeet = diameterInches / 2 / 12;
    cubicFeet = Math.PI * Math.pow(radiusFeet, 2) * depthFeet * quantity;
  } else {
    // slab or footing
    const thickFeet = thicknessInches / 12;
    cubicFeet = lengthFeet * widthFeet * thickFeet * quantity;
  }

  const cubicYards = cubicFeet / 27;
  const cubicMeters = cubicFeet * 0.0283168;

  // A 60-lb bag yields approx 0.45 cu ft; an 80-lb bag yields approx 0.60 cu ft
  const bags60lb = Math.ceil(cubicFeet / 0.45);
  const bags80lb = Math.ceil(cubicFeet / 0.60);

  return {
    cubicFeet: Math.round(cubicFeet * 10) / 10,
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicMeters: Math.round(cubicMeters * 100) / 100,
    bags60lb,
    bags80lb
  };
}

export interface TileInput {
  floorLengthFeet: number;
  floorWidthFeet: number;
  tileLengthInches: number;
  tileWidthInches: number;
  wastePercent: number; // e.g. 10%
  tilesPerBox?: number;
}

export interface TileResult {
  floorSqFt: number;
  singleTileSqFt: number;
  rawTilesNeeded: number;
  totalTilesWithWaste: number;
  boxesNeeded: number;
}

export function calculateTileQuantity(input: TileInput): TileResult {
  const { floorLengthFeet, floorWidthFeet, tileLengthInches, tileWidthInches, wastePercent = 10, tilesPerBox = 10 } = input;
  const floorSqFt = floorLengthFeet * floorWidthFeet;
  const singleTileSqFt = (tileLengthInches * tileWidthInches) / 144;

  const rawTilesNeeded = singleTileSqFt > 0 ? floorSqFt / singleTileSqFt : 0;
  const totalTilesWithWaste = Math.ceil(rawTilesNeeded * (1 + wastePercent / 100));
  const boxesNeeded = tilesPerBox > 0 ? Math.ceil(totalTilesWithWaste / tilesPerBox) : 0;

  return {
    floorSqFt: Math.round(floorSqFt * 10) / 10,
    singleTileSqFt: Math.round(singleTileSqFt * 100) / 100,
    rawTilesNeeded: Math.ceil(rawTilesNeeded),
    totalTilesWithWaste,
    boxesNeeded
  };
}

export interface MulchGravelInput {
  lengthFeet: number;
  widthFeet: number;
  depthInches: number;
}

export interface MulchGravelResult {
  cubicFeet: number;
  cubicYards: number;
  tonsGravel: number; // approx 1.4 tons per cu yard
  bags2CuFt: number;
}

export function calculateMulchGravel(input: MulchGravelInput): MulchGravelResult {
  const { lengthFeet, widthFeet, depthInches } = input;
  const cubicFeet = lengthFeet * widthFeet * (depthInches / 12);
  const cubicYards = cubicFeet / 27;
  const tonsGravel = cubicYards * 1.4;
  const bags2CuFt = Math.ceil(cubicFeet / 2);

  return {
    cubicFeet: Math.round(cubicFeet * 10) / 10,
    cubicYards: Math.round(cubicYards * 100) / 100,
    tonsGravel: Math.round(tonsGravel * 10) / 10,
    bags2CuFt
  };
}

export interface WallpaperInput {
  roomPerimeterFeet: number;
  wallHeightFeet: number;
  rollWidthInches?: number; // default 21 inches
  rollLengthFeet?: number; // default 33 feet (Euro standard double roll)
  wastePercent?: number; // default 15% for pattern match
}

export interface WallpaperResult {
  totalWallAreaSqFt: number;
  singleRollAreaSqFt: number;
  rollsNeeded: number;
}

export function calculateWallpaper(input: WallpaperInput): WallpaperResult {
  const {
    roomPerimeterFeet,
    wallHeightFeet,
    rollWidthInches = 21,
    rollLengthFeet = 33,
    wastePercent = 15
  } = input;

  const totalWallArea = roomPerimeterFeet * wallHeightFeet;
  const singleRollArea = (rollWidthInches / 12) * rollLengthFeet;
  const netCoveragePerRoll = singleRollArea * (1 - wastePercent / 100);

  const rollsNeeded = netCoveragePerRoll > 0 ? Math.ceil(totalWallArea / netCoveragePerRoll) : 0;

  return {
    totalWallAreaSqFt: Math.round(totalWallArea),
    singleRollAreaSqFt: Math.round(singleRollArea * 10) / 10,
    rollsNeeded
  };
}
