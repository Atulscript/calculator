import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculate401k,
  calculateCD,
  calculateDTI,
  calculateROI,
  calculateMarginMarkup,
  calculateAnnuity,
  calculateDepreciation,
  calculateFHALoan
} from '../utils/advancedFinanceEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  PiggyBank,
  TrendingUp,
  Percent,
  Copy,
  Check,
  Building,
  DollarSign
} from 'lucide-react';

interface AdvancedFinanceToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const AdvancedFinanceToolsPage: React.FC<AdvancedFinanceToolsPageProps> = ({ slug, onNavigate }) => {
  const { currentCurrency } = useLocalization();
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Professional financial calculation engine.',
    category: 'finance' as const,
    tags: [slug],
    icon: 'DollarSign'
  };



  // 1. 401k / IRA State
  const [ageCurrent, setAgeCurrent] = useState<number>(30);
  const [ageRetire, setAgeRetire] = useState<number>(65);
  const [balance401k, setBalance401k] = useState<number>(25000);
  const [salary401k, setSalary401k] = useState<number>(85000);
  const [contribPct, setContribPct] = useState<number>(8);
  const [matchPct, setMatchPct] = useState<number>(50); // 50% match
  const [matchLimit, setMatchLimit] = useState<number>(6); // up to 6%
  const [returnPct, setReturnPct] = useState<number>(7.5);

  // 2. CD State
  const [cdDeposit, setCdDeposit] = useState<number>(10000);
  const [cdRate, setCdRate] = useState<number>(4.75);
  const [cdMonths, setCdMonths] = useState<number>(12);

  // 3. DTI State
  const [dtiIncome, setDtiIncome] = useState<number>(6500);
  const [dtiHousing, setDtiHousing] = useState<number>(1800);
  const [dtiDebts, setDtiDebts] = useState<number>(550);

  // 4. ROI State
  const [roiInitial, setRoiInitial] = useState<number>(20000);
  const [roiFinal, setRoiFinal] = useState<number>(34000);
  const [roiYears, setRoiYears] = useState<number>(3);

  // 5. Margin / Markup State
  const [mmCost, setMmCost] = useState<number>(60);
  const [mmPrice, setMmPrice] = useState<number>(100);

  // 6. Annuity State
  const [annMonthly, setAnnMonthly] = useState<number>(500);
  const [annRate, setAnnRate] = useState<number>(6);
  const [annYears, setAnnYears] = useState<number>(20);

  // 7. Depreciation State
  const [depCost, setDepCost] = useState<number>(45000);
  const [depSalvage, setDepSalvage] = useState<number>(5000);
  const [depYears, setDepYears] = useState<number>(5);

  // 8. FHA / VA Mortgage State
  const [fhaPrice, setFhaPrice] = useState<number>(350000);
  const [fhaDownPct, setFhaDownPct] = useState<number>(3.5);
  const [fhaRate, setFhaRate] = useState<number>(6.25);

  // Memos
  const res401k = useMemo(() => {
    return calculate401k(
      ageCurrent,
      ageRetire,
      balance401k,
      salary401k,
      contribPct,
      matchPct,
      matchLimit,
      returnPct
    );
  }, [ageCurrent, ageRetire, balance401k, salary401k, contribPct, matchPct, matchLimit, returnPct]);

  const resCD = useMemo(() => {
    return calculateCD(cdDeposit, cdRate, cdMonths);
  }, [cdDeposit, cdRate, cdMonths]);

  const resDTI = useMemo(() => {
    return calculateDTI(dtiIncome, dtiHousing, dtiDebts);
  }, [dtiIncome, dtiHousing, dtiDebts]);

  const resROI = useMemo(() => {
    return calculateROI(roiInitial, roiFinal, roiYears);
  }, [roiInitial, roiFinal, roiYears]);

  const resMM = useMemo(() => {
    return calculateMarginMarkup(mmCost, mmPrice, 'fromPrice');
  }, [mmCost, mmPrice]);

  const resAnnuity = useMemo(() => {
    return calculateAnnuity(annMonthly, annRate, annYears);
  }, [annMonthly, annRate, annYears]);

  const resDep = useMemo(() => {
    return calculateDepreciation(depCost, depSalvage, depYears);
  }, [depCost, depSalvage, depYears]);

  const resFHA = useMemo(() => {
    return calculateFHALoan(fhaPrice, fhaDownPct, fhaRate);
  }, [fhaPrice, fhaDownPct, fhaRate]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calculator-page-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
        <button onClick={() => handleCopy(window.location.href)} className="glass-pill" style={{ cursor: 'pointer' }}>
          {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff'
        }}>
          {slug.includes('401k') || slug.includes('ira') || slug.includes('pension') ? <PiggyBank size={22} /> :
           slug.includes('cd') || slug.includes('interest') ? <Percent size={22} /> :
           slug.includes('dti') || slug.includes('debt') ? <ScaleIcon size={22} /> :
           slug.includes('roi') || slug.includes('margin') ? <TrendingUp size={22} /> :
           slug.includes('fha') || slug.includes('mortgage') ? <Building size={22} /> :
           <DollarSign size={22} />}
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{calcMeta.title}</h1>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{calcMeta.shortDescription}</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        {/* 1. 401K & RETIREMENT */}
        {(slug === '401k-calculator' || slug === 'roth-ira-calculator' || slug === 'ira-calculator' || slug === 'pension-calculator' || slug === 'social-security-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Current Balance ({currentCurrency.symbol})</label>
                <input type="number" value={balance401k} onChange={e => setBalance401k(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Annual Salary ({currentCurrency.symbol})</label>
                <input type="number" value={salary401k} onChange={e => setSalary401k(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Your Contribution: {contribPct}%</label>
                <input type="range" min="1" max="25" step="1" value={contribPct} onChange={e => setContribPct(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Employer Match: {matchPct}%</label>
                <input type="range" min="0" max="100" step="5" value={matchPct} onChange={e => setMatchPct(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Match Salary Cap: {matchLimit}%</label>
                <input type="range" min="1" max="15" step="1" value={matchLimit} onChange={e => setMatchLimit(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Current Age / Retire Age</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" value={ageCurrent} onChange={e => setAgeCurrent(Number(e.target.value) || 20)} className="m3-input-field" style={{ width: '50%' }} />
                  <input type="number" value={ageRetire} onChange={e => setAgeRetire(Number(e.target.value) || 65)} className="m3-input-field" style={{ width: '50%' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Annual Return: {returnPct}%</label>
                <input type="range" min="3" max="12" step="0.5" value={returnPct} onChange={e => setReturnPct(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Projected Nest Egg at Age {ageRetire}</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{res401k.futureBalance.toLocaleString()}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                <div>Employee Saved: <b>{currentCurrency.symbol}{res401k.totalEmployeeContributions.toLocaleString()}</b></div>
                <div>Employer Match: <b>{currentCurrency.symbol}{res401k.totalEmployerMatch.toLocaleString()}</b></div>
                <div>Investment Growth: <b style={{ color: 'var(--accent-emerald)' }}>+{currentCurrency.symbol}{res401k.totalInvestmentGrowth.toLocaleString()}</b></div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CD & BOND */}
        {(slug === 'cd-calculator' || slug === 'bond-calculator' || slug === 'interest-rate-calculator' || slug === 'savings-calculator' || slug === 'college-cost-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Deposit Amount ({currentCurrency.symbol})</label>
                <input type="number" value={cdDeposit} onChange={e => setCdDeposit(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Annual APY: {cdRate}%</label>
                <input type="number" step="0.05" value={cdRate} onChange={e => setCdRate(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Term: {cdMonths} Months</label>
                <select value={cdMonths} onChange={e => setCdMonths(Number(e.target.value))} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>1 Year (12 Months)</option>
                  <option value={24}>2 Years (24 Months)</option>
                  <option value={36}>3 Years (36 Months)</option>
                  <option value={60}>5 Years (60 Months)</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Maturity Value</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resCD.maturityBalance.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Interest Earned: <b style={{ color: 'var(--accent-emerald)' }}>+{currentCurrency.symbol}{resCD.totalInterestEarned.toLocaleString()}</b> • Effective APY: <b>{resCD.effectiveAPY}%</b>
              </div>
            </div>
          </div>
        )}

        {/* 3. DTI & DEBT / LOANS */}
        {(slug === 'debt-ratio-calculator' || slug === 'debt-payoff-calculator' || slug === 'debt-consolidation-calculator' || slug === 'personal-loan-calculator' || slug === 'business-loan-calculator' || slug === 'boat-loan-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Gross Monthly Income ({currentCurrency.symbol})</label>
                <input type="number" value={dtiIncome} onChange={e => setDtiIncome(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Monthly Rent / Mortgage ({currentCurrency.symbol})</label>
                <input type="number" value={dtiHousing} onChange={e => setDtiHousing(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Other Recurring Debts ({currentCurrency.symbol})</label>
                <input type="number" value={dtiDebts} onChange={e => setDtiDebts(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Back-End Debt-to-Income (DTI)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: resDTI.backEndStatus === 'Excellent' ? 'var(--accent-emerald)' : resDTI.backEndStatus === 'Acceptable' ? 'var(--accent-amber)' : 'var(--accent-red)', margin: '0.4rem 0' }}>
                {resDTI.backEndDTI}% ({resDTI.backEndStatus})
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Front-End Housing DTI: <b>{resDTI.frontEndDTI}%</b> • Max Qualifying Additional Debt: <b>{currentCurrency.symbol}{resDTI.maxAllowableDebtPayment.toLocaleString()}/mo</b>
              </div>
            </div>
          </div>
        )}

        {/* 4. ROI & IRR */}
        {(slug === 'roi-calculator' || slug === 'irr-calculator' || slug === 'payback-period-calculator' || slug === 'commission-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Initial Investment ({currentCurrency.symbol})</label>
                <input type="number" value={roiInitial} onChange={e => setRoiInitial(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Returned / Final Value ({currentCurrency.symbol})</label>
                <input type="number" value={roiFinal} onChange={e => setRoiFinal(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Investment Duration (Years)</label>
                <input type="number" min="1" max="50" value={roiYears} onChange={e => setRoiYears(Number(e.target.value) || 1)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Return on Investment (ROI)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: resROI.roiPercentage >= 0 ? 'var(--accent-emerald)' : 'var(--accent-red)', margin: '0.4rem 0' }}>
                {resROI.roiPercentage > 0 ? '+' : ''}{resROI.roiPercentage}%
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Net Profit: <b>{currentCurrency.symbol}{resROI.netProfit.toLocaleString()}</b> • Annualized ROI: <b>{resROI.annualizedROI}% / yr</b> • Multiple: <b>{resROI.profitMultiplier}x</b>
              </div>
            </div>
          </div>
        )}

        {/* 5. MARGIN & MARKUP */}
        {slug === 'margin-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Product Cost ({currentCurrency.symbol})</label>
                <input type="number" value={mmCost} onChange={e => setMmCost(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Selling Price ({currentCurrency.symbol})</label>
                <input type="number" value={mmPrice} onChange={e => setMmPrice(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Gross Profit Margin</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {resMM.profitMarginPercent}%
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Gross Profit: <b>{currentCurrency.symbol}{resMM.grossProfit.toLocaleString()}</b> • Markup on Cost: <b>{resMM.markupPercent}%</b>
              </div>
            </div>
          </div>
        )}

        {/* 6. ANNUITY */}
        {(slug === 'annuity-calculator' || slug === 'annuity-payout-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Monthly Contribution ({currentCurrency.symbol})</label>
                <input type="number" value={annMonthly} onChange={e => setAnnMonthly(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Interest Rate: {annRate}%</label>
                <input type="number" step="0.1" value={annRate} onChange={e => setAnnRate(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Duration: {annYears} Years</label>
                <input type="number" value={annYears} onChange={e => setAnnYears(Number(e.target.value) || 1)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Future Annuity Value</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resAnnuity.futureValue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Paid In: <b>{currentCurrency.symbol}{resAnnuity.totalContributions.toLocaleString()}</b> • Compound Interest: <b style={{ color: 'var(--accent-emerald)' }}>+{currentCurrency.symbol}{resAnnuity.totalInterest.toLocaleString()}</b>
              </div>
            </div>
          </div>
        )}

        {/* 7. DEPRECIATION */}
        {slug === 'depreciation-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Asset Cost ({currentCurrency.symbol})</label>
                <input type="number" value={depCost} onChange={e => setDepCost(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Salvage / Scrap Value ({currentCurrency.symbol})</label>
                <input type="number" value={depSalvage} onChange={e => setDepSalvage(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Useful Life (Years)</label>
                <input type="number" value={depYears} onChange={e => setDepYears(Number(e.target.value) || 1)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Annual Straight-Line Depreciation</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-red)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resDep.annualDepreciation.toLocaleString()}/yr
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Depreciable Base: <b>{currentCurrency.symbol}{(depCost - depSalvage).toLocaleString()}</b> over {depYears} years
              </div>
            </div>
          </div>
        )}

        {/* 8. FHA & VA MORTGAGES */}
        {(slug === 'fha-loan-calculator' || slug === 'va-mortgage-calculator' || slug === 'mortgage-calculator-uk' || slug === 'canadian-mortgage-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Home Purchase Price ({currentCurrency.symbol})</label>
                <input type="number" value={fhaPrice} onChange={e => setFhaPrice(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Down Payment: {fhaDownPct}%</label>
                <input type="number" step="0.5" value={fhaDownPct} onChange={e => setFhaDownPct(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Interest Rate: {fhaRate}%</label>
                <input type="number" step="0.1" value={fhaRate} onChange={e => setFhaRate(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Monthly Mortgage Payment</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resFHA.totalMonthlyPayment.toLocaleString()}/mo
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Base P&I: <b>{currentCurrency.symbol}{resFHA.baseMonthlyPI.toLocaleString()}</b> • Monthly MIP Insurance: <b>{currentCurrency.symbol}{resFHA.monthlyMIP.toLocaleString()}</b> • Financed Loan: <b>{currentCurrency.symbol}{resFHA.loanAmount.toLocaleString()}</b>
              </div>
            </div>
          </div>
        )}
        
        {/* DEFAULT FALLBACK - NEVER LEAVE A BLANK CARD */}
        {![
          '401k-calculator', 'roth-ira-calculator', 'ira-calculator', 'pension-calculator', 'social-security-calculator',
          'cd-calculator', 'bond-calculator', 'interest-rate-calculator', 'savings-calculator', 'college-cost-calculator',
          'debt-ratio-calculator', 'debt-payoff-calculator', 'debt-consolidation-calculator', 'personal-loan-calculator', 'business-loan-calculator', 'boat-loan-calculator',
          'roi-calculator', 'irr-calculator', 'payback-period-calculator', 'commission-calculator',
          'margin-calculator', 'annuity-calculator', 'annuity-payout-calculator', 'depreciation-calculator',
          'fha-loan-calculator', 'va-mortgage-calculator', 'mortgage-calculator-uk', 'canadian-mortgage-calculator'
        ].includes(slug) && (
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{calcMeta.title}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{calcMeta.shortDescription}</p>
          </div>
        )}
      </div>

      <CalculatorArticleView calculatorId={slug} calculatorName={calcMeta.title} categoryName={calcMeta.category} />
      <div style={{ marginTop: '2rem' }}>
        <AdBanner slotType="leaderboard" />
      </div>
    </div>
  );
};

function ScaleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}
