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
    id: 'income-tax-calculator',
    slug: 'income-tax-calculator',
    title: 'Income Tax & Net Pay Calculator',
    shortDescription: 'Estimate net take-home pay after progressive income tax brackets, standard deductions, 401(k)/80C, and FICA/cess.',
    category: 'finance',
    tags: ['income tax', 'tax bracket', 'deductions', 'take home pay', 'salary', 'tax refund', 'fica', 'regime'],
    icon: 'ReceiptText',
    badge: 'Popular'
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
  {
    id: 'auto-loan-calculator',
    slug: 'auto-loan-calculator',
    title: 'Auto & Car Loan Calculator',
    shortDescription: 'Calculate monthly car loan payments, trade-in equity, sales taxes, and total vehicle cost of ownership.',
    category: 'finance',
    tags: ['car loan', 'auto loan', 'vehicle financing', 'monthly payment', 'trade in', 'car payment'],
    icon: 'Car',
    badge: 'Popular'
  },
  {
    id: 'retirement-calculator',
    slug: 'retirement-calculator',
    title: 'Retirement & FIRE Calculator',
    shortDescription: 'Plan your retirement nest egg, safe monthly withdrawal with 4% rule, and calculate when you can achieve financial independence.',
    category: 'finance',
    tags: ['retirement', '401k', 'fire', 'financial independence', 'nest egg', 'pension', 'savings goal'],
    icon: 'PiggyBank',
    badge: 'Flagship'
  },
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    title: 'GST & Sales Tax Calculator',
    shortDescription: 'Compute inclusive and exclusive GST, CGST/SGST breakdowns, and sales tax across standard 5%, 12%, 18%, and 28% tax slabs.',
    category: 'finance',
    tags: ['gst', 'sales tax', 'vat', 'inclusive gst', 'exclusive gst', 'cgst', 'sgst', 'invoice'],
    icon: 'ReceiptPercent',
    badge: 'Popular'
  },
  {
    id: 'ppf-calculator',
    slug: 'ppf-calculator',
    title: 'PPF Calculator (Public Provident Fund)',
    shortDescription: 'Calculate 15-year tax-free maturity amount, annual compound interest at 7.1%, and yearly passbook growth schedule.',
    category: 'finance',
    tags: ['ppf', 'public provident fund', 'tax free', 'post office', '80c', 'guaranteed returns', 'inr'],
    icon: 'Landmark',
    badge: 'Popular'
  },
  {
    id: 'home-affordability-calculator',
    slug: 'home-affordability-calculator',
    title: 'Home Affordability Calculator',
    shortDescription: 'Determine maximum home purchase price based on gross income, monthly debt obligations, down payment, and DTI ratios.',
    category: 'finance',
    tags: ['home affordability', 'how much house can i afford', 'dti', 'mortgage', 'housing', 'real estate', 'down payment'],
    icon: 'Home',
    badge: 'Flagship'
  },
  {
    id: 'rent-vs-buy-calculator',
    slug: 'rent-vs-buy-calculator',
    title: 'Rent vs. Buy Calculator',
    shortDescription: 'Compare long-term wealth creation between buying a home vs renting and investing the difference, including break-even year.',
    category: 'finance',
    tags: ['rent vs buy', 'housing', 'home ownership', 'investing', 'real estate', 'renting'],
    icon: 'Building',
    badge: 'Popular'
  },
  {
    id: 'mortgage-refinance-calculator',
    slug: 'mortgage-refinance-calculator',
    title: 'Mortgage Refinance Calculator',
    shortDescription: 'Calculate monthly savings, break-even payback period, and lifetime interest savings from refinancing your home loan.',
    category: 'finance',
    tags: ['refinance', 'mortgage refinance', 'refi', 'interest rate cut', 'closing costs', 'monthly savings'],
    icon: 'RefreshCw',
    badge: 'Popular'
  },
  {
    id: 'rental-property-roi-calculator',
    slug: 'rental-property-roi-calculator',
    title: 'Rental Property ROI & Cap Rate Calculator',
    shortDescription: 'Analyze real estate investment performance: Net Operating Income (NOI), Cap Rate, Cash-on-Cash return, and Gross Rent Multiplier.',
    category: 'finance',
    tags: ['rental roi', 'cap rate', 'cash on cash', 'real estate investment', 'landlord', 'noi', 'cash flow'],
    icon: 'TrendingUp',
    badge: 'Popular'
  },
  {
    id: 'heloc-calculator',
    slug: 'heloc-calculator',
    title: 'HELOC & Home Equity Loan Calculator',
    shortDescription: 'Estimate your borrowing power via Home Equity Line of Credit (HELOC), maximum draw limit at 80% LTV, and interest-only payments.',
    category: 'finance',
    tags: ['heloc', 'home equity', 'equity loan', 'ltv', 'second mortgage', 'line of credit'],
    icon: 'Percent'
  },
  {
    id: 'stamp-duty-calculator',
    slug: 'stamp-duty-calculator',
    title: 'Property Transfer Tax & Stamp Duty (SDLT)',
    shortDescription: 'Calculate residential stamp duty land tax across statutory price bands, including first-time buyer relief and additional property surcharges.',
    category: 'finance',
    tags: ['stamp duty', 'sdlt', 'property tax', 'uk housing', 'transfer tax', 'conveyancing'],
    icon: 'Home'
  },
  {
    id: 'credit-card-payoff-calculator',
    slug: 'credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator',
    shortDescription: 'Calculate how long it takes to become debt-free, or find the fixed monthly payment needed to eliminate high-interest card debt.',
    category: 'finance',
    tags: ['credit card payoff', 'debt free', 'credit card interest', 'debt payoff', 'apr', 'credit card balance'],
    icon: 'CreditCard',
    badge: 'Flagship'
  },
  {
    id: 'student-loan-calculator',
    slug: 'student-loan-calculator',
    title: 'Student Loan Repayment Calculator',
    shortDescription: 'Estimate standard monthly repayments, total interest costs, and pay-off dates for federal and private student loans.',
    category: 'finance',
    tags: ['student loan', 'college debt', 'loan repayment', 'education loan', 'fafsa', 'interest'],
    icon: 'GraduationCap',
    badge: 'Popular'
  },
  {
    id: 'car-lease-vs-buy-calculator',
    slug: 'car-lease-vs-buy-calculator',
    title: 'Car Lease vs. Buy Calculator',
    shortDescription: 'Compare total financial outlay between leasing a new vehicle vs. purchasing and financing it over the same period.',
    category: 'finance',
    tags: ['lease vs buy', 'car lease', 'auto financing', 'dealership', 'depreciation', 'residual value'],
    icon: 'Car'
  },
  {
    id: 'capital-gains-tax-calculator',
    slug: 'capital-gains-tax-calculator',
    title: 'Capital Gains Tax Calculator',
    shortDescription: 'Estimate tax liabilities on short-term and long-term asset sales across stocks, cryptocurrencies, and real estate investments.',
    category: 'finance',
    tags: ['capital gains', 'tax', 'stocks', 'crypto tax', 'long term gains', 'short term gains', 'irs'],
    icon: 'TrendingUp',
    badge: 'Popular'
  },
  {
    id: 'vat-calculator',
    slug: 'vat-calculator',
    title: 'VAT (Value Added Tax) Calculator',
    shortDescription: 'Quickly compute standard, reduced, and zero-rate inclusive and exclusive Value Added Tax (VAT) across the UK and EU.',
    category: 'finance',
    tags: ['vat', 'value added tax', 'uk vat', 'eu vat', 'tax inclusive', 'tax exclusive', 'business'],
    icon: 'Receipt'
  },
  {
    id: 'net-worth-calculator',
    slug: 'net-worth-calculator',
    title: 'Personal Net Worth Calculator',
    shortDescription: 'Calculate your true financial standing by aggregating liquid, physical, and retirement assets against liabilities and debts.',
    category: 'finance',
    tags: ['net worth', 'assets', 'liabilities', 'personal finance', 'wealth tracking', 'balance sheet'],
    icon: 'Scale',
    badge: 'Popular'
  },
  {
    id: 'inflation-calculator',
    slug: 'inflation-calculator',
    title: 'Inflation & Purchasing Power Calculator',
    shortDescription: 'Compute how consumer inflation erodes future purchasing power, and determine equivalent future currency values.',
    category: 'finance',
    tags: ['inflation', 'cpi', 'purchasing power', 'future value', 'cost of living', 'economic growth'],
    icon: 'TrendingUp'
  },
  {
    id: 'dividend-yield-calculator',
    slug: 'dividend-yield-calculator',
    title: 'Dividend Yield & Income Calculator',
    shortDescription: 'Calculate forward dividend yield percentage, monthly and quarterly passive cash flow from stock and ETF portfolios.',
    category: 'finance',
    tags: ['dividend yield', 'passive income', 'dividend stocks', 'etf', 'cash flow', 'stock market'],
    icon: 'DollarSign'
  },
  {
    id: '401k-calculator',
    slug: '401k-calculator',
    title: '401(k) Retirement Calculator',
    shortDescription: 'Project retirement wealth, employee contributions, employer 401(k) match, and compound investment growth.',
    category: 'finance',
    tags: ['401k', 'retirement', 'nest egg', 'employer match', 'ira', 'savings', 'future value'],
    icon: 'PiggyBank',
    badge: 'Flagship'
  },
  {
    id: 'roth-ira-calculator',
    slug: 'roth-ira-calculator',
    title: 'Roth IRA Calculator',
    shortDescription: 'Calculate tax-free compound growth and retirement distribution potential for Roth IRA annual contributions.',
    category: 'finance',
    tags: ['roth ira', 'ira', 'tax free growth', 'retirement', 'investing', 'compound interest'],
    icon: 'TrendingUp',
    badge: 'Popular'
  },
  {
    id: 'ira-calculator',
    slug: 'ira-calculator',
    title: 'Traditional IRA Calculator',
    shortDescription: 'Estimate tax-deferred retirement savings growth and future taxable distributions at retirement age.',
    category: 'finance',
    tags: ['traditional ira', 'ira', 'tax deferred', 'retirement', '401k', 'savings'],
    icon: 'PiggyBank'
  },
  {
    id: 'pension-calculator',
    slug: 'pension-calculator',
    title: 'Pension Forecast Calculator',
    shortDescription: 'Estimate monthly and annual defined-benefit pension payouts based on service years and final salary.',
    category: 'finance',
    tags: ['pension', 'state pension', 'retirement', 'annuity', 'benefit', 'uk pension'],
    icon: 'Landmark'
  },
  {
    id: 'social-security-calculator',
    slug: 'social-security-calculator',
    title: 'Social Security Benefits Calculator',
    shortDescription: 'Forecast monthly Social Security retirement benefits based on claiming age (62, 67, or 70).',
    category: 'finance',
    tags: ['social security', 'ssa', 'retirement age', 'pia', 'benefits', 'government'],
    icon: 'ShieldCheck'
  },
  {
    id: 'annuity-calculator',
    slug: 'annuity-calculator',
    title: 'Annuity Growth Calculator',
    shortDescription: 'Compute future accumulated value of fixed regular contributions under compound interest.',
    category: 'finance',
    tags: ['annuity', 'future value', 'compound interest', 'retirement income', 'savings'],
    icon: 'LineChart'
  },
  {
    id: 'annuity-payout-calculator',
    slug: 'annuity-payout-calculator',
    title: 'Annuity Payout Calculator',
    shortDescription: 'Determine guaranteed monthly or annual withdrawal payouts generated by an upfront lump sum.',
    category: 'finance',
    tags: ['annuity payout', 'immediate annuity', 'fixed income', 'retirement cash flow'],
    icon: 'Wallet'
  },
  {
    id: 'cd-calculator',
    slug: 'cd-calculator',
    title: 'CD Calculator (Certificate of Deposit)',
    shortDescription: 'Calculate guaranteed interest earnings, APY yield, and final maturity balance for bank CDs.',
    category: 'finance',
    tags: ['cd', 'certificate of deposit', 'apy', 'bank', 'fixed deposit', 'fd', 'interest'],
    icon: 'Percent',
    badge: 'Popular'
  },
  {
    id: 'bond-calculator',
    slug: 'bond-calculator',
    title: 'Bond Yield & Pricing Calculator',
    shortDescription: 'Compute bond coupon payments, current yield %, and Yield to Maturity (YTM) for treasury and corporate bonds.',
    category: 'finance',
    tags: ['bond', 'bond yield', 'ytm', 'coupon', 'fixed income', 'treasury'],
    icon: 'Award'
  },
  {
    id: 'debt-ratio-calculator',
    slug: 'debt-ratio-calculator',
    title: 'Debt-to-Income (DTI) Ratio Calculator',
    shortDescription: 'Evaluate front-end and back-end debt-to-income percentages to verify mortgage and loan pre-qualification.',
    category: 'finance',
    tags: ['dti', 'debt to income', 'loan qualification', 'mortgage approval', 'credit ratio'],
    icon: 'Scale',
    badge: 'Popular'
  },
  {
    id: 'debt-payoff-calculator',
    slug: 'debt-payoff-calculator',
    title: 'Debt Snowball & Avalanche Payoff Calculator',
    shortDescription: 'Plan your path to debt freedom comparing Avalanche (highest APR first) vs Snowball (smallest balance first) methods.',
    category: 'finance',
    tags: ['debt payoff', 'snowball', 'avalanche', 'debt free', 'credit cards', 'debt reduction'],
    icon: 'TrendingDown'
  },
  {
    id: 'debt-consolidation-calculator',
    slug: 'debt-consolidation-calculator',
    title: 'Debt Consolidation Calculator',
    shortDescription: 'See if consolidating high-interest cards into a single lower-rate personal loan reduces total monthly payments.',
    category: 'finance',
    tags: ['debt consolidation', 'refinance debt', 'personal loan', 'lower interest', 'payoff'],
    icon: 'Combine'
  },
  {
    id: 'personal-loan-calculator',
    slug: 'personal-loan-calculator',
    title: 'Personal Loan Calculator',
    shortDescription: 'Calculate monthly payments, total interest fees, and APR schedules for unsecured personal borrowing.',
    category: 'finance',
    tags: ['personal loan', 'monthly payment', 'unsecured loan', 'borrowing', 'apr'],
    icon: 'Banknote'
  },
  {
    id: 'business-loan-calculator',
    slug: 'business-loan-calculator',
    title: 'Business Loan & Commercial Financing',
    shortDescription: 'Estimate debt service, SBA loan payments, and working capital interest splits for commercial enterprises.',
    category: 'finance',
    tags: ['business loan', 'sba loan', 'commercial finance', 'working capital', 'equipment loan'],
    icon: 'Building2'
  },
  {
    id: 'boat-loan-calculator',
    slug: 'boat-loan-calculator',
    title: 'Boat & Marine Loan Calculator',
    shortDescription: 'Calculate financing terms, down payment requirements, and monthly payments for boats and watercraft.',
    category: 'finance',
    tags: ['boat loan', 'marine financing', 'rv loan', 'yacht', 'monthly payment'],
    icon: 'Ship'
  },
  {
    id: 'margin-calculator',
    slug: 'margin-calculator',
    title: 'Margin & Markup Calculator',
    shortDescription: 'Calculate gross profit margin %, markup percentage, and optimal selling prices for retail and ecommerce products.',
    category: 'finance',
    tags: ['margin', 'markup', 'profit margin', 'gross profit', 'pricing', 'retail', 'ecommerce'],
    icon: 'TrendingUp',
    badge: 'Popular'
  },
  {
    id: 'depreciation-calculator',
    slug: 'depreciation-calculator',
    title: 'Asset Depreciation Calculator (Straight-Line)',
    shortDescription: 'Compute annual tax depreciation, salvage value adjustments, and asset book value schedules.',
    category: 'finance',
    tags: ['depreciation', 'straight line', 'book value', 'salvage value', 'accounting', 'tax write off'],
    icon: 'TrendingDown'
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    title: 'ROI Calculator (Return on Investment)',
    shortDescription: 'Determine net profit, percentage ROI, annualized yield, and investment multiple across projects.',
    category: 'finance',
    tags: ['roi', 'return on investment', 'net profit', 'annualized return', 'business', 'investing'],
    icon: 'Percent',
    badge: 'Popular'
  },
  {
    id: 'irr-calculator',
    slug: 'irr-calculator',
    title: 'IRR Calculator (Internal Rate of Return)',
    shortDescription: 'Analyze the profitability of potential capital investments and cash flow streams using internal rate of return.',
    category: 'finance',
    tags: ['irr', 'internal rate of return', 'npv', 'discount rate', 'capital budgeting'],
    icon: 'BarChart'
  },
  {
    id: 'fha-loan-calculator',
    slug: 'fha-loan-calculator',
    title: 'FHA Home Loan Calculator',
    shortDescription: 'Calculate monthly payments for FHA mortgages with 3.5% down payment, upfront MIP, and annual mortgage insurance.',
    category: 'finance',
    tags: ['fha loan', 'fha mortgage', '3.5 down', 'mip', 'first time buyer', 'housing'],
    icon: 'Home',
    badge: 'Popular'
  },
  {
    id: 'va-mortgage-calculator',
    slug: 'va-mortgage-calculator',
    title: 'VA Mortgage Loan Calculator',
    shortDescription: 'Estimate zero-down-payment mortgage payments and VA funding fee exemptions for military service members.',
    category: 'finance',
    tags: ['va loan', 'va mortgage', 'zero down', 'military home loan', 'veterans'],
    icon: 'ShieldCheck'
  },
  {
    id: 'mortgage-calculator-uk',
    slug: 'mortgage-calculator-uk',
    title: 'UK Mortgage Payment Calculator',
    shortDescription: 'Calculate monthly sterling (£) repayments, fixed-rate term costs, and lender arrangement fees for UK properties.',
    category: 'finance',
    tags: ['uk mortgage', 'sterling', 'repayment mortgage', 'fixed rate', 'bank of england', 'gbp'],
    icon: 'Building'
  },
  {
    id: 'canadian-mortgage-calculator',
    slug: 'canadian-mortgage-calculator',
    title: 'Canadian Mortgage Calculator',
    shortDescription: 'Calculate Canadian mortgage payments with semi-annual compounding, CMHC insurance, and accelerated bi-weekly options.',
    category: 'finance',
    tags: ['canadian mortgage', 'cmhc', 'biweekly mortgage', 'cad', 'canada real estate'],
    icon: 'Home'
  },
  {
    id: 'payback-period-calculator',
    slug: 'payback-period-calculator',
    title: 'Payback Period Calculator',
    shortDescription: 'Find the exact number of years or months required to recover original capital invested in an initiative.',
    category: 'finance',
    tags: ['payback period', 'break even', 'capital investment', 'cash flow', 'business'],
    icon: 'Clock'
  },
  {
    id: 'commission-calculator',
    slug: 'commission-calculator',
    title: 'Sales Commission Calculator',
    shortDescription: 'Calculate total commission earnings, tiered percentage bonuses, and split commission rates for sales reps.',
    category: 'finance',
    tags: ['commission', 'sales commission', 'bonus', 'tiered commission', 'sales rep', 'revenue split'],
    icon: 'DollarSign'
  },
  {
    id: 'savings-calculator',
    slug: 'savings-calculator',
    title: 'Savings Goal & Growth Calculator',
    shortDescription: 'Determine how much you need to save each month to hit a target nest egg or purchase goal.',
    category: 'finance',
    tags: ['savings goal', 'savings', 'emergency fund', 'compound interest', 'future value'],
    icon: 'PiggyBank'
  },
  {
    id: 'college-cost-calculator',
    slug: 'college-cost-calculator',
    title: 'College Cost & 529 Savings Planner',
    shortDescription: 'Forecast total university tuition, room & board, inflation, and required monthly 529 college savings.',
    category: 'finance',
    tags: ['college cost', '529 plan', 'tuition', 'student savings', 'university debt'],
    icon: 'GraduationCap'
  },
  {
    id: 'interest-rate-calculator',
    slug: 'interest-rate-calculator',
    title: 'Interest Rate & APR Calculator',
    shortDescription: 'Solve for the effective annual interest rate or APR given loan amount, tenure, and monthly installment.',
    category: 'finance',
    tags: ['interest rate', 'apr', 'effective rate', 'loan rate', 'nominal rate'],
    icon: 'Percent'
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
  {
    id: 'ovulation-calculator',
    slug: 'ovulation-calculator',
    title: 'Ovulation & Fertility Calculator',
    shortDescription: 'Track your fertile window, peak conception days, estimated ovulation date, and next expected period.',
    category: 'health',
    tags: ['ovulation', 'fertility', 'period tracker', 'fertile window', 'pregnancy', 'menstrual cycle'],
    icon: 'CalendarHeart',
    badge: 'Popular'
  },
  {
    id: 'bmr-calculator',
    slug: 'bmr-calculator',
    title: 'BMR Calculator (Basal Metabolic Rate)',
    shortDescription: 'Calculate daily calories burned at rest using Mifflin-St Jeor & Harris-Benedict formulas across activity levels.',
    category: 'health',
    tags: ['bmr', 'basal metabolic rate', 'metabolism', 'calories burned', 'tdee', 'resting calories'],
    icon: 'Flame',
    badge: 'Popular'
  },
  {
    id: 'bac-calculator',
    slug: 'bac-calculator',
    title: 'BAC (Blood Alcohol Content) Calculator',
    shortDescription: 'Estimate blood alcohol concentration using Widmark’s formula, evaluate legal driving limits (0.08%), and hours until sober.',
    category: 'health',
    tags: ['bac', 'blood alcohol', 'alcohol calculator', 'sobriety', 'driving limit', 'widmark', 'drinks'],
    icon: 'Wine',
    badge: 'Popular'
  },
  {
    id: 'bsa-calculator',
    slug: 'bsa-calculator',
    title: 'Body Surface Area (BSA) & Dosage Calculator',
    shortDescription: 'Calculate exact body surface area using Mosteller, Du Bois, and Haycock formulas with medical mg/m² dosage calibration.',
    category: 'health',
    tags: ['bsa', 'body surface area', 'mosteller', 'chemotherapy dosage', 'pediatric dosage', 'medical'],
    icon: 'Stethoscope'
  },
  {
    id: 'one-rep-max-calculator',
    slug: 'one-rep-max-calculator',
    title: 'One Rep Max (1RM) Calculator',
    shortDescription: 'Calculate your 1-rep maximum lift across bench press, squat, and deadlift using composite Epley & Brzycki formulas.',
    category: 'health',
    tags: ['one rep max', '1rm', 'bench press', 'squat', 'deadlift', 'strength training', 'weightlifting', 'gym'],
    icon: 'Dumbbell',
    badge: 'Popular'
  },
  {
    id: 'pace-calculator',
    slug: 'pace-calculator',
    title: 'Running & Walking Pace Calculator',
    shortDescription: 'Calculate race pace per kilometer and mile, running speed (km/h & mph), and race finish times for 5k, 10k, and marathon.',
    category: 'health',
    tags: ['pace', 'running pace', 'marathon', '5k', '10k', 'split time', 'running', 'jogging'],
    icon: 'Timer',
    badge: 'Popular'
  },
  {
    id: 'calories-burned-calculator',
    slug: 'calories-burned-calculator',
    title: 'Calories Burned by Activity (METs)',
    shortDescription: 'Estimate active energy expenditure and calories burned across running, cycling, swimming, lifting, HIIT, and walking.',
    category: 'health',
    tags: ['calories burned', 'exercise calories', 'mets', 'workout', 'cardio', 'active calories'],
    icon: 'Flame',
    badge: 'Popular'
  },
  {
    id: 'gfr-calculator',
    slug: 'gfr-calculator',
    title: 'GFR Kidney Function Calculator (CKD-EPI)',
    shortDescription: 'Calculate estimated Glomerular Filtration Rate (eGFR) from serum creatinine to evaluate kidney health and CKD stage.',
    category: 'health',
    tags: ['gfr', 'egfr', 'kidney function', 'creatinine', 'ckd', 'renal health', 'medical'],
    icon: 'Stethoscope'
  },
  {
    id: 'lean-body-mass-calculator',
    slug: 'lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator (LBM)',
    shortDescription: 'Compute fat-free mass and muscle weight using Boer, James, and Hume scientific formulas.',
    category: 'health',
    tags: ['lean body mass', 'lbm', 'fat free mass', 'muscle mass', 'body composition'],
    icon: 'Activity'
  },
  {
    id: 'army-body-fat-calculator',
    slug: 'army-body-fat-calculator',
    title: 'Army Body Fat Calculator (DoD Standard)',
    shortDescription: 'Calculate body fat percentage based on official U.S. Army and Department of Defense tape measurement standards.',
    category: 'health',
    tags: ['army body fat', 'dod body fat', 'military tape test', 'neck waist tape', 'fitness test'],
    icon: 'Shield'
  },
  {
    id: 'carbohydrate-calculator',
    slug: 'carbohydrate-calculator',
    title: 'Carbohydrate Intake Calculator',
    shortDescription: 'Calculate daily carb targets in grams and calories based on activity level, endurance demands, and keto goals.',
    category: 'health',
    tags: ['carbs', 'carbohydrates', 'macros', 'endurance', 'glycogen', 'low carb', 'diet'],
    icon: 'Utensils'
  },
  {
    id: 'protein-calculator',
    slug: 'protein-calculator',
    title: 'Daily Protein Intake Calculator',
    shortDescription: 'Find optimal daily protein intake in grams for muscle building, fat loss preservation, and active recovery.',
    category: 'health',
    tags: ['protein', 'protein grams', 'muscle building', 'hypertrophy', 'bodybuilding', 'nutrition'],
    icon: 'Dumbbell'
  },
  {
    id: 'fat-intake-calculator',
    slug: 'fat-intake-calculator',
    title: 'Dietary Fat Intake Calculator',
    shortDescription: 'Determine healthy dietary fat intake ranges in grams and percentage of daily caloric needs.',
    category: 'health',
    tags: ['fat intake', 'healthy fats', 'omega 3', 'keto', 'nutrition', 'dietary fat'],
    icon: 'Activity'
  },
  {
    id: 'tdee-calculator',
    slug: 'tdee-calculator',
    title: 'TDEE Calculator (Total Daily Energy)',
    shortDescription: 'Calculate exact daily maintenance calories incorporating BMR and metabolic physical activity multipliers.',
    category: 'health',
    tags: ['tdee', 'total daily energy expenditure', 'maintenance calories', 'bmr', 'metabolism'],
    icon: 'Flame',
    badge: 'Flagship'
  },
  {
    id: 'healthy-weight-calculator',
    slug: 'healthy-weight-calculator',
    title: 'Healthy Weight Range Calculator',
    shortDescription: 'Find your medically recommended optimal weight range according to WHO BMI thresholds and frame size.',
    category: 'health',
    tags: ['healthy weight', 'ideal weight', 'target weight', 'who standard', 'weight range'],
    icon: 'Scale'
  },
  {
    id: 'overweight-calculator',
    slug: 'overweight-calculator',
    title: 'Overweight & Weight Management Calculator',
    shortDescription: 'Assess excess weight and determine realistic, sustainable weekly milestones for safe fat loss.',
    category: 'health',
    tags: ['overweight', 'weight management', 'safe weight loss', 'bmi', 'obesity risk'],
    icon: 'TrendingDown'
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
  {
    id: 'fuel-cost-calculator',
    slug: 'fuel-cost-calculator',
    title: 'Fuel Cost & Road Trip Calculator',
    shortDescription: 'Calculate road trip gas costs, fuel consumed (MPG or L/100km), and split trip expenses per passenger.',
    category: 'everyday',
    tags: ['fuel cost', 'gas mileage', 'trip cost', 'road trip', 'mpg', 'liters', 'split gas'],
    icon: 'Fuel',
    badge: 'Popular'
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    title: 'Password Generator & Security Checker',
    shortDescription: 'Generate cryptographically secure passwords with custom entropy, character sets, and test brute-force crack resistance time.',
    category: 'everyday',
    tags: ['password generator', 'password checker', 'security', 'cybersecurity', 'random password', 'entropy'],
    icon: 'KeyRound',
    badge: 'Popular'
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
  {
    id: 'triangle-calculator',
    slug: 'triangle-calculator',
    title: 'Triangle Area & Angle Calculator',
    shortDescription: 'Solve triangle area (Heron’s formula), perimeter, internal angles, and determine equilateral, isosceles, or scalene classification.',
    category: 'math',
    tags: ['triangle', 'herons formula', 'triangle area', 'angles', 'geometry', 'perimeter'],
    icon: 'Shapes',
    badge: 'Popular'
  },
  {
    id: 'right-triangle-calculator',
    slug: 'right-triangle-calculator',
    title: 'Right Triangle & Trigonometry Calculator',
    shortDescription: 'Solve right triangle side lengths, angles, sine, cosine, tangent, and hypotenuse with precision trigonometry.',
    category: 'math',
    tags: ['right triangle', 'hypotenuse', 'trig', 'sin cos tan', 'pythagorean'],
    icon: 'Triangle'
  },
  {
    id: 'pythagorean-theorem-calculator',
    slug: 'pythagorean-theorem-calculator',
    title: 'Pythagorean Theorem Calculator',
    shortDescription: 'Compute missing triangle hypotenuse or legs using the classical Pythagorean equation a² + b² = c².',
    category: 'math',
    tags: ['pythagorean theorem', 'a2 b2 c2', 'hypotenuse', 'geometry', 'triangle math'],
    icon: 'Shapes'
  },
  {
    id: 'volume-calculator',
    slug: 'volume-calculator',
    title: '3D Shape Volume Calculator',
    shortDescription: 'Calculate three-dimensional volume and surface area for spheres, cones, cylinders, and rectangular boxes.',
    category: 'math',
    tags: ['volume', 'cylinder', 'sphere', 'cone', 'box', 'cubic volume', '3d geometry'],
    icon: 'Boxes',
    badge: 'Popular'
  },
  {
    id: 'surface-area-calculator',
    slug: 'surface-area-calculator',
    title: '3D Surface Area Calculator',
    shortDescription: 'Calculate the total outside surface area for cylinders, spheres, cones, cubes, and geometric prisms.',
    category: 'math',
    tags: ['surface area', 'geometry', 'sphere area', 'cylinder area', 'box surface'],
    icon: 'Boxes'
  },
  {
    id: 'quadratic-formula-calculator',
    slug: 'quadratic-formula-calculator',
    title: 'Quadratic Formula & Roots Solver',
    shortDescription: 'Solve quadratic equations ax² + bx + c = 0 with real and complex roots, discriminant analysis, and parabola vertex.',
    category: 'math',
    tags: ['quadratic formula', 'parabola', 'roots', 'algebra', 'discriminant', 'vertex'],
    icon: 'Calculator',
    badge: 'Popular'
  },
  {
    id: 'slope-calculator',
    slug: 'slope-calculator',
    title: 'Slope & Linear Line Calculator',
    shortDescription: 'Find line slope (m = Δy/Δx), inclination angle, straight-line equation (y = mx + b), and 2D coordinate distance.',
    category: 'math',
    tags: ['slope', 'linear equation', 'coordinates', 'rise over run', 'gradient'],
    icon: 'TrendingUp'
  },
  {
    id: 'mean-median-mode-range-calculator',
    slug: 'mean-median-mode-range-calculator',
    title: 'Mean, Median, Mode & Range Calculator',
    shortDescription: 'Compute average (mean), median midpoint, mode frequency, data range, and sample standard deviation for numerical datasets.',
    category: 'math',
    tags: ['mean median mode', 'average', 'statistics', 'range', 'dataset', 'frequency'],
    icon: 'Sigma',
    badge: 'Popular'
  },
  {
    id: 'permutation-and-combination-calculator',
    slug: 'permutation-and-combination-calculator',
    title: 'Permutation & Combination (nPr / nCr)',
    shortDescription: 'Calculate permutations (order matters) and combinations (order does not matter) with factorial factor breakdown.',
    category: 'math',
    tags: ['permutation', 'combination', 'npr', 'ncr', 'combinatorics', 'factorial', 'probability'],
    icon: 'Percent'
  },
  {
    id: 'probability-calculator',
    slug: 'probability-calculator',
    title: 'Probability Calculator',
    shortDescription: 'Compute single event odds, independent and dependent compound probabilities, and complementary odds.',
    category: 'math',
    tags: ['probability', 'odds', 'chance', 'independent events', 'statistics'],
    icon: 'Dices'
  },
  {
    id: 'binary-calculator',
    slug: 'binary-calculator',
    title: 'Binary Number Calculator & Base Converter',
    shortDescription: 'Convert and compute numbers between Binary (Base 2), Decimal (Base 10), Hexadecimal (Base 16), and Octal (Base 8).',
    category: 'math',
    tags: ['binary', 'hexadecimal', 'base 2', 'base 16', 'decimal', 'computer science'],
    icon: 'Binary',
    badge: 'Popular'
  },
  {
    id: 'hex-calculator',
    slug: 'hex-calculator',
    title: 'Hexadecimal Calculator & Converter',
    shortDescription: 'Perform hex to decimal conversions, hexadecimal math, and bitwise logic operations.',
    category: 'math',
    tags: ['hex', 'hexadecimal', 'base 16', 'binary', 'bitwise', 'programming'],
    icon: 'Binary'
  },
  {
    id: 'exponent-calculator',
    slug: 'exponent-calculator',
    title: 'Exponent & Power Calculator',
    shortDescription: 'Calculate exponential powers (x^y), negative exponents, fractional powers, and scientific power growth.',
    category: 'math',
    tags: ['exponent', 'power', 'algebra', 'squared', 'cubed', 'exponential'],
    icon: 'Calculator'
  },
  {
    id: 'log-calculator',
    slug: 'log-calculator',
    title: 'Logarithm & Natural Log (ln) Calculator',
    shortDescription: 'Calculate standard base-10 logarithm, natural logarithm (ln with Euler’s constant e), and arbitrary base logs.',
    category: 'math',
    tags: ['log', 'logarithm', 'natural log', 'ln', 'eulers constant', 'math'],
    icon: 'Calculator'
  },
  {
    id: 'gcf-calculator',
    slug: 'gcf-calculator',
    title: 'GCF Calculator (Greatest Common Factor)',
    shortDescription: 'Find the Greatest Common Factor (GCF / HCF) and greatest common divisor between two or more integers.',
    category: 'math',
    tags: ['gcf', 'greatest common factor', 'hcf', 'divisor', 'integer factors'],
    icon: 'Divide'
  },
  {
    id: 'lcm-calculator',
    slug: 'lcm-calculator',
    title: 'LCM Calculator (Least Common Multiple)',
    shortDescription: 'Calculate the Least Common Multiple (LCM) for multiple integers using prime factorization.',
    category: 'math',
    tags: ['lcm', 'least common multiple', 'multiples', 'fractions denominator'],
    icon: 'Divide'
  },
  {
    id: 'prime-factorization-calculator',
    slug: 'prime-factorization-calculator',
    title: 'Prime Factorization Calculator',
    shortDescription: 'Decompose any integer into its canonical prime factor exponents and test for primality.',
    category: 'math',
    tags: ['prime factorization', 'prime numbers', 'factors', 'primality test'],
    icon: 'Hash'
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
  },
  {
    id: 'ip-subnet-calculator',
    slug: 'ip-subnet-calculator',
    title: 'IP Subnet & CIDR Calculator',
    shortDescription: 'Calculate IPv4 network address, broadcast address, subnet mask, wildcard mask, CIDR prefix, and total usable host capacity.',
    category: 'science',
    tags: ['ip subnet', 'cidr', 'networking', 'subnet mask', 'ipv4', 'network engineer', 'broadcast ip'],
    icon: 'Network',
    badge: 'Popular'
  },
  {
    id: 'electricity-calculator',
    slug: 'electricity-calculator',
    title: 'Electricity Cost & Appliance Energy',
    shortDescription: 'Calculate power usage in kWh, daily, monthly, and annual utility bills based on wattage and electricity tariffs.',
    category: 'science',
    tags: ['electricity', 'kwh', 'power consumption', 'electric bill', 'energy cost', 'appliance wattage'],
    icon: 'Zap',
    badge: 'Popular'
  },
  {
    id: 'voltage-drop-calculator',
    slug: 'voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    shortDescription: 'Compute electrical voltage drop and wire gauge (AWG) requirements across AC/DC circuit distances.',
    category: 'science',
    tags: ['voltage drop', 'awg', 'wire gauge', 'electrical circuit', 'volts', 'ohms'],
    icon: 'Zap'
  },
  {
    id: 'btu-calculator',
    slug: 'btu-calculator',
    title: 'Air Conditioner BTU Sizing Calculator',
    shortDescription: 'Calculate required room cooling capacity in BTUs and AC tonnage based on room dimensions and sun exposure.',
    category: 'everyday',
    tags: ['btu', 'ac sizing', 'air conditioner', 'cooling tonnage', 'hvac', 'room size'],
    icon: 'Fan',
    badge: 'Popular'
  },
  {
    id: 'horsepower-calculator',
    slug: 'horsepower-calculator',
    title: 'Horsepower & Engine Torque Calculator',
    shortDescription: 'Calculate mechanical horsepower (HP), kilowatts (kW), and metric horsepower (PS) from engine torque and RPM.',
    category: 'everyday',
    tags: ['horsepower', 'hp', 'torque', 'rpm', 'dyno', 'engine performance', 'automotive'],
    icon: 'Gauge',
    badge: 'Popular'
  },
  {
    id: 'engine-horsepower-calculator',
    slug: 'engine-horsepower-calculator',
    title: 'Engine Dyno & Trap Speed HP',
    shortDescription: 'Estimate vehicle engine horsepower based on vehicle curb weight and quarter-mile trap speed.',
    category: 'everyday',
    tags: ['engine horsepower', 'trap speed', 'drag racing', 'quarter mile', 'dyno hp'],
    icon: 'Gauge'
  },
  {
    id: 'stair-calculator',
    slug: 'stair-calculator',
    title: 'Stair Calculator (Riser & Tread Builder)',
    shortDescription: 'Calculate total risers, exact step height, horizontal tread run, and stringer angle for code-compliant staircases.',
    category: 'construction',
    tags: ['stair calculator', 'riser', 'tread', 'stringer', 'staircase', 'carpentry', 'building code'],
    icon: 'Layers',
    badge: 'Popular'
  },
  {
    id: 'roofing-calculator',
    slug: 'roofing-calculator',
    title: 'Roofing & Shingle Square Estimator',
    shortDescription: 'Estimate total roofing squares, shingle bundles, and waste allowances based on roof pitch and house footprint.',
    category: 'construction',
    tags: ['roofing', 'shingles', 'roof pitch', 'roofing squares', 'construction materials'],
    icon: 'Home'
  },
  {
    id: 'time-card-calculator',
    slug: 'time-card-calculator',
    title: 'Time Card & Overtime Payroll Calculator',
    shortDescription: 'Calculate total work hours, regular pay, 1.5x overtime wages, and gross payroll compensation.',
    category: 'everyday',
    tags: ['time card', 'timesheet', 'overtime', 'hourly pay', 'payroll', 'clock in clock out'],
    icon: 'Clock',
    badge: 'Popular'
  },
  {
    id: 'bandwidth-calculator',
    slug: 'bandwidth-calculator',
    title: 'Bandwidth & Download Time Calculator',
    shortDescription: 'Calculate download and upload transfer times for any file size across Mbps and Gbps network speeds.',
    category: 'science',
    tags: ['bandwidth', 'download time', 'upload speed', 'mbps', 'file transfer', 'gigabit'],
    icon: 'Wifi',
    badge: 'Popular'
  },
  {
    id: 'roman-numeral-converter',
    slug: 'roman-numeral-converter',
    title: 'Roman Numeral Converter',
    shortDescription: 'Convert standard Arabic numbers (1-3999) to Roman numerals (I, V, X, L, C, D, M) and vice versa.',
    category: 'everyday',
    tags: ['roman numerals', 'roman converter', 'numbers to roman', 'latin numbers'],
    icon: 'Binary'
  },
  {
    id: 'base64-encode-decode',
    slug: 'base64-encode-decode',
    title: 'Base64 Encoder & Decoder',
    shortDescription: 'Encode plain text strings to Base64 format and decode Base64 data with instant bidirectional conversion.',
    category: 'science',
    tags: ['base64', 'base64 encode', 'base64 decode', 'text encoder', 'developer tools'],
    icon: 'Binary'
  },
  {
    id: 'url-encode-decode',
    slug: 'url-encode-decode',
    title: 'URL Percent Encoder & Decoder',
    shortDescription: 'Encode special characters into percent-encoded URL strings and decode query parameters.',
    category: 'science',
    tags: ['url encode', 'url decode', 'percent encoding', 'uri component', 'web tools'],
    icon: 'Globe'
  },
  {
    id: 'gas-mileage-calculator',
    slug: 'gas-mileage-calculator',
    title: 'Gas Mileage & Fuel Economy (MPG)',
    shortDescription: 'Calculate Miles Per Gallon (MPG) and Liters per 100km (L/100km) between fill-ups.',
    category: 'everyday',
    tags: ['gas mileage', 'mpg', 'fuel economy', 'l/100km', 'fuel efficiency', 'fill up'],
    icon: 'Fuel'
  },
  {
    id: 'tire-size-calculator',
    slug: 'tire-size-calculator',
    title: 'Tire Size & Speedometer Difference',
    shortDescription: 'Compare tire diameters, sidewall height, circumference, and calculate speedometer error percentage.',
    category: 'everyday',
    tags: ['tire size', 'wheel diameter', 'speedometer error', 'rim size', 'tire comparison'],
    icon: 'CircleDot'
  }
];
