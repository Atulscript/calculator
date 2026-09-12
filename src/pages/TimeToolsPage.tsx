import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateTimeDuration,
  calculateTimesheet,
  calculateDaysUntil,
  calculateDayOfWeek,
  calculateChronologicalSchoolAge,
  calculateSleepCycles
} from '../utils/timeEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Clock,
  Hourglass,
  CalendarDays,
  Calendar,
  GraduationCap,
  Moon,
  Copy,
  Check
} from 'lucide-react';

interface TimeToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const TimeToolsPage: React.FC<TimeToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[11];
  const [copied, setCopied] = useState(false);

  // 1. Time Duration State
  const [tdStart, setTdStart] = useState<string>('09:15');
  const [tdEnd, setTdEnd] = useState<string>('17:45');
  const [tdNextDay, setTdNextDay] = useState<boolean>(false);

  // 2. Timesheet State
  const [tsClockIn, setTsClockIn] = useState<string>('08:30');
  const [tsClockOut, setTsClockOut] = useState<string>('17:30');
  const [tsBreakMin, setTsBreakMin] = useState<number>(45);
  const [tsHourlyRate, setTsHourlyRate] = useState<number>(25);

  // 3. Days Until State
  const [targetDate, setTargetDate] = useState<string>(() => {
    const d = new Date();
    d.setMonth(11);
    d.setDate(25); // Christmas default
    if (d.getTime() < Date.now()) d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  });

  // 4. Day of Week State
  const [dowDate, setDowDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // 5. Chronological School Age State
  const [schoolDob, setSchoolDob] = useState<string>('2019-04-15');
  const [schoolCutoff, setSchoolCutoff] = useState<string>('2025-09-01');

  // 6. Sleep Cycle State
  const [sleepMode, setSleepMode] = useState<'wake_at' | 'sleep_now'>('wake_at');
  const [sleepWakeTime, setSleepWakeTime] = useState<string>('07:00');



  // Results
  const tdResult = useMemo(() => {
    return calculateTimeDuration({
      startTime: tdStart,
      endTime: tdEnd,
      nextDay: tdNextDay
    });
  }, [tdStart, tdEnd, tdNextDay]);

  const tsResult = useMemo(() => {
    return calculateTimesheet({
      startTime: tsClockIn,
      endTime: tsClockOut,
      breakMinutes: tsBreakMin,
      hourlyRate: tsHourlyRate
    });
  }, [tsClockIn, tsClockOut, tsBreakMin, tsHourlyRate]);

  const duResult = useMemo(() => {
    return calculateDaysUntil(targetDate);
  }, [targetDate]);

  const dowResult = useMemo(() => {
    return calculateDayOfWeek(dowDate);
  }, [dowDate]);

  const schoolResult = useMemo(() => {
    return calculateChronologicalSchoolAge(schoolDob, schoolCutoff);
  }, [schoolDob, schoolCutoff]);

  const sleepResult = useMemo(() => {
    return calculateSleepCycles(sleepMode, sleepWakeTime);
  }, [sleepMode, sleepWakeTime]);

  const handleCopy = (summary: string) => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      {/* Hero Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--md-sys-shape-md)',
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {slug === 'time-duration-calculator' && <Clock size={22} />}
            {slug === 'hours-and-minutes-calculator' && <Hourglass size={22} />}
            {slug === 'days-until-calculator' && <CalendarDays size={22} />}
            {slug === 'day-of-the-week-calculator' && <Calendar size={22} />}
            {slug === 'chronological-age-calculator' && <GraduationCap size={22} />}
            {slug === 'sleep-cycle-calculator' && <Moon size={22} />}
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {calcMeta.title}
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          {calcMeta.shortDescription}
        </p>
      </div>

      {/* 2-Column Layout */}
      <div className="calculator-layout-grid">
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>

            {/* ======================================================= */}
            {/* 1. TIME DURATION CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'time-duration-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={tdStart}
                      onChange={e => setTdStart(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.1rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      End Time
                    </label>
                    <input
                      type="time"
                      value={tdEnd}
                      onChange={e => setTdEnd(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="tdNextDayCheck"
                    checked={tdNextDay}
                    onChange={e => setTdNextDay(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label htmlFor="tdNextDayCheck" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }}>
                    End time is on the next day (+24 hrs)
                  </label>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Time Duration
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {tdResult.formattedDuration}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Decimal Hours: {tdResult.decimalHours} hrs ({tdResult.totalMinutes.toLocaleString()} minutes)
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. TIMESHEET CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'hours-and-minutes-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Clock In
                    </label>
                    <input
                      type="time"
                      value={tsClockIn}
                      onChange={e => setTsClockIn(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Clock Out
                    </label>
                    <input
                      type="time"
                      value={tsClockOut}
                      onChange={e => setTsClockOut(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Unpaid Break (Minutes)
                    </label>
                    <input
                      type="number"
                      value={tsBreakMin}
                      onChange={e => setTsBreakMin(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Hourly Wage Rate ($)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={tsHourlyRate}
                      onChange={e => setTsHourlyRate(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Billable Work Hours
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {tsResult.totalHours} hrs
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
                    Gross Pay: ${tsResult.grossPay.toFixed(2)}
                  </div>
                  {tsResult.overtimeHours > 0 && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
                      Includes {tsResult.overtimeHours} hrs overtime at 1.5x rate (${tsResult.overtimePay.toFixed(2)})
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. DAYS UNTIL COUNTDOWN CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'days-until-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Select Target Event Date
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.1rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'New Year', date: `${new Date().getFullYear() + 1}-01-01` },
                    { label: 'Christmas', date: `${new Date().getFullYear()}-12-25` },
                    { label: 'Halloween', date: `${new Date().getFullYear()}-10-31` },
                    { label: 'Valentine’s Day', date: `${new Date().getFullYear() + 1}-02-14` }
                  ].map(ev => (
                    <button
                      key={ev.label}
                      type="button"
                      onClick={() => setTargetDate(ev.date)}
                      className="m3-preset-pill"
                    >
                      {ev.label}
                    </button>
                  ))}
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    {duResult.isPast ? 'Time Since Event' : 'Countdown to Event'}
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {duResult.totalDays} Days
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {duResult.monthsAndDays.months} Months & {duResult.monthsAndDays.days} Days ({duResult.totalWeeks} Weeks)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Hours</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{duResult.totalHours.toLocaleString()} hrs</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Minutes</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{duResult.totalMinutes.toLocaleString()} min</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. DAY OF THE WEEK CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'day-of-the-week-calculator' && (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Pick Any Date (Past or Future)
                  </label>
                  <input
                    type="date"
                    value={dowDate}
                    onChange={e => setDowDate(e.target.value)}
                    className="m3-input-field"
                    style={{ width: '100%', fontSize: '1.1rem' }}
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Day of the Week
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {dowResult.dayName}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {dowResult.formattedFullDate}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Day of the Year</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Day #{dowResult.dayOfYear}</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leap Year?</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{dowResult.isLeapYear ? 'Yes (366 days)' : 'No (365 days)'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. CHRONOLOGICAL SCHOOL AGE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'chronological-age-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Child Date of Birth
                    </label>
                    <input
                      type="date"
                      value={schoolDob}
                      onChange={e => setSchoolDob(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Target Cutoff Date
                    </label>
                    <input
                      type="date"
                      value={schoolCutoff}
                      onChange={e => setSchoolCutoff(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Chronological Age on Cutoff Date
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {schoolResult.years} yrs, {schoolResult.months} mos, {schoolResult.days} days
                  </div>
                  <div style={{ display: 'inline-block', padding: '0.3rem 0.85rem', borderRadius: '999px', background: schoolResult.meetsCutoff ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: schoolResult.meetsCutoff ? 'var(--accent-emerald)' : 'var(--accent-red)', fontWeight: 800, fontSize: '0.85rem' }}>
                    {schoolResult.meetsCutoff ? '✓ Meets Standard 5-Year School Admission Cutoff' : 'Under Minimum 5-Year Age Requirement'}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 6. SLEEP CYCLE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'sleep-cycle-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setSleepMode('wake_at')}
                    className={`m3-segmented-tab ${sleepMode === 'wake_at' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.45rem' }}
                  >
                    I need to wake up at...
                  </button>
                  <button
                    type="button"
                    onClick={() => setSleepMode('sleep_now')}
                    className={`m3-segmented-tab ${sleepMode === 'sleep_now' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.45rem' }}
                  >
                    If I go to sleep right now...
                  </button>
                </div>

                {sleepMode === 'wake_at' && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Target Wake-Up Time
                    </label>
                    <input
                      type="time"
                      value={sleepWakeTime}
                      onChange={e => setSleepWakeTime(e.target.value)}
                      className="m3-input-field"
                      style={{ width: '100%', fontSize: '1.1rem' }}
                    />
                  </div>
                )}

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.85rem', textAlign: 'center' }}>
                    {sleepMode === 'wake_at'
                      ? 'Optimal Bedtimes (Based on 90-min REM Cycles + 14 min latency)'
                      : 'Optimal Wake-Up Times to Feel Alert & Refreshed'}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(130px, 100%), 1fr))', gap: '0.75rem' }}>
                    {sleepResult.suggestedTimes.map(st => (
                      <div
                        key={st.cycles}
                        className="m3-card-filled"
                        style={{
                          padding: '0.85rem',
                          background: st.recommended ? 'rgba(99, 102, 241, 0.12)' : 'var(--surface-solid)',
                          border: st.recommended ? '1.5px solid #6366f1' : '1px solid var(--border-subtle)',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: st.recommended ? 'var(--accent-purple)' : 'var(--text-primary)' }}>
                          {st.time}
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          {st.cycles} Cycles ({st.hoursSlept} hrs)
                        </div>
                        {st.recommended && (
                          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '0.35rem' }}>
                            RECOMMENDED
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Copy Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Time calculation for: ${calcMeta.title}`)}
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied' : 'Copy Result'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="calculator-sidebar">
          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>
        </aside>
      </div>

      <CalculatorArticleView
        calculatorId={calcMeta.id}
        calculatorName={calcMeta.title}
        categoryName="everyday"
      />
    </div>
  );
};
