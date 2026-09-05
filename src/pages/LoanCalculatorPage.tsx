import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateLoanEMI, LoanInput } from '../utils/loanEngine';
import { useLocalization } from '../context/LocalizationContext';
import {
  Landmark,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface LoanCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const LoanCalculatorPage: React.FC<LoanCalculatorPageProps> = ({ onNavigate }) => {
  const { 
    currency, 
    currentCurrency, 
    setCurrency, 
    supportedCurrencies, 
    t 
  } = useLocalization();

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'loan-calculator') || CALCULATORS_REGISTRY[2];

  const [input, setInput] = useState<LoanInput>(() => ({
    principal: currentCurrency.defaultPresets[2] || 250000,
    annualInterestRate: 7.5,
    tenureYears: 15,
    tenureMonths: 180,
    tenureType: 'years'
  }));

  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Loan & EMI Calculator - Monthly Payments & Amortization Schedule | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculate monthly loan EMI payments, total interest payable, principal-to-interest ratios, and view year-by-year amortization schedules for mortgages, auto loans, and personal financing.'
      );
    }
  }, []);

  const result = useMemo(() => calculateLoanEMI(input), [input]);

  const handleCopy = () => {
    const text = `Loan Amount: ${currentCurrency.symbol}${result.principal.toLocaleString()}\nMonthly EMI: ${currentCurrency.symbol}${result.monthlyEmi.toLocaleString()}\nTotal Interest: ${currentCurrency.symbol}${result.totalInterest.toLocaleString()}\nTotal Payment: ${currentCurrency.symbol}${result.totalPayment.toLocaleString()}\nCalculated via Calculator360.app (${currency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Loan EMI Calculation - Calculator360',
        text: `Estimated Monthly EMI: ${currentCurrency.symbol}${result.monthlyEmi.toLocaleString()} on a ${currentCurrency.symbol}${result.principal.toLocaleString()} loan at ${input.annualInterestRate}%.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const faqs = [
    {
      q: 'How is an EMI (Equated Monthly Installment) calculated?',
      a: 'EMI is computed using standard amortization physics: EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1], where P is Principal loan amount, r is monthly interest rate (annual rate / 12 / 100), and n is total duration in months.'
    },
    {
      q: 'Why does early loan repayment save significant interest?',
      a: 'In standard amortization schedules, early monthly payments primarily cover accrued interest on the large remaining principal. Making extra payments or choosing a shorter tenure reduces the principal balance faster, drastically reducing compounded interest over the life of the loan.'
    },
    {
      q: 'Does this calculator apply to both mortgages and personal/auto loans?',
      a: 'Yes. Any fixed-rate loan that uses regular monthly amortizing payments follows this exact mathematical formulation.'
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
            <Landmark size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Loan & EMI Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Calculate monthly loan EMI payments, total interest costs, principal-to-interest breakdown, and annual amortization schedule.
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: Inputs & Results */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Loan Amount Input & Dynamic Presets */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t('loan_amount')}
                </label>
                
                {/* In-tool Currency Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {t('currency_option')}:
                  </span>
                  <select
                    value={currency}
                    onChange={e => {
                      const newCurrCode = e.target.value;
                      setCurrency(newCurrCode);
                      const newInfo = supportedCurrencies.find(c => c.code === newCurrCode);
                      if (newInfo && newInfo.defaultPresets && newInfo.defaultPresets.length >= 2) {
                        setInput(prev => ({ ...prev, principal: newInfo.defaultPresets[2] || newInfo.defaultPresets[0] }));
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

              {/* Dynamic Currency Presets */}
              <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {currentCurrency.defaultPresets.map((amt, idx) => {
                  const label = currentCurrency.presetLabels?.[idx] || `${currentCurrency.symbol}${amt.toLocaleString()}`;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, principal: amt }))}
                      className={`m3-preset-pill ${input.principal === amt ? 'active' : ''}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Loan Amount Input & Synchronized Slider */}
              <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                <input
                  id="loan-amount-input"
                  type="number"
                  min="100"
                  max="1000000000"
                  step="1000"
                  value={input.principal || ''}
                  onChange={e => setInput(prev => ({ ...prev, principal: Number(e.target.value) || 0 }))}
                  className="m3-input-field"
                  placeholder="250000"
                  aria-label="Loan principal amount"
                />
                <span className="m3-input-unit">{currentCurrency.symbol}</span>
              </div>

              <input
                type="range"
                min={currentCurrency.defaultPresets[0] || 10000}
                max={(currentCurrency.defaultPresets[currentCurrency.defaultPresets.length - 1] || 1000000) * 2}
                step={currentCurrency.code === 'INR' ? 25000 : 1000}
                value={Math.min((currentCurrency.defaultPresets[currentCurrency.defaultPresets.length - 1] || 1000000) * 2, Math.max(currentCurrency.defaultPresets[0] || 10000, input.principal))}
                onChange={e => setInput(prev => ({ ...prev, principal: Number(e.target.value) }))}
                className="m3-slider"
                aria-label="Loan amount range slider"
              />
            </div>

            {/* Interest Rate & Tenure Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Annual Interest Rate with Synchronized Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label htmlFor="interest-rate-input" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t('interest_rate')}
                  </label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                    {input.annualInterestRate}% p.a.
                  </span>
                </div>

                <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                  <input
                    id="interest-rate-input"
                    type="number"
                    min="0.1"
                    max="35"
                    step="0.1"
                    value={input.annualInterestRate || ''}
                    onChange={e => setInput(prev => ({ ...prev, annualInterestRate: Number(e.target.value) || 0 }))}
                    className="m3-input-field"
                    placeholder="7.5"
                    aria-label="Annual interest rate percentage"
                  />
                  <span className="m3-input-unit">%</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="24"
                  step="0.1"
                  value={Math.min(24, Math.max(2, input.annualInterestRate))}
                  onChange={e => setInput(prev => ({ ...prev, annualInterestRate: Number(e.target.value) }))}
                  className="m3-slider"
                  aria-label="Interest rate slider"
                />

                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {[5.5, 7.5, 8.5, 10.5, 12.0].map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, annualInterestRate: r }))}
                      className={`m3-preset-pill ${input.annualInterestRate === r ? 'active' : ''}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Tenure with Segmented Control & Slider */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                  <label htmlFor="tenure-input" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t('loan_tenure')}
                  </label>
                  
                  {/* Material 3 Segmented Control */}
                  <div className="m3-segmented-control" style={{ maxWidth: '140px' }}>
                    <button
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, tenureType: 'years' }))}
                      className={`m3-segmented-tab ${input.tenureType === 'years' ? 'active' : ''}`}
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => setInput(prev => ({ ...prev, tenureType: 'months' }))}
                      className={`m3-segmented-tab ${input.tenureType === 'months' ? 'active' : ''}`}
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      Months
                    </button>
                  </div>
                </div>

                <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                  <input
                    id="tenure-input"
                    type="number"
                    min="1"
                    max={input.tenureType === 'years' ? 40 : 480}
                    value={input.tenureType === 'years' ? (input.tenureYears || '') : (input.tenureMonths || '')}
                    onChange={e => {
                      const val = Number(e.target.value) || 1;
                      if (input.tenureType === 'years') {
                        setInput(prev => ({ ...prev, tenureYears: val, tenureMonths: val * 12 }));
                      } else {
                        setInput(prev => ({ ...prev, tenureMonths: val, tenureYears: Math.round(val / 12) }));
                      }
                    }}
                    className="m3-input-field"
                    placeholder={input.tenureType === 'years' ? '15' : '180'}
                    aria-label={`Loan tenure in ${input.tenureType}`}
                  />
                  <span className="m3-input-unit">{input.tenureType}</span>
                </div>

                <input
                  type="range"
                  min={input.tenureType === 'years' ? 1 : 12}
                  max={input.tenureType === 'years' ? 30 : 360}
                  step={input.tenureType === 'years' ? 1 : 6}
                  value={input.tenureType === 'years' ? Math.min(30, Math.max(1, input.tenureYears)) : Math.min(360, Math.max(12, input.tenureMonths))}
                  onChange={e => {
                    const val = Number(e.target.value);
                    if (input.tenureType === 'years') {
                      setInput(prev => ({ ...prev, tenureYears: val, tenureMonths: val * 12 }));
                    } else {
                      setInput(prev => ({ ...prev, tenureMonths: val, tenureYears: Math.round(val / 12) }));
                    }
                  }}
                  className="m3-slider"
                  aria-label="Tenure range slider"
                />

                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {(input.tenureType === 'years' ? [5, 10, 15, 20, 25, 30] : [60, 120, 180, 240, 360]).map(tVal => (
                    <button
                      key={tVal}
                      type="button"
                      onClick={() => {
                        if (input.tenureType === 'years') {
                          setInput(prev => ({ ...prev, tenureYears: tVal, tenureMonths: tVal * 12 }));
                        } else {
                          setInput(prev => ({ ...prev, tenureMonths: tVal, tenureYears: Math.round(tVal / 12) }));
                        }
                      }}
                      className={`m3-preset-pill ${(input.tenureType === 'years' ? input.tenureYears : input.tenureMonths) === tVal ? 'active' : ''}`}
                    >
                      {tVal} {input.tenureType === 'years' ? 'yr' : 'mo'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Results Banner with Value-Pop Micro-Animation */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-lg)',
              padding: '1.75rem 1.5rem',
              border: '1.5px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                {t('monthly_emi')}
              </div>

              {/* Reactive animated number display */}
              <div
                key={result.monthlyEmi}
                className="value-pop"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                  fontWeight: 900,
                  color: 'var(--md-sys-color-primary)',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem'
                }}
              >
                {currentCurrency.symbol}{result.monthlyEmi.toLocaleString()} <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-muted)' }}>/ month</span>
              </div>

              {/* Enhanced Graphical Principal vs Interest Bar */}
              <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                <div className="m3-proportion-bar" style={{ height: '16px', marginBottom: '0.65rem' }}>
                  <div
                    style={{ width: `${result.principalPercentage}%`, background: '#0b57d0' }}
                    title={`Principal: ${result.principalPercentage}%`}
                  />
                  <div
                    style={{ width: `${result.interestPercentage}%`, background: '#b45309' }}
                    title={`Interest: ${result.interestPercentage}%`}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: '#0b57d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#0b57d0' }} />
                    {t('principal')}: {currentCurrency.symbol}{result.principal.toLocaleString()} ({result.principalPercentage}%)
                  </span>
                  <span style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#b45309' }} />
                    {t('interest')}: {currentCurrency.symbol}{result.totalInterest.toLocaleString()} ({result.interestPercentage}%)
                  </span>
                </div>
              </div>

              {/* Total Payment Breakdown Key Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                textAlign: 'left'
              }}>
                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {t('total_interest')}
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b45309' }}>
                    {currentCurrency.symbol}{result.totalInterest.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>
                    {result.interestPercentage}% of total
                  </div>
                </div>

                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {t('total_amount')}
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentCurrency.symbol}{result.totalPayment.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>
                    Principal + Interest
                  </div>
                </div>

                <div className="m3-card-filled" style={{ padding: '0.9rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Total Duration
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {result.totalMonths} months
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>
                    ({(result.totalMonths / 12).toFixed(1)} years)
                  </div>
                </div>
              </div>
            </div>

            {/* Instant One-Click Copy / Share Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                aria-label="Copy loan calculation summary"
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied Summary!' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                aria-label="Share loan calculation"
              >
                <Share2 size={16} />
                <span>Share Result</span>
              </button>
            </div>
          </div>

          {/* Annual Amortization Breakdown Table */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Yearly Amortization Schedule
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '0.55rem 0.65rem' }}>Year</th>
                    <th style={{ padding: '0.55rem 0.65rem' }}>Opening Balance</th>
                    <th style={{ padding: '0.55rem 0.65rem' }}>EMI Paid</th>
                    <th style={{ padding: '0.55rem 0.65rem' }}>Principal Paid</th>
                    <th style={{ padding: '0.55rem 0.65rem' }}>Interest Paid</th>
                    <th style={{ padding: '0.55rem 0.65rem' }}>Ending Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortizationYears.map(row => (
                    <tr key={row.year} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.55rem 0.65rem', fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>
                        Yr {row.year}
                      </td>
                      <td style={{ padding: '0.55rem 0.65rem', color: 'var(--text-secondary)' }}>
                        {currentCurrency.symbol}{row.openingBalance.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.55rem 0.65rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {currentCurrency.symbol}{row.emiPaid.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.55rem 0.65rem', color: '#0b57d0', fontWeight: 600 }}>
                        {currentCurrency.symbol}{row.principalPaid.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.55rem 0.65rem', color: '#b45309', fontWeight: 600 }}>
                        {currentCurrency.symbol}{row.interestPaid.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.55rem 0.65rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {currentCurrency.symbol}{row.closingBalance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQs */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
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

        {/* Right Sidebar */}
        <div className="calculator-sidebar">
          {/* Ad Slot */}
          <AdBanner slotType="rectangle" />

          {/* Amortization Formula Card */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <span>Standard Banking Formula</span>
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              <code>EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]</code>
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Uses exact banking compounding conventions with 100% private client-side execution.
            </div>
          </div>

          {/* Related Tools */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Related Calculators
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                onClick={() => onNavigate('/percentage-calculator')}
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
                <span>Percentage Calculator</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('/age-calculator')}
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
                <span>Age Calculator</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
