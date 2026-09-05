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

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedGeo] = useState<GeoProfile>(() => detectGeoProfile());

  const [language, setLanguageState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved;
    }
    return detectedGeo.detectedLanguage;
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_CURR_KEY);
    if (saved && SUPPORTED_CURRENCIES.some(c => c.code === saved)) {
      return saved;
    }
    return detectedGeo.detectedCurrency;
  });

  const currentLanguage = getLanguage(language);
  const currentCurrency = getCurrency(currency);

  const setLanguage = (newLang: string) => {
    if (SUPPORTED_LANGUAGES.some(l => l.code === newLang)) {
      setLanguageState(newLang);
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
    }
  };

  const setCurrency = (newCurr: string) => {
    if (SUPPORTED_CURRENCIES.some(c => c.code === newCurr)) {
      setCurrencyState(newCurr);
      localStorage.setItem(STORAGE_CURR_KEY, newCurr);
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage.code;
    document.documentElement.dir = currentLanguage.dir;
  }, [currentLanguage]);

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
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
