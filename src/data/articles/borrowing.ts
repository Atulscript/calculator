import { CalculatorArticle } from '../../types/article';

/**
 * Debt, credit and borrowing-capacity articles.
 *
 * Author blocks claim organisational authorship only. Do not add a `reviewedBy`
 * credential unless a named person with that qualification has genuinely
 * reviewed the page.
 */
export const BORROWING_ARTICLES: Record<string, CalculatorArticle> = {
  'credit-card-payoff-calculator': {
    calculatorId: 'credit-card-payoff-calculator',
    title: 'Credit Card Payoff Calculator',
    subtitle:
      'See how long minimum payments really take, what they cost in interest, and how much sooner a fixed monthly amount clears the balance.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator11 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Results assume a fixed interest rate and no new spending on the card. Card issuers calculate interest daily and minimum payment formulas vary, so your statement may differ slightly.',
    overview: [
      'Credit card minimum payments are designed to keep the account current, not to clear it. Because the minimum is usually a percentage of the balance, it shrinks as the balance falls — which stretches repayment out for years and is why a card can feel like it never goes down.',
      'This calculator shows the payoff date and total interest for minimum payments, then compares that against any fixed amount you choose so you can see the difference in months and in money.'
    ],
    formulaCard: {
      title: 'Months to Clear a Fixed Payment',
      formula: 'n = −log(1 − (B × i) ÷ PMT) ÷ log(1 + i)',
      explanation:
        'Interest accrues on the balance each month before your payment is applied. The payment has to cover that interest before it reduces anything — which is why a payment only slightly above the monthly interest charge takes a very long time to clear the debt.',
      variables: [
        { symbol: 'n', meaning: 'Number of monthly payments required' },
        { symbol: 'B', meaning: 'Current balance' },
        { symbol: 'i', meaning: 'Monthly interest rate (APR ÷ 12, as a decimal)' },
        { symbol: 'PMT', meaning: 'Fixed monthly payment' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Credit Card Payoff Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your balance and APR',
          description:
            'Both are on your statement. If you have separate purchase and cash advance rates, run them separately — cash advance rates are usually much higher.'
        },
        {
          stepNumber: 2,
          title: 'Choose minimum payments or a fixed amount',
          description:
            'Minimum payments recalculate as the balance falls. A fixed amount stays the same every month, which is what clears the debt faster.'
        },
        {
          stepNumber: 3,
          title: 'Compare the two payoff dates',
          description:
            'The gap between them is usually measured in years, not months. That gap is the real cost of paying the minimum.'
        },
        {
          stepNumber: 4,
          title: 'Test a higher payment',
          description:
            'Increase the monthly figure and watch both the payoff date and total interest fall. The effect is steepest on the first few increments.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: $5,000 at 22% APR',
      scenario:
        'A balance of $5,000 at 22% APR, comparing a 2% minimum payment against a fixed $200 a month, with no further spending on the card.',
      inputs: [
        { label: 'Balance', value: '$5,000' },
        { label: 'APR', value: '22% (1.833% monthly)' },
        { label: 'Minimum payment', value: '2% of balance' },
        { label: 'Fixed alternative', value: '$200 per month' }
      ],
      steps: [
        'First month interest = 5,000 × 0.01833 = $91.67.',
        'The 2% minimum is $100, so only $8.33 reduces the balance in month one.',
        'As the balance falls the minimum falls too, so progress slows rather than speeds up.',
        'Paying the minimum clears the balance in roughly 24 years, costing around $7,800 in interest.',
        'Paying a fixed $200 clears it in 32 months, costing about $1,400 in interest.'
      ],
      result: 'Minimum: ~24 years, ~$7,800 interest · Fixed $200: 32 months, ~$1,400 interest',
      takeaway:
        'An extra $100 a month saves roughly $6,400 and more than twenty years. The reason is that the minimum payment barely exceeds the monthly interest charge — almost nothing is reaching the principal.'
    },
    sections: [
      {
        id: 'why-minimums-trap',
        title: 'Why minimum payments take so long',
        paragraphs: [
          'A minimum payment is typically the greater of a fixed sum or a small percentage of the balance, often 1–3%. Because it is a percentage, it falls as the balance falls. You are always paying a proportion of a shrinking number, so each payment does less work than the last.',
          'At high APRs most of an early minimum payment is interest. In the example above, $91.67 of a $100 payment was interest in the first month. Paying a fixed amount breaks that pattern: the interest portion falls every month while the principal portion rises, so repayment accelerates instead of stalling.'
        ],
        callout: {
          type: 'tip',
          title: 'The single most effective change',
          text: 'Switch from paying a percentage to paying a fixed amount — even the same amount as this month\'s minimum. Holding the payment steady as the balance falls is what turns decades into a few years.'
        }
      },
      {
        id: 'balance-transfers',
        title: 'Balance transfers and 0% offers',
        paragraphs: [
          'A 0% balance transfer can genuinely help, because for the promotional period every penny goes to principal. Two things decide whether it actually saves money: the transfer fee, typically 3–5% of the balance, and whether you clear the debt before the promotional rate expires.',
          'Divide the balance by the number of promotional months to get the payment needed to clear it in time. If that figure is not realistic, model what happens when the standard rate kicks in — a transfer that leaves a large balance at a high revert rate can end up costing more than staying put.'
        ]
      },
      {
        id: 'multiple-cards',
        title: 'If you have more than one card',
        paragraphs: [
          'This calculator handles one balance at a time. With several cards, the order you clear them in changes both the cost and how it feels. Paying the highest APR first costs the least in interest. Paying the smallest balance first clears accounts sooner, which some people find easier to sustain.',
          'The debt payoff calculator compares both approaches across all your balances at once and shows the actual difference in interest between them.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why is my balance barely moving despite paying every month?',
        answer:
          'Because most of the payment is going to interest. At 22% APR a $5,000 balance accrues about $92 of interest a month, so a $100 payment reduces the debt by roughly $8. Raising the payment even modestly changes this sharply, since the extra goes entirely to principal.'
      },
      {
        question: 'Does paying twice a month help?',
        answer:
          'Slightly, because card interest is calculated on the average daily balance — reducing the balance earlier in the cycle means less interest accrues. The effect is real but small. Increasing the total amount paid matters far more than splitting it.'
      },
      {
        question: 'Should I pay off the card or keep an emergency fund?',
        answer:
          'Generally a small emergency buffer first, then the card. Without any buffer, the next unexpected expense goes straight back onto the card and undoes the progress. Once a modest cushion exists, high-APR debt is usually the highest guaranteed return available to you.'
      },
      {
        question: 'Will paying off a card improve my credit score?',
        answer:
          'Lowering your credit utilisation generally helps. Closing the account afterwards can work against you, because it reduces your total available credit and may shorten your average account age. Paying the balance to zero and leaving the account open is usually the better outcome.'
      }
    ],
    references: [
      {
        title: 'Credit card interest, minimum payments and repayment disclosures',
        source: 'Consumer Financial Protection Bureau (CFPB)'
      }
    ]
  },

  'debt-payoff-calculator': {
    calculatorId: 'debt-payoff-calculator',
    title: 'Debt Snowball vs Avalanche Calculator',
    subtitle:
      'Compare both payoff strategies across all your debts and see the real difference in time and interest — not just the theory.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator11 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Assumes fixed rates, no new borrowing and that you keep paying the same total each month. Variable-rate debts and promotional periods will change the outcome.',
    overview: [
      'Once you have more than one debt, the question stops being how much to pay and becomes which one to attack first. Two methods dominate the advice: the avalanche targets the highest interest rate, the snowball targets the smallest balance.',
      'The avalanche always costs less in interest. The snowball usually clears individual accounts sooner. This calculator runs both against your actual debts so you can see how big the difference really is before choosing.'
    ],
    howToSteps: {
      title: 'How to Use the Debt Payoff Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'List every debt',
          description:
            'Balance, interest rate and minimum payment for each. Include cards, loans, overdrafts and any buy-now-pay-later balances.'
        },
        {
          stepNumber: 2,
          title: 'Enter your total monthly budget for debt',
          description:
            'This must be at least the sum of all minimum payments. Anything above that is the extra that does the real work.'
        },
        {
          stepNumber: 3,
          title: 'Compare the two strategies',
          description:
            'The calculator pays minimums on everything and directs the extra at one target debt, then rolls that freed-up payment onto the next.'
        },
        {
          stepNumber: 4,
          title: 'Look at both numbers before deciding',
          description:
            'Compare total interest and the date the first account clears. If the interest gap is small, the method you will actually stick to is the better one.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Three Debts, $700 a Month',
      scenario:
        'A credit card of $6,000 at 22%, a personal loan of $9,000 at 11%, and a store card of $1,200 at 26%. Minimums total $430; the budget is $700, leaving $270 extra.',
      inputs: [
        { label: 'Store card', value: '$1,200 at 26%' },
        { label: 'Credit card', value: '$6,000 at 22%' },
        { label: 'Personal loan', value: '$9,000 at 11%' },
        { label: 'Monthly budget', value: '$700' }
      ],
      steps: [
        'Avalanche order by rate: store card (26%), credit card (22%), loan (11%).',
        'Snowball order by balance: store card ($1,200), credit card ($6,000), loan ($9,000).',
        'Here both methods happen to produce the same order, because the smallest debt also carries the highest rate.',
        'Total cleared in about 27 months with roughly $3,100 of interest either way.',
        'Changing the store card rate to 9% separates them: avalanche then saves around $240 but the first account clears four months later.'
      ],
      result: 'Both methods: ~27 months, ~$3,100 interest in this case',
      takeaway:
        'The two strategies often agree. They only diverge when a small balance carries a low rate — and even then the interest difference is usually modest compared with the difference in how sustainable the plan feels.'
    },
    sections: [
      {
        id: 'how-rollover-works',
        title: 'The part that does the work: rolling payments over',
        paragraphs: [
          'Neither method depends on finding more money. Both rely on keeping the total monthly payment constant as individual debts disappear. When the first debt clears, its payment is added to the next target rather than absorbed into general spending.',
          'This is where the acceleration comes from. Each cleared account makes the next one clear faster, which is why the final debts often go much more quickly than the first ones did — regardless of which ordering you picked.'
        ],
        callout: {
          type: 'warning',
          title: 'The plan fails at the rollover, not the start',
          text: 'The most common failure point is letting the freed-up payment quietly become spending money after the first debt clears. Fix the total, not the individual payments.'
        }
      },
      {
        id: 'which-to-choose',
        title: 'Which method should you use?',
        paragraphs: [
          'Run both and look at the interest difference. If it is small relative to the total — which is common when rates are similar or the smallest debt is also expensive — choose on motivation rather than arithmetic, because the plan you maintain beats the plan that is marginally cheaper on paper.',
          'If the gap is large, which tends to happen when one debt carries a much higher rate than the rest, the avalanche is worth the wait. Paying 26% interest for longer in order to clear a 6% loan first is a real and avoidable cost.'
        ]
      },
      {
        id: 'before-you-start',
        title: 'Two things to check first',
        paragraphs: [
          'Neither strategy is the right first move in every situation:'
        ],
        bullets: [
          'If your employer matches pension or 401(k) contributions, claiming the full match usually beats paying down anything below roughly 15% interest.',
          'A small emergency buffer prevents the next unexpected bill from going back onto a card and undoing months of progress.',
          'If you cannot cover minimum payments at all, a payoff strategy is not the answer — speak to a non-profit debt advice service before the position worsens.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Which is better, snowball or avalanche?',
        answer:
          'The avalanche always costs less in interest, because it always targets the most expensive debt first. The snowball clears individual accounts sooner, which many people find easier to keep going. Run both — if the interest difference is small, pick the one you will stick with.'
      },
      {
        question: 'Should I consolidate instead?',
        answer:
          'Consolidation can help if the new rate is genuinely lower after fees and you do not re-use the cleared cards. It replaces several payments with one, which is simpler, but it only saves money if the blended rate falls. The debt consolidation calculator compares the two directly.'
      },
      {
        question: 'Does either method hurt my credit score?',
        answer:
          'Neither should. Both keep every account current and reduce balances over time, which generally helps. Paying a card down to zero and leaving it open is usually better for utilisation than closing it.'
      }
    ],
    references: [
      {
        title: 'Strategies for paying down multiple debts',
        source: 'Consumer Financial Protection Bureau (CFPB)'
      }
    ]
  },

  'home-affordability-calculator': {
    calculatorId: 'home-affordability-calculator',
    title: 'Home Affordability Calculator',
    subtitle:
      'Find the price range lenders will realistically approve, based on your income, deposit and existing debts — not on what you would like to afford.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator11 Editorial Team',
      role: 'Personal Finance Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Lending criteria vary by lender, country and product, and change frequently. This is an estimate for planning. Only a lender can tell you what you will actually be offered.',
    overview: [
      'There are two different answers to "what can I afford". The first is what a lender will approve, which is driven by ratios. The second is what you can comfortably live with once the mortgage is only one of your outgoings. They are rarely the same number.',
      'This calculator works out the first, using the debt-to-income limits lenders apply, then shows the monthly payment that price implies so you can judge the second for yourself.'
    ],
    formulaCard: {
      title: 'Maximum Payment From Debt-to-Income Limits',
      formula: 'Max housing payment = (Gross monthly income × Back-end limit) − Existing debt payments',
      explanation:
        'Lenders cap total monthly debt as a share of gross income. Existing commitments come out of that allowance first, which is why a car loan can reduce your borrowing capacity by far more than its own monthly cost.',
      variables: [
        { symbol: 'Front-end limit', meaning: 'Maximum share of income for housing alone, commonly around 28%' },
        { symbol: 'Back-end limit', meaning: 'Maximum share for all debt including housing, commonly 36–43%' },
        { symbol: 'Existing debt payments', meaning: 'Card minimums, car and student loans, other credit commitments' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Home Affordability Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter gross annual household income',
          description:
            'Before tax, including reliable bonus or overtime. Lenders discount irregular income, so be conservative with anything not guaranteed.'
        },
        {
          stepNumber: 2,
          title: 'Add your existing monthly debt payments',
          description:
            'Card minimums, car finance, student loans and any other credit commitments. These reduce borrowing capacity directly.'
        },
        {
          stepNumber: 3,
          title: 'Enter your deposit',
          description:
            'Only what is genuinely available for the deposit, after setting aside moving costs, legal fees and transfer taxes.'
        },
        {
          stepNumber: 4,
          title: 'Set the interest rate and term',
          description:
            'Rate moves affordability more than almost anything else. Test a rate one or two points above today\'s to see how exposed you would be.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: $90,000 Household Income',
      scenario:
        'Gross household income of $90,000, existing debt payments of $450 a month, a $40,000 deposit, and a 30-year mortgage at 6.5%.',
      inputs: [
        { label: 'Gross monthly income', value: '$7,500' },
        { label: 'Existing debts', value: '$450 per month' },
        { label: 'Deposit', value: '$40,000' },
        { label: 'Rate and term', value: '6.5%, 30 years' }
      ],
      steps: [
        'Back-end limit at 36% = 7,500 × 0.36 = $2,700 total monthly debt.',
        'Less existing debts: 2,700 − 450 = $2,250 available for housing.',
        'Allowing roughly $400 a month for property tax and insurance leaves about $1,850 for principal and interest.',
        'At 6.5% over 30 years, $1,850 a month supports a loan of roughly $292,700.',
        'Adding the $40,000 deposit gives a purchase price of about $332,700.'
      ],
      result: 'Estimated maximum price: roughly $332,700',
      takeaway:
        'Clearing the $450 of existing debt would raise the housing allowance to $2,700 and lift the estimated price to around $403,000 — an increase of roughly $70,000 in buying power from removing $450 a month of commitments.'
    },
    sections: [
      {
        id: 'dti-explained',
        title: 'The two ratios lenders actually use',
        paragraphs: [
          'The front-end ratio looks at housing costs alone as a share of gross income. The back-end ratio looks at all monthly debt including the proposed mortgage. Lenders apply both and the stricter one wins.',
          'Conventional guidance has long been 28% front-end and 36% back-end, though many lenders allow higher back-end ratios — sometimes to 43% or beyond — for borrowers with strong credit or larger deposits. Being approved at the upper end is not the same as it being sensible.'
        ],
        callout: {
          type: 'info',
          title: 'Gross, not net',
          text: 'These ratios use income before tax. A 36% back-end ratio can represent close to half your take-home pay, which is why the approved maximum often feels unaffordable in practice.'
        }
      },
      {
        id: 'beyond-the-mortgage',
        title: 'Costs the ratio does not capture',
        paragraphs: [
          'Debt-to-income says nothing about the rest of owning a home. These are the costs that most often catch first-time buyers out:'
        ],
        bullets: [
          'Maintenance, commonly estimated at 1% of the property value a year — and it arrives unevenly, not monthly.',
          'Property taxes and insurance, which rise over time independently of your mortgage.',
          'Service charges or HOA fees, which lenders count but buyers often forget when comparing properties.',
          'Purchase costs: legal fees, surveys, moving and transfer tax or stamp duty, typically several percent of the price.',
          'The absence of a landlord — every repair is now yours.'
        ]
      },
      {
        id: 'deposit-size',
        title: 'What the deposit changes',
        paragraphs: [
          'A larger deposit does three things at once: it reduces the amount borrowed, it usually unlocks a better interest rate, and beyond a certain threshold it removes mortgage insurance. In many markets that threshold is 20%.',
          'The effect compounds. Moving from a 10% to a 20% deposit can cut the monthly payment by considerably more than the extra deposit alone would suggest, because the rate improves and the insurance premium disappears at the same time.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much house can I afford on my salary?',
        answer:
          'As a rough guide, two to four times gross household income, depending on your deposit, existing debts and prevailing interest rates. The ratio-based estimate here is more reliable than any income multiple, because it accounts for what you already owe.'
      },
      {
        question: 'Why does a car loan reduce my budget so much?',
        answer:
          'Because it comes straight out of your debt allowance. A $450 monthly payment removes $450 from the amount available for housing, and at typical rates that translates into roughly $70,000 of borrowing capacity. Clearing short-term debt before applying often has more effect than saving a little more deposit.'
      },
      {
        question: 'Should I borrow the maximum I am approved for?',
        answer:
          'Usually not. Approval is based on gross income and current interest rates, and accounts for neither your actual spending nor what happens when the rate resets. Many buyers deliberately borrow below their maximum to leave room for maintenance, rate rises and life changes.'
      },
      {
        question: 'Does this work outside the US?',
        answer:
          'The ratio method is broadly similar across markets, but the specific limits are not. UK lenders lean on income multiples and affordability stress tests, and Canadian lenders use GDS and TDS ratios. Use this for a planning estimate and confirm the local criteria with a lender or broker.'
      }
    ],
    references: [
      {
        title: 'Understanding debt-to-income ratio when buying a home',
        source: 'Consumer Financial Protection Bureau (CFPB)'
      }
    ]
  }
};
