// Comprehensive Time & Everyday Life Calculation Engines

export interface TimeDurationInput {
  startTime: string; // HH:MM (24-hr)
  endTime: string; // HH:MM (24-hr)
  nextDay?: boolean;
}

export interface TimeDurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
  decimalHours: number;
  formattedDuration: string;
}

export function calculateTimeDuration(input: TimeDurationInput): TimeDurationResult {
  const [sh, sm] = input.startTime.split(':').map(Number);
  const [eh, em] = input.endTime.split(':').map(Number);

  let startTotal = sh * 60 + sm;
  let endTotal = eh * 60 + em;

  if (endTotal < startTotal || input.nextDay) {
    endTotal += 24 * 60;
  }

  const diffMinutes = Math.max(0, endTotal - startTotal);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  const decimalHours = Math.round((diffMinutes / 60) * 100) / 100;

  return {
    hours,
    minutes,
    totalMinutes: diffMinutes,
    decimalHours,
    formattedDuration: `${hours}h ${minutes}m`
  };
}

export interface TimesheetInput {
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  breakMinutes: number;
  hourlyRate: number;
  overtimeThresholdHours?: number; // e.g. 8 hrs
  overtimeMultiplier?: number; // e.g. 1.5x
}

export interface TimesheetResult {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  netWorkMinutes: number;
}

export function calculateTimesheet(input: TimesheetInput): TimesheetResult {
  const duration = calculateTimeDuration({
    startTime: input.startTime,
    endTime: input.endTime
  });

  const netWorkMinutes = Math.max(0, duration.totalMinutes - input.breakMinutes);
  const totalHours = Math.round((netWorkMinutes / 60) * 100) / 100;

  const otThreshold = input.overtimeThresholdHours || 8;
  const otMultiplier = input.overtimeMultiplier || 1.5;

  let regularHours = Math.min(totalHours, otThreshold);
  let overtimeHours = Math.max(0, totalHours - otThreshold);

  const regularPay = regularHours * input.hourlyRate;
  const overtimePay = overtimeHours * (input.hourlyRate * otMultiplier);
  const grossPay = regularPay + overtimePay;

  return {
    totalHours,
    regularHours: Math.round(regularHours * 100) / 100,
    overtimeHours: Math.round(overtimeHours * 100) / 100,
    regularPay: Math.round(regularPay * 100) / 100,
    overtimePay: Math.round(overtimePay * 100) / 100,
    grossPay: Math.round(grossPay * 100) / 100,
    netWorkMinutes
  };
}

export interface DaysUntilResult {
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  monthsAndDays: { months: number; days: number };
  isPast: boolean;
}

export function calculateDaysUntil(targetDateStr: string): DaysUntilResult {
  const now = new Date();
  const target = new Date(targetDateStr);
  // Compare at midnight
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diffMs = targetMidnight.getTime() - nowMidnight.getTime();
  const isPast = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);

  const totalDays = Math.round(absDiffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  const months = Math.floor(totalDays / 30.4375);
  const remainingDays = Math.round(totalDays % 30.4375);

  return {
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    monthsAndDays: { months, days: remainingDays },
    isPast
  };
}

export interface DayOfWeekResult {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 6 = Saturday
  isWeekend: boolean;
  isLeapYear: boolean;
  dayOfYear: number;
  formattedFullDate: string;
}

export function calculateDayOfWeek(dateStr: string): DayOfWeekResult {
  const parts = dateStr.split('-');
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);

  const dateObj = new Date(y, m, d);
  const dayIndex = dateObj.getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  const startOfYear = new Date(y, 0, 1);
  const diffDays = Math.floor((dateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return {
    dayName: dayNames[dayIndex],
    dayIndex,
    isWeekend: dayIndex === 0 || dayIndex === 6,
    isLeapYear,
    dayOfYear: diffDays,
    formattedFullDate: dateObj.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
}

export interface ChronologicalAgeResult {
  years: number;
  months: number;
  days: number;
  meetsCutoff: boolean;
  totalDays: number;
}

export function calculateChronologicalSchoolAge(
  dobStr: string,
  cutoffDateStr: string,
  minRequiredAgeYears = 5
): ChronologicalAgeResult {
  const dob = new Date(dobStr);
  const cutoff = new Date(cutoffDateStr);

  let years = cutoff.getFullYear() - dob.getFullYear();
  let months = cutoff.getMonth() - dob.getMonth();
  let days = cutoff.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(cutoff.getFullYear(), cutoff.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = cutoff.getTime() - dob.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const meetsCutoff = years >= minRequiredAgeYears;

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    meetsCutoff,
    totalDays
  };
}

export interface SleepCycleResult {
  suggestedTimes: Array<{
    time: string; // HH:MM
    cycles: number;
    hoursSlept: number;
    recommended: boolean;
  }>;
}

export function calculateSleepCycles(
  mode: 'wake_at' | 'sleep_now',
  timeValue?: string // HH:MM if mode is wake_at
): SleepCycleResult {
  const LATENCY_MINUTES = 14; // average time to fall asleep
  const CYCLE_MINUTES = 90;

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const results: SleepCycleResult['suggestedTimes'] = [];

  if (mode === 'sleep_now') {
    const now = new Date();
    // Calculate wake-up times for 3, 4, 5, 6 cycles
    for (let c = 6; c >= 3; c--) {
      const wakeTime = new Date(now.getTime() + (LATENCY_MINUTES + c * CYCLE_MINUTES) * 60000);
      results.push({
        time: formatTime(wakeTime),
        cycles: c,
        hoursSlept: (c * 90) / 60,
        recommended: c === 5 || c === 6
      });
    }
  } else {
    // wake_at
    const [h, m] = (timeValue || '07:00').split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(h, m, 0, 0);

    for (let c = 6; c >= 3; c--) {
      const bedtime = new Date(wakeDate.getTime() - (LATENCY_MINUTES + c * CYCLE_MINUTES) * 60000);
      results.push({
        time: formatTime(bedtime),
        cycles: c,
        hoursSlept: (c * 90) / 60,
        recommended: c === 5 || c === 6
      });
    }
  }

  return { suggestedTimes: results };
}
