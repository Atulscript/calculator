import { CALCULATORS_REGISTRY } from './calculators';
import { CALCULATOR_ARTICLES } from './calculatorArticles';
import { getHubBySlug, resolveCalculators, CATEGORY_HUB_BY_CATEGORY } from './categoryHubs';
import { PLAN_SEO } from './planSeo';

export interface PageSeoData {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  category?: string;
  schemaType?:
    | 'WebApplication'
    | 'WebSite'
    | 'AboutPage'
    | 'ContactPage'
    | 'WebPage'
    | 'CollectionPage';
  faqs?: Array<{ question: string; answer: string }>;
  /** Hub slug; drives the ItemList emitted with CollectionPage. */
  hubSlug?: string;
}

/**
 * Absolute origin every canonical, Open Graph and schema URL is built from.
 *
 * This must include the base path. The production build currently serves from
 * a subdirectory (`base: '/calculator/'` for GitHub Pages), so using
 * `window.location.origin` alone produced canonicals pointing at URLs that do
 * not exist. Set `VITE_SITE_URL` to the live origin — including any
 * subdirectory, without a trailing slash — when building for a real domain.
 */
export function getSiteOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined;
  if (configured) return configured.replace(/\/$/, '');

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://calculator11.com';
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${origin}${base}`;
}

export const FLAGSHIP_SEO: Record<string, PageSeoData> = {
  home: {
    title: 'Free Online Calculators for Finance, Health & Math',
    // Count is derived so it cannot drift out of step with the registry or the
    // sitemap — a stated total that disagrees with the site is an avoidable
    // trust error.
    description: `${CALCULATORS_REGISTRY.length} free calculators for loans, mortgages, BMI, calories, percentages and unit conversion. Everything runs in your browser — no sign-up, no tracking.`,
    // Deliberately narrow. The homepage targets the head term and the category
    // terms only; naming individual calculators here made it compete with the
    // very pages it should be passing authority to.
    keywords: [
      'free online calculators',
      'online calculator',
      'all in one calculator',
      'calculator website',
      'financial calculators',
      'health calculators',
      'math calculators',
      'unit converter'
    ],
    canonicalPath: '/',
    schemaType: 'WebSite'
  },
  'ideal-weight-calculator': {
    title: 'Ideal Weight Calculator: Devine, Hamwi & More',
    description:
      'Compare four established ideal-weight formulas side by side. They disagree — seeing the spread is more honest than any single number.',
    keywords: ['ideal weight calculator', 'ideal body weight', 'devine formula', 'healthy weight for height', 'ideal weight by height', 'hamwi formula'],
    canonicalPath: '/ideal-weight-calculator',
    category: 'Health'
  },
  'pregnancy-due-date-calculator': {
    title: 'Due Date Calculator: Estimate Your Delivery Date',
    description:
      'Estimate your due date from your last period, conception date or IVF transfer, with current week and trimester shown alongside.',
    keywords: ['due date calculator', 'pregnancy due date', 'naegeles rule', 'how many weeks pregnant', 'estimated delivery date', 'pregnancy calculator'],
    canonicalPath: '/pregnancy-due-date-calculator',
    category: 'Health'
  },
  'ovulation-calculator': {
    title: 'Ovulation Calculator: Find Your Fertile Window',
    description:
      'Estimate your fertile window and likely ovulation date from your cycle length and last period, plus the signs that track it better.',
    keywords: ['ovulation calculator', 'fertile window calculator', 'fertility calculator', 'when do i ovulate', 'ovulation date', 'conception calculator'],
    canonicalPath: '/ovulation-calculator',
    category: 'Health'
  },
  'one-rep-max-calculator': {
    title: 'One Rep Max Calculator (1RM) with Percentages',
    description:
      'Estimate your 1RM from any set, and get the full percentage table for programming your working sets. Epley and Brzycki compared.',
    keywords: ['one rep max calculator', '1rm calculator', 'max lift calculator', 'epley formula', 'brzycki formula', 'strength percentage chart'],
    canonicalPath: '/one-rep-max-calculator',
    category: 'Health'
  },
  'auto-loan-calculator': {
    title: 'Auto Loan Calculator: Car Payment & Interest',
    description:
      'Work out monthly car payments with trade-in, down payment and sales tax included. See total interest before you sign at the dealership.',
    keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator', 'vehicle finance calculator', 'car loan interest', 'monthly car payment'],
    canonicalPath: '/auto-loan-calculator',
    category: 'Finance'
  },
  'salary-calculator': {
    title: 'Salary Calculator: Hourly, Monthly & Annual Pay',
    description:
      'Convert between hourly, weekly, monthly and annual pay, and see gross against take-home for any pay period. Compare offers on equal terms.',
    keywords: ['salary calculator', 'hourly to salary', 'annual salary calculator', 'take home pay calculator', 'pay converter', 'gross to net salary'],
    canonicalPath: '/salary-calculator',
    category: 'Finance'
  },
  'inflation-calculator': {
    title: 'Inflation Calculator: What Your Money Is Worth',
    description:
      'See what an amount from a past year is worth today, or what today\'s money will buy in future at a given inflation rate.',
    keywords: ['inflation calculator', 'purchasing power calculator', 'value of money over time', 'cpi calculator', 'real vs nominal value', 'cost of living change'],
    canonicalPath: '/inflation-calculator',
    category: 'Finance'
  },
  'roi-calculator': {
    title: 'ROI Calculator: Return on Investment & Annualised',
    description:
      'Calculate ROI as a percentage and annualised, so returns over different holding periods can be compared fairly rather than by headline figure.',
    keywords: ['roi calculator', 'return on investment calculator', 'annualised return calculator', 'investment return percentage', 'cagr calculator', 'profit percentage'],
    canonicalPath: '/roi-calculator',
    category: 'Finance'
  },
  // Slated for 301 to /bmi-calculator (see docs/seo-master-plan.md H).
  // Until the host supports redirects, a cross-canonical consolidates signals.
  'overweight-calculator': {
    title: 'Overweight Calculator: Check Your BMI Category',
    description:
      'Check whether your weight falls in the overweight range using BMI, with the WHO thresholds and what the category does and does not tell you.',
    keywords: ['overweight calculator', 'am i overweight', 'bmi overweight range', 'weight category calculator'],
    canonicalPath: '/bmi-calculator',
    category: 'Health'
  },
  // Slated for 301 to /ideal-weight-calculator.
  'healthy-weight-calculator': {
    title: 'Healthy Weight Range Calculator for Your Height',
    description:
      'Find the healthy weight range for your height, compared across four established ideal-weight formulas and the BMI healthy band.',
    keywords: ['healthy weight calculator', 'healthy weight range', 'weight for height chart', 'normal weight range'],
    canonicalPath: '/ideal-weight-calculator',
    category: 'Health'
  },
  // Slated for 301 to /horsepower-calculator.
  'engine-horsepower-calculator': {
    title: 'Engine Horsepower Calculator: Trap Speed Method',
    description:
      'Estimate engine horsepower from quarter-mile trap speed and vehicle weight, or from torque and RPM.',
    keywords: ['engine horsepower calculator', 'trap speed horsepower', 'dyno estimate', 'hp from quarter mile'],
    canonicalPath: '/horsepower-calculator',
    category: 'Everyday'
  },
  'mortgage-refinance-calculator': {
    title: 'Refinance Calculator: Break-Even Point & Savings',
    description:
      'Compare your current mortgage against a new rate. Shows monthly saving, total interest saved and how many months until refinancing pays for itself.',
    keywords: ['mortgage refinance calculator', 'refinance break even calculator', 'should i refinance', 'refinance savings calculator', 'mortgage refinance cost', 'closing costs refinance'],
    canonicalPath: '/mortgage-refinance-calculator',
    category: 'Finance'
  },
  'savings-calculator': {
    title: 'Savings Calculator: Reach Your Goal by a Set Date',
    description:
      'Find the monthly amount needed to hit a savings target by a deadline, or see what your current contributions will grow into over time.',
    keywords: ['savings calculator', 'savings goal calculator', 'how much to save monthly', 'compound savings calculator', 'save for a deposit', 'savings growth'],
    canonicalPath: '/savings-calculator',
    category: 'Finance'
  },
  'income-tax-calculator': {
    title: 'Income Tax Calculator: Bands & Effective Rate',
    description:
      'Estimate income tax, see which band each part of your income falls into, and find your effective rate as against your marginal rate.',
    keywords: ['income tax calculator', 'tax bracket calculator', 'effective tax rate', 'marginal tax rate', 'how much tax will i pay', 'take home pay tax'],
    canonicalPath: '/income-tax-calculator',
    category: 'Finance'
  },
  'gpa-calculator': {
    title: 'GPA Calculator: Weighted & Unweighted 4.0 Scale',
    description:
      'Calculate semester and cumulative GPA on a 4.0 scale, with credit hours weighted and AP or honours courses handled correctly.',
    keywords: ['gpa calculator', 'weighted gpa calculator', 'cumulative gpa calculator', 'college gpa calculator', 'semester gpa', 'grade point average'],
    canonicalPath: '/gpa-calculator',
    category: 'Math'
  },
  'fraction-calculator': {
    title: 'Fraction Calculator with Steps Shown',
    description:
      'Add, subtract, multiply and divide fractions and mixed numbers, with every result simplified and the working shown step by step.',
    keywords: ['fraction calculator', 'adding fractions calculator', 'mixed number calculator', 'simplify fractions', 'dividing fractions', 'fraction to decimal'],
    canonicalPath: '/fraction-calculator',
    category: 'Math'
  },
  'square-footage-calculator': {
    title: 'Square Footage Calculator for Rooms & Flooring',
    description:
      'Measure square footage for rooms of any shape, add a waste allowance and get the material quantity you actually need to order.',
    keywords: ['square footage calculator', 'sq ft calculator', 'room area calculator', 'flooring calculator', 'how to calculate square feet', 'irregular room area'],
    canonicalPath: '/square-footage-calculator',
    category: 'Construction'
  },
  'concrete-calculator': {
    title: 'Concrete Calculator: Slabs, Footings & Bags Needed',
    description:
      'Work out cubic yards or metres of concrete for slabs, footings and columns, and how many bags that actually translates to.',
    keywords: ['concrete calculator', 'cubic yards of concrete', 'concrete slab calculator', 'bags of concrete needed', 'footing concrete volume', 'ready mix quantity'],
    canonicalPath: '/concrete-calculator',
    category: 'Construction'
  },
  'gas-mileage-calculator': {
    title: 'Gas Mileage Calculator: MPG and L/100km',
    description:
      'Work out real fuel economy from your odometer and fill-up, in US MPG, UK MPG or litres per 100 km. See what your car actually returns.',
    keywords: ['gas mileage calculator', 'mpg calculator', 'fuel economy calculator', 'l per 100km calculator', 'fuel consumption', 'miles per gallon'],
    canonicalPath: '/gas-mileage-calculator',
    category: 'Everyday'
  },
  'time-card-calculator': {
    title: 'Time Card Calculator: Weekly Hours & Overtime',
    description:
      'Total a week of clock-in and clock-out times, deduct breaks and split regular from overtime hours. Converts to decimal hours for payroll.',
    keywords: ['time card calculator', 'timesheet calculator', 'work hours calculator', 'overtime calculator', 'hours to decimal', 'weekly hours total'],
    canonicalPath: '/time-card-calculator',
    category: 'Everyday'
  },
  'temperature-converter': {
    title: 'Temperature Converter: Celsius, Fahrenheit & Kelvin',
    description:
      'Convert between Celsius, Fahrenheit and Kelvin instantly, with the conversion formula shown and common reference points listed.',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter', 'c to f formula', 'temperature conversion table'],
    canonicalPath: '/temperature-converter',
    category: 'Conversion'
  },
  'tdee-calculator': {
    title: 'TDEE Calculator: Total Daily Energy Expenditure',
    description:
      'Find the calories you burn in a full day, including activity. This is your maintenance level — the number every diet target is built from.',
    keywords: [
      'tdee calculator',
      'total daily energy expenditure',
      'maintenance calories calculator',
      'daily calorie needs',
      'activity multiplier',
      'how many calories to maintain weight'
    ],
    canonicalPath: '/tdee-calculator',
    category: 'Health'
  },
  'bmr-calculator': {
    title: 'BMR Calculator: Basal Metabolic Rate',
    description:
      'Calculate the calories your body burns at rest using the Mifflin-St Jeor equation, the one preferred in clinical practice. The basis of any calorie target.',
    keywords: [
      'bmr calculator',
      'basal metabolic rate calculator',
      'mifflin st jeor equation',
      'resting metabolic rate',
      'calories burned at rest',
      'metabolism calculator'
    ],
    canonicalPath: '/bmr-calculator',
    category: 'Health'
  },
  'body-fat-calculator': {
    title: 'Body Fat Percentage Calculator (Navy Method)',
    description:
      'Estimate body fat from tape measurements using the US Navy formula, with healthy ranges by sex. No calipers or scales needed — just a tape measure.',
    keywords: [
      'body fat calculator',
      'body fat percentage calculator',
      'navy body fat formula',
      'how to measure body fat',
      'body composition calculator',
      'body fat ranges'
    ],
    canonicalPath: '/body-fat-calculator',
    category: 'Health'
  },
  'macro-calculator': {
    title: 'Macro Calculator: Protein, Carbs & Fat Split',
    description:
      'Turn a calorie target into daily protein, carb and fat grams, with splits for fat loss, maintenance or muscle gain. Protein set from body weight, not guesswork.',
    keywords: [
      'macro calculator',
      'macronutrient calculator',
      'iifym calculator',
      'protein carb fat split',
      'macros for fat loss',
      'daily macro targets'
    ],
    canonicalPath: '/macro-calculator',
    category: 'Health'
  },
  'protein-calculator': {
    title: 'Protein Intake Calculator: Daily Grams',
    description:
      'Find your daily protein target based on body weight and training load, with the research ranges shown rather than one arbitrary figure.',
    keywords: [
      'protein calculator',
      'protein intake calculator',
      'how much protein per day',
      'protein per kg body weight',
      'protein for muscle gain',
      'daily protein requirement'
    ],
    canonicalPath: '/protein-calculator',
    category: 'Health'
  },
  'credit-card-payoff-calculator': {
    title: 'Credit Card Payoff Calculator: Time & Interest',
    description:
      'See how long minimum payments really take and what they cost. Compare against a fixed monthly amount to find how much sooner you clear the balance.',
    keywords: [
      'credit card payoff calculator',
      'credit card interest calculator',
      'minimum payment calculator',
      'how long to pay off credit card',
      'credit card debt calculator',
      'balance transfer calculator'
    ],
    canonicalPath: '/credit-card-payoff-calculator',
    category: 'Finance'
  },
  'debt-payoff-calculator': {
    title: 'Debt Snowball vs Avalanche Calculator',
    description:
      'Compare both payoff strategies across all your debts. Snowball clears accounts faster, avalanche costs less — see the actual difference for your numbers.',
    keywords: [
      'debt payoff calculator',
      'debt snowball calculator',
      'debt avalanche calculator',
      'debt repayment plan',
      'pay off multiple debts',
      'debt free date calculator'
    ],
    canonicalPath: '/debt-payoff-calculator',
    category: 'Finance'
  },
  'home-affordability-calculator': {
    title: 'Home Affordability Calculator: What Can You Afford?',
    description:
      'Find the realistic price range for your income, deposit and existing debts. Uses standard lender debt-to-income limits rather than optimistic estimates.',
    keywords: [
      'home affordability calculator',
      'how much house can i afford',
      'mortgage affordability calculator',
      'house affordability by salary',
      'debt to income mortgage',
      'first time buyer budget'
    ],
    canonicalPath: '/home-affordability-calculator',
    category: 'Finance'
  },
  'retirement-calculator': {
    title: 'Retirement Calculator: How Much You Need to Retire',
    description:
      'See whether your savings will last. Projects your retirement pot, applies a safe withdrawal rate and shows the monthly saving needed to close any gap.',
    keywords: [
      'retirement calculator',
      'retirement savings calculator',
      'how much do i need to retire',
      'fire calculator',
      'retirement planning calculator',
      'safe withdrawal rate',
      '4 percent rule',
      'will my savings last'
    ],
    canonicalPath: '/retirement-calculator',
    category: 'Finance'
  },
  '401k-calculator': {
    title: '401(k) Calculator: Growth & Employer Match',
    description:
      'Project your 401(k) balance at retirement and see exactly what the employer match adds. Leaving the match unclaimed is the costliest common mistake.',
    keywords: [
      '401k calculator',
      '401k growth calculator',
      'employer match calculator',
      '401k contribution calculator',
      'retirement account projection',
      'traditional vs roth 401k',
      '401k vesting'
    ],
    canonicalPath: '/401k-calculator',
    category: 'Finance'
  },
  'mortgage-calculator': {
    title: 'Mortgage Calculator – Monthly Payment & PITI | Calculator11',
    description: 'Calculate monthly mortgage payments with principal, interest, taxes, insurance & PMI. Compare 15 vs 30-year terms with complete amortization schedule.',
    keywords: [
      'mortgage calculator',
      'home loan calculator',
      'monthly mortgage payment',
      'piti calculator',
      'mortgage payment with taxes and insurance',
      'pmi calculator',
      'home affordability calculator',
      '15 vs 30 year mortgage',
      'mortgage amortization schedule',
      'house payment calculator',
      'fixed rate mortgage calculator'
    ],
    canonicalPath: '/mortgage-calculator',
    category: 'Finance'
  },
  'loan-calculator': {
    title: 'Loan Calculator – Monthly Payment & Schedule | Calculator11',
    description: 'Calculate monthly loan payments, total interest, and principal amortization schedule. Test extra prepayment savings for home, auto, and personal loans.',
    keywords: [
      'loan calculator',
      'loan emi calculator',
      'personal loan calculator',
      'car loan calculator',
      'home loan calculator',
      'amortization schedule',
      'loan payoff calculator',
      'loan interest calculator',
      'loan prepayment savings',
      'reducing balance loan'
    ],
    canonicalPath: '/loan-calculator',
    category: 'Finance'
  },
  'emi-calculator': {
    title: 'Loan EMI Calculator – Monthly Payment & Schedule | Calc11',
    description: 'Free loan EMI calculator using the reducing-balance method. View month-by-month principal vs interest breakdown and calculate interest saved on prepayments.',
    keywords: [
      'emi calculator',
      'equated monthly instalment',
      'loan emi calculator',
      'reducing rate emi',
      'home loan emi',
      'car loan emi',
      'personal loan emi',
      'bank emi calculator',
      'prepayment calculator',
      'amortization table'
    ],
    canonicalPath: '/emi-calculator',
    category: 'Finance'
  },
  'sip-calculator': {
    title: 'SIP Calculator: Mutual Fund Returns & Maturity Value',
    description: 'Calculate future wealth accumulation, maturity amount, and compound returns for monthly mutual fund SIPs. Includes annual step-up projections.',
    keywords: [
      'sip calculator',
      'mutual fund sip calculator',
      'systematic investment plan',
      'sip returns calculator',
      'step up sip calculator',
      'sip vs lumpsum',
      'mutual fund calculator',
      'compound wealth calculator',
      'monthly investment calculator',
      'equity sip returns'
    ],
    canonicalPath: '/sip-calculator',
    category: 'Finance'
  },
  'compound-interest-calculator': {
    title: 'Compound Interest Calculator – Growth & Balance | Calc11',
    description: 'Calculate compound interest growth with initial principal and monthly deposits. Compare daily, monthly, and annual compounding frequencies.',
    keywords: [
      'compound interest calculator',
      'compound interest with monthly contributions',
      'daily compounding calculator',
      'interest calculator',
      'future value calculator',
      'investment growth calculator',
      'compounding frequency calculator',
      'savings growth calculator',
      'annual compound interest',
      'wealth growth calculator'
    ],
    canonicalPath: '/compound-interest-calculator',
    category: 'Finance'
  },
  'bmi-calculator': {
    title: 'BMI Calculator – Body Mass Index & Healthy Weight | Calc11',
    description: 'Check your Body Mass Index (BMI) in kg/cm or lbs/in. View official WHO healthy weight categories, prime index, and personalized target weight ranges.',
    keywords: [
      'bmi calculator',
      'body mass index calculator',
      'bmi calculator for men',
      'bmi calculator for women',
      'healthy weight calculator',
      'bmi in kg and cm',
      'bmi in feet and inches',
      'who bmi categories',
      'ideal weight calculator',
      'body mass index formula'
    ],
    canonicalPath: '/bmi-calculator',
    category: 'Health'
  },
  'calorie-calculator': {
    title: 'Calorie Calculator – Daily BMR, TDEE & Targets | Calc11',
    description: 'Calculate your Daily Energy Expenditure (TDEE) and BMR with Mifflin-St Jeor formula. Get custom calorie and macro targets for fat loss or muscle gain.',
    keywords: [
      'calorie calculator',
      'tdee calculator',
      'daily calorie needs',
      'bmr calculator',
      'calories for weight loss',
      'mifflin st jeor calculator',
      'calorie deficit calculator',
      'macro calculator',
      'maintenance calories calculator',
      'basal metabolic rate calculator',
      'daily energy expenditure'
    ],
    canonicalPath: '/calorie-calculator',
    category: 'Health'
  },
  'age-calculator': {
    title: 'Age Calculator – Exact Chronological Age & DOB | Calc11',
    description: 'Calculate your exact chronological age in years, months, and days from date of birth. Check statutory cut-off dates and birthday countdowns instantly.',
    keywords: [
      'age calculator',
      'chronological age calculator',
      'date of birth calculator',
      'calculate age from dob',
      'exact age calculator',
      'age in years months days',
      'exam age limit calculator',
      'age as on cut off date',
      'birthday countdown calculator',
      'how old am i'
    ],
    canonicalPath: '/age-calculator',
    category: 'Everyday'
  },
  'date-calculator': {
    title: 'Date Calculator – Days Between Dates & Work Days | Calc11',
    description: 'Calculate exact calendar days, business working days, weeks, and months between any two dates. Plan notice periods, lease durations, and deadlines.',
    keywords: [
      'date calculator',
      'date difference calculator',
      'days between dates',
      'business days calculator',
      'add subtract days to date',
      'working days calculator',
      'calendar countdown',
      'time between two dates',
      'calendar days calculator'
    ],
    canonicalPath: '/date-calculator',
    category: 'Everyday'
  },
  'date-difference-calculator': {
    title: 'Date Difference Calculator – Days Between Dates | Calc11',
    description: 'Calculate exact calendar days, business working days, weeks, and months between any two dates. Plan notice periods, lease durations, and deadlines.',
    keywords: [
      'date difference calculator',
      'days between dates',
      'date calculator',
      'business days calculator',
      'working days calculator',
      'count days between dates'
    ],
    canonicalPath: '/date-calculator',
    category: 'Everyday'
  },
  'percentage-calculator': {
    title: 'Percentage Calculator: Increase, Decrease & Change',
    description: 'Solve percentage calculations fast: percent of a number, percentage increase or decrease, discount prices, profit margins, and ratio percentages.',
    keywords: [
      'percentage calculator',
      'percent change calculator',
      'percentage increase calculator',
      'percentage decrease calculator',
      'percent of number',
      'discount calculator',
      'markup calculator',
      'test score percentage',
      'fraction to percentage',
      'ratio to percentage'
    ],
    canonicalPath: '/percentage-calculator',
    category: 'Math'
  },
  'scientific-calculator': {
    title: 'Scientific Calculator – Free Math & Trig Online | Calc11',
    description: 'Free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms, square roots, powers, parentheses, and radian/degree modes.',
    keywords: [
      'scientific calculator',
      'online scientific calculator',
      'advanced math calculator',
      'trigonometry calculator',
      'log calculator',
      'sin cos tan calculator',
      'engineering calculator',
      'radian degree calculator',
      'square root calculator',
      'math solver online'
    ],
    canonicalPath: '/scientific-calculator',
    category: 'Math'
  },
  'unit-converter': {
    title: 'Unit Converter – Metric & Imperial Conversion | Calc11',
    description: 'Instant unit converter for metric and imperial units: length (cm, inches, feet), mass (kg, lbs), temperature (C, F), speed, area, and digital data.',
    keywords: [
      'unit converter',
      'metric to imperial converter',
      'length converter',
      'weight converter',
      'temperature converter',
      'kg to lbs converter',
      'cm to inches converter',
      'celsius to fahrenheit converter',
      'speed converter',
      'area converter',
      'digital storage converter'
    ],
    canonicalPath: '/unit-converter',
    category: 'Conversion'
  },
  // Core Platform & AdSense Compliance Pages
  about: {
    title: 'About Calculator11 – Mission & Editorial Standards',
    description: 'Learn about Calculator11: our editorial math accuracy standards, client-side zero-knowledge architecture, and suite of 150+ free online calculators.',
    keywords: ['about calculator11', 'online calculators', 'calculator accuracy', 'private calculators', 'financial tools'],
    canonicalPath: '/about',
    schemaType: 'AboutPage'
  },
  contact: {
    title: 'Contact & Feedback – Support & Inquiries | Calculator11',
    description: 'Contact the Calculator11 engineering and editorial team. Request custom calculators, report formula discrepancies, or submit user feedback.',
    keywords: ['contact calculator11', 'calculator feedback', 'report formula bug', 'calculator support'],
    canonicalPath: '/contact',
    schemaType: 'ContactPage'
  },
  privacy: {
    title: 'Privacy Policy – 100% Client-Side Protection | Calc11',
    description: 'Calculator11 Privacy Policy: Zero data transmission, zero server tracking, and 100% local in-browser computation. Fully AdSense & GDPR compliant.',
    keywords: ['privacy policy', 'calculator privacy', 'gdpr compliant', 'client side privacy', 'no tracking calculator'],
    canonicalPath: '/privacy',
    schemaType: 'WebPage'
  },
  'privacy-policy': {
    title: 'Privacy Policy – 100% Client-Side Protection | Calc11',
    description: 'Calculator11 Privacy Policy: Zero data transmission, zero server tracking, and 100% local in-browser computation. Fully AdSense & GDPR compliant.',
    keywords: ['privacy policy', 'calculator privacy', 'gdpr compliant'],
    canonicalPath: '/privacy',
    schemaType: 'WebPage'
  },
  terms: {
    title: 'Terms of Service – Usage Guidelines | Calculator11',
    description: 'Calculator11 Terms of Service: Guidelines, educational disclaimers, and programmatic advertising policies for using our 150+ free web calculators.',
    keywords: ['terms of service', 'terms of use', 'calculator terms', 'disclaimer guidelines'],
    canonicalPath: '/terms',
    schemaType: 'WebPage'
  },
  'terms-of-service': {
    title: 'Terms of Service – Usage Guidelines | Calculator11',
    description: 'Calculator11 Terms of Service: Guidelines, educational disclaimers, and programmatic advertising policies for using our 150+ free web calculators.',
    keywords: ['terms of service', 'terms of use'],
    canonicalPath: '/terms',
    schemaType: 'WebPage'
  },
  disclaimer: {
    title: 'Legal, Financial & Medical Disclaimer | Calculator11',
    description: 'Calculator11 Legal, Financial and Medical Disclaimer: Numerical estimations for educational use. Consult certified professionals for formal advice.',
    keywords: ['disclaimer', 'financial disclaimer', 'medical disclaimer', 'legal notice'],
    canonicalPath: '/disclaimer',
    schemaType: 'WebPage'
  }
};

/**
 * Intelligent SEO title formatter ensuring 50-60 characters
 */
function formatSeoTitle(rawTitle: string): string {
  const brand = 'Calculator11';
  const clean = rawTitle.trim();

  if (clean.length > 40) {
    if (`${clean} | ${brand}`.length <= 60) return `${clean} | ${brand}`;
    if (`${clean} | Calc11`.length <= 60) return `${clean} | Calc11`;
    return `${clean.slice(0, 48).trim()}… | Calc11`;
  }

  const hasCalcOrConv = /calculator|converter|generator/i.test(clean);
  if (hasCalcOrConv) {
    const candidate = `${clean} – Free Online | ${brand}`;
    if (candidate.length <= 60) return candidate;
    return `${clean} | ${brand}`;
  } else {
    const candidate = `${clean} Calculator – Free Online | ${brand}`;
    if (candidate.length <= 60) return candidate;
    return `${clean} Calculator | ${brand}`;
  }
}

/**
 * Intelligent SEO description formatter ensuring 120-158 characters with action intent
 */
function formatSeoDescription(desc: string): string {
  const clean = desc.trim();
  if (clean.length >= 135) {
    return clean;
  }
  const suffix = ' Free, fast & 100% private in-browser math.';
  if (clean.length + suffix.length <= 158) {
    return `${clean}${suffix}`;
  }
  const shortSuffix = ' Free & private.';
  if (clean.length + shortSuffix.length <= 158) {
    return `${clean}${shortSuffix}`;
  }
  return clean;
}

/**
 * Returns keyword-focused SEO metadata for any route or calculator slug
 */
export function getSeoForPath(path: string): PageSeoData {
  const cleanPath = (path || '/').replace(/^\//, '').replace(/\/$/, '');

  if (!cleanPath) {
    return FLAGSHIP_SEO.home;
  }

  if (FLAGSHIP_SEO[cleanPath]) {
    return FLAGSHIP_SEO[cleanPath];
  }

  // Category hubs. /unit-converter is excluded: it keeps its calculator page
  // and its existing FLAGSHIP_SEO entry rather than being served as a hub.
  const hub = cleanPath !== 'unit-converter' ? getHubBySlug(cleanPath) : undefined;
  if (hub) {
    return {
      title: hub.seoTitle,
      description: hub.seoDescription,
      keywords: hub.keywords,
      canonicalPath: `/${hub.slug}`,
      schemaType: 'CollectionPage',
      hubSlug: hub.slug,
      faqs: hub.faqs
    };
  }

  // Metadata authored in the SEO plan. Sits above the generic fallback so
  // every calculator gets a real title and description rather than one
  // assembled from its registry blurb.
  const planned = PLAN_SEO[cleanPath];
  if (planned) {
    const planCalc = CALCULATORS_REGISTRY.find(c => c.slug === cleanPath);
    const { primary, ...rest } = planned;
    return {
      ...rest,
      keywords: Array.from(new Set([primary, ...(planCalc?.tags || [])])),
      category: planCalc
        ? planCalc.category.charAt(0).toUpperCase() + planCalc.category.slice(1)
        : undefined
    };
  }

  // Look up in registry
  const calc = CALCULATORS_REGISTRY.find(c => c.slug === cleanPath || c.id === cleanPath);
  if (calc) {
    const primaryKeywords = [
      ...calc.tags,
      `${calc.title.toLowerCase()}`,
      `free ${calc.title.toLowerCase()}`,
      `${calc.title.toLowerCase()} online`,
      'free online calculator',
      `${calc.category} calculator`
    ];

    const uniqueKeywords = Array.from(new Set(primaryKeywords));

    return {
      title: formatSeoTitle(calc.title),
      description: formatSeoDescription(calc.shortDescription),
      keywords: uniqueKeywords,
      canonicalPath: `/${calc.slug}`,
      category: calc.category.charAt(0).toUpperCase() + calc.category.slice(1)
    };
  }

  // Generic fallback
  return {
    title: 'Calculator11 – Free Online Calculators for Everything',
    description: '150+ free, fast, private online calculators for finance, health, math, conversion, and everyday life. 100% on-device calculations.',
    keywords: ['free online calculator', 'calculator11', 'math calculators', 'finance calculators'],
    canonicalPath: `/${cleanPath}`
  };
}

/**
 * Calculators whose page exists and carries an article, but whose tool is not
 * built yet — the page renders a placeholder card instead of inputs.
 *
 * While a slug is listed here the page is kept out of the index and does not
 * claim to be a working application: no WebApplication entity and no HowTo
 * steps describing how to use a tool that is not there. The article, FAQ and
 * breadcrumb schema still describe content that is genuinely on the page.
 *
 * Remove a slug from this list in the same change that ships its calculator.
 * scripts/generateSitemap.js reads this list, so a page cannot be indexed and
 * unbuilt at the same time.
 */
export const UNBUILT_TOOLS = new Set<string>([
  'tdee-calculator',
  'protein-calculator',
  'carbohydrate-calculator',
  'fat-intake-calculator',
  'lean-body-mass-calculator',
  'army-body-fat-calculator'
]);

/**
 * Dynamically updates document title, meta tags, keywords, canonical link, and JSON-LD schema
 */
export function updateDocumentSeo(data: PageSeoData): void {
  // 1. Document Title
  document.title = data.title;

  // Helper to set/update <meta> tag
  const setMeta = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
    let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attributeName, attributeValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Meta Description
  setMeta('name', 'description', data.description);

  // 3. Meta Keywords (Focused Keywords List)
  const keywordsStr = data.keywords.join(', ');
  setMeta('name', 'keywords', keywordsStr);

  // 3b. Robots. This must be written on every navigation, not only on the
  // pages being withheld: the SPA reuses one <head>, so a noindex left behind
  // by a previous route would silently suppress the next page.
  const seoSlug = (data.canonicalPath || '/').replace(/^\//, '').replace(/\/$/, '');
  const isUnbuilt = UNBUILT_TOOLS.has(seoSlug);
  setMeta('name', 'robots', isUnbuilt ? 'noindex, follow' : 'index, follow');

  // 4. Canonical URL
  const origin = getSiteOrigin();
  const fullCanonical = `${origin}${data.canonicalPath}`;
  let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', fullCanonical);

  // 5. Open Graph Meta Tags
  setMeta('property', 'og:title', data.ogTitle || data.title);
  setMeta('property', 'og:description', data.ogDescription || data.description);
  setMeta('property', 'og:url', fullCanonical);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Calculator11');
  setMeta('property', 'og:locale', 'en_US');
  const ogImageUrl = `${origin}/assets/og-image.jpg`;
  setMeta('property', 'og:image', ogImageUrl);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:type', 'image/jpeg');
  setMeta('property', 'og:image:alt', 'Calculator11 – Precision Free Online Calculators');

  // 6. Twitter Card Meta Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', data.title);
  setMeta('name', 'twitter:description', data.description);
  setMeta('name', 'twitter:image', ogImageUrl);

  // 7. Structured Data (Schema.org JSON-LD with Breadcrumbs, FAQs, App, Organization)
  let scriptSchema = document.getElementById('seo-schema-structured-data') as HTMLScriptElement | null;
  if (!scriptSchema) {
    scriptSchema = document.createElement('script');
    scriptSchema.id = 'seo-schema-structured-data';
    scriptSchema.type = 'application/ld+json';
    document.head.appendChild(scriptSchema);
  }

  const breadcrumbsList = {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': origin
      },
      // Point at the real hub URL. A query-string filter is not a distinct
      // page, so it was never a valid breadcrumb target.
      ...(data.category && CATEGORY_HUB_BY_CATEGORY[data.category.toLowerCase()]
        ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': data.category,
            'item': `${origin}/${CATEGORY_HUB_BY_CATEGORY[data.category.toLowerCase()]}`
          }]
        : []),
      {
        '@type': 'ListItem',
        'position': data.category && CATEGORY_HUB_BY_CATEGORY[data.category.toLowerCase()] ? 3 : 2,
        'name': data.title.split('–')[0].split('|')[0].trim(),
        'item': fullCanonical
      }
    ]
  };

  const cleanSlug = data.canonicalPath.replace(/^\//, '').replace(/\/$/, '');
  const article = CALCULATOR_ARTICLES[cleanSlug];

  const graphEntities: any[] = [];

  const organizationEntity = {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    'name': 'Calculator11',
    'url': origin,
    'logo': `${origin}/assets/icon-512.svg`,
    'description': 'Free client-side online calculator platform with 150+ verified calculation tools.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'support@calculator11.com',
      'contactType': 'Customer Support'
    }
  };

  if (data.schemaType === 'WebSite') {
    // 1. WebSite Entity
    graphEntities.push({
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      'name': 'Calculator11',
      'url': origin,
      'description': data.description,
      'keywords': keywordsStr,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${origin}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });
    graphEntities.push(organizationEntity);
  } else if (data.schemaType === 'AboutPage') {
    graphEntities.push({
      '@type': 'AboutPage',
      '@id': `${fullCanonical}/#webpage`,
      'url': fullCanonical,
      'name': data.title,
      'description': data.description,
      'mainEntity': organizationEntity
    });
    graphEntities.push(organizationEntity);
  } else if (data.schemaType === 'ContactPage') {
    graphEntities.push({
      '@type': 'ContactPage',
      '@id': `${fullCanonical}/#webpage`,
      'url': fullCanonical,
      'name': data.title,
      'description': data.description,
      'mainEntity': organizationEntity
    });
    graphEntities.push(organizationEntity);
  } else if (data.schemaType === 'CollectionPage') {
    const hub = data.hubSlug ? getHubBySlug(data.hubSlug) : undefined;
    const tools = hub ? resolveCalculators(hub.groups.flatMap(g => g.slugs)) : [];

    graphEntities.push({
      '@type': 'CollectionPage',
      '@id': `${fullCanonical}/#webpage`,
      'url': fullCanonical,
      'name': data.title,
      'description': data.description,
      'isPartOf': { '@id': `${origin}/#website` },
      'publisher': organizationEntity,
      ...(tools.length
        ? {
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': tools.length,
              'itemListElement': tools.map((calc, i) => ({
                '@type': 'ListItem',
                'position': i + 1,
                'url': `${origin}/${calc.slug}`,
                'name': calc.title
              }))
            }
          }
        : {})
    });
    graphEntities.push(organizationEntity);
  } else if (data.schemaType === 'WebPage') {
    graphEntities.push({
      '@type': 'WebPage',
      '@id': `${fullCanonical}/#webpage`,
      'url': fullCanonical,
      'name': data.title,
      'description': data.description,
      'publisher': organizationEntity
    });
    graphEntities.push(organizationEntity);
  } else if (isUnbuilt) {
    // No WebApplication entity: there is no application on the page yet.
    graphEntities.push({
      '@type': 'WebPage',
      '@id': `${fullCanonical}/#webpage`,
      'url': fullCanonical,
      'name': data.title,
      'description': data.description,
      'publisher': organizationEntity
    });
    graphEntities.push(organizationEntity);
  } else {
    // WebApplication Entity for all calculator tools
    graphEntities.push({
      '@type': 'WebApplication',
      '@id': `${fullCanonical}/#webapp`,
      'name': data.title.split('–')[0].split('|')[0].trim(),
      'url': fullCanonical,
      'description': data.description,
      'keywords': keywordsStr,
      'applicationCategory': data.category ? `${data.category}Application` : 'UtilitiesApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'softwareVersion': '2.0.0',
      // No aggregateRating: Google requires ratings to come from genuine user
      // reviews collected on the page. Emitting an invented score is a
      // structured-data violation and risks a manual action.
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      },
      'publisher': organizationEntity
    });
  }

  // Always include Breadcrumbs
  graphEntities.push(breadcrumbsList);

  // If article exists, include Article / E-E-A-T entity
  if (article) {
    graphEntities.push({
      '@type': 'Article',
      '@id': `${fullCanonical}/#article`,
      'headline': article.title,
      'description': article.subtitle,
      'inLanguage': 'en-US',
      'author': {
        '@type': 'Organization',
        'name': article.author?.name || 'Calculator11 Editorial Team'
      },
      'publisher': organizationEntity,
      'datePublished': '2026-01-01',
      'dateModified': '2026-09-12'
    });
  }

  // If FAQs are available (from article or props), include FAQPage schema
  const faqs = data.faqs || (article && article.faqs ? article.faqs : null);
  if (faqs && faqs.length > 0) {
    graphEntities.push({
      '@type': 'FAQPage',
      '@id': `${fullCanonical}/#faq`,
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  // If HowTo steps are available, include HowTo schema. Withheld while the tool
  // is unbuilt, since the steps describe operating a calculator that the page
  // does not yet render.
  if (!isUnbuilt && article && article.howToSteps && article.howToSteps.steps) {
    graphEntities.push({
      '@type': 'HowTo',
      '@id': `${fullCanonical}/#howto`,
      'name': article.howToSteps.title,
      'step': article.howToSteps.steps.map(step => ({
        '@type': 'HowToStep',
        'position': step.stepNumber,
        'name': step.title,
        'text': step.description
      }))
    });
  }

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': graphEntities
  };

  scriptSchema.textContent = JSON.stringify(jsonLdGraph);
}
