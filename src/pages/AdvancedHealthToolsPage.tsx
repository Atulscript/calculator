import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateOneRepMax,
  calculatePace,
  calculateActivityCalories,
  calculateGFR,
  calculateTargetHeartRate
} from '../utils/advancedHealthEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Dumbbell,
  Timer,
  Flame,
  Heart,
  Activity,
  Copy,
  Check,
  Stethoscope
} from 'lucide-react';

interface AdvancedHealthToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const AdvancedHealthToolsPage: React.FC<AdvancedHealthToolsPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Professional fitness and clinical health calculation engine.',
    category: 'health' as const,
    tags: [slug],
    icon: 'Activity'
  };



  // 1. One Rep Max State
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [liftReps, setLiftReps] = useState<number>(5);
  const [liftUnit, setLiftUnit] = useState<'kg' | 'lbs'>('kg');

  // 2. Pace State
  const [paceDist, setPaceDist] = useState<number>(10);
  const [paceDistUnit, setPaceDistUnit] = useState<'km' | 'miles'>('km');
  const [paceHours, setPaceHours] = useState<number>(0);
  const [paceMinutes, setPaceMinutes] = useState<number>(50);
  const [paceSeconds, setPaceSeconds] = useState<number>(0);

  // 3. Activity Calories State
  const [calWeight, setCalWeight] = useState<number>(75);
  const [calDuration, setCalDuration] = useState<number>(45);
  const [calActivity, setCalActivity] = useState<'running' | 'cycling' | 'walking' | 'swimming' | 'weightlifting' | 'hiit' | 'yoga'>('running');

  // 4. GFR State
  const [gfrCreatinine, setGfrCreatinine] = useState<number>(1.1);
  const [gfrAge, setGfrAge] = useState<number>(42);
  const [gfrGender, setGfrGender] = useState<'male' | 'female'>('male');

  // 5. Target Heart Rate State
  const [thrAge, setThrAge] = useState<number>(30);
  const [thrResting, setThrResting] = useState<number>(65);

  // Memos
  const res1RM = useMemo(() => {
    return calculateOneRepMax(liftWeight, liftReps);
  }, [liftWeight, liftReps]);

  const resPace = useMemo(() => {
    return calculatePace(paceDist, paceDistUnit, paceHours, paceMinutes, paceSeconds);
  }, [paceDist, paceDistUnit, paceHours, paceMinutes, paceSeconds]);

  const resCal = useMemo(() => {
    return calculateActivityCalories(calWeight, calDuration, calActivity);
  }, [calWeight, calDuration, calActivity]);

  const resGFR = useMemo(() => {
    return calculateGFR(gfrCreatinine, gfrAge, gfrGender);
  }, [gfrCreatinine, gfrAge, gfrGender]);

  const resTHR = useMemo(() => {
    return calculateTargetHeartRate(thrAge, thrResting);
  }, [thrAge, thrResting]);

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
          {slug === 'one-rep-max-calculator' ? <Dumbbell size={22} /> :
           slug === 'pace-calculator' ? <Timer size={22} /> :
           slug === 'calories-burned-calculator' ? <Flame size={22} /> :
           slug === 'target-heart-rate-calculator' ? <Heart size={22} /> :
           slug === 'gfr-calculator' ? <Stethoscope size={22} /> :
           <Activity size={22} />}
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>{calcMeta.title}</h1>
          <p style={{ margin: '0.2rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{calcMeta.shortDescription}</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        {/* 1. ONE REP MAX */}
        {slug === 'one-rep-max-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Weight Lifted</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" value={liftWeight} onChange={e => setLiftWeight(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '70%' }} />
                  <select value={liftUnit} onChange={e => setLiftUnit(e.target.value as 'kg' | 'lbs')} style={{ width: '30%', padding: '0.5rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Repetitions Completed: {liftReps}</label>
                <input type="range" min="1" max="20" step="1" value={liftReps} onChange={e => setLiftReps(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated 1-Rep Max (1RM)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--primary-500)', margin: '0.4rem 0' }}>
                {res1RM.oneRepMax} {liftUnit}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Computed via composite Brzycki & Epley biomechanical models
              </div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Training Repetition Percentages</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
              {res1RM.percentages.slice(0, 6).map(p => (
                <div key={p.percent} style={{ background: 'var(--surface-subtle)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-500)', fontWeight: 800 }}>{p.percent}% 1RM</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>{p.weight} {liftUnit}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>~{p.reps} reps max</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. PACE CALCULATOR */}
        {slug === 'pace-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Distance</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" step="0.1" value={paceDist} onChange={e => setPaceDist(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '70%' }} />
                  <select value={paceDistUnit} onChange={e => setPaceDistUnit(e.target.value as 'km' | 'miles')} style={{ width: '30%', padding: '0.5rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                    <option value="km">km</option>
                    <option value="miles">miles</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Time Duration (Hours : Min : Sec)</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="number" min="0" placeholder="HH" value={paceHours} onChange={e => setPaceHours(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '33%' }} />
                  <input type="number" min="0" max="59" placeholder="MM" value={paceMinutes} onChange={e => setPaceMinutes(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '33%' }} />
                  <input type="number" min="0" max="59" placeholder="SS" value={paceSeconds} onChange={e => setPaceSeconds(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '33%' }} />
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Running / Walking Pace</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.4rem 0' }}>
                {resPace.pacePerKmMinutes}:{resPace.pacePerKmSeconds < 10 ? '0' : ''}{resPace.pacePerKmSeconds} /km
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {resPace.pacePerMileMinutes}:{resPace.pacePerMileSeconds < 10 ? '0' : ''}{resPace.pacePerMileSeconds} /mile • Speed: <b>{resPace.speedKmh} km/h</b> ({resPace.speedMph} mph)
              </div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Race Time Projections at this Pace</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
              <div style={{ background: 'var(--surface-subtle)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>5K Finish</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{resPace.projections.fiveK}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>10K Finish</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{resPace.projections.tenK}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Half Marathon</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{resPace.projections.halfMarathon}</div>
              </div>
              <div style={{ background: 'var(--surface-subtle)', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full Marathon</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{resPace.projections.marathon}</div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CALORIES BURNED */}
        {slug === 'calories-burned-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Body Weight (kg)</label>
                <input type="number" value={calWeight} onChange={e => setCalWeight(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Duration (Minutes)</label>
                <input type="number" value={calDuration} onChange={e => setCalDuration(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Activity Type</label>
                <select value={calActivity} onChange={e => setCalActivity(e.target.value as any)} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value="running">Running (~6 mph / 10 km/h)</option>
                  <option value="cycling">Cycling (Moderate 12-14 mph)</option>
                  <option value="swimming">Swimming (Freestyle laps)</option>
                  <option value="hiit">HIIT & Circuit Training</option>
                  <option value="weightlifting">Weightlifting / Resistance</option>
                  <option value="walking">Brisk Walking (3.5 mph)</option>
                  <option value="yoga">Yoga & Stretching</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Calories Expended</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-amber)', margin: '0.4rem 0' }}>
                {resCal.caloriesBurned} kcal
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Activity Intensity: <b>{resCal.mets} METs</b> • Equivalent Energy: <b>~{resCal.equivalentSteps.toLocaleString()} walking steps</b>
              </div>
            </div>
          </div>
        )}

        {/* 4. GFR KIDNEY FUNCTION */}
        {slug === 'gfr-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Serum Creatinine (mg/dL)</label>
                <input type="number" step="0.05" value={gfrCreatinine} onChange={e => setGfrCreatinine(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Patient Age</label>
                <input type="number" value={gfrAge} onChange={e => setGfrAge(Number(e.target.value) || 18)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Biological Sex</label>
                <select value={gfrGender} onChange={e => setGfrGender(e.target.value as 'male' | 'female')} style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated GFR (CKD-EPI 2021)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: resGFR.color, margin: '0.4rem 0' }}>
                {resGFR.egfr} mL/min/1.73m²
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: resGFR.color }}>
                {resGFR.stage}: {resGFR.description}
              </div>
            </div>
          </div>
        )}

        {/* 5. TARGET HEART RATE */}
        {slug === 'target-heart-rate-calculator' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Your Age</label>
                <input type="number" value={thrAge} onChange={e => setThrAge(Number(e.target.value) || 20)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Resting Heart Rate (BPM)</label>
                <input type="number" value={thrResting} onChange={e => setThrResting(Number(e.target.value) || 60)} className="m3-input-field" style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Estimated Maximum Heart Rate (HRmax)</div>
              <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ef4444', margin: '0.4rem 0' }}>
                {resTHR.maxHeartRate} BPM
              </div>
            </div>

            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Cardiovascular Training Zones (Karvonen HRR)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {resTHR.zones.map(z => (
                <div key={z.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--surface-subtle)', borderRadius: '8px', borderLeft: `4px solid ${z.color}` }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{z.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{z.benefit}</div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: z.color }}>
                    {z.minBpm} - {z.maxBpm} BPM
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK - NEVER LEAVE A BLANK CARD */}
        {![
          'one-rep-max-calculator', 'pace-calculator', 'calories-burned-calculator',
          'gfr-calculator', 'target-heart-rate-calculator'
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
