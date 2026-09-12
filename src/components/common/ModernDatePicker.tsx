import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Clock } from 'lucide-react';

interface ModernDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  showDayBadge?: boolean;
  presets?: Array<{ label: string; yearsAgo?: number; date?: string }>;
  style?: React.CSSProperties;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Date parsing and formatting helpers to prevent timezone offset shifts
function parseYMD(str: string): { year: number; month: number; day: number } | null {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return { year: parts[0], month: parts[1], day: parts[2] };
  }
  return null;
}

function formatYMD(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

function getDayName(year: number, month: number, day: number): string {
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function getTodayYMD(): string {
  const now = new Date();
  return formatYMD(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export const ModernDatePicker: React.FC<ModernDatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  id,
  min,
  max,
  disabled = false,
  showDayBadge = true,
  presets,
  style,
  className = ''
}) => {
  const parsed = parseYMD(value);
  const todayYMD = getTodayYMD();
  const parsedToday = parseYMD(todayYMD)!;

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');
  const [viewYear, setViewYear] = useState<number>(parsed ? parsed.year : parsedToday.year);
  const [viewMonth, setViewMonth] = useState<number>(parsed ? parsed.month : parsedToday.month);
  const [decadeStart, setDecadeStart] = useState<number>(
    Math.floor((parsed ? parsed.year : parsedToday.year) / 12) * 12
  );
  const [inputValue, setInputValue] = useState<string>(value);

  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 99999
  });

  const updatePosition = useCallback(() => {
    if (!fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const popoverWidth = Math.min(320, window.innerWidth - 24);
    const estimatedHeight = 440;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const placeAbove = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - popoverWidth - 12);
    }
    if (left < 12) {
      left = 12;
    }

    if (placeAbove) {
      setPopoverStyle({
        position: 'fixed',
        bottom: `${Math.max(12, window.innerHeight - rect.top + 8)}px`,
        top: 'auto',
        left: `${left}px`,
        width: `${popoverWidth}px`,
        maxWidth: 'calc(100vw - 24px)',
        zIndex: 99999,
        boxSizing: 'border-box'
      });
    } else {
      setPopoverStyle({
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        bottom: 'auto',
        left: `${left}px`,
        width: `${popoverWidth}px`,
        maxWidth: 'calc(100vw - 24px)',
        zIndex: 99999,
        boxSizing: 'border-box'
      });
    }
  }, []);

  // Sync internal state if external value changes
  useEffect(() => {
    setInputValue(value);
    if (value) {
      const p = parseYMD(value);
      if (p) {
        setViewYear(p.year);
        setViewMonth(p.month);
        setDecadeStart(Math.floor(p.year / 12) * 12);
      }
    }
  }, [value]);

  // Keep popover attached on scroll and resize
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, viewMode, updatePosition]);

  // Click outside and escape key listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
        setViewMode('days');
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setViewMode('days');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDaySelect = (day: number, monthOffset = 0) => {
    let targetYear = viewYear;
    let targetMonth = viewMonth + monthOffset;
    if (targetMonth < 1) {
      targetMonth = 12;
      targetYear -= 1;
    } else if (targetMonth > 12) {
      targetMonth = 1;
      targetYear += 1;
    }

    const formatted = formatYMD(targetYear, targetMonth, day);
    if (min && formatted < min) return;
    if (max && formatted > max) return;
    onChange(formatted);
    setInputValue(formatted);
    setIsOpen(false);
    setViewMode('days');
  };

  const handleQuickPreset = (preset: { label: string; yearsAgo?: number; date?: string }) => {
    if (preset.date) {
      onChange(preset.date);
      setInputValue(preset.date);
    } else if (preset.yearsAgo !== undefined) {
      const now = new Date();
      const pastYear = now.getFullYear() - preset.yearsAgo;
      const formatted = formatYMD(pastYear, now.getMonth() + 1, now.getDate());
      onChange(formatted);
      setInputValue(formatted);
    }
    setIsOpen(false);
    setViewMode('days');
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  const handlePrevDecade = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecadeStart(prev => prev - 12);
  };

  const handleNextDecade = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecadeStart(prev => prev + 12);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setInputValue('');
  };

  const handleTodayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(todayYMD);
    setInputValue(todayYMD);
    setViewYear(parsedToday.year);
    setViewMonth(parsedToday.month);
    setIsOpen(false);
    setViewMode('days');
  };

  // Direct typing handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const p = parseYMD(raw);
    if (p && p.month >= 1 && p.month <= 12 && p.day >= 1 && p.day <= 31) {
      onChange(raw);
      setViewYear(p.year);
      setViewMonth(p.month);
    }
  };

  // Calendar Day Grid Computation
  const daysInCurrentMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDayIndex = getFirstDayOfWeek(viewYear, viewMonth); // 0 (Sun) - 6 (Sat)
  const prevMonth = viewMonth === 1 ? 12 : viewMonth - 1;
  const prevMonthYear = viewMonth === 1 ? viewYear - 1 : viewYear;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

  // Generate 42 cells (6 rows x 7 cols) for fluid calendar grid
  const calendarCells: Array<{ day: number; monthOffset: number; isCurrentMonth: boolean }> = [];

  // 1. Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: daysInPrevMonth - i,
      monthOffset: -1,
      isCurrentMonth: false
    });
  }

  // 2. Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    calendarCells.push({
      day: d,
      monthOffset: 0,
      isCurrentMonth: true
    });
  }

  // 3. Next month leading days
  const remaining = 42 - calendarCells.length;
  for (let d = 1; d <= remaining; d++) {
    calendarCells.push({
      day: d,
      monthOffset: 1,
      isCurrentMonth: false
    });
  }

  // Years for decade view (12 years)
  const decadeYears: number[] = [];
  for (let y = decadeStart; y < decadeStart + 12; y++) {
    decadeYears.push(y);
  }

  // Common popular decades for quick DOB jumps
  const popularDecades = [1970, 1980, 1990, 2000, 2010, 2020];

  const formattedDayBadge = parsed ? getDayName(parsed.year, parsed.month, parsed.day) : null;

  return (
    <div
      ref={containerRef}
      className={`modern-datepicker-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        ...style
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.45rem'
          }}
        >
          <span>{label}</span>
          {formattedDayBadge && showDayBadge && (
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 600,
                color: 'var(--primary-500)',
                background: 'var(--primary-glow)',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px'
              }}
            >
              {formattedDayBadge}
            </span>
          )}
        </label>
      )}

      {/* Input Field Display */}
      <div
        ref={fieldRef}
        className="modern-datepicker-field"
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.65rem 0.95rem',
          borderRadius: '12px',
          border: isOpen ? '1.5px solid var(--primary-500)' : '1.5px solid var(--border-subtle)',
          background: 'var(--surface-subtle)',
          boxShadow: isOpen ? '0 0 0 3px var(--primary-glow)' : 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: disabled ? 0.6 : 1
        }}
      >
        <Calendar
          size={18}
          color={isOpen ? 'var(--primary-500)' : 'var(--text-muted)'}
          style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
        />

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            cursor: 'pointer'
          }}
        />

        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear date"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.2rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Calendar Popover rendered via Portal to completely avoid stacking context clipping */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          className="modern-datepicker-popover"
          style={{
            ...popoverStyle,
            background: 'var(--surface-solid)',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--border-subtle)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '1rem',
            animation: 'm3DropdownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            userSelect: 'none'
          }}
        >
          {/* Popover Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.85rem'
            }}
          >
            {/* View Mode Switcher Button */}
            <button
              type="button"
              onClick={() => {
                if (viewMode === 'days') setViewMode('months');
                else if (viewMode === 'months') setViewMode('years');
                else setViewMode('days');
              }}
              style={{
                background: 'var(--surface-hover)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '0.4rem 0.75rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span>
                {viewMode === 'days' && `${MONTH_NAMES[viewMonth - 1]} ${viewYear}`}
                {viewMode === 'months' && `${viewYear}`}
                {viewMode === 'years' && `${decadeStart} – ${decadeStart + 11}`}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-500)' }}>▾</span>
            </button>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {viewMode === 'days' && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    title="Previous month"
                    className="calendar-nav-btn"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    title="Next month"
                    className="calendar-nav-btn"
                  >
                    <ChevronRight size={17} />
                  </button>
                </>
              )}

              {viewMode === 'months' && (
                <>
                  <button
                    type="button"
                    onClick={() => setViewYear(prev => prev - 1)}
                    title="Previous year"
                    className="calendar-nav-btn"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewYear(prev => prev + 1)}
                    title="Next year"
                    className="calendar-nav-btn"
                  >
                    <ChevronRight size={17} />
                  </button>
                </>
              )}

              {viewMode === 'years' && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevDecade}
                    title="Previous 12 years"
                    className="calendar-nav-btn"
                  >
                    <ChevronsLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextDecade}
                    title="Next 12 years"
                    className="calendar-nav-btn"
                  >
                    <ChevronsRight size={17} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* VIEW: DAYS */}
          {viewMode === 'days' && (
            <div>
              {/* Weekday Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  textAlign: 'center',
                  marginBottom: '0.45rem'
                }}
              >
                {WEEKDAY_NAMES.map(w => (
                  <span
                    key={w}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      padding: '0.25rem 0'
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  gap: '2px'
                }}
              >
                {calendarCells.map((cell, idx) => {
                  let targetYear = viewYear;
                  let targetMonth = viewMonth + cell.monthOffset;
                  if (targetMonth < 1) {
                    targetMonth = 12;
                    targetYear -= 1;
                  } else if (targetMonth > 12) {
                    targetMonth = 1;
                    targetYear += 1;
                  }
                  const cellYMD = formatYMD(targetYear, targetMonth, cell.day);
                  const isSelected = parsed && parsed.year === targetYear && parsed.month === targetMonth && parsed.day === cell.day;
                  const isToday = todayYMD === cellYMD;
                  const isCellDisabled = Boolean((min && cellYMD < min) || (max && cellYMD > max));

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isCellDisabled}
                      onClick={() => !isCellDisabled && handleDaySelect(cell.day, cell.monthOffset)}
                      className={`datepicker-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${!cell.isCurrentMonth ? 'adjacent' : ''}`}
                      style={{
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        border: isToday && !isSelected ? '1px solid var(--primary-500)' : 'none',
                        background: isSelected
                          ? 'var(--primary-500)'
                          : 'transparent',
                        color: isSelected
                          ? '#ffffff'
                          : isCellDisabled
                            ? 'var(--border-subtle)'
                            : !cell.isCurrentMonth
                              ? 'var(--text-muted)'
                              : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: isSelected || isToday ? 700 : 500,
                        cursor: isCellDisabled ? 'not-allowed' : 'pointer',
                        opacity: isCellDisabled ? 0.35 : 1,
                        transition: 'all 0.12s ease',
                        position: 'relative'
                      }}
                    >
                      {cell.day}
                      {isToday && !isSelected && (
                        <span
                          style={{
                            position: 'absolute',
                            bottom: '3px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'var(--primary-500)'
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW: MONTHS */}
          {viewMode === 'months' && (
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '0.5rem',
                  padding: '0.35rem 0'
                }}
              >
                {MONTH_SHORT.map((m, idx) => {
                  const mIndex = idx + 1;
                  const isSelected = viewMonth === mIndex;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setViewMonth(mIndex);
                        setViewMode('days');
                      }}
                      className="datepicker-selector-cell"
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '10px',
                        border: isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-glow)' : 'var(--surface-subtle)',
                        color: isSelected ? 'var(--primary-500)' : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW: YEARS (DECADE SELECTOR) */}
          {viewMode === 'years' && (
            <div>
              {/* Quick Decade Jumpers */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.35rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                {popularDecades.map(decade => (
                  <button
                    key={decade}
                    type="button"
                    onClick={() => setDecadeStart(decade)}
                    style={{
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: '1px solid var(--border-subtle)',
                      background: decadeStart === decade ? 'var(--primary-500)' : 'var(--surface-subtle)',
                      color: decadeStart === decade ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {decade}s
                  </button>
                ))}
              </div>

              {/* 12 Years Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '0.5rem',
                  padding: '0.2rem 0'
                }}
              >
                {decadeYears.map(y => {
                  const isSelected = viewYear === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setViewYear(y);
                        setViewMode('months');
                      }}
                      className="datepicker-selector-cell"
                      style={{
                        padding: '0.7rem 0.5rem',
                        borderRadius: '10px',
                        border: isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-glow)' : 'var(--surface-subtle)',
                        color: isSelected ? 'var(--primary-500)' : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Presets if provided */}
          {presets && presets.length > 0 && (
            <div
              style={{
                marginTop: '0.75rem',
                paddingTop: '0.65rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem'
              }}
            >
              {presets.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => handleQuickPreset(preset)}
                  style={{
                    padding: '0.25rem 0.55rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--surface-subtle)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Popover Footer (Today & Clear) */}
          <div
            style={{
              marginTop: '0.85rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <button
              type="button"
              onClick={handleClear}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.3rem 0.5rem',
                borderRadius: '6px'
              }}
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleTodayClick}
              style={{
                background: 'var(--primary-glow)',
                border: '1px solid var(--primary-500)',
                color: 'var(--primary-500)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Clock size={13} />
              <span>Today</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
