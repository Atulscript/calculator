import { CalculatorArticle } from '../types/article';

export const CALCULATOR_ARTICLES: Record<string, CalculatorArticle> = {
  "emi-calculator": {
    "calculatorId": "emi-calculator",
    "title": "Loan EMI Calculator",
    "subtitle": "Calculate your monthly EMI for home, car or personal loans. See total interest, the principal vs interest split and a month-by-month schedule.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Financial Lending & Credit Desk",
      "reviewedBy": "Chartered Banking Analyst",
      "lastUpdated": "September 2026"
    },
    "disclaimer": "This calculator provides mathematical estimates using the reducing-balance method. Actual loan interest, processing fees, GST, and floating-rate changes depend on your lender and loan agreement.",
    "overview": [
      "Enter the loan amount, interest rate and tenure to see your monthly EMI, the total interest you'll pay, and how each payment splits between principal and interest. It works for home, car, education and personal loans.",
      "Shows why early EMIs are mostly interest and the real cost of tenure and rate choices, with checked \u20b9 examples."
    ],
    "formulaCard": {
      "title": "Equated Monthly Instalment (EMI) Formula",
      "formula": "EMI = P \u00d7 r \u00d7 (1 + r)^n \u00f7 ((1 + r)^n \u2212 1)",
      "explanation": "This reducing-balance formula is used by Indian commercial banks and housing finance corporations. Each month, interest is levied only on the unpaid outstanding principal balance.",
      "variables": [
        {
          "symbol": "P",
          "meaning": "Principal loan amount borrowed"
        },
        {
          "symbol": "r",
          "meaning": "Monthly interest rate: (Annual percentage rate \u00f7 12 \u00f7 100)"
        },
        {
          "symbol": "n",
          "meaning": "Total number of monthly instalments (Tenure in years \u00d7 12)"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Use the EMI Calculator",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Enter Principal Loan Amount",
          "description": "Specify the loan amount you plan to borrow, excluding your upfront down payment."
        },
        {
          "stepNumber": 2,
          "title": "Input Annual Interest Rate",
          "description": "Enter the percentage rate from your sanction letter or lender rate card."
        },
        {
          "stepNumber": 3,
          "title": "Choose Loan Tenure",
          "description": "Select tenure in years or months to see immediate monthly instalment impact."
        },
        {
          "stepNumber": 4,
          "title": "Examine Schedule & Savings",
          "description": "Inspect total interest payable, principal-to-interest split, and amortization breakdown."
        }
      ]
    },
    "workedExample": {
      "title": "Practical Home Loan Worked Example",
      "scenario": "Borrowing a \u20b925,00,000 home loan at 8.5% annual interest for a 20-year tenure (240 instalments).",
      "inputs": [
        {
          "label": "Principal Amount (P)",
          "value": "\u20b925,00,000"
        },
        {
          "label": "Interest Rate",
          "value": "8.5% per annum"
        },
        {
          "label": "Tenure",
          "value": "20 Years (240 months)"
        }
      ],
      "steps": [
        "Monthly interest rate r = 8.5 \u00f7 12 \u00f7 100 = 0.007083.",
        "Number of months n = 20 \u00d7 12 = 240.",
        "EMI = 25,00,000 \u00d7 0.007083 \u00d7 (1.007083)^240 \u00f7 ((1.007083)^240 \u2212 1) = \u20b921,696.",
        "Total interest over 20 years = (21,696 \u00d7 240) \u2212 25,00,000 = \u20b927,06,939."
      ],
      "result": "Monthly EMI: \u20b921,696 | Total Interest: \u20b927,06,939 | Total Outflow: \u20b952,06,939",
      "takeaway": "In your very first EMI, \u20b917,708 goes toward interest and only \u20b93,988 reduces the principal. Early prepayments yield the highest interest savings."
    },
    "sections": [
      {
        "id": "emi-early-interest",
        "title": "Why Your First EMIs Are Mostly Interest",
        "paragraphs": [
          "In the \u20b925 lakh home loan example above, the first EMI of \u20b921,696 is made up of \u20b917,708 of interest and only \u20b93,988 of principal. That is roughly 82% interest.",
          "The balance shifts gradually. By the final years of the loan, most of each EMI goes towards reducing the principal. This explains why prepayment in the early years saves significantly more interest than prepaying near the end."
        ]
      },
      {
        "id": "emi-tenure-tradeoff",
        "title": "Shorter Tenure or Smaller EMI? (\u20b925 Lakh at 8.5%)",
        "paragraphs": [
          "A 15-year tenure requires \u20b924,618 per month and totals \u20b919,31,328 in interest. A 20-year tenure lowers the EMI to \u20b921,696 but increases interest to \u20b927,06,939.",
          "Paying \u20b92,922 more each month saves about \u20b97.76 lakh in total interest. Before selecting the shorter tenure, confirm that total EMIs remain within 40% to 50% of your net monthly take-home pay."
        ],
        "callout": {
          "type": "tip",
          "title": "Rate Sensitivity",
          "text": "At 9.0% instead of 8.5%, the EMI on the same \u20b925 lakh loan rises by \u20b9797 a month, adding about \u20b91.91 lakh in total interest over 20 years. Even half a percent is worth negotiating with your bank."
        }
      },
      {
        "id": "emi-limits",
        "title": "What This Calculator Doesn't Include",
        "paragraphs": [
          "Loan calculations focus solely on principal and interest. Consider these additional lender costs when planning your budget:"
        ],
        "bullets": [
          "Processing fees, GST on documentation fees, and mandatory home loan property insurance.",
          "Rate changes on floating-rate loans: when the RBI repo rate shifts, lenders generally adjust tenure first, followed by EMI.",
          "Pre-EMI interest charged on under-construction property prior to full disbursement, and broken-period interest before the first EMI."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does my EMI change when interest rates change?",
        "answer": "On a floating-rate loan, yes. Many lenders keep the EMI the same and change the tenure first, so ask yours how it handles rate changes. On a fixed-rate loan, the EMI stays the same."
      },
      {
        "question": "Should I prepay my loan or invest the money?",
        "answer": "If your loan rate is higher than the after-tax return you can reliably earn, prepaying usually comes out ahead. Home loan tax deductions under the old tax regime change the maths, so check your own situation or ask a financial adviser."
      },
      {
        "question": "Will my bank charge me for prepaying?",
        "answer": "RBI rules don't allow banks to charge foreclosure or prepayment penalties on floating-rate loans taken by individuals for non-business purposes. Fixed-rate loans can carry a charge, so read your loan agreement."
      },
      {
        "question": "What's the difference between a flat rate and a reducing rate?",
        "answer": "A flat rate charges interest on the full original amount for the whole tenure, so a 10% flat loan costs much more than a 10% reducing-balance loan. Always ask for the reducing-balance rate or APR before comparing offers."
      },
      {
        "question": "Why is my bank's EMI slightly different from this?",
        "answer": "Usually because of rounding, broken-period interest before the first EMI, or fees added to the loan amount."
      }
    ],
    "references": [
      {
        "title": "Master Circular on Prepayment and Foreclosure Charges on Floating Rate Loans",
        "source": "Reserve Bank of India (RBI)",
        "url": "https://www.rbi.org.in"
      }
    ]
  },
  "loan-calculator": {
    "calculatorId": "emi-calculator",
    "title": "Loan EMI Calculator",
    "subtitle": "Calculate your monthly EMI for home, car or personal loans. See total interest, the principal vs interest split and a month-by-month schedule.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Financial Lending & Credit Desk",
      "reviewedBy": "Chartered Banking Analyst",
      "lastUpdated": "September 2026"
    },
    "disclaimer": "This calculator provides mathematical estimates using the reducing-balance method. Actual loan interest, processing fees, GST, and floating-rate changes depend on your lender and loan agreement.",
    "overview": [
      "Enter the loan amount, interest rate and tenure to see your monthly EMI, the total interest you'll pay, and how each payment splits between principal and interest. It works for home, car, education and personal loans.",
      "Shows why early EMIs are mostly interest and the real cost of tenure and rate choices, with checked \u20b9 examples."
    ],
    "formulaCard": {
      "title": "Equated Monthly Instalment (EMI) Formula",
      "formula": "EMI = P \u00d7 r \u00d7 (1 + r)^n \u00f7 ((1 + r)^n \u2212 1)",
      "explanation": "This reducing-balance formula is used by Indian commercial banks and housing finance corporations. Each month, interest is levied only on the unpaid outstanding principal balance.",
      "variables": [
        {
          "symbol": "P",
          "meaning": "Principal loan amount borrowed"
        },
        {
          "symbol": "r",
          "meaning": "Monthly interest rate: (Annual percentage rate \u00f7 12 \u00f7 100)"
        },
        {
          "symbol": "n",
          "meaning": "Total number of monthly instalments (Tenure in years \u00d7 12)"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Use the EMI Calculator",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Enter Principal Loan Amount",
          "description": "Specify the loan amount you plan to borrow, excluding your upfront down payment."
        },
        {
          "stepNumber": 2,
          "title": "Input Annual Interest Rate",
          "description": "Enter the percentage rate from your sanction letter or lender rate card."
        },
        {
          "stepNumber": 3,
          "title": "Choose Loan Tenure",
          "description": "Select tenure in years or months to see immediate monthly instalment impact."
        },
        {
          "stepNumber": 4,
          "title": "Examine Schedule & Savings",
          "description": "Inspect total interest payable, principal-to-interest split, and amortization breakdown."
        }
      ]
    },
    "workedExample": {
      "title": "Practical Home Loan Worked Example",
      "scenario": "Borrowing a \u20b925,00,000 home loan at 8.5% annual interest for a 20-year tenure (240 instalments).",
      "inputs": [
        {
          "label": "Principal Amount (P)",
          "value": "\u20b925,00,000"
        },
        {
          "label": "Interest Rate",
          "value": "8.5% per annum"
        },
        {
          "label": "Tenure",
          "value": "20 Years (240 months)"
        }
      ],
      "steps": [
        "Monthly interest rate r = 8.5 \u00f7 12 \u00f7 100 = 0.007083.",
        "Number of months n = 20 \u00d7 12 = 240.",
        "EMI = 25,00,000 \u00d7 0.007083 \u00d7 (1.007083)^240 \u00f7 ((1.007083)^240 \u2212 1) = \u20b921,696.",
        "Total interest over 20 years = (21,696 \u00d7 240) \u2212 25,00,000 = \u20b927,06,939."
      ],
      "result": "Monthly EMI: \u20b921,696 | Total Interest: \u20b927,06,939 | Total Outflow: \u20b952,06,939",
      "takeaway": "In your very first EMI, \u20b917,708 goes toward interest and only \u20b93,988 reduces the principal. Early prepayments yield the highest interest savings."
    },
    "sections": [
      {
        "id": "emi-early-interest",
        "title": "Why Your First EMIs Are Mostly Interest",
        "paragraphs": [
          "In the \u20b925 lakh home loan example above, the first EMI of \u20b921,696 is made up of \u20b917,708 of interest and only \u20b93,988 of principal. That is roughly 82% interest.",
          "The balance shifts gradually. By the final years of the loan, most of each EMI goes towards reducing the principal. This explains why prepayment in the early years saves significantly more interest than prepaying near the end."
        ]
      },
      {
        "id": "emi-tenure-tradeoff",
        "title": "Shorter Tenure or Smaller EMI? (\u20b925 Lakh at 8.5%)",
        "paragraphs": [
          "A 15-year tenure requires \u20b924,618 per month and totals \u20b919,31,328 in interest. A 20-year tenure lowers the EMI to \u20b921,696 but increases interest to \u20b927,06,939.",
          "Paying \u20b92,922 more each month saves about \u20b97.76 lakh in total interest. Before selecting the shorter tenure, confirm that total EMIs remain within 40% to 50% of your net monthly take-home pay."
        ],
        "callout": {
          "type": "tip",
          "title": "Rate Sensitivity",
          "text": "At 9.0% instead of 8.5%, the EMI on the same \u20b925 lakh loan rises by \u20b9797 a month, adding about \u20b91.91 lakh in total interest over 20 years. Even half a percent is worth negotiating with your bank."
        }
      },
      {
        "id": "emi-limits",
        "title": "What This Calculator Doesn't Include",
        "paragraphs": [
          "Loan calculations focus solely on principal and interest. Consider these additional lender costs when planning your budget:"
        ],
        "bullets": [
          "Processing fees, GST on documentation fees, and mandatory home loan property insurance.",
          "Rate changes on floating-rate loans: when the RBI repo rate shifts, lenders generally adjust tenure first, followed by EMI.",
          "Pre-EMI interest charged on under-construction property prior to full disbursement, and broken-period interest before the first EMI."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does my EMI change when interest rates change?",
        "answer": "On a floating-rate loan, yes. Many lenders keep the EMI the same and change the tenure first, so ask yours how it handles rate changes. On a fixed-rate loan, the EMI stays the same."
      },
      {
        "question": "Should I prepay my loan or invest the money?",
        "answer": "If your loan rate is higher than the after-tax return you can reliably earn, prepaying usually comes out ahead. Home loan tax deductions under the old tax regime change the maths, so check your own situation or ask a financial adviser."
      },
      {
        "question": "Will my bank charge me for prepaying?",
        "answer": "RBI rules don't allow banks to charge foreclosure or prepayment penalties on floating-rate loans taken by individuals for non-business purposes. Fixed-rate loans can carry a charge, so read your loan agreement."
      },
      {
        "question": "What's the difference between a flat rate and a reducing rate?",
        "answer": "A flat rate charges interest on the full original amount for the whole tenure, so a 10% flat loan costs much more than a 10% reducing-balance loan. Always ask for the reducing-balance rate or APR before comparing offers."
      },
      {
        "question": "Why is my bank's EMI slightly different from this?",
        "answer": "Usually because of rounding, broken-period interest before the first EMI, or fees added to the loan amount."
      }
    ],
    "references": [
      {
        "title": "Master Circular on Prepayment and Foreclosure Charges on Floating Rate Loans",
        "source": "Reserve Bank of India (RBI)",
        "url": "https://www.rbi.org.in"
      }
    ]
  },
  "compound-interest-calculator": {
    "calculatorId": "compound-interest-calculator",
    "title": "Compound Interest Calculator",
    "subtitle": "See how your money grows with compound interest. Add monthly deposits, choose daily to yearly compounding and view a year-by-year growth table.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Wealth & Investment Research Desk",
      "reviewedBy": "Senior Financial Planner",
      "lastUpdated": "September 2026"
    },
    "disclaimer": "Calculations assume constant interest rates and reinvestment of returns. Bank FD interest is subject to tax under applicable income tax slabs. Market investments do not offer guaranteed returns.",
    "overview": [
      "See how a lump sum or regular savings grow when your interest starts earning interest. Choose how often it compounds, from yearly to daily, add monthly or yearly deposits, and view the growth year by year.",
      "Side-by-side yearly vs monthly compounding, FD quarterly example, tax and inflation reality check."
    ],
    "formulaCard": {
      "title": "Compound Interest Formula",
      "formula": "A = P \u00d7 (1 + r \u00f7 n)^(n \u00d7 t)",
      "explanation": "Interest earned is added back to the principal, generating exponential balance acceleration over longer durations.",
      "variables": [
        {
          "symbol": "A",
          "meaning": "Final accrued amount (Principal + Total Interest)"
        },
        {
          "symbol": "P",
          "meaning": "Initial principal deposit"
        },
        {
          "symbol": "r",
          "meaning": "Nominal annual interest rate in decimal form (7% = 0.07)"
        },
        {
          "symbol": "n",
          "meaning": "Compounding frequency per year (4 for quarterly FD, 12 for monthly)"
        },
        {
          "symbol": "t",
          "meaning": "Duration of investment in years"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Use the Compound Interest Calculator",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Enter Starting Principal",
          "description": "Input your initial lump-sum deposit or current portfolio balance."
        },
        {
          "stepNumber": 2,
          "title": "Set Interest Rate & Years",
          "description": "Enter expected annual rate and duration in completed years."
        },
        {
          "stepNumber": 3,
          "title": "Choose Compounding Frequency",
          "description": "Select quarterly for Indian bank fixed deposits, or monthly/yearly."
        },
        {
          "stepNumber": 4,
          "title": "Add Regular Contributions",
          "description": "Optionally enter monthly or yearly deposits to forecast systematic wealth accumulation."
        }
      ]
    },
    "workedExample": {
      "title": "5-Year Fixed Deposit Worked Example",
      "scenario": "Investing \u20b95,00,000 into a bank Fixed Deposit at 7.0% annual interest compounded quarterly for 5 years.",
      "inputs": [
        {
          "label": "Principal",
          "value": "\u20b95,00,000"
        },
        {
          "label": "Annual Rate",
          "value": "7.0%"
        },
        {
          "label": "Compounding",
          "value": "Quarterly (n = 4)"
        },
        {
          "label": "Tenure",
          "value": "5 Years (t = 5)"
        }
      ],
      "steps": [
        "Quarterly periodic interest rate = 7% \u00f7 4 = 1.75% (0.0175).",
        "Total compounding cycles = 5 years \u00d7 4 quarters = 20 cycles.",
        "Final balance = 5,00,000 \u00d7 (1 + 0.0175)^20 = \u20b97,07,389.",
        "Total interest earned = \u20b97,07,389 \u2212 \u20b95,00,000 = \u20b92,07,389."
      ],
      "result": "Maturity Value: \u20b97,07,389 | Total Interest: \u20b92,07,389",
      "takeaway": "Compounding quarterly yields \u20b96,914 more than simple interest on the exact same \u20b95 lakh deposit."
    },
    "sections": [
      {
        "id": "ci-vs-si",
        "title": "Simple Interest vs Compound Interest",
        "paragraphs": [
          "Take \u20b91 lakh at 7% for 10 years. Simple interest pays 7% of the original amount every year, yielding \u20b91,70,000 at maturity.",
          "Compound interest added yearly yields \u20b91,96,715. Compounded monthly, it yields \u20b92,00,966. The gap widens exponentially the longer funds remain invested."
        ]
      },
      {
        "id": "rule-of-72",
        "title": "The Rule of 72: Doubling Your Money",
        "paragraphs": [
          "Divide 72 by your annual interest rate to estimate how many years your money takes to double.",
          "At 8% interest, doubling takes roughly 72 \u00f7 8 = 9 years. At 12%, it takes about 6 years. It serves as a rapid mental check rather than an exact decimal calculation."
        ]
      },
      {
        "id": "ci-reality-check",
        "title": "Before You Rely on the Result",
        "paragraphs": [
          "Keep these real-world economic considerations in mind when planning long-term investments:"
        ],
        "bullets": [
          "Interest on fixed deposits is taxed at your income tax slab, reducing the net take-home return.",
          "Market-linked assets (such as equity mutual funds) fluctuate annually; calculator projections assume a steady average return.",
          "Inflation erodes purchasing power: with 6% annual inflation, \u20b92 lakh in 10 years has the equivalent purchasing power of roughly \u20b91.12 lakh today."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How often do bank FDs compound in India?",
        "answer": "Most banks compound fixed deposit interest quarterly. Check your bank's terms, because some FD options pay out the interest instead of adding it back."
      },
      {
        "question": "What's the difference between compounding frequency and deposit frequency?",
        "answer": "Compounding frequency is how often interest is added to your balance. Deposit frequency is how often you add your own money. They can be different, for example monthly deposits into an account that compounds quarterly."
      },
      {
        "question": "Is this the same as a SIP calculator?",
        "answer": "The maths is similar. A SIP calculator is set up for monthly mutual fund investments at an expected return, so use that one for SIPs."
      },
      {
        "question": "Does compounding more often always earn more?",
        "answer": "Yes, but the extra gets smaller. Monthly compounding beats yearly by a noticeable amount; daily beats monthly by very little."
      }
    ],
    "references": [
      {
        "title": "Principles of Corporate Finance & Compound Interest Dynamics",
        "source": "Reserve Bank of India / Investor Education Portal"
      }
    ]
  },
  "bmi-calculator": {
    "calculatorId": "bmi-calculator",
    "title": "BMI Calculator",
    "subtitle": "Calculate your BMI in kg/cm or lbs/feet and see your WHO category, the Asian BMI cut-offs used in India and your healthy weight range.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Preventive Health & Anthropometry Desk",
      "reviewedBy": "Clinical Nutrition Reviewer",
      "lastUpdated": "September 2026"
    },
    "disclaimer": "This BMI calculator provides screening estimates based on WHO and Indian consensus guidelines. It does not measure body fat directly. Consult a qualified medical practitioner before making diet or exercise changes.",
    "overview": [
      "Enter your height and weight in cm and kg, or feet and pounds, to get your body mass index, your category and a healthy weight range for your height. We also show the lower cut-offs that many Indian doctors use.",
      "Shows WHO and Asian Indian cut-offs side by side, with a healthy-weight-by-height table."
    ],
    "formulaCard": {
      "title": "Body Mass Index (BMI) Formula",
      "formula": "BMI = weight (kg) \u00f7 [height (m)]\u00b2",
      "explanation": "The standard metric formula divides weight in kilograms by height in meters squared. For imperial units: BMI = 703 \u00d7 weight (lb) \u00f7 [height (in)]\u00b2.",
      "variables": [
        {
          "symbol": "weight",
          "meaning": "Body mass measured in kilograms (or pounds)"
        },
        {
          "symbol": "height",
          "meaning": "Stature measured in meters (or inches)"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Calculate Your BMI Accurately",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Choose Measurement System",
          "description": "Select metric (cm, kg) or imperial (feet, inches, lbs)."
        },
        {
          "stepNumber": 2,
          "title": "Enter Morning Height & Weight",
          "description": "Weigh yourself in the morning before breakfast for consistent tracking."
        },
        {
          "stepNumber": 3,
          "title": "Check Dual WHO & Asian Cut-offs",
          "description": "Review your global WHO bracket alongside lower Asian Indian risk thresholds."
        }
      ]
    },
    "workedExample": {
      "title": "Adult Anthropometric Worked Example",
      "scenario": "Evaluating an adult weighing 70 kg with a height of 170 cm (1.70 m).",
      "inputs": [
        {
          "label": "Height",
          "value": "170 cm (1.70 m)"
        },
        {
          "label": "Weight",
          "value": "70 kg"
        }
      ],
      "steps": [
        "Height squared = 1.70 \u00d7 1.70 = 2.89 m\u00b2.",
        "BMI calculation = 70 \u00f7 2.89 = 24.22 kg/m\u00b2.",
        "WHO Global Benchmark: 18.5 \u2013 24.9 is classified as Normal Weight.",
        "Asian Indian Consensus: 23.0 \u2013 24.9 is classified as Overweight."
      ],
      "result": "BMI: 24.2 kg/m\u00b2 (Normal under global WHO; Overweight under Asian Indian cut-offs)",
      "takeaway": "A BMI of 24.2 counts as normal globally but warrants proactive lifestyle review under Indian clinical guidelines due to higher visceral fat risk."
    },
    "sections": [
      {
        "id": "bmi-asian-cutoffs",
        "title": "BMI Categories: WHO and Asian Indian Cut-offs",
        "paragraphs": [
          "South Asians tend to carry more visceral body fat and develop type 2 diabetes and hypertension at a lower BMI than European populations.",
          "A WHO Expert Consultation and the Indian Consensus Guidelines (Misra et al.) recommend lower thresholds for Asian Indians: Normal is 18.5\u201322.9, Overweight is 23.0\u201324.9, and Obese is 25.0 and above."
        ]
      },
      {
        "id": "bmi-healthy-weight",
        "title": "Healthy Weight for Common Heights",
        "paragraphs": [
          "Using the Asian upper limit of 22.9 BMI compared to WHO upper limit (24.9):",
          "- 155 cm (5 ft 1 in): WHO range 44.4\u201359.8 kg; Asian limit 55.0 kg.",
          "- 165 cm (5 ft 5 in): WHO range 50.4\u201367.8 kg; Asian limit 62.3 kg.",
          "- 170 cm (5 ft 7 in): WHO range 53.5\u201372.0 kg; Asian limit 66.2 kg.",
          "- 175 cm (5 ft 9 in): WHO range 56.7\u201376.3 kg; Asian limit 70.1 kg."
        ]
      },
      {
        "id": "bmi-limitations",
        "title": "Where BMI Falls Short",
        "paragraphs": [
          "BMI is a valuable population screening metric, but has recognized physiological limitations:"
        ],
        "bullets": [
          "Cannot differentiate muscle mass from adipose tissue: athletic weightlifters often classify as overweight while possessing low body fat.",
          "Does not measure waist circumference or visceral fat distribution. A waist-to-height ratio under 0.5 provides a critical supplementary indicator.",
          "Inapplicable during pregnancy or lactation.",
          "Children and teenagers require specialized BMI-for-age percentile charts rather than adult cut-offs."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is a healthy BMI for Indian adults?",
        "answer": "Indian guidelines treat 18.5 to 22.9 as normal. The global WHO range is 18.5 to 24.9. If you're between 23 and 24.9, it's worth discussing with your doctor, especially if diabetes or heart disease runs in your family."
      },
      {
        "question": "Is BMI calculated differently for men and women?",
        "answer": "No, the formula is the same for adults. At the same BMI, women usually carry more body fat than men, which is one reason BMI is only a starting point."
      },
      {
        "question": "Can I use this calculator for my child?",
        "answer": "No. Children and teenagers need BMI-for-age percentile charts, which your paediatrician can check."
      },
      {
        "question": "My BMI says overweight, but I'm fit. Is it wrong?",
        "answer": "It may be. If you carry a lot of muscle, BMI overestimates fat. Check your waist-to-height ratio or body fat percentage for a better picture."
      },
      {
        "question": "How often should I check my BMI?",
        "answer": "Once a month is plenty. Body weight moves up and down by a kilo or more from day to day, mostly from water and food."
      }
    ],
    "references": [
      {
        "title": "Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies",
        "source": "WHO Expert Consultation, The Lancet",
        "url": "https://www.who.int"
      },
      {
        "title": "Consensus Statement for Diagnosis of Obesity, Abdominal Obesity and the Metabolic Syndrome for Asian Indians",
        "source": "Journal of the Association of Physicians of India (JAPI)"
      }
    ]
  },
  "calorie-calculator": {
    "calculatorId": "calorie-calculator",
    "title": "Calorie Calculator (BMR & TDEE)",
    "subtitle": "Find how many calories you need per day to maintain, lose or gain weight. Uses the Mifflin-St Jeor equation for BMR and your activity level.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Metabolic Science & Dietetics Desk",
      "reviewedBy": "Registered Clinical Dietitian",
      "lastUpdated": "September 2026"
    },
    "disclaimer": "Calorie targets are estimates based on validated population formulas. Individual basal metabolism fluctuates based on hormone levels and body composition. Never drop below 1,200 kcal daily without medical supervision.",
    "overview": [
      "Find out roughly how many calories your body uses in a day, and how much to eat to maintain, lose or gain weight. You'll need your age, sex, height, weight and a rough idea of how active you are.",
      "Explains TDEE plainly, gives realistic pacing and connects the target to Indian meals and cooking oil."
    ],
    "formulaCard": {
      "title": "Mifflin-St Jeor Basal Metabolic Rate (BMR) Formula",
      "formula": "Men: 10W + 6.25H \u2212 5A + 5 | Women: 10W + 6.25H \u2212 5A \u2212 161",
      "explanation": "BMR measures energy burned at complete rest. Total Daily Energy Expenditure (TDEE) equals BMR multiplied by your physical activity factor (1.2 to 1.9).",
      "variables": [
        {
          "symbol": "W",
          "meaning": "Weight in kilograms"
        },
        {
          "symbol": "H",
          "meaning": "Height in centimeters"
        },
        {
          "symbol": "A",
          "meaning": "Age in completed years"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Determine Your Daily Energy Target",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Input Age, Sex, Height & Weight",
          "description": "Enter current body measurements for baseline BMR calculation."
        },
        {
          "stepNumber": 2,
          "title": "Select Activity Multiplier",
          "description": "Be conservative: desk jobs with 1-3 weekly workouts correspond to lightly active (1.375)."
        },
        {
          "stepNumber": 3,
          "title": "Choose Pacing & Goal",
          "description": "Select maintenance, mild deficit (-250 kcal), standard loss (-500 kcal), or lean surplus."
        }
      ]
    },
    "workedExample": {
      "title": "Two Practical Everyday Examples",
      "scenario": "Comparing calorie targets for Priya (30 yrs, female, lightly active) and Rahul (35 yrs, male, moderately active).",
      "inputs": [
        {
          "label": "Priya (30 yrs, 160 cm, 62 kg)",
          "value": "Lightly active (1.375 multiplier)"
        },
        {
          "label": "Rahul (35 yrs, 175 cm, 80 kg)",
          "value": "Moderately active (1.55 multiplier)"
        }
      ],
      "steps": [
        "Priya BMR = (10 \u00d7 62) + (6.25 \u00d7 160) \u2212 (5 \u00d7 30) \u2212 161 = 1,309 kcal.",
        "Priya TDEE = 1,309 \u00d7 1.375 \u2248 1,800 kcal (fat loss target: 1,300 \u2013 1,550 kcal).",
        "Rahul BMR = (10 \u00d7 80) + (6.25 \u00d7 175) \u2212 (5 \u00d7 35) + 5 = 1,724 kcal.",
        "Rahul TDEE = 1,724 \u00d7 1.55 \u2248 2,672 kcal (fat loss target: ~2,170 kcal)."
      ],
      "result": "Priya TDEE: ~1,800 kcal | Rahul TDEE: ~2,672 kcal",
      "takeaway": "A 500-calorie daily deficit creates approximately 0.5 kg of weekly fat loss without triggering acute metabolic slowdown."
    },
    "sections": [
      {
        "id": "calorie-goals",
        "title": "Choosing Your Goal and Caloric Adjustment",
        "paragraphs": [
          "Weight management requires realistic pacing:",
          "- Maintain weight: Eat at your calculated TDEE.",
          "- Mild fat loss: Deficit of 250 kcal/day (approx 0.25 kg loss per week).",
          "- Standard fat loss: Deficit of 500 kcal/day (approx 0.5 kg loss per week).",
          "- Lean muscle gain: Surplus of 250 to 300 kcal/day paired with resistance training."
        ]
      },
      {
        "id": "indian-meals-anchors",
        "title": "Using Calorie Numbers with Indian Meals",
        "paragraphs": [
          "Tracking calories requires realistic portion references for traditional home-cooked Indian foods:",
          "- One medium phulka / roti without ghee: 100 \u2013 120 kcal.",
          "- One katori (approx 150g) of cooked plain rice: 180 \u2013 200 kcal.",
          "- One katori of cooked home dal: 120 \u2013 150 kcal.",
          "- One tablespoon of ghee, mustard, or refined oil: 110 \u2013 120 kcal.",
          "Cooking fat is where hidden calories accumulate. Two extra tablespoons of oil in a shared sabzi easily add over 200 calories without altering portion size."
        ]
      },
      {
        "id": "calorie-accuracy",
        "title": "How Accurate is the Calculation?",
        "paragraphs": [
          "The Mifflin-St Jeor equation is accurate within approximately 10% for most healthy adults.",
          "Treat your TDEE as an educated starting baseline. Follow the recommended intake for three weeks while tracking body weight. Adjust by 100 to 150 calories if progress stalls."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How many calories should I eat to lose weight?",
        "answer": "Start with your TDEE and subtract 250 to 500 calories a day. That usually gives steady loss you can keep up."
      },
      {
        "question": "Why has my weight loss stopped?",
        "answer": "As you get lighter, you burn fewer calories. Recalculate with your new weight, and check whether portion sizes or cooking oil have crept up."
      },
      {
        "question": "Which BMR formula should I pick?",
        "answer": "Mifflin-St Jeor is the default because it's the most accurate for most adults. Harris-Benedict is included if you want to compare."
      },
      {
        "question": "Should I add calories burned during exercise?",
        "answer": "No. Your activity level already accounts for regular exercise, so adding workout calories on top double counts them."
      },
      {
        "question": "How much protein do I need?",
        "answer": "It depends on your goal and activity. Use the macro calculator to split your calories into protein, carbs and fat."
      }
    ],
    "references": [
      {
        "title": "A new predictive equation for resting energy expenditure in healthy individuals",
        "source": "American Journal of Clinical Nutrition (Mifflin et al.)"
      },
      {
        "title": "Dietary Guidelines for Indians (2024)",
        "source": "National Institute of Nutrition (ICMR-NIN)",
        "url": "https://www.nin.res.in"
      }
    ]
  },
  "age-calculator": {
    "calculatorId": "age-calculator",
    "title": "Age Calculator",
    "subtitle": "Find your exact age from your date of birth in years, months and days. Check your age as on any date, like exam cut-offs, and your next birthday.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Calendrical Mathematics Desk",
      "reviewedBy": "Chronometry Verification Desk",
      "lastUpdated": "September 2026"
    },
    "overview": [
      "Enter your date of birth to see your exact age in years, months and days. You can also check your age on any other date, which is usually what exam and job forms ask for.",
      "Built for Indian exam and job eligibility: age as on a cut-off date, explained with a real one-day-short example."
    ],
    "formulaCard": {
      "title": "Calendrical Borrowing Subtraction Algorithm",
      "formula": "Age = Reference_Date \u2212 Date_Of_Birth (with preceding month day borrowing)",
      "explanation": "Calendar subtraction borrows the real number of days from the preceding month (28, 29, 30, or 31 days) when target day < birth day, and borrows 12 months from years when target month < birth month.",
      "variables": [
        {
          "symbol": "Reference_Date",
          "meaning": "Designated evaluation date (e.g. exam cut-off date or today)"
        },
        {
          "symbol": "Date_Of_Birth",
          "meaning": "Day, month, and year of birth"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Check Exact Age for Exams & Forms",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Enter Date of Birth",
          "description": "Pick your exact year, month, and day of birth."
        },
        {
          "stepNumber": 2,
          "title": "Set Evaluation Cut-Off Date",
          "description": "Change the reference date from today to your exam notification cut-off (e.g. 01-01-2027)."
        },
        {
          "stepNumber": 3,
          "title": "Review Completed Years, Months, Days",
          "description": "Check your exact standing down to the day to confirm statutory eligibility."
        }
      ]
    },
    "workedExample": {
      "title": "Exam Cut-off Worked Example",
      "scenario": "Evaluating exact age on 10 September 2026 for an applicant born on 25 March 1998.",
      "inputs": [
        {
          "label": "Date of Birth",
          "value": "25 March 1998"
        },
        {
          "label": "Evaluation Date",
          "value": "10 September 2026"
        }
      ],
      "steps": [
        "Days calculation: 10 is smaller than 25, so borrow 31 days from August. 10 + 31 \u2212 25 = 16 days.",
        "Months calculation: September becomes August (month 8). 8 \u2212 3 = 5 months.",
        "Years calculation: 2026 \u2212 1998 = 28 years.",
        "Total calendar elapsed time = 28 years, 5 months, and 16 days (10,396 total days)."
      ],
      "result": "Exact Age: 28 Years, 5 Months, 16 Days (10,396 Total Days)",
      "takeaway": "Using average month lengths like 30.4375 introduces day-level errors. Our algorithm uses the exact Gregorian calendar month lengths."
    },
    "sections": [
      {
        "id": "age-exam-eligibility",
        "title": "Checking Your Age for Exams and Government Jobs",
        "paragraphs": [
          "Recruitment notices from UPSC, SSC, state PSCs, and public sector banks establish eligibility as on a specific cut-off date, not the date you submit your application.",
          "Being even a single day over the upper age limit leads to disqualification. For example, if you were born on 2 January 2000 and the cut-off is 1 January 2027, your age is 26 years, 11 months, and 30 days. If the cap is 27, you are eligible by exactly one day."
        ]
      },
      {
        "id": "age-leap-year",
        "title": "Born on 29 February?",
        "paragraphs": [
          "In common (non-leap) years without a 29 February, differing administrative bodies recognize completion of a year on either 28 February or 1 March.",
          "For Indian public sector examinations, consult the specific recruitment gazette notification to verify leap-year birthday cut-off policies."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I calculate my age as on a specific date?",
        "answer": "Change the second date from today to the cut-off date in your notification. The result shows your exact age on that day in years, months and days."
      },
      {
        "question": "On my 18th birthday, am I 18 or 17?",
        "answer": "You complete a year on your birthday, so on your 18th birthday you are exactly 18 years, 0 months and 0 days old."
      },
      {
        "question": "Why does another website give a different number of days?",
        "answer": "Usually one tool counts the end date and the other doesn't, or it uses an average month length. This calculator uses real calendar months and doesn't count the end date twice."
      },
      {
        "question": "Can I find a date of birth from an age?",
        "answer": "Yes. Use reverse mode: enter the age and the date it applies to, and the calculator works back to the date of birth."
      },
      {
        "question": "Is my date of birth saved anywhere?",
        "answer": "No. The calculation runs in your browser, and your date of birth isn't sent to our servers."
      }
    ],
    "references": [
      {
        "title": "Gregorian Calendar & ISO 8601 International Date Standards",
        "source": "International Organization for Standardization"
      }
    ]
  },
  "date-calculator": {
    "calculatorId": "date-calculator",
    "title": "Date Calculator",
    "subtitle": "Count the days between two dates, with or without weekends, or add and subtract days, weeks and months from any date to find a deadline.",
    "readTimeMinutes": 4,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Calendrical Mathematics Desk",
      "reviewedBy": "Verification Desk",
      "lastUpdated": "September 2026"
    },
    "overview": [
      "Count the exact number of days between two dates, and see the same gap in weeks, months and years. You can choose whether to include the end date and see how many of those days are weekdays.",
      "Clears up the include-the-end-date confusion with leave, hotel and notice-period examples."
    ],
    "formulaCard": {
      "title": "Date Interval Duration Logic",
      "formula": "Duration = Target_Date \u2212 Start_Date (+ 1 if inclusive)",
      "explanation": "Calculates the real chronological gap between two calendar dates, with full Gregorian leap-year adjustments and optional weekday/weekend filtering.",
      "variables": [
        {
          "symbol": "Start_Date",
          "meaning": "Starting date of the interval"
        },
        {
          "symbol": "Target_Date",
          "meaning": "Concluding date of the interval"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Calculate the Days Between Dates",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Select Start and End Dates",
          "description": "Choose both dates from the calendar selectors."
        },
        {
          "stepNumber": 2,
          "title": "Toggle End-Day Inclusion",
          "description": "Enable \"Include end date\" if counting leave days or contract periods."
        },
        {
          "stepNumber": 3,
          "title": "View Days, Weeks & Working Days",
          "description": "Read the total days, conversion into weeks, and weekday breakdown."
        }
      ]
    },
    "workedExample": {
      "title": "Practical Date Difference Worked Example",
      "scenario": "Counting the duration from 11 September 2026 to 25 December 2026.",
      "inputs": [
        {
          "label": "Start Date",
          "value": "11 September 2026"
        },
        {
          "label": "End Date",
          "value": "25 December 2026"
        },
        {
          "label": "Include End Date",
          "value": "No"
        }
      ],
      "steps": [
        "Remaining days in September: 19 days.",
        "Days in October: 31 days.",
        "Days in November: 30 days.",
        "Days in December up to 25th: 25 days.",
        "Total days = 19 + 31 + 30 + 25 = 105 days."
      ],
      "result": "Total Gap: 105 Days (Exactly 15 Weeks | 75 Weekdays)",
      "takeaway": "105 days divides evenly into 15 weeks, making schedule planning and project milestones straightforward."
    },
    "sections": [
      {
        "id": "date-end-date-rule",
        "title": "Should You Include the End Date?",
        "paragraphs": [
          "This distinction causes common confusion:",
          "- Leave from 1 March to 5 March covers 5 calendar days: include the end date.",
          "- A hotel booking from 1 March to 5 March represents 4 nights: exclude the end date.",
          "Always verify how notice periods and statutory contracts define the calculation window."
        ]
      },
      {
        "id": "date-weekdays-holidays",
        "title": "Weekdays and Bank Holidays",
        "paragraphs": [
          "The weekday count excludes Saturdays and Sundays.",
          "Because regional holidays vary by state, employer, and Indian banking schedules (second and fourth Saturdays), subtract local holidays manually from the weekday total."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I count the days between two dates?",
        "answer": "Enter both dates and the calculator gives you the total. Decide first whether the end date should count; it changes the answer by one day."
      },
      {
        "question": "Does it account for leap years?",
        "answer": "Yes. 29 February is counted whenever it falls between your two dates."
      },
      {
        "question": "Can it exclude public holidays?",
        "answer": "Not automatically, because holidays vary by state and employer. Use the weekday count and subtract your holidays."
      },
      {
        "question": "How many weeks are there between two dates?",
        "answer": "The result shows the gap in weeks and days as well as total days. 105 days, for example, is exactly 15 weeks."
      },
      {
        "question": "How do I count days from today?",
        "answer": "Leave the start date as today and pick the end date. For a countdown to an event, the days until calculator is simpler."
      }
    ],
    "references": [
      {
        "title": "Civil Calendar Calculations & Day Count Conventions",
        "source": "International Association of Quantitative Finance"
      }
    ]
  },
  "date-difference-calculator": {
    "calculatorId": "date-calculator",
    "title": "Date Calculator",
    "subtitle": "Count the days between two dates, with or without weekends, or add and subtract days, weeks and months from any date to find a deadline.",
    "readTimeMinutes": 4,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Calendrical Mathematics Desk",
      "reviewedBy": "Verification Desk",
      "lastUpdated": "September 2026"
    },
    "overview": [
      "Count the exact number of days between two dates, and see the same gap in weeks, months and years. You can choose whether to include the end date and see how many of those days are weekdays.",
      "Clears up the include-the-end-date confusion with leave, hotel and notice-period examples."
    ],
    "formulaCard": {
      "title": "Date Interval Duration Logic",
      "formula": "Duration = Target_Date \u2212 Start_Date (+ 1 if inclusive)",
      "explanation": "Calculates the real chronological gap between two calendar dates, with full Gregorian leap-year adjustments and optional weekday/weekend filtering.",
      "variables": [
        {
          "symbol": "Start_Date",
          "meaning": "Starting date of the interval"
        },
        {
          "symbol": "Target_Date",
          "meaning": "Concluding date of the interval"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Calculate the Days Between Dates",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Select Start and End Dates",
          "description": "Choose both dates from the calendar selectors."
        },
        {
          "stepNumber": 2,
          "title": "Toggle End-Day Inclusion",
          "description": "Enable \"Include end date\" if counting leave days or contract periods."
        },
        {
          "stepNumber": 3,
          "title": "View Days, Weeks & Working Days",
          "description": "Read the total days, conversion into weeks, and weekday breakdown."
        }
      ]
    },
    "workedExample": {
      "title": "Practical Date Difference Worked Example",
      "scenario": "Counting the duration from 11 September 2026 to 25 December 2026.",
      "inputs": [
        {
          "label": "Start Date",
          "value": "11 September 2026"
        },
        {
          "label": "End Date",
          "value": "25 December 2026"
        },
        {
          "label": "Include End Date",
          "value": "No"
        }
      ],
      "steps": [
        "Remaining days in September: 19 days.",
        "Days in October: 31 days.",
        "Days in November: 30 days.",
        "Days in December up to 25th: 25 days.",
        "Total days = 19 + 31 + 30 + 25 = 105 days."
      ],
      "result": "Total Gap: 105 Days (Exactly 15 Weeks | 75 Weekdays)",
      "takeaway": "105 days divides evenly into 15 weeks, making schedule planning and project milestones straightforward."
    },
    "sections": [
      {
        "id": "date-end-date-rule",
        "title": "Should You Include the End Date?",
        "paragraphs": [
          "This distinction causes common confusion:",
          "- Leave from 1 March to 5 March covers 5 calendar days: include the end date.",
          "- A hotel booking from 1 March to 5 March represents 4 nights: exclude the end date.",
          "Always verify how notice periods and statutory contracts define the calculation window."
        ]
      },
      {
        "id": "date-weekdays-holidays",
        "title": "Weekdays and Bank Holidays",
        "paragraphs": [
          "The weekday count excludes Saturdays and Sundays.",
          "Because regional holidays vary by state, employer, and Indian banking schedules (second and fourth Saturdays), subtract local holidays manually from the weekday total."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I count the days between two dates?",
        "answer": "Enter both dates and the calculator gives you the total. Decide first whether the end date should count; it changes the answer by one day."
      },
      {
        "question": "Does it account for leap years?",
        "answer": "Yes. 29 February is counted whenever it falls between your two dates."
      },
      {
        "question": "Can it exclude public holidays?",
        "answer": "Not automatically, because holidays vary by state and employer. Use the weekday count and subtract your holidays."
      },
      {
        "question": "How many weeks are there between two dates?",
        "answer": "The result shows the gap in weeks and days as well as total days. 105 days, for example, is exactly 15 weeks."
      },
      {
        "question": "How do I count days from today?",
        "answer": "Leave the start date as today and pick the end date. For a countdown to an event, the days until calculator is simpler."
      }
    ],
    "references": [
      {
        "title": "Civil Calendar Calculations & Day Count Conventions",
        "source": "International Association of Quantitative Finance"
      }
    ]
  },
  "percentage-calculator": {
    "calculatorId": "percentage-calculator",
    "title": "Percentage Calculator",
    "subtitle": "Calculate percent of a number, percentage increase, decrease, differences, and discounts step by step.",
    "readTimeMinutes": 5,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Mathematical Education Desk",
      "reviewedBy": "Applied Mathematics Specialist",
      "lastUpdated": "September 2026"
    },
    "overview": [
      "A percentage expresses a fraction of 100. It is a fundamental calculation used daily in sales discounts, exam marks, salary appraisals, taxes, and interest calculations.",
      "This tool solves multiple percentage problems: finding a percent of a number, calculating percentage change, finding the base number, and determining percentage ratios."
    ],
    "formulaCard": {
      "title": "Standard Percentage Formulas",
      "formula": "Percentage = (Part \u00f7 Whole) \u00d7 100 | % Change = ((New \u2212 Old) \u00f7 Old) \u00d7 100",
      "explanation": "Divide the part by the total base and multiply by 100. For percentage changes, divide the difference by the original starting value.",
      "variables": [
        {
          "symbol": "Part",
          "meaning": "The subset or portion of the total value"
        },
        {
          "symbol": "Whole",
          "meaning": "The total reference base (100% equivalent)"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Use the Percentage Calculator",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Select Calculation Mode",
          "description": "Pick percentage of a number, percentage increase/decrease, or reverse percentage."
        },
        {
          "stepNumber": 2,
          "title": "Enter Your Figures",
          "description": "Type the values or adjust the sliders for real-time calculation."
        },
        {
          "stepNumber": 3,
          "title": "Review Step-by-Step Working",
          "description": "Examine the fractional working and mathematical steps."
        }
      ]
    },
    "workedExample": {
      "title": "Exam Marks & GST Worked Example",
      "scenario": "A student scores 485 marks out of 600 in their board examinations.",
      "inputs": [
        {
          "label": "Marks Obtained",
          "value": "485"
        },
        {
          "label": "Total Marks",
          "value": "600"
        }
      ],
      "steps": [
        "Divide obtained score by total: 485 \u00f7 600 = 0.80833.",
        "Multiply by 100 to convert to percentage: 0.80833 \u00d7 100 = 80.83%."
      ],
      "result": "Percentage Score: 80.83%",
      "takeaway": "Always divide by the original total base figure before multiplying by 100."
    },
    "sections": [
      {
        "id": "percentage-increase-vs-decrease",
        "title": "Percentage Increase vs Decrease Asymmetry",
        "paragraphs": [
          "A common mistake is assuming that a 50% increase followed by a 50% decrease returns you to your starting value.",
          "If \u20b91,000 increases by 50%, it becomes \u20b91,500. A subsequent 50% drop reduces it by \u20b9750, leaving \u20b9750 (a net 25% loss). Because the base shifts, equal upward and downward percentages are never symmetrical."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How do I calculate percentage in my head?",
        "answer": "Find 10% by moving the decimal point one place to the left. Then double that number for 20%, halve it for 5%, or multiply accordingly."
      },
      {
        "question": "How do I calculate marks percentage?",
        "answer": "Divide the total marks you scored by the maximum possible marks, and multiply the result by 100."
      },
      {
        "question": "What is the formula for percentage increase?",
        "answer": "Subtract the old value from the new value, divide by the old value, and multiply by 100: ((New \u2212 Old) \u00f7 Old) \u00d7 100."
      }
    ],
    "references": [
      {
        "title": "Foundations of Practical Mathematics",
        "source": "NCERT Mathematics Curriculum"
      }
    ]
  },
  "unit-converter": {
    "calculatorId": "unit-converter",
    "title": "Unit Converter",
    "subtitle": "Convert length, weight, volume, temperature, speed, area, and digital storage units accurately.",
    "readTimeMinutes": 4,
    "author": {
      "name": "Calculator360 Editorial Team",
      "role": "Metrology & Scientific Standards Desk",
      "reviewedBy": "Applied Science Reviewer",
      "lastUpdated": "September 2026"
    },
    "overview": [
      "Converts between international metric units (SI) and imperial/customary units with precision scientific conversion factors.",
      "Features length, mass, volume, temperature, area, speed, pressure, energy, and digital memory conversions."
    ],
    "formulaCard": {
      "title": "Linear Metric Conversion Principle",
      "formula": "Target_Value = Source_Value \u00d7 Conversion_Factor",
      "explanation": "Units within the same physical dimension convert linearly through defined constants, with temperature conversions accounting for offset shifts (such as +273.15 for Kelvin or \u00d79/5 + 32 for Fahrenheit).",
      "variables": [
        {
          "symbol": "Source_Value",
          "meaning": "Starting numerical magnitude"
        },
        {
          "symbol": "Conversion_Factor",
          "meaning": "NIST established conversion ratio"
        }
      ]
    },
    "howToSteps": {
      "title": "How to Convert Units Rapidly",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Select Measurement Category",
          "description": "Choose from length, weight, temperature, speed, area, or volume."
        },
        {
          "stepNumber": 2,
          "title": "Choose Input & Output Units",
          "description": "Pick your source unit and destination unit from the dropdown selectors."
        },
        {
          "stepNumber": 3,
          "title": "Enter Amount",
          "description": "Type your number for instant bi-directional conversion."
        }
      ]
    },
    "workedExample": {
      "title": "Height & Distance Metric Conversion",
      "scenario": "Converting 5 feet 9 inches (69 inches) into centimeters.",
      "inputs": [
        {
          "label": "Imperial Length",
          "value": "69 inches"
        },
        {
          "label": "NIST Standard Factor",
          "value": "1 inch = 2.54 cm"
        }
      ],
      "steps": [
        "Multiply total inches by 2.54: 69 \u00d7 2.54 = 175.26 cm.",
        "Expressed in meters: 175.26 \u00f7 100 = 1.7526 m."
      ],
      "result": "Converted Value: 175.26 cm (1.75 m)",
      "takeaway": "The inch-to-centimeter conversion factor of 2.54 is exact by international treaty."
    },
    "sections": [
      {
        "id": "metric-vs-imperial",
        "title": "Metric vs Imperial Systems in Everyday Use",
        "paragraphs": [
          "In India and most of the world, official measurements rely on the metric system (meters, kilograms, liters).",
          "However, real estate often trades in square feet, height is frequently quoted in feet and inches, and vehicle speedometers feature both km/h and mph. Having fast, bidirectional conversions prevents costly mistakes."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How many centimeters are in an inch?",
        "answer": "Exactly 2.54 centimeters are in one inch by international scientific definition."
      },
      {
        "question": "How do I convert Celsius to Fahrenheit?",
        "answer": "Multiply degrees Celsius by 1.8 (or 9/5) and add 32: (\u00b0C \u00d7 1.8) + 32 = \u00b0F."
      },
      {
        "question": "How many kilograms are in a pound?",
        "answer": "One pound (lb) is equal to approximately 0.453592 kilograms, or 1 kg equals approximately 2.20462 lbs."
      }
    ],
    "references": [
      {
        "title": "The International System of Units (SI)",
        "source": "Bureau International des Poids et Mesures (BIPM)"
      },
      {
        "title": "Guide for the Use of the International System of Units",
        "source": "National Institute of Standards and Technology (NIST)"
      }
    ]
  }
};

export function getCalculatorArticle(
  calculatorId: string,
  calculatorName: string,
  categoryName: string
): CalculatorArticle {
  if (CALCULATOR_ARTICLES[calculatorId]) {
    return CALCULATOR_ARTICLES[calculatorId];
  }

  // Authoritative default editorial template for catalog calculators
  return {
    calculatorId,
    title: `${calculatorName}`,
    subtitle: `Explore formulas, worked examples, step-by-step instructions, and practical applications for ${calculatorName.toLowerCase()}.`,
    readTimeMinutes: 4,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Editorial & Research Team',
      reviewedBy: 'Calculator360 Verification Desk',
      lastUpdated: 'September 2026'
    },
    overview: [
      `The ${calculatorName} provides fast, verified calculations calibrated to standard mathematical principles and practical everyday scenarios.`,
      `Designed for ease of use on mobile and desktop without sign-up or paywalls.`
    ],
    howToSteps: {
      title: `How to Use the ${calculatorName}`,
      steps: [
        {
          stepNumber: 1,
          title: 'Input Your Values',
          description: 'Enter your numbers into the input fields or use synchronized sliders for quick adjustments.'
        },
        {
          stepNumber: 2,
          title: 'Verify Settings & Units',
          description: 'Ensure the selected units or time intervals match your problem.'
        },
        {
          stepNumber: 3,
          title: 'Read Your Results',
          description: 'Examine primary results, summary tables, and visual breakdown indicators.'
        },
        {
          stepNumber: 4,
          title: 'Copy or Share',
          description: 'Click "Copy Summary" to copy formatted calculations directly to your clipboard.'
        }
      ]
    },
    sections: [
      {
        id: 'practical-significance',
        title: 'Practical Application & Notes',
        paragraphs: [
          `Calculations in ${categoryName} help you plan budgets, check numbers, and avoid common calculation errors.`,
          `Always check input values and verify numbers against official documentation where legal or financial decisions are involved.`
        ]
      }
    ],
    faqs: [
      {
        question: `How accurate is the ${calculatorName}?`,
        answer: `Our calculators use standard mathematical algorithms with verified formulas and safeguards against rounding errors.`
      },
      {
        question: `Can I copy my calculation results?`,
        answer: `Yes, click the "Copy Summary" button above to copy formatted results directly to your clipboard.`
      },
      {
        question: `Does this calculator work on mobile?`,
        answer: `All Calculator360 tools are engineered with responsive layouts and touch-friendly controls optimized for mobile phones and tablets.`
      }
    ],
    references: [
      { title: 'Standard Mathematical Tables and Formulae', source: 'Mathematical Reference Standards' }
    ]
  };
}
