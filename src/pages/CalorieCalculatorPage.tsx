import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import { calculateCalories, CalorieInput, ActivityLevel } from '../utils/calorieEngine';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  Flame,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface CalorieCalculatorPageProps {
  onNavigate: (path: string) => void;
}

export const CalorieCalculatorPage: React.FC<CalorieCalculatorPageProps> = ({ onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.id === 'calorie-calculator') || CALCULATORS_REGISTRY[5];

  const [input, setInput] = useState<CalorieInput>({
    gender: 'male',
    age: 28,
    unitSystem: 'metric',
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 75,
    weightLbs: 165,
    activityLevel: 'moderate',
    formula: 'mifflin'
  });

  const [selectedGoalKey, setSelectedGoalKey] = useState<'standardLoss' | 'maintenance' | 'mildLoss' | 'extremeLoss' | 'mildGain' | 'muscleGain'>('standardLoss');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Calorie Calculator – Daily Calories, BMR & TDEE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Find how many calories you need per day to maintain, lose or gain weight. Uses the Mifflin-St Jeor equation for BMR and your activity level.'
      );
    }
  }, []);

  const result = useMemo(() => calculateCalories(input), [input]);
  const activeGoal = result.targets[selectedGoalKey];

  const handleCopy = () => {
    const text = `Daily Calorie & TDEE Target:\nMaintenance (TDEE): ${result.tdee.toLocaleString()} kcal/day\nBasal Metabolic Rate (BMR): ${result.bmr.toLocaleString()} kcal/day\nTarget for ${activeGoal.name}: ${activeGoal.calories.toLocaleString()} kcal/day\nMacros: ${activeGoal.macros.proteinGrams}g Protein, ${activeGoal.macros.carbGrams}g Carbs, ${activeGoal.macros.fatGrams}g Fat\nCalculated via Calculator360.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calorie & TDEE Target - Calculator360',
          text: `My TDEE is ${result.tdee} kcal. Target for ${activeGoal.name}: ${activeGoal.calories} kcal/day.`,
          url: window.location.href
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const activityOptions: { id: ActivityLevel; title: string; desc: string }[] = [
    { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, little to no exercise' },
    { id: 'light', title: 'Light Activity', desc: '1 - 3 light workouts or sports / week' },
    { id: 'moderate', title: 'Moderate Exercise', desc: '3 - 5 moderate gym/cardio sessions / week' },
    { id: 'active', title: 'Very Active', desc: '6 - 7 hard training sessions / week' },
    { id: 'very-active', title: 'Extra Active', desc: 'Heavy physical job or 2x daily training' }
  ];

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
            <Flame size={22} color="#f97316" />
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Calorie & TDEE Calculator
          </h1>
        </div>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.5 }}>
          Calculate your exact Total Daily Energy Expenditure (TDEE), Basal Metabolic Rate (BMR), and custom caloric targets for fat loss, muscle gain, or maintenance.
        </p>
      </div>

      {/* 2-Column Calculator Grid */}
      <div className="calculator-layout-grid">
        {/* Left Column: Body Metrics Inputs */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Unit System & Gender Switcher */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {/* Metric / Imperial */}
              <div style={{ display: 'flex', background: 'var(--surface-subtle)', padding: '0.25rem', borderRadius: 'var(--md-sys-shape-full)', border: '1px solid var(--border-subtle)' }}>
                <button
                  type="button"
                  onClick={() => setInput({ ...input, unitSystem: 'metric' })}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--md-sys-shape-full)',
                    border: 'none',
                    background: input.unitSystem === 'metric' ? 'var(--surface-solid)' : 'transparent',
                    color: input.unitSystem === 'metric' ? 'var(--primary-600)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: input.unitSystem === 'metric' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Metric (kg, cm)
                </button>
                <button
                  type="button"
                  onClick={() => setInput({ ...input, unitSystem: 'imperial' })}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--md-sys-shape-full)',
                    border: 'none',
                    background: input.unitSystem === 'imperial' ? 'var(--surface-solid)' : 'transparent',
                    color: input.unitSystem === 'imperial' ? 'var(--primary-600)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: input.unitSystem === 'imperial' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  Imperial (lbs, ft/in)
                </button>
              </div>

              {/* Gender */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => setInput({ ...input, gender: 'male' })}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--md-sys-shape-xs)',
                    border: input.gender === 'male' ? '1.5px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                    background: input.gender === 'male' ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                    color: input.gender === 'male' ? 'var(--primary-600)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setInput({ ...input, gender: 'female' })}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--md-sys-shape-xs)',
                    border: input.gender === 'female' ? '1.5px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                    background: input.gender === 'female' ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                    color: input.gender === 'female' ? 'var(--primary-600)' : 'var(--text-secondary)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age & Weight Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={input.age}
                  onChange={e => setInput({ ...input, age: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  Weight ({input.unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  min="20"
                  max="350"
                  value={input.unitSystem === 'metric' ? input.weightKg : input.weightLbs}
                  onChange={e => {
                    const val = Number(e.target.value);
                    if (input.unitSystem === 'metric') {
                      setInput({ ...input, weightKg: val, weightLbs: Math.round(val * 2.20462) });
                    } else {
                      setInput({ ...input, weightLbs: val, weightKg: Math.round((val / 2.20462) * 10) / 10 });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Height Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                Height ({input.unitSystem === 'metric' ? 'Centimeters' : 'Feet & Inches'})
              </label>

              {input.unitSystem === 'metric' ? (
                <input
                  type="number"
                  min="80"
                  max="250"
                  value={input.heightCm}
                  onChange={e => setInput({ ...input, heightCm: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 'var(--md-sys-shape-md)',
                    border: '1.5px solid var(--border-subtle)',
                    background: 'var(--surface-solid)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      placeholder="Feet"
                      min="3"
                      max="7"
                      value={input.heightFt}
                      onChange={e => setInput({ ...input, heightFt: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        borderRadius: 'var(--md-sys-shape-md)',
                        border: '1.5px solid var(--border-subtle)',
                        background: 'var(--surface-solid)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      placeholder="Inches"
                      min="0"
                      max="11"
                      value={input.heightIn}
                      onChange={e => setInput({ ...input, heightIn: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        borderRadius: 'var(--md-sys-shape-md)',
                        border: '1.5px solid var(--border-subtle)',
                        background: 'var(--surface-solid)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Activity Level Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Daily Activity Level
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activityOptions.map(opt => {
                  const isSelected = input.activityLevel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInput({ ...input, activityLevel: opt.id })}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--md-sys-shape-md)',
                        border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? 'var(--primary-600)' : 'var(--text-primary)' }}>
                          {opt.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {opt.desc}
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="var(--primary-600)" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Energy & Targets Results */}
        <div>
          <div className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '1.75rem', background: 'var(--surface-solid)', border: '1.5px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)' }}>
                Metabolic Output
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

            {/* TDEE Highlight */}
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: 'var(--md-sys-shape-lg)', background: 'var(--md-sys-color-primary-container)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--md-sys-color-on-primary-container)', marginBottom: '0.3rem' }}>
                Total Daily Energy Expenditure (TDEE)
              </div>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-on-primary-container)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {result.tdee.toLocaleString()} <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>kcal / day</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-primary-container)', opacity: 0.9, marginTop: '0.5rem' }}>
                Basal Metabolic Rate (BMR): <strong>{result.bmr.toLocaleString()} kcal</strong> (calories burned at rest)
              </div>
            </div>

            {/* Target Goals Matrix */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                Select Goal to View Calories & Macros:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {(['maintenance', 'mildLoss', 'standardLoss', 'extremeLoss', 'mildGain', 'muscleGain'] as const).map(key => {
                  const target = result.targets[key];
                  const isSelected = selectedGoalKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedGoalKey(key)}
                      style={{
                        padding: '0.75rem 0.85rem',
                        borderRadius: 'var(--md-sys-shape-md)',
                        border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--surface-subtle)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? 'var(--primary-600)' : 'var(--text-primary)' }}>
                        {target.name}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isSelected ? 'var(--primary-600)' : 'var(--text-primary)', marginTop: '0.2rem' }}>
                        {target.calories.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>kcal</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {target.paceDescription}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Macronutrient Distribution for Active Goal */}
            <div style={{ padding: '1.25rem', borderRadius: 'var(--md-sys-shape-md)', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Recommended Daily Macros ({activeGoal.calories} kcal)
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Balanced Fitness Split
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                <div style={{ textAlign: 'center', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-xs)', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}>Protein</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444', marginTop: '0.1rem' }}>
                    {activeGoal.macros.proteinGrams}g
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>4 kcal / g</div>
                </div>

                <div style={{ textAlign: 'center', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-xs)', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6' }}>Carbs</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#3b82f6', marginTop: '0.1rem' }}>
                    {activeGoal.macros.carbGrams}g
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>4 kcal / g</div>
                </div>

                <div style={{ textAlign: 'center', padding: '0.65rem', borderRadius: 'var(--md-sys-shape-xs)', background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#eab308' }}>Fats</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#eab308', marginTop: '0.1rem' }}>
                    {activeGoal.macros.fatGrams}g
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>9 kcal / g</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner slotType="leaderboard" adSlotId="calorie-calc-bottom-native" />

      {/* Comprehensive Editorial & Explanatory Article */}
      <CalculatorArticleView
        calculatorId="calorie-calculator"
        calculatorName="Calorie Calculator"
        categoryName="Health"
      />
    </div>
  );
};
