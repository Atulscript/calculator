export type AgeCalculatorMode = 'today' | 'specific' | 'reverse' | 'compare';

export interface ExactAge {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TotalTimeBreakdown {
  totalMonths: number;
  totalWeeks: number;
  remainingDays: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  decimalYears: number;
}

export interface NextBirthdayInfo {
  nextBirthdayDate: Date;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  dayOfWeek: string;
  turningAge: number;
  progressPercentage: number;
  halfBirthdayDate: Date;
  isToday?: boolean;
  upcomingBirthdays: Array<{
    year: number;
    age: number;
    dayOfWeek: string;
    isWeekend: boolean;
  }>;
}

export interface ZodiacInfo {
  western: {
    sign: string;
    symbol: string;
    dates: string;
    element: string;
    rulingPlanet: string;
    traits: string[];
  };
  chinese: {
    animal: string;
    element: string;
    yinYang: string;
    luckyNumbers: number[];
  };
}

export interface PlanetaryAge {
  planet: string;
  orbitalPeriodDays: number;
  ageInPlanetYears: number;
  nextBirthdayInPlanetDays: number;
  emoji: string;
}

export interface BioStats {
  estimatedHeartbeats: number;
  estimatedBreaths: number;
  estimatedSleepHours: number;
  estimatedMealsEaten: number;
  timesLaughed: number;
}

export interface AgeCalculationResult {
  birthDate: Date;
  targetDate: Date;
  exactAge: ExactAge;
  totals: TotalTimeBreakdown;
  nextBirthday: NextBirthdayInfo;
  dayOfWeekBorn: string;
  isLeapYearBorn: boolean;
  dayOfYearBorn: number;
  zodiac: ZodiacInfo;
  birthstone: {
    name: string;
    color: string;
    meaning: string;
  };
  birthFlower: {
    name: string;
    meaning: string;
  };
  planetaryAges: PlanetaryAge[];
  bioStats: BioStats;
}

export interface AgeComparisonResult {
  person1: {
    name: string;
    birthDate: Date;
    exactAge: ExactAge;
    totalDays: number;
  };
  person2: {
    name: string;
    birthDate: Date;
    exactAge: ExactAge;
    totalDays: number;
  };
  olderPerson: 'person1' | 'person2' | 'same';
  differenceExact: ExactAge;
  differenceDays: number;
  differenceHours: number;
  percentageDiff: number;
}

export interface ReverseDobResult {
  targetDate: Date;
  ageInput: {
    years: number;
    months: number;
    days: number;
  };
  calculatedBirthDate: Date;
  dayOfWeek: string;
}
