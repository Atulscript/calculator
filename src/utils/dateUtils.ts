/**
 * Formats a Date object as YYYY-MM-DD for standard HTML input elements in local time
 */
export function formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string into a Date in local midnight time.
 * Avoids the ECMAScript ISO string UTC parsing bug where 'YYYY-MM-DD' parses as UTC midnight,
 * shifting backward a day in time zones west of Greenwich (e.g. UTC-5, UTC-8).
 */
export function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }
  const fallback = new Date(dateStr);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}

/**
 * Checks if two dates fall on the same local calendar year, month, and day
 */
export function isSameCalendarDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Returns the maximum number of days in a specific year and month (0-indexed month)
 */
export function getDaysInLocalMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Clamps a day of month to the valid range [1, daysInMonth]
 */
export function clampDayOfMonth(year: number, monthIndex: number, day: number): number {
  const maxDay = getDaysInLocalMonth(year, monthIndex);
  return Math.min(Math.max(1, day), maxDay);
}

/**
 * Formats a Date to a friendly human readable string: e.g. "August 15, 1995"
 */
export function formatFriendlyDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Returns ordinal suffix: 1st, 2nd, 3rd, 4th
 */
export function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Formats numbers with international comma separators: 1,234,567
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

