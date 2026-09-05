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

  // Location mapping:
  // - Language is ALWAYS strictly 'en' (English) by default for all geographies worldwide.
  // - Currency is automatically detected based on the user's location.

  if (timeZone.includes('Kolkata') || timeZone.includes('Calcutta') || timeZone.includes('India')) {
    return {
      countryCode: 'IN',
      countryName: 'India',
      detectedLanguage: 'en',
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
      detectedLanguage: 'en',
      detectedCurrency: 'EUR',
      flag: '🇩🇪'
    };
  }

  if (timeZone.includes('Paris') || timeZone.includes('Brussels')) {
    return {
      countryCode: 'FR',
      countryName: 'France / Europe',
      detectedLanguage: 'en',
      detectedCurrency: 'EUR',
      flag: '🇫🇷'
    };
  }

  if (timeZone.includes('Madrid')) {
    return {
      countryCode: 'ES',
      countryName: 'Spain / Europe',
      detectedLanguage: 'en',
      detectedCurrency: 'EUR',
      flag: '🇪🇸'
    };
  }

  if (timeZone.includes('Rome') || timeZone.includes('Amsterdam') || timeZone.includes('Europe')) {
    return {
      countryCode: 'EU',
      countryName: 'European Union',
      detectedLanguage: 'en',
      detectedCurrency: 'EUR',
      flag: '🇪🇺'
    };
  }

  if (timeZone.includes('Tokyo')) {
    return {
      countryCode: 'JP',
      countryName: 'Japan',
      detectedLanguage: 'en',
      detectedCurrency: 'JPY',
      flag: '🇯🇵'
    };
  }

  if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Hong_Kong') || timeZone.includes('Taipei')) {
    return {
      countryCode: 'CN',
      countryName: 'China',
      detectedLanguage: 'en',
      detectedCurrency: 'CNY',
      flag: '🇨🇳'
    };
  }

  if (timeZone.includes('Sao_Paulo') || timeZone.includes('Brazil')) {
    return {
      countryCode: 'BR',
      countryName: 'Brazil',
      detectedLanguage: 'en',
      detectedCurrency: 'BRL',
      flag: '🇧🇷'
    };
  }

  if (timeZone.includes('Dubai') || timeZone.includes('Riyadh') || timeZone.includes('Cairo') || timeZone.includes('Qatar')) {
    return {
      countryCode: 'AE',
      countryName: 'United Arab Emirates',
      detectedLanguage: 'en',
      detectedCurrency: 'AED',
      flag: '🇦🇪'
    };
  }

  if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || timeZone.includes('Montreal')) {
    return {
      countryCode: 'CA',
      countryName: 'Canada',
      detectedLanguage: 'en',
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
      detectedLanguage: 'en',
      detectedCurrency: 'USD',
      flag: '🌎'
    };
  }

  // Default North America / General US
  return {
    countryCode: 'US',
    countryName: 'United States',
    detectedLanguage: 'en',
    detectedCurrency: 'USD',
    flag: '🇺🇸'
  };
}
