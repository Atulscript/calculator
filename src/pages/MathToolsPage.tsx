import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateFractions,
  calculateGPA,
  calculateRatio,
  calculateStatistics,
  generateRandomNumbers,
  CourseGrade
} from '../utils/mathEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Divide,
  Award,
  Scaling,
  BarChart2,
  Dices,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';

interface MathToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const MathToolsPage: React.FC<MathToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[20];
  const [copied, setCopied] = useState(false);

  // 1. Fraction State
  const [fWhole1, setFWhole1] = useState<number>(0);
  const [fNum1, setFNum1] = useState<number>(3);
  const [fDen1, setFDen1] = useState<number>(4);
  const [fOp, setFOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [fWhole2, setFWhole2] = useState<number>(0);
  const [fNum2, setFNum2] = useState<number>(2);
  const [fDen2, setFDen2] = useState<number>(5);

  // 2. GPA State
  const [courses, setCourses] = useState<CourseGrade[]>([
    { id: '1', name: 'Calculus I', credits: 4, grade: 'A', courseType: 'regular' },
    { id: '2', name: 'Physics Mechanics', credits: 4, grade: 'B+', courseType: 'honors' },
    { id: '3', name: 'Computer Science', credits: 3, grade: 'A+', courseType: 'ap' },
    { id: '4', name: 'Academic Writing', credits: 3, grade: 'A-', courseType: 'regular' }
  ]);

  // 3. Ratio State
  const [ratioA, setRatioA] = useState<number>(1920);
  const [ratioB, setRatioB] = useState<number>(1080);
  const [ratioC, setRatioC] = useState<number>(1280);

  // 4. Statistics State
  const [dataInput, setDataInput] = useState<string>('12, 19, 24, 24, 28, 31, 35, 42, 50');

  // 5. Random Number State
  const [rngMin, setRngMin] = useState<number>(1);
  const [rngMax, setRngMax] = useState<number>(100);
  const [rngCount, setRngCount] = useState<number>(5);
  const [rngUnique, setRngUnique] = useState<boolean>(true);
  const [rngResults, setRngResults] = useState<number[]>([]);



  // Fraction result
  const fracResult = useMemo(() => {
    return calculateFractions({
      whole1: fWhole1,
      num1: fNum1,
      den1: Math.max(1, fDen1),
      operation: fOp,
      whole2: fWhole2,
      num2: fNum2,
      den2: Math.max(1, fDen2)
    });
  }, [fWhole1, fNum1, fDen1, fOp, fWhole2, fNum2, fDen2]);

  // GPA result
  const gpaResult = useMemo(() => {
    return calculateGPA(courses);
  }, [courses]);

  // Ratio result
  const ratioResult = useMemo(() => {
    return calculateRatio(ratioA, ratioB, ratioC);
  }, [ratioA, ratioB, ratioC]);

  // Statistics result
  const statsResult = useMemo(() => {
    const nums = dataInput
      .split(/[\s,]+/)
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v) && v !== 0);
    return calculateStatistics(nums);
  }, [dataInput]);

  // Trigger RNG once on mount
  useEffect(() => {
    if (slug === 'random-number-generator' && rngResults.length === 0) {
      setRngResults(generateRandomNumbers(rngMin, rngMax, rngCount, rngUnique));
    }
  }, [slug]);

  const rollDice = (sides: number) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    setRngResults([roll]);
  };

  const flipCoin = () => {
    const toss = Math.random() < 0.5 ? 1 : 2; // 1 = Heads, 2 = Tails
    setRngResults([toss]);
  };

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
            {slug === 'fraction-calculator' && <Divide size={22} />}
            {slug === 'gpa-calculator' && <Award size={22} />}
            {slug === 'ratio-calculator' && <Scaling size={22} />}
            {slug === 'average-calculator' && <BarChart2 size={22} />}
            {slug === 'random-number-generator' && <Dices size={22} />}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {calcMeta.title}
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          {calcMeta.shortDescription}
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="calculator-layout-grid">
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>

            {/* ======================================================= */}
            {/* 1. FRACTION CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'fraction-calculator' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {/* Fraction 1 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={fWhole1 || ''}
                      placeholder="0"
                      onChange={e => setFWhole1(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '60px', textAlign: 'center', fontWeight: 800 }}
                      title="Whole number (optional)"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '70px' }}>
                      <input
                        type="number"
                        value={fNum1}
                        onChange={e => setFNum1(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ textAlign: 'center', fontWeight: 800 }}
                      />
                      <div style={{ height: '2px', background: 'var(--text-primary)', width: '100%' }} />
                      <input
                        type="number"
                        min="1"
                        value={fDen1}
                        onChange={e => setFDen1(Number(e.target.value) || 1)}
                        className="m3-input-field"
                        style={{ textAlign: 'center', fontWeight: 800 }}
                      />
                    </div>
                  </div>

                  {/* Operation */}
                  <select
                    value={fOp}
                    onChange={e => setFOp(e.target.value as any)}
                    style={{ fontSize: '1.5rem', fontWeight: 900, padding: '0.4rem 0.75rem', borderRadius: '8px', border: '2px solid var(--border-subtle)' }}
                  >
                    <option value="+">+</option>
                    <option value="-">−</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>

                  {/* Fraction 2 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="number"
                      value={fWhole2 || ''}
                      placeholder="0"
                      onChange={e => setFWhole2(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '60px', textAlign: 'center', fontWeight: 800 }}
                      title="Whole number (optional)"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '70px' }}>
                      <input
                        type="number"
                        value={fNum2}
                        onChange={e => setFNum2(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ textAlign: 'center', fontWeight: 800 }}
                      />
                      <div style={{ height: '2px', background: 'var(--text-primary)', width: '100%' }} />
                      <input
                        type="number"
                        min="1"
                        value={fDen2}
                        onChange={e => setFDen2(Number(e.target.value) || 1)}
                        className="m3-input-field"
                        style={{ textAlign: 'center', fontWeight: 800 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Fraction Result */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Simplified Result
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.4rem 0' }}>
                    {fracResult.resultNum} / {fracResult.resultDen}
                  </div>
                  {fracResult.wholeNumber !== 0 && fracResult.remainderNum !== 0 && (
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.35rem' }}>
                      Mixed Number: {fracResult.wholeNumber} {Math.abs(fracResult.remainderNum)}/{fracResult.resultDen}
                    </div>
                  )}
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Decimal Value: {fracResult.decimalValue}
                  </div>
                </div>

                {/* Step-by-Step Breakdown */}
                <div style={{ background: 'var(--surface-solid)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Step-by-Step Calculation:</div>
                  <ol style={{ paddingLeft: '1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {fracResult.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. GPA CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'gpa-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Course Grades & Credits</span>
                    <button
                      type="button"
                      onClick={() => setCourses(prev => [...prev, { id: Date.now().toString(), name: `Course ${prev.length + 1}`, credits: 3, grade: 'A', courseType: 'regular' }])}
                      className="m3-preset-pill active"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Plus size={14} />
                      <span>Add Course</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {courses.map(c => (
                      <div key={c.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          value={c.name}
                          onChange={e => setCourses(prev => prev.map(item => item.id === c.id ? { ...item, name: e.target.value } : item))}
                          className="m3-input-field"
                          placeholder="Course name"
                        />
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={c.credits}
                          onChange={e => setCourses(prev => prev.map(item => item.id === c.id ? { ...item, credits: Number(e.target.value) || 1 } : item))}
                          className="m3-input-field"
                          title="Credit Hours"
                        />
                        <select
                          value={c.grade}
                          onChange={e => setCourses(prev => prev.map(item => item.id === c.id ? { ...item, grade: e.target.value as any } : item))}
                          style={{ padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                        >
                          {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        <select
                          value={c.courseType}
                          onChange={e => setCourses(prev => prev.map(item => item.id === c.id ? { ...item, courseType: e.target.value as any } : item))}
                          style={{ padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}
                        >
                          <option value="regular">Regular</option>
                          <option value="honors">Honors (+0.5)</option>
                          <option value="ap">AP/IB (+1.0)</option>
                        </select>
                        {courses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setCourses(prev => prev.filter(item => item.id !== c.id))}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* GPA Result Card */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>UNWEIGHTED GPA</div>
                      <div className="value-pop" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.2rem 0' }}>
                        {gpaResult.unweightedGPA.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>4.0 Scale</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>WEIGHTED GPA (AP/Honors)</div>
                      <div className="value-pop" style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.2rem 0' }}>
                        {gpaResult.weightedGPA.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Credits: {gpaResult.totalCredits}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. RATIO CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'ratio-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Value A (Width / Antecedent)
                    </label>
                    <input
                      type="number"
                      value={ratioA}
                      onChange={e => setRatioA(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.1rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Value B (Height / Consequent)
                    </label>
                    <input
                      type="number"
                      value={ratioB}
                      onChange={e => setRatioB(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.1rem', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Scale to New Width (Solve for D in A:B = C:D)
                  </label>
                  <input
                    type="number"
                    value={ratioC}
                    onChange={e => setRatioC(Number(e.target.value) || 1)}
                    className="m3-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Simplified Aspect Ratio
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.4rem 0' }}>
                    {ratioResult.simplifiedString}
                  </div>
                  {ratioResult.solvedMissingValue !== undefined && (
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.5rem' }}>
                      Scaled Dimensions: {ratioC} × {ratioResult.solvedMissingValue}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. AVERAGE & STATISTICS CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'average-calculator' && (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Enter Numbers (separated by commas or spaces)
                  </label>
                  <textarea
                    rows={3}
                    value={dataInput}
                    onChange={e => setDataInput(e.target.value)}
                    className="m3-input-field"
                    style={{ width: '100%', fontFamily: 'monospace' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MEAN (AVERAGE)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>{statsResult.mean}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MEDIAN</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>{statsResult.median}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>MODE</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                      {statsResult.mode.length > 0 ? statsResult.mode.join(', ') : 'None'}
                    </div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>SAMPLE STD DEV</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{statsResult.sampleStdDev}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(110px, 100%), 1fr))', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div>Count: <strong>{statsResult.count}</strong></div>
                  <div>Sum: <strong>{statsResult.sum}</strong></div>
                  <div>Min: <strong>{statsResult.min}</strong></div>
                  <div>Max: <strong>{statsResult.max}</strong></div>
                  <div>Range: <strong>{statsResult.range}</strong></div>
                  <div>Variance: <strong>{statsResult.sampleVariance}</strong></div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. RANDOM NUMBER GENERATOR */}
            {/* ======================================================= */}
            {slug === 'random-number-generator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Minimum</label>
                    <input
                      type="number"
                      value={rngMin}
                      onChange={e => setRngMin(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Maximum</label>
                    <input
                      type="number"
                      value={rngMax}
                      onChange={e => setRngMax(Number(e.target.value) || 100)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={rngCount}
                      onChange={e => setRngCount(Math.max(1, Number(e.target.value) || 1))}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rngUnique}
                      onChange={e => setRngUnique(e.target.checked)}
                    />
                    <span>No Duplicates (Unique Numbers)</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setRngResults(generateRandomNumbers(rngMin, rngMax, rngCount, rngUnique))}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.25rem' }}
                  >
                    <RotateCcw size={16} />
                    <span>Generate Numbers</span>
                  </button>
                </div>

                {/* Quick Simulators Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, alignSelf: 'center' }}>Quick Tools:</span>
                  <button type="button" onClick={flipCoin} className="m3-preset-pill">Flip Coin</button>
                  <button type="button" onClick={() => rollDice(6)} className="m3-preset-pill">Roll D6</button>
                  <button type="button" onClick={() => rollDice(20)} className="m3-preset-pill">Roll D20</button>
                  <button type="button" onClick={() => setRngResults(generateRandomNumbers(1, 69, 5, true))} className="m3-preset-pill">Lottery 5 of 69</button>
                </div>

                {/* RNG Results Display */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Generated Random Outcome
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {rngResults.map((num, i) => (
                      <div
                        key={i}
                        className="value-pop"
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: 'var(--md-sys-color-primary)',
                          color: 'var(--md-sys-color-on-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          fontWeight: 900,
                          boxShadow: 'var(--shadow-glow)'
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Copy Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Math computation: ${calcMeta.title}`)}
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
        categoryName="math"
      />
    </div>
  );
};
