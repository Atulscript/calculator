import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateSpeedDistanceTime,
  calculateDensityMassVolume,
  calculateForce,
  calculateOhmsLaw,
  MATERIAL_DENSITIES
} from '../utils/scienceEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Compass,
  FlaskConical,
  Zap,
  BatteryCharging,
  Copy,
  Check
} from 'lucide-react';

interface ScienceToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ScienceToolsPage: React.FC<ScienceToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[33];
  const [copied, setCopied] = useState(false);

  // 1. Speed Distance Time State
  const [sdtSolveFor, setSdtSolveFor] = useState<'speed' | 'distance' | 'time'>('time');
  const [sdtSpeed, setSdtSpeed] = useState<number>(65); // km/h
  const [sdtDist, setSdtDist] = useState<number>(195); // km
  const [sdtTime, setSdtTime] = useState<number>(3); // hours

  // 2. Density State
  const [dmvSolveFor, setDmvSolveFor] = useState<'density' | 'mass' | 'volume'>('mass');
  const [dmvMaterial, setDmvMaterial] = useState<string>('water');
  const [dmvDensity, setDmvDensity] = useState<number>(1000); // kg/m^3
  const [dmvMass, setDmvMass] = useState<number>(5); // kg
  const [dmvVolume, setDmvVolume] = useState<number>(0.005); // m^3

  // 3. Force State
  const [fMass, setFMass] = useState<number>(1200); // kg
  const [fAccel, setFAccel] = useState<number>(3.5); // m/s^2
  const [fVelocity, setFVelocity] = useState<number>(25); // m/s

  // 4. Ohm's Law State
  const [ohmKnowns, setOhmKnowns] = useState<{ v?: number; i?: number; r?: number; p?: number }>({
    v: 120,
    r: 60
  });



  const sdtResult = useMemo(() => {
    return calculateSpeedDistanceTime(sdtSolveFor, sdtSpeed, sdtDist, sdtTime);
  }, [sdtSolveFor, sdtSpeed, sdtDist, sdtTime]);

  const dmvResult = useMemo(() => {
    return calculateDensityMassVolume(dmvSolveFor, dmvDensity, dmvMass, dmvVolume);
  }, [dmvSolveFor, dmvDensity, dmvMass, dmvVolume]);

  const forceResult = useMemo(() => {
    return calculateForce(fMass, fAccel, fVelocity);
  }, [fMass, fAccel, fVelocity]);

  const ohmResult = useMemo(() => {
    return calculateOhmsLaw(ohmKnowns.v, ohmKnowns.i, ohmKnowns.r, ohmKnowns.p);
  }, [ohmKnowns]);

  const handleMaterialChange = (key: string) => {
    setDmvMaterial(key);
    const m = MATERIAL_DENSITIES[key];
    if (m) {
      setDmvDensity(m.densityKgM3);
    }
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
            {slug === 'speed-distance-time-calculator' && <Compass size={22} />}
            {slug === 'density-mass-volume-calculator' && <FlaskConical size={22} />}
            {slug === 'force-calculator' && <Zap size={22} />}
            {slug === 'ohms-law-calculator' && <BatteryCharging size={22} />}
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
            {/* 1. SPEED DISTANCE TIME CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'speed-distance-time-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(['speed', 'distance', 'time'] as const).map(target => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => setSdtSolveFor(target)}
                      className={`m3-segmented-tab ${sdtSolveFor === target ? 'active' : ''}`}
                      style={{ flex: 1, padding: '0.4rem', textTransform: 'capitalize' }}
                    >
                      Solve for {target}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  {sdtSolveFor !== 'speed' && (
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Speed (km/h)
                      </label>
                      <input
                        type="number"
                        value={sdtSpeed}
                        onChange={e => setSdtSpeed(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}

                  {sdtSolveFor !== 'distance' && (
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Distance (km)
                      </label>
                      <input
                        type="number"
                        value={sdtDist}
                        onChange={e => setSdtDist(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}

                  {sdtSolveFor !== 'time' && (
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Time Duration (Hours)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={sdtTime}
                        onChange={e => setSdtTime(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Calculated {sdtSolveFor}
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {sdtResult.solvedValue} {sdtResult.solvedUnit}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sdtSolveFor === 'time' && `Formatted Time: ${sdtResult.timeFormatted}`}
                    {sdtSolveFor === 'speed' && `Equiv: ${sdtResult.speedMph} mph | ${sdtResult.speedMs} m/s`}
                    {sdtSolveFor === 'distance' && `Equiv: ${sdtResult.distanceMiles} miles`}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. DENSITY MASS VOLUME CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'density-mass-volume-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(['mass', 'density', 'volume'] as const).map(target => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => setDmvSolveFor(target)}
                      className={`m3-segmented-tab ${dmvSolveFor === target ? 'active' : ''}`}
                      style={{ flex: 1, padding: '0.4rem', textTransform: 'capitalize' }}
                    >
                      Solve for {target}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Material Density Preset
                  </label>
                  <select
                    value={dmvMaterial}
                    onChange={e => handleMaterialChange(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                  >
                    {Object.entries(MATERIAL_DENSITIES).map(([k, v]) => (
                      <option key={k} value={k}>{v.name} ({v.densityKgM3} kg/m³)</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  {dmvSolveFor !== 'density' && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Density (kg/m³)</label>
                      <input
                        type="number"
                        value={dmvDensity}
                        onChange={e => setDmvDensity(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}

                  {dmvSolveFor !== 'mass' && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Mass (kg)</label>
                      <input
                        type="number"
                        value={dmvMass}
                        onChange={e => setDmvMass(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}

                  {dmvSolveFor !== 'volume' && (
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Volume (m³)</label>
                      <input
                        type="number"
                        step="0.001"
                        value={dmvVolume}
                        onChange={e => setDmvVolume(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Calculated Result
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {dmvSolveFor === 'mass' && `${dmvResult.massKg} kg (${dmvResult.massGrams} g)`}
                    {dmvSolveFor === 'density' && `${dmvResult.densityKgM3} kg/m³ (${dmvResult.densityGCm3} g/cm³)`}
                    {dmvSolveFor === 'volume' && `${dmvResult.volumeM3} m³ (${dmvResult.volumeLiters} Liters)`}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Specific Gravity (Relative to Water): {dmvResult.specificGravity}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. FORCE & MOTION (NEWTON'S SECOND LAW) */}
            {/* ======================================================= */}
            {slug === 'force-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Mass (kg)</label>
                    <input
                      type="number"
                      value={fMass}
                      onChange={e => setFMass(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Acceleration (m/s²)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={fAccel}
                      onChange={e => setFAccel(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Velocity (m/s optional)</label>
                    <input
                      type="number"
                      value={fVelocity}
                      onChange={e => setFVelocity(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Net Force (F = m × a)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {forceResult.forceNewtons.toLocaleString()} Newtons (N)
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Equivalent to {forceResult.forcePounds.toFixed(1)} lbf (Pound-force)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>MOMENTUM (p = m × v)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{forceResult.momentumKgmS.toLocaleString()} kg·m/s</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>KINETIC ENERGY (½ m v²)</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{forceResult.kineticEnergyJoules.toLocaleString()} Joules</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. OHM'S LAW CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'ohms-law-calculator' && (
              <div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Enter any <strong>two values</strong> below; the remaining two values are calculated automatically:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Voltage (V in Volts)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={ohmKnowns.v !== undefined ? ohmKnowns.v : ''}
                      placeholder="e.g. 120"
                      onChange={e => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setOhmKnowns(prev => ({ ...prev, v: val }));
                      }}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Current (I in Amps)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={ohmKnowns.i !== undefined ? ohmKnowns.i : ''}
                      placeholder="e.g. 2"
                      onChange={e => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setOhmKnowns(prev => ({ ...prev, i: val }));
                      }}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Resistance (R in Ohms Ω)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={ohmKnowns.r !== undefined ? ohmKnowns.r : ''}
                      placeholder="e.g. 60"
                      onChange={e => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setOhmKnowns(prev => ({ ...prev, r: val }));
                      }}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Power (P in Watts)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={ohmKnowns.p !== undefined ? ohmKnowns.p : ''}
                      placeholder="e.g. 240"
                      onChange={e => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        setOhmKnowns(prev => ({ ...prev, p: val }));
                      }}
                      className="m3-input-field"
                      style={{ width: '100%', marginTop: '0.2rem' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(110px, 100%), 1fr))', gap: '0.75rem', textAlign: 'center' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VOLTAGE (V)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--md-sys-color-primary)' }}>{ohmResult.voltage} V</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CURRENT (I)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{ohmResult.current} A</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RESISTANCE (R)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-amber)' }}>{ohmResult.resistance} Ω</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>POWER (P)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-rose)' }}>{ohmResult.power} W</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.75rem' }}>
                    Formulas: {ohmResult.formulasUsed.join(' & ')}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Copy Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Science calculation: ${calcMeta.title}`)}
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
        categoryName="science"
      />
    </div>
  );
};
