import { CalculatorArticle } from '../../types/article';

/**
 * Income, investment-return and remaining high-priority finance articles.
 * See retirement.ts for the authorship rules that apply here too.
 */
export const FINANCE_CORE_ARTICLES: Record<string, CalculatorArticle> = {
  'auto-loan-calculator': {
    calculatorId: 'auto-loan-calculator',
    title: 'Auto Loan Calculator',
    subtitle:
      'Work out monthly car payments with trade-in, down payment and sales tax included, and see the total interest before you sign.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Dealer financing often includes fees, add-ons and rate markups not reflected here. Sales tax treatment of trade-ins varies by jurisdiction. Confirm final figures with the lender before signing.',
    overview: [
      'Car finance is usually sold on the monthly payment, because that is the number buyers react to. Stretching the term lowers the payment while quietly increasing what the car costs in total — which is why the same vehicle can be presented as affordable at almost any budget.',
      'This calculator shows both figures side by side: the monthly payment and the total interest across the full term.'
    ],
    formulaCard: {
      title: 'Amortised Loan Payment',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation:
        'The amount financed is the price plus tax and fees, minus your down payment and trade-in value. Interest accrues on the outstanding balance, so early payments are mostly interest and later ones mostly principal.',
      variables: [
        { symbol: 'P', meaning: 'Amount financed after deposit and trade-in' },
        { symbol: 'i', meaning: 'Monthly interest rate (APR ÷ 12)' },
        { symbol: 'n', meaning: 'Total number of monthly payments' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Auto Loan Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter the vehicle price',
          description: 'The negotiated out-the-door price, not the advertised list price.'
        },
        {
          stepNumber: 2,
          title: 'Add down payment and trade-in value',
          description:
            'Both reduce the amount financed. If you owe more on a trade-in than it is worth, that negative equity gets added instead.'
        },
        {
          stepNumber: 3,
          title: 'Enter the APR and term',
          description:
            'Use APR rather than the quoted interest rate, since APR includes finance charges.'
        },
        {
          stepNumber: 4,
          title: 'Compare terms before choosing',
          description:
            'Run 48, 60 and 72 months. The monthly saving from a longer term is smaller than the extra interest it costs.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: 60 vs 72 Months',
      scenario: 'A $32,000 car with $4,000 down, financed at 7.5% APR.',
      inputs: [
        { label: 'Price', value: '$32,000' },
        { label: 'Down payment', value: '$4,000' },
        { label: 'Amount financed', value: '$28,000' },
        { label: 'APR', value: '7.5%' }
      ],
      steps: [
        'Monthly rate = 7.5% ÷ 12 = 0.625% (0.00625).',
        'Over 60 months: PMT = 28,000 × [0.00625 × 1.00625⁶⁰] ÷ [1.00625⁶⁰ − 1] = $561.',
        'Total paid = 561 × 60 = $33,660, so interest = $5,660.',
        'Over 72 months: PMT = $483. Total paid = $34,776, so interest = $6,776.'
      ],
      result: '60 months: $561/mo, $5,660 interest · 72 months: $483/mo, $6,776 interest',
      takeaway:
        'The longer term saves $78 a month and costs an extra $1,116 in interest. It also means being underwater on the loan for longer, since the car depreciates faster than the balance falls.'
    },
    sections: [
      {
        id: 'negative-equity',
        title: 'Long terms and negative equity',
        paragraphs: [
          'A new car loses a substantial share of its value in the first two or three years, while a long loan pays down principal slowly at the start. The result is a period where you owe more than the car is worth.',
          'That matters if the car is written off — insurance pays market value, not your balance — or if you want to change vehicles. Trading out of negative equity usually means rolling the shortfall into the next loan, which starts the next purchase already underwater.'
        ],
        callout: {
          type: 'tip',
          title: 'A practical guardrail',
          text: 'A commonly cited rule is at least 20% down, a term no longer than four years, and total transport costs under 10% of gross income. Not every purchase can meet it, but it is a useful reference for how far a deal is stretching you.'
        }
      },
      {
        id: 'dealer-finance',
        title: 'Dealer finance versus your own',
        paragraphs: [
          'Dealers often earn a margin on the finance they arrange, which can mean the rate offered is above what you would qualify for elsewhere. Getting a pre-approval from a bank or credit union first gives you a benchmark and turns you into a cash buyer for negotiation purposes.',
          'Manufacturer 0% offers are usually genuine but typically require excellent credit and frequently replace a cash rebate. Compare the total cost of 0% without the rebate against a normal loan with it — the rebate sometimes wins.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What loan term should I choose for a car?',
        answer:
          'The shortest you can comfortably afford. Terms beyond 60 months cost meaningfully more in interest and extend the period where you owe more than the car is worth. If only a 72 or 84-month term makes the payment work, that usually indicates the car is too expensive.'
      },
      {
        question: 'Does a bigger down payment help?',
        answer:
          'Yes, in three ways: it reduces the amount financed, cuts total interest, and shortens the period of negative equity. It can also improve the rate offered, since lenders price on loan-to-value.'
      },
      {
        question: 'How does a trade-in affect the calculation?',
        answer:
          'Trade-in value reduces the amount financed like a down payment. In many jurisdictions it also reduces the taxable amount, which lowers sales tax as well. If you still owe money on the trade-in, the outstanding balance is subtracted from its value first.'
      }
    ],
    references: [
      {
        title: 'Understanding vehicle financing',
        source: 'Consumer Financial Protection Bureau (CFPB)'
      }
    ]
  },

  'salary-calculator': {
    calculatorId: 'salary-calculator',
    title: 'Salary Calculator',
    subtitle:
      'Convert between hourly, weekly, monthly and annual pay, and see gross against take-home for any pay period.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Deduction estimates are approximations. Actual take-home depends on your tax code, pension contributions, benefits and local taxes. Use your payslip as the authority.',
    overview: [
      'Job offers arrive in inconsistent units — one role quotes an hourly rate, another an annual salary, a third a day rate. Comparing them means converting everything to the same basis first.',
      'This calculator handles those conversions and shows the gap between gross and take-home, which is where most of the surprise in a new job usually sits.'
    ],
    formulaCard: {
      title: 'Pay Period Conversions',
      formula: 'Annual = Hourly × Hours per week × 52',
      explanation:
        'Monthly pay is annual ÷ 12, not weekly × 4 — there are about 4.33 weeks in a month, and using 4 understates annual pay by roughly 8%.',
      variables: [
        { symbol: 'Hours per week', meaning: 'Contracted hours, typically 37.5 or 40' },
        { symbol: '52', meaning: 'Weeks per year, including paid leave for salaried roles' },
        { symbol: '÷ 12', meaning: 'Annual to monthly — never weekly × 4' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Salary Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter a figure in whichever unit you have',
          description: 'Hourly, daily, weekly, monthly or annual — the rest convert automatically.'
        },
        {
          stepNumber: 2,
          title: 'Set your weekly hours',
          description:
            'This drives every hourly conversion. A 37.5-hour week produces a noticeably different hourly rate from a 40-hour one at the same salary.'
        },
        {
          stepNumber: 3,
          title: 'Compare gross against take-home',
          description:
            'Gross is what is advertised. Take-home is what arrives. The gap is typically 20–35% depending on your circumstances.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Contract vs Salaried',
      scenario:
        'Comparing a $30/hour contract role at 40 hours a week against a salaried role paying $58,000.',
      inputs: [
        { label: 'Contract rate', value: '$30/hour, 40 hrs/week' },
        { label: 'Salaried offer', value: '$58,000/year' }
      ],
      steps: [
        'Contract annualised = 30 × 40 × 52 = $62,400.',
        'That looks $4,400 better than the salaried role.',
        'But contract roles typically have no paid leave. Deducting 4 weeks: 30 × 40 × 48 = $57,600.',
        'Without employer pension contributions or paid sick leave, the effective gap widens further.'
      ],
      result: 'Contract $62,400 headline · $57,600 adjusted for unpaid leave',
      takeaway:
        'A higher hourly rate does not automatically mean higher total compensation. Paid leave, pension contributions and sick pay are real value that an hourly figure hides.'
    },
    sections: [
      {
        id: 'gross-vs-net',
        title: 'Where the money goes between gross and net',
        paragraphs: [
          'The difference between your advertised salary and your bank deposit usually comes from a predictable set of deductions:'
        ],
        bullets: [
          'Income tax, applied in bands so only the portion of income within each band is taxed at that rate.',
          'Social security or national insurance contributions.',
          'Pension or retirement plan contributions, which reduce taxable income in most schemes.',
          'Health insurance premiums, where deducted at source.',
          'Student loan repayments, often calculated as a percentage of income above a threshold.'
        ]
      },
      {
        id: 'marginal-rate',
        title: 'Why a raise does not increase your tax on everything',
        paragraphs: [
          'A common misconception is that moving into a higher tax band raises the rate on your whole income. It does not. Bands are marginal: only the income above each threshold is taxed at the higher rate.',
          'This means a raise always leaves you with more take-home pay, even when it pushes you into a higher band. The only situations where earning more can reduce net income involve benefit withdrawal or specific allowance taper thresholds, not the tax bands themselves.'
        ],
        callout: {
          type: 'info',
          title: 'Effective rate versus marginal rate',
          text: 'Your marginal rate is what the next dollar is taxed at. Your effective rate is total tax divided by total income, and is always lower. Effective rate is the more useful number for budgeting.'
        }
      }
    ],
    faqs: [
      {
        question: 'How do I convert an hourly rate to an annual salary?',
        answer:
          'Multiply the hourly rate by weekly hours and then by 52. For a fairer comparison against a salaried role, use 48 weeks instead if the hourly position offers no paid leave.'
      },
      {
        question: 'Why is my monthly pay not my annual salary divided by four weeks?',
        answer:
          'Because a month averages about 4.33 weeks, not four. Always divide annual pay by 12 for a monthly figure. Using four weeks understates annual pay by roughly 8%.'
      },
      {
        question: 'Is a higher salary always better than a lower one with benefits?',
        answer:
          'Not necessarily. Employer pension contributions, health cover, paid leave and bonuses can be worth a substantial share of salary. Convert benefits to an annual value and compare total compensation rather than headline pay.'
      }
    ]
  },

  'inflation-calculator': {
    calculatorId: 'inflation-calculator',
    title: 'Inflation Calculator',
    subtitle:
      'See what an amount from a past year is worth today, or what today\'s money will buy in future at a given inflation rate.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Inflation rates are averages across a basket of goods. Your personal inflation rate depends on what you actually buy — housing, energy and education have often risen faster than the headline figure.',
    overview: [
      'Inflation is the reason a salary that felt generous a decade ago no longer does. It works exactly like compound interest, but in reverse: each year\'s price rise applies on top of the last, so the effect accelerates over time.',
      'This calculator converts amounts between years so you can compare like with like — whether that is a historic price in today\'s terms or a future cost in today\'s money.'
    ],
    formulaCard: {
      title: 'Compounding Price Changes',
      formula: 'Future value = Present value × (1 + i)ⁿ',
      explanation:
        'To work backwards — what a past amount is worth today — divide rather than multiply. The compounding is what makes long periods surprising: 3% a year roughly halves purchasing power in 24 years.',
      variables: [
        { symbol: 'i', meaning: 'Annual inflation rate as a decimal' },
        { symbol: 'n', meaning: 'Number of years' },
        { symbol: 'Present value', meaning: 'The amount in the year you are starting from' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Inflation Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter an amount and its year',
          description: 'Either a historic sum you want in today\'s terms, or a present sum you want projected forward.'
        },
        {
          stepNumber: 2,
          title: 'Set the target year',
          description: 'Earlier for a backwards conversion, later for a forward projection.'
        },
        {
          stepNumber: 3,
          title: 'Choose an inflation rate',
          description:
            'For forward projections, 2–3% reflects most central bank targets. Higher figures are worth testing as a stress case.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $50,000 salary twenty years ago, compared against today at 2.8% average inflation.',
      inputs: [
        { label: 'Amount', value: '$50,000' },
        { label: 'Period', value: '20 years' },
        { label: 'Average inflation', value: '2.8% a year' }
      ],
      steps: [
        'Multiplier = (1.028)²⁰ = 1.7360.',
        'Equivalent today = 50,000 × 1.7360 = $86,800.',
        'So a salary of $86,800 now buys roughly what $50,000 bought then.',
        'Someone still earning $50,000 today has lost about 42% of their purchasing power.'
      ],
      result: '$50,000 twenty years ago ≈ $86,800 today',
      takeaway:
        'A salary that stays nominally flat is falling in real terms every year. This is also why cash held long-term loses value even when the balance never goes down.'
    },
    sections: [
      {
        id: 'real-returns',
        title: 'Why investors care about real returns',
        paragraphs: [
          'A savings account paying 4% while inflation runs at 3% is not earning 4% — it is earning roughly 1% in real terms. The real return is what actually determines whether your money buys more next year than it does now.',
          'Over long horizons this dominates. An investment returning 7% nominally with 3% inflation doubles in purchasing power in about 18 years, not the 10 that the nominal rate would suggest.'
        ],
        callout: {
          type: 'tip',
          title: 'Rule of 70 for inflation',
          text: 'Divide 70 by the inflation rate to estimate how many years until money loses half its value. At 3%, that is about 23 years.'
        }
      },
      {
        id: 'personal-inflation',
        title: 'Your inflation rate is not the headline rate',
        paragraphs: [
          'Published inflation measures a basket of goods weighted to average national spending. Your own rate depends on what you buy, and can diverge substantially.',
          'Renters exposed to fast-rising housing costs, families paying childcare or tuition, and anyone heavily exposed to energy prices frequently experience inflation well above the headline figure — while someone with a fixed-rate mortgage and modest spending may experience considerably less.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What inflation rate should I use for future projections?',
        answer:
          'Two to three percent matches the long-run target of most developed-economy central banks and is a reasonable default. It is worth also testing a higher figure, since projections that assume low inflation for decades can be badly optimistic.'
      },
      {
        question: 'Why does inflation matter for retirement planning?',
        answer:
          'Because retirement horizons are long enough for compounding to dominate. At 3% inflation, costs roughly double over 24 years — so a retirement income that looks adequate at 65 may cover far less by 85 unless it rises with prices.'
      },
      {
        question: 'Is deflation better than inflation?',
        answer:
          'Not generally. Falling prices raise the real value of debt and encourage people to delay spending, which tends to slow economies and raise unemployment. Most central banks deliberately target low positive inflation rather than zero.'
      }
    ],
    references: [
      {
        title: 'Consumer Price Index methodology',
        source: 'US Bureau of Labor Statistics'
      }
    ]
  },

  'roi-calculator': {
    calculatorId: 'roi-calculator',
    title: 'ROI Calculator',
    subtitle:
      'Calculate return on investment as a percentage and annualised, so returns over different holding periods can be compared fairly.',
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'ROI measures outcome, not risk. A high return earned by taking large risks is not automatically better than a lower, steadier one. Past returns do not indicate future results.',
    overview: [
      'Return on investment expresses gain relative to cost, which makes investments of different sizes comparable. Its weakness is that the basic formula ignores time entirely — and a 50% return means something very different over one year than over ten.',
      'This calculator gives both the simple ROI and the annualised figure, which is the one to use when comparing opportunities with different holding periods.'
    ],
    formulaCard: {
      title: 'Simple and Annualised ROI',
      formula: 'ROI = (Gain − Cost) ÷ Cost × 100',
      explanation:
        'Annualised ROI = [(Final ÷ Initial)^(1 ÷ years) − 1] × 100. The annualised version converts any holding period into a yearly equivalent, which is the only fair basis for comparison.',
      variables: [
        { symbol: 'Gain', meaning: 'Final value, including any income received' },
        { symbol: 'Cost', meaning: 'Initial investment including fees and transaction costs' },
        { symbol: 'years', meaning: 'Holding period, which may be fractional' }
      ]
    },
    howToSteps: {
      title: 'How to Use the ROI Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter the full initial cost',
          description:
            'Include fees, commissions and any improvement costs. Omitting them inflates the apparent return.'
        },
        {
          stepNumber: 2,
          title: 'Enter the final value',
          description:
            'Include income received along the way — dividends, rent, interest — not just the sale price.'
        },
        {
          stepNumber: 3,
          title: 'Add the holding period',
          description: 'This unlocks the annualised figure, which is the one worth comparing.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Same ROI, Different Speeds',
      scenario:
        'Investment A returns $15,000 on $10,000 over 3 years. Investment B returns the same $15,000 on $10,000 over 7 years.',
      inputs: [
        { label: 'Initial cost (both)', value: '$10,000' },
        { label: 'Final value (both)', value: '$15,000' },
        { label: 'Holding period A', value: '3 years' },
        { label: 'Holding period B', value: '7 years' }
      ],
      steps: [
        'Simple ROI for both = (15,000 − 10,000) ÷ 10,000 × 100 = 50%.',
        'Annualised A = [(1.5)^(1÷3) − 1] × 100 = 14.5% a year.',
        'Annualised B = [(1.5)^(1÷7) − 1] × 100 = 5.96% a year.'
      ],
      result: 'Both 50% simple ROI · A: 14.5%/yr · B: 5.96%/yr annualised',
      takeaway:
        'Identical headline returns, very different investments. Whenever holding periods differ, the simple ROI figure is close to meaningless on its own.'
    },
    sections: [
      {
        id: 'what-roi-misses',
        title: 'What ROI does not tell you',
        paragraphs: [
          'ROI is a single number describing an outcome, and several things it leaves out matter a great deal:'
        ],
        bullets: [
          'Risk — two investments with the same return are not equivalent if one could have lost everything.',
          'Timing of cash flows — money returned early can be reinvested; ROI treats it the same as money returned at the end. IRR handles this properly.',
          'Inflation — a 5% return during 4% inflation is roughly 1% in real terms.',
          'Opportunity cost — the relevant comparison is against what else you could have done with the money.',
          'Taxes, which can materially change the ranking between two options.'
        ]
      },
      {
        id: 'roi-vs-irr',
        title: 'When to use IRR instead',
        paragraphs: [
          'ROI works well for a single amount in and a single amount out. Once there are multiple cash flows at different times — a rental property, a business project, staged investments — it stops being adequate.',
          'Internal rate of return accounts for when each cash flow occurs and produces a single annualised rate that reflects the actual timing. For anything with irregular flows, use IRR.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What counts as a good ROI?',
        answer:
          'It depends entirely on the asset class, the risk and the time period. Broad stock market averages have historically been in the region of 7–10% a year nominally over long periods. A useful benchmark is whether the return beats what you could get from a comparable-risk alternative.'
      },
      {
        question: 'Should I use simple or annualised ROI?',
        answer:
          'Annualised, whenever you are comparing investments held for different lengths of time. Simple ROI is only comparable between investments with identical holding periods.'
      },
      {
        question: 'Do I include fees in the calculation?',
        answer:
          'Yes. Purchase costs, ongoing management fees and selling costs all reduce the actual return. Excluding them is the most common way ROI figures get overstated, particularly in property.'
      }
    ]
  }
};
