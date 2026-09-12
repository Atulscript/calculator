import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateElectricityCost,
  calculateBTU,
  calculateHorsepower,
  calculateStairs,
  calculateTimeCard,
  calculateBandwidth,
  intToRoman,
  calculateTireComparison,
  calculateGasMileage,
  calculateRoofing
} from '../utils/advancedUtilityEngines';
import { useLocalization } from '../context/LocalizationContext';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Zap,
  Fan,
  Gauge,
  Layers,
  Clock,
  Wifi,
  Copy,
  Check,
  Binary,
  Disc,
  Fuel,
  Home
} from 'lucide-react';

const TIRE_WIDTHS = [145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325];
const TIRE_ASPECTS = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
const TIRE_RIMS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const POPULAR_TIRES = [
  '205/55R16',
  '215/60R16',
  '215/55R17',
  '225/45R17',
  '225/65R17',
  '245/45R18',
  '265/70R17'
];

function parseTireString(str: string): { width: number; aspect: number; rim: number } | null {
  if (!str) return null;
  const clean = str.toUpperCase().replace(/[PLT]/g, '').trim();
  const match = clean.match(/(\d{3})[\/\s\-](\d{2})[R\/\s\-](\d{2})/);
  if (match) {
    const w = parseInt(match[1], 10);
    const a = parseInt(match[2], 10);
    const r = parseInt(match[3], 10);
    if (w >= 100 && w <= 450 && a >= 20 && a <= 95 && r >= 10 && r <= 32) {
      return { width: w, aspect: a, rim: r };
    }
  }
  return null;
}

interface AdvancedUtilityToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const AdvancedUtilityToolsPage: React.FC<AdvancedUtilityToolsPageProps> = ({ slug, onNavigate }) => {
  const { currentCurrency } = useLocalization();
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Everyday and engineering calculation suite.',
    category: 'everyday' as const,
    tags: [slug],
    icon: 'Zap'
  };



  // 1. Electricity State
  const [elecWatts, setElecWatts] = useState<number>(1500); // e.g. space heater or AC
  const [elecHours, setElecHours] = useState<number>(8);
  const [elecRate, setElecRate] = useState<number>(0.16); // $/kWh

  // 2. BTU State
  const [btuLength, setBtuLength] = useState<number>(20);
  const [btuWidth, setBtuWidth] = useState<number>(18);
  const [btuSun, setBtuSun] = useState<'normal' | 'sunny' | 'shaded'>('normal');

  // 3. Horsepower State
  const [hpTorque, setHpTorque] = useState<number>(350);
  const [hpRpm, setHpRpm] = useState<number>(5500);

  // 4. Stair State
  const [stairRise, setStairRise] = useState<number>(108); // 9 feet rise

  // 5. Time Card State
  const [tcHours, setTcHours] = useState<number>(46);
  const [tcWage, setTcWage] = useState<number>(25);

  // 6. Bandwidth State
  const [bwSize, setBwSize] = useState<number>(5000); // 5 GB
  const [bwSpeed, setBwSpeed] = useState<number>(100); // 100 Mbps

  // 7. Roman Numeral State
  const [romanNum, setRomanNum] = useState<number>(2026);

  // 8. Base64 State
  const [base64Raw, setBase64Raw] = useState<string>('Hello OmniCalc World!');
  const [base64Encoded, setBase64Encoded] = useState<string>(() => {
    try {
      return btoa('Hello OmniCalc World!');
    } catch {
      return '';
    }
  });

  // 9. Tire Size State
  const [t1Width, setT1Width] = useState<number>(205);
  const [t1Aspect, setT1Aspect] = useState<number>(55);
  const [t1Rim, setT1Rim] = useState<number>(16);
  const [t1Text, setT1Text] = useState<string>('205/55R16');

  const [t2Width, setT2Width] = useState<number>(225);
  const [t2Aspect, setT2Aspect] = useState<number>(45);
  const [t2Rim, setT2Rim] = useState<number>(17);
  const [t2Text, setT2Text] = useState<string>('225/45R17');

  const handleT1Text = (val: string) => {
    setT1Text(val);
    const p = parseTireString(val);
    if (p) {
      setT1Width(p.width);
      setT1Aspect(p.aspect);
      setT1Rim(p.rim);
    }
  };

  const handleT2Text = (val: string) => {
    setT2Text(val);
    const p = parseTireString(val);
    if (p) {
      setT2Width(p.width);
      setT2Aspect(p.aspect);
      setT2Rim(p.rim);
    }
  };

  const updateT1Select = (w: number, a: number, r: number) => {
    setT1Width(w);
    setT1Aspect(a);
    setT1Rim(r);
    setT1Text(`${w}/${a}R${r}`);
  };

  const updateT2Select = (w: number, a: number, r: number) => {
    setT2Width(w);
    setT2Aspect(a);
    setT2Rim(r);
    setT2Text(`${w}/${a}R${r}`);
  };

  // 10. Gas Mileage State
  const [gmDistance, setGmDistance] = useState<number>(350);
  const [gmFuel, setGmFuel] = useState<number>(12.5);
  const [gmPrice, setGmPrice] = useState<number>(3.65);

  // 11. Roofing State
  const [rfLength, setRfLength] = useState<number>(40);
  const [rfWidth, setRfWidth] = useState<number>(30);
  const [rfPitch, setRfPitch] = useState<number>(6);
  const [rfCost, setRfCost] = useState<number>(120);

  // Memos
  const resElec = useMemo(() => calculateElectricityCost(elecWatts, elecHours, elecRate), [elecWatts, elecHours, elecRate]);
  const resBTU = useMemo(() => calculateBTU(btuLength, btuWidth, btuSun), [btuLength, btuWidth, btuSun]);
  const resHP = useMemo(() => calculateHorsepower(hpTorque, hpRpm), [hpTorque, hpRpm]);
  const resStair = useMemo(() => calculateStairs(stairRise), [stairRise]);
  const resTC = useMemo(() => calculateTimeCard(tcHours, tcWage), [tcHours, tcWage]);
  const resBW = useMemo(() => calculateBandwidth(bwSize, bwSpeed), [bwSize, bwSpeed]);
  const resRoman = useMemo(() => intToRoman(romanNum), [romanNum]);
  const resTire = useMemo(() => calculateTireComparison(t1Width, t1Aspect, t1Rim, t2Width, t2Aspect, t2Rim), [t1Width, t1Aspect, t1Rim, t2Width, t2Aspect, t2Rim]);
  const resGas = useMemo(() => calculateGasMileage(gmDistance, gmFuel, gmPrice), [gmDistance, gmFuel, gmPrice]);
  const resRoof = useMemo(() => calculateRoofing(rfLength, rfWidth, rfPitch, 10, rfCost), [rfLength, rfWidth, rfPitch, rfCost]);

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
          color: 'var(--md-sys-color-on-primary)'
        }}>
          {slug.includes('electric') || slug.includes('voltage') ? <Zap size={22} /> :
           slug.includes('btu') ? <Fan size={22} /> :
           slug.includes('horse') ? <Gauge size={22} /> :
           slug.includes('tire') ? <Disc size={22} /> :
           slug.includes('gas') || slug.includes('mileage') ? <Fuel size={22} /> :
           slug.includes('roof') ? <Home size={22} /> :
           slug.includes('stair') ? <Layers size={22} /> :
           slug.includes('time') || slug.includes('hour') ? <Clock size={22} /> :
           slug.includes('bandwidth') ? <Wifi size={22} /> :
           <Binary size={22} />}
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{calcMeta.title}</h1>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{calcMeta.shortDescription}</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        {/* 1. ELECTRICITY COST */}
        {(slug === 'electricity-calculator' || slug === 'voltage-drop-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Power Consumption (Watts)</label>
                <input type="number" value={elecWatts} onChange={e => setElecWatts(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Hours Used Per Day: {elecHours}h</label>
                <input type="range" min="0.5" max="24" step="0.5" value={elecHours} onChange={e => setElecHours(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Cost per kWh ({currentCurrency.symbol})</label>
                <input type="number" step="0.01" value={elecRate} onChange={e => setElecRate(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated Monthly Electricity Cost</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resElec.monthlyCost.toFixed(2)}/mo
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Daily: <b>{currentCurrency.symbol}{resElec.dailyCost.toFixed(2)}</b> ({resElec.dailyKwh} kWh) • Yearly: <b>{currentCurrency.symbol}{resElec.annualCost.toFixed(2)}</b> ({resElec.annualKwh} kWh/yr)
              </div>
            </div>
          </div>
        )}

        {/* 2. BTU / AC SIZING */}
        {slug === 'btu-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Room Length (Feet)</label>
                <input type="number" value={btuLength} onChange={e => setBtuLength(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Room Width (Feet)</label>
                <input type="number" value={btuWidth} onChange={e => setBtuWidth(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Sunlight Exposure</label>
                <select value={btuSun} onChange={e => setBtuSun(e.target.value as any)} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value="normal">Normal Sunlight</option>
                  <option value="sunny">Heavily Sunny (+10%)</option>
                  <option value="shaded">Heavily Shaded (-10%)</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Recommended Air Conditioner Capacity</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {resBTU.recommendedBTU.toLocaleString()} BTU/hr
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Equivalent AC Tonnage: <b>{resBTU.acTons} Tons</b> • Room Area: <b>{resBTU.roomAreaSqFt} sq ft</b>
              </div>
            </div>
          </div>
        )}

        {/* 3. HORSEPOWER */}
        {(slug === 'horsepower-calculator' || slug === 'engine-horsepower-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Engine Torque (lb-ft)</label>
                <input type="number" value={hpTorque} onChange={e => setHpTorque(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Engine Speed (RPM)</label>
                <input type="number" value={hpRpm} onChange={e => setHpRpm(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Calculated Mechanical Output</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-amber)', margin: '0.4rem 0' }}>
                {resHP.horsepower} HP
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Electrical Output: <b>{resHP.kilowatts} kW</b> • Metric Power: <b>{resHP.metricHorsepower} PS</b>
              </div>
            </div>
          </div>
        )}

        {/* 4. STAIR CALCULATOR */}
        {slug === 'stair-calculator' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Total Staircase Vertical Rise (Inches)</label>
              <input type="number" step="0.5" value={stairRise} onChange={e => setStairRise(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Stair Layout Design</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {resStair.numberOfRisers} Risers @ {resStair.exactRiserHeightInches}"
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Treads: <b>{resStair.numberOfTreads} steps</b> (10" depth) • Total Horizontal Run: <b>{resStair.totalRunInches}"</b> • Stringer Angle: <b>{resStair.stairAngleDegrees}°</b>
              </div>
            </div>
          </div>
        )}

        {/* 5. TIME CARD & PAYROLL */}
        {(slug === 'time-card-calculator' || slug === 'hours-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Total Hours Worked</label>
                <input type="number" step="0.5" value={tcHours} onChange={e => setTcHours(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Regular Hourly Pay ({currentCurrency.symbol}/hr)</label>
                <input type="number" step="0.5" value={tcWage} onChange={e => setTcWage(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Gross Paycheck Amount</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {currentCurrency.symbol}{resTC.grossPay.toLocaleString()}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Regular: <b>{currentCurrency.symbol}{resTC.regularPay}</b> ({resTC.regularHours}h) • Overtime (1.5x): <b style={{ color: 'var(--accent-emerald)' }}>+{currentCurrency.symbol}{resTC.overtimePay}</b> ({resTC.overtimeHours}h)
              </div>
            </div>
          </div>
        )}

        {/* 6. BANDWIDTH DOWNLOAD TIME */}
        {slug === 'bandwidth-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>File Size (Megabytes - MB)</label>
                <input type="number" value={bwSize} onChange={e => setBwSize(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Internet Download Speed (Mbps)</label>
                <input type="number" value={bwSpeed} onChange={e => setBwSpeed(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated Transfer Time</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {resBW.formattedTime}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Throughput: <b>{resBW.transferSpeedMBs} MB/s</b> • Total seconds: <b>{resBW.downloadTimeSeconds}s</b>
              </div>
            </div>
          </div>
        )}

        {/* 7. ROMAN NUMERALS */}
        {slug === 'roman-numeral-converter' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Standard Integer (1 to 3999)</label>
              <input type="number" min="1" max="3999" value={romanNum} onChange={e => setRomanNum(Number(e.target.value) || 1)} className="m3-input-field" style={{ width: '100%', fontSize: '1.25rem', fontWeight: 800 }} />
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Roman Numeral Representation</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '3px', color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {resRoman}
              </div>
            </div>
          </div>
        )}

        {/* 8. BASE64 ENCODER / DECODER */}
        {(slug === 'base64-encode-decode' || slug === 'url-encode-decode') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Plain Text Input</label>
                <textarea
                  value={base64Raw}
                  onChange={e => {
                    setBase64Raw(e.target.value);
                    try {
                      setBase64Encoded(btoa(e.target.value));
                    } catch {
                      setBase64Encoded('Encoding Error');
                    }
                  }}
                  rows={4}
                  className="m3-input-field"
                  style={{ width: '100%', fontFamily: 'monospace' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Base64 Output</label>
                <textarea
                  value={base64Encoded}
                  onChange={e => {
                    setBase64Encoded(e.target.value);
                    try {
                      setBase64Raw(atob(e.target.value));
                    } catch {
                      // Invalid base64
                    }
                  }}
                  rows={4}
                  className="m3-input-field"
                  style={{ width: '100%', fontFamily: 'monospace', color: 'var(--accent-emerald)' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 9. TIRE SIZE & SPEEDOMETER COMPARISON */}
        {slug === 'tire-size-calculator' && (
          <div>
            {/* Quick Presets Bar */}
            <div style={{ marginBottom: '1.25rem', background: 'var(--surface-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Popular Tire Size Presets (Click to set Stock Tire 1):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {POPULAR_TIRES.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleT1Text(p)}
                    className="glass-pill"
                    style={{
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      background: t1Text.toUpperCase().includes(p) ? 'var(--primary-500)' : undefined,
                      color: t1Text.toUpperCase().includes(p) ? 'var(--md-sys-color-on-primary)' : undefined
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Tire 1 */}
              <div style={{ background: 'var(--surface-subtle)', padding: '1.25rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>1</div>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>Stock / Current Tire</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-500)' }}>{t1Width}/{t1Aspect}R{t1Rim}</span>
                </div>

                {/* Direct Typing Input */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Type or Paste Full Size (e.g. 205/55R16)
                  </label>
                  <input
                    type="text"
                    value={t1Text}
                    placeholder="e.g. 205/55R16"
                    onChange={e => handleT1Text(e.target.value)}
                    className="m3-input-field"
                    style={{ width: '100%', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.5px' }}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Or Select Dimensions:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Width</label>
                    <select
                      value={t1Width}
                      onChange={e => updateT1Select(Number(e.target.value), t1Aspect, t1Rim)}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_WIDTHS.map(w => <option key={w} value={w}>{w} mm</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Aspect</label>
                    <select
                      value={t1Aspect}
                      onChange={e => updateT1Select(t1Width, Number(e.target.value), t1Rim)}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_ASPECTS.map(a => <option key={a} value={a}>{a}%</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Rim</label>
                    <select
                      value={t1Rim}
                      onChange={e => updateT1Select(t1Width, t1Aspect, Number(e.target.value))}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_RIMS.map(r => <option key={r} value={r}>{r} in</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tire 2 */}
              <div style={{ background: 'var(--surface-subtle)', padding: '1.25rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>2</div>
                    <span style={{ fontWeight: 800, fontSize: '1rem' }}>New / Target Tire</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{t2Width}/{t2Aspect}R{t2Rim}</span>
                </div>

                {/* Direct Typing Input */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, display: 'block', marginBottom: '0.35rem', color: 'var(--text-secondary)' }}>
                    Type or Paste Full Size (e.g. 225/45R17)
                  </label>
                  <input
                    type="text"
                    value={t2Text}
                    placeholder="e.g. 225/45R17"
                    onChange={e => handleT2Text(e.target.value)}
                    className="m3-input-field"
                    style={{ width: '100%', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.5px' }}
                  />
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Or Select Dimensions:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Width</label>
                    <select
                      value={t2Width}
                      onChange={e => updateT2Select(Number(e.target.value), t2Aspect, t2Rim)}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_WIDTHS.map(w => <option key={w} value={w}>{w} mm</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Aspect</label>
                    <select
                      value={t2Aspect}
                      onChange={e => updateT2Select(t2Width, Number(e.target.value), t2Rim)}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_ASPECTS.map(a => <option key={a} value={a}>{a}%</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Rim</label>
                    <select
                      value={t2Rim}
                      onChange={e => updateT2Select(t2Width, t2Aspect, Number(e.target.value))}
                      style={{ width: '100%', padding: '0.5rem 0.3rem', borderRadius: 'var(--md-sys-shape-sm)', border: '1px solid var(--border-subtle)', fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {TIRE_RIMS.map(r => <option key={r} value={r}>{r} in</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Speedometer Banner */}
            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Actual Speed at 60 MPH Indicated</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900, color: resTire.diameterDiffPercent > 3 || resTire.diameterDiffPercent < -3 ? 'var(--accent-amber)' : 'var(--primary-500)', margin: '0.3rem 0' }}>
                {resTire.speedAt60Mph} mph
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Speedometer Error: <b style={{ color: resTire.diameterDiffPercent > 0 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{resTire.diameterDiffPercent > 0 ? `+${resTire.diameterDiffPercent}` : resTire.diameterDiffPercent}%</b> • At 100 km/h: <b>{resTire.speedAt100Kmh} km/h</b>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: Math.abs(resTire.diameterDiffPercent) <= 3 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.15)',
                color: Math.abs(resTire.diameterDiffPercent) <= 3 ? 'var(--accent-emerald)' : 'var(--accent-amber)'
              }}>
                {Math.abs(resTire.diameterDiffPercent) <= 3
                  ? '✓ Safe Fitment: Within 3% diameter variance recommended by automotive engineers for proper ABS, traction control, and transmission calibration.'
                  : '⚠ Caution: Diameter difference exceeds ±3%. Speedometer, cruise control, and anti-lock braking sensors may require recalibration.'}
              </div>
            </div>

            {/* Spec Comparison Table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Dimension</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Tire 1 (Stock)</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Tire 2 (New)</th>
                    <th style={{ padding: '0.65rem 0.5rem' }}>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>Overall Diameter</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire1.diameterInches}" ({resTire.tire1.diameterMm} mm)</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire2.diameterInches}" ({resTire.tire2.diameterMm} mm)</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 800, color: resTire.diameterDiffInches >= 0 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                      {resTire.diameterDiffInches > 0 ? `+${resTire.diameterDiffInches}` : resTire.diameterDiffInches}" ({resTire.diameterDiffPercent > 0 ? `+${resTire.diameterDiffPercent}` : resTire.diameterDiffPercent}%)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>Sidewall Height</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire1.sidewallInches}" ({resTire.tire1.sidewallMm} mm)</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire2.sidewallInches}" ({resTire.tire2.sidewallMm} mm)</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>
                      {resTire.sidewallDiffInches > 0 ? `+${resTire.sidewallDiffInches}` : resTire.sidewallDiffInches}"
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>Circumference</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire1.circumferenceInches}"</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire2.circumferenceInches}"</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>
                      {resTire.circumferenceDiffInches > 0 ? `+${resTire.circumferenceDiffInches}` : resTire.circumferenceDiffInches}"
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>Revolutions / Mile</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire1.revsPerMile} revs/mi</td>
                    <td style={{ padding: '0.65rem 0.5rem' }}>{resTire.tire2.revsPerMile} revs/mi</td>
                    <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700 }}>
                      {resTire.tire2.revsPerMile - resTire.tire1.revsPerMile} revs/mi
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Speed Matrix */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Speedometer Speed Calibration Matrix</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.5rem' }}>
                {resTire.speedComparisons.map(item => (
                  <div key={item.indicated} style={{ background: 'var(--surface-subtle)', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Reads {item.indicated} mph</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>{item.actual} mph</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 10. GAS MILEAGE */}
        {slug === 'gas-mileage-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Distance Driven (Miles)</label>
                <input type="number" step="1" value={gmDistance} onChange={e => setGmDistance(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Fuel Used (Gallons)</label>
                <input type="number" step="0.1" value={gmFuel} onChange={e => setGmFuel(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Fuel Price per Gallon ({currentCurrency.symbol})</label>
                <input type="number" step="0.01" value={gmPrice} onChange={e => setGmPrice(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Fuel Economy Efficiency</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {resGas.mpgUS} MPG (US)
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Metric: <b>{resGas.litersPer100Km} L/100km</b> • UK: <b>{resGas.mpgUK} MPG</b> • Fuel Cost: <b>{currentCurrency.symbol}{resGas.costPerMile}/mi</b> (Total: {currentCurrency.symbol}{resGas.totalCost})
              </div>
            </div>
          </div>
        )}

        {/* 11. ROOFING CALCULATOR */}
        {slug === 'roofing-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Building Length (Feet)</label>
                <input type="number" step="1" value={rfLength} onChange={e => setRfLength(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Building Width (Feet)</label>
                <input type="number" step="1" value={rfWidth} onChange={e => setRfWidth(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Roof Pitch (Rise / 12)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={rfPitch}
                      onChange={e => setRfPitch(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '55px', padding: '0.25rem 0.4rem', fontWeight: 800, textAlign: 'center' }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>/12</span>
                  </div>
                </div>
                <input type="range" min="1" max="18" step="1" value={rfPitch} onChange={e => setRfPitch(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Cost per Square ({currentCurrency.symbol})</label>
                <input type="number" step="5" value={rfCost} onChange={e => setRfCost(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Materials Needed (incl. 10% waste)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {resRoof.roofSquares} Roofing Squares
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Surface Area: <b>{resRoof.roofAreaSqFt.toLocaleString()} sq ft</b> • Shingle Bundles: <b>{resRoof.bundlesNeeded} bundles</b> • Material Cost: <b>{currentCurrency.symbol}{resRoof.estimatedCost.toLocaleString()}</b>
              </div>
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK - NEVER LEAVE A BLANK CARD */}
        {![
          'electricity-calculator', 'voltage-drop-calculator', 'btu-calculator',
          'horsepower-calculator', 'engine-horsepower-calculator', 'stair-calculator',
          'roofing-calculator', 'time-card-calculator', 'hours-calculator',
          'bandwidth-calculator', 'roman-numeral-converter', 'base64-encode-decode',
          'url-encode-decode', 'gas-mileage-calculator', 'tire-size-calculator'
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
