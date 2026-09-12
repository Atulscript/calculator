// Advanced Financial Calculation Engines matching calculator.net financial tools

export interface CalculationResult401k {
  futureBalance: number;
  totalEmployeeContributions: number;
  totalEmployerMatch: number;
  totalInvestmentGrowth: number;
}

export function calculate401k(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  annualSalary: number,
  contributionPercent: number,
  employerMatchPercent: number,
  employerMatchLimitPercent: number,
  annualReturnPercent: number,
  salaryIncreasePercent: number = 2
): CalculationResult401k {
  const years = Math.max(1, retirementAge - currentAge);
  let balance = currentBalance;
  let salary = annualSalary;
  let totalEmployee = 0;
  let totalEmployer = 0;
  const returnRate = annualReturnPercent / 100;
  const salaryGrowth = salaryIncreasePercent / 100;

  for (let y = 1; y <= years; y++) {
    const employeeContrib = salary * (contributionPercent / 100);
    const eligibleMatch = Math.min(contributionPercent, employerMatchLimitPercent);
    const employerContrib = salary * (eligibleMatch / 100) * (employerMatchPercent / 100);

    totalEmployee += employeeContrib;
    totalEmployer += employerContrib;
    balance = (balance + employeeContrib + employerContrib) * (1 + returnRate);
    salary *= 1 + salaryGrowth;
  }

  const futureBalance = Math.round(balance);
  const totalInvested = currentBalance + totalEmployee + totalEmployer;
  const totalInvestmentGrowth = Math.max(0, Math.round(futureBalance - totalInvested));

  return {
    futureBalance,
    totalEmployeeContributions: Math.round(totalEmployee),
    totalEmployerMatch: Math.round(totalEmployer),
    totalInvestmentGrowth
  };
}

export interface CDResult {
  maturityBalance: number;
  totalInterestEarned: number;
  effectiveAPY: number;
}

export function calculateCD(
  initialDeposit: number,
  interestRatePercent: number,
  termMonths: number,
  compoundFrequency: 'monthly' | 'daily' | 'annually' = 'monthly'
): CDResult {
  const r = interestRatePercent / 100;
  const t = termMonths / 12;
  const n = compoundFrequency === 'daily' ? 365 : compoundFrequency === 'annually' ? 1 : 12;

  const maturityBalance = initialDeposit * Math.pow(1 + r / n, n * t);
  const totalInterestEarned = maturityBalance - initialDeposit;
  const effectiveAPY = (Math.pow(1 + r / n, n) - 1) * 100;

  return {
    maturityBalance: Math.round(maturityBalance * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    effectiveAPY: Math.round(effectiveAPY * 100) / 100
  };
}

export interface DTIResult {
  frontEndDTI: number;
  backEndDTI: number;
  frontEndStatus: 'Excellent' | 'Acceptable' | 'High';
  backEndStatus: 'Excellent' | 'Acceptable' | 'High' | 'Critical';
  maxAllowableDebtPayment: number;
}

export function calculateDTI(
  grossMonthlyIncome: number,
  monthlyMortgageOrRent: number,
  monthlyOtherDebts: number // auto, credit card min, student loans
): DTIResult {
  if (grossMonthlyIncome <= 0) {
    return {
      frontEndDTI: 0,
      backEndDTI: 0,
      frontEndStatus: 'Excellent',
      backEndStatus: 'Excellent',
      maxAllowableDebtPayment: 0
    };
  }

  const frontEndDTI = Math.round((monthlyMortgageOrRent / grossMonthlyIncome) * 1000) / 10;
  const totalDebts = monthlyMortgageOrRent + monthlyOtherDebts;
  const backEndDTI = Math.round((totalDebts / grossMonthlyIncome) * 1000) / 10;

  let frontEndStatus: 'Excellent' | 'Acceptable' | 'High' = 'Excellent';
  if (frontEndDTI > 36) frontEndStatus = 'High';
  else if (frontEndDTI > 28) frontEndStatus = 'Acceptable';

  let backEndStatus: 'Excellent' | 'Acceptable' | 'High' | 'Critical' = 'Excellent';
  if (backEndDTI > 50) backEndStatus = 'Critical';
  else if (backEndDTI > 43) backEndStatus = 'High';
  else if (backEndDTI > 36) backEndStatus = 'Acceptable';

  // Standard qualifying maximum is 43% back-end DTI
  const maxAllowableDebtPayment = Math.max(0, Math.round(grossMonthlyIncome * 0.43 - monthlyMortgageOrRent));

  return {
    frontEndDTI,
    backEndDTI,
    frontEndStatus,
    backEndStatus,
    maxAllowableDebtPayment
  };
}

export interface ROIResult {
  netProfit: number;
  roiPercentage: number;
  annualizedROI: number;
  profitMultiplier: number;
}

export function calculateROI(
  initialInvestment: number,
  finalValue: number,
  holdingYears: number = 1
): ROIResult {
  const netProfit = finalValue - initialInvestment;
  const roiPercentage = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;
  const profitMultiplier = initialInvestment > 0 ? finalValue / initialInvestment : 0;

  let annualizedROI = roiPercentage;
  if (holdingYears > 1 && initialInvestment > 0 && finalValue > 0) {
    annualizedROI = (Math.pow(finalValue / initialInvestment, 1 / holdingYears) - 1) * 100;
  }

  return {
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercentage: Math.round(roiPercentage * 10) / 10,
    annualizedROI: Math.round(annualizedROI * 10) / 10,
    profitMultiplier: Math.round(profitMultiplier * 100) / 100
  };
}

export interface MarginMarkupResult {
  cost: number;
  revenue: number;
  grossProfit: number;
  profitMarginPercent: number;
  markupPercent: number;
}

export function calculateMarginMarkup(
  cost: number,
  priceOrMargin: number,
  mode: 'fromPrice' | 'fromMargin'
): MarginMarkupResult {
  let revenue = 0;
  if (mode === 'fromPrice') {
    revenue = priceOrMargin;
  } else {
    // priceOrMargin is desired profit margin percent (e.g. 30%)
    const marginRatio = priceOrMargin / 100;
    revenue = marginRatio < 1 ? cost / (1 - marginRatio) : cost;
  }

  const grossProfit = revenue - cost;
  const profitMarginPercent = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const markupPercent = cost > 0 ? (grossProfit / cost) * 100 : 0;

  return {
    cost: Math.round(cost * 100) / 100,
    revenue: Math.round(revenue * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    profitMarginPercent: Math.round(profitMarginPercent * 10) / 10,
    markupPercent: Math.round(markupPercent * 10) / 10
  };
}

export interface AnnuityResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
}

export function calculateAnnuity(
  monthlyPayment: number,
  annualInterestRate: number,
  years: number
): AnnuityResult {
  const r = annualInterestRate / 100 / 12;
  const n = years * 12;

  let futureValue = 0;
  if (r > 0) {
    futureValue = monthlyPayment * ((Math.pow(1 + r, n) - 1) / r);
  } else {
    futureValue = monthlyPayment * n;
  }

  const totalContributions = monthlyPayment * n;
  const totalInterest = Math.max(0, futureValue - totalContributions);

  return {
    futureValue: Math.round(futureValue),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest)
  };
}

export interface DepreciationResult {
  annualDepreciation: number;
  salvageValue: number;
  depreciationSchedule: Array<{ year: number; startingValue: number; depreciation: number; endingValue: number }>;
}

export function calculateDepreciation(
  cost: number,
  salvageValue: number,
  lifeYears: number
): DepreciationResult {
  const depreciableAmount = Math.max(0, cost - salvageValue);
  const annual = lifeYears > 0 ? depreciableAmount / lifeYears : 0;
  const schedule = [];
  let currentVal = cost;

  for (let yr = 1; yr <= lifeYears; yr++) {
    const dep = yr === lifeYears ? currentVal - salvageValue : annual;
    const endVal = Math.max(salvageValue, currentVal - dep);
    schedule.push({
      year: yr,
      startingValue: Math.round(currentVal),
      depreciation: Math.round(dep),
      endingValue: Math.round(endVal)
    });
    currentVal = endVal;
  }

  return {
    annualDepreciation: Math.round(annual),
    salvageValue,
    depreciationSchedule: schedule
  };
}

export interface FHALoanResult {
  loanAmount: number;
  baseMonthlyPI: number;
  upfrontMIP: number;
  monthlyMIP: number;
  totalMonthlyPayment: number;
}

export function calculateFHALoan(
  homePrice: number,
  downPaymentPercent: number = 3.5, // FHA minimum
  interestRate: number = 6.5,
  loanTermYears: number = 30
): FHALoanResult {
  const downPayment = homePrice * (downPaymentPercent / 100);
  const baseLoan = homePrice - downPayment;
  // Upfront MIP is currently 1.75% of base loan
  const upfrontMIP = baseLoan * 0.0175;
  const totalFinancedLoan = baseLoan + upfrontMIP;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const baseMonthlyPI = monthlyRate > 0
    ? (totalFinancedLoan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : totalFinancedLoan / numPayments;

  // Annual MIP is typically 0.55% of loan amount
  const monthlyMIP = (totalFinancedLoan * 0.0055) / 12;

  return {
    loanAmount: Math.round(totalFinancedLoan),
    baseMonthlyPI: Math.round(baseMonthlyPI),
    upfrontMIP: Math.round(upfrontMIP),
    monthlyMIP: Math.round(monthlyMIP),
    totalMonthlyPayment: Math.round(baseMonthlyPI + monthlyMIP)
  };
}
