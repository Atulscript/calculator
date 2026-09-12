import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator11 Editorial Team',
  role: 'Personal Finance Desk',
  lastUpdated: 'September 2026'
};

const PROJ = 'Projections assume a constant rate of return, which no real portfolio delivers. Contribution limits, tax treatment and eligibility rules are set by government and change. This is general information, not investment or tax advice.';

/** Retirement accounts, fixed income and investment-return articles. */
export const FINANCE_INVEST_ARTICLES: Record<string, CalculatorArticle> = {
  'roth-ira-calculator': {
    calculatorId: 'roth-ira-calculator',
    title: 'Roth IRA Calculator',
    subtitle: 'Project Roth IRA growth and compare after-tax outcomes against a traditional IRA, including contribution and income limits.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: PROJ,
    overview: [
      'A Roth IRA is funded with money you have already paid tax on. In exchange, qualified withdrawals in retirement — including all the growth — are entirely tax-free.',
      'The decision between Roth and traditional comes down to one question you cannot answer with certainty: will your tax rate in retirement be higher or lower than it is now?'
    ],
    formulaCard: {
      title: 'Growth of Regular Contributions',
      formula: 'FV = P × (1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]',
      explanation: 'The same compounding maths as any investment account. What differs is tax: with a Roth the entire final balance is spendable, whereas a traditional balance is reduced by income tax on withdrawal.',
      variables: [
        { symbol: 'PMT', meaning: 'Annual contribution, capped by the IRS limit' },
        { symbol: 'r', meaning: 'Expected annual return' },
        { symbol: 'Qualified', meaning: 'Age 59½ and the account open five years' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Roth IRA Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your age and retirement age', description: 'The gap is your compounding period — the strongest single factor.' },
        { stepNumber: 2, title: 'Enter annual contribution', description: 'Check the current IRS limit, which includes a catch-up allowance from age 50.' },
        { stepNumber: 3, title: 'Set an expected return', description: '5–7% real is a common long-run planning assumption for a diversified portfolio.' },
        { stepNumber: 4, title: 'Compare against traditional', description: 'Enter your current and expected retirement tax rates to see which comes out ahead.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Contributing $7,000 a year from age 30 to 65 at a 6% return.',
      inputs: [
        { label: 'Annual contribution', value: '$7,000' },
        { label: 'Years', value: '35' },
        { label: 'Return', value: '6%' }
      ],
      steps: [
        'FV = 7,000 × [((1.06)³⁵ − 1) ÷ 0.06] = $779,700.',
        'Total contributed = 7,000 × 35 = $245,000.',
        'Growth = $534,700, all of it tax-free on qualified withdrawal.',
        'In a traditional IRA taxed at 22% on withdrawal, the same balance is worth about $608,200 spendable.'
      ],
      result: 'Roth balance ≈ $779,700, fully spendable',
      takeaway: 'The Roth wins here because the tax rate at withdrawal was assumed equal to the rate during contribution. If your retirement rate were lower, traditional would come out ahead.'
    },
    sections: [
      {
        id: 'roth-advantages',
        title: 'What a Roth offers beyond tax-free growth',
        paragraphs: ['Several features are easy to overlook:'],
        bullets: [
          'Contributions — not earnings — can be withdrawn at any time without tax or penalty.',
          'No required minimum distributions during the original owner\'s lifetime, unlike a traditional IRA.',
          'Tax diversification: having both types lets you manage which bracket you draw into each year.',
          'Useful when you expect higher future tax rates, or are early in a career with rising income.'
        ],
        callout: { type: 'info', title: 'Income limits apply', text: 'Direct Roth contributions phase out above an income threshold. A backdoor Roth conversion is a legal route above it, but has tax consequences worth understanding first.' }
      }
    ],
    faqs: [
      { question: 'Roth or traditional IRA — which is better?', answer: 'Roth is generally better if your tax rate in retirement will be higher than today; traditional if it will be lower. Since nobody knows future tax rates, many people contribute to both and keep the choice open.' },
      { question: 'Can I withdraw from a Roth IRA early?', answer: 'You can withdraw your own contributions at any time without tax or penalty, because tax was already paid. Withdrawing earnings before 59½ and before the account is five years old generally triggers both.' },
      { question: 'What if I earn too much to contribute?', answer: 'Direct contributions phase out above an income limit. A backdoor Roth — contributing to a traditional IRA then converting — is a recognised route, though the pro-rata rule can create a tax bill if you hold other pre-tax IRA money.' }
    ]
  },

  'ira-calculator': {
    calculatorId: 'ira-calculator',
    title: 'Traditional IRA Calculator',
    subtitle: 'Project a traditional IRA balance, see the value of the upfront deduction, and estimate required minimum distributions.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: PROJ,
    overview: [
      'A traditional IRA gives a tax deduction now and taxes withdrawals later. The immediate benefit is a lower tax bill this year; the cost is that every dollar withdrawn in retirement is taxable income.',
      'It suits people currently in a high tax bracket who expect a lower one in retirement — the opposite case to a Roth.'
    ],
    formulaCard: {
      title: 'Growth and After-Tax Value',
      formula: 'After-tax value = FV × (1 − retirement tax rate)',
      explanation: 'The balance grows tax-deferred, but the headline figure overstates what you can spend. Comparing against a Roth requires applying the expected withdrawal tax rate.',
      variables: [
        { symbol: 'Deduction', meaning: 'Contribution reduces this year\'s taxable income, subject to limits' },
        { symbol: 'Tax-deferred', meaning: 'No tax on growth until withdrawal' },
        { symbol: 'RMD', meaning: 'Required minimum distribution, beginning in your 70s' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Traditional IRA Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter contribution and timeframe', description: 'Contributions are capped annually by the IRS.' },
        { stepNumber: 2, title: 'Enter your current tax rate', description: 'This determines the value of the upfront deduction.' },
        { stepNumber: 3, title: 'Estimate your retirement tax rate', description: 'This is what withdrawals will be taxed at.' },
        { stepNumber: 4, title: 'Compare gross and after-tax balances', description: 'The after-tax figure is the fair comparison against a Roth.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '$7,000 a year for 30 years at 6%, contributing at a 24% tax rate and withdrawing at 18%.',
      inputs: [
        { label: 'Annual contribution', value: '$7,000' },
        { label: 'Years / return', value: '30 years, 6%' },
        { label: 'Tax now', value: '24%' },
        { label: 'Tax in retirement', value: '18%' }
      ],
      steps: [
        'Gross balance = 7,000 × [((1.06)³⁰ − 1) ÷ 0.06] = $553,400.',
        'After-tax at 18% = 553,400 × 0.82 = $453,800.',
        'Annual tax saved during contributions = 7,000 × 0.24 = $1,680.',
        'Over 30 years the deductions saved roughly $50,400 in current-year tax.'
      ],
      result: 'Gross $553,400 · After-tax ≈ $453,800',
      takeaway: 'Dropping six points of tax rate between contribution and withdrawal is what makes traditional win here. If the rate were higher in retirement, the Roth would have been the better choice.'
    },
    sections: [
      {
        id: 'rmds',
        title: 'Required minimum distributions',
        paragraphs: [
          'Traditional IRAs require you to begin withdrawing a minimum amount each year once you reach the qualifying age, whether you need the money or not. The amount is based on your balance and life expectancy.',
          'This matters for planning because forced withdrawals are taxable income and can push you into a higher bracket. Roth IRAs have no RMD during the owner\'s lifetime, which is one of their quieter advantages.'
        ],
        callout: { type: 'warning', title: 'The penalty is severe', text: 'Failing to take a required distribution has historically carried a substantial excise tax on the shortfall. Diarise it once withdrawals begin.' }
      }
    ],
    faqs: [
      { question: 'Is my IRA contribution always tax-deductible?', answer: 'Not always. If you or a spouse is covered by a workplace retirement plan, the deduction phases out above certain income levels. You can still contribute, but without the deduction the case for traditional over Roth weakens considerably.' },
      { question: 'When do required minimum distributions start?', answer: 'In your early-to-mid seventies under current rules, though the exact age has changed several times. Check the current threshold, since the penalty for missing one is significant.' },
      { question: 'Can I have both a traditional and a Roth IRA?', answer: 'Yes, but the annual contribution limit applies across both combined, not to each separately. Splitting contributions is a common way to hedge uncertainty about future tax rates.' }
    ]
  },

  'pension-calculator': {
    calculatorId: 'pension-calculator',
    title: 'Pension Forecast Calculator',
    subtitle: 'Estimate the annual pension your service and salary will produce, and what a few more years of contributions would add.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: PROJ + ' Defined benefit schemes have scheme-specific rules on accrual, revaluation and early retirement reductions — your scheme handbook is authoritative.',
    overview: [
      'Pension schemes come in two shapes that work very differently. A defined benefit scheme promises an income based on your salary and years of service. A defined contribution scheme builds a pot whose eventual income depends on investment returns.',
      'This calculator handles the defined benefit calculation, which is the one people find hardest to estimate.'
    ],
    formulaCard: {
      title: 'Defined Benefit Pension',
      formula: 'Annual pension = Years of service × Accrual rate × Pensionable salary',
      explanation: 'A 1/60th accrual rate over 30 years gives 30/60 = 50% of pensionable salary. Career-average schemes revalue each year\'s earnings rather than using a final salary.',
      variables: [
        { symbol: 'Accrual rate', meaning: 'Fraction earned per year, commonly 1/60 or 1/80' },
        { symbol: 'Pensionable salary', meaning: 'Final or career-average, depending on the scheme' },
        { symbol: 'Service', meaning: 'Complete years of scheme membership' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Pension Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter years of service', description: 'Include any transferred-in service the scheme recognises.' },
        { stepNumber: 2, title: 'Enter pensionable salary', description: 'This may exclude bonuses and overtime — check your scheme rules.' },
        { stepNumber: 3, title: 'Enter the accrual rate', description: 'Usually shown in your annual benefit statement as a fraction.' },
        { stepNumber: 4, title: 'Test a later retirement age', description: 'Extra years add service and avoid early-retirement reductions.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '28 years of service on a 1/60th accrual rate with a pensionable salary of £48,000.',
      inputs: [
        { label: 'Years of service', value: '28' },
        { label: 'Accrual rate', value: '1/60' },
        { label: 'Pensionable salary', value: '£48,000' }
      ],
      steps: [
        'Fraction earned = 28 ÷ 60 = 0.4667.',
        'Annual pension = 0.4667 × 48,000 = £22,400.',
        'Working three more years: 31 ÷ 60 × 48,000 = £24,800.',
        'Those three years add £2,400 a year for life.'
      ],
      result: 'Pension ≈ £22,400 a year · £24,800 after three more years',
      takeaway: 'Each additional year of service is worth 1/60th of salary annually for the rest of your life — around £800 a year here. Over a 25-year retirement that single year is worth roughly £20,000.'
    },
    faqs: [
      { question: 'What is the difference between defined benefit and defined contribution?', answer: 'Defined benefit promises a specific income based on salary and service, with the employer carrying the investment risk. Defined contribution builds a pot whose value depends on returns, with you carrying the risk.' },
      { question: 'What does a 1/60th accrual rate mean?', answer: 'You earn 1/60th of your pensionable salary as annual pension for each year of service. Thirty years gives 30/60, or half your pensionable salary.' },
      { question: 'What happens if I retire early?', answer: 'Most schemes apply an actuarial reduction, because the pension is paid for longer. The reduction is typically several percent for each year before normal pension age and is usually permanent.' }
    ]
  },

  'social-security-calculator': {
    calculatorId: 'social-security-calculator',
    title: 'Social Security Calculator',
    subtitle: 'Estimate your monthly benefit and see how claiming at 62, full retirement age or 70 changes it for the rest of your life.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: PROJ + ' Benefit formulas, bend points and full retirement age are set by the Social Security Administration. Your personal statement at ssa.gov is the authoritative estimate.',
    overview: [
      'Social Security pays a monthly benefit based on your highest 35 years of indexed earnings. The single largest decision is when to claim — the difference between the earliest and latest options is roughly 76% more per month for life.',
      'There is no universally correct answer. It depends on health, other income, and whether a spouse will claim on your record.'
    ],
    formulaCard: {
      title: 'Claiming Age Adjustment',
      formula: 'Benefit = PIA × Claiming factor',
      explanation: 'PIA is the primary insurance amount payable at full retirement age. Claiming early reduces it permanently; delaying past FRA increases it by roughly 8% a year until 70.',
      variables: [
        { symbol: 'PIA', meaning: 'Benefit at full retirement age, from your 35 highest indexed years' },
        { symbol: 'Age 62', meaning: 'Earliest claim — roughly 70–75% of PIA' },
        { symbol: 'Age 70', meaning: 'Latest useful claim — roughly 124–132% of PIA' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Social Security Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your estimated benefit at full retirement age', description: 'Take this from your ssa.gov statement rather than guessing.' },
        { stepNumber: 2, title: 'Enter your birth year', description: 'Full retirement age depends on it — 67 for those born in 1960 or later.' },
        { stepNumber: 3, title: 'Compare claiming ages', description: 'The calculator shows monthly and cumulative totals for each option.' },
        { stepNumber: 4, title: 'Look at the break-even age', description: 'The age at which delaying overtakes claiming early in total dollars received.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A PIA of $2,400 at a full retirement age of 67.',
      inputs: [
        { label: 'PIA at FRA 67', value: '$2,400' },
        { label: 'Claim at 62', value: '70% of PIA' },
        { label: 'Claim at 70', value: '124% of PIA' }
      ],
      steps: [
        'At 62: 2,400 × 0.70 = $1,680/month.',
        'At 67: $2,400/month.',
        'At 70: 2,400 × 1.24 = $2,976/month.',
        'Claiming at 70 rather than 62 is $1,296 more per month — 77% higher.',
        'Break-even between claiming at 62 and 70 falls around age 80.'
      ],
      result: '62: $1,680 · 67: $2,400 · 70: $2,976 per month',
      takeaway: 'Delaying pays off if you live past roughly 80. Claiming early makes sense if you need the income, have health concerns, or would otherwise draw down invested assets in a falling market.'
    },
    sections: [
      {
        id: 'claiming-strategy',
        title: 'What should drive the timing decision',
        paragraphs: ['The break-even calculation is only part of it:'],
        bullets: [
          'Life expectancy and family health history — the single biggest factor.',
          'Whether you are still working, since earnings before FRA can temporarily reduce benefits.',
          'Spousal benefits, which are based on the higher earner\'s record and affected by their claiming age.',
          'Survivor benefits — delaying as the higher earner permanently raises what a surviving spouse receives.',
          'Other income sources, since Social Security is inflation-adjusted and guaranteed in a way investments are not.'
        ]
      }
    ],
    faqs: [
      { question: 'Should I claim Social Security at 62 or wait?', answer: 'Waiting increases the monthly benefit by roughly 8% a year up to 70, with break-even typically around age 80. Claim early if you need the income or have health concerns; delay if you expect a long life and can afford to.' },
      { question: 'How is my benefit calculated?', answer: 'From your 35 highest years of inflation-indexed earnings, run through a progressive formula that replaces a larger share of income for lower earners. Years with no earnings count as zero, so fewer than 35 working years reduces the average.' },
      { question: 'Does working while claiming reduce my benefit?', answer: 'Before full retirement age, earnings above a threshold temporarily withhold part of the benefit. That amount is credited back later through a recalculated benefit, so it is a deferral rather than a permanent loss. After FRA there is no reduction.' }
    ]
  },

  'annuity-calculator': {
    calculatorId: 'annuity-calculator',
    title: 'Annuity Growth Calculator',
    subtitle: 'Project what an annuity will be worth when you start drawing on it, with regular contributions and a fixed growth rate.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: PROJ + ' Annuity contracts vary widely in fees, surrender charges and guarantees. Read the contract terms before purchasing.',
    overview: [
      'An annuity has two phases. During accumulation you pay in and the balance grows tax-deferred. During distribution it pays you an income, either for a fixed period or for life.',
      'This calculator covers the accumulation phase. For the income an existing balance will produce, use the annuity payout calculator.'
    ],
    formulaCard: {
      title: 'Accumulation Value',
      formula: 'FV = P × (1 + r)ⁿ + PMT × [((1 + r)ⁿ − 1) ÷ r]',
      explanation: 'Standard compounding. What distinguishes an annuity is tax deferral during accumulation and the option to convert the balance into guaranteed income later.',
      variables: [
        { symbol: 'P', meaning: 'Initial premium' },
        { symbol: 'PMT', meaning: 'Ongoing contributions, if any' },
        { symbol: 'r', meaning: 'Credited rate — fixed, indexed or variable depending on contract' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Annuity Growth Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your initial premium', description: 'The lump sum used to open the contract.' },
        { stepNumber: 2, title: 'Add ongoing contributions', description: 'Flexible-premium contracts allow further payments; single-premium ones do not.' },
        { stepNumber: 3, title: 'Set the rate and accumulation period', description: 'Use the guaranteed rate for a fixed annuity, and be conservative for variable ones.' },
        { stepNumber: 4, title: 'Subtract fees mentally', description: 'Variable annuity charges can materially reduce the effective rate.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '$100,000 initial premium plus $500 a month for 15 years at 4.5%.',
      inputs: [
        { label: 'Initial premium', value: '$100,000' },
        { label: 'Monthly contribution', value: '$500' },
        { label: 'Rate / period', value: '4.5%, 15 years' }
      ],
      steps: [
        'Monthly rate = 4.5% ÷ 12 = 0.375%.',
        'Initial premium grows: 100,000 × (1.00375)¹⁸⁰ = $195,900.',
        'Contributions grow: 500 × [((1.00375)¹⁸⁰ − 1) ÷ 0.00375] = $127,800.',
        'Total ≈ $323,700.'
      ],
      result: 'Accumulated value ≈ $323,700 after 15 years',
      takeaway: 'A 1% annual fee would reduce this to roughly $297,000 — a $27,000 difference. Annuity charges are the most important variable to check before buying.'
    },
    sections: [
      {
        id: 'types',
        title: 'The main types, and what they trade off',
        paragraphs: ['The label matters less than the guarantee and the fee:'],
        bullets: [
          'Fixed — a guaranteed rate. Predictable, with returns comparable to CDs.',
          'Indexed — returns linked to an index with a floor and a cap. Downside protection in exchange for limited upside.',
          'Variable — invested in sub-accounts. Highest potential and highest fees, with no guarantee.',
          'Surrender charges commonly apply for the first several years, making early access expensive.'
        ],
        callout: { type: 'warning', title: 'Fees are the deciding factor', text: 'Variable annuity charges of 2–3% a year are common once riders are included. Over a long accumulation period that can consume a large share of the growth.' }
      }
    ],
    faqs: [
      { question: 'Is an annuity a good investment?', answer: 'It is better understood as insurance against outliving your money than as an investment. The guaranteed income has real value; the fees and inflexibility are real costs. Whether it suits depends on what other guaranteed income you have.' },
      { question: 'What is a surrender charge?', answer: 'A penalty for withdrawing more than a permitted amount during the early years, often starting around 7% and declining annually. It makes annuities unsuitable for money you may need at short notice.' },
      { question: 'Are annuity gains taxed?', answer: 'Growth is tax-deferred during accumulation. On withdrawal, gains are taxed as ordinary income rather than at capital gains rates — a meaningful disadvantage against a taxable investment account for some people.' }
    ]
  },

  'annuity-payout-calculator': {
    calculatorId: 'annuity-payout-calculator',
    title: 'Annuity Payout Calculator',
    subtitle: 'Work out the monthly income an annuity will pay, over a fixed term or for life, and how the payout period changes it.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: PROJ + ' Actual payout rates depend on the insurer, your age, prevailing interest rates and the options selected. Quotes vary significantly between providers.',
    overview: [
      'Once an annuity is annuitised it converts a balance into a stream of payments. The size of those payments depends on the balance, the interest rate, and how long payments are guaranteed to continue.',
      'The longer the guarantee, the smaller each payment — which is the core trade-off in every payout decision.'
    ],
    formulaCard: {
      title: 'Fixed-Period Payout',
      formula: 'PMT = P × [i(1 + i)ⁿ] ÷ [(1 + i)ⁿ − 1]',
      explanation: 'The same formula as a loan payment, because the insurer is effectively repaying your balance with interest. Lifetime payouts additionally use mortality tables rather than a fixed n.',
      variables: [
        { symbol: 'P', meaning: 'Annuitised balance' },
        { symbol: 'i', meaning: 'Periodic interest rate credited' },
        { symbol: 'n', meaning: 'Number of payments in a fixed-period payout' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Annuity Payout Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the balance to annuitise', description: 'The amount being converted into income.' },
        { stepNumber: 2, title: 'Choose the payout structure', description: 'Fixed period, life only, or life with a guaranteed minimum period.' },
        { stepNumber: 3, title: 'Enter the rate and duration', description: 'For fixed-period payouts, the number of years payments continue.' },
        { stepNumber: 4, title: 'Compare structures', description: 'Life-only pays most per month but stops at death; joint-life pays least but covers two lives.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $400,000 balance at 4% credited, compared across payout periods.',
      inputs: [
        { label: 'Balance', value: '$400,000' },
        { label: 'Rate', value: '4%' },
        { label: 'Options', value: '10, 20 and 30-year periods' }
      ],
      steps: [
        'Monthly rate = 4% ÷ 12 = 0.3333%.',
        '10 years (120 payments): $4,050/month.',
        '20 years (240 payments): $2,424/month.',
        '30 years (360 payments): $1,910/month.'
      ],
      result: '10yr $4,050 · 20yr $2,424 · 30yr $1,910 per month',
      takeaway: 'Tripling the payout period does not cut the payment to a third — interest keeps working on the declining balance. But it does more than halve it, which is the cost of a longer guarantee.'
    },
    sections: [
      {
        id: 'payout-options',
        title: 'Choosing a payout structure',
        paragraphs: ['Each option trades income against protection:'],
        bullets: [
          'Life only — the highest monthly payment, but payments stop at death with nothing to heirs.',
          'Life with period certain — slightly lower, but guarantees payments for a minimum number of years regardless.',
          'Joint and survivor — continues to a spouse, typically at 50–100% of the original amount. Lowest payment, widest cover.',
          'Fixed period — pays for a set number of years only, with no longevity protection at all.'
        ],
        callout: { type: 'info', title: 'Annuitisation is usually irreversible', text: 'Once converted, the balance generally cannot be accessed as a lump sum. Consider annuitising only part of a portfolio and keeping the rest liquid.' }
      }
    ],
    faqs: [
      { question: 'How much income will my annuity pay?', answer: 'It depends on the balance, your age, current interest rates and the payout option. A longer guarantee period or a joint-life option lowers the monthly payment in exchange for wider or longer cover.' },
      { question: 'What happens to the money if I die early?', answer: 'Under a life-only option, payments stop and nothing passes to heirs. A period-certain or joint-survivor option protects against that at the cost of a lower monthly payment.' },
      { question: 'Should I annuitise my whole retirement pot?', answer: 'Rarely. Annuitising part covers essential fixed expenses with guaranteed income while leaving the rest invested and accessible. Full annuitisation removes flexibility entirely.' }
    ]
  },

  'cd-calculator': {
    calculatorId: 'cd-calculator',
    title: 'CD Calculator',
    subtitle: 'Calculate what a certificate of deposit will be worth at maturity, compare APY across terms, and see what early withdrawal costs.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Rates and penalty structures vary by institution. Interest is generally taxable in the year earned, even if not withdrawn.',
    overview: [
      'A certificate of deposit locks money away for a fixed term in exchange for a rate usually better than an easy-access account. The rate is guaranteed, and in most countries the deposit is insured up to a limit.',
      'The cost is access. Withdrawing early triggers a penalty that can consume some or all of the interest earned.'
    ],
    formulaCard: {
      title: 'CD Maturity Value',
      formula: 'A = P × (1 + r ÷ n)^(n × t)',
      explanation: 'APY already accounts for compounding frequency, which is why it is the right figure for comparing CDs from different banks — a 5.0% rate compounded daily beats 5.0% compounded annually.',
      variables: [
        { symbol: 'APY', meaning: 'Annual percentage yield — the comparable figure' },
        { symbol: 'n', meaning: 'Compounding periods per year' },
        { symbol: 'Penalty', meaning: 'Commonly 3–12 months of interest for early withdrawal' }
      ]
    },
    howToSteps: {
      title: 'How to Use the CD Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the deposit amount', description: 'Some institutions require a minimum.' },
        { stepNumber: 2, title: 'Enter the APY and term', description: 'Use APY rather than the nominal rate for a like-for-like comparison.' },
        { stepNumber: 3, title: 'Check the maturity value', description: 'This is the guaranteed amount at the end of the term.' },
        { stepNumber: 4, title: 'Consider the early withdrawal penalty', description: 'Relevant if there is any chance you need the money before maturity.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '$25,000 in a 3-year CD at 4.6% APY, compounded monthly.',
      inputs: [
        { label: 'Deposit', value: '$25,000' },
        { label: 'APY', value: '4.6%' },
        { label: 'Term', value: '3 years' }
      ],
      steps: [
        'Monthly rate = 4.6% ÷ 12 = 0.3833%.',
        'A = 25,000 × (1.003833)³⁶ = $28,689.',
        'Interest earned = $3,689.',
        'A 6-month interest penalty for early withdrawal would cost roughly $575.'
      ],
      result: 'Maturity value $28,689 · Interest $3,689',
      takeaway: 'The penalty is six months of interest regardless of how long you held it. Withdrawing in month three could leave you with less than you deposited.'
    },
    sections: [
      {
        id: 'laddering',
        title: 'CD laddering',
        paragraphs: [
          'Laddering splits a deposit across several CDs maturing at staggered intervals — for example five equal amounts maturing one year apart. As each matures you either take the cash or reinvest at the prevailing rate.',
          'This gives most of the higher rate available on longer terms while keeping part of the money accessible every year, and averages out the risk of locking everything in just before rates rise.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the difference between interest rate and APY?', answer: 'The interest rate is the nominal figure; APY includes the effect of compounding. When comparing CDs from different banks, APY is the only fair basis because compounding frequency varies.' },
      { question: 'What happens if I withdraw early?', answer: 'Most institutions charge a penalty of several months\' interest, often 3–12 months depending on the term. On a short-held CD this can exceed the interest earned, leaving you with less than you deposited.' },
      { question: 'Are CDs a good place for an emergency fund?', answer: 'Generally not, because the whole point of an emergency fund is immediate access. A high-yield easy-access account usually suits better, even at a slightly lower rate.' }
    ]
  },

  'bond-calculator': {
    calculatorId: 'bond-calculator',
    title: 'Bond Calculator',
    subtitle: 'Calculate current yield, yield to maturity and bond price, and see how a change in market rates moves the value of what you hold.',
    readTimeMinutes: 5,
    author: AUTHOR,
    disclaimer: 'Bond pricing assumes coupons are reinvested at the yield to maturity, which rarely happens in practice. Credit risk, call features and tax treatment all affect real returns.',
    overview: [
      'A bond pays a fixed coupon and returns its face value at maturity. Its price moves inversely to interest rates: when rates rise, existing bonds paying lower coupons become less attractive and their prices fall.',
      'That inverse relationship is the single most important thing to understand about bonds, and it surprises people who assume fixed income means fixed value.'
    ],
    formulaCard: {
      title: 'Yields and Price',
      formula: 'Current yield = Annual coupon ÷ Market price',
      explanation: 'Yield to maturity is the discount rate that makes the present value of all future coupons plus the face value equal the current price. It is solved iteratively rather than directly.',
      variables: [
        { symbol: 'Face value', meaning: 'Amount repaid at maturity, usually 100 or 1,000' },
        { symbol: 'Coupon rate', meaning: 'Annual interest as a percentage of face value' },
        { symbol: 'YTM', meaning: 'Total annualised return if held to maturity' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Bond Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter face value and coupon rate', description: 'Both are fixed at issue and printed on the bond terms.' },
        { stepNumber: 2, title: 'Enter the current market price', description: 'Above face value is trading at a premium, below is at a discount.' },
        { stepNumber: 3, title: 'Enter years to maturity', description: 'Longer maturities are more sensitive to rate changes.' },
        { stepNumber: 4, title: 'Compare current yield and YTM', description: 'They differ whenever the bond is not trading exactly at face value.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A bond with $1,000 face value, a 4% coupon, five years to maturity, trading at $940.',
      inputs: [
        { label: 'Face value', value: '$1,000' },
        { label: 'Coupon', value: '4% ($40 a year)' },
        { label: 'Market price', value: '$940' },
        { label: 'Maturity', value: '5 years' }
      ],
      steps: [
        'Current yield = 40 ÷ 940 = 4.26%.',
        'At maturity you also receive $60 more than you paid.',
        'Spreading that gain across five years and solving gives a YTM of roughly 5.42%.',
        'If market rates rose to 6%, the price would fall to about $916.'
      ],
      result: 'Current yield 4.26% · YTM ≈ 5.42%',
      takeaway: 'The bond trades at a discount because its 4% coupon is below current market rates. YTM exceeds the current yield since the discount is recovered at maturity.'
    },
    sections: [
      {
        id: 'duration',
        title: 'Why long bonds move more',
        paragraphs: [
          'Duration measures price sensitivity to interest rates. A bond with a duration of 7 loses roughly 7% of its value if rates rise by one percentage point, and gains roughly 7% if they fall by one.',
          'Longer maturities and lower coupons both increase duration. This is why long-dated government bonds can fall sharply in a rising-rate environment despite carrying almost no credit risk — the risk is in the rates, not the issuer.'
        ],
        callout: { type: 'info', title: 'Holding to maturity removes price risk', text: 'If you hold to maturity you receive face value regardless of interim price moves. Price volatility only becomes a real loss if you sell early.' }
      }
    ],
    faqs: [
      { question: 'Why do bond prices fall when interest rates rise?', answer: 'Because new bonds are issued paying the higher rate, making existing lower-coupon bonds less attractive. Their price falls until their effective yield matches what a new bond offers.' },
      { question: 'What is the difference between current yield and yield to maturity?', answer: 'Current yield is just the annual coupon divided by the price. YTM also accounts for the gain or loss from the price differing from face value, spread over the remaining term. YTM is the more complete measure.' },
      { question: 'Is a bond trading below face value a bad sign?', answer: 'Not necessarily. It usually just means market rates have risen since issue. It can also reflect credit concerns, so check whether the discount is driven by rates or by the issuer\'s financial position.' }
    ]
  },

  'dividend-yield-calculator': {
    calculatorId: 'dividend-yield-calculator',
    title: 'Dividend Yield Calculator',
    subtitle: 'Calculate dividend yield, annual income and payout ratio, and see what reinvestment does to returns over time.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Dividends are not guaranteed and can be cut at any time. Past dividend history does not indicate future payments. Tax treatment varies by account type and jurisdiction.',
    overview: [
      'Dividend yield expresses annual dividends as a percentage of the share price. It lets you compare income across companies of very different sizes and prices.',
      'A high yield is not automatically good. Because price is the denominator, a falling share price mechanically raises the yield — which is why the highest yields often belong to companies in trouble.'
    ],
    formulaCard: {
      title: 'Yield and Payout Ratio',
      formula: 'Dividend yield = Annual dividend per share ÷ Share price × 100',
      explanation: 'Payout ratio = dividends ÷ earnings, and tells you whether the dividend is affordable. A ratio above 100% means the company is paying out more than it earns.',
      variables: [
        { symbol: 'Annual dividend', meaning: 'Sum of expected payments over a year' },
        { symbol: 'Payout ratio', meaning: 'Share of earnings paid out — sustainability check' },
        { symbol: 'Yield on cost', meaning: 'Dividend against what you originally paid' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Dividend Yield Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the share price', description: 'Current market price per share.' },
        { stepNumber: 2, title: 'Enter the annual dividend per share', description: 'Multiply a quarterly dividend by four.' },
        { stepNumber: 3, title: 'Add the number of shares', description: 'To see total annual income rather than just the percentage.' },
        { stepNumber: 4, title: 'Check the payout ratio', description: 'This is the affordability test the yield alone does not give you.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '500 shares priced at $62, paying $0.78 quarterly, with earnings per share of $4.10.',
      inputs: [
        { label: 'Share price', value: '$62' },
        { label: 'Quarterly dividend', value: '$0.78' },
        { label: 'Shares held', value: '500' },
        { label: 'EPS', value: '$4.10' }
      ],
      steps: [
        'Annual dividend = 0.78 × 4 = $3.12 per share.',
        'Yield = 3.12 ÷ 62 = 5.03%.',
        'Annual income = 3.12 × 500 = $1,560.',
        'Payout ratio = 3.12 ÷ 4.10 = 76%.'
      ],
      result: 'Yield 5.03% · Income $1,560 a year · Payout ratio 76%',
      takeaway: 'A 76% payout ratio leaves limited room for the dividend to grow and modest cover if earnings fall. Below 60% is generally considered more comfortable.'
    },
    sections: [
      {
        id: 'yield-traps',
        title: 'High yields deserve scrutiny',
        paragraphs: [
          'A dividend yield trap is a stock whose yield looks attractive only because the price has collapsed. The market is pricing in a dividend cut that has not yet been announced.',
          'The checks worth running: is the payout ratio sustainable, is free cash flow covering the dividend, has the dividend been maintained through previous downturns, and is the sector itself under structural pressure?'
        ],
        callout: { type: 'warning', title: 'Yield rises as price falls', text: 'A stock that halves in price doubles its yield without paying a penny more. Always check why a yield is high before treating it as an opportunity.' }
      }
    ],
    faqs: [
      { question: 'What is a good dividend yield?', answer: 'Typically 2–5% for established companies. Much above that warrants investigation — it often signals the market expects a cut. Much below usually means the company is prioritising reinvestment over distribution, which is not inherently worse.' },
      { question: 'What is a dividend payout ratio?', answer: 'The share of earnings paid out as dividends. Below 60% generally suggests room for growth and a cushion if earnings fall. Above 100% means the company is paying more than it earns, which cannot continue indefinitely.' },
      { question: 'Should I reinvest dividends?', answer: 'Reinvesting compounds returns by buying more shares that themselves pay dividends, and over decades this accounts for a large share of total equity returns. Whether it suits depends on whether you need the income now.' }
    ]
  }
};
