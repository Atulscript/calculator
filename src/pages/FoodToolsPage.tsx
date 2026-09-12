import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateRecipeScale,
  calculateBakingConversion,
  calculateCookingTime,
  calculateCoffeeRatio,
  BAKING_DENSITIES,
  MEAT_ROAST_TABLE,
  COFFEE_PRESETS,
  RecipeIngredient
} from '../utils/foodEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  UtensilsCrossed,
  CupSoda,
  Flame,
  Coffee,
  Plus,
  Trash2,
  Copy,
  Check
} from 'lucide-react';

interface FoodToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const FoodToolsPage: React.FC<FoodToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[29];
  const [copied, setCopied] = useState(false);

  // 1. Recipe State
  const [origServings, setOrigServings] = useState<number>(4);
  const [targetServings, setTargetServings] = useState<number>(8);
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
    { id: '1', name: 'All-Purpose Flour', amount: 2, unit: 'cups' },
    { id: '2', name: 'Granulated Sugar', amount: 1, unit: 'cup' },
    { id: '3', name: 'Butter', amount: 0.5, unit: 'cup' },
    { id: '4', name: 'Baking Powder', amount: 2, unit: 'tsp' }
  ]);

  // 2. Baking State
  const [bakeIng, setBakeIng] = useState<string>('all_purpose_flour');
  const [bakeVal, setBakeVal] = useState<number>(1);
  const [bakeUnit, setBakeUnit] = useState<'cups' | 'tbsp' | 'tsp' | 'grams' | 'ounces'>('cups');

  // 3. Cooking Time State
  const [meatKey, setMeatKey] = useState<string>('whole_turkey');
  const [meatWeight, setMeatWeight] = useState<number>(12); // 12 lbs

  // 4. Coffee Ratio State
  const [coffeeMethod, setCoffeeMethod] = useState<string>('pourover');
  const [coffeeMode, setCoffeeMode] = useState<'by_coffee' | 'by_water'>('by_coffee');
  const [coffeeInput, setCoffeeInput] = useState<number>(20); // 20g beans



  const recipeResult = useMemo(() => {
    return calculateRecipeScale(ingredients, origServings, targetServings);
  }, [ingredients, origServings, targetServings]);

  const bakeResult = useMemo(() => {
    return calculateBakingConversion(bakeIng, bakeVal, bakeUnit);
  }, [bakeIng, bakeVal, bakeUnit]);

  const cookResult = useMemo(() => {
    return calculateCookingTime(meatKey, meatWeight);
  }, [meatKey, meatWeight]);

  const coffeeResult = useMemo(() => {
    return calculateCoffeeRatio(coffeeMethod, coffeeInput, coffeeMode);
  }, [coffeeMethod, coffeeInput, coffeeMode]);

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
            {slug === 'recipe-converter' && <UtensilsCrossed size={22} />}
            {slug === 'baking-conversion-calculator' && <CupSoda size={22} />}
            {slug === 'cooking-time-calculator' && <Flame size={22} />}
            {slug === 'coffee-water-ratio-calculator' && <Coffee size={22} />}
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
            {/* 1. RECIPE SCALER */}
            {/* ======================================================= */}
            {slug === 'recipe-converter' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Original Servings
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={origServings}
                      onChange={e => setOrigServings(Math.max(1, Number(e.target.value) || 1))}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Desired Target Servings ({recipeResult.multiplier}x)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={targetServings}
                      onChange={e => setTargetServings(Math.max(1, Number(e.target.value) || 1))}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>Ingredients List</span>
                    <button
                      type="button"
                      onClick={() => setIngredients(prev => [...prev, { id: Date.now().toString(), name: 'New Ingredient', amount: 1, unit: 'cup' }])}
                      className="m3-preset-pill active"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <Plus size={14} />
                      <span>Add Ingredient</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {ingredients.map(ing => (
                      <div key={ing.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 2fr) auto', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="number"
                          step="0.25"
                          value={ing.amount}
                          onChange={e => setIngredients(prev => prev.map(item => item.id === ing.id ? { ...item, amount: Number(e.target.value) || 0 } : item))}
                          className="m3-input-field"
                          placeholder="Amount"
                        />
                        <input
                          type="text"
                          value={ing.unit}
                          onChange={e => setIngredients(prev => prev.map(item => item.id === ing.id ? { ...item, unit: e.target.value } : item))}
                          className="m3-input-field"
                          placeholder="Unit (cup, tsp)"
                        />
                        <input
                          type="text"
                          value={ing.name}
                          onChange={e => setIngredients(prev => prev.map(item => item.id === ing.id ? { ...item, name: e.target.value } : item))}
                          className="m3-input-field"
                          placeholder="Ingredient name"
                        />
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setIngredients(prev => prev.filter(item => item.id !== ing.id))}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                    Scaled Recipe Output ({targetServings} servings):
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {recipeResult.ingredients.map(item => (
                      <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: 'var(--md-sys-color-primary)', fontWeight: 900 }}>•</span>
                        <strong>{item.scaledAmount} {item.unit}</strong> {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. BAKING INGREDIENT CUPS TO GRAMS */}
            {/* ======================================================= */}
            {slug === 'baking-conversion-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Select Baking Ingredient
                  </label>
                  <select
                    value={bakeIng}
                    onChange={e => setBakeIng(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                  >
                    {Object.entries(BAKING_DENSITIES).map(([k, v]) => (
                      <option key={k} value={k}>{v.name} (1 cup = {v.gramsPerCup}g)</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Input Amount
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={bakeVal}
                      onChange={e => setBakeVal(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Input Unit
                    </label>
                    <select
                      value={bakeUnit}
                      onChange={e => setBakeUnit(e.target.value as any)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                    >
                      <option value="cups">Cups</option>
                      <option value="tbsp">Tablespoons (tbsp)</option>
                      <option value="tsp">Teaspoons (tsp)</option>
                      <option value="grams">Grams (g)</option>
                      <option value="ounces">Ounces (oz)</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Converted Weight
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {bakeResult.grams} Grams
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {bakeResult.ounces} oz | {bakeResult.cups} Cups | {bakeResult.tablespoons} Tbsp
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. ROASTING TIME & MEAT TEMP CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'cooking-time-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Select Meat Type
                  </label>
                  <select
                    value={meatKey}
                    onChange={e => setMeatKey(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                  >
                    {Object.entries(MEAT_ROAST_TABLE).map(([k, v]) => (
                      <option key={k} value={k}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Weight: {meatWeight} lbs ({(meatWeight * 0.453592).toFixed(1)} kg)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="28"
                    step="0.5"
                    value={meatWeight}
                    onChange={e => setMeatWeight(Number(e.target.value))}
                    className="m3-slider"
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Roasting Time
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-amber)', margin: '0.35rem 0' }}>
                    {cookResult.hours}h {cookResult.minutes}m
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Oven Temp: {cookResult.ovenTempFormatted}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>USDA SAFE INTERNAL TEMP</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--accent-rose)' }}>{cookResult.internalTargetFormatted}</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RESTING TIME BEFORE CARVING</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-primary)' }}>{cookResult.guide.restingMinutes} Minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. COFFEE BREWING RATIO CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'coffee-water-ratio-calculator' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    Brew Method
                  </label>
                  <select
                    value={coffeeMethod}
                    onChange={e => setCoffeeMethod(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                  >
                    {Object.entries(COFFEE_PRESETS).map(([k, v]) => (
                      <option key={k} value={k}>{v.name} (1:{v.ratioWaterToCoffee})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    type="button"
                    onClick={() => { setCoffeeMode('by_coffee'); setCoffeeInput(20); }}
                    className={`m3-segmented-tab ${coffeeMode === 'by_coffee' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    By Coffee Beans (grams)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setCoffeeMode('by_water'); setCoffeeInput(350); }}
                    className={`m3-segmented-tab ${coffeeMode === 'by_water' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '0.4rem' }}
                  >
                    By Water Amount (ml)
                  </button>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                    {coffeeMode === 'by_coffee' ? 'Coffee Beans (Grams)' : 'Water Volume (ml / grams)'}
                  </label>
                  <input
                    type="number"
                    value={coffeeInput}
                    onChange={e => setCoffeeInput(Number(e.target.value) || 0)}
                    className="m3-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COFFEE BEANS</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-amber)' }}>{coffeeResult.coffeeGrams}g</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.85rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WATER VOLUME</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>{coffeeResult.waterGramsMl} ml</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Yields ~{coffeeResult.cupsYield} cups (6 oz each) | Recommended Grind: <strong>{coffeeResult.grindSize}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Copy Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Kitchen calculation for: ${calcMeta.title}`)}
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
        categoryName="food"
      />
    </div>
  );
};
