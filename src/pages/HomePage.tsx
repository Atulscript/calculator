import React, { useState, useRef, useEffect } from 'react';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { CATEGORIES } from '../data/categories';
import {
  CATEGORY_HUB_BY_CATEGORY,
  HUBS_WITHOUT_CATEGORY_CARD,
  CATEGORY_HUBS
} from '../data/categoryHubs';
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
  CheckCircle2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  UtensilsCrossed,
  HardHat,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const { t } = useLocalization();
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close live quick-search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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


  // Live top matching calculators when typing in hero search bar (ranked by relevance)
  const quickSearchResults = searchQuery.trim()
    ? CALCULATORS_REGISTRY.map(calc => {
        const q = searchQuery.toLowerCase().trim();
        const titleLower = calc.title.toLowerCase();
        const shortDescLower = calc.shortDescription.toLowerCase();
        let score = 0;
        if (titleLower === q) score += 100;
        else if (titleLower.startsWith(q)) score += 80;
        else if (titleLower.split(/[\s-]+/).some(w => w === q)) score += 60;
        else if (titleLower.split(/[\s-]+/).some(w => w.startsWith(q))) score += 40;
        else if (titleLower.includes(q)) score += 30;
        else if (calc.tags.some(t => t.toLowerCase() === q)) score += 25;
        else if (calc.tags.some(t => t.toLowerCase().startsWith(q))) score += 20;
        else if (calc.tags.some(t => t.toLowerCase().includes(q))) score += 15;
        else if (shortDescLower.includes(q)) score += 10;
        return { calc, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.calc)
    : [];

  const popularShortcuts = [
    { label: 'Age Calculator', icon: '🎂', path: '/age-calculator' },
    { label: 'Loan EMI', icon: '💳', path: '/loan-calculator' },
    { label: 'BMI Calculator', icon: '⚖️', path: '/bmi-calculator' },
    { label: 'SIP Calculator', icon: '📈', path: '/sip-calculator' },
    { label: 'Percentage', icon: '٪', path: '/percentage-calculator' },
    { label: 'Unit Converter', icon: '🔄', path: '/unit-converter' },
    { label: 'Mortgage', icon: '🏠', path: '/mortgage-calculator' },
    { label: 'Date Math', icon: '📅', path: '/date-calculator' }
  ];


  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchFocused(false);
    if (!searchQuery.trim()) {
      onOpenSearch();
    } else {
      const el = document.getElementById('featured-calculators');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter calculators based on selected category & search query
  const filteredCalculators = CALCULATORS_REGISTRY.filter(calc => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matches = (
        calc.title.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.tags.some(tag => tag.toLowerCase().includes(q))
      );
      if (selectedCategory === 'all') return matches;
      return matches && calc.category === selectedCategory;
    }
    if (selectedCategory === 'all') return true;
    return calc.category === selectedCategory;
  });

  // Display all calculators for selected category or search, or top 6 on All Categories
  const displayedCalculators = searchQuery.trim() || selectedCategory !== 'all'
    ? filteredCalculators
    : filteredCalculators.slice(0, 6);

  const faqs = [
    {
      q: 'Do I need to create an account or provide an email to use these calculators?',
      a: 'Never. Every tool on Calculator360 is completely free, open-access, and requires zero registration. We will never ask for your email, phone number, or payment details just to show you your math.'
    },
    {
      q: 'Does Calculator360 store or track the financial and personal numbers I enter?',
      a: 'No. Your calculations run 100% locally inside your web browser via client-side JavaScript. Your income, loan balances, birth dates, and health figures stay strictly on your device and are never sent to external servers or logged in any database.'
    },
    {
      q: 'How accurate are the financial and health formulas?',
      a: 'Our tools use established global standards: banking-standard monthly compounding amortization for loans and mortgages, official World Health Organization (WHO) and CDC metrics for BMI and body measurements, and astronomical Gregorian calendar algorithms for date math.'
    },
    {
      q: 'Does the calculator automatically adapt to my currency and country?',
      a: 'Yes. Based on your location, Calculator360 automatically configures the appropriate currency symbol, localized formatting, and realistic price presets (e.g., Lakhs/Crores in India, Millions in the US/UK/Europe). You can also click the currency button in the header to switch to any of 35+ supported world currencies anytime.'
    },
    {
      q: 'Can I use these calculators on my phone or tablet?',
      a: 'Yes. Calculator360 is built as a fast, responsive progressive web application. You get instant slider reactivity, clean touch controls, and zero sluggish pop-ups on any mobile browser.'
    }
  ];

  // WebSite + Organization + SearchAction schema is emitted centrally by
  // seoRegistry.updateDocumentSeo(). A second block here duplicated the entity.

  return (
    <div>
      {/* =========================================================
          MODERN FLAGSHIP HERO SECTION (Everyday Precision)
          ========================================================= */}
      <section className="hero-modern-section">
        {/* Atmospheric Ambient Lighting & Matrix */}
        <div className="hero-ambient-glow-container">
          <div className="hero-ambient-glow-blob"></div>
        </div>
        <div className="hero-grid-matrix"></div>

        <div className="hero-content-relative">
          {/* Top Status Pill (Strictly Single Line) */}
          <div className="hero-status-pill">
            <span className="hero-pulse-dot"></span>
            <span className="hero-pill-text-desktop">Client-Side Engine Active • 0ms Latency • 100% Private</span>
            <span className="hero-pill-text-mobile">Client-Side • 0ms Latency • 100% Private</span>
          </div>

          {/* Master Hero Title (Exact wording strictly preserved) */}
          <h1 className="hero-main-title">
            <span className="hero-title-line-1">Calculators designed for</span>{' '}
            <span className="hero-gradient-text-accent hero-title-line-2">everyday precision</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="hero-main-subtitle">
            {t('hero_subtitle')}
          </p>

          {/* Master Search Dock with Floating Live Results */}
          <div className="hero-search-wrapper" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="hero-search-dock">
                <Search size={20} color="var(--md-sys-color-primary)" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={t('search_placeholder')}
                  className="hero-search-input"
                  aria-label="Search all calculators"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchFocused(false);
                    }}
                    className="hero-search-clear-btn"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="hero-search-kbd"
                  title="Press ⌘K or Ctrl+K to open global search"
                >
                  ⌘K
                </button>

                <button
                  type="submit"
                  className="hero-search-submit-btn"
                >
                  <Compass size={16} />
                  <span>{t('explore_btn')}</span>
                </button>
              </div>
            </form>

            {/* Live Interactive Results Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="hero-live-dropdown">
                {quickSearchResults.length > 0 ? (
                  <div>
                    <div style={{
                      padding: '0.4rem 0.75rem 0.5rem',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Quick Matches ({quickSearchResults.length})
                    </div>
                    {quickSearchResults.map(calc => (
                      <div
                        key={calc.id}
                        className="hero-live-item"
                        onClick={() => {
                          setIsSearchFocused(false);
                          if (calc.id === 'age-calculator') {
                            onNavigate('/age-calculator');
                          } else {
                            onNavigate(`/${calc.slug}`);
                          }
                        }}
                      >
                        <div className="hero-live-item-left">
                          <div
                            className="hero-live-icon-box"
                            style={{ background: getCategoryTheme(calc.category).bg }}
                          >
                            <Calculator size={17} color="var(--md-sys-color-primary)" />
                          </div>
                          <div>
                            <div className="hero-live-title">{calc.title}</div>
                            <div className="hero-live-desc">{calc.shortDescription}</div>
                          </div>
                        </div>
                        <ArrowRight size={15} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: '0.75rem' }} />
                      </div>
                    ))}
                    <div
                      onClick={handleSearchSubmit}
                      style={{
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--md-sys-color-primary)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderTop: '1px solid var(--border-subtle)',
                        marginTop: '0.25rem'
                      }}
                    >
                      View all results in grid below ↓
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    No matching calculators found for "{searchQuery}". Press ⌘K for advanced search.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Launch / Popular Shortcuts Strip */}
          <div className="hero-trending-strip">
            <span className="hero-trending-label">Trending:</span>
            {popularShortcuts.map(item => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className="hero-trending-pill"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* High-Trust Value Proof Matrix */}
          <div className="hero-trust-matrix">
            <div className="hero-trust-card">
              <div className="hero-trust-icon-wrap" style={{ color: 'var(--accent-emerald)', background: 'rgba(52, 211, 153, 0.12)' }}>
                <CheckCircle2 size={19} />
              </div>
              <div>
                <div className="hero-trust-card-title">100% Client-Side</div>
                <div className="hero-trust-card-desc">Zero external tracking or server logging</div>
              </div>
            </div>

            <div className="hero-trust-card">
              <div className="hero-trust-icon-wrap" style={{ color: 'var(--accent-cyan)', background: 'rgba(56, 189, 248, 0.12)' }}>
                <Zap size={19} />
              </div>
              <div>
                <div className="hero-trust-card-title">Instant Live Math</div>
                <div className="hero-trust-card-desc">&lt; 1ms reactive updates with no reload</div>
              </div>
            </div>

            <div className="hero-trust-card">
              <div className="hero-trust-icon-wrap" style={{ color: 'var(--md-sys-color-primary)', background: 'rgba(11, 87, 208, 0.12)' }}>
                <ShieldCheck size={19} />
              </div>
              <div>
                <div className="hero-trust-card-title">Verified Formulas</div>
                <div className="hero-trust-card-desc">Banking amortization & WHO standards</div>
              </div>
            </div>

            <div className="hero-trust-card">
              <div className="hero-trust-icon-wrap" style={{ color: 'var(--accent-purple)', background: 'rgba(168, 85, 247, 0.12)' }}>
                <Sparkles size={19} />
              </div>
              <div>
                <div className="hero-trust-card-title">150+ Free Tools</div>
                <div className="hero-trust-card-desc">No accounts, no email gates, no paywalls</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES MATRIX (8 High-Contrast Categories)
          ========================================================= */}
      <section id="featured-categories" style={{ marginBottom: '3.5rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
              {t('categories_title')}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {t('categories_subtitle')} — 150+ free, client-side verified calculators
            </p>
          </div>
        </div>

        <div className="category-cards-grid">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
            const theme = getCategoryTheme(cat.id);
            const toolCount = CALCULATORS_REGISTRY.filter(c => c.category === cat.id).length;
            const hubSlug = CATEGORY_HUB_BY_CATEGORY[cat.id];
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (hubSlug) {
                    onNavigate(`/${hubSlug}`);
                    return;
                  }
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('featured-calculators');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="m3-card-filled category-matrix-card"
              >
                <div>
                  <div className="category-card-header">
                    <div className="category-card-icon" style={{ background: theme.bg }}>
                      {theme.icon}
                    </div>
                    <span className="category-card-count">
                      {toolCount} Tools
                    </span>
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

        {/* Hubs with no category card of their own, so they stay reachable */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          {HUBS_WITHOUT_CATEGORY_CARD.map(slug => {
            const hub = CATEGORY_HUBS.find(h => h.slug === slug);
            if (!hub) return null;
            return (
              <a
                key={slug}
                href={`/${slug}`}
                onClick={e => {
                  e.preventDefault();
                  onNavigate(`/${slug}`);
                }}
                className="m3-chip"
                style={{ textDecoration: 'none' }}
              >
                {hub.name}
              </a>
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
              {searchQuery.trim()
                ? `Results for "${searchQuery}" (${filteredCalculators.length})`
                : selectedCategory === 'all'
                ? 'Popular Calculators'
                : `${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              {searchQuery.trim()
                ? `Showing verified calculators matching "${searchQuery}"`
                : 'Top essential calculators for immediate use'}
            </p>
          </div>

          {(selectedCategory !== 'all' || searchQuery.trim()) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="glass-pill"
              style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
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
            <span>Search All Calculators</span>
            <kbd className="hero-search-kbd">⌘K</kbd>
          </button>
        </div>
      </section>

      {/* =========================================================
          MATERIAL 3 PLATFORM PRINCIPLES
          ========================================================= */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div
          className="m3-card-filled home-trust-principles-card"
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.25rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Why People Trust Calculator360
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Most calculator websites are covered in intrusive ads and exist solely to capture your phone number for brokers. We built Calculator360 on three different rules.
            </p>
          </div>

          <div className="home-trust-principles-grid">
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#d3e3fd',
                color: 'var(--md-sys-color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Instant, Live Answers</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Numbers update the millisecond you move a slider or change a digit. No "Calculate" button to hunt down, no page reloads, and no waiting.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#c4eed0',
                color: 'var(--md-sys-color-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <CheckCircle2 size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Verified Mathematical Logic</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Calibrated directly against official banking compounding rules, World Health Organization body standards, and exact calendar leap math.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--md-sys-shape-md)',
                background: '#f9dedc',
                color: 'var(--accent-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>Zero Data Logging</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                All calculations run client-side on your device. We never see your loan balances, income, body weight, or dates—and we never will.
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
          className="m3-card-elevated home-faq-article"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BookOpen size={20} color="var(--md-sys-color-primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Clear Formulas, Honest Methodology & Full Privacy
            </h2>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
            <p style={{ marginBottom: '0.85rem' }}>
              Whether you are shopping for a home loan, comparing investment compounding schedules, tracking calorie deficits, or calculating exact dates for a visa application, accurate numbers give you confidence. A small error in compounding frequency or a missed property tax estimate can throw off your budget by thousands of dollars.
            </p>
            <p>
              Calculator360 was designed to provide complete formula transparency. Every calculator shows the exact mathematical formulas used, step-by-step calculation breakdowns, and real-world considerations—without paywalls, email gates, or sales follow-ups.
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
