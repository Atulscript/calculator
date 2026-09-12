import React, { useState } from 'react';
import { BioStats, PlanetaryAge, ZodiacInfo } from '../../../types/age';
import { formatNumber } from '../../../utils/dateUtils';
import { Compass, Sparkles, Orbit, Activity, Gem, Flower2, Heart, Moon, Utensils, Wind } from 'lucide-react';

interface FunInsightsSectionProps {
  zodiac: ZodiacInfo;
  birthstone: { name: string; color: string; meaning: string };
  birthFlower: { name: string; meaning: string };
  planetaryAges: PlanetaryAge[];
  bioStats: BioStats;
}

export const FunInsightsSection: React.FC<FunInsightsSectionProps> = ({
  zodiac,
  birthstone,
  birthFlower,
  planetaryAges,
  bioStats
}) => {
  const [activeTab, setActiveTab] = useState<'astrology' | 'planets' | 'bio'>('astrology');

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        marginBottom: '2rem',
        background: 'var(--surface-solid)',
        border: '1.5px solid var(--border-subtle)'
      }}
    >
      {/* Tab Switcher for Insights */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Astrological, Planetary & Life Insights
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Fascinating facts and astronomical statistics derived from your birth date
          </p>
        </div>

        <div className="tabs-container" style={{ padding: '0.2rem' }}>
          <button
            onClick={() => setActiveTab('astrology')}
            className={`tab-btn ${activeTab === 'astrology' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
          >
            <Compass size={15} />
            <span>Zodiac & Stones</span>
          </button>
          <button
            onClick={() => setActiveTab('planets')}
            className={`tab-btn ${activeTab === 'planets' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
          >
            <Orbit size={15} />
            <span>Planetary Ages</span>
          </button>
          <button
            onClick={() => setActiveTab('bio')}
            className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
          >
            <Activity size={15} />
            <span>Body Estimates</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Astrology, Zodiac & Stones */}
      {activeTab === 'astrology' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '1rem'
        }}>
          {/* Western Zodiac */}
          <div className="glass-card" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
                  Western Sun Sign
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {zodiac.western.sign} {zodiac.western.symbol.slice(0, 2)}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
              <div><strong>Dates:</strong> {zodiac.western.dates}</div>
              <div><strong>Element:</strong> {zodiac.western.element}</div>
              <div><strong>Ruling Planet:</strong> {zodiac.western.rulingPlanet}</div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {zodiac.western.traits.map(t => (
                <span key={t} style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  background: 'var(--surface-hover)',
                  color: 'var(--text-primary)',
                  border: '1.5px solid var(--border-subtle)'
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Chinese Zodiac */}
          <div className="glass-card" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Compass size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
                  Chinese Zodiac
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Year of the {zodiac.chinese.animal}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.65rem', lineHeight: 1.6 }}>
              <div><strong>Element:</strong> {zodiac.chinese.element}</div>
              <div><strong>Energy:</strong> {zodiac.chinese.yinYang}</div>
              <div><strong>Lucky Numbers:</strong> {zodiac.chinese.luckyNumbers.join(', ')}</div>
            </div>
          </div>

          {/* Birthstone & Flower */}
          <div className="glass-card" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Gem size={16} />
                <span>Birthstone: {birthstone.name}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {birthstone.meaning} ({birthstone.color})
              </p>
            </div>

            <div style={{ borderTop: '1.5px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-rose)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Flower2 size={16} />
                <span>Birth Flower: {birthFlower.name}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {birthFlower.meaning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Planetary Ages */}
      {activeTab === 'planets' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(135px, 100%), 1fr))',
          gap: '0.9rem'
        }}>
          {planetaryAges.map(p => (
            <div
              key={p.planet}
              className="glass-card"
              style={{
                padding: '1.25rem 0.75rem',
                textAlign: 'center',
                background: p.planet === 'Earth' ? 'var(--md-sys-color-primary-container)' : 'var(--surface-solid)',
                border: p.planet === 'Earth' ? '2px solid var(--md-sys-color-primary)' : '1.5px solid var(--border-subtle)',
                borderRadius: '16px'
              }}
            >
              <div style={{ fontSize: '1.85rem', marginBottom: '0.35rem' }}>{p.emoji}</div>
              <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {p.planet}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--md-sys-color-primary)',
                margin: '0.3rem 0'
              }}>
                {p.ageInPlanetYears}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {p.planet} yrs old
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                Orbit: {p.orbitalPeriodDays}d
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Biological Stat Estimates */}
      {activeTab === 'bio' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))',
          gap: '1rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(244, 63, 94, 0.15)',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Heart size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatNumber(bioStats.estimatedHeartbeats)}
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Estimated Heartbeats (~80 bpm)</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Wind size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatNumber(bioStats.estimatedBreaths)}
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Breaths Taken (~16/min)</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(192, 132, 252, 0.15)',
              color: 'var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Moon size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatNumber(bioStats.estimatedSleepHours)} hrs
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Hours of Peaceful Sleep</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderRadius: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Utensils size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {formatNumber(bioStats.estimatedMealsEaten)}
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Delicious Meals Eaten</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
