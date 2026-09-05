import React from 'react';
import { NextBirthdayInfo } from '../../../types/age';
import { formatFriendlyDate } from '../../../utils/dateUtils';
import { Cake, Clock, PartyPopper } from 'lucide-react';

interface NextBirthdayCardProps {
  nextBirthday: NextBirthdayInfo;
}

export const NextBirthdayCard: React.FC<NextBirthdayCardProps> = ({ nextBirthday }) => {
  const {
    nextBirthdayDate,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    dayOfWeek,
    turningAge,
    progressPercentage,
    halfBirthdayDate,
    upcomingBirthdays
  } = nextBirthday;

  const isToday = daysRemaining === 0;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.75rem',
        marginBottom: '1.75rem',
        background: 'var(--surface-solid)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: '20px'
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
          }}>
            <Cake size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Next Birthday Countdown
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Turning <strong style={{ color: 'var(--md-sys-color-primary)', fontWeight: 800 }}>{turningAge}</strong> on {formatFriendlyDate(nextBirthdayDate)} ({dayOfWeek})
            </p>
          </div>
        </div>

        {isToday ? (
          <div className="glass-pill" style={{ background: 'var(--accent-emerald)', color: '#fff', fontWeight: 700, padding: '0.4rem 0.85rem' }}>
            <PartyPopper size={15} />
            <span>Happy Birthday Today! 🎉</span>
          </div>
        ) : (
          <div className="glass-pill" style={{
            background: 'rgba(245, 158, 11, 0.14)',
            color: 'var(--accent-amber)',
            border: '1.5px solid rgba(245, 158, 11, 0.35)',
            fontWeight: 700,
            padding: '0.4rem 0.85rem'
          }}>
            <Clock size={14} />
            <span>{daysRemaining} Days Left</span>
          </div>
        )}
      </div>

      {/* Countdown Timer Units */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.85rem',
        marginBottom: '1.5rem'
      }}>
        <div className="glass-card" style={{
          padding: '1.1rem 0.5rem',
          textAlign: 'center',
          background: 'var(--surface-subtle)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '14px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
            {daysRemaining}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Days
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 0.5rem',
          textAlign: 'center',
          background: 'var(--surface-subtle)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '14px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
            {hoursRemaining}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Hours
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 0.5rem',
          textAlign: 'center',
          background: 'var(--surface-subtle)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '14px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
            {minutesRemaining}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Minutes
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '1.1rem 0.5rem',
          textAlign: 'center',
          background: 'var(--surface-subtle)',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '14px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1 }}>
            {secondsRemaining}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Seconds
          </div>
        </div>
      </div>

      {/* Current Age Year Progress Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.45rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Year Progress to Age {turningAge}</span>
          <span style={{ fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{progressPercentage}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          background: 'var(--surface-hover)',
          borderRadius: '999px',
          overflow: 'hidden',
          border: '1.5px solid var(--border-subtle)'
        }}>
          <div style={{
            width: `${progressPercentage}%`,
            height: '100%',
            background: 'var(--md-sys-color-primary)',
            borderRadius: '999px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Half Birthday & Upcoming Birthdays Table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '1.25rem'
      }}>
        {/* Half Birthday Badge */}
        <div style={{
          background: 'var(--surface-subtle)',
          borderRadius: '14px',
          padding: '0.95rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          border: '1.5px solid var(--border-subtle)'
        }}>
          <PartyPopper size={24} color="var(--accent-purple)" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Half-Birthday
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatFriendlyDate(halfBirthdayDate)}
            </div>
          </div>
        </div>

        {/* Upcoming 5 Years Day-of-Week Overview */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.55rem' }}>
            Next 5 Birthdays Day of Week
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {upcomingBirthdays.map(item => (
              <span
                key={item.year}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  background: item.isWeekend ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                  color: item.isWeekend ? 'var(--md-sys-color-on-primary-container)' : 'var(--text-primary)',
                  border: item.isWeekend ? '1.5px solid var(--border-accent)' : '1.5px solid var(--border-subtle)',
                  fontWeight: 700
                }}
              >
                {item.year} ({item.dayOfWeek.slice(0, 3)}) {item.isWeekend && '🎉'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
