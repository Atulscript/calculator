import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateDateDifference, DateDifferenceInput } from '../utils/dateDifferenceEngine';
import { formatDateToInput } from '../utils/dateUtils';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  CalendarRange,
  Share2,
  Copy,
  Check,
  Clock,
  Briefcase,
  Sun,
  Calendar
} from 'lucide-react';

interface DateDifferencePageProps {
  onNavigate: (path: string) => void;
}

export const DateDifferencePage: React.FC<DateDifferencePageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'date-difference-calculator') || CALCULATORS_REGISTRY[4];

  const todayStr = useMemo(() => formatDateToInput(new Date()), []);
  const nextMonthStr = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return formatDateToInput(d);
  }, []);

  const [input, setInput] = useState<DateDifferenceInput>({
    startDate: todayStr,
    endDate: nextMonthStr,
    includeEndDay: false
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Date Difference Calculator - Days Between Two Dates | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Calculate exact days, weeks, months, years, and business working days between any two calendar dates with optional leap year and end-day inclusion.'
      );
    }
  }, []);

  const result = useMemo(() => calculateDateDifference(input), [input]);

  const handleCopy = () => {
    const text = `Date Difference:\nFrom: ${input.startDate} to ${input.endDate}\nTotal Days: ${result.totalDays.toLocaleString()} days\nBreakdown: ${result.years} years, ${result.months} months, ${result.days} days\nBusiness Days: ${result.businessDays.toLocaleString()} days\nCalculated via Calculator360.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Date Difference Calculation - Calculator360',
          text: `Difference between ${input.startDate} and ${input.endDate}: ${result.totalDays} days (${result.years}y, ${result.months}m, ${result.days}d).`,
          url: window.location.href
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const setPresetEnd = (daysToAdd: number) => {
    const d = new Date(input.startDate + 'T00:00:00');
    d.setDate(d.getDate() + daysToAdd);
    setInput(prev => ({ ...prev, endDate: d.toISOString().split('T')[0] }));
  };

  const setEndOfYear = () => {
    const d = new Date(input.startDate + 'T00:00:00');
    const endOfYear = new Date(d.getFullYear(), 11, 31);
    setInput(prev => ({ ...prev, endDate: endOfYear.toISOString().split('T')[0] }));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumbs */}
      <div style={{ marginBottom: '1rem' }}>
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
            <CalendarRange size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Date Difference Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Calculate the exact span of days, weeks, months, and business days between any two calendar dates with instant breakdown.
        </p>
      </div>

      {/* 2-Column Calculator Grid */}
      <div className="calculator-layout-grid">
        {/* Left Column: Input Dates & Controls */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Start Date */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Start Date
                </label>
                <button
                  type="button"
                  onClick={() => setInput(prev => ({ ...prev, startDate: todayStr }))}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    borderRadius: '4px',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--primary-600)',
                    cursor: 'pointer'
                  }}
                >
                  Set to Today
                </button>
              </div>
              <input
                type="date"
                value={input.startDate}
                onChange={e => setInput({ ...input, startDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--md-sys-shape-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            {/* End Date */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  End Date
                </label>
              </div>
              <input
                type="date"
                value={input.endDate}
                onChange={e => setInput({ ...input, endDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--md-sys-shape-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />

              {/* Quick Presets for End Date */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setPresetEnd(30)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  +30 Days
                </button>
                <button
                  type="button"
                  onClick={() => setPresetEnd(60)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  +60 Days
                </button>
                <button
                  type="button"
                  onClick={() => setPresetEnd(90)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  +90 Days
                </button>
                <button
                  type="button"
                  onClick={() => setPresetEnd(365)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  +1 Year
                </button>
                <button
                  type="button"
                  onClick={setEndOfYear}
                  style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  End of Year
                </button>
              </div>
            </div>

            {/* Include End Day Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--md-sys-shape-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Include End Day
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Add 1 day to make the range fully inclusive
                </div>
              </div>

              <input
                type="checkbox"
                checked={input.includeEndDay}
                onChange={e => setInput({ ...input, includeEndDay: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--md-sys-color-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Results */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '1.75rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                Result Summary
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopy}
                  title="Copy calculation summary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? <Check size={13} color="var(--accent-emerald)" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleShare}
                  title="Share calculation"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-xs)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Total Days Highlight */}
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.3rem' }}>
                Total Calendar Days
              </div>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {result.totalDays.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.9, marginTop: '0.5rem', fontWeight: 600 }}>
                {result.years > 0 ? `${result.years} year${result.years > 1 ? 's' : ''}, ` : ''}
                {result.months > 0 ? `${result.months} month${result.months > 1 ? 's' : ''}, ` : ''}
                {result.days} day{result.days !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Grid of Metric Breakdown Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {/* Business Days */}
              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Briefcase size={14} color="var(--md-sys-color-primary)" />
                  <span>Working / Business Days</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {result.businessDays.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  Mon - Fri (excluding weekends)
                </div>
              </div>

              {/* Weekend Days */}
              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Sun size={14} color="#f59e0b" />
                  <span>Weekend Days</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {result.weekendDays.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  Saturdays & Sundays
                </div>
              </div>

              {/* Weeks + Days */}
              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Calendar size={14} color="var(--primary-600)" />
                  <span>Weeks & Days</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {result.totalWeeks}w {result.remainingDaysAfterWeeks}d
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {result.totalWeeks.toLocaleString()} full calendar weeks
                </div>
              </div>

              {/* Total Hours */}
              <div style={{ padding: '1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Clock size={14} color="var(--accent-emerald)" />
                  <span>Total Hours</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {result.totalHours.toLocaleString()}h
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                  {result.totalMinutes.toLocaleString()} minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slotType="leaderboard" adSlotId="date-diff-bottom-native" />

      {/* Comprehensive Editorial & Explanatory Article */}
      <CalculatorArticleView
        calculatorId="date-difference-calculator"
        calculatorName="Date Difference Calculator"
        categoryName="Everyday Life"
      />
    </div>
  );
};
