import { CalculatorArticle } from '../../types/article';

/** Refinancing, tax and savings-goal articles. */
export const FINANCE_EXTRA_ARTICLES: Record<string, CalculatorArticle> = {
  'mortgage-refinance-calculator': {
    calculatorId: 'mortgage-refinance-calculator',
    title: 'Mortgage Refinance Calculator',
    subtitle:
      'Compare your current mortgage against a new rate, and find how many months it takes for the savings to cover the cost of refinancing.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Closing costs vary widely by lender and jurisdiction. Estimates here are for comparison; request a formal loan estimate before deciding.',
    overview: [
      'Refinancing replaces your existing mortgage with a new one, usually to get a lower rate, change the term, or release equity. It is rarely free — closing costs typically run to a few percent of the loan.',
      'The number that decides whether it is worth doing is the break-even point: how many months of reduced payments it takes to recover those costs. If you will move before then, refinancing loses money regardless of how much better the rate looks.'
    ],
    formulaCard: {
      title: 'Break-Even Point',
      formula: 'Break-even months = Total closing costs ÷ Monthly saving',
      explanation:
        'Straightforward arithmetic, but it only works if you compare like with like. A lower payment achieved by resetting a 20-year remaining balance back to 30 years is not a saving — it is deferral.',
      variables: [
        { symbol: 'Closing costs', meaning: 'Origination, appraisal, title, legal and recording fees' },
        { symbol: 'Monthly saving', meaning: 'Current payment minus new payment, principal and interest only' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Refinance Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your current mortgage',
          description:
            'Remaining balance, current rate and — importantly — years remaining, not the original term.'
        },
        {
          stepNumber: 2,
          title: 'Enter the new loan terms',
          description: 'The offered rate and the term you would take. Try matching your remaining term as well as a fresh 30 years.'
        },
        {
          stepNumber: 3,
          title: 'Add the closing costs',
          description:
            'Typically 2–5% of the loan amount. If the lender offers to roll them in, they are still being paid — with interest.'
        },
        {
          stepNumber: 4,
          title: 'Compare break-even against how long you will stay',
          description: 'If you expect to move or refinance again before break-even, the deal costs you money.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario:
        'A $280,000 balance at 7.2% with 26 years remaining, refinancing to 5.9% over a fresh 30 years, with $6,500 in closing costs.',
      inputs: [
        { label: 'Current balance', value: '$280,000' },
        { label: 'Current rate / remaining', value: '7.2%, 26 years' },
        { label: 'New rate / term', value: '5.9%, 30 years' },
        { label: 'Closing costs', value: '$6,500' }
      ],
      steps: [
        'Current payment over 26 years at 7.2% ≈ $1,985/month.',
        'New payment over 30 years at 5.9% ≈ $1,661/month.',
        'Monthly saving = $324. Break-even = 6,500 ÷ 324 ≈ 20 months.',
        'But the term extends by 4 years: total remaining interest rises from about $339,000 to about $318,000 — still a saving here, though far smaller than the monthly figure implies.',
        'Matching the 26-year term at 5.9% instead gives a payment of about $1,776 — a $209 monthly saving, break-even at 31 months, and roughly $60,000 less total interest.'
      ],
      result: 'Break-even ≈ 20 months (30-yr) or 31 months (26-yr) · term-matched option saves far more overall',
      takeaway:
        'The option with the bigger monthly saving is the worse deal in total. Always compare against a term that matches what you have left, not a fresh 30 years.'
    },
    sections: [
      {
        id: 'term-reset',
        title: 'The trap of resetting the term',
        paragraphs: [
          'Refinancing into a fresh 30-year term after paying a mortgage for several years restarts the amortisation schedule. Early payments are overwhelmingly interest, so you return to the least efficient part of the curve.',
          'The monthly payment falls, which is what makes the offer attractive, but you may pay more total interest even at a materially lower rate. Comparing against a term that matches your remaining years shows the true saving.'
        ],
        callout: {
          type: 'warning',
          title: 'Rolled-in costs are not free',
          text: 'Adding closing costs to the loan balance avoids paying upfront but means financing them at the mortgage rate for the full term. A $6,500 cost rolled into a 30-year loan at 5.9% ends up costing over $13,000.'
        }
      },
      {
        id: 'when-it-makes-sense',
        title: 'When refinancing is worth it',
        paragraphs: [
          'Rules of thumb about needing a full percentage point of improvement are too crude — the right answer depends on your balance, your costs and how long you will stay. Situations where it commonly makes sense:'
        ],
        bullets: [
          'Rates have fallen enough that break-even lands well inside your expected time in the property.',
          'You want to shorten the term and can afford the higher payment — this usually saves the most in total interest.',
          'You are moving from a variable or adjustable rate to a fixed one to remove uncertainty.',
          'Your equity has crossed 20%, letting you remove mortgage insurance.',
          'Your credit has improved substantially since the original loan.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much does refinancing cost?',
        answer:
          'Typically 2–5% of the loan amount, covering origination, appraisal, title and legal fees. On a $300,000 loan that is roughly $6,000–15,000, which is why the break-even calculation matters more than the rate difference alone.'
      },
      {
        question: 'Is a lower monthly payment always a saving?',
        answer:
          'No. Extending the term lowers the payment while increasing total interest. Compare total remaining interest on both loans, not just the monthly figures.'
      },
      {
        question: 'Does refinancing hurt my credit score?',
        answer:
          'Slightly and temporarily. The application creates a hard inquiry and the new account lowers your average account age. Both effects are small and typically recover within a year.'
      },
      {
        question: 'Should I refinance to pay off other debt?',
        answer:
          'Cash-out refinancing can lower the rate on expensive debt, but it converts unsecured debt into debt secured against your home — meaning the consequence of non-payment becomes losing the property. It also stretches short-term debt over decades.'
      }
    ],
    references: [
      {
        title: 'Considering refinancing your mortgage',
        source: 'Consumer Financial Protection Bureau (CFPB)'
      }
    ]
  },

  'savings-calculator': {
    calculatorId: 'savings-calculator',
    title: 'Savings Goal Calculator',
    subtitle:
      'Find the monthly amount needed to hit a savings target by a set date, or see what your current contributions will grow into.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Projections assume a constant rate of return. Savings account rates change, and investment returns vary year to year. Interest may be taxable depending on the account and your jurisdiction.',
    overview: [
      'Saving toward a goal works in two directions. Either you know what you can put aside and want to know when you will get there, or you know the deadline and need to know the monthly amount.',
      'This calculator does both, and shows how much of the final total came from your contributions versus interest earned — which is usually less flattering over short periods than people expect.'
    ],
    formulaCard: {
      title: 'Future Value of Regular Contributions',
      formula: 'FV = P × (1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]',
      explanation:
        'To solve for the required contribution instead, rearrange for PMT. Over short horizons contributions dominate; interest only becomes the larger component after roughly a decade at typical rates.',
      variables: [
        { symbol: 'P', meaning: 'Starting balance' },
        { symbol: 'PMT', meaning: 'Regular contribution per period' },
        { symbol: 'r', meaning: 'Interest rate per period' },
        { symbol: 'n', meaning: 'Number of periods' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Savings Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose which direction to solve',
          description: 'Either project a balance forward, or work backwards from a target and a deadline.'
        },
        {
          stepNumber: 2,
          title: 'Enter your starting balance',
          description: 'Anything already saved toward this goal. It compounds for the full period, so it matters more than an equivalent later contribution.'
        },
        {
          stepNumber: 3,
          title: 'Set a realistic interest rate',
          description:
            'Use the actual rate on the account. For horizons under about five years, keep money somewhere safe — market returns are too volatile over short periods.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: House Deposit in Four Years',
      scenario: 'Targeting $40,000 in four years, starting with $8,000, in an account paying 4.2%.',
      inputs: [
        { label: 'Target', value: '$40,000' },
        { label: 'Starting balance', value: '$8,000' },
        { label: 'Timeframe', value: '4 years (48 months)' },
        { label: 'Rate', value: '4.2% a year' }
      ],
      steps: [
        'Monthly rate = 4.2% ÷ 12 = 0.35% (0.0035).',
        'Starting balance grows to 8,000 × (1.0035)⁴⁸ = $9,463.',
        'Remaining needed from contributions = 40,000 − 9,463 = $30,537.',
        'PMT = 30,537 ÷ [((1.0035)⁴⁸ − 1) ÷ 0.0035] = $586 per month.'
      ],
      result: 'Required saving: about $586 a month',
      takeaway:
        'Of the $40,000, roughly $28,100 comes from contributions and $3,900 from interest. Over four years the saving habit does almost all the work — compounding only becomes the dominant force over much longer periods.'
    },
    sections: [
      {
        id: 'where-to-keep-it',
        title: 'Matching the account to the timeframe',
        paragraphs: [
          'The right home for savings depends almost entirely on when you need the money:'
        ],
        bullets: [
          'Under two years — an easy-access savings account. Capital security matters more than return.',
          'Two to five years — fixed-term deposits or CDs can pay more if you can lock the money away.',
          'Five years or more — investment accounts become reasonable, since there is time to recover from market falls.',
          'Emergency fund — always easy-access, regardless of rate. The point is availability.'
        ],
        callout: {
          type: 'tip',
          title: 'Automate before you optimise',
          text: 'A standing order on payday is worth more than chasing the best rate. Money moved automatically before you can spend it is the single most reliable savings mechanism.'
        }
      }
    ],
    faqs: [
      {
        question: 'How much should I save each month?',
        answer:
          'For a specific goal, work backwards from the target and deadline as this calculator does. As a general habit, many people aim for 20% of take-home pay across savings and investments combined, though the right figure depends entirely on your circumstances.'
      },
      {
        question: 'Does compound interest matter for short-term savings?',
        answer:
          'Much less than people expect. Over four years at typical savings rates, interest contributes roughly 10% of the total. Compounding becomes the dominant force over decades, not years.'
      },
      {
        question: 'Should I save or pay off debt first?',
        answer:
          'Build a small emergency buffer first, then clear any debt costing more than you can earn in savings — which usually means credit cards. Once expensive debt is gone, saving again makes sense.'
      }
    ]
  },

  'income-tax-calculator': {
    calculatorId: 'income-tax-calculator',
    title: 'Income Tax Calculator',
    subtitle:
      'Estimate income tax, see which band each part of your income falls into, and find your effective rate as against your marginal rate.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Tax rates, bands and allowances change every year and vary by jurisdiction and personal circumstances. This is a general estimate, not tax advice. Check current rates with your tax authority or an accountant.',
    overview: [
      'Income tax is charged in bands. Each slice of your income is taxed at the rate for the band it falls into, and only the portion above a threshold is taxed at the higher rate — a point that causes persistent confusion about whether a raise is worth taking.',
      'This calculator shows the tax due, how it splits across bands, and the difference between your marginal rate and your effective rate.'
    ],
    formulaCard: {
      title: 'Banded (Progressive) Taxation',
      formula: 'Tax = Σ (Income within each band × That band\'s rate)',
      explanation:
        'Income is divided into slices and each is taxed at its own rate. Moving into a higher band never reduces your take-home pay, because only the income above the threshold is charged at the higher rate.',
      variables: [
        { symbol: 'Personal allowance', meaning: 'Income taxed at 0%, where one applies' },
        { symbol: 'Marginal rate', meaning: 'The rate applied to your next unit of income' },
        { symbol: 'Effective rate', meaning: 'Total tax ÷ total income — always lower than the marginal rate' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Income Tax Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your gross annual income',
          description: 'Before any deductions, including salary, bonuses and other taxable income.'
        },
        {
          stepNumber: 2,
          title: 'Add deductions and allowances',
          description:
            'Pension contributions and other pre-tax deductions reduce taxable income, sometimes enough to keep you out of a higher band.'
        },
        {
          stepNumber: 3,
          title: 'Review the band breakdown',
          description:
            'Seeing how much income falls in each band makes the difference between marginal and effective rates concrete.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Three-Band System',
      scenario:
        'Income of $70,000 under a simplified system: 0% up to $12,000, 20% from $12,001 to $50,000, and 40% above $50,000.',
      inputs: [
        { label: 'Gross income', value: '$70,000' },
        { label: 'Tax-free allowance', value: '$12,000' },
        { label: 'Basic rate', value: '20% on $12,001–$50,000' },
        { label: 'Higher rate', value: '40% above $50,000' }
      ],
      steps: [
        'First $12,000 taxed at 0% = $0.',
        'Next $38,000 ($12,001–$50,000) at 20% = $7,600.',
        'Remaining $20,000 (above $50,000) at 40% = $8,000.',
        'Total tax = $15,600.',
        'Effective rate = 15,600 ÷ 70,000 = 22.3%.'
      ],
      result: 'Tax due $15,600 · Marginal rate 40% · Effective rate 22.3%',
      takeaway:
        'Despite being "a higher-rate taxpayer", only 22.3% of total income goes in tax. The 40% applies to $20,000, not to the whole $70,000 — which is why a raise always increases take-home pay.'
    },
    sections: [
      {
        id: 'marginal-vs-effective',
        title: 'Marginal rate versus effective rate',
        paragraphs: [
          'Your marginal rate is what the next dollar earned will be taxed at. It is the right number for deciding whether extra work or a pension contribution is worthwhile.',
          'Your effective rate is total tax divided by total income. It is always lower, and it is the right number for budgeting — it tells you what proportion of your income actually goes in tax.'
        ],
        callout: {
          type: 'info',
          title: 'Where "a raise costs me money" comes from',
          text: 'Tax bands never produce this outcome. It happens where a benefit is withdrawn or an allowance tapers at a specific income threshold, creating a genuine cliff. Those are worth knowing about, but they are not how ordinary tax bands work.'
        }
      },
      {
        id: 'reducing-taxable-income',
        title: 'Legitimate ways to reduce taxable income',
        paragraphs: [
          'Most systems allow certain deductions before tax is calculated. Common ones include:'
        ],
        bullets: [
          'Pension or retirement contributions, usually the largest single lever available to employees.',
          'Charitable donations under approved schemes.',
          'Work-related expenses not reimbursed by your employer.',
          'Tax-advantaged savings or investment accounts, where the rules vary considerably by country.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Will a pay rise push me into a higher tax bracket and leave me worse off?',
        answer:
          'No. Only the income above the threshold is taxed at the higher rate, so your take-home pay always increases. The exception is benefit withdrawal or allowance tapers at specific thresholds, which are separate from the tax bands themselves.'
      },
      {
        question: 'What is the difference between gross and taxable income?',
        answer:
          'Gross income is everything you earn. Taxable income is what remains after allowances and pre-tax deductions such as pension contributions. Tax is calculated on the second figure, not the first.'
      },
      {
        question: 'Why does my payslip tax differ from this estimate?',
        answer:
          'Payroll systems spread tax evenly across the year based on projected annual income, and adjust as circumstances change. Tax codes, mid-year pay changes, bonuses and benefits in kind all cause differences. Your payslip and year-end statement are authoritative.'
      }
    ]
  }
};
