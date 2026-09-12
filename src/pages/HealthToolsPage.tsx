import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateBodyFatNavy,
  calculateWaterIntake,
  calculateIdealWeight,
  calculateHeartRateZones,
  calculateMacros,
  calculatePregnancyDueDate
} from '../utils/healthEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  UserCheck,
  Droplets,
  Scale,
  Heart,
  PieChart,
  Baby,
  Copy,
  Check
} from 'lucide-react';

interface HealthToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const HealthToolsPage: React.FC<HealthToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[1];
  const [copied, setCopied] = useState(false);

  // 1. Body Fat State
  const [bfGender, setBfGender] = useState<'male' | 'female'>('male');
  const [bfHeight, setBfHeight] = useState<number>(178);
  const [bfWeight, setBfWeight] = useState<number>(75);
  const [bfNeck, setBfNeck] = useState<number>(38);
  const [bfWaist, setBfWaist] = useState<number>(86);
  const [bfHip, setBfHip] = useState<number>(96);

  // 2. Water Intake State
  const [waterWeight, setWaterWeight] = useState<number>(70);
  const [waterExercise, setWaterExercise] = useState<number>(45);
  const [waterClimate, setWaterClimate] = useState<'temperate' | 'hot' | 'very_hot'>('temperate');

  // 3. Ideal Weight State
  const [iwGender, setIwGender] = useState<'male' | 'female'>('female');
  const [iwHeight, setIwHeight] = useState<number>(165);

  // 4. Heart Rate Zones State
  const [hrAge, setHrAge] = useState<number>(30);
  const [hrResting, setHrResting] = useState<number>(65);

  // 5. Macro State
  const [macroCalories, setMacroCalories] = useState<number>(2200);
  const [macroPlan, setMacroPlan] = useState<'balanced' | 'high_protein' | 'low_carb' | 'keto'>('high_protein');

  // 6. Pregnancy Due Date State
  const [pregMethod, setPregMethod] = useState<'lmp' | 'conception'>('lmp');
  const [pregDate, setPregDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 70); // default ~10 weeks ago
    return d.toISOString().split('T')[0];
  });
  const [cycleDays, setCycleDays] = useState<number>(28);



  // Results
  const bfResult = useMemo(() => {
    return calculateBodyFatNavy({
      gender: bfGender,
      heightCm: bfHeight,
      weightKg: bfWeight,
      neckCm: bfNeck,
      waistCm: bfWaist,
      hipCm: bfHip
    });
  }, [bfGender, bfHeight, bfWeight, bfNeck, bfWaist, bfHip]);

  const waterResult = useMemo(() => {
    return calculateWaterIntake({
      weightKg: waterWeight,
      activityMinutesDaily: waterExercise,
      climate: waterClimate
    });
  }, [waterWeight, waterExercise, waterClimate]);

  const iwResult = useMemo(() => {
    return calculateIdealWeight({
      gender: iwGender,
      heightCm: iwHeight
    });
  }, [iwGender, iwHeight]);

  const hrResult = useMemo(() => {
    return calculateHeartRateZones({
      age: hrAge,
      restingHeartRate: hrResting
    });
  }, [hrAge, hrResting]);

  const macroResult = useMemo(() => {
    return calculateMacros({
      dailyCalories: macroCalories,
      dietPlan: macroPlan
    });
  }, [macroCalories, macroPlan]);

  const pregResult = useMemo(() => {
    return calculatePregnancyDueDate({
      method: pregMethod,
      date: pregDate,
      cycleLengthDays: cycleDays
    });
  }, [pregMethod, pregDate, cycleDays]);

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
            {slug === 'body-fat-calculator' && <UserCheck size={22} />}
            {slug === 'water-intake-calculator' && <Droplets size={22} />}
            {slug === 'ideal-weight-calculator' && <Scale size={22} />}
            {slug === 'target-heart-rate-calculator' && <Heart size={22} />}
            {slug === 'macro-calculator' && <PieChart size={22} />}
            {slug === 'pregnancy-due-date-calculator' && <Baby size={22} />}
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
            {/* 1. BODY FAT CALCULATOR (US NAVY METHOD) */}
            {/* ======================================================= */}
            {slug === 'body-fat-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setBfGender('male')}
                    className={`m3-segmented-tab ${bfGender === 'male' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setBfGender('female')}
                    className={`m3-segmented-tab ${bfGender === 'female' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    Female
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Height (cm)</label>
                    <input
                      type="number"
                      value={bfHeight}
                      onChange={e => setBfHeight(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Weight (kg)</label>
                    <input
                      type="number"
                      value={bfWeight}
                      onChange={e => setBfWeight(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: bfGender === 'female' ? '1fr 1fr 1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Neck Circumference (cm)</label>
                    <input
                      type="number"
                      value={bfNeck}
                      onChange={e => setBfNeck(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Waist Circumference (cm)</label>
                    <input
                      type="number"
                      value={bfWaist}
                      onChange={e => setBfWaist(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  {bfGender === 'female' && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hip Circumference (cm)</label>
                      <input
                        type="number"
                        value={bfHip}
                        onChange={e => setBfHip(Number(e.target.value) || 1)}
                        className="m3-input-field"
                        style={{ width: '100%', marginTop: '0.2rem' }}
                      />
                    </div>
                  )}
                </div>

                {/* Result */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Body Fat Percentage (US Navy Method)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 3.75rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {bfResult.bodyFatPercent}%
                  </div>
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(11, 87, 208, 0.12)', color: 'var(--md-sys-color-primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Category: {bfResult.category} (Ideal: {bfResult.idealRange})
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fat Mass</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{bfResult.fatMassKg} kg</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lean Body Mass</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{bfResult.leanMassKg} kg</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. DAILY WATER INTAKE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'water-intake-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Your Body Weight: {waterWeight} kg ({(waterWeight * 2.20462).toFixed(0)} lbs)
                  </label>
                  <input
                    type="range"
                    min="35"
                    max="160"
                    value={waterWeight}
                    onChange={e => setWaterWeight(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Daily Physical Activity: {waterExercise} minutes
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    step="15"
                    value={waterExercise}
                    onChange={e => setWaterExercise(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Living Climate / Temperature
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {(['temperate', 'hot', 'very_hot'] as const).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setWaterClimate(c)}
                        className={`m3-segmented-tab ${waterClimate === c ? 'active' : ''}`}
                        style={{ flex: 1, padding: '0.4rem', textTransform: 'capitalize' }}
                      >
                        {c.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Target Daily Water Intake
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--accent-cyan)', margin: '0.35rem 0' }}>
                    {waterResult.dailyLiters} Liters
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Approximately {waterResult.dailyGlasses} Glasses (250ml) or {waterResult.dailyOunces} fl oz
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pacing Recommendation</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      Drink ~{waterResult.hourlyPaceLiters} L per waking hour
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. IDEAL WEIGHT CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'ideal-weight-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setIwGender('female')}
                    className={`m3-segmented-tab ${iwGender === 'female' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => setIwGender('male')}
                    className={`m3-segmented-tab ${iwGender === 'male' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    Male
                  </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Your Height</label>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      {iwHeight} cm ({Math.floor(iwHeight / 2.54 / 12)}' {Math.round((iwHeight / 2.54) % 12)}")
                    </span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="210"
                    value={iwHeight}
                    onChange={e => setIwHeight(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                {/* Result Grid */}
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Average Ideal Healthy Weight
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {iwResult.averageKg} kg <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>({(iwResult.averageKg * 2.20462).toFixed(0)} lbs)</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    WHO Healthy BMI Range: {iwResult.healthyBmiRangeMinKg} - {iwResult.healthyBmiRangeMaxKg} kg
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(110px, 100%), 1fr))', gap: '0.5rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.6rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Devine</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800 }}>{iwResult.devineKg} kg</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.6rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Robinson</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800 }}>{iwResult.robinsonKg} kg</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.6rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Miller</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800 }}>{iwResult.millerKg} kg</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.6rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hamwi</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800 }}>{iwResult.hamwiKg} kg</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. TARGET HEART RATE & ZONES */}
            {/* ======================================================= */}
            {slug === 'target-heart-rate-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Your Age: {hrAge}
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="90"
                      value={hrAge}
                      onChange={e => setHrAge(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Resting Heart Rate: {hrResting} bpm
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={hrResting}
                      onChange={e => setHrResting(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Maximum Heart Rate (Tanaka)</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-rose)' }}>{hrResult.maxHeartRateTanaka} BPM</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {hrResult.zones.map(z => (
                      <div key={z.zone} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-solid)', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>Zone {z.zone}: {z.name}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{z.benefits}</div>
                        </div>
                        <div style={{ textAlign: 'right', fontWeight: 800, color: 'var(--md-sys-color-primary)', fontSize: '0.9rem' }}>
                          {z.minBpm} - {z.maxBpm} bpm
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. MACRONUTRIENT CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'macro-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Daily Calorie Target: {macroCalories} kcal
                  </label>
                  <input
                    type="range"
                    min="1200"
                    max="4500"
                    step="50"
                    value={macroCalories}
                    onChange={e => setMacroCalories(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Dietary Protocol
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.5rem' }}>
                    {(['balanced', 'high_protein', 'low_carb', 'keto'] as const).map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setMacroPlan(d)}
                        className={`m3-segmented-tab ${macroPlan === d ? 'active' : ''}`}
                        style={{ padding: '0.45rem', textTransform: 'capitalize' }}
                      >
                        {d.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '1rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)' }}>PROTEIN ({macroResult.distributionPct.protein}%)</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-rose)', margin: '0.2rem 0' }}>{macroResult.proteinGrams}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{macroResult.proteinCalories} kcal</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '1rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>CARBS ({macroResult.distributionPct.carbs}%)</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.2rem 0' }}>{macroResult.carbGrams}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{macroResult.carbCalories} kcal</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '1rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)' }}>FATS ({macroResult.distributionPct.fats}%)</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-amber)', margin: '0.2rem 0' }}>{macroResult.fatGrams}g</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{macroResult.fatCalories} kcal</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 6. PREGNANCY DUE DATE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'pregnancy-due-date-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setPregMethod('lmp')}
                    className={`m3-segmented-tab ${pregMethod === 'lmp' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    First Day of Last Period (LMP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPregMethod('conception')}
                    className={`m3-segmented-tab ${pregMethod === 'conception' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    Conception Date
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: pregMethod === 'lmp' ? '2fr 1fr' : '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      {pregMethod === 'lmp' ? 'Last Menstrual Period Date' : 'Estimated Conception Date'}
                    </label>
                    <input
                      type="date"
                      value={pregDate}
                      onChange={e => setPregDate(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  {pregMethod === 'lmp' && (
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Cycle Length
                      </label>
                      <input
                        type="number"
                        min="20"
                        max="45"
                        value={cycleDays}
                        onChange={e => setCycleDays(Number(e.target.value) || 28)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Due Date (EDD)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#ec4899', margin: '0.35rem 0' }}>
                    {pregResult.dueDateFormatted}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Current Gestational Age: {pregResult.weeksPregnant} Weeks & {pregResult.daysPregnant} Days
                  </div>
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(236, 72, 153, 0.12)', color: 'var(--accent-pink)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Trimester {pregResult.trimester} | {pregResult.daysRemaining} Days Remaining
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-solid)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>DEVELOPMENTAL MILESTONE</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{pregResult.babyMilestone}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Copy Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Health Calculation: ${calcMeta.title}`)}
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
        categoryName="health"
      />
    </div>
  );
};
