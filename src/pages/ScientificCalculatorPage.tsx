import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Binary,
  Copy,
  Check,
  History,
  Delete
} from 'lucide-react';

interface ScientificCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const ScientificCalculatorPage: React.FC<ScientificCalculatorPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'scientific-calculator') || CALCULATORS_REGISTRY[19];

  const [expression, setExpression] = useState('');
  const [displayValue, setDisplayValue] = useState('0');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [memory, setMemory] = useState<number>(0);
  const [historyList, setHistoryList] = useState<Array<{ expr: string; res: string }>>([]);
  const [isInverse, setIsInverse] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    setExpression('');
    setDisplayValue('0');
  };

  const handleBackspace = () => {
    if (displayValue.length > 1 && displayValue !== 'Error') {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  const handleDigit = (digit: string) => {
    if (displayValue === '0' || displayValue === 'Error') {
      setDisplayValue(digit);
    } else {
      setDisplayValue(displayValue + digit);
    }
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (op: string) => {
    setExpression(`${displayValue} ${op} `);
    setDisplayValue('0');
  };

  const evaluateScientific = () => {
    try {
      const fullExpr = expression + displayValue;
      // Sanitize and replace math functions
      let safeExpr = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());

      // Safe JS math evaluation for basic expressions
      // eslint-disable-next-line no-new-func
      const calcResult = Function(`"use strict"; return (${safeExpr})`)();
      const rounded = Number(calcResult.toFixed(10)).toString();

      setHistoryList(prev => [{ expr: fullExpr, res: rounded }, ...prev.slice(0, 9)]);
      setDisplayValue(rounded);
      setExpression('');
    } catch {
      setDisplayValue('Error');
    }
  };

  const handleScientificFunction = (fn: string) => {
    const val = parseFloat(displayValue);
    if (isNaN(val)) return;

    let res = 0;
    const rad = angleMode === 'deg' ? (val * Math.PI) / 180 : val;

    switch (fn) {
      case 'sin':
        res = isInverse ? (Math.asin(val) * (angleMode === 'deg' ? 180 / Math.PI : 1)) : Math.sin(rad);
        break;
      case 'cos':
        res = isInverse ? (Math.acos(val) * (angleMode === 'deg' ? 180 / Math.PI : 1)) : Math.cos(rad);
        break;
      case 'tan':
        res = isInverse ? (Math.atan(val) * (angleMode === 'deg' ? 180 / Math.PI : 1)) : Math.tan(rad);
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log':
        res = Math.log10(val);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'sqr':
        res = Math.pow(val, 2);
        break;
      case 'fact':
        res = factorial(Math.round(val));
        break;
      case 'inv':
        res = val !== 0 ? 1 / val : 0;
        break;
      case 'pct':
        res = val / 100;
        break;
      case 'neg':
        res = -val;
        break;
    }

    const rounded = Number(res.toFixed(10)).toString();
    setDisplayValue(rounded);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) r *= i;
    return r;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      else if (e.key === '.') handleDecimal();
      else if (e.key === '+' || e.key === '-') handleOperator(e.key);
      else if (e.key === '*') handleOperator('×');
      else if (e.key === '/') handleOperator('÷');
      else if (e.key === 'Enter' || e.key === '=') evaluateScientific();
      else if (e.key === 'Backspace') handleBackspace();
      else if (e.key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Breadcrumbs currentCalculator={calcMeta} onHomeClick={() => onNavigate('/')} />
      </div>

      {/* Hero Title */}
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
            <Binary size={22} />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Scientific Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Advanced scientific calculator featuring trigonometry, logarithms, roots, exponential powers, factorials, memory registers, and real-time history tape.
        </p>
      </div>

      {/* 2-Column Layout: Keypad on Left, History & Features on Right */}
      <div className="calculator-layout-grid">
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem', maxWidth: '640px' }}>
            {/* Screen Display */}
            <div style={{
              background: 'var(--surface-subtle)',
              border: '2px solid var(--border-subtle)',
              borderRadius: 'var(--md-sys-shape-lg)',
              padding: '1.25rem',
              textAlign: 'right',
              marginBottom: '1.25rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--md-sys-color-primary)', textTransform: 'uppercase' }}>
                  {angleMode.toUpperCase()} | MEM: {memory}
                </span>
                <span style={{ minHeight: '1.1rem' }}>{expression}</span>
              </div>
              <div style={{
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
              }}>
                {displayValue}
              </div>
            </div>

            {/* Mode & Memory Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div className="m3-segmented-control" style={{ maxWidth: '140px' }}>
                <button
                  type="button"
                  onClick={() => setAngleMode('deg')}
                  className={`m3-segmented-tab ${angleMode === 'deg' ? 'active' : ''}`}
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                >
                  DEG
                </button>
                <button
                  type="button"
                  onClick={() => setAngleMode('rad')}
                  className={`m3-segmented-tab ${angleMode === 'rad' ? 'active' : ''}`}
                  style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                >
                  RAD
                </button>
              </div>

              {/* Memory Register buttons */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setMemory(0)}
                  className="m3-preset-pill"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  MC
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayValue(memory.toString())}
                  className="m3-preset-pill"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  MR
                </button>
                <button
                  type="button"
                  onClick={() => setMemory(prev => prev + parseFloat(displayValue || '0'))}
                  className="m3-preset-pill"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  M+
                </button>
                <button
                  type="button"
                  onClick={() => setMemory(prev => prev - parseFloat(displayValue || '0'))}
                  className="m3-preset-pill"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  M-
                </button>
              </div>
            </div>

            {/* Scientific Keypad Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '0.5rem'
            }}>
              {/* Row 1 */}
              <button type="button" onClick={() => setIsInverse(!isInverse)} className={`calc-key ${isInverse ? 'calc-key-active' : 'calc-key-fn'}`}>
                {isInverse ? 'INV*' : 'INV'}
              </button>
              <button type="button" onClick={() => handleScientificFunction('sin')} className="calc-key calc-key-fn">
                {isInverse ? 'sin⁻¹' : 'sin'}
              </button>
              <button type="button" onClick={() => handleScientificFunction('cos')} className="calc-key calc-key-fn">
                {isInverse ? 'cos⁻¹' : 'cos'}
              </button>
              <button type="button" onClick={() => handleScientificFunction('tan')} className="calc-key calc-key-fn">
                {isInverse ? 'tan⁻¹' : 'tan'}
              </button>
              <button type="button" onClick={handleClear} className="calc-key calc-key-danger">
                AC
              </button>

              {/* Row 2 */}
              <button type="button" onClick={() => handleScientificFunction('ln')} className="calc-key calc-key-fn">
                ln
              </button>
              <button type="button" onClick={() => handleScientificFunction('log')} className="calc-key calc-key-fn">
                log
              </button>
              <button type="button" onClick={() => handleScientificFunction('sqrt')} className="calc-key calc-key-fn">
                √
              </button>
              <button type="button" onClick={() => handleScientificFunction('sqr')} className="calc-key calc-key-fn">
                x²
              </button>
              <button type="button" onClick={handleBackspace} className="calc-key calc-key-fn">
                <Delete size={16} />
              </button>

              {/* Row 3 */}
              <button type="button" onClick={() => handleScientificFunction('fact')} className="calc-key calc-key-fn">
                x!
              </button>
              <button type="button" onClick={() => handleDigit('7')} className="calc-key calc-key-num">
                7
              </button>
              <button type="button" onClick={() => handleDigit('8')} className="calc-key calc-key-num">
                8
              </button>
              <button type="button" onClick={() => handleDigit('9')} className="calc-key calc-key-num">
                9
              </button>
              <button type="button" onClick={() => handleOperator('÷')} className="calc-key calc-key-op">
                ÷
              </button>

              {/* Row 4 */}
              <button type="button" onClick={() => setDisplayValue(Math.PI.toString())} className="calc-key calc-key-fn">
                π
              </button>
              <button type="button" onClick={() => handleDigit('4')} className="calc-key calc-key-num">
                4
              </button>
              <button type="button" onClick={() => handleDigit('5')} className="calc-key calc-key-num">
                5
              </button>
              <button type="button" onClick={() => handleDigit('6')} className="calc-key calc-key-num">
                6
              </button>
              <button type="button" onClick={() => handleOperator('×')} className="calc-key calc-key-op">
                ×
              </button>

              {/* Row 5 */}
              <button type="button" onClick={() => setDisplayValue(Math.E.toString())} className="calc-key calc-key-fn">
                e
              </button>
              <button type="button" onClick={() => handleDigit('1')} className="calc-key calc-key-num">
                1
              </button>
              <button type="button" onClick={() => handleDigit('2')} className="calc-key calc-key-num">
                2
              </button>
              <button type="button" onClick={() => handleDigit('3')} className="calc-key calc-key-num">
                3
              </button>
              <button type="button" onClick={() => handleOperator('-')} className="calc-key calc-key-op">
                −
              </button>

              {/* Row 6 */}
              <button type="button" onClick={() => handleScientificFunction('neg')} className="calc-key calc-key-fn">
                ±
              </button>
              <button type="button" onClick={() => handleDigit('0')} className="calc-key calc-key-num">
                0
              </button>
              <button type="button" onClick={handleDecimal} className="calc-key calc-key-num">
                .
              </button>
              <button type="button" onClick={evaluateScientific} className="calc-key calc-key-primary">
                =
              </button>
              <button type="button" onClick={() => handleOperator('+')} className="calc-key calc-key-op">
                +
              </button>
            </div>

            {/* Copy Button */}
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
                style={{ padding: '0.55rem 1.2rem', fontSize: '0.825rem' }}
              >
                {copied ? <Check size={16} color="#146c2e" /> : <Copy size={16} />}
                <span>{copied ? '✓ Copied Value' : 'Copy Value'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: History Tape & Quick Reference */}
        <aside className="calculator-sidebar">
          {/* History Tape */}
          <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <History size={16} color="var(--primary-500)" />
                <span>History Log</span>
              </h4>
              {historyList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistoryList([])}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  Clear
                </button>
              )}
            </div>

            {historyList.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.5rem 0' }}>
                Your completed calculations will appear here.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '240px', overflowY: 'auto' }}>
                {historyList.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setDisplayValue(item.res)}
                    style={{
                      background: 'var(--surface-subtle)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)',
                      textAlign: 'right'
                    }}
                    title="Click to recall result"
                  >
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.expr} =</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>{item.res}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.5rem', background: 'var(--surface-solid)' }}>
            <AdBanner slotType="rectangle" />
          </div>
        </aside>
      </div>

      {/* Editorial Article */}
      <CalculatorArticleView
        calculatorId="scientific-calculator"
        calculatorName="Scientific Calculator"
        categoryName="math"
      />
    </div>
  );
};
