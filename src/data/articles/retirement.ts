import { CalculatorArticle } from '../../types/article';

/**
 * Retirement and long-term savings articles.
 *
 * Author blocks intentionally claim organisational authorship only. Do not add a
 * `reviewedBy` credential unless a named person with that qualification has
 * genuinely reviewed the page.
 */
export const RETIREMENT_ARTICLES: Record<string, CalculatorArticle> = {
  'retirement-calculator': {
    calculatorId: 'retirement-calculator',
    title: 'Retirement Calculator',
    subtitle:
      'Project what your savings will be worth at retirement, how long they will last, and what you would need to put aside each month to close any shortfall.',
    readTimeMinutes: 7,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'This is a planning projection, not a forecast. It assumes a steady average return, which no real portfolio delivers. Investment values fall as well as rise, and tax rules change. Speak to a regulated financial adviser before making retirement decisions.',
    overview: [
      'Retirement planning comes down to one question with three moving parts: will the money last? The parts are how much you have saved, how much you keep adding, and how long it needs to stretch.',
      'This calculator projects your savings forward to your retirement date, then draws them down through retirement to show whether they run out and when. If there is a gap, it works backwards to the monthly contribution that would close it.'
    ],
    formulaCard: {
      title: 'Future Value of Savings Plus Contributions',
      formula: 'FV = P × (1 + r)^n + PMT × [((1 + r)^n − 1) ÷ r]',
      explanation:
        'The first term grows what you already have. The second term grows each future contribution for however long it remains invested — money added early compounds for far longer than money added late, which is why starting sooner matters more than saving harder.',
      variables: [
        { symbol: 'FV', meaning: 'Projected savings at retirement' },
        { symbol: 'P', meaning: 'Amount you have saved today' },
        { symbol: 'PMT', meaning: 'Amount you add each period' },
        { symbol: 'r', meaning: 'Expected return per period, as a decimal' },
        { symbol: 'n', meaning: 'Number of periods until retirement' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Retirement Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your age and target retirement age',
          description:
            'The gap between them is your accumulation period. This single number moves the result more than anything else you enter.'
        },
        {
          stepNumber: 2,
          title: 'Add what you have saved so far',
          description:
            'Include pensions, workplace schemes, ISAs, IRAs and any investments earmarked for retirement. Leave out your home unless you genuinely intend to sell it and downsize.'
        },
        {
          stepNumber: 3,
          title: 'Enter your monthly contribution',
          description:
            'Include employer contributions, since they compound exactly like your own. This is the figure you have most control over.'
        },
        {
          stepNumber: 4,
          title: 'Set an expected return and inflation rate',
          description:
            'A diversified portfolio has historically returned roughly 5–7% a year above inflation over long periods, but with severe swings. Being conservative here costs you nothing; being optimistic can cost you a decade.'
        },
        {
          stepNumber: 5,
          title: 'Enter the annual income you want in retirement',
          description:
            'Most people need less than their working income, because commuting, mortgage payments and saving for retirement itself all stop. Somewhere between 50% and 70% is a common starting estimate.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Starting at 35',
      scenario:
        'Someone aged 35 with $40,000 saved, adding $600 a month, planning to retire at 65 and draw $40,000 a year. Assumed real return of 5% a year after inflation.',
      inputs: [
        { label: 'Current age', value: '35' },
        { label: 'Retirement age', value: '65 (n = 360 months)' },
        { label: 'Saved so far', value: '$40,000' },
        { label: 'Monthly contribution', value: '$600' },
        { label: 'Real return', value: '5% a year (0.4167% monthly)' }
      ],
      steps: [
        'Existing savings grow: 40,000 × (1.0041667)^360 = $178,900.',
        'Contributions grow: 600 × [((1.0041667)^360 − 1) ÷ 0.0041667] = $499,600.',
        'Projected pot at 65 = 178,900 + 499,600 = roughly $678,500.',
        'Drawing $40,000 a year is a withdrawal rate of 40,000 ÷ 678,500 = 5.9%.',
        'At a 4% withdrawal rate, $678,500 would support about $27,100 a year — short of the $40,000 target.'
      ],
      result: 'Projected pot: about $678,500 · Sustainable income: about $27,100 a year',
      takeaway:
        'The pot looks large but the income does not match the goal. Closing a gap like this needs either a higher contribution, a later retirement date, or a lower income expectation — and delaying retirement by even three years does more than most people expect, because it adds contributions and removes drawdown years at the same time.'
    },
    sections: [
      {
        id: 'four-percent-rule',
        title: 'The 4% rule, and why it is only a starting point',
        paragraphs: [
          'The 4% rule says you can withdraw 4% of your portfolio in the first year of retirement, increase that amount with inflation each year, and have a high chance of the money lasting 30 years. It comes from the Trinity Study, which tested historical US market returns against various withdrawal rates.',
          'It is a useful benchmark and a poor guarantee. It was derived from a specific market, a specific period and a specific 30-year horizon. Retiring earlier means a longer horizon and a lower safe rate. Higher fees reduce it further. And it says nothing about what you do when markets fall 30% in your second year.',
          'Treat 4% as a sanity check on whether your target is roughly plausible, not as a rule you can rely on for four decades.'
        ],
        callout: {
          type: 'tip',
          title: 'Quick reverse check',
          text: 'Multiply the annual income you want by 25. That is roughly the pot the 4% rule implies. Wanting $40,000 a year means aiming at about $1,000,000.'
        }
      },
      {
        id: 'sequence-risk',
        title: 'Sequence of returns risk',
        paragraphs: [
          'Two retirees can experience identical average returns over 30 years and get completely different outcomes, purely because of the order the returns arrived in. Poor returns in the first few years of drawdown are far more damaging than the same poor returns later on, because you are selling assets while they are cheap and those units never recover.',
          'This is the single biggest weakness of any straight-line projection, including this one. A calculator that applies a steady 5% every year cannot show you this risk. It is why advisers often suggest holding one to three years of spending in cash or bonds at the point of retirement, so that a bad early market does not force you to sell.'
        ]
      },
      {
        id: 'real-vs-nominal',
        title: 'Use real returns, not nominal ones',
        paragraphs: [
          'A projection showing $1.5 million in 30 years sounds reassuring until you account for what $1.5 million will actually buy by then. At 3% inflation, money loses roughly half its purchasing power over 24 years.',
          'There are two consistent ways to handle this, and mixing them is what produces misleading numbers. Either project in nominal terms and compare the result against an inflated future income target, or project using a real return — your expected return minus inflation — and compare against today\'s income target. The second is easier to reason about, and it is what the worked example above does.'
        ]
      },
      {
        id: 'what-this-misses',
        title: 'What this calculator cannot account for',
        paragraphs: [
          'A projection is only as honest as its assumptions. These are the factors that most often make real outcomes differ from the number on screen:'
        ],
        bullets: [
          'Tax treatment differs sharply between account types, and withdrawals from pre-tax accounts are taxed as income.',
          'State or workplace pensions may cover part of your target income, reducing what your own savings need to produce.',
          'Healthcare costs tend to rise faster than general inflation and are heavily dependent on where you live.',
          'Investment fees of 1% a year can reduce a 30-year outcome by roughly a quarter.',
          'People rarely contribute the same amount for 30 years — pay rises, career breaks and periods of higher spending all change the path.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much do I actually need to retire?',
        answer:
          'It depends almost entirely on the income you want and how long you need it to last, not on a universal figure. A rough starting point is 25 times your desired annual income, which reflects the 4% withdrawal rule. Someone wanting $40,000 a year is aiming at roughly $1,000,000, less whatever state or workplace pension they expect.'
      },
      {
        question: 'Is it too late to start in my 40s or 50s?',
        answer:
          'No, but the arithmetic changes. Starting later means contributions do most of the work instead of compounding, so the monthly amount has to be considerably higher. A later start also makes the retirement date itself a more powerful lever — working three extra years adds contributions and removes drawdown years simultaneously.'
      },
      {
        question: 'What return rate should I assume?',
        answer:
          'Use a real return, meaning after inflation. Historically a diversified portfolio has returned somewhere around 5% a year in real terms over long periods, though with very large variation between decades. If you are within ten years of retiring, using a lower figure is sensible, because you have less time to recover from a bad run.'
      },
      {
        question: 'Should I include my house?',
        answer:
          'Only if you genuinely plan to sell it and live somewhere cheaper. A home you intend to keep living in produces no retirement income, and counting it makes projections look far healthier than they are. Equity release is possible but expensive, and is not a substitute for savings.'
      },
      {
        question: 'Why does the result change so much when I adjust the retirement age?',
        answer:
          'Because retirement age affects three things at once: how many years of contributions you make, how many years of compounding those contributions get, and how many years of withdrawals the pot has to fund. Moving it by a couple of years shifts all three in the same direction, which is why it is usually the most effective adjustment available.'
      }
    ],
    references: [
      {
        title: 'Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable (Trinity Study)',
        source: 'Cooley, Hubbard & Walz, AAII Journal'
      },
      {
        title: 'Compound interest and the time value of money',
        source: 'US Securities and Exchange Commission — Investor.gov'
      }
    ]
  },

  '401k-calculator': {
    calculatorId: '401k-calculator',
    title: '401(k) Calculator',
    subtitle:
      'Project your 401(k) balance at retirement, and see exactly how much of it comes from your employer rather than from you.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Projections assume a constant rate of return and constant contribution limits, neither of which holds in practice. Contribution limits are set annually by the IRS. This is general information, not tax or investment advice.',
    overview: [
      'A 401(k) has one feature no other account matches: an employer match. It is the only part of retirement planning that offers a guaranteed, immediate return on the money you put in, and it is also the part most commonly left unclaimed.',
      'This calculator projects your balance at retirement from your salary, contribution rate, employer match formula and expected return — and separates out how much of the final figure came from the match.'
    ],
    formulaCard: {
      title: 'Annual 401(k) Contribution',
      formula: 'Total = (Salary × Your %) + min(Salary × Your %, Salary × Match Cap) × Match Rate',
      explanation:
        'Your own contribution is straightforward. The employer portion is capped twice over — by the match rate and by the percentage of salary the employer will match up to — which is why contributing above the cap earns no additional match.',
      variables: [
        { symbol: 'Your %', meaning: 'Share of salary you contribute each year' },
        { symbol: 'Match Rate', meaning: 'Proportion the employer adds, e.g. 0.5 for 50 cents on the dollar' },
        { symbol: 'Match Cap', meaning: 'Maximum share of salary the employer will match against, e.g. 6%' }
      ]
    },
    howToSteps: {
      title: 'How to Use the 401(k) Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your salary and contribution rate',
          description:
            'Contribution rate is the percentage of each paycheck going into the plan. If you are unsure, it is on your payslip or in your plan portal.'
        },
        {
          stepNumber: 2,
          title: 'Enter your employer match formula',
          description:
            'Usually expressed as something like "50% up to 6% of salary". Both numbers matter — the rate and the cap do different jobs.'
        },
        {
          stepNumber: 3,
          title: 'Set your current balance and expected return',
          description:
            'Use a long-run average rather than last year\'s performance. Returns are volatile year to year and steady only when averaged over decades.'
        },
        {
          stepNumber: 4,
          title: 'Check the match contribution separately',
          description:
            'If your contribution rate is below the match cap, raise it to the cap and compare. That difference is money your employer is currently not paying you.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Contributing Below the Match Cap',
      scenario:
        'Salary of $70,000, contributing 3%, with an employer match of 50% up to 6% of salary. Compared against contributing the full 6%.',
      inputs: [
        { label: 'Salary', value: '$70,000' },
        { label: 'Current contribution', value: '3% ($2,100)' },
        { label: 'Employer match', value: '50% up to 6%' },
        { label: 'Alternative contribution', value: '6% ($4,200)' }
      ],
      steps: [
        'At 3%: you contribute $2,100. The employer matches 50% of that = $1,050. Total $3,150.',
        'At 6%: you contribute $4,200. The employer matches 50% of that = $2,100. Total $6,300.',
        'Raising your contribution by $2,100 increases the employer contribution by $1,050.',
        'Over 30 years at a 5% real return, that extra $1,050 a year compounds to roughly $69,800.'
      ],
      result: 'Extra employer money claimed: $1,050 a year · Roughly $69,800 over 30 years',
      takeaway:
        'Contributing below the match cap leaves guaranteed money behind. A 50% match is an immediate 50% return on that portion — nothing else in investing offers that.'
    },
    sections: [
      {
        id: 'how-matching-works',
        title: 'How employer matching actually works',
        paragraphs: [
          'Match formulas sound similar but behave differently. "100% up to 3%" and "50% up to 6%" both cost the employer a maximum of 3% of your salary, but the second requires you to contribute twice as much to claim it in full.',
          'The cap is the part people miss. Once you contribute above the cap, additional contributions earn no further match — they are still worth making for the tax treatment, but the guaranteed return stops at that threshold.'
        ],
        callout: {
          type: 'warning',
          title: 'Check your vesting schedule',
          text: 'Employer contributions often vest over several years. Leaving before you are fully vested can mean forfeiting part of the match. Your own contributions are always yours.'
        }
      },
      {
        id: 'traditional-vs-roth',
        title: 'Traditional or Roth 401(k)?',
        paragraphs: [
          'A traditional 401(k) reduces your taxable income now, and withdrawals in retirement are taxed as income. A Roth 401(k) gives no deduction now, but qualified withdrawals are tax-free.',
          'The deciding question is whether your tax rate in retirement will be higher or lower than it is today. Lower later favours traditional; higher later favours Roth. Since nobody knows future tax rates, many people split contributions between both rather than betting entirely on one outcome.',
          'The employer match is always made on a pre-tax basis, regardless of which type you choose for your own contributions.'
        ]
      },
      {
        id: 'limits-and-catchup',
        title: 'Contribution limits',
        paragraphs: [
          'The IRS sets an annual limit on employee contributions, with an additional catch-up allowance for people aged 50 and over. There is also a separate, higher combined limit covering employee and employer contributions together.',
          'These figures are adjusted most years. Check the current limits on IRS.gov rather than relying on a figure quoted in any calculator, including this one — a stale limit is one of the most common sources of error in retirement projections.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much should I contribute to my 401(k)?',
        answer:
          'At minimum, enough to claim the full employer match — below that you are declining part of your compensation. Beyond that it depends on your other goals, though a frequently cited target is 15% of salary including the match.'
      },
      {
        question: 'What does "50% up to 6%" mean?',
        answer:
          'Your employer adds 50 cents for every dollar you contribute, but only on contributions up to 6% of your salary. Contributing 6% earns the maximum match of 3% of salary. Contributing 10% still earns only that same 3%.'
      },
      {
        question: 'What happens to my 401(k) if I change jobs?',
        answer:
          'Your own contributions and any vested employer contributions remain yours. You can usually leave the balance in the old plan, roll it into a new employer plan, or roll it into an IRA. Cashing it out before retirement age generally triggers both income tax and an early withdrawal penalty.'
      },
      {
        question: 'Does this calculator account for taxes?',
        answer:
          'No. It projects the gross balance. Withdrawals from a traditional 401(k) will be taxed as ordinary income at whatever rate applies when you take them, so the spendable amount will be lower than the figure shown.'
      }
    ],
    references: [
      {
        title: '401(k) Plan Overview and Contribution Limits',
        source: 'Internal Revenue Service (IRS)',
        url: 'https://www.irs.gov/retirement-plans/401k-plans'
      }
    ]
  }
};
