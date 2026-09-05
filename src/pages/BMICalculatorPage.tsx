import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateBMI, BMIInput } from '../utils/bmiEngine';
import {
  HeartPulse,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface BMICalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const BMICalculatorPage: React.FC<BMICalculatorPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'bmi-calculator') || CALCULATORS_REGISTRY[1];

  const [input, setInput] = useState<BMIInput>({
    unit: 'metric',
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 68,
    weightLbs: 150,
    age: 28,
    gender: 'male'
  });

  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'BMI Calculator - Accurate Body Mass Index & Healthy Weight Range | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculate your Body Mass Index (BMI), ideal healthy weight range, body category, and health metrics using World Health Organization (WHO) standards. Free, instant, and private.'
      );
    }
  }, []);

  const result = useMemo(() => calculateBMI(input), [input]);

  const handleCopy = () => {
    const text = `BMI: ${result.bmi} (${result.categoryLabel})\nHealthy Weight: ${result.idealWeightMinKg} - ${result.idealWeightMaxKg} kg\nCalculated via Calculator360.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My BMI Result - Calculator360',
        text: `My BMI is ${result.bmi} (${result.categoryLabel}). Check yours at Calculator360!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const faqs = [
    {
      q: 'What is Body Mass Index (BMI)?',
      a: 'Body Mass Index (BMI) is a screening metric established by the World Health Organization (WHO) that compares an individual\'s weight relative to their height squared (kg/m²). It categorizes body weight status into underweight, normal, overweight, or obese ranges.'
    },
    {
      q: 'What is considered a healthy BMI range?',
      a: 'For adults aged 20 and older, a BMI between 18.5 and 24.9 is considered the normal, healthy weight range associated with lowest mortality and cardiovascular disease risk.'
    },
    {
      q: 'Does BMI distinguish between muscle mass and fat?',
      a: 'BMI is a general screening indicator and does not directly measure body fat percentage. Muscular athletes may have an elevated BMI while maintaining low body fat, while older adults may have normal BMI with reduced lean muscle.'
    },
    {
      q: 'What is Ponderal Index and BMI Prime?',
      a: 'Ponderal Index measures mass divided by height cubed (kg/m³), providing a more proportional evaluation for very tall or very short individuals. BMI Prime is the ratio of your BMI to the upper normal threshold (25.0); a BMI Prime between 0.74 and 1.0 indicates normal weight.'
    }
  ];

  // Gauge pointer position percentage (14 to 40 BMI scale)
  const gaugePercent = Math.min(100, Math.max(0, ((result.bmi - 14) / (40 - 14)) * 100));

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumb Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      {/* Hero Title Bar */}
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
            <HeartPulse size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Body Mass Index (BMI) Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Calculate your Body Mass Index (BMI), ideal body weight range, and WHO health risk categories with metric and imperial units.
        </p>
      </div>

      {/* 2-Column Calculator Layout */}
      <div className="calculator-layout-grid">
        {/* Left Column: Form Inputs & Primary Results */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            {/* UI/UX Enhancement: Material 3 Segmented Control for Unit Toggle */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
              <div className="m3-segmented-control" style={{ maxWidth: '360px', width: '100%' }}>
                <button
                  type="button"
                  id="metric-unit-tab"
                  role="tab"
                  aria-selected={input.unit === 'metric'}
                  onClick={() => setInput(prev => ({ ...prev, unit: 'metric' }))}
                  className={`m3-segmented-tab ${input.unit === 'metric' ? 'active' : ''}`}
                >
                  Metric (cm / kg)
                </button>
                <button
                  type="button"
                  id="imperial-unit-tab"
                  role="tab"
                  aria-selected={input.unit === 'imperial'}
                  onClick={() => setInput(prev => ({ ...prev, unit: 'imperial' }))}
                  className={`m3-segmented-tab ${input.unit === 'imperial' ? 'active' : ''}`}
                >
                  US Imperial (ft, in / lbs)
                </button>
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Height Input with Synchronized Range Slider */}
              {input.unit === 'metric' ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <label htmlFor="height-cm-input" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Height
                    </label>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      {input.heightCm} cm
                    </span>
                  </div>
                  
                  <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                    <input
                      id="height-cm-input"
                      type="number"
                      min="90"
                      max="240"
                      value={input.heightCm || ''}
                      onChange={e => setInput(prev => ({ ...prev, heightCm: Number(e.target.value) || 0 }))}
                      className="m3-input-field"
                      placeholder="175"
                      aria-label="Height in centimeters"
                    />
                    <span className="m3-input-unit">cm</span>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="220"
                    step="1"
                    value={Math.min(220, Math.max(100, input.heightCm))}
                    onChange={e => setInput(prev => ({ ...prev, heightCm: Number(e.target.value) }))}
                    className="m3-slider"
                    aria-label="Height range slider"
                  />
                  
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {[160, 170, 175, 180, 185].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setInput(prev => ({ ...prev, heightCm: val }))}
                        className={`m3-preset-pill ${input.heightCm === val ? 'active' : ''}`}
                      >
                        {val} cm
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    Height (ft & in)
                  </label>
                  <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.65rem' }}>
                    <div className="m3-input-wrapper" style={{ flex: 1 }}>
                      <input
                        id="height-ft-input"
                        type="number"
                        min="2"
                        max="8"
                        value={input.heightFt || ''}
                        onChange={e => setInput(prev => ({ ...prev, heightFt: Number(e.target.value) || 0 }))}
                        className="m3-input-field"
                        placeholder="5"
                        aria-label="Height in feet"
                      />
                      <span className="m3-input-unit">ft</span>
                    </div>
                    <div className="m3-input-wrapper" style={{ flex: 1 }}>
                      <input
                        id="height-in-input"
                        type="number"
                        min="0"
                        max="11"
                        value={input.heightIn}
                        onChange={e => setInput(prev => ({ ...prev, heightIn: Number(e.target.value) || 0 }))}
                        className="m3-input-field"
                        placeholder="9"
                        aria-label="Height in inches"
                      />
                      <span className="m3-input-unit">in</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {[[5, 4], [5, 7], [5, 9], [6, 0], [6, 2]].map(([f, i]) => (
                      <button
                        key={`${f}-${i}`}
                        type="button"
                        onClick={() => setInput(prev => ({ ...prev, heightFt: f, heightIn: i }))}
                        className={`m3-preset-pill ${input.heightFt === f && input.heightIn === i ? 'active' : ''}`}
                      >
                        {f}&apos;{i}&quot;
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Weight Input with Synchronized Range Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <label htmlFor="weight-input" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Weight
                  </label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                    {input.unit === 'metric' ? `${input.weightKg} kg` : `${input.weightLbs} lbs`}
                  </span>
                </div>

                <div className="m3-input-wrapper" style={{ marginBottom: '0.65rem' }}>
                  <input
                    id="weight-input"
                    type="number"
                    min={input.unit === 'metric' ? '25' : '55'}
                    max={input.unit === 'metric' ? '250' : '550'}
                    value={input.unit === 'metric' ? (input.weightKg || '') : (input.weightLbs || '')}
                    onChange={e => {
                      const val = Number(e.target.value) || 0;
                      if (input.unit === 'metric') {
                        setInput(prev => ({ ...prev, weightKg: val }));
                      } else {
                        setInput(prev => ({ ...prev, weightLbs: val }));
                      }
                    }}
                    className="m3-input-field"
                    placeholder={input.unit === 'metric' ? '68' : '150'}
                    aria-label={`Weight in ${input.unit === 'metric' ? 'kilograms' : 'pounds'}`}
                  />
                  <span className="m3-input-unit">{input.unit === 'metric' ? 'kg' : 'lbs'}</span>
                </div>

                <input
                  type="range"
                  min={input.unit === 'metric' ? 40 : 90}
                  max={input.unit === 'metric' ? 140 : 300}
                  step="1"
                  value={input.unit === 'metric' ? Math.min(140, Math.max(40, input.weightKg)) : Math.min(300, Math.max(90, input.weightLbs))}
                  onChange={e => {
                    const val = Number(e.target.value);
                    if (input.unit === 'metric') {
                      setInput(prev => ({ ...prev, weightKg: val }));
                    } else {
                      setInput(prev => ({ ...prev, weightLbs: val }));
                    }
                  }}
                  className="m3-slider"
                  aria-label="Weight range slider"
                />

                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {(input.unit === 'metric' ? [55, 65, 70, 75, 85] : [120, 140, 160, 180, 200]).map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        if (input.unit === 'metric') {
                          setInput(prev => ({ ...prev, weightKg: val }));
                        } else {
                          setInput(prev => ({ ...prev, weightLbs: val }));
                        }
                      }}
                      className={`m3-preset-pill ${(input.unit === 'metric' ? input.weightKg : input.weightLbs) === val ? 'active' : ''}`}
                    >
                      {val} {input.unit === 'metric' ? 'kg' : 'lbs'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age & Gender */}
              <div>
                <label htmlFor="age-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Age & Gender
                </label>
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <div className="m3-input-wrapper" style={{ flex: 1 }}>
                    <input
                      id="age-input"
                      type="number"
                      min="2"
                      max="120"
                      value={input.age || ''}
                      onChange={e => setInput(prev => ({ ...prev, age: Number(e.target.value) || 18 }))}
                      className="m3-input-field"
                      placeholder="28"
                      aria-label="Age in years"
                    />
                    <span className="m3-input-unit">yrs</span>
                  </div>
                  <select
                    value={input.gender}
                    onChange={e => setInput(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                    aria-label="Biological gender"
                    style={{
                      flex: 1,
                      padding: '0.75rem 0.85rem',
                      borderRadius: 'var(--md-sys-shape-md)',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--surface-solid)',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Primary Calculated Result Display with Value-Pop Micro-Animation */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderRadius: 'var(--md-sys-shape-lg)',
              padding: '1.75rem 1.5rem',
              border: '1.5px solid var(--border-subtle)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Your Body Mass Index (BMI)
              </div>

              {/* Reactive animated number display */}
              <div
                key={result.bmi}
                className="value-pop"
                style={{
                  fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                  fontWeight: 900,
                  color: 'var(--md-sys-color-primary)',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem'
                }}
              >
                {result.bmi} <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>kg/m²</span>
              </div>

              <div style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                <span style={{
                  padding: '0.4rem 1.25rem',
                  borderRadius: 'var(--md-sys-shape-full)',
                  background: `${result.categoryColor}20`,
                  color: result.categoryColor,
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  border: `1.5px solid ${result.categoryColor}`
                }}>
                  {result.categoryLabel}
                </span>
              </div>

              {/* Graphical Visual Scale Gauge */}
              <div style={{ position: 'relative', marginTop: '0.5rem', marginBottom: '1.75rem', padding: '0 0.5rem' }}>
                <div style={{
                  height: '14px',
                  borderRadius: '7px',
                  background: 'linear-gradient(90deg, #0284c7 0%, #146c2e 30%, #b45309 60%, #b3261e 100%)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }} />

                {/* Marker Needle with smooth transition */}
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  left: `calc(${gaugePercent}% - 6px)`,
                  width: '12px',
                  height: '24px',
                  background: 'var(--text-primary)',
                  borderRadius: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
                  border: '2px solid #fff',
                  transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 600 }}>
                  <span>&lt;18.5 Underweight</span>
                  <span>18.5–24.9 Normal</span>
                  <span>25–29.9 Overweight</span>
                  <span>30+ Obese</span>
                </div>
              </div>

              {/* Status Message */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '580px', margin: '0 auto' }}>
                {result.summaryText}
              </p>
            </div>

            {/* Key Metrics Summary Card */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div className="m3-card-filled" style={{ padding: '1rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Ideal Normal Weight
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {input.unit === 'metric'
                    ? `${result.idealWeightMinKg} – ${result.idealWeightMaxKg} kg`
                    : `${result.idealWeightMinLbs} – ${result.idealWeightMaxLbs} lbs`}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#146c2e', fontWeight: 700, marginTop: '0.2rem' }}>
                  WHO Healthy Range
                </div>
              </div>

              <div className="m3-card-filled" style={{ padding: '1rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  Ponderal Index
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {result.ponderalIndex} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>kg/m³</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>
                  Height-cube proportional
                </div>
              </div>

              <div className="m3-card-filled" style={{ padding: '1rem 1.15rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  BMI Prime
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {result.bmiPrime} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>(&lt;1.0 optimal)</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: result.bmiPrime <= 1.0 ? '#146c2e' : '#b45309', fontWeight: 700, marginTop: '0.2rem' }}>
                  {result.bmiPrime <= 1.0 ? 'Optimal Ratio' : 'Elevated Ratio'}
                </div>
              </div>
            </div>

            {/* Action Controls: Instant One-Click Copy Feedback & Share */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                aria-label="Copy BMI metrics summary"
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied Summary!' : 'Copy Summary'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                aria-label="Share BMI calculation"
              >
                <Share2 size={16} />
                <span>Share Result</span>
              </button>
            </div>
          </div>

          {/* WHO Classification Table Card */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              WHO Adult BMI Classification Standards
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-primary)' }}>
                    <th style={{ padding: '0.65rem 0.75rem' }}>Category</th>
                    <th style={{ padding: '0.65rem 0.75rem' }}>BMI Range (kg/m²)</th>
                    <th style={{ padding: '0.65rem 0.75rem' }}>Health Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: 'Severe Thinness', range: '< 16.0', risk: 'Substantially Elevated', color: '#b3261e' },
                    { cat: 'Underweight', range: '16.0 – 18.4', risk: 'Elevated Risk', color: '#0284c7' },
                    { cat: 'Normal Weight', range: '18.5 – 24.9', risk: 'Lowest Risk (Optimal)', color: '#146c2e' },
                    { cat: 'Overweight', range: '25.0 – 29.9', risk: 'Increased Risk', color: '#b45309' },
                    { cat: 'Obese Class I', range: '30.0 – 34.9', risk: 'High Risk', color: '#be123c' },
                    { cat: 'Obese Class II', range: '35.0 – 39.9', risk: 'Very High Risk', color: '#b3261e' },
                    { cat: 'Obese Class III', range: '≥ 40.0', risk: 'Extremely High Risk', color: '#7f1d1d' }
                  ].map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        background: result.categoryLabel.toLowerCase().includes(row.cat.toLowerCase().split(' ')[0])
                          ? 'var(--surface-hover)'
                          : 'transparent'
                      }}
                    >
                      <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: row.color }}>
                        {row.cat}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {row.range}
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem', color: 'var(--text-secondary)' }}>
                        {row.risk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1.5px solid var(--border-subtle)',
                    borderRadius: 'var(--md-sys-shape-md)',
                    overflow: 'hidden'
                  }}
                >
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
          {/* Ad Space 1 */}
          <AdBanner slotType="rectangle" />

          {/* Quick Info Box */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <span>WHO Formula Verification</span>
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              BMI formula standard: <code>weight (kg) / [height (m)]²</code>. All conversions between metric and US customary units adhere to National Institute of Standards (NIST).
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Data remains 100% private in your browser.
            </div>
          </div>

          {/* Other Health Calculators */}
          <div className="m3-card-filled" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', marginTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Related Computational Tools
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                <span>Chronological Age Calculator</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onNavigate('/calorie-calculator')}
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
                <span>Calorie & TDEE Calculator</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
