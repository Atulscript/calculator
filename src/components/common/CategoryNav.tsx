import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { CalculatorCategory } from '../../types/calculator';
import { Layers, Sparkles, HeartPulse, CircleDollarSign, Calculator, ArrowRightLeft, Atom, UtensilsCrossed, HardHat } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CalculatorCategory;
  onSelectCategory: (cat: CalculatorCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const getCategoryIcon = (id: CalculatorCategory) => {
    switch (id) {
      case 'all': return <Layers size={15} />;
      case 'everyday': return <Sparkles size={15} />;
      case 'health': return <HeartPulse size={15} />;
      case 'finance': return <CircleDollarSign size={15} />;
      case 'math': return <Calculator size={15} />;
      case 'conversion': return <ArrowRightLeft size={15} />;
      case 'science': return <Atom size={15} />;
      case 'food': return <UtensilsCrossed size={15} />;
      case 'construction': return <HardHat size={15} />;
      default: return <Calculator size={15} />;
    }
  };

  return (
    <div
      className="category-scroll-strip"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        overflowX: 'auto',
        padding: '0.35rem 0 1.25rem',
        scrollbarWidth: 'none'
      }}
    >
      {CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: isActive ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
              background: isActive ? 'var(--gradient-primary)' : 'var(--surface-glass)',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-display)',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {getCategoryIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};
