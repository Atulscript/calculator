import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SUPPORTED_LANGUAGES, 
  LanguageInfo, 
  TranslationKey, 
  getLanguage, 
  getTranslation 
} from '../i18n/translations';
import { 
  SUPPORTED_CURRENCIES, 
  CurrencyInfo, 
  getCurrency, 
  formatCurrencyAmount 
} from '../data/currencies';
import { detectGeoProfile, GeoProfile } from '../utils/geoDetect';

interface LocalizationContextType {
  language: string;
  currentLanguage: LanguageInfo;
  setLanguage: (lang: string) => void;
  currency: string;
  currentCurrency: CurrencyInfo;
  setCurrency: (curr: string) => void;
  t: (key: TranslationKey) => string;
  formatMoney: (amount: number) => string;
  detectedGeo: GeoProfile;
  supportedLanguages: LanguageInfo[];
  supportedCurrencies: CurrencyInfo[];
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'calc360_language';
const STORAGE_CURR_KEY = 'calc360_currency';

export function getCurrencyForLanguage(langCode: string, detectedGeo?: GeoProfile): string {
  switch (langCode.toLowerCase()) {
    case 'hi':
      return 'INR';
    case 'ja':
      return 'JPY';
    case 'zh':
      return 'CNY';
    case 'de':
      return 'EUR';
    case 'fr':
      return 'EUR';
    case 'es':
      return 'EUR';
    case 'pt':
      return 'BRL';
    case 'ar':
      return 'AED';
    case 'en':
      // For English, use the location-based currency
      return detectedGeo?.detectedCurrency || 'USD';
    default:
      return detectedGeo?.detectedCurrency || 'USD';
  }
}

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedGeo] = useState<GeoProfile>(() => detectGeoProfile());

  // Language is strictly English across the entire application as requested
  const language = 'en';

  const [currency, setCurrencyState] = useState<string>(() => {
    // Purge any legacy saved language to avoid persistent Hindi/other languages
    try {
      localStorage.removeItem(STORAGE_LANG_KEY);
    } catch {
      // Ignore storage errors
    }

    const saved = localStorage.getItem(STORAGE_CURR_KEY);
    if (saved && SUPPORTED_CURRENCIES.some(c => c.code === saved)) {
      return saved;
    }
    return detectedGeo.detectedCurrency;
  });

  const currentLanguage = getLanguage('en');
  const currentCurrency = getCurrency(currency);

  const setLanguage = (_newLang: string) => {
    // Front-end language selection has been removed, app strictly stays in English
  };

  const setCurrency = (newCurr: string) => {
    if (SUPPORTED_CURRENCIES.some(c => c.code === newCurr)) {
      setCurrencyState(newCurr);
      try {
        localStorage.setItem(STORAGE_CURR_KEY, newCurr);
      } catch {
        // Ignore storage errors
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const t = (key: TranslationKey): string => {
    return getTranslation('en', key);
  };

  const formatMoney = (amount: number): string => {
    return formatCurrencyAmount(amount, currency);
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        currentLanguage,
        setLanguage,
        currency,
        currentCurrency,
        setCurrency,
        t,
        formatMoney,
        detectedGeo,
        supportedLanguages: SUPPORTED_LANGUAGES,
        supportedCurrencies: SUPPORTED_CURRENCIES
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export function useLocalization(): LocalizationContextType {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}
