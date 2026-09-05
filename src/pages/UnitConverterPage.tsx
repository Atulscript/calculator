import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { convertUnit, UNIT_CATEGORIES, UnitCategory } from '../utils/unitConverterEngine';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Scale,
  ArrowRightLeft,
  Share2,
  Copy,
  Check,
  Ruler,
  Thermometer,
  Gauge,
  Square,
  HardDrive
} from 'lucide-react';

interface UnitConverterPageProps {
  onNavigate: (path: string) => void;
}

export const UnitConverterPage: React.FC<UnitConverterPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'unit-converter') || CALCULATORS_REGISTRY[10];

  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [inputValue, setInputValue] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Universal Unit Converter - Metric & Imperial Units | Calculator360';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Instant unit converter for length, mass, temperature, speed, area, and digital data storage with live reciprocal conversion tables.'
      );
    }
  }, []);

  // When category changes, reset from/to units to first two of that category
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const catData = UNIT_CATEGORIES[newCat];
    setFromUnit(catData.units[0].id);
    setToUnit(catData.units[1].id);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const currentCategoryData = UNIT_CATEGORIES[category];
  const conversion = useMemo(
    () => convertUnit(category, fromUnit, toUnit, inputValue),
    [category, fromUnit, toUnit, inputValue]
  );

  const fromDef = currentCategoryData.units.find(u => u.id === fromUnit) || currentCategoryData.units[0];
  const toDef = currentCategoryData.units.find(u => u.id === toUnit) || currentCategoryData.units[1];

  const handleCopy = () => {
    const text = `${inputValue} ${fromDef.symbol} = ${conversion.formatted} ${toDef.symbol} (${fromDef.name} to ${toDef.name})\nCalculated via Calculator360.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Unit Conversion - Calculator360',
          text: `${inputValue} ${fromDef.symbol} = ${conversion.formatted} ${toDef.symbol}`,
          url: window.location.href
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const categoryIcons: Record<UnitCategory, React.ReactNode> = {
    length: <Ruler size={16} />,
    mass: <Scale size={16} />,
    temperature: <Thermometer size={16} />,
    speed: <Gauge size={16} />,
    area: <Square size={16} />,
    digital: <HardDrive size={16} />
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
            <Scale size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Universal Unit Converter
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Convert between metric, imperial, and scientific units for length, mass, temperature, speed, area, and digital memory storage.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.25rem', scrollbarWidth: 'none' }}>
        {(Object.keys(UNIT_CATEGORIES) as UnitCategory[]).map(catKey => {
          const isSelected = category === catKey;
          return (
            <button
              key={catKey}
              type="button"
              onClick={() => handleCategoryChange(catKey)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.15rem',
                borderRadius: 'var(--md-sys-shape-full)',
                border: isSelected ? '1.5px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--surface-solid)',
                color: isSelected ? 'var(--primary-600)' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {categoryIcons[catKey]}
              <span>{UNIT_CATEGORIES[catKey].name}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Converter Grid */}
      <div className="calculator-layout-grid">
        {/* Left Column: Interactive Input & Unit Selectors */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Input Value */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                Enter Value to Convert
              </label>
              <input
                type="number"
                step="any"
                value={inputValue === 0 ? '' : inputValue}
                onChange={e => setInputValue(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  borderRadius: 'var(--md-sys-shape-md)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--surface-solid)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            {/* From & To Selectors with Swap */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  From
                </label>
                <select
                  value={fromUnit}
                  onChange={e => setFromUnit(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.65rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {currentCategoryData.units.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ paddingTop: '1.3rem' }}>
                <button
                  type="button"
                  onClick={handleSwap}
                  title="Swap units"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--surface-subtle)',
                    border: '1.5px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-600)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <ArrowRightLeft size={16} />
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  To
                </label>
                <select
                  value={toUnit}
                  onChange={e => setToUnit(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.65rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {currentCategoryData.units.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Result Card */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '1.75rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                Conversion Output
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleCopy}
                  title="Copy conversion"
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
                  title="Share conversion"
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

            {/* Main Result Banner */}
            <div style={{ textAlign: 'center', padding: '1.75rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.85, marginBottom: '0.35rem', fontWeight: 600 }}>
                {inputValue} {fromDef.name} ({fromDef.symbol}) =
              </div>
              <div style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {conversion.formatted} <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{toDef.symbol}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.9, marginTop: '0.5rem' }}>
                {toDef.name}
              </div>
            </div>

            {/* Direct Formula Reference */}
            <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <strong>Unit Ratio: </strong> 1 {fromDef.symbol} = {convertUnit(category, fromDef.id, toDef.id, 1).formatted} {toDef.symbol}
            </div>
          </div>
        </div>
      </div>

      {/* Full Category Conversion Matrix Table */}
      <section style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Complete {currentCategoryData.name} Conversion Table
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Equivalent values for {inputValue} {fromDef.symbol} across all units in this category:
        </p>

        <div style={{ overflowX: 'auto', background: 'var(--surface-solid)', borderRadius: 'var(--md-sys-shape-lg)', border: '1.5px solid var(--border-subtle)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-subtle)', borderBottom: '1.5px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left' }}>Unit</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'left' }}>Symbol</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Converted Value</th>
              </tr>
            </thead>
            <tbody>
              {conversion.allConversions.map(({ unit, value }) => {
                const isSelected = unit.id === toUnit;
                const formattedVal =
                  Math.abs(value) >= 1000000 || (Math.abs(value) > 0 && Math.abs(value) < 0.0001)
                    ? value.toExponential(4)
                    : Number(value.toFixed(6)).toString();

                return (
                  <tr
                    key={unit.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--md-sys-color-primary-container)' : 'transparent',
                      color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--text-primary)'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: isSelected ? 800 : 600 }}>
                      {unit.name}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', color: isSelected ? 'inherit' : 'var(--text-secondary)' }}>
                      {unit.symbol}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      {formattedVal} {unit.symbol}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner slotType="leaderboard" adSlotId="unit-conv-bottom-native" />

      {/* Comprehensive Editorial & Explanatory Article */}
      <CalculatorArticleView
        calculatorId="unit-converter"
        calculatorName="Unit Converter"
        categoryName="Everyday Life"
      />
    </div>
  );
};
