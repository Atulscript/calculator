import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator11 Editorial Team',
  role: 'Personal Finance Desk',
  lastUpdated: 'September 2026'
};

const LOAN_DISC = 'Lender terms, fees and eligibility criteria vary and change. Figures are estimates for comparison — confirm the actual offer before committing.';

/** Remaining loan, debt-ratio and business-finance articles. */
export const FINANCE_LOANS_ARTICLES: Record<string, CalculatorArticle> = {
  'personal-loan-calculator': {
    calculatorId: 'personal-loan-calculator',
    title: 'Personal Loan Calculator',
    subtitle: 'Calculate monthly payments and total interest, and see how the term length changes what you pay overall.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: LOAN_DISC,
    overview: [
      'Personal loans are unsecured, fixed-rate and fixed-term. Because nothing is pledged as collateral, rates are higher than secured borrowing but the application is simpler and faster.',
      'The two levers are the rate, which depends mostly on your credit profile, and the term, which trades monthly affordability against total cost.'
    ],
    formulaCard: {
      title: 'Amortised Payment',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'Every payment is identical, but the split shifts: early payments are mostly interest, later ones mostly principal. Origination fees are often deducted from the advance, so you receive less than you borrow.',
      variables: [
        { symbol: 'P', meaning: 'Amount borrowed before any origination fee' },
        { symbol: 'i', meaning: 'Monthly rate (APR ÷ 12)' },
        { symbol: 'n', meaning: 'Number of monthly payments' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Personal Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the amount you need', description: 'Borrow what you need rather than what you are offered.' },
        { stepNumber: 2, title: 'Enter the APR', description: 'APR includes fees, so it compares offers more fairly than the headline rate.' },
        { stepNumber: 3, title: 'Set the term', description: 'Try several — the monthly saving from a longer term is smaller than the extra interest.' },
        { stepNumber: 4, title: 'Check total interest', description: 'This is the number that tells you what the loan actually costs.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: 3 vs 5 Years',
      scenario: '$15,000 at 11.5% APR, compared over three and five years.',
      inputs: [
        { label: 'Amount', value: '$15,000' },
        { label: 'APR', value: '11.5%' },
        { label: 'Options', value: '36 or 60 months' }
      ],
      steps: [
        'Monthly rate = 11.5% ÷ 12 = 0.9583%.',
        '36 months: PMT ≈ $494. Total paid $17,784, interest $2,784.',
        '60 months: PMT ≈ $330. Total paid $19,800, interest $4,800.',
        'The longer term saves $164 a month and costs $2,016 more.'
      ],
      result: '3 years: $494/mo, $2,784 interest · 5 years: $330/mo, $4,800 interest',
      takeaway: 'Stretching from three to five years increases the interest by 72%. Choose the shortest term whose payment you can comfortably sustain.'
    },
    sections: [
      {
        id: 'rate-drivers',
        title: 'What determines the rate you are offered',
        paragraphs: ['Personal loan pricing is driven mostly by risk assessment:'],
        bullets: [
          'Credit score — the single largest factor, often worth several percentage points.',
          'Debt-to-income ratio, which signals capacity to repay.',
          'Loan amount and term, with longer terms usually priced higher.',
          'Income stability and length of employment.',
          'Whether the lender charges an origination fee, typically 1–8% deducted from the advance.'
        ],
        callout: { type: 'tip', title: 'Pre-qualify before applying', text: 'Many lenders offer a soft-credit-check quote that does not affect your score. Comparing several before a formal application avoids stacking hard inquiries.' }
      }
    ],
    faqs: [
      { question: 'What credit score do I need for a personal loan?', answer: 'Most mainstream lenders look for 600 or above, with the best rates reserved for 720 and higher. Below that, options exist but rates rise steeply and fees are more common.' },
      { question: 'Is a personal loan better than a credit card?', answer: 'Usually for a planned one-off expense, because the rate is lower and the fixed term forces repayment. Credit cards suit short-term flexible borrowing, particularly with a 0% promotional period.' },
      { question: 'Can I repay a personal loan early?', answer: 'Almost always, and it saves interest since charges accrue on the outstanding balance. Check for prepayment penalties, which are uncommon but not extinct.' }
    ]
  },

  'student-loan-calculator': {
    calculatorId: 'student-loan-calculator',
    title: 'Student Loan Calculator',
    subtitle: 'Estimate monthly repayments, total interest and payoff date, and compare standard against income-driven plans.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: LOAN_DISC + ' Student loan rules, forgiveness programmes and repayment plans differ sharply between countries and change frequently.',
    overview: [
      'Student loans behave differently from other debt. Repayment terms are often longer, interest may be subsidised during study, and several systems tie repayments to income rather than to the balance.',
      'That last point matters: under an income-driven plan the balance can grow even while you pay, because the required payment may not cover the accruing interest.'
    ],
    formulaCard: {
      title: 'Standard Repayment',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'Income-driven plans instead calculate payments as a percentage of discretionary income, with any remaining balance potentially forgiven after a set number of years.',
      variables: [
        { symbol: 'Standard term', meaning: 'Commonly 10 years in the US system' },
        { symbol: 'Income-driven', meaning: 'Payment set as a share of discretionary income' },
        { symbol: 'Capitalisation', meaning: 'Unpaid interest being added to the principal' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Student Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your total balance and rate', description: 'If you hold several loans at different rates, run the largest separately.' },
        { stepNumber: 2, title: 'Choose a repayment term', description: 'Ten years is the standard baseline in many systems.' },
        { stepNumber: 3, title: 'Compare against an extended term', description: 'Lower payments, considerably more interest.' },
        { stepNumber: 4, title: 'Test extra payments', description: 'Any amount above the minimum goes straight to principal and shortens the term.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '$38,000 at 6.2%, compared over 10 and 20 years.',
      inputs: [
        { label: 'Balance', value: '$38,000' },
        { label: 'Rate', value: '6.2%' },
        { label: 'Options', value: '10 or 20 years' }
      ],
      steps: [
        '10 years: PMT ≈ $426. Total paid $51,120, interest $13,120.',
        '20 years: PMT ≈ $276. Total paid $66,240, interest $28,240.',
        'The extended term halves neither the payment nor the cost — it saves $150 a month and costs $15,120 more.',
        'Adding $100 a month to the 10-year plan clears it about 22 months early and saves roughly $2,600.'
      ],
      result: '10yr $426/mo ($13,120 interest) · 20yr $276/mo ($28,240 interest)',
      takeaway: 'Extending the term more than doubles the interest. If the standard payment is affordable, taking it and adding extra when possible is usually the cheapest path.'
    },
    sections: [
      {
        id: 'negative-amortisation',
        title: 'When the balance grows while you pay',
        paragraphs: [
          'On income-driven plans, a low income can mean the required payment is less than the interest accruing. The shortfall is added to the balance, so the debt grows despite consistent payment.',
          'This is not necessarily irrational if the plan leads to forgiveness after a set period, since the balance at that point is written off. But it is important to understand that you are paying toward a deadline rather than toward a balance.'
        ],
        callout: { type: 'warning', title: 'Check how forgiveness is taxed', text: 'In some systems a forgiven balance counts as taxable income in the year it is written off, which can produce a large one-off bill.' }
      }
    ],
    faqs: [
      { question: 'Should I pay off student loans early?', answer: 'It depends on the rate. Above roughly 6–7%, prioritising repayment usually beats investing. Below that, and particularly where forgiveness is realistic, paying the minimum and investing the difference may come out ahead.' },
      { question: 'What is the difference between subsidised and unsubsidised loans?', answer: 'Subsidised loans do not accrue interest while you study or during approved deferments, because the government covers it. Unsubsidised loans accrue throughout, and that interest is typically capitalised when repayment starts.' },
      { question: 'Does refinancing student loans make sense?', answer: 'It can lower the rate, but refinancing federal loans into private ones permanently forfeits income-driven repayment, forgiveness eligibility and deferment protections. That trade-off is rarely worth a small rate reduction.' }
    ]
  },

  'debt-ratio-calculator': {
    calculatorId: 'debt-ratio-calculator',
    title: 'Debt-to-Income Ratio Calculator',
    subtitle: 'Work out your front-end and back-end DTI the way lenders do, and see where you sit against typical thresholds.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Lender thresholds vary by product and jurisdiction. Some programmes accept higher ratios with compensating factors such as large reserves or a strong credit score.',
    overview: [
      'Debt-to-income ratio is the single number that most often decides whether a mortgage application succeeds. It compares monthly debt obligations to gross monthly income.',
      'Lenders use two versions: front-end covers housing costs only, back-end covers all recurring debt including the proposed mortgage. The stricter of the two governs.'
    ],
    formulaCard: {
      title: 'Front-End and Back-End DTI',
      formula: 'Back-end DTI = Total monthly debt payments ÷ Gross monthly income × 100',
      explanation: 'Front-end uses housing costs alone. Both use gross income, before tax — which is why a 36% ratio can represent close to half your take-home pay.',
      variables: [
        { symbol: 'Front-end', meaning: 'Housing costs only — commonly capped around 28%' },
        { symbol: 'Back-end', meaning: 'All recurring debt — commonly capped at 36–43%' },
        { symbol: 'Gross income', meaning: 'Before tax and deductions' }
      ]
    },
    howToSteps: {
      title: 'How to Use the DTI Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter gross monthly income', description: 'Before tax. Include only reliable income — lenders discount irregular earnings.' },
        { stepNumber: 2, title: 'List housing costs', description: 'Mortgage or rent, property tax, insurance and any service charges.' },
        { stepNumber: 3, title: 'Add all other debt payments', description: 'Card minimums, car finance, student and personal loans.' },
        { stepNumber: 4, title: 'Compare both ratios to the thresholds', description: 'Exclude utilities, groceries and insurance that is not property-related.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Gross income $6,800 a month, housing $1,750, other debts $620.',
      inputs: [
        { label: 'Gross monthly income', value: '$6,800' },
        { label: 'Housing costs', value: '$1,750' },
        { label: 'Other debt payments', value: '$620' }
      ],
      steps: [
        'Front-end DTI = 1,750 ÷ 6,800 = 25.7%.',
        'Back-end DTI = (1,750 + 620) ÷ 6,800 = 34.9%.',
        'Both sit inside the conventional 28% and 36% guidelines.',
        'Clearing a $350 car payment would drop back-end DTI to 29.7%.'
      ],
      result: 'Front-end 25.7% · Back-end 34.9% — within typical limits',
      takeaway: 'Back-end is the binding constraint here. Because it counts payments rather than balances, clearing a small high-payment debt improves the ratio more than paying down a large low-payment one.'
    },
    sections: [
      {
        id: 'improving-dti',
        title: 'Improving the ratio before applying',
        paragraphs: ['Only two things move DTI — reduce payments or increase income:'],
        bullets: [
          'Clear small debts entirely. Removing a payment helps more than reducing a balance.',
          'Avoid new credit in the months before applying; a new car loan can undo months of preparation.',
          'Refinancing existing debt to a longer term lowers the monthly payment and the ratio, though it raises total cost.',
          'Document all reliable income, including consistent bonus or secondary income a lender will accept.'
        ]
      }
    ],
    faqs: [
      { question: 'What DTI do I need for a mortgage?', answer: 'Conventional guidance is 28% front-end and 36% back-end, though many lenders accept up to 43% or higher for strong applicants. Lower is always better for both approval odds and the rate offered.' },
      { question: 'Which debts count toward DTI?', answer: 'Recurring debt obligations — mortgage or rent, card minimums, car finance, student and personal loans, and legal obligations such as maintenance payments. Utilities, groceries, phone bills and subscriptions do not.' },
      { question: 'Does paying off a credit card improve my DTI?', answer: 'Only if you close or stop using it, since the minimum payment is what counts. Paying the balance to zero while keeping the card open removes the payment from the calculation as long as no balance is carried.' }
    ]
  },

  'debt-consolidation-calculator': {
    calculatorId: 'debt-consolidation-calculator',
    title: 'Debt Consolidation Calculator',
    subtitle: 'Compare your current debts against a single consolidation loan, including fees, to see whether it genuinely saves money.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: LOAN_DISC + ' Consolidating unsecured debt into secured borrowing puts an asset at risk.',
    overview: [
      'Consolidation replaces several debts with one loan. The appeal is a single payment and often a lower rate — but it only saves money if the new blended rate, after fees, beats what you are paying now.',
      'The common failure is behavioural rather than arithmetic: clearing cards and then using them again leaves you with the consolidation loan plus fresh card balances.'
    ],
    formulaCard: {
      title: 'Is Consolidation Worth It?',
      formula: 'Saving = Current total interest − (New loan interest + Fees)',
      explanation: 'Compare total cost to clear, not monthly payments. A longer consolidation term lowers the payment while potentially increasing what you pay overall.',
      variables: [
        { symbol: 'Blended rate', meaning: 'Weighted average rate across your current debts' },
        { symbol: 'Origination fee', meaning: 'Often 1–8%, deducted from the advance' },
        { symbol: 'Term', meaning: 'Longer terms lower payments and raise total interest' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Consolidation Calculator',
      steps: [
        { stepNumber: 1, title: 'List every current debt', description: 'Balance, rate and minimum payment for each.' },
        { stepNumber: 2, title: 'Enter the consolidation offer', description: 'Amount, APR, term and any origination fee.' },
        { stepNumber: 3, title: 'Compare total cost to clear', description: 'Not the monthly payment — the total.' },
        { stepNumber: 4, title: 'Match the term honestly', description: 'Comparing a 5-year consolidation against a 2-year payoff plan is not a fair comparison.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Three debts totalling $22,000 at a blended 19.4%, versus a 5-year consolidation at 12% with a 3% fee.',
      inputs: [
        { label: 'Current debt', value: '$22,000 at ~19.4% blended' },
        { label: 'Current payments', value: '$690/month' },
        { label: 'Consolidation', value: '$22,000 at 12%, 5 years' },
        { label: 'Origination fee', value: '3% ($660)' }
      ],
      steps: [
        'Current plan at $690/month clears in about 42 months, costing roughly $6,900 in interest.',
        'Consolidation at 12% over 60 months: PMT ≈ $489, total interest ≈ $7,340.',
        'Adding the $660 fee gives a total cost of about $8,000.',
        'Keeping the $690 payment on the consolidation loan instead clears it in 39 months for about $4,400.'
      ],
      result: 'Consolidating but keeping the old payment saves roughly $2,500',
      takeaway: 'Consolidation at a lower rate only helps if you keep paying the same amount. Taking the lower payment over a longer term costs more than doing nothing.'
    },
    sections: [
      {
        id: 'when-it-works',
        title: 'When consolidation actually helps',
        paragraphs: ['Three conditions need to hold:'],
        bullets: [
          'The new rate, including fees, is genuinely lower than your blended current rate.',
          'You keep paying at least what you were paying before, rather than taking the lower minimum.',
          'You do not run the cleared balances back up — closing or freezing the cards is often necessary.'
        ],
        callout: { type: 'warning', title: 'Secured consolidation raises the stakes', text: 'Using home equity to clear card debt lowers the rate but converts debt you could not lose your home over into debt you could.' }
      }
    ],
    faqs: [
      { question: 'Does debt consolidation hurt my credit score?', answer: 'Usually a small temporary dip from the hard inquiry and new account, followed by improvement as balances fall and payments stay current. Closing the paid-off cards can hurt utilisation, so consider leaving them open but unused.' },
      { question: 'Is consolidation the same as debt settlement?', answer: 'No. Consolidation repays your debts in full through a new loan. Settlement negotiates to pay less than owed, which damages credit significantly and may create a taxable event.' },
      { question: 'Should I consolidate if the rate is only slightly lower?', answer: 'Probably not, once fees are included. A one or two point improvement is often consumed entirely by an origination fee, particularly over a short remaining term.' }
    ]
  },

  'car-lease-vs-buy-calculator': {
    calculatorId: 'car-lease-vs-buy-calculator',
    title: 'Car Lease vs Buy Calculator',
    subtitle: 'Compare leasing against financing over the same period, including residual value and equity, to see the real cost difference.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: LOAN_DISC + ' Lease terms including mileage limits and wear charges vary significantly — read the contract before signing.',
    overview: [
      'Leasing pays for the depreciation you use rather than the whole car, which is why monthly payments are lower. Buying costs more per month but leaves you owning an asset.',
      'A fair comparison has to run over the same period and count what you own at the end. Comparing a lease payment against a loan payment alone always favours the lease, and always misleads.'
    ],
    formulaCard: {
      title: 'Lease Payment Components',
      formula: 'Lease = Depreciation + Finance charge',
      explanation: 'Depreciation is (capitalised cost − residual) ÷ term. The finance charge is (cap cost + residual) × money factor. Multiply a money factor by 2,400 to get the approximate equivalent APR.',
      variables: [
        { symbol: 'Cap cost', meaning: 'Negotiated price of the vehicle — this is negotiable' },
        { symbol: 'Residual', meaning: 'Predicted value at lease end, set by the lender' },
        { symbol: 'Money factor', meaning: 'Lease interest rate; × 2,400 gives approximate APR' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Lease vs Buy Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the vehicle price', description: 'Use the same negotiated price for both options.' },
        { stepNumber: 2, title: 'Enter the lease terms', description: 'Money factor, residual percentage, term and any upfront payment.' },
        { stepNumber: 3, title: 'Enter the purchase financing', description: 'Rate, term and down payment.' },
        { stepNumber: 4, title: 'Compare over the same period', description: 'Include the car\'s value at the end under the buy option — that is equity you keep.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $38,000 car over 36 months. Lease: 58% residual, 0.00208 money factor. Buy: 6.9% APR with $4,000 down.',
      inputs: [
        { label: 'Vehicle price', value: '$38,000' },
        { label: 'Lease residual', value: '58% ($22,040)' },
        { label: 'Money factor', value: '0.00208 (≈5% APR)' },
        { label: 'Purchase financing', value: '6.9%, $4,000 down' }
      ],
      steps: [
        'Lease depreciation = (38,000 − 22,040) ÷ 36 = $443/month.',
        'Lease finance charge = (38,000 + 22,040) × 0.00208 = $125/month. Lease ≈ $568.',
        'Buy: $34,000 financed at 6.9% over 36 months ≈ $1,048/month.',
        'Over 36 months — lease total $20,448; buy total $41,728 plus $4,000 down = $41,728.',
        'But after 36 months the purchased car is worth roughly $22,040, so net cost ≈ $19,688.'
      ],
      result: 'Lease $20,448 · Buy net of residual value ≈ $19,688',
      takeaway: 'Almost identical over three years, but the outcomes differ entirely: buying leaves you owning a $22,000 asset, leasing leaves you with nothing and the need to start again.'
    },
    sections: [
      {
        id: 'lease-costs',
        title: 'Lease costs that do not appear in the monthly payment',
        paragraphs: ['The advertised payment rarely reflects the full cost:'],
        bullets: [
          'Mileage limits, typically 10,000–15,000 a year, with charges of 15–30 cents per excess mile.',
          'Excess wear and tear assessed at return, which can be substantial.',
          'Acquisition and disposition fees at the start and end.',
          'Gap insurance requirements.',
          'Early termination, which is expensive and sometimes close to the full remaining cost.'
        ],
        callout: { type: 'tip', title: 'Negotiate the cap cost', text: 'Many people accept the sticker price on a lease because the monthly payment is the focus. The capitalised cost is negotiable exactly like a purchase price, and lowering it lowers the payment.' }
      }
    ],
    faqs: [
      { question: 'Is leasing cheaper than buying?', answer: 'Monthly, almost always. Over the long run, rarely — buying and keeping a car well past the loan term is usually the cheapest way to drive, because you eventually have no payment at all.' },
      { question: 'What is a money factor?', answer: 'The lease equivalent of an interest rate, expressed as a small decimal. Multiply by 2,400 for an approximate APR: 0.00208 is roughly 5%.' },
      { question: 'What happens if I go over the mileage limit?', answer: 'You pay a per-mile charge at return, commonly 15–30 cents. Ten thousand excess miles at 25 cents is $2,500 — worth estimating honestly before choosing a mileage allowance.' }
    ]
  },

  'business-loan-calculator': {
    calculatorId: 'business-loan-calculator',
    title: 'Business Loan Calculator',
    subtitle: 'Estimate repayments on commercial financing, including origination fees, and see the true annual cost of borrowing.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: LOAN_DISC + ' Commercial lending often includes covenants, personal guarantees and variable rates not reflected here.',
    overview: [
      'Business lending is priced on risk, and the headline rate often understates the cost. Origination fees, and in some products a factor rate rather than an interest rate, can make an apparently modest loan considerably more expensive.',
      'The figure worth comparing across offers is the effective annual cost, not the quoted rate.'
    ],
    formulaCard: {
      title: 'Payment and True Cost',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'Where a lender quotes a factor rate instead, total repayment = advance × factor. A 1.25 factor on $50,000 means repaying $62,500 regardless of how quickly you repay — so a short term makes the effective APR very high.',
      variables: [
        { symbol: 'Origination fee', meaning: 'Often 1–5%, usually deducted from the advance' },
        { symbol: 'Factor rate', meaning: 'Used in merchant advances; total repaid = advance × factor' },
        { symbol: 'Effective APR', meaning: 'Annualised true cost including fees' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Business Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the amount and term', description: 'Use the amount you actually receive if a fee is deducted upfront.' },
        { stepNumber: 2, title: 'Enter the rate and any fees', description: 'Origination fees materially change the effective cost on short terms.' },
        { stepNumber: 3, title: 'Check the payment against cash flow', description: 'Compare it to your monthly operating surplus, not to revenue.' },
        { stepNumber: 4, title: 'Compare effective APR across offers', description: 'This is the only fair basis when structures differ.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '$80,000 over 4 years at 9.5% with a 3% origination fee.',
      inputs: [
        { label: 'Loan amount', value: '$80,000' },
        { label: 'Rate / term', value: '9.5%, 48 months' },
        { label: 'Origination fee', value: '3% ($2,400)' }
      ],
      steps: [
        'Net advance received = 80,000 − 2,400 = $77,600.',
        'Monthly payment on the full $80,000 ≈ $2,010.',
        'Total repaid = 2,010 × 48 = $96,480.',
        'Total cost = 96,480 − 77,600 = $18,880 on money actually received.',
        'Effective APR ≈ 11.3%, not the quoted 9.5%.'
      ],
      result: 'Payment $2,010/mo · Effective APR ≈ 11.3%',
      takeaway: 'The origination fee adds nearly two percentage points to the real cost. On shorter terms the effect is larger still, because the fee is spread over fewer months.'
    },
    sections: [
      {
        id: 'types',
        title: 'Common commercial products',
        paragraphs: ['Each suits a different need and prices very differently:'],
        bullets: [
          'Term loans — a lump sum repaid over a fixed period. Cheapest for planned investment.',
          'Lines of credit — draw as needed, pay interest only on what is drawn. Good for working capital.',
          'Equipment finance — secured on the asset, so rates are usually lower.',
          'Invoice financing — advances against unpaid invoices, priced as a fee per period outstanding.',
          'Merchant cash advances — repaid as a share of card takings at a factor rate. Fast, and typically the most expensive option by a wide margin.'
        ],
        callout: { type: 'warning', title: 'Factor rates are not interest rates', text: 'A 1.3 factor sounds like 30%. Repaid over six months it is an effective APR well above 60%, because the cost does not reduce with early repayment.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between a factor rate and an interest rate?', answer: 'Interest accrues on the outstanding balance, so repaying early costs less. A factor rate fixes the total repayment upfront, so early repayment saves nothing and the effective APR rises as the term shortens.' },
      { question: 'Will I need a personal guarantee?', answer: 'Frequently, particularly for newer businesses. It makes you personally liable if the business cannot repay, which is a significant commitment worth weighing against the amount borrowed.' },
      { question: 'How much can a business borrow?', answer: 'Typically assessed on revenue, time trading, profitability and credit history. Many lenders cap lending at a multiple of monthly revenue, though secured lending against assets can go considerably higher.' }
    ]
  },

  'boat-loan-calculator': {
    calculatorId: 'boat-loan-calculator',
    title: 'Boat Loan Calculator',
    subtitle: 'Estimate monthly payments on a boat or marine loan across the longer terms typical of marine financing.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: LOAN_DISC,
    overview: [
      'Marine loans run considerably longer than car finance — 15 or 20 years is common on larger vessels. That keeps payments manageable but means paying interest for a long time on an asset that depreciates.',
      'Running costs frequently exceed the loan payment, which is the part most first-time buyers underestimate.'
    ],
    formulaCard: {
      title: 'Amortised Marine Loan',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'Standard amortisation over a longer term. Lenders usually require a larger deposit than for cars, commonly 10–20%, and rates depend on vessel age and type.',
      variables: [
        { symbol: 'P', meaning: 'Amount financed after deposit' },
        { symbol: 'n', meaning: 'Term in months — often 180 or 240' },
        { symbol: 'i', meaning: 'Monthly rate' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Boat Loan Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the purchase price and deposit', description: 'Marine lenders typically expect 10–20% down.' },
        { stepNumber: 2, title: 'Enter the rate and term', description: 'Longer terms are common; check the total interest they produce.' },
        { stepNumber: 3, title: 'Budget running costs separately', description: 'Mooring, insurance, winterisation and maintenance are ongoing and substantial.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $95,000 boat with 15% down at 7.4% over 15 years.',
      inputs: [
        { label: 'Price', value: '$95,000' },
        { label: 'Deposit', value: '$14,250 (15%)' },
        { label: 'Financed', value: '$80,750' },
        { label: 'Rate / term', value: '7.4%, 180 months' }
      ],
      steps: [
        'Monthly rate = 7.4% ÷ 12 = 0.6167%.',
        'PMT ≈ $744/month.',
        'Total paid = 744 × 180 = $133,920.',
        'Interest = 133,920 − 80,750 = $53,170 — about 66% of the amount borrowed.'
      ],
      result: 'Payment $744/mo · Total interest $53,170',
      takeaway: 'A 15-year term on a depreciating asset means paying more than half the purchase price again in interest. A 10-year term raises the payment to about $954 but cuts interest to roughly $33,700.'
    },
    faqs: [
      { question: 'How long are boat loan terms?', answer: 'Commonly 10 to 20 years on larger vessels, considerably longer than car finance. The longer term lowers the payment but substantially increases total interest on an asset that is depreciating.' },
      { question: 'What deposit do marine lenders require?', answer: 'Typically 10–20%, higher than for cars. Older vessels and liveaboards often require more, and some lenders decline vessels above a certain age entirely.' },
      { question: 'What running costs should I budget for?', answer: 'A frequently cited estimate is 10% of the purchase price annually covering mooring, insurance, maintenance, fuel and winter storage. On a $95,000 boat that is around $9,500 a year, comfortably exceeding the loan payment.' }
    ]
  },

  'interest-rate-calculator': {
    calculatorId: 'interest-rate-calculator',
    title: 'Interest Rate Calculator',
    subtitle: 'Work backwards from a payment to find the actual rate, and see the difference between a quoted rate and the APR you really pay.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: LOAN_DISC,
    overview: [
      'Sometimes you know the amount, the payment and the term but not the rate — a dealer quoting only a monthly figure, or an offer that omits the APR. Solving for the rate reveals what is actually being charged.',
      'There is no closed-form solution, so the rate is found iteratively. The important output is the APR, which includes fees and is the only fair basis for comparing offers.'
    ],
    formulaCard: {
      title: 'Solving for the Rate',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'This cannot be rearranged for i algebraically, so it is solved numerically — trying values until the calculated payment matches the actual one.',
      variables: [
        { symbol: 'Nominal rate', meaning: 'The quoted rate, excluding fees' },
        { symbol: 'APR', meaning: 'Rate including fees — the comparable figure' },
        { symbol: 'Effective annual rate', meaning: 'Accounts for compounding frequency' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Interest Rate Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the amount borrowed', description: 'The advance you actually received, net of deducted fees.' },
        { stepNumber: 2, title: 'Enter the monthly payment and term', description: 'Both should be on your agreement.' },
        { stepNumber: 3, title: 'Add any upfront fees', description: 'Including them converts the nominal rate into a true APR.' },
        { stepNumber: 4, title: 'Compare against the quoted rate', description: 'A large gap means fees are doing most of the work.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Borrowing $12,000 with payments of $280 a month for 48 months, and a $400 arrangement fee.',
      inputs: [
        { label: 'Amount', value: '$12,000' },
        { label: 'Payment', value: '$280/month' },
        { label: 'Term', value: '48 months' },
        { label: 'Fee', value: '$400' }
      ],
      steps: [
        'Total repaid = 280 × 48 = $13,440.',
        'Solving iteratively for the rate on $12,000 gives roughly 5.6% nominal.',
        'Net advance after fee = $11,600.',
        'Solving on $11,600 instead gives an APR of about 7.2%.'
      ],
      result: 'Nominal ≈ 5.6% · APR ≈ 7.2%',
      takeaway: 'A $400 fee added 1.6 percentage points to the true cost. This is why comparing quoted rates between lenders with different fee structures is misleading.'
    },
    sections: [
      {
        id: 'apr-vs-rate',
        title: 'Rate, APR and effective rate',
        paragraphs: [
          'The nominal rate drives the payment calculation. APR folds in mandatory fees and is what regulations generally require lenders to disclose for comparison. Effective annual rate additionally accounts for compounding frequency.',
          'For most consumer borrowing, APR is the figure to compare. Between two loans with identical APRs, the one with lower upfront fees is preferable if there is any chance you will repay early.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the difference between interest rate and APR?', answer: 'The interest rate determines the payment. APR includes mandatory fees expressed as an annual rate, making it the fairer comparison between offers with different fee structures.' },
      { question: 'Why can I not just rearrange the formula for the rate?', answer: 'Because the rate appears both inside and outside an exponent, the equation has no algebraic solution. It is solved numerically by trying values until the computed payment matches the known one.' },
      { question: 'Is a lower APR always better?', answer: 'Usually, but not if you plan to repay early. A loan with a low APR achieved through high upfront fees can cost more than a slightly higher-rate loan with no fees if settled well before term.' }
    ]
  },

  'ppf-calculator': {
    calculatorId: 'ppf-calculator',
    title: 'PPF Calculator',
    subtitle: 'Calculate Public Provident Fund maturity over the 15-year term, with year-by-year interest and the effect of extending.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'PPF interest rates are set quarterly by the Government of India and change. Contribution limits and rules are subject to revision — verify current terms before relying on a projection.',
    overview: [
      'The Public Provident Fund is a long-term Indian government-backed savings scheme with a 15-year lock-in. Its main attraction is tax treatment: contributions are deductible, interest is exempt, and maturity proceeds are tax-free.',
      'That combination is rare, and it is why PPF returns compare favourably with taxable deposits paying a higher headline rate.'
    ],
    formulaCard: {
      title: 'PPF Accumulation',
      formula: 'Balance = Σ [Annual deposit × (1 + r)^(years remaining)]',
      explanation: 'Interest is calculated on the lowest balance between the 5th and last day of each month, then credited annually. Depositing before the 5th of the month therefore earns a full month of interest.',
      variables: [
        { symbol: 'Lock-in', meaning: '15 years, extendable in 5-year blocks' },
        { symbol: 'Annual limit', meaning: 'Capped by government rules; verify the current figure' },
        { symbol: 'EEE', meaning: 'Exempt on contribution, interest and maturity' }
      ]
    },
    howToSteps: {
      title: 'How to Use the PPF Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your annual contribution', description: 'Within the permitted minimum and maximum.' },
        { stepNumber: 2, title: 'Enter the current interest rate', description: 'Set quarterly by government; projections assume it holds.' },
        { stepNumber: 3, title: 'Review the year-by-year table', description: 'Shows how heavily the final years contribute to the total.' },
        { stepNumber: 4, title: 'Model an extension', description: 'Extending in 5-year blocks compounds a much larger base.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Depositing ₹1,50,000 a year for 15 years at 7.1%.',
      inputs: [
        { label: 'Annual deposit', value: '₹1,50,000' },
        { label: 'Rate', value: '7.1%' },
        { label: 'Term', value: '15 years' }
      ],
      steps: [
        'Total deposited = 1,50,000 × 15 = ₹22,50,000.',
        'Maturity value ≈ ₹40,68,000.',
        'Interest earned ≈ ₹18,18,000, entirely tax-free.',
        'Extending one 5-year block to year 20 takes the maturity to roughly ₹66,58,000.'
      ],
      result: 'Maturity ≈ ₹40.68 lakh · Interest ≈ ₹18.18 lakh tax-free',
      takeaway: 'The five-year extension adds roughly ₹26 lakh for ₹7.5 lakh of further deposits, because the extension compounds an already-large balance.'
    },
    sections: [
      {
        id: 'deposit-timing',
        title: 'Deposit before the 5th',
        paragraphs: [
          'Interest is calculated on the minimum balance between the 5th and the last day of each month. A deposit made on the 6th earns nothing for that month.',
          'Depositing the full annual amount in early April, at the start of the financial year, maximises interest for the year. Over fifteen years this timing difference alone is worth a meaningful sum.'
        ],
        callout: { type: 'tip', title: 'Partial withdrawals and loans', text: 'Partial withdrawal is permitted from the seventh year, and loans against the balance from the third to sixth. The lock-in is long but not absolute.' }
      }
    ],
    faqs: [
      { question: 'Is PPF interest taxable?', answer: 'No. PPF has exempt-exempt-exempt status in India — contributions are deductible, interest accrues tax-free, and the maturity amount is not taxed. This makes its effective return higher than a taxable deposit at the same rate.' },
      { question: 'Can I withdraw before 15 years?', answer: 'Partial withdrawals are permitted from the seventh year, subject to limits. Loans against the balance are available between the third and sixth years. Full premature closure is allowed only in specified circumstances.' },
      { question: 'What happens after 15 years?', answer: 'You can withdraw the full balance, or extend in five-year blocks with or without further contributions. Extension is often attractive because the interest is now compounding on a large tax-free base.' }
    ]
  },

  'net-worth-calculator': {
    calculatorId: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    subtitle: 'Add up assets and debts to find your net worth, and see which liabilities are holding the number down.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Net worth is the single clearest measure of financial position: everything you own minus everything you owe. Income tells you what is coming in; net worth tells you what you have actually kept.',
      'The figure matters less than its direction. Tracking it once or twice a year shows whether decisions are compounding in your favour.'
    ],
    formulaCard: {
      title: 'Net Worth',
      formula: 'Net worth = Total assets − Total liabilities',
      explanation: 'Assets are valued at what they would realistically sell for today, not what you paid. Liabilities are current outstanding balances, not original amounts borrowed.',
      variables: [
        { symbol: 'Liquid assets', meaning: 'Cash and anything convertible quickly without loss' },
        { symbol: 'Illiquid assets', meaning: 'Property, pensions, vehicles' },
        { symbol: 'Liabilities', meaning: 'Mortgages, loans, card balances, tax owed' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Net Worth Calculator',
      steps: [
        { stepNumber: 1, title: 'List your assets at realistic values', description: 'Current market value, not purchase price or sentimental value.' },
        { stepNumber: 2, title: 'List every liability', description: 'Include balances people often forget, such as tax owed and buy-now-pay-later.' },
        { stepNumber: 3, title: 'Review the composition', description: 'A high net worth held entirely in illiquid assets behaves very differently from a liquid one.' },
        { stepNumber: 4, title: 'Repeat annually', description: 'The trend is the useful output, not the snapshot.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A household with a home, pension, savings and several debts.',
      inputs: [
        { label: 'Home', value: '$380,000' },
        { label: 'Pension and investments', value: '$142,000' },
        { label: 'Cash and vehicles', value: '$38,000' },
        { label: 'Mortgage and other debt', value: '$268,000' }
      ],
      steps: [
        'Total assets = 380,000 + 142,000 + 38,000 = $560,000.',
        'Total liabilities = $268,000.',
        'Net worth = 560,000 − 268,000 = $292,000.',
        'Liquid net worth, excluding home and pension, = 38,000 − 28,000 non-mortgage debt = $10,000.'
      ],
      result: 'Net worth $292,000 · Liquid net worth $10,000',
      takeaway: 'A healthy headline figure with very little accessible. Net worth and liquidity are different questions, and a strong net worth can still coexist with real short-term fragility.'
    },
    sections: [
      {
        id: 'what-counts',
        title: 'Valuing assets honestly',
        paragraphs: ['Overstating assets is the most common error:'],
        bullets: [
          'Use realistic resale values for cars and possessions, not insured or purchase values.',
          'Value property conservatively, ideally on recent comparable sales rather than an optimistic estimate.',
          'Count pensions at current transfer value, recognising they are inaccessible for now.',
          'Exclude possessions you would never actually sell — they inflate the number without improving your position.'
        ]
      }
    ],
    faqs: [
      { question: 'Should I include my home in net worth?', answer: 'Yes, at realistic market value, with the outstanding mortgage as a liability. Just be aware that home equity is illiquid — it counts toward net worth but cannot pay a bill next week.' },
      { question: 'What is a good net worth?', answer: 'There is no universal figure, since it depends entirely on age, income and location. The more useful test is whether yours is rising year on year and whether the composition is improving.' },
      { question: 'Is negative net worth a problem?', answer: 'Not necessarily, and it is common early in a career with student debt or a new mortgage. What matters is the trajectory — negative but improving is a very different position from negative and worsening.' }
    ]
  },

  'depreciation-calculator': {
    calculatorId: 'depreciation-calculator',
    title: 'Depreciation Calculator',
    subtitle: 'Calculate annual depreciation and book value year by year, with salvage value and useful life factored in.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Depreciation methods permitted for tax purposes are set by tax authorities and differ from accounting treatment. Consult an accountant for tax filings.',
    overview: [
      'Depreciation spreads the cost of an asset across the years it is used, rather than expensing it all at purchase. This matches cost to the revenue the asset helps generate.',
      'Straight-line is the simplest and most common method, charging an equal amount each year.'
    ],
    formulaCard: {
      title: 'Straight-Line Depreciation',
      formula: 'Annual depreciation = (Cost − Salvage value) ÷ Useful life',
      explanation: 'Book value falls by that amount each year until it reaches salvage value. Accelerated methods such as declining balance charge more in early years.',
      variables: [
        { symbol: 'Cost', meaning: 'Purchase price plus costs of bringing it into use' },
        { symbol: 'Salvage value', meaning: 'Expected value at the end of useful life' },
        { symbol: 'Useful life', meaning: 'Years the asset is expected to be productive' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Depreciation Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the asset cost', description: 'Include delivery, installation and any cost of making it usable.' },
        { stepNumber: 2, title: 'Enter the expected salvage value', description: 'Zero is acceptable if the asset will have no residual worth.' },
        { stepNumber: 3, title: 'Enter useful life in years', description: 'Tax authorities often prescribe this by asset class.' },
        { stepNumber: 4, title: 'Review the schedule', description: 'Shows the charge and closing book value for each year.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Equipment costing $45,000 with a $5,000 salvage value over 8 years.',
      inputs: [
        { label: 'Cost', value: '$45,000' },
        { label: 'Salvage value', value: '$5,000' },
        { label: 'Useful life', value: '8 years' }
      ],
      steps: [
        'Depreciable base = 45,000 − 5,000 = $40,000.',
        'Annual charge = 40,000 ÷ 8 = $5,000.',
        'Year 1 closing book value = $40,000.',
        'Year 8 closing book value = $5,000, equal to salvage value.'
      ],
      result: '$5,000 a year · Book value falls from $45,000 to $5,000',
      takeaway: 'Straight-line assumes the asset delivers value evenly. For equipment that is most productive when new, an accelerated method often reflects reality better.'
    },
    sections: [
      {
        id: 'methods',
        title: 'Other depreciation methods',
        paragraphs: ['Straight-line is the default, but not always the most appropriate:'],
        bullets: [
          'Declining balance applies a fixed percentage to the reducing book value, front-loading the charge.',
          'Double declining balance accelerates that further, common for technology.',
          'Units of production charges by actual usage, which suits machinery with variable output.',
          'Sum-of-years-digits is another accelerated method, less common now.'
        ],
        callout: { type: 'info', title: 'Book and tax depreciation differ', text: 'Companies frequently use straight-line in their accounts while claiming an accelerated method for tax, because the two serve different purposes.' }
      }
    ],
    faqs: [
      { question: 'What is straight-line depreciation?', answer: 'An equal charge each year, calculated as cost minus salvage value divided by useful life. It is the simplest method and the most widely used in financial reporting.' },
      { question: 'How do I estimate useful life?', answer: 'Tax authorities publish expected lives by asset class, and those are the safest basis for tax purposes. For internal accounting, use a realistic estimate of how long the asset will genuinely be productive.' },
      { question: 'What happens when an asset is fully depreciated?', answer: 'It remains on the books at salvage value and can still be used. If sold for more than book value, the excess is generally taxable as a gain.' }
    ]
  },

  'irr-calculator': {
    calculatorId: 'irr-calculator',
    title: 'IRR Calculator',
    subtitle: 'Find the internal rate of return on an uneven series of cash flows, and compare it against your required rate.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'IRR assumes interim cash flows are reinvested at the IRR itself, which rarely happens. For projects with unconventional cash flows, multiple IRRs can exist.',
    overview: [
      'Internal rate of return is the discount rate at which a project\'s net present value equals zero. Put plainly, it is the annualised return the cash flows imply.',
      'Unlike simple ROI, it accounts for when money arrives — which matters, because cash received early can be put to work again.'
    ],
    formulaCard: {
      title: 'IRR Definition',
      formula: '0 = Σ [CFₜ ÷ (1 + IRR)ᵗ]',
      explanation: 'There is no algebraic solution; IRR is found by iteration. A project is generally worth pursuing if its IRR exceeds your cost of capital or required return.',
      variables: [
        { symbol: 'CFₜ', meaning: 'Cash flow in period t, negative for outflows' },
        { symbol: 'IRR', meaning: 'The rate that makes NPV zero' },
        { symbol: 'Hurdle rate', meaning: 'Minimum return you require' }
      ]
    },
    howToSteps: {
      title: 'How to Use the IRR Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the initial investment', description: 'As a negative figure — it is an outflow.' },
        { stepNumber: 2, title: 'Enter each period\'s cash flow', description: 'These can vary and can be negative in any period.' },
        { stepNumber: 3, title: 'Compare IRR to your hurdle rate', description: 'Above it, the project adds value on this measure.' },
        { stepNumber: 4, title: 'Check NPV as well', description: 'IRR ignores scale; NPV does not.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An investment of $50,000 returning $15,000, $18,000, $20,000 and $12,000 over four years.',
      inputs: [
        { label: 'Year 0', value: '−$50,000' },
        { label: 'Years 1–4', value: '$15,000 · $18,000 · $20,000 · $12,000' }
      ],
      steps: [
        'Total returned = $65,000 on $50,000 invested.',
        'Simple ROI = 30%, but that ignores timing entirely.',
        'Solving for the rate that makes NPV zero gives an IRR of about 11.4%.',
        'Against a 9% hurdle rate, the project clears it.'
      ],
      result: 'IRR ≈ 11.4% · exceeds a 9% hurdle',
      takeaway: 'The 30% simple return over four years sounds better than 11.4%, but the annualised figure is the one that compares fairly against other opportunities.'
    },
    sections: [
      {
        id: 'irr-limits',
        title: 'Where IRR misleads',
        paragraphs: ['It is widely used and widely misapplied:'],
        bullets: [
          'It assumes interim cash flows are reinvested at the IRR, which is usually optimistic. Modified IRR addresses this.',
          'It ignores scale — a 40% IRR on $10,000 creates less value than 15% on $1,000,000.',
          'Cash flows that change sign more than once can produce multiple mathematically valid IRRs.',
          'It says nothing about risk, so a high IRR on a speculative project is not comparable to a lower one on a safe project.'
        ],
        callout: { type: 'tip', title: 'Use NPV alongside it', text: 'NPV measures value created in currency terms and handles scale properly. IRR is the more intuitive number; NPV is the more reliable decision rule.' }
      }
    ],
    faqs: [
      { question: 'What is a good IRR?', answer: 'One that exceeds your cost of capital or required return with an adequate margin for risk. There is no universal threshold — an acceptable IRR for infrastructure is very different from one for early-stage investment.' },
      { question: 'What is the difference between IRR and ROI?', answer: 'ROI is a total return over the whole period and ignores timing. IRR is annualised and accounts for when each cash flow occurs, which makes it the better comparison between projects of different lengths.' },
      { question: 'Why does my project show more than one IRR?', answer: 'Because the cash flows change sign more than once — for example an outflow, then inflows, then a further large outflow. Mathematically several rates can satisfy the equation. Use NPV instead in that situation.' }
    ]
  },

  'payback-period-calculator': {
    calculatorId: 'payback-period-calculator',
    title: 'Payback Period Calculator',
    subtitle: 'Work out how long an investment takes to repay its cost, with both simple and discounted payback shown.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Payback period answers a narrow but important question: how long until I get my money back? It is popular because it is intuitive and because it proxies for risk — a shorter payback means less time exposed.',
      'Its weakness is that it ignores everything after the payback point, so a project that repays quickly then stops can score better than one that repays slowly and continues earning for years.'
    ],
    formulaCard: {
      title: 'Simple and Discounted Payback',
      formula: 'Payback = Years before recovery + (Unrecovered ÷ Cash flow that year)',
      explanation: 'Discounted payback applies a discount rate to each cash flow first, which lengthens the period and reflects the time value of money.',
      variables: [
        { symbol: 'Initial investment', meaning: 'Total upfront outflow' },
        { symbol: 'Cash flow', meaning: 'Net inflow per period' },
        { symbol: 'Discount rate', meaning: 'Used for discounted payback only' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Payback Period Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the initial investment', description: 'All upfront costs.' },
        { stepNumber: 2, title: 'Enter cash flow per period', description: 'Uneven flows are handled year by year.' },
        { stepNumber: 3, title: 'Add a discount rate if wanted', description: 'For the discounted payback figure.' },
        { stepNumber: 4, title: 'Use it alongside NPV or IRR', description: 'Payback alone is not enough to choose between projects.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $60,000 investment returning $18,000 a year, with a 10% discount rate.',
      inputs: [
        { label: 'Investment', value: '$60,000' },
        { label: 'Annual cash flow', value: '$18,000' },
        { label: 'Discount rate', value: '10%' }
      ],
      steps: [
        'Simple payback = 60,000 ÷ 18,000 = 3.33 years.',
        'Discounted: year 1 = $16,364, year 2 = $14,876, year 3 = $13,524, year 4 = $12,294.',
        'Cumulative after 4 years = $57,058 — still short.',
        'Year 5 discounted = $11,177, so payback occurs partway through year 5.'
      ],
      result: 'Simple payback 3.33 years · Discounted ≈ 4.3 years',
      takeaway: 'Discounting adds nearly a year. The simple figure consistently flatters an investment by treating future money as worth as much as money today.'
    },
    faqs: [
      { question: 'What is a good payback period?', answer: 'It depends entirely on the industry and the asset life. Equipment expected to last ten years might justify a four-year payback; a fast-changing technology investment usually needs to repay far sooner.' },
      { question: 'Why use discounted payback?', answer: 'Because money received in five years is worth less than money received today. Simple payback ignores this and therefore always produces an optimistic figure.' },
      { question: 'Is payback period better than NPV?', answer: 'No, but it answers a different question. NPV measures total value created; payback measures how long capital is at risk. Use payback as a supporting check rather than the primary decision rule.' }
    ]
  },

  'college-cost-calculator': {
    calculatorId: 'college-cost-calculator',
    title: 'College Cost Calculator',
    subtitle: 'Project future tuition against education inflation and find the monthly saving needed to cover it.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Education inflation has historically outpaced general inflation, but past trends do not guarantee future rates. 529 and equivalent plan rules vary by jurisdiction.',
    overview: [
      'Education costs have historically risen faster than general inflation, which makes projecting them forward essential. A figure based on today\'s fees will substantially understate the cost for a child born now.',
      'The calculation has two halves: what the education will cost when it starts, and what monthly saving reaches that figure in time.'
    ],
    formulaCard: {
      title: 'Future Cost and Required Saving',
      formula: 'Future cost = Current cost × (1 + education inflation)ⁿ',
      explanation: 'Then solve the standard future value formula for the monthly contribution needed to reach that figure by the start date.',
      variables: [
        { symbol: 'Education inflation', meaning: 'Historically above general inflation — often 4–6%' },
        { symbol: 'n', meaning: 'Years until the first year of study' },
        { symbol: 'Return', meaning: 'Expected growth on savings, typically lower as the date nears' }
      ]
    },
    howToSteps: {
      title: 'How to Use the College Cost Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter current annual cost', description: 'Tuition plus accommodation and living costs, which are often the larger share.' },
        { stepNumber: 2, title: 'Enter years until study begins', description: 'And the number of years of study.' },
        { stepNumber: 3, title: 'Set an education inflation rate', description: 'Using general inflation here will understate the total.' },
        { stepNumber: 4, title: 'Enter current savings and return', description: 'To find the additional monthly amount required.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Current cost $28,000 a year, study starting in 14 years, four years of study, 5% education inflation, 6% return, $10,000 already saved.',
      inputs: [
        { label: 'Current annual cost', value: '$28,000' },
        { label: 'Years until start', value: '14' },
        { label: 'Education inflation', value: '5%' },
        { label: 'Already saved', value: '$10,000' }
      ],
      steps: [
        'Cost in year one of study = 28,000 × (1.05)¹⁴ = $55,440.',
        'Four years with continued inflation ≈ $238,800 total.',
        'Existing $10,000 grows at 6% for 14 years = $22,600.',
        'Remaining to fund ≈ $216,200 → required monthly saving ≈ $845.'
      ],
      result: 'Projected cost ≈ $238,800 · Required saving ≈ $845/month',
      takeaway: 'Education inflation nearly doubles the cost over fourteen years. Planning against today\'s fees would leave a shortfall of well over $100,000.'
    },
    sections: [
      {
        id: 'reducing',
        title: 'The total does not all have to be saved',
        paragraphs: [
          'Few families fund the entire projected cost from savings, and treating the full figure as a savings target can be discouraging to the point of paralysis.',
          'Scholarships, grants, student contribution from part-time work, in-state or local institutions, and a reasonable level of student borrowing all reduce what needs saving. Partial funding materially reduces the debt burden even where full funding is unrealistic.'
        ],
        callout: { type: 'tip', title: 'Shift risk down as the date approaches', text: 'Education savings have a fixed deadline. Moving from equities toward cash and bonds in the last few years protects against a market fall arriving exactly when the fees are due.' }
      }
    ],
    faqs: [
      { question: 'How much should I save for a child\'s education?', answer: 'Work backwards from a realistic projected cost and what proportion you intend to fund. Many families target a third to a half, expecting scholarships, student contribution and some borrowing to cover the rest.' },
      { question: 'Why use a higher inflation rate for education?', answer: 'Education costs have historically risen faster than general prices. Using a general inflation figure would understate the eventual total, sometimes substantially over a long horizon.' },
      { question: 'What is a 529 plan?', answer: 'A US tax-advantaged education savings account where growth and qualified withdrawals are tax-free. Many countries have equivalents. The tax treatment usually makes them preferable to a general investment account for this purpose.' }
    ]
  }
};
