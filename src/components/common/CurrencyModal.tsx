import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLocalization } from '../../context/LocalizationContext';
import { X, Check, Coins, Sparkles, RefreshCw, Search, Globe } from 'lucide-react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    currency,
    currentCurrency,
    setCurrency,
    detectedGeo,
    supportedCurrencies,
    isAutoLocation,
    resetToAutoLocation,
    refreshLocation,
    simulateLocation
  } = useLocalization();

  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleRefreshLocation = async () => {
    setIsRefreshing(true);
    setStatusMessage('Detecting location via IP & GPS...');
    try {
      await refreshLocation();
      setStatusMessage(`Detected location: ${detectedGeo.countryName} (${detectedGeo.detectedCurrency})`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      setStatusMessage('Location refreshed.');
      setTimeout(() => setStatusMessage(null), 2500);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return supportedCurrencies;
    return supportedCurrencies.filter(c => 
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      (c.countryName && c.countryName.toLowerCase().includes(query)) ||
      (c.countryCode && c.countryCode.toLowerCase().includes(query)) ||
      c.symbol.toLowerCase().includes(query)
    );
  }, [searchQuery, supportedCurrencies]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="currency-modal-title"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          background: 'var(--surface-solid)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: 'var(--md-sys-shape-xl)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.2rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--surface-subtle)'
          }}
        >
          <div>
            <h2
              id="currency-modal-title"
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Coins size={22} color="var(--md-sys-color-primary)" />
              <span>Location & Currency</span>
            </h2>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                margin: '0.2rem 0 0 0'
              }}
            >
              Calculators automatically adapt currency based on your location
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-subtle)',
              background: 'var(--surface-solid)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-solid)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Location Detection Banner / Control Card */}
        <div style={{ padding: '1rem 1.5rem 0.5rem' }}>
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--md-sys-shape-md)',
              background: isAutoLocation 
                ? 'var(--md-sys-color-primary-container)' 
                : 'var(--surface-subtle)',
              border: `1.5px solid ${isAutoLocation ? 'var(--primary-500)' : 'var(--border-subtle)'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{detectedGeo.flag}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {detectedGeo.countryName}
                    </strong>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        background: isAutoLocation ? 'color-mix(in srgb, var(--accent-emerald) 20%, transparent)' : 'var(--surface-hover)',
                        color: isAutoLocation ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      {isAutoLocation ? '● Auto-Location Active' : 'Manual Override'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Local Currency: <strong>{detectedGeo.detectedCurrency}</strong> ({detectedGeo.source ? `detected via ${detectedGeo.source}` : 'auto-detected'})
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={handleRefreshLocation}
                  disabled={isRefreshing}
                  title="Refresh location via IP/GPS"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--md-sys-shape-full)',
                    background: 'var(--surface-solid)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <RefreshCw size={13} className={isRefreshing ? 'spin' : ''} />
                  <span>{isRefreshing ? 'Detecting...' : 'Detect Location'}</span>
                </button>

                {!isAutoLocation && (
                  <button
                    onClick={resetToAutoLocation}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--md-sys-shape-full)',
                      background: 'var(--primary-600)',
                      color: 'var(--md-sys-color-on-primary)',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={13} />
                    <span>Reset to Auto</span>
                  </button>
                )}
              </div>
            </div>

            {statusMessage && (
              <div
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  background: 'var(--surface-solid)',
                  color: 'var(--primary-600)',
                  fontWeight: 600
                }}
              >
                {statusMessage}
              </div>
            )}

            {/* Quick Country Simulator / Location Tester */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '0.65rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}
            >
              <Globe size={14} style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 600, flexShrink: 0 }}>Test Location:</span>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {[
                  { code: 'US', label: '🇺🇸 US' },
                  { code: 'IN', label: '🇮🇳 India' },
                  { code: 'GB', label: '🇬🇧 UK' },
                  { code: 'DE', label: '🇪🇺 Europe' },
                  { code: 'CA', label: '🇨🇦 Canada' },
                  { code: 'AU', label: '🇦🇺 Australia' },
                  { code: 'AE', label: '🇦🇪 UAE' },
                  { code: 'SG', label: '🇸🇬 Singapore' },
                  { code: 'JP', label: '🇯🇵 Japan' }
                ].map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      simulateLocation(item.code);
                      setStatusMessage(`Switched location to ${item.label}`);
                      setTimeout(() => setStatusMessage(null), 2500);
                    }}
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: detectedGeo.countryCode === item.code ? 'var(--primary-600)' : 'var(--surface-solid)',
                      color: detectedGeo.countryCode === item.code ? '#ffffff' : 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Input Bar */}
        <div style={{ padding: '0.75rem 1.5rem 0' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.85rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Search by country, currency name or code (e.g. India, EUR, Pound, Yen)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem 0.6rem 2.4rem',
                borderRadius: 'var(--md-sys-shape-md)',
                border: '1.5px solid var(--border-subtle)',
                background: 'var(--surface-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Currency Grid */}
        <div
          style={{
            padding: '1rem 1.5rem',
            overflowY: 'auto',
            flex: 1,
            maxHeight: '380px'
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Available Currencies ({filteredCurrencies.length})</span>
            {searchQuery && (
              <span style={{ textTransform: 'none', fontWeight: 500 }}>
                Filtering: "{searchQuery}"
              </span>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
              gap: '0.65rem'
            }}
          >
            {filteredCurrencies.map(curr => {
              const isSelected = curr.code === currency;
              const isDetectedForLocation = curr.code === detectedGeo.detectedCurrency;

              return (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code, true);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.95rem',
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: isSelected
                      ? '2px solid var(--primary-600)'
                      : '1.5px solid var(--border-subtle)',
                    background: isSelected
                      ? 'var(--md-sys-color-primary-container)'
                      : 'var(--surface-solid)',
                    color: isSelected
                      ? 'var(--md-sys-color-on-primary-container)'
                      : 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-solid)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{curr.flag}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <span
                          style={{
                            color: isSelected ? 'var(--primary-600)' : 'var(--text-primary)',
                            fontWeight: 900
                          }}
                        >
                          {curr.symbol}
                        </span>
                        <span>{curr.code}</span>
                        {isDetectedForLocation && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              background: 'color-mix(in srgb, var(--accent-emerald) 20%, transparent)',
                              color: 'var(--accent-emerald)',
                              fontWeight: 700,
                              marginLeft: 'auto'
                            }}
                          >
                            LOCAL
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {curr.countryName ? `${curr.countryName} · ` : ''}{curr.name}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'var(--primary-600)',
                        color: 'var(--md-sys-color-on-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginLeft: '0.5rem'
                      }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '0.9rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Active Currency:{' '}
            <strong style={{ color: 'var(--primary-600)', fontWeight: 800 }}>
              {currentCurrency.flag} {currentCurrency.code} ({currentCurrency.symbol}) - {currentCurrency.name}
            </strong>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '0.5rem 1.3rem',
              fontSize: '0.85rem',
              fontWeight: 700
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
