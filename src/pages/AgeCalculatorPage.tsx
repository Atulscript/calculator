import React, { useEffect } from 'react';
import { AgeCalculator } from '../components/calculators/age/AgeCalculator';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { CalendarRange, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface AgeCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const AgeCalculatorPage: React.FC<AgeCalculatorPageProps> = ({ onNavigate }) => {
  const currentCalc = CALCULATORS_REGISTRY.find(c => c.id === 'age-calculator');
  const relatedCalcs = CALCULATORS_REGISTRY.filter(c => c.id !== 'age-calculator' && c.category === 'everyday');

  // Dynamic World-Class SEO title and meta description
  useEffect(() => {
    document.title = 'Age Calculator - Calculate Exact Chronological Age Online';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free online Age Calculator. Calculate your exact chronological age in years, months, weeks, days, hours, and seconds with live ticking, next birthday countdown, and zodiac signs.'
      );
    }
  }, []);

  // WebApplication Structured Data for Google Rich Snippets
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Calculator360 Age Calculator',
    'url': `${window.location.origin}/age-calculator`,
    'description': 'Free online tool to calculate exact age in years, months, days, minutes, and seconds from Date of Birth.',
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': window.location.origin
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Everyday Calculators',
        'item': `${window.location.origin}/#everyday`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Age Calculator',
        'item': `${window.location.origin}/age-calculator`
      }
    ]
  };

  return (
    <div>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Top Breadcrumbs */}
      <Breadcrumbs
        currentCalculator={currentCalc}
        onHomeClick={() => onNavigate('/')}
      />

      {/* Top Monetization: Responsive Leaderboard Banner Ad */}
      <AdBanner slotType="leaderboard" />

      {/* 2-Column Professional Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }} className="calculator-layout-grid">
        {/* Main Left Column (Calculator Engine & Results) */}
        <div style={{ minWidth: 0 }}>
          <AgeCalculator />
        </div>

        {/* Right Sticky Sidebar (Ads + Quick Navigation + Related Tools) */}
        <aside style={{ minWidth: 0 }} className="calculator-sidebar">
          {/* Sidebar Ad Unit (300x250 Rectangle) */}
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>

          {/* Related Everyday Calculators Widget */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <h3 style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}>
              <CalendarRange size={16} color="var(--primary-500)" />
              <span>Related Calculators</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {relatedCalcs.map(calc => (
                <div
                  key={calc.id}
                  onClick={() => onNavigate(`/${calc.slug}`)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary-500)';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {calc.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {calc.category}
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--primary-500)" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts Box */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-500)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Info size={15} />
              <span>Calendrical Facts</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={13} color="var(--primary-500)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span>An average Gregorian year has exactly 365.2425 days.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={13} color="var(--primary-500)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span>Feb 29 only occurs 97 times in every 400-year cycle.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={13} color="var(--primary-500)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                <span>10,000 days of life is reached around age 27 and 4 months!</span>
              </li>
            </ul>
          </div>

          {/* Sticky Skyscraper Ad Unit (300x600) */}
          <div className="glass-panel" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="skyscraper" />
          </div>
        </aside>
      </div>

      {/* Bottom Leaderboard Ad Banner */}
      <AdBanner slotType="leaderboard" />
    </div>
  );
};
