import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { CALCULATORS_REGISTRY } from '../data/calculators';
import {
  calculateSquareFootage,
  calculatePaintQuantity,
  calculateConcrete,
  calculateTileQuantity,
  calculateMulchGravel,
  calculateWallpaper
} from '../utils/constructionEngines';
import { CalculatorArticleView } from '../components/common/CalculatorArticleView';
import {
  HardHat,
  Paintbrush,
  Box,
  Grid,
  Sprout,
  Scroll,
  Copy,
  Check
} from 'lucide-react';

interface ConstructionToolsPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ConstructionToolsPage: React.FC<ConstructionToolsPageProps> = ({ slug, onNavigate }) => {
  const calcMeta = CALCULATORS_REGISTRY.find(c => c.slug === slug) || CALCULATORS_REGISTRY[25];
  const [copied, setCopied] = useState(false);

  // 1. Square Footage State
  const [sfLength, setSfLength] = useState<number>(20);
  const [sfWidth, setSfWidth] = useState<number>(15);
  const [sfWaste, setSfWaste] = useState<number>(10);
  const [sfPrice, setSfPrice] = useState<number>(4.5);

  // 2. Paint State
  const [pLength, setPLength] = useState<number>(16);
  const [pWidth, setPWidth] = useState<number>(14);
  const [pHeight, setPHeight] = useState<number>(9);
  const [pDoors, setPDoors] = useState<number>(1);
  const [pWindows, setPWindows] = useState<number>(2);
  const [pCoats, setPCoats] = useState<number>(2);

  // 3. Concrete State
  const [cShape, setCShape] = useState<'slab' | 'footing' | 'column'>('slab');
  const [cLength, setCLength] = useState<number>(12);
  const [cWidth, setCWidth] = useState<number>(10);
  const [cThickness, setCThickness] = useState<number>(4);
  const [cDiameter, setCDiameter] = useState<number>(12);
  const [cDepth, setCDepth] = useState<number>(4);

  // 4. Tile State
  const [tFloorLength, setTFloorLength] = useState<number>(15);
  const [tFloorWidth, setTFloorWidth] = useState<number>(12);
  const [tTileLength, setTTileLength] = useState<number>(12);
  const [tTileWidth, setTTileWidth] = useState<number>(12);
  const [tWaste, setTWaste] = useState<number>(10);

  // 5. Mulch & Gravel State
  const [mgLength, setMgLength] = useState<number>(25);
  const [mgWidth, setMgWidth] = useState<number>(8);
  const [mgDepth, setMgDepth] = useState<number>(3);

  // 6. Wallpaper State
  const [wpPerimeter, setWpPerimeter] = useState<number>(48);
  const [wpHeight, setWpHeight] = useState<number>(9);



  const sfResult = useMemo(() => {
    return calculateSquareFootage({
      lengthFeet: sfLength,
      widthFeet: sfWidth,
      wastePercent: sfWaste,
      pricePerSqFt: sfPrice
    });
  }, [sfLength, sfWidth, sfWaste, sfPrice]);

  const pResult = useMemo(() => {
    return calculatePaintQuantity({
      lengthFeet: pLength,
      widthFeet: pWidth,
      heightFeet: pHeight,
      doorsCount: pDoors,
      windowsCount: pWindows,
      coatsCount: pCoats
    });
  }, [pLength, pWidth, pHeight, pDoors, pWindows, pCoats]);

  const cResult = useMemo(() => {
    return calculateConcrete({
      shape: cShape,
      lengthFeet: cLength,
      widthFeet: cWidth,
      thicknessInches: cThickness,
      diameterInches: cDiameter,
      depthFeet: cDepth
    });
  }, [cShape, cLength, cWidth, cThickness, cDiameter, cDepth]);

  const tResult = useMemo(() => {
    return calculateTileQuantity({
      floorLengthFeet: tFloorLength,
      floorWidthFeet: tFloorWidth,
      tileLengthInches: tTileLength,
      tileWidthInches: tTileWidth,
      wastePercent: tWaste
    });
  }, [tFloorLength, tFloorWidth, tTileLength, tTileWidth, tWaste]);

  const mgResult = useMemo(() => {
    return calculateMulchGravel({
      lengthFeet: mgLength,
      widthFeet: mgWidth,
      depthInches: mgDepth
    });
  }, [mgLength, mgWidth, mgDepth]);

  const wpResult = useMemo(() => {
    return calculateWallpaper({
      roomPerimeterFeet: wpPerimeter,
      wallHeightFeet: wpHeight
    });
  }, [wpPerimeter, wpHeight]);

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
            {slug === 'square-footage-calculator' && <HardHat size={22} />}
            {slug === 'paint-calculator' && <Paintbrush size={22} />}
            {slug === 'concrete-calculator' && <Box size={22} />}
            {slug === 'tile-calculator' && <Grid size={22} />}
            {slug === 'gravel-and-mulch-calculator' && <Sprout size={22} />}
            {slug === 'wallpaper-calculator' && <Scroll size={22} />}
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
            {/* 1. SQUARE FOOTAGE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'square-footage-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Length (Feet)
                    </label>
                    <input
                      type="number"
                      value={sfLength}
                      onChange={e => setSfLength(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Width (Feet)
                    </label>
                    <input
                      type="number"
                      value={sfWidth}
                      onChange={e => setSfWidth(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Waste Factor ({sfWaste}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="5"
                      value={sfWaste}
                      onChange={e => setSfWaste(Number(e.target.value))}
                      className="m3-slider"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Price per Sq Ft ($)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={sfPrice}
                      onChange={e => setSfPrice(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Area with {sfWaste}% Waste Allowance
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {sfResult.totalSqFt} sq ft
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Equivalent to {sfResult.totalSqMeters} m² (Base: {sfResult.rawSqFt} sq ft + {sfResult.wasteSqFt} sq ft waste)
                  </div>
                  {sfPrice > 0 && (
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                      Estimated Material Cost: ${sfResult.estimatedCost.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 2. PAINT CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'paint-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Length (ft)</label>
                    <input
                      type="number"
                      value={pLength}
                      onChange={e => setPLength(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Width (ft)</label>
                    <input
                      type="number"
                      value={pWidth}
                      onChange={e => setPWidth(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Ceiling Height (ft)</label>
                    <input
                      type="number"
                      value={pHeight}
                      onChange={e => setPHeight(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Doors (subtract)</label>
                    <input
                      type="number"
                      min="0"
                      value={pDoors}
                      onChange={e => setPDoors(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Windows (subtract)</label>
                    <input
                      type="number"
                      min="0"
                      value={pWindows}
                      onChange={e => setPWindows(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Paint Coats</label>
                    <select
                      value={pCoats}
                      onChange={e => setPCoats(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontWeight: 800 }}
                    >
                      <option value={1}>1 Coat</option>
                      <option value={2}>2 Coats (Standard)</option>
                      <option value={3}>3 Coats</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Paint Quantity Needed ({pCoats} coats)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {pResult.gallonsNeeded} Gallons ({pResult.litersNeeded} Liters)
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                    Buy {pResult.recommendedCans1Gal} × 1-Gallon Cans
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Total Coverage Area: {pResult.totalAreaToPaintSqFt} sq ft (Net Wall Area: {pResult.netAreaSqFt} sq ft)
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 3. CONCRETE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'concrete-calculator' && (
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {(['slab', 'footing', 'column'] as const).map(shape => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => setCShape(shape)}
                      className={`m3-segmented-tab ${cShape === shape ? 'active' : ''}`}
                      style={{ flex: 1, padding: '0.45rem', textTransform: 'capitalize' }}
                    >
                      {shape}
                    </button>
                  ))}
                </div>

                {cShape !== 'column' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Length (ft)</label>
                      <input
                        type="number"
                        value={cLength}
                        onChange={e => setCLength(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Width (ft)</label>
                      <input
                        type="number"
                        value={cWidth}
                        onChange={e => setCWidth(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Thickness (inches)</label>
                      <input
                        type="number"
                        value={cThickness}
                        onChange={e => setCThickness(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Diameter (inches)</label>
                      <input
                        type="number"
                        value={cDiameter}
                        onChange={e => setCDiameter(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Depth / Height (ft)</label>
                      <input
                        type="number"
                        value={cDepth}
                        onChange={e => setCDepth(Number(e.target.value) || 0)}
                        className="m3-input-field"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                )}

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Concrete Volume
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {cResult.cubicYards} Cubic Yards
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {cResult.cubicFeet} cu ft ({cResult.cubicMeters} m³)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>60-lb Pre-Mix Bags</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{cResult.bags60lb} Bags</div>
                    </div>
                    <div className="m3-card-filled" style={{ padding: '0.75rem', background: 'var(--surface-solid)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>80-lb Pre-Mix Bags</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{cResult.bags80lb} Bags</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 4. TILE CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'tile-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Room Length (ft)</label>
                    <input
                      type="number"
                      value={tFloorLength}
                      onChange={e => setTFloorLength(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Room Width (ft)</label>
                    <input
                      type="number"
                      value={tFloorWidth}
                      onChange={e => setTFloorWidth(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Tile Width (in)</label>
                    <input
                      type="number"
                      value={tTileWidth}
                      onChange={e => setTTileWidth(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Tile Length (in)</label>
                    <input
                      type="number"
                      value={tTileLength}
                      onChange={e => setTTileLength(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Cut Waste %</label>
                    <input
                      type="number"
                      value={tWaste}
                      onChange={e => setTWaste(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Tiles Needed (with {tWaste}% cut waste)
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {tResult.totalTilesWithWaste} Tiles
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    Estimated {tResult.boxesNeeded} Boxes (based on 10 tiles/box)
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                    Floor Area: {tResult.floorSqFt} sq ft
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 5. GRAVEL AND MULCH CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'gravel-and-mulch-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Bed Length (ft)</label>
                    <input
                      type="number"
                      value={mgLength}
                      onChange={e => setMgLength(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Bed Width (ft)</label>
                    <input
                      type="number"
                      value={mgWidth}
                      onChange={e => setMgWidth(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Layer Depth (in)</label>
                    <input
                      type="number"
                      value={mgDepth}
                      onChange={e => setMgDepth(Number(e.target.value) || 1)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Total Material Volume
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--accent-emerald)', margin: '0.35rem 0' }}>
                    {mgResult.cubicYards} Cubic Yards
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {mgResult.cubicFeet} Cubic Feet ({mgResult.bags2CuFt} × 2-cu ft bags)
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
                    If Gravel / Stone: Approx. {mgResult.tonsGravel} Tons
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* 6. WALLPAPER CALCULATOR */}
            {/* ======================================================= */}
            {slug === 'wallpaper-calculator' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Room Total Perimeter (ft)
                    </label>
                    <input
                      type="number"
                      value={wpPerimeter}
                      onChange={e => setWpPerimeter(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.35rem' }}>
                      Wall Height (ft)
                    </label>
                    <input
                      type="number"
                      value={wpHeight}
                      onChange={e => setWpHeight(Number(e.target.value) || 0)}
                      className="m3-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--md-sys-shape-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Wallpaper Rolls Needed
                  </div>
                  <div className="value-pop" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--md-sys-color-primary)', margin: '0.35rem 0' }}>
                    {wpResult.rollsNeeded} Standard Rolls
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Total Wall Area: {wpResult.totalWallAreaSqFt} sq ft (includes 15% pattern drop & cut waste)
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Copy Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => handleCopy(`Construction calculation: ${calcMeta.title}`)}
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
        categoryName="construction"
      />
    </div>
  );
};
