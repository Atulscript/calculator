// =========================================================
// SPECIALIZED HIGH-TRAFFIC ENGINES
// BAC (Blood Alcohol), BSA (Body Surface Area), IP Subnet, Password Generator
// =========================================================

// 1. Blood Alcohol Content (BAC) Calculator (Widmark Formula)
export interface BACInput {
  gender: 'male' | 'female';
  bodyWeightKg: number;
  drinksCount: number; // standard drinks (14g pure alcohol each)
  alcoholOzPerDrink?: number;
  abvPercent?: number;
  hoursDrinking: number;
}

export interface BACResult {
  bacPercent: number; // e.g. 0.08%
  stateDescription: string;
  hoursUntilSober: number;
  isLegalDrivingLimitExceeded: boolean; // 0.08 limit in US/UK
}

export function calculateBAC(input: BACInput): BACResult {
  const { gender, bodyWeightKg, drinksCount, hoursDrinking } = input;
  // Standard drink in US = 14 grams pure alcohol
  const alcoholGrams = drinksCount * 14;

  // Gender body water constant (r): Male ~ 0.68, Female ~ 0.55
  const r = gender === 'male' ? 0.68 : 0.55;
  const weightGrams = bodyWeightKg * 1000;

  // Raw BAC % = (Alcohol consumed in grams / (Body weight in grams * r)) * 100
  let rawBAC = (alcoholGrams / (weightGrams * r)) * 100;
  // Metabolic burn rate ~ 0.015% per hour
  const metabolicDecay = hoursDrinking * 0.015;
  const netBAC = Math.max(0, rawBAC - metabolicDecay);

  const hoursUntilSober = netBAC > 0 ? Math.round((netBAC / 0.015) * 10) / 10 : 0;

  let stateDescription = 'Normal / Sober';
  if (netBAC >= 0.25) stateDescription = 'Severe Alcohol Poisoning Risk – Seek Medical Attention';
  else if (netBAC >= 0.15) stateDescription = 'Major Impairment, Loss of Balance & Slurred Speech';
  else if (netBAC >= 0.08) stateDescription = 'Legally Intoxicated – Impaired Judgment & Reflexes';
  else if (netBAC >= 0.04) stateDescription = 'Relaxed, Mild Euphoria, Slight Impairment';
  else if (netBAC > 0) stateDescription = 'Minimal Effect, Mild Warmth';

  return {
    bacPercent: Math.round(netBAC * 1000) / 1000,
    stateDescription,
    hoursUntilSober,
    isLegalDrivingLimitExceeded: netBAC >= 0.08
  };
}

// 2. Body Surface Area (BSA) / Medical Dosage Calculator
export interface BSAInput {
  heightCm: number;
  weightKg: number;
  drugDosePerM2?: number; // e.g. 100 mg/m²
}

export interface BSAResult {
  bsaMosteller: number; // m²
  bsaDuBois: number; // m²
  bsaHaycock: number; // m²
  calculatedDosage?: number;
}

export function calculateBSA(input: BSAInput): BSAResult {
  const { heightCm, weightKg, drugDosePerM2 = 0 } = input;

  // Mosteller formula: sqrt(height * weight / 3600)
  const bsaMosteller = Math.sqrt((heightCm * weightKg) / 3600);
  // Du Bois formula: 0.007184 * (height ^ 0.725) * (weight ^ 0.425)
  const bsaDuBois = 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);
  // Haycock formula: 0.024265 * (height ^ 0.3964) * (weight ^ 0.5378)
  const bsaHaycock = 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378);

  const calculatedDosage = drugDosePerM2 > 0 ? Math.round(bsaMosteller * drugDosePerM2 * 100) / 100 : undefined;

  return {
    bsaMosteller: Math.round(bsaMosteller * 100) / 100,
    bsaDuBois: Math.round(bsaDuBois * 100) / 100,
    bsaHaycock: Math.round(bsaHaycock * 100) / 100,
    calculatedDosage
  };
}

// 3. IP Subnet Calculator (IPv4)
export interface IPSubnetInput {
  ipAddress: string; // e.g. "192.168.1.100"
  cidrPrefix: number; // e.g. 24
}

export interface IPSubnetResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  wildcardMask: string;
  firstUsableIP: string;
  lastUsableIP: string;
  totalUsableHosts: number;
  ipClass: string;
}

function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

function longToIP(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ].join('.');
}

export function calculateIPSubnet(input: IPSubnetInput): IPSubnetResult {
  const { ipAddress, cidrPrefix = 24 } = input;
  const safeCidr = Math.max(0, Math.min(32, cidrPrefix));

  const maskLong = safeCidr === 0 ? 0 : (~0 << (32 - safeCidr)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;

  const validIP = ipAddress.match(/^(\d{1,3}\.){3}\d{1,3}$/) ? ipAddress : '192.168.1.1';
  const ipLong = ipToLong(validIP);

  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  const firstUsable = safeCidr >= 31 ? networkLong : (networkLong + 1) >>> 0;
  const lastUsable = safeCidr >= 31 ? broadcastLong : (broadcastLong - 1) >>> 0;
  const totalUsable = safeCidr >= 31 ? (safeCidr === 31 ? 2 : 1) : Math.max(0, broadcastLong - networkLong - 1);

  const firstOctet = parseInt(validIP.split('.')[0], 10);
  let ipClass = 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
  else if (firstOctet >= 240) ipClass = 'Class E (Experimental)';

  return {
    networkAddress: longToIP(networkLong),
    broadcastAddress: longToIP(broadcastLong),
    subnetMask: longToIP(maskLong),
    wildcardMask: longToIP(wildcardLong),
    firstUsableIP: longToIP(firstUsable),
    lastUsableIP: longToIP(lastUsable),
    totalUsableHosts: totalUsable,
    ipClass
  };
}

// 4. Password Generator & Security Entropy Rating
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface PasswordResult {
  password: string;
  entropyBits: number;
  strengthLabel: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';
  crackTimeEstimate: string;
}

export function generateSecurePassword(options: PasswordOptions): PasswordResult {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true
  } = options;

  let charset = '';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

  let password = '';
  const cryptoObj = typeof window !== 'undefined' && window.crypto ? window.crypto : null;

  if (cryptoObj && cryptoObj.getRandomValues) {
    const randomVals = new Uint32Array(length);
    cryptoObj.getRandomValues(randomVals);
    for (let i = 0; i < length; i++) {
      password += charset[randomVals[i] % charset.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
  }

  // Shannon Entropy: length * log2(pool size)
  const poolSize = charset.length;
  const entropyBits = Math.round(length * (Math.log(poolSize) / Math.log(2)));

  let strengthLabel: PasswordResult['strengthLabel'] = 'Moderate';
  let crackTimeEstimate = '3 weeks';

  if (entropyBits < 35) {
    strengthLabel = 'Very Weak';
    crackTimeEstimate = 'Instant';
  } else if (entropyBits < 55) {
    strengthLabel = 'Weak';
    crackTimeEstimate = 'A few hours';
  } else if (entropyBits < 75) {
    strengthLabel = 'Moderate';
    crackTimeEstimate = 'Several months';
  } else if (entropyBits < 95) {
    strengthLabel = 'Strong';
    crackTimeEstimate = 'Decades';
  } else {
    strengthLabel = 'Very Strong';
    crackTimeEstimate = 'Centuries';
  }

  return {
    password,
    entropyBits,
    strengthLabel,
    crackTimeEstimate
  };
}
