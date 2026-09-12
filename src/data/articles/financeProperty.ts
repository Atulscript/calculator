import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator11 Editorial Team',
  role: 'Personal Finance Desk',
  lastUpdated: 'September 2026'
};

const REGIONAL = 'Rules, rates and thresholds for this product are set by government or lender and change regularly. Figures here are estimates for comparison — confirm current terms with a lender or adviser before deciding.';

/** Property, mortgage-programme and home-equity articles. */
export const FINANCE_PROPERTY_ARTICLES: Record<string, CalculatorArticle> = {
  'rent-vs-buy-calculator': {
    calculatorId: 'rent-vs-buy-calculator',
    title: 'Rent vs Buy Calculator',
    subtitle: 'Compare the true cost of renting against buying, including maintenance, taxes and the opportunity cost of your deposit.',
    readTimeMinutes: 6,
    author: AUTHOR,
    disclaimer: 'Outcomes depend heavily on assumptions about house price growth and investment returns, neither of which can be known in advance. Treat the break-even year as a scenario, not a prediction.',
    overview: [
      'The usual framing — that renting is throwing money away — ignores most of the costs of owning. Mortgage interest, property tax, insurance, maintenance and transaction costs are all money that does not build equity either.',
      'The honest comparison is total cost over a period, including what your deposit would have earned if invested instead. That produces a break-even year: the point after which buying comes out ahead.'
    ],
    formulaCard: {
      title: 'Total Cost of Each Option',
      formula: 'Buy cost = Interest + Tax + Insurance + Maintenance + Transaction costs − Equity gained',
      explanation: 'Rent cost is rent paid minus what the un-spent deposit earns invested. Only the principal portion of a mortgage payment builds equity; the rest is a cost like rent.',
      variables: [
        { symbol: 'Maintenance', meaning: 'Commonly estimated at 1% of property value a year' },
        { symbol: 'Transaction costs', meaning: 'Legal, survey, transfer tax on purchase; agent fees on sale' },
        { symbol: 'Opportunity cost', meaning: 'Return the deposit would have earned elsewhere' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Rent vs Buy Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter current rent and expected increases', description: 'Rent usually rises over time; holding it flat biases the comparison toward renting.' },
        { stepNumber: 2, title: 'Enter purchase price, deposit and rate', description: 'Include the transaction costs you would actually pay.' },
        { stepNumber: 3, title: 'Set growth and return assumptions', description: 'House price growth and investment return. These drive the result more than anything else.' },
        { stepNumber: 4, title: 'Find the break-even year', description: 'If you expect to move before it, renting is likely cheaper.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Renting at $1,800/month versus buying at $380,000 with 10% down at 6.5%, 3% annual house price growth, 5% investment return.',
      inputs: [
        { label: 'Monthly rent', value: '$1,800 (+3% a year)' },
        { label: 'Purchase price', value: '$380,000' },
        { label: 'Deposit', value: '$38,000' },
        { label: 'Rate / term', value: '6.5%, 30 years' }
      ],
      steps: [
        'Purchase costs of roughly 3% = $11,400 paid upfront and never recovered.',
        'Year one: interest ≈ $22,100, tax and insurance ≈ $6,300, maintenance ≈ $3,800 = $32,200 of non-equity cost.',
        'Rent in year one = $21,600, plus the $38,000 deposit earning 5% = $1,900 forgone.',
        'Buying costs more early. Equity accumulation and rising rent close the gap over time.',
        'On these assumptions the lines cross at roughly year 6.'
      ],
      result: 'Break-even at about 6 years',
      takeaway: 'Under five years, renting usually wins because transaction costs dominate. The break-even moves earlier with faster rent rises and later with higher interest rates.'
    },
    sections: [
      {
        id: 'assumptions',
        title: 'The assumptions that decide the answer',
        paragraphs: ['Small changes here move the break-even by years, which is why any single answer should be treated sceptically:'],
        bullets: [
          'House price growth — the most uncertain input and often the most influential.',
          'How long you stay. Transaction costs are front-loaded and only amortise with time.',
          'Investment return on the deposit, which is a real cost of buying that people routinely ignore.',
          'Rent inflation, which is what eventually makes owning cheaper.',
          'Maintenance, consistently underestimated by first-time buyers.'
        ],
        callout: { type: 'info', title: 'Not purely financial', text: 'Security of tenure, freedom to alter the property and the flexibility to move at short notice all have real value that no calculator can price.' }
      }
    ],
    faqs: [
      { question: 'How long do I need to stay for buying to make sense?', answer: 'Commonly five years or more, though it depends on transaction costs, rates and local rent levels. The break-even year from this calculator is a better guide than any general rule.' },
      { question: 'Is renting really throwing money away?', answer: 'No more than mortgage interest is. In the early years of a mortgage the large majority of each payment is interest, tax and insurance — none of which builds equity either.' },
      { question: 'Should I count the deposit as a cost of buying?', answer: 'Its opportunity cost, yes. Money tied up in a house is not earning elsewhere, and leaving that out makes buying look better than it is.' }
    ]
  },

  'rental-property-roi-calculator': {
    calculatorId: 'rental-property-roi-calculator',
    title: 'Rental Property ROI Calculator',
    subtitle: 'Calculate cap rate, cash-on-cash return and monthly cash flow, with vacancy, maintenance and management fees accounted for.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: 'Property returns depend on local market conditions, tenant quality and regulation. Estimates assume expenses you enter are realistic — understating them is the most common error in property analysis.',
    overview: [
      'Rental property is usually assessed on three numbers that answer different questions. Cap rate measures the property independent of financing. Cash-on-cash measures the return on money you actually put in. Cash flow tells you whether it pays for itself month to month.',
      'A property can look good on one and poor on another, which is why all three matter.'
    ],
    formulaCard: {
      title: 'The Three Core Metrics',
      formula: 'Cap rate = Net Operating Income ÷ Purchase price',
      explanation: 'NOI is annual rent less all operating expenses, excluding mortgage payments. Cash-on-cash = annual pre-tax cash flow ÷ total cash invested. Cash flow = monthly rent − all outgoings including the mortgage.',
      variables: [
        { symbol: 'NOI', meaning: 'Rent minus operating expenses, before financing' },
        { symbol: 'Vacancy', meaning: 'Allowance for empty periods, commonly 5–8%' },
        { symbol: 'Cash invested', meaning: 'Deposit plus closing and any refurbishment costs' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Rental ROI Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter purchase price and cash invested', description: 'Include closing costs and any work needed before letting.' },
        { stepNumber: 2, title: 'Enter expected monthly rent', description: 'Use comparable local listings, not the agent\'s optimistic figure.' },
        { stepNumber: 3, title: 'Add every operating expense', description: 'Tax, insurance, management, maintenance, service charges and a vacancy allowance.' },
        { stepNumber: 4, title: 'Compare all three metrics', description: 'Strong cap rate with negative cash flow means the financing, not the property, is the problem.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A £220,000 property renting at £1,300/month, 25% deposit at 5.8%, with £6,000 closing costs.',
      inputs: [
        { label: 'Purchase price', value: '£220,000' },
        { label: 'Monthly rent', value: '£1,300' },
        { label: 'Cash invested', value: '£61,000 (deposit + costs)' },
        { label: 'Mortgage', value: '£165,000 at 5.8%' }
      ],
      steps: [
        'Gross annual rent = 1,300 × 12 = £15,600.',
        'Less 6% vacancy = £14,664 effective income.',
        'Operating expenses (tax, insurance, management, maintenance) ≈ £4,800 → NOI = £9,864.',
        'Cap rate = 9,864 ÷ 220,000 = 4.48%.',
        'Annual mortgage payments ≈ £11,640 → cash flow = 9,864 − 11,640 = −£1,776.',
        'Cash-on-cash = −1,776 ÷ 61,000 = −2.9%.'
      ],
      result: 'Cap rate 4.48% · Cash flow −£148/month · Cash-on-cash −2.9%',
      takeaway: 'The property itself yields a reasonable 4.48%, but at this rate and deposit it loses money monthly. Either a larger deposit or a lower price is needed to make it cash-flow positive.'
    },
    sections: [
      {
        id: 'underestimating',
        title: 'The expenses people leave out',
        paragraphs: ['Optimistic analysis is the norm. These are the costs most often missing:'],
        bullets: [
          'Vacancy — even a well-run property is empty between tenancies.',
          'Capital expenditure — roofs, boilers and kitchens have finite lives and large costs.',
          'Management at 8–12% of rent if you are not doing it yourself.',
          'Letting and tenant-find fees on each new tenancy.',
          'Periods of non-payment and the cost of recovering possession.'
        ],
        callout: { type: 'warning', title: 'The 1% rule is a screen, not an analysis', text: 'Monthly rent of 1% of purchase price is a quick filter for whether a property is worth analysing. It is not a substitute for working through the actual numbers.' }
      }
    ],
    faqs: [
      { question: 'What is a good cap rate?', answer: 'It varies enormously by market. Four to ten percent is a common range, with lower figures in expensive stable cities and higher ones where risk or management burden is greater. Compare against other properties in the same area rather than a universal target.' },
      { question: 'What is the difference between cap rate and cash-on-cash return?', answer: 'Cap rate ignores financing and measures the property itself, which makes properties comparable. Cash-on-cash includes the mortgage and measures the return on the money you actually invested.' },
      { question: 'Should a rental be cash-flow positive from day one?', answer: 'Ideally yes. Negative cash flow means subsidising the property monthly and relying entirely on capital growth, which is speculation rather than investment.' }
    ]
  },

  'heloc-calculator': {
    calculatorId: 'heloc-calculator',
    title: 'HELOC Calculator',
    subtitle: 'Work out how much equity you can borrow, what the draw and repayment periods cost, and how a rate change would affect the payment.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: REGIONAL + ' A HELOC is secured against your home; failure to repay can result in losing it.',
    overview: [
      'A home equity line of credit lets you borrow against the equity in your home, drawing and repaying like a credit card rather than taking a lump sum.',
      'The structure has two phases that behave very differently, and the transition between them catches people out — payments can jump sharply when the draw period ends.'
    ],
    formulaCard: {
      title: 'Available Credit',
      formula: 'Available = (Home value × Max LTV) − Mortgage balance',
      explanation: 'Lenders typically allow a combined loan-to-value of 80–85%. During the draw period payments are often interest-only; in the repayment period principal is added and the payment rises.',
      variables: [
        { symbol: 'Max LTV', meaning: 'Combined loan-to-value cap, commonly 80–85%' },
        { symbol: 'Draw period', meaning: 'Typically 10 years, often interest-only' },
        { symbol: 'Repayment period', meaning: 'Typically 10–20 years of principal and interest' }
      ]
    },
    howToSteps: {
      title: 'How to Use the HELOC Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter home value and mortgage balance', description: 'Use a realistic current valuation, not the price you hope to achieve.' },
        { stepNumber: 2, title: 'Set the lender\'s LTV limit', description: '80% is common; some lenders go to 85% at a higher rate.' },
        { stepNumber: 3, title: 'Enter the amount you plan to draw', description: 'Available credit is not a target — interest accrues only on what you draw.' },
        { stepNumber: 4, title: 'Compare both phases', description: 'Check the repayment-period payment, not just the interest-only one.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A home worth $420,000 with a $240,000 mortgage, 80% LTV limit, drawing $60,000 at 8.5%.',
      inputs: [
        { label: 'Home value', value: '$420,000' },
        { label: 'Mortgage balance', value: '$240,000' },
        { label: 'LTV limit', value: '80%' },
        { label: 'Amount drawn', value: '$60,000 at 8.5%' }
      ],
      steps: [
        'Maximum combined borrowing = 420,000 × 0.80 = $336,000.',
        'Available credit = 336,000 − 240,000 = $96,000.',
        'Interest-only payment on $60,000 = 60,000 × 0.085 ÷ 12 = $425/month.',
        'In a 15-year repayment period, principal and interest ≈ $591/month.',
        'A 2-point rate rise during the draw period lifts the interest-only payment to $525.'
      ],
      result: 'Available $96,000 · Draw phase $425/mo · Repayment phase $591/mo',
      takeaway: 'The payment rises 39% at the end of the draw period even with no rate change. Because HELOC rates are usually variable, both the rate and the structure can push it higher.'
    },
    sections: [
      {
        id: 'heloc-vs-loan',
        title: 'HELOC or home equity loan?',
        paragraphs: [
          'A home equity loan is a lump sum at a fixed rate with fixed payments — predictable, and suited to a known one-off cost. A HELOC is a revolving line at a usually variable rate, suited to staged spending such as a renovation where the total is uncertain.',
          'The flexibility of a HELOC costs predictability. If rates rise during the draw period, the payment rises with them, and there is no fixed end cost to plan around.'
        ],
        callout: { type: 'warning', title: 'This debt is secured on your home', text: 'Using home equity to clear unsecured debt converts debt you could not lose your house over into debt you could. It also stretches short-term borrowing across decades.' }
      }
    ],
    faqs: [
      { question: 'How much can I borrow with a HELOC?', answer: 'Usually up to 80–85% of your home\'s value minus the outstanding mortgage. On a $400,000 home with a $250,000 mortgage and an 80% limit, that is roughly $70,000.' },
      { question: 'What happens when the draw period ends?', answer: 'You can no longer draw, and payments switch from interest-only to principal and interest. This commonly increases the monthly payment substantially — plan for it before the transition rather than after.' },
      { question: 'Are HELOC rates fixed?', answer: 'Usually variable, tied to a benchmark rate. Some lenders allow a portion to be fixed. A variable rate means both your payment and total cost can rise after you draw.' }
    ]
  },

  'fha-loan-calculator': {
    calculatorId: 'fha-loan-calculator',
    title: 'FHA Loan Calculator',
    subtitle: 'Estimate FHA monthly payments including upfront and annual mortgage insurance premiums, with the low minimum down payment built in.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: REGIONAL + ' FHA limits and premium rates are set by HUD and revised periodically — verify current figures at hud.gov.',
    overview: [
      'FHA loans are US government-insured mortgages designed for borrowers who cannot meet conventional requirements. They allow a minimum down payment of 3.5% with a credit score of 580 or above, and accept higher debt-to-income ratios.',
      'The trade-off is mortgage insurance, which on most FHA loans lasts for the life of the loan rather than falling away at 20% equity.'
    ],
    formulaCard: {
      title: 'FHA Payment Components',
      formula: 'Payment = P&I + Annual MIP ÷ 12 + Property tax ÷ 12 + Insurance ÷ 12',
      explanation: 'An upfront premium of 1.75% of the loan is usually financed into the balance. The annual premium is charged monthly and depends on loan size, term and loan-to-value.',
      variables: [
        { symbol: 'UFMIP', meaning: 'Upfront premium, 1.75% of the base loan, normally added to the balance' },
        { symbol: 'Annual MIP', meaning: 'Ongoing premium, commonly 0.50–0.55% a year' },
        { symbol: 'Minimum down', meaning: '3.5% at 580+ credit score; 10% between 500 and 579' }
      ]
    },
    howToSteps: {
      title: 'How to Use the FHA Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the purchase price and down payment', description: 'The minimum is 3.5%, but more reduces both the balance and the annual premium.' },
        { stepNumber: 2, title: 'Enter the rate and term', description: 'FHA rates are often slightly below conventional, which partly offsets the insurance.' },
        { stepNumber: 3, title: 'Check the financed upfront premium', description: 'It increases the loan balance and therefore the payment.' },
        { stepNumber: 4, title: 'Add tax and insurance', description: 'These are usually collected monthly through escrow.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $300,000 home with 3.5% down at 6.25% over 30 years.',
      inputs: [
        { label: 'Purchase price', value: '$300,000' },
        { label: 'Down payment', value: '$10,500 (3.5%)' },
        { label: 'Base loan', value: '$289,500' },
        { label: 'Rate / term', value: '6.25%, 30 years' }
      ],
      steps: [
        'UFMIP = 289,500 × 0.0175 = $5,066, financed → total loan $294,566.',
        'P&I on $294,566 at 6.25% over 30 years ≈ $1,814.',
        'Annual MIP at 0.55% = 289,500 × 0.0055 ÷ 12 = $133/month.',
        'Tax and insurance ≈ $375/month.',
        'Total monthly ≈ $2,322.'
      ],
      result: 'Monthly payment ≈ $2,322 including $133 mortgage insurance',
      takeaway: 'The insurance adds about $133 a month for the life of the loan. Over 30 years that is roughly $48,000 — the price of entering with 3.5% rather than 20% down.'
    },
    sections: [
      {
        id: 'fha-vs-conventional',
        title: 'When FHA makes sense and when it does not',
        paragraphs: [
          'FHA is usually the better route for borrowers with lower credit scores or minimal savings, because conventional loans price both heavily. It also accepts higher debt-to-income ratios.',
          'With a credit score above roughly 680 and 5% or more down, a conventional loan is often cheaper overall — its private mortgage insurance can be cancelled once you reach 20% equity, while FHA insurance generally cannot.',
          'Refinancing from FHA to conventional once equity reaches 20% is a common strategy to remove the premium.'
        ]
      }
    ],
    faqs: [
      { question: 'What credit score do I need for an FHA loan?', answer: '580 or above qualifies for the 3.5% minimum down payment. Between 500 and 579 requires 10% down. Individual lenders often set higher minimums than the FHA floor.' },
      { question: 'Does FHA mortgage insurance ever go away?', answer: 'On most current FHA loans with less than 10% down, it lasts the full term. With 10% or more down it ends after 11 years. Refinancing into a conventional loan is the usual way to remove it.' },
      { question: 'Is an FHA loan cheaper than a conventional one?', answer: 'Not always. FHA rates are often slightly lower, but the permanent insurance frequently makes the total cost higher for borrowers who would qualify conventionally. Compare the full cost, not the rate.' }
    ]
  },

  'va-mortgage-calculator': {
    calculatorId: 'va-mortgage-calculator',
    title: 'VA Loan Calculator',
    subtitle: 'Estimate a VA mortgage payment with no down payment and no mortgage insurance, including the funding fee.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: REGIONAL + ' VA funding fee rates and eligibility are set by the Department of Veterans Affairs — verify at va.gov.',
    overview: [
      'VA loans are guaranteed by the US Department of Veterans Affairs for eligible service members, veterans and some surviving spouses. They are among the most favourable mortgage products available: no down payment required and no monthly mortgage insurance.',
      'In place of insurance there is a one-time funding fee, which varies by down payment and whether it is your first use of the benefit — and is waived entirely for veterans receiving disability compensation.'
    ],
    formulaCard: {
      title: 'VA Payment Components',
      formula: 'Loan = Purchase price − Down payment + Funding fee',
      explanation: 'There is no monthly mortgage insurance, which is the single largest saving against FHA or low-deposit conventional loans. The funding fee is usually financed into the loan.',
      variables: [
        { symbol: 'Funding fee', meaning: '2.15% first use with no down payment; lower with a deposit, higher on subsequent use' },
        { symbol: 'Exemption', meaning: 'Waived for veterans receiving service-connected disability compensation' },
        { symbol: 'Monthly MI', meaning: 'None — this is the defining advantage of the programme' }
      ]
    },
    howToSteps: {
      title: 'How to Use the VA Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the purchase price', description: 'No down payment is required, though making one lowers the funding fee.' },
        { stepNumber: 2, title: 'Select first or subsequent use', description: 'Subsequent use carries a higher funding fee.' },
        { stepNumber: 3, title: 'Mark exemption if it applies', description: 'Disability compensation removes the fee entirely.' },
        { stepNumber: 4, title: 'Add tax and insurance', description: 'These still apply and are usually escrowed monthly.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $350,000 home with no down payment, first use of the benefit, at 6.0% over 30 years.',
      inputs: [
        { label: 'Purchase price', value: '$350,000' },
        { label: 'Down payment', value: '$0' },
        { label: 'Funding fee', value: '2.15% (first use)' },
        { label: 'Rate / term', value: '6.0%, 30 years' }
      ],
      steps: [
        'Funding fee = 350,000 × 0.0215 = $7,525, financed → loan $357,525.',
        'P&I at 6.0% over 30 years ≈ $2,144.',
        'No monthly mortgage insurance applies.',
        'Tax and insurance ≈ $440/month → total ≈ $2,584.',
        'An equivalent FHA loan would add roughly $160/month in insurance.'
      ],
      result: 'Monthly ≈ $2,584 with no mortgage insurance',
      takeaway: 'The absence of monthly insurance is worth roughly $160 a month against a comparable FHA loan — around $57,000 over 30 years, for a one-time fee of $7,525.'
    },
    faqs: [
      { question: 'Do VA loans really require no down payment?', answer: 'Yes, for eligible borrowers up to the county loan limit where no down payment is needed. Making one is still optional and reduces the funding fee.' },
      { question: 'What is the VA funding fee?', answer: 'A one-time charge replacing mortgage insurance, typically 2.15% of the loan on a first use with no down payment. It falls with a deposit and rises on subsequent use, and is waived for veterans receiving disability compensation.' },
      { question: 'Can I use a VA loan more than once?', answer: 'Yes. The benefit can be reused once a previous VA loan is repaid, and in some cases two can be held at the same time. The funding fee is higher on subsequent uses.' }
    ]
  },

  'mortgage-calculator-uk': {
    calculatorId: 'mortgage-calculator-uk',
    title: 'UK Mortgage Calculator',
    subtitle: 'Work out monthly repayments, compare repayment against interest-only, and see the effect when your fixed rate ends.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: REGIONAL + ' UK lenders apply their own affordability and stress-test criteria. Your mortgage is secured on your home and may be repossessed if you do not keep up repayments.',
    overview: [
      'UK mortgages differ from the US model in one way that dominates planning: the rate is fixed only for an initial period, typically two or five years, after which the loan reverts to the lender\'s standard variable rate.',
      'That reversion is the single most important number to model, because SVR is often several points higher than the fixed rate that preceded it.'
    ],
    formulaCard: {
      title: 'Repayment Mortgage',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'Interest-only payments are simply P × i, with the full capital still owed at the end of the term. UK terms are commonly 25–35 years while the fixed period is only 2–5.',
      variables: [
        { symbol: 'LTV', meaning: 'Loan to value — the main driver of the rate offered' },
        { symbol: 'Fixed period', meaning: 'Usually 2 or 5 years, then reversion to SVR' },
        { symbol: 'SVR', meaning: 'Standard variable rate after the fixed period ends' }
      ]
    },
    howToSteps: {
      title: 'How to Use the UK Mortgage Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter property price and deposit', description: 'The resulting LTV determines which rate tier you qualify for. Crossing below 90%, 85% or 75% usually improves it.' },
        { stepNumber: 2, title: 'Enter the fixed rate and term', description: 'Term is typically 25–35 years; the fixed period is much shorter.' },
        { stepNumber: 3, title: 'Model the reversion rate', description: 'Enter a realistic SVR to see the payment after the fix ends.' },
        { stepNumber: 4, title: 'Compare repayment and interest-only', description: 'Interest-only is far cheaper monthly but repays no capital.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: The Reversion Cliff',
      scenario: 'A £320,000 property with a £64,000 deposit, £256,000 borrowed over 30 years at 4.4% fixed for 5 years, reverting to 7.5%.',
      inputs: [
        { label: 'Property price', value: '£320,000' },
        { label: 'Deposit', value: '£64,000 (80% LTV)' },
        { label: 'Fixed rate', value: '4.4% for 5 years' },
        { label: 'Reversion rate', value: '7.5% SVR' }
      ],
      steps: [
        'Monthly rate = 4.4% ÷ 12 = 0.3667%.',
        'Payment during the fix ≈ £1,282.',
        'After 5 years the balance is roughly £234,600 with 25 years remaining.',
        'At 7.5% the payment becomes ≈ £1,734.',
        'That is £452 more per month, a 35% increase.'
      ],
      result: 'Fixed period £1,282/mo · After reversion £1,734/mo',
      takeaway: 'Most borrowers remortgage before reversion rather than accept SVR. Starting that process three to six months before the fix ends avoids paying SVR even briefly.'
    },
    sections: [
      {
        id: 'ltv-bands',
        title: 'Why LTV bands matter more than the exact deposit',
        paragraphs: [
          'UK lenders price in bands — commonly 95%, 90%, 85%, 75% and 60% LTV. Rates step down at each threshold, sometimes sharply.',
          'This means a small increase in deposit can be worth far more than its size if it moves you across a band. Going from 85.5% to 84.9% LTV can cut the rate meaningfully, while a similar increase within a band changes almost nothing.'
        ],
        callout: { type: 'tip', title: 'Check the band before you complete', text: 'If you are just above a threshold, finding a little more deposit or negotiating slightly on price can move you into a cheaper tier.' }
      }
    ],
    faqs: [
      { question: 'What happens when my fixed rate ends?', answer: 'The mortgage reverts to the lender\'s standard variable rate, which is usually significantly higher. Most borrowers remortgage to a new fixed deal shortly before this happens.' },
      { question: 'Should I choose a 2-year or 5-year fix?', answer: 'A 2-year fix usually has a lower rate but means remortgaging sooner, with fees each time. A 5-year fix costs slightly more for longer certainty. The choice depends on how much rate risk you want to carry and whether you might move.' },
      { question: 'What is the difference between repayment and interest-only?', answer: 'Repayment clears both interest and capital, so the debt is gone at the end of the term. Interest-only pays just the interest, leaving the full capital owed — it needs a credible separate plan to repay it.' }
    ]
  },

  'canadian-mortgage-calculator': {
    calculatorId: 'canadian-mortgage-calculator',
    title: 'Canadian Mortgage Calculator',
    subtitle: 'Calculate payments with semi-annual compounding, accelerated payment options and CMHC insurance on low down payments.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: REGIONAL + ' Canadian mortgage rules including the stress test and insurance premiums are set federally and change — confirm current requirements with a lender or mortgage broker.',
    overview: [
      'Canadian mortgages have three features that make them behave differently from US ones: interest compounds semi-annually rather than monthly, the term is much shorter than the amortisation, and default insurance is mandatory below a 20% down payment.',
      'The semi-annual compounding means a Canadian rate is not directly comparable to a US rate of the same number — the effective cost is slightly lower.'
    ],
    formulaCard: {
      title: 'Semi-Annual Compounding',
      formula: 'i = (1 + rate ÷ 2)^(1/6) − 1',
      explanation: 'The nominal rate is converted to an equivalent monthly rate using semi-annual compounding, as required by Canadian law, before the standard payment formula is applied.',
      variables: [
        { symbol: 'Term', meaning: 'Length of the current rate agreement, typically 5 years' },
        { symbol: 'Amortisation', meaning: 'Total time to repay, typically 25 years' },
        { symbol: 'CMHC premium', meaning: '2.8–4.0% of the loan, required below 20% down' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Canadian Mortgage Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter price and down payment', description: 'Minimum is 5% up to $500,000, with a higher requirement on the portion above.' },
        { stepNumber: 2, title: 'Set rate, term and amortisation', description: 'Term and amortisation are different things — the term is when you renew.' },
        { stepNumber: 3, title: 'Check the CMHC premium', description: 'Applies below 20% down and is normally added to the mortgage.' },
        { stepNumber: 4, title: 'Compare payment frequencies', description: 'Accelerated bi-weekly makes the equivalent of one extra monthly payment a year.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $600,000 home with 10% down at 5.5% over a 25-year amortisation.',
      inputs: [
        { label: 'Purchase price', value: '$600,000' },
        { label: 'Down payment', value: '$60,000 (10%)' },
        { label: 'CMHC premium', value: '3.1% of $540,000' },
        { label: 'Rate / amortisation', value: '5.5%, 25 years' }
      ],
      steps: [
        'Base loan = 600,000 − 60,000 = $540,000.',
        'CMHC premium = 540,000 × 0.031 = $16,740, added → $556,740.',
        'Effective monthly rate = (1 + 0.055 ÷ 2)^(1/6) − 1 = 0.4531%.',
        'Monthly payment ≈ $3,394.',
        'Accelerated bi-weekly = 3,394 ÷ 2 = $1,697 every two weeks, which repays the mortgage roughly 3 years sooner.'
      ],
      result: 'Monthly $3,394 · Accelerated bi-weekly $1,697 saves about 3 years',
      takeaway: 'Accelerated bi-weekly payments make 26 half-payments a year — the equivalent of 13 monthly payments rather than 12. That single change shortens the amortisation substantially at no extra monthly cost.'
    },
    sections: [
      {
        id: 'term-vs-amortisation',
        title: 'Term and amortisation are not the same thing',
        paragraphs: [
          'The amortisation is how long the mortgage takes to repay in full, commonly 25 years. The term is how long your current rate and conditions are locked, commonly 5 years.',
          'At the end of each term you renew at whatever rates prevail, and you will typically do this five times over a 25-year amortisation. This is the main structural difference from the US 30-year fixed, where the rate is locked for the entire life of the loan.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the minimum down payment in Canada?', answer: '5% on the first $500,000 of the price, with a higher percentage required on the portion above. Below 20% overall, CMHC or equivalent default insurance is mandatory.' },
      { question: 'Why do Canadian mortgages compound semi-annually?', answer: 'It is required by federal legislation for fixed-rate mortgages. The practical effect is that a Canadian quoted rate costs slightly less than the same nominal rate compounded monthly.' },
      { question: 'What does accelerated bi-weekly actually do?', answer: 'You pay half the monthly amount every two weeks, which is 26 payments — the equivalent of 13 monthly payments a year instead of 12. The extra payment goes entirely to principal and can cut several years off the amortisation.' }
    ]
  },

  'stamp-duty-calculator': {
    calculatorId: 'stamp-duty-calculator',
    title: 'Stamp Duty Calculator',
    subtitle: 'Estimate stamp duty or property transfer tax on a purchase, including first-time buyer relief and additional-property surcharges.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: REGIONAL + ' Stamp duty bands, reliefs and surcharges change frequently and differ between England, Scotland, Wales and other jurisdictions. Confirm current rates with the relevant tax authority or your solicitor.',
    overview: [
      'Stamp duty is a tax on property purchase, charged in bands so that each slice of the price is taxed at its own rate. It is paid by the buyer, usually within days of completion, and cannot normally be added to the mortgage.',
      'It is often the largest single upfront cost after the deposit, and forgetting it is a common budgeting error for first-time buyers.'
    ],
    formulaCard: {
      title: 'Banded Property Tax',
      formula: 'Duty = Σ (Price within each band × That band\'s rate)',
      explanation: 'Like income tax, only the portion of the price inside each band is charged at that band\'s rate. Surcharges for additional properties or non-resident buyers typically apply across all bands.',
      variables: [
        { symbol: 'Bands', meaning: 'Price thresholds, each with its own rate' },
        { symbol: 'First-time relief', meaning: 'Raised nil-rate threshold for eligible first purchases' },
        { symbol: 'Surcharge', meaning: 'Additional percentage on second homes and buy-to-let' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Stamp Duty Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the purchase price', description: 'The agreed price, since duty is charged on consideration paid.' },
        { stepNumber: 2, title: 'Select buyer type', description: 'First-time buyer, moving home, or additional property — each is treated differently.' },
        { stepNumber: 3, title: 'Check the band breakdown', description: 'Seeing which portion falls in each band makes the total easier to sanity-check.' },
        { stepNumber: 4, title: 'Budget it as cash', description: 'It is due shortly after completion and generally cannot be financed.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A £420,000 purchase by a home mover, under an illustrative band structure of 0% to £250,000, 5% from £250,001 to £925,000.',
      inputs: [
        { label: 'Purchase price', value: '£420,000' },
        { label: 'Buyer type', value: 'Moving home' },
        { label: 'Band 1', value: '0% up to £250,000' },
        { label: 'Band 2', value: '5% above £250,000' }
      ],
      steps: [
        'First £250,000 at 0% = £0.',
        'Remaining £170,000 at 5% = £8,500.',
        'Total duty = £8,500.',
        'As an additional property with a 3% surcharge, the whole price attracts the extra: 420,000 × 0.03 = £12,600 more, giving £21,100.'
      ],
      result: 'Home mover £8,500 · Additional property £21,100',
      takeaway: 'The additional-property surcharge applies to the entire price, not just the portion above a threshold — which is why it increases the bill so sharply.'
    },
    sections: [
      {
        id: 'jurisdictions',
        title: 'The tax is not the same across the UK',
        paragraphs: [
          'England and Northern Ireland charge Stamp Duty Land Tax. Scotland charges Land and Buildings Transaction Tax, and Wales charges Land Transaction Tax. The band thresholds and rates differ in each.',
          'Outside the UK, equivalent property transfer taxes exist under different names and structures. Always use the rates for the jurisdiction where the property sits, not where you live.'
        ],
        callout: { type: 'warning', title: 'Just above a threshold is expensive', text: 'Because bands step, a price marginally above a threshold can cost noticeably more duty. It is sometimes worth negotiating slightly below one.' }
      }
    ],
    faqs: [
      { question: 'Can I add stamp duty to my mortgage?', answer: 'Generally no. It is payable in cash shortly after completion. Some buyers borrow slightly more against the property to free up cash, but lenders assess affordability on the total either way.' },
      { question: 'Do first-time buyers pay stamp duty?', answer: 'Often at a reduced rate or not at all below a threshold, provided every buyer on the purchase is a first-time buyer. Relief usually disappears entirely above an upper price limit.' },
      { question: 'Why is the surcharge on a second property so large?', answer: 'Because it applies across the entire purchase price rather than only to the portion above a threshold. On a £400,000 purchase a 3% surcharge adds £12,000 regardless of how the main bands fall.' }
    ]
  }
};
