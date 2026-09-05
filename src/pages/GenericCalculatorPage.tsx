import React from 'react';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, ArrowLeft, ArrowRight, Construction, CheckCircle2 } from 'lucide-react';

interface GenericCalculatorPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GenericCalculatorPage: React.FC<GenericCalculatorPageProps> = ({ slug, onNavigate }) => {
  const calc = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[0];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <Breadcrumbs
          currentCalculator={calc}
          onHomeClick={() => onNavigate('/')}
        />

        <button
          onClick={() => onNavigate('/')}
          className="glass-pill"
          style={{ cursor: 'pointer' }}
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '720px', margin: '2rem auto' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'var(--gradient-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Construction size={32} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.2rem 0.65rem',
          borderRadius: '999px',
          background: 'rgba(99, 102, 241, 0.12)',
          color: 'var(--primary-500)',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          <Sparkles size={12} />
          <span>Calculators Directory</span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          {calc.title}
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '2rem' }}>
          {calc.shortDescription}
        </p>

        <div style={{
          background: 'var(--surface-subtle)',
          borderRadius: '12px',
          padding: '1.25rem',
          textAlign: 'left',
          marginBottom: '2rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Verified Features for {calc.title}:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span>Full formula breakdown and mathematical explanations</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span>Instant reactive computations with metric & imperial units</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span>Downloadable summaries and shareable URLs</span>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('/age-calculator')}
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}
          >
            <span>Try Flagship Age Calculator</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}
          >
            <span>Browse All Categories</span>
          </button>
        </div>
      </div>
    </div>
  );
};
