import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateCompoundInterest, CompoundInterestInput } from '../utils/compoundInterestEngine';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  TrendingUp,
  Share2,
  Copy,
  Check,
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

              {/* Principal Input with Unit and Presets */}
              <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                <input
                  id="compound-principal-input"
                  type="number"
                  min="0"
                  step="500"
                  value={input.principal || ''}
                  onChange={e => setInput({ ...input, principal: Math.max(0, Number(e.target.value)) })}
                  className="m3-input-field"
                  placeholder="10000"
                  aria-label="Initial principal investment amount"
                />
                <span className="m3-input-unit">{currentCurrency.symbol}</span>
              </div>

              {/* Dynamic Currency Presets */}
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                {currentCurrency.defaultPresets.map((presetVal, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInput({ ...input, principal: presetVal })}
                    className={`m3-preset-pill ${input.principal === presetVal ? 'active' : ''}`}
                  >
                    {currentCurrency.presetLabels?.[idx] || `${currentCurrency.symbol}${presetVal.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Return Rate with Synchronized Range Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor="compound-interest-slider" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Estimated Annual Interest Rate
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                  {input.annualInterestRate}% p.a.
                </span>
              </div>
              <input
                id="compound-interest-slider"
                type="range"
                min="1"
                max="30"
                step="0.25"
                value={input.annualInterestRate}
                onChange={e => setInput({ ...input, annualInterestRate: Number(e.target.value) })}
                className="m3-slider"
                aria-label="Annual interest rate slider"
              />
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[5, 7, 8, 10, 12, 15].map(rate => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setInput({ ...input, annualInterestRate: rate })}
                    className={`m3-preset-pill ${input.annualInterestRate === rate ? 'active' : ''}`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Tenure (Years) with Synchronized Slider */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label htmlFor="compound-tenure-slider" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Investment Duration
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                  {input.tenureYears} Years
                </span>
              </div>
              <input
                id="compound-tenure-slider"
                type="range"
                min="1"
                max="40"
                value={input.tenureYears}
                onChange={e => setInput({ ...input, tenureYears: Number(e.target.value) })}
                className="m3-slider"
                aria-label="Investment tenure in years slider"
              />
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[3, 5, 10, 15, 20, 25, 30].map(yr => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setInput({ ...input, tenureYears: yr })}
                    className={`m3-preset-pill ${input.tenureYears === yr ? 'active' : ''}`}
                  >
                    {yr} yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Regular Contribution & Frequency */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label htmlFor="additional-contrib-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Regular Periodic Deposit
                </label>
                <div className="m3-input-wrapper">
                  <input
                    id="additional-contrib-input"
                    type="number"
                    min="0"
                    step="50"
                    value={input.additionalContribution}
                    onChange={e => setInput({ ...input, additionalContribution: Math.max(0, Number(e.target.value)) })}
                    className="m3-input-field"
                    placeholder="200"
                    aria-label="Periodic deposit amount"
                  />
                  <span className="m3-input-unit">{currentCurrency.symbol}</span>
                </div>
              </div>

              <div>
                <label htmlFor="contrib-frequency-select" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Deposit Frequency
                </label>
                <div className="m3-segmented-control">
                  <button
                    type="button"
                    onClick={() => setInput({ ...input, contributionFrequency: 'monthly' })}
                    className={`m3-segmented-tab ${input.contributionFrequency === 'monthly' ? 'active' : ''}`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setInput({ ...input, contributionFrequency: 'yearly' })}
                    className={`m3-segmented-tab ${input.contributionFrequency === 'yearly' ? 'active' : ''}`}
                  >
                    Annually
                  </button>
                </div>
              </div>
            </div>

            {/* Compounding Frequency Segmented Control */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                Compounding Frequency
              </label>
              <div className="m3-segmented-control" style={{ overflowX: 'auto' }}>
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
                    className={`m3-segmented-tab ${input.compoundFrequency === freq.id ? 'active' : ''}`}
                    style={{ minWidth: '70px', padding: '0.45rem 0.6rem' }}
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
                  type="button"
                  onClick={handleCopy}
                  title="Copy calculation summary"
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                  aria-label="Copy compound interest summary"
                >
                  {copied ? <Check size={14} color="#146c2e" /> : <Copy size={14} />}
                  <span>{copied ? '✓ Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  title="Share calculation"
                  className="btn-primary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                  aria-label="Share compound interest calculation"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Future Value Highlight with Value-Pop Micro-Animation */}
            <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.35rem' }}>
                Total Future Portfolio Value
              </div>
              <div
                key={result.futureValue}
                className="value-pop"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 2.85rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {currentCurrency.symbol}{result.futureValue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.9, marginTop: '0.45rem', fontWeight: 600 }}>
                After {input.tenureYears} years @ {input.annualInterestRate}% annual rate ({input.compoundFrequency})
              </div>
            </div>

            {/* Key Metric Blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="m3-card-filled" style={{ padding: '1rem', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Total Principal Invested
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {currentCurrency.symbol}{result.totalPrincipal.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)', marginTop: '0.2rem', fontWeight: 600 }}>
                  {result.principalPercentage}% of total portfolio
                </div>
              </div>

              <div className="m3-card-filled" style={{ padding: '1rem', background: 'rgba(20, 108, 46, 0.08)', border: '1.5px solid rgba(20, 108, 46, 0.25)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#146c2e' }}>
                  Total Compound Growth
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#146c2e', marginTop: '0.2rem' }}>
                  +{currentCurrency.symbol}{result.totalInterest.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.725rem', color: '#146c2e', opacity: 0.9, marginTop: '0.2rem', fontWeight: 700 }}>
                  {result.interestPercentage}% pure growth
                </div>
              </div>
            </div>

            {/* Enhanced Proportional Growth Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--md-sys-color-primary)' }} />
                  Principal ({result.principalPercentage}%)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#146c2e' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#146c2e' }} />
                  Interest ({result.interestPercentage}%)
                </span>
              </div>
              <div className="m3-proportion-bar" style={{ height: '14px' }}>
                <div style={{ width: `${result.principalPercentage}%`, background: 'var(--md-sys-color-primary)' }} />
                <div style={{ width: `${result.interestPercentage}%`, background: '#146c2e' }} />
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
      {/* Comprehensive Editorial & Explanatory Article */}
      <CalculatorArticleView
        calculatorId="compound-interest-calculator"
        calculatorName="Compound Interest Calculator"
        categoryName="Finance"
      />
    </div>
  );
};
