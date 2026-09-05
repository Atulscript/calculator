import { CalculatorMeta } from '../types/calculator';

export const CALCULATORS_REGISTRY: CalculatorMeta[] = [
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    title: 'Age Calculator',
    shortDescription: 'Calculate exact chronological age in years, months, days, minutes & seconds with birthday countdown, zodiac, and planetary ages.',
    category: 'everyday',
    tags: ['age', 'birthday', 'dob', 'chronological', 'years', 'months', 'days', 'zodiac', 'planetary'],
    icon: 'CalendarClock'
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    shortDescription: 'Calculate Body Mass Index (BMI), ideal weight range, body category, and health metrics according to WHO standards.',
    category: 'health',
    tags: ['health', 'bmi', 'weight', 'height', 'body mass index', 'fitness'],
    icon: 'Activity'
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    title: 'Loan & EMI Calculator',
    shortDescription: 'Calculate monthly loan EMI payments, total interest payable, loan amortization schedules, and extra payment savings.',
    category: 'finance',
    tags: ['loan', 'emi', 'mortgage', 'interest', 'amortization', 'bank'],
    icon: 'Landmark'
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    shortDescription: 'Solve common percentage calculations: X% of Y, percentage increase or decrease, discount, markup, and ratio.',
    category: 'math',
    tags: ['percentage', 'discount', 'increase', 'decrease', 'fraction', 'ratio'],
    icon: 'Percent'
  },
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    shortDescription: 'Calculate the exact number of days, weeks, months, and business days between any two dates on the calendar.',
    category: 'everyday',
    tags: ['date', 'duration', 'days between', 'working days', 'business days'],
    icon: 'CalendarRange'
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    title: 'Calorie & TDEE Calculator',
    shortDescription: 'Estimate your Total Daily Energy Expenditure (TDEE), BMR, and daily calorie target for weight loss or muscle gain.',
    category: 'health',
    tags: ['calorie', 'tdee', 'bmr', 'weight loss', 'nutrition', 'macros'],
    icon: 'Flame'
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    shortDescription: 'Forecast investment growth over time with compound interest, regular monthly deposits, and inflation adjustment.',
    category: 'finance',
    tags: ['compound interest', 'investing', 'savings', 'future value', 'stocks', 'returns'],
    icon: 'TrendingUp'
  },
  {
    id: 'recipe-converter',
    slug: 'recipe-converter',
    title: 'Recipe & Ingredient Scaler',
    shortDescription: 'Scale cooking and baking ingredient quantities up or down effortlessly for any serving size or pan dimension.',
    category: 'food',
    tags: ['food', 'recipe', 'baking', 'cooking', 'servings', 'kitchen', 'cups to grams'],
    icon: 'UtensilsCrossed'
  },
  {
    id: 'square-footage-calculator',
    slug: 'square-footage-calculator',
    title: 'Square Footage & Flooring Calculator',
    shortDescription: 'Calculate total square footage, square meters, tile quantities, and flooring materials needed with waste factors.',
    category: 'construction',
    tags: ['construction', 'square footage', 'sq ft', 'flooring', 'tiles', 'paint', 'area'],
    icon: 'HardHat'
  },
  {
    id: 'time-duration-calculator',
    slug: 'time-duration-calculator',
    title: 'Time Duration Calculator',
    shortDescription: 'Add, subtract, and calculate durations between hours, minutes, seconds, and time zones with precision.',
    category: 'everyday',
    tags: ['time', 'hours', 'minutes', 'seconds', 'stopwatch', 'work hours'],
    icon: 'Clock'
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    title: 'Universal Unit Converter',
    shortDescription: 'Convert between metric and imperial units for length, mass, temperature, speed, area, and digital storage.',
    category: 'conversion',
    tags: ['convert', 'metric', 'imperial', 'kg to lbs', 'celsius to fahrenheit', 'km to miles'],
    icon: 'Scale'
  },
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    shortDescription: 'Perform mathematical operations including trigonometry, logarithms, powers, roots, and factorials.',
    category: 'math',
    tags: ['scientific', 'math', 'trig', 'sin', 'cos', 'log', 'algebra'],
    icon: 'Binary'
  }
];
