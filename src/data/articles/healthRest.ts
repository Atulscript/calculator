import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator360 Editorial Team',
  role: 'Health & Nutrition Desk',
  lastUpdated: 'September 2026'
};

const NOT_MEDICAL = 'This is general information, not medical advice. It cannot account for your individual medical history, medication or conditions. Speak to a healthcare professional before acting on any result.';

/** Remaining health, clinical and fitness articles. */
export const HEALTH_REST_ARTICLES: Record<string, CalculatorArticle> = {
  'water-intake-calculator': {
    calculatorId: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    subtitle: 'Estimate daily water needs from body weight, activity and climate, rather than assuming eight glasses fits everyone.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' Kidney, heart and liver conditions can require fluid restriction — never increase intake against medical advice.',
    overview: [
      'The "eight glasses a day" figure has no strong evidence behind it and ignores that requirements scale with body size, activity and climate. A 55 kg office worker and a 95 kg labourer in summer heat do not need the same amount.',
      'Roughly 20% of fluid intake also comes from food, which most guidance quietly omits.'
    ],
    formulaCard: {
      title: 'Baseline Fluid Requirement',
      formula: 'Baseline (ml) ≈ body weight (kg) × 30–35',
      explanation: 'Add roughly 500–750 ml per hour of intense exercise, and more in hot or dry conditions. This estimates total fluid, of which food typically supplies about a fifth.',
      variables: [
        { symbol: '30–35 ml/kg', meaning: 'Baseline range for healthy adults' },
        { symbol: 'Exercise', meaning: 'Add 500–750 ml per hour of sustained activity' },
        { symbol: 'Food', meaning: 'Supplies roughly 20% of total fluid intake' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Water Intake Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your body weight', description: 'The main driver of baseline requirement.' },
        { stepNumber: 2, title: 'Add activity duration', description: 'Sustained exercise substantially increases losses through sweat.' },
        { stepNumber: 3, title: 'Adjust for climate', description: 'Heat, humidity and altitude all raise requirements.' },
        { stepNumber: 4, title: 'Treat it as a starting point', description: 'Thirst and urine colour are better day-to-day guides than any formula.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 78 kg person doing one hour of moderate exercise in a warm climate.',
      inputs: [
        { label: 'Body weight', value: '78 kg' },
        { label: 'Exercise', value: '1 hour moderate' },
        { label: 'Climate', value: 'Warm' }
      ],
      steps: [
        'Baseline = 78 × 33 = 2,574 ml.',
        'Exercise addition = 600 ml.',
        'Warm climate addition ≈ 400 ml.',
        'Total ≈ 3,574 ml, of which roughly 700 ml comes from food.'
      ],
      result: 'Total fluid ≈ 3.6 litres · about 2.9 litres to drink',
      takeaway: 'The drinking target is meaningfully lower than the total requirement, because food contributes a substantial share. Advice that ignores this overstates how much you need from the tap.'
    },
    sections: [
      {
        id: 'hydration-signs',
        title: 'Better signals than a target number',
        paragraphs: ['Your body gives more reliable feedback than any equation:'],
        bullets: [
          'Urine colour — pale straw suggests adequate hydration; dark amber suggests more is needed.',
          'Thirst, which for healthy adults is a reasonably reliable signal despite claims otherwise.',
          'Frequency — roughly four to seven times a day is typical.',
          'Weight change across a training session, where each kilogram lost is about a litre of fluid.'
        ],
        callout: { type: 'warning', title: 'More is not always better', text: 'Drinking far beyond need can dilute blood sodium, a dangerous condition called hyponatraemia. It is rare but has occurred in endurance athletes who over-drink during events.' }
      }
    ],
    faqs: [
      { question: 'Do I really need eight glasses of water a day?', answer: 'There is no strong evidence for that specific figure. Requirements depend on body size, activity and climate, and roughly a fifth of your fluid comes from food. Use weight-based estimates and your own thirst instead.' },
      { question: 'Do tea and coffee count?', answer: 'Yes. The diuretic effect of moderate caffeine is much smaller than the fluid volume consumed, so caffeinated drinks contribute net positively to hydration.' },
      { question: 'Can I drink too much water?', answer: 'Yes, though it is uncommon. Consuming far more than the kidneys can excrete dilutes blood sodium and causes hyponatraemia, which can be serious. Risk rises when drinking heavily during prolonged endurance events.' }
    ]
  },

  'target-heart-rate-calculator': {
    calculatorId: 'target-heart-rate-calculator',
    title: 'Target Heart Rate Calculator',
    subtitle: 'Find your five training zones from maximum and resting heart rate, using the Karvonen method for greater accuracy.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' Beta blockers and other medications alter heart rate response, making these zones unreliable. Seek medical clearance before beginning intense exercise if you have cardiovascular risk factors.',
    overview: [
      'Training zones let you match effort to purpose. Easy aerobic work and threshold intervals produce different adaptations, and heart rate is the most accessible way to tell them apart.',
      'The Karvonen method, which uses heart rate reserve rather than just maximum, gives zones better matched to individual fitness.'
    ],
    formulaCard: {
      title: 'Karvonen Method',
      formula: 'Target HR = ((HRmax − HRrest) × intensity) + HRrest',
      explanation: 'HRmax − HRrest is your heart rate reserve. The commonly used HRmax estimate of 220 − age has a standard deviation of about 10–12 bpm, so a measured maximum is far better if you have one.',
      variables: [
        { symbol: 'HRmax', meaning: 'Maximum heart rate — measured, or estimated as 220 − age' },
        { symbol: 'HRrest', meaning: 'Resting rate, measured on waking before rising' },
        { symbol: 'HRR', meaning: 'Heart rate reserve, HRmax − HRrest' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Target Heart Rate Calculator',
      steps: [
        { stepNumber: 1, title: 'Measure your resting heart rate', description: 'On waking, before getting up, ideally averaged over several mornings.' },
        { stepNumber: 2, title: 'Enter age or a measured maximum', description: 'A measured maximum from a field test is considerably more accurate than the age formula.' },
        { stepNumber: 3, title: 'Review the five zones', description: 'Each serves a different training purpose.' },
        { stepNumber: 4, title: 'Recalculate as fitness improves', description: 'Resting heart rate falls with training, which shifts every zone.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 38-year-old with a resting heart rate of 58 bpm.',
      inputs: [
        { label: 'Age', value: '38' },
        { label: 'Resting HR', value: '58 bpm' }
      ],
      steps: [
        'Estimated HRmax = 220 − 38 = 182 bpm.',
        'Heart rate reserve = 182 − 58 = 124 bpm.',
        'Zone 2 (60–70%): (124 × 0.6) + 58 = 132 to (124 × 0.7) + 58 = 145 bpm.',
        'Zone 4 (80–90%): 157 to 170 bpm.'
      ],
      result: 'Zone 2: 132–145 bpm · Zone 4: 157–170 bpm',
      takeaway: 'Karvonen gives different zones from the simpler percentage-of-maximum method, which would put Zone 2 at 109–127 bpm. Accounting for resting heart rate produces more individually appropriate targets.'
    },
    sections: [
      {
        id: 'zones',
        title: 'What each zone is for',
        paragraphs: ['Most training should not be hard, which surprises people:'],
        bullets: [
          'Zone 1 (50–60%) — recovery and warm-up.',
          'Zone 2 (60–70%) — aerobic base building and fat oxidation. Most endurance training belongs here.',
          'Zone 3 (70–80%) — aerobic development, sometimes called the grey zone.',
          'Zone 4 (80–90%) — threshold work, improving the pace you can sustain.',
          'Zone 5 (90–100%) — maximal intervals, used sparingly.'
        ],
        callout: { type: 'info', title: 'The 80/20 principle', text: 'Endurance athletes commonly spend around 80% of training time in Zones 1–2 and 20% in Zones 4–5. Spending most sessions in Zone 3 tends to accumulate fatigue without the benefits of either end.' }
      }
    ],
    faqs: [
      { question: 'How accurate is 220 minus age?', answer: 'It is a population average with a standard deviation of roughly 10–12 bpm, so an individual can easily be 20 bpm above or below the prediction. A measured maximum from a supervised test is much more reliable.' },
      { question: 'What is the difference between Karvonen and percentage of max?', answer: 'Karvonen uses heart rate reserve, incorporating resting heart rate, which produces higher and more individually appropriate zones. Percentage of maximum ignores fitness level entirely.' },
      { question: 'Should I train by heart rate or by feel?', answer: 'Both have value. Heart rate is objective but lags effort and drifts with heat, fatigue and caffeine. Perceived exertion responds instantly. Experienced athletes typically use both together.' }
    ]
  },

  'bac-calculator': {
    calculatorId: 'bac-calculator',
    title: 'BAC Calculator',
    subtitle: 'Estimate blood alcohol concentration using the Widmark formula. An estimate only — never use it to decide whether to drive.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'This estimate cannot account for food, medication, hydration, genetics, liver function or individual metabolism, and can be wrong by a wide margin in either direction. It must never be used to decide whether you are fit to drive or operate machinery. The only safe assumption after drinking is that you should not drive.',
    overview: [
      'The Widmark formula estimates blood alcohol concentration from how much you drank, your body weight and sex, and how long ago you drank it. It is the basis of most BAC calculators.',
      'It is also an approximation built on population averages. Two people of identical weight drinking identically can reach materially different concentrations.'
    ],
    formulaCard: {
      title: 'Widmark Formula',
      formula: 'BAC = (A ÷ (r × W)) × 100 − (β × t)',
      explanation: 'A is grams of alcohol consumed, W body weight in grams, r the distribution ratio (roughly 0.68 for men, 0.55 for women), β the elimination rate of about 0.015% per hour, and t hours since drinking began.',
      variables: [
        { symbol: 'r', meaning: 'Body water distribution ratio, differs by sex and body composition' },
        { symbol: 'β', meaning: 'Elimination rate, typically 0.015% per hour but individually variable' },
        { symbol: 'Standard drink', meaning: 'Varies by country — 14 g in the US, 8 g in the UK' }
      ]
    },
    howToSteps: {
      title: 'How to Use the BAC Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter body weight and sex', description: 'Both affect how alcohol distributes through body water.' },
        { stepNumber: 2, title: 'Enter the number of standard drinks', description: 'Check what a standard drink means where you are — the definition varies substantially.' },
        { stepNumber: 3, title: 'Enter hours since you started drinking', description: 'Elimination is roughly linear at about 0.015% per hour.' },
        { stepNumber: 4, title: 'Treat the result as indicative only', description: 'It is an estimate with wide error margins, not a measurement.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 75 kg man drinking four US standard drinks over three hours.',
      inputs: [
        { label: 'Weight', value: '75 kg (75,000 g)' },
        { label: 'Drinks', value: '4 × 14 g = 56 g alcohol' },
        { label: 'Time', value: '3 hours' },
        { label: 'r value', value: '0.68' }
      ],
      steps: [
        'BAC before elimination = (56 ÷ (0.68 × 75,000)) × 100 = 0.110%.',
        'Elimination over 3 hours = 0.015 × 3 = 0.045%.',
        'Estimated BAC = 0.110 − 0.045 = 0.065%.',
        'This sits below the common 0.08% limit but above the 0.05% limit used in many countries.'
      ],
      result: 'Estimated BAC ≈ 0.065%',
      takeaway: 'Even this estimate straddles two different legal thresholds. Real variation between individuals is wide enough that a figure close to any limit tells you nothing safe.'
    },
    sections: [
      {
        id: 'why-unreliable',
        title: 'Why the estimate cannot be trusted for decisions',
        paragraphs: ['The formula omits most of what actually determines your blood alcohol level:'],
        bullets: [
          'Food in the stomach can slow absorption substantially, changing both peak and timing.',
          'Elimination rate varies between individuals and is affected by liver health and regular drinking.',
          'Medications can interact with alcohol in ways that change both effect and metabolism.',
          'Body composition matters, not just weight — the r value is a population average.',
          'Impairment begins well below any legal threshold, so being under a limit is not the same as being safe.'
        ],
        callout: { type: 'warning', title: 'There is no safe amount before driving', text: 'Reaction time and judgement are measurably affected below every legal limit in use. If you have been drinking, arrange another way home.' }
      }
    ],
    faqs: [
      { question: 'How long does it take for alcohol to leave my system?', answer: 'Roughly 0.015% of BAC per hour, so a BAC of 0.08% takes about five hours to clear. Nothing reliably speeds this up — coffee, cold showers and food do not accelerate elimination, they only mask symptoms.' },
      { question: 'Can I use this to decide if I am safe to drive?', answer: 'No. The estimate has wide error margins and ignores factors that materially affect the real figure. Impairment also begins below legal limits. If you have been drinking, do not drive.' },
      { question: 'Why do men and women process alcohol differently?', answer: 'Mainly differences in average body water percentage, reflected in the r value. Women typically have a lower proportion of body water, so the same alcohol reaches a higher concentration. Enzyme differences also play a part.' }
    ]
  },

  'bsa-calculator': {
    calculatorId: 'bsa-calculator',
    title: 'Body Surface Area Calculator',
    subtitle: 'Calculate BSA using Du Bois or Mosteller, the standard basis for chemotherapy and paediatric dosing.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' Drug dosing must be calculated and verified by a qualified clinician. This tool is for reference and education only.',
    overview: [
      'Body surface area correlates better with metabolic rate than weight alone, which is why it is used to calculate doses for chemotherapy and many paediatric medications.',
      'Several formulas exist and give slightly different results. Clinical practice uses both Du Bois and Mosteller, so this calculator shows both.'
    ],
    formulaCard: {
      title: 'Du Bois and Mosteller',
      formula: 'Mosteller: BSA = √[(height cm × weight kg) ÷ 3600]',
      explanation: 'Du Bois: BSA = 0.007184 × height^0.725 × weight^0.425. Mosteller is simpler and widely preferred for its ease of calculation; the two typically agree closely.',
      variables: [
        { symbol: 'BSA', meaning: 'Body surface area in square metres' },
        { symbol: 'Typical adult', meaning: 'Around 1.7 m²' },
        { symbol: 'Dose', meaning: 'Often expressed as mg per m²' }
      ]
    },
    howToSteps: {
      title: 'How to Use the BSA Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter height and weight', description: 'In metric or imperial — conversion is handled.' },
        { stepNumber: 2, title: 'Compare both formulas', description: 'They usually agree to within a few percent.' },
        { stepNumber: 3, title: 'Use only as a reference', description: 'Actual dosing decisions belong to the treating clinician.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An adult 172 cm tall weighing 70 kg.',
      inputs: [
        { label: 'Height', value: '172 cm' },
        { label: 'Weight', value: '70 kg' }
      ],
      steps: [
        'Mosteller: √[(172 × 70) ÷ 3600] = √(12,040 ÷ 3600) = √3.344 = 1.83 m².',
        'Du Bois: 0.007184 × 172^0.725 × 70^0.425 = 1.82 m².',
        'A drug dosed at 100 mg/m² would give roughly 183 mg.'
      ],
      result: 'BSA ≈ 1.83 m² (Mosteller) · 1.82 m² (Du Bois)',
      takeaway: 'The two formulas differ by under 1% here. That agreement is typical for adults of average build; divergence is larger at the extremes.'
    },
    faqs: [
      { question: 'Why is BSA used for drug dosing instead of weight?', answer: 'Because it correlates better with metabolic rate, blood volume and renal clearance — the factors that determine how a drug is processed. This matters most for narrow-therapeutic-index drugs such as chemotherapy agents.' },
      { question: 'Which formula should I use?', answer: 'Mosteller is the most widely used for its simplicity, and Du Bois remains common in older protocols. For adults of typical build they agree closely; institutional protocol should decide.' },
      { question: 'What is a normal BSA?', answer: 'Around 1.7 m² for an average adult, roughly 1.6 m² for women and 1.9 m² for men. Children are considerably lower, which is why weight-based dosing alone is inadequate for them.' }
    ]
  },

  'gfr-calculator': {
    calculatorId: 'gfr-calculator',
    title: 'GFR Calculator',
    subtitle: 'Estimate glomerular filtration rate using the 2021 CKD-EPI equation, with the corresponding CKD stage.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'An eGFR is an estimate that requires clinical interpretation. A single result does not diagnose kidney disease — diagnosis requires repeated testing over at least three months alongside other markers. Never change medication or treatment based on this tool. Discuss any result with your doctor.',
    overview: [
      'Glomerular filtration rate measures how effectively the kidneys filter blood. It cannot be measured directly in routine practice, so it is estimated from serum creatinine, age and sex.',
      'This calculator implements the 2021 CKD-EPI equation, which removed the race coefficient used in earlier versions. That change was made because race is a social rather than biological category and its inclusion was producing inequitable care.'
    ],
    formulaCard: {
      title: 'CKD-EPI 2021',
      formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1.200 × 0.9938^age × 1.012 [if female]',
      explanation: 'κ is 0.7 for females and 0.9 for males; α is −0.241 for females and −0.302 for males. Scr is serum creatinine in mg/dL. The result is in mL/min/1.73m².',
      variables: [
        { symbol: 'Scr', meaning: 'Serum creatinine from a blood test' },
        { symbol: 'eGFR', meaning: 'Estimated filtration rate, mL/min/1.73m²' },
        { symbol: 'Normal', meaning: '90 or above with no other markers of kidney damage' }
      ]
    },
    howToSteps: {
      title: 'How to Use the GFR Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter serum creatinine', description: 'From a recent blood test, in mg/dL or µmol/L.' },
        { stepNumber: 2, title: 'Enter age and sex', description: 'Both are part of the equation.' },
        { stepNumber: 3, title: 'Read the eGFR and stage', description: 'Stages run from G1 to G5.' },
        { stepNumber: 4, title: 'Discuss the result with your doctor', description: 'Interpretation requires clinical context this tool cannot provide.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 62-year-old woman with serum creatinine of 1.1 mg/dL.',
      inputs: [
        { label: 'Creatinine', value: '1.1 mg/dL' },
        { label: 'Age', value: '62' },
        { label: 'Sex', value: 'Female (κ = 0.7, α = −0.241)' }
      ],
      steps: [
        'Scr/κ = 1.1 ÷ 0.7 = 1.571, which is above 1.',
        'min term = 1^−0.241 = 1; max term = 1.571^−1.200 = 0.578.',
        'Age factor = 0.9938^62 = 0.681.',
        'eGFR = 142 × 1 × 0.578 × 0.681 × 1.012 = 56.6 mL/min/1.73m².'
      ],
      result: 'eGFR ≈ 57 — CKD stage G3a',
      takeaway: 'A result in this range needs repeat testing and clinical assessment. A single eGFR does not establish chronic kidney disease, which requires abnormality persisting over at least three months.'
    },
    sections: [
      {
        id: 'stages',
        title: 'CKD stages',
        paragraphs: ['Stages describe filtration rate, and must be read alongside other markers such as albuminuria:'],
        bullets: [
          'G1 — 90 or above, normal, but only normal if no other evidence of kidney damage exists.',
          'G2 — 60 to 89, mildly reduced.',
          'G3a — 45 to 59, mild to moderate reduction.',
          'G3b — 30 to 44, moderate to severe.',
          'G4 — 15 to 29, severely reduced.',
          'G5 — below 15, kidney failure.'
        ],
        callout: { type: 'warning', title: 'Creatinine is affected by more than kidney function', text: 'Muscle mass, recent meat intake, dehydration and some medications all shift creatinine. A single abnormal reading frequently normalises on repeat testing.' }
      }
    ],
    faqs: [
      { question: 'What is a normal eGFR?', answer: '90 or above is generally considered normal, though it declines naturally with age. A value between 60 and 89 without other markers of kidney damage is often not considered disease.' },
      { question: 'Why was race removed from the equation?', answer: 'The 2021 CKD-EPI revision removed the race coefficient because race is a social construct rather than a biological variable, and its inclusion was leading to overestimated kidney function and delayed care for Black patients.' },
      { question: 'Does one low result mean I have kidney disease?', answer: 'No. Chronic kidney disease requires abnormality persisting for at least three months, confirmed by repeat testing and usually assessed alongside urine albumin. Creatinine can be temporarily raised by dehydration, diet or medication.' }
    ]
  },

  'lean-body-mass-calculator': {
    calculatorId: 'lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator',
    subtitle: 'Estimate lean mass and fat mass from height, weight and sex, using the formulas clinicians use for drug dosing.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL,
    overview: [
      'Lean body mass is everything that is not fat — muscle, bone, organs and water. It matters for nutrition targets, because protein requirements scale with lean tissue rather than total weight, and for dosing certain drugs.',
      'Several formulas exist. Boer is the most widely used clinically, with James and Hume as alternatives.'
    ],
    formulaCard: {
      title: 'Boer Formula',
      formula: 'Men: LBM = (0.407 × weight kg) + (0.267 × height cm) − 19.2',
      explanation: 'Women: LBM = (0.252 × weight kg) + (0.473 × height cm) − 48.3. Fat mass is simply total weight minus lean body mass.',
      variables: [
        { symbol: 'LBM', meaning: 'Lean body mass in kilograms' },
        { symbol: 'Fat mass', meaning: 'Total weight − LBM' },
        { symbol: 'FFMI', meaning: 'Fat-free mass index — LBM scaled to height' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Lean Body Mass Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter height, weight and sex', description: 'All three are required by the formulas.' },
        { stepNumber: 2, title: 'Compare the formulas', description: 'Boer, James and Hume give slightly different estimates.' },
        { stepNumber: 3, title: 'Use it for protein targets', description: 'Setting protein from lean mass is more precise than from total weight for people carrying significant fat.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A man 180 cm tall weighing 88 kg.',
      inputs: [
        { label: 'Height', value: '180 cm' },
        { label: 'Weight', value: '88 kg' }
      ],
      steps: [
        'LBM = (0.407 × 88) + (0.267 × 180) − 19.2.',
        '= 35.8 + 48.1 − 19.2 = 64.7 kg.',
        'Fat mass = 88 − 64.7 = 23.3 kg.',
        'Estimated body fat = 23.3 ÷ 88 = 26.5%.'
      ],
      result: 'LBM ≈ 64.7 kg · Fat mass ≈ 23.3 kg (26.5%)',
      takeaway: 'Setting protein at 2 g per kg of lean mass gives 129 g, against 176 g using total body weight. For someone carrying excess fat, lean mass is the more sensible basis.'
    },
    faqs: [
      { question: 'What is the difference between lean body mass and fat-free mass?', answer: 'Strictly, lean body mass includes the small amount of essential fat within organs and bone marrow, while fat-free mass excludes all fat. In practice the terms are used interchangeably and the difference is negligible.' },
      { question: 'Why use lean mass for protein targets?', answer: 'Because fat tissue has minimal protein requirement. For someone carrying substantial excess fat, a target based on total weight overstates the need considerably.' },
      { question: 'How accurate are these formulas?', answer: 'They are estimates from height, weight and sex, so they cannot see your actual composition. A DEXA scan or a body fat measurement combined with weight gives a more reliable figure.' }
    ]
  },

  'army-body-fat-calculator': {
    calculatorId: 'army-body-fat-calculator',
    title: 'Army Body Fat Calculator',
    subtitle: 'Check body fat against current US Army standards by age and sex, using the official tape-test method.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: 'Standards and measurement protocols are set by the Department of Defense and revised periodically. Official assessments must be conducted by authorised personnel following current regulations.',
    overview: [
      'The US Army assesses body composition using a circumference-based tape test when a soldier exceeds the screening weight for their height. The standard varies by age and sex, becoming slightly more permissive with age.',
      'The method is the same circumference approach used more widely, applied against service-specific thresholds.'
    ],
    formulaCard: {
      title: 'Army Tape Method',
      formula: 'Men: %BF from (abdomen − neck) and height',
      explanation: 'Women use (waist + hip − neck) and height. Measurements are taken at specified anatomical sites, averaged across repeated readings, and rounded according to regulation.',
      variables: [
        { symbol: 'Abdomen', meaning: 'At the navel for men' },
        { symbol: 'Neck', meaning: 'Below the larynx, tape sloping slightly down at the front' },
        { symbol: 'Standard', meaning: 'Varies by age band and sex' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Army Body Fat Calculator',
      steps: [
        { stepNumber: 1, title: 'Take measurements per protocol', description: 'Correct anatomical sites matter — measuring the wrong place invalidates the result.' },
        { stepNumber: 2, title: 'Enter height, age and sex', description: 'Standards differ across four age bands.' },
        { stepNumber: 3, title: 'Compare to the standard', description: 'The calculator shows your margin above or below.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 27-year-old male soldier, 178 cm tall, abdomen 92 cm, neck 40 cm.',
      inputs: [
        { label: 'Age', value: '27' },
        { label: 'Height', value: '178 cm' },
        { label: 'Abdomen / neck', value: '92 cm / 40 cm' }
      ],
      steps: [
        'Circumference value = 92 − 40 = 52 cm.',
        'Applying the circumference formula gives approximately 19.8% body fat.',
        'The standard for males aged 21–27 is 22%.',
        'Result is within standard with roughly 2 points of margin.'
      ],
      result: 'Estimated 19.8% · within the 22% standard',
      takeaway: 'The tape test only applies if screening weight is exceeded. Soldiers under the screening table weight for their height are not taped at all.'
    },
    faqs: [
      { question: 'What are the Army body fat standards?', answer: 'They vary by age and sex, becoming slightly more permissive in older age bands. Consult current regulations for exact figures, since the standards are revised periodically.' },
      { question: 'How accurate is the tape test?', answer: 'It is a circumference estimate with an error margin of several percentage points against DEXA. It is used because it is fast, cheap and repeatable in the field rather than because it is the most accurate available method.' },
      { question: 'What happens if I exceed the standard?', answer: 'Soldiers exceeding body fat standards are typically enrolled in a body composition programme with periodic reassessment. Specific consequences are governed by current regulation.' }
    ]
  },

  'carbohydrate-calculator': {
    calculatorId: 'carbohydrate-calculator',
    title: 'Carbohydrate Calculator',
    subtitle: 'Work out daily carbohydrate grams for your calorie goal, from low-carb through to endurance-training intakes.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' Diabetes and metabolic conditions change carbohydrate requirements significantly and need individual medical guidance.',
    overview: [
      'Carbohydrate is the body\'s preferred fuel for higher-intensity work. How much you need depends less on abstract nutritional theory and more on how hard and how often you train.',
      'Carbs are also the macronutrient with the widest reasonable range — anywhere from very low to very high can work depending on context.'
    ],
    formulaCard: {
      title: 'Carbohydrate From Calories',
      formula: 'Carb grams = (Total calories × Carb %) ÷ 4',
      explanation: 'Carbohydrate provides 4 kcal per gram. In practice it is usually set as whatever remains after protein and fat targets are met, or from body weight for athletes.',
      variables: [
        { symbol: 'Low-carb', meaning: 'Under 130 g a day, roughly 10–25% of calories' },
        { symbol: 'Moderate', meaning: '3–5 g per kg body weight — general activity' },
        { symbol: 'High / endurance', meaning: '6–10 g per kg for heavy training loads' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Carbohydrate Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your daily calorie target', description: 'From your TDEE, adjusted for your goal.' },
        { stepNumber: 2, title: 'Set protein and fat first', description: 'Carbohydrate usually takes the remainder.' },
        { stepNumber: 3, title: 'Or set from body weight', description: 'Athletes often work in g per kg rather than percentages.' },
        { stepNumber: 4, title: 'Adjust to training load', description: 'Heavier training days justify more.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An 80 kg person eating 2,600 kcal, with protein at 160 g and fat at 75 g.',
      inputs: [
        { label: 'Calories', value: '2,600' },
        { label: 'Protein', value: '160 g' },
        { label: 'Fat', value: '75 g' }
      ],
      steps: [
        'Protein calories = 160 × 4 = 640.',
        'Fat calories = 75 × 9 = 675.',
        'Remaining = 2,600 − 640 − 675 = 1,285 kcal.',
        'Carbohydrate = 1,285 ÷ 4 = 321 g, which is about 4 g per kg.'
      ],
      result: '321 g carbohydrate, roughly 4 g/kg',
      takeaway: 'That sits in the moderate range, appropriate for regular training. An endurance athlete in a heavy block might need double, which would require raising total calories rather than cutting protein or fat.'
    },
    sections: [
      {
        id: 'quality',
        title: 'Type matters alongside quantity',
        paragraphs: [
          'Total carbohydrate drives energy availability, but the source affects satiety, blood sugar stability and micronutrient intake. Whole grains, legumes, fruit and vegetables bring fibre and nutrients that refined sources do not.',
          'Timing matters mainly for athletes. Carbohydrate around training supports performance and recovery; for general health, total daily intake and overall diet quality matter far more than when you eat.'
        ],
        callout: { type: 'info', title: 'Fibre counts within carbs', text: 'Aim for 25–30 g of fibre daily from within your carbohydrate allowance. It substantially increases satiety at the same gram total.' }
      }
    ],
    faqs: [
      { question: 'How many carbs should I eat per day?', answer: 'It depends on activity. Sedentary people do well on 3–4 g per kg of body weight; regular trainers 4–6 g; endurance athletes in heavy blocks 6–10 g. There is no single correct figure.' },
      { question: 'Are low-carb diets better for fat loss?', answer: 'Not inherently. When calories and protein are matched, low-carb and higher-carb diets produce similar fat loss in controlled studies. Low-carb suits some people better for appetite control, which is a genuine but individual advantage.' },
      { question: 'Should I count net carbs or total carbs?', answer: 'Total carbs is the simpler and more consistent measure. Net carbs subtract fibre on the basis that it is largely undigested, which has some validity but makes comparisons across sources less reliable.' }
    ]
  },

  'fat-intake-calculator': {
    calculatorId: 'fat-intake-calculator',
    title: 'Dietary Fat Calculator',
    subtitle: 'Calculate daily fat intake in grams for your calorie target, including the minimum needed for hormone function.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL,
    overview: [
      'Dietary fat is essential — it supports hormone production and is required to absorb vitamins A, D, E and K. Very low-fat diets carry real physiological costs that low-carb diets do not.',
      'At 9 kcal per gram it is also the most calorie-dense macronutrient, which makes it the fastest lever for changing intake in either direction.'
    ],
    formulaCard: {
      title: 'Fat From Calories',
      formula: 'Fat grams = (Total calories × Fat %) ÷ 9',
      explanation: 'A practical minimum is around 0.6 g per kg of body weight, or roughly 20% of calories, whichever is higher. Below that, hormone production and vitamin absorption can be affected.',
      variables: [
        { symbol: 'Minimum', meaning: '~0.6 g/kg or 20% of calories' },
        { symbol: 'Typical range', meaning: '25–35% of total calories' },
        { symbol: '9 kcal/g', meaning: 'More than double protein or carbohydrate' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Fat Intake Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your calorie target', description: 'From your TDEE and goal.' },
        { stepNumber: 2, title: 'Choose a percentage or g/kg', description: 'Both approaches are shown.' },
        { stepNumber: 3, title: 'Check against the minimum', description: 'The calculator flags targets that fall below a sensible floor.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 68 kg person eating 1,800 kcal, targeting 28% of calories from fat.',
      inputs: [
        { label: 'Calories', value: '1,800' },
        { label: 'Fat target', value: '28% of calories' },
        { label: 'Body weight', value: '68 kg' }
      ],
      steps: [
        'Fat calories = 1,800 × 0.28 = 504.',
        'Fat grams = 504 ÷ 9 = 56 g.',
        'Per kg = 56 ÷ 68 = 0.82 g/kg.',
        'Comfortably above the 0.6 g/kg minimum of 41 g.'
      ],
      result: '56 g fat per day, about 0.82 g/kg',
      takeaway: 'In a deficit, fat is often the first thing cut too far. Checking the g/kg figure against the minimum catches that before it affects hormone function.'
    },
    sections: [
      {
        id: 'fat-types',
        title: 'Type matters more here than with other macros',
        paragraphs: ['Total fat is one question; composition is another:'],
        bullets: [
          'Unsaturated fats — olive oil, nuts, avocado, oily fish. These should form the bulk of intake.',
          'Omega-3s specifically, from oily fish or algae, which most diets are short of.',
          'Saturated fats — dairy, meat, coconut. Not to be eliminated, but moderated.',
          'Trans fats — industrially produced, with no safe intake level and now banned or restricted in many countries.'
        ]
      }
    ],
    faqs: [
      { question: 'How much fat should I eat per day?', answer: 'Typically 25–35% of calories, with a floor around 0.6 g per kg of body weight. Going below that risks affecting hormone production and the absorption of fat-soluble vitamins.' },
      { question: 'Does eating fat make you fat?', answer: 'No — a calorie surplus does. Fat is more calorie-dense at 9 kcal per gram, so it is easier to overeat, but there is nothing uniquely fattening about it at matched calories.' },
      { question: 'Is saturated fat bad?', answer: 'The evidence is more nuanced than older guidance suggested, but most health bodies still recommend limiting it and favouring unsaturated sources. Complete elimination is neither necessary nor supported.' }
    ]
  },

  'calories-burned-calculator': {
    calculatorId: 'calories-burned-calculator',
    title: 'Calories Burned Calculator',
    subtitle: 'Estimate calories burned across a wide range of activities using MET values, adjusted for your weight and duration.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' MET values are population averages. Individual expenditure varies with fitness, efficiency and technique.',
    overview: [
      'Calories burned during activity are estimated using MET values — metabolic equivalents, where 1 MET is roughly what you burn sitting quietly. An activity rated at 8 METs burns about eight times that.',
      'These estimates are systematically optimistic in one important way: they include the calories you would have burned anyway just by existing during that time.'
    ],
    formulaCard: {
      title: 'MET-Based Expenditure',
      formula: 'Calories = MET × 3.5 × weight kg ÷ 200 × minutes',
      explanation: 'This gives gross calories. Net calories — the additional burn beyond resting — is gross minus what you would have burned at rest over the same period.',
      variables: [
        { symbol: 'MET', meaning: 'Metabolic equivalent; 1 MET ≈ resting metabolism' },
        { symbol: 'Gross', meaning: 'Total burned including resting metabolism' },
        { symbol: 'Net', meaning: 'Additional burn attributable to the activity' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calories Burned Calculator',
      steps: [
        { stepNumber: 1, title: 'Select the activity', description: 'Choose the intensity level that matches how hard you actually worked.' },
        { stepNumber: 2, title: 'Enter your weight', description: 'Heavier bodies burn more for the same activity.' },
        { stepNumber: 3, title: 'Enter the duration', description: 'Actual working time, excluding rest between sets.' },
        { stepNumber: 4, title: 'Note the net figure', description: 'This is the honest number if you are adding exercise to a calorie plan.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 72 kg person running at moderate pace (8 METs) for 40 minutes.',
      inputs: [
        { label: 'Activity', value: 'Running, 8 METs' },
        { label: 'Weight', value: '72 kg' },
        { label: 'Duration', value: '40 minutes' }
      ],
      steps: [
        'Gross = 8 × 3.5 × 72 ÷ 200 × 40 = 403 kcal.',
        'Resting burn over 40 minutes ≈ 1 × 3.5 × 72 ÷ 200 × 40 = 50 kcal.',
        'Net = 403 − 50 = 353 kcal.'
      ],
      result: 'Gross 403 kcal · Net 353 kcal',
      takeaway: 'The net figure is about 12% lower. If your TDEE already includes an activity multiplier, adding the gross figure on top double-counts and quietly erases an intended deficit.'
    },
    sections: [
      {
        id: 'overestimation',
        title: 'Why exercise calories are usually overstated',
        paragraphs: ['Several effects compound in the same direction:'],
        bullets: [
          'Gross versus net — the resting component is included but would have happened anyway.',
          'Cardio machines are frequently optimistic, sometimes by 20% or more.',
          'Fitter people are more efficient and burn less for the same output.',
          'Compensatory behaviour — many people unconsciously move less for the rest of the day after training.',
          'Appetite often increases, offsetting part of the deficit.'
        ],
        callout: { type: 'tip', title: 'Do not eat back exercise calories in full', text: 'If you track exercise separately, a common approach is to count only half the estimate. Diet is a far more reliable lever for a calorie deficit than exercise.' }
      }
    ],
    faqs: [
      { question: 'How accurate are calories-burned estimates?', answer: 'They are rough. MET values are population averages and individual expenditure varies with fitness, technique and body composition. Treat any figure as having a wide error margin.' },
      { question: 'What is a MET?', answer: 'A metabolic equivalent. One MET is approximately the energy used sitting quietly, about 3.5 ml of oxygen per kg per minute. An activity at 6 METs uses roughly six times that rate.' },
      { question: 'Should I eat more on training days?', answer: 'Some people prefer to, others keep intake constant and let the weekly average do the work. The second is simpler and avoids overestimating the burn. If you do eat back exercise calories, count only part of the estimate.' }
    ]
  },

  'pace-calculator': {
    calculatorId: 'pace-calculator',
    title: 'Running Pace Calculator',
    subtitle: 'Work out race pace, finish time or distance from any two of them, with split times for 5K through marathon.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Pace is time per unit distance — minutes per kilometre or per mile. Knowing any two of pace, time and distance gives the third, which is the basis of all race planning.',
      'Pacing well is what separates a good race from a bad one. Starting too fast is the single most common mistake in distance running.'
    ],
    formulaCard: {
      title: 'Pace, Time and Distance',
      formula: 'Pace = Time ÷ Distance',
      explanation: 'Time = Pace × Distance, and Distance = Time ÷ Pace. Speed is the inverse of pace: a pace of 5:00 per km equals 12 km/h.',
      variables: [
        { symbol: 'Pace', meaning: 'Minutes and seconds per km or mile' },
        { symbol: 'Speed', meaning: 'Distance per hour — the inverse of pace' },
        { symbol: 'Split', meaning: 'Time at each intermediate distance' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Pace Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter any two values', description: 'Pace and distance, time and distance, or pace and time.' },
        { stepNumber: 2, title: 'Choose your unit', description: 'Kilometres or miles.' },
        { stepNumber: 3, title: 'Review the split table', description: 'Useful for checking you are on target during the race.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Targeting a 1:45:00 half marathon (21.1 km).',
      inputs: [
        { label: 'Distance', value: '21.1 km' },
        { label: 'Target time', value: '1:45:00 (105 minutes)' }
      ],
      steps: [
        'Pace = 105 ÷ 21.1 = 4.976 minutes per km.',
        '0.976 × 60 = 59 seconds, so 4:59 per km.',
        'Speed = 21.1 ÷ 1.75 hours = 12.06 km/h.',
        '5 km split = 24:55 · 10 km = 49:50 · 15 km = 1:14:45.'
      ],
      result: '4:59 per km · 12.06 km/h',
      takeaway: 'Running the first 5 km even 15 seconds per km too fast costs far more than 75 seconds later. Even or slightly negative splits almost always produce better finish times.'
    },
    faqs: [
      { question: 'How do I convert pace to speed?', answer: 'Divide 60 by your pace in minutes. A 5:00 per km pace is 60 ÷ 5 = 12 km/h. Going the other way, divide 60 by your speed.' },
      { question: 'What is a negative split?', answer: 'Running the second half of a race faster than the first. It is the pacing strategy most consistently associated with good performances, because it avoids the early glycogen cost of starting too hard.' },
      { question: 'How do I convert between km and mile pace?', answer: 'Multiply km pace by 1.609 for mile pace. A 5:00/km pace is roughly 8:03 per mile.' }
    ]
  },

  'overweight-calculator': {
    calculatorId: 'overweight-calculator',
    title: 'Overweight Calculator',
    subtitle: 'Check whether your weight falls in the overweight range using BMI, with WHO thresholds and what the category does and does not tell you.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' BMI is a population screening tool and a poor individual diagnostic. It cannot distinguish muscle from fat.',
    overview: [
      'The overweight category is defined by BMI between 25 and 29.9 under WHO classification. It is a screening band, not a diagnosis, and says nothing about what your weight is actually made of.',
      'For a fuller picture, body fat percentage and waist circumference tell you considerably more than the category alone.'
    ],
    formulaCard: {
      title: 'BMI and Categories',
      formula: 'BMI = weight kg ÷ (height m)²',
      explanation: 'WHO categories: under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30 and above obese. Asian populations use lower thresholds because health risk rises at lower BMI.',
      variables: [
        { symbol: 'Overweight', meaning: 'BMI 25.0–29.9 under WHO classification' },
        { symbol: 'Asian cut-off', meaning: 'Overweight from 23.0 in some guidance' },
        { symbol: 'Waist', meaning: 'Often more informative than BMI for health risk' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter height and weight', description: 'Metric or imperial.' },
        { stepNumber: 2, title: 'See your BMI and category', description: 'Along with the healthy weight range for your height.' },
        { stepNumber: 3, title: 'Read the caveats', description: 'The category is a starting point, not a conclusion.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Someone 170 cm tall weighing 79 kg.',
      inputs: [
        { label: 'Height', value: '170 cm (1.70 m)' },
        { label: 'Weight', value: '79 kg' }
      ],
      steps: [
        'BMI = 79 ÷ (1.70)² = 79 ÷ 2.89 = 27.3.',
        'That falls in the 25–29.9 overweight band.',
        'Healthy range for this height = 53.5 kg to 71.9 kg.',
        'Reaching BMI 24.9 would mean losing about 7 kg.'
      ],
      result: 'BMI 27.3 — overweight category',
      takeaway: 'A muscular person at this BMI could have perfectly healthy body composition. Checking waist circumference and body fat percentage gives a far more meaningful answer.'
    },
    faqs: [
      { question: 'What BMI is considered overweight?', answer: '25.0 to 29.9 under WHO classification, with obesity beginning at 30. Some guidance for Asian populations uses lower thresholds, from 23.0, because health risk rises at a lower BMI.' },
      { question: 'Can I be overweight by BMI and still healthy?', answer: 'Yes. BMI cannot distinguish muscle from fat, so athletes and muscular individuals frequently register as overweight while carrying low body fat. Waist measurement and body composition are more informative.' },
      { question: 'What should I do if I am in the overweight range?', answer: 'Treat it as a prompt to look further rather than a diagnosis. Check waist circumference and body fat, consider overall diet and activity, and discuss with a healthcare professional if there are other risk factors.' }
    ]
  },

  'healthy-weight-calculator': {
    calculatorId: 'healthy-weight-calculator',
    title: 'Healthy Weight Range Calculator',
    subtitle: 'Find the healthy weight range for your height, compared across established formulas and the BMI healthy band.',
    readTimeMinutes: 3,
    author: AUTHOR,
    disclaimer: NOT_MEDICAL + ' A healthy weight range is broad and individual. Build, muscle mass and age all affect where within it you sit comfortably.',
    overview: [
      'A healthy weight is a range rather than a target. For any given height the BMI healthy band spans a considerable spread, and where you sit within it depends on build and body composition.',
      'Formulas that produce a single "ideal" figure imply a precision that does not exist.'
    ],
    formulaCard: {
      title: 'Healthy Weight Range',
      formula: 'Range = 18.5 × height² to 24.9 × height²',
      explanation: 'Height in metres. This is the BMI healthy band converted back into kilograms, and it is usually wider than people expect.',
      variables: [
        { symbol: 'Lower bound', meaning: 'BMI 18.5' },
        { symbol: 'Upper bound', meaning: 'BMI 24.9' },
        { symbol: 'Spread', meaning: 'Typically 15–20 kg for an adult' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your height', description: 'Metric or imperial.' },
        { stepNumber: 2, title: 'Read the range', description: 'Anywhere within it is generally considered healthy.' },
        { stepNumber: 3, title: 'Compare the formula estimates', description: 'Shown alongside for context — they typically cluster near the middle.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An adult 175 cm tall.',
      inputs: [{ label: 'Height', value: '175 cm (1.75 m)' }],
      steps: [
        'Lower bound = 18.5 × (1.75)² = 18.5 × 3.0625 = 56.7 kg.',
        'Upper bound = 24.9 × 3.0625 = 76.3 kg.',
        'Range spans 19.6 kg.',
        'Devine ideal weight for a man of this height ≈ 70.7 kg, comfortably inside it.'
      ],
      result: 'Healthy range 56.7–76.3 kg',
      takeaway: 'Almost 20 kg of range for one height. That breadth is the honest answer — a muscular person near the top and a slight person near the bottom can both be entirely healthy.'
    },
    faqs: [
      { question: 'What is a healthy weight for my height?', answer: 'A range rather than a number, corresponding to BMI 18.5 to 24.9. For most adult heights that spans 15–20 kg, and where you sit within it depends on build and muscle mass.' },
      { question: 'Why is the healthy range so wide?', answer: 'Because people of the same height differ substantially in frame size and muscle mass. A narrower range would misclassify large numbers of perfectly healthy people.' },
      { question: 'Should I aim for the middle of the range?', answer: 'Not necessarily. Someone with more muscle will sit naturally higher, someone lighter-framed lower. Body composition and how you feel matter more than position within the band.' }
    ]
  }
};
