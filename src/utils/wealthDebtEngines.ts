// =========================================================
// WEALTH, DEBT & TAX ENGINES
// Credit Card Payoff, Student Loan, Lease vs Buy, Capital Gains, VAT, Net Worth, Inflation, Dividend Yield
// =========================================================

// 1. Credit Card Payoff Calculator
export interface CreditCardInput {
  balance: number;
  aprPercent: number;
  paymentType: 'fixed_payment' | 'target_months' | 'minimum_only';
  monthlyPaymentValue: number; // e.g. $250 or 24 months
}

export interface CreditCardResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  monthlyPayment: number;
  monthlySavingsIfExtra100?: number;
}

export function calculateCreditCardPayoff(input: CreditCardInput): CreditCardResult {
  const { balance, aprPercent, paymentType, monthlyPaymentValue } = input;
  const monthlyRate = aprPercent / 100 / 12;

  let months = 0;
  let totalInterest = 0;
  let remaining = balance;
  let payment = 0;

  if (paymentType === 'target_months') {
    months = Math.max(1, Math.round(monthlyPaymentValue));
    // Monthly payment formula for fixed term
    if (monthlyRate === 0) {
      payment = balance / months;
    } else {
      payment =
        (balance * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalPaid = payment * months;
    totalInterest = Math.max(0, totalPaid - balance);
    return {
      monthsToPayoff: months,
      yearsToPayoff: Math.round((months / 12) * 10) / 10,
      totalInterestPaid: Math.round(totalInterest),
      totalAmountPaid: Math.round(totalPaid),
      monthlyPayment: Math.round(payment * 100) / 100
    };
  }

  // Fixed payment or minimum payment
  payment = paymentType === 'minimum_only' ? Math.max(25, balance * 0.02) : Math.max(15, monthlyPaymentValue);

  // If monthly payment doesn't cover interest, interest accumulates forever
  const minInterest = remaining * monthlyRate;
  if (payment <= minInterest) {
    payment = minInterest + 25; // Prevent infinite loop
  }

  while (remaining > 0 && months < 360) {
    months++;
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    remaining = remaining + interest - payment;
    if (remaining < 0) remaining = 0;
  }

  const totalPaid = balance + totalInterest;

  return {
    monthsToPayoff: months,
    yearsToPayoff: Math.round((months / 12) * 10) / 10,
    totalInterestPaid: Math.round(totalInterest),
    totalAmountPaid: Math.round(totalPaid),
    monthlyPayment: Math.round(payment * 100) / 100
  };
}

// 2. Student Loan Repayment Calculator
export interface StudentLoanInput {
  loanBalance: number;
  interestRate: number;
  loanTermYears: number; // 10, 15, 20, 25
  annualIncome?: number; // for income-driven estimates
}

export interface StudentLoanResult {
  monthlyPayment: number;
  totalInterestPaid: number;
  totalRepayment: number;
  interestPercentOfTotal: number;
}

export function calculateStudentLoan(input: StudentLoanInput): StudentLoanResult {
  const { loanBalance, interestRate, loanTermYears = 10 } = input;
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanBalance / numPayments;
  } else {
    monthlyPayment =
      (loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalRepayment = monthlyPayment * numPayments;
  const totalInterest = Math.max(0, totalRepayment - loanBalance);
  const interestPercentOfTotal = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterestPaid: Math.round(totalInterest),
    totalRepayment: Math.round(totalRepayment),
    interestPercentOfTotal: Math.round(interestPercentOfTotal * 10) / 10
  };
}

// 3. Car Lease vs. Buy Calculator
export interface LeaseVsBuyInput {
  carPrice: number;
  leaseMonths: number; // e.g. 36
  leaseMonthlyPayment: number; // e.g. 420
  leaseDownPayment: number; // e.g. 2500
  buyLoanTermMonths: number; // e.g. 60
  buyInterestRate: number; // e.g. 6.0%
  buyDownPayment: number; // e.g. 3500
  estimatedCarValueAfterLease: number; // e.g. 18000
}

export interface LeaseVsBuyResult {
  totalLeaseCost: number;
  totalBuyCost: number;
  buyMonthlyPayment: number;
  equityValueAtEnd: number;
  netBuyCost: number; // total buy cost minus residual equity
  recommendation: 'lease' | 'buy';
  difference: number;
}

export function calculateCarLeaseVsBuy(input: LeaseVsBuyInput): LeaseVsBuyResult {
  const {
    carPrice,
    leaseMonths = 36,
    leaseMonthlyPayment,
    leaseDownPayment,
    buyLoanTermMonths = 60,
    buyInterestRate = 6.0,
    buyDownPayment,
    estimatedCarValueAfterLease
  } = input;

  const totalLeaseCost = leaseDownPayment + leaseMonthlyPayment * leaseMonths;

  // Buy calculation
  const loanPrincipal = Math.max(0, carPrice - buyDownPayment);
  const monthlyRate = buyInterestRate / 12 / 100;
  const buyMonthly =
    (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, buyLoanTermMonths))) /
    (Math.pow(1 + monthlyRate, buyLoanTermMonths) - 1);

  // Total cash paid over the lease period (e.g. 36 months) for the loan
  const buyCostDuringPeriod = buyDownPayment + buyMonthly * leaseMonths;
  // Net cost after factoring equity retained in the car
  const netBuyCost = Math.max(0, buyCostDuringPeriod - estimatedCarValueAfterLease);

  const recommendation = totalLeaseCost < netBuyCost ? 'lease' : 'buy';

  return {
    totalLeaseCost: Math.round(totalLeaseCost),
    totalBuyCost: Math.round(buyDownPayment + buyMonthly * buyLoanTermMonths),
    buyMonthlyPayment: Math.round(buyMonthly * 100) / 100,
    equityValueAtEnd: Math.round(estimatedCarValueAfterLease),
    netBuyCost: Math.round(netBuyCost),
    recommendation,
    difference: Math.round(Math.abs(totalLeaseCost - netBuyCost))
  };
}

// 4. Capital Gains Tax Calculator
export interface CapitalGainsInput {
  purchasePrice: number;
  sellingPrice: number;
  holdingPeriodMonths: number; // >12 months is long-term
  annualTaxableIncome: number;
  filingStatus?: 'single' | 'married_joint';
}

export interface CapitalGainsResult {
  capitalGainOrLoss: number;
  isLongTerm: boolean;
  applicableTaxRate: number;
  estimatedTaxLiability: number;
  netProceedsAfterTax: number;
}

export function calculateCapitalGainsTax(input: CapitalGainsInput): CapitalGainsResult {
  const {
    purchasePrice,
    sellingPrice,
    holdingPeriodMonths,
    annualTaxableIncome,
    filingStatus = 'single'
  } = input;

  const gain = sellingPrice - purchasePrice;
  const isLongTerm = holdingPeriodMonths > 12;

  if (gain <= 0) {
    return {
      capitalGainOrLoss: Math.round(gain),
      isLongTerm,
      applicableTaxRate: 0,
      estimatedTaxLiability: 0,
      netProceedsAfterTax: Math.round(sellingPrice)
    };
  }

  let taxRate = 0;
  if (isLongTerm) {
    // US 2024 Long-Term Capital Gains Brackets: 0%, 15%, 20%
    const threshold0 = filingStatus === 'married_joint' ? 94050 : 47025;
    const threshold15 = filingStatus === 'married_joint' ? 583750 : 518900;

    if (annualTaxableIncome <= threshold0) taxRate = 0;
    else if (annualTaxableIncome <= threshold15) taxRate = 15;
    else taxRate = 20;
  } else {
    // Short-term: taxed as ordinary income (~22% average bracket)
    if (annualTaxableIncome <= 47150) taxRate = 12;
    else if (annualTaxableIncome <= 100525) taxRate = 22;
    else if (annualTaxableIncome <= 191950) taxRate = 24;
    else taxRate = 32;
  }

  const tax = (gain * taxRate) / 100;
  const net = sellingPrice - tax;

  return {
    capitalGainOrLoss: Math.round(gain),
    isLongTerm,
    applicableTaxRate: taxRate,
    estimatedTaxLiability: Math.round(tax),
    netProceedsAfterTax: Math.round(net)
  };
}

// 5. VAT (Value Added Tax) Calculator
export interface VATInput {
  amount: number;
  vatRatePercent: number; // e.g. 20% UK, 19% Germany, 21% Spain
  type: 'add' | 'extract';
}

export interface VATResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
}

export function calculateVAT(input: VATInput): VATResult {
  const { amount, vatRatePercent, type } = input;
  let net = 0;
  let vat = 0;
  let gross = 0;

  if (type === 'add') {
    net = amount;
    vat = (amount * vatRatePercent) / 100;
    gross = net + vat;
  } else {
    gross = amount;
    net = (amount * 100) / (100 + vatRatePercent);
    vat = gross - net;
  }

  return {
    netAmount: Math.round(net * 100) / 100,
    vatAmount: Math.round(vat * 100) / 100,
    grossAmount: Math.round(gross * 100) / 100
  };
}

// 6. Net Worth Calculator
export interface NetWorthInput {
  cashAndSavings: number;
  investmentsAndStocks: number;
  realEstateValue: number;
  vehiclesAndValuables: number;
  retirementAccounts: number;
  mortgageDebt: number;
  creditCardDebt: number;
  studentLoans: number;
  otherDebts: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  debtToAssetRatio: number;
}

export function calculateNetWorth(input: NetWorthInput): NetWorthResult {
  const totalAssets =
    input.cashAndSavings +
    input.investmentsAndStocks +
    input.realEstateValue +
    input.vehiclesAndValuables +
    input.retirementAccounts;

  const totalLiabilities =
    input.mortgageDebt + input.creditCardDebt + input.studentLoans + input.otherDebts;

  const netWorth = totalAssets - totalLiabilities;
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  return {
    totalAssets: Math.round(totalAssets),
    totalLiabilities: Math.round(totalLiabilities),
    netWorth: Math.round(netWorth),
    debtToAssetRatio: Math.round(debtToAssetRatio * 10) / 10
  };
}

// 7. Inflation Calculator
export interface InflationInput {
  initialAmount: number;
  annualInflationRate: number; // e.g. 3.2%
  yearsAhead: number; // e.g. 10 years
}

export interface InflationResult {
  futureEquivalentValue: number; // What you will need in the future to buy the same things
  lossInPurchasingPowerPercent: number;
  futurePurchasingPowerOfOriginal: number; // What your original amount will be worth in today's dollars
}

export function calculateInflation(input: InflationInput): InflationResult {
  const { initialAmount, annualInflationRate, yearsAhead } = input;
  const cumulativeFactor = Math.pow(1 + annualInflationRate / 100, yearsAhead);

  const futureEquivalent = initialAmount * cumulativeFactor;
  const futurePurchasingPower = initialAmount / cumulativeFactor;
  const lossInPurchasingPower = ((futureEquivalent - initialAmount) / futureEquivalent) * 100;

  return {
    futureEquivalentValue: Math.round(futureEquivalent * 100) / 100,
    lossInPurchasingPowerPercent: Math.round(lossInPurchasingPower * 10) / 10,
    futurePurchasingPowerOfOriginal: Math.round(futurePurchasingPower * 100) / 100
  };
}

// 8. Dividend Yield & Passive Income Calculator
export interface DividendInput {
  stockPrice: number;
  annualDividendPerShare: number;
  sharesOwned: number;
  dividendReinvestmentRate?: number; // e.g. DRIP growth
}

export interface DividendResult {
  dividendYieldPercent: number;
  annualDividendIncome: number;
  monthlyDividendIncome: number;
  totalPortfolioValue: number;
}

export function calculateDividendYield(input: DividendInput): DividendResult {
  const { stockPrice, annualDividendPerShare, sharesOwned } = input;
  const dividendYieldPercent = stockPrice > 0 ? (annualDividendPerShare / stockPrice) * 100 : 0;
  const annualDividendIncome = annualDividendPerShare * sharesOwned;
  const monthlyDividendIncome = annualDividendIncome / 12;
  const totalPortfolioValue = stockPrice * sharesOwned;

  return {
    dividendYieldPercent: Math.round(dividendYieldPercent * 100) / 100,
    annualDividendIncome: Math.round(annualDividendIncome * 100) / 100,
    monthlyDividendIncome: Math.round(monthlyDividendIncome * 100) / 100,
    totalPortfolioValue: Math.round(totalPortfolioValue * 100) / 100
  };
}
