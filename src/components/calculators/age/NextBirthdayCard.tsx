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
        padding: '1.5rem',
        marginBottom: '1.75rem',
        background: 'var(--surface-solid)',
        border: '1.5px solid var(--border-subtle)'
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Cake size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Next Birthday Countdown
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Turning <strong style={{ color: 'var(--primary-500)' }}>{turningAge}</strong> on {formatFriendlyDate(nextBirthdayDate)} ({dayOfWeek})
            </p>
          </div>
        </div>

        {isToday ? (
          <div className="glass-pill" style={{ background: '#10b981', color: '#fff', fontWeight: 700 }}>
            <PartyPopper size={14} />
            <span>Happy Birthday Today! 🎉</span>
          </div>
        ) : (
          <div className="glass-pill" style={{ background: '#fef3c7', color: '#92400e', border: '1.5px solid #fde68a', fontWeight: 700 }}>
            <Clock size={14} />
            <span>{daysRemaining} Days Left</span>
          </div>
        )}
      </div>

      {/* Countdown Timer Units */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        marginBottom: '1.25rem'
      }}>
        <div className="glass-card" style={{ padding: '0.85rem 0.5rem', textAlign: 'center', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {daysRemaining}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            Days
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.85rem 0.5rem', textAlign: 'center', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {hoursRemaining}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            Hours
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.85rem 0.5rem', textAlign: 'center', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {minutesRemaining}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            Minutes
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0.85rem 0.5rem', textAlign: 'center', background: 'var(--surface-subtle)', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {secondsRemaining}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            Seconds
          </div>
        </div>
      </div>

      {/* Current Age Year Progress Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.4rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Year Progress to Age {turningAge}</span>
          <span style={{ fontWeight: 800, color: 'var(--primary-500)' }}>{progressPercentage}%</span>
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
        paddingTop: '1rem'
      }}>
        {/* Half Birthday Badge */}
        <div style={{
          background: 'var(--surface-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1.5px solid var(--border-subtle)'
        }}>
          <PartyPopper size={22} color="var(--accent-purple)" />
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Half-Birthday
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatFriendlyDate(halfBirthdayDate)}
            </div>
          </div>
        </div>

        {/* Upcoming 5 Years Day-of-Week Overview */}
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
            Next 5 Birthdays Day of Week
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {upcomingBirthdays.map(item => (
              <span
                key={item.year}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '6px',
                  background: item.isWeekend ? '#dbeafe' : 'var(--surface-subtle)',
                  color: item.isWeekend ? '#1e40af' : 'var(--text-primary)',
                  border: item.isWeekend ? '1.5px solid #93c5fd' : '1.5px solid var(--border-subtle)',
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
