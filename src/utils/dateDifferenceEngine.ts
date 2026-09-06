import { parseLocalDate } from './dateUtils';

export interface DateDifferenceInput {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  includeEndDay: boolean;
}

export interface DateDifferenceResult {
  isSameDay: boolean;
  isNegative: boolean;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  remainingDaysAfterWeeks: number;
  businessDays: number;
  weekendDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  leapYearsCount: number;
}

export function calculateDateDifference(input: DateDifferenceInput): DateDifferenceResult {
  const { startDate, endDate, includeEndDay } = input;

  const d1 = parseLocalDate(startDate);
  const d2 = parseLocalDate(endDate);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return {
      isSameDay: true,
      isNegative: false,
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      remainingDaysAfterWeeks: 0,
      businessDays: 0,
      weekendDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      leapYearsCount: 0
    };
  }

  const isNegative = d2.getTime() < d1.getTime();
  const start = isNegative ? d2 : d1;
  const end = isNegative ? d1 : d2;

  // Exact calendar difference in years, months, days
  const y1 = start.getFullYear();
  const m1 = start.getMonth();
  const day1 = start.getDate();

  // Safely advance end date by 1 day when includeEndDay is checked to avoid day2 = 32 overflow
  const effectiveEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0, 0);
  if (includeEndDay) {
    effectiveEnd.setDate(effectiveEnd.getDate() + 1);
  }

  const y2 = effectiveEnd.getFullYear();
  const m2 = effectiveEnd.getMonth();
  const day2 = effectiveEnd.getDate();

  let years = y2 - y1;
  let months = m2 - m1;
  let days = day2 - day1;

  if (days < 0) {
    // Borrow days from previous month
    months -= 1;
    const prevMonthLastDay = new Date(y2, m2, 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Total calendar days
  const msPerDay = 1000 * 60 * 60 * 24;
  let totalDays = Math.round((end.getTime() - start.getTime()) / msPerDay);
  if (includeEndDay) {
    totalDays += 1;
  }

  // Business days vs weekend count
  let businessDays = 0;
  let weekendDays = 0;
  const cur = new Date(start.getTime());
  const limit = new Date(end.getTime());
  if (includeEndDay) {
    limit.setDate(limit.getDate() + 1);
  }

  while (cur < limit) {
    const dayOfWeek = cur.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  // Leap years check
  let leapYearsCount = 0;
  for (let y = y1; y <= y2; y++) {
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      leapYearsCount++;
    }
  }

  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysAfterWeeks = totalDays % 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  return {
    isSameDay: totalDays === 0,
    isNegative,
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    remainingDaysAfterWeeks,
    businessDays,
    weekendDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    leapYearsCount
  };
}
