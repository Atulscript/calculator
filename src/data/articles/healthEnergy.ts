import { CalculatorArticle } from '../../types/article';

/**
 * Energy expenditure, body composition and macronutrient articles.
 *
 * YMYL cluster. Every entry names the formula it implements, states who it is
 * inaccurate for, and carries a disclaimer. Author blocks claim organisational
 * authorship only — no `reviewedBy` credential unless a named person with that
 * qualification has genuinely reviewed the page.
 */
export const HEALTH_ENERGY_ARTICLES: Record<string, CalculatorArticle> = {
  'bmr-calculator': {
    calculatorId: 'bmr-calculator',
    title: 'BMR Calculator',
    subtitle:
      'Calculate the calories your body burns at complete rest, using the Mifflin-St Jeor equation preferred in clinical practice.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'BMR equations estimate an average for a population, not a measurement of you specifically. Individual metabolic rates vary by roughly ±10% from any prediction. This is general information, not medical or dietary advice.',
    overview: [
      'Basal metabolic rate is what your body spends staying alive with no activity at all — breathing, circulating blood, maintaining temperature, repairing tissue. For most people it is 60–70% of total daily energy use, which makes it the largest single component by some distance.',
      'BMR on its own is not a calorie target. It is the floor that everything else is added to. If you want a number to actually eat to, calculate your TDEE next.'
    ],
    formulaCard: {
      title: 'Mifflin-St Jeor Equation',
      formula: 'BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + s',
      explanation:
        'The constant s is +5 for men and −161 for women. Published in 1990, this equation has outperformed the older Harris-Benedict formula in validation studies and is the one most dietitians now use.',
      variables: [
        { symbol: 'weight', meaning: 'Body weight in kilograms' },
        { symbol: 'height', meaning: 'Height in centimetres' },
        { symbol: 'age', meaning: 'Age in years' },
        { symbol: 's', meaning: 'Sex constant: +5 male, −161 female' }
      ]
    },
    howToSteps: {
      title: 'How to Use the BMR Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose metric or imperial',
          description: 'The equation works in kilograms and centimetres; imperial inputs are converted for you.'
        },
        {
          stepNumber: 2,
          title: 'Enter age, sex, height and weight',
          description:
            'Use current weight rather than a target weight. BMR scales with the body you have now, not the one you are working towards.'
        },
        {
          stepNumber: 3,
          title: 'Read the result as a floor, not a target',
          description:
            'Eating at BMR would mean consuming nothing for any activity at all, including walking around the house.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 32-year-old woman, 165 cm tall, weighing 68 kg.',
      inputs: [
        { label: 'Sex', value: 'Female (s = −161)' },
        { label: 'Age', value: '32' },
        { label: 'Height', value: '165 cm' },
        { label: 'Weight', value: '68 kg' }
      ],
      steps: [
        '10 × 68 = 680',
        '6.25 × 165 = 1,031.25',
        '5 × 32 = 160',
        'BMR = 680 + 1,031.25 − 160 − 161 = 1,390 kcal per day'
      ],
      result: 'BMR ≈ 1,390 kcal/day',
      takeaway:
        'This is the resting requirement. With light activity the same person would need roughly 1,910 kcal to maintain weight — the difference between the two numbers is why BMR should never be used as an eating target.'
    },
    sections: [
      {
        id: 'bmr-vs-rmr',
        title: 'BMR and RMR are not quite the same',
        paragraphs: [
          'Strictly, BMR is measured under tightly controlled conditions: after a full night\'s sleep, fasted for twelve hours, at rest in a thermally neutral room. Resting metabolic rate (RMR) is measured under looser conditions and comes out roughly 10% higher.',
          'In everyday use the terms are treated as interchangeable, and most calculators — including this one — use a BMR equation and describe the output either way. The distinction matters for research, rarely for planning your food.'
        ]
      },
      {
        id: 'what-changes-bmr',
        title: 'What actually moves your BMR',
        paragraphs: [
          'The equation uses four inputs, but the underlying driver is how much metabolically active tissue you carry:'
        ],
        bullets: [
          'Lean mass is the strongest factor. Muscle burns more at rest than fat, which is why two people at identical weight can differ noticeably.',
          'Size raises it. Larger bodies cost more to maintain, which is why both height and weight appear in the formula.',
          'Age lowers it, largely because lean mass tends to decline over time rather than because metabolism mysteriously slows.',
          'Sex affects it mainly through average differences in body composition, which is what the constant is accounting for.',
          'Prolonged severe dieting can suppress it below prediction — one reason very aggressive deficits tend to stall.'
        ],
        callout: {
          type: 'info',
          title: 'Why the equation ignores body fat percentage',
          text: 'Mifflin-St Jeor deliberately uses only easily measured inputs. If you know your body fat percentage, the Katch-McArdle equation is usually more accurate because it works from lean mass directly.'
        }
      }
    ],
    faqs: [
      {
        question: 'Should I eat my BMR?',
        answer:
          'No. BMR excludes all activity, including everyday movement. Eating at BMR creates a substantial unintended deficit for most people. Use TDEE as the maintenance figure and adjust from there.'
      },
      {
        question: 'How accurate is a BMR calculation?',
        answer:
          'Mifflin-St Jeor typically lands within about 10% of measured values for most adults. It is less reliable at the extremes of body composition — very muscular or very obese individuals — because it cannot see how much of your weight is lean tissue.'
      },
      {
        question: 'Why is my BMR lower than a friend of the same weight?',
        answer:
          'Usually differences in height, age, sex or lean mass. A taller or younger person of the same weight will generally have a higher BMR, and someone carrying more muscle at the same weight will too.'
      }
    ],
    references: [
      {
        title: 'A new predictive equation for resting energy expenditure in healthy individuals',
        source: 'Mifflin MD et al., American Journal of Clinical Nutrition (1990)'
      }
    ]
  },

  'tdee-calculator': {
    calculatorId: 'tdee-calculator',
    title: 'TDEE Calculator',
    subtitle:
      'Find the calories you burn across a full day including activity. This is your maintenance level — the number every diet target is built from.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Activity multipliers are broad categories, and most people misjudge which one applies to them. Treat the result as a starting estimate to be adjusted against real weight data over several weeks. Not medical or dietary advice.',
    overview: [
      'Total daily energy expenditure is everything your body burns in twenty-four hours: resting metabolism, digesting food, deliberate exercise, and all the incidental movement in between. Eat at your TDEE and weight holds steady.',
      'It is calculated by taking BMR and multiplying by an activity factor. That multiplier is the weakest link in the whole calculation, which is why the result should be treated as a hypothesis to test rather than a fact.'
    ],
    formulaCard: {
      title: 'TDEE From BMR and Activity',
      formula: 'TDEE = BMR × Activity Multiplier',
      explanation:
        'BMR comes from the Mifflin-St Jeor equation. The multiplier scales it to account for movement — from 1.2 for a genuinely sedentary day to 1.9 for heavy physical work or twice-daily training.',
      variables: [
        { symbol: '1.2', meaning: 'Sedentary — desk job, little deliberate exercise' },
        { symbol: '1.375', meaning: 'Light — exercise 1–3 days a week' },
        { symbol: '1.55', meaning: 'Moderate — exercise 3–5 days a week' },
        { symbol: '1.725', meaning: 'Very active — hard exercise 6–7 days a week' },
        { symbol: '1.9', meaning: 'Extra active — physical job or twice-daily training' }
      ]
    },
    howToSteps: {
      title: 'How to Use the TDEE Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your body details',
          description: 'Age, sex, height and current weight, which together produce your BMR.'
        },
        {
          stepNumber: 2,
          title: 'Choose an activity level honestly',
          description:
            'Base it on a typical week, not your best week. Most people who train three times and sit the rest of the time are "light", not "moderate".'
        },
        {
          stepNumber: 3,
          title: 'Note the maintenance figure',
          description: 'This is roughly what you can eat without gaining or losing weight.'
        },
        {
          stepNumber: 4,
          title: 'Test it against reality for two to three weeks',
          description:
            'Eat at the estimate, weigh yourself consistently, and adjust. Real data about you beats any equation.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario:
        'A 32-year-old woman, 165 cm, 68 kg, with a desk job who trains twice a week — light activity.',
      inputs: [
        { label: 'BMR', value: '1,390 kcal (Mifflin-St Jeor)' },
        { label: 'Activity level', value: 'Light (×1.375)' }
      ],
      steps: [
        'TDEE = 1,390 × 1.375 = 1,911 kcal per day.',
        'A moderate fat-loss deficit of 20% gives 1,911 × 0.8 = 1,529 kcal.',
        'That deficit of roughly 382 kcal a day is about 2,670 a week, or a little under 0.35 kg of fat.'
      ],
      result: 'Maintenance ≈ 1,911 kcal/day · 20% deficit ≈ 1,529 kcal/day',
      takeaway:
        'Choosing "moderate" instead of "light" would have given 2,155 kcal — a 244 kcal difference that turns an intended deficit into near-maintenance. The activity multiplier is where most TDEE estimates go wrong.'
    },
    sections: [
      {
        id: 'activity-level-honesty',
        title: 'Almost everyone picks the wrong activity level',
        paragraphs: [
          'The multipliers describe your whole week, not how you feel about your training. An hour in the gym burns perhaps 300–500 calories; the other twenty-three hours of a desk-based day matter more. Someone who trains four times a week but is otherwise seated is usually closer to "light" than "moderate".',
          'If you are unsure, pick the lower option. Underestimating means you lose slightly faster than planned, which is easy to correct. Overestimating means a deficit that does not exist, and weeks of confusion about why nothing is happening.'
        ],
        callout: {
          type: 'tip',
          title: 'A better method than guessing',
          text: 'Track intake and weight for two to three weeks without changing anything. Average daily intake at stable weight is your actual TDEE, measured rather than predicted.'
        }
      },
      {
        id: 'neat',
        title: 'The component nobody accounts for',
        paragraphs: [
          'Non-exercise activity thermogenesis — fidgeting, standing, walking, general restlessness — varies enormously between individuals and can differ by several hundred calories a day between two otherwise similar people.',
          'It also falls when you diet, often without you noticing. People in a deficit move less spontaneously, which quietly reduces TDEE and is part of why weight loss slows over time even when intake has not changed.'
        ]
      },
      {
        id: 'adjusting',
        title: 'Adjusting the estimate with real data',
        paragraphs: [
          'After two to three weeks of consistent eating, compare your average weekly weight against the previous week. Weigh at the same time of day under the same conditions, because daily fluctuation from water, sodium and digestion easily exceeds real fat change.',
          'If weight is flat and you wanted to lose, drop intake by 150–200 kcal and repeat. If you are losing faster than about 1% of body weight a week, raise it — rapid loss costs disproportionately more lean tissue.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the difference between BMR and TDEE?',
        answer:
          'BMR is what you burn at complete rest. TDEE is BMR plus digestion, exercise and all other movement. TDEE is always the higher number and is the one to use as a maintenance target.'
      },
      {
        question: 'How big should a calorie deficit be?',
        answer:
          'A deficit of 15–25% below TDEE suits most people, producing roughly 0.5–1% of body weight lost per week. Larger deficits work faster but cost more lean mass and are considerably harder to sustain.'
      },
      {
        question: 'Why has my weight loss stalled at the same calories?',
        answer:
          'TDEE falls as you lose weight — a lighter body costs less to run, and incidental movement often declines too. Recalculate at your new weight every 4–5 kg and expect the maintenance figure to drift downward.'
      },
      {
        question: 'Does this account for exercise I log separately?',
        answer:
          'The activity multiplier already includes your usual training. Adding logged exercise calories on top double-counts it, which is one of the most common reasons an intended deficit disappears.'
      }
    ],
    references: [
      {
        title: 'A new predictive equation for resting energy expenditure in healthy individuals',
        source: 'Mifflin MD et al., American Journal of Clinical Nutrition (1990)'
      },
      {
        title: 'Dietary Reference Intakes: Energy',
        source: 'National Academies of Sciences, Engineering, and Medicine'
      }
    ]
  },

  'body-fat-calculator': {
    calculatorId: 'body-fat-calculator',
    title: 'Body Fat Percentage Calculator',
    subtitle:
      'Estimate body fat from tape measurements using the US Navy circumference method — no calipers or scales required.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Circumference methods estimate body fat within roughly ±3–4 percentage points compared with DEXA. They are useful for tracking change over time and unreliable as a precise single measurement. Not medical advice.',
    overview: [
      'Body fat percentage answers something BMI cannot: how much of your weight is fat rather than muscle, bone and water. Two people at an identical BMI can differ by twenty percentage points of body fat.',
      'This calculator uses the US Navy circumference method, which needs only a tape measure. It is less precise than a DEXA scan but far more accessible, and consistent enough to track a trend if you measure the same way each time.'
    ],
    formulaCard: {
      title: 'US Navy Circumference Method',
      formula:
        'Men: %BF = 495 ÷ (1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)) − 450',
      explanation:
        'For women the formula becomes 495 ÷ (1.29579 − 0.35004 × log₁₀(waist + hip − neck) + 0.22100 × log₁₀(height)) − 450. Measurements are in centimetres. The method works because fat distributes predictably enough around the waist and hips to infer total fat from circumference ratios.',
      variables: [
        { symbol: 'waist', meaning: 'At the navel for men; at the narrowest point for women' },
        { symbol: 'neck', meaning: 'Just below the larynx, tape sloping slightly downward at the front' },
        { symbol: 'hip', meaning: 'At the widest point — women only' },
        { symbol: 'height', meaning: 'Standing height without shoes' }
      ]
    },
    howToSteps: {
      title: 'How to Measure and Use the Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Measure first thing in the morning',
          description:
            'Before eating or drinking, and before training. Consistency of timing matters more than the specific time you choose.'
        },
        {
          stepNumber: 2,
          title: 'Keep the tape snug but not compressing',
          description:
            'It should sit flat against skin without indenting it. Pulling tighter is the most common source of measurement error.'
        },
        {
          stepNumber: 3,
          title: 'Measure each site twice',
          description:
            'If two readings differ by more than half a centimetre, take a third and use the median. Breathe normally and do not hold your stomach in.'
        },
        {
          stepNumber: 4,
          title: 'Track the trend, not the single number',
          description:
            'Re-measure every two to four weeks under identical conditions. The direction of travel is reliable even when the absolute figure is not.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A man of 180 cm with a waist of 88 cm and a neck of 38 cm.',
      inputs: [
        { label: 'Height', value: '180 cm' },
        { label: 'Waist', value: '88 cm' },
        { label: 'Neck', value: '38 cm' }
      ],
      steps: [
        'waist − neck = 88 − 38 = 50 cm.',
        'log₁₀(50) = 1.699 · log₁₀(180) = 2.2553.',
        'Denominator = 1.0324 − (0.19077 × 1.699) + (0.15456 × 2.2553) = 1.0570.',
        '%BF = 495 ÷ 1.0570 − 450 = 468.3 − 450 = 18.3%.'
      ],
      result: 'Estimated body fat ≈ 18.3%',
      takeaway:
        'That sits in the typical "fitness to average" band for men. Losing 4 cm from the waist at the same neck measurement would bring the estimate to roughly 14.5%, which shows how sensitive the method is to waist change — and why it tracks fat loss well.'
    },
    sections: [
      {
        id: 'healthy-ranges',
        title: 'What the ranges mean',
        paragraphs: [
          'Body fat categories differ by sex, because women carry more essential fat for normal physiological function. Commonly cited ranges are:'
        ],
        bullets: [
          'Essential fat: 2–5% men, 10–13% women. Below this is dangerous, not impressive.',
          'Athletes: 6–13% men, 14–20% women.',
          'Fitness: 14–17% men, 21–24% women.',
          'Average: 18–24% men, 25–31% women.',
          'Obese: 25%+ men, 32%+ women.'
        ],
        callout: {
          type: 'warning',
          title: 'Very low body fat is not a goal',
          text: 'Sustained body fat below the athlete range is associated with hormonal disruption, loss of menstrual function, impaired immunity and bone density loss. Competitive physique athletes hold those levels briefly and deliberately, not year-round.'
        }
      },
      {
        id: 'method-accuracy',
        title: 'How this compares with other methods',
        paragraphs: [
          'DEXA is the practical reference standard and is accurate to within about 1–2 percentage points, but it requires a clinic visit. Hydrostatic weighing is comparably accurate and even less accessible. Bioelectrical impedance scales are convenient but heavily affected by hydration — the same person can read several points apart morning and evening.',
          'The Navy method sits in between: typically within 3–4 points of DEXA, free, and repeatable. Its weakness is that it infers fat from where you carry it, so it tends to overestimate for people who store fat centrally and underestimate for very muscular builds with thick necks.'
        ]
      },
      {
        id: 'why-not-bmi',
        title: 'Why this beats BMI for individuals',
        paragraphs: [
          'BMI is weight scaled to height and cannot distinguish tissue types. A muscular athlete and a sedentary person of the same height and weight receive identical BMIs despite entirely different health profiles.',
          'That said, BMI is not useless — it is a reasonable population screening tool and needs only two numbers you already know. Body fat percentage is the better individual measure, and waist circumference alone is a surprisingly strong predictor of metabolic risk on its own.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How accurate is the Navy body fat method?',
        answer:
          'Typically within 3–4 percentage points of a DEXA scan for most adults. It is least accurate at the extremes — very lean or very heavy individuals — and for people whose fat distribution is unusual for their sex.'
      },
      {
        question: 'Why does my reading change day to day?',
        answer:
          'Mostly measurement technique and water retention. Tape tension, time of day, salt intake and digestion all move waist circumference by a centimetre or more. Measure under identical conditions and compare monthly averages rather than individual readings.'
      },
      {
        question: 'Do I measure my waist at the navel or the narrowest point?',
        answer:
          'The Navy protocol uses the navel for men and the narrowest point of the torso for women. Using the wrong site is one of the largest sources of error, so pick the correct one and stay consistent.'
      },
      {
        question: 'What body fat percentage should I aim for?',
        answer:
          'For general health, the fitness or average bands are reasonable — roughly 14–24% for men and 21–31% for women. There is no strong health argument for going below the athlete range, and doing so carries real physiological costs.'
      }
    ],
    references: [
      {
        title: 'Body composition assessment: circumference-based estimation',
        source: 'Hodgdon & Beckett, Naval Health Research Center'
      }
    ]
  },

  'macro-calculator': {
    calculatorId: 'macro-calculator',
    title: 'Macro Calculator',
    subtitle:
      'Turn a calorie target into daily protein, carbohydrate and fat in grams, with splits for fat loss, maintenance or muscle gain.',
    readTimeMinutes: 6,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Macro targets are general guidance for healthy adults. Medical conditions including diabetes and kidney disease change these requirements significantly. Speak to a doctor or registered dietitian before following a specific plan.',
    overview: [
      'A calorie target tells you how much to eat. Macros tell you what that food should be made of — and the split matters, because protein, carbohydrate and fat do different jobs even when the calories match.',
      'This calculator takes your calorie goal and divides it into grams of each macronutrient. Protein is set from body weight rather than as a percentage, because protein requirements scale with your body, not with how much you happen to be eating.'
    ],
    formulaCard: {
      title: 'Calories per Gram',
      formula: 'Protein 4 kcal/g · Carbohydrate 4 kcal/g · Fat 9 kcal/g',
      explanation:
        'Grams are converted to calories using these values, and the three must sum to your daily target. Fat carrying more than twice the calories per gram is why fat intake moves a plan faster than the other two.',
      variables: [
        { symbol: 'Protein', meaning: 'Preserves muscle, most filling per calorie, highest thermic effect' },
        { symbol: 'Carbohydrate', meaning: 'Primary fuel for higher-intensity training' },
        { symbol: 'Fat', meaning: 'Required for hormone production and absorbing fat-soluble vitamins' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Macro Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Start from your calorie target',
          description:
            'Use your TDEE for maintenance, or TDEE minus 15–25% for fat loss. Macros divide that number; they do not set it.'
        },
        {
          stepNumber: 2,
          title: 'Set protein from body weight',
          description:
            'Roughly 1.6–2.2 g per kg of body weight covers most active adults. Higher within that range helps when in a deficit.'
        },
        {
          stepNumber: 3,
          title: 'Set a minimum fat intake',
          description:
            'Around 0.6–1.0 g per kg, and not below roughly 20% of calories. Fat is not optional — hormone production depends on it.'
        },
        {
          stepNumber: 4,
          title: 'Fill the remainder with carbohydrate',
          description:
            'Whatever calories are left become carbs. More carbohydrate generally supports harder training.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: 1,900 kcal for Fat Loss',
      scenario: 'A 75 kg person eating 1,900 kcal in a deficit, prioritising muscle retention.',
      inputs: [
        { label: 'Calorie target', value: '1,900 kcal' },
        { label: 'Body weight', value: '75 kg' },
        { label: 'Protein', value: '2.0 g/kg' },
        { label: 'Fat', value: '0.8 g/kg' }
      ],
      steps: [
        'Protein = 75 × 2.0 = 150 g → 150 × 4 = 600 kcal.',
        'Fat = 75 × 0.8 = 60 g → 60 × 9 = 540 kcal.',
        'Remaining calories = 1,900 − 600 − 540 = 760 kcal.',
        'Carbohydrate = 760 ÷ 4 = 190 g.'
      ],
      result: '150 g protein · 190 g carbohydrate · 60 g fat',
      takeaway:
        'That works out at roughly 32% protein, 40% carbohydrate and 28% fat. Setting protein and fat from body weight first, then letting carbs absorb the remainder, is more robust than fixed percentages — which quietly cut protein exactly when a deficit makes it most important.'
    },
    sections: [
      {
        id: 'protein-priority',
        title: 'Why protein is set first',
        paragraphs: [
          'In a calorie deficit the body draws on both fat and lean tissue. Adequate protein combined with resistance training is the most effective lever for making sure most of the loss comes from fat.',
          'Protein is also the most satiating macronutrient per calorie and has the highest thermic effect — roughly 20–30% of its energy is spent digesting it, against 5–10% for carbohydrate and 0–3% for fat. It is the one macro worth protecting when calories are tight.'
        ]
      },
      {
        id: 'does-the-split-matter',
        title: 'How much does the split actually matter?',
        paragraphs: [
          'For body composition, total calories determine whether you gain or lose, and protein determines how much of that change is lean tissue. The carbohydrate-to-fat ratio matters considerably less than most diet marketing suggests.',
          'Where it does matter is performance and adherence. Higher carbohydrate supports high-intensity training; higher fat suits some people better for satiety and energy stability. Within sensible minimums, the best split is the one you can follow consistently.'
        ],
        callout: {
          type: 'tip',
          title: 'Do not cut fat too far',
          text: 'Dropping below roughly 20% of calories from fat can affect hormone production and the absorption of vitamins A, D, E and K. Very low-fat diets tend to fail on hunger before they fail on nutrition.'
        }
      },
      {
        id: 'fibre',
        title: 'The macro that is not counted',
        paragraphs: [
          'Fibre is a carbohydrate but behaves differently — largely undigested, highly satiating, and important for gut health. Most adults fall well short of the recommended 25–30 g a day.',
          'Because it counts within your carbohydrate allowance, a high-fibre diet makes the same carb number considerably more filling. If hunger is the problem, increasing fibre within your existing targets often helps more than changing the split.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the best macro split?',
        answer:
          'There is no single best split. Set protein from body weight at roughly 1.6–2.2 g/kg, keep fat above about 20% of calories, and let carbohydrate take the remainder. Beyond those minimums the ratio is mostly a matter of preference and training demands.'
      },
      {
        question: 'Do I need to hit my macros exactly?',
        answer:
          'No. Being within roughly 5–10 g of protein and fat targets and within a similar band on calories is close enough for the result to be indistinguishable. Precision beyond that adds stress without adding benefit.'
      },
      {
        question: 'Can I eat more protein than the target?',
        answer:
          'Generally yes for healthy adults. Intakes well above these ranges have not been shown to cause harm in people with normal kidney function, though the extra offers diminishing returns. If you have kidney disease, protein intake should be set by your doctor.'
      },
      {
        question: 'Should macros change on rest days?',
        answer:
          'They can, but they do not need to. Some people lower carbohydrate slightly on rest days and raise it on training days at the same weekly total. Simpler, consistent daily targets work just as well for most people and are easier to follow.'
      }
    ],
    references: [
      {
        title: 'Position stand: protein and exercise',
        source: 'International Society of Sports Nutrition'
      },
      {
        title: 'Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids and Protein',
        source: 'National Academies of Sciences, Engineering, and Medicine'
      }
    ]
  },

  'protein-calculator': {
    calculatorId: 'protein-calculator',
    title: 'Protein Intake Calculator',
    subtitle:
      'Find your daily protein target from body weight and training load, with the research ranges shown rather than one arbitrary number.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'These ranges apply to healthy adults with normal kidney function. Kidney disease, liver disease and pregnancy all change protein requirements. Speak to a doctor or registered dietitian for individual guidance.',
    overview: [
      'Protein requirements are usually quoted two ways, and the gap between them causes most of the confusion. The official RDA of 0.8 g per kg is the amount needed to prevent deficiency in a sedentary adult. It is a floor, not an optimum.',
      'For anyone training, losing weight or aiming to preserve muscle with age, the evidence supports considerably more — generally 1.6–2.2 g per kg. This calculator shows where you sit across that range rather than picking one figure.'
    ],
    formulaCard: {
      title: 'Protein Target From Body Weight',
      formula: 'Daily protein (g) = body weight (kg) × factor',
      explanation:
        'The factor depends on your goal and training. Protein scales with body size rather than with calorie intake, which is why it should be set from weight rather than as a percentage of your diet.',
      variables: [
        { symbol: '0.8 g/kg', meaning: 'RDA — minimum to prevent deficiency, sedentary adults' },
        { symbol: '1.2–1.6 g/kg', meaning: 'General health, active but not training for size or strength' },
        { symbol: '1.6–2.2 g/kg', meaning: 'Resistance training, muscle gain, or preserving muscle in a deficit' },
        { symbol: '2.2–3.0 g/kg', meaning: 'Aggressive deficit while lean; no clear benefit above this' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Protein Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter your body weight',
          description:
            'Use current weight. If you are carrying substantial excess fat, lean body mass gives a more sensible basis — otherwise the target can come out unnecessarily high.'
        },
        {
          stepNumber: 2,
          title: 'Select your activity and goal',
          description:
            'Resistance training and calorie deficits both push the requirement toward the upper end of the range.'
        },
        {
          stepNumber: 3,
          title: 'Spread the total across the day',
          description:
            'Three to five servings of 25–40 g each works better than one large serving, because muscle protein synthesis responds to each feeding rather than the daily total alone.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An 80 kg person doing resistance training three times a week while in a moderate calorie deficit.',
      inputs: [
        { label: 'Body weight', value: '80 kg' },
        { label: 'Training', value: 'Resistance, 3× weekly' },
        { label: 'Goal', value: 'Fat loss, preserve muscle' }
      ],
      steps: [
        'Target factor for training in a deficit: 1.8–2.2 g/kg.',
        'Lower bound = 80 × 1.8 = 144 g.',
        'Upper bound = 80 × 2.2 = 176 g.',
        'At 160 g, that is 640 kcal from protein — a meaningful share of a 1,900 kcal target.',
        'Split across four meals = roughly 40 g each.'
      ],
      result: 'Target range 144–176 g per day · about 40 g per meal across four meals',
      takeaway:
        'The RDA would have suggested just 64 g. For someone lifting in a deficit that is far too low to protect muscle, which is why the RDA is the wrong reference point for anyone training.'
    },
    sections: [
      {
        id: 'why-more-than-rda',
        title: 'Why the RDA is the wrong number for most people reading this',
        paragraphs: [
          'The RDA was established as the intake sufficient to meet the needs of nearly all healthy sedentary adults — meaning it prevents deficiency. It was never intended to describe the intake that best supports muscle retention, recovery or satiety.',
          'Training increases protein turnover, and a calorie deficit increases the risk that the body draws on lean tissue. Both push the useful intake well above the RDA. This is one of the more consistent findings in sports nutrition research.'
        ]
      },
      {
        id: 'distribution',
        title: 'Timing matters less than people think, distribution matters more',
        paragraphs: [
          'The "anabolic window" — the idea that protein must be consumed within an hour of training — has not held up well. Total daily intake is the dominant factor by a wide margin.',
          'Distribution does appear to matter somewhat. Spreading protein across three to five feedings of roughly 25–40 g each stimulates muscle protein synthesis more effectively than the same total eaten in one or two large meals.'
        ],
        callout: {
          type: 'info',
          title: 'Protein quality counts too',
          text: 'Animal proteins and soy contain all essential amino acids in useful proportions. Most plant proteins are lower in one or more, so plant-based diets benefit from variety across the day and a target toward the upper end of the range.'
        }
      },
      {
        id: 'is-too-much-harmful',
        title: 'Is high protein harmful?',
        paragraphs: [
          'For healthy adults with normal kidney function, there is no good evidence that intakes in these ranges cause kidney damage. That concern originates in guidance for people who already have kidney disease, where protein restriction is genuinely appropriate.',
          'The practical limits are different: protein is filling and expensive, and very high intakes crowd out carbohydrate and fat that support training and hormone function. There is little evidence of additional benefit above roughly 2.2 g/kg for most people.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much protein do I need to build muscle?',
        answer:
          'Around 1.6–2.2 g per kg of body weight daily, combined with resistance training. Studies generally show diminishing returns above roughly 1.6 g/kg, with the upper end offering a margin during a calorie deficit.'
      },
      {
        question: 'Should I use current weight or goal weight?',
        answer:
          'Current weight works for most people. If you are carrying substantial excess body fat, using lean body mass or goal weight avoids a target that is higher than necessary, since fat tissue has minimal protein requirement.'
      },
      {
        question: 'Can I get enough protein on a plant-based diet?',
        answer:
          'Yes, with attention to variety and total intake. Legumes, tofu, tempeh, seitan and higher-protein grains all contribute. Because most plant sources are lower in one or more essential amino acids, aiming toward the upper end of the range and varying sources across the day is sensible.'
      },
      {
        question: 'Do I need protein powder?',
        answer:
          'No. It is a convenience, not a requirement. Powder makes hitting a higher target easier and cheaper than whole foods in some cases, but there is nothing in it that food cannot provide.'
      }
    ],
    references: [
      {
        title: 'Position stand: protein and exercise',
        source: 'International Society of Sports Nutrition'
      },
      {
        title: 'Dietary Reference Intakes: Protein and Amino Acids',
        source: 'National Academies of Sciences, Engineering, and Medicine'
      }
    ]
  }
};
