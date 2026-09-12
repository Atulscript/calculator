import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { CalculatorCategory } from '../../types/calculator';
import { Logo } from './Logo';
import { useLocalization } from '../../context/LocalizationContext';
import { LegalModal, LegalModalType } from './LegalModal';

interface FooterProps {
  onSelectCategory: (cat: CalculatorCategory) => void;
  onSelectCalculator?: (id: string) => void;
  onNavigate?: (path: string) => void;
}

type LegalLink = { type: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer'; label: string; short: string };

const LEGAL_LINKS: LegalLink[] = [
  { type: 'about', label: 'About Us', short: 'About' },
  { type: 'contact', label: 'Contact & Feedback', short: 'Contact' },
  { type: 'privacy', label: 'Privacy Policy', short: 'Privacy' },
  { type: 'terms', label: 'Terms of Service', short: 'Terms' },
  { type: 'disclaimer', label: 'Disclaimer', short: 'Disclaimer' }
];

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onNavigate }) => {
  const { t } = useLocalization();
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  const handleLegalClick = (e: React.MouseEvent, type: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer') => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/${type}`);
    } else {
      setActiveLegalModal(type);
    }
  };

  return (
    <footer className="site-footer" style={{
      background: 'var(--surface-solid)',
      borderTop: '1.5px solid var(--border-subtle)',
      color: 'var(--text-secondary)',
      marginTop: 'auto'
    }}>
      <div className="footer-grid" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        {/* Col 1: Brand, Mission & Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Logo size="md" showSubtitle={false} />
          </div>

          <p style={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '340px'
          }}>
            {t('footer_desc')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              color: 'var(--accent-emerald)',
              fontWeight: 600
            }}>
              <Shield size={15} />
              <span>{t('privacy_guarantee')}</span>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}>
              <CheckCircle2 size={15} color="var(--md-sys-color-primary)" />
              <span>{t('zero_tracking')}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Categories in 2 Columns */}
        <div className="footer-categories-col">
          <h4 style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}>
            <span>{t('categories')}</span>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--md-sys-shape-xs)',
              background: 'var(--surface-hover)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)'
            }}>
              8 Domains
            </span>
          </h4>

          {/* 2-Column Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(min(130px, 100%), 1fr))',
            gap: '0.5rem 1rem'
          }}>
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.825rem',
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  padding: '0.35rem 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--md-sys-color-primary)',
                  opacity: 0.7,
                  flexShrink: 0
                }} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Col 3: Mathematical Standards & Integrity */}
        <div>
          <h4 style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem'
          }}>
            {t('standards_title')}
          </h4>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>•</span>
              <span><strong>Gregorian Norms:</strong> Exact leap-year, month-day alignment, and timezone calibration.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>•</span>
              <span><strong>WHO Health Metrics:</strong> Clinical body mass and metabolic formulas.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>•</span>
              <span><strong>Amortization Physics:</strong> Global standard compound interest formulas.</span>
            </li>
          </ul>

          <div style={{ marginTop: '1.2rem' }}>
            <div className="glass-pill" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={13} color="var(--md-sys-color-primary)" />
              <span>{t('standards_accuracy')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Platform Meta */}
      <div className="footer-bottom-bar" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1.5px solid var(--border-subtle)',
        paddingTop: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: '0.825rem',
        color: 'var(--text-muted)'
      }}>
        <p>© 2026 Calculator11. {t('all_rights_reserved')}</p>

        <div className="footer-legal-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {LEGAL_LINKS.map(link => (
            <a
              key={link.type}
              href={`/${link.type}`}
              onClick={(e) => handleLegalClick(e, link.type)}
              className="footer-legal-link"
            >
              <span className="legal-label-full">{link.label}</span>
              <span className="legal-label-short">{link.short}</span>
            </a>
          ))}
        </div>
      </div>

      <LegalModal
        type={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
      />
    </footer>
  );
};
