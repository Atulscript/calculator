// =========================================================
// HIGH TRAFFIC CALCULATOR ENGINES
// Auto Loan, Retirement/FIRE, Ovulation/Fertility, Fuel Cost, GST, BMR, PPF
// =========================================================

// 1. Auto / Car Loan Calculator
export interface AutoLoanInput {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  salesTaxPercent: number;
  annualInterestRate: number;
  loanTermMonths: number; // 24, 36, 48, 60, 72, 84
  dealerFees?: number;
}

export interface AutoLoanResult {
  loanAmount: number;
  salesTaxAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalLoanPayments: number;
  totalVehicleCost: number; // Down payment + Trade-in + Total loan payments
}

export function calculateAutoLoan(input: AutoLoanInput): AutoLoanResult {
  const {
    vehiclePrice,
    downPayment = 0,
    tradeInValue = 0,
    salesTaxPercent = 7,
    annualInterestRate = 6.5,
    loanTermMonths = 60,
    dealerFees = 500
  } = input;

  const taxablePrice = Math.max(0, vehiclePrice - tradeInValue);
  const salesTaxAmount = (taxablePrice * salesTaxPercent) / 100;
  const initialPrincipal = Math.max(0, vehiclePrice + salesTaxAmount + dealerFees - downPayment - tradeInValue);

  const monthlyRate = annualInterestRate / 12 / 100;
  let monthlyPayment = 0;

  if (monthlyRate === 0 || loanTermMonths === 0) {
    monthlyPayment = loanTermMonths > 0 ? initialPrincipal / loanTermMonths : 0;
  } else {
    monthlyPayment =
      (initialPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  }

  const totalLoanPayments = monthlyPayment * loanTermMonths;
  const totalInterest = Math.max(0, totalLoanPayments - initialPrincipal);
  const totalVehicleCost = downPayment + tradeInValue + totalLoanPayments;

  return {
    loanAmount: Math.round(initialPrincipal),
    salesTaxAmount: Math.round(salesTaxAmount),
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalLoanPayments: Math.round(totalLoanPayments),
    totalVehicleCost: Math.round(totalVehicleCost)
  };
}

// 2. Retirement & FIRE Calculator
export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancyAge?: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedAnnualReturn: number;
  inflationRate?: number;
  desiredMonthlyIncome?: number;
}

export interface RetirementMilestone {
  age: number;
  year: number;
  balance: number;
  totalDeposits: number;
  interestEarned: number;
}

export interface RetirementResult {
  projectedNestEgg: number;
  totalContributions: number;
  totalInterestEarned: number;
  monthlyRetirementIncomeSafe: number; // 4% Rule safe withdrawal
  isTargetMet: boolean;
  targetNestEgg: number;
  milestones: RetirementMilestone[];
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedAnnualReturn = 8,
    inflationRate = 2.5,
    desiredMonthlyIncome = 4000
  } = input;

  const yearsToInvest = Math.max(1, retirementAge - currentAge);
  const realReturnRate = (1 + expectedAnnualReturn / 100) / (1 + (inflationRate || 0) / 100) - 1;
  const monthlyRealRate = realReturnRate / 12;

  let balance = currentSavings;
  let totalDeposits = currentSavings;
  const milestones: RetirementMilestone[] = [];
  const currentYear = new Date().getFullYear();

  for (let y = 1; y <= yearsToInvest; y++) {
    for (let m = 1; m <= 12; m++) {
      balance = balance * (1 + monthlyRealRate) + monthlyContribution;
      totalDeposits += monthlyContribution;
    }

    if (y % 5 === 0 || y === yearsToInvest) {
      milestones.push({
        age: currentAge + y,
        year: currentYear + y,
        balance: Math.round(balance),
        totalDeposits: Math.round(totalDeposits),
        interestEarned: Math.round(Math.max(0, balance - totalDeposits))
      });
    }
  }

  // 4% safe withdrawal rule = balance * 0.04 / 12 per month
  const monthlyRetirementIncomeSafe = Math.round((balance * 0.04) / 12);
  // Target nest egg needed to generate desired monthly income with 4% rule
  const targetNestEgg = Math.round((desiredMonthlyIncome * 12) / 0.04);
  const isTargetMet = balance >= targetNestEgg;

  return {
    projectedNestEgg: Math.round(balance),
    totalContributions: Math.round(totalDeposits),
    totalInterestEarned: Math.round(Math.max(0, balance - totalDeposits)),
    monthlyRetirementIncomeSafe,
    isTargetMet,
    targetNestEgg,
    milestones
  };
}

// 3. Ovulation & Fertility Calculator
export interface OvulationInput {
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLengthDays: number; // Typical 21 - 35 days, default 28
}

export interface OvulationResult {
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  peakFertilityStart: string;
  peakFertilityEnd: string;
  nextPeriodDate: string;
  pregnancyTestDate: string;
  daysUntilOvulation: number;
}

export function calculateOvulation(input: OvulationInput): OvulationResult {
  const { lastPeriodDate, cycleLengthDays = 28 } = input;
  const lmp = new Date(lastPeriodDate);
  const safeLmp = isNaN(lmp.getTime()) ? new Date() : lmp;

  // Luteal phase is consistently 14 days before next period
  const ovulationDayOffset = cycleLengthDays - 14;

  const ovulationDateObj = new Date(safeLmp);
  ovulationDateObj.setDate(ovulationDateObj.getDate() + ovulationDayOffset);

  // Fertile window: 5 days before ovulation up to ovulation day
  const fertileStartObj = new Date(ovulationDateObj);
  fertileStartObj.setDate(fertileStartObj.getDate() - 5);

  const fertileEndObj = new Date(ovulationDateObj);
  fertileEndObj.setDate(fertileEndObj.getDate() + 1);

  // Peak fertility: 1 day before ovulation and ovulation day
  const peakStartObj = new Date(ovulationDateObj);
  peakStartObj.setDate(peakStartObj.getDate() - 1);

  // Next expected period
  const nextPeriodObj = new Date(safeLmp);
  nextPeriodObj.setDate(nextPeriodObj.getDate() + cycleLengthDays);

  // Best pregnancy test date (first day of missed period)
  const pregnancyTestObj = new Date(nextPeriodObj);
  pregnancyTestObj.setDate(pregnancyTestObj.getDate() + 1);

  const now = new Date();
  const diffTime = ovulationDateObj.getTime() - now.getTime();
  const daysUntilOvulation = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return {
    ovulationDate: formatDate(ovulationDateObj),
    fertileWindowStart: formatDate(fertileStartObj),
    fertileWindowEnd: formatDate(fertileEndObj),
    peakFertilityStart: formatDate(peakStartObj),
    peakFertilityEnd: formatDate(ovulationDateObj),
    nextPeriodDate: formatDate(nextPeriodObj),
    pregnancyTestDate: formatDate(pregnancyTestObj),
    daysUntilOvulation: Math.max(0, daysUntilOvulation)
  };
}

// 4. Fuel Cost & Road Trip Calculator
export interface FuelCostInput {
  distance: number;
  distanceUnit: 'miles' | 'km';
  efficiency: number;
  efficiencyUnit: 'mpg' | 'l_per_100km' | 'km_per_l';
  fuelPricePerUnit: number; // price per gallon or liter
  passengersCount?: number;
}

export interface FuelCostResult {
  fuelQuantityNeeded: number; // gallons or liters
  fuelQuantityUnit: string;
  totalCost: number;
  costPerPerson: number;
  costPerDistanceUnit: number;
}

export function calculateFuelCost(input: FuelCostInput): FuelCostResult {
  const {
    distance,
    distanceUnit,
    efficiency,
    efficiencyUnit,
    fuelPricePerUnit,
    passengersCount = 1
  } = input;

  let fuelQuantity = 0;
  let fuelUnit = distanceUnit === 'miles' ? 'Gallons' : 'Liters';

  if (efficiencyUnit === 'mpg') {
    // Miles per gallon
    const distInMiles = distanceUnit === 'miles' ? distance : distance * 0.621371;
    fuelQuantity = efficiency > 0 ? distInMiles / efficiency : 0;
    fuelUnit = 'Gallons';
  } else if (efficiencyUnit === 'l_per_100km') {
    // Liters per 100km
    const distInKm = distanceUnit === 'km' ? distance : distance * 1.60934;
    fuelQuantity = (distInKm * efficiency) / 100;
    fuelUnit = 'Liters';
  } else {
    // km per liter
    const distInKm = distanceUnit === 'km' ? distance : distance * 1.60934;
    fuelQuantity = efficiency > 0 ? distInKm / efficiency : 0;
    fuelUnit = 'Liters';
  }

  const totalCost = fuelQuantity * fuelPricePerUnit;
  const costPerPerson = passengersCount > 0 ? totalCost / passengersCount : totalCost;
  const costPerDistance = distance > 0 ? totalCost / distance : 0;

  return {
    fuelQuantityNeeded: Math.round(fuelQuantity * 100) / 100,
    fuelQuantityUnit: fuelUnit,
    totalCost: Math.round(totalCost * 100) / 100,
    costPerPerson: Math.round(costPerPerson * 100) / 100,
    costPerDistanceUnit: Math.round(costPerDistance * 100) / 100
  };
}

// 5. GST / VAT / Sales Tax Calculator
export interface GSTInput {
  amount: number;
  gstRate: number; // 5, 12, 18, 28, etc.
  type: 'exclusive' | 'inclusive'; // Add GST or Extract GST
}

export interface GSTResult {
  baseAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
}

export function calculateGST(input: GSTInput): GSTResult {
  const { amount, gstRate, type } = input;
  let baseAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (type === 'exclusive') {
    // Add GST to net amount
    baseAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = baseAmount + gstAmount;
  } else {
    // Extract GST from gross amount
    totalAmount = amount;
    baseAmount = (amount * 100) / (100 + gstRate);
    gstAmount = totalAmount - baseAmount;
  }

  const halfGst = gstAmount / 2;

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    cgst: Math.round(halfGst * 100) / 100,
    sgst: Math.round(halfGst * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100
  };
}

// 6. BMR (Basal Metabolic Rate) Calculator
export interface BMRInput {
  gender: 'male' | 'female';
  age: number;
  weightKg: number;
  heightCm: number;
}

export interface BMRResult {
  bmrMifflin: number;
  bmrHarrisBenedict: number;
  dailyCalories: {
    sedentary: number; // 1.2
    lightActivity: number; // 1.375
    moderateActivity: number; // 1.55
    veryActive: number; // 1.725
    extraActive: number; // 1.9
  };
}

export function calculateBMR(input: BMRInput): BMRResult {
  const { gender, age, weightKg, heightCm } = input;

  // Mifflin-St Jeor Equation
  let bmrMifflin = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmrMifflin += gender === 'male' ? 5 : -161;

  // Revised Harris-Benedict
  let bmrHarrisBenedict = 0;
  if (gender === 'male') {
    bmrHarrisBenedict = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    bmrHarrisBenedict = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }

  const base = Math.round(bmrMifflin);

  return {
    bmrMifflin: base,
    bmrHarrisBenedict: Math.round(bmrHarrisBenedict),
    dailyCalories: {
      sedentary: Math.round(base * 1.2),
      lightActivity: Math.round(base * 1.375),
      moderateActivity: Math.round(base * 1.55),
      veryActive: Math.round(base * 1.725),
      extraActive: Math.round(base * 1.9)
    }
  };
}

// 7. PPF (Public Provident Fund) Calculator
export interface PPFInput {
  yearlyDeposit: number; // Max ₹1,50,000 per financial year
  interestRate?: number; // Currently 7.1%
  tenureYears?: number; // 15, 20, 25 years
}

export interface PPFYearRow {
  year: number;
  openingBalance: number;
  deposit: number;
  interestEarned: number;
  closingBalance: number;
}

export interface PPFResult {
  totalDeposited: number;
  totalInterestEarned: number;
  maturityAmount: number;
  schedule: PPFYearRow[];
}

export function calculatePPF(input: PPFInput): PPFResult {
  const { yearlyDeposit, interestRate = 7.1, tenureYears = 15 } = input;
  const depositCapped = Math.min(150000, Math.max(500, yearlyDeposit));
  const rate = interestRate / 100;

  let balance = 0;
  let totalDeposited = 0;
  const schedule: PPFYearRow[] = [];

  for (let y = 1; y <= tenureYears; y++) {
    const opening = balance;
    // Deposited on or before 5th of April earns full year interest
    const interest = (opening + depositCapped) * rate;
    balance = opening + depositCapped + interest;
    totalDeposited += depositCapped;

    schedule.push({
      year: y,
      openingBalance: Math.round(opening),
      deposit: Math.round(depositCapped),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance)
    });
  }

  return {
    totalDeposited: Math.round(totalDeposited),
    totalInterestEarned: Math.round(Math.max(0, balance - totalDeposited)),
    maturityAmount: Math.round(balance),
    schedule
  };
}
