import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CalculatorMeta } from '../../types/calculator';

interface BreadcrumbsProps {
  currentCalculator?: CalculatorMeta;
  onHomeClick: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentCalculator, onHomeClick }) => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.45rem',
      fontSize: '0.825rem',
      color: 'var(--text-muted)',
      marginBottom: '1.25rem'
    }}>
      <button
        onClick={onHomeClick}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontWeight: 500,
          padding: 0
        }}
      >
        <Home size={14} />
        <span>Calculators</span>
      </button>

      <ChevronRight size={13} />

      <span style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
        {currentCalculator?.category || 'Everyday'}
      </span>

      {currentCalculator && (
        <>
          <ChevronRight size={13} />
          <span style={{ fontWeight: 600, color: 'var(--primary-500)' }}>
            {currentCalculator.title}
          </span>
        </>
      )}
    </nav>
  );
};
