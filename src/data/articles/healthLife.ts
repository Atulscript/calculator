import { CalculatorArticle } from '../../types/article';

/**
 * Ideal weight, fertility, pregnancy and training-performance articles.
 *
 * YMYL cluster — see healthEnergy.ts for the authorship and disclaimer rules
 * that apply here too.
 */
export const HEALTH_LIFE_ARTICLES: Record<string, CalculatorArticle> = {
  'ideal-weight-calculator': {
    calculatorId: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    subtitle:
      'Compare four established ideal-weight formulas side by side. They disagree with each other — seeing the spread is more useful than any single number.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'These formulas were developed for clinical purposes such as drug dosing, not as health targets. None accounts for body composition, frame size or ethnicity. Not medical advice.',
    overview: [
      'There is no single ideal weight, and anyone presenting one number is hiding how the figure was produced. Several formulas exist, they were built for different purposes, and for the same person they routinely disagree by five kilograms or more.',
      'This calculator shows all four alongside a BMI-based healthy range, so you can see the band rather than a false point of precision.'
    ],
    formulaCard: {
      title: 'The Four Formulas',
      formula: 'Devine (men): 50 kg + 2.3 kg × (inches over 5 ft)',
      explanation:
        'Each formula follows the same shape — a base weight at five feet, plus an increment per inch above it — but uses different constants. Devine (1974) is the most widely used clinically, largely because it is embedded in drug dosing protocols rather than because it is the most accurate.',
      variables: [
        { symbol: 'Devine', meaning: 'Men 50 + 2.3/inch · Women 45.5 + 2.3/inch' },
        { symbol: 'Robinson', meaning: 'Men 52 + 1.9/inch · Women 49 + 1.7/inch' },
        { symbol: 'Miller', meaning: 'Men 56.2 + 1.41/inch · Women 53.1 + 1.36/inch' },
        { symbol: 'Hamwi', meaning: 'Men 48 + 2.7/inch · Women 45.5 + 2.2/inch' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Ideal Weight Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter height and sex',
          description: 'Every one of these formulas uses only these two inputs — which is their main limitation.'
        },
        {
          stepNumber: 2,
          title: 'Look at the spread, not one figure',
          description:
            'The range between the highest and lowest result is the honest answer. Anywhere within it is defensible.'
        },
        {
          stepNumber: 3,
          title: 'Compare against the BMI healthy range',
          description:
            'The BMI range is usually wider and, for most people, more realistic than any single formula output.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example: Woman, 165 cm',
      scenario: 'A woman of 165 cm — 5 feet 5 inches, so 5 inches over five feet.',
      inputs: [
        { label: 'Height', value: '165 cm (5 ft 5 in)' },
        { label: 'Inches over 5 ft', value: '5' }
      ],
      steps: [
        'Devine: 45.5 + (2.3 × 5) = 57.0 kg',
        'Robinson: 49 + (1.7 × 5) = 57.5 kg',
        'Miller: 53.1 + (1.36 × 5) = 59.9 kg',
        'Hamwi: 45.5 + (2.2 × 5) = 56.5 kg',
        'BMI healthy range (18.5–24.9) at this height: 50.4–67.8 kg'
      ],
      result: 'Formula range: 56.5–59.9 kg · BMI healthy range: 50.4–67.8 kg',
      takeaway:
        'The four formulas cluster within about 3.4 kg of each other, but the BMI healthy range is over 17 kg wide. That gap is the point — the formulas look precise and are not, while BMI is honest about how much normal variation exists.'
    },
    sections: [
      {
        id: 'origins',
        title: 'Where these formulas came from',
        paragraphs: [
          'The Devine formula was published in 1974 to estimate drug dosages, not to define a healthy weight. Robinson and Miller followed in the 1980s as refinements using different population data. Hamwi originated in 1964 as a quick clinical method for setting diabetic diet plans.',
          'None was designed as a health target for the general public, and none has been validated as one. They persist because they are simple, they are embedded in clinical software, and they give a definite-looking answer.'
        ],
        callout: {
          type: 'warning',
          title: 'Height and sex are not enough',
          text: 'These formulas ignore frame size, muscle mass, age and ethnicity. A heavily muscled person will exceed every one of them while carrying very little fat.'
        }
      },
      {
        id: 'better-measures',
        title: 'What to use instead',
        paragraphs: [
          'If the underlying question is whether your weight is healthy, body composition and fat distribution tell you far more than any height-based formula.',
          'Body fat percentage distinguishes muscle from fat, which is the thing these formulas cannot do. Waist circumference is a strong independent predictor of metabolic risk and needs only a tape measure. Waist-to-height ratio — keeping your waist under half your height — is a simple and surprisingly robust screen.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Which ideal weight formula is most accurate?',
        answer:
          'None is clearly best, because none was validated as a health target. Devine is the most widely used in clinical settings, mostly for drug dosing. Treat the spread across all four as the useful output rather than picking one.'
      },
      {
        question: 'Why do the formulas disagree with each other?',
        answer:
          'They were developed at different times, from different populations, for different purposes. Each uses its own base weight and per-inch increment, so they diverge more the further your height is from the average of the population each was built on.'
      },
      {
        question: 'Should I aim for my ideal weight?',
        answer:
          'Not as a precise target. The BMI healthy range for your height is a more realistic band, and where you sit within it depends on your build and muscle mass. For most people, improving body composition matters more than hitting a specific number on the scale.'
      }
    ],
    references: [
      {
        title: 'Gentamicin therapy (origin of the Devine formula)',
        source: 'Devine BJ, Drug Intelligence and Clinical Pharmacy (1974)'
      }
    ]
  },

  'pregnancy-due-date-calculator': {
    calculatorId: 'pregnancy-due-date-calculator',
    title: 'Due Date Calculator',
    subtitle:
      'Estimate your due date from your last period, conception date or IVF transfer, with current week and trimester shown.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'An estimated due date is exactly that. Only around 4% of babies arrive on it. Ultrasound dating in the first trimester is more accurate than any calculation and should take precedence. Not medical advice — your midwife or doctor is the authority on your dates.',
    overview: [
      'A due date is a reference point for monitoring a pregnancy, not a prediction of a birthday. Most babies arrive within a two-week window either side of it, and fewer than one in twenty on the day itself.',
      'The standard calculation counts 280 days from the first day of your last menstrual period. That convention dates the pregnancy from before conception occurred, which is why "40 weeks pregnant" describes roughly 38 weeks of actual fetal development.'
    ],
    formulaCard: {
      title: "Naegele's Rule",
      formula: 'Due date = First day of last period + 280 days',
      explanation:
        'Equivalently: take the first day of your last period, subtract three months, add seven days and one year. The rule assumes a regular 28-day cycle with ovulation on day 14, so it needs adjusting for longer or shorter cycles.',
      variables: [
        { symbol: 'LMP', meaning: 'First day of the last menstrual period' },
        { symbol: '280 days', meaning: '40 weeks — the standard gestational convention' },
        { symbol: 'Cycle adjustment', meaning: 'Add or subtract the difference between your cycle length and 28 days' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Due Date Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose your dating method',
          description:
            'Last period is the usual default. Conception date or IVF transfer date are more accurate if you know them.'
        },
        {
          stepNumber: 2,
          title: 'Enter the date',
          description:
            'For the last period method, use the first day of bleeding, not the last.'
        },
        {
          stepNumber: 3,
          title: 'Adjust for your cycle length',
          description:
            'If your cycles run longer than 28 days, ovulation happens later and the due date shifts later by the same number of days.'
        },
        {
          stepNumber: 4,
          title: 'Treat ultrasound dating as authoritative',
          description:
            'A first-trimester scan measures the fetus directly and will override this estimate if the two disagree.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A last menstrual period beginning 3 March 2026, with a regular 28-day cycle.',
      inputs: [
        { label: 'First day of last period', value: '3 March 2026' },
        { label: 'Cycle length', value: '28 days' }
      ],
      steps: [
        'Subtract three months from 3 March: 3 December 2025.',
        'Add seven days: 10 December 2025.',
        'Add one year: 10 December 2026.',
        'Equivalently, 3 March 2026 + 280 days = 8 December 2026 — the two methods differ by a day or two because calendar months vary in length.'
      ],
      result: 'Estimated due date: 8–10 December 2026',
      takeaway:
        'With a 35-day cycle instead, ovulation occurs about a week later and the due date moves to roughly 15 December. Cycle length is the single most common reason a calculated date differs from an early scan.'
    },
    sections: [
      {
        id: 'why-lmp',
        title: 'Why pregnancy is dated from before conception',
        paragraphs: [
          'Gestational age is counted from the first day of the last period because that date is observable, whereas the moment of conception usually is not. The convention adds roughly two weeks at the start during which you were not yet pregnant.',
          'This is why you can be "four weeks pregnant" only about two weeks after conception, and why the 40-week figure describes around 38 weeks of embryonic and fetal development.'
        ]
      },
      {
        id: 'accuracy',
        title: 'How accurate is a due date?',
        paragraphs: [
          'About 4% of babies are born on their estimated due date. Roughly 80% arrive between 37 and 42 weeks, which is the range defined as term.',
          "Naegele's rule assumes a textbook 28-day cycle with ovulation on day 14. Real cycles vary considerably, and the timing of ovulation varies even within one person's cycles. A dating scan between 8 and 14 weeks measures the fetus directly and is accurate to within about five days, which is why it takes precedence when the two disagree."
        ],
        callout: {
          type: 'info',
          title: 'Term is a range, not a date',
          text: 'Early term is 37–38 weeks, full term 39–40, late term 41, and post-term beyond 42. Arriving anywhere in that span is normal.'
        }
      },
      {
        id: 'ivf-dating',
        title: 'Dating an IVF pregnancy',
        paragraphs: [
          'IVF dates are the most precise available, because the exact age of the embryo at transfer is known. For a day-5 blastocyst transfer, the due date is the transfer date plus 261 days; for a day-3 transfer, plus 263 days.',
          'If you are using this calculator after IVF, select the transfer option and enter the embryo age rather than working from a last menstrual period, which may not reflect the actual timeline at all.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How accurate is a due date calculator?',
        answer:
          "It gives a reliable reference point but not a prediction of the birth date. Only about 4% of babies arrive on their estimated due date, while around 80% are born between 37 and 42 weeks. A first-trimester ultrasound is more accurate than Naegele's rule."
      },
      {
        question: 'What if my cycle is not 28 days?',
        answer:
          'Adjust by the difference. A 32-day cycle means ovulation happens roughly four days later than assumed, so add four days to the calculated date. Shorter cycles shift it earlier by the same logic.'
      },
      {
        question: 'Which is more reliable, my dates or the scan?',
        answer:
          'The scan, if taken in the first trimester. Early fetal growth is highly consistent between pregnancies, so measurements between 8 and 14 weeks date a pregnancy to within about five days. Clinicians will generally revise the due date if it differs from your dates by more than about a week.'
      },
      {
        question: 'Can I calculate from the conception date instead?',
        answer:
          'Yes, and it is more accurate if you genuinely know it — from ovulation tracking or IVF. Add 266 days to the conception date rather than 280, since that removes the two-week offset built into the last-period method.'
      }
    ],
    references: [
      {
        title: 'Methods for estimating the due date',
        source: 'American College of Obstetricians and Gynecologists (ACOG)'
      }
    ]
  },

  'ovulation-calculator': {
    calculatorId: 'ovulation-calculator',
    title: 'Ovulation Calculator',
    subtitle:
      'Estimate your fertile window and likely ovulation date from your cycle length and the first day of your last period.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Calendar-based prediction is an estimate, not a reliable method of contraception. Ovulation timing varies between cycles even for people with regular periods. Speak to a healthcare professional about contraception or fertility concerns.',
    overview: [
      'Ovulation is the release of an egg, which survives for about 12–24 hours. Sperm can survive several days in the reproductive tract, so the fertile window is wider than ovulation itself — roughly the five days before it plus the day itself.',
      'This calculator estimates that window from your cycle length. It works reasonably for regular cycles and poorly for irregular ones, which is worth knowing before relying on it either way.'
    ],
    formulaCard: {
      title: 'Estimating Ovulation From Cycle Length',
      formula: 'Ovulation day ≈ Cycle length − 14',
      explanation:
        'The luteal phase — from ovulation to the next period — is relatively consistent at around 14 days. The follicular phase before ovulation is what varies between people and between cycles, which is why counting backwards from the next expected period is more reliable than counting forwards from the last one.',
      variables: [
        { symbol: 'Cycle length', meaning: 'First day of one period to the first day of the next' },
        { symbol: 'Luteal phase', meaning: 'Typically 12–16 days, fairly stable within a person' },
        { symbol: 'Fertile window', meaning: 'The five days before ovulation plus the day of ovulation' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Ovulation Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Enter the first day of your last period',
          description: 'The first day of actual bleeding, not spotting.'
        },
        {
          stepNumber: 2,
          title: 'Enter your average cycle length',
          description:
            'Count from the first day of one period to the day before the next. If it varies, use the average of the last three to six cycles.'
        },
        {
          stepNumber: 3,
          title: 'Read the fertile window rather than the single day',
          description:
            'The six-day window is what matters. Pinpointing the exact day is not possible from calendar data alone.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A last period starting 1 April with a regular 30-day cycle.',
      inputs: [
        { label: 'First day of last period', value: '1 April' },
        { label: 'Cycle length', value: '30 days' }
      ],
      steps: [
        'Next period expected: 1 April + 30 days = 1 May.',
        'Ovulation ≈ 14 days before that = 17 April (cycle day 17).',
        'Fertile window = five days before ovulation plus the day itself = 12–17 April.',
        'On a 28-day cycle, the same calculation gives ovulation on day 14 and a window of 10–15 April.'
      ],
      result: 'Estimated ovulation: 17 April · Fertile window: 12–17 April',
      takeaway:
        'Two days of difference in cycle length moved the window by two days. For cycles that vary by a week or more, calendar prediction becomes too imprecise to be useful on its own.'
    },
    sections: [
      {
        id: 'signs-of-ovulation',
        title: 'Signs that track ovulation better than a calendar',
        paragraphs: [
          'Calendar maths predicts; your body reports. Combining the two is considerably more reliable than either alone:'
        ],
        bullets: [
          'Cervical mucus becomes clear, stretchy and slippery — similar to raw egg white — in the days before ovulation. This is the most useful single sign.',
          'Basal body temperature rises by roughly 0.3°C after ovulation, confirming it happened but too late to plan around in that cycle.',
          'Ovulation predictor kits detect the luteinising hormone surge 24–36 hours beforehand, which is the most actionable advance warning available at home.',
          'Some people feel mittelschmerz — a one-sided twinge — around ovulation, though it is not present for everyone.'
        ]
      },
      {
        id: 'irregular-cycles',
        title: 'If your cycles are irregular',
        paragraphs: [
          'Calendar prediction assumes consistency it cannot verify. If your cycles vary by more than a few days, the estimated window will often be wrong, and a wide variation can itself indicate conditions such as PCOS or thyroid dysfunction that are worth discussing with a doctor.',
          'For irregular cycles, tracking physical signs or using predictor kits across a longer window is considerably more effective than counting days.'
        ],
        callout: {
          type: 'warning',
          title: 'Not a contraceptive method',
          text: 'Calendar-based prediction has a high failure rate as contraception because ovulation timing shifts between cycles. Do not rely on it to avoid pregnancy.'
        }
      }
    ],
    faqs: [
      {
        question: 'When am I most fertile?',
        answer:
          'In the five days before ovulation and on the day itself. The two days immediately before ovulation carry the highest probability, because sperm are already present when the egg is released.'
      },
      {
        question: 'How long does an egg survive after ovulation?',
        answer:
          'About 12 to 24 hours. Sperm survive considerably longer — up to five days in fertile cervical mucus — which is why the fertile window opens well before ovulation rather than at it.'
      },
      {
        question: 'Can I ovulate without having a period?',
        answer:
          'Yes. Ovulation can occur without a subsequent period, and periods can occur in cycles where no egg was released. Neither reliably confirms the other, which is why tracking physical signs is more informative than tracking bleeding alone.'
      },
      {
        question: 'How long should it take to conceive?',
        answer:
          'Most couples having regular unprotected sex conceive within a year. Guidance generally suggests seeking advice after twelve months of trying, or after six months if you are over 35.'
      }
    ],
    references: [
      {
        title: 'Fertility awareness-based methods and the fertile window',
        source: 'American College of Obstetricians and Gynecologists (ACOG)'
      }
    ]
  },

  'one-rep-max-calculator': {
    calculatorId: 'one-rep-max-calculator',
    title: 'One Rep Max Calculator',
    subtitle:
      'Estimate your 1RM from any set you have completed, and get the full percentage table for programming your working sets.',
    readTimeMinutes: 5,
    author: {
      name: 'Calculator360 Editorial Team',
      role: 'Health & Nutrition Desk',
      lastUpdated: 'September 2026'
    },
    disclaimer:
      'Estimates are least accurate at high repetition counts and vary by lift and by individual. Always warm up thoroughly and use a spotter or safety bars when working near maximal loads.',
    overview: [
      'Your one rep max is the heaviest weight you can lift once with good form. Knowing it lets you programme training as percentages rather than guesswork — but actually testing it is fatiguing and carries injury risk.',
      'Estimation formulas solve this by predicting a 1RM from a submaximal set. Lift a weight for a known number of reps and the formula extrapolates.'
    ],
    formulaCard: {
      title: 'Epley and Brzycki Formulas',
      formula: 'Epley: 1RM = w × (1 + r ÷ 30)',
      explanation:
        'Brzycki is the common alternative: 1RM = w × 36 ÷ (37 − r). The two agree closely at low reps and diverge above about ten, where Epley predicts higher. Neither is reliable much beyond twelve reps.',
      variables: [
        { symbol: 'w', meaning: 'Weight lifted' },
        { symbol: 'r', meaning: 'Repetitions completed with good form' },
        { symbol: '1RM', meaning: 'Estimated one rep maximum' }
      ]
    },
    howToSteps: {
      title: 'How to Use the One Rep Max Calculator',
      steps: [
        {
          stepNumber: 1,
          title: 'Use a hard but clean set',
          description:
            'A set taken close to failure with good form gives the most accurate estimate. A set with two or three reps left in reserve will underestimate.'
        },
        {
          stepNumber: 2,
          title: 'Enter the weight and reps',
          description:
            'Keep reps under about ten. Accuracy falls away sharply above that, because endurance starts to dominate over strength.'
        },
        {
          stepNumber: 3,
          title: 'Use the percentage table to programme',
          description:
            'Most hypertrophy work sits at 65–80% of 1RM; strength work generally at 85% and above.'
        },
        {
          stepNumber: 4,
          title: 'Recalculate as you progress',
          description:
            'Re-estimate every four to six weeks. Percentages of a stale 1RM drift out of date quickly during a productive block.'
        }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A squat of 100 kg for 5 clean repetitions, taken close to failure.',
      inputs: [
        { label: 'Weight', value: '100 kg' },
        { label: 'Repetitions', value: '5' }
      ],
      steps: [
        'Epley: 100 × (1 + 5 ÷ 30) = 100 × 1.1667 = 116.7 kg.',
        'Brzycki: 100 × 36 ÷ (37 − 5) = 100 × 1.125 = 112.5 kg.',
        'The two differ by about 4 kg, so a working estimate of roughly 113–117 kg is reasonable.',
        'Programming at 75% of 115 kg gives working sets around 86 kg.'
      ],
      result: 'Estimated 1RM ≈ 113–117 kg · 75% working weight ≈ 86 kg',
      takeaway:
        'Take the lower estimate when in doubt. Programming from an inflated 1RM produces sessions you cannot complete, which undermines the plan faster than being slightly conservative does.'
    },
    sections: [
      {
        id: 'accuracy-by-lift',
        title: 'Accuracy varies by exercise',
        paragraphs: [
          'These formulas were derived largely from bench press data and transfer imperfectly to other lifts. Squats and deadlifts recruit more muscle mass and tend to allow more repetitions at a given percentage, so estimates from high-rep sets often come out low.',
          'Isolation exercises behave differently again, sustaining far more repetitions at a given percentage of maximum. Treat the estimate as most trustworthy for compound barbell lifts performed for five reps or fewer.'
        ]
      },
      {
        id: 'programming',
        title: 'Using percentages in training',
        paragraphs: [
          'Percentage-based programming gives a consistent way to scale load as you get stronger. Common ranges:'
        ],
        bullets: [
          '50–65% — technique work, speed work and warm-up sets.',
          '65–80% — the main hypertrophy range, typically 6–12 reps.',
          '80–90% — strength development, typically 3–5 reps.',
          '90%+ — peaking and maximal work, 1–2 reps, used sparingly.'
        ],
        callout: {
          type: 'tip',
          title: 'Autoregulate rather than obey the number',
          text: 'Percentages assume your 1RM is current and that today is an average day. Sleep, stress and nutrition all move what you can lift. Adjust to how the warm-up sets feel rather than forcing a prescribed load.'
        }
      }
    ],
    faqs: [
      {
        question: 'How accurate is a one rep max estimate?',
        answer:
          'Within a few percent when calculated from sets of five reps or fewer taken close to failure. Accuracy degrades as reps increase, and above about twelve reps the estimate reflects muscular endurance more than maximal strength.'
      },
      {
        question: 'Should I test my actual 1RM?',
        answer:
          'Rarely, and only if you are experienced with the lift and have proper safety equipment. True maximal testing is fatiguing and carries real injury risk. For most people an estimate updated every few weeks is more useful and considerably safer.'
      },
      {
        question: 'Why do Epley and Brzycki give different answers?',
        answer:
          'They were derived from different data sets and treat the load-repetition relationship slightly differently. They agree closely at low reps and diverge as reps increase, with Epley predicting higher. Using the lower figure is the conservative choice.'
      },
      {
        question: 'Does my 1RM change day to day?',
        answer:
          'Yes, meaningfully. Sleep, nutrition, stress and accumulated fatigue can move what you can lift by 5% or more in either direction. This is why programmes built purely on fixed percentages often need adjusting in the moment.'
      }
    ],
    references: [
      {
        title: 'Poundage chart and prediction of one repetition maximum',
        source: 'Epley B (1985); Brzycki M, JOPERD (1993)'
      }
    ]
  }
};
