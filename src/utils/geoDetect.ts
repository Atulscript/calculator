
export interface GeoProfile {
  countryCode: string;
  countryName: string;
  detectedLanguage: string;
  detectedCurrency: string;
  flag: string;
  city?: string;
  source?: 'ip' | 'timezone' | 'locale' | 'gps' | 'manual';
}

// Country code to default currency and metadata mapping
export const COUNTRY_CURRENCY_MAP: Record<string, { currency: string; name: string; flag: string }> = {
  IN: { currency: 'INR', name: 'India', flag: '🇮🇳' },
  US: { currency: 'USD', name: 'United States', flag: '🇺🇸' },
  GB: { currency: 'GBP', name: 'United Kingdom', flag: '🇬🇧' },
  CA: { currency: 'CAD', name: 'Canada', flag: '🇨🇦' },
  AU: { currency: 'AUD', name: 'Australia', flag: '🇦🇺' },
  NZ: { currency: 'NZD', name: 'New Zealand', flag: '🇳🇿' },
  JP: { currency: 'JPY', name: 'Japan', flag: '🇯🇵' },
  CH: { currency: 'CHF', name: 'Switzerland', flag: '🇨🇭' },
  SG: { currency: 'SGD', name: 'Singapore', flag: '🇸🇬' },
  AE: { currency: 'AED', name: 'United Arab Emirates', flag: '🇦🇪' },
  SA: { currency: 'SAR', name: 'Saudi Arabia', flag: '🇸🇦' },
  QA: { currency: 'QAR', name: 'Qatar', flag: '🇶🇦' },
  KW: { currency: 'KWD', name: 'Kuwait', flag: '🇰🇼' },
  CN: { currency: 'CNY', name: 'China', flag: '🇨🇳' },
  HK: { currency: 'HKD', name: 'Hong Kong', flag: '🇭🇰' },
  KR: { currency: 'KRW', name: 'South Korea', flag: '🇰🇷' },
  BR: { currency: 'BRL', name: 'Brazil', flag: '🇧🇷' },
  MX: { currency: 'MXN', name: 'Mexico', flag: '🇲🇽' },
  ZA: { currency: 'ZAR', name: 'South Africa', flag: '🇿🇦' },
  SE: { currency: 'SEK', name: 'Sweden', flag: '🇸🇪' },
  NO: { currency: 'NOK', name: 'Norway', flag: '🇳🇴' },
  DK: { currency: 'DKK', name: 'Denmark', flag: '🇩🇰' },
  PL: { currency: 'PLN', name: 'Poland', flag: '🇵🇱' },
  TR: { currency: 'TRY', name: 'Turkey', flag: '🇹🇷' },
  TH: { currency: 'THB', name: 'Thailand', flag: '🇹🇭' },
  MY: { currency: 'MYR', name: 'Malaysia', flag: '🇲🇾' },
  ID: { currency: 'IDR', name: 'Indonesia', flag: '🇮🇩' },
  PH: { currency: 'PHP', name: 'Philippines', flag: '🇵🇭' },
  VN: { currency: 'VND', name: 'Vietnam', flag: '🇻🇳' },
  BD: { currency: 'BDT', name: 'Bangladesh', flag: '🇧🇩' },
  PK: { currency: 'PKR', name: 'Pakistan', flag: '🇵🇰' },
  NG: { currency: 'NGN', name: 'Nigeria', flag: '🇳🇬' },
  EG: { currency: 'EGP', name: 'Egypt', flag: '🇪🇬' },
  IL: { currency: 'ILS', name: 'Israel', flag: '🇮🇱' },
  // Eurozone countries
  DE: { currency: 'EUR', name: 'Germany', flag: '🇩🇪' },
  FR: { currency: 'EUR', name: 'France', flag: '🇫🇷' },
  IT: { currency: 'EUR', name: 'Italy', flag: '🇮🇹' },
  ES: { currency: 'EUR', name: 'Spain', flag: '🇪🇸' },
  NL: { currency: 'EUR', name: 'Netherlands', flag: '🇳🇱' },
  BE: { currency: 'EUR', name: 'Belgium', flag: '🇧🇪' },
  AT: { currency: 'EUR', name: 'Austria', flag: '🇦🇹' },
  IE: { currency: 'EUR', name: 'Ireland', flag: '🇮🇪' },
  PT: { currency: 'EUR', name: 'Portugal', flag: '🇵🇹' },
  FI: { currency: 'EUR', name: 'Finland', flag: '🇫🇮' },
  GR: { currency: 'EUR', name: 'Greece', flag: '🇬🇷' },
  EU: { currency: 'EUR', name: 'European Union', flag: '🇪🇺' }
};

export function getGeoProfileForCountry(countryCode: string, source: GeoProfile['source'] = 'manual'): GeoProfile {
  const code = countryCode.toUpperCase();
  const mapping = COUNTRY_CURRENCY_MAP[code];
  if (mapping) {
    return {
      countryCode: code,
      countryName: mapping.name,
      detectedLanguage: 'en',
      detectedCurrency: mapping.currency,
      flag: mapping.flag,
      source
    };
  }

  // Fallback to USD
  return {
    countryCode: code || 'US',
    countryName: 'United States',
    detectedLanguage: 'en',
    detectedCurrency: 'USD',
    flag: '🇺🇸',
    source
  };
}

/**
 * Synchronous client-side location detection using TimeZone and Navigator Locale
 */
export function detectGeoProfile(): GeoProfile {
  let timeZone = 'UTC';
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    timeZone = 'UTC';
  }

  // 1. Precise Timezone detection
  if (timeZone.includes('Kolkata') || timeZone.includes('Calcutta') || timeZone.includes('India')) {
    return getGeoProfileForCountry('IN', 'timezone');
  }

  if (timeZone.includes('London')) {
    return getGeoProfileForCountry('GB', 'timezone');
  }

  if (timeZone.includes('Zurich')) {
    return getGeoProfileForCountry('CH', 'timezone');
  }

  if (timeZone.includes('Tokyo')) {
    return getGeoProfileForCountry('JP', 'timezone');
  }

  if (timeZone.includes('Singapore')) {
    return getGeoProfileForCountry('SG', 'timezone');
  }

  if (timeZone.includes('Auckland') || timeZone.includes('Chatham')) {
    return getGeoProfileForCountry('NZ', 'timezone');
  }

  if (timeZone.includes('Dubai') || timeZone.includes('Abu_Dhabi')) {
    return getGeoProfileForCountry('AE', 'timezone');
  }

  if (timeZone.includes('Riyadh')) {
    return getGeoProfileForCountry('SA', 'timezone');
  }

  if (timeZone.includes('Qatar')) {
    return getGeoProfileForCountry('QA', 'timezone');
  }

  if (timeZone.includes('Kuwait')) {
    return getGeoProfileForCountry('KW', 'timezone');
  }

  if (timeZone.includes('Hong_Kong')) {
    return getGeoProfileForCountry('HK', 'timezone');
  }

  if (timeZone.includes('Seoul')) {
    return getGeoProfileForCountry('KR', 'timezone');
  }

  if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Chongqing') || timeZone.includes('Urumqi')) {
    return getGeoProfileForCountry('CN', 'timezone');
  }

  if (timeZone.includes('Bangkok')) {
    return getGeoProfileForCountry('TH', 'timezone');
  }

  if (timeZone.includes('Kuala_Lumpur') || timeZone.includes('Kuching')) {
    return getGeoProfileForCountry('MY', 'timezone');
  }

  if (timeZone.includes('Jakarta') || timeZone.includes('Makassar') || timeZone.includes('Jayapura')) {
    return getGeoProfileForCountry('ID', 'timezone');
  }

  if (timeZone.includes('Manila')) {
    return getGeoProfileForCountry('PH', 'timezone');
  }

  if (timeZone.includes('Ho_Chi_Minh') || timeZone.includes('Saigon')) {
    return getGeoProfileForCountry('VN', 'timezone');
  }

  if (timeZone.includes('Dhaka')) {
    return getGeoProfileForCountry('BD', 'timezone');
  }

  if (timeZone.includes('Karachi')) {
    return getGeoProfileForCountry('PK', 'timezone');
  }

  if (timeZone.includes('Johannesburg')) {
    return getGeoProfileForCountry('ZA', 'timezone');
  }

  if (timeZone.includes('Lagos')) {
    return getGeoProfileForCountry('NG', 'timezone');
  }

  if (timeZone.includes('Cairo')) {
    return getGeoProfileForCountry('EG', 'timezone');
  }

  if (timeZone.includes('Jerusalem') || timeZone.includes('Tel_Aviv')) {
    return getGeoProfileForCountry('IL', 'timezone');
  }

  if (timeZone.includes('Stockholm')) {
    return getGeoProfileForCountry('SE', 'timezone');
  }

  if (timeZone.includes('Oslo')) {
    return getGeoProfileForCountry('NO', 'timezone');
  }

  if (timeZone.includes('Copenhagen')) {
    return getGeoProfileForCountry('DK', 'timezone');
  }

  if (timeZone.includes('Warsaw')) {
    return getGeoProfileForCountry('PL', 'timezone');
  }

  if (timeZone.includes('Istanbul')) {
    return getGeoProfileForCountry('TR', 'timezone');
  }

  if (timeZone.includes('Sao_Paulo') || timeZone.includes('Fortaleza') || timeZone.includes('Recife') || timeZone.includes('Manaus')) {
    return getGeoProfileForCountry('BR', 'timezone');
  }

  if (timeZone.includes('Mexico') || timeZone.includes('Cancun') || timeZone.includes('Monterrey') || timeZone.includes('Tijuana')) {
    return getGeoProfileForCountry('MX', 'timezone');
  }

  // Canada Timezones
  if (
    timeZone.includes('Toronto') || 
    timeZone.includes('Vancouver') || 
    timeZone.includes('Montreal') || 
    timeZone.includes('Edmonton') || 
    timeZone.includes('Winnipeg') || 
    timeZone.includes('Halifax') || 
    timeZone.includes('St_Johns')
  ) {
    return getGeoProfileForCountry('CA', 'timezone');
  }

  // Australia Timezones
  if (
    timeZone.includes('Sydney') || 
    timeZone.includes('Melbourne') || 
    timeZone.includes('Brisbane') || 
    timeZone.includes('Perth') || 
    timeZone.includes('Adelaide') || 
    timeZone.includes('Hobart') || 
    timeZone.includes('Darwin')
  ) {
    return getGeoProfileForCountry('AU', 'timezone');
  }

  // Eurozone Timezones
  if (
    timeZone.includes('Berlin') || 
    timeZone.includes('Paris') || 
    timeZone.includes('Rome') || 
    timeZone.includes('Madrid') || 
    timeZone.includes('Amsterdam') || 
    timeZone.includes('Brussels') || 
    timeZone.includes('Vienna') || 
    timeZone.includes('Dublin') || 
    timeZone.includes('Helsinki') || 
    timeZone.includes('Lisbon') || 
    timeZone.includes('Athens')
  ) {
    return getGeoProfileForCountry('EU', 'timezone');
  }

  // US Timezones
  if (
    timeZone.includes('New_York') || 
    timeZone.includes('Chicago') || 
    timeZone.includes('Denver') || 
    timeZone.includes('Los_Angeles') || 
    timeZone.includes('Phoenix') || 
    timeZone.includes('Anchorage') || 
    timeZone.includes('Honolulu') || 
    timeZone.includes('Detroit') || 
    timeZone.includes('Boise') || 
    timeZone.includes('Indianapolis')
  ) {
    return getGeoProfileForCountry('US', 'timezone');
  }

  // 2. Navigator Locale fallback
  try {
    const navLangs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    for (const lang of navLangs) {
      const parts = lang.split(/[-_]/);
      if (parts.length > 1) {
        const countryCandidate = parts[1].toUpperCase();
        if (COUNTRY_CURRENCY_MAP[countryCandidate]) {
          return getGeoProfileForCountry(countryCandidate, 'locale');
        }
      }
    }
  } catch {
    // Ignore navigator errors
  }

  // Default to US Dollar
  return getGeoProfileForCountry('US', 'timezone');
}

/**
 * Asynchronous live IP-based geolocation lookup with fast timeout
 */
export async function fetchLiveGeoProfile(): Promise<GeoProfile | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2600);

  try {
    // Try api.country.is - fast, open-access, zero-config HTTPS API
    const res = await fetch('https://api.country.is', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.country === 'string') {
        const profile = getGeoProfileForCountry(data.country, 'ip');
        if (profile) return profile;
      }
    }
  } catch {
    // Attempt secondary fallback
  }

  // Fallback endpoint
  try {
    const fallbackController = new AbortController();
    const fallbackTimeout = setTimeout(() => fallbackController.abort(), 2000);
    const res = await fetch('https://freeipapi.com/api/json', { signal: fallbackController.signal });
    clearTimeout(fallbackTimeout);
    if (res.ok) {
      const data = await res.json();
      if (data && data.countryCode) {
        const profile = getGeoProfileForCountry(data.countryCode, 'ip');
        if (data.cityName) {
          profile.city = data.cityName;
        }
        return profile;
      }
    }
  } catch {
    // Silent fallback
  }

  return null;
}
