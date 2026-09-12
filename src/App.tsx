import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { BottomNav } from './components/common/BottomNav';
import { CALCULATORS_REGISTRY } from './data/calculators';
import { CATEGORY_HUBS } from './data/categoryHubs';
import { CalculatorCategory } from './types/calculator';
import { LocalizationProvider } from './context/LocalizationContext';
import { usePageSeo } from './hooks/usePageSeo';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Code-split routes for instant initial bundle loading and optimal CWV/FCP
const AgeCalculatorPage = lazy(() => import('./pages/AgeCalculatorPage').then(m => ({ default: m.AgeCalculatorPage })));
const BMICalculatorPage = lazy(() => import('./pages/BMICalculatorPage').then(m => ({ default: m.BMICalculatorPage })));
const PercentageCalculatorPage = lazy(() => import('./pages/PercentageCalculatorPage').then(m => ({ default: m.PercentageCalculatorPage })));
const LoanCalculatorPage = lazy(() => import('./pages/LoanCalculatorPage').then(m => ({ default: m.LoanCalculatorPage })));
const CompoundInterestPage = lazy(() => import('./pages/CompoundInterestPage').then(m => ({ default: m.CompoundInterestPage })));
const DateDifferencePage = lazy(() => import('./pages/DateDifferencePage').then(m => ({ default: m.DateDifferencePage })));
const CalorieCalculatorPage = lazy(() => import('./pages/CalorieCalculatorPage').then(m => ({ default: m.CalorieCalculatorPage })));
const UnitConverterPage = lazy(() => import('./pages/UnitConverterPage').then(m => ({ default: m.UnitConverterPage })));
const SIPCalculatorPage = lazy(() => import('./pages/SIPCalculatorPage').then(m => ({ default: m.SIPCalculatorPage })));
const MortgageCalculatorPage = lazy(() => import('./pages/MortgageCalculatorPage').then(m => ({ default: m.MortgageCalculatorPage })));
const ScientificCalculatorPage = lazy(() => import('./pages/ScientificCalculatorPage').then(m => ({ default: m.ScientificCalculatorPage })));
const FinanceToolsPage = lazy(() => import('./pages/FinanceToolsPage').then(m => ({ default: m.FinanceToolsPage })));
const HealthToolsPage = lazy(() => import('./pages/HealthToolsPage').then(m => ({ default: m.HealthToolsPage })));
const TimeToolsPage = lazy(() => import('./pages/TimeToolsPage').then(m => ({ default: m.TimeToolsPage })));
const MathToolsPage = lazy(() => import('./pages/MathToolsPage').then(m => ({ default: m.MathToolsPage })));
const ConstructionToolsPage = lazy(() => import('./pages/ConstructionToolsPage').then(m => ({ default: m.ConstructionToolsPage })));
const FoodToolsPage = lazy(() => import('./pages/FoodToolsPage').then(m => ({ default: m.FoodToolsPage })));
const ScienceToolsPage = lazy(() => import('./pages/ScienceToolsPage').then(m => ({ default: m.ScienceToolsPage })));
const HighTrafficToolsPage = lazy(() => import('./pages/HighTrafficToolsPage').then(m => ({ default: m.HighTrafficToolsPage })));
const RealEstateToolsPage = lazy(() => import('./pages/RealEstateToolsPage').then(m => ({ default: m.RealEstateToolsPage })));
const WealthDebtToolsPage = lazy(() => import('./pages/WealthDebtToolsPage').then(m => ({ default: m.WealthDebtToolsPage })));
const TechSpecializedToolsPage = lazy(() => import('./pages/TechSpecializedToolsPage').then(m => ({ default: m.TechSpecializedToolsPage })));
const AdvancedFinanceToolsPage = lazy(() => import('./pages/AdvancedFinanceToolsPage').then(m => ({ default: m.AdvancedFinanceToolsPage })));
const AdvancedHealthToolsPage = lazy(() => import('./pages/AdvancedHealthToolsPage').then(m => ({ default: m.AdvancedHealthToolsPage })));
const AdvancedMathToolsPage = lazy(() => import('./pages/AdvancedMathToolsPage').then(m => ({ default: m.AdvancedMathToolsPage })));
const AdvancedUtilityToolsPage = lazy(() => import('./pages/AdvancedUtilityToolsPage').then(m => ({ default: m.AdvancedUtilityToolsPage })));
const GenericCalculatorPage = lazy(() => import('./pages/GenericCalculatorPage').then(m => ({ default: m.GenericCalculatorPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const CategoryHubPage = lazy(() => import('./pages/CategoryHubPage').then(m => ({ default: m.CategoryHubPage })));
const InfoPolicyPage = lazy(() => import('./pages/InfoPolicyPage').then(m => ({ default: m.InfoPolicyPage })));

const PageLoadingSkeleton: React.FC = () => (
  <div style={{
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    minHeight: '60vh'
  }}>
    <div style={{
      width: '180px',
      height: '24px',
      borderRadius: '8px',
      background: 'var(--surface-hover)',
      animation: 'pulse-glow 1.5s ease-in-out infinite'
    }} />
    <div style={{
      width: '320px',
      height: '38px',
      borderRadius: '10px',
      background: 'var(--surface-hover)',
      animation: 'pulse-glow 1.5s ease-in-out infinite'
    }} />
    <div style={{
      width: '100%',
      height: '320px',
      borderRadius: '18px',
      background: 'var(--surface-hover)',
      animation: 'pulse-glow 1.5s ease-in-out infinite'
    }} />
  </div>
);

export const App: React.FC = () => {
  // Theme Management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('omnicalc_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('omnicalc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Helper to normalize route path relative to app base URL
  const getNormalizedPath = (fullPath: string) => {
    let p = fullPath || '/';
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    if (base && p.startsWith(base)) {
      p = p.slice(base.length);
    }
    return p || '/';
  };

  // Routing State based on window.location.pathname
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return getNormalizedPath(window.location.pathname);
  });

  // Automatically maintain keyword-focused title, description, keywords, canonical, and Schema for every route
  usePageSeo({ path: currentPath });

  const [activeCategory, setActiveCategory] = useState<CalculatorCategory>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Handle Browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global ⌘K / Ctrl+K keyboard shortcut to toggle search modal from any page
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const navigate = (path: string) => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const cleanTarget = path.startsWith('/') ? path : '/' + path;
    const fullTarget = base + cleanTarget;
    window.history.pushState({}, '', fullTarget);
    setCurrentPath(getNormalizedPath(fullTarget));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current route
  const renderRoute = () => {
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    if (cleanPath === '/' || cleanPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      );
    }

    const slug = cleanPath.replace(/^\//, '');

    // 0. Informational & Legal Policy Pages
    if (['about', 'contact', 'privacy', 'terms', 'disclaimer', 'privacy-policy', 'terms-of-service'].includes(slug)) {
      const type = slug === 'privacy-policy' ? 'privacy' : slug === 'terms-of-service' ? 'terms' : slug;
      return <InfoPolicyPage type={type as any} onNavigate={navigate} />;
    }

    // 0.5 Category hubs. Checked before calculators, but /unit-converter is
    // excluded here because that slug is served by UnitConverterPage below.
    if (slug !== 'unit-converter' && CATEGORY_HUBS.some(h => h.slug === slug)) {
      return <CategoryHubPage slug={slug} onNavigate={navigate} />;
    }

    // 1. Dedicated Flagships
    if (slug === 'age-calculator') return <AgeCalculatorPage onNavigate={navigate} />;
    if (slug === 'bmi-calculator') return <BMICalculatorPage onNavigate={navigate} />;
    if (slug === 'percentage-calculator') return <PercentageCalculatorPage onNavigate={navigate} />;
    if (slug === 'emi-calculator' || slug === 'loan-calculator') return <LoanCalculatorPage onNavigate={navigate} />;
    if (slug === 'compound-interest-calculator') return <CompoundInterestPage onNavigate={navigate} />;
    if (slug === 'sip-calculator') return <SIPCalculatorPage onNavigate={navigate} />;
    if (slug === 'mortgage-calculator') return <MortgageCalculatorPage onNavigate={navigate} />;
    if (slug === 'scientific-calculator') return <ScientificCalculatorPage onNavigate={navigate} />;
    if (slug === 'calorie-calculator') return <CalorieCalculatorPage onNavigate={navigate} />;
    if (slug === 'date-calculator' || slug === 'date-difference-calculator') return <DateDifferencePage onNavigate={navigate} />;

    // 2. Unit Conversions
    if (
      slug === 'unit-converter' ||
      slug === 'temperature-converter' ||
      slug === 'length-converter' ||
      slug === 'weight-converter' ||
      slug === 'speed-converter' ||
      slug === 'data-storage-converter' ||
      slug === 'area-converter'
    ) {
      return <UnitConverterPage onNavigate={navigate} slug={slug} />;
    }

    // 3. Finance Tools
    if (['simple-interest-calculator', 'salary-calculator', 'income-tax-calculator', 'tip-calculator', 'discount-calculator'].includes(slug)) {
      return <FinanceToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 4. Health Tools
    if (['body-fat-calculator', 'water-intake-calculator', 'ideal-weight-calculator', 'target-heart-rate-calculator', 'macro-calculator', 'pregnancy-due-date-calculator'].includes(slug)) {
      return <HealthToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 5. Time & Everyday Tools
    if (['time-duration-calculator', 'hours-and-minutes-calculator', 'days-until-calculator', 'day-of-the-week-calculator', 'chronological-age-calculator', 'sleep-cycle-calculator'].includes(slug)) {
      return <TimeToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 6. Math Tools
    if (['fraction-calculator', 'gpa-calculator', 'ratio-calculator', 'average-calculator', 'random-number-generator'].includes(slug)) {
      return <MathToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 7. Construction Tools
    if (['square-footage-calculator', 'paint-calculator', 'concrete-calculator', 'tile-calculator', 'gravel-and-mulch-calculator', 'wallpaper-calculator'].includes(slug)) {
      return <ConstructionToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 8. Food Tools
    if (['recipe-converter', 'baking-conversion-calculator', 'cooking-time-calculator', 'coffee-water-ratio-calculator'].includes(slug)) {
      return <FoodToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 9. Science Tools
    if (['speed-distance-time-calculator', 'density-mass-volume-calculator', 'force-calculator', 'ohms-law-calculator'].includes(slug)) {
      return <ScienceToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 10. High-Traffic Powerhouse Tools
    if ([
      'auto-loan-calculator',
      'car-loan-calculator',
      'retirement-calculator',
      'ovulation-calculator',
      'fuel-cost-calculator',
      'gst-calculator',
      'bmr-calculator',
      'ppf-calculator'
    ].includes(slug)) {
      return <HighTrafficToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 11. US & European Real Estate & Housing Tools
    if ([
      'home-affordability-calculator',
      'rent-vs-buy-calculator',
      'mortgage-refinance-calculator',
      'rental-property-roi-calculator',
      'heloc-calculator',
      'stamp-duty-calculator'
    ].includes(slug)) {
      return <RealEstateToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 12. Wealth, Debt, Taxes & Loan Planning Tools
    if ([
      'credit-card-payoff-calculator',
      'student-loan-calculator',
      'car-lease-vs-buy-calculator',
      'capital-gains-tax-calculator',
      'vat-calculator',
      'net-worth-calculator',
      'inflation-calculator',
      'dividend-yield-calculator'
    ].includes(slug)) {
      return <WealthDebtToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 13. Tech, Security & Specialized Health Tools
    if ([
      'ip-subnet-calculator',
      'password-generator',
      'bac-calculator',
      'bsa-calculator'
    ].includes(slug)) {
      return <TechSpecializedToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 14. Advanced Finance, Retirement, Savings & Commercial Financing
    if ([
      '401k-calculator',
      'roth-ira-calculator',
      'ira-calculator',
      'pension-calculator',
      'social-security-calculator',
      'annuity-calculator',
      'annuity-payout-calculator',
      'cd-calculator',
      'bond-calculator',
      'debt-ratio-calculator',
      'debt-payoff-calculator',
      'debt-consolidation-calculator',
      'personal-loan-calculator',
      'business-loan-calculator',
      'boat-loan-calculator',
      'margin-calculator',
      'depreciation-calculator',
      'roi-calculator',
      'irr-calculator',
      'fha-loan-calculator',
      'va-mortgage-calculator',
      'mortgage-calculator-uk',
      'canadian-mortgage-calculator',
      'payback-period-calculator',
      'commission-calculator',
      'savings-calculator',
      'college-cost-calculator',
      'interest-rate-calculator'
    ].includes(slug)) {
      return <AdvancedFinanceToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 15. Advanced Health, Fitness, Biomarkers & Cardio
    if ([
      'one-rep-max-calculator',
      'pace-calculator',
      'calories-burned-calculator',
      'gfr-calculator',
      'lean-body-mass-calculator',
      'army-body-fat-calculator',
      'carbohydrate-calculator',
      'protein-calculator',
      'fat-intake-calculator',
      'tdee-calculator',
      'healthy-weight-calculator',
      'overweight-calculator'
    ].includes(slug)) {
      return <AdvancedHealthToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 16. Advanced Mathematics, Geometry, Algebra & Statistics
    if ([
      'triangle-calculator',
      'right-triangle-calculator',
      'pythagorean-theorem-calculator',
      'volume-calculator',
      'surface-area-calculator',
      'quadratic-formula-calculator',
      'slope-calculator',
      'mean-median-mode-range-calculator',
      'permutation-and-combination-calculator',
      'probability-calculator',
      'binary-calculator',
      'hex-calculator',
      'exponent-calculator',
      'log-calculator',
      'gcf-calculator',
      'lcm-calculator',
      'prime-factorization-calculator'
    ].includes(slug)) {
      return <AdvancedMathToolsPage slug={slug} onNavigate={navigate} />;
    }

    // 17. Advanced Engineering, Automotive & Everyday Utilities
    if ([
      'electricity-calculator',
      'voltage-drop-calculator',
      'btu-calculator',
      'horsepower-calculator',
      'engine-horsepower-calculator',
      'stair-calculator',
      'roofing-calculator',
      'time-card-calculator',
      'bandwidth-calculator',
      'roman-numeral-converter',
      'base64-encode-decode',
      'url-encode-decode',
      'gas-mileage-calculator',
      'tire-size-calculator'
    ].includes(slug)) {
      return <AdvancedUtilityToolsPage slug={slug} onNavigate={navigate} />;
    }

    const matchedCalc = CALCULATORS_REGISTRY.find(c => c.slug === slug);
    if (matchedCalc) {
      return <GenericCalculatorPage slug={slug} onNavigate={navigate} />;
    }

    // Dedicated 404 handler for any invalid route
    return (
      <NotFoundPage
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    );
  };

  return (
    <LocalizationProvider>
      <div className="app-container">
        {/* Platform Header */}
        <Header
          currentTheme={theme}
          currentPath={currentPath}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setIsSearchOpen(true)}
          activeCategory={activeCategory}
          onSelectCategory={cat => {
            setActiveCategory(cat);
            if (currentPath !== '/') {
              navigate('/');
            }
          }}
          onNavigateHome={() => navigate('/')}
        />

        {/* Main Routed Page Content wrapped in ErrorBoundary & Suspense */}
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<PageLoadingSkeleton />}>
              {renderRoute()}
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Global Cmd+K Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectCalculator={id => {
            if (id === 'age-calculator') navigate('/age-calculator');
            else navigate(`/${id}`);
          }}
        />

        {/* Footer */}
        <Footer
          onNavigate={navigate}
          onSelectCategory={cat => {
            setActiveCategory(cat);
            navigate('/');
          }}
          onSelectCalculator={id => {
            if (id === 'age-calculator') navigate('/age-calculator');
            else navigate(`/${id}`);
          }}
        />

        {/* Mobile App-like Bottom Navigation Bar */}
        <BottomNav
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </div>
    </LocalizationProvider>
  );
};
