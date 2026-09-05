import React from 'react';
import { Home, Layers, Search, Flame } from 'lucide-react';
import { useLocalization } from '../../context/LocalizationContext';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch
}) => {
  const { t } = useLocalization();
  const isHome = currentPath === '/' || currentPath === '';

  const scrollToSection = (sectionId: string) => {
    if (!isHome) {
      onNavigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'var(--bottom-nav-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1.5px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.4rem 0.75rem calc(0.4rem + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* 1. Home */}
      <button
        onClick={() => {
          onNavigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`bottom-nav-item ${isHome ? 'active' : ''}`}
        aria-label={t('home')}
      >
        <div className="nav-icon-pill">
          <Home size={20} />
        </div>
        <span className="nav-label">{t('home')}</span>
      </button>

      {/* 2. Categories */}
      <button
        onClick={() => scrollToSection('featured-categories')}
        className="bottom-nav-item"
        aria-label={t('categories')}
      >
        <div className="nav-icon-pill">
          <Layers size={20} />
        </div>
        <span className="nav-label">{t('categories')}</span>
      </button>

      {/* 3. Search (Central Action) */}
      <button
        onClick={onOpenSearch}
        className="bottom-nav-item search-item"
        aria-label={t('search')}
      >
        <div className="nav-icon-pill search-pill">
          <Search size={20} />
        </div>
        <span className="nav-label">{t('search')}</span>
      </button>

      {/* 4. Popular / Trending Calculators */}
      <button
        onClick={() => scrollToSection('featured-calculators')}
        className="bottom-nav-item"
        aria-label={t('popular')}
      >
        <div className="nav-icon-pill">
          <Flame size={20} />
        </div>
        <span className="nav-label">{t('popular')}</span>
      </button>
    </nav>
  );
};
