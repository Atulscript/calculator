import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateCreditCardPayoff,
  calculateStudentLoan,
  calculateCarLeaseVsBuy,
  calculateCapitalGainsTax,
  calculateVAT,
  calculateNetWorth,
  calculateInflation,
  calculateDividendYield
} from '../utils/wealthDebtEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  CreditCard,
  GraduationCap,
  Car,
  TrendingUp,
  Receipt,
  Scale,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';

interface WealthDebtToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const WealthDebtToolsPage: React.FC<WealthDebtToolsPageProps> = ({ slug, onNavigate }) => {
  const { currentCurrency } = useLocalization();
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'High performance wealth, debt, and investment planning tools.',
    category: 'finance',
    tags: [slug],
    icon: 'DollarSign'
  };



  // 1. Credit Card Payoff State
  const [ccBalance, setCcBalance] = useState<number>(6500);
  const [ccApr, setCcApr] = useState<number>(22.99);
  const [ccPaymentType, setCcPaymentType] = useState<'fixed_payment' | 'target_months'>('fixed_payment');
  const [ccPaymentVal, setCcPaymentVal] = useState<number>(250);

  // 2. Student Loan State
  const [slBalance, setSlBalance] = useState<number>(38000);
  const [slRate, setSlRate] = useState<number>(5.5);
  const [slTerm, setSlTerm] = useState<number>(10);

  // 3. Lease vs Buy State
  const [lvbPrice, setLvbPrice] = useState<number>(35000);
  const [lvbLeasePayment, setLvbLeasePayment] = useState<number>(399);
  const [lvbLeaseDown, setLvbLeaseDown] = useState<number>(2500);
  const [lvbResidual, setLvbResidual] = useState<number>(19000);

  // 4. Capital Gains Tax State
  const [cgBuy, setCgBuy] = useState<number>(15000);
  const [cgSell, setCgSell] = useState<number>(32000);
  const [cgHolding, setCgHolding] = useState<number>(18);
  const [cgIncome, setCgIncome] = useState<number>(85000);

  // 5. VAT State
  const [vatAmount, setVatAmount] = useState<number>(250);
  const [vatRate, setVatRate] = useState<number>(20);
  const [vatType, setVatType] = useState<'add' | 'extract'>('add');

  // 6. Net Worth State
  const [nwCash, setNwCash] = useState<number>(25000);
  const [nwInvestments, setNwInvestments] = useState<number>(120000);
  const [nwRealEstate, setNwRealEstate] = useState<number>(450000);
  const [nwVehicles, setNwVehicles] = useState<number>(35000);
  const [nwRetirement, setNwRetirement] = useState<number>(180000);
  const [nwMortgage, setNwMortgage] = useState<number>(310000);
  const [nwCards, setNwCards] = useState<number>(4500);
  const [nwStudent, setNwStudent] = useState<number>(22000);

  // 7. Inflation State
  const [infAmount, setInfAmount] = useState<number>(1000);
  const [infRate, setInfRate] = useState<number>(3.2);
  const [infYears, setInfYears] = useState<number>(10);

  // 8. Dividend Yield State
  const [divPrice, setDivPrice] = useState<number>(150);
  const [divAnnualPayout, setDivAnnualPayout] = useState<number>(4.8);
  const [divShares, setDivShares] = useState<number>(120);

  // Calculation Memos
  const ccResult = useMemo(() => {
    return calculateCreditCardPayoff({
      balance: ccBalance,
      aprPercent: ccApr,
      paymentType: ccPaymentType,
      monthlyPaymentValue: ccPaymentVal
    });
  }, [ccBalance, ccApr, ccPaymentType, ccPaymentVal]);

  const slResult = useMemo(() => {
    return calculateStudentLoan({
      loanBalance: slBalance,
      interestRate: slRate,
      loanTermYears: slTerm
    });
  }, [slBalance, slRate, slTerm]);

  const lvbResult = useMemo(() => {
    return calculateCarLeaseVsBuy({
      carPrice: lvbPrice,
      leaseMonths: 36,
      leaseMonthlyPayment: lvbLeasePayment,
      leaseDownPayment: lvbLeaseDown,
      buyLoanTermMonths: 60,
      buyInterestRate: 6.0,
      buyDownPayment: 3500,
      estimatedCarValueAfterLease: lvbResidual
    });
  }, [lvbPrice, lvbLeasePayment, lvbLeaseDown, lvbResidual]);

  const cgResult = useMemo(() => {
    return calculateCapitalGainsTax({
      purchasePrice: cgBuy,
      sellingPrice: cgSell,
      holdingPeriodMonths: cgHolding,
      annualTaxableIncome: cgIncome
    });
  }, [cgBuy, cgSell, cgHolding, cgIncome]);

  const vatResult = useMemo(() => {
    return calculateVAT({
      amount: vatAmount,
      vatRatePercent: vatRate,
      type: vatType
    });
  }, [vatAmount, vatRate, vatType]);

  const nwResult = useMemo(() => {
    return calculateNetWorth({
      cashAndSavings: nwCash,
      investmentsAndStocks: nwInvestments,
      realEstateValue: nwRealEstate,
      vehiclesAndValuables: nwVehicles,
      retirementAccounts: nwRetirement,
      mortgageDebt: nwMortgage,
      creditCardDebt: nwCards,
      studentLoans: nwStudent,
      otherDebts: 0
    });
  }, [nwCash, nwInvestments, nwRealEstate, nwVehicles, nwRetirement, nwMortgage, nwCards, nwStudent]);

  const infResult = useMemo(() => {
    return calculateInflation({
      initialAmount: infAmount,
      annualInflationRate: infRate,
      yearsAhead: infYears
    });
  }, [infAmount, infRate, infYears]);

  const divResult = useMemo(() => {
    return calculateDividendYield({
      stockPrice: divPrice,
      annualDividendPerShare: divAnnualPayout,
      sharesOwned: divShares
    });
  }, [divPrice, divAnnualPayout, divShares]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--md-sys-shape-md)',
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {slug === 'credit-card-payoff-calculator' && <CreditCard size={22} />}
            {slug === 'student-loan-calculator' && <GraduationCap size={22} />}
            {slug === 'car-lease-vs-buy-calculator' && <Car size={22} />}
            {slug === 'capital-gains-tax-calculator' && <TrendingUp size={22} />}
            {slug === 'vat-calculator' && <Receipt size={22} />}
            {slug === 'net-worth-calculator' && <Scale size={22} />}
            {slug === 'inflation-calculator' && <TrendingUp size={22} />}
            {slug === 'dividend-yield-calculator' && <DollarSign size={22} />}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {calcMeta.title}
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          {calcMeta.shortDescription}
        </p>
      </div>

      <div className="calculator-layout-grid">
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>

            {/* 1. CREDIT CARD PAYOFF */}
            {slug === 'credit-card-payoff-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Current Card Balance ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={ccBalance}
                      onChange={e => setCcBalance(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Annual Interest Rate (APR %)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={ccApr}
                      onChange={e => setCcApr(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => { setCcPaymentType('fixed_payment'); setCcPaymentVal(250); }}
                      className={`m3-segmented-tab ${ccPaymentType === 'fixed_payment' ? 'active' : ''}`}
                      style={{ flex: 1, padding: '0.45rem' }}
                    >
                      Fixed Monthly Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCcPaymentType('target_months'); setCcPaymentVal(24); }}
                      className={`m3-segmented-tab ${ccPaymentType === 'target_months' ? 'active' : ''}`}
                      style={{ flex: 1, padding: '0.45rem' }}
                    >
                      Pay Off in Specific Months
                    </button>
                  </div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {ccPaymentType === 'fixed_payment' ? `Monthly Payment Amount (${currentCurrency.symbol})` : 'Target Payoff Months'}
                  </label>
                  <input
                    type="number"
                    value={ccPaymentVal}
                    onChange={e => setCcPaymentVal(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Time Until 100% Debt Free
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {ccResult.monthsToPayoff} Months
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total Interest Paid: <b style={{ color: 'var(--accent-red)' }}>{currentCurrency.symbol}{ccResult.totalInterestPaid.toLocaleString()}</b> • Total Repaid: <b>{currentCurrency.symbol}{ccResult.totalAmountPaid.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            )}

            {/* 2. STUDENT LOAN REPAYMENT */}
            {slug === 'student-loan-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Student Debt Balance ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={slBalance}
                      onChange={e => setSlBalance(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={slRate}
                      onChange={e => setSlRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    Repayment Plan Term:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[10, 15, 20, 25].map(y => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setSlTerm(y)}
                        className={`m3-chip ${slTerm === y ? 'active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        {y} Yrs
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Monthly Payment
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{slResult.monthlyPayment.toFixed(2)}/mo
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total Interest: <b>{currentCurrency.symbol}{slResult.totalInterestPaid.toLocaleString()}</b> ({slResult.interestPercentOfTotal}% of total paid)
                  </div>
                </div>
              </div>
            )}

            {/* 3. CAR LEASE VS BUY */}
            {slug === 'car-lease-vs-buy-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Vehicle MSRP ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={lvbPrice}
                      onChange={e => setLvbPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Lease Monthly ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={lvbLeasePayment}
                      onChange={e => setLvbLeasePayment(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Lease Down Payment</label>
                    <input
                      type="number"
                      value={lvbLeaseDown}
                      onChange={e => setLvbLeaseDown(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Car Value After 3 Years (Residual)</label>
                    <input
                      type="number"
                      value={lvbResidual}
                      onChange={e => setLvbResidual(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Financial Outcome
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, color: lvbResult.recommendation === 'buy' ? 'var(--accent-emerald)' : '#0b57d0', margin: '0.35rem 0' }}>
                    {lvbResult.recommendation === 'buy' ? 'Buying is Financially Cheaper' : 'Leasing is Cheaper'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Total Lease Outlay: {currentCurrency.symbol}{lvbResult.totalLeaseCost.toLocaleString()} • Net Buy Cost (After Car Equity): {currentCurrency.symbol}{lvbResult.netBuyCost.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* 4. CAPITAL GAINS TAX */}
            {slug === 'capital-gains-tax-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Purchase Price ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={cgBuy}
                      onChange={e => setCgBuy(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Selling Price ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={cgSell}
                      onChange={e => setCgSell(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      Holding Period ({cgHolding} Months)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={cgHolding}
                      onChange={e => setCgHolding(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Taxable Income Level</label>
                    <input
                      type="number"
                      value={cgIncome}
                      onChange={e => setCgIncome(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Capital Gains Tax
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-red)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{cgResult.estimatedTaxLiability.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Tax Rate: {cgResult.applicableTaxRate}% ({cgResult.isLongTerm ? 'Long-Term Rate' : 'Short-Term Ordinary Rate'}) • Net Proceeds: {currentCurrency.symbol}{cgResult.netProceedsAfterTax.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            {/* 5. VAT */}
            {slug === 'vat-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                    Amount ({currentCurrency.symbol})
                  </label>
                  <input
                    type="number"
                    value={vatAmount}
                    onChange={e => setVatAmount(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setVatType('add')}
                    className={`m3-segmented-tab ${vatType === 'add' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem' }}
                  >
                    Add VAT (Exclusive)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVatType('extract')}
                    className={`m3-segmented-tab ${vatType === 'extract' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem' }}
                  >
                    Extract VAT (Inclusive)
                  </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    VAT Rate:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[5, 19, 20, 21, 23, 25].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setVatRate(r)}
                        className={`m3-chip ${vatRate === r ? 'active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Gross Total with VAT
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{vatResult.grossAmount.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Net: {currentCurrency.symbol}{vatResult.netAmount.toFixed(2)} • VAT ({vatRate}%): {currentCurrency.symbol}{vatResult.vatAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* 6. NET WORTH */}
            {slug === 'net-worth-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Assets (+)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Cash & Savings</label>
                        <input type="number" value={nwCash} onChange={e => setNwCash(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Stock & Investments</label>
                        <input type="number" value={nwInvestments} onChange={e => setNwInvestments(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Real Estate Value</label>
                        <input type="number" value={nwRealEstate} onChange={e => setNwRealEstate(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Retirement (401k/IRA)</label>
                        <input type="number" value={nwRetirement} onChange={e => setNwRetirement(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Vehicles & Valuables</label>
                        <input type="number" value={nwVehicles} onChange={e => setNwVehicles(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '0.5rem' }}>Liabilities (-)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Mortgage Balance</label>
                        <input type="number" value={nwMortgage} onChange={e => setNwMortgage(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Credit Card Debt</label>
                        <input type="number" value={nwCards} onChange={e => setNwCards(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Student Loans</label>
                        <input type="number" value={nwStudent} onChange={e => setNwStudent(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Net Worth
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: nwResult.netWorth >= 0 ? 'var(--accent-emerald)' : 'var(--accent-red)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{nwResult.netWorth.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total Assets: <b>{currentCurrency.symbol}{nwResult.totalAssets.toLocaleString()}</b> • Total Debt: <b>{currentCurrency.symbol}{nwResult.totalLiabilities.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            )}

            {/* 7. INFLATION */}
            {slug === 'inflation-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Current Amount ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={infAmount}
                      onChange={e => setInfAmount(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Annual Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={infRate}
                      onChange={e => setInfRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Time Horizon: {infYears} Years Ahead
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={infYears}
                    onChange={e => setInfYears(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Future Cost of Same Goods in {infYears} Years
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{infResult.futureEquivalentValue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Purchasing power of {currentCurrency.symbol}{infAmount.toLocaleString()} drops by <b>{infResult.lossInPurchasingPowerPercent}%</b>
                  </div>
                </div>
              </div>
            )}

            {/* 8. DIVIDEND YIELD */}
            {slug === 'dividend-yield-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Stock Price ({currentCurrency.symbol})</label>
                    <input type="number" value={divPrice} onChange={e => setDivPrice(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Annual Div/Share</label>
                    <input type="number" step="0.1" value={divAnnualPayout} onChange={e => setDivAnnualPayout(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Shares Owned</label>
                    <input type="number" value={divShares} onChange={e => setDivShares(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Dividend Yield
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {divResult.dividendYieldPercent}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Annual Passive Income: <b style={{ color: 'var(--accent-emerald)' }}>{currentCurrency.symbol}{divResult.annualDividendIncome.toLocaleString()}</b> ({currentCurrency.symbol}{divResult.monthlyDividendIncome.toFixed(2)}/mo)
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Calculation result from Calculator360: ${calcMeta.title}`)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                <span>{copied ? 'Copied Summary' : 'Copy Result'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="calculator-sidebar">
          <div className="m3-card-filled" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              💰 Financial Planning
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Paying down high-interest debt provides a guaranteed return equal to the APR rate. Building diversified assets accelerates compound wealth.
            </p>
          </div>
          <AdBanner slotType="rectangle" />
        </div>
      </div>

      <CalculatorArticleView
        calculatorId={calcMeta.id}
        calculatorName={calcMeta.title}
        categoryName={calcMeta.category}
      />
    </div>
  );
};
