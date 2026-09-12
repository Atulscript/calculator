import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { 
  detectGeoProfile, 
  fetchLiveGeoProfile, 
  getGeoProfileForCountry, 
  GeoProfile 
} from '../utils/geoDetect';

interface LocalizationContextType {
  language: string;
  currentLanguage: LanguageInfo;
  setLanguage: (lang: string) => void;
  currency: string;
  currentCurrency: CurrencyInfo;
  setCurrency: (curr: string, isManual?: boolean) => void;
  isAutoLocation: boolean;
  resetToAutoLocation: () => void;
  refreshLocation: () => Promise<void>;
  simulateLocation: (countryCode: string) => void;
  t: (key: TranslationKey) => string;
  formatMoney: (amount: number) => string;
  detectedGeo: GeoProfile;
  supportedLanguages: LanguageInfo[];
  supportedCurrencies: CurrencyInfo[];
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'calc360_language';
const STORAGE_CURR_KEY = 'calc360_currency';
const STORAGE_CURR_MODE_KEY = 'calc360_currency_mode'; // 'auto' | 'manual'

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
      return detectedGeo?.detectedCurrency || 'USD';
    default:
      return detectedGeo?.detectedCurrency || 'USD';
  }
}

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detectedGeo, setDetectedGeo] = useState<GeoProfile>(() => detectGeoProfile());

  // Language is strictly English across the entire application
  const language = 'en';

  const [isAutoLocation, setIsAutoLocation] = useState<boolean>(() => {
    try {
      const mode = localStorage.getItem(STORAGE_CURR_MODE_KEY);
      return mode !== 'manual';
    } catch {
      return true;
    }
  });

  const [currency, setCurrencyState] = useState<string>(() => {
    // Purge any legacy saved language to avoid persistent Hindi/other languages
    try {
      localStorage.removeItem(STORAGE_LANG_KEY);
    } catch {
      // Ignore storage errors
    }

    try {
      const mode = localStorage.getItem(STORAGE_CURR_MODE_KEY);
      if (mode === 'manual') {
        const saved = localStorage.getItem(STORAGE_CURR_KEY);
        if (saved && SUPPORTED_CURRENCIES.some(c => c.code === saved)) {
          return saved;
        }
      }
    } catch {
      // Ignore storage errors
    }

    return detectedGeo.detectedCurrency;
  });

  const currentLanguage = getLanguage('en');
  const currentCurrency = getCurrency(currency);

  const setLanguage = (_newLang: string) => {
    // Front-end language selection has been removed, app strictly stays in English
  };

  const setCurrency = (newCurr: string, isManual: boolean = true) => {
    if (SUPPORTED_CURRENCIES.some(c => c.code === newCurr)) {
      setCurrencyState(newCurr);
      if (isManual) {
        setIsAutoLocation(false);
        try {
          localStorage.setItem(STORAGE_CURR_KEY, newCurr);
          localStorage.setItem(STORAGE_CURR_MODE_KEY, 'manual');
        } catch {
          // Ignore storage errors
        }
      }
    }
  };

  const resetToAutoLocation = useCallback(() => {
    setIsAutoLocation(true);
    setCurrencyState(detectedGeo.detectedCurrency);
    try {
      localStorage.setItem(STORAGE_CURR_KEY, detectedGeo.detectedCurrency);
      localStorage.setItem(STORAGE_CURR_MODE_KEY, 'auto');
    } catch {
      // Ignore storage errors
    }
  }, [detectedGeo]);

  const simulateLocation = useCallback((countryCode: string) => {
    const newGeo = getGeoProfileForCountry(countryCode, 'manual');
    setDetectedGeo(newGeo);
    setCurrencyState(newGeo.detectedCurrency);
    setIsAutoLocation(true);
    try {
      localStorage.setItem(STORAGE_CURR_KEY, newGeo.detectedCurrency);
      localStorage.setItem(STORAGE_CURR_MODE_KEY, 'auto');
    } catch {
      // Ignore storage errors
    }
  }, []);

  const refreshLocation = useCallback(async () => {
    try {
      const liveGeo = await fetchLiveGeoProfile();
      if (liveGeo) {
        setDetectedGeo(liveGeo);
        if (isAutoLocation) {
          setCurrencyState(liveGeo.detectedCurrency);
          try {
            localStorage.setItem(STORAGE_CURR_KEY, liveGeo.detectedCurrency);
          } catch {
            // Ignore
          }
        }
      }
    } catch {
      // Fallback
    }
  }, [isAutoLocation]);

  // On initial mount, perform async IP-based detection to ensure location accuracy
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';

    let isMounted = true;
    fetchLiveGeoProfile().then(liveGeo => {
      if (isMounted && liveGeo) {
        setDetectedGeo(liveGeo);
        // If user hasn't explicitly set a manual currency lock, update to live detected currency
        const mode = localStorage.getItem(STORAGE_CURR_MODE_KEY);
        if (mode !== 'manual') {
          setCurrencyState(liveGeo.detectedCurrency);
          try {
            localStorage.setItem(STORAGE_CURR_KEY, liveGeo.detectedCurrency);
          } catch {
            // Ignore
          }
        }
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
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
        isAutoLocation,
        resetToAutoLocation,
        refreshLocation,
        simulateLocation,
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
