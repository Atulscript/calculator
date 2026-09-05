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
  ArrowRight
} from 'lucide-react';

interface PercentageCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const PercentageCalculatorPage: React.FC<PercentageCalculatorPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'percentage-calculator') || CALCULATORS_REGISTRY[3];

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

  const res1 = calculatePercentOfNumber(p1, x1);
  const res2 = calculateNumberIsWhatPercentOfTotal(x2, y2);
  const res3 = calculatePercentageChange(oldVal, newVal);
  const res4 = calculateAddSubtractPercentage(baseVal, addPct, isAdd);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqs = [
    {
      q: 'How do you calculate percentage of a number?',
      a: 'To calculate P% of X, convert the percentage to a decimal by dividing by 100 (P / 100), and then multiply by X. For example, 15% of 200 is (15 / 100) × 200 = 30.'
    },
    {
      q: 'How do you calculate percentage increase or decrease?',
      a: 'Subtract the old number from the new number to find the difference: (New - Old). Divide that difference by the absolute value of the old number, and multiply by 100: ((New - Old) / |Old|) × 100.'
    },
    {
      q: 'How do you add sales tax or tip percentage?',
      a: 'Multiply the base price by the tax or tip rate as a decimal (e.g. 8.25% = 0.0825), then add the result to the base price. Example: $100 + ($100 × 0.0825) = $108.25.'
    },
    {
      q: 'What is the fastest way to calculate 15% or 20% mentally?',
      a: 'To find 10%, move the decimal point one place to the left. For 20%, double the 10% figure. For 15%, take 10% and add half of it (5%).'
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
            width: '38px',
            height: '38px',
            borderRadius: 'var(--md-sys-shape-md)',
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Percent size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Percentage Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Quickly solve common percentage problems: find percentages of numbers, percentage change, markup, discount, and portions.
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: 4 Interactive Practical Modes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Mode 1: What is P% of X? */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1. What is P% of X?
              </h2>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Standard Percentage</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>What is</span>
              <input
                type="number"
                value={p1}
                onChange={e => setP1(Number(e.target.value) || 0)}
                style={{
                  width: '90px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>% of</span>
              <input
                type="number"
                value={x1}
                onChange={e => setX1(Number(e.target.value) || 0)}
                style={{
                  width: '120px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>?</span>
            </div>

            {/* Mode 1 Result Box */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-md)',
              padding: '1rem 1.25rem',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Result
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>
                  {res1.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Formula: <code>{res1.formulaString}</code>
                </div>
              </div>

              <button
                onClick={() => copyText(`${p1}% of ${x1} = ${res1.value}`, 'm1')}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copied === 'm1' ? <Check size={14} color="#146c2e" /> : <Copy size={14} />}
                <span>{copied === 'm1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Mode 2: X is what % of Y? */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                2. X is what percent of Y?
              </h2>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Portion / Ratio</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <input
                type="number"
                value={x2}
                onChange={e => setX2(Number(e.target.value) || 0)}
                style={{
                  width: '100px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>is what percent of</span>
              <input
                type="number"
                value={y2}
                onChange={e => setY2(Number(e.target.value) || 0)}
                style={{
                  width: '110px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>?</span>
            </div>

            {/* Mode 2 Result Box */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-md)',
              padding: '1rem 1.25rem',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Percentage Ratio
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>
                  {res2.value}%
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Formula: <code>{res2.formulaString}</code>
                </div>
              </div>

              <button
                onClick={() => copyText(`${x2} is ${res2.value}% of ${y2}`, 'm2')}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copied === 'm2' ? <Check size={14} color="#146c2e" /> : <Copy size={14} />}
                <span>{copied === 'm2' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Mode 3: Percentage Increase or Decrease */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                3. Percentage Change (Increase / Decrease)
              </h2>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Growth & Change</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>From</span>
              <input
                type="number"
                value={oldVal}
                onChange={e => setOldVal(Number(e.target.value) || 0)}
                style={{
                  width: '100px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>to</span>
              <input
                type="number"
                value={newVal}
                onChange={e => setNewVal(Number(e.target.value) || 0)}
                style={{
                  width: '100px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
            </div>

            {/* Mode 3 Result Box */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-md)',
              padding: '1rem 1.25rem',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {res3.isIncrease ? 'Percentage Increase' : 'Percentage Decrease'}
                </div>
                <div style={{
                  fontSize: '1.85rem',
                  fontWeight: 900,
                  color: res3.isIncrease ? '#146c2e' : '#b3261e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  {res3.isIncrease ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  <span>{res3.isIncrease ? '+' : '-'}{res3.percentageChange}%</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Absolute Difference: {res3.difference} | <code>{res3.formulaString}</code>
                </div>
              </div>

              <button
                onClick={() => copyText(`From ${oldVal} to ${newVal}: ${res3.isIncrease ? '+' : '-'}${res3.percentageChange}%`, 'm3')}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copied === 'm3' ? <Check size={14} color="#146c2e" /> : <Copy size={14} />}
                <span>{copied === 'm3' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Mode 4: Add or Subtract P% (Sales Tax / Discount) */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                4. Add or Subtract P% (Tax / Discount)
              </h2>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAdd(true)}
                  className={`tab-btn ${isAdd ? 'active' : ''}`}
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                >
                  + Add (Tax)
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdd(false)}
                  className={`tab-btn ${!isAdd ? 'active' : ''}`}
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                >
                  - Subtract (Discount)
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <input
                type="number"
                value={baseVal}
                onChange={e => setBaseVal(Number(e.target.value) || 0)}
                style={{
                  width: '110px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color: isAdd ? '#146c2e' : '#b3261e' }}>
                {isAdd ? '+' : '−'}
              </span>
              <input
                type="number"
                value={addPct}
                onChange={e => setAddPct(Number(e.target.value) || 0)}
                style={{
                  width: '90px',
                  padding: '0.55rem 0.65rem',
                  borderRadius: 'var(--md-sys-shape-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
              />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>%</span>
            </div>

            {/* Mode 4 Result Box */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-md)',
              padding: '1rem 1.25rem',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Total Final Amount
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>
                  {res4.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {res4.stepExplanation}
                </div>
              </div>

              <button
                onClick={() => copyText(`${baseVal} ${isAdd ? '+' : '-' } ${addPct}% = ${res4.value}`, 'm4')}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copied === 'm4' ? <Check size={14} color="#146c2e" /> : <Copy size={14} />}
                <span>{copied === 'm4' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ border: '1.5px solid var(--border-subtle)', borderRadius: 'var(--md-sys-shape-md)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.15rem',
                      background: 'var(--surface-solid)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFaq === idx && (
                    <div style={{
                      padding: '0.85rem 1.15rem 1.15rem',
                      background: 'var(--surface-subtle)',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--border-subtle)'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="calculator-sidebar">
          {/* Ad Slot */}
          <AdBanner slotType="rectangle" />

          {/* Common Percentage Equivalents Card */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Common Percentage Equivalents
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.825rem' }}>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>10%</strong> = 1/10 (0.10)
              </div>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>20%</strong> = 1/5 (0.20)
              </div>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>25%</strong> = 1/4 (0.25)
              </div>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>33.3%</strong> = 1/3 (0.33)
              </div>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>50%</strong> = 1/2 (0.50)
              </div>
              <div style={{ padding: '0.45rem', background: 'var(--surface-subtle)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <strong>75%</strong> = 3/4 (0.75)
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Related Financial & Math Tools
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => onNavigate('/loan-calculator')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.35rem 0',
                  color: 'var(--md-sys-color-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Loan & EMI Calculator</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('/compound-interest-calculator')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.35rem 0',
                  color: 'var(--md-sys-color-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Compound Interest Calculator</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('/bmi-calculator')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.35rem 0',
                  color: 'var(--md-sys-color-primary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>BMI Calculator</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
