export interface LoanInput {
  principal: number;
  annualInterestRate: number;
  tenureYears: number;
  tenureMonths: number;
  tenureType: 'years' | 'months';
}

export interface AmortizationYearItem {
  year: number;
  openingBalance: number;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  closingBalance: number;
}

export interface LoanResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  principalPercentage: number;
  interestPercentage: number;
  totalMonths: number;
  amortizationYears: AmortizationYearItem[];
}

export function calculateLoanEMI(input: LoanInput): LoanResult {
  const principal = Math.max(0, input.principal || 100000);
  const annualRate = Math.max(0, input.annualInterestRate || 8.5);
  const totalMonths = input.tenureType === 'years'
    ? Math.max(1, (input.tenureYears || 5) * 12)
    : Math.max(1, input.tenureMonths || 60);

  const monthlyRate = annualRate / 12 / 100;

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = principal / totalMonths;
  } else {
    // EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const principalPercentage = totalPayment > 0 ? Number(((principal / totalPayment) * 100).toFixed(1)) : 100;
  const interestPercentage = totalPayment > 0 ? Number(((totalInterest / totalPayment) * 100).toFixed(1)) : 0;

  // Generate Year-by-Year Amortization Schedule
  const amortizationYears: AmortizationYearItem[] = [];
  let balance = principal;
  const numYears = Math.ceil(totalMonths / 12);

  for (let y = 1; y <= numYears; y++) {
    const openingBalance = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;
    let yearEmi = 0;

    const monthsInThisYear = Math.min(12, totalMonths - (y - 1) * 12);

    for (let m = 0; m < monthsInThisYear; m++) {
      const monthInterest = balance * monthlyRate;
      const monthPrincipal = Math.min(balance, monthlyEmi - monthInterest);
      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      yearEmi += (monthPrincipal + monthInterest);
      balance -= monthPrincipal;
      if (balance < 0.01) balance = 0;
    }

    amortizationYears.push({
      year: y,
      openingBalance: Math.round(openingBalance),
      emiPaid: Math.round(yearEmi),
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      closingBalance: Math.round(balance)
    });
  }

  return {
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principal: Math.round(principal),
    principalPercentage,
    interestPercentage,
    totalMonths,
    amortizationYears
  };
}
