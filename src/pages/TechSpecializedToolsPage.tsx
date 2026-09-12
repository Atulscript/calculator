import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateBAC,
  calculateBSA,
  calculateIPSubnet,
  generateSecurePassword
} from '../utils/specializedEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Network,
  KeyRound,
  Wine,
  Stethoscope,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

interface TechSpecializedToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const TechSpecializedToolsPage: React.FC<TechSpecializedToolsPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || {
    id: slug,
    slug,
    title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    shortDescription: 'Technical, medical, and lifestyle utility calculators.',
    category: 'everyday',
    tags: [slug],
    icon: 'Network'
  };



  // 1. IP Subnet State
  const [ipAddr, setIpAddr] = useState<string>('192.168.1.100');
  const [cidr, setCidr] = useState<number>(24);

  // 2. Password Generator State
  const [pwdLength, setPwdLength] = useState<number>(16);
  const [pwdUpper, setPwdUpper] = useState<boolean>(true);
  const [pwdLower, setPwdLower] = useState<boolean>(true);
  const [pwdNumbers, setPwdNumbers] = useState<boolean>(true);
  const [pwdSymbols, setPwdSymbols] = useState<boolean>(true);
  const [pwdSeed, setPwdSeed] = useState<number>(0); // Trigger re-generation

  // 3. BAC State
  const [bacGender, setBacGender] = useState<'male' | 'female'>('male');
  const [bacWeight, setBacWeight] = useState<number>(75);
  const [bacDrinks, setBacDrinks] = useState<number>(3);
  const [bacHours, setBacHours] = useState<number>(2);

  // 4. BSA State
  const [bsaHeight, setBsaHeight] = useState<number>(175);
  const [bsaWeight, setBsaWeight] = useState<number>(70);
  const [bsaDose, setBsaDose] = useState<number>(50);

  // Memos
  const ipResult = useMemo(() => {
    return calculateIPSubnet({ ipAddress: ipAddr, cidrPrefix: cidr });
  }, [ipAddr, cidr]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pwdResult = useMemo(() => {
    return generateSecurePassword({
      length: pwdLength,
      includeUppercase: pwdUpper,
      includeLowercase: pwdLower,
      includeNumbers: pwdNumbers,
      includeSymbols: pwdSymbols
    });
  }, [pwdLength, pwdUpper, pwdLower, pwdNumbers, pwdSymbols, pwdSeed]);

  const bacResult = useMemo(() => {
    return calculateBAC({
      gender: bacGender,
      bodyWeightKg: bacWeight,
      drinksCount: bacDrinks,
      hoursDrinking: bacHours
    });
  }, [bacGender, bacWeight, bacDrinks, bacHours]);

  const bsaResult = useMemo(() => {
    return calculateBSA({
      heightCm: bsaHeight,
      weightKg: bsaWeight,
      drugDosePerM2: bsaDose
    });
  }, [bsaHeight, bsaWeight, bsaDose]);

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
            {slug === 'ip-subnet-calculator' && <Network size={22} />}
            {slug === 'password-generator' && <KeyRound size={22} />}
            {slug === 'bac-calculator' && <Wine size={22} />}
            {slug === 'bsa-calculator' && <Stethoscope size={22} />}
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

            {/* 1. IP SUBNET */}
            {slug === 'ip-subnet-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      IPv4 Address
                    </label>
                    <input
                      type="text"
                      value={ipAddr}
                      onChange={e => setIpAddr(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.15rem', fontWeight: 800 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                      CIDR (/{cidr})
                    </label>
                    <select
                      value={cidr}
                      onChange={e => setCidr(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-md)', border: '1px solid var(--border-subtle)', fontWeight: 700 }}
                    >
                      {Array.from({ length: 32 }, (_, i) => i + 1).map(c => (
                        <option key={c} value={c}>/{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Usable Host Capacity
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {ipResult.totalUsableHosts.toLocaleString()} Hosts
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Subnet Mask: <b>{ipResult.subnetMask}</b> • Network: <b>{ipResult.ipClass}</b>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>NETWORK ADDRESS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{ipResult.networkAddress}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>BROADCAST ADDRESS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{ipResult.broadcastAddress}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>USABLE RANGE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{ipResult.firstUsableIP} - {ipResult.lastUsableIP}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PASSWORD GENERATOR */}
            {slug === 'password-generator' && (
              <div>
                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Generated Secure Password
                  </div>
                  <div style={{ fontSize: 'clamp(1.25rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace', wordBreak: 'break-all', margin: '0.75rem 0', userSelect: 'all' }}>
                    {pwdResult.password}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.85rem' }}>
                    🛡️ {pwdResult.strengthLabel} ({pwdResult.entropyBits} bits entropy) • Crack Time: {pwdResult.crackTimeEstimate}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setPwdSeed(prev => prev + 1)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.25rem' }}
                  >
                    <RefreshCw size={16} />
                    <span>Regenerate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(pwdResult.password)}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1.25rem' }}
                  >
                    {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
                    <span>{copied ? 'Copied Password!' : 'Copy Password'}</span>
                  </button>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                    Password Length: {pwdLength} Characters
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={pwdLength}
                    onChange={e => setPwdLength(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    <input type="checkbox" checked={pwdUpper} onChange={e => setPwdUpper(e.target.checked)} />
                    Uppercase Letters (A-Z)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    <input type="checkbox" checked={pwdLower} onChange={e => setPwdLower(e.target.checked)} />
                    Lowercase Letters (a-z)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    <input type="checkbox" checked={pwdNumbers} onChange={e => setPwdNumbers(e.target.checked)} />
                    Numbers (0-9)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    <input type="checkbox" checked={pwdSymbols} onChange={e => setPwdSymbols(e.target.checked)} />
                    Special Symbols (!@#$)
                  </label>
                </div>
              </div>
            )}

            {/* 3. BAC */}
            {slug === 'bac-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setBacGender('male')}
                    className={`m3-segmented-tab ${bacGender === 'male' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem' }}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setBacGender('female')}
                    className={`m3-segmented-tab ${bacGender === 'female' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.5rem' }}
                  >
                    Female
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Weight (kg)</label>
                    <input type="number" value={bacWeight} onChange={e => setBacWeight(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Drinks Consumed</label>
                    <input type="number" value={bacDrinks} onChange={e => setBacDrinks(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Hours Drinking</label>
                    <input type="number" value={bacHours} onChange={e => setBacHours(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Blood Alcohol Content (BAC)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: bacResult.isLegalDrivingLimitExceeded ? 'var(--accent-red)' : 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {bacResult.bacPercent}%
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: bacResult.isLegalDrivingLimitExceeded ? 'var(--accent-red)' : 'var(--accent-emerald)' }}>
                    {bacResult.isLegalDrivingLimitExceeded ? '⚠️ Above Legal Driving Limit (0.08%) - Do Not Drive!' : 'Below 0.08% Legal Limit'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem' }}>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>CLINICAL STATE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{bacResult.stateDescription}</div>
                  </div>
                  <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>TIME TO REACH ZERO BAC</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{bacResult.hoursUntilSober} Hours</div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. BSA */}
            {slug === 'bsa-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Height (cm)</label>
                    <input type="number" value={bsaHeight} onChange={e => setBsaHeight(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Weight (kg)</label>
                    <input type="number" value={bsaWeight} onChange={e => setBsaWeight(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Dose (mg/m²)</label>
                    <input type="number" value={bsaDose} onChange={e => setBsaDose(Number(e.target.value) || 0)} className="m3-input-field" style={{ width: '100%' }} />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Body Surface Area (Mosteller)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {bsaResult.bsaMosteller} <span style={{ fontSize: '1.25rem' }}>m²</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Du Bois Formula: <b>{bsaResult.bsaDuBois} m²</b> • Calculated Dose: <b>{bsaResult.calculatedDosage} mg</b>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="calculator-sidebar">
          <div className="m3-card-filled" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              ⚡ High Precision
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              All technical formulas adhere to RFC standards and verified clinical peer-reviewed methodologies.
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
