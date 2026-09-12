import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateHomeAffordability,
  calculateRentVsBuy,
  calculateRefinance,
  calculateRentalROI,
  calculateHELOC,
  calculateStampDuty
} from '../utils/realEstateEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Home,
  Building,
  RefreshCw,
  TrendingUp,
  Percent,
  Copy,
  Check
} from 'lucide-react';

interface RealEstateToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const RealEstateToolsPage: React.FC<RealEstateToolsPageProps> = ({ slug, onNavigate }) => {
  const { currency, currentCurrency } = useLocalization();
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Professional real estate modeling and financial calculations.',
    category: 'finance',
    tags: [slug],
    icon: 'Home'
  };



  // 1. Home Affordability State
  const [affIncome, setAffIncome] = useState<number>(currency === 'INR' ? 1500000 : 95000);
  const [affDebts, setAffDebts] = useState<number>(currency === 'INR' ? 15000 : 500);
  const [affDown, setAffDown] = useState<number>(currency === 'INR' ? 1000000 : 60000);
  const [affRate, setAffRate] = useState<number>(6.75);
  const [affTerm, setAffTerm] = useState<number>(30);

  // 2. Rent vs Buy State
  const [rvbPrice, setRvbPrice] = useState<number>(currency === 'INR' ? 8000000 : 425000);
  const [rvbRent, setRvbRent] = useState<number>(currency === 'INR' ? 35000 : 2300);
  const [rvbYears, setRvbYears] = useState<number>(7);
  const [rvbRate, setRvbRate] = useState<number>(6.5);

  // 3. Refinance State
  const [refBalance, setRefBalance] = useState<number>(currency === 'INR' ? 4000000 : 320000);
  const [refCurRate, setRefCurRate] = useState<number>(7.25);
  const [refNewRate, setRefNewRate] = useState<number>(5.85);
  const [refRemMonths, setRefRemMonths] = useState<number>(310);
  const [refNewYears, setRefNewYears] = useState<number>(30);
  const [refClosing, setRefClosing] = useState<number>(currency === 'INR' ? 50000 : 4500);

  // 4. Rental ROI State
  const [roiPrice, setRoiPrice] = useState<number>(currency === 'INR' ? 6000000 : 350000);
  const [roiDown, setRoiDown] = useState<number>(currency === 'INR' ? 1200000 : 70000);
  const [roiRent, setRoiRent] = useState<number>(currency === 'INR' ? 30000 : 2500);
  const [roiTax, setRoiTax] = useState<number>(currency === 'INR' ? 30000 : 4200);
  const [roiIns, setRoiIns] = useState<number>(currency === 'INR' ? 15000 : 1400);

  // 5. HELOC State
  const [helocVal, setHelocVal] = useState<number>(currency === 'INR' ? 10000000 : 550000);
  const [helocBal, setHelocBal] = useState<number>(currency === 'INR' ? 4500000 : 280000);
  const [helocLTV, setHelocLTV] = useState<number>(85);
  const [helocRate, setHelocRate] = useState<number>(8.5);
  const [helocDraw, setHelocDraw] = useState<number>(currency === 'INR' ? 1000000 : 50000);

  // 6. Stamp Duty State
  const [sdVal, setSdVal] = useState<number>(350000);
  const [sdBuyer, setSdBuyer] = useState<'first_time' | 'home_mover' | 'additional_property'>('home_mover');

  // Calculation Memos
  const affResult = useMemo(() => {
    return calculateHomeAffordability({
      annualHouseholdIncome: affIncome,
      monthlyDebts: affDebts,
      downPaymentSavings: affDown,
      mortgageInterestRate: affRate,
      loanTermYears: affTerm
    });
  }, [affIncome, affDebts, affDown, affRate, affTerm]);

  const rvbResult = useMemo(() => {
    return calculateRentVsBuy({
      homePrice: rvbPrice,
      downPaymentPercent: 20,
      mortgageRate: rvbRate,
      stayDurationYears: rvbYears,
      monthlyRent: rvbRent
    });
  }, [rvbPrice, rvbRate, rvbYears, rvbRent]);

  const refResult = useMemo(() => {
    return calculateRefinance({
      currentLoanBalance: refBalance,
      currentInterestRate: refCurRate,
      currentRemainingMonths: refRemMonths,
      newInterestRate: refNewRate,
      newLoanTermYears: refNewYears,
      refinanceClosingCosts: refClosing
    });
  }, [refBalance, refCurRate, refRemMonths, refNewRate, refNewYears, refClosing]);

  const roiResult = useMemo(() => {
    return calculateRentalROI({
      purchasePrice: roiPrice,
      downPayment: roiDown,
      monthlyRent: roiRent,
      annualPropertyTaxes: roiTax,
      annualInsurance: roiIns
    });
  }, [roiPrice, roiDown, roiRent, roiTax, roiIns]);

  const helocResult = useMemo(() => {
    return calculateHELOC({
      currentHomeValue: helocVal,
      currentMortgageBalance: helocBal,
      maxLTVPercent: helocLTV,
      helocInterestRate: helocRate,
      drawAmount: helocDraw
    });
  }, [helocVal, helocBal, helocLTV, helocRate, helocDraw]);

  const sdResult = useMemo(() => {
    return calculateStampDuty({
      propertyValue: sdVal,
      buyerType: sdBuyer
    });
  }, [sdVal, sdBuyer]);

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
            {slug === 'home-affordability-calculator' && <Home size={22} />}
            {slug === 'rent-vs-buy-calculator' && <Building size={22} />}
            {slug === 'mortgage-refinance-calculator' && <RefreshCw size={22} />}
            {slug === 'rental-property-roi-calculator' && <TrendingUp size={22} />}
            {slug === 'heloc-calculator' && <Percent size={22} />}
            {slug === 'stamp-duty-calculator' && <Home size={22} />}
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

            {/* 1. HOME AFFORDABILITY */}
            {slug === 'home-affordability-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Gross Annual Income ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={affIncome}
                      onChange={e => setAffIncome(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Monthly Debts ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={affDebts}
                      onChange={e => setAffDebts(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Down Payment ({currentCurrency.symbol})</label>
                    <input
                      type="number"
                      value={affDown}
                      onChange={e => setAffDown(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={affRate}
                      onChange={e => setAffRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Loan Term</label>
                    <select
                      value={affTerm}
                      onChange={e => setAffTerm(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                    >
                      <option value={30}>30 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={15}>15 Years</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Maximum Home Price You Can Afford
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{affResult.maxHomePrice.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Max Monthly Payment: <b>{currentCurrency.symbol}{affResult.maxMonthlyMortgagePayment.toLocaleString()}/mo</b> • Loan: <b>{currentCurrency.symbol}{affResult.maxLoanAmount.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            )}

            {/* 2. RENT VS BUY */}
            {slug === 'rent-vs-buy-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Home Target Price ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={rvbPrice}
                      onChange={e => setRvbPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Equivalent Monthly Rent ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={rvbRent}
                      onChange={e => setRvbRent(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Years Staying in Home: {rvbYears} Years
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="30"
                      value={rvbYears}
                      onChange={e => setRvbYears(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Mortgage Rate: {rvbRate}%
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="0.25"
                      value={rvbRate}
                      onChange={e => setRvbRate(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Financial Recommendation
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, color: rvbResult.recommendation === 'buy' ? 'var(--accent-emerald)' : '#0b57d0', margin: '0.35rem 0' }}>
                    {rvbResult.recommendation === 'buy' ? 'Buying is Cheaper' : 'Renting is Cheaper'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Estimated Savings: {currentCurrency.symbol}{rvbResult.savingsAmount.toLocaleString()} over {rvbYears} years • Break-even around Year {rvbResult.breakEvenYear}
                  </div>
                </div>
              </div>
            )}

            {/* 3. REFINANCE */}
            {slug === 'mortgage-refinance-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Current Balance ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={refBalance}
                      onChange={e => setRefBalance(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Refinance Closing Costs ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={refClosing}
                      onChange={e => setRefClosing(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Current Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={refCurRate}
                      onChange={e => setRefCurRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>New Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={refNewRate}
                      onChange={e => setRefNewRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Remaining Months</label>
                    <input
                      type="number"
                      value={refRemMonths}
                      onChange={e => setRefRemMonths(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>New Term</label>
                    <select
                      value={refNewYears}
                      onChange={e => setRefNewYears(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                    >
                      <option value={30}>30 Years</option>
                      <option value={20}>20 Years</option>
                      <option value={15}>15 Years</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Monthly Payment Savings
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: refResult.monthlySavings > 0 ? 'var(--accent-emerald)' : 'var(--accent-red)', margin: '0.35rem 0' }}>
                    {refResult.monthlySavings > 0 ? '+' : ''}{currentCurrency.symbol}{refResult.monthlySavings.toLocaleString()}/mo
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Break-even in <b>{refResult.breakEvenMonths} Months</b> • Lifetime Savings: <b>{currentCurrency.symbol}{refResult.lifetimeSavings.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RENTAL PROPERTY ROI */}
            {slug === 'rental-property-roi-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Purchase Price ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={roiPrice}
                      onChange={e => setRoiPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Monthly Rental Income ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={roiRent}
                      onChange={e => setRoiRent(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Down Payment</label>
                    <input
                      type="number"
                      value={roiDown}
                      onChange={e => setRoiDown(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Annual Taxes</label>
                    <input
                      type="number"
                      value={roiTax}
                      onChange={e => setRoiTax(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Annual Insurance</label>
                    <input
                      type="number"
                      value={roiIns}
                      onChange={e => setRoiIns(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Capitalization Rate (Cap Rate)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {roiResult.capRate}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Net Operating Income (NOI): {currentCurrency.symbol}{roiResult.netOperatingIncome.toLocaleString()}/yr • Cash-on-Cash Return: {roiResult.cashOnCashReturn}%
                  </div>
                </div>
              </div>
            )}

            {/* 5. HELOC */}
            {slug === 'heloc-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Current Home Value ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={helocVal}
                      onChange={e => setHelocVal(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      Mortgage Balance ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={helocBal}
                      onChange={e => setHelocBal(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Max LTV ({helocLTV}%)</label>
                    <input
                      type="range"
                      min="70"
                      max="90"
                      value={helocLTV}
                      onChange={e => setHelocLTV(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>HELOC APR ({helocRate}%)</label>
                    <input
                      type="number"
                      step="0.25"
                      value={helocRate}
                      onChange={e => setHelocRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Planned Draw Amount</label>
                    <input
                      type="number"
                      value={helocDraw}
                      onChange={e => setHelocDraw(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Available Credit Line
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{helocResult.availableCreditLine.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Interest-Only Payment: {currentCurrency.symbol}{helocResult.interestOnlyMonthlyPayment.toLocaleString()}/mo on {currentCurrency.symbol}{helocDraw.toLocaleString()} draw
                  </div>
                </div>
              </div>
            )}

            {/* 6. STAMP DUTY */}
            {slug === 'stamp-duty-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                    Property Purchase Price (£)
                  </label>
                  <input
                    type="number"
                    value={sdVal}
                    onChange={e => setSdVal(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Buyer Type:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setSdBuyer('first_time')}
                      className={`m3-chip ${sdBuyer === 'first_time' ? 'active' : ''}`}
                    >
                      First-Time Buyer
                    </button>
                    <button
                      type="button"
                      onClick={() => setSdBuyer('home_mover')}
                      className={`m3-chip ${sdBuyer === 'home_mover' ? 'active' : ''}`}
                    >
                      Moving Home
                    </button>
                    <button
                      type="button"
                      onClick={() => setSdBuyer('additional_property')}
                      className={`m3-chip ${sdBuyer === 'additional_property' ? 'active' : ''}`}
                    >
                      Additional / Buy-to-Let (+3%)
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Stamp Duty (SDLT) Due
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-red)', margin: '0.35rem 0' }}>
                    £{sdResult.totalStampDuty.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Effective Tax Rate: {sdResult.effectiveRate}%
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
              🏡 Real Estate Insight
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Lenders typically recommend keeping total housing costs below 28% of gross monthly income, and total debt payments below 36%.
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
