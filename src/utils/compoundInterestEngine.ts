export interface CompoundInterestInput {
  principal: number;
  annualInterestRate: number; // percentage, e.g. 8 for 8%
  tenureYears: number;
  compoundFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';
  additionalContribution: number;
  contributionFrequency: 'monthly' | 'yearly';
}

export interface YearGrowthRecord {
  year: number;
  startingBalance: number;
  contributions: number;
  interestEarned: number;
  endingBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  principalPercentage: number;
  interestPercentage: number;
  yearlyBreakdown: YearGrowthRecord[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const {
    principal,
    annualInterestRate,
    tenureYears,
    compoundFrequency,
    additionalContribution,
    contributionFrequency
  } = input;

  const r = (annualInterestRate || 0) / 100;
  const years = Math.max(1, Math.min(100, Math.round(tenureYears || 1)));

  let n = 12; // compound times per year
  switch (compoundFrequency) {
    case 'annually':
      n = 1;
      break;
    case 'semi-annually':
      n = 2;
      break;
    case 'quarterly':
      n = 4;
      break;
    case 'monthly':
      n = 12;
      break;
    case 'daily':
      n = 365;
      break;
  }

  const yearlyBreakdown: YearGrowthRecord[] = [];
  let currentBalance = Math.max(0, principal || 0);
  let totalContribAcc = 0;
  let totalInterestAcc = 0;

  for (let year = 1; year <= years; year++) {
    const startOfYearBalance = currentBalance;
    let yearContributions = 0;
    let balanceBeforeInterest = startOfYearBalance;

    if (contributionFrequency === 'monthly') {
      // 12 monthly deposits
      const monthlyDeposit = additionalContribution || 0;
      for (let m = 1; m <= 12; m++) {
        balanceBeforeInterest += monthlyDeposit;
        yearContributions += monthlyDeposit;
      }
    } else {
      // Annual deposit at start of year
      const annualDeposit = additionalContribution || 0;
      balanceBeforeInterest += annualDeposit;
      yearContributions += annualDeposit;
    }

    // Compound growth for the year: A = P * (1 + r/n)^n
    // Using monthly balance approximation for compounding with contributions
    let yearEndBalance = startOfYearBalance;
    const monthlyRate = r / n;
    const compoundPeriodsInYear = n;
    const depositPerPeriod = (contributionFrequency === 'monthly' ? (additionalContribution || 0) * (12 / n) : (additionalContribution || 0) / n);

    for (let period = 1; period <= compoundPeriodsInYear; period++) {
      yearEndBalance = (yearEndBalance + depositPerPeriod) * (1 + monthlyRate);
    }

    const yearInterest = Math.max(0, yearEndBalance - startOfYearBalance - yearContributions);
    currentBalance = yearEndBalance;
    totalContribAcc += yearContributions;
    totalInterestAcc += yearInterest;

    yearlyBreakdown.push({
      year,
      startingBalance: Math.round(startOfYearBalance),
      contributions: Math.round(yearContributions),
      interestEarned: Math.round(yearInterest),
      endingBalance: Math.round(currentBalance),
      totalContributions: Math.round(totalContribAcc),
      totalInterest: Math.round(totalInterestAcc)
    });
  }

  const futureValue = Math.round(currentBalance);
  const totalPrincipalInvested = Math.round(principal + totalContribAcc);
  const totalInterest = Math.max(0, futureValue - totalPrincipalInvested);
  const totalSum = futureValue > 0 ? futureValue : 1;
  const principalPercentage = Math.round((totalPrincipalInvested / totalSum) * 100);
  const interestPercentage = Math.max(0, 100 - principalPercentage);

  return {
    futureValue,
    totalPrincipal: totalPrincipalInvested,
    totalContributions: Math.round(totalContribAcc),
    totalInterest,
    principalPercentage,
    interestPercentage,
    yearlyBreakdown
  };
}
