import { CALCULATORS_REGISTRY } from './calculators';

export interface HubGroup {
  title: string;
  blurb: string;
  slugs: string[];
}

export interface CategoryHub {
  slug: string;
  name: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Lead paragraphs shown under the H1. */
  intro: string[];
  /** Slugs surfaced as the cluster's headline tools. */
  flagshipSlugs: string[];
  groups: HubGroup[];
  faqs?: { question: string; answer: string }[];
  /** Optional trailing editorial section. */
  closing?: { title: string; paragraphs: string[] };
  /** Other hub slugs to cross-link. */
  relatedHubs: string[];
  /** Shown above the tool list on YMYL hubs. */
  notice?: string;
}

export const CATEGORY_HUBS: CategoryHub[] = [
  {
    slug: 'financial-calculators',
    seoTitle: 'Financial Calculators: Loans, Mortgages & Investments',
    seoDescription:
      '56 finance calculators covering mortgages, loan repayments, compound interest, retirement, debt payoff and tax. Free, accurate and private.',
    keywords: ['financial calculators', 'loan calculators', 'investment calculators', 'mortgage calculator', 'debt calculators', 'money calculators', 'interest calculator'],
    name: 'Financial Calculators',
    h1: 'Financial Calculators',
    intro: [
      'Money questions usually come down to one of three things: what a payment will be, what something will be worth later, or which of two options costs less. The calculators below cover all three, from a mortgage payment to a retirement projection.',
      'Every tool shows the formula it uses and the numbers behind the result, so you can check the working rather than take an answer on trust. Nothing you enter is sent anywhere — the maths runs in your browser.'
    ],
    flagshipSlugs: [
      'mortgage-calculator',
      'emi-calculator',
      'compound-interest-calculator',
      'sip-calculator',
      'retirement-calculator'
    ],
    groups: [
      {
        title: 'Mortgages & property',
        blurb: 'Work out what a home actually costs — monthly, and across the full term.',
        slugs: [
          'mortgage-calculator',
          'home-affordability-calculator',
          'mortgage-refinance-calculator',
          'rent-vs-buy-calculator',
          'heloc-calculator',
          'rental-property-roi-calculator',
          'fha-loan-calculator',
          'va-mortgage-calculator',
          'mortgage-calculator-uk',
          'canadian-mortgage-calculator',
          'stamp-duty-calculator'
        ]
      },
      {
        title: 'Loans & debt',
        blurb: 'Compare offers, plan a payoff, and see what the interest really adds up to.',
        slugs: [
          'emi-calculator',
          'loan-calculator',
          'auto-loan-calculator',
          'personal-loan-calculator',
          'student-loan-calculator',
          'credit-card-payoff-calculator',
          'debt-payoff-calculator',
          'debt-consolidation-calculator',
          'debt-ratio-calculator',
          'car-lease-vs-buy-calculator',
          'business-loan-calculator',
          'boat-loan-calculator',
          'interest-rate-calculator'
        ]
      },
      {
        title: 'Saving & investing',
        blurb: 'Project growth over time, and see what compounding and inflation do to it.',
        slugs: [
          'compound-interest-calculator',
          'simple-interest-calculator',
          'sip-calculator',
          'savings-calculator',
          'cd-calculator',
          'bond-calculator',
          'dividend-yield-calculator',
          'inflation-calculator',
          'net-worth-calculator',
          'ppf-calculator',
          'college-cost-calculator'
        ]
      },
      {
        title: 'Retirement',
        blurb: 'Account-specific projections, plus the question underneath them: will it be enough?',
        slugs: [
          'retirement-calculator',
          '401k-calculator',
          'roth-ira-calculator',
          'ira-calculator',
          'pension-calculator',
          'social-security-calculator',
          'annuity-calculator',
          'annuity-payout-calculator'
        ]
      },
      {
        title: 'Tax, salary & business',
        blurb: 'Gross to net, tax owed, and the ratios businesses are measured on.',
        slugs: [
          'salary-calculator',
          'income-tax-calculator',
          'capital-gains-tax-calculator',
          'gst-calculator',
          'vat-calculator',
          'commission-calculator',
          'margin-calculator',
          'depreciation-calculator',
          'roi-calculator',
          'irr-calculator',
          'payback-period-calculator'
        ]
      },
      {
        title: 'Everyday money',
        blurb: 'Small, frequent calculations that are quicker here than in your head.',
        slugs: ['tip-calculator', 'discount-calculator']
      }
    ],
    faqs: [
      {
        question: 'Which calculator should I use for a home loan?',
        answer:
          'Start with the mortgage calculator if you already know the price and rate — it gives the monthly payment and full amortisation. If you are still working out your budget, use the home affordability calculator first, then come back to the mortgage calculator with a realistic price.'
      },
      {
        question: 'Why do two calculators give me slightly different answers?',
        answer:
          'Usually because they compound differently or include different costs. A mortgage calculator that includes taxes and insurance will show a higher monthly figure than one showing principal and interest alone. Each page states what it includes and how it compounds.'
      },
      {
        question: 'Are these calculators accurate enough to make decisions on?',
        answer:
          'They use standard published formulas and are accurate for the inputs you give them. What they cannot know is your lender\'s specific fees, your exact tax position, or what rates will do in future. Treat the results as well-informed estimates for planning, and confirm the numbers with the lender or an adviser before committing.'
      },
      {
        question: 'Is the information I enter stored anywhere?',
        answer:
          'No. Every calculation runs in your browser. Figures like your income, balances and loan amounts are never transmitted to a server and are gone when you close the tab.'
      }
    ],
    closing: {
      title: 'Reading a financial result properly',
      paragraphs: [
        'Two numbers matter on almost every finance calculation, and people usually only look at one. The monthly payment tells you whether you can afford it now. The total interest tells you what the decision costs over its life. A longer term nearly always improves the first and worsens the second, sometimes dramatically.',
        'It is also worth separating a quoted interest rate from an APR. The rate drives the payment; the APR folds in fees and is the fairer basis for comparing two offers. Where a calculator handles both, it says which one it is using.'
      ]
    },
    relatedHubs: ['math-calculators', 'date-time-calculators']
  },

  {
    slug: 'health-calculators',
    seoTitle: 'Health & Fitness Calculators: BMI, Calories, Body Fat',
    seoDescription:
      'Work out BMI, daily calories, macros, body fat and ideal weight using recognised clinical formulas. Every tool shows its method and its limits.',
    keywords: ['health calculators', 'fitness calculators', 'bmi calculator', 'calorie calculator', 'body fat calculator', 'nutrition calculators', 'tdee calculator'],
    name: 'Health & Fitness Calculators',
    h1: 'Health & Fitness Calculators',
    notice:
      'These tools give estimates based on published formulas. They are not medical advice and cannot account for your individual medical history. Speak to a healthcare professional before acting on any result.',
    intro: [
      'Most health calculators answer one of two questions: what does my body currently look like in numbers, and how much should I be eating or training to change it. The tools below cover both, and each one names the formula it uses.',
      'That matters more than it sounds. Body fat estimates, calorie targets and ideal weight figures vary widely depending on which equation is applied, and a result means little without knowing where it came from and who it tends to get wrong.'
    ],
    flagshipSlugs: ['bmi-calculator', 'calorie-calculator', 'tdee-calculator', 'body-fat-calculator'],
    groups: [
      {
        title: 'Body composition',
        blurb: 'Where your weight sits, and what it is made of.',
        slugs: [
          'bmi-calculator',
          'body-fat-calculator',
          'lean-body-mass-calculator',
          'ideal-weight-calculator',
          'army-body-fat-calculator',
          'bsa-calculator'
        ]
      },
      {
        title: 'Calories & energy',
        blurb: 'What you burn at rest, across a full day, and what to eat against it.',
        slugs: [
          'calorie-calculator',
          'tdee-calculator',
          'bmr-calculator',
          'calories-burned-calculator'
        ]
      },
      {
        title: 'Macros & nutrition',
        blurb: 'Turning a calorie figure into actual food targets.',
        slugs: [
          'macro-calculator',
          'protein-calculator',
          'carbohydrate-calculator',
          'fat-intake-calculator',
          'water-intake-calculator'
        ]
      },
      {
        title: 'Training & performance',
        blurb: 'Numbers for programming sessions rather than describing your body.',
        slugs: ['one-rep-max-calculator', 'pace-calculator', 'target-heart-rate-calculator']
      },
      {
        title: 'Pregnancy & fertility',
        blurb: 'Cycle and pregnancy timing based on standard clinical dating.',
        slugs: ['pregnancy-due-date-calculator', 'ovulation-calculator']
      },
      {
        title: 'Clinical & wellbeing',
        blurb: 'Estimates that carry real risk if misread — check the caveats on each page.',
        slugs: ['gfr-calculator', 'bac-calculator', 'sleep-cycle-calculator']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between BMR, TDEE and a calorie target?',
        answer:
          'BMR is what your body burns at complete rest. TDEE is BMR plus everything else you do in a day, which is your maintenance level. A calorie target is TDEE adjusted up or down depending on whether you want to gain or lose. Each has its own calculator here, and they build on each other in that order.'
      },
      {
        question: 'Is BMI reliable?',
        answer:
          'It is a useful population-level screening measure and a poor individual diagnosis. BMI cannot tell muscle from fat, so it misclassifies muscular people as overweight and can miss excess fat in older adults who have lost muscle. It also ignores where fat is carried, which is what most affects health risk. Body fat percentage and waist measurements tell you more.'
      },
      {
        question: 'Why do ideal weight calculators disagree with each other?',
        answer:
          'Because there are several competing formulas — Devine, Robinson, Miller and Hamwi — developed at different times for different purposes, some of them originally for drug dosing rather than health. The ideal weight calculator shows all of them side by side rather than picking one, because the spread between them is the honest answer.'
      },
      {
        question: 'Can I use the BAC calculator to decide whether to drive?',
        answer:
          'No. Blood alcohol estimates vary enormously with food, hydration, medication, body composition and individual metabolism, and the Widmark formula cannot account for any of that reliably. The only safe assumption after drinking is that you should not drive.'
      }
    ],
    closing: {
      title: 'How these formulas were chosen',
      paragraphs: [
        'Where a recognised standard exists, these calculators implement it rather than a simplified version. Calorie and metabolic tools use the Mifflin-St Jeor equation, which has outperformed the older Harris-Benedict equation in validation studies. Kidney function uses the 2021 race-free CKD-EPI equation rather than the deprecated race-adjusted version. Body surface area offers both Du Bois and Mosteller, since clinical practice uses both.',
        'The formula and its source are stated on each page. If a calculation here disagrees with one your clinician uses, the difference is almost always the equation, not an error — and theirs is the one to go with.'
      ]
    },
    relatedHubs: ['math-calculators', 'cooking-calculators']
  },

  {
    slug: 'math-calculators',
    seoTitle: 'Math Calculators: Percentages, Algebra & Statistics',
    seoDescription:
      'Solve percentages, fractions, quadratics, geometry and statistics step by step. Each tool shows the working, not just the answer.',
    keywords: ['math calculators', 'maths calculator', 'percentage calculator', 'fraction calculator', 'statistics calculator', 'geometry calculator', 'algebra solver'],
    name: 'Math Calculators',
    h1: 'Math Calculators',
    intro: [
      'Tools for the calculations that come up in schoolwork, coursework and everyday problems — percentages, fractions, geometry, statistics and number theory. Where the method matters as much as the answer, these show the working.'
    ],
    flagshipSlugs: ['percentage-calculator', 'scientific-calculator', 'fraction-calculator'],
    groups: [
      {
        title: 'Everyday arithmetic',
        blurb: 'The calculations people reach for most often.',
        slugs: [
          'percentage-calculator',
          'fraction-calculator',
          'ratio-calculator',
          'exponent-calculator',
          'log-calculator',
          'scientific-calculator'
        ]
      },
      {
        title: 'Number theory',
        blurb: 'Factors, multiples and primes, with the steps shown.',
        slugs: ['gcf-calculator', 'lcm-calculator', 'prime-factorization-calculator']
      },
      {
        title: 'Statistics & probability',
        blurb: 'Describing a data set, and working out how likely something is.',
        slugs: [
          'mean-median-mode-range-calculator',
          'average-calculator',
          'probability-calculator',
          'permutation-and-combination-calculator',
          'random-number-generator'
        ]
      },
      {
        title: 'Geometry',
        blurb: 'Areas, volumes, angles and the formulas behind them.',
        slugs: [
          'triangle-calculator',
          'right-triangle-calculator',
          'pythagorean-theorem-calculator',
          'volume-calculator',
          'surface-area-calculator',
          'slope-calculator'
        ]
      },
      {
        title: 'Algebra & number bases',
        blurb: 'Equation solving, and converting between binary, hex and decimal.',
        slugs: ['quadratic-formula-calculator', 'binary-calculator', 'hex-calculator']
      },
      {
        title: 'School & grades',
        blurb: '',
        slugs: ['gpa-calculator']
      }
    ],
    faqs: [
      {
        question: 'Do these calculators show the steps or just the answer?',
        answer:
          'Where showing the working is genuinely useful — fractions, quadratics, prime factorisation, percentages — the steps are shown. For tools where the intermediate steps add nothing, such as a random number generator, they are not.'
      },
      {
        question: 'What is the difference between the average calculator and the mean, median and mode calculator?',
        answer:
          'The average calculator handles arithmetic and weighted means plus standard deviation and variance. The mean, median, mode and range calculator covers the full set of descriptive statistics normally taught together as one topic. Use the second if you need all four measures at once.'
      }
    ],
    relatedHubs: ['science-calculators', 'financial-calculators']
  },

  {
    slug: 'date-time-calculators',
    seoTitle: 'Date & Time Calculators: Age, Duration & Countdowns',
    seoDescription:
      'Count days between dates, find your exact age, total timesheet hours and track countdowns. Handles leap years and month-end dates correctly.',
    keywords: ['date calculator', 'time calculator', 'age calculator', 'days between dates', 'duration calculator', 'timesheet calculator', 'countdown calculator'],
    name: 'Date & Time Calculators',
    h1: 'Date & Time Calculators',
    intro: [
      'Date arithmetic is easy to get subtly wrong. Leap years, month lengths that vary, and timezone boundaries all trip up manual counting. These tools handle those cases properly.',
      'Calculations use your local calendar date rather than UTC, so an age or a countdown matches the date you actually see on your device.'
    ],
    flagshipSlugs: ['age-calculator', 'date-calculator', 'time-card-calculator'],
    groups: [
      {
        title: 'Age & dates',
        blurb: 'Exact ages, gaps between dates, and what day something fell on.',
        slugs: [
          'age-calculator',
          'date-calculator',
          'days-until-calculator',
          'day-of-the-week-calculator',
          'chronological-age-calculator'
        ]
      },
      {
        title: 'Hours & timesheets',
        blurb: 'Adding up worked time, including shifts that cross midnight.',
        slugs: ['time-duration-calculator', 'hours-and-minutes-calculator', 'time-card-calculator']
      }
    ],
    faqs: [
      {
        question: 'How is an exact age calculated?',
        answer:
          'By counting complete years from the birth date, then complete months, then the remaining days — not by dividing total days by 365.25. That distinction matters around birthdays and at month ends, where the simpler method is often a day out.'
      },
      {
        question: 'Do these handle leap years?',
        answer:
          'Yes, including the century rule. Years divisible by 100 are not leap years unless they are also divisible by 400, which is why 1900 was not a leap year and 2000 was.'
      }
    ],
    relatedHubs: ['math-calculators', 'financial-calculators']
  },

  {
    slug: 'auto-vehicle-calculators',
    seoTitle: 'Car & Vehicle Calculators: MPG, Fuel Cost & Tyre Size',
    seoDescription:
      'Calculate fuel economy, trip costs, horsepower and tyre size effects on your speedometer. Works in both metric and imperial units.',
    keywords: ['car calculators', 'vehicle calculators', 'gas mileage calculator', 'fuel cost calculator', 'mpg calculator', 'tire size calculator', 'horsepower calculator'],
    name: 'Car & Vehicle Calculators',
    h1: 'Car & Vehicle Calculators',
    intro: [
      'Running costs, performance figures and the practical effects of changing your wheels. All of these work in both metric and imperial units, since vehicle specifications are rarely consistent about which they use.'
    ],
    flagshipSlugs: ['gas-mileage-calculator', 'fuel-cost-calculator'],
    groups: [
      {
        title: 'Fuel & running costs',
        blurb: 'What you are actually getting, and what a journey will cost.',
        slugs: ['gas-mileage-calculator', 'fuel-cost-calculator']
      },
      {
        title: 'Performance & fitment',
        blurb: 'Power figures, and what a tyre change does to your readings.',
        slugs: ['horsepower-calculator', 'tire-size-calculator']
      },
      {
        title: 'Other',
        blurb: '',
        slugs: ['roman-numeral-converter']
      }
    ],
    faqs: [
      {
        question: 'Why does my real-world MPG not match the manufacturer figure?',
        answer:
          'Official figures come from standardised test cycles run under controlled conditions. Real driving involves cold starts, traffic, weather, load and your right foot, all of which reduce economy. Calculating from your own odometer and fill-up gives you the number that actually applies to you.'
      },
      {
        question: 'Will fitting different tyres affect my speedometer?',
        answer:
          'Yes, if the overall rolling diameter changes. A larger diameter means fewer revolutions per mile, so the speedometer under-reads and the odometer records less distance than you travelled. The tyre size calculator shows the percentage error between two sizes.'
      }
    ],
    relatedHubs: ['science-calculators', 'financial-calculators']
  },

  {
    slug: 'science-calculators',
    seoTitle: 'Physics & Science Calculators: Force, Ohm\'s Law, Speed',
    seoDescription:
      'Solve for force, density, speed, voltage drop and electricity cost. Rearrangeable formulas that solve for any variable you leave blank.',
    keywords: ['physics calculators', 'science calculators', 'ohms law calculator', 'force calculator', 'speed distance time', 'voltage drop calculator', 'electrical calculators'],
    name: 'Physics & Science Calculators',
    h1: 'Physics & Science Calculators',
    intro: [
      'Physics and engineering relationships where you usually know two values and need the third. Each of these rearranges its formula automatically, so you can solve for whichever variable you leave blank.'
    ],
    flagshipSlugs: ['ohms-law-calculator', 'speed-distance-time-calculator', 'force-calculator'],
    groups: [
      {
        title: 'Mechanics',
        blurb: 'Motion, mass and force.',
        slugs: ['speed-distance-time-calculator', 'force-calculator', 'density-mass-volume-calculator']
      },
      {
        title: 'Electrical',
        blurb: 'Circuit values, cable sizing and running costs.',
        slugs: ['ohms-law-calculator', 'voltage-drop-calculator', 'electricity-calculator']
      },
      {
        title: 'Networking & encoding',
        blurb: 'Developer and network utilities. These run entirely in your browser — nothing you paste is uploaded.',
        slugs: [
          'ip-subnet-calculator',
          'bandwidth-calculator',
          'base64-encode-decode',
          'url-encode-decode'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I solve for any variable, or only the standard one?',
        answer:
          'Any of them. Leave the value you want blank and fill in the others — the calculator rearranges the formula and shows the rearranged version alongside the result.'
      },
      {
        question: 'Is anything I paste into the encoders sent to a server?',
        answer:
          'No. Base64 and URL encoding both run as JavaScript in your browser. Nothing is transmitted, which is why these are safe to use with strings you would not want to paste into an online tool.'
      }
    ],
    relatedHubs: ['math-calculators', 'construction-calculators']
  },

  {
    slug: 'construction-calculators',
    seoTitle: 'Construction Calculators: Concrete, Paint & Square Feet',
    seoDescription:
      'Estimate concrete, paint, tile, roofing and flooring quantities before you buy. Includes waste allowance so you order the right amount.',
    keywords: ['construction calculators', 'building material calculator', 'concrete calculator', 'square footage calculator', 'paint calculator', 'diy calculators', 'tile calculator'],
    name: 'Construction & DIY Calculators',
    h1: 'Construction & DIY Calculators',
    intro: [
      'Material estimates for jobs where ordering short means a second trip and ordering long means waste. Each tool includes a waste allowance, because a perfectly exact quantity is never the right amount to buy.'
    ],
    flagshipSlugs: ['square-footage-calculator', 'concrete-calculator', 'paint-calculator'],
    groups: [
      {
        title: 'Area & flooring',
        blurb: 'Start here — most other estimates need an area first.',
        slugs: ['square-footage-calculator', 'tile-calculator']
      },
      {
        title: 'Structural & outdoor',
        blurb: 'Volumes, coverage and layout for the heavier work.',
        slugs: [
          'concrete-calculator',
          'roofing-calculator',
          'stair-calculator',
          'gravel-and-mulch-calculator'
        ]
      },
      {
        title: 'Decorating',
        blurb: 'Wall coverage, accounting for doors, windows and pattern repeat.',
        slugs: ['paint-calculator', 'wallpaper-calculator']
      },
      {
        title: 'Heating & cooling',
        blurb: '',
        slugs: ['btu-calculator']
      }
    ],
    faqs: [
      {
        question: 'How much waste should I allow?',
        answer:
          'Around 10% for straightforward rectangular work, and 15% or more where there are diagonal cuts, complex shapes or a pattern to match. These calculators apply a default allowance and let you change it.'
      },
      {
        question: 'Why measure square footage separately first?',
        answer:
          'Because paint, tile, flooring and mulch estimates all start from an area figure. Getting that right once, including awkward shapes, means every downstream quantity is right too.'
      }
    ],
    relatedHubs: ['science-calculators', 'financial-calculators']
  },

  {
    // Promoted rather than duplicated: /unit-converter/ already exists and holds
    // its own authority, so it serves as this cluster's hub instead of a new
    // /unit-converters/ URL. Rendered by UnitConverterPage, not CategoryHubPage.
    slug: 'unit-converter',
    seoTitle: 'Unit Converter: Metric, Imperial, Temperature & More',
    seoDescription:
      'Convert length, weight, temperature, area, speed and data sizes instantly. Exact conversion factors, both metric and imperial, no rounding surprises.',
    keywords: ['unit converter', 'metric to imperial', 'measurement converter', 'celsius to fahrenheit', 'kg to lbs', 'length converter', 'conversion calculator'],
    name: 'Unit Converters',
    h1: 'Unit Converter',
    intro: [
      'Conversions between metric and imperial, using exact factors rather than the rounded ones that drift once you chain two conversions together.'
    ],
    flagshipSlugs: ['temperature-converter', 'length-converter', 'weight-converter'],
    groups: [
      {
        title: 'Common conversions',
        blurb: 'The measurements people convert most often.',
        slugs: ['temperature-converter', 'length-converter', 'weight-converter']
      },
      {
        title: 'Specialised conversions',
        blurb: 'Area, speed and digital storage.',
        slugs: ['area-converter', 'speed-converter', 'data-storage-converter']
      }
    ],
    faqs: [
      {
        question: 'Why do some converters give a slightly different answer than others?',
        answer:
          'Usually rounding. An inch is exactly 25.4mm by definition, but many tools round intermediate steps, and the error compounds if you convert twice. These use exact factors and round only the final displayed value.'
      },
      {
        question: 'What is the difference between MB and MiB?',
        answer:
          'A megabyte (MB) is 1,000,000 bytes under the decimal definition used by storage manufacturers. A mebibyte (MiB) is 1,048,576 bytes under the binary definition used by most operating systems. That gap is why a "1TB" drive shows as roughly 931GB once formatted. The data storage converter keeps the two systems separate.'
      }
    ],
    relatedHubs: ['cooking-calculators', 'science-calculators']
  },

  {
    slug: 'cooking-calculators',
    seoTitle: 'Cooking & Baking Calculators: Cups to Grams, Scaling',
    seoDescription:
      'Scale recipes, convert cups to grams by ingredient, time your roast and dial in coffee ratios. Weight-based conversions, not generic volume guesses.',
    keywords: ['cooking calculators', 'baking calculator', 'cups to grams', 'recipe converter', 'kitchen conversion', 'recipe scaler', 'cooking time calculator'],
    name: 'Cooking & Baking Calculators',
    h1: 'Cooking & Baking Calculators',
    intro: [
      'Kitchen conversions where getting it wrong actually changes the result. Baking in particular is unforgiving about volume measurements, because a cup of flour and a cup of sugar weigh very different amounts.'
    ],
    flagshipSlugs: ['baking-conversion-calculator', 'recipe-converter'],
    groups: [
      {
        title: 'Measuring & scaling',
        blurb: 'Converting between cups and grams, and resizing a recipe.',
        slugs: ['baking-conversion-calculator', 'recipe-converter']
      },
      {
        title: 'Cooking & brewing',
        blurb: 'Timing and ratios.',
        slugs: ['cooking-time-calculator', 'coffee-water-ratio-calculator']
      }
    ],
    faqs: [
      {
        question: 'Why does a cup of flour not weigh the same as a cup of sugar?',
        answer:
          'A cup is a measure of volume, not weight, and ingredients have different densities. A cup of plain flour is roughly 120g while a cup of granulated sugar is around 200g. Converting with a single generic factor is the most common cause of baking going wrong, which is why the converter is ingredient-specific.'
      },
      {
        question: 'Can I scale any recipe up or down?',
        answer:
          'Quantities scale cleanly, but cooking times and pan sizes do not scale proportionally. Doubling a cake mixture does not mean doubling the baking time — use a larger tin or split the batter, and check for doneness rather than trusting arithmetic.'
      }
    ],
    relatedHubs: ['health-calculators', 'math-calculators']
  }
];

/**
 * Maps a legacy registry category to the hub that best represents it, for the
 * homepage category grid. `everyday` split into two hubs, so it points at the
 * date/time one (which holds its flagship) and `auto-vehicle-calculators` is
 * surfaced separately — see HUBS_WITHOUT_CATEGORY_CARD.
 */
export const CATEGORY_HUB_BY_CATEGORY: Record<string, string> = {
  finance: 'financial-calculators',
  health: 'health-calculators',
  math: 'math-calculators',
  everyday: 'date-time-calculators',
  science: 'science-calculators',
  construction: 'construction-calculators',
  conversion: 'unit-converter',
  food: 'cooking-calculators'
};

/** Hubs with no corresponding homepage category card, so they are not orphaned. */
export const HUBS_WITHOUT_CATEGORY_CARD = ['auto-vehicle-calculators'];

/** Hub lookup by slug. */
export const getHubBySlug = (slug: string): CategoryHub | undefined =>
  CATEGORY_HUBS.find(h => h.slug === slug);

/** Every slug that appears in any hub group. */
export const HUB_MEMBER_SLUGS: string[] = CATEGORY_HUBS.flatMap(h =>
  h.groups.flatMap(g => g.slugs)
);

/** The hub a calculator belongs to, or undefined if it is unclustered. */
export const getHubForCalculator = (slug: string): CategoryHub | undefined =>
  CATEGORY_HUBS.find(h => h.groups.some(g => g.slugs.includes(slug)));

/** Resolve a slug list to registry entries, dropping anything that no longer exists. */
export const resolveCalculators = (slugs: string[]) =>
  slugs
    .map(s => CALCULATORS_REGISTRY.find(c => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
