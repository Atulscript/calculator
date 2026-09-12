import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateTriangle,
  calculateVolume,
  calculateQuadratic,
  calculateStatisticsDataset,
  calculateCombinatorics,
  convertBase,
  calculateGcfLcm,
  primeFactorise,
  calculatePower,
  calculateLogarithm
} from '../utils/advancedMathEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Calculator,
  Binary,
  Shapes,
  Boxes,
  Sigma,
  Copy,
  Check
} from 'lucide-react';

interface AdvancedMathToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const AdvancedMathToolsPage: React.FC<AdvancedMathToolsPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Advanced mathematical computing engine.',
    category: 'math' as const,
    tags: [slug],
    icon: 'Calculator'
  };



  // 1. Triangle State
  const [triA, setTriA] = useState<number>(3);
  const [triB, setTriB] = useState<number>(4);
  const [triC, setTriC] = useState<number>(5);

  // 2. Volume State
  const [volShape, setVolShape] = useState<'cylinder' | 'sphere' | 'cone' | 'box'>('cylinder');
  const [volDim1, setVolDim1] = useState<number>(5);
  const [volDim2, setVolDim2] = useState<number>(10);
  const [volDim3, setVolDim3] = useState<number>(8);

  // 3. Quadratic State
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-5);
  const [quadC, setQuadC] = useState<number>(6);

  // 4. Statistics Dataset State
  const [statsInput, setStatsInput] = useState<string>('12, 15, 18, 22, 25, 25, 30, 35, 42');

  // 5. Combinatorics State
  const [combN, setCombN] = useState<number>(10);
  const [combR, setCombR] = useState<number>(3);

  // 6. Base Converter State
  const [baseInput, setBaseInput] = useState<string>('255');
  const [fromBase, setFromBase] = useState<2 | 8 | 10 | 16>(10);

  // 7. GCF / LCM State
  const [gcfInput, setGcfInput] = useState<string>('48, 180');

  // 8. Prime Factorisation State
  const [primeInput, setPrimeInput] = useState<number>(360);

  // 9. Exponent State
  const [powBase, setPowBase] = useState<number>(2);
  const [powExp, setPowExp] = useState<number>(10);

  // 10. Logarithm State
  const [logValue, setLogValue] = useState<number>(1000);
  const [logBase, setLogBase] = useState<number>(10);

  // Memos
  const resTri = useMemo(() => calculateTriangle(triA, triB, triC), [triA, triB, triC]);
  const resVol = useMemo(() => calculateVolume(volShape, volDim1, volDim2, volDim3), [volShape, volDim1, volDim2, volDim3]);
  const resQuad = useMemo(() => calculateQuadratic(quadA, quadB, quadC), [quadA, quadB, quadC]);

  const parsedStats = useMemo(() => {
    return statsInput
      .split(/[\s,]+/)
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n));
  }, [statsInput]);
  const resStats = useMemo(() => calculateStatisticsDataset(parsedStats), [parsedStats]);

  const resComb = useMemo(() => calculateCombinatorics(combN, combR), [combN, combR]);
  const resBase = useMemo(() => convertBase(baseInput, fromBase), [baseInput, fromBase]);

  const parsedGcf = useMemo(
    () => gcfInput.split(/[\s,]+/).map(v => Number(v.trim())).filter(n => !isNaN(n) && n > 0),
    [gcfInput]
  );
  const resGcf = useMemo(() => calculateGcfLcm(parsedGcf), [parsedGcf]);
  const resPrime = useMemo(() => primeFactorise(primeInput), [primeInput]);
  const resPow = useMemo(() => calculatePower(powBase, powExp), [powBase, powExp]);
  const resLog = useMemo(() => calculateLogarithm(logValue, logBase), [logValue, logBase]);

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
          {slug.includes('triangle') ? <Shapes size={22} /> :
           slug.includes('volume') ? <Boxes size={22} /> :
           slug.includes('binary') || slug.includes('hex') ? <Binary size={22} /> :
           slug.includes('stat') || slug.includes('mean') ? <Sigma size={22} /> :
           <Calculator size={22} />}
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{calcMeta.title}</h1>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{calcMeta.shortDescription}</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        {/* 1. TRIANGLE & PYTHAGOREAN */}
        {(slug === 'triangle-calculator' || slug === 'right-triangle-calculator' || slug === 'pythagorean-theorem-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Side A</label>
                <input type="number" step="0.1" value={triA} onChange={e => setTriA(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Side B</label>
                <input type="number" step="0.1" value={triB} onChange={e => setTriB(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Side C</label>
                <input type="number" step="0.1" value={triC} onChange={e => setTriC(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Triangle Area</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {resTri.area}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {resTri.type} • Perimeter: <b>{resTri.perimeter}</b> (Semi: {resTri.semiPerimeter})
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Angles: ∠A = <b>{resTri.anglesDeg.A}°</b>, ∠B = <b>{resTri.anglesDeg.B}°</b>, ∠C = <b>{resTri.anglesDeg.C}°</b>
              </div>
            </div>
          </div>
        )}

        {/* 2. VOLUME CALCULATOR */}
        {(slug === 'volume-calculator' || slug === 'surface-area-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Geometry Shape</label>
                <select value={volShape} onChange={e => setVolShape(e.target.value as any)} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value="cylinder">Cylinder</option>
                  <option value="sphere">Sphere</option>
                  <option value="cone">Cone</option>
                  <option value="box">Rectangular Box / Prism</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  {volShape === 'sphere' ? 'Radius' : volShape === 'box' ? 'Length' : 'Radius (r)'}
                </label>
                <input type="number" step="0.1" value={volDim1} onChange={e => setVolDim1(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              {volShape !== 'sphere' && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    {volShape === 'box' ? 'Width' : 'Height (h)'}
                  </label>
                  <input type="number" step="0.1" value={volDim2} onChange={e => setVolDim2(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                </div>
              )}
              {volShape === 'box' && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Height</label>
                  <input type="number" step="0.1" value={volDim3} onChange={e => setVolDim3(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                </div>
              )}
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Computed Volume ({resVol.shapeName})</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {resVol.volume.toLocaleString()}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Surface Area: <b>{resVol.surfaceArea.toLocaleString()}</b>
              </div>
            </div>
          </div>
        )}

        {/* 3. QUADRATIC FORMULA */}
        {(slug === 'quadratic-formula-calculator' || slug === 'slope-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Coefficient a (x²)</label>
                <input type="number" value={quadA} onChange={e => setQuadA(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Coefficient b (x)</label>
                <input type="number" value={quadB} onChange={e => setQuadB(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Constant c</label>
                <input type="number" value={quadC} onChange={e => setQuadC(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Solutions (Roots) for {quadA}x² + {quadB}x + {quadC} = 0</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                x₁ = {resQuad.root1}, x₂ = {resQuad.root2}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {resQuad.nature} • Discriminant (Δ): <b>{resQuad.discriminant}</b> • Vertex: <b>({resQuad.vertex.x}, {resQuad.vertex.y})</b>
              </div>
            </div>
          </div>
        )}

        {/* 4. STATISTICS & MEAN/MEDIAN/MODE */}
        {(slug === 'mean-median-mode-range-calculator' || slug === 'statistics-calculator' || slug === 'standard-deviation-calculator') && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Enter Data Set (separated by commas or spaces)</label>
              <textarea
                value={statsInput}
                onChange={e => setStatsInput(e.target.value)}
                rows={3}
                className="m3-input-field"
                style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '1rem', textAlign: 'center' }}>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mean (Average)</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary-500)' }}>{resStats.mean}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Median</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{resStats.median}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mode</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{resStats.modes.length > 0 ? resStats.modes.join(', ') : 'None'}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Range</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{resStats.range}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sample Std Dev (s)</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-amber)' }}>{resStats.standardDeviation}</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PERMUTATION & COMBINATION */}
        {(slug === 'permutation-and-combination-calculator' || slug === 'probability-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Total Items (n)</label>
                <input type="number" min="1" max="100" value={combN} onChange={e => setCombN(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Items to Choose (r)</label>
                <input type="number" min="0" max="100" value={combR} onChange={e => setCombR(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
              <div style={{ background: 'var(--surface-subtle)', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Combinations nCr (Order does NOT matter)</div>
                <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                  {resComb.combinations.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>C({combN}, {combR}) = {combN}! / ({combR}! × ({combN}-{combR})!)</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Permutations nPr (Order DOES matter)</div>
                <div className="value-pop" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.35rem 0' }}>
                  {resComb.permutations.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>P({combN}, {combR}) = {combN}! / ({combN}-{combR})!</div>
              </div>
            </div>
          </div>
        )}

        {/* 6. BINARY & HEX */}
        {(slug === 'binary-calculator' || slug === 'hex-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Input Number</label>
                <input type="text" value={baseInput} onChange={e => setBaseInput(e.target.value)} className="m3-input-field" style={{ width: '100%', fontFamily: 'monospace', fontWeight: 800 }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Original Base</label>
                <select value={fromBase} onChange={e => setFromBase(Number(e.target.value) as any)} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value={10}>Base 10 (Decimal)</option>
                  <option value={2}>Base 2 (Binary)</option>
                  <option value={16}>Base 16 (Hexadecimal)</option>
                  <option value={8}>Base 8 (Octal)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '1rem', textAlign: 'center' }}>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Decimal</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace' }}>{resBase.decimal}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Binary</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--accent-emerald)' }}>{resBase.binary}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Hexadecimal</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--primary-500)' }}>0x{resBase.hex}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Octal</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace' }}>{resBase.octal}</div>
              </div>
            </div>
          </div>
        )}

        {/* 7. GREATEST COMMON FACTOR & LEAST COMMON MULTIPLE */}
        {(slug === 'gcf-calculator' || slug === 'lcm-calculator') && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Numbers (separate with commas or spaces)</label>
                <input
                  type="text"
                  value={gcfInput}
                  onChange={e => setGcfInput(e.target.value)}
                  className="m3-input-field"
                  style={{ width: '100%', fontFamily: 'monospace', fontWeight: 800 }}
                  inputMode="numeric"
                  aria-label="Numbers to find the GCF and LCM of"
                />
              </div>
            </div>

            {!resGcf.valid ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Enter at least two whole numbers greater than zero.
              </p>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '1rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  {(slug === 'lcm-calculator'
                    ? [
                        { label: 'Least Common Multiple', value: resGcf.lcm, colour: 'var(--primary-500)' },
                        { label: 'Greatest Common Factor', value: resGcf.gcf, colour: 'var(--accent-emerald)' }
                      ]
                    : [
                        { label: 'Greatest Common Factor', value: resGcf.gcf, colour: 'var(--accent-emerald)' },
                        { label: 'Least Common Multiple', value: resGcf.lcm, colour: 'var(--primary-500)' }
                      ]
                  ).map(tile => (
                    <div key={tile.label} style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tile.label}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'monospace', color: tile.colour }}>{tile.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                {resGcf.coprime && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    These numbers are coprime: they share no factor other than 1, so their LCM is simply their product.
                  </p>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>Prime factorisation</div>
                  {resGcf.factorisations.map(f => (
                    <div key={f.n} style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)', overflowWrap: 'anywhere' }}>
                      {f.n} = {f.exponentForm}
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Euclid's algorithm on {resGcf.numbers[0]} and {resGcf.numbers[1]}
                  </div>
                  {resGcf.euclidSteps.map((step, i) => (
                    <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)', overflowWrap: 'anywhere' }}>{step}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* 8. PRIME FACTORISATION */}
        {slug === 'prime-factorization-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Integer to factorise</label>
                <input
                  type="number"
                  value={primeInput}
                  onChange={e => setPrimeInput(Number(e.target.value) || 0)}
                  className="m3-input-field"
                  style={{ width: '100%', fontFamily: 'monospace', fontWeight: 800 }}
                  aria-label="Integer to factorise"
                />
              </div>
            </div>

            {!resPrime.valid ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Enter a whole number from 2 up to 1,000,000,000,000.
              </p>
            ) : (
              <>
                <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Prime factorisation</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>
                    {resPrime.n} = {resPrime.exponentForm}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem', textAlign: 'center' }}>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Expanded</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>{resPrime.expanded}</div>
                  </div>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Distinct primes</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace' }}>{resPrime.factors.length}</div>
                  </div>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total divisors</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: 'monospace' }}>{resPrime.divisorCount}</div>
                  </div>
                </div>

                {resPrime.isPrime && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600, marginTop: '1rem' }}>
                    {resPrime.n.toLocaleString()} is itself prime, so it has no factorisation beyond 1 × itself.
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* 9. EXPONENTS & POWERS */}
        {slug === 'exponent-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Base (x)</label>
                <input type="number" value={powBase} onChange={e => setPowBase(Number(e.target.value))} className="m3-input-field" style={{ width: '100%', fontWeight: 800 }} aria-label="Base" />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Exponent (y)</label>
                <input type="number" value={powExp} onChange={e => setPowExp(Number(e.target.value))} className="m3-input-field" style={{ width: '100%', fontWeight: 800 }} aria-label="Exponent" />
              </div>
            </div>

            {!resPow.valid ? (
              <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600 }}>{resPow.note}</p>
            ) : (
              <>
                <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{powBase} <sup>{powExp}</sup> equals</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>{resPow.display}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Scientific notation</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>{resPow.scientific}</div>
                  </div>
                  {resPow.expansion && (
                    <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Written out</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', overflowWrap: 'anywhere' }}>{resPow.expansion}</div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* 10. LOGARITHMS */}
        {slug === 'log-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Value (x)</label>
                <input type="number" value={logValue} onChange={e => setLogValue(Number(e.target.value))} className="m3-input-field" style={{ width: '100%', fontWeight: 800 }} aria-label="Value" />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Base (b)</label>
                <input type="number" value={logBase} onChange={e => setLogBase(Number(e.target.value))} className="m3-input-field" style={{ width: '100%', fontWeight: 800 }} aria-label="Base" />
              </div>
            </div>

            {!resLog.valid ? (
              <p style={{ color: 'var(--accent-red)', fontSize: '0.9rem', fontWeight: 600 }}>{resLog.note}</p>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))', gap: '1rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  {logBase !== 10 && logBase !== 2 && (
                    <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>log<sub>{logBase}</sub>(x)</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--primary-500)' }}>{resLog.log}</div>
                    </div>
                  )}
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ln(x)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace' }}>{resLog.ln}</div>
                  </div>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>log<sub>10</sub>(x)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace' }}>{resLog.log10}</div>
                  </div>
                  <div style={{ background: 'var(--surface-subtle)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>log<sub>2</sub>(x)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'monospace' }}>{resLog.log2}</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>Change of base</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-secondary)', overflowWrap: 'anywhere' }}>{resLog.changeOfBase}</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* DEFAULT FALLBACK - NEVER LEAVE A BLANK CARD */}
        {![
          'triangle-calculator', 'right-triangle-calculator', 'pythagorean-theorem-calculator',
          'volume-calculator', 'surface-area-calculator',
          'quadratic-formula-calculator', 'slope-calculator',
          'mean-median-mode-range-calculator', 'statistics-calculator', 'standard-deviation-calculator',
          'permutation-and-combination-calculator', 'probability-calculator',
          'binary-calculator', 'hex-calculator',
          'gcf-calculator', 'lcm-calculator', 'prime-factorization-calculator',
          'exponent-calculator', 'log-calculator'
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
