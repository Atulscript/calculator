import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateSimpleInterest,
  calculateSalary,
  calculateTip,
  calculateDiscount,
  calculateIncomeTax
} from '../utils/financeEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  BadgePercent,
  Wallet,
  Receipt,
  Tag,
  Copy,
  Check,
  ReceiptText
} from 'lucide-react';

interface FinanceToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const FinanceToolsPage: React.FC<FinanceToolsPageProps> = ({ slug, onNavigate }) => {
  const { currency, currentCurrency, setCurrency, supportedCurrencies } = useLocalization();

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[0];

  const [copied, setCopied] = useState(false);

  // 1. Simple Interest State
  const [siPrincipal, setSiPrincipal] = useState<number>(10000);
  const [siRate, setSiRate] = useState<number>(7.5);
  const [siTime, setSiTime] = useState<number>(3);
  const [siUnit, setSiUnit] = useState<'years' | 'months' | 'days'>('years');

  // 2. Salary State
  const [salaryAmount, setSalaryAmount] = useState<number>(currency === 'INR' ? 800000 : 75000);
  const [salaryPeriod, setSalaryPeriod] = useState<'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [taxPercent, setTaxPercent] = useState<number>(20);

  // 3. Tip State
  const [tipBill, setTipBill] = useState<number>(85);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [tipSplit, setTipSplit] = useState<number>(2);
  const [tipRoundUp, setTipRoundUp] = useState<boolean>(false);

  // 4. Discount State
  const [discountPrice, setDiscountPrice] = useState<number>(120);
  const [discountPct, setDiscountPct] = useState<number>(25);
  const [extraCouponPct, setExtraCouponPct] = useState<number>(10);
  const [salesTaxPct, setSalesTaxPct] = useState<number>(8);

  // 5. Income Tax State
  const [salaryTaxMode, setSalaryTaxMode] = useState<'paycheck' | 'incometax'>(
    slug === 'income-tax-calculator' ? 'incometax' : 'paycheck'
  );
  const [taxGross, setTaxGross] = useState<number>(currency === 'INR' ? 1200000 : 85000);
  const [taxSystem, setTaxSystem] = useState<'us' | 'in_new' | 'in_old' | 'custom'>(
    currency === 'INR' ? 'in_new' : 'us'
  );
  const [filingStatus, setFilingStatus] = useState<'single' | 'married_joint' | 'head_of_household'>('single');
  const [retirementContribution, setRetirementContribution] = useState<number>(currency === 'INR' ? 150000 : 6000);
  const [healthInsuranceDeduction, setHealthInsuranceDeduction] = useState<number>(currency === 'INR' ? 25000 : 2500);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  const [customTaxRate, setCustomTaxRate] = useState<number>(20);



  // Results
  const siResult = useMemo(() => {
    return calculateSimpleInterest({
      principal: siPrincipal,
      annualRate: siRate,
      timeValue: siTime,
      timeUnit: siUnit
    });
  }, [siPrincipal, siRate, siTime, siUnit]);

  const salaryResult = useMemo(() => {
    return calculateSalary({
      amount: salaryAmount,
      period: salaryPeriod,
      hoursPerWeek,
      daysPerWeek: 5,
      taxDeductionPercent: taxPercent
    });
  }, [salaryAmount, salaryPeriod, hoursPerWeek, taxPercent]);

  const tipResult = useMemo(() => {
    return calculateTip({
      billAmount: tipBill,
      tipPercent,
      splitCount: tipSplit,
      roundUpTotal: tipRoundUp
    });
  }, [tipBill, tipPercent, tipSplit, tipRoundUp]);

  const discountResult = useMemo(() => {
    return calculateDiscount({
      originalPrice: discountPrice,
      discountPercent: discountPct,
      extraDiscountPercent: extraCouponPct,
      taxPercent: salesTaxPct
    });
  }, [discountPrice, discountPct, extraCouponPct, salesTaxPct]);

  const taxResult = useMemo(() => {
    return calculateIncomeTax({
      grossIncome: taxGross,
      taxSystem,
      filingStatus,
      retirementContribution,
      healthInsuranceDeduction,
      otherDeductions,
      customTaxRate
    });
  }, [taxGross, taxSystem, filingStatus, retirementContribution, healthInsuranceDeduction, otherDeductions, customTaxRate]);

  const handleCopy = (summary: string) => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      {/* Hero Title */}
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
            {slug === 'simple-interest-calculator' && <BadgePercent size={22} />}
            {slug === 'salary-calculator' && <Wallet size={22} />}
            {slug === 'income-tax-calculator' && <ReceiptText size={22} />}
            {slug === 'tip-calculator' && <Receipt size={22} />}
            {slug === 'discount-calculator' && <Tag size={22} />}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {calcMeta.title}
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          {calcMeta.shortDescription}
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Top Currency Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--surface-subtle)', padding: '0.25rem 0.6rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Currency:</span>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{
                    padding: '0.2rem 0.4rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    borderRadius: 'var(--md-sys-shape-full)',
                    border: '1px solid var(--border-subtle)',
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

            {/* ======================================================= */}
            {/* 1. SIMPLE INTEREST CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'simple-interest-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Principal Amount ({currentCurrency.symbol})
                  </label>
                  <input
                    type="number"
                    value={siPrincipal}
                    onChange={e => setSiPrincipal(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Annual Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={siRate}
                      onChange={e => setSiRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Duration</label>
                      <select
                        value={siUnit}
                        onChange={e => setSiUnit(e.target.value as any)}
                        style={{ fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                    <input
                      type="number"
                      value={siTime}
                      onChange={e => setSiTime(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Accrued Simple Interest (I = P × r × t)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                    {currentCurrency.symbol}{siResult.interest.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Total Future Value: {currentCurrency.symbol}{siResult.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. SALARY & INCOME TAX CALCULATOR */}
            {/* ======================================================= */}
            {(slug === 'salary-calculator' || slug === 'income-tax-calculator') && (
              <div>
                {/* Sub-mode switcher */}
                <div style={{
                  display: 'flex',
                  gap: '0.4rem',
                  marginBottom: '1.25rem',
                  background: 'var(--surface-subtle)',
                  padding: '0.35rem',
                  borderRadius: 'var(--md-sys-shape-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <button
                    type="button"
                    onClick={() => setSalaryTaxMode('paycheck')}
                    className={`m3-segmented-tab ${salaryTaxMode === 'paycheck' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.82rem', fontWeight: 700 }}
                  >
                    Paycheck & Wage Converter
                  </button>
                  <button
                    type="button"
                    onClick={() => setSalaryTaxMode('incometax')}
                    className={`m3-segmented-tab ${salaryTaxMode === 'incometax' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.45rem', fontSize: '0.82rem', fontWeight: 700 }}
                  >
                    Income Tax & Net Take-Home
                  </button>
                </div>

                {salaryTaxMode === 'paycheck' ? (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                          Base Pay Amount ({currentCurrency.symbol})
                        </label>
                        <input
                          type="number"
                          value={salaryAmount}
                          onChange={e => setSalaryAmount(Number(e.target.value) || 0)}
                          className="m3-input-field"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                          Pay Frequency
                        </label>
                        <select
                          value={salaryPeriod}
                          onChange={e => setSalaryPeriod(e.target.value as any)}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                        >
                          <option value="hourly">Per Hour</option>
                          <option value="daily">Per Day</option>
                          <option value="weekly">Per Week</option>
                          <option value="biweekly">Bi-Weekly</option>
                          <option value="monthly">Per Month</option>
                          <option value="annual">Per Year</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                          Hours Worked / Week: {hoursPerWeek}h
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="60"
                          value={hoursPerWeek}
                          onChange={e => setHoursPerWeek(Number(e.target.value))}
                          className="m3-slider"
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                          Estimated Taxes/Deductions: {taxPercent}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="45"
                          value={taxPercent}
                          onChange={e => setTaxPercent(Number(e.target.value))}
                          className="m3-slider"
                        />
                      </div>
                    </div>

                    {/* Salary Equivalent Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>HOURLY</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentCurrency.symbol}{salaryResult.hourly}</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>BI-WEEKLY</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{currentCurrency.symbol}{salaryResult.biweekly.toLocaleString()}</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MONTHLY GROSS</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{currentCurrency.symbol}{salaryResult.monthly.toLocaleString()}</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>EST. TAKE-HOME / MO</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{currentCurrency.symbol}{Math.round(salaryResult.netMonthly).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Income Tax Engine */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Annual Gross Income ({currentCurrency.symbol})
                      </label>
                      <input
                        type="number"
                        value={taxGross}
                        onChange={e => setTaxGross(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                          Tax System / Regime
                        </label>
                        <select
                          value={taxSystem}
                          onChange={e => setTaxSystem(e.target.value as any)}
                          style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                        >
                          <option value="us">🇺🇸 US Federal (2024 Slabs + FICA)</option>
                          <option value="in_new">🇮🇳 India New Regime (FY 2024-25)</option>
                          <option value="in_old">🇮🇳 India Old Regime (80C / 80D)</option>
                          <option value="custom">🌐 Custom Flat / General Tax Rate</option>
                        </select>
                      </div>

                      {taxSystem === 'us' && (
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                            Filing Status
                          </label>
                          <select
                            value={filingStatus}
                            onChange={e => setFilingStatus(e.target.value as any)}
                            style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                          >
                            <option value="single">Single ($14,600 Std Ded)</option>
                            <option value="married_joint">Married Filing Jointly ($29,200 Std Ded)</option>
                            <option value="head_of_household">Head of Household ($21,900 Std Ded)</option>
                          </select>
                        </div>
                      )}

                      {taxSystem === 'custom' && (
                        <div>
                          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                            Custom Tax Rate ({customTaxRate}%)
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            value={customTaxRate}
                            onChange={e => setCustomTaxRate(Number(e.target.value))}
                            className="m3-slider"
                          />
                        </div>
                      )}
                    </div>

                    {/* Pre-tax Deductions Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                          {taxSystem === 'us' ? '401(k) / IRA' : taxSystem.startsWith('in') ? 'Section 80C' : 'Retirement'}
                        </label>
                        <input
                          type="number"
                          value={retirementContribution}
                          onChange={e => setRetirementContribution(Number(e.target.value) || 0)}
                          className="m3-input-field"
                          style={{ width: '100%', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                          {taxSystem === 'us' ? 'HSA / Health Ins.' : taxSystem.startsWith('in') ? 'Section 80D Health' : 'Health Ins.'}
                        </label>
                        <input
                          type="number"
                          value={healthInsuranceDeduction}
                          onChange={e => setHealthInsuranceDeduction(Number(e.target.value) || 0)}
                          className="m3-input-field"
                          style={{ width: '100%', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                          Other Deductions
                        </label>
                        <input
                          type="number"
                          value={otherDeductions}
                          onChange={e => setOtherDeductions(Number(e.target.value) || 0)}
                          className="m3-input-field"
                          style={{ width: '100%', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>

                    {/* Income Tax Result Hero Card */}
                    <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        Net Annual Take-Home Pay
                      </div>
                      <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                        {currentCurrency.symbol}{taxResult.netAnnualTakeHome.toLocaleString()}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        <span>Monthly: <b style={{ color: 'var(--md-sys-color-primary)' }}>{currentCurrency.symbol}{taxResult.netMonthlyTakeHome.toLocaleString()}</b></span>
                        <span>Bi-Weekly: <b style={{ color: 'var(--md-sys-color-primary)' }}>{currentCurrency.symbol}{taxResult.netBiweeklyTakeHome.toLocaleString()}</b></span>
                      </div>
                    </div>

                    {/* Tax Breakdown Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL TAX</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-red)' }}>{currentCurrency.symbol}{taxResult.totalTax.toLocaleString()}</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>EFFECTIVE TAX RATE</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{taxResult.effectiveTaxRate}%</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MARGINAL BRACKET</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{taxResult.marginalTaxRate}%</div>
                      </div>
                      <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL DEDUCTIONS</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{currentCurrency.symbol}{taxResult.totalDeductions.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Tax Slabs Breakdown Table */}
                    {taxResult.slabsBreakdown.length > 0 && (
                      <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-md)', padding: '0.85rem', marginBottom: '1.25rem' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                          Tax Slabs & Brackets Breakdown
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem' }}>
                          {taxResult.slabsBreakdown.map((slab, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{slab.label}</span>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                {currentCurrency.symbol}{slab.taxAmount.toLocaleString()} (on {currentCurrency.symbol}{slab.taxableInBracket.toLocaleString()})
                              </span>
                            </div>
                          ))}
                          {taxResult.payrollTaxOrCess > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.3rem 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>
                                {taxSystem === 'us' ? 'FICA (Social Security + Medicare)' : 'Health & Education Cess (4%)'}
                              </span>
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                {currentCurrency.symbol}{taxResult.payrollTaxOrCess.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. TIP & BILL SPLIT CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'tip-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Bill Amount ({currentCurrency.symbol})
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={tipBill}
                    onChange={e => setTipBill(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Tip Percentage</label>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{tipPercent}%</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    {[10, 15, 18, 20, 25].map(pct => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercent(pct)}
                        className={`m3-preset-pill ${tipPercent === pct ? 'active' : ''}`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={tipPercent}
                    onChange={e => setTipPercent(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Split Between (Diners)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={tipSplit}
                      onChange={e => setTipSplit(Math.max(1, Number(e.target.value) || 1))}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
                    <input
                      type="checkbox"
                      id="roundUpCheck"
                      checked={tipRoundUp}
                      onChange={e => setTipRoundUp(e.target.checked)}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <label htmlFor="roundUpCheck" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }}>
                      Round up total
                    </label>
                  </div>
                </div>

                {/* Tip Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    {tipSplit > 1 ? 'Total Per Person' : 'Total with Tip'}
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{tipResult.totalPerPerson.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Tip: {currentCurrency.symbol}{tipResult.tipAmount.toFixed(2)} | Bill Total: {currentCurrency.symbol}{tipResult.totalWithTip.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. DISCOUNT & SALE PRICE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'discount-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Original Price ({currentCurrency.symbol})
                  </label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={e => setDiscountPrice(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Primary Discount ({discountPct}%)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="90"
                      step="5"
                      value={discountPct}
                      onChange={e => setDiscountPct(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Extra Promo Code ({extraCouponPct}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={extraCouponPct}
                      onChange={e => setExtraCouponPct(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Sales Tax ({salesTaxPct}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="0.5"
                      value={salesTaxPct}
                      onChange={e => setSalesTaxPct(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                </div>

                {/* Discount Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Final Checkout Price
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{discountResult.finalPrice.toFixed(2)}
                  </div>
                  <div style={{ display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.85rem' }}>
                    🎉 You Save {currentCurrency.symbol}{discountResult.totalSavings.toFixed(2)} ({discountResult.effectiveDiscountPercent}% OFF)
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Calculation results from Calculator11: ${calcMeta.title}`)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied' : 'Copy Result'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="calculator-sidebar">
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>
        </aside>
      </div>

      <CalculatorArticleView
        calculatorId={calcMeta.id}
        calculatorName={calcMeta.title}
        categoryName="finance"
      />
    </div>
  );
};
