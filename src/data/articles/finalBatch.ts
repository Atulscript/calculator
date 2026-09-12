import { CalculatorArticle } from '../../types/article';

const CONV = { name: 'Calculator11 Editorial Team', role: 'Education & Mathematics Desk', lastUpdated: 'September 2026' };
const BUILD = { name: 'Calculator11 Editorial Team', role: 'Construction & DIY Desk', lastUpdated: 'September 2026' };
const FOOD = { name: 'Calculator11 Editorial Team', role: 'Food & Kitchen Desk', lastUpdated: 'September 2026' };

const MATERIAL_DISC = 'Coverage rates vary by product, surface and application method. Confirm figures with the manufacturer and buy from a single batch where colour matching matters.';

/** Unit converters, construction materials and cooking articles. */
export const FINAL_BATCH_ARTICLES: Record<string, CalculatorArticle> = {
  'length-converter': {
    calculatorId: 'length-converter',
    title: 'Length Converter',
    subtitle: 'Convert length and distance across metric and imperial units, with exact factors and no rounding drift.',
    readTimeMinutes: 3,
    author: CONV,
    overview: [
      'Length conversion is straightforward arithmetic, but rounding errors creep in when you chain conversions or use approximate factors. The inch is defined as exactly 25.4 mm, so every imperial-metric length conversion can be exact.'
    ],
    formulaCard: {
      title: 'Key Conversion Factors',
      formula: '1 inch = 25.4 mm exactly',
      explanation: 'Everything else follows: 1 foot = 304.8 mm, 1 yard = 0.9144 m, 1 mile = 1.609344 km. These are definitions, not measurements, so they are exact.',
      variables: [
        { symbol: '1 cm', meaning: '0.3937 inches' },
        { symbol: '1 m', meaning: '3.2808 feet' },
        { symbol: '1 km', meaning: '0.6214 miles' },
        { symbol: '1 nautical mile', meaning: '1.852 km exactly' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Length Converter',
      steps: [
        { stepNumber: 1, title: 'Enter a value', description: 'In whichever unit you have.' },
        { stepNumber: 2, title: 'Pick the target unit', description: 'All others update simultaneously.' },
        { stepNumber: 3, title: 'Convert once, not twice', description: 'Chaining conversions compounds rounding error.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting a 6 ft 2 in height to centimetres.',
      inputs: [{ label: 'Height', value: '6 ft 2 in' }],
      steps: [
        'Total inches = (6 × 12) + 2 = 74 inches.',
        '74 × 2.54 = 187.96 cm.',
        'Rounded: 188 cm.'
      ],
      result: '6 ft 2 in = 187.96 cm',
      takeaway: 'Convert the whole quantity to a single unit first. Converting feet and inches separately then adding introduces avoidable rounding.'
    },
    faqs: [
      { question: 'How many centimetres in an inch?', answer: 'Exactly 2.54 cm. This is a definition rather than a measurement, so the conversion is exact in both directions.' },
      { question: 'How do I convert feet and inches to metres?', answer: 'Convert everything to inches first, multiply by 0.0254 for metres. So 5 ft 9 in is 69 inches, which is 1.7526 m.' },
      { question: 'Why do some conversions give slightly different answers?', answer: 'Rounded factors. Using 2.5 instead of 2.54 for inches to centimetres introduces about 1.6% error, which compounds if you convert twice.' }
    ]
  },

  'weight-converter': {
    calculatorId: 'weight-converter',
    title: 'Weight Converter',
    subtitle: 'Convert weight and mass between metric and imperial, including stone for UK body weight.',
    readTimeMinutes: 3,
    author: CONV,
    overview: [
      'Weight conversion is complicated by there being several different pounds and tons in historical use. Modern conversions use the international avoirdupois pound, defined as exactly 0.45359237 kg.',
      'Stone, still common for body weight in the UK and Ireland, is 14 pounds.'
    ],
    formulaCard: {
      title: 'Key Conversion Factors',
      formula: '1 pound = 0.45359237 kg exactly',
      explanation: '1 kg = 2.20462 lb. 1 stone = 14 lb = 6.35029 kg. 1 ounce = 28.3495 g. A metric tonne is 1,000 kg; a US short ton is 907.18 kg; a UK long ton is 1,016.05 kg.',
      variables: [
        { symbol: 'Stone', meaning: '14 pounds — UK and Irish body weight' },
        { symbol: 'Tonne', meaning: '1,000 kg metric' },
        { symbol: 'Short ton', meaning: '2,000 lb — US' },
        { symbol: 'Long ton', meaning: '2,240 lb — imperial' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Weight Converter',
      steps: [
        { stepNumber: 1, title: 'Enter a value and unit', description: 'Stone and pounds can be entered together.' },
        { stepNumber: 2, title: 'Read all equivalents', description: 'Updated simultaneously.' },
        { stepNumber: 3, title: 'Be specific about tons', description: 'Metric, short and long tons differ by over 10%.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting 11 stone 4 pounds to kilograms.',
      inputs: [{ label: 'Weight', value: '11 st 4 lb' }],
      steps: [
        'Total pounds = (11 × 14) + 4 = 158 lb.',
        '158 × 0.45359237 = 71.67 kg.'
      ],
      result: '11 st 4 lb = 71.67 kg',
      takeaway: 'Stone is a compound unit, so convert to pounds first. Treating 11.4 stone as a decimal would give 72.4 kg — wrong, because 4 pounds is 0.286 of a stone, not 0.4.'
    },
    faqs: [
      { question: 'How many kilograms in a stone?', answer: '6.35 kg. One stone is 14 pounds, and a pound is 0.45359237 kg.' },
      { question: 'What is the difference between mass and weight?', answer: 'Mass is the amount of matter, measured in kilograms. Weight is the gravitational force on that mass, properly measured in newtons. Everyday usage treats them as the same because Earth\'s gravity is effectively constant.' },
      { question: 'Which ton should I use?', answer: 'It depends on context. Metric tonne is 1,000 kg, US short ton 907 kg, UK long ton 1,016 kg. Shipping and commodities usually specify which, and the difference is large enough to matter.' }
    ]
  },

  'speed-converter': {
    calculatorId: 'speed-converter',
    title: 'Speed Converter',
    subtitle: 'Convert speed between mph, km/h, metres per second, knots and Mach.',
    readTimeMinutes: 2,
    author: CONV,
    overview: [
      'Different fields use different speed units by convention — road signs in mph or km/h, aviation and shipping in knots, physics in metres per second. Converting between them is simple once you know the factors.'
    ],
    formulaCard: {
      title: 'Key Conversion Factors',
      formula: '1 m/s = 3.6 km/h',
      explanation: '1 mph = 1.609344 km/h. 1 knot = 1.852 km/h, being one nautical mile per hour. Mach is relative to the local speed of sound, which varies with temperature and altitude.',
      variables: [
        { symbol: 'Knot', meaning: 'One nautical mile per hour' },
        { symbol: 'Mach 1', meaning: '≈1,235 km/h at sea level, less at altitude' },
        { symbol: 'm/s → km/h', meaning: 'Multiply by 3.6' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Speed Converter',
      steps: [
        { stepNumber: 1, title: 'Enter a speed and unit', description: 'All equivalents update together.' },
        { stepNumber: 2, title: 'Note the Mach caveat', description: 'It depends on air temperature, so the sea-level figure is indicative only.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting a 70 mph motorway limit.',
      inputs: [{ label: 'Speed', value: '70 mph' }],
      steps: [
        'km/h: 70 × 1.609344 = 112.65 km/h.',
        'm/s: 112.65 ÷ 3.6 = 31.3 m/s.',
        'knots: 112.65 ÷ 1.852 = 60.8 knots.'
      ],
      result: '70 mph = 112.65 km/h = 31.3 m/s = 60.8 knots',
      takeaway: 'The UK 70 mph limit is very close to the 112 km/h used in several European countries, which is why the two feel comparable to drive.'
    },
    faqs: [
      { question: 'How do I convert m/s to km/h quickly?', answer: 'Multiply by 3.6. It comes from 3,600 seconds in an hour divided by 1,000 metres in a kilometre.' },
      { question: 'Why do ships and aircraft use knots?', answer: 'Because a nautical mile is one minute of latitude, which makes navigation calculations on charts far simpler. One knot is one nautical mile per hour.' },
      { question: 'Is Mach 1 always the same speed?', answer: 'No. It is the local speed of sound, which depends on air temperature. Roughly 1,235 km/h at sea level, falling to about 1,062 km/h at cruising altitude.' }
    ]
  },

  'area-converter': {
    calculatorId: 'area-converter',
    title: 'Area Converter',
    subtitle: 'Convert area between square metres, square feet, acres, hectares and regional land units.',
    readTimeMinutes: 3,
    author: CONV,
    overview: [
      'Area conversion catches people out because the factor is the square of the linear one. A metre is 3.28 feet, but a square metre is 3.28² = 10.76 square feet.',
      'Land measurement adds regional units — acres, hectares, and locally specific ones that persist in property records.'
    ],
    formulaCard: {
      title: 'Key Conversion Factors',
      formula: '1 m² = 10.7639 ft²',
      explanation: 'Because area scales with the square of length: 3.28084² = 10.7639. One acre is 4,046.86 m²; one hectare is 10,000 m², or about 2.471 acres.',
      variables: [
        { symbol: 'Hectare', meaning: '10,000 m² — a 100 m square' },
        { symbol: 'Acre', meaning: '4,046.86 m², historically a day\'s ploughing' },
        { symbol: 'Square mile', meaning: '640 acres' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Area Converter',
      steps: [
        { stepNumber: 1, title: 'Enter an area and unit', description: 'All others convert simultaneously.' },
        { stepNumber: 2, title: 'Remember the squaring', description: 'Area factors are the square of linear factors.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting a 0.6 hectare plot.',
      inputs: [{ label: 'Area', value: '0.6 hectares' }],
      steps: [
        'Square metres = 0.6 × 10,000 = 6,000 m².',
        'Acres = 0.6 × 2.471 = 1.48 acres.',
        'Square feet = 6,000 × 10.7639 = 64,583 ft².'
      ],
      result: '0.6 ha = 6,000 m² = 1.48 acres = 64,583 ft²',
      takeaway: 'A hectare is exactly a 100 m square, which makes metric land area easy to visualise. An acre has no such neat shape — it is a historical unit based on ploughing.'
    },
    faqs: [
      { question: 'How many square feet in a square metre?', answer: '10.7639. It is the square of the linear factor 3.28084, not the factor itself — a mistake that understates area by about a third.' },
      { question: 'How big is an acre?', answer: '4,046.86 m², or about 0.405 hectares. Roughly the size of a football pitch without the end zones, though its historical origin is the area one team could plough in a day.' },
      { question: 'Why is converting area different from converting length?', answer: 'Because area is two-dimensional. Doubling a linear conversion factor quadruples the area factor, which is why you square it.' }
    ]
  },

  'data-storage-converter': {
    calculatorId: 'data-storage-converter',
    title: 'Data Storage Converter',
    subtitle: 'Convert between bytes, KB, MB, GB and TB, with decimal and binary definitions kept separate.',
    readTimeMinutes: 3,
    author: CONV,
    overview: [
      'Data storage has two competing definitions. Manufacturers use decimal units where a gigabyte is 1,000,000,000 bytes. Operating systems typically use binary units where the same label means 1,073,741,824 bytes.',
      'That discrepancy is why a "1 TB" drive shows as roughly 931 GB once formatted — nothing is missing, the two are simply counting differently.'
    ],
    formulaCard: {
      title: 'Decimal vs Binary',
      formula: 'Decimal: 1 GB = 1000³ bytes · Binary: 1 GiB = 1024³ bytes',
      explanation: 'The binary prefixes KiB, MiB, GiB and TiB exist precisely to remove this ambiguity, though they are not widely used outside technical documentation.',
      variables: [
        { symbol: 'KB / KiB', meaning: '1,000 vs 1,024 bytes' },
        { symbol: 'GB / GiB', meaning: '1,000³ vs 1,024³ bytes' },
        { symbol: 'Discrepancy', meaning: 'About 7% at gigabyte scale, 10% at terabyte' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Data Storage Converter',
      steps: [
        { stepNumber: 1, title: 'Enter a value and unit', description: 'Bits and bytes are both supported.' },
        { stepNumber: 2, title: 'Choose decimal or binary', description: 'Decimal matches marketing; binary matches most operating systems.' },
        { stepNumber: 3, title: 'Mind bits versus bytes', description: 'Eight bits in a byte — relevant for connection speeds.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Why a 1 TB drive shows as 931 GB.',
      inputs: [{ label: 'Advertised', value: '1 TB (decimal)' }],
      steps: [
        'Manufacturer: 1 TB = 1,000,000,000,000 bytes.',
        'Operating system divides by 1,024 three times: 1,000,000,000,000 ÷ 1,099,511,627,776.',
        '= 0.909 TiB, which the OS displays as about 931 GB.'
      ],
      result: '1 TB decimal = 931 GB as most systems display it',
      takeaway: 'No storage is lost. The drive genuinely holds a trillion bytes — the operating system is simply counting in powers of 1,024 and using the same label.'
    },
    faqs: [
      { question: 'Why does my hard drive show less space than advertised?', answer: 'Because manufacturers count in powers of 1,000 and operating systems typically count in powers of 1,024 while using the same unit names. A 1 TB drive holds a trillion bytes, which displays as about 931 GB.' },
      { question: 'What is the difference between MB and MiB?', answer: 'A megabyte is 1,000,000 bytes under the decimal definition. A mebibyte is 1,048,576 bytes. MiB is unambiguous; MB is used for both meanings depending on context.' },
      { question: 'How many bits in a byte?', answer: 'Eight. This matters for connection speeds, which are quoted in bits per second while file sizes are in bytes — a factor of eight difference.' }
    ]
  },

  'paint-calculator': {
    calculatorId: 'paint-calculator',
    title: 'Paint Calculator',
    subtitle: 'Calculate litres or gallons for a room, with doors and windows deducted and coats and coverage factored in.',
    readTimeMinutes: 3,
    author: BUILD,
    disclaimer: MATERIAL_DISC,
    overview: [
      'Paint quantity depends on wall area, how many coats you need, and the coverage rate of the specific product. Coverage varies considerably — matt emulsion goes further than gloss, and porous or dark surfaces absorb more.'
    ],
    formulaCard: {
      title: 'Paint Required',
      formula: 'Litres = (Wall area − openings) × Coats ÷ Coverage rate',
      explanation: 'Wall area is perimeter × height. Coverage is usually printed on the tin, commonly 10–14 m² per litre for emulsion. First coats on bare or porous surfaces use noticeably more.',
      variables: [
        { symbol: 'Perimeter', meaning: 'Sum of all wall lengths' },
        { symbol: 'Coverage', meaning: 'Area one litre covers, from the tin' },
        { symbol: 'Coats', meaning: 'Two is typical; three over a strong colour change' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Paint Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter room dimensions', description: 'Length, width and ceiling height.' },
        { stepNumber: 2, title: 'Subtract doors and windows', description: 'A standard door is about 1.8 m², a window 1.5 m².' },
        { stepNumber: 3, title: 'Set coats and coverage', description: 'Check the tin — coverage varies significantly between products.' },
        { stepNumber: 4, title: 'Include the ceiling separately', description: 'It is a different area and often a different paint.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 4 m × 3.5 m room with 2.4 m ceilings, one door and two windows, two coats at 12 m² per litre.',
      inputs: [
        { label: 'Room', value: '4 × 3.5 m, 2.4 m high' },
        { label: 'Openings', value: '1 door, 2 windows' },
        { label: 'Coverage', value: '12 m²/litre, 2 coats' }
      ],
      steps: [
        'Perimeter = 2 × (4 + 3.5) = 15 m.',
        'Wall area = 15 × 2.4 = 36 m².',
        'Less openings: 36 − 1.8 − (2 × 1.5) = 31.2 m².',
        'Two coats = 62.4 m² → 62.4 ÷ 12 = 5.2 litres.'
      ],
      result: '5.2 litres — buy 2 × 2.5 L or one 5 L tin plus a small one',
      takeaway: 'Buying a single 5 L tin would leave you just short. Tin sizes rarely match calculated needs exactly, so round up to the next practical combination.'
    },
    faqs: [
      { question: 'How much does one litre of paint cover?', answer: 'Typically 10–14 m² per coat for emulsion, less for gloss and less again on bare plaster or textured surfaces. The tin gives the manufacturer figure, which assumes a well-prepared surface.' },
      { question: 'Do I need to subtract doors and windows?', answer: 'Yes for accuracy, though many people leave them in as a built-in margin. A door is roughly 1.8 m² and an average window 1.5 m².' },
      { question: 'How many coats do I need?', answer: 'Two is standard. Three when covering a dark colour with a light one, painting bare plaster, or using a poorly opaque pigment such as some yellows and reds.' }
    ]
  },

  'tile-calculator': {
    calculatorId: 'tile-calculator',
    title: 'Tile Calculator',
    subtitle: 'Find how many tiles and boxes a floor or wall needs, including cut waste and grout quantity.',
    readTimeMinutes: 3,
    author: BUILD,
    disclaimer: MATERIAL_DISC,
    overview: [
      'Tile quantity is area divided by tile size, plus an allowance for cuts and breakages. The waste allowance matters more than people expect, particularly with large-format tiles or diagonal layouts.'
    ],
    formulaCard: {
      title: 'Tiles Required',
      formula: 'Tiles = (Area ÷ Tile area) × (1 + waste)',
      explanation: 'Then divide by tiles per box and round up. Ten percent waste suits straight layouts; fifteen or more for diagonal patterns, many cuts or large tiles.',
      variables: [
        { symbol: 'Waste', meaning: '10% straight · 15%+ diagonal or complex' },
        { symbol: 'Grout', meaning: 'Depends on tile size and joint width' },
        { symbol: 'Batch', meaning: 'Shade varies between production batches' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Tile Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the area to tile', description: 'Or the dimensions, and let it calculate.' },
        { stepNumber: 2, title: 'Enter tile dimensions', description: 'And how many come per box.' },
        { stepNumber: 3, title: 'Set the waste allowance', description: 'Higher for diagonal layouts and awkward rooms.' },
        { stepNumber: 4, title: 'Order all boxes together', description: 'From one batch, to avoid visible shade differences.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 3.2 m × 2.8 m floor with 600 × 300 mm tiles, 5 per box, 10% waste.',
      inputs: [
        { label: 'Floor', value: '3.2 × 2.8 m' },
        { label: 'Tile', value: '600 × 300 mm' },
        { label: 'Per box', value: '5 tiles' }
      ],
      steps: [
        'Floor area = 3.2 × 2.8 = 8.96 m².',
        'Tile area = 0.6 × 0.3 = 0.18 m².',
        'Tiles needed = 8.96 ÷ 0.18 = 49.8 → 50.',
        'With 10% waste = 55 tiles → 55 ÷ 5 = 11 boxes.'
      ],
      result: '55 tiles · 11 boxes',
      takeaway: 'Always order the spare box. Keeping a few tiles after completion means a future crack can be replaced with an exact match rather than a close approximation.'
    },
    faqs: [
      { question: 'How much extra tile should I order?', answer: 'Ten percent for a straightforward rectangular layout, fifteen or more for diagonal patterns, rooms with many angles, or large-format tiles where each cut wastes more.' },
      { question: 'Why do tiles need to come from the same batch?', answer: 'Because shade varies between production runs. Tiles from a different batch can be visibly different in colour, which shows badly once laid.' },
      { question: 'How much grout do I need?', answer: 'It depends on tile size, joint width and tile thickness. Larger tiles need less grout per square metre because there are fewer joints. Manufacturer coverage charts give figures for each combination.' }
    ]
  },

  'gravel-and-mulch-calculator': {
    calculatorId: 'gravel-and-mulch-calculator',
    title: 'Gravel & Mulch Calculator',
    subtitle: 'Calculate cubic yards and tonnage of gravel, mulch or topsoil for a given area and depth.',
    readTimeMinutes: 3,
    author: BUILD,
    disclaimer: MATERIAL_DISC + ' Bulk density varies by material, moisture content and supplier.',
    overview: [
      'Landscaping materials are sold by volume or weight, but you measure the area you want to cover and the depth you want it. Converting between them needs the material\'s bulk density.',
      'Mulch is light, gravel is heavy, and confusing the two when ordering by weight produces a large error.'
    ],
    formulaCard: {
      title: 'Volume and Weight',
      formula: 'Volume = Area × Depth',
      explanation: 'Keep units consistent. Weight = volume × bulk density: gravel is roughly 1.5 tonnes per cubic metre, topsoil about 1.3, and bark mulch around 0.4.',
      variables: [
        { symbol: 'Gravel', meaning: '≈1.5 t/m³' },
        { symbol: 'Topsoil', meaning: '≈1.3 t/m³' },
        { symbol: 'Bark mulch', meaning: '≈0.4 t/m³' },
        { symbol: 'Typical depth', meaning: '50 mm gravel path · 75 mm mulch' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the area', description: 'Length and width, or total square metres.' },
        { stepNumber: 2, title: 'Set the depth', description: '50 mm for decorative gravel, 75–100 mm for mulch.' },
        { stepNumber: 3, title: 'Select the material', description: 'Density differs enormously between them.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Covering a 12 m × 1.5 m path with 50 mm of gravel.',
      inputs: [
        { label: 'Area', value: '12 × 1.5 m = 18 m²' },
        { label: 'Depth', value: '50 mm (0.05 m)' },
        { label: 'Material', value: 'Gravel, 1.5 t/m³' }
      ],
      steps: [
        'Volume = 18 × 0.05 = 0.9 m³.',
        'Weight = 0.9 × 1.5 = 1.35 tonnes.',
        'The same volume in bark mulch would weigh only 0.36 tonnes.'
      ],
      result: '0.9 m³ · about 1.35 tonnes of gravel',
      takeaway: 'Volume is identical but weight differs almost fourfold between gravel and mulch. Ordering by weight without checking the material is how people end up with far too little.'
    },
    faqs: [
      { question: 'How deep should gravel be?', answer: 'About 50 mm for a decorative surface over a prepared base. Driveways need more, typically 100 mm or greater in layers, over a compacted sub-base.' },
      { question: 'How much does a cubic metre of gravel weigh?', answer: 'Roughly 1.5 tonnes, varying with stone type and moisture. Wet material can be noticeably heavier, which matters when ordering by weight.' },
      { question: 'How deep should mulch be?', answer: '75–100 mm suppresses weeds effectively while allowing water through. Deeper than that can restrict air to roots, and mulch should be kept clear of plant stems.' }
    ]
  },

  'wallpaper-calculator': {
    calculatorId: 'wallpaper-calculator',
    title: 'Wallpaper Calculator',
    subtitle: 'Find how many rolls a room needs, with pattern repeat and drop matching accounted for.',
    readTimeMinutes: 3,
    author: BUILD,
    disclaimer: MATERIAL_DISC,
    overview: [
      'Wallpaper is calculated in drops — full-height strips — rather than by area, because each drop must be cut to the wall height plus an allowance for pattern matching.',
      'Pattern repeat is what makes this different from paint. A large repeat can waste a substantial share of every roll.'
    ],
    formulaCard: {
      title: 'Rolls Required',
      formula: 'Drops per roll = Roll length ÷ (Wall height + repeat allowance)',
      explanation: 'Total drops = wall perimeter ÷ roll width. Rolls needed = total drops ÷ drops per roll, rounded up. A standard European roll is 10.05 m long and 0.53 m wide.',
      variables: [
        { symbol: 'Drop', meaning: 'One full-height strip of paper' },
        { symbol: 'Pattern repeat', meaning: 'Vertical distance before the design repeats' },
        { symbol: 'Drop match', meaning: 'Offset patterns waste more than straight match' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Wallpaper Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter wall perimeter and height', description: 'Measure the full height including any allowance for trimming.' },
        { stepNumber: 2, title: 'Enter the pattern repeat', description: 'Printed on the roll label. Zero for plain papers.' },
        { stepNumber: 3, title: 'Note the match type', description: 'Offset or drop match wastes more than straight match.' },
        { stepNumber: 4, title: 'Order one spare roll', description: 'From the same batch, for future repairs.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A room with 16 m perimeter, 2.5 m walls, paper with a 52 cm repeat.',
      inputs: [
        { label: 'Perimeter', value: '16 m' },
        { label: 'Wall height', value: '2.5 m' },
        { label: 'Pattern repeat', value: '52 cm' },
        { label: 'Roll', value: '10.05 m × 0.53 m' }
      ],
      steps: [
        'Drops needed = 16 ÷ 0.53 = 30.2 → 31 drops.',
        'Cut length = 2.5 m rounded up to the next whole repeat: 3 × 0.52 = 1.56, so 5 × 0.52 = 2.6 m.',
        'Drops per roll = 10.05 ÷ 2.6 = 3.86 → 3 whole drops.',
        'Rolls = 31 ÷ 3 = 10.3 → 11 rolls.'
      ],
      result: '11 rolls, plus one spare',
      takeaway: 'The 52 cm repeat forced each drop to 2.6 m rather than 2.5 m, wasting 10 cm per drop. Across 31 drops that is over 3 metres of paper — most of a third of a roll.'
    },
    faqs: [
      { question: 'How many rolls of wallpaper do I need?', answer: 'It depends on perimeter, wall height and pattern repeat. Calculate full-height drops from the perimeter, then how many drops each roll yields once the repeat is accounted for.' },
      { question: 'What is pattern repeat?', answer: 'The vertical distance before the design starts again. Each drop must be cut at a whole number of repeats so adjacent strips align, which means larger repeats waste more paper.' },
      { question: 'What is the difference between straight and drop match?', answer: 'Straight match aligns the pattern at the same height on each strip. Drop or offset match staggers alternate strips by half a repeat, which uses more paper but often looks better on large patterns.' }
    ]
  },

  'stair-calculator': {
    calculatorId: 'stair-calculator',
    title: 'Stair Calculator',
    subtitle: 'Work out riser height, tread depth and stringer length for a staircase that meets standard code limits.',
    readTimeMinutes: 4,
    author: BUILD,
    disclaimer: 'Staircase dimensions are governed by building regulations that vary by jurisdiction and by whether the stair is domestic or public. Always verify against local code and obtain approval where required.',
    overview: [
      'Stair design starts from total rise — the vertical distance between finished floor levels — and divides it into equal risers. Every riser must be identical; even small variation is a serious trip hazard.',
      'Comfort and safety both depend on the relationship between riser height and tread depth, which is what the classic stair rules capture.'
    ],
    formulaCard: {
      title: 'Riser and Tread',
      formula: 'Number of risers = Total rise ÷ Target riser height (rounded)',
      explanation: 'Actual riser = total rise ÷ number of risers. There is always one fewer tread than riser. The comfort rule is 2 × riser + tread ≈ 600–640 mm.',
      variables: [
        { symbol: 'Total rise', meaning: 'Finished floor to finished floor' },
        { symbol: 'Riser', meaning: 'Vertical height of each step, commonly max 190–220 mm' },
        { symbol: 'Going', meaning: 'Horizontal tread depth, commonly min 220–250 mm' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Stair Calculator',
      steps: [
        { stepNumber: 1, title: 'Measure the total rise accurately', description: 'Between finished floor levels, including floor coverings.' },
        { stepNumber: 2, title: 'Set your target riser height', description: 'The calculator finds the nearest equal division.' },
        { stepNumber: 3, title: 'Check against code limits', description: 'Maximum riser and minimum going are both regulated.' },
        { stepNumber: 4, title: 'Confirm headroom and total run', description: 'The stair must fit the available space with adequate headroom.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A total rise of 2,730 mm with a target riser of about 190 mm.',
      inputs: [
        { label: 'Total rise', value: '2,730 mm' },
        { label: 'Target riser', value: '190 mm' },
        { label: 'Going', value: '240 mm' }
      ],
      steps: [
        'Risers = 2,730 ÷ 190 = 14.4 → use 14 risers.',
        'Actual riser = 2,730 ÷ 14 = 195 mm.',
        'Treads = 14 − 1 = 13.',
        'Total run = 13 × 240 = 3,120 mm.',
        'Comfort check: (2 × 195) + 240 = 630 mm — within the 600–640 range.'
      ],
      result: '14 risers at 195 mm · 13 treads at 240 mm · 3,120 mm run',
      takeaway: 'Rounding to 14 risers rather than 15 gave a 195 mm riser. Fifteen would have given 182 mm — also acceptable but requiring an extra tread and 240 mm more floor space.'
    },
    sections: [
      {
        id: 'safety',
        title: 'Why equal risers matter so much',
        paragraphs: [
          'People climb stairs by rhythm rather than by looking. A riser that differs from its neighbours by even a few millimetres breaks that rhythm and is a well-documented cause of falls.',
          'This is why the total rise must divide into exactly equal parts, and why a stair cannot simply have a shorter step at the top to make the numbers work.'
        ],
        callout: { type: 'warning', title: 'Measure to finished floor levels', text: 'If flooring is added after the stair is built, every riser changes except the top or bottom one — creating exactly the uneven step that codes prohibit.' }
      }
    ],
    faqs: [
      { question: 'What is the maximum riser height?', answer: 'Commonly 190–220 mm for domestic stairs depending on jurisdiction, with lower limits for public buildings. Check your local building regulations, as this is strictly enforced.' },
      { question: 'Why is there one fewer tread than riser?', answer: 'Because the top riser lands on the upper floor, which serves as the final tread. A stair with 14 risers has 13 treads plus the landing.' },
      { question: 'What is the 2R + G rule?', answer: 'Twice the riser plus the going should fall between roughly 600 and 640 mm. It reflects natural walking stride and produces stairs that feel comfortable rather than cramped or stretched.' }
    ]
  },

  'roofing-calculator': {
    calculatorId: 'roofing-calculator',
    title: 'Roofing Calculator',
    subtitle: 'Calculate roof area in squares from footprint and pitch, and the bundles of shingles required.',
    readTimeMinutes: 4,
    author: BUILD,
    disclaimer: 'Roofing is dangerous work usually requiring professional installation and often permits. Material estimates exclude ridge, valley, flashing and underlayment quantities.',
    overview: [
      'Roof area is always larger than the building footprint, because a pitched roof slopes. The steeper the pitch, the greater the difference — and ignoring it is the most common estimating error.',
      'Roofing is measured in squares, where one square is 100 square feet.'
    ],
    formulaCard: {
      title: 'Roof Area from Pitch',
      formula: 'Roof area = Footprint area × Pitch multiplier',
      explanation: 'The multiplier is √(rise² + run²) ÷ run. A 6/12 pitch gives 1.118, meaning the roof surface is nearly 12% larger than the footprint it covers.',
      variables: [
        { symbol: 'Square', meaning: '100 square feet of roof area' },
        { symbol: '4/12 pitch', meaning: 'Multiplier 1.054' },
        { symbol: '6/12 pitch', meaning: 'Multiplier 1.118' },
        { symbol: '9/12 pitch', meaning: 'Multiplier 1.250' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Roofing Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the building footprint', description: 'The plan area the roof covers.' },
        { stepNumber: 2, title: 'Enter the roof pitch', description: 'As rise over run, such as 6/12.' },
        { stepNumber: 3, title: 'Add a waste allowance', description: '10% for simple gables, 15%+ for hips and valleys.' },
        { stepNumber: 4, title: 'Convert to bundles', description: 'Typically three bundles per square.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 12 m × 8 m building with a 6/12 pitch gable roof, 10% waste.',
      inputs: [
        { label: 'Footprint', value: '12 × 8 m (1,033 sq ft)' },
        { label: 'Pitch', value: '6/12' },
        { label: 'Waste', value: '10%' }
      ],
      steps: [
        'Footprint = 96 m² = 1,033 sq ft.',
        'Roof area = 1,033 × 1.118 = 1,155 sq ft.',
        'With 10% waste = 1,271 sq ft = 12.71 squares.',
        'Bundles = 12.71 × 3 = 38.1 → order 39 bundles.'
      ],
      result: '12.71 squares · 39 bundles',
      takeaway: 'The pitch added 122 sq ft over the footprint. Estimating from plan area alone would have left you roughly four bundles short.'
    },
    faqs: [
      { question: 'What is a roofing square?', answer: '100 square feet of roof surface. Roofing materials and labour are almost always quoted per square rather than per square foot.' },
      { question: 'How does pitch affect the amount of material?', answer: 'A steeper pitch means more surface area over the same footprint. A 4/12 pitch adds about 5%, a 6/12 roughly 12%, and a 12/12 about 41%.' },
      { question: 'How many bundles are in a square?', answer: 'Typically three for standard architectural shingles, though heavier premium products may need four. Check the packaging for coverage per bundle.' }
    ]
  },

  'recipe-converter': {
    calculatorId: 'recipe-converter',
    title: 'Recipe Converter',
    subtitle: 'Scale any recipe to the number of servings you need, with quantities converted to sensible measurements.',
    readTimeMinutes: 3,
    author: FOOD,
    overview: [
      'Scaling a recipe is proportional arithmetic for the ingredients, but cooking times and pan sizes do not scale the same way. Doubling a cake mixture does not mean doubling the bake time.'
    ],
    formulaCard: {
      title: 'Scaling Factor',
      formula: 'Factor = Desired servings ÷ Original servings',
      explanation: 'Multiply every ingredient by the factor. Cooking times, pan dimensions and seasoning need judgement rather than the same multiplication.',
      variables: [
        { symbol: 'Factor', meaning: 'Ratio of new to original servings' },
        { symbol: 'Linear scaling', meaning: 'Works for ingredients' },
        { symbol: 'Non-linear', meaning: 'Time, pan size, seasoning, leavening' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Recipe Converter',
      steps: [
        { stepNumber: 1, title: 'Enter the original servings', description: 'As stated in the recipe.' },
        { stepNumber: 2, title: 'Enter your target servings', description: 'The scaling factor is calculated.' },
        { stepNumber: 3, title: 'Review the scaled quantities', description: 'Converted to practical measurements.' },
        { stepNumber: 4, title: 'Adjust time and pan size by judgement', description: 'Check for doneness rather than trusting arithmetic.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Scaling a recipe for 4 up to 6 servings.',
      inputs: [
        { label: 'Original', value: '4 servings' },
        { label: 'Desired', value: '6 servings' },
        { label: 'Example ingredient', value: '350 g flour' }
      ],
      steps: [
        'Factor = 6 ÷ 4 = 1.5.',
        'Flour = 350 × 1.5 = 525 g.',
        'An ingredient given as 3 eggs becomes 4.5 — round to 4 or 5 and adjust liquid slightly.',
        'Bake time increases but not by 50%; check 10 minutes earlier than a proportional estimate.'
      ],
      result: 'Factor 1.5 · 350 g flour becomes 525 g',
      takeaway: 'Ingredients scale cleanly; eggs and bake time do not. For awkward egg counts, beat the egg and add the appropriate fraction by weight.'
    },
    sections: [
      {
        id: 'what-doesnt-scale',
        title: 'What does not scale proportionally',
        paragraphs: ['Several things need judgement rather than multiplication:'],
        bullets: [
          'Cooking time — a larger volume takes longer but not proportionally. Check for doneness.',
          'Pan size — doubling a recipe needs roughly double the pan area, not double the depth.',
          'Salt and strong spices — often better scaled slightly less than proportionally, then adjusted to taste.',
          'Leavening agents — scale directly but be cautious beyond double, as behaviour changes.',
          'Reduction and evaporation — larger volumes in wider pans reduce differently.'
        ],
        callout: { type: 'tip', title: 'Weigh rather than measure by volume', text: 'Scaling by weight is far more accurate than scaling cups, especially for fractions. Half a cup of flour is ambiguous; 62 grams is not.' }
      }
    ],
    faqs: [
      { question: 'Can I just double the cooking time when doubling a recipe?', answer: 'No. A larger volume takes longer to cook through but not proportionally. Use a larger pan to keep depth similar, and start checking well before any estimated time.' },
      { question: 'How do I handle fractional eggs?', answer: 'Beat a whole egg and weigh out the fraction you need — a large egg is roughly 50 g without shell. For small fractions, rounding to the nearest whole egg and adjusting liquid slightly usually works.' },
      { question: 'Does halving a baking recipe work?', answer: 'Usually, though very small quantities become harder to measure accurately and a smaller tin changes bake time. Weighing rather than using volume measures matters more at reduced scale.' }
    ]
  },

  'baking-conversion-calculator': {
    calculatorId: 'baking-conversion-calculator',
    title: 'Cups to Grams Converter',
    subtitle: 'Convert cups to grams by ingredient — flour, sugar and butter all weigh differently, so one factor gets it wrong.',
    readTimeMinutes: 3,
    author: FOOD,
    overview: [
      'A cup measures volume, not weight, and ingredients have very different densities. A cup of flour is roughly 120 g while a cup of sugar is around 200 g — using one conversion for both is the most common cause of baking failures.',
      'How you fill the cup matters too: scooped flour can weigh 20% more than spooned and levelled flour.'
    ],
    formulaCard: {
      title: 'Ingredient Densities',
      formula: 'Grams = Cups × Grams per cup for that ingredient',
      explanation: 'There is no universal factor. Plain flour ≈ 120–125 g, granulated sugar ≈ 200 g, brown sugar packed ≈ 220 g, butter ≈ 227 g, cocoa ≈ 85 g per cup.',
      variables: [
        { symbol: 'Plain flour', meaning: '≈120 g per cup, spooned and levelled' },
        { symbol: 'Granulated sugar', meaning: '≈200 g per cup' },
        { symbol: 'Butter', meaning: '≈227 g per cup (2 sticks)' },
        { symbol: 'US cup', meaning: '240 ml — differs from metric and UK cups' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Baking Converter',
      steps: [
        { stepNumber: 1, title: 'Select the ingredient', description: 'This is the step that matters most.' },
        { stepNumber: 2, title: 'Enter the cup quantity', description: 'Fractions supported.' },
        { stepNumber: 3, title: 'Use the gram figure', description: 'Weighing is consistently more accurate than measuring by volume.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A recipe calling for 2 cups flour, 1 cup sugar and ½ cup butter.',
      inputs: [
        { label: 'Flour', value: '2 cups' },
        { label: 'Sugar', value: '1 cup' },
        { label: 'Butter', value: '½ cup' }
      ],
      steps: [
        'Flour: 2 × 120 = 240 g.',
        'Sugar: 1 × 200 = 200 g.',
        'Butter: 0.5 × 227 = 113 g.',
        'Using a single 200 g/cup factor would give 400 g of flour — 67% too much.'
      ],
      result: '240 g flour · 200 g sugar · 113 g butter',
      takeaway: 'The flour error alone would ruin the recipe. Ingredient-specific conversion is not a refinement here; it is the whole point.'
    },
    faqs: [
      { question: 'Why does a cup of flour not weigh the same as a cup of sugar?', answer: 'Because a cup measures volume and the two have different densities. Flour is light and airy at around 120 g per cup; granulated sugar is denser at about 200 g.' },
      { question: 'How should I measure flour in a cup?', answer: 'Spoon it in and level off with a straight edge. Scooping directly compacts the flour and can add 20% or more, which is enough to make a cake dry.' },
      { question: 'Are US and UK cups the same?', answer: 'No. A US cup is 240 ml, a metric cup 250 ml, and older UK recipes may use a 284 ml imperial cup. Weighing avoids the ambiguity entirely.' }
    ]
  },

  'cooking-time-calculator': {
    calculatorId: 'cooking-time-calculator',
    title: 'Meat Roasting Calculator',
    subtitle: 'Work out roasting time and oven temperature by weight and cut, with safe internal temperatures listed.',
    readTimeMinutes: 3,
    author: FOOD,
    disclaimer: 'Cooking times are guidance. Food safety depends on internal temperature measured with a probe thermometer, not on elapsed time. Follow your national food safety guidance.',
    overview: [
      'Roasting time scales with weight but not linearly, and the doneness you want changes the target temperature entirely. Time gets you close; a thermometer confirms it.',
      'Resting after cooking matters as much as the cooking itself — internal temperature continues to rise several degrees.'
    ],
    formulaCard: {
      title: 'Roasting Time',
      formula: 'Time = (Weight kg × minutes per kg) + fixed addition',
      explanation: 'Typical guidance: beef medium 20 min per 500 g plus 20 min; chicken 20 min per 500 g plus 20 min; pork 30 min per 500 g plus 30 min. Always verify with a thermometer.',
      variables: [
        { symbol: 'Chicken', meaning: 'Safe at 75°C throughout' },
        { symbol: 'Beef medium', meaning: '60–65°C, rising during rest' },
        { symbol: 'Pork', meaning: '70°C, or 63°C with a 3-minute rest' },
        { symbol: 'Carryover', meaning: 'Internal temperature rises 3–7°C while resting' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Roasting Calculator',
      steps: [
        { stepNumber: 1, title: 'Select the meat and cut', description: 'Different cuts behave differently at the same weight.' },
        { stepNumber: 2, title: 'Enter the weight', description: 'After trimming, as it goes into the oven.' },
        { stepNumber: 3, title: 'Choose your doneness', description: 'For red meat. Poultry and pork have fixed safe targets.' },
        { stepNumber: 4, title: 'Check with a thermometer', description: 'In the thickest part, away from bone.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 2.2 kg chicken at 190°C.',
      inputs: [
        { label: 'Weight', value: '2.2 kg' },
        { label: 'Oven', value: '190°C' }
      ],
      steps: [
        'Time = (2.2 × 2 × 20) + 20 = 88 + 20 = 108 minutes.',
        'Roughly 1 hour 48 minutes.',
        'Check internal temperature reaches 75°C in the thickest part of the thigh.',
        'Rest 15–20 minutes before carving.'
      ],
      result: 'About 1 h 48 m · verify 75°C internal · rest 15–20 min',
      takeaway: 'Resting is not optional. Carving immediately loses juices that would otherwise redistribute, and the internal temperature is still climbing for several minutes after removal.'
    },
    faqs: [
      { question: 'How do I know when meat is safely cooked?', answer: 'By internal temperature measured with a probe in the thickest part away from bone. Poultry needs 75°C throughout. Time-based estimates get you close but ovens and cuts vary too much to rely on them alone.' },
      { question: 'Why does meat need to rest?', answer: 'Because juices redistribute and internal temperature continues rising by several degrees. Carving immediately loses moisture and can leave the centre under-done relative to its final state.' },
      { question: 'Should I cook from room temperature or fridge-cold?', answer: 'Letting meat sit out briefly helps it cook more evenly, but food safety guidance limits how long it should be at room temperature. Follow your national guidance, and adjust cooking time if starting from fridge-cold.' }
    ]
  },

  'coffee-water-ratio-calculator': {
    calculatorId: 'coffee-water-ratio-calculator',
    title: 'Coffee Ratio Calculator',
    subtitle: 'Get the coffee and water amounts for your brew method and strength, in grams and millilitres.',
    readTimeMinutes: 3,
    author: FOOD,
    overview: [
      'Coffee strength is set by the ratio of coffee to water, expressed as 1:15 or 1:17 — one gram of coffee to fifteen or seventeen grams of water. Getting this consistent is the single biggest improvement most people can make.',
      'Weighing rather than using scoops is what makes it repeatable, since grind size and bean density change what a scoop holds.'
    ],
    formulaCard: {
      title: 'Brew Ratio',
      formula: 'Water (g) = Coffee (g) × Ratio',
      explanation: 'One millilitre of water weighs one gram, so the units are interchangeable. Typical ratios: filter 1:15 to 1:17, French press 1:12 to 1:15, espresso 1:2.',
      variables: [
        { symbol: 'Filter / pour-over', meaning: '1:15 to 1:17' },
        { symbol: 'French press', meaning: '1:12 to 1:15' },
        { symbol: 'Espresso', meaning: '1:2 — 18 g in, 36 g out' },
        { symbol: 'Cold brew', meaning: '1:8 concentrate, diluted before drinking' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Coffee Ratio Calculator',
      steps: [
        { stepNumber: 1, title: 'Choose your brew method', description: 'Each has a typical ratio range.' },
        { stepNumber: 2, title: 'Enter how much coffee you want', description: 'Either the water volume or the coffee weight.' },
        { stepNumber: 3, title: 'Adjust strength to taste', description: 'Lower second number means stronger.' },
        { stepNumber: 4, title: 'Weigh both coffee and water', description: 'Scoops vary too much for consistency.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Brewing 500 ml of filter coffee at a 1:16 ratio.',
      inputs: [
        { label: 'Water', value: '500 ml (500 g)' },
        { label: 'Ratio', value: '1:16' }
      ],
      steps: [
        'Coffee = 500 ÷ 16 = 31.25 g.',
        'Round to 31 g for practicality.',
        'For a stronger cup at 1:14: 500 ÷ 14 = 35.7 g.',
        'For weaker at 1:18: 500 ÷ 18 = 27.8 g.'
      ],
      result: '31 g coffee for 500 ml at 1:16',
      takeaway: 'Moving from 1:16 to 1:14 adds less than 5 g of coffee but noticeably changes strength. Small ratio changes have a larger effect than people expect.'
    },
    sections: [
      {
        id: 'beyond-ratio',
        title: 'What else affects the result',
        paragraphs: ['Ratio sets strength; these set flavour:'],
        bullets: [
          'Grind size — too fine over-extracts and tastes bitter, too coarse under-extracts and tastes sour.',
          'Water temperature — 90–96°C for most methods.',
          'Brew time — matched to grind and method.',
          'Water quality — heavily filtered or very hard water both affect extraction.',
          'Bean freshness — coffee is best within a few weeks of roasting.'
        ],
        callout: { type: 'tip', title: 'Change one variable at a time', text: 'If a brew tastes wrong, adjust grind or ratio but not both. Changing two at once makes it impossible to know which helped.' }
      }
    ],
    faqs: [
      { question: 'What is the best coffee to water ratio?', answer: 'Around 1:16 for filter coffee is a widely used starting point. French press suits 1:12 to 1:15, espresso about 1:2. Adjust from there to taste rather than treating any figure as fixed.' },
      { question: 'Should I weigh coffee or use scoops?', answer: 'Weigh it. A scoop of coarsely ground light-roast beans holds noticeably less coffee by weight than finely ground dark roast, so scoops cannot give consistent strength.' },
      { question: 'My coffee tastes bitter — is the ratio wrong?', answer: 'Bitterness usually indicates over-extraction rather than too much coffee. Try a coarser grind or shorter brew time first. If it tastes sour instead, that is under-extraction — grind finer or brew longer.' }
    ]
  }
};
