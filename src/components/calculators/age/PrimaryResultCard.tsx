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
    const text = `Chronological Age: ${exactAge.years} Years, ${exactAge.months} Months, ${exactAge.days} Days (${totals.totalDays.toLocaleString()} days lived)\nBorn on a ${dayOfWeekBorn}${isLeapYearBorn ? ' (Leap Year)' : ''}\nCalculated via Calculator360.app`;
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
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <div className="glass-pill" style={{
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-on-primary-container)',
            fontWeight: 700,
            border: '1px solid var(--border-accent)'
          }}>
            <Sparkles size={14} color="var(--md-sys-color-primary)" />
            <span>Exact Chronological Age</span>
          </div>

          <span style={{
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            fontWeight: 600
          }}>
            Born on a <strong style={{ color: 'var(--primary-500)' }}>{dayOfWeekBorn}</strong>
            {isLeapYearBorn && ' (Leap Year 🌟)'}
          </span>
        </div>

        {/* Live Ticker & Copy Controllers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            aria-label="Copy age summary"
          >
            {copied ? <Check size={13} color="#146c2e" /> : <Copy size={13} />}
            <span>{copied ? '✓ Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={onToggleLiveTicker}
            className="glass-pill"
            style={{
              cursor: 'pointer',
              border: isLiveTickerActive ? '1.5px solid #146c2e' : '1.5px solid var(--border-subtle)',
              background: isLiveTickerActive ? '#c4eed0' : 'var(--surface-subtle)',
              color: isLiveTickerActive ? '#072711' : 'var(--text-muted)'
            }}
          >
            <span className={isLiveTickerActive ? 'pulse-dot' : ''} style={{
              background: isLiveTickerActive ? '#146c2e' : 'var(--border-subtle)'
            }} />
            <span style={{ fontWeight: 700 }}>
              {isLiveTickerActive ? 'Live Ticking' : 'Ticker Paused'}
            </span>
            {isLiveTickerActive ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>

      {/* Main Age Stat Display: Big High-Contrast Y / M / D Numbers with Value-Pop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Years Card */}
        <div className="glass-card" style={{
          padding: '1.25rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid var(--md-sys-color-primary)'
        }}>
          <div
            key={exactAge.years}
            className="value-pop"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '3rem',
              fontWeight: 900,
              lineHeight: 1,
              color: 'var(--md-sys-color-primary)',
              marginBottom: '0.35rem'
            }}
          >
            {exactAge.years}
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)'
          }}>
            {exactAge.years === 1 ? 'Year' : 'Years'}
          </div>
        </div>

        {/* Months Card */}
        <div className="glass-card" style={{
          padding: '1.25rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid #6750a4'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1,
            color: '#6750a4',
            marginBottom: '0.35rem'
          }}>
            {exactAge.months}
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)'
          }}>
            {exactAge.months === 1 ? 'Month' : 'Months'}
          </div>
        </div>

        {/* Days Card */}
        <div className="glass-card" style={{
          padding: '1.25rem 1rem',
          textAlign: 'center',
          background: 'var(--surface-solid)',
          borderTop: '4px solid #00639b'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1,
            color: '#00639b',
            marginBottom: '0.35rem'
          }}>
            {exactAge.days}
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-primary)'
          }}>
            {exactAge.days === 1 ? 'Day' : 'Days'}
          </div>
        </div>
      </div>

      {/* Live Precision Ticker (Hours / Minutes / Seconds) */}
      <div style={{
        background: 'var(--surface-hover)',
        borderRadius: 'var(--md-sys-shape-md)',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
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
          fontSize: '1.1rem',
          fontWeight: 800
        }}>
          <div>
            <span style={{ color: 'var(--md-sys-color-primary)' }}>{String(liveHours).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>hrs</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <div>
            <span style={{ color: '#6750a4' }}>{String(liveMinutes).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>min</span>
          </div>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <div>
            <span style={{ color: '#146c2e' }}>{String(liveSeconds).padStart(2, '0')}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginLeft: '0.2rem', fontWeight: 600 }}>sec</span>
          </div>
        </div>

        <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', fontWeight: 600 }}>
          Total <strong>{formatNumber(totals.totalDays)}</strong> days lived
        </div>
      </div>
    </div>
  );
};
