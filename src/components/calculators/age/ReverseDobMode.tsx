import React, { useState } from 'react';
import { findReverseDob } from '../../../utils/ageEngine';
import { formatDateToInput, formatFriendlyDate, parseLocalDate } from '../../../utils/dateUtils';
import { Sparkles } from 'lucide-react';
import { ModernDatePicker } from '../../common/ModernDatePicker';

export const ReverseDobMode: React.FC = () => {
  const todayStr = formatDateToInput(new Date());

  const [years, setYears] = useState(25);
  const [months, setMonths] = useState(6);
  const [days, setDays] = useState(15);
  const [asOfDate, setAsOfDate] = useState(todayStr);

  const result = findReverseDob(Number(years), Number(months), Number(days), parseLocalDate(asOfDate));

  return (
    <div style={{ marginTop: '1rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          Find Date of Birth from Age
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Enter an age in years, months, and days to calculate the exact corresponding birth date.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1rem'
        }}>
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Years
            </label>
            <input
              type="number"
              min="0"
              max="150"
              value={years}
              onChange={e => setYears(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Months
            </label>
            <input
              type="number"
              min="0"
              max="11"
              value={months}
              onChange={e => setMonths(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-field"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
              Days
            </label>
            <input
              type="number"
              min="0"
              max="31"
              value={days}
              onChange={e => setDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-field"
            />
          </div>

          <ModernDatePicker
            label="As of Reference Date"
            value={asOfDate}
            onChange={setAsOfDate}
          />
        </div>
      </div>

      {/* Calculated Result */}
      <div
        className="glass-panel"
        style={{
          background: 'var(--surface-solid)',
          border: '2px solid var(--primary-500)',
          padding: '1.75rem',
          textAlign: 'center',
          boxShadow: 'var(--md-sys-elevation-1)'
        }}
      >
        <div className="glass-pill" style={{
          background: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-on-primary-container)',
          fontWeight: 700,
          border: '1px solid var(--border-accent)',
          marginBottom: '0.85rem'
        }}>
          <Sparkles size={14} color="var(--md-sys-color-primary)" />
          <span>Calculated Date of Birth</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '2.5rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '0.35rem'
        }}>
          {formatFriendlyDate(result.calculatedBirthDate)}
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Born on a <strong style={{ color: 'var(--primary-500)' }}>{result.dayOfWeek}</strong> (ISO Format: <code>{formatDateToInput(result.calculatedBirthDate)}</code>)
        </p>
      </div>
    </div>
  );
};
