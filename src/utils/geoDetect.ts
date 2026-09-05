export interface GeoProfile {
  countryCode: string;
  countryName: string;
  detectedLanguage: string;
  detectedCurrency: string;
  flag: string;
}

export function detectGeoProfile(): GeoProfile {
  let timeZone = 'UTC';
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    timeZone = 'UTC';
  }

  const navLang = (typeof navigator !== 'undefined' && (navigator.language || (navigator.languages && navigator.languages[0]))) || 'en';
  const cleanLang = navLang.toLowerCase().slice(0, 2);

  // Timezone to Country & Currency mapping
  if (timeZone.includes('Kolkata') || timeZone.includes('Calcutta') || timeZone.includes('India')) {
    return {
      countryCode: 'IN',
      countryName: 'India',
      detectedLanguage: cleanLang === 'hi' ? 'hi' : 'en',
      detectedCurrency: 'INR',
      flag: '🇮🇳'
    };
  }

  if (timeZone.includes('London')) {
    return {
      countryCode: 'GB',
      countryName: 'United Kingdom',
      detectedLanguage: 'en',
      detectedCurrency: 'GBP',
      flag: '🇬🇧'
    };
  }

  if (timeZone.includes('Berlin') || timeZone.includes('Vienna') || timeZone.includes('Zurich')) {
    return {
      countryCode: 'DE',
      countryName: 'Germany / Europe',
      detectedLanguage: cleanLang === 'de' ? 'de' : 'en',
      detectedCurrency: 'EUR',
      flag: '🇩🇪'
    };
  }

  if (timeZone.includes('Paris') || timeZone.includes('Brussels')) {
    return {
      countryCode: 'FR',
      countryName: 'France / Europe',
      detectedLanguage: cleanLang === 'fr' ? 'fr' : 'en',
      detectedCurrency: 'EUR',
      flag: '🇫🇷'
    };
  }

  if (timeZone.includes('Madrid')) {
    return {
      countryCode: 'ES',
      countryName: 'Spain / Europe',
      detectedLanguage: cleanLang === 'es' ? 'es' : 'en',
      detectedCurrency: 'EUR',
      flag: '🇪🇸'
    };
  }

  if (timeZone.includes('Rome') || timeZone.includes('Amsterdam') || timeZone.includes('Europe')) {
    return {
      countryCode: 'EU',
      countryName: 'European Union',
      detectedLanguage: cleanLang === 'es' ? 'es' : cleanLang === 'fr' ? 'fr' : cleanLang === 'de' ? 'de' : 'en',
      detectedCurrency: 'EUR',
      flag: '🇪🇺'
    };
  }

  if (timeZone.includes('Tokyo')) {
    return {
      countryCode: 'JP',
      countryName: 'Japan',
      detectedLanguage: 'ja',
      detectedCurrency: 'JPY',
      flag: '🇯🇵'
    };
  }

  if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Hong_Kong') || timeZone.includes('Taipei')) {
    return {
      countryCode: 'CN',
      countryName: 'China',
      detectedLanguage: 'zh',
      detectedCurrency: 'CNY',
      flag: '🇨🇳'
    };
  }

  if (timeZone.includes('Sao_Paulo') || timeZone.includes('Brazil')) {
    return {
      countryCode: 'BR',
      countryName: 'Brazil',
      detectedLanguage: 'pt',
      detectedCurrency: 'BRL',
      flag: '🇧🇷'
    };
  }

  if (timeZone.includes('Dubai') || timeZone.includes('Riyadh') || timeZone.includes('Cairo') || timeZone.includes('Qatar')) {
    return {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      detectedLanguage: cleanLang === 'ar' ? 'ar' : 'en',
      detectedCurrency: 'AED',
      flag: '🇦🇪'
    };
  }

  if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || timeZone.includes('Montreal')) {
    return {
      countryCode: 'CA',
      countryName: 'Canada',
      detectedLanguage: cleanLang === 'fr' ? 'fr' : 'en',
      detectedCurrency: 'CAD',
      flag: '🇨🇦'
    };
  }

  if (timeZone.includes('Sydney') || timeZone.includes('Melbourne') || timeZone.includes('Brisbane')) {
    return {
      countryCode: 'AU',
      countryName: 'Australia',
      detectedLanguage: 'en',
      detectedCurrency: 'AUD',
      flag: '🇦🇺'
    };
  }

  if (timeZone.includes('Mexico') || timeZone.includes('Bogota') || timeZone.includes('Buenos_Aires') || timeZone.includes('Santiago')) {
    return {
      countryCode: 'LATAM',
      countryName: 'Latin America',
      detectedLanguage: 'es',
      detectedCurrency: 'USD',
      flag: '🌎'
    };
  }

  // Default North America / General US
  return {
    countryCode: 'US',
    countryName: 'United States',
    detectedLanguage: cleanLang === 'es' ? 'es' : 'en',
    detectedCurrency: 'USD',
    flag: '🇺🇸'
  };
}
