import { CalculatorArticle } from '../../types/article';

/**
 * Math, construction, vehicle, timesheet and conversion articles.
 * Depth is deliberately matched to intent — a converter needs less than a
 * retirement projection.
 */
export const PRACTICAL_ARTICLES: Record<string, CalculatorArticle> = {
  'gpa-calculator': {
    calculatorId: 'gpa-calculator',
    title: 'GPA Calculator',
    subtitle:
      'Calculate semester and cumulative GPA on a 4.0 scale, with credit hours weighted and AP or honours courses handled.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Education & Mathematics Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Grade point scales and weighting policies differ between institutions. Check your school or university handbook for the scale that applies to you.',
    overview: [
      'Grade point average converts letter grades into numbers and weights them by how much each course counts. The weighting is what people usually get wrong — a four-credit course affects your GPA twice as much as a two-credit one, so averaging grade points directly gives the wrong answer.',
      'This calculator handles the credit weighting and supports weighted scales where honours and AP courses carry extra points.'
    ],
    formulaCard: {
      title: 'Credit-Weighted GPA',
      formula: 'GPA = Σ(Grade points × Credits) ÷ Σ(Credits)',
      explanation:
        'Each course contributes grade points multiplied by its credit value. Dividing by total credits gives the weighted average — which is why dropping a grade in a high-credit course hurts more.',
      variables: [
        { symbol: 'A = 4.0', meaning: 'A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7' },
        { symbol: 'C = 2.0', meaning: 'C+ = 2.3, C− = 1.7, D = 1.0, F = 0.0' },
        { symbol: 'Credits', meaning: 'Credit hours or units for each course' }
      ]
    },
    howToSteps: {
      title: 'How to Use the GPA Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter each course grade',
          description: 'Use the letter grade or its point value, whichever your transcript shows.'
        },
        {
          stepNumber: 2,
          title: 'Add credit hours for each course',
          description: 'This is what weights the average. Courses with more credits count for more.'
        },
        {
          stepNumber: 3,
          title: 'Mark honours or AP courses if weighted',
          description:
            'Some schools add 0.5 or 1.0 point for advanced courses, which can push a weighted GPA above 4.0.'
        },
        {
          stepNumber: 4,
          title: 'Add previous credits for a cumulative GPA',
          description: 'Enter prior total credits and GPA to combine them with the current semester.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: One Semester',
      scenario: 'Four courses with different credit values and grades.',
      inputs: [
        { label: 'Biology', value: 'A (4.0) × 4 credits' },
        { label: 'History', value: 'B+ (3.3) × 3 credits' },
        { label: 'Maths', value: 'B− (2.7) × 4 credits' },
        { label: 'Art', value: 'A− (3.7) × 2 credits' }
      ],
      steps: [
        'Biology: 4.0 × 4 = 16.0',
        'History: 3.3 × 3 = 9.9',
        'Maths: 2.7 × 4 = 10.8',
        'Art: 3.7 × 2 = 7.4',
        'Total points = 44.1 · Total credits = 13',
        'GPA = 44.1 ÷ 13 = 3.39'
      ],
      result: 'Semester GPA: 3.39',
      takeaway:
        'A straight average of the four grade points would give 3.43. The credit weighting pulls it down because the weaker grade was in a four-credit course — which is exactly why weighting matters.'
    },
    sections: [
      {
        id: 'weighted-unweighted',
        title: 'Weighted and unweighted GPA',
        paragraphs: [
          'An unweighted GPA caps every course at 4.0 regardless of difficulty. A weighted GPA adds extra points for honours, AP or IB courses, so an A in AP Chemistry might count as 5.0.',
          'This is why some students report a GPA above 4.0. Universities generally recalculate using their own method, so a weighted figure from your school is not necessarily what an admissions office will use.'
        ]
      },
      {
        id: 'raising-gpa',
        title: 'What actually moves a cumulative GPA',
        paragraphs: [
          'Cumulative GPA becomes progressively harder to shift as credits accumulate, because each new semester is a smaller share of the total. Twenty credits of strong grades move a 30-credit history far more than the same performance moves a 90-credit one.',
          'This is worth knowing early: grades in your first year have a disproportionate effect on the final figure, simply because everything that follows is averaged against them.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I calculate cumulative GPA across semesters?',
        answer:
          'Multiply each semester GPA by its credits, add the results, then divide by total credits across all semesters. Averaging the semester GPAs directly is only correct if every semester had identical credit loads.'
      },
      {
        question: 'Do failed courses count?',
        answer:
          'Usually yes — an F counts as 0.0 grade points while still contributing its credits to the denominator, which is why a single failure has an outsized effect. Retake policies vary; some institutions replace the original grade, others average both.'
      },
      {
        question: 'What is a good GPA?',
        answer:
          'It depends on context. Broadly, 3.5 and above is strong, 3.0–3.5 is solid, and below 3.0 may limit some options. Competitive graduate programmes often expect 3.5 or higher, but course rigour and trajectory matter alongside the number.'
      }
    ]
  },

  'fraction-calculator': {
    calculatorId: 'fraction-calculator',
    title: 'Fraction Calculator',
    subtitle:
      'Add, subtract, multiply and divide fractions and mixed numbers, with every result simplified and the steps shown.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Education & Mathematics Desk',
      lastUpdated: 'September 2026'
    },
    overview: [
      'Fractions trip people up because the rules differ depending on the operation. Multiplying is straightforward — multiply across. Adding is not, because the denominators have to match first.',
      'This calculator handles all four operations, converts between improper fractions and mixed numbers, and simplifies the result. The working is shown so it can be followed rather than just copied.'
    ],
    formulaCard: {
      title: 'The Four Operations',
      formula: 'a/b + c/d = (ad + cb) ÷ bd',
      explanation:
        'Subtraction follows the same pattern with a minus. Multiplication is (a × c) ÷ (b × d). Division flips the second fraction and multiplies: (a ÷ b) ÷ (c ÷ d) = (a × d) ÷ (b × c).',
      variables: [
        { symbol: 'Numerator', meaning: 'The top number — how many parts you have' },
        { symbol: 'Denominator', meaning: 'The bottom number — how many parts make a whole' },
        { symbol: 'LCD', meaning: 'Lowest common denominator, needed before adding or subtracting' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Fraction Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter both fractions',
          description: 'Mixed numbers such as 2 3/4 are accepted and converted automatically.'
        },
        {
          stepNumber: 2,
          title: 'Choose the operation',
          description: 'Addition, subtraction, multiplication or division.'
        },
        {
          stepNumber: 3,
          title: 'Read the simplified result and the steps',
          description:
            'The answer is given in lowest terms, as a mixed number where appropriate, and as a decimal.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: 3/4 + 2/6',
      scenario: 'Adding two fractions with different denominators.',
      inputs: [
        { label: 'First fraction', value: '3/4' },
        { label: 'Second fraction', value: '2/6' },
        { label: 'Operation', value: 'Addition' }
      ],
      steps: [
        'Simplify 2/6 to 1/3 first — this keeps the numbers smaller.',
        'Lowest common denominator of 4 and 3 is 12.',
        '3/4 = 9/12 and 1/3 = 4/12.',
        '9/12 + 4/12 = 13/12.',
        '13/12 is improper, so convert: 1 1/12.'
      ],
      result: '13/12 = 1 1/12 ≈ 1.0833',
      takeaway:
        'Simplifying before you start keeps the common denominator small. Doing it afterwards works too, but leaves you multiplying larger numbers than necessary.'
    },
    sections: [
      {
        id: 'common-mistakes',
        title: 'Where fractions usually go wrong',
        paragraphs: [
          'A few errors account for most wrong answers:'
        ],
        bullets: [
          'Adding denominators as well as numerators. 1/2 + 1/3 is not 2/5 — the denominators must match first and then stay put.',
          'Forgetting to convert mixed numbers before multiplying or dividing.',
          'Flipping the wrong fraction when dividing — it is always the second one that inverts.',
          'Leaving the answer unsimplified. 6/8 is correct but 3/4 is the expected form.'
        ],
        callout: {
          type: 'tip',
          title: 'Sanity-check with decimals',
          text: 'Convert both fractions to decimals and do the operation roughly in your head. If 3/4 + 1/3 comes out near 1.08, the fraction answer should too.'
        }
      }
    ],
    faqs: [
      {
        question: 'Why do denominators need to match for addition?',
        answer:
          'Because a fraction describes parts of a whole, and you can only add parts that are the same size. Quarters and thirds are different-sized pieces, so they must both be rewritten as twelfths before they can be combined.'
      },
      {
        question: 'How do I divide fractions?',
        answer:
          'Multiply by the reciprocal of the second fraction — flip it upside down and multiply. So 1/2 ÷ 1/4 becomes 1/2 × 4/1 = 4/2 = 2.'
      },
      {
        question: 'What is an improper fraction?',
        answer:
          'One where the numerator is larger than the denominator, such as 13/12. It is perfectly valid and often easier to work with, but is usually converted to a mixed number like 1 1/12 for a final answer.'
      }
    ]
  },

  'square-footage-calculator': {
    calculatorId: 'square-footage-calculator',
    title: 'Square Footage Calculator',
    subtitle:
      'Measure square footage for rooms of any shape, add a waste allowance, and get the material quantity to actually order.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Construction & DIY Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Material coverage varies by product and installation method. Confirm coverage figures with the manufacturer before ordering.',
    overview: [
      'Square footage is the starting point for almost every material estimate — flooring, paint, tile, turf. Get it wrong and every downstream quantity is wrong too.',
      'Rooms are rarely simple rectangles. The reliable method is to break an awkward shape into rectangles, calculate each, and add them together.'
    ],
    formulaCard: {
      title: 'Area by Shape',
      formula: 'Rectangle: length × width',
      explanation:
        'Triangle: (base × height) ÷ 2. Circle: π × radius². For an L-shaped room, split it into two rectangles and sum. To convert square metres to square feet, multiply by 10.764.',
      variables: [
        { symbol: 'Waste factor', meaning: '10% for simple layouts, 15%+ for diagonals or patterns' },
        { symbol: 'Coverage', meaning: 'Area one unit of material covers — check the packaging' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Square Footage Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Measure at floor level',
          description:
            'Walls are not always parallel. Measure each wall rather than assuming opposite walls match.'
        },
        {
          stepNumber: 2,
          title: 'Split complex shapes into rectangles',
          description:
            'An L-shaped room is two rectangles. Calculate each separately and add — far more reliable than trying to average it.'
        },
        {
          stepNumber: 3,
          title: 'Subtract large permanent fixtures',
          description:
            'Kitchen islands and built-in units that will not be floored. Do not bother subtracting small obstructions.'
        },
        {
          stepNumber: 4,
          title: 'Add a waste allowance',
          description:
            'Ten percent for straightforward layouts, fifteen or more for diagonal patterns or many cuts.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: L-Shaped Room',
      scenario:
        'A main area of 14 ft × 12 ft with an alcove of 6 ft × 5 ft, being floored with boxes covering 20 sq ft each.',
      inputs: [
        { label: 'Main area', value: '14 ft × 12 ft' },
        { label: 'Alcove', value: '6 ft × 5 ft' },
        { label: 'Waste allowance', value: '10%' },
        { label: 'Coverage per box', value: '20 sq ft' }
      ],
      steps: [
        'Main area = 14 × 12 = 168 sq ft.',
        'Alcove = 6 × 5 = 30 sq ft.',
        'Total = 198 sq ft.',
        'With 10% waste = 198 × 1.10 = 217.8 sq ft.',
        'Boxes needed = 217.8 ÷ 20 = 10.89, so order 11.'
      ],
      result: '198 sq ft measured · 218 sq ft with waste · 11 boxes',
      takeaway:
        'Always round boxes up. Ordering the exact calculated figure leaves nothing for mistakes, and a later box from a different batch may not match in shade.'
    },
    sections: [
      {
        id: 'waste-factor',
        title: 'Why waste allowance is not optional',
        paragraphs: [
          'Cuts produce offcuts that cannot always be reused. Patterned materials need alignment, which wastes more. Damaged pieces appear in most deliveries. And having a few spares after installation means a later repair matches.',
          'Ten percent covers straightforward rectangular rooms with simple cuts. Diagonal or herringbone layouts, rooms with many angles, and large-format tiles all justify fifteen percent or more.'
        ],
        callout: {
          type: 'warning',
          title: 'Batch variation is real',
          text: 'Tile and flooring shades differ slightly between production batches. Ordering everything at once from one batch avoids a visible mismatch if you run short.'
        }
      }
    ],
    faqs: [
      {
        question: 'How do I calculate square footage of an irregular room?',
        answer:
          'Divide it into rectangles and triangles, calculate each separately, and add the results. This is more accurate than trying to treat the whole space as one averaged shape.'
      },
      {
        question: 'Should I subtract doorways and windows?',
        answer:
          'For flooring, no — doorways are usually floored through. For paint, yes, subtract windows and doors from wall area. For tiling a wall, subtract anything large enough to matter.'
      },
      {
        question: 'How do I convert square metres to square feet?',
        answer:
          'Multiply by 10.764. Going the other way, multiply square feet by 0.0929. Note this is not the same factor as converting length, because area scales with the square of the linear conversion.'
      }
    ]
  },

  'concrete-calculator': {
    calculatorId: 'concrete-calculator',
    title: 'Concrete Calculator',
    subtitle:
      'Work out cubic yards or metres of concrete for slabs, footings and columns, and how many bags that translates to.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Construction & DIY Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Structural concrete work may require engineered specifications and permits. For foundations and load-bearing elements, follow engineered drawings and local building code.',
    overview: [
      'Concrete is ordered by volume, and volume errors are expensive in both directions. Order short and the pour has to stop, creating a cold joint that weakens the slab. Order long and you pay for concrete you cannot use.',
      'This calculator converts dimensions into volume and then into either ready-mix quantity or the number of bags.'
    ],
    formulaCard: {
      title: 'Volume for Common Pours',
      formula: 'Slab volume = length × width × thickness',
      explanation:
        'Keep all three in the same unit, then convert. One cubic yard = 27 cubic feet. Round footings use π × radius² × depth.',
      variables: [
        { symbol: 'Thickness', meaning: 'Convert inches to feet by dividing by 12 before multiplying' },
        { symbol: '27', meaning: 'Cubic feet per cubic yard' },
        { symbol: 'Bag yield', meaning: 'An 80 lb bag yields about 0.6 cu ft; a 60 lb bag about 0.45' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Concrete Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose the shape',
          description: 'Slab, footing, column or step — each uses a different volume formula.'
        },
        {
          stepNumber: 2,
          title: 'Enter the dimensions',
          description: 'Thickness is usually given in inches while length and width are in feet; the calculator handles the conversion.'
        },
        {
          stepNumber: 3,
          title: 'Add a waste allowance',
          description:
            'Five to ten percent covers uneven subgrade, spillage and slight over-excavation. Subgrade dips consume more concrete than people expect.'
        },
        {
          stepNumber: 4,
          title: 'Decide between bags and ready-mix',
          description:
            'Bags suit small pours. Above roughly one cubic yard, ready-mix is usually cheaper and far less work.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Patio Slab',
      scenario: 'A slab 12 ft × 10 ft at 4 inches thick, with 10% waste allowance.',
      inputs: [
        { label: 'Length', value: '12 ft' },
        { label: 'Width', value: '10 ft' },
        { label: 'Thickness', value: '4 in (0.333 ft)' },
        { label: 'Waste', value: '10%' }
      ],
      steps: [
        'Volume = 12 × 10 × 0.333 = 40 cubic feet.',
        'Convert to cubic yards: 40 ÷ 27 = 1.48 cu yd.',
        'With 10% waste: 1.48 × 1.10 = 1.63 cu yd.',
        'In 80 lb bags: 40 × 1.10 ÷ 0.6 = 74 bags.'
      ],
      result: '1.63 cubic yards · or about 74 × 80 lb bags',
      takeaway:
        'Seventy-four bags is roughly 2.6 tonnes to mix by hand. At this size ready-mix is the sensible choice — the bag figure mainly illustrates why.'
    },
    sections: [
      {
        id: 'bags-vs-readymix',
        title: 'Bags or ready-mix?',
        paragraphs: [
          'Bagged concrete makes sense for post holes, small pads and repairs — anything under roughly half a cubic yard. Beyond that the labour becomes significant and consistency suffers, since each batch is mixed separately.',
          'Ready-mix arrives pre-mixed and consistent, but suppliers usually have a minimum order and may charge for part-loads. There is also a time limit once it arrives, so formwork and labour must be ready before the truck does.'
        ],
        callout: {
          type: 'warning',
          title: 'Never pause a structural pour',
          text: 'Stopping mid-pour creates a cold joint where the new concrete does not bond properly to the set concrete. That plane is a permanent weakness. Order slightly over rather than risk running short.'
        }
      }
    ],
    faqs: [
      {
        question: 'How many bags of concrete are in a cubic yard?',
        answer:
          'About 45 bags of 80 lb, or 60 bags of 60 lb. The exact figure depends on the mix, but 0.6 cubic feet per 80 lb bag is a reliable working assumption.'
      },
      {
        question: 'How thick should a concrete slab be?',
        answer:
          'Four inches is typical for patios and footpaths. Driveways and anything carrying vehicle loads usually need five to six inches, often with reinforcement. Structural slabs should follow engineered specifications, not rules of thumb.'
      },
      {
        question: 'How much extra should I order?',
        answer:
          'Five to ten percent. Subgrade is never perfectly level, and the low spots consume more concrete than the calculation predicts. Running short mid-pour is far more costly than a small surplus.'
      }
    ]
  },

  'gas-mileage-calculator': {
    calculatorId: 'gas-mileage-calculator',
    title: 'Gas Mileage Calculator',
    subtitle:
      'Work out real fuel economy from your odometer and fill-up, in MPG (US or UK) or litres per 100 km.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Automotive Desk',
      lastUpdated: 'September 2026'
    },
    overview: [
      'Official economy figures come from standardised laboratory cycles. Real driving involves cold starts, traffic, weather and load, so actual consumption is usually worse — often by 10–20%.',
      'Measuring it yourself takes two fill-ups and gives the number that actually applies to your car, your route and your driving.'
    ],
    formulaCard: {
      title: 'Fuel Economy',
      formula: 'MPG = Miles driven ÷ Gallons used',
      explanation:
        'For metric: L/100km = (Litres used ÷ Kilometres driven) × 100. Note these run in opposite directions — a higher MPG is better, a lower L/100km is better.',
      variables: [
        { symbol: 'Miles driven', meaning: 'Trip meter reading since the last fill-up' },
        { symbol: 'Gallons used', meaning: 'Amount needed to refill to the same level' },
        { symbol: 'US vs UK gallon', meaning: 'A UK gallon is 4.546 L; a US gallon is 3.785 L' }
      ]
    },
    howToSteps: {
      title: 'How to Measure Fuel Economy Accurately',
      steps: [
        {
          stepNumber: 1,
          title: 'Fill the tank completely and reset the trip meter',
          description: 'Fill to the first automatic cut-off — not brim-full, which is inconsistent.'
        },
        {
          stepNumber: 2,
          title: 'Drive normally for at least one full tank',
          description:
            'A longer measurement period averages out variation. A single short trip is not representative.'
        },
        {
          stepNumber: 3,
          title: 'Refill at the same pump style and cut-off point',
          description: 'Consistency between fill-ups matters more than precision in either one.'
        },
        {
          stepNumber: 4,
          title: 'Enter the trip distance and the litres or gallons added',
          description: 'The amount added is exactly the amount consumed over that distance.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A trip meter reading 412 miles, requiring 11.8 US gallons to refill.',
      inputs: [
        { label: 'Distance', value: '412 miles' },
        { label: 'Fuel added', value: '11.8 US gallons' }
      ],
      steps: [
        'MPG = 412 ÷ 11.8 = 34.9 US MPG.',
        'In UK gallons: 11.8 US gal = 9.82 UK gal, so 412 ÷ 9.82 = 42.0 UK MPG.',
        'Metric: 11.8 US gal = 44.7 L over 663 km → (44.7 ÷ 663) × 100 = 6.74 L/100km.'
      ],
      result: '34.9 US MPG · 42.0 UK MPG · 6.74 L/100km',
      takeaway:
        'The same car, three very different numbers. UK and US MPG differ by about 20% purely because the gallons differ, which is why cross-market economy comparisons are so often wrong.'
    },
    sections: [
      {
        id: 'improving-economy',
        title: 'What actually improves fuel economy',
        paragraphs: [
          'Most meaningful gains come from how and where you drive rather than from additives or gadgets:'
        ],
        bullets: [
          'Steady speeds. Aerodynamic drag rises with the square of speed, so 70 mph uses considerably more than 60.',
          'Smooth inputs. Hard acceleration followed by braking converts fuel directly into brake heat.',
          'Correct tyre pressures. Under-inflation measurably increases rolling resistance.',
          'Reduced weight and drag — roof boxes and bars are a large penalty at motorway speeds.',
          'Fewer cold starts. Short trips from cold are by far the least efficient driving there is.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why is my real MPG lower than the official figure?',
        answer:
          'Official figures come from controlled test cycles that do not reflect real conditions. Cold starts, traffic, weather, hills, load and driving style all reduce economy. A shortfall of 10–20% is normal.'
      },
      {
        question: 'Is the car\'s own MPG display accurate?',
        answer:
          'Usually close but often slightly optimistic — trip computers commonly over-read by a few percent. Calculating from actual fuel purchased and distance travelled is the reliable method.'
      },
      {
        question: 'Why do UK and US MPG figures differ?',
        answer:
          'Because the gallons are different sizes. A UK imperial gallon is 4.546 litres against 3.785 for a US gallon, so the same car scores about 20% higher in UK MPG. Always check which is being quoted.'
      }
    ]
  },

  'time-card-calculator': {
    calculatorId: 'time-card-calculator',
    title: 'Time Card Calculator',
    subtitle:
      'Total a week of clock-in and clock-out times, deduct breaks, and split regular hours from overtime.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Overtime rules, break entitlements and rounding practices are set by law and by employment contract, and vary by jurisdiction. Check the rules that apply to you.',
    overview: [
      'Adding up worked hours by hand is error-prone because time is base-60 and pay is decimal. Seven hours and forty-five minutes is 7.75 hours, not 7.45 — a mistake that quietly understates pay on every timesheet it appears in.',
      'This calculator totals a week of shifts, handles shifts crossing midnight, deducts breaks and separates overtime.'
    ],
    formulaCard: {
      title: 'Converting Time to Decimal Hours',
      formula: 'Decimal hours = Hours + (Minutes ÷ 60)',
      explanation:
        'Payroll runs on decimal hours. The conversion is where most timesheet errors originate, because 45 minutes intuitively looks like 0.45 rather than 0.75.',
      variables: [
        { symbol: '15 min', meaning: '0.25 hours' },
        { symbol: '30 min', meaning: '0.50 hours' },
        { symbol: '45 min', meaning: '0.75 hours' },
        { symbol: '10 min', meaning: '0.1667 hours' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Time Card Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter clock-in and clock-out for each day',
          description: 'Shifts crossing midnight are handled — enter the actual times.'
        },
        {
          stepNumber: 2,
          title: 'Deduct unpaid breaks',
          description: 'Enter break minutes per day. Whether breaks are paid depends on your contract and local law.'
        },
        {
          stepNumber: 3,
          title: 'Set the overtime threshold',
          description: 'Commonly 40 hours a week, though daily thresholds apply in some jurisdictions.'
        },
        {
          stepNumber: 4,
          title: 'Check the decimal total against your payslip',
          description: 'This is the figure payroll should be using.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: One Week',
      scenario: 'Five shifts with a 30-minute unpaid break each day, and a 40-hour overtime threshold.',
      inputs: [
        { label: 'Mon–Thu', value: '08:00–17:00, 30 min break' },
        { label: 'Friday', value: '08:00–18:30, 30 min break' },
        { label: 'Overtime after', value: '40 hours' },
        { label: 'Overtime rate', value: '1.5×' }
      ],
      steps: [
        'Mon–Thu: 9 hours each less 0.5 break = 8.5 hours × 4 = 34 hours.',
        'Friday: 10.5 hours less 0.5 break = 10 hours.',
        'Weekly total = 44 hours.',
        'Regular = 40 hours. Overtime = 4 hours at 1.5× = 6 hours equivalent pay.',
        'Total paid equivalent = 46 hours.'
      ],
      result: '44 hours worked · 40 regular + 4 overtime · 46 hours equivalent pay',
      takeaway:
        'The half-hour daily break removes 2.5 hours across the week. Over a year that is around 130 unpaid hours, which is worth confirming against your contract.'
    },
    sections: [
      {
        id: 'rounding',
        title: 'How rounding works',
        paragraphs: [
          'Many employers round clock times to the nearest quarter-hour. Where this is permitted, it generally must be neutral — rounding both up and down — rather than systematically favouring the employer.',
          'Consistent rounding in one direction across many shifts adds up to real money. If your recorded hours are reliably lower than your actual ones, that is worth raising.'
        ],
        callout: {
          type: 'info',
          title: 'Keep your own record',
          text: 'Your own contemporaneous log of hours is useful if a timesheet is ever disputed. It costs nothing to maintain and is the only independent record you will have.'
        }
      }
    ],
    faqs: [
      {
        question: 'How do I convert minutes to decimal hours?',
        answer:
          'Divide the minutes by 60. So 45 minutes is 45 ÷ 60 = 0.75 hours. Writing 7 hours 45 minutes as 7.45 instead of 7.75 is the most common timesheet error.'
      },
      {
        question: 'Are breaks paid?',
        answer:
          'It depends on jurisdiction and contract. Short rest breaks are frequently paid while longer meal breaks frequently are not. Check your contract, since this determines whether break time should be deducted.'
      },
      {
        question: 'How is overtime calculated?',
        answer:
          'Typically at 1.5× the regular rate for hours above a weekly threshold, commonly 40. Some jurisdictions also apply daily thresholds, and some apply higher multipliers for specific days. The rules vary — check what applies to you.'
      }
    ]
  },

  'temperature-converter': {
    calculatorId: 'temperature-converter',
    title: 'Temperature Converter',
    subtitle:
      'Convert between Celsius, Fahrenheit and Kelvin, with the conversion formula shown alongside the answer.',
    readTimeMinutes: 3,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Education & Mathematics Desk',
      lastUpdated: 'September 2026'
    },
    overview: [
      'Temperature conversion is unusual among unit conversions because the scales have different zero points as well as different step sizes. That is why you cannot simply multiply by a factor the way you can with length or weight.'
    ],
    formulaCard: {
      title: 'Conversion Formulas',
      formula: '°F = (°C × 9/5) + 32',
      explanation:
        'Reversing it: °C = (°F − 32) × 5/9. Kelvin shares Celsius\'s step size but starts at absolute zero, so K = °C + 273.15.',
      variables: [
        { symbol: '9/5 = 1.8', meaning: 'A Fahrenheit degree is smaller than a Celsius degree' },
        { symbol: '+32', meaning: 'Offset because water freezes at 0°C but 32°F' },
        { symbol: '273.15', meaning: 'Celsius degrees between absolute zero and water\'s freezing point' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Temperature Converter',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter a temperature in any scale',
          description: 'The other two update immediately.'
        },
        {
          stepNumber: 2,
          title: 'Check the formula shown',
          description: 'Useful if you need to reproduce the conversion by hand.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: 25°C',
      scenario: 'Converting a typical warm day from Celsius.',
      inputs: [{ label: 'Input', value: '25°C' }],
      steps: [
        '°F = (25 × 9/5) + 32 = 45 + 32 = 77°F.',
        'K = 25 + 273.15 = 298.15 K.'
      ],
      result: '25°C = 77°F = 298.15 K',
      takeaway:
        'A useful mental shortcut: double the Celsius figure and add 30. For 25°C that gives 80 against the true 77 — close enough for weather, though it drifts at higher temperatures.'
    },
    sections: [
      {
        id: 'reference-points',
        title: 'Reference points worth memorising',
        paragraphs: [
          'A handful of anchors make estimation easy without any arithmetic:'
        ],
        bullets: [
          '−40°C = −40°F — the one point where the two scales meet.',
          '0°C = 32°F — water freezes.',
          '10°C = 50°F — cool.',
          '20°C = 68°F — comfortable room temperature.',
          '37°C = 98.6°F — normal human body temperature.',
          '100°C = 212°F — water boils at sea level.'
        ],
        callout: {
          type: 'info',
          title: 'Why Kelvin has no degree symbol',
          text: 'Kelvin is an absolute scale measuring from absolute zero, so it is written as 298 K rather than 298°K. It is the SI base unit for temperature.'
        }
      }
    ],
    faqs: [
      {
        question: 'What is the quickest way to convert Celsius to Fahrenheit in my head?',
        answer:
          'Double it and add 30. For 20°C that gives 70 against the true 68. Accurate enough for weather, though the error grows at higher temperatures — at 100°C it would give 230 against the true 212.'
      },
      {
        question: 'At what temperature are Celsius and Fahrenheit equal?',
        answer:
          'At −40 degrees. It is the only point where the two scales give the same number, which follows from the different step sizes and offsets.'
      },
      {
        question: 'Why does Fahrenheit use 32 for freezing?',
        answer:
          'Fahrenheit set his zero using a freezing brine solution, the coldest temperature he could reliably reproduce, and calibrated other points from there. Water\'s freezing point landed at 32 as a consequence rather than by design.'
      }
    ]
  }
};
