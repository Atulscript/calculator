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
      icon: <Calendar size={16} color="var(--primary-500)" />
    },
    {
      key: 'weeks',
      label: 'Weeks & Days',
      value: `${formatNumber(totals.totalWeeks)} wks`,
      subtext: `+ ${totals.remainingDays} days`,
      icon: <Layers size={16} color="var(--accent-purple)" />
    },
    {
      key: 'days',
      label: 'Total Days',
      value: formatNumber(totals.totalDays),
      subtext: 'full 24-hour cycles',
      icon: <Sun size={16} color="var(--accent-amber)" />
    },
    {
      key: 'hours',
      label: 'Total Hours',
      value: formatNumber(totals.totalHours),
      subtext: 'hours lived',
      icon: <Clock size={16} color="var(--accent-cyan)" />
    },
    {
      key: 'minutes',
      label: 'Total Minutes',
      value: formatNumber(totals.totalMinutes),
      subtext: 'minutes passed',
      icon: <Zap size={16} color="#10b981" />
    },
    {
      key: 'seconds',
      label: 'Total Seconds',
      value: formatNumber(totals.totalSeconds),
      subtext: 'seconds of life',
      icon: <Moon size={16} color="var(--accent-rose)" />
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
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Click any card to copy
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.85rem'
      }}>
        {cards.map(card => {
          const isCopied = copiedKey === card.key;
          return (
            <div
              key={card.key}
              onClick={() => copyToClipboard(card.value.replace(/[^0-9]/g, ''), card.key)}
              className="glass-card"
              style={{
                padding: '1.1rem',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'var(--surface-solid)',
                border: '1.5px solid var(--border-subtle)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {card.icon}
                  <span>{card.label}</span>
                </div>
                <button
                  style={{
                    background: isCopied ? '#c4eed0' : 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    color: isCopied ? '#146c2e' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.25rem 0.35rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Copy value"
                >
                  {isCopied ? <Check size={14} /> : <Copy size={13} />}
                </button>
              </div>

              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.2rem'
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
