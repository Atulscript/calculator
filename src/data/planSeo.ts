import { PageSeoData } from './seoRegistry';

/**
 * Titles, descriptions and primary keywords authored in docs/seo-master-plan.md
 * (sections C/D) and generated from it. Editing this file directly will drift
 * from the plan — change the plan and regenerate, or promote an entry into
 * FLAGSHIP_SEO in seoRegistry.ts if it needs bespoke treatment.
 */
export const PLAN_SEO: Record<string, Omit<PageSeoData, 'keywords'> & { primary: string }> = {
  'annuity-calculator': {
    title: 'Annuity Calculator: Growth During Accumulation',
    description:
      'Project what an annuity will be worth when you start drawing on it, with regular contributions and a fixed growth rate.',
    primary: 'annuity calculator',
    canonicalPath: '/annuity-calculator'
  },
  'annuity-payout-calculator': {
    title: 'Annuity Payout Calculator: Monthly Income',
    description:
      'Work out the monthly income an annuity will pay, over a fixed term or for life, and how the payout period changes the amount.',
    primary: 'annuity payout calculator',
    canonicalPath: '/annuity-payout-calculator'
  },
  'area-converter': {
    title: 'Area Converter: Square Feet, Metres, Acres & Hectares',
    description:
      'Convert area between square metres, square feet, acres, hectares and regional land units.',
    primary: 'area converter',
    canonicalPath: '/area-converter'
  },
  'army-body-fat-calculator': {
    title: 'Army Body Fat Calculator (DoD Standard)',
    description:
      'Check body fat against current US Army standards by age and sex, using the official tape-test method.',
    primary: 'army body fat calculator',
    canonicalPath: '/army-body-fat-calculator'
  },
  'average-calculator': {
    title: 'Average & Standard Deviation Calculator',
    description:
      'Calculate arithmetic and weighted averages plus standard deviation and variance, for a sample or a full population.',
    primary: 'average calculator',
    canonicalPath: '/average-calculator'
  },
  'bac-calculator': {
    title: 'BAC Calculator: Blood Alcohol Estimate',
    description:
      'Estimate blood alcohol concentration using the Widmark formula. An estimate only — never use it to decide whether to drive.',
    primary: 'bac calculator',
    canonicalPath: '/bac-calculator'
  },
  'baking-conversion-calculator': {
    title: 'Cups to Grams Converter for Baking Ingredients',
    description:
      'Convert cups to grams by ingredient — flour, sugar and butter all weigh differently, so a single factor gets it wrong.',
    primary: 'cups to grams',
    canonicalPath: '/baking-conversion-calculator'
  },
  'bandwidth-calculator': {
    title: 'Bandwidth Calculator: Download Time Estimate',
    description:
      'Estimate how long a file takes to download at a given connection speed, with bits and bytes kept straight.',
    primary: 'download time calculator',
    canonicalPath: '/bandwidth-calculator'
  },
  'base64-encode-decode': {
    title: 'Base64 Encoder and Decoder',
    description:
      'Encode text to Base64 or decode it back, entirely in your browser — nothing is uploaded.',
    primary: 'base64 encoder decoder',
    canonicalPath: '/base64-encode-decode'
  },
  'binary-calculator': {
    title: 'Binary Calculator & Base Converter',
    description:
      'Add, subtract, multiply and divide in binary, and convert between binary, decimal, octal and hex.',
    primary: 'binary calculator',
    canonicalPath: '/binary-calculator'
  },
  'boat-loan-calculator': {
    title: 'Boat Loan Calculator: Monthly Payment Estimate',
    description:
      'Estimate monthly payments on a boat or marine loan across the longer terms typical of marine financing.',
    primary: 'boat loan calculator',
    canonicalPath: '/boat-loan-calculator'
  },
  'bond-calculator': {
    title: 'Bond Calculator: Yield, Price & Maturity',
    description:
      'Calculate current yield, yield to maturity and bond price, and see how a change in market rates moves the value of what you hold.',
    primary: 'bond yield calculator',
    canonicalPath: '/bond-calculator'
  },
  'bsa-calculator': {
    title: 'Body Surface Area Calculator (Du Bois, Mosteller)',
    description:
      'Calculate BSA using Du Bois or Mosteller, the standard basis for chemotherapy and paediatric dosing.',
    primary: 'body surface area calculator',
    canonicalPath: '/bsa-calculator'
  },
  'btu-calculator': {
    title: 'BTU Calculator: Air Conditioner Sizing',
    description:
      'Size an air conditioner or heater in BTUs for a room, adjusted for ceiling height, sunlight and occupancy.',
    primary: 'btu calculator',
    canonicalPath: '/btu-calculator'
  },
  'business-loan-calculator': {
    title: 'Business Loan Calculator: Repayments & Cost',
    description:
      'Estimate repayments on commercial financing, including origination fees, and see the true annual cost of borrowing for your business.',
    primary: 'business loan calculator',
    canonicalPath: '/business-loan-calculator'
  },
  'calories-burned-calculator': {
    title: 'Calories Burned Calculator: By Activity (METs)',
    description:
      'Estimate calories burned for over 100 activities using MET values, adjusted for your weight and duration.',
    primary: 'calories burned calculator',
    canonicalPath: '/calories-burned-calculator'
  },
  'canadian-mortgage-calculator': {
    title: 'Canadian Mortgage Calculator: Payments & Terms',
    description:
      'Calculate Canadian mortgage payments with semi-annual compounding, accelerated payment options and CMHC insurance on low down payments.',
    primary: 'canadian mortgage calculator',
    canonicalPath: '/canadian-mortgage-calculator'
  },
  'capital-gains-tax-calculator': {
    title: 'Capital Gains Tax Calculator: What You\'ll Owe',
    description:
      'Estimate capital gains tax on a sale, with the short-term and long-term rates applied separately and losses offset against gains.',
    primary: 'capital gains tax calculator',
    canonicalPath: '/capital-gains-tax-calculator'
  },
  'car-lease-vs-buy-calculator': {
    title: 'Car Lease vs Buy Calculator: Which Is Cheaper?',
    description:
      'Compare leasing against financing over the same period, including residual value and equity, so you can see the real cost difference.',
    primary: 'lease vs buy calculator',
    canonicalPath: '/car-lease-vs-buy-calculator'
  },
  'carbohydrate-calculator': {
    title: 'Carbohydrate Calculator: Daily Carb Target',
    description:
      'Work out daily carbohydrate grams for your calorie goal, from low-carb through to endurance-training intakes.',
    primary: 'carb calculator',
    canonicalPath: '/carbohydrate-calculator'
  },
  'cd-calculator': {
    title: 'CD Calculator: Certificate of Deposit Returns',
    description:
      'Calculate what a CD will be worth at maturity, compare APY across terms, and see what early withdrawal penalties would cost.',
    primary: 'cd calculator',
    canonicalPath: '/cd-calculator'
  },
  'chronological-age-calculator': {
    title: 'Chronological Age Calculator for School & Testing',
    description:
      'Calculate exact age in years, months and days on a specific test date — the format required for school assessments.',
    primary: 'chronological age calculator',
    canonicalPath: '/chronological-age-calculator'
  },
  'coffee-water-ratio-calculator': {
    title: 'Coffee to Water Ratio Calculator',
    description:
      'Get the coffee and water amounts for your brew method and strength, in grams and millilitres.',
    primary: 'coffee to water ratio',
    canonicalPath: '/coffee-water-ratio-calculator'
  },
  'college-cost-calculator': {
    title: 'College Cost Calculator: 529 Savings Plan',
    description:
      'Project future tuition costs against education inflation and find the monthly 529 contribution needed to cover them.',
    primary: 'college savings calculator',
    canonicalPath: '/college-cost-calculator'
  },
  'commission-calculator': {
    title: 'Sales Commission Calculator: Earnings',
    description:
      'Work out commission on flat, tiered or split rates, and see total earnings once base salary is included.',
    primary: 'commission calculator',
    canonicalPath: '/commission-calculator'
  },
  'cooking-time-calculator': {
    title: 'Meat Roasting Calculator: Time and Temperature',
    description:
      'Work out roasting time and oven temperature by weight and cut, with safe internal temperatures listed.',
    primary: 'roasting time calculator',
    canonicalPath: '/cooking-time-calculator'
  },
  'data-storage-converter': {
    title: 'Data Storage Converter: MB, GB, TB & Binary Units',
    description:
      'Convert between bytes, KB, MB, GB and TB, with the decimal and binary (KiB, MiB) definitions kept separate.',
    primary: 'data storage converter',
    canonicalPath: '/data-storage-converter'
  },
  'day-of-the-week-calculator': {
    title: 'Day of the Week Calculator: Any Date in History',
    description:
      'Find the weekday for any date, past or future, using the Gregorian calendar rules including leap years.',
    primary: 'what day of the week was',
    canonicalPath: '/day-of-the-week-calculator'
  },
  'days-until-calculator': {
    title: 'Days Until Calculator: Countdown to Any Date',
    description:
      'Count the days until a birthday, holiday, exam or deadline, with weeks and months shown alongside.',
    primary: 'days until calculator',
    canonicalPath: '/days-until-calculator'
  },
  'debt-consolidation-calculator': {
    title: 'Debt Consolidation Calculator: Is It Worth It?',
    description:
      'Compare your current debts against a single consolidation loan. Includes fees, so you can see whether consolidating genuinely saves money.',
    primary: 'debt consolidation calculator',
    canonicalPath: '/debt-consolidation-calculator'
  },
  'debt-ratio-calculator': {
    title: 'Debt-to-Income Ratio Calculator (DTI)',
    description:
      'Work out your front-end and back-end DTI the way lenders do, and see where you sit against the thresholds most mortgage lenders apply.',
    primary: 'debt to income ratio calculator',
    canonicalPath: '/debt-ratio-calculator'
  },
  'density-mass-volume-calculator': {
    title: 'Density, Mass & Volume Calculator',
    description:
      'Solve the density triangle for any missing value, with a reference table of common material densities.',
    primary: 'density calculator',
    canonicalPath: '/density-mass-volume-calculator'
  },
  'depreciation-calculator': {
    title: 'Depreciation Calculator: Straight-Line Schedule',
    description:
      'Calculate annual depreciation and book value year by year, with salvage value and useful life factored in.',
    primary: 'depreciation calculator',
    canonicalPath: '/depreciation-calculator'
  },
  'discount-calculator': {
    title: 'Discount Calculator: Sale Price & Savings',
    description:
      'Find the sale price and what you actually save, including stacked discounts and percentage-off-then-extra deals.',
    primary: 'discount calculator',
    canonicalPath: '/discount-calculator'
  },
  'dividend-yield-calculator': {
    title: 'Dividend Yield Calculator: Income & Payout',
    description:
      'Calculate dividend yield, annual income and payout ratio, and see what dividend reinvestment does to returns over time.',
    primary: 'dividend yield calculator',
    canonicalPath: '/dividend-yield-calculator'
  },
  'electricity-calculator': {
    title: 'Electricity Cost Calculator: Appliance Running Cost',
    description:
      'Work out what an appliance costs to run per day, month and year from its wattage and your tariff.',
    primary: 'electricity cost calculator',
    canonicalPath: '/electricity-calculator'
  },
  'exponent-calculator': {
    title: 'Exponent Calculator: Powers and Roots',
    description:
      'Calculate powers, roots and fractional exponents, including negative bases and the rules that apply to them.',
    primary: 'exponent calculator',
    canonicalPath: '/exponent-calculator'
  },
  'fat-intake-calculator': {
    title: 'Dietary Fat Calculator: Daily Fat Grams',
    description:
      'Calculate daily fat intake in grams for your calorie target, including the minimum needed for hormone function.',
    primary: 'fat intake calculator',
    canonicalPath: '/fat-intake-calculator'
  },
  'fha-loan-calculator': {
    title: 'FHA Loan Calculator: Payment & Mortgage Insurance',
    description:
      'Estimate FHA monthly payments including upfront and annual mortgage insurance premiums, with the 3.5% minimum down payment built in.',
    primary: 'fha loan calculator',
    canonicalPath: '/fha-loan-calculator'
  },
  'force-calculator': {
    title: 'Force Calculator: Newton\'s Second Law (F = ma)',
    description:
      'Calculate force, mass or acceleration from the other two, with unit handling for newtons, kg and m/s².',
    primary: 'force calculator',
    canonicalPath: '/force-calculator'
  },
  'fuel-cost-calculator': {
    title: 'Fuel Cost Calculator: Trip and Journey Cost',
    description:
      'Estimate what a journey costs in fuel from distance, economy and price per litre or gallon, split between passengers if you like.',
    primary: 'fuel cost calculator',
    canonicalPath: '/fuel-cost-calculator'
  },
  'gcf-calculator': {
    title: 'GCF Calculator: Greatest Common Factor',
    description:
      'Find the greatest common factor of any set of numbers, with the prime factorisation and Euclidean method both shown.',
    primary: 'gcf calculator',
    canonicalPath: '/gcf-calculator'
  },
  'gfr-calculator': {
    title: 'GFR Calculator: Kidney Function (CKD-EPI 2021)',
    description:
      'Estimate glomerular filtration rate using the 2021 CKD-EPI equation, with the CKD stage the result corresponds to.',
    primary: 'gfr calculator',
    canonicalPath: '/gfr-calculator'
  },
  'gravel-and-mulch-calculator': {
    title: 'Gravel, Mulch & Soil Calculator: Volume and Weight',
    description:
      'Calculate cubic yards and tonnage of gravel, mulch or topsoil for a given area and depth.',
    primary: 'gravel calculator',
    canonicalPath: '/gravel-and-mulch-calculator'
  },
  'gst-calculator': {
    title: 'GST Calculator: Add or Remove GST',
    description:
      'Add GST to a net price or strip it out of a gross one. Covers the standard slabs and shows the tax amount separately.',
    primary: 'gst calculator',
    canonicalPath: '/gst-calculator'
  },
  'heloc-calculator': {
    title: 'HELOC Calculator: Home Equity Line Payments',
    description:
      'Work out how much equity you can borrow, what the draw and repayment periods cost, and how a rate change would affect your payment.',
    primary: 'heloc calculator',
    canonicalPath: '/heloc-calculator'
  },
  'hex-calculator': {
    title: 'Hex Calculator: Hexadecimal Math & Conversion',
    description:
      'Do arithmetic in hexadecimal and convert between hex, decimal and binary — useful for colour codes and memory addresses.',
    primary: 'hex calculator',
    canonicalPath: '/hex-calculator'
  },
  'horsepower-calculator': {
    title: 'Horsepower Calculator: From Torque or Trap Speed',
    description:
      'Calculate horsepower from torque and RPM, or estimate it from quarter-mile trap speed and vehicle weight.',
    primary: 'horsepower calculator',
    canonicalPath: '/horsepower-calculator'
  },
  'hours-and-minutes-calculator': {
    title: 'Hours & Minutes Calculator: Add and Subtract Time',
    description:
      'Add and subtract hours and minutes, and convert between clock time and decimal hours for timesheets.',
    primary: 'hours and minutes calculator',
    canonicalPath: '/hours-and-minutes-calculator'
  },
  'interest-rate-calculator': {
    title: 'Interest Rate & APR Calculator',
    description:
      'Work backwards from a payment to find the actual interest rate, and see the difference between a quoted rate and the APR you really pay.',
    primary: 'interest rate calculator',
    canonicalPath: '/interest-rate-calculator'
  },
  'ip-subnet-calculator': {
    title: 'Subnet Calculator: CIDR, Mask & Host Range',
    description:
      'Calculate network address, broadcast, usable host range and mask from any IPv4 address and CIDR prefix.',
    primary: 'subnet calculator',
    canonicalPath: '/ip-subnet-calculator'
  },
  'ira-calculator': {
    title: 'Traditional IRA Calculator: Growth & Tax Deferral',
    description:
      'Project a traditional IRA balance, see the value of the upfront deduction and estimate what required minimum distributions will look like.',
    primary: 'traditional ira calculator',
    canonicalPath: '/ira-calculator'
  },
  'irr-calculator': {
    title: 'IRR Calculator: Internal Rate of Return',
    description:
      'Find the internal rate of return on an uneven series of cash flows, and compare it against your required rate.',
    primary: 'irr calculator',
    canonicalPath: '/irr-calculator'
  },
  'lcm-calculator': {
    title: 'LCM Calculator: Least Common Multiple',
    description:
      'Find the least common multiple of two or more numbers, with the working shown step by step.',
    primary: 'lcm calculator',
    canonicalPath: '/lcm-calculator'
  },
  'lean-body-mass-calculator': {
    title: 'Lean Body Mass Calculator (Boer & James)',
    description:
      'Estimate lean mass and fat mass from height, weight and sex, using the formulas clinicians use for drug dosing.',
    primary: 'lean body mass calculator',
    canonicalPath: '/lean-body-mass-calculator'
  },
  'length-converter': {
    title: 'Length Converter: Metres, Feet, Inches & Miles',
    description:
      'Convert length and distance across metric and imperial units, with exact factors and no rounding drift.',
    primary: 'length converter',
    canonicalPath: '/length-converter'
  },
  'log-calculator': {
    title: 'Log Calculator: Natural Log, Log Base 10 & Any Base',
    description:
      'Calculate logarithms to any base, including ln and log₁₀, with the change-of-base formula shown.',
    primary: 'log calculator',
    canonicalPath: '/log-calculator'
  },
  'margin-calculator': {
    title: 'Margin & Markup Calculator: Price and Profit',
    description:
      'Calculate margin, markup, profit and selling price from any two values. Margin and markup are not the same number — this shows both.',
    primary: 'margin calculator',
    canonicalPath: '/margin-calculator'
  },
  'mean-median-mode-range-calculator': {
    title: 'Mean, Median, Mode and Range Calculator',
    description:
      'Find all four measures from one data set, with the sorted values and the working shown for each.',
    primary: 'mean median mode calculator',
    canonicalPath: '/mean-median-mode-range-calculator'
  },
  'mortgage-calculator-uk': {
    title: 'UK Mortgage Calculator: Monthly Repayments',
    description:
      'Work out monthly repayments on a UK mortgage, compare repayment against interest-only, and see the effect when your fixed rate ends.',
    primary: 'uk mortgage calculator',
    canonicalPath: '/mortgage-calculator-uk'
  },
  'net-worth-calculator': {
    title: 'Net Worth Calculator: Assets Minus Liabilities',
    description:
      'Add up assets and debts to find your net worth, and see which liabilities are holding the number down.',
    primary: 'net worth calculator',
    canonicalPath: '/net-worth-calculator'
  },
  'ohms-law-calculator': {
    title: 'Ohm\'s Law Calculator: Voltage, Current, Resistance',
    description:
      'Solve for V, I, R or P from any two known values, with the full Ohm\'s law and power wheel explained.',
    primary: 'ohms law calculator',
    canonicalPath: '/ohms-law-calculator'
  },
  'pace-calculator': {
    title: 'Running Pace Calculator: Time, Pace & Splits',
    description:
      'Work out race pace, finish time or distance from any two of them, with split times for 5K through marathon.',
    primary: 'pace calculator',
    canonicalPath: '/pace-calculator'
  },
  'paint-calculator': {
    title: 'Paint Calculator: How Much Paint You Need',
    description:
      'Calculate litres or gallons for a room, with doors and windows deducted and coats and coverage rate factored in.',
    primary: 'paint calculator',
    canonicalPath: '/paint-calculator'
  },
  'password-generator': {
    title: 'Password Generator: Strong Random Passwords',
    description:
      'Generate strong random passwords in your browser and check strength. Nothing is sent anywhere — the password never leaves your device.',
    primary: 'password generator',
    canonicalPath: '/password-generator'
  },
  'payback-period-calculator': {
    title: 'Payback Period Calculator: Time to Recover',
    description:
      'Work out how long an investment takes to repay its cost, with both simple and discounted payback shown.',
    primary: 'payback period calculator',
    canonicalPath: '/payback-period-calculator'
  },
  'pension-calculator': {
    title: 'Pension Calculator: Forecast Your Income',
    description:
      'Estimate the annual pension your years of service and final salary will produce, and see what a few more years of contributions would add.',
    primary: 'pension calculator',
    canonicalPath: '/pension-calculator'
  },
  'permutation-and-combination-calculator': {
    title: 'Permutation & Combination Calculator (nPr, nCr)',
    description:
      'Calculate nPr and nCr with and without repetition, and see which one your problem actually needs.',
    primary: 'permutation and combination calculator',
    canonicalPath: '/permutation-and-combination-calculator'
  },
  'personal-loan-calculator': {
    title: 'Personal Loan Calculator: Monthly Payments',
    description:
      'Calculate monthly payments and total interest on a personal loan, and see how the term length changes what you pay overall.',
    primary: 'personal loan calculator',
    canonicalPath: '/personal-loan-calculator'
  },
  'ppf-calculator': {
    title: 'PPF Calculator: Maturity Value & Interest',
    description:
      'Calculate Public Provident Fund maturity over the 15-year term, with year-by-year interest and the effect of extending in 5-year blocks.',
    primary: 'ppf calculator',
    canonicalPath: '/ppf-calculator'
  },
  'prime-factorization-calculator': {
    title: 'Prime Factorization Calculator with Factor Tree',
    description:
      'Break any number into its prime factors, with a factor tree and the result in exponent form.',
    primary: 'prime factorization calculator',
    canonicalPath: '/prime-factorization-calculator'
  },
  'probability-calculator': {
    title: 'Probability Calculator: Single & Multiple Events',
    description:
      'Calculate probability for single and combined events, covering independent, dependent and mutually exclusive cases.',
    primary: 'probability calculator',
    canonicalPath: '/probability-calculator'
  },
  'pythagorean-theorem-calculator': {
    title: 'Pythagorean Theorem Calculator: Find a Missing Side',
    description:
      'Find the hypotenuse or either leg using a² + b² = c², with the rearranged formula and steps shown.',
    primary: 'pythagorean theorem calculator',
    canonicalPath: '/pythagorean-theorem-calculator'
  },
  'quadratic-formula-calculator': {
    title: 'Quadratic Formula Calculator with Steps',
    description:
      'Solve any quadratic equation, including complex roots, with the discriminant explained and every step shown.',
    primary: 'quadratic formula calculator',
    canonicalPath: '/quadratic-formula-calculator'
  },
  'random-number-generator': {
    title: 'Random Number Generator: Pick a Range',
    description:
      'Generate random numbers in any range, with or without duplicates, using the browser\'s cryptographic random source.',
    primary: 'random number generator',
    canonicalPath: '/random-number-generator'
  },
  'ratio-calculator': {
    title: 'Ratio Calculator: Simplify, Scale & Solve',
    description:
      'Simplify ratios, solve for a missing term and scale recipes or plans up and down while keeping proportions.',
    primary: 'ratio calculator',
    canonicalPath: '/ratio-calculator'
  },
  'recipe-converter': {
    title: 'Recipe Converter: Scale Servings Up or Down',
    description:
      'Scale any recipe to the number of servings you need, with quantities converted to sensible measurements.',
    primary: 'recipe scaler',
    canonicalPath: '/recipe-converter'
  },
  'rent-vs-buy-calculator': {
    title: 'Rent vs Buy Calculator: Which Costs Less Long-Term?',
    description:
      'Compare the true cost of renting against buying, including maintenance, taxes and the opportunity cost of your deposit. Shows the break-even year.',
    primary: 'rent vs buy calculator',
    canonicalPath: '/rent-vs-buy-calculator'
  },
  'rental-property-roi-calculator': {
    title: 'Rental Property ROI & Cap Rate Calculator',
    description:
      'Calculate cap rate, cash-on-cash return and monthly cash flow for a rental. Accounts for vacancy, maintenance and management fees.',
    primary: 'rental property roi calculator',
    canonicalPath: '/rental-property-roi-calculator'
  },
  'right-triangle-calculator': {
    title: 'Right Triangle Calculator: Sides, Angles & Area',
    description:
      'Solve a right triangle from any two values, with the trigonometric ratios and the working shown.',
    primary: 'right triangle calculator',
    canonicalPath: '/right-triangle-calculator'
  },
  'roman-numeral-converter': {
    title: 'Roman Numeral Converter: Both Directions',
    description:
      'Convert Roman numerals to numbers and back, with the subtractive rules applied correctly.',
    primary: 'roman numeral converter',
    canonicalPath: '/roman-numeral-converter'
  },
  'roofing-calculator': {
    title: 'Roofing Calculator: Squares and Shingle Bundles',
    description:
      'Calculate roof area in squares from footprint and pitch, and the bundles of shingles required.',
    primary: 'roofing calculator',
    canonicalPath: '/roofing-calculator'
  },
  'roth-ira-calculator': {
    title: 'Roth IRA Calculator: Tax-Free Growth',
    description:
      'Project Roth IRA growth and compare after-tax outcomes against a traditional IRA, including contribution and income limits.',
    primary: 'roth ira calculator',
    canonicalPath: '/roth-ira-calculator'
  },
  'simple-interest-calculator': {
    title: 'Simple Interest Calculator: I = P × r × t',
    description:
      'Calculate simple interest and the final balance, and see how it differs from compound interest over the same period.',
    primary: 'simple interest calculator',
    canonicalPath: '/simple-interest-calculator'
  },
  'sleep-cycle-calculator': {
    title: 'Sleep Calculator: Best Bedtime & Wake Time',
    description:
      'Work backwards from your wake time to find bedtimes that let you finish a full 90-minute sleep cycle instead of waking mid-cycle.',
    primary: 'sleep calculator',
    canonicalPath: '/sleep-cycle-calculator'
  },
  'slope-calculator': {
    title: 'Slope Calculator: Gradient & Line Equation',
    description:
      'Find the slope between two points, plus the line equation, distance, midpoint and angle of incline.',
    primary: 'slope calculator',
    canonicalPath: '/slope-calculator'
  },
  'social-security-calculator': {
    title: 'Social Security Calculator: Benefit Estimate',
    description:
      'Estimate your monthly benefit and see how claiming at 62, full retirement age or 70 changes the amount for the rest of your life.',
    primary: 'social security calculator',
    canonicalPath: '/social-security-calculator'
  },
  'speed-converter': {
    title: 'Speed Converter: mph, km/h, m/s & Knots',
    description:
      'Convert speed between mph, km/h, metres per second, knots and Mach, with the conversion factors shown alongside each result.',
    primary: 'speed converter',
    canonicalPath: '/speed-converter'
  },
  'speed-distance-time-calculator': {
    title: 'Speed, Distance & Time Calculator',
    description:
      'Solve for speed, distance or time from the other two, in any combination of metric and imperial units.',
    primary: 'speed distance time calculator',
    canonicalPath: '/speed-distance-time-calculator'
  },
  'stair-calculator': {
    title: 'Stair Calculator: Rise, Run & Stringer Layout',
    description:
      'Work out riser height, tread depth and stringer length for a staircase that meets standard building code limits.',
    primary: 'stair calculator',
    canonicalPath: '/stair-calculator'
  },
  'stamp-duty-calculator': {
    title: 'Stamp Duty Calculator: Property Transfer Tax',
    description:
      'Estimate stamp duty or property transfer tax on a purchase, including first-time buyer relief and additional-property surcharges.',
    primary: 'stamp duty calculator',
    canonicalPath: '/stamp-duty-calculator'
  },
  'student-loan-calculator': {
    title: 'Student Loan Repayment Calculator',
    description:
      'Estimate monthly repayments, total interest and payoff date. Compare standard repayment against extended and income-driven plans.',
    primary: 'student loan calculator',
    canonicalPath: '/student-loan-calculator'
  },
  'surface-area-calculator': {
    title: 'Surface Area Calculator for 3D Shapes',
    description:
      'Calculate total and lateral surface area for spheres, cylinders, cones, prisms and pyramids.',
    primary: 'surface area calculator',
    canonicalPath: '/surface-area-calculator'
  },
  'target-heart-rate-calculator': {
    title: 'Target Heart Rate Calculator: Training Zones',
    description:
      'Find your five training zones from max and resting heart rate, using the Karvonen method for more accurate zones.',
    primary: 'target heart rate calculator',
    canonicalPath: '/target-heart-rate-calculator'
  },
  'tile-calculator': {
    title: 'Tile Calculator: Tiles, Boxes & Grout Needed',
    description:
      'Find how many tiles and boxes a floor or wall needs, including cut waste and grout quantity.',
    primary: 'tile calculator',
    canonicalPath: '/tile-calculator'
  },
  'time-duration-calculator': {
    title: 'Time Duration Calculator: Hours Between Times',
    description:
      'Work out the time between two clock times, across midnight if needed, in hours, minutes and decimal hours.',
    primary: 'time duration calculator',
    canonicalPath: '/time-duration-calculator'
  },
  'tip-calculator': {
    title: 'Tip Calculator: Split the Bill Fairly',
    description:
      'Work out the tip and split a bill between any number of people, with uneven splits and rounding handled.',
    primary: 'tip calculator',
    canonicalPath: '/tip-calculator'
  },
  'tire-size-calculator': {
    title: 'Tire Size Calculator: Compare and Check Speedometer',
    description:
      'Compare two tyre sizes and see the difference in diameter, sidewall height and the speedometer error a change introduces.',
    primary: 'tire size calculator',
    canonicalPath: '/tire-size-calculator'
  },
  'triangle-calculator': {
    title: 'Triangle Calculator: Area, Angles & Sides',
    description:
      'Solve any triangle from three known values using the sine and cosine rules, with area and all remaining sides and angles.',
    primary: 'triangle calculator',
    canonicalPath: '/triangle-calculator'
  },
  'url-encode-decode': {
    title: 'URL Encoder and Decoder: Percent Encoding',
    description:
      'Percent-encode text for safe use in URLs, or decode an encoded string back to readable text.',
    primary: 'url encoder decoder',
    canonicalPath: '/url-encode-decode'
  },
  'va-mortgage-calculator': {
    title: 'VA Loan Calculator: Payment & Funding Fee',
    description:
      'Estimate a VA mortgage payment with no down payment and no PMI. Includes the funding fee and exemption handling for disabled veterans.',
    primary: 'va loan calculator',
    canonicalPath: '/va-mortgage-calculator'
  },
  'vat-calculator': {
    title: 'VAT Calculator: Add or Remove VAT',
    description:
      'Add VAT to a net figure or work backwards from a VAT-inclusive price, at any rate you enter.',
    primary: 'vat calculator',
    canonicalPath: '/vat-calculator'
  },
  'voltage-drop-calculator': {
    title: 'Voltage Drop Calculator: Wire Size & Distance',
    description:
      'Calculate voltage drop over a cable run and check whether your conductor size stays within the 3% guideline.',
    primary: 'voltage drop calculator',
    canonicalPath: '/voltage-drop-calculator'
  },
  'volume-calculator': {
    title: 'Volume Calculator: Cube, Sphere, Cylinder & Cone',
    description:
      'Calculate volume for ten 3D shapes, with each formula shown and results in the unit you choose.',
    primary: 'volume calculator',
    canonicalPath: '/volume-calculator'
  },
  'wallpaper-calculator': {
    title: 'Wallpaper Calculator: Rolls Needed',
    description:
      'Find how many rolls a room needs, with pattern repeat and drop matching accounted for.',
    primary: 'wallpaper calculator',
    canonicalPath: '/wallpaper-calculator'
  },
  'water-intake-calculator': {
    title: 'Water Intake Calculator: Daily Hydration Needs',
    description:
      'Estimate daily water needs from body weight, activity and climate — rather than assuming eight glasses fits everyone.',
    primary: 'water intake calculator',
    canonicalPath: '/water-intake-calculator'
  },
  'weight-converter': {
    title: 'Weight Converter: Kilograms, Pounds, Stone & Ounces',
    description:
      'Convert weight and mass between metric and imperial, including stone for UK body weight.',
    primary: 'kg to lbs converter',
    canonicalPath: '/weight-converter'
  },
};
