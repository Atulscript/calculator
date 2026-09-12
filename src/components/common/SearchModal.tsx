import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Calculator } from 'lucide-react';
import { CALCULATORS_REGISTRY } from '../../data/calculators';
import { CalculatorMeta } from '../../types/calculator';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = CALCULATORS_REGISTRY.filter(calc => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      calc.title.toLowerCase().includes(q) ||
      calc.shortDescription.toLowerCase().includes(q) ||
      calc.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className="search-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4rem 1rem 2rem'
      }}
    >
      <div 
        className="glass-panel search-modal-panel"
        style={{
          width: '100%',
          maxWidth: '640px',
          background: 'var(--surface-solid)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          animation: 'float-subtle 0.2s ease-out'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <Search size={20} color="var(--primary-500)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search calculators by name, keyword, or formula..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-primary)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '0.75rem'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            padding: '0.35rem 0.6rem 0.5rem'
          }}>
            {query ? `Matching Calculators (${filtered.length})` : 'Popular & Flagship Calculators'}
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2.5rem 1rem',
              color: 'var(--text-muted)'
            }}>
              <Calculator size={36} strokeWidth={1.5} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>No calculators found for "{query}"</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.35rem', marginBottom: '1.25rem' }}>Try one of our popular flagship calculators instead:</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', maxWidth: '380px', margin: '0 auto' }}>
                {[
                  { label: '📅 Age Calculator', id: 'age-calculator' },
                  { label: '🏠 Mortgage', id: 'mortgage-calculator' },
                  { label: '⚖️ BMI Calculator', id: 'bmi-calculator' },
                  { label: '📈 SIP Calculator', id: 'sip-calculator' },
                  { label: '🔥 Calorie Counter', id: 'calorie-calculator' },
                  { label: '% Percentage', id: 'percentage-calculator' }
                ].map(chip => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      onSelectCalculator(chip.id);
                      onClose();
                    }}
                    style={{
                      background: 'var(--surface-hover)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '0.4rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--primary-500)';
                      e.currentTarget.style.background = 'var(--primary-glow)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'var(--surface-hover)';
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            filtered.map((calc: CalculatorMeta) => (
              <div
                key={calc.id}
                onClick={() => {
                  onSelectCalculator(calc.id);
                  onClose();
                }}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  marginBottom: '0.45rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--surface-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-500)'
                  }}>
                    <Calculator size={18} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {calc.title}
                      </span>
                      {calc.badge && (
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                          background: 'var(--surface-hover)',
                          color: 'var(--text-secondary)'
                        }}>
                          {calc.badge}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.3,
                      marginTop: '0.15rem',
                      maxWidth: '450px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {calc.shortDescription}
                    </p>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text-muted)" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
