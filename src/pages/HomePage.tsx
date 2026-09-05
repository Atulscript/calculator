import React, { useState, useEffect } from 'react';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import { CalculatorCategory } from '../types/calculator';
import { CalculatorCard } from '../components/common/CalculatorCard';
import { AdBanner } from '../components/common/AdBanner';
import { useLocalization } from '../context/LocalizationContext';
import {
  Search,
  Layers,
  HeartPulse,
  CircleDollarSign,
  Calculator,
  ArrowRightLeft,
  Atom,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  UtensilsCrossed,
  HardHat
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const { t } = useLocalization();
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Calculator360 - Free Online Calculators for Everyday Life, Health, Finance & Math';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculator360 provides clean, free online calculators for exact age, BMI, loan EMI, percentages, food scaling, construction, and everyday problem solving. Built with Google Material Design principles.'
      );
    }
  }, []);

  const getCategoryTheme = (id: CalculatorCategory) => {
    switch (id) {
      case 'everyday':
        return { icon: <Sparkles size={22} color="#0b57d0" />, bg: '#d3e3fd' };
      case 'health':
        return { icon: <HeartPulse size={22} color="#b3261e" />, bg: '#f9dedc' };
      case 'finance':
        return { icon: <CircleDollarSign size={22} color="#146c2e" />, bg: '#c4eed0' };
      case 'math':
        return { icon: <Calculator size={22} color="#00639b" />, bg: '#c2e7ff' };
      case 'conversion':
        return { icon: <ArrowRightLeft size={22} color="#9a4a00" />, bg: '#ffddb8' };
      case 'science':
        return { icon: <Atom size={22} color="#6750a4" />, bg: '#eaddff' };
      case 'food':
        return { icon: <UtensilsCrossed size={22} color="#b05800" />, bg: '#ffdcbe' };
      case 'construction':
        return { icon: <HardHat size={22} color="#435e91" />, bg: '#d8e2ff' };
      default:
        return { icon: <Layers size={22} color="#0b57d0" />, bg: '#d3e3fd' };
    }
  };

  // Filter calculators based on search or category
  const filteredCalculators = CALCULATORS_REGISTRY.filter(calc => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        calc.title.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory === 'all') return true;
    return calc.category === selectedCategory;
  });

  // Display all calculators for selected category/search, or top 6 on All Categories
  const displayedCalculators = searchQuery.trim() || selectedCategory !== 'all'
    ? filteredCalculators
    : filteredCalculators.slice(0, 6);

  const faqs = [
    {
      q: 'What types of calculators does Calculator360 offer?',
      a: 'Calculator360 provides focused calculators spanning Everyday Life (Chronological Age, Date Difference, Time Duration), Health (BMI, Calorie & TDEE), Finance (Loan EMI, Compound Interest), Math & Numbers (Percentages, Scientific Math), Unit Conversion, Food & Cooking (Recipe Scaler), and Construction & DIY.'
    },
    {
      q: 'Are the mathematical formulas verified against standard conventions?',
      a: 'Yes. All calculators use established global standards, including Gregorian calendar rules for age and date math, World Health Organization (WHO) BMI classifications, and international financial amortization models.'
    },
    {
      q: 'Does Calculator360 require user registration or track personal numbers?',
      a: 'No. All calculations run strictly in your web browser with client-side JavaScript. Your inputs, dates, and figures are never sent to external servers or logged in databases.'
    },
    {
      q: 'How do I search across all calculators?',
      a: 'You can use the search bar on the homepage or press Cmd+K anywhere on the site to open the global quick-search modal.'
    }
  ];

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Calculator360',
    'url': window.location.origin,
    'description': 'Free, instant online calculators for everyday life, health, finance, and math.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${window.location.origin}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      {/* =========================================================
          MATERIAL 3 HERO & SEARCH DOCK (No Ad in Hero Section)
          ========================================================= */}
      <section style={{
        textAlign: 'center',
        padding: '3rem 1rem 2.25rem',
        maxWidth: '780px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: '0.75rem'
        }}>
          {t('hero_title')}
        </h1>

        <p style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          maxWidth: '580px',
          margin: '0 auto 2rem'
        }}>
          {t('hero_subtitle')}
        </p>

        {/* Google Material 3 Search Bar (Search Pill) */}
        <div style={{ maxWidth: '620px', margin: '0 auto 1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--surface-solid)',
            borderRadius: 'var(--md-sys-shape-full)',
            padding: '0.45rem 0.6rem 0.45rem 1.25rem',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: 'var(--md-sys-elevation-1)',
            gap: '0.75rem',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
          }}>
            <Search size={20} color="var(--md-sys-color-primary)" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-primary)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  display: 'flex'
                }}
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={onOpenSearch}
              className="btn-primary"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <span>{t('explore_btn')}</span>
            </button>
          </div>
        </div>

        {/* Material 3 Filter Chips */}
        <div className="home-category-chips-bar category-scroll-strip">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`m3-chip ${isSelected ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CATEGORIES MATRIX (8 High-Contrast Categories)
          ========================================================= */}
      <section id="featured-categories" style={{ marginBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {t('categories_title')}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {t('categories_subtitle')}
            </p>
          </div>
        </div>

        <div className="category-cards-grid">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const theme = getCategoryTheme(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('featured-calculators');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="m3-card-filled category-matrix-card"
              >
                <div>
                  <div className="category-card-icon" style={{ background: theme.bg }}>
                    {theme.icon}
                  </div>

                  <h3 className="category-card-title">
                    {cat.name}
                  </h3>

                  <p className="category-card-desc">
                    {cat.description}
                  </p>
                </div>

                <div className="category-card-action">
                  <span>{t('browse_domain')}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-Page In-Feed Ad Banner */}
      <AdBanner slotType="in-feed" />

      {/* =========================================================
          FEATURED CALCULATORS (Strictly 2 Rows of Important Tools)
          ========================================================= */}
      <section id="featured-calculators" style={{ marginBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedCategory === 'all'
                ? 'Popular Calculators'
                : `${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : 'Top essential calculators for immediate use'}
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="glass-pill"
              style={{ cursor: 'pointer' }}
            >
              <span>Reset filter</span>
              <X size={13} />
            </button>
          )}
        </div>

        {/* Maximum 2 Rows: 3 columns on desktop (total 6 cards) */}
        <div className="popular-calculators-grid">
          {displayedCalculators.map(calc => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onClick={() => {
                if (calc.id === 'age-calculator') {
                  onNavigate('/age-calculator');
                } else {
                  onNavigate(`/${calc.slug}`);
                }
              }}
            />
          ))}
        </div>

        {/* View All Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onOpenSearch}
            className="btn-secondary"
            style={{
              padding: '0.75rem 1.75rem',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <Search size={16} color="var(--md-sys-color-primary)" />
            <span>Search All Calculators (⌘K)</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          MATERIAL 3 PLATFORM PRINCIPLES
          ========================================================= */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div
          className="m3-card-filled"
          style={{ padding: '2.25rem 2rem' }}
        >
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 2.25rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Built on Three Core Principles
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Clean, utility-first computing designed for clarity and reliability.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#d3e3fd',
                color: '#0b57d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Instant Calculations</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Computations update instantly on input change with zero page reloads or waiting times.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#c4eed0',
                color: '#146c2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Verified Mathematical Standards</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Formulas calibrated against ISO conventions, WHO criteria, and banking standards.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#f9dedc',
                color: '#b3261e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Privacy by Architecture</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Computations execute 100% client-side. No cookies storing personal figures, no login required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEO & FAQ ACCORDION SECTION
          ========================================================= */}
      <section style={{ marginBottom: '2rem' }}>
        <article
          className="m3-card-elevated"
          style={{ padding: '2.25rem 2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BookOpen size={20} color="var(--md-sys-color-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Online Computation Guide & Mathematical Transparency
            </h2>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
            <p style={{ marginBottom: '0.85rem' }}>
              Online calculators serve as vital computational tools across academic, professional, and everyday scenarios. Whether determining chronological age for eligibility verification, calculating loan amortization schedules to assess mortgage interest, or evaluating Body Mass Index (BMI) to support fitness goals, mathematical accuracy is paramount.
            </p>
            <p>
              Calculator360 designs all algorithms to adhere strictly to international standards, providing complete formula transparency, step-by-step calculation breakdowns, and instant reactive adjustments.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
              <HelpCircle size={18} color="var(--md-sys-color-primary)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: 'var(--md-sys-shape-md)',
                      overflow: 'hidden',
                      background: 'var(--md-sys-color-surface-container-low)',
                      border: '1px solid var(--md-sys-color-outline-variant)'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '0.95rem 1.25rem',
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: isOpen ? 'var(--md-sys-color-primary)' : 'var(--text-primary)'
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 1.25rem 1.15rem',
                        fontSize: '0.825rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        borderTop: '1px solid var(--md-sys-color-outline-variant)',
                        paddingTop: '0.75rem'
                      }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </section>

      {/* Bottom Leaderboard Ad Banner */}
      <AdBanner slotType="leaderboard" />
    </div>
  );
};
