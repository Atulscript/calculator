export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
  flag: string;
  defaultPresets: number[];
  presetLabels?: string[];
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    flag: '🇺🇸',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    flag: '🇪🇺',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['€10k', '€50k', '€250k', '€500k', '€1M']
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    flag: '🇬🇧',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['£10k', '£50k', '£250k', '£500k', '£1M']
  },
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    flag: '🇮🇳',
    defaultPresets: [500000, 2500000, 5000000, 10000000],
    presetLabels: ['₹5 Lakh', '₹25 Lakh', '₹50 Lakh', '₹1 Crore']
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    flag: '🇯🇵',
    defaultPresets: [1000000, 5000000, 20000000, 50000000],
    presetLabels: ['¥100万', '¥500万', '¥2000万', '¥5000万']
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    flag: '🇨🇦',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    flag: '🇦🇺',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
    locale: 'pt-BR',
    flag: '🇧🇷',
    defaultPresets: [25000, 100000, 300000, 600000],
    presetLabels: ['R$25k', 'R$100k', 'R$300k', 'R$600k']
  },
  {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    locale: 'zh-CN',
    flag: '🇨🇳',
    defaultPresets: [100000, 500000, 1500000, 3000000],
    presetLabels: ['¥10万', '¥50万', '¥150万', '¥300万']
  },
  {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    locale: 'ar-AE',
    flag: '🇦🇪',
    defaultPresets: [50000, 200000, 750000, 1500000],
    presetLabels: ['50k AED', '200k AED', '750k AED', '1.5M AED']
  }
];

export function getCurrency(code: string): CurrencyInfo {
  return SUPPORTED_CURRENCIES.find(c => c.code.toUpperCase() === code.toUpperCase()) || SUPPORTED_CURRENCIES[0];
}

export function formatCurrencyAmount(amount: number, currencyCode: string = 'USD'): string {
  const currency = getCurrency(currencyCode);
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  }
}
