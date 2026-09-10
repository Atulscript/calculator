import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { AgeCalculatorPage } from './pages/AgeCalculatorPage';
import { BMICalculatorPage } from './pages/BMICalculatorPage';
import { PercentageCalculatorPage } from './pages/PercentageCalculatorPage';
import { LoanCalculatorPage } from './pages/LoanCalculatorPage';
import { CompoundInterestPage } from './pages/CompoundInterestPage';
import { DateDifferencePage } from './pages/DateDifferencePage';
import { CalorieCalculatorPage } from './pages/CalorieCalculatorPage';
import { UnitConverterPage } from './pages/UnitConverterPage';
import { GenericCalculatorPage } from './pages/GenericCalculatorPage';
import { BottomNav } from './components/common/BottomNav';
import { CALCULATORS_REGISTRY } from './data/calculators';
import { CalculatorCategory } from './types/calculator';
import { LocalizationProvider } from './context/LocalizationContext';

const CALCULATOR_PAGES: Record<string, React.FC<{ onNavigate: (path: string) => void }>> = {
  'age-calculator': AgeCalculatorPage,
  'bmi-calculator': BMICalculatorPage,
  'percentage-calculator': PercentageCalculatorPage,
  'emi-calculator': LoanCalculatorPage,
  'loan-calculator': LoanCalculatorPage,
  'compound-interest-calculator': CompoundInterestPage,
  'date-calculator': DateDifferencePage,
  'date-difference-calculator': DateDifferencePage,
  'calorie-calculator': CalorieCalculatorPage,
  'unit-converter': UnitConverterPage
};

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

    // Dynamic Calculator Page lookup
    const slug = cleanPath.replace(/^\//, '');
    const MatchedComponent = CALCULATOR_PAGES[slug];
    if (MatchedComponent) {
      return <MatchedComponent onNavigate={navigate} />;
    }

    const matchedCalc = CALCULATORS_REGISTRY.find(c => c.slug === slug);
    if (matchedCalc) {
      return <GenericCalculatorPage slug={slug} onNavigate={navigate} />;
    }

    // Fallback to home
    return (
      <HomePage
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

        {/* Main Routed Page Content */}
        <main className="main-content">
          {renderRoute()}
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
