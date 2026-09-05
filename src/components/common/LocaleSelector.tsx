import React, { useState, useEffect } from 'react';
import { useLocalization } from '../../context/LocalizationContext';

interface LocaleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'language' | 'currency';
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({
  isOpen,
  onClose,
  initialTab = 'language'
}) => {
  const {
    language,
    currentLanguage,
    setLanguage,
    currency,
    currentCurrency,
    setCurrency,
    t,
    detectedGeo,
    supportedLanguages,
    supportedCurrencies
  } = useLocalization();

  const [activeTab, setActiveTab] = useState<'language' | 'currency'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click handler */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="locale-modal-title"
        className="relative w-full max-w-lg bg-surface border border-outline-variant/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-scale-in"
      >
        {/* Header */}
        <div className="p-5 pb-3 border-b border-outline-variant/15 flex items-center justify-between">
          <div>
            <h2 id="locale-modal-title" className="text-xl font-bold text-on-surface flex items-center gap-2">
              <span className="text-2xl">🌐</span>
              <span>{activeTab === 'language' ? t('select_language') : t('select_currency')}</span>
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Customize language preferences and regional currency
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-surface-variant/30 hover:bg-surface-variant/60 text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Auto-detected Geography Pill */}
        <div className="px-5 pt-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
            <span className="text-sm">{detectedGeo.flag}</span>
            <div className="flex-1">
              <span className="font-semibold">{t('auto_detected')}:</span>{' '}
              <span>{detectedGeo.countryName} ({detectedGeo.detectedCurrency} · {detectedGeo.detectedLanguage.toUpperCase()})</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3">
          <div className="flex p-1 bg-surface-variant/30 rounded-2xl border border-outline-variant/20">
            <button
              onClick={() => setActiveTab('language')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'language'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{currentLanguage.flag}</span>
              <span>{t('select_language')}</span>
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'currency'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{currentCurrency.symbol}</span>
              <span>{t('select_currency')}</span>
            </button>
          </div>
        </div>

        {/* Tab Content List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-2">
          {activeTab === 'language' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {supportedLanguages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-primary/15 border-primary text-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low/60 hover:bg-surface-variant/30 border-outline-variant/20 text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <div className="text-sm font-medium">{lang.nativeName}</div>
                        <div className="text-xs text-on-surface-variant">{lang.name}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {supportedCurrencies.map((curr) => {
                const isSelected = curr.code === currency;
                return (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-primary/15 border-primary text-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low/60 hover:bg-surface-variant/30 border-outline-variant/20 text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{curr.flag}</span>
                      <div>
                        <div className="text-sm font-medium flex items-center gap-1.5">
                          <span className="font-mono font-bold text-primary">{curr.symbol}</span>
                          <span>{curr.code}</span>
                        </div>
                        <div className="text-xs text-on-surface-variant">{curr.name}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-surface-container-low/40 border-t border-outline-variant/15 flex items-center justify-between text-xs text-on-surface-variant">
          <span>Active: {currentLanguage.nativeName} · {currentCurrency.code} ({currentCurrency.symbol})</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-on-primary font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
