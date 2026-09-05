import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalization } from '../../context/LocalizationContext';
import { X, Check, Coins, Sparkles } from 'lucide-react';

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
    supportedCurrencies
  } = useLocalization();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
        padding: '1.25rem',
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
          maxWidth: '560px',
          maxHeight: '88vh',
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
            padding: '1.25rem 1.5rem',
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
              <span>Select Currency</span>
            </h2>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                margin: '0.2rem 0 0 0'
              }}
            >
              Choose calculation currency (auto-detected based on your location)
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

        {/* Auto-detected geography notification */}
        <div style={{ padding: '0.85rem 1.5rem 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.65rem 0.9rem',
              borderRadius: 'var(--md-sys-shape-md)',
              background: 'var(--md-sys-color-primary-container)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--md-sys-color-on-primary-container)'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{detectedGeo.flag}</span>
            <div style={{ flex: 1, lineHeight: 1.35 }}>
              <strong style={{ fontWeight: 700 }}>Location Detected: </strong>
              <span>
                {detectedGeo.countryName} · Auto-detected Currency: <strong>{detectedGeo.detectedCurrency}</strong>
              </span>
            </div>
            <Sparkles size={16} style={{ opacity: 0.75 }} />
          </div>
        </div>

        {/* Currency Grid */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            flex: 1,
            maxHeight: '420px'
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: '0.75rem',
              letterSpacing: '0.05em'
            }}
          >
            Choose Currency (10 Available)
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.65rem'
            }}
          >
            {supportedCurrencies.map(curr => {
              const isSelected = curr.code === currency;
              return (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrency(curr.code);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
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
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--surface-solid)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{curr.flag}</span>
                    <div>
                      <div
                        style={{
                          fontSize: '0.95rem',
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
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {curr.name}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--primary-600)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
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
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Active:{' '}
            <strong style={{ color: 'var(--primary-600)', fontWeight: 800 }}>
              {currentCurrency.flag} {currentCurrency.code} ({currentCurrency.symbol}) - {currentCurrency.name}
            </strong>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '0.55rem 1.4rem',
              fontSize: '0.875rem',
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
