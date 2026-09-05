export type UnitCategory = 'length' | 'mass' | 'temperature' | 'speed' | 'area' | 'digital';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

export const UNIT_CATEGORIES: Record<UnitCategory, { name: string; baseUnit: string; units: UnitDefinition[] }> = {
  length: {
    name: 'Length & Distance',
    baseUnit: 'm',
    units: [
      { id: 'm', name: 'Meters', symbol: 'm', toBase: v => v, fromBase: v => v },
      { id: 'km', name: 'Kilometers', symbol: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cm', name: 'Centimeters', symbol: 'cm', toBase: v => v / 100, fromBase: v => v * 100 },
      { id: 'mm', name: 'Millimeters', symbol: 'mm', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'in', name: 'Inches', symbol: 'in', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'ft', name: 'Feet', symbol: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'yd', name: 'Yards', symbol: 'yd', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { id: 'mi', name: 'Miles', symbol: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { id: 'nmi', name: 'Nautical Miles', symbol: 'nmi', toBase: v => v * 1852, fromBase: v => v / 1852 }
    ]
  },
  mass: {
    name: 'Weight & Mass',
    baseUnit: 'kg',
    units: [
      { id: 'kg', name: 'Kilograms', symbol: 'kg', toBase: v => v, fromBase: v => v },
      { id: 'g', name: 'Grams', symbol: 'g', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'mg', name: 'Milligrams', symbol: 'mg', toBase: v => v / 1000000, fromBase: v => v * 1000000 },
      { id: 'lb', name: 'Pounds', symbol: 'lbs', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { id: 'oz', name: 'Ounces', symbol: 'oz', toBase: v => v * 0.028349523125, fromBase: v => v / 0.028349523125 },
      { id: 'st', name: 'Stones', symbol: 'st', toBase: v => v * 6.35029318, fromBase: v => v / 6.35029318 },
      { id: 't', name: 'Metric Tons', symbol: 't', toBase: v => v * 1000, fromBase: v => v / 1000 }
    ]
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'C',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', toBase: v => v, fromBase: v => v },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', toBase: v => ((v - 32) * 5) / 9, fromBase: v => (v * 9) / 5 + 32 },
      { id: 'K', name: 'Kelvin', symbol: 'K', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
      { id: 'R', name: 'Rankine', symbol: '°R', toBase: v => ((v - 491.67) * 5) / 9, fromBase: v => (v * 9) / 5 + 491.67 }
    ]
  },
  speed: {
    name: 'Speed & Velocity',
    baseUnit: 'mps',
    units: [
      { id: 'mps', name: 'Meters / second', symbol: 'm/s', toBase: v => v, fromBase: v => v },
      { id: 'kmh', name: 'Kilometers / hour', symbol: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { id: 'mph', name: 'Miles / hour', symbol: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { id: 'knot', name: 'Knots', symbol: 'kn', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
      { id: 'mach', name: 'Mach (in air @ 20°C)', symbol: 'M', toBase: v => v * 343, fromBase: v => v / 343 }
    ]
  },
  area: {
    name: 'Area & Surface',
    baseUnit: 'sqm',
    units: [
      { id: 'sqm', name: 'Square Meters', symbol: 'm²', toBase: v => v, fromBase: v => v },
      { id: 'sqkm', name: 'Square Kilometers', symbol: 'km²', toBase: v => v * 1000000, fromBase: v => v / 1000000 },
      { id: 'sqft', name: 'Square Feet', symbol: 'ft²', toBase: v => v * 0.09290304, fromBase: v => v / 0.09290304 },
      { id: 'sqyd', name: 'Square Yards', symbol: 'yd²', toBase: v => v * 0.83612736, fromBase: v => v / 0.83612736 },
      { id: 'acre', name: 'Acres', symbol: 'ac', toBase: v => v * 4046.8564224, fromBase: v => v / 4046.8564224 },
      { id: 'ha', name: 'Hectares', symbol: 'ha', toBase: v => v * 10000, fromBase: v => v / 10000 },
      { id: 'sqmi', name: 'Square Miles', symbol: 'mi²', toBase: v => v * 2589988.11, fromBase: v => v / 2589988.11 }
    ]
  },
  digital: {
    name: 'Digital Data Storage',
    baseUnit: 'byte',
    units: [
      { id: 'bit', name: 'Bits', symbol: 'b', toBase: v => v / 8, fromBase: v => v * 8 },
      { id: 'byte', name: 'Bytes', symbol: 'B', toBase: v => v, fromBase: v => v },
      { id: 'kb', name: 'Kilobytes (KB)', symbol: 'KB', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mb', name: 'Megabytes (MB)', symbol: 'MB', toBase: v => v * 1024 * 1024, fromBase: v => v / (1024 * 1024) },
      { id: 'gb', name: 'Gigabytes (GB)', symbol: 'GB', toBase: v => v * 1024 * 1024 * 1024, fromBase: v => v / (1024 * 1024 * 1024) },
      { id: 'tb', name: 'Terabytes (TB)', symbol: 'TB', toBase: v => v * Math.pow(1024, 4), fromBase: v => v / Math.pow(1024, 4) }
    ]
  }
};

export function convertUnit(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number
): { result: number; formatted: string; allConversions: { unit: UnitDefinition; value: number }[] } {
  const cat = UNIT_CATEGORIES[category];
  const fromDef = cat.units.find(u => u.id === fromUnitId) || cat.units[0];
  const toDef = cat.units.find(u => u.id === toUnitId) || cat.units[1];

  const baseVal = fromDef.toBase(value || 0);
  const convertedVal = toDef.fromBase(baseVal);

  const allConversions = cat.units.map(u => ({
    unit: u,
    value: u.fromBase(baseVal)
  }));

  const formatted =
    Math.abs(convertedVal) >= 1000000 || (Math.abs(convertedVal) > 0 && Math.abs(convertedVal) < 0.0001)
      ? convertedVal.toExponential(4)
      : Number(convertedVal.toFixed(6)).toString();

  return {
    result: convertedVal,
    formatted,
    allConversions
  };
}
