import { CalculatorArticle } from '../../types/article';

const TIME_AUTHOR = {
  name: 'Calculator11 Editorial Team',
  role: 'Everyday Tools Desk',
  lastUpdated: 'September 2026'
};

/** Date, time, vehicle and general utility articles. */
export const EVERYDAY_ARTICLES: Record<string, CalculatorArticle> = {
  'time-duration-calculator': {
    calculatorId: 'time-duration-calculator',
    title: 'Time Duration Calculator',
    subtitle: 'Work out the time between two clock times, across midnight if needed, in hours, minutes and decimal hours.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Subtracting one clock time from another is awkward because time is base 60, not base 10. Shifts that cross midnight make it worse, since the end time appears to be earlier than the start.',
      'This handles both, and gives the result in decimal hours for payroll use.'
    ],
    formulaCard: {
      title: 'Duration Between Times',
      formula: 'Duration = End − Start (+ 24h if end is earlier)',
      explanation: 'Convert both times to minutes past midnight, subtract, and add 1,440 minutes if the result is negative. Then convert back to hours and minutes.',
      variables: [
        { symbol: 'Minutes past midnight', meaning: 'Hours × 60 + minutes' },
        { symbol: '1,440', meaning: 'Minutes in a day, added for overnight spans' },
        { symbol: 'Decimal hours', meaning: 'Minutes ÷ 60 — what payroll uses' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Time Duration Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the start and end times', description: '24-hour or 12-hour format.' },
        { stepNumber: 2, title: 'Overnight spans are handled', description: 'An end time earlier than the start is treated as the next day.' },
        { stepNumber: 3, title: 'Deduct breaks if needed', description: 'To get paid time rather than elapsed time.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Overnight Shift',
      scenario: 'A shift from 22:15 to 06:40 with a 30-minute break.',
      inputs: [
        { label: 'Start', value: '22:15' },
        { label: 'End', value: '06:40' },
        { label: 'Break', value: '30 minutes' }
      ],
      steps: [
        'Start = (22 × 60) + 15 = 1,335 minutes.',
        'End = (6 × 60) + 40 = 400 minutes.',
        '400 − 1,335 = −935, so add 1,440 → 505 minutes.',
        '505 minutes = 8 h 25 m. Less the break = 7 h 55 m, or 7.92 decimal hours.'
      ],
      result: '8h 25m elapsed · 7h 55m paid (7.92 decimal hours)',
      takeaway: 'Writing 7 hours 55 minutes as 7.55 on a timesheet understates the shift by about 22 minutes of pay. The decimal conversion is 55 ÷ 60 = 0.92.'
    },
    faqs: [
      { question: 'How do I calculate hours across midnight?', answer: 'Add 24 hours to the end time before subtracting. From 22:00 to 06:00 is (06:00 + 24h) − 22:00 = 8 hours.' },
      { question: 'How do I convert minutes to decimal hours?', answer: 'Divide by 60. So 45 minutes is 0.75 hours, and 20 minutes is 0.33 hours. Writing minutes directly after the decimal point is the most common timesheet error.' },
      { question: 'Should I deduct unpaid breaks?', answer: 'Yes, if your employer does not pay for them. Elapsed time and paid time differ by exactly the unpaid break duration.' }
    ]
  },

  'hours-and-minutes-calculator': {
    calculatorId: 'hours-and-minutes-calculator',
    title: 'Hours & Minutes Calculator',
    subtitle: 'Add and subtract hours and minutes, and convert between clock time and decimal hours for timesheets.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Adding times means carrying at 60 rather than 10, which is easy to get wrong by hand across several entries. This adds and subtracts any number of durations and converts the total to decimal.'
    ],
    formulaCard: {
      title: 'Adding Time',
      formula: 'Total minutes = Σ(hours × 60 + minutes), then ÷ 60 for hours',
      explanation: 'Convert everything to minutes, sum, then convert back. The remainder after dividing by 60 gives the leftover minutes.',
      variables: [
        { symbol: 'Carry', meaning: 'Every 60 minutes becomes 1 hour' },
        { symbol: 'Decimal', meaning: 'minutes ÷ 60' },
        { symbol: 'Quarter hours', meaning: '15 = 0.25 · 30 = 0.5 · 45 = 0.75' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Hours and Minutes Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter each duration', description: 'Hours and minutes separately.' },
        { stepNumber: 2, title: 'Choose add or subtract', description: 'Mixed operations are supported.' },
        { stepNumber: 3, title: 'Read both formats', description: 'Hours and minutes, plus decimal hours for payroll.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Adding 3h 45m, 2h 50m and 1h 35m.',
      inputs: [
        { label: 'First', value: '3h 45m' },
        { label: 'Second', value: '2h 50m' },
        { label: 'Third', value: '1h 35m' }
      ],
      steps: [
        'Minutes: 45 + 50 + 35 = 130.',
        '130 ÷ 60 = 2 hours remainder 10.',
        'Hours: 3 + 2 + 1 + 2 carried = 8.',
        'Total = 8h 10m = 8.17 decimal hours.'
      ],
      result: '8h 10m · 8.17 decimal hours',
      takeaway: 'The 130 minutes carried two whole hours. Adding the minute columns as if they were decimals would have given 8.130, which is meaningless.'
    },
    faqs: [
      { question: 'How do I add times without a calculator?', answer: 'Add the minutes first, carry any complete hours into the hour column, then add the hours. The only difference from decimal addition is that you carry at 60.' },
      { question: 'What is 1 hour 45 minutes in decimal?', answer: '1.75 hours, because 45 ÷ 60 = 0.75. Writing it as 1.45 would understate it by 18 minutes.' },
      { question: 'Why does payroll use decimal hours?', answer: 'Because pay is hours multiplied by a rate, and that only works in decimal. Multiplying 7h 30m by an hourly rate requires converting to 7.5 first.' }
    ]
  },

  'days-until-calculator': {
    calculatorId: 'days-until-calculator',
    title: 'Days Until Calculator',
    subtitle: 'Count the days until a birthday, holiday, exam or deadline, with weeks and months shown alongside.',
    readTimeMinutes: 2,
    author: TIME_AUTHOR,
    overview: [
      'A countdown from today to a future date, handling leap years and month lengths correctly. Useful for deadlines, events and anything where the exact number of days matters.'
    ],
    formulaCard: {
      title: 'Day Counting',
      formula: 'Days = Target date − Today',
      explanation: 'Both dates are converted to a day number and subtracted, which handles varying month lengths and leap years automatically. The count uses your local date rather than UTC.',
      variables: [
        { symbol: 'Inclusive', meaning: 'Whether the target day itself is counted' },
        { symbol: 'Weeks', meaning: 'Days ÷ 7' },
        { symbol: 'Leap year', meaning: 'Handled automatically, including the century rule' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Days Until Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the target date', description: 'Any future date.' },
        { stepNumber: 2, title: 'Read the countdown', description: 'In days, weeks and approximate months.' },
        { stepNumber: 3, title: 'Choose inclusive counting if needed', description: 'Relevant for deadlines where the final day counts.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Counting from 12 September 2026 to 1 January 2027.',
      inputs: [
        { label: 'From', value: '12 September 2026' },
        { label: 'To', value: '1 January 2027' }
      ],
      steps: [
        'Remaining in September: 18 days.',
        'October 31 + November 30 + December 31 = 92 days.',
        'Plus 1 January = 1 day.',
        'Total = 18 + 92 + 1 = 111 days, or 15 weeks and 6 days.'
      ],
      result: '111 days · 15 weeks and 6 days',
      takeaway: 'Counting by hand requires knowing each month\'s length. Month arithmetic is where manual counts most often slip by a day.'
    },
    faqs: [
      { question: 'Does the count include today?', answer: 'By default it counts full days remaining, so today is excluded. Inclusive counting adds one, which is usually what you want for a deadline where the final day still counts.' },
      { question: 'How are leap years handled?', answer: 'Automatically, including the century rule — years divisible by 100 are not leap years unless also divisible by 400.' },
      { question: 'Why does the month count look approximate?', answer: 'Because months vary from 28 to 31 days, so there is no exact conversion. The day count is precise; the month figure is a convenience.' }
    ]
  },

  'day-of-the-week-calculator': {
    calculatorId: 'day-of-the-week-calculator',
    title: 'Day of the Week Calculator',
    subtitle: 'Find the weekday for any date, past or future, using Gregorian calendar rules including leap years.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Every date falls on a determinable weekday, and the Gregorian calendar repeats on a 400-year cycle. This finds the day for any date — useful for historical questions, planning and verifying records.'
    ],
    formulaCard: {
      title: "Zeller's Congruence",
      formula: 'h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ + 5J) mod 7',
      explanation: 'q is the day, m the month (March = 3, with January and February treated as months 13 and 14 of the previous year), K the year within the century and J the century.',
      variables: [
        { symbol: 'h', meaning: 'Result: 0 = Saturday, 1 = Sunday, 2 = Monday …' },
        { symbol: 'Leap rule', meaning: 'Divisible by 4, except centuries not divisible by 400' },
        { symbol: 'Cycle', meaning: 'The calendar repeats every 400 years' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Day of the Week Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter any date', description: 'Past or future.' },
        { stepNumber: 2, title: 'Read the weekday', description: 'Along with the day number within the year.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Finding the weekday for 15 April 1912.',
      inputs: [{ label: 'Date', value: '15 April 1912' }],
      steps: [
        'q = 15, m = 4, year = 1912 → K = 12, J = 19.',
        '⌊13(4+1)/5⌋ = ⌊13⌋ = 13.',
        'h = (15 + 13 + 12 + 3 + 4 + 95) mod 7 = 142 mod 7 = 2.',
        'h = 2 corresponds to Monday.'
      ],
      result: '15 April 1912 was a Monday',
      takeaway: 'The formula works for any Gregorian date. Note that January and February are treated as months 13 and 14 of the preceding year, which trips up manual attempts.'
    },
    faqs: [
      { question: 'What day of the week was I born?', answer: 'Enter your date of birth and the calculator applies Zeller\'s congruence. It works for any date in the Gregorian calendar.' },
      { question: 'Does this work for dates before 1582?', answer: 'The Gregorian calendar was introduced in 1582 and adopted at different times in different countries. Earlier dates were recorded in the Julian calendar, so results before adoption need care about which system a historical record used.' },
      { question: 'Why do calendars repeat?', answer: 'The Gregorian cycle contains exactly 20,871 weeks over 400 years, so the pattern of dates and weekdays repeats precisely every four centuries.' }
    ]
  },

  'chronological-age-calculator': {
    calculatorId: 'chronological-age-calculator',
    title: 'Chronological Age Calculator',
    subtitle: 'Calculate exact age in years, months and days on a specific test date — the format required for school assessments.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Educational and psychological assessments require age expressed precisely in years, months and days on the date of testing, because norm tables are banded that narrowly.',
      'This is not the same as the age someone would give casually, and rounding can shift a score band.'
    ],
    formulaCard: {
      title: 'Exact Age Calculation',
      formula: 'Subtract date of birth from test date, borrowing where needed',
      explanation: 'Subtract days first, borrowing from months if negative, then months, borrowing from years. Borrowing uses the actual length of the preceding month, not an average.',
      variables: [
        { symbol: 'Test date', meaning: 'Date the assessment was administered' },
        { symbol: 'Borrowing', meaning: 'Uses the real month length, which varies' },
        { symbol: 'Convention', meaning: 'Assessments normally use completed months, not rounded' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Chronological Age Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter date of birth', description: 'Exactly as recorded.' },
        { stepNumber: 2, title: 'Enter the test date', description: 'The date of assessment, not today, unless they are the same.' },
        { stepNumber: 3, title: 'Record the result as given', description: 'Years, months and days — do not round unless the manual says to.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A child born 18 November 2017, tested on 5 March 2026.',
      inputs: [
        { label: 'Date of birth', value: '18 November 2017' },
        { label: 'Test date', value: '5 March 2026' }
      ],
      steps: [
        'Days: 5 − 18 is negative, so borrow from February (28 days in 2026): 5 + 28 = 33; 33 − 18 = 15 days.',
        'Months: now 2 (March less the borrowed month) − 11 is negative, so borrow a year: 14 − 11 = 3 months.',
        'Years: 2025 (after borrowing) − 2017 = 8 years.',
        'Age = 8 years, 3 months, 15 days.'
      ],
      result: '8 years, 3 months, 15 days',
      takeaway: 'Borrowing used February\'s actual 28 days. Using a 30-day average would give 8 years 3 months 17 days — potentially a different norm band.'
    },
    faqs: [
      { question: 'Why do assessments need exact age?', answer: 'Because norm tables are banded in narrow ranges, often three or six months. A child near a boundary can fall into a different band, changing their standardised score.' },
      { question: 'Should I round the months?', answer: 'No, unless the test manual instructs it. Record completed years, months and days exactly as calculated and let the manual specify any rounding.' },
      { question: 'Is chronological age the same as school year age?', answer: 'No. School year placement depends on cut-off dates that vary by jurisdiction. Chronological age is the exact elapsed time since birth.' }
    ]
  },

  'sleep-cycle-calculator': {
    calculatorId: 'sleep-cycle-calculator',
    title: 'Sleep Calculator',
    subtitle: 'Work backwards from your wake time to find bedtimes that let you finish a full sleep cycle rather than waking mid-cycle.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    disclaimer: 'Sleep cycle length varies between individuals and across the night. Persistent sleep problems warrant medical advice rather than timing adjustments.',
    overview: [
      'Sleep moves through cycles of roughly 90 minutes, progressing from light sleep through deep sleep to REM. Waking at the end of a cycle, in light sleep, generally feels easier than waking from deep sleep mid-cycle.',
      'That is why seven and a half hours can leave you feeling better than eight.'
    ],
    formulaCard: {
      title: 'Cycle-Based Bedtime',
      formula: 'Bedtime = Wake time − (cycles × 90 min) − time to fall asleep',
      explanation: 'Most adults need five to six cycles, which is 7.5 to 9 hours. Allow roughly 15 minutes to fall asleep when working backwards.',
      variables: [
        { symbol: 'Cycle', meaning: 'About 90 minutes, though it varies from 70 to 110' },
        { symbol: 'Sleep latency', meaning: 'Time to fall asleep, typically 10–20 minutes' },
        { symbol: 'Target', meaning: '5–6 complete cycles for most adults' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Sleep Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your wake time', description: 'When your alarm is set.' },
        { stepNumber: 2, title: 'Review the suggested bedtimes', description: 'Each corresponds to a whole number of cycles.' },
        { stepNumber: 3, title: 'Allow time to fall asleep', description: 'The calculator includes an allowance by default.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Waking at 06:30, allowing 15 minutes to fall asleep.',
      inputs: [
        { label: 'Wake time', value: '06:30' },
        { label: 'Sleep latency', value: '15 minutes' }
      ],
      steps: [
        '6 cycles = 9 hours → asleep by 21:30 → bedtime 21:15.',
        '5 cycles = 7.5 hours → asleep by 23:00 → bedtime 22:45.',
        '4 cycles = 6 hours → asleep by 00:30 → bedtime 00:15.'
      ],
      result: 'Best bedtimes: 21:15, 22:45 or 00:15',
      takeaway: 'Going to bed at 23:30 would mean waking part-way through a sixth cycle — often less refreshing than the shorter five-cycle option at 22:45.'
    },
    sections: [
      {
        id: 'caveats',
        title: 'What cycle timing cannot fix',
        paragraphs: [
          'The 90-minute figure is an average. Individual cycles range from about 70 to 110 minutes and lengthen through the night, so precise timing is less reliable than it appears.',
          'Total sleep duration and consistency matter more than cycle alignment. Regular timing, a dark cool room, and avoiding caffeine and screens late all affect quality more than optimising bedtime to the minute.'
        ],
        callout: { type: 'info', title: 'Consistency beats optimisation', text: 'Going to bed and waking at the same times daily, including weekends, does more for sleep quality than calculating cycle boundaries.' }
      }
    ],
    faqs: [
      { question: 'How many hours of sleep do I need?', answer: 'Most adults need seven to nine hours, which is roughly five to six cycles. Individual needs vary and a minority genuinely function well on less.' },
      { question: 'Is it better to sleep 6 hours or 7 hours?', answer: 'Seven hours is closer to most people\'s requirement. Cycle theory suggests 7.5 hours may feel better than 7, since it completes five cycles — but total duration matters more than exact alignment.' },
      { question: 'Why do I feel worse after a long sleep?', answer: 'Often sleep inertia from waking during deep sleep. It can also follow an irregular schedule, since sleeping much later than usual shifts your body clock.' }
    ]
  },

  'fuel-cost-calculator': {
    calculatorId: 'fuel-cost-calculator',
    title: 'Fuel Cost Calculator',
    subtitle: 'Estimate what a journey costs in fuel from distance, economy and price, split between passengers if you like.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Trip fuel cost depends on three things: how far you are going, how efficient the vehicle is, and what fuel costs. Working it out beforehand makes it easy to compare driving against other options or split costs fairly.'
    ],
    formulaCard: {
      title: 'Trip Fuel Cost',
      formula: 'Cost = (Distance ÷ Economy) × Price per unit',
      explanation: 'With MPG: gallons = miles ÷ MPG. With L/100km: litres = (km ÷ 100) × L/100km. Multiply by price per gallon or litre.',
      variables: [
        { symbol: 'Economy', meaning: 'MPG or litres per 100 km' },
        { symbol: 'Price', meaning: 'Per gallon or per litre' },
        { symbol: 'Return trip', meaning: 'Double the one-way distance' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Fuel Cost Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the distance', description: 'Double it for a return journey.' },
        { stepNumber: 2, title: 'Enter your fuel economy', description: 'Real-world economy is more accurate than the manufacturer figure.' },
        { stepNumber: 3, title: 'Enter the fuel price', description: 'Per litre or gallon.' },
        { stepNumber: 4, title: 'Split between passengers if sharing', description: 'Gives a per-person figure.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 520 km return trip at 6.8 L/100km with fuel at €1.72 per litre, shared by three people.',
      inputs: [
        { label: 'Distance', value: '520 km return' },
        { label: 'Economy', value: '6.8 L/100km' },
        { label: 'Fuel price', value: '€1.72/litre' },
        { label: 'Passengers', value: '3' }
      ],
      steps: [
        'Litres = (520 ÷ 100) × 6.8 = 35.4 litres.',
        'Cost = 35.4 × 1.72 = €60.89.',
        'Per person = 60.89 ÷ 3 = €20.30.'
      ],
      result: 'Total €60.89 · €20.30 each',
      takeaway: 'Fuel is only part of the true cost of driving. Wear, tyres, servicing and depreciation typically add a comparable amount again per kilometre.'
    },
    faqs: [
      { question: 'Should I use the manufacturer\'s fuel economy figure?', answer: 'Your own measured economy is better. Official figures come from standardised tests and real driving is typically 10–20% worse, which understates trip costs.' },
      { question: 'How do I convert MPG to L/100km?', answer: 'Divide 235.2 by US MPG, or 282.5 by UK MPG. So 30 US MPG is about 7.8 L/100km.' },
      { question: 'Does driving style affect trip cost much?', answer: 'Substantially. Steady motorway speeds are far more efficient than hard acceleration and braking, and economy falls noticeably above about 110 km/h as aerodynamic drag rises.' }
    ]
  },

  'tire-size-calculator': {
    calculatorId: 'tire-size-calculator',
    title: 'Tire Size Calculator',
    subtitle: 'Compare two tyre sizes and see the difference in diameter, sidewall height and the speedometer error a change introduces.',
    readTimeMinutes: 4,
    author: TIME_AUTHOR,
    disclaimer: 'Fitting tyres outside manufacturer specification can affect handling, ABS and stability systems, and may have legal or insurance implications. Consult a tyre specialist.',
    overview: [
      'Tyre sizes are written as a code like 225/45R17. Changing any part of it alters the overall rolling diameter, which in turn affects your speedometer, odometer and gearing.',
      'Keeping the new diameter within about 3% of the original is the usual guideline.'
    ],
    formulaCard: {
      title: 'Overall Diameter',
      formula: 'Diameter = (Width × Aspect ÷ 100 × 2) + (Rim × 25.4)',
      explanation: 'Width is in millimetres, aspect ratio is sidewall height as a percentage of width, and rim diameter is in inches. The sidewall counts twice — top and bottom.',
      variables: [
        { symbol: '225', meaning: 'Tread width in millimetres' },
        { symbol: '45', meaning: 'Aspect ratio — sidewall is 45% of width' },
        { symbol: 'R17', meaning: 'Radial construction, 17-inch rim' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Tire Size Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your current tyre size', description: 'From the sidewall of the fitted tyre.' },
        { stepNumber: 2, title: 'Enter the size you are considering', description: 'All three numbers.' },
        { stepNumber: 3, title: 'Check the diameter difference', description: 'Aim to stay within 3%.' },
        { stepNumber: 4, title: 'Note the speedometer error', description: 'A larger diameter makes the speedometer under-read.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Changing from 225/45R17 to 235/40R18.',
      inputs: [
        { label: 'Current', value: '225/45R17' },
        { label: 'Proposed', value: '235/40R18' }
      ],
      steps: [
        'Current: sidewall = 225 × 0.45 = 101.25 mm. Diameter = (101.25 × 2) + (17 × 25.4) = 634.3 mm.',
        'Proposed: sidewall = 235 × 0.40 = 94 mm. Diameter = (94 × 2) + (18 × 25.4) = 645.2 mm.',
        'Difference = 10.9 mm, or 1.7% larger.',
        'At an indicated 100 km/h the true speed would be about 101.7 km/h.'
      ],
      result: '1.7% larger · speedometer under-reads by about 1.7 km/h at 100',
      takeaway: 'Within the 3% guideline. Note the larger rim with lower profile keeps diameter nearly constant — that is the point of the paired change, often called plus-sizing.'
    },
    sections: [
      {
        id: 'effects',
        title: 'What changing diameter affects',
        paragraphs: ['More than just the speedometer:'],
        bullets: [
          'Speedometer and odometer readings, which shift by the same percentage as the diameter.',
          'Effective gearing — a larger diameter behaves like a taller final drive, slightly reducing acceleration.',
          'ABS and stability control, which are calibrated to expected wheel speeds.',
          'Clearance within the arches, especially at full lock or full suspension compression.',
          'Ride comfort, since a lower profile means less sidewall to absorb impacts.'
        ],
        callout: { type: 'warning', title: 'Load and speed ratings matter', text: 'Any replacement must meet or exceed the vehicle\'s specified load index and speed rating. Fitting lower-rated tyres is unsafe and may invalidate insurance.' }
      }
    ],
    faqs: [
      { question: 'How much can I change tyre size safely?', answer: 'Within about 3% of the original overall diameter is the common guideline. Beyond that, speedometer error grows and electronic systems calibrated to wheel speed may be affected.' },
      { question: 'Will bigger tyres make my speedometer wrong?', answer: 'Yes. A larger diameter covers more ground per revolution, so the speedometer under-reads — you are travelling faster than indicated. Smaller tyres do the reverse.' },
      { question: 'What does 225/45R17 actually mean?', answer: '225 mm tread width, a sidewall 45% of that width, radial construction, on a 17-inch rim.' }
    ]
  },

  'horsepower-calculator': {
    calculatorId: 'horsepower-calculator',
    title: 'Horsepower Calculator',
    subtitle: 'Calculate horsepower from torque and RPM, or estimate it from quarter-mile trap speed and vehicle weight.',
    readTimeMinutes: 4,
    author: TIME_AUTHOR,
    overview: [
      'Power and torque describe different things and are constantly confused. Torque is rotational force; horsepower is the rate at which work is done. Power is what determines top speed and how quickly a car accelerates at high revs.',
      'The two are linked by engine speed, which is why a high-revving engine can make large power from modest torque.'
    ],
    formulaCard: {
      title: 'Horsepower from Torque',
      formula: 'HP = (Torque lb-ft × RPM) ÷ 5252',
      explanation: 'The constant 5252 comes from the definition of horsepower. It is also why torque and horsepower curves always cross at exactly 5,252 RPM on any dyno chart.',
      variables: [
        { symbol: 'Torque', meaning: 'Rotational force in lb-ft' },
        { symbol: 'RPM', meaning: 'Engine revolutions per minute' },
        { symbol: 'Trap speed', meaning: 'Speed at the end of a quarter mile' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Horsepower Calculator',
      steps: [
        { stepNumber: 1, title: 'Choose your method', description: 'Torque and RPM, or trap speed and weight.' },
        { stepNumber: 2, title: 'Enter the values', description: 'Torque in lb-ft or Nm; the calculator converts.' },
        { stepNumber: 3, title: 'Note whether it is crank or wheel power', description: 'Trap-speed estimates give wheel power, typically 12–18% below crank figures.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'An engine producing 310 lb-ft at 4,400 RPM, and a car trapping 104 mph at 1,550 kg.',
      inputs: [
        { label: 'Torque', value: '310 lb-ft at 4,400 RPM' },
        { label: 'Trap speed', value: '104 mph' },
        { label: 'Weight', value: '1,550 kg (3,417 lb)' }
      ],
      steps: [
        'HP = (310 × 4,400) ÷ 5252 = 259.7 hp at that RPM.',
        'Trap method: HP = weight × (trap ÷ 234)³ = 3,417 × (104 ÷ 234)³.',
        '(0.4444)³ = 0.0878 → 3,417 × 0.0878 = 300 hp.',
        'The trap figure estimates crank power; the torque figure is power at one specific RPM.'
      ],
      result: '260 hp at 4,400 RPM · ~300 hp peak estimated from trap speed',
      takeaway: 'The two answer different questions. Torque × RPM gives power at that engine speed; trap speed estimates peak power actually delivered through the whole drivetrain.'
    },
    sections: [
      {
        id: 'torque-vs-power',
        title: 'Torque versus horsepower',
        paragraphs: [
          'Torque is the twisting force available at a given moment. Horsepower is torque multiplied by how fast that force is being applied — the rate of doing work.',
          'A diesel making large torque at low RPM feels strong from a standstill. A high-revving petrol engine making similar power from less torque at much higher RPM will outperform it at speed. Neither figure alone tells you how a car performs; gearing links them to what you actually feel.'
        ],
        callout: { type: 'info', title: 'Why the curves cross at 5,252', text: 'It falls out of the formula. At 5,252 RPM the torque and horsepower numbers are always equal, on every engine ever built.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between horsepower and torque?', answer: 'Torque is rotational force; horsepower is the rate of doing work, equal to torque times RPM divided by 5,252. Torque determines pulling force at a given RPM, power determines acceleration and top speed.' },
      { question: 'What is the difference between crank and wheel horsepower?', answer: 'Crank horsepower is measured at the engine; wheel horsepower at the driven wheels, after drivetrain losses of typically 12–18%. Manufacturers quote crank figures, chassis dynos measure wheel figures.' },
      { question: 'How accurate is estimating power from trap speed?', answer: 'Reasonably good for a rough figure, usually within about 10%. It is affected by aerodynamics, traction, altitude and driver skill, so it estimates delivered power rather than measuring engine output.' }
    ]
  },

  'engine-horsepower-calculator': {
    calculatorId: 'engine-horsepower-calculator',
    title: 'Engine Horsepower Calculator',
    subtitle: 'Estimate engine horsepower from quarter-mile trap speed and vehicle weight, or from torque and RPM.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Trap speed — the speed recorded at the end of a quarter mile — is a surprisingly good proxy for power, because overcoming drag at speed requires power in a fairly predictable relationship.',
      'It measures power actually delivered, which makes it a useful sanity check against a claimed figure.'
    ],
    formulaCard: {
      title: 'Trap Speed Method',
      formula: 'HP = Weight lb × (Trap speed mph ÷ 234)³',
      explanation: 'The cube reflects that aerodynamic power demand rises with the cube of speed. The constant 234 is empirical, fitted from a large sample of real runs.',
      variables: [
        { symbol: 'Weight', meaning: 'Vehicle plus driver and fuel, in pounds' },
        { symbol: 'Trap speed', meaning: 'Speed at the quarter-mile line' },
        { symbol: '234', meaning: 'Empirical constant from observed data' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter trap speed', description: 'From a timing slip, not an estimate.' },
        { stepNumber: 2, title: 'Enter the full running weight', description: 'Including driver and fuel — this matters.' },
        { stepNumber: 3, title: 'Treat the result as an estimate', description: 'Accurate to roughly 10% for typical vehicles.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A car weighing 3,200 lb with driver trapping 112 mph.',
      inputs: [
        { label: 'Weight', value: '3,200 lb' },
        { label: 'Trap speed', value: '112 mph' }
      ],
      steps: [
        '112 ÷ 234 = 0.4786.',
        '0.4786³ = 0.1097.',
        'HP = 3,200 × 0.1097 = 351 hp.'
      ],
      result: 'Estimated 351 horsepower',
      takeaway: 'Because the relationship is cubic, small trap speed differences imply large power differences. Two mph more would suggest roughly 19 additional horsepower.'
    },
    faqs: [
      { question: 'Why use trap speed rather than elapsed time?', answer: 'Elapsed time depends heavily on traction and launch technique. Trap speed reflects power delivered over the whole run and is far less sensitive to how well the car left the line.' },
      { question: 'Does weight need to include the driver?', answer: 'Yes. Use full running weight with driver and fuel. Omitting a 180 lb driver from a 3,200 lb car understates power by roughly 5%.' },
      { question: 'Is this crank or wheel horsepower?', answer: 'The formula is calibrated to approximate crank horsepower, since the empirical constant was fitted against manufacturer-rated figures.' }
    ]
  },

  'btu-calculator': {
    calculatorId: 'btu-calculator',
    title: 'BTU Calculator',
    subtitle: 'Size an air conditioner or heater in BTUs for a room, adjusted for ceiling height, sunlight and occupancy.',
    readTimeMinutes: 4,
    author: TIME_AUTHOR,
    disclaimer: 'This is a sizing estimate. Proper load calculation accounts for insulation, window glazing, climate zone and air changes. Consult an HVAC professional for permanent installations.',
    overview: [
      'BTU per hour measures heating or cooling capacity. Sizing matters in both directions: an undersized unit runs constantly without reaching temperature, while an oversized one short-cycles, wasting energy and failing to dehumidify properly.',
      'Oversizing is the more common and less obvious mistake.'
    ],
    formulaCard: {
      title: 'Baseline BTU Estimate',
      formula: 'BTU ≈ Room area (sq ft) × 20',
      explanation: 'Twenty BTU per square foot is the usual starting point for cooling. Adjustments then apply for ceiling height, sun exposure, occupancy and heat-generating equipment.',
      variables: [
        { symbol: 'Base', meaning: '20 BTU per square foot' },
        { symbol: 'Sunny room', meaning: 'Add 10%' },
        { symbol: 'Shaded room', meaning: 'Subtract 10%' },
        { symbol: 'Extra occupants', meaning: 'Add 600 BTU each beyond two' }
      ]
    },
    howToSteps: {
      title: 'How to Use the BTU Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter room dimensions', description: 'Length and width, plus ceiling height if it is not standard.' },
        { stepNumber: 2, title: 'Set sun exposure', description: 'South-facing rooms with large windows need more capacity.' },
        { stepNumber: 3, title: 'Add occupants and equipment', description: 'People and appliances both add heat load.' },
        { stepNumber: 4, title: 'Do not round up excessively', description: 'Oversizing causes short-cycling and poor humidity control.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A sunny 4.5 m × 5.5 m living room with 3 m ceilings, usually holding four people.',
      inputs: [
        { label: 'Room size', value: '4.5 × 5.5 m (266 sq ft)' },
        { label: 'Ceiling', value: '3 m (above standard)' },
        { label: 'Exposure', value: 'Sunny' },
        { label: 'Occupants', value: '4' }
      ],
      steps: [
        'Base = 266 × 20 = 5,320 BTU.',
        'Sunny room: +10% = 5,852 BTU.',
        'High ceiling: +15% = 6,730 BTU.',
        'Two extra occupants: +1,200 = 7,930 BTU.'
      ],
      result: 'About 8,000 BTU — a 9,000 BTU unit is the nearest standard size',
      takeaway: 'Jumping to a 12,000 BTU unit for headroom would cause short-cycling: the room cools too fast, the compressor stops, and humidity is never properly removed.'
    },
    faqs: [
      { question: 'What happens if my air conditioner is too big?', answer: 'It short-cycles — cooling the air quickly then shutting off before removing humidity. The room feels cold and clammy, efficiency drops, and the compressor wears faster.' },
      { question: 'How many BTU do I need per square foot?', answer: 'Around 20 BTU per square foot as a baseline for cooling, adjusted for ceiling height, sun exposure, occupancy and heat-producing equipment.' },
      { question: 'Is BTU the same for heating and cooling?', answer: 'The unit is the same but the required capacity usually differs, since heating loads depend on outdoor temperature differences that are often larger than cooling loads.' }
    ]
  },

  'password-generator': {
    calculatorId: 'password-generator',
    title: 'Password Generator',
    subtitle: 'Generate strong random passwords in your browser and check strength. Nothing is sent anywhere.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'A strong password is long and unpredictable. Length matters more than complexity — a long passphrase of common words beats a short string of symbols, and is far easier to remember.',
      'This generator runs entirely in your browser using the cryptographic random source. No password is transmitted or stored.'
    ],
    formulaCard: {
      title: 'Password Entropy',
      formula: 'Entropy (bits) = length × log₂(character set size)',
      explanation: 'Entropy measures unpredictability. Each additional bit doubles the number of possible passwords. Anything below 50 bits is weak; 80 or more is strong.',
      variables: [
        { symbol: 'Lowercase only', meaning: '26 characters — 4.7 bits each' },
        { symbol: 'Mixed + digits + symbols', meaning: '~94 characters — 6.55 bits each' },
        { symbol: 'Target', meaning: '80+ bits for important accounts' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Password Generator',
      steps: [
        { stepNumber: 1, title: 'Choose a length', description: 'Sixteen characters or more for anything important.' },
        { stepNumber: 2, title: 'Select character types', description: 'More types increase entropy per character.' },
        { stepNumber: 3, title: 'Generate and copy', description: 'Everything happens locally.' },
        { stepNumber: 4, title: 'Store it in a password manager', description: 'Strong unique passwords are only practical if you are not memorising them.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Length Beats Complexity',
      scenario: 'Comparing a short complex password against a longer simple one.',
      inputs: [
        { label: 'Option A', value: '8 chars, full character set' },
        { label: 'Option B', value: '16 chars, lowercase only' }
      ],
      steps: [
        'A: 8 × log₂(94) = 8 × 6.55 = 52 bits.',
        'B: 16 × log₂(26) = 16 × 4.70 = 75 bits.',
        'B is roughly 8,000 times harder to brute-force.',
        'And B is considerably easier to type and remember.'
      ],
      result: '8 complex chars: 52 bits · 16 simple chars: 75 bits',
      takeaway: 'Doubling length adds far more security than adding symbols to a short password. This is why passphrases have largely replaced complexity rules in modern guidance.'
    },
    sections: [
      {
        id: 'practices',
        title: 'What actually keeps accounts secure',
        paragraphs: ['Password strength is only part of it:'],
        bullets: [
          'Unique passwords per account — reuse is how one breach becomes many.',
          'A password manager, which makes uniqueness practical.',
          'Two-factor authentication, which protects you even if a password leaks.',
          'Length over complexity — aim for 16 characters or a multi-word passphrase.',
          'Avoid predictable substitutions like @ for a; cracking tools test those first.'
        ],
        callout: { type: 'warning', title: 'Forced rotation is outdated advice', text: 'Modern guidance including NIST no longer recommends routine password expiry, because it pushes people toward predictable incremental changes. Change a password when there is reason to believe it is compromised.' }
      }
    ],
    faqs: [
      { question: 'How long should a password be?', answer: 'At least 12 characters, and 16 or more for important accounts. Length contributes more to security than character variety in a short password.' },
      { question: 'Are passphrases better than random passwords?', answer: 'Often, in practice. Four or five random words give high entropy and are far easier to remember and type. The key is that the words must be randomly chosen, not a memorable phrase.' },
      { question: 'Is this generator safe to use?', answer: 'Generation happens entirely in your browser using the cryptographic random source. Nothing is transmitted. That said, for critical accounts, generating within your password manager is the more robust habit.' }
    ]
  },

  'roman-numeral-converter': {
    calculatorId: 'roman-numeral-converter',
    title: 'Roman Numeral Converter',
    subtitle: 'Convert Roman numerals to numbers and back, with the subtractive rules applied correctly.',
    readTimeMinutes: 3,
    author: TIME_AUTHOR,
    overview: [
      'Roman numerals combine seven letters using additive and subtractive rules. They still appear on clock faces, in book chapters, film credits and monarch names.',
      'The subtractive rule is where most errors occur — only certain combinations are valid.'
    ],
    formulaCard: {
      title: 'Symbols and Rules',
      formula: 'I=1 · V=5 · X=10 · L=50 · C=100 · D=500 · M=1000',
      explanation: 'A smaller value before a larger one is subtracted: IV = 4, IX = 9. Only I, X and C may be used subtractively, and only before the next two larger symbols.',
      variables: [
        { symbol: 'Valid subtractions', meaning: 'IV, IX, XL, XC, CD, CM only' },
        { symbol: 'Repetition', meaning: 'Maximum three consecutive identical symbols' },
        { symbol: 'Maximum', meaning: '3,999 in standard notation' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Roman Numeral Converter',
      steps: [
        { stepNumber: 1, title: 'Enter a number or a numeral', description: 'The direction is detected automatically.' },
        { stepNumber: 2, title: 'Check validity', description: 'Invalid forms such as IIII or IC are flagged.' },
        { stepNumber: 3, title: 'Review the breakdown', description: 'Shows how each symbol contributes.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting 1994 to Roman numerals.',
      inputs: [{ label: 'Number', value: '1994' }],
      steps: [
        '1000 → M, leaving 994.',
        '900 → CM (subtractive), leaving 94.',
        '90 → XC (subtractive), leaving 4.',
        '4 → IV. Result: MCMXCIV.'
      ],
      result: '1994 = MCMXCIV',
      takeaway: 'Work from the largest value down, taking the subtractive form whenever it applies. Writing 900 as DCCCC instead of CM is a common but invalid construction.'
    },
    faqs: [
      { question: 'Why is 4 written as IV rather than IIII?', answer: 'Standard notation uses the subtractive form, and no symbol may repeat more than three times. IIII does appear on some clock faces as a traditional exception, largely for visual balance.' },
      { question: 'What is the largest Roman numeral?', answer: '3,999 (MMMCMXCIX) in standard notation, since M cannot repeat more than three times. Larger values historically used a bar above a numeral to multiply it by a thousand.' },
      { question: 'Is there a Roman numeral for zero?', answer: 'No. The system has no zero and no negative numbers, which is one reason it was eventually superseded for calculation.' }
    ]
  }
};
