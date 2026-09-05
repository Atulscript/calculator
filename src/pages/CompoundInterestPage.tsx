import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateCompoundInterest, CompoundInterestInput } from '../utils/compoundInterestEngine';
import { useLocalization } from '../context/LocalizationContext';
import {
  TrendingUp,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface CompoundInterestPageProps {
  onNavigate: (path: string) => void;
}

export const CompoundInterestPage: React.FC<CompoundInterestPageProps> = ({ onNavigate }) => {
  const {
    currency,
    currentCurrency,
    setCurrency,
    supportedCurrencies
  } = useLocalization();

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'compound-interest-calculator') || CALCULATORS_REGISTRY[1];

  const [input, setInput] = useState<CompoundInterestInput>(() => ({
    principal: currentCurrency.defaultPresets[1] || 10000,
    annualInterestRate: 8,
    tenureYears: 10,
    compoundFrequency: 'annually',
    additionalContribution: 200,
    contributionFrequency: 'monthly'
  }));

  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Compound Interest Calculator - Future Value & Growth Forecast | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculate compound interest, investment returns, future portfolio value, and explore year-by-year compound growth schedules with regular deposits.'
      );
    }
  }, []);

  const result = useMemo(() => calculateCompoundInterest(input), [input]);

  const handleCopy = () => {
    const text = `Compound Interest Projection:\nInitial Principal: ${currentCurrency.symbol}${input.principal.toLocaleString()}\nFuture Value (${input.tenureYears} Years @ ${input.annualInterestRate}%): ${currentCurrency.symbol}${result.futureValue.toLocaleString()}\nTotal Interest Earned: ${currentCurrency.symbol}${result.totalInterest.toLocaleString()}\nCalculated via Calculator360.app (${currency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compound Interest Calculation - Calculator360',
          text: `Future Value: ${currentCurrency.symbol}${result.futureValue.toLocaleString()} in ${input.tenureYears} years.`,
          url: window.location.href
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const faqs = [
    {
      q: 'What is compound interest and how does it differ from simple interest?',
      a: 'Compound interest is interest earned on both your initial principal and on the interest accumulated over previous periods ("interest on interest"). Unlike simple interest, which grows linearly, compound interest grows exponentially over time.'
    },
    {
      q: 'What is the Rule of 72 in compound interest?',
      a: 'The Rule of 72 is a quick mental shortcut to estimate how many years it takes for an investment to double: divide 72 by the annual interest rate. For example, at an 8% annual return, your money doubles in approximately 72 / 8 = 9 years.'
    },
    {
      q: 'Does compounding frequency make a significant difference?',
      a: 'Yes. More frequent compounding (such as monthly or daily versus annually) generates slightly higher returns because your interest is calculated and reinvested earlier and more frequently.'
    },
    {
      q: 'Are regular monthly contributions factored into this calculator?',
      a: 'Yes! You can specify optional monthly or annual deposits. Each deposit begins earning compound interest from the time it is contributed, substantially compounding your terminal wealth.'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumbs */}
      <div style={{ marginBottom: '1rem' }}>
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
            <TrendingUp size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Compound Interest Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Forecast your long-term wealth growth, compare compounding frequencies, and see the exponential power of regular monthly contributions over time.
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: Inputs & Sliders */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Initial Investment & Currency */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Initial Investment (Principal)
                </label>
                
                {/* In-tool Currency Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Currency:
                  </span>
                  <select
                    value={currency}
                    onChange={e => {
                      const newCurrCode = e.target.value;
                      setCurrency(newCurrCode);
                      const newInfo = supportedCurrencies.find(c => c.code === newCurrCode);
                      if (newInfo && newInfo.defaultPresets && newInfo.defaultPresets.length >= 2) {
                        setInput(prev => ({ ...prev, principal: newInfo.defaultPresets[1] || newInfo.defaultPresets[0] }));
                      }
                    }}
                    style={{
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.825rem',
                      fontWeight: 800,
                      borderRadius: 'var(--md-sys-shape-full)',
                      border: '1.5px solid var(--primary-600)',
                      background: 'var(--surface-solid)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {supportedCurrencies.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--primary-600)', fontSize: '1.15rem' }}>
                  {currentCurrency.symbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={input.principal || ''}
                  onChange={e => setInput({ ...input, principal: Math.max(0, Number(e.target.value)) })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Dynamic Currency Presets */}
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {currentCurrency.defaultPresets.map((presetVal, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInput({ ...input, principal: presetVal })}
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: 'var(--md-sys-shape-xs)',
                      background: input.principal === presetVal ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                      border: input.principal === presetVal ? '1px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                      color: input.principal === presetVal ? 'var(--primary-600)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {currentCurrency.presetLabels?.[idx] || `${currentCurrency.symbol}${presetVal.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Return Rate */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Estimated Annual Interest Rate (%)
                </label>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                  {input.annualInterestRate}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.25"
                value={input.annualInterestRate}
                onChange={e => setInput({ ...input, annualInterestRate: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--md-sys-color-primary)' }}
              />
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[5, 7, 8, 10, 12, 15].map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setInput({ ...input, annualInterestRate: rate })}
                    style={{
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '4px',
                      background: input.annualInterestRate === rate ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: input.annualInterestRate === rate ? 'var(--primary-600)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Tenure (Years) */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Investment Duration (Years)
                </label>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                  {input.tenureYears} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={input.tenureYears}
                onChange={e => setInput({ ...input, tenureYears: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--md-sys-color-primary)' }}
              />
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[3, 5, 10, 15, 20, 25, 30].map(yr => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setInput({ ...input, tenureYears: yr })}
                    style={{
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '4px',
                      background: input.tenureYears === yr ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      color: input.tenureYears === yr ? 'var(--primary-600)' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {yr} yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Regular Contribution & Frequency */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Regular Contribution ({currentCurrency.symbol})
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={input.additionalContribution}
                  onChange={e => setInput({ ...input, additionalContribution: Math.max(0, Number(e.target.value)) })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Deposit Frequency
                </label>
                <select
                  value={input.contributionFrequency}
                  onChange={e => setInput({ ...input, contributionFrequency: e.target.value as 'monthly' | 'yearly' })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.925rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Annually</option>
                </select>
              </div>
            </div>

            {/* Compounding Frequency */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                Compound Frequency
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.45rem' }}>
                {[
                  { id: 'annually', label: 'Annually' },
                  { id: 'semi-annually', label: 'Semi-Annual' },
                  { id: 'quarterly', label: 'Quarterly' },
                  { id: 'monthly', label: 'Monthly' },
                  { id: 'daily', label: 'Daily' }
                ].map(freq => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setInput({ ...input, compoundFrequency: freq.id as any })}
                    style={{
                      padding: '0.5rem 0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      borderRadius: 'var(--md-sys-shape-xs)',
                      background: input.compoundFrequency === freq.id ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                      border: input.compoundFrequency === freq.id ? '1.5px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                      color: input.compoundFrequency === freq.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Results & Growth Breakdown */}
        <div>
          {/* Main Elevated Results Card */}
          <div className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '1.75rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                Forecast Summary
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopy}
                  title="Copy calculation summary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleShare}
                  title="Share calculation"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Future Value Highlight */}
            <div style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.3rem' }}>
                Total Future Investment Value
              </div>
              <div style={{ fontSize: 'clamp(2rem, 4.5vw, 2.75rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {currentCurrency.symbol}{result.futureValue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.85, marginTop: '0.35rem' }}>
                After {input.tenureYears} years @ {input.annualInterestRate}% annual rate
              </div>
            </div>

            {/* Key Metric Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Total Principal Invested
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {currentCurrency.symbol}{result.totalPrincipal.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>
                  {result.principalPercentage}% of total portfolio
                </div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  Total Compound Interest
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                  +{currentCurrency.symbol}{result.totalInterest.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', opacity: 0.9, marginTop: '0.15rem' }}>
                  {result.interestPercentage}% pure growth
                </div>
              </div>
            </div>

            {/* Proportional Growth Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                <span>Principal ({result.principalPercentage}%)</span>
                <span>Interest Earned ({result.interestPercentage}%)</span>
              </div>
              <div style={{ width: '100%', height: '14px', borderRadius: 'var(--md-sys-shape-full)', background: 'var(--surface-subtle)', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${result.principalPercentage}%`, background: 'var(--primary-500)', transition: 'width 0.3s ease' }} />
                <div style={{ width: `${result.interestPercentage}%`, background: 'var(--accent-emerald)', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          </div>

          {/* Quick Insights Pill */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Exponential Growth Power: </strong>
              Your money earns <strong>{currentCurrency.symbol}{result.totalInterest.toLocaleString()}</strong> in compound growth, multiplying your initial investment by <strong>{(result.futureValue / (input.principal || 1)).toFixed(1)}x</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-Year Growth Table */}
      <section style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Year-by-Year Investment Growth Schedule
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Detailed annual progression of deposits, yearly interest earned, and ending balance.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', background: 'var(--surface-solid)', borderRadius: 'var(--md-sys-shape-lg)', border: '1.5px solid var(--border-subtle)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'right' }}>
            <thead>
              <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1.5px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left' }}>Year</th>
                <th style={{ padding: '0.85rem 1rem' }}>Starting Balance</th>
                <th style={{ padding: '0.85rem 1rem' }}>Deposits</th>
                <th style={{ padding: '0.85rem 1rem' }}>Interest Earned</th>
                <th style={{ padding: '0.85rem 1rem' }}>Ending Balance</th>
                <th style={{ padding: '0.85rem 1rem' }}>Total Interest</th>
              </tr>
            </thead>
            <tbody>
              {result.yearlyBreakdown.map(row => (
                <tr key={row.year} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background-color 0.1s ease' }}>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Year {row.year}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                    {currentCurrency.symbol}{row.startingBalance.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--primary-600)', fontWeight: 600 }}>
                    +{currentCurrency.symbol}{row.contributions.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    +{currentCurrency.symbol}{row.interestEarned.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentCurrency.symbol}{row.endingBalance.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                    {currentCurrency.symbol}{row.totalInterest.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slotType="leaderboard" adSlotId="compound-calc-bottom-native" />

      {/* FAQ Accordion */}
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
                  overflow: 'hidden',
                  transition: 'border-color 0.15s ease'
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
