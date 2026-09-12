// Comprehensive Finance Engines for Best-in-Class Financial Calculators

export interface SIPInput {
  monthlyInvestment: number;
  annualRate: number; // in %
  tenureYears: number;
  annualStepUpPercent?: number; // annual increment in SIP
}

export interface SIPResult {
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  wealthRatio: number; // e.g., 2.4x
  yearlyBreakdown: Array<{
    year: number;
    yearlyDeposit: number;
    totalInvested: number;
    futureValue: number;
    interestEarned: number;
  }>;
}

export function calculateSIP(input: SIPInput): SIPResult {
  const { monthlyInvestment, annualRate, tenureYears, annualStepUpPercent = 0 } = input;
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let currentMonthly = monthlyInvestment;
  let totalInvested = 0;
  let accumulated = 0;

  const yearlyBreakdown: SIPResult['yearlyBreakdown'] = [];
  let yearlyDepositAcc = 0;

  for (let m = 1; m <= totalMonths; m++) {
    // Step-up applied at the start of each new year (from month 13 onwards)
    if (m > 1 && (m - 1) % 12 === 0 && annualStepUpPercent > 0) {
      currentMonthly += currentMonthly * (annualStepUpPercent / 100);
    }

    totalInvested += currentMonthly;
    yearlyDepositAcc += currentMonthly;
    // Compounded monthly
    accumulated = (accumulated + currentMonthly) * (1 + monthlyRate);

    if (m % 12 === 0 || m === totalMonths) {
      const yearIndex = Math.ceil(m / 12);
      yearlyBreakdown.push({
        year: yearIndex,
        yearlyDeposit: Math.round(yearlyDepositAcc),
        totalInvested: Math.round(totalInvested),
        futureValue: Math.round(accumulated),
        interestEarned: Math.round(accumulated - totalInvested)
      });
      yearlyDepositAcc = 0;
    }
  }

  const futureValue = Math.round(accumulated);
  const estimatedReturns = Math.round(futureValue - totalInvested);
  const wealthRatio = totalInvested > 0 ? Number((futureValue / totalInvested).toFixed(2)) : 1;

  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns,
    futureValue,
    wealthRatio,
    yearlyBreakdown
  };
}

export interface MortgageInput {
  homePrice: number;
  downPayment: number; // dollar amount
  downPaymentPercent: number; // %
  annualRate: number; // %
  tenureYears: number;
  annualPropertyTax: number; // % of home price or dollar
  annualHomeInsurance: number; // dollar
  annualPMI: number; // % per year if down payment < 20%
  monthlyHOA: number; // dollar
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPMI: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  totalCostOfLoan: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = Math.max(0, input.homePrice - input.downPayment);
  const monthlyRate = input.annualRate / 12 / 100;
  const totalMonths = input.tenureYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyRate === 0) {
    monthlyPrincipalInterest = totalMonths > 0 ? loanAmount / totalMonths : 0;
  } else {
    monthlyPrincipalInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // Monthly additions
  const monthlyPropertyTax = (input.homePrice * (input.annualPropertyTax / 100)) / 12;
  const monthlyHomeInsurance = input.annualHomeInsurance / 12;
  const isPMIRequired = input.downPayment < input.homePrice * 0.2;
  const monthlyPMI = isPMIRequired ? (loanAmount * (input.annualPMI / 100)) / 12 : 0;
  const monthlyHOA = input.monthlyHOA;

  const totalMonthlyPayment =
    monthlyPrincipalInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + monthlyHOA;

  const totalInterest = monthlyPrincipalInterest * totalMonths - loanAmount;
  const totalCostOfLoan = totalMonthlyPayment * totalMonths;

  return {
    loanAmount: Math.round(loanAmount),
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance),
    monthlyPMI: Math.round(monthlyPMI),
    monthlyHOA: Math.round(monthlyHOA),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    totalPrincipal: Math.round(loanAmount),
    totalInterest: Math.round(Math.max(0, totalInterest)),
    totalCostOfLoan: Math.round(totalCostOfLoan)
  };
}

export interface SimpleInterestInput {
  principal: number;
  annualRate: number; // %
  timeValue: number;
  timeUnit: 'years' | 'months' | 'days';
}

export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
  effectiveAnnualRate: number;
}

export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const { principal, annualRate, timeValue, timeUnit } = input;
  let years = timeValue;
  if (timeUnit === 'months') years = timeValue / 12;
  if (timeUnit === 'days') years = timeValue / 365;

  const interest = (principal * annualRate * years) / 100;
  const totalAmount = principal + interest;

  return {
    interest: Math.round(interest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    effectiveAnnualRate: annualRate
  };
}

export interface SalaryInput {
  amount: number;
  period: 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual';
  hoursPerWeek: number;
  daysPerWeek: number;
  taxDeductionPercent: number; // optional tax/withholding rate
}

export interface SalaryResult {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  netAnnual: number;
  netMonthly: number;
  netBiweekly: number;
  totalTaxAnnual: number;
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { amount, period, hoursPerWeek = 40, daysPerWeek = 5, taxDeductionPercent = 20 } = input;
  let annualGross = 0;

  switch (period) {
    case 'hourly':
      annualGross = amount * hoursPerWeek * 52;
      break;
    case 'daily':
      annualGross = amount * daysPerWeek * 52;
      break;
    case 'weekly':
      annualGross = amount * 52;
      break;
    case 'biweekly':
      annualGross = amount * 26;
      break;
    case 'monthly':
      annualGross = amount * 12;
      break;
    case 'annual':
      annualGross = amount;
      break;
  }

  const hourly = hoursPerWeek > 0 ? annualGross / (52 * hoursPerWeek) : 0;
  const daily = daysPerWeek > 0 ? annualGross / (52 * daysPerWeek) : 0;
  const weekly = annualGross / 52;
  const biweekly = annualGross / 26;
  const monthly = annualGross / 12;

  const totalTaxAnnual = (annualGross * taxDeductionPercent) / 100;
  const netAnnual = annualGross - totalTaxAnnual;
  const netMonthly = netAnnual / 12;
  const netBiweekly = netAnnual / 26;

  return {
    hourly: Math.round(hourly * 100) / 100,
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    biweekly: Math.round(biweekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
    annual: Math.round(annualGross),
    netAnnual: Math.round(netAnnual),
    netMonthly: Math.round(netMonthly),
    netBiweekly: Math.round(netBiweekly),
    totalTaxAnnual: Math.round(totalTaxAnnual)
  };
}

export interface TipInput {
  billAmount: number;
  tipPercent: number;
  splitCount: number;
  roundUpTotal?: boolean;
}

export interface TipResult {
  tipAmount: number;
  totalWithTip: number;
  tipPerPerson: number;
  totalPerPerson: number;
  roundedTotal?: number;
}

export function calculateTip(input: TipInput): TipResult {
  const { billAmount, tipPercent, splitCount = 1, roundUpTotal = false } = input;
  let tipAmount = (billAmount * tipPercent) / 100;
  let totalWithTip = billAmount + tipAmount;

  if (roundUpTotal) {
    const rounded = Math.ceil(totalWithTip);
    tipAmount = rounded - billAmount;
    totalWithTip = rounded;
  }

  const safeSplit = Math.max(1, splitCount);
  const tipPerPerson = tipAmount / safeSplit;
  const totalPerPerson = totalWithTip / safeSplit;

  return {
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalWithTip: Math.round(totalWithTip * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100,
    roundedTotal: roundUpTotal ? Math.ceil(totalWithTip) : undefined
  };
}

export interface DiscountInput {
  originalPrice: number;
  discountPercent: number;
  extraDiscountPercent?: number; // stacked promo/coupon code
  taxPercent?: number;
}

export interface DiscountResult {
  primarySavings: number;
  extraSavings: number;
  totalSavings: number;
  effectiveDiscountPercent: number;
  subtotal: number;
  taxAmount: number;
  finalPrice: number;
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  const { originalPrice, discountPercent, extraDiscountPercent = 0, taxPercent = 0 } = input;

  const primarySavings = (originalPrice * discountPercent) / 100;
  const priceAfterPrimary = Math.max(0, originalPrice - primarySavings);

  const extraSavings = (priceAfterPrimary * extraDiscountPercent) / 100;
  const subtotal = Math.max(0, priceAfterPrimary - extraSavings);

  const totalSavings = primarySavings + extraSavings;
  const effectiveDiscountPercent = originalPrice > 0 ? (totalSavings / originalPrice) * 100 : 0;

  const taxAmount = (subtotal * taxPercent) / 100;
  const finalPrice = subtotal + taxAmount;

  return {
    primarySavings: Math.round(primarySavings * 100) / 100,
    extraSavings: Math.round(extraSavings * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    effectiveDiscountPercent: Math.round(effectiveDiscountPercent * 10) / 10,
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100
  };
}

export interface IncomeTaxInput {
  grossIncome: number;
  taxSystem: 'us' | 'in_new' | 'in_old' | 'custom';
  filingStatus?: 'single' | 'married_joint' | 'head_of_household';
  customTaxRate?: number;
  retirementContribution?: number; // 401(k) or 80C
  healthInsuranceDeduction?: number; // HSA or 80D
  otherDeductions?: number;
}

export interface TaxSlabBreakdown {
  label: string;
  ratePercent: number;
  taxableInBracket: number;
  taxAmount: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  incomeTax: number;
  payrollTaxOrCess: number; // FICA in US, 4% Cess in India
  totalTax: number;
  netAnnualTakeHome: number;
  netMonthlyTakeHome: number;
  netBiweeklyTakeHome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  slabsBreakdown: TaxSlabBreakdown[];
}

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const {
    grossIncome,
    taxSystem = 'us',
    filingStatus = 'single',
    customTaxRate = 20,
    retirementContribution = 0,
    healthInsuranceDeduction = 0,
    otherDeductions = 0
  } = input;

  let standardDeduction = 0;
  let deductions = 0;
  let incomeTax = 0;
  let payrollTaxOrCess = 0;
  let marginalRate = 0;
  const slabsBreakdown: TaxSlabBreakdown[] = [];

  if (taxSystem === 'us') {
    // US Federal Standard Deductions (2024 Tax Year)
    if (filingStatus === 'single') standardDeduction = 14600;
    else if (filingStatus === 'married_joint') standardDeduction = 29200;
    else standardDeduction = 21900; // head of household

    // 401(k) pre-tax contribution cap for 2024 is $23,000
    const retirementPreTax = Math.min(23000, Math.max(0, retirementContribution));
    const healthPreTax = Math.min(4150, Math.max(0, healthInsuranceDeduction));
    deductions = standardDeduction + retirementPreTax + healthPreTax + Math.max(0, otherDeductions);

    const taxableIncome = Math.max(0, grossIncome - deductions);

    // US 2024 Tax Brackets for Single (or scaled for married)
    let brackets: { limit: number; rate: number; label: string }[] = [];
    if (filingStatus === 'married_joint') {
      brackets = [
        { limit: 23200, rate: 10, label: 'Up to $23,200' },
        { limit: 94300, rate: 12, label: '$23,201 – $94,300' },
        { limit: 201050, rate: 22, label: '$94,301 – $201,050' },
        { limit: 383900, rate: 24, label: '$201,051 – $383,900' },
        { limit: 487450, rate: 32, label: '$383,901 – $487,450' },
        { limit: 731200, rate: 35, label: '$487,451 – $731,200' },
        { limit: Infinity, rate: 37, label: 'Above $731,200' }
      ];
    } else {
      brackets = [
        { limit: 11600, rate: 10, label: 'Up to $11,600' },
        { limit: 47150, rate: 12, label: '$11,601 – $47,150' },
        { limit: 100525, rate: 22, label: '$47,151 – $100,525' },
        { limit: 191950, rate: 24, label: '$100,526 – $191,950' },
        { limit: 243725, rate: 32, label: '$191,951 – $243,725' },
        { limit: 609350, rate: 35, label: '$243,726 – $609,350' },
        { limit: Infinity, rate: 37, label: 'Above $609,350' }
      ];
    }

    let prevLimit = 0;
    for (const b of brackets) {
      if (taxableIncome > prevLimit) {
        const taxableAmountInSlab = Math.min(taxableIncome - prevLimit, b.limit - prevLimit);
        const taxInSlab = (taxableAmountInSlab * b.rate) / 100;
        incomeTax += taxInSlab;
        marginalRate = b.rate;
        slabsBreakdown.push({
          label: `${b.label} (${b.rate}%)`,
          ratePercent: b.rate,
          taxableInBracket: Math.round(taxableAmountInSlab),
          taxAmount: Math.round(taxInSlab)
        });
        prevLimit = b.limit;
      } else {
        break;
      }
    }

    // FICA (Social Security 6.2% up to $168,600 + Medicare 1.45%)
    const ssTax = Math.min(grossIncome, 168600) * 0.062;
    const medicareTax = grossIncome * 0.0145;
    payrollTaxOrCess = ssTax + medicareTax;

    const totalTax = incomeTax + payrollTaxOrCess;
    const netAnnual = Math.max(0, grossIncome - totalTax);

    return {
      grossIncome: Math.round(grossIncome),
      totalDeductions: Math.round(deductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(incomeTax),
      payrollTaxOrCess: Math.round(payrollTaxOrCess),
      totalTax: Math.round(totalTax),
      netAnnualTakeHome: Math.round(netAnnual),
      netMonthlyTakeHome: Math.round(netAnnual / 12),
      netBiweeklyTakeHome: Math.round(netAnnual / 26),
      effectiveTaxRate: grossIncome > 0 ? Math.round((totalTax / grossIncome) * 1000) / 10 : 0,
      marginalTaxRate: marginalRate,
      slabsBreakdown
    };
  } else if (taxSystem === 'in_new') {
    // India New Tax Regime (FY 2024-25 Budget)
    standardDeduction = 75000;
    deductions = standardDeduction;
    const taxableIncome = Math.max(0, grossIncome - deductions);

    const slabs = [
      { limit: 300000, rate: 0, label: 'Up to ₹3,00,000' },
      { limit: 700000, rate: 5, label: '₹3,00,001 – ₹7,00,000' },
      { limit: 1000000, rate: 10, label: '₹7,00,001 – ₹10,00,000' },
      { limit: 1200000, rate: 15, label: '₹10,00,001 – ₹12,00,000' },
      { limit: 1500000, rate: 20, label: '₹12,00,001 – ₹15,00,000' },
      { limit: Infinity, rate: 30, label: 'Above ₹15,00,000' }
    ];

    let prevLimit = 0;
    for (const s of slabs) {
      if (taxableIncome > prevLimit) {
        const taxableAmountInSlab = Math.min(taxableIncome - prevLimit, s.limit - prevLimit);
        const taxInSlab = (taxableAmountInSlab * s.rate) / 100;
        incomeTax += taxInSlab;
        if (s.rate > 0) marginalRate = s.rate;
        if (s.rate > 0) {
          slabsBreakdown.push({
            label: `${s.label} (${s.rate}%)`,
            ratePercent: s.rate,
            taxableInBracket: Math.round(taxableAmountInSlab),
            taxAmount: Math.round(taxInSlab)
          });
        }
        prevLimit = s.limit;
      } else {
        break;
      }
    }

    // Section 87A rebate: If taxable income <= ₹7,00,000, tax is rebate 100%
    if (taxableIncome <= 700000) {
      incomeTax = 0;
    }

    // Health & Education Cess: 4%
    payrollTaxOrCess = incomeTax * 0.04;
    const totalTax = incomeTax + payrollTaxOrCess;
    const netAnnual = Math.max(0, grossIncome - totalTax);

    return {
      grossIncome: Math.round(grossIncome),
      totalDeductions: Math.round(deductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(incomeTax),
      payrollTaxOrCess: Math.round(payrollTaxOrCess),
      totalTax: Math.round(totalTax),
      netAnnualTakeHome: Math.round(netAnnual),
      netMonthlyTakeHome: Math.round(netAnnual / 12),
      netBiweeklyTakeHome: Math.round(netAnnual / 26),
      effectiveTaxRate: grossIncome > 0 ? Math.round((totalTax / grossIncome) * 1000) / 10 : 0,
      marginalTaxRate: marginalRate,
      slabsBreakdown
    };
  } else if (taxSystem === 'in_old') {
    // India Old Tax Regime
    standardDeduction = 50000;
    const sec80C = Math.min(150000, Math.max(0, retirementContribution));
    const sec80D = Math.min(25000, Math.max(0, healthInsuranceDeduction));
    deductions = standardDeduction + sec80C + sec80D + Math.max(0, otherDeductions);
    const taxableIncome = Math.max(0, grossIncome - deductions);

    const slabs = [
      { limit: 250000, rate: 0, label: 'Up to ₹2,50,000' },
      { limit: 500000, rate: 5, label: '₹2,50,001 – ₹5,00,000' },
      { limit: 1000000, rate: 20, label: '₹5,00,001 – ₹10,00,000' },
      { limit: Infinity, rate: 30, label: 'Above ₹10,00,000' }
    ];

    let prevLimit = 0;
    for (const s of slabs) {
      if (taxableIncome > prevLimit) {
        const taxableAmountInSlab = Math.min(taxableIncome - prevLimit, s.limit - prevLimit);
        const taxInSlab = (taxableAmountInSlab * s.rate) / 100;
        incomeTax += taxInSlab;
        if (s.rate > 0) marginalRate = s.rate;
        if (s.rate > 0) {
          slabsBreakdown.push({
            label: `${s.label} (${s.rate}%)`,
            ratePercent: s.rate,
            taxableInBracket: Math.round(taxableAmountInSlab),
            taxAmount: Math.round(taxInSlab)
          });
        }
        prevLimit = s.limit;
      } else {
        break;
      }
    }

    if (taxableIncome <= 500000) {
      incomeTax = 0;
    }

    payrollTaxOrCess = incomeTax * 0.04;
    const totalTax = incomeTax + payrollTaxOrCess;
    const netAnnual = Math.max(0, grossIncome - totalTax);

    return {
      grossIncome: Math.round(grossIncome),
      totalDeductions: Math.round(deductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(incomeTax),
      payrollTaxOrCess: Math.round(payrollTaxOrCess),
      totalTax: Math.round(totalTax),
      netAnnualTakeHome: Math.round(netAnnual),
      netMonthlyTakeHome: Math.round(netAnnual / 12),
      netBiweeklyTakeHome: Math.round(netAnnual / 26),
      effectiveTaxRate: grossIncome > 0 ? Math.round((totalTax / grossIncome) * 1000) / 10 : 0,
      marginalTaxRate: marginalRate,
      slabsBreakdown
    };
  } else {
    // Custom flat / progressive tax rate
    deductions = Math.max(0, retirementContribution + healthInsuranceDeduction + otherDeductions);
    const taxableIncome = Math.max(0, grossIncome - deductions);
    incomeTax = (taxableIncome * customTaxRate) / 100;
    const totalTax = incomeTax;
    const netAnnual = Math.max(0, grossIncome - totalTax);

    return {
      grossIncome: Math.round(grossIncome),
      totalDeductions: Math.round(deductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(incomeTax),
      payrollTaxOrCess: 0,
      totalTax: Math.round(totalTax),
      netAnnualTakeHome: Math.round(netAnnual),
      netMonthlyTakeHome: Math.round(netAnnual / 12),
      netBiweeklyTakeHome: Math.round(netAnnual / 26),
      effectiveTaxRate: grossIncome > 0 ? Math.round((totalTax / grossIncome) * 1000) / 10 : 0,
      marginalTaxRate: customTaxRate,
      slabsBreakdown: [
        {
          label: `Taxable Income (${customTaxRate}%)`,
          ratePercent: customTaxRate,
          taxableInBracket: Math.round(taxableIncome),
          taxAmount: Math.round(incomeTax)
        }
      ]
    };
  }
}

