// =========================================================
// REAL ESTATE & HOUSING ADVANCED ENGINES
// Home Affordability, Rent vs Buy, Refinance, Rental Property ROI, HELOC, Stamp Duty
// =========================================================

// 1. Home Affordability Calculator
export interface HomeAffordabilityInput {
  annualHouseholdIncome: number;
  monthlyDebts: number; // Credit cards, car loans, student debt
  downPaymentSavings: number;
  mortgageInterestRate: number; // e.g. 6.75%
  loanTermYears: number; // 15 or 30
  annualPropertyTaxRate?: number; // default 1.2%
  annualHomeInsurance?: number; // default 1200
  targetDtiPercent?: number; // Front-end 28%, Back-end 36% or 43%
}

export interface HomeAffordabilityResult {
  maxHomePrice: number;
  maxLoanAmount: number;
  maxMonthlyMortgagePayment: number;
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  frontEndDti: number;
  backEndDti: number;
}

export function calculateHomeAffordability(input: HomeAffordabilityInput): HomeAffordabilityResult {
  const {
    annualHouseholdIncome,
    monthlyDebts = 500,
    downPaymentSavings = 50000,
    mortgageInterestRate = 6.75,
    loanTermYears = 30,
    annualPropertyTaxRate = 1.2,
    annualHomeInsurance = 1200,
    targetDtiPercent = 36
  } = input;

  const monthlyGrossIncome = annualHouseholdIncome / 12;
  // Standard 28/36 rule: max total monthly debt = 36% of gross income
  const maxTotalMonthlyDebt = (monthlyGrossIncome * targetDtiPercent) / 100;
  const maxAvailableForHousing = Math.max(0, maxTotalMonthlyDebt - monthlyDebts);

  const monthlyRate = mortgageInterestRate / 12 / 100;
  const numPayments = loanTermYears * 12;

  // Monthly factor per $1 of loan
  const mortgageFactor =
    monthlyRate > 0
      ? (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 1 / numPayments;

  // Monthly tax factor per $1 of home price
  const taxFactor = annualPropertyTaxRate / 100 / 12;
  const monthlyInsurance = annualHomeInsurance / 12;

  // Available for PI + Tax = maxAvailableForHousing - monthlyInsurance
  const availableForPIandTax = Math.max(0, maxAvailableForHousing - monthlyInsurance);

  // HomePrice = Loan + DownPayment
  // PI = Loan * mortgageFactor = (HomePrice - DownPayment) * mortgageFactor
  // Tax = HomePrice * taxFactor
  // Available = (HomePrice - DownPayment) * mortgageFactor + HomePrice * taxFactor
  // Available + DownPayment * mortgageFactor = HomePrice * (mortgageFactor + taxFactor)
  let maxHomePrice = 0;
  if (mortgageFactor + taxFactor > 0) {
    maxHomePrice = (availableForPIandTax + downPaymentSavings * mortgageFactor) / (mortgageFactor + taxFactor);
  }

  maxHomePrice = Math.max(downPaymentSavings, Math.round(maxHomePrice));
  const maxLoanAmount = Math.max(0, maxHomePrice - downPaymentSavings);

  const monthlyPI = maxLoanAmount * mortgageFactor;
  const monthlyTax = (maxHomePrice * annualPropertyTaxRate) / 100 / 12;
  const totalHousingPayment = monthlyPI + monthlyTax + monthlyInsurance;

  const frontEndDti = monthlyGrossIncome > 0 ? (totalHousingPayment / monthlyGrossIncome) * 100 : 0;
  const backEndDti = monthlyGrossIncome > 0 ? ((totalHousingPayment + monthlyDebts) / monthlyGrossIncome) * 100 : 0;

  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(maxLoanAmount),
    maxMonthlyMortgagePayment: Math.round(totalHousingPayment),
    monthlyPrincipalInterest: Math.round(monthlyPI),
    monthlyTax: Math.round(monthlyTax),
    monthlyInsurance: Math.round(monthlyInsurance),
    frontEndDti: Math.round(frontEndDti * 10) / 10,
    backEndDti: Math.round(backEndDti * 10) / 10
  };
}

// 2. Rent vs. Buy Calculator
export interface RentVsBuyInput {
  homePrice: number;
  downPaymentPercent: number; // e.g. 20%
  mortgageRate: number; // e.g. 6.5%
  stayDurationYears: number; // e.g. 7 years
  homeAppreciationRate?: number; // e.g. 3.5%
  monthlyRent: number; // e.g. 2200
  annualRentIncreasePercent?: number; // e.g. 3%
  investmentReturnPercent?: number; // e.g. 7%
}

export interface RentVsBuyResult {
  totalCostBuying: number;
  totalCostRenting: number;
  recommendation: 'buy' | 'rent';
  savingsAmount: number;
  breakEvenYear: number;
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const {
    homePrice,
    downPaymentPercent = 20,
    mortgageRate = 6.5,
    stayDurationYears = 7,
    homeAppreciationRate = 3.5,
    monthlyRent,
    annualRentIncreasePercent = 3.0,
    investmentReturnPercent = 7.0
  } = input;

  const downPayment = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPayment;
  const monthlyMortgageRate = mortgageRate / 12 / 100;
  const totalMonths = 30 * 12;

  const monthlyPI =
    (loanAmount * (monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, totalMonths))) /
    (Math.pow(1 + monthlyMortgageRate, totalMonths) - 1);

  // Annual ownership costs (property tax 1.2%, maintenance 1%, insurance $1200)
  const annualMaintenanceAndTax = homePrice * 0.022 + 1200;
  const monthlyOwnershipExtras = annualMaintenanceAndTax / 12;

  let totalCostBuy = downPayment + homePrice * 0.03; // Down payment + 3% buying closing costs
  let totalCostRent = 0;
  let rentOpportunityFund = downPayment; // If renting, invest the down payment
  let currentRent = monthlyRent;

  let breakEvenYear = 0;

  for (let year = 1; year <= stayDurationYears; year++) {
    // Cumulative rent
    for (let m = 0; m < 12; m++) {
      totalCostRent += currentRent;
      totalCostBuy += monthlyPI + monthlyOwnershipExtras;
    }
    // Invested down payment grows
    rentOpportunityFund *= 1 + investmentReturnPercent / 100;
    currentRent *= 1 + annualRentIncreasePercent / 100;
  }

  // Future home equity at sale
  const futureHomeValue = homePrice * Math.pow(1 + homeAppreciationRate / 100, stayDurationYears);
  const sellingCosts = futureHomeValue * 0.06; // 6% realtor commission
  const netHomeEquity = futureHomeValue - sellingCosts - loanAmount * 0.85; // Approx remaining loan

  const netBuyExpense = Math.max(0, totalCostBuy - netHomeEquity);
  const netRentExpense = totalCostRent;

  // Simple heuristic for break-even
  breakEvenYear = Math.min(stayDurationYears, Math.max(3, Math.round(homePrice / (monthlyRent * 12 * 1.5))));

  const buyIsBetter = netBuyExpense < netRentExpense;

  return {
    totalCostBuying: Math.round(netBuyExpense),
    totalCostRenting: Math.round(netRentExpense),
    recommendation: buyIsBetter ? 'buy' : 'rent',
    savingsAmount: Math.round(Math.abs(netBuyExpense - netRentExpense)),
    breakEvenYear
  };
}

// 3. Mortgage Refinance Calculator
export interface RefinanceInput {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentRemainingMonths: number;
  newInterestRate: number;
  newLoanTermYears: number; // 15 or 30
  refinanceClosingCosts: number;
}

export interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const {
    currentLoanBalance,
    currentInterestRate,
    currentRemainingMonths,
    newInterestRate,
    newLoanTermYears,
    refinanceClosingCosts
  } = input;

  const currentMonthlyRate = currentInterestRate / 12 / 100;
  const currentMonthlyPI =
    (currentLoanBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentRemainingMonths))) /
    (Math.pow(1 + currentMonthlyRate, currentRemainingMonths) - 1);

  const newMonths = newLoanTermYears * 12;
  const newMonthlyRate = newInterestRate / 12 / 100;
  const newMonthlyPI =
    (currentLoanBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths))) /
    (Math.pow(1 + newMonthlyRate, newMonths) - 1);

  const monthlySavings = currentMonthlyPI - newMonthlyPI;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinanceClosingCosts / monthlySavings) : 0;

  const totalCurrentRemaining = currentMonthlyPI * currentRemainingMonths;
  const totalNew = newMonthlyPI * newMonths + refinanceClosingCosts;
  const lifetimeSavings = totalCurrentRemaining - totalNew;

  return {
    currentMonthlyPayment: Math.round(currentMonthlyPI),
    newMonthlyPayment: Math.round(newMonthlyPI),
    monthlySavings: Math.round(monthlySavings),
    breakEvenMonths,
    lifetimeSavings: Math.round(lifetimeSavings)
  };
}

// 4. Rental Property ROI & Cap Rate Calculator
export interface RentalROIInput {
  purchasePrice: number;
  downPayment: number;
  renovationCost?: number;
  monthlyRent: number;
  vacancyRatePercent?: number; // e.g. 5%
  annualPropertyTaxes: number;
  annualInsurance: number;
  monthlyHOA?: number;
  maintenanceReservePercent?: number; // e.g. 8% of rent
  propertyManagementPercent?: number; // e.g. 10% of rent
  annualMortgagePayments?: number; // P&I * 12
}

export interface RentalROIResult {
  grossAnnualIncome: number;
  netOperatingIncome: number; // NOI
  capRate: number; // NOI / Purchase Price %
  annualCashFlow: number;
  cashOnCashReturn: number; // Cash Flow / Total Initial Cash Invested %
  grossRentMultiplier: number;
}

export function calculateRentalROI(input: RentalROIInput): RentalROIResult {
  const {
    purchasePrice,
    downPayment,
    renovationCost = 0,
    monthlyRent,
    vacancyRatePercent = 5,
    annualPropertyTaxes,
    annualInsurance,
    monthlyHOA = 0,
    maintenanceReservePercent = 8,
    propertyManagementPercent = 8,
    annualMortgagePayments = 0
  } = input;

  const grossScheduledIncome = monthlyRent * 12;
  const vacancyLoss = (grossScheduledIncome * vacancyRatePercent) / 100;
  const grossEffectiveIncome = grossScheduledIncome - vacancyLoss;

  const annualMaintenance = (grossEffectiveIncome * maintenanceReservePercent) / 100;
  const annualManagement = (grossEffectiveIncome * propertyManagementPercent) / 100;
  const annualHOA = monthlyHOA * 12;

  const totalOperatingExpenses =
    annualPropertyTaxes + annualInsurance + annualHOA + annualMaintenance + annualManagement;

  const netOperatingIncome = grossEffectiveIncome - totalOperatingExpenses;
  const capRate = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;

  const annualCashFlow = netOperatingIncome - annualMortgagePayments;
  const totalInitialCash = downPayment + renovationCost + purchasePrice * 0.03; // including closing costs
  const cashOnCashReturn = totalInitialCash > 0 ? (annualCashFlow / totalInitialCash) * 100 : 0;
  const grossRentMultiplier = grossScheduledIncome > 0 ? purchasePrice / grossScheduledIncome : 0;

  return {
    grossAnnualIncome: Math.round(grossEffectiveIncome),
    netOperatingIncome: Math.round(netOperatingIncome),
    capRate: Math.round(capRate * 10) / 10,
    annualCashFlow: Math.round(annualCashFlow),
    cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
    grossRentMultiplier: Math.round(grossRentMultiplier * 10) / 10
  };
}

// 5. HELOC (Home Equity Line of Credit) Calculator
export interface HELOCInput {
  currentHomeValue: number;
  currentMortgageBalance: number;
  maxLTVPercent?: number; // typically 80% or 85%
  helocInterestRate: number; // e.g. 8.5%
  drawAmount: number;
}

export interface HELOCResult {
  totalEquity: number;
  maxBorrowableEquity: number;
  availableCreditLine: number;
  interestOnlyMonthlyPayment: number;
}

export function calculateHELOC(input: HELOCInput): HELOCResult {
  const {
    currentHomeValue,
    currentMortgageBalance,
    maxLTVPercent = 85,
    helocInterestRate = 8.5,
    drawAmount
  } = input;

  const totalEquity = Math.max(0, currentHomeValue - currentMortgageBalance);
  const maxAllowableTotalDebt = (currentHomeValue * maxLTVPercent) / 100;
  const availableCreditLine = Math.max(0, maxAllowableTotalDebt - currentMortgageBalance);

  const activeBorrowAmount = Math.min(drawAmount, availableCreditLine);
  // Interest-only monthly payment during draw period
  const interestOnlyPayment = (activeBorrowAmount * (helocInterestRate / 100)) / 12;

  return {
    totalEquity: Math.round(totalEquity),
    maxBorrowableEquity: Math.round(maxAllowableTotalDebt),
    availableCreditLine: Math.round(availableCreditLine),
    interestOnlyMonthlyPayment: Math.round(interestOnlyPayment)
  };
}

// 6. Stamp Duty / Property Transfer Tax Calculator (UK SDLT & General)
export interface StampDutyInput {
  propertyValue: number;
  buyerType: 'first_time' | 'home_mover' | 'additional_property';
}

export interface StampDutyResult {
  totalStampDuty: number;
  effectiveRate: number;
  breakdown: { slab: string; rate: number; tax: number }[];
}

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const { propertyValue, buyerType = 'home_mover' } = input;
  let tax = 0;
  const breakdown: { slab: string; rate: number; tax: number }[] = [];

  // UK SDLT standard rates for residential property (2024/2025)
  if (buyerType === 'first_time' && propertyValue <= 625000) {
    // First time buyers relief: 0% up to £425k, 5% on portion £425k - £625k
    if (propertyValue > 425000) {
      const taxable = propertyValue - 425000;
      const t = taxable * 0.05;
      tax += t;
      breakdown.push({ slab: '£425,001 to £625,000 (5%)', rate: 5, tax: t });
    }
  } else {
    // Standard Residential SDLT
    const surcharge = buyerType === 'additional_property' ? 3 : 0;

    const brackets = [
      { limit: 250000, rate: 0 + surcharge, label: 'Up to £250,000' },
      { limit: 925000, rate: 5 + surcharge, label: '£250,001 to £925,000' },
      { limit: 1500000, rate: 10 + surcharge, label: '£925,001 to £1,500,000' },
      { limit: Infinity, rate: 12 + surcharge, label: 'Above £1,500,000' }
    ];

    let prev = 0;
    for (const b of brackets) {
      if (propertyValue > prev) {
        const amountInBracket = Math.min(propertyValue - prev, b.limit - prev);
        const t = (amountInBracket * b.rate) / 100;
        tax += t;
        if (b.rate > 0) {
          breakdown.push({ slab: `${b.label} (${b.rate}%)`, rate: b.rate, tax: Math.round(t) });
        }
        prev = b.limit;
      } else {
        break;
      }
    }
  }

  const effectiveRate = propertyValue > 0 ? (tax / propertyValue) * 100 : 0;

  return {
    totalStampDuty: Math.round(tax),
    effectiveRate: Math.round(effectiveRate * 100) / 100,
    breakdown
  };
}
