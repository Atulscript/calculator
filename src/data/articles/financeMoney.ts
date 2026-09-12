import { CalculatorArticle } from '../../types/article';

/** Everyday money, tax and pricing articles. */
export const FINANCE_MONEY_ARTICLES: Record<string, CalculatorArticle> = {
  'simple-interest-calculator': {
    calculatorId: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    subtitle: 'Calculate simple interest and the final balance, and see how it differs from compound interest over the same period.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    overview: [
      'Simple interest is charged only on the original principal. Nothing is added back, so the interest earned each year is identical — which makes it predictable, and almost always worse for a saver than compound interest.',
      'It still appears in car finance, some personal loans, short-term notes and most bond coupon payments.'
    ],
    formulaCard: {
      title: 'Simple Interest',
      formula: 'I = P × r × t',
      explanation: 'The final balance is A = P + I, or equivalently P × (1 + rt). Because the principal never changes, the interest is a straight line rather than a curve.',
      variables: [
        { symbol: 'I', meaning: 'Total interest' },
        { symbol: 'P', meaning: 'Principal' },
        { symbol: 'r', meaning: 'Annual rate as a decimal (6% = 0.06)' },
        { symbol: 't', meaning: 'Time in years' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Simple Interest Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the principal', description: 'The amount borrowed or invested at the start.' },
        { stepNumber: 2, title: 'Enter the annual rate', description: 'As a percentage — the calculator converts it.' },
        { stepNumber: 3, title: 'Enter the time in years', description: 'Use decimals for part-years: 18 months is 1.5.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: '£8,000 at 6% simple interest for 4 years.',
      inputs: [
        { label: 'Principal', value: '£8,000' },
        { label: 'Rate', value: '6% (0.06)' },
        { label: 'Time', value: '4 years' }
      ],
      steps: [
        'I = 8,000 × 0.06 × 4 = £1,920.',
        'Final balance = 8,000 + 1,920 = £9,920.',
        'Each year earns exactly £480 — the same amount every time.',
        'Compounded annually instead, the same deposit would reach £10,099.'
      ],
      result: 'Interest £1,920 · Balance £9,920',
      takeaway: 'Compounding adds £179 over four years on these figures. The gap is small here and grows dramatically with time — over 20 years it becomes substantial.'
    },
    sections: [
      {
        id: 'when-simple-applies',
        title: 'Where simple interest is actually used',
        paragraphs: ['Most consumer products compound, so it is worth knowing the exceptions:'],
        bullets: [
          'Many car loans, where interest is calculated on the original amount rather than the reducing balance.',
          'Bond coupons, which pay a fixed percentage of face value each period.',
          'Short-term bridging and payday products.',
          'Some student loans during study periods.'
        ],
        callout: { type: 'tip', title: 'Check which one applies', text: 'On a loan, simple interest is usually in your favour. On savings, it is not. If a product does not say, assume compounding and ask.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on the original principal, so it earns the same amount every period. Compound interest is calculated on the principal plus accumulated interest, so it accelerates. Over long periods the difference is very large.' },
      { question: 'Is simple interest better for a borrower?', answer: 'Generally yes. Since interest never accrues on unpaid interest, a simple-interest loan costs less than a compound one at the same rate and term.' },
      { question: 'How do I handle part-years?', answer: 'Use a decimal. Six months is 0.5, eighteen months is 1.5, ninety days is roughly 0.247 on a 365-day basis.' }
    ]
  },

  'tip-calculator': {
    calculatorId: 'tip-calculator',
    title: 'Tip Calculator',
    subtitle: 'Work out the tip and split a bill between any number of people, with uneven splits and rounding handled.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    overview: [
      'Tipping maths is simple until the bill has to be split unevenly, or the group wants a round number per person. This handles both.',
      'Tipping norms vary enormously by country, and applying one country\'s expectations in another is a common source of awkwardness.'
    ],
    formulaCard: {
      title: 'Tip and Split',
      formula: 'Tip = Bill × (Tip% ÷ 100) · Per person = (Bill + Tip) ÷ People',
      explanation: 'Whether the tip is calculated before or after tax changes the total slightly. Convention in most places is to tip on the pre-tax subtotal, though tipping on the total is common and simpler.',
      variables: [
        { symbol: 'Bill', meaning: 'Subtotal before or after tax — your choice' },
        { symbol: 'Tip%', meaning: 'Percentage you want to leave' },
        { symbol: 'People', meaning: 'Number splitting the bill' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Tip Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the bill total', description: 'Use the pre-tax subtotal if you prefer to tip on that.' },
        { stepNumber: 2, title: 'Choose a tip percentage', description: 'Or enter a custom figure.' },
        { stepNumber: 3, title: 'Set the number of people', description: 'The per-person amount updates as you change it.' },
        { stepNumber: 4, title: 'Round if you want to', description: 'Rounding up to a whole number per person is usually easiest to settle.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A $184.50 bill, 18% tip, split four ways.',
      inputs: [
        { label: 'Bill', value: '$184.50' },
        { label: 'Tip', value: '18%' },
        { label: 'People', value: '4' }
      ],
      steps: [
        'Tip = 184.50 × 0.18 = $33.21.',
        'Total = 184.50 + 33.21 = $217.71.',
        'Per person = 217.71 ÷ 4 = $54.43.',
        'Rounded to $55 each collects $220 and leaves a slightly larger tip.'
      ],
      result: 'Tip $33.21 · Total $217.71 · $54.43 each',
      takeaway: 'Rounding up by 57 cents each raises the tip from 18% to about 19.2% — a common and painless way to settle a split cleanly.'
    },
    sections: [
      {
        id: 'norms',
        title: 'Tipping norms differ sharply by country',
        paragraphs: ['Percentages that are standard in one country are unusual or unwelcome in another:'],
        bullets: [
          'United States and Canada: 15–20% is standard in restaurants, and staff wages often assume it.',
          'United Kingdom: 10–12.5%, frequently added automatically as a service charge — check before adding more.',
          'Most of continental Europe: service is typically included; rounding up is normal and a full percentage tip is not expected.',
          'Japan: tipping is not customary and can cause confusion.'
        ],
        callout: { type: 'warning', title: 'Check for a service charge first', text: 'Many restaurants add 12.5% automatically. Tipping on top of that double-tips unless you intended to.' }
      }
    ],
    faqs: [
      { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'Convention is on the pre-tax subtotal, since tax is not part of the service. Tipping on the total is common and slightly more generous — either is acceptable.' },
      { question: 'How do I split a bill unevenly?', answer: 'Calculate each person\'s share of the subtotal, then apply the same tip percentage to each share. That keeps the tip proportional to what each person ordered.' },
      { question: 'What if a service charge is already added?', answer: 'That is the tip. Adding more is optional and usually reserved for exceptional service.' }
    ]
  },

  'discount-calculator': {
    calculatorId: 'discount-calculator',
    title: 'Discount Calculator',
    subtitle: 'Find the sale price and what you actually save, including stacked discounts and percentage-off-then-extra deals.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    overview: [
      'A single discount is easy. Stacked discounts are where retail maths gets misleading — "50% off then an extra 20% off" is not 70% off, and the difference is worth knowing at the till.'
    ],
    formulaCard: {
      title: 'Discount and Sale Price',
      formula: 'Sale price = Original × (1 − d₁) × (1 − d₂)',
      explanation: 'Each discount applies to the already-reduced price, not the original. That is why stacked percentages never add up to their sum.',
      variables: [
        { symbol: 'Original', meaning: 'Price before any reduction' },
        { symbol: 'd₁, d₂', meaning: 'Each discount as a decimal (20% = 0.2)' },
        { symbol: 'Saving', meaning: 'Original − Sale price' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Discount Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the original price', description: 'The pre-discount price on the tag.' },
        { stepNumber: 2, title: 'Enter the discount percentage', description: 'Add a second discount if the offer stacks.' },
        { stepNumber: 3, title: 'Check the effective total discount', description: 'This is the real percentage off, which is always less than the sum of the two.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Stacked Discounts',
      scenario: 'A £120 coat at 50% off, with an extra 20% off at the till.',
      inputs: [
        { label: 'Original price', value: '£120' },
        { label: 'First discount', value: '50%' },
        { label: 'Second discount', value: '20%' }
      ],
      steps: [
        'After 50%: 120 × 0.50 = £60.',
        'After a further 20%: 60 × 0.80 = £48.',
        'Total saving = 120 − 48 = £72.',
        'Effective discount = 72 ÷ 120 = 60%, not 70%.'
      ],
      result: 'Final price £48 · Saved £72 · Effective discount 60%',
      takeaway: 'Stacked discounts multiply rather than add. The advertised "50% + 20%" is 60% off, which is £12 less saving than the intuitive reading suggests.'
    },
    sections: [
      {
        id: 'reverse',
        title: 'Working backwards from a sale price',
        paragraphs: [
          'To find the original price from a discounted one, divide rather than multiply. An item at £48 after 60% off was 48 ÷ 0.40 = £120.',
          'This is useful for checking whether an advertised "was" price is genuine, or whether the discount percentage on the label matches the actual reduction.'
        ]
      }
    ],
    faqs: [
      { question: 'Is 50% off then 20% off the same as 70% off?', answer: 'No. The second discount applies to the already-reduced price, so the combined effect is 60% off. Stacked percentages always multiply, never add.' },
      { question: 'Does the order of two discounts matter?', answer: 'No. Multiplication is commutative, so 50% then 20% gives the same result as 20% then 50%. Retailers sometimes imply otherwise but the arithmetic is identical.' },
      { question: 'How do I find the original price from a sale price?', answer: 'Divide the sale price by (1 − discount). An item at £48 after 60% off was 48 ÷ 0.4 = £120.' }
    ]
  },

  'gst-calculator': {
    calculatorId: 'gst-calculator',
    title: 'GST Calculator',
    subtitle: 'Add GST to a net price or strip it out of a gross one, with the tax amount shown separately.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    disclaimer: 'GST rates and slab structures are set by government and change. Verify the current rate for your goods or services category with the relevant tax authority before relying on a figure.',
    overview: [
      'Goods and Services Tax is a consumption tax added at the point of sale. The two calculations people need are opposite directions: adding tax to a net price, and extracting tax from a price that already includes it.',
      'The second is where mistakes happen — you cannot simply subtract the rate from a gross amount.'
    ],
    formulaCard: {
      title: 'Adding and Removing GST',
      formula: 'Gross = Net × (1 + rate) · Net = Gross ÷ (1 + rate)',
      explanation: 'GST amount is the difference between the two. Taking 18% off a gross figure is wrong — the tax was 18% of the net, which is a smaller share of the gross.',
      variables: [
        { symbol: 'Net', meaning: 'Price excluding GST' },
        { symbol: 'Gross', meaning: 'Price including GST' },
        { symbol: 'rate', meaning: 'GST rate as a decimal (18% = 0.18)' }
      ]
    },
    howToSteps: {
      title: 'How to Use the GST Calculator',
      steps: [
        { stepNumber: 1, title: 'Choose add or remove', description: 'Adding starts from a net price; removing starts from a GST-inclusive one.' },
        { stepNumber: 2, title: 'Enter the amount', description: 'Whichever figure you have.' },
        { stepNumber: 3, title: 'Select the rate', description: 'Use the slab that applies to the goods or services in question.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Removing GST',
      scenario: 'An invoice total of ₹11,800 that includes GST at 18%.',
      inputs: [
        { label: 'Gross amount', value: '₹11,800' },
        { label: 'GST rate', value: '18%' }
      ],
      steps: [
        'Net = 11,800 ÷ 1.18 = ₹10,000.',
        'GST = 11,800 − 10,000 = ₹1,800.',
        'Subtracting 18% from the gross instead gives 11,800 × 0.82 = ₹9,676 — wrong by ₹324.'
      ],
      result: 'Net ₹10,000 · GST ₹1,800',
      takeaway: 'The GST portion of a gross amount at 18% is 15.25%, not 18%. Dividing is the only correct way to extract it.'
    },
    sections: [
      {
        id: 'cgst-sgst',
        title: 'How GST splits between authorities',
        paragraphs: [
          'In India, GST on a within-state sale splits equally into CGST (central) and SGST (state). An 18% rate is therefore 9% CGST plus 9% SGST. For sales across state lines a single IGST applies at the full rate.',
          'The total the customer pays is identical either way; the split matters for invoicing and input tax credit, not for the price.'
        ]
      }
    ],
    faqs: [
      { question: 'How do I remove GST from a total?', answer: 'Divide by (1 + rate). For 18%, divide the gross by 1.18. Subtracting 18% from the gross gives the wrong answer because the tax was a percentage of the net, not the gross.' },
      { question: 'What percentage of a gross price is GST at 18%?', answer: '15.25%. The 18% applies to the net figure, which is a smaller base than the gross, so the tax is a smaller share of the total than the rate suggests.' },
      { question: 'What is the difference between CGST, SGST and IGST?', answer: 'Within-state sales split the rate equally between central and state GST. Inter-state sales use a single integrated GST at the full rate. The customer pays the same total under either.' }
    ]
  },

  'vat-calculator': {
    calculatorId: 'vat-calculator',
    title: 'VAT Calculator',
    subtitle: 'Add VAT to a net figure or work backwards from a VAT-inclusive price, at any rate you enter.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    disclaimer: 'VAT rates and the categories they apply to are set by each country and change. Check the current rate and category with your national tax authority.',
    overview: [
      'Value Added Tax works the same way as GST — added at the point of sale, and awkward to extract from a total once included.',
      'Rates vary by country and by product category, with reduced and zero rates applying to things like food, books, children\'s clothing and energy in many jurisdictions.'
    ],
    formulaCard: {
      title: 'Adding and Removing VAT',
      formula: 'Gross = Net × (1 + rate) · Net = Gross ÷ (1 + rate)',
      explanation: 'At the common UK rate of 20%, the VAT fraction of a gross price is one sixth (16.67%), which is why dividing by 6 is a frequent shortcut.',
      variables: [
        { symbol: 'Net', meaning: 'Price excluding VAT' },
        { symbol: 'Gross', meaning: 'Price including VAT' },
        { symbol: 'VAT fraction', meaning: 'rate ÷ (1 + rate) — the share of a gross price that is tax' }
      ]
    },
    howToSteps: {
      title: 'How to Use the VAT Calculator',
      steps: [
        { stepNumber: 1, title: 'Choose the direction', description: 'Add VAT to a net price, or remove it from a gross one.' },
        { stepNumber: 2, title: 'Enter the amount and rate', description: 'Use the reduced or zero rate where it applies to the product.' },
        { stepNumber: 3, title: 'Read the VAT amount separately', description: 'This is the figure needed for invoicing and returns.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A gross invoice of £600 including VAT at 20%.',
      inputs: [
        { label: 'Gross', value: '£600' },
        { label: 'Rate', value: '20%' }
      ],
      steps: [
        'Net = 600 ÷ 1.20 = £500.',
        'VAT = 600 − 500 = £100.',
        'Shortcut: at 20%, VAT is one sixth of the gross — 600 ÷ 6 = £100.'
      ],
      result: 'Net £500 · VAT £100',
      takeaway: 'The one-sixth shortcut only works at 20%. At a 5% reduced rate the VAT fraction is one twenty-first, so the division changes.'
    },
    sections: [
      {
        id: 'registration',
        title: 'Registration and reclaiming',
        paragraphs: [
          'Businesses above a turnover threshold must register and charge VAT. Registered businesses generally reclaim the VAT they pay on purchases, so for them VAT is a cash-flow matter rather than a cost.',
          'That is why business-to-business prices are often quoted excluding VAT while consumer prices must be shown including it.'
        ]
      }
    ],
    faqs: [
      { question: 'How do I remove VAT from a price?', answer: 'Divide by (1 + rate). At 20%, divide the gross by 1.2. Subtracting 20% from the gross gives the wrong figure.' },
      { question: 'Why is VAT one sixth of the gross at a 20% rate?', answer: 'Because 20% of the net equals 1/6 of the gross. If net is 100, gross is 120 and VAT is 20 — which is 20/120, or one sixth.' },
      { question: 'What is the difference between VAT and sales tax?', answer: 'VAT is collected at every stage of production with businesses reclaiming what they paid, so only the final consumer bears it. US-style sales tax is collected only at the final sale. The consumer outcome is similar; the mechanics differ.' }
    ]
  },

  'capital-gains-tax-calculator': {
    calculatorId: 'capital-gains-tax-calculator',
    title: 'Capital Gains Tax Calculator',
    subtitle: 'Estimate tax on a sale, with short-term and long-term rates applied separately and losses offset against gains.',
    readTimeMinutes: 5,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    disclaimer: 'Capital gains rules, rates, allowances and holding-period definitions vary by country and change frequently. This is a general estimate, not tax advice. Confirm with your tax authority or an accountant.',
    overview: [
      'Capital gains tax applies to the profit on a sale, not the sale price. The single biggest factor in most systems is how long you held the asset — short-term gains are typically taxed as ordinary income, long-term gains at lower preferential rates.',
      'That distinction can change the bill substantially, which is why the holding period is worth checking before selling.'
    ],
    formulaCard: {
      title: 'Taxable Gain',
      formula: 'Gain = Sale price − Cost basis − Selling costs',
      explanation: 'Cost basis is what you paid plus acquisition costs and qualifying improvements. Losses on other disposals offset gains before tax is applied.',
      variables: [
        { symbol: 'Cost basis', meaning: 'Purchase price plus fees and capital improvements' },
        { symbol: 'Short-term', meaning: 'Held under the threshold — usually taxed as income' },
        { symbol: 'Long-term', meaning: 'Held beyond it — usually a lower rate' },
        { symbol: 'Allowance', meaning: 'Tax-free amount some systems grant each year' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Capital Gains Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter purchase and sale prices', description: 'Include buying and selling costs — both adjust the taxable gain.' },
        { stepNumber: 2, title: 'Enter the holding period', description: 'This determines whether short-term or long-term rates apply.' },
        { stepNumber: 3, title: 'Add any capital losses', description: 'Losses offset gains, reducing the taxable amount.' },
        { stepNumber: 4, title: 'Enter your income', description: 'Long-term rates are often banded by total income.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Shares bought for $20,000 and sold for $35,000 after three years, with $800 in total fees and a $2,000 loss elsewhere. Long-term rate 15%.',
      inputs: [
        { label: 'Sale price', value: '$35,000' },
        { label: 'Cost basis', value: '$20,000' },
        { label: 'Fees', value: '$800' },
        { label: 'Capital loss', value: '$2,000' }
      ],
      steps: [
        'Gross gain = 35,000 − 20,000 − 800 = $14,200.',
        'Offset the loss: 14,200 − 2,000 = $12,200 taxable.',
        'Tax at 15% = $1,830.',
        'Had it been sold inside the short-term window at a 24% marginal rate, the tax would be $2,928.'
      ],
      result: 'Taxable gain $12,200 · Tax $1,830',
      takeaway: 'Holding past the long-term threshold saved $1,098 on this sale — roughly 7% of the gain, for no change other than timing.'
    },
    sections: [
      {
        id: 'reducing',
        title: 'Legitimate ways the bill changes',
        paragraphs: ['Several factors are within your control:'],
        bullets: [
          'Holding period — crossing into long-term treatment is often the largest single lever.',
          'Loss harvesting — realising losses in the same tax year offsets gains.',
          'Annual allowances — some systems exempt a fixed amount of gains each year.',
          'Tax-advantaged accounts, where gains may be sheltered entirely.',
          'Improvement costs on property, which increase the cost basis if properly documented.'
        ],
        callout: { type: 'warning', title: 'Keep records of the basis', text: 'Without documentation of what you paid and what you spent improving an asset, you may be taxed on a larger gain than you actually made.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between short-term and long-term capital gains?', answer: 'Short-term gains are on assets held below a threshold — one year in the US — and are usually taxed at ordinary income rates. Long-term gains benefit from lower preferential rates. The exact threshold and rates vary by country.' },
      { question: 'Can capital losses reduce my tax?', answer: 'Yes. Losses offset gains in the same tax year, and many systems allow unused losses to be carried forward. Some also allow a limited amount to offset ordinary income.' },
      { question: 'Do I pay capital gains tax on my home?', answer: 'Often not, or only above a threshold. Many countries exempt a primary residence entirely or up to a limit. Second homes and investment properties are usually fully taxable.' }
    ]
  },

  'commission-calculator': {
    calculatorId: 'commission-calculator',
    title: 'Sales Commission Calculator',
    subtitle: 'Work out commission on flat, tiered or split rates, and total earnings once base salary is included.',
    readTimeMinutes: 3,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    overview: [
      'Commission structures range from a single percentage to tiered schedules that pay more once a threshold is passed. Tiered plans are where manual calculation usually goes wrong, because higher rates apply only to the portion above each threshold.'
    ],
    formulaCard: {
      title: 'Flat and Tiered Commission',
      formula: 'Flat: Commission = Sales × rate',
      explanation: 'Tiered: each band pays its own rate on the sales that fall within it, then the bands are summed — the same marginal logic as income tax bands.',
      variables: [
        { symbol: 'Sales', meaning: 'Revenue attributed to you in the period' },
        { symbol: 'rate', meaning: 'Commission percentage for that band' },
        { symbol: 'Split', meaning: 'Your share where a deal is shared with a colleague' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Commission Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter total sales for the period', description: 'Use the figure your plan is measured on — often net revenue rather than gross.' },
        { stepNumber: 2, title: 'Choose flat or tiered', description: 'Enter each threshold and its rate for a tiered plan.' },
        { stepNumber: 3, title: 'Add base salary', description: 'To see total compensation rather than commission alone.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Tiered Plan',
      scenario: 'Sales of $180,000. Plan pays 3% up to $100,000, then 5% above it, on a $45,000 base.',
      inputs: [
        { label: 'Total sales', value: '$180,000' },
        { label: 'Tier 1', value: '3% up to $100,000' },
        { label: 'Tier 2', value: '5% above $100,000' },
        { label: 'Base salary', value: '$45,000' }
      ],
      steps: [
        'Tier 1: 100,000 × 0.03 = $3,000.',
        'Tier 2: 80,000 × 0.05 = $4,000.',
        'Total commission = $7,000.',
        'Total compensation = 45,000 + 7,000 = $52,000.'
      ],
      result: 'Commission $7,000 · Total compensation $52,000',
      takeaway: 'Applying 5% to the whole $180,000 would give $9,000 — a $2,000 overestimate. Tiered rates apply only to the portion in each band.'
    },
    faqs: [
      { question: 'How does a tiered commission plan work?', answer: 'Each rate applies only to the sales within its band, not to your whole total. Passing a threshold raises the rate on the portion above it, exactly like income tax bands.' },
      { question: 'What is a commission draw?', answer: 'An advance against future commission, giving predictable income in slow periods. Recoverable draws are repaid from later commission; non-recoverable draws are not.' },
      { question: 'Is commission calculated on gross or net revenue?', answer: 'It depends on the plan. Many pay on net revenue after discounts and returns, which can be materially lower than the headline sale value. Check which basis your plan uses.' }
    ]
  },

  'margin-calculator': {
    calculatorId: 'margin-calculator',
    title: 'Margin & Markup Calculator',
    subtitle: 'Calculate margin, markup, profit and selling price from any two values. Margin and markup are not the same number.',
    readTimeMinutes: 4,
    author: { name: 'Calculator360 Editorial Team', role: 'Personal Finance Desk', lastUpdated: 'September 2026' },
    overview: [
      'Margin and markup describe the same profit from different angles, and confusing them is one of the most expensive mistakes in small-business pricing. A 50% markup is a 33.3% margin — a business pricing for "50% profit" using markup is earning a third less than it thinks.'
    ],
    formulaCard: {
      title: 'Margin vs Markup',
      formula: 'Margin = (Price − Cost) ÷ Price · Markup = (Price − Cost) ÷ Cost',
      explanation: 'Both use the same profit. Margin divides by the selling price, markup divides by the cost. Since cost is always lower, markup always produces the larger percentage.',
      variables: [
        { symbol: 'Cost', meaning: 'What the item cost you' },
        { symbol: 'Price', meaning: 'What you sell it for' },
        { symbol: 'Profit', meaning: 'Price − Cost, identical under both methods' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Margin Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter any two known values', description: 'Cost and price, cost and margin, or price and markup — the rest are derived.' },
        { stepNumber: 2, title: 'Check both percentages', description: 'The calculator shows margin and markup side by side so the difference is visible.' },
        { stepNumber: 3, title: 'Price from a target margin', description: 'Enter cost and the margin you need to find the required selling price.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An item costing £40, sold for £60.',
      inputs: [
        { label: 'Cost', value: '£40' },
        { label: 'Selling price', value: '£60' }
      ],
      steps: [
        'Profit = 60 − 40 = £20.',
        'Margin = 20 ÷ 60 = 33.3%.',
        'Markup = 20 ÷ 40 = 50%.',
        'To achieve a 50% margin instead, price = 40 ÷ (1 − 0.50) = £80.'
      ],
      result: 'Profit £20 · Margin 33.3% · Markup 50%',
      takeaway: 'Same £20 profit, two very different percentages. Pricing to a 50% margin requires £80, not the £60 that a 50% markup produces.'
    },
    sections: [
      {
        id: 'conversion',
        title: 'Converting between the two',
        paragraphs: ['If you know one, the other follows:'],
        bullets: [
          'Markup → Margin: margin = markup ÷ (1 + markup)',
          'Margin → Markup: markup = margin ÷ (1 − margin)',
          'Common pairs: 25% markup = 20% margin · 50% markup = 33.3% margin · 100% markup = 50% margin'
        ],
        callout: { type: 'warning', title: 'Agree which one you mean', text: 'Suppliers usually quote markup, accountants usually report margin. Confusing them when setting prices systematically under-prices the product.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between margin and markup?', answer: 'Both measure the same profit. Margin expresses it as a share of the selling price; markup expresses it as a share of the cost. Markup is always the higher number.' },
      { question: 'How do I price for a target margin?', answer: 'Divide the cost by (1 − target margin). For a 40% margin on a £30 item: 30 ÷ 0.6 = £50.' },
      { question: 'Which should I use for pricing?', answer: 'Margin, because it relates directly to revenue and is what financial reporting uses. Markup is convenient for applying a consistent rule to costs, but is easy to misread as margin.' }
    ]
  }
};
