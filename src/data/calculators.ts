import { CalculatorMeta } from '../types/calculator';

export const CALCULATORS_REGISTRY: CalculatorMeta[] = [
  // ==========================================
  // 1. FINANCE & MONEY (8 Calculators)
  // ==========================================
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    title: 'Loan EMI Calculator',
    shortDescription: 'Calculate monthly loan EMI payments, total interest, principal split, and month-by-month amortization schedule.',
    category: 'finance',
    tags: ['emi', 'loan emi', 'home loan', 'car loan', 'personal loan', 'interest', 'amortization', 'finance'],
    icon: 'Landmark',
    badge: 'Flagship'
  },
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    shortDescription: 'Find how much you can borrow for an affordable EMI, or calculate loan tenure and effective interest rate.',
    category: 'finance',
    tags: ['loan', 'loan amount', 'tenure', 'rate', 'eligibility', 'compare loans'],
    icon: 'Calculator'
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    shortDescription: 'See how your money grows with compound interest, regular deposits, and quarterly compounding.',
    category: 'finance',
    tags: ['compound interest', 'investing', 'savings', 'future value', 'stocks', 'returns', 'wealth', 'fd'],
    icon: 'TrendingUp',
    badge: 'Popular'
  },
  {
    id: 'simple-interest-calculator',
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    shortDescription: 'Quickly compute simple interest (I = P × r × t), total accrued balance, and annual rate yields.',
    category: 'finance',
    tags: ['simple interest', 'principal', 'rate', 'yield', 'bonds', 'borrowing'],
    icon: 'BadgePercent'
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    title: 'Mortgage & Home Loan Calculator',
    shortDescription: 'Estimate monthly mortgage payments including principal, interest, property taxes, PMI, and homeowner insurance.',
    category: 'finance',
    tags: ['mortgage', 'home loan', 'pmi', 'property tax', 'real estate', 'housing'],
    icon: 'Home'
  },
  {
    id: 'sip-calculator',
    slug: 'sip-calculator',
    title: 'SIP & Mutual Fund Calculator',
    shortDescription: 'Calculate future wealth accumulation, capital appreciation, and maturity amount for monthly Systematic Investment Plans.',
    category: 'finance',
    tags: ['sip', 'mutual fund', 'systematic investment', 'wealth', 'stock market', 'inr'],
    icon: 'LineChart'
  },
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    title: 'Salary & Take-Home Paycheck Calculator',
    shortDescription: 'Convert between hourly wage, monthly salary, and annual pay with estimated tax and deduction breakdowns.',
    category: 'finance',
    tags: ['salary', 'paycheck', 'hourly to salary', 'income', 'wage', 'take-home pay', 'taxes'],
    icon: 'Wallet'
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    title: 'Tip & Bill Split Calculator',
    shortDescription: 'Calculate gratuity and split restaurant or service bills equally among friends with custom tip percentages.',
    category: 'finance',
    tags: ['tip', 'bill split', 'dining', 'gratuity', 'restaurant', 'food bill'],
    icon: 'Receipt'
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    title: 'Discount & Sale Price Calculator',
    shortDescription: 'Find exact final prices after single or stacked percentage discounts, clearance markdowns, and sales taxes.',
    category: 'finance',
    tags: ['discount', 'sale', 'shopping', 'markdown', 'savings', 'black friday'],
    icon: 'Tag'
  },

  // ==========================================
  // 2. HEALTH & FITNESS (8 Calculators)
  // ==========================================
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    shortDescription: 'Calculate Body Mass Index (BMI), ideal weight range, body category, and health metrics according to WHO standards.',
    category: 'health',
    tags: ['health', 'bmi', 'weight', 'height', 'body mass index', 'fitness', 'who'],
    icon: 'Activity',
    badge: 'Popular'
  },
  {
    id: 'calorie-calculator',
    slug: 'calorie-calculator',
    title: 'Calorie & TDEE Calculator',
    shortDescription: 'Estimate your Total Daily Energy Expenditure (TDEE), BMR (Mifflin-St Jeor), and daily calorie target for weight goals.',
    category: 'health',
    tags: ['calorie', 'tdee', 'bmr', 'weight loss', 'nutrition', 'macros', 'diet', 'metabolism'],
    icon: 'Flame',
    badge: 'Popular'
  },
  {
    id: 'body-fat-calculator',
    slug: 'body-fat-calculator',
    title: 'Body Fat Percentage Calculator',
    shortDescription: 'Estimate body fat percentage using the proven US Navy circumference method (neck, waist, hip, height).',
    category: 'health',
    tags: ['body fat', 'navy method', 'lean mass', 'fitness', 'composition', 'gym'],
    icon: 'UserCheck'
  },
  {
    id: 'water-intake-calculator',
    slug: 'water-intake-calculator',
    title: 'Daily Water Intake Calculator',
    shortDescription: 'Calculate your personalized daily hydration requirement based on body weight, daily activity level, and climate.',
    category: 'health',
    tags: ['water', 'hydration', 'fluid', 'health', 'daily intake', 'wellness'],
    icon: 'Droplets'
  },
  {
    id: 'ideal-weight-calculator',
    slug: 'ideal-weight-calculator',
    title: 'Ideal Body Weight Calculator',
    shortDescription: 'Compare target healthy weight ranges across Devine, Robinson, Miller, and Hamwi clinical formulas.',
    category: 'health',
    tags: ['ideal weight', 'target weight', 'devine formula', 'healthy weight', 'height'],
    icon: 'Scale'
  },
  {
    id: 'target-heart-rate-calculator',
    slug: 'target-heart-rate-calculator',
    title: 'Target Heart Rate & Training Zones',
    shortDescription: 'Compute your maximum heart rate and 5 personalized aerobic/anaerobic cardio zones using the Karvonen formula.',
    category: 'health',
    tags: ['heart rate', 'cardio', 'zones', 'karvonen', 'bpm', 'running', 'hiit'],
    icon: 'Heart'
  },
  {
    id: 'macro-calculator',
    slug: 'macro-calculator',
    title: 'Macronutrient (Macro) Calculator',
    shortDescription: 'Determine optimal daily grams of protein, carbohydrates, and healthy fats tailored to cutting, bulking, or maintenance.',
    category: 'health',
    tags: ['macros', 'protein', 'carbs', 'fats', 'bodybuilding', 'nutrition', 'keto'],
    icon: 'PieChart'
  },
  {
    id: 'pregnancy-due-date-calculator',
    slug: 'pregnancy-due-date-calculator',
    title: 'Pregnancy Due Date Calculator',
    shortDescription: 'Estimate baby due date (EDD), current gestational age, and trimester milestones using Naegele’s Rule or conception date.',
    category: 'health',
    tags: ['pregnancy', 'due date', 'baby', 'gestational age', 'trimester', 'edd', 'lmp'],
    icon: 'Baby'
  },

  // ==========================================
  // 3. EVERYDAY LIFE & TIME (8 Calculators)
  // ==========================================
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    title: 'Age Calculator',
    shortDescription: 'Calculate exact chronological age in years, months, days, minutes & seconds with birthday countdown, zodiac, and planetary ages.',
    category: 'everyday',
    tags: ['age', 'birthday', 'dob', 'chronological', 'years', 'months', 'days', 'zodiac', 'planetary'],
    icon: 'CalendarClock',
    badge: 'Flagship'
  },
  {
    id: 'date-calculator',
    slug: 'date-calculator',
    title: 'Date Calculator',
    shortDescription: 'Count the days between two dates, with or without weekends, or add and subtract days, weeks and months from any date.',
    category: 'everyday',
    tags: ['date', 'days between dates', 'date difference', 'day counter', 'calendar', 'working days'],
    icon: 'CalendarRange',
    badge: 'Popular'
  },
  {
    id: 'time-duration-calculator',
    slug: 'time-duration-calculator',
    title: 'Time Duration Calculator',
    shortDescription: 'Add, subtract, and calculate durations between hours, minutes, and seconds with precision time span math.',
    category: 'everyday',
    tags: ['time', 'hours', 'minutes', 'seconds', 'stopwatch', 'duration', 'timer'],
    icon: 'Clock'
  },
  {
    id: 'hours-and-minutes-calculator',
    slug: 'hours-and-minutes-calculator',
    title: 'Hours & Minutes Timesheet Calculator',
    shortDescription: 'Sum multiple time entries, calculate total payroll work hours, and subtract lunch breaks accurately.',
    category: 'everyday',
    tags: ['timesheet', 'work hours', 'payroll', 'clock in', 'clock out', 'hourly'],
    icon: 'Hourglass'
  },
  {
    id: 'days-until-calculator',
    slug: 'days-until-calculator',
    title: 'Days Until Countdown Calculator',
    shortDescription: 'Count down remaining days, hours, and minutes until upcoming events, holidays, anniversaries, or vacations.',
    category: 'everyday',
    tags: ['countdown', 'days until', 'event', 'holiday', 'new year', 'vacation'],
    icon: 'CalendarDays'
  },
  {
    id: 'day-of-the-week-calculator',
    slug: 'day-of-the-week-calculator',
    title: 'Day of the Week Calculator',
    shortDescription: 'Find the exact day of the week for any past or future date in history with leap year calibration.',
    category: 'everyday',
    tags: ['day of week', 'monday', 'friday', 'calendar math', 'history', 'birth day'],
    icon: 'Calendar'
  },
  {
    id: 'chronological-age-calculator',
    slug: 'chronological-age-calculator',
    title: 'Chronological School Age Calculator',
    shortDescription: 'Compute precise chronological age for school admission cutoffs, clinical testing, and pediatric development.',
    category: 'everyday',
    tags: ['chronological age', 'school cutoff', 'pediatric', 'development', 'grade age'],
    icon: 'GraduationCap'
  },
  {
    id: 'sleep-cycle-calculator',
    slug: 'sleep-cycle-calculator',
    title: 'Sleep Cycle & Bedtime Calculator',
    shortDescription: 'Calculate optimal sleep and wake times in 90-minute REM cycles to wake up feeling refreshed and alert.',
    category: 'everyday',
    tags: ['sleep', 'rem cycle', 'bedtime', 'wake up', 'circadian rhythm', 'nap'],
    icon: 'Moon'
  },

  // ==========================================
  // 4. MATH & NUMBERS (7 Calculators)
  // ==========================================
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    shortDescription: 'Solve common percentage calculations: X% of Y, percentage increase or decrease, discounts, and fractions.',
    category: 'math',
    tags: ['percentage', 'discount', 'increase', 'decrease', 'fraction', 'ratio', 'math'],
    icon: 'Percent',
    badge: 'Popular'
  },
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    shortDescription: 'Perform advanced mathematical operations including trigonometry, logarithms, powers, roots, and factorials.',
    category: 'math',
    tags: ['scientific', 'math', 'trig', 'sin', 'cos', 'log', 'algebra', 'powers'],
    icon: 'Binary'
  },
  {
    id: 'fraction-calculator',
    slug: 'fraction-calculator',
    title: 'Fraction Calculator',
    shortDescription: 'Add, subtract, multiply, and divide proper, improper, and mixed fractions with step-by-step simplification.',
    category: 'math',
    tags: ['fraction', 'numerator', 'denominator', 'mixed numbers', 'math', 'simplify'],
    icon: 'Divide'
  },
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    title: 'GPA & Grade Calculator',
    shortDescription: 'Calculate unweighted and weighted Grade Point Average (GPA) on a 4.0 scale with custom credit hours and honors/AP grades.',
    category: 'math',
    tags: ['gpa', 'grades', 'college', 'high school', 'credits', 'academic', 'semester'],
    icon: 'Award'
  },
  {
    id: 'ratio-calculator',
    slug: 'ratio-calculator',
    title: 'Ratio & Proportion Calculator',
    shortDescription: 'Solve proportions (A:B = C:D), simplify complex mathematical ratios, and calculate screen aspect ratio scaling.',
    category: 'math',
    tags: ['ratio', 'proportion', 'aspect ratio', '16:9', 'scaling', 'math'],
    icon: 'Scaling'
  },
  {
    id: 'average-calculator',
    slug: 'average-calculator',
    title: 'Average, Mean & Standard Deviation',
    shortDescription: 'Compute mean, median, mode, geometric mean, range, standard deviation, and variance for any dataset.',
    category: 'math',
    tags: ['average', 'mean', 'median', 'mode', 'standard deviation', 'variance', 'statistics'],
    icon: 'BarChart2'
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    title: 'Random Number Generator',
    shortDescription: 'Generate secure cryptographically random numbers within custom ranges, simulate dice rolls, and pick lottery numbers.',
    category: 'math',
    tags: ['random', 'rng', 'dice', 'lottery', 'generator', 'probability'],
    icon: 'Dices'
  },

  // ==========================================
  // 5. UNIT CONVERSIONS (7 Calculators)
  // ==========================================
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    title: 'Universal Unit Converter',
    shortDescription: 'Convert between metric and imperial units for length, mass, temperature, speed, area, and digital storage.',
    category: 'conversion',
    tags: ['convert', 'metric', 'imperial', 'kg to lbs', 'celsius to fahrenheit', 'km to miles', 'units'],
    icon: 'Scale',
    badge: 'Popular'
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    shortDescription: 'Instant bidirectional temperature conversion across Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R).',
    category: 'conversion',
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'weather', 'cooking temp'],
    icon: 'Thermometer'
  },
  {
    id: 'length-converter',
    slug: 'length-converter',
    title: 'Length & Distance Converter',
    shortDescription: 'Convert millimeters, centimeters, meters, kilometers, inches, feet, yards, and nautical miles with precision.',
    category: 'conversion',
    tags: ['length', 'distance', 'meters', 'feet', 'inches', 'miles', 'km', 'yards'],
    icon: 'Ruler'
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    title: 'Weight & Mass Converter',
    shortDescription: 'Convert grams, kilograms, metric tons, ounces, pounds (lbs), and stones with live conversion tables.',
    category: 'conversion',
    tags: ['weight', 'mass', 'kg', 'lbs', 'pounds', 'grams', 'ounces', 'stones'],
    icon: 'Weight'
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    title: 'Speed & Velocity Converter',
    shortDescription: 'Convert kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), knots, and Mach speed.',
    category: 'conversion',
    tags: ['speed', 'velocity', 'mph', 'kmh', 'knots', 'mach', 'aviation'],
    icon: 'Gauge'
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    title: 'Data Storage & Bandwidth Converter',
    shortDescription: 'Convert bits, bytes, KB, MB, GB, TB, and PB in decimal (SI 1000) and binary (IEC 1024) standards.',
    category: 'conversion',
    tags: ['data', 'bytes', 'mb', 'gb', 'tb', 'bandwidth', 'storage', 'file size'],
    icon: 'HardDrive'
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    title: 'Area & Land Size Converter',
    shortDescription: 'Convert square meters, square feet, square yards, acres, hectares, and square kilometers.',
    category: 'conversion',
    tags: ['area', 'acres', 'hectares', 'sq ft', 'sq meters', 'land', 'real estate'],
    icon: 'Square'
  },

  // ==========================================
  // 6. CONSTRUCTION & DIY (6 Calculators)
  // ==========================================
  {
    id: 'square-footage-calculator',
    slug: 'square-footage-calculator',
    title: 'Square Footage & Flooring Calculator',
    shortDescription: 'Calculate total square footage, square meters, tile quantities, and flooring materials needed with waste factors.',
    category: 'construction',
    tags: ['construction', 'square footage', 'sq ft', 'flooring', 'tiles', 'paint', 'area', 'diy'],
    icon: 'HardHat',
    badge: 'Popular'
  },
  {
    id: 'paint-calculator',
    slug: 'paint-calculator',
    title: 'Paint Quantity Calculator',
    shortDescription: 'Estimate gallons or liters of paint needed based on wall dimensions, multiple coats, and window/door deductions.',
    category: 'construction',
    tags: ['paint', 'walls', 'gallons', 'liters', 'decorating', 'home improvement', 'diy'],
    icon: 'Paintbrush'
  },
  {
    id: 'concrete-calculator',
    slug: 'concrete-calculator',
    title: 'Concrete Slab & Footing Calculator',
    shortDescription: 'Calculate cubic yards and cubic meters of concrete needed for slabs, footings, and post holes, plus pre-mix bag counts.',
    category: 'construction',
    tags: ['concrete', 'cement', 'slab', 'cubic yards', 'cubic meters', 'bags', 'foundation'],
    icon: 'Box'
  },
  {
    id: 'tile-calculator',
    slug: 'tile-calculator',
    title: 'Tile & Grout Calculator',
    shortDescription: 'Calculate total tile boxes, floor area, grout joints, and cut waste allowance for bathroom and kitchen renovations.',
    category: 'construction',
    tags: ['tile', 'flooring', 'bathroom', 'kitchen', 'grout', 'renovation'],
    icon: 'Grid'
  },
  {
    id: 'gravel-and-mulch-calculator',
    slug: 'gravel-and-mulch-calculator',
    title: 'Mulch, Soil & Gravel Calculator',
    shortDescription: 'Determine cubic yards and tons of mulch, topsoil, or gravel needed for landscaping and garden bed coverage.',
    category: 'construction',
    tags: ['mulch', 'gravel', 'soil', 'landscaping', 'garden', 'cubic yards'],
    icon: 'Sprout'
  },
  {
    id: 'wallpaper-calculator',
    slug: 'wallpaper-calculator',
    title: 'Wallpaper Roll Calculator',
    shortDescription: 'Calculate exact rolls of wallpaper needed based on room perimeter, wall height, and pattern repeat drop.',
    category: 'construction',
    tags: ['wallpaper', 'rolls', 'interior design', 'decorating', 'walls'],
    icon: 'Scroll'
  },

  // ==========================================
  // 7. FOOD & COOKING (4 Calculators)
  // ==========================================
  {
    id: 'recipe-converter',
    slug: 'recipe-converter',
    title: 'Recipe & Ingredient Scaler',
    shortDescription: 'Scale cooking and baking ingredient quantities up or down effortlessly for any serving size or pan dimension.',
    category: 'food',
    tags: ['food', 'recipe', 'baking', 'cooking', 'servings', 'kitchen', 'cups to grams'],
    icon: 'UtensilsCrossed',
    badge: 'Popular'
  },
  {
    id: 'baking-conversion-calculator',
    slug: 'baking-conversion-calculator',
    title: 'Baking Ingredient Cups to Grams',
    shortDescription: 'Convert cups, tablespoons, and teaspoons to exact grams for all-purpose flour, granulated sugar, butter, and yeast.',
    category: 'food',
    tags: ['baking', 'cups to grams', 'flour', 'sugar', 'butter', 'pastry', 'weight'],
    icon: 'CupSoda'
  },
  {
    id: 'cooking-time-calculator',
    slug: 'cooking-time-calculator',
    title: 'Meat Roasting Time & Temp Calculator',
    shortDescription: 'Calculate oven roasting times and USDA food safety internal temperature targets by meat weight and doneness.',
    category: 'food',
    tags: ['meat', 'roasting', 'cooking time', 'turkey', 'beef', 'chicken', 'temperature'],
    icon: 'Flame'
  },
  {
    id: 'coffee-water-ratio-calculator',
    slug: 'coffee-water-ratio-calculator',
    title: 'Coffee Brewing Ratio Calculator',
    shortDescription: 'Compute exact coffee bean grams and water volume for pour-over, French press, Aeropress, and cold brew.',
    category: 'food',
    tags: ['coffee', 'ratio', 'brewing', 'pour over', 'french press', 'espresso', 'barista'],
    icon: 'Coffee'
  },

  // ==========================================
  // 8. PHYSICS & SCIENCE (4 Calculators)
  // ==========================================
  {
    id: 'speed-distance-time-calculator',
    slug: 'speed-distance-time-calculator',
    title: 'Speed, Distance & Time Calculator',
    shortDescription: 'Solve for speed, travel distance, or trip duration with unit conversions (mph, km/h, miles, kilometers, hours).',
    category: 'science',
    tags: ['speed', 'distance', 'time', 'travel', 'velocity', 'physics'],
    icon: 'Compass'
  },
  {
    id: 'density-mass-volume-calculator',
    slug: 'density-mass-volume-calculator',
    title: 'Density, Mass & Volume Calculator',
    shortDescription: 'Calculate density (ρ = m/V), mass, or volume with built-in material density tables (water, steel, gold, air).',
    category: 'science',
    tags: ['density', 'mass', 'volume', 'physics', 'material science', 'rho'],
    icon: 'FlaskConical'
  },
  {
    id: 'force-calculator',
    slug: 'force-calculator',
    title: 'Force (Newton’s Second Law) Calculator',
    shortDescription: 'Calculate force (F = m × a), acceleration, mass, momentum, and kinetic energy in Newtons and Joules.',
    category: 'science',
    tags: ['force', 'newtons law', 'mass', 'acceleration', 'physics', 'energy'],
    icon: 'Zap'
  },
  {
    id: 'ohms-law-calculator',
    slug: 'ohms-law-calculator',
    title: 'Ohm’s Law & Power Calculator',
    shortDescription: 'Calculate electrical voltage (V), current (I), resistance (R), and electrical power (P = V × I) for DC circuits.',
    category: 'science',
    tags: ['ohms law', 'voltage', 'current', 'resistance', 'power', 'watts', 'electronics'],
    icon: 'BatteryCharging'
  }
];
