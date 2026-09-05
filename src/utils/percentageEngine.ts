export interface PercentageBasicResult {
  value: number;
  formulaString: string;
  stepExplanation: string;
}

export interface PercentageDiffResult {
  difference: number;
  percentageChange: number;
  isIncrease: boolean;
  formulaString: string;
}

export function calculatePercentOfNumber(percentage: number, total: number): PercentageBasicResult {
  const value = Number(((percentage / 100) * total).toFixed(2));
  return {
    value,
    formulaString: `(${percentage} / 100) × ${total} = ${value}`,
    stepExplanation: `Divide ${percentage} by 100 to get ${percentage / 100}, then multiply by ${total}.`
  };
}

export function calculateNumberIsWhatPercentOfTotal(portion: number, total: number): PercentageBasicResult {
  if (total === 0) {
    return {
      value: 0,
      formulaString: 'Division by zero is undefined',
      stepExplanation: 'Total cannot be zero.'
    };
  }
  const value = Number(((portion / total) * 100).toFixed(2));
  return {
    value,
    formulaString: `(${portion} / ${total}) × 100 = ${value}%`,
    stepExplanation: `Divide portion ${portion} by total ${total}, then multiply by 100 to express as a percentage.`
  };
}

export function calculatePercentageChange(oldValue: number, newValue: number): PercentageDiffResult {
  if (oldValue === 0) {
    return {
      difference: newValue,
      percentageChange: 0,
      isIncrease: newValue >= 0,
      formulaString: 'Initial value is zero'
    };
  }

  const diff = Number((newValue - oldValue).toFixed(2));
  const change = Number(((diff / Math.abs(oldValue)) * 100).toFixed(2));
  const isIncrease = diff >= 0;

  return {
    difference: Math.abs(diff),
    percentageChange: Math.abs(change),
    isIncrease,
    formulaString: `((${newValue} - ${oldValue}) / |${oldValue}|) × 100 = ${change > 0 ? '+' : ''}${change}%`
  };
}

export function calculateAddSubtractPercentage(initial: number, percentage: number, isAddition: boolean): PercentageBasicResult {
  const delta = (percentage / 100) * initial;
  const result = isAddition ? initial + delta : initial - delta;
  const rounded = Number(result.toFixed(2));
  const operator = isAddition ? '+' : '-';

  return {
    value: rounded,
    formulaString: `${initial} ${operator} (${percentage}% of ${initial}) = ${rounded}`,
    stepExplanation: `${percentage}% of ${initial} is ${Number(delta.toFixed(2))}. ${isAddition ? 'Adding' : 'Subtracting'} gives ${rounded}.`
  };
}
