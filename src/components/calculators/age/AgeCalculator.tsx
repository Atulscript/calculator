import React, { useState, useEffect, useMemo } from 'react';
import { AgeCalculatorMode, AgeCalculationResult } from '../../../types/age';
import { computeFullAge } from '../../../utils/ageEngine';
import { formatDateToInput, formatFriendlyDate } from '../../../utils/dateUtils';
import { PrimaryResultCard } from './PrimaryResultCard';
import { TimeBreakdownGrid } from './TimeBreakdownGrid';
import { NextBirthdayCard } from './NextBirthdayCard';
import { FunInsightsSection } from './FunInsightsSection';
import { AgeComparisonMode } from './AgeComparisonMode';
import { ReverseDobMode } from './ReverseDobMode';
import { ShareModal } from './ShareModal';
import { CalculatorArticleView } from '../../common/CalculatorArticleView';
import {
  Calendar,
  CalendarDays,
  RotateCcw,
  Share2,
  Users,
  Search
} from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const todayStr = formatDateToInput(new Date());

  // Check URL parameters for pre-filled DOB
  const getInitialDob = () => {
    const params = new URLSearchParams(window.location.search);
    const dobParam = params.get('dob');
    if (dobParam && /^\d{4}-\d{2}-\d{2}$/.test(dobParam)) {
      return dobParam;
    }
    return '2000-01-01';
  };

  const [mode, setMode] = useState<AgeCalculatorMode>('today');
  const [birthDateStr, setBirthDateStr] = useState<string>(getInitialDob);
  const [targetDateStr, setTargetDateStr] = useState<string>(todayStr);
  const [birthTimeStr, setBirthTimeStr] = useState<string>('00:00');
  const [includeTime, setIncludeTime] = useState<boolean>(false);

  // Live ticker state
  const [isLiveTickerActive, setIsLiveTickerActive] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Live ticking interval
  useEffect(() => {
    if (!isLiveTickerActive || mode !== 'today') return;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isLiveTickerActive, mode]);

  // Compute live age result
  const result: AgeCalculationResult = useMemo(() => {
    const [bYear, bMonth, bDay] = birthDateStr.split('-').map(Number);
    const [bHours, bMinutes] = includeTime ? birthTimeStr.split(':').map(Number) : [0, 0];
    const bDate = new Date(bYear, bMonth - 1, bDay, bHours, bMinutes, 0);

    let tDate: Date;
    if (mode === 'today') {
      tDate = currentTime;
    } else {
      const [tYear, tMonth, tDay] = targetDateStr.split('-').map(Number);
      tDate = new Date(tYear, tMonth - 1, tDay, 23, 59, 59);
    }

    return computeFullAge(bDate, tDate);
  }, [birthDateStr, targetDateStr, birthTimeStr, includeTime, mode, currentTime]);

  // Presets helper
  const setQuickPreset = (yearsAgo: number) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsAgo);
    setBirthDateStr(formatDateToInput(d));
  };

  const handleReset = () => {
    setBirthDateStr('2000-01-01');
    setTargetDateStr(todayStr);
    setBirthTimeStr('00:00');
    setIncludeTime(false);
    setMode('today');
  };

  return (
    <div>
      {/* Title & Short Description */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: '0.45rem',
          color: 'var(--text-primary)'
        }}>
          Chronological Age Calculator
        </h1>

        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          margin: '0 auto'
        }}>
          Calculate your exact age in years, months, days, hours, and seconds with birthday countdown, zodiac sign, and planetary orbital ages.
        </p>
      </div>

      {/* Mode Switcher Tabs with M3 Segmented Control */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div className="m3-segmented-control" style={{ maxWidth: '680px', width: '100%', overflowX: 'auto' }}>
          <button
            type="button"
            onClick={() => setMode('today')}
            className={`m3-segmented-tab ${mode === 'today' ? 'active' : ''}`}
            aria-selected={mode === 'today'}
          >
            <Calendar size={15} />
            <span>Age Today</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('specific')}
            className={`m3-segmented-tab ${mode === 'specific' ? 'active' : ''}`}
            aria-selected={mode === 'specific'}
          >
            <CalendarDays size={15} />
            <span>Age on Specific Date</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('reverse')}
            className={`m3-segmented-tab ${mode === 'reverse' ? 'active' : ''}`}
            aria-selected={mode === 'reverse'}
          >
            <Search size={15} />
            <span>Find DOB</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('compare')}
            className={`m3-segmented-tab ${mode === 'compare' ? 'active' : ''}`}
            aria-selected={mode === 'compare'}
          >
            <Users size={15} />
            <span>Compare Ages</span>
          </button>
        </div>
      </div>

      {/* Standard Modes (Today & Specific Date) Inputs Card */}
      {(mode === 'today' || mode === 'specific') && (
        <div
          className="glass-panel"
          style={{
            padding: '1.5rem',
            marginBottom: '1.75rem',
            background: 'var(--surface-solid)'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.25rem'
          }}>
            {/* DOB Picker */}
            <div>
              <label style={{
                fontSize: '0.825rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '0.4rem'
              }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDateStr}
                onChange={e => setBirthDateStr(e.target.value)}
                className="input-field"
                style={{ fontSize: '1rem', fontWeight: 600 }}
              />
            </div>

            {/* Target Date Picker (in specific mode) or Indicator */}
            {mode === 'specific' ? (
              <div>
                <label style={{
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}>
                  Age as of Target Date
                </label>
                <input
                  type="date"
                  value={targetDateStr}
                  onChange={e => setTargetDateStr(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '1rem', fontWeight: 600 }}
                />
              </div>
            ) : (
              <div>
                <label style={{
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}>
                  Age as of Reference Date
                </label>
                <div style={{
                  background: 'var(--surface-subtle)',
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  border: '1.5px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Calendar size={16} color="var(--primary-500)" />
                  <span>Today ({formatFriendlyDate(currentTime)})</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Presets & Precision Time Toggle */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1rem'
          }}>
            {/* Quick Age Shortcuts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
                Quick Presets:
              </span>
              <button onClick={() => setQuickPreset(18)} className="glass-pill" style={{ cursor: 'pointer' }}>
                18 yrs
              </button>
              <button onClick={() => setQuickPreset(21)} className="glass-pill" style={{ cursor: 'pointer' }}>
                21 yrs
              </button>
              <button onClick={() => setQuickPreset(25)} className="glass-pill" style={{ cursor: 'pointer' }}>
                25 yrs
              </button>
              <button onClick={() => setQuickPreset(30)} className="glass-pill" style={{ cursor: 'pointer' }}>
                30 yrs
              </button>
              <button onClick={() => setQuickPreset(50)} className="glass-pill" style={{ cursor: 'pointer' }}>
                50 yrs
              </button>
            </div>

            {/* Action Bar (Share Card, Reset) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                <Share2 size={14} color="var(--primary-500)" />
                <span>Share Card</span>
              </button>

              <button
                onClick={handleReset}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                title="Reset to default"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Main Results for Mode 1 & 2 */}
      {(mode === 'today' || mode === 'specific') && (
        <>
          <PrimaryResultCard
            result={result}
            isLiveTickerActive={isLiveTickerActive}
            onToggleLiveTicker={() => setIsLiveTickerActive(!isLiveTickerActive)}
            liveSeconds={result.exactAge.seconds}
            liveMinutes={result.exactAge.minutes}
            liveHours={result.exactAge.hours}
          />

          <TimeBreakdownGrid
            totals={result.totals}
          />

          <NextBirthdayCard nextBirthday={result.nextBirthday} />

          <FunInsightsSection
            zodiac={result.zodiac}
            birthstone={result.birthstone}
            birthFlower={result.birthFlower}
            planetaryAges={result.planetaryAges}
            bioStats={result.bioStats}
          />
        </>
      )}

      {/* Render Mode 3: Reverse DOB */}
      {mode === 'reverse' && <ReverseDobMode />}

      {/* Render Mode 4: Age Comparison */}
      {mode === 'compare' && <AgeComparisonMode />}

      {/* Material Design 3 Educational Guide & Article */}
      <CalculatorArticleView
        calculatorId="age-calculator"
        calculatorName="Age Calculator"
        categoryName="Everyday Life"
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        result={result}
      />
    </div>
  );
};
