import React, { useState } from 'react';
import { Moon, Sun, Search, ArrowLeft } from 'lucide-react';
import { CalculatorCategory } from '../../types/calculator';
import { Logo } from './Logo';
import { useLocalization } from '../../context/LocalizationContext';
import { LocaleSelector } from './LocaleSelector';

interface HeaderProps {
  currentTheme: 'light' | 'dark';
  currentPath?: string;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  activeCategory: CalculatorCategory;
  onSelectCategory: (cat: CalculatorCategory) => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  currentPath = '/',
  onToggleTheme,
  onOpenSearch,
  onNavigateHome
}) => {
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const { currentLanguage, currentCurrency, t } = useLocalization();
  const isInnerRoute = currentPath !== '/' && currentPath !== '';

  return (
    <header className="mobile-app-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'var(--header-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.65rem 1rem',
      transition: 'background-color 0.2s ease, border-color 0.2s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Left: Back Button (on inner pages) + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isInnerRoute && (
            <button
              onClick={onNavigateHome}
              className="native-back-btn"
              aria-label="Back to Home"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--surface-hover)',
                border: '1.5px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <Logo size="md" onClick={onNavigateHome} />
        </div>

        {/* Desktop Docked Search Bar (Hidden on mobile via CSS) */}
        <div className="desktop-search-bar" style={{ flex: '1', maxWidth: '520px' }}>
          <button
            onClick={onOpenSearch}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.55rem 1.15rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: 'var(--md-sys-shape-full)',
              background: 'var(--surface-solid)',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background-color 0.15s ease, border-color 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary-500)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Search size={16} color="var(--md-sys-color-primary)" />
              <span className="truncate">{t('search_placeholder')}</span>
            </div>
            <kbd style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '0.15rem 0.45rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons: Locale Picker + Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setIsLocaleOpen(true)}
            aria-label="Change Language and Currency"
            title="Change Language & Currency"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--md-sys-shape-full)',
              background: 'var(--surface-solid)',
              border: '1.5px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary-500)';
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.backgroundColor = 'var(--surface-solid)';
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{currentLanguage.flag}</span>
            <span>{currentLanguage.name}</span>
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>|</span>
            <span style={{ color: 'var(--primary-600)', fontWeight: 800 }}>{currentCurrency.symbol} {currentCurrency.code}</span>
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--md-sys-shape-full)',
              background: 'var(--md-sys-color-surface-container-low)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-high)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-low)';
            }}
          >
            {currentTheme === 'light' ? (
              <Moon size={17} color="var(--text-secondary)" />
            ) : (
              <Sun size={17} color="#f59e0b" />
            )}
          </button>
        </div>
      </div>

      <LocaleSelector isOpen={isLocaleOpen} onClose={() => setIsLocaleOpen(false)} />
    </header>
  );
};
