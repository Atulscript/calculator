import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateMortgage, MortgageInput } from '../utils/financeEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Home,
  Copy,
  Check,
  Share2,
  Sparkles
} from 'lucide-react';

interface MortgageCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const MortgageCalculatorPage: React.FC<MortgageCalculatorPageProps> = ({ onNavigate }) => {
  const {
    currency,
    currentCurrency,
    setCurrency,
    supportedCurrencies
  } = useLocalization();

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'mortgage-calculator') || CALCULATORS_REGISTRY[4];

  const defaultHomePrice = currency === 'INR' ? 7500000 : 400000;
  const defaultDownPct = 20;

  const [input, setInput] = useState<MortgageInput>({
    homePrice: defaultHomePrice,
    downPayment: defaultHomePrice * (defaultDownPct / 100),
    downPaymentPercent: defaultDownPct,
    annualRate: 6.8,
    tenureYears: 30,
    annualPropertyTax: 1.2, // 1.2%
    annualHomeInsurance: currency === 'INR' ? 15000 : 1400,
    annualPMI: 0.8, // 0.8%
    monthlyHOA: currency === 'INR' ? 2500 : 150
  });

  const [copied, setCopied] = useState(false);

  const result = useMemo(() => calculateMortgage(input), [input]);

  const handleHomePriceChange = (price: number) => {
    const down = Math.round(price * (input.downPaymentPercent / 100));
    setInput(prev => ({
      ...prev,
      homePrice: price,
      downPayment: down
    }));
  };

  const handleDownPctChange = (pct: number) => {
    const down = Math.round(input.homePrice * (pct / 100));
    setInput(prev => ({
      ...prev,
      downPaymentPercent: pct,
      downPayment: down
    }));
  };

  const handleCopy = () => {
    const text = `Mortgage Calculation Summary:\nHome Price: ${currentCurrency.symbol}${input.homePrice.toLocaleString()}\nDown Payment: ${currentCurrency.symbol}${input.downPayment.toLocaleString()} (${input.downPaymentPercent}%)\nLoan Amount: ${currentCurrency.symbol}${result.loanAmount.toLocaleString()}\nTotal Monthly Payment: ${currentCurrency.symbol}${result.totalMonthlyPayment.toLocaleString()}\n- Principal & Interest: ${currentCurrency.symbol}${result.monthlyPrincipalInterest.toLocaleString()}\n- Property Taxes: ${currentCurrency.symbol}${result.monthlyPropertyTax.toLocaleString()}\n- Home Insurance: ${currentCurrency.symbol}${result.monthlyHomeInsurance.toLocaleString()}\n- PMI: ${currentCurrency.symbol}${result.monthlyPMI.toLocaleString()}\n- HOA: ${currentCurrency.symbol}${result.monthlyHOA.toLocaleString()}\nCalculated via Calculator360.com (${currency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mortgage Calculation - Calculator360',
        text: `Estimated monthly mortgage on ${currentCurrency.symbol}${input.homePrice.toLocaleString()} home: ${currentCurrency.symbol}${result.totalMonthlyPayment.toLocaleString()}/mo.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const piPct = result.totalMonthlyPayment > 0 ? (result.monthlyPrincipalInterest / result.totalMonthlyPayment) * 100 : 70;
  const taxPct = result.totalMonthlyPayment > 0 ? (result.monthlyPropertyTax / result.totalMonthlyPayment) * 100 : 15;
  const insPct = result.totalMonthlyPayment > 0 ? (result.monthlyHomeInsurance / result.totalMonthlyPayment) * 100 : 10;
  const pmiPct = result.totalMonthlyPayment > 0 ? (result.monthlyPMI / result.totalMonthlyPayment) * 100 : 0;
  const hoaPct = result.totalMonthlyPayment > 0 ? (result.monthlyHOA / result.totalMonthlyPayment) * 100 : 5;

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
            <Home size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Mortgage & Home Loan Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Calculate your true monthly housing payment—including Principal, Interest, local Property Taxes, Hazard Insurance, and PMI. 100% private, no contact forms, and no lender calls.
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: Interactive Inputs & Result */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Currency Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Property & Loan Details
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

            {/* Home Price Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Home Purchase Price
                </label>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>
                  {currentCurrency.symbol}{input.homePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="5000"
                value={input.homePrice}
                onChange={e => handleHomePriceChange(Number(e.target.value) || 0)}
                className="m3-input-field"
                style={{ marginBottom: '0.65rem', width: '100%' }}
              />
              <input
                type="range"
                min={currency === 'INR' ? 1000000 : 100000}
                max={currency === 'INR' ? 50000000 : 2500000}
                step={currency === 'INR' ? 500000 : 25000}
                value={input.homePrice}
                onChange={e => handleHomePriceChange(Number(e.target.value))}
                className="m3-slider"
              />
            </div>

            {/* Down Payment & Interest Rate Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Down Payment */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Down Payment ({input.downPaymentPercent}%)
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                    {currentCurrency.symbol}{input.downPayment.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={input.downPaymentPercent}
                  onChange={e => handleDownPctChange(Number(e.target.value))}
                  className="m3-slider"
                />
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  {[5, 10, 15, 20, 25, 30].map(pct => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleDownPctChange(pct)}
                      className={`m3-preset-pill ${input.downPaymentPercent === pct ? 'active' : ''}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                {input.downPaymentPercent < 20 && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 600, display: 'block', marginTop: '0.35rem' }}>
                    ⚠️ PMI required for down payments under 20%
                  </span>
                )}
              </div>

              {/* Interest Rate & Tenure */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Interest Rate & Term
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {input.annualRate}% for {input.tenureYears} yrs
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="number"
                    step="0.1"
                    value={input.annualRate}
                    onChange={e => setInput(prev => ({ ...prev, annualRate: Number(e.target.value) || 0 }))}
                    className="m3-input-field"
                    placeholder="Rate %"
                  />
                  <select
                    value={input.tenureYears}
                    onChange={e => setInput(prev => ({ ...prev, tenureYears: Number(e.target.value) }))}
                    style={{
                      padding: '0.5rem',
                      borderRadius: 'var(--md-sys-shape-md)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--surface-solid)',
                      fontWeight: 700
                    }}
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
                <input
                  type="range"
                  min="3"
                  max="14"
                  step="0.1"
                  value={input.annualRate}
                  onChange={e => setInput(prev => ({ ...prev, annualRate: Number(e.target.value) }))}
                  className="m3-slider"
                />
              </div>
            </div>

            {/* Taxes, Insurance, and HOA expandable details */}
            <div style={{
              background: 'var(--surface-subtle)',
              padding: '1rem',
              borderRadius: 'var(--md-sys-shape-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                Taxes, Insurance & HOA Dues
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Property Tax (%/yr)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.annualPropertyTax}
                    onChange={e => setInput(prev => ({ ...prev, annualPropertyTax: Number(e.target.value) || 0 }))}
                    className="m3-input-field"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Home Insurance ($/yr)</label>
                  <input
                    type="number"
                    value={input.annualHomeInsurance}
                    onChange={e => setInput(prev => ({ ...prev, annualHomeInsurance: Number(e.target.value) || 0 }))}
                    className="m3-input-field"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Monthly HOA ($/mo)</label>
                  <input
                    type="number"
                    value={input.monthlyHOA}
                    onChange={e => setInput(prev => ({ ...prev, monthlyHOA: Number(e.target.value) || 0 }))}
                    className="m3-input-field"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Results Banner */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-lg)',
              padding: '1.75rem 1.5rem',
              border: '1.5px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Total Monthly Mortgage Payment
              </div>
              <div
                key={result.totalMonthlyPayment}
                className="value-pop"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                  fontWeight: 900,
                  color: 'var(--md-sys-color-primary)',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem'
                }}
              >
                {currentCurrency.symbol}{result.totalMonthlyPayment.toLocaleString()} <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)' }}>/ month</span>
              </div>

              {/* Multi-Segment PITI Progress Bar */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="m3-proportion-bar" style={{ height: '18px', display: 'flex', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{ width: `${piPct}%`, background: '#0b57d0' }} title={`P&I: ${Math.round(piPct)}%`} />
                  <div style={{ width: `${taxPct}%`, background: '#0284c7' }} title={`Tax: ${Math.round(taxPct)}%`} />
                  <div style={{ width: `${insPct}%`, background: '#10b981' }} title={`Insurance: ${Math.round(insPct)}%`} />
                  {pmiPct > 0 && <div style={{ width: `${pmiPct}%`, background: '#f59e0b' }} title={`PMI: ${Math.round(pmiPct)}%`} />}
                  {hoaPct > 0 && <div style={{ width: `${hoaPct}%`, background: '#8b5cf6' }} title={`HOA: ${Math.round(hoaPct)}%`} />}
                </div>

                {/* Itemized PITI Legend Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '0.65rem', textAlign: 'left', fontSize: '0.825rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0b57d0' }} />
                    <span><strong>Principal & Int:</strong> {currentCurrency.symbol}{result.monthlyPrincipalInterest.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7' }} />
                    <span><strong>Property Taxes:</strong> {currentCurrency.symbol}{result.monthlyPropertyTax.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                    <span><strong>Home Insurance:</strong> {currentCurrency.symbol}{result.monthlyHomeInsurance.toLocaleString()}</span>
                  </div>
                  {result.monthlyPMI > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                      <span><strong>PMI Fee:</strong> {currentCurrency.symbol}{result.monthlyPMI.toLocaleString()}</span>
                    </div>
                  )}
                  {result.monthlyHOA > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} />
                      <span><strong>HOA Dues:</strong> {currentCurrency.symbol}{result.monthlyHOA.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Cost of Loan Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '1rem', textAlign: 'left' }}>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Loan Principal</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {currentCurrency.symbol}{result.loanAmount.toLocaleString()}
                  </div>
                </div>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Interest Paid</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '0.2rem' }}>
                    {currentCurrency.symbol}{result.totalInterest.toLocaleString()}
                  </div>
                </div>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Loan Cost</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {currentCurrency.symbol}{result.totalCostOfLoan.toLocaleString()}
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
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="calculator-sidebar">
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="var(--primary-500)" />
              <span>Mortgage Buyer Tips</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>The 28/36 Rule:</strong> Lenders prefer your monthly housing costs not exceed 28% of gross monthly income, and total debt payments stay below 36%.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>Avoid PMI:</strong> A 20% down payment eliminates Private Mortgage Insurance, immediately saving you $100–$300 per month.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                <span><strong>15-Year vs 30-Year:</strong> While 15-year mortgages have higher monthly payments, you cut the total interest cost by more than 55%!</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Editorial Article */}
      <CalculatorArticleView
        calculatorId="mortgage-calculator"
        calculatorName="Mortgage & Home Loan Calculator"
        categoryName="finance"
      />
    </div>
  );
};
