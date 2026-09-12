export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  locale: string;
  flag: string;
  countryCode?: string;
  countryName?: string;
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
    countryCode: 'US',
    countryName: 'United States',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    flag: '🇪🇺',
    countryCode: 'EU',
    countryName: 'European Union (Germany, France, Spain, Italy, etc.)',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['€10k', '€50k', '€250k', '€500k', '€1M']
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    flag: '🇬🇧',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['£10k', '£50k', '£250k', '£500k', '£1M']
  },
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    flag: '🇮🇳',
    countryCode: 'IN',
    countryName: 'India',
    defaultPresets: [500000, 2500000, 5000000, 10000000],
    presetLabels: ['₹5 Lakh', '₹25 Lakh', '₹50 Lakh', '₹1 Crore']
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    flag: '🇯🇵',
    countryCode: 'JP',
    countryName: 'Japan',
    defaultPresets: [1000000, 5000000, 20000000, 50000000],
    presetLabels: ['¥100万', '¥500万', '¥2000万', '¥5000万']
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    flag: '🇨🇦',
    countryCode: 'CA',
    countryName: 'Canada',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    flag: '🇦🇺',
    countryCode: 'AU',
    countryName: 'Australia',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['$10k', '$50k', '$250k', '$500k', '$1M']
  },
  {
    code: 'CHF',
    symbol: 'CHF',
    name: 'Swiss Franc',
    locale: 'de-CH',
    flag: '🇨🇭',
    countryCode: 'CH',
    countryName: 'Switzerland',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['10k CHF', '50k CHF', '250k CHF', '500k CHF', '1M CHF']
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    locale: 'en-SG',
    flag: '🇸🇬',
    countryCode: 'SG',
    countryName: 'Singapore',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['S$10k', 'S$50k', 'S$250k', 'S$500k', 'S$1M']
  },
  {
    code: 'NZD',
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
    locale: 'en-NZ',
    flag: '🇳🇿',
    countryCode: 'NZ',
    countryName: 'New Zealand',
    defaultPresets: [10000, 50000, 250000, 500000, 1000000],
    presetLabels: ['NZ$10k', 'NZ$50k', 'NZ$250k', 'NZ$500k', 'NZ$1M']
  },
  {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    locale: 'ar-AE',
    flag: '🇦🇪',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    defaultPresets: [50000, 200000, 750000, 1500000],
    presetLabels: ['50k AED', '200k AED', '750k AED', '1.5M AED']
  },
  {
    code: 'SAR',
    symbol: '﷼',
    name: 'Saudi Riyal',
    locale: 'ar-SA',
    flag: '🇸🇦',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    defaultPresets: [50000, 200000, 750000, 1500000],
    presetLabels: ['50k SAR', '200k SAR', '750k SAR', '1.5M SAR']
  },
  {
    code: 'QAR',
    symbol: 'QR',
    name: 'Qatari Riyal',
    locale: 'ar-QA',
    flag: '🇶🇦',
    countryCode: 'QA',
    countryName: 'Qatar',
    defaultPresets: [50000, 200000, 750000, 1500000],
    presetLabels: ['50k QAR', '200k QAR', '750k QAR', '1.5M QAR']
  },
  {
    code: 'KWD',
    symbol: 'KD',
    name: 'Kuwaiti Dinar',
    locale: 'ar-KW',
    flag: '🇰🇼',
    countryCode: 'KW',
    countryName: 'Kuwait',
    defaultPresets: [5000, 20000, 75000, 150000],
    presetLabels: ['5k KD', '20k KD', '75k KD', '150k KD']
  },
  {
    code: 'CNY',
    symbol: '¥',
    name: 'Chinese Yuan',
    locale: 'zh-CN',
    flag: '🇨🇳',
    countryCode: 'CN',
    countryName: 'China',
    defaultPresets: [100000, 500000, 1500000, 3000000],
    presetLabels: ['¥10万', '¥50万', '¥150万', '¥300万']
  },
  {
    code: 'HKD',
    symbol: 'HK$',
    name: 'Hong Kong Dollar',
    locale: 'zh-HK',
    flag: '🇭🇰',
    countryCode: 'HK',
    countryName: 'Hong Kong',
    defaultPresets: [100000, 500000, 2000000, 5000000],
    presetLabels: ['HK$100k', 'HK$500k', 'HK$2M', 'HK$5M']
  },
  {
    code: 'KRW',
    symbol: '₩',
    name: 'South Korean Won',
    locale: 'ko-KR',
    flag: '🇰🇷',
    countryCode: 'KR',
    countryName: 'South Korea',
    defaultPresets: [10000000, 50000000, 200000000, 500000000],
    presetLabels: ['₩1000만', '₩5000만', '₩2억', '₩5억']
  },
  {
    code: 'BRL',
    symbol: 'R$',
    name: 'Brazilian Real',
    locale: 'pt-BR',
    flag: '🇧🇷',
    countryCode: 'BR',
    countryName: 'Brazil',
    defaultPresets: [25000, 100000, 300000, 600000],
    presetLabels: ['R$25k', 'R$100k', 'R$300k', 'R$600k']
  },
  {
    code: 'MXN',
    symbol: 'Mex$',
    name: 'Mexican Peso',
    locale: 'es-MX',
    flag: '🇲🇽',
    countryCode: 'MX',
    countryName: 'Mexico',
    defaultPresets: [100000, 500000, 1500000, 3000000],
    presetLabels: ['Mex$100k', 'Mex$500k', 'Mex$1.5M', 'Mex$3M']
  },
  {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    locale: 'en-ZA',
    flag: '🇿🇦',
    countryCode: 'ZA',
    countryName: 'South Africa',
    defaultPresets: [100000, 500000, 1500000, 3000000],
    presetLabels: ['R100k', 'R500k', 'R1.5M', 'R3M']
  },
  {
    code: 'SEK',
    symbol: 'kr',
    name: 'Swedish Krona',
    locale: 'sv-SE',
    flag: '🇸🇪',
    countryCode: 'SE',
    countryName: 'Sweden',
    defaultPresets: [100000, 500000, 2000000, 5000000],
    presetLabels: ['100k kr', '500k kr', '2M kr', '5M kr']
  },
  {
    code: 'NOK',
    symbol: 'kr',
    name: 'Norwegian Krone',
    locale: 'nb-NO',
    flag: '🇳🇴',
    countryCode: 'NO',
    countryName: 'Norway',
    defaultPresets: [100000, 500000, 2000000, 5000000],
    presetLabels: ['100k kr', '500k kr', '2M kr', '5M kr']
  },
  {
    code: 'DKK',
    symbol: 'kr',
    name: 'Danish Krone',
    locale: 'da-DK',
    flag: '🇩🇰',
    countryCode: 'DK',
    countryName: 'Denmark',
    defaultPresets: [100000, 500000, 1500000, 3000000],
    presetLabels: ['100k kr', '500k kr', '1.5M kr', '3M kr']
  },
  {
    code: 'PLN',
    symbol: 'zł',
    name: 'Polish Zloty',
    locale: 'pl-PL',
    flag: '🇵🇱',
    countryCode: 'PL',
    countryName: 'Poland',
    defaultPresets: [50000, 200000, 600000, 1200000],
    presetLabels: ['50k zł', '200k zł', '600k zł', '1.2M zł']
  },
  {
    code: 'TRY',
    symbol: '₺',
    name: 'Turkish Lira',
    locale: 'tr-TR',
    flag: '🇹🇷',
    countryCode: 'TR',
    countryName: 'Turkey',
    defaultPresets: [100000, 500000, 2000000, 5000000],
    presetLabels: ['₺100k', '₺500k', '₺2M', '₺5M']
  },
  {
    code: 'THB',
    symbol: '฿',
    name: 'Thai Baht',
    locale: 'th-TH',
    flag: '🇹🇭',
    countryCode: 'TH',
    countryName: 'Thailand',
    defaultPresets: [200000, 1000000, 3000000, 6000000],
    presetLabels: ['฿200k', '฿1M', '฿3M', '฿6M']
  },
  {
    code: 'MYR',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    locale: 'ms-MY',
    flag: '🇲🇾',
    countryCode: 'MY',
    countryName: 'Malaysia',
    defaultPresets: [25000, 100000, 300000, 600000],
    presetLabels: ['RM25k', 'RM100k', 'RM300k', 'RM600k']
  },
  {
    code: 'IDR',
    symbol: 'Rp',
    name: 'Indonesian Rupiah',
    locale: 'id-ID',
    flag: '🇮🇩',
    countryCode: 'ID',
    countryName: 'Indonesia',
    defaultPresets: [100000000, 500000000, 1500000000, 3000000000],
    presetLabels: ['Rp100jt', 'Rp500jt', 'Rp1.5M', 'Rp3M']
  },
  {
    code: 'PHP',
    symbol: '₱',
    name: 'Philippine Peso',
    locale: 'en-PH',
    flag: '🇵🇭',
    countryCode: 'PH',
    countryName: 'Philippines',
    defaultPresets: [250000, 1000000, 3000000, 6000000],
    presetLabels: ['₱250k', '₱1M', '₱3M', '₱6M']
  },
  {
    code: 'VND',
    symbol: '₫',
    name: 'Vietnamese Dong',
    locale: 'vi-VN',
    flag: '🇻🇳',
    countryCode: 'VN',
    countryName: 'Vietnam',
    defaultPresets: [200000000, 1000000000, 3000000000, 6000000000],
    presetLabels: ['₫200M', '₫1B', '₫3B', '₫6B']
  },
  {
    code: 'BDT',
    symbol: '৳',
    name: 'Bangladeshi Taka',
    locale: 'bn-BD',
    flag: '🇧🇩',
    countryCode: 'BD',
    countryName: 'Bangladesh',
    defaultPresets: [500000, 2500000, 5000000, 10000000],
    presetLabels: ['৳5 Lakh', '৳25 Lakh', '৳50 Lakh', '৳1 Crore']
  },
  {
    code: 'PKR',
    symbol: '₨',
    name: 'Pakistani Rupee',
    locale: 'ur-PK',
    flag: '🇵🇰',
    countryCode: 'PK',
    countryName: 'Pakistan',
    defaultPresets: [500000, 2500000, 5000000, 10000000],
    presetLabels: ['₨5 Lakh', '₨25 Lakh', '₨50 Lakh', '₨1 Crore']
  },
  {
    code: 'NGN',
    symbol: '₦',
    name: 'Nigerian Naira',
    locale: 'en-NG',
    flag: '🇳🇬',
    countryCode: 'NG',
    countryName: 'Nigeria',
    defaultPresets: [5000000, 25000000, 50000000, 100000000],
    presetLabels: ['₦5M', '₦25M', '₦50M', '₦100M']
  },
  {
    code: 'EGP',
    symbol: 'E£',
    name: 'Egyptian Pound',
    locale: 'ar-EG',
    flag: '🇪🇬',
    countryCode: 'EG',
    countryName: 'Egypt',
    defaultPresets: [200000, 1000000, 3000000, 6000000],
    presetLabels: ['E£200k', 'E£1M', 'E£3M', 'E£6M']
  },
  {
    code: 'ILS',
    symbol: '₪',
    name: 'Israeli Shekel',
    locale: 'he-IL',
    flag: '🇮🇱',
    countryCode: 'IL',
    countryName: 'Israel',
    defaultPresets: [50000, 250000, 1000000, 2000000],
    presetLabels: ['₪50k', '₪250k', '₪1M', '₪2M']
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
