import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateSIP, SIPInput } from '../utils/financeEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  LineChart,
  Copy,
  Check,
  Share2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface SIPCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const SIPCalculatorPage: React.FC<SIPCalculatorPageProps> = ({ onNavigate }) => {
  const {
    currency,
    currentCurrency,
    setCurrency,
    supportedCurrencies
  } = useLocalization();

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'sip-calculator') || CALCULATORS_REGISTRY[5];

  const defaultMonthly = currency === 'INR' ? 5000 : 500;

  const [input, setInput] = useState<SIPInput>({
    monthlyInvestment: defaultMonthly,
    annualRate: 12,
    tenureYears: 10,
    annualStepUpPercent: 0
  });

  const [stepUpEnabled, setStepUpEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateSIP({
      ...input,
      annualStepUpPercent: stepUpEnabled ? input.annualStepUpPercent : 0
    });
  }, [input, stepUpEnabled]);

  const handleCopy = () => {
    const text = `SIP Investment Summary:\nMonthly Investment: ${currentCurrency.symbol}${input.monthlyInvestment.toLocaleString()}\nExpected Return: ${input.annualRate}% p.a.\nTime Horizon: ${input.tenureYears} Years\nTotal Invested: ${currentCurrency.symbol}${result.totalInvested.toLocaleString()}\nEstimated Returns: ${currentCurrency.symbol}${result.estimatedReturns.toLocaleString()}\nFuture Value: ${currentCurrency.symbol}${result.futureValue.toLocaleString()} (${result.wealthRatio}x growth)\nCalculated via Calculator360.com (${currency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SIP Return Calculation - Calculator360',
        text: `My SIP of ${currentCurrency.symbol}${input.monthlyInvestment.toLocaleString()}/mo grows to ${currentCurrency.symbol}${result.futureValue.toLocaleString()} in ${input.tenureYears} years!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const investedPct = result.futureValue > 0 ? Math.round((result.totalInvested / result.futureValue) * 100) : 50;
  const returnsPct = 100 - investedPct;

  const monthlyPresets = currency === 'INR'
    ? [2000, 5000, 10000, 25000, 50000]
    : [100, 250, 500, 1000, 2000];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
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
            <LineChart size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            SIP & Mutual Fund Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          See how regular monthly investments compound into serious wealth over time. Test return rates, time horizons, and annual step-up contributions—free and 100% private.
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: Interactive Controls & Results */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Monthly Investment Parameters
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Currency:</span>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.8rem',
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

            {/* Monthly Investment Slider & Presets */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Monthly SIP Amount
                </label>
                <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>
                  {currentCurrency.symbol}{input.monthlyInvestment.toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                {monthlyPresets.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setInput(prev => ({ ...prev, monthlyInvestment: val }))}
                    className={`m3-preset-pill ${input.monthlyInvestment === val ? 'active' : ''}`}
                  >
                    {currentCurrency.symbol}{val.toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min={currency === 'INR' ? 500 : 50}
                max={currency === 'INR' ? 100000 : 10000}
                step={currency === 'INR' ? 500 : 50}
                value={input.monthlyInvestment}
                onChange={e => setInput(prev => ({ ...prev, monthlyInvestment: Number(e.target.value) }))}
                className="m3-slider"
              />
            </div>

            {/* Return Rate & Time Period Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Expected Return Rate */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Expected Return Rate (CAGR)
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    {input.annualRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="25"
                  step="0.5"
                  value={input.annualRate}
                  onChange={e => setInput(prev => ({ ...prev, annualRate: Number(e.target.value) }))}
                  className="m3-slider"
                />
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {[8, 10, 12, 15, 18].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, annualRate: r }))}
                      className={`m3-preset-pill ${input.annualRate === r ? 'active' : ''}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Period in Years */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Investment Horizon
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {input.tenureYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={input.tenureYears}
                  onChange={e => setInput(prev => ({ ...prev, tenureYears: Number(e.target.value) }))}
                  className="m3-slider"
                />
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {[3, 5, 10, 15, 20, 25].map(y => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, tenureYears: y }))}
                      className={`m3-preset-pill ${input.tenureYears === y ? 'active' : ''}`}
                    >
                      {y} yr
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Step-Up Toggle */}
            <div style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--md-sys-shape-md)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} color="#0b57d0" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Annual Step-Up SIP (Increase SIP each year)
                  </span>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                  <input
                    type="checkbox"
                    checked={stepUpEnabled}
                    onChange={e => setStepUpEnabled(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    inset: 0,
                    background: stepUpEnabled ? '#0b57d0' : 'var(--border-subtle)',
                    borderRadius: '34px',
                    transition: '0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '16px',
                      width: '16px',
                      left: stepUpEnabled ? '20px' : '3px',
                      bottom: '3px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.3s'
                    }} />
                  </span>
                </label>
              </div>

              {stepUpEnabled && (
                <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.825rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Annual Increment:</span>
                    <span style={{ fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{input.annualStepUpPercent}% / year</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="5"
                    value={input.annualStepUpPercent || 10}
                    onChange={e => setInput(prev => ({ ...prev, annualStepUpPercent: Number(e.target.value) }))}
                    className="m3-slider"
                  />
                </div>
              )}
            </div>

            {/* Results Banner */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-lg)',
              padding: '1.75rem 1.5rem',
              border: '1.5px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Expected Maturity Wealth
              </div>
              <div
                key={result.futureValue}
                className="value-pop"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                  fontWeight: 900,
                  color: 'var(--accent-emerald)',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem'
                }}
              >
                {currentCurrency.symbol}{result.futureValue.toLocaleString()}
              </div>

              <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                ⭐ Wealth Multiplier: {result.wealthRatio}x your invested capital
              </div>

              {/* Proportion Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="m3-proportion-bar" style={{ height: '16px', marginBottom: '0.65rem' }}>
                  <div style={{ width: `${investedPct}%`, background: '#0b57d0' }} title={`Invested: ${investedPct}%`} />
                  <div style={{ width: `${returnsPct}%`, background: '#059669' }} title={`Returns: ${returnsPct}%`} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--md-sys-color-primary)' }}>● Total Invested: {currentCurrency.symbol}{result.totalInvested.toLocaleString()} ({investedPct}%)</span>
                  <span style={{ color: 'var(--accent-emerald)' }}>● Estimated Gain: {currentCurrency.symbol}{result.estimatedReturns.toLocaleString()} ({returnsPct}%)</span>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '1rem', textAlign: 'left' }}>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Invested Amount</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginTop: '0.2rem' }}>
                    {currentCurrency.symbol}{result.totalInvested.toLocaleString()}
                  </div>
                </div>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Profit</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                    {currentCurrency.symbol}{result.estimatedReturns.toLocaleString()}
                  </div>
                </div>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Time Horizon</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {input.tenureYears} Years ({input.tenureYears * 12} mo)
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied Summary!' : 'Copy Summary'}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Share2 size={16} />
                <span>Share Results</span>
              </button>
            </div>
          </div>

          {/* Year-by-Year Growth Table */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Year-by-Year Wealth Progression
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'right' }}>
                    <th style={{ textAlign: 'left', padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>Year</th>
                    <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>Deposited</th>
                    <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>Total Invested</th>
                    <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>Interest Earned</th>
                    <th style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>Future Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map(item => (
                    <tr key={item.year} style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                      <td style={{ textAlign: 'left', padding: '0.6rem 0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Year {item.year}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{currentCurrency.symbol}{item.yearlyDeposit.toLocaleString()}</td>
                      <td style={{ padding: '0.6rem 0.5rem', color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>{currentCurrency.symbol}{item.totalInvested.toLocaleString()}</td>
                      <td style={{ padding: '0.6rem 0.5rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>+{currentCurrency.symbol}{item.interestEarned.toLocaleString()}</td>
                      <td style={{ padding: '0.6rem 0.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentCurrency.symbol}{item.futureValue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="calculator-sidebar">
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--primary-500)" />
              <span>Smart SIP Insights</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>Power of Compounding:</strong> Returns in the later 5 years often exceed the entire investment of the first 10 years combined.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>Rupee/Dollar Cost Averaging:</strong> SIP buys more units when markets dip and fewer when markets surge, lowering average purchase cost.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>Step-Up Miracle:</strong> Increasing your monthly SIP by just 10% annually can boost your final corpus by up to 60%!</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Editorial Article */}
      <CalculatorArticleView
        calculatorId="sip-calculator"
        calculatorName="SIP & Mutual Fund Calculator"
        categoryName="finance"
      />
    </div>
  );
};
