import React from 'react';
import { CalculatorMeta } from '../../types/calculator';
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  Landmark,
  PiggyBank,
  CreditCard,
  Percent,
  HeartPulse,
  Flame,
  Activity,
  Dumbbell,
  Scale,
  Calendar,
  Clock,
  Sparkles,
  Atom,
  Zap,
  HardHat,
  ArrowRightLeft,
  UtensilsCrossed,
  Binary,
  Divide,
  BadgePercent
} from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  onClick: () => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onClick }) => {
  // Category-based style presets
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'finance':
        return {
          iconColor: '#059669',
          iconBg: 'rgba(5, 150, 105, 0.12)',
          badgeColor: '#047857',
          badgeColorDark: '#6ee7b7',
          badgeBg: 'rgba(5, 150, 105, 0.10)',
          badgeBorder: 'rgba(5, 150, 105, 0.25)',
        };
      case 'health':
        return {
          iconColor: '#e11d48',
          iconBg: 'rgba(225, 29, 72, 0.12)',
          badgeColor: '#be123c',
          badgeColorDark: '#fda4af',
          badgeBg: 'rgba(225, 29, 72, 0.10)',
          badgeBorder: 'rgba(225, 29, 72, 0.25)',
        };
      case 'math':
        return {
          iconColor: '#2563eb',
          iconBg: 'rgba(37, 99, 235, 0.12)',
          badgeColor: '#1d4ed8',
          badgeColorDark: '#93c5fd',
          badgeBg: 'rgba(37, 99, 235, 0.10)',
          badgeBorder: 'rgba(37, 99, 235, 0.25)',
        };
      case 'everyday':
        return {
          iconColor: '#d97706',
          iconBg: 'rgba(217, 119, 6, 0.12)',
          badgeColor: '#b45309',
          badgeColorDark: '#fcd34d',
          badgeBg: 'rgba(217, 119, 6, 0.10)',
          badgeBorder: 'rgba(217, 119, 6, 0.25)',
        };
      case 'science':
        return {
          iconColor: '#7c3aed',
          iconBg: 'rgba(124, 58, 237, 0.12)',
          badgeColor: '#6d28d9',
          badgeColorDark: '#c4b5fd',
          badgeBg: 'rgba(124, 58, 237, 0.10)',
          badgeBorder: 'rgba(124, 58, 237, 0.25)',
        };
      case 'construction':
        return {
          iconColor: '#4f46e5',
          iconBg: 'rgba(79, 70, 229, 0.12)',
          badgeColor: '#4338ca',
          badgeColorDark: '#a5b4fc',
          badgeBg: 'rgba(79, 70, 229, 0.10)',
          badgeBorder: 'rgba(79, 70, 229, 0.25)',
        };
      case 'conversion':
        return {
          iconColor: '#0891b2',
          iconBg: 'rgba(8, 145, 178, 0.12)',
          badgeColor: '#0e7490',
          badgeColorDark: '#7dd3fc',
          badgeBg: 'rgba(8, 145, 178, 0.10)',
          badgeBorder: 'rgba(8, 145, 178, 0.25)',
        };
      case 'food':
        return {
          iconColor: '#c2410c',
          iconBg: 'rgba(194, 65, 12, 0.12)',
          badgeColor: '#9a3412',
          badgeColorDark: '#fdba74',
          badgeBg: 'rgba(194, 65, 12, 0.10)',
          badgeBorder: 'rgba(194, 65, 12, 0.25)',
        };
      default:
        return {
          iconColor: 'var(--md-sys-color-primary)',
          iconBg: 'var(--md-sys-color-primary-container)',
          badgeColor: 'var(--text-primary)',
          badgeColorDark: 'var(--text-secondary)',
          badgeBg: 'var(--surface-subtle)',
          badgeBorder: 'var(--border-subtle)',
        };
    }
  };

  // Choose representative icon based on slug/id
  const getRepresentativeIcon = () => {
    const slug = (calculator.slug + ' ' + calculator.id).toLowerCase();
    const cat = calculator.category;

    if (slug.includes('mortgage') || slug.includes('home-loan') || slug.includes('affordability')) {
      return <Landmark size={20} />;
    }
    if (slug.includes('sip') || slug.includes('investment') || slug.includes('compound') || slug.includes('401k')) {
      return <TrendingUp size={20} />;
    }
    if (slug.includes('savings') || slug.includes('ppf') || slug.includes('fd') || slug.includes('rd')) {
      return <PiggyBank size={20} />;
    }
    if (slug.includes('credit-card') || slug.includes('debt') || slug.includes('paycheck')) {
      return <CreditCard size={20} />;
    }
    if (slug.includes('tax') || slug.includes('gst') || slug.includes('vat')) {
      return <BadgePercent size={20} />;
    }
    if (slug.includes('bmi') || slug.includes('body-fat') || slug.includes('ideal-weight')) {
      return <Scale size={20} />;
    }
    if (slug.includes('calorie') || slug.includes('tdee') || slug.includes('macro')) {
      return <Flame size={20} />;
    }
    if (slug.includes('heart') || slug.includes('blood') || slug.includes('ovulation') || slug.includes('pregnancy')) {
      return <HeartPulse size={20} />;
    }
    if (slug.includes('pace') || slug.includes('one-rep') || slug.includes('workout')) {
      return <Dumbbell size={20} />;
    }
    if (slug.includes('age') || slug.includes('date') || slug.includes('birthday')) {
      return <Calendar size={20} />;
    }
    if (slug.includes('time') || slug.includes('hours') || slug.includes('clock')) {
      return <Clock size={20} />;
    }
    if (slug.includes('percentage') || slug.includes('discount') || slug.includes('markup')) {
      return <Percent size={20} />;
    }
    if (slug.includes('binary') || slug.includes('hex') || slug.includes('subnet') || slug.includes('ip')) {
      return <Binary size={20} />;
    }
    if (slug.includes('scientific') || slug.includes('fraction') || slug.includes('matrix')) {
      return <Divide size={20} />;
    }
    if (slug.includes('electricity') || slug.includes('solar') || slug.includes('energy')) {
      return <Zap size={20} />;
    }
    if (cat === 'construction') {
      return <HardHat size={20} />;
    }
    if (cat === 'conversion') {
      return <ArrowRightLeft size={20} />;
    }
    if (cat === 'food') {
      return <UtensilsCrossed size={20} />;
    }
    if (cat === 'science') {
      return <Atom size={20} />;
    }
    if (cat === 'health') {
      return <Activity size={20} />;
    }
    if (cat === 'everyday') {
      return <Sparkles size={20} />;
    }
    return <Calculator size={20} />;
  };

  const style = getCategoryStyles(calculator.category);

  return (
    <div
      onClick={onClick}
      className="m3-card-elevated popular-calc-card"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div>
        <div className="popular-calc-header">
          <div
            className="popular-calc-icon"
            style={{
              backgroundColor: style.iconBg,
              color: style.iconColor,
            }}
          >
            {getRepresentativeIcon()}
          </div>

          <div className="popular-calc-badges">
            {calculator.badge && (
              <span className="popular-calc-special-badge">
                {calculator.badge}
              </span>
            )}
            <span
              className="popular-calc-badge"
              style={{
                '--badge-bg': style.badgeBg,
                '--badge-fg': style.badgeColor,
                '--badge-fg-dark': style.badgeColorDark,
                '--badge-border': style.badgeBorder,
              } as React.CSSProperties}
            >
              {calculator.category}
            </span>
          </div>
        </div>

        <h3 className="popular-calc-title">
          {calculator.title}
        </h3>

        <p className="popular-calc-desc">
          {calculator.shortDescription}
        </p>
      </div>

      <div className="popular-calc-action">
        <span>Instant Calculate</span>
        <ArrowRight size={15} className="action-arrow" />
      </div>
    </div>
  );
};
