import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateAutoLoan,
  calculateRetirement,
  calculateOvulation,
  calculateFuelCost,
  calculateGST,
  calculateBMR,
  calculatePPF
} from '../utils/trafficEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Car,
  PiggyBank,
  CalendarHeart,
  Fuel,
  Receipt,
  Flame,
  Landmark,
  Copy,
  Check
} from 'lucide-react';

interface HighTrafficToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const HighTrafficToolsPage: React.FC<HighTrafficToolsPageProps> = ({ slug, onNavigate }) => {
  const { currency, currentCurrency } = useLocalization();
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug: slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Calculate with precision using smart inputs and instant reactive calculations.',
    category: 'finance',
    tags: [slug],
    icon: 'Calculator'
  };



  // 1. Auto Loan State
  const [carPrice, setCarPrice] = useState<number>(currency === 'INR' ? 1200000 : 32000);
  const [carDownPayment, setCarDownPayment] = useState<number>(currency === 'INR' ? 200000 : 5000);
  const [carTradeIn, setCarTradeIn] = useState<number>(0);
  const [carTaxPercent, setCarTaxPercent] = useState<number>(7);
  const [carInterestRate, setCarInterestRate] = useState<number>(6.5);
  const [carLoanTerm, setCarLoanTerm] = useState<number>(60); // 60 months (5 years)

  // 2. Retirement State
  const [retCurrentAge, setRetCurrentAge] = useState<number>(30);
  const [retRetirementAge, setRetRetirementAge] = useState<number>(60);
  const [retCurrentSavings, setRetCurrentSavings] = useState<number>(currency === 'INR' ? 500000 : 50000);
  const [retMonthlyContribution, setRetMonthlyContribution] = useState<number>(currency === 'INR' ? 25000 : 800);
  const [retExpectedReturn, setRetExpectedReturn] = useState<number>(9);
  const [retInflationRate, setRetInflationRate] = useState<number>(3.5);
  const [retDesiredMonthlySpend, setRetDesiredMonthlySpend] = useState<number>(currency === 'INR' ? 100000 : 4500);

  // 3. Ovulation State
  const [ovLmpDate, setOvLmpDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return d.toISOString().split('T')[0];
  });
  const [ovCycleDays, setOvCycleDays] = useState<number>(28);

  // 4. Fuel Cost State
  const [fuelDistance, setFuelDistance] = useState<number>(350);
  const [fuelDistUnit, setFuelDistUnit] = useState<'miles' | 'km'>('miles');
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(28);
  const [fuelEffUnit, setFuelEffUnit] = useState<'mpg' | 'l_per_100km' | 'km_per_l'>('mpg');
  const [fuelPrice, setFuelPrice] = useState<number>(3.65);
  const [fuelPassengers, setFuelPassengers] = useState<number>(1);

  // 5. GST State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // 6. BMR State
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrAge, setBmrAge] = useState<number>(28);
  const [bmrWeight, setBmrWeight] = useState<number>(75);
  const [bmrHeight, setBmrHeight] = useState<number>(178);

  // 7. PPF State
  const [ppfDeposit, setPpfDeposit] = useState<number>(150000);
  const [ppfInterestRate, setPpfInterestRate] = useState<number>(7.1);
  const [ppfTenure, setPpfTenure] = useState<number>(15);

  // Calculations
  const autoLoanResult = useMemo(() => {
    return calculateAutoLoan({
      vehiclePrice: carPrice,
      downPayment: carDownPayment,
      tradeInValue: carTradeIn,
      salesTaxPercent: carTaxPercent,
      annualInterestRate: carInterestRate,
      loanTermMonths: carLoanTerm
    });
  }, [carPrice, carDownPayment, carTradeIn, carTaxPercent, carInterestRate, carLoanTerm]);

  const retirementResult = useMemo(() => {
    return calculateRetirement({
      currentAge: retCurrentAge,
      retirementAge: retRetirementAge,
      currentSavings: retCurrentSavings,
      monthlyContribution: retMonthlyContribution,
      expectedAnnualReturn: retExpectedReturn,
      inflationRate: retInflationRate,
      desiredMonthlyIncome: retDesiredMonthlySpend
    });
  }, [retCurrentAge, retRetirementAge, retCurrentSavings, retMonthlyContribution, retExpectedReturn, retInflationRate, retDesiredMonthlySpend]);

  const ovulationResult = useMemo(() => {
    return calculateOvulation({
      lastPeriodDate: ovLmpDate,
      cycleLengthDays: ovCycleDays
    });
  }, [ovLmpDate, ovCycleDays]);

  const fuelResult = useMemo(() => {
    return calculateFuelCost({
      distance: fuelDistance,
      distanceUnit: fuelDistUnit,
      efficiency: fuelEfficiency,
      efficiencyUnit: fuelEffUnit,
      fuelPricePerUnit: fuelPrice,
      passengersCount: fuelPassengers
    });
  }, [fuelDistance, fuelDistUnit, fuelEfficiency, fuelEffUnit, fuelPrice, fuelPassengers]);

  const gstResult = useMemo(() => {
    return calculateGST({
      amount: gstAmount,
      gstRate,
      type: gstType
    });
  }, [gstAmount, gstRate, gstType]);

  const bmrResult = useMemo(() => {
    return calculateBMR({
      gender: bmrGender,
      age: bmrAge,
      weightKg: bmrWeight,
      heightCm: bmrHeight
    });
  }, [bmrGender, bmrAge, bmrWeight, bmrHeight]);

  const ppfResult = useMemo(() => {
    return calculatePPF({
      yearlyDeposit: ppfDeposit,
      interestRate: ppfInterestRate,
      tenureYears: ppfTenure
    });
  }, [ppfDeposit, ppfInterestRate, ppfTenure]);

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

      {/* Hero Header */}
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
            {(slug === 'auto-loan-calculator' || slug === 'car-loan-calculator') && <Car size={22} />}
            {slug === 'retirement-calculator' && <PiggyBank size={22} />}
            {slug === 'ovulation-calculator' && <CalendarHeart size={22} />}
            {slug === 'fuel-cost-calculator' && <Fuel size={22} />}
            {slug === 'gst-calculator' && <Receipt size={22} />}
            {slug === 'bmr-calculator' && <Flame size={22} />}
            {slug === 'ppf-calculator' && <Landmark size={22} />}
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
        {/* Left Column: Calculator Card */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>

            {/* ======================================================= */}
            {/* 1. AUTO / CAR LOAN CALCULATOR */}
            {/* ======================================================= */}
            {(slug === 'auto-loan-calculator' || slug === 'car-loan-calculator') && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Vehicle Purchase Price ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={carPrice}
                      onChange={e => setCarPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Down Payment ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={carDownPayment}
                      onChange={e => setCarDownPayment(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Trade-in Value ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={carTradeIn}
                      onChange={e => setCarTradeIn(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={carInterestRate}
                      onChange={e => setCarInterestRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Sales Tax (%)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={carTaxPercent}
                      onChange={e => setCarTaxPercent(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Term Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.45rem' }}>
                    Loan Term: {carLoanTerm} Months ({carLoanTerm / 12} Years)
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[36, 48, 60, 72, 84].map(term => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setCarLoanTerm(term)}
                        className={`m3-chip ${carLoanTerm === term ? 'active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        {term} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Hero */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Monthly Payment
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{autoLoanResult.monthlyPayment.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Principal: {currentCurrency.symbol}{autoLoanResult.loanAmount.toLocaleString()} • Total Interest: {currentCurrency.symbol}{autoLoanResult.totalInterest.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>SALES TAX</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{currentCurrency.symbol}{autoLoanResult.salesTaxAmount.toLocaleString()}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL LOAN PAYMENTS</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>{currentCurrency.symbol}{autoLoanResult.totalLoanPayments.toLocaleString()}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL CAR COST</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{currentCurrency.symbol}{autoLoanResult.totalVehicleCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. RETIREMENT & FIRE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'retirement-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Current Age ({retCurrentAge})
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="75"
                      value={retCurrentAge}
                      onChange={e => setRetCurrentAge(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Retirement Target Age ({retRetirementAge})
                    </label>
                    <input
                      type="range"
                      min={retCurrentAge + 1}
                      max="85"
                      value={retRetirementAge}
                      onChange={e => setRetRetirementAge(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Current Savings ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={retCurrentSavings}
                      onChange={e => setRetCurrentSavings(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Monthly Contribution ({currentCurrency.symbol})
                    </label>
                    <input
                      type="number"
                      value={retMonthlyContribution}
                      onChange={e => setRetMonthlyContribution(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Annual Return ({retExpectedReturn}%)
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="15"
                      step="0.5"
                      value={retExpectedReturn}
                      onChange={e => setRetExpectedReturn(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Inflation ({retInflationRate}%)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="0.5"
                      value={retInflationRate}
                      onChange={e => setRetInflationRate(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                      Target Spending / Mo
                    </label>
                    <input
                      type="number"
                      value={retDesiredMonthlySpend}
                      onChange={e => setRetDesiredMonthlySpend(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {/* Retirement Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Projected Nest Egg at Age {retRetirementAge}
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{retirementResult.projectedNestEgg.toLocaleString()}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: retirementResult.isTargetMet ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: retirementResult.isTargetMet ? 'var(--accent-emerald)' : 'var(--accent-red)', fontWeight: 800, fontSize: '0.85rem' }}>
                    {retirementResult.isTargetMet ? '✅ On Track to Retire Comfortably!' : '⚠️ Shortfall: Consider increasing monthly savings'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>4% SAFE MONTHLY INCOME</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{currentCurrency.symbol}{retirementResult.monthlyRetirementIncomeSafe.toLocaleString()}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL INVESTED</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{currentCurrency.symbol}{retirementResult.totalContributions.toLocaleString()}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>INTEREST WEALTH GAIN</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{currentCurrency.symbol}{retirementResult.totalInterestEarned.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. OVULATION & FERTILITY CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'ovulation-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      First Day of Last Period
                    </label>
                    <input
                      type="date"
                      value={ovLmpDate}
                      onChange={e => setOvLmpDate(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.05rem', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Average Cycle ({ovCycleDays} Days)
                    </label>
                    <input
                      type="range"
                      min="21"
                      max="38"
                      value={ovCycleDays}
                      onChange={e => setOvCycleDays(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Ovulation Date
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, color: 'var(--accent-pink)', margin: '0.35rem 0' }}>
                    {ovulationResult.ovulationDate}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Most Fertile Window: <span style={{ color: 'var(--accent-pink)' }}>{ovulationResult.fertileWindowStart} – {ovulationResult.fertileWindowEnd}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>PEAK CONCEPTION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{ovulationResult.peakFertilityStart}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>NEXT PERIOD</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{ovulationResult.nextPeriodDate}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>PREGNANCY TEST DATE</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{ovulationResult.pregnancyTestDate}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. FUEL COST & ROAD TRIP CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'fuel-cost-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Trip Distance
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="number"
                        value={fuelDistance}
                        onChange={e => setFuelDistance(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ flex: 1, minWidth: 0, fontSize: '1.15rem', fontWeight: 800 }}
                      />
                      <select
                        value={fuelDistUnit}
                        onChange={e => setFuelDistUnit(e.target.value as any)}
                        style={{ padding: '0.5rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                      >
                        <option value="miles">Miles</option>
                        <option value="km">Kilometers</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Fuel Efficiency
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="number"
                        value={fuelEfficiency}
                        onChange={e => setFuelEfficiency(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ flex: 1, minWidth: 0, fontSize: '1.15rem', fontWeight: 800 }}
                      />
                      <select
                        value={fuelEffUnit}
                        onChange={e => setFuelEffUnit(e.target.value as any)}
                        style={{ padding: '0.5rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                      >
                        <option value="mpg">MPG</option>
                        <option value="l_per_100km">L/100km</option>
                        <option value="km_per_l">km/L</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Gas Price ({currentCurrency.symbol} per {fuelDistUnit === 'miles' ? 'Gallon' : 'Liter'})
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={fuelPrice}
                      onChange={e => setFuelPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Number of Passengers
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={fuelPassengers}
                      onChange={e => setFuelPassengers(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                {/* Fuel Result Hero */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Trip Fuel Cost
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{fuelResult.totalCost.toFixed(2)}
                  </div>
                  {fuelPassengers > 1 && (
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      {currentCurrency.symbol}{fuelResult.costPerPerson.toFixed(2)} per person ({fuelPassengers} travelers)
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>FUEL NEEDED</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{fuelResult.fuelQuantityNeeded} {fuelResult.fuelQuantityUnit}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>COST PER {fuelDistUnit.toUpperCase()}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{currentCurrency.symbol}{fuelResult.costPerDistanceUnit.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. GST / SALES TAX CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'gst-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Transaction Amount ({currentCurrency.symbol})
                  </label>
                  <input
                    type="number"
                    value={gstAmount}
                    onChange={e => setGstAmount(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                {/* Exclusive vs Inclusive mode */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setGstType('exclusive')}
                    className={`m3-segmented-tab ${gstType === 'exclusive' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontWeight: 700 }}
                  >
                    GST Exclusive (Add GST)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGstType('inclusive')}
                    className={`m3-segmented-tab ${gstType === 'inclusive' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontWeight: 700 }}
                  >
                    GST Inclusive (Remove GST)
                  </button>
                </div>

                {/* GST Rate Chips */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Select Tax Slab Rate:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[0, 5, 12, 18, 28].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setGstRate(r)}
                        className={`m3-chip ${gstRate === r ? 'active' : ''}`}
                        style={{ flex: 1, justifyContent: 'center' }}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Gross Amount
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {currentCurrency.symbol}{gstResult.totalAmount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Base Net: {currentCurrency.symbol}{gstResult.baseAmount.toLocaleString()} • GST Tax ({gstRate}%): {currentCurrency.symbol}{gstResult.gstAmount.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>CGST ({gstRate / 2}%)</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{currentCurrency.symbol}{gstResult.cgst.toLocaleString()}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>SGST ({gstRate / 2}%)</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{currentCurrency.symbol}{gstResult.sgst.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 6. BMR CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'bmr-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setBmrGender('male')}
                    className={`m3-segmented-tab ${bmrGender === 'male' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontWeight: 700 }}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setBmrGender('female')}
                    className={`m3-segmented-tab ${bmrGender === 'female' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem', fontWeight: 700 }}
                  >
                    Female
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                      Age
                    </label>
                    <input
                      type="number"
                      value={bmrAge}
                      onChange={e => setBmrAge(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={bmrHeight}
                      onChange={e => setBmrHeight(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={bmrWeight}
                      onChange={e => setBmrWeight(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Basal Metabolic Rate (BMR)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {bmrResult.bmrMifflin} <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>kcal/day</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Calories burned at complete resting state per 24 hours (Mifflin-St Jeor)
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-md)', padding: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Daily Maintenance Calories by Activity Level
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Sedentary (Little or no exercise):</span>
                      <b>{bmrResult.dailyCalories.sedentary} kcal</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Light Activity (1-3 days/wk):</span>
                      <b>{bmrResult.dailyCalories.lightActivity} kcal</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Moderate Exercise (3-5 days/wk):</span>
                      <b>{bmrResult.dailyCalories.moderateActivity} kcal</b>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Very Active (6-7 days/wk):</span>
                      <b>{bmrResult.dailyCalories.veryActive} kcal</b>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 7. PPF CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'ppf-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Yearly Deposit Amount (₹) [Max ₹1,50,000 / year]
                  </label>
                  <input
                    type="number"
                    max="150000"
                    value={ppfDeposit}
                    onChange={e => setPpfDeposit(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Government Interest Rate ({ppfInterestRate}%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={ppfInterestRate}
                      onChange={e => setPpfInterestRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Tenure ({ppfTenure} Years)
                    </label>
                    <select
                      value={ppfTenure}
                      onChange={e => setPpfTenure(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                    >
                      <option value={15}>15 Years (Base Tenure)</option>
                      <option value={20}>20 Years (1 Block Extension)</option>
                      <option value={25}>25 Years (2 Block Extensions)</option>
                    </select>
                  </div>
                </div>

                {/* PPF Hero Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Tax-Free Maturity Amount
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    ₹{ppfResult.maturityAmount.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total Investment: <b>₹{ppfResult.totalDeposited.toLocaleString()}</b> • Total Interest: <b style={{ color: 'var(--accent-emerald)' }}>₹{ppfResult.totalInterestEarned.toLocaleString()}</b>
                  </div>
                </div>

                <div style={{ maxHeight: '250px', overflowY: 'auto', background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-md)', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Yearly PPF Growth Schedule
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                        <th style={{ padding: '0.35rem' }}>Yr</th>
                        <th style={{ padding: '0.35rem' }}>Deposit</th>
                        <th style={{ padding: '0.35rem' }}>Interest</th>
                        <th style={{ padding: '0.35rem' }}>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ppfResult.schedule.map(row => (
                        <tr key={row.year} style={{ borderBottom: '1px dashed var(--border-subtle)' }}>
                          <td style={{ padding: '0.35rem' }}>{row.year}</td>
                          <td style={{ padding: '0.35rem' }}>₹{row.deposit.toLocaleString()}</td>
                          <td style={{ padding: '0.35rem', color: 'var(--accent-emerald)' }}>₹{row.interestEarned.toLocaleString()}</td>
                          <td style={{ padding: '0.35rem', fontWeight: 700 }}>₹{row.closingBalance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Copy button */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Calculation results from Calculator11: ${calcMeta.title}`)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                <span>{copied ? 'Copied Summary' : 'Copy Result'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Ad & Quick Tips */}
        <div className="calculator-sidebar">
          <div className="m3-card-filled" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              💡 Pro Tip
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              All calculations update automatically in real time. Adjust sliders or values to run instant scenario comparisons.
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
