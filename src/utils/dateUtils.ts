/**
 * Formats a Date object as YYYY-MM-DD for standard HTML input elements
 */
export function formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
