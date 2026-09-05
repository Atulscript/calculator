import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculatePercentOfNumber,
  calculateNumberIsWhatPercentOfTotal,
  calculatePercentageChange,
  calculateAddSubtractPercentage
} from '../utils/percentageEngine';
import {
  Percent,
  TrendingUp,
  TrendingDown,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  PieChart,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface PercentageCalculatorPageProps {
  onNavigate: (path: string) => void;
}

type ModeKey = 'percentOf' | 'isWhatPercent' | 'percentageChange' | 'addSubtract';

export const PercentageCalculatorPage: React.FC<PercentageCalculatorPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'percentage-calculator') || CALCULATORS_REGISTRY[3];

  // Active Mode Tab
  const [activeMode, setActiveMode] = useState<ModeKey>('percentOf');

  // Mode 1: What is P% of X?
  const [p1, setP1] = useState<number>(15);
  const [x1, setX1] = useState<number>(200);

  // Mode 2: X is what % of Y?
  const [x2, setX2] = useState<number>(45);
  const [y2, setY2] = useState<number>(180);

  // Mode 3: Percentage increase / decrease from X to Y
  const [oldVal, setOldVal] = useState<number>(50);
  const [newVal, setNewVal] = useState<number>(75);

  // Mode 4: Add / Subtract P%
  const [baseVal, setBaseVal] = useState<number>(120);
  const [addPct, setAddPct] = useState<number>(10);
  const [isAdd, setIsAdd] = useState<boolean>(true);

  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Percentage Calculator - Instant Percentage Increase, Decrease & Ratio | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Free, instant online percentage calculator: calculate percent of a number, percentage increase or decrease, discount, markup, and portion ratios.'
      );
    }
  }, []);

  // Compute Real-time Results with edge-case protection
  const res1 = calculatePercentOfNumber(p1, x1);
  const res2 = calculateNumberIsWhatPercentOfTotal(x2, y2);
  const res3 = calculatePercentageChange(oldVal, newVal);
  const res4 = calculateAddSubtractPercentage(baseVal, addPct, isAdd);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Helper for gcd to calculate simplified fractions
  const getFraction = (numerator: number, denominator: number): string => {
    if (denominator === 0 || isNaN(numerator) || isNaN(denominator)) return '0 / 1';
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const factor = gcd(Math.abs(Math.round(numerator)), Math.abs(Math.round(denominator)));
    return `${Math.round(numerator / factor)} / ${Math.round(denominator / factor)}`;
  };

  const faqs = [
    {
      q: 'How do you calculate the percentage of a number?',
      a: 'To calculate P% of X, convert the percentage to a decimal by dividing by 100 (P / 100), and then multiply by X. For example, 15% of 200 is (15 / 100) × 200 = 30.'
    },
    {
      q: 'How do you calculate percentage increase or decrease?',
      a: 'Subtract the initial value from the final value to find the change: (New - Old). Divide that difference by the original value, and multiply by 100: ((New - Old) / |Old|) × 100.'
    },
    {
      q: 'How do you add sales tax or tip percentage?',
      a: 'Multiply the base price by the percentage rate as a decimal (e.g. 10% = 0.10), then add the result to the base price. Example: $120 + ($120 × 0.10) = $132.'
    },
    {
      q: 'What is the fastest way to calculate 15% or 20% mentally?',
      a: 'To find 10%, move the decimal point one place to the left. For 20%, double that amount. For 15%, take 10% and add half of it (5%).'
    }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      {/* Hero Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--md-sys-shape-md)',
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Percent size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Percentage Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Quickly solve common percentage problems: find percentages of numbers, calculate percentage changes, markups, discounts, and portion ratios.
        </p>
      </div>

      {/* Modern Segmented Control for Modes (Mobile & Desktop) */}
      <div className="m3-segmented-control" style={{ marginBottom: '1.75rem' }} role="tablist" aria-label="Percentage Modes">
        <button
          type="button"
          role="tab"
          aria-selected={activeMode === 'percentOf'}
          onClick={() => setActiveMode('percentOf')}
          className={`m3-segmented-tab ${activeMode === 'percentOf' ? 'active' : ''}`}
        >
          <Percent size={16} />
          <span>P% of X</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeMode === 'isWhatPercent'}
          onClick={() => setActiveMode('isWhatPercent')}
          className={`m3-segmented-tab ${activeMode === 'isWhatPercent' ? 'active' : ''}`}
        >
          <PieChart size={16} />
          <span>X is % of Y</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeMode === 'percentageChange'}
          onClick={() => setActiveMode('percentageChange')}
          className={`m3-segmented-tab ${activeMode === 'percentageChange' ? 'active' : ''}`}
        >
          <TrendingUp size={16} />
          <span>% Change</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeMode === 'addSubtract'}
          onClick={() => setActiveMode('addSubtract')}
          className={`m3-segmented-tab ${activeMode === 'addSubtract' ? 'active' : ''}`}
        >
          <SlidersHorizontal size={16} />
          <span>Add / Subtract %</span>
        </button>
      </div>

      {/* 2-Column Responsive Layout: Inputs on Left, Key Metrics on Right */}
      <div className="calculator-layout-grid">
        {/* =========================================================================
            LEFT COLUMN: INTERACTIVE CONTROLS FOR ACTIVE MODE
           ========================================================================= */}
        <div>
          {/* MODE 1: What is P% of X? */}
          {activeMode === 'percentOf' && (
            <div className="m3-card-elevated" style={{ padding: '1.75rem', animation: 'm3-fade-slide-up 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Calculate Percentage of a Value
                </h2>
                <span className="glass-pill" style={{ fontSize: '0.72rem' }}>P% × Total</span>
              </div>

              {/* Percentage Input with Range Slider */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Percentage (P)
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                    {p1}%
                  </span>
                </div>

                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={p1 === 0 ? '' : p1}
                    onChange={e => setP1(Math.max(0, Number(e.target.value)))}
                    className="m3-input-field"
                    placeholder="e.g. 15"
                    aria-label="Percentage value"
                  />
                  <span className="m3-input-unit">%</span>
                </div>

                {/* Synchronized Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.min(100, Math.max(0, p1))}
                  onChange={e => setP1(Number(e.target.value))}
                  className="m3-slider"
                  aria-label="Percentage range slider"
                />

                {/* Quick Presets */}
                <div className="m3-preset-pills">
                  {[5, 10, 15, 20, 25, 50, 75].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setP1(pct)}
                      className={`m3-preset-pill ${p1 === pct ? 'active' : ''}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Number Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Of Value (X)
                </label>
                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={x1 === 0 ? '' : x1}
                    onChange={e => setX1(Number(e.target.value))}
                    className="m3-input-field"
                    placeholder="e.g. 200"
                    aria-label="Target total number"
                  />
                  <span className="m3-input-unit">value</span>
                </div>

                <div className="m3-preset-pills">
                  {[50, 100, 200, 500, 1000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setX1(val)}
                      className={`m3-preset-pill ${x1 === val ? 'active' : ''}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: X is what % of Y? */}
          {activeMode === 'isWhatPercent' && (
            <div className="m3-card-elevated" style={{ padding: '1.75rem', animation: 'm3-fade-slide-up 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Portion & Ratio Percentage
                </h2>
                <span className="glass-pill" style={{ fontSize: '0.72rem' }}>(X ÷ Y) × 100</span>
              </div>

              {/* Part Value (X) */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Portion Value (X)
                </label>
                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={x2 === 0 ? '' : x2}
                    onChange={e => setX2(Number(e.target.value))}
                    className="m3-input-field"
                    placeholder="e.g. 45"
                    aria-label="Portion value"
                  />
                  <span className="m3-input-unit">part</span>
                </div>
              </div>

              {/* Total Value (Y) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Total Whole Value (Y)
                </label>
                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={y2 === 0 ? '' : y2}
                    onChange={e => setY2(Number(e.target.value))}
                    className="m3-input-field"
                    placeholder="e.g. 180"
                    aria-label="Total whole value"
                  />
                  <span className="m3-input-unit">total</span>
                </div>

                {y2 === 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.78rem', marginTop: '0.45rem', fontWeight: 600 }}>
                    <Info size={14} />
                    <span>Total (Y) cannot be zero. Enter a non-zero number.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MODE 3: Percentage Change (Increase / Decrease) */}
          {activeMode === 'percentageChange' && (
            <div className="m3-card-elevated" style={{ padding: '1.75rem', animation: 'm3-fade-slide-up 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Percentage Increase or Decrease
                </h2>
                <span className="glass-pill" style={{ fontSize: '0.72rem' }}>((New - Old) ÷ Old) × 100</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    Initial Value (Old)
                  </label>
                  <div className="m3-input-wrapper">
                    <input
                      type="number"
                      value={oldVal === 0 ? '' : oldVal}
                      onChange={e => setOldVal(Number(e.target.value))}
                      className="m3-input-field"
                      placeholder="e.g. 50"
                      aria-label="Old initial value"
                    />
                    <span className="m3-input-unit">old</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    Final Value (New)
                  </label>
                  <div className="m3-input-wrapper">
                    <input
                      type="number"
                      value={newVal === 0 ? '' : newVal}
                      onChange={e => setNewVal(Number(e.target.value))}
                      className="m3-input-field"
                      placeholder="e.g. 75"
                      aria-label="New final value"
                    />
                    <span className="m3-input-unit">new</span>
                  </div>
                </div>
              </div>

              {oldVal === 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.78rem', marginTop: '0.75rem', fontWeight: 600 }}>
                  <Info size={14} />
                  <span>Initial value cannot be zero when computing percentage change.</span>
                </div>
              )}
            </div>
          )}

          {/* MODE 4: Add / Subtract P% */}
          {activeMode === 'addSubtract' && (
            <div className="m3-card-elevated" style={{ padding: '1.75rem', animation: 'm3-fade-slide-up 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Add or Subtract Percentage
                </h2>
                <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Tax / Discount / Markup</span>
              </div>

              {/* Add vs Subtract Toggle */}
              <div style={{ display: 'flex', background: 'var(--surface-subtle)', padding: '0.25rem', borderRadius: 'var(--md-sys-shape-full)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAdd(true)}
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    borderRadius: 'var(--md-sys-shape-full)',
                    border: 'none',
                    background: isAdd ? 'var(--surface-solid)' : 'transparent',
                    color: isAdd ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: isAdd ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  + Add Percentage (Markup / Tax)
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdd(false)}
                  style={{
                    flex: 1,
                    minHeight: '40px',
                    borderRadius: 'var(--md-sys-shape-full)',
                    border: 'none',
                    background: !isAdd ? 'var(--surface-solid)' : 'transparent',
                    color: !isAdd ? '#ef4444' : 'var(--text-secondary)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: !isAdd ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  - Subtract Percentage (Discount)
                </button>
              </div>

              {/* Base Amount */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Base Amount
                </label>
                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={baseVal === 0 ? '' : baseVal}
                    onChange={e => setBaseVal(Number(e.target.value))}
                    className="m3-input-field"
                    placeholder="e.g. 120"
                    aria-label="Base amount"
                  />
                  <span className="m3-input-unit">base</span>
                </div>
              </div>

              {/* Percentage to Add/Subtract */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Percentage ({isAdd ? '+' : '-'}{addPct}%)
                  </label>
                </div>

                <div className="m3-input-wrapper">
                  <input
                    type="number"
                    value={addPct === 0 ? '' : addPct}
                    onChange={e => setAddPct(Math.max(0, Number(e.target.value)))}
                    className="m3-input-field"
                    placeholder="e.g. 10"
                    aria-label="Percentage rate"
                  />
                  <span className="m3-input-unit">%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Math.min(100, Math.max(0, addPct))}
                  onChange={e => setAddPct(Number(e.target.value))}
                  className="m3-slider"
                  aria-label="Percentage slider"
                />

                <div className="m3-preset-pills">
                  {[5, 10, 15, 18, 20, 25, 30].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setAddPct(pct)}
                      className={`m3-preset-pill ${addPct === pct ? 'active' : ''}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN: STRUCTURED "KEY METRICS" SUMMARY & VISUALIZATIONS
           ========================================================================= */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.75rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                Key Metrics Summary
              </span>

              {/* Copy Summary Button */}
              <button
                onClick={() => {
                  let copyStr = '';
                  if (activeMode === 'percentOf') copyStr = `${p1}% of ${x1} = ${res1.value}`;
                  if (activeMode === 'isWhatPercent') copyStr = `${x2} is ${res2.value}% of ${y2}`;
                  if (activeMode === 'percentageChange') copyStr = `Change from ${oldVal} to ${newVal} = ${res3.difference} (${res3.isIncrease ? '+' : '-'}${res3.percentageChange}%)`;
                  if (activeMode === 'addSubtract') copyStr = `${baseVal} ${isAdd ? '+' : '-'} ${addPct}% = ${res4.value}`;
                  copyText(copyStr, 'summary');
                }}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontWeight: 700 }}
              >
                {copied === 'summary' ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                <span>{copied === 'summary' ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            {/* HERO RESULT DISPLAY PER MODE */}
            {activeMode === 'percentOf' && (
              <div>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.25rem' }}>
                    {p1}% of {x1} is
                  </div>
                  <div key={res1.value} className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {res1.value.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.85, marginTop: '0.5rem' }}>
                    Calculation: <code>{res1.formulaString}</code>
                  </div>
                </div>

                {/* Proportional Bar Visualization */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    <span>Portion ({Math.min(100, Math.max(0, p1))}%)</span>
                    <span>Total (100%)</span>
                  </div>
                  <div className="m3-proportion-bar">
                    <div
                      className="m3-proportion-fill"
                      style={{ width: `${Math.min(100, Math.max(0, p1))}%` }}
                    />
                  </div>
                </div>

                {/* Secondary Key Metrics Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Decimal Multiplier</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {(p1 / 100).toFixed(4).replace(/\.?0+$/, '')}
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Remaining Balance</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {(x1 - res1.value).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'isWhatPercent' && (
              <div>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.25rem' }}>
                    {x2} is what percentage of {y2}?
                  </div>
                  <div key={res2.value} className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {res2.value}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.85, marginTop: '0.5rem' }}>
                    Formula: <code>{res2.formulaString}</code>
                  </div>
                </div>

                {/* Proportional Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    <span>Ratio Share ({Math.min(100, Math.max(0, res2.value))}%)</span>
                    <span>100%</span>
                  </div>
                  <div className="m3-proportion-bar">
                    <div
                      className="m3-proportion-fill"
                      style={{ width: `${Math.min(100, Math.max(0, res2.value))}%` }}
                    />
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Simplified Fraction</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {getFraction(x2, y2)}
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Decimal Fraction</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {y2 !== 0 ? (x2 / y2).toFixed(4) : '0'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'percentageChange' && (
              <div>
                <div style={{
                  textAlign: 'center',
                  padding: '1.5rem 1rem',
                  borderRadius: 'var(--md-sys-shape-lg)',
                  background: res3.isIncrease ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: `1.5px solid ${res3.isIncrease ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: res3.isIncrease ? 'var(--accent-emerald)' : '#ef4444', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    {res3.isIncrease ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>Total {res3.isIncrease ? 'INCREASE' : 'DECREASE'}</span>
                  </div>

                  <div key={res3.percentageChange} className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: res3.isIncrease ? 'var(--accent-emerald)' : '#ef4444', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {res3.isIncrease ? '+' : '-'}{res3.percentageChange}%
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 600 }}>
                    Absolute Difference: <strong>{res3.difference}</strong> ({oldVal} → {newVal})
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Growth Multiplier</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {oldVal !== 0 ? (newVal / oldVal).toFixed(3) + 'x' : 'N/A'}
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Formula</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      <code>{res3.formulaString}</code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'addSubtract' && (
              <div>
                <div style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.25rem' }}>
                    {baseVal} {isAdd ? '+' : '-'} {addPct}% =
                  </div>
                  <div key={res4.value} className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {res4.value.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.85, marginTop: '0.5rem' }}>
                    Change Amount: <strong>{isAdd ? '+' : '-'}{Number(((addPct / 100) * baseVal).toFixed(2)).toLocaleString()}</strong>
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Multiplier Factor</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      {isAdd ? (1 + addPct / 100).toFixed(2) : (1 - addPct / 100).toFixed(2)}x
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Calculation Formula</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                      <code>{res4.formulaString}</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slotType="leaderboard" adSlotId="percentage-calc-bottom-native" />

      {/* FAQ Section */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                style={{
                  background: 'var(--surface-solid)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--md-sys-shape-md)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
