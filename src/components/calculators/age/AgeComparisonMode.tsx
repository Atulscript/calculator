import React, { useState } from 'react';
import { compareAges } from '../../../utils/ageEngine';
import { formatDateToInput, formatNumber, parseLocalDate } from '../../../utils/dateUtils';
import { Users, Sparkles } from 'lucide-react';
import { ModernDatePicker } from '../../common/ModernDatePicker';

export const AgeComparisonMode: React.FC = () => {
  const todayStr = formatDateToInput(new Date());

  const [p1Name, setP1Name] = useState('Alex');
  const [p1Dob, setP1Dob] = useState('1998-05-14');
  const [p2Name, setP2Name] = useState('Jordan');
  const [p2Dob, setP2Dob] = useState('2002-11-20');
  const [targetDate] = useState(todayStr);

  const comparison = compareAges(
    p1Name,
    parseLocalDate(p1Dob),
    p2Name,
    parseLocalDate(p2Dob),
    parseLocalDate(targetDate)
  );

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Inputs for Person 1 and Person 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* Person 1 Card */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderTop: '4px solid var(--primary-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <Users size={18} color="var(--primary-500)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Person 1
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Name / Label
              </label>
              <input
                type="text"
                value={p1Name}
                onChange={e => setP1Name(e.target.value)}
                className="input-field"
                placeholder="Person 1 Name"
              />
            </div>
            <ModernDatePicker
              label="Date of Birth"
              value={p1Dob}
              onChange={setP1Dob}
            />
          </div>
        </div>

        {/* Person 2 Card */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)', borderTop: '4px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
            <Users size={18} color="var(--accent-purple)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Person 2
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                Name / Label
              </label>
              <input
                type="text"
                value={p2Name}
                onChange={e => setP2Name(e.target.value)}
                className="input-field"
                placeholder="Person 2 Name"
              />
            </div>
            <ModernDatePicker
              label="Date of Birth"
              value={p2Dob}
              onChange={setP2Dob}
            />
          </div>
        </div>
      </div>

      {/* Comparison Result Banner */}
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
          marginBottom: '1rem'
        }}>
          <Sparkles size={14} color="var(--md-sys-color-primary)" />
          <span>Comparative Difference Analysis</span>
        </div>

        {comparison.olderPerson !== 'same' ? (
          <div>
            <h3 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '0.45rem'
            }}>
              <strong style={{ color: 'var(--primary-500)' }}>
                {comparison.olderPerson === 'person1' ? comparison.person1.name : comparison.person2.name}
              </strong> is older by
            </h3>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 900,
              color: 'var(--md-sys-color-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem'
            }}>
              {comparison.differenceExact.years} Years, {comparison.differenceExact.months} Months, {comparison.differenceExact.days} Days
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              That equals an exact difference of <strong>{formatNumber(comparison.differenceDays)} days</strong> ({formatNumber(comparison.differenceHours)} hours).
            </p>
          </div>
        ) : (
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Both individuals share the exact same birthday! 🎂
          </h3>
        )}

        {/* Side by side comparison stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
          textAlign: 'left'
        }}>
          <div className="glass-card" style={{ padding: '1.1rem', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-500)', marginBottom: '0.35rem' }}>
              {comparison.person1.name}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {comparison.person1.exactAge.years}y {comparison.person1.exactAge.months}m {comparison.person1.exactAge.days}d
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {formatNumber(comparison.person1.totalDays)} total days
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.1rem', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '0.35rem' }}>
              {comparison.person2.name}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
              {comparison.person2.exactAge.years}y {comparison.person2.exactAge.months}m {comparison.person2.exactAge.days}d
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {formatNumber(comparison.person2.totalDays)} total days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
