import React, { useState } from 'react';
import { AgeCalculationResult } from '../../../types/age';
import { Sparkles, Play, Pause, Copy, Check } from 'lucide-react';
import { formatNumber } from '../../../utils/dateUtils';

interface PrimaryResultCardProps {
  result: AgeCalculationResult;
  isLiveTickerActive: boolean;
  onToggleLiveTicker: () => void;
  liveSeconds: number;
  liveMinutes: number;
  liveHours: number;
}

export const PrimaryResultCard: React.FC<PrimaryResultCardProps> = ({
  result,
  isLiveTickerActive,
  onToggleLiveTicker,
  liveSeconds,
  liveMinutes,
  liveHours
}) => {
  const { exactAge, dayOfWeekBorn, isLeapYearBorn, totals } = result;
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `Chronological Age: ${exactAge.years} Years, ${exactAge.months} Months, ${exactAge.days} Days (${totals.totalDays.toLocaleString()} days lived)\nBorn on a ${dayOfWeekBorn}${isLeapYearBorn ? ' (Leap Year)' : ''}\nCalculated via Calculator11.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="m3-card-elevated"
      style={{
        background: 'var(--surface-solid)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: '1.75rem',
        marginBottom: '1.5rem',
        position: 'relative'
      }}
    >
      {/* Top Header Badge & Controllers */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <div className="glass-pill" style={{
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-on-primary-container)',
            fontWeight: 700,
            border: '1px solid var(--border-accent)',
            fontSize: '0.8rem',
            padding: '0.35rem 0.75rem'
          }}>
            <Sparkles size={14} color="var(--md-sys-color-primary)" />
            <span>Exact Chronological Age</span>
          </div>

          <span style={{
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            fontWeight: 600
          }}>
            Born on a <strong style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>{dayOfWeekBorn}</strong>
            {isLeapYearBorn && ' (Leap Year 🌟)'}
          </span>
        </div>

        {/* Live Ticker & Copy Controllers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '10px' }}
            aria-label="Copy age summary"
          >
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
            <span style={{ fontWeight: 600 }}>{copied ? '✓ Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={onToggleLiveTicker}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              border: isLiveTickerActive ? '1.5px solid var(--md-sys-color-tertiary)' : '1.5px solid var(--border-subtle)',
              background: isLiveTickerActive ? 'var(--md-sys-color-tertiary-container)' : 'var(--surface-subtle)',
              color: isLiveTickerActive ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--text-muted)',
              padding: '0.4rem 0.85rem'
            }}
          >
            <span className={isLiveTickerActive ? 'pulse-dot' : ''} style={{
              background: isLiveTickerActive ? 'var(--md-sys-color-tertiary)' : 'var(--border-subtle)'
            }} />
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>
              {isLiveTickerActive ? 'Live Ticking' : 'Ticker Paused'}
            </span>
            {isLiveTickerActive ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>

      {/* Main Age Stat Display: Big High-Contrast Y / M / D Numbers with Value-Pop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Years Card */}
        <div className="glass-card" style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid var(--md-sys-color-primary)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div
            key={exactAge.years}
            className="value-pop"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: 'var(--md-sys-color-primary)',
              marginBottom: '0.45rem'
            }}
          >
            {exactAge.years}
          </div>
          <div style={{
            fontSize: '0.825rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)'
          }}>
            {exactAge.years === 1 ? 'Year' : 'Years'}
          </div>
        </div>

        {/* Months Card */}
        <div className="glass-card" style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid var(--accent-purple)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--accent-purple)',
            marginBottom: '0.45rem'
          }}>
            {exactAge.months}
          </div>
          <div style={{
            fontSize: '0.825rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)'
          }}>
            {exactAge.months === 1 ? 'Month' : 'Months'}
          </div>
        </div>

        {/* Days Card */}
        <div className="glass-card" style={{
          padding: '1.5rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid var(--accent-cyan)',
          borderRadius: '16px',
          boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2.75rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'var(--accent-cyan)',
            marginBottom: '0.45rem'
          }}>
            {exactAge.days}
          </div>
          <div style={{
            fontSize: '0.825rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)'
          }}>
            {exactAge.days === 1 ? 'Day' : 'Days'}
          </div>
        </div>
      </div>

      {/* Live Precision Ticker (Hours / Minutes / Seconds) */}
      <div style={{
        background: 'var(--surface-subtle)',
        borderRadius: '14px',
        padding: '0.95rem 1.35rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.85rem',
        border: '1.5px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <span>Precision Clock:</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '1.15rem',
          fontWeight: 800
        }}>
          <div>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>{String(liveHours).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>hrs</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <div>
            <span style={{ color: 'var(--accent-purple)' }}>{String(liveMinutes).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>min</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <div>
            <span style={{ color: 'var(--accent-emerald)' }}>{String(liveSeconds).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>sec</span>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          Total <strong style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>{formatNumber(totals.totalDays)}</strong> days lived
        </div>
      </div>
    </div>
  );
};
