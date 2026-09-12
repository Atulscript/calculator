import React, { useState } from 'react';
import { TotalTimeBreakdown } from '../../../types/age';
import { formatNumber } from '../../../utils/dateUtils';
import { Clock, Copy, Check, Calendar, Sun, Moon, Zap, Layers } from 'lucide-react';

interface TimeBreakdownGridProps {
  totals: TotalTimeBreakdown;
}

export const TimeBreakdownGrid: React.FC<TimeBreakdownGridProps> = ({ totals }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cards = [
    {
      key: 'months',
      label: 'Total Months',
      value: formatNumber(totals.totalMonths),
      subtext: 'approx. calendar months',
      icon: <Calendar size={15} color="var(--md-sys-color-primary)" />,
      tint: 'var(--md-sys-color-primary-container)'
    },
    {
      key: 'weeks',
      label: 'Weeks & Days',
      value: `${formatNumber(totals.totalWeeks)} wks`,
      subtext: `+ ${totals.remainingDays} days`,
      icon: <Layers size={15} color="var(--accent-purple)" />,
      tint: 'rgba(192, 132, 252, 0.15)'
    },
    {
      key: 'days',
      label: 'Total Days',
      value: formatNumber(totals.totalDays),
      subtext: 'full 24-hour cycles',
      icon: <Sun size={15} color="var(--accent-amber)" />,
      tint: 'rgba(245, 158, 11, 0.15)'
    },
    {
      key: 'hours',
      label: 'Total Hours',
      value: formatNumber(totals.totalHours),
      subtext: 'hours lived',
      icon: <Clock size={15} color="var(--accent-cyan)" />,
      tint: 'rgba(56, 189, 248, 0.15)'
    },
    {
      key: 'minutes',
      label: 'Total Minutes',
      value: formatNumber(totals.totalMinutes),
      subtext: 'minutes passed',
      icon: <Zap size={15} color="var(--accent-emerald)" />,
      tint: 'rgba(52, 211, 153, 0.15)'
    },
    {
      key: 'seconds',
      label: 'Total Seconds',
      value: formatNumber(totals.totalSeconds),
      subtext: 'seconds of life',
      icon: <Moon size={15} color="var(--accent-rose)" />,
      tint: 'rgba(251, 113, 133, 0.15)'
    }
  ];

  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem'
        }}>
          <span>Multi-Unit Time Breakdown</span>
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          Click any card to copy
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(175px, 100%), 1fr))',
        gap: '0.9rem'
      }}>
        {cards.map(card => {
          const isCopied = copiedKey === card.key;
          return (
            <div
              key={card.key}
              onClick={() => copyToClipboard(card.value.replace(/[^0-9]/g, ''), card.key)}
              className="glass-card"
              style={{
                padding: '1.25rem 1.15rem',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--surface-solid)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '16px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: card.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {card.icon}
                  </div>
                  <span>{card.label}</span>
                </div>
                <button
                  style={{
                    background: isCopied ? 'var(--md-sys-color-tertiary-container)' : 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    color: isCopied ? 'var(--md-sys-color-on-tertiary-container)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.25rem 0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  aria-label="Copy value"
                >
                  {isCopied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={13} />}
                </button>
              </div>

              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.55rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem',
                  lineHeight: 1.2
                }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                  {card.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
