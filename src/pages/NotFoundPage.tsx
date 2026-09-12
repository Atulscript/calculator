import React from 'react';
import { Search, Home, ArrowRight, HelpCircle } from 'lucide-react';
import { usePageSeo } from '../hooks/usePageSeo';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenSearch }) => {
  usePageSeo({
    title: '404 – Page Not Found | Calculator11',
    description: 'The calculator or page you requested could not be found. Search 150+ free online calculators on Calculator11.',
    keywords: ['404', 'not found', 'calculator11', 'calculators search'],
    canonicalPath: '/404'
  });

  const popularTools = [
    { title: 'Mortgage Calculator', path: '/mortgage-calculator', desc: 'Monthly payment, PITI & PMI' },
    { title: 'Loan EMI Calculator', path: '/loan-calculator', desc: 'Interest, tenure & amortization' },
    { title: 'SIP Calculator', path: '/sip-calculator', desc: 'Mutual fund compound returns' },
    { title: 'BMI Calculator', path: '/bmi-calculator', desc: 'Healthy weight & WHO categories' },
    { title: 'Age Calculator', path: '/age-calculator', desc: 'Exact age in years, months, days' },
    { title: 'Percentage Calculator', path: '/percentage-calculator', desc: 'Discounts, markups & changes' }
  ];

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '4rem 1.5rem 5rem',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--md-sys-color-primary-container)',
        color: 'var(--md-sys-color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        fontSize: '1.75rem',
        fontWeight: 800
      }}>
        404
      </div>

      <h1 style={{
        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: '0.75rem',
        letterSpacing: '-0.02em'
      }}>
        Calculator Not Found
      </h1>

      <p style={{
        fontSize: '1.025rem',
        color: 'var(--text-secondary)',
        maxWidth: '560px',
        margin: '0 auto 2rem',
        lineHeight: 1.6
      }}>
        We couldn't find the tool or page you're looking for. It may have been moved or there might be a typo in the link.
      </p>

      <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onOpenSearch}
          className="btn-primary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.925rem', gap: '0.5rem' }}
        >
          <Search size={17} />
          <span>Search 150+ Calculators</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="btn-secondary"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.925rem', gap: '0.5rem' }}
        >
          <Home size={17} />
          <span>Go to Homepage</span>
        </button>
      </div>

      {/* Popular Suggestions */}
      <div style={{ textAlign: 'left' }}>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <HelpCircle size={18} color="var(--primary-600)" />
          <span>Or try one of our popular calculators:</span>
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '1rem'
        }}>
          {popularTools.map(tool => (
            <button
              key={tool.path}
              type="button"
              onClick={() => onNavigate(tool.path)}
              className="m3-card-filled"
              style={{
                padding: '1.2rem',
                borderRadius: 'var(--md-sys-shape-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--surface-solid)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {tool.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {tool.desc}
                </div>
              </div>
              <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--primary-600)', fontWeight: 700 }}>
                <span>Open Calculator</span>
                <ArrowRight size={13} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
