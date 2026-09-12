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

export interface PrepaymentInput extends LoanInput {
  extraMonthlyPayment: number;
  oneTimeLumpSum: number;
  lumpSumMonth: number;
}

export interface PrepaymentResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  yearsSaved: number;
  originalInterest: number;
  newInterest: number;
  interestSaved: number;
}

export function calculateLoanPrepayment(input: PrepaymentInput): PrepaymentResult {
  const baseResult = calculateLoanEMI(input);
  const { principal, annualInterestRate } = input;
  const monthlyRate = annualInterestRate / 12 / 100;
  const baseEmi = baseResult.monthlyEmi;

  let balance = principal;
  let newInterest = 0;
  let newMonths = 0;
  const totalMonthsLimit = baseResult.totalMonths * 2; // safety cap

  while (balance > 0.01 && newMonths < totalMonthsLimit) {
    newMonths++;
    const monthInterest = balance * monthlyRate;
    newInterest += monthInterest;

    let payAmt = baseEmi + input.extraMonthlyPayment;
    if (newMonths === input.lumpSumMonth) {
      payAmt += input.oneTimeLumpSum;
    }

    const principalPaid = Math.min(balance, payAmt - monthInterest);
    balance -= principalPaid;
  }

  const monthsSaved = Math.max(0, baseResult.totalMonths - newMonths);
  const yearsSaved = Math.round((monthsSaved / 12) * 10) / 10;
  const interestSaved = Math.max(0, Math.round(baseResult.totalInterest - newInterest));

  return {
    originalMonths: baseResult.totalMonths,
    newMonths,
    monthsSaved,
    yearsSaved,
    originalInterest: baseResult.totalInterest,
    newInterest: Math.round(newInterest),
    interestSaved
  };
}

export interface LoanComparisonResult {
  loanA: LoanResult;
  loanB: LoanResult;
  emiDifference: number; // positive means B is cheaper
  interestDifference: number; // positive means B saves interest
  cheaperLoan: 'A' | 'B' | 'Equal';
}

export function compareLoans(inputA: LoanInput, inputB: LoanInput): LoanComparisonResult {
  const resA = calculateLoanEMI(inputA);
  const resB = calculateLoanEMI(inputB);

  const emiDifference = resA.monthlyEmi - resB.monthlyEmi;
  const interestDifference = resA.totalInterest - resB.totalInterest;

  let cheaperLoan: 'A' | 'B' | 'Equal' = 'Equal';
  if (resB.totalPayment < resA.totalPayment) cheaperLoan = 'B';
  else if (resA.totalPayment < resB.totalPayment) cheaperLoan = 'A';

  return {
    loanA: resA,
    loanB: resB,
    emiDifference,
    interestDifference,
    cheaperLoan
  };
}
