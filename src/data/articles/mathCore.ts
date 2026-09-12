import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator360 Editorial Team',
  role: 'Education & Mathematics Desk',
  lastUpdated: 'September 2026'
};

/** Arithmetic, number theory, statistics and number-base articles. */
export const MATH_CORE_ARTICLES: Record<string, CalculatorArticle> = {
  'scientific-calculator': {
    calculatorId: 'scientific-calculator',
    title: 'Scientific Calculator',
    subtitle: 'A full scientific calculator with trigonometry, logarithms, powers, roots and memory, that works offline once loaded.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'A scientific calculator handles the functions a basic one cannot: trigonometry, logarithms, exponents, roots and constants. This one runs entirely in the browser and keeps working if you lose connection.',
      'The most common source of wrong answers is not the maths but the mode — degrees versus radians catches almost everyone at some point.'
    ],
    formulaCard: {
      title: 'Order of Operations',
      formula: 'Parentheses → Exponents → Multiplication/Division → Addition/Subtraction',
      explanation: 'Operations at the same level evaluate left to right. This calculator follows standard precedence, so 2 + 3 × 4 gives 14 rather than 20.',
      variables: [
        { symbol: 'DEG / RAD', meaning: 'Angle mode for trigonometric functions' },
        { symbol: 'ln vs log', meaning: 'ln is base e; log is base 10' },
        { symbol: 'Ans', meaning: 'Result of the previous calculation' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Scientific Calculator',
      steps: [
        { stepNumber: 1, title: 'Check the angle mode first', description: 'Degrees for geometry problems, radians for calculus and most physics.' },
        { stepNumber: 2, title: 'Use parentheses generously', description: 'They cost nothing and remove all ambiguity about precedence.' },
        { stepNumber: 3, title: 'Use memory for multi-step work', description: 'Storing an intermediate result avoids rounding errors from retyping.' },
        { stepNumber: 4, title: 'Type on a keyboard if you prefer', description: 'Number and operator keys work directly.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Mode Matters',
      scenario: 'Evaluating sin(30) in each angle mode.',
      inputs: [{ label: 'Expression', value: 'sin(30)' }],
      steps: [
        'In degrees: sin(30°) = 0.5.',
        'In radians: sin(30 rad) = −0.988.',
        'The same keystrokes produce completely different answers.'
      ],
      result: 'DEG: 0.5 · RAD: −0.988',
      takeaway: 'Always confirm the mode before trigonometric work. A wrong-mode answer is not slightly off — it is unrelated.'
    },
    sections: [
      {
        id: 'common-errors',
        title: 'Where calculator answers go wrong',
        paragraphs: ['Almost all errors come from a handful of causes:'],
        bullets: [
          'Angle mode set incorrectly for the problem.',
          'Missing parentheses around a numerator or denominator — 1/2+3 is not 1/(2+3).',
          'Confusing ln with log when a formula specifies one.',
          'Rounding intermediate results instead of carrying full precision through.',
          'Negative numbers raised to powers, where −2² and (−2)² differ.'
        ],
        callout: { type: 'tip', title: 'Estimate first', text: 'Have a rough expectation before pressing equals. Catching an answer that is orders of magnitude wrong is much easier than spotting a subtle slip.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between degrees and radians?', answer: 'Both measure angles. A full circle is 360 degrees or 2π radians. Geometry problems usually use degrees; calculus and physics generally use radians. The calculator must be in the matching mode.' },
      { question: 'What is the difference between log and ln?', answer: 'log is base 10 and ln is the natural logarithm, base e (about 2.718). Formulas usually specify which, and substituting one for the other changes the answer substantially.' },
      { question: 'Does this work offline?', answer: 'Yes, once the page has loaded. All calculation runs in your browser with no server involved.' }
    ]
  },

  'ratio-calculator': {
    calculatorId: 'ratio-calculator',
    title: 'Ratio Calculator',
    subtitle: 'Simplify ratios, solve for a missing term, and scale recipes or plans up and down while keeping proportions.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'A ratio compares quantities. Simplifying reduces it to its smallest whole numbers; solving a proportion finds a missing term when two ratios are equal.',
      'Both come up constantly in practical work — scaling recipes, mixing materials, reading maps and converting currencies all rely on proportion.'
    ],
    formulaCard: {
      title: 'Proportion and Simplification',
      formula: 'a : b = c : d  ⟹  a × d = b × c',
      explanation: 'Cross-multiplication solves for any missing term. To simplify, divide both parts by their greatest common factor.',
      variables: [
        { symbol: 'Ratio', meaning: 'Comparison of two or more quantities' },
        { symbol: 'Proportion', meaning: 'A statement that two ratios are equal' },
        { symbol: 'GCF', meaning: 'Greatest common factor, used to simplify' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Ratio Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the ratio terms', description: 'Two or more parts, such as 12 : 18.' },
        { stepNumber: 2, title: 'Choose simplify or solve', description: 'Leave one term blank to solve a proportion.' },
        { stepNumber: 3, title: 'Scale if needed', description: 'Enter a new total to scale all parts proportionally.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Simplifying 45 : 60, then scaling a 2 : 3 : 5 mix to 400 kg.',
      inputs: [
        { label: 'Ratio to simplify', value: '45 : 60' },
        { label: 'Mix ratio', value: '2 : 3 : 5' },
        { label: 'Target total', value: '400 kg' }
      ],
      steps: [
        'GCF of 45 and 60 is 15 → 45 ÷ 15 = 3, 60 ÷ 15 = 4, so 3 : 4.',
        'For the mix, total parts = 2 + 3 + 5 = 10.',
        'Each part = 400 ÷ 10 = 40 kg.',
        'Quantities = 80 kg, 120 kg, 200 kg.'
      ],
      result: '45 : 60 simplifies to 3 : 4 · Mix = 80 / 120 / 200 kg',
      takeaway: 'For multi-part ratios, dividing the total by the sum of the parts gives the value of one part. Everything else follows from that single number.'
    },
    faqs: [
      { question: 'How do I simplify a ratio?', answer: 'Divide every term by their greatest common factor. For 45 : 60 the GCF is 15, giving 3 : 4.' },
      { question: 'How do I scale a recipe using ratios?', answer: 'Add the parts to get a total, divide your target quantity by that total to find one part, then multiply each term by it.' },
      { question: 'What is the difference between a ratio and a fraction?', answer: 'A ratio compares parts to each other; a fraction compares a part to the whole. In a 2 : 3 ratio the first quantity is 2/5 of the total, not 2/3.' }
    ]
  },

  'average-calculator': {
    calculatorId: 'average-calculator',
    title: 'Average & Standard Deviation Calculator',
    subtitle: 'Calculate arithmetic and weighted averages plus standard deviation and variance, for a sample or a full population.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'An average summarises a data set in one number. Standard deviation tells you how much the data actually spreads around it — and without that, an average can be badly misleading.',
      'Two data sets with identical means can look nothing alike. The spread is usually the more informative figure.'
    ],
    formulaCard: {
      title: 'Mean and Standard Deviation',
      formula: 'Mean = Σx ÷ n · SD = √[Σ(x − mean)² ÷ (n − 1)]',
      explanation: 'Dividing by n − 1 gives the sample standard deviation, which is the right choice when your data is a sample of a larger population. Dividing by n gives the population figure.',
      variables: [
        { symbol: 'Σx', meaning: 'Sum of all values' },
        { symbol: 'n', meaning: 'Number of values' },
        { symbol: 'Variance', meaning: 'Standard deviation squared' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Average Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your values', description: 'Separated by commas, spaces or new lines.' },
        { stepNumber: 2, title: 'Choose sample or population', description: 'Sample is correct unless your data covers every member of the group.' },
        { stepNumber: 3, title: 'Add weights if needed', description: 'For a weighted average where some values count more.' },
        { stepNumber: 4, title: 'Read the spread alongside the mean', description: 'A large standard deviation means the mean represents the data poorly.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'The data set 4, 8, 15, 16, 23, 42.',
      inputs: [{ label: 'Values', value: '4, 8, 15, 16, 23, 42' }],
      steps: [
        'Sum = 108, n = 6 → mean = 18.',
        'Deviations: −14, −10, −3, −2, 5, 24.',
        'Squared: 196, 100, 9, 4, 25, 576 → sum 910.',
        'Sample variance = 910 ÷ 5 = 182 → SD = √182 = 13.49.'
      ],
      result: 'Mean 18 · Sample SD 13.49',
      takeaway: 'A standard deviation of 13.49 against a mean of 18 is very wide, driven largely by the 42. When spread is that large, the median is often a more honest summary.'
    },
    sections: [
      {
        id: 'weighted',
        title: 'When to use a weighted average',
        paragraphs: [
          'A plain average treats every value equally. That is wrong whenever some values represent more than others — grades with different credit values, prices across different quantities, or survey results from unequal group sizes.',
          'A weighted average multiplies each value by its weight, sums them, and divides by the total weight. Using a plain average in these situations produces a number that looks reasonable and is simply incorrect.'
        ],
        callout: { type: 'tip', title: 'Check the outliers', text: 'The mean is pulled hard by extreme values. If one value dominates the standard deviation, report the median alongside it.' }
      }
    ],
    faqs: [
      { question: 'Should I use sample or population standard deviation?', answer: 'Sample, in almost all real situations, because you rarely have data on an entire population. Dividing by n − 1 corrects a bias that would otherwise understate the spread.' },
      { question: 'What does standard deviation actually tell me?', answer: 'How far values typically sit from the mean. In roughly bell-shaped data, about 68% of values fall within one standard deviation and about 95% within two.' },
      { question: 'When is the mean the wrong average to use?', answer: 'When the data is skewed or contains outliers. Income is the classic case — a few very high earners pull the mean well above what a typical person earns, making the median more representative.' }
    ]
  },

  'mean-median-mode-range-calculator': {
    calculatorId: 'mean-median-mode-range-calculator',
    title: 'Mean, Median, Mode and Range Calculator',
    subtitle: 'Find all four measures from one data set, with the sorted values and the working shown for each.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'These four measures are taught together because each describes something the others miss. Mean gives the arithmetic centre, median the positional centre, mode the most common value, and range the total spread.',
      'Which one is most useful depends entirely on the shape of the data.'
    ],
    formulaCard: {
      title: 'The Four Measures',
      formula: 'Mean = Σx ÷ n · Median = middle value when sorted',
      explanation: 'Mode is the most frequent value, and a set can have none, one or several. Range is the largest value minus the smallest.',
      variables: [
        { symbol: 'Mean', meaning: 'Arithmetic average — sensitive to outliers' },
        { symbol: 'Median', meaning: 'Middle value when sorted — resistant to outliers' },
        { symbol: 'Mode', meaning: 'Most frequent value — the only one usable for categories' },
        { symbol: 'Range', meaning: 'Maximum minus minimum' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your data set', description: 'Any separator works — commas, spaces or line breaks.' },
        { stepNumber: 2, title: 'Review the sorted list', description: 'Sorting is the first step for median and makes the mode visible.' },
        { stepNumber: 3, title: 'Compare mean and median', description: 'A large gap between them signals skew or outliers.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'The data set 7, 3, 9, 3, 12, 15, 3, 8.',
      inputs: [{ label: 'Values', value: '7, 3, 9, 3, 12, 15, 3, 8' }],
      steps: [
        'Sorted: 3, 3, 3, 7, 8, 9, 12, 15.',
        'Mean = 60 ÷ 8 = 7.5.',
        'Median: n is even, so average the 4th and 5th values = (7 + 8) ÷ 2 = 7.5.',
        'Mode = 3, appearing three times.',
        'Range = 15 − 3 = 12.'
      ],
      result: 'Mean 7.5 · Median 7.5 · Mode 3 · Range 12',
      takeaway: 'Mean and median agree here, suggesting reasonable symmetry. The mode of 3 sits well below both, which tells you the low values cluster — something neither of the other measures reveals.'
    },
    sections: [
      {
        id: 'which-to-use',
        title: 'Choosing the right measure',
        paragraphs: ['Each answers a different question:'],
        bullets: [
          'Mean — best for symmetric data with no extreme values.',
          'Median — best for skewed data such as income, house prices or response times.',
          'Mode — the only option for categorical data, and useful for finding the most common outcome.',
          'Range — quick but fragile, since a single outlier determines it entirely.'
        ]
      }
    ],
    faqs: [
      { question: 'How do I find the median of an even-numbered set?', answer: 'Sort the values and take the mean of the two middle ones. For eight values, average the 4th and 5th.' },
      { question: 'Can a data set have more than one mode?', answer: 'Yes. Two modes make it bimodal, more than two multimodal. If every value appears exactly once there is no mode at all.' },
      { question: 'Why do mean and median sometimes differ so much?', answer: 'Because the mean is pulled by extreme values while the median is not. A mean well above the median indicates a right skew — a few large values dragging the average up.' }
    ]
  },

  'probability-calculator': {
    calculatorId: 'probability-calculator',
    title: 'Probability Calculator',
    subtitle: 'Calculate probability for single and combined events, covering independent, dependent and mutually exclusive cases.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Probability expresses how likely something is on a scale from 0 to 1. The arithmetic for a single event is straightforward; combining events is where the rules matter, because whether events affect each other changes the calculation entirely.'
    ],
    formulaCard: {
      title: 'Combining Events',
      formula: 'P(A and B) = P(A) × P(B)  — independent events',
      explanation: 'For dependent events, P(A and B) = P(A) × P(B given A). For either event: P(A or B) = P(A) + P(B) − P(A and B), subtracting the overlap so it is not counted twice.',
      variables: [
        { symbol: 'Independent', meaning: 'One event does not affect the other' },
        { symbol: 'Dependent', meaning: 'The first outcome changes the second probability' },
        { symbol: 'Mutually exclusive', meaning: 'Cannot both happen, so P(A and B) = 0' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Probability Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the individual probabilities', description: 'As decimals or percentages.' },
        { stepNumber: 2, title: 'Choose the relationship', description: 'Independent, dependent or mutually exclusive — this determines which rule applies.' },
        { stepNumber: 3, title: 'Select and or or', description: 'Both events occurring, or at least one.' },
        { stepNumber: 4, title: 'Check the complement', description: 'The probability of something not happening is 1 − P.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: With and Without Replacement',
      scenario: 'Drawing two red cards from a standard 52-card deck.',
      inputs: [
        { label: 'Red cards', value: '26 of 52' },
        { label: 'Draws', value: '2' }
      ],
      steps: [
        'With replacement (independent): 26/52 × 26/52 = 0.5 × 0.5 = 0.25.',
        'Without replacement (dependent): first draw 26/52 = 0.5.',
        'After removing one red card, 25 red remain of 51: 25/51 = 0.490.',
        '0.5 × 0.490 = 0.245.'
      ],
      result: 'With replacement 25% · Without replacement 24.5%',
      takeaway: 'Replacement makes the draws independent. Without it the second probability shifts, which is why dependent events must be handled separately.'
    },
    sections: [
      {
        id: 'intuition',
        title: 'Where probability intuition fails',
        paragraphs: ['Several results are reliably counter-intuitive:'],
        bullets: [
          'The gambler\'s fallacy — independent events have no memory. A coin that landed heads ten times is still 50/50.',
          'The birthday problem — only 23 people are needed for a better-than-even chance two share a birthday.',
          'Base rates — a highly accurate test for a rare condition still produces mostly false positives.',
          'Compounding small risks — a 1% chance repeated 100 times gives roughly a 63% chance of at least one occurrence, not 100%.'
        ],
        callout: { type: 'info', title: 'Use the complement', text: 'For "at least one" problems it is almost always easier to calculate the probability of none, then subtract from 1.' }
      }
    ],
    faqs: [
      { question: 'What is the difference between independent and dependent events?', answer: 'Independent events do not affect each other — two coin flips. Dependent events do — drawing cards without replacement, where each draw changes what remains.' },
      { question: 'How do I calculate "at least one" probability?', answer: 'Find the probability of none occurring and subtract from 1. For at least one head in three flips: 1 − (0.5)³ = 0.875.' },
      { question: 'Can probability be greater than 1?', answer: 'No. Probability ranges from 0 (impossible) to 1 (certain). A result above 1 means an error — most often adding probabilities of events that can occur together without subtracting the overlap.' }
    ]
  },

  'permutation-and-combination-calculator': {
    calculatorId: 'permutation-and-combination-calculator',
    title: 'Permutation & Combination Calculator',
    subtitle: 'Calculate nPr and nCr with and without repetition, and see which one your problem actually needs.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Permutations and combinations both count selections from a set. The only question that separates them is whether order matters — and getting that wrong is the most common error in this topic.',
      'A lottery draw is a combination; a race podium is a permutation.'
    ],
    formulaCard: {
      title: 'nPr and nCr',
      formula: 'P(n,r) = n! ÷ (n − r)! · C(n,r) = n! ÷ [r! × (n − r)!]',
      explanation: 'The combination formula divides by r! to remove the orderings, which is why nCr is always smaller than or equal to nPr.',
      variables: [
        { symbol: 'n', meaning: 'Total items available' },
        { symbol: 'r', meaning: 'Number selected' },
        { symbol: 'n!', meaning: 'Factorial — n × (n−1) × … × 1' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Decide whether order matters', description: 'If rearranging the same selection counts as different, it is a permutation.' },
        { stepNumber: 2, title: 'Enter n and r', description: 'Total available and number chosen.' },
        { stepNumber: 3, title: 'Allow repetition if applicable', description: 'Whether the same item can be chosen more than once.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Choosing 3 people from 10 — first as a committee, then as ranked positions.',
      inputs: [
        { label: 'n', value: '10' },
        { label: 'r', value: '3' }
      ],
      steps: [
        'Committee (order irrelevant): C(10,3) = 10! ÷ (3! × 7!) = 120.',
        'Ranked positions (order matters): P(10,3) = 10! ÷ 7! = 720.',
        'The permutation is 6 times larger, because each committee of 3 can be ordered in 3! = 6 ways.'
      ],
      result: 'Combinations 120 · Permutations 720',
      takeaway: 'The factor between them is always r!. If you can state why order does or does not matter, the formula follows automatically.'
    },
    sections: [
      {
        id: 'which',
        title: 'Telling them apart',
        paragraphs: ['A quick test: would swapping two chosen items give a different outcome?'],
        bullets: [
          'Permutation — race finishing positions, passwords, seating arrangements, PIN codes.',
          'Combination — lottery numbers, committee membership, pizza toppings, hands of cards.',
          'With repetition — a 4-digit PIN allows repeated digits, giving 10⁴ = 10,000 options.',
          'Without repetition — dealing cards, where each is removed once drawn.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the difference between a permutation and a combination?', answer: 'Permutations count arrangements where order matters; combinations count selections where it does not. ABC and CBA are two permutations but one combination.' },
      { question: 'Why is nCr smaller than nPr?', answer: 'Because combinations treat all orderings of the same selection as one outcome. Dividing nPr by r! collapses those duplicates.' },
      { question: 'What does the factorial symbol mean?', answer: 'n! is the product of all positive integers up to n. So 5! = 5 × 4 × 3 × 2 × 1 = 120. By definition 0! = 1.' }
    ]
  },

  'random-number-generator': {
    calculatorId: 'random-number-generator',
    title: 'Random Number Generator',
    subtitle: 'Generate random numbers in any range, with or without duplicates, using the browser\'s cryptographic random source.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'This generator uses the browser\'s cryptographic random source rather than a simple pseudorandom function, which gives better-quality randomness for draws, sampling and selection.',
      'Everything happens locally — no numbers are generated on or sent to a server.'
    ],
    formulaCard: {
      title: 'Range Mapping',
      formula: 'value = min + floor(random × (max − min + 1))',
      explanation: 'A uniform random value in [0,1) is scaled to the requested range. Adding 1 before flooring makes the maximum inclusive.',
      variables: [
        { symbol: 'min / max', meaning: 'Inclusive bounds of the range' },
        { symbol: 'Unique', meaning: 'Whether the same number can appear twice' },
        { symbol: 'Count', meaning: 'How many numbers to generate' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Random Number Generator',
      steps: [
        { stepNumber: 1, title: 'Set the minimum and maximum', description: 'Both are inclusive.' },
        { stepNumber: 2, title: 'Choose how many to generate', description: 'For unique numbers, the count cannot exceed the range size.' },
        { stepNumber: 3, title: 'Toggle duplicates', description: 'Unique for draws and sampling; duplicates allowed for dice-style rolls.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Drawing 6 unique numbers from 1 to 49 for a lottery-style selection.',
      inputs: [
        { label: 'Range', value: '1 to 49' },
        { label: 'Count', value: '6' },
        { label: 'Duplicates', value: 'Not allowed' }
      ],
      steps: [
        'Each draw selects uniformly from the remaining numbers.',
        'After each selection that number is removed from the pool.',
        'The chance of any specific combination is 1 in C(49,6) = 13,983,816.'
      ],
      result: 'Six unique numbers, each equally likely',
      takeaway: 'Every combination is exactly as likely as every other. Patterns like 1-2-3-4-5-6 have identical odds to any scattered set.'
    },
    faqs: [
      { question: 'Is this truly random?', answer: 'It uses the browser\'s cryptographic random source, which is seeded from system entropy. That is not theoretically perfect randomness but is far stronger than a basic pseudorandom function and more than sufficient for any everyday use.' },
      { question: 'Can I generate the same number twice?', answer: 'Yes, if duplicates are allowed — appropriate for simulating dice or coin flips. Turn them off for draws and sampling where each result must be distinct.' },
      { question: 'Are the numbers sent anywhere?', answer: 'No. Generation happens entirely in your browser and nothing is transmitted.' }
    ]
  },

  'binary-calculator': {
    calculatorId: 'binary-calculator',
    title: 'Binary Calculator',
    subtitle: 'Add, subtract, multiply and divide in binary, and convert between binary, decimal, octal and hexadecimal.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Binary uses only 0 and 1, with each position representing a power of two. It is how computers store everything, and reading it fluently makes a great deal of low-level computing clearer.',
      'Arithmetic follows the same rules as decimal — you just carry at 2 instead of 10.'
    ],
    formulaCard: {
      title: 'Positional Value',
      formula: 'Decimal = Σ (bitᵢ × 2ⁱ)',
      explanation: 'Reading right to left, positions are worth 1, 2, 4, 8, 16, 32 and so on. So 1011 = 8 + 0 + 2 + 1 = 11.',
      variables: [
        { symbol: 'Bit', meaning: 'A single binary digit, 0 or 1' },
        { symbol: 'Byte', meaning: '8 bits, representing 0–255' },
        { symbol: 'MSB / LSB', meaning: 'Most and least significant bit' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Binary Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your binary values', description: 'Only 0s and 1s are accepted.' },
        { stepNumber: 2, title: 'Choose an operation', description: 'Add, subtract, multiply or divide.' },
        { stepNumber: 3, title: 'Check the conversions', description: 'Results are shown in decimal, octal and hex alongside binary.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Adding 1011 and 1101 in binary.',
      inputs: [
        { label: 'First value', value: '1011 (11 decimal)' },
        { label: 'Second value', value: '1101 (13 decimal)' }
      ],
      steps: [
        'Rightmost: 1 + 1 = 10 → write 0, carry 1.',
        'Next: 1 + 0 + carry 1 = 10 → write 0, carry 1.',
        'Next: 0 + 1 + carry 1 = 10 → write 0, carry 1.',
        'Next: 1 + 1 + carry 1 = 11 → write 1, carry 1.',
        'Final carry gives 11000 = 24 decimal.'
      ],
      result: '1011 + 1101 = 11000 (24 decimal)',
      takeaway: 'Binary addition carries whenever a column reaches 2, exactly as decimal carries at 10. The mechanics are identical, only the base changes.'
    },
    sections: [
      {
        id: 'conversion',
        title: 'Converting decimal to binary',
        paragraphs: [
          'Divide repeatedly by 2 and record the remainders, then read them bottom to top. For 22: 22÷2=11 r0, 11÷2=5 r1, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1 → 10110.',
          'Hex is easier to read than long binary strings because each hex digit maps to exactly four bits, which is why memory addresses and colour codes use it.'
        ]
      }
    ],
    faqs: [
      { question: 'How do I convert decimal to binary?', answer: 'Divide by 2 repeatedly, recording each remainder, then read the remainders bottom to top. Alternatively subtract the largest powers of two that fit.' },
      { question: 'Why do computers use binary?', answer: 'Because electronic circuits have two reliable states — on and off. Representing more states per component would require distinguishing voltage levels precisely, which is far more error-prone.' },
      { question: 'What is two\'s complement?', answer: 'The standard way of representing negative numbers in binary. Invert every bit of the positive value and add 1. It lets the same circuitry handle addition and subtraction.' }
    ]
  },

  'hex-calculator': {
    calculatorId: 'hex-calculator',
    title: 'Hex Calculator',
    subtitle: 'Do arithmetic in hexadecimal and convert between hex, decimal and binary — useful for colour codes and memory addresses.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Hexadecimal is base 16, using 0–9 then A–F for the values 10 to 15. Its usefulness comes from the fact that one hex digit represents exactly four binary bits, making it a compact and readable stand-in for binary.',
      'That is why it appears in colour codes, memory addresses, MAC addresses and character encodings.'
    ],
    formulaCard: {
      title: 'Hex Positional Value',
      formula: 'Decimal = Σ (digitᵢ × 16ⁱ)',
      explanation: 'Positions are worth 1, 16, 256, 4096 and so on. So 2F = (2 × 16) + 15 = 47.',
      variables: [
        { symbol: 'A–F', meaning: 'Represent 10, 11, 12, 13, 14, 15' },
        { symbol: '1 hex digit', meaning: 'Exactly 4 binary bits' },
        { symbol: '2 hex digits', meaning: 'One byte, 0–255' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Hex Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter hex values', description: 'Digits 0–9 and letters A–F, in either case.' },
        { stepNumber: 2, title: 'Choose an operation', description: 'Arithmetic is performed in base 16.' },
        { stepNumber: 3, title: 'Read the conversions', description: 'Decimal and binary equivalents are shown alongside.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Converting the colour code #3A7BD5 to its RGB components.',
      inputs: [{ label: 'Hex colour', value: '#3A7BD5' }],
      steps: [
        'Split into pairs: 3A, 7B, D5.',
        '3A = (3 × 16) + 10 = 58 → red.',
        '7B = (7 × 16) + 11 = 123 → green.',
        'D5 = (13 × 16) + 5 = 213 → blue.'
      ],
      result: '#3A7BD5 = rgb(58, 123, 213)',
      takeaway: 'Each pair of hex digits is one byte with a range of 0–255, which is exactly the range of each RGB channel. That correspondence is why colours are written in hex.'
    },
    faqs: [
      { question: 'Why does hex use letters?', answer: 'Base 16 needs sixteen distinct digits, but our numeral system only provides ten. A to F fill the gap for the values 10 through 15.' },
      { question: 'How do hex colour codes work?', answer: 'Each pair of digits sets one channel — red, green, blue — on a 0–255 scale. #FF0000 is full red with no green or blue.' },
      { question: 'Why is hex used instead of binary?', answer: 'It is far more compact and less error-prone to read. One hex digit replaces four binary digits exactly, so 11111111 becomes FF with no ambiguity.' }
    ]
  },

  'exponent-calculator': {
    calculatorId: 'exponent-calculator',
    title: 'Exponent Calculator',
    subtitle: 'Calculate powers, roots and fractional exponents, including negative bases and the rules that apply to them.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'An exponent tells you how many times to multiply a base by itself. The rules extend naturally to negative and fractional exponents, which represent reciprocals and roots respectively.'
    ],
    formulaCard: {
      title: 'Exponent Rules',
      formula: 'aᵐ × aⁿ = aᵐ⁺ⁿ · aᵐ ÷ aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ',
      explanation: 'A negative exponent means a reciprocal: a⁻ⁿ = 1 ÷ aⁿ. A fractional exponent means a root: a^(1/n) is the nth root of a.',
      variables: [
        { symbol: 'Base', meaning: 'The number being multiplied' },
        { symbol: 'Exponent', meaning: 'How many times, or which root' },
        { symbol: 'a⁰', meaning: 'Always 1, for any non-zero a' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Exponent Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the base', description: 'Positive, negative or decimal.' },
        { stepNumber: 2, title: 'Enter the exponent', description: 'Whole, negative or fractional.' },
        { stepNumber: 3, title: 'Mind the brackets on negatives', description: '(−2)⁴ and −2⁴ give different answers.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Evaluating 8^(2/3) and (−2)⁴ against −2⁴.',
      inputs: [
        { label: 'Fractional', value: '8^(2/3)' },
        { label: 'Negative base', value: '(−2)⁴ and −2⁴' }
      ],
      steps: [
        '8^(1/3) = cube root of 8 = 2.',
        '2² = 4, so 8^(2/3) = 4.',
        '(−2)⁴ = (−2)(−2)(−2)(−2) = 16.',
        '−2⁴ = −(2⁴) = −16, because the exponent binds tighter than the minus sign.'
      ],
      result: '8^(2/3) = 4 · (−2)⁴ = 16 · −2⁴ = −16',
      takeaway: 'Fractional exponents are roots: the denominator gives the root, the numerator the power. And a minus sign outside the bracket is not part of the base.'
    },
    faqs: [
      { question: 'What does a negative exponent mean?', answer: 'A reciprocal. 2⁻³ = 1 ÷ 2³ = 1/8. It does not make the result negative.' },
      { question: 'What does a fractional exponent mean?', answer: 'A root. The denominator gives the root and the numerator the power, so 27^(2/3) is the cube root of 27 squared = 3² = 9.' },
      { question: 'Why is anything to the power of zero equal to 1?', answer: 'It follows from the division rule. aⁿ ÷ aⁿ = a⁰, and any non-zero number divided by itself is 1. 0⁰ is left undefined.' }
    ]
  },

  'log-calculator': {
    calculatorId: 'log-calculator',
    title: 'Logarithm Calculator',
    subtitle: 'Calculate logarithms to any base, including ln and log₁₀, with the change-of-base formula shown.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'A logarithm answers the question: what power do I raise this base to, in order to get this number? It is the inverse of exponentiation.',
      'Logs turn multiplication into addition, which is why they underpin decibels, pH, the Richter scale and a great deal of financial and scientific maths.'
    ],
    formulaCard: {
      title: 'Definition and Change of Base',
      formula: 'log_b(x) = y  ⟺  bʸ = x',
      explanation: 'Change of base: log_b(x) = ln(x) ÷ ln(b). This lets any calculator compute a logarithm to any base using only ln or log₁₀.',
      variables: [
        { symbol: 'log', meaning: 'Base 10 unless stated otherwise' },
        { symbol: 'ln', meaning: 'Natural log, base e ≈ 2.71828' },
        { symbol: 'log₂', meaning: 'Base 2, common in computing' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Log Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the number', description: 'Must be positive — logarithms of zero or negative numbers are undefined in real maths.' },
        { stepNumber: 2, title: 'Choose or enter the base', description: 'Common options are 10, e and 2.' },
        { stepNumber: 3, title: 'Check the change-of-base working', description: 'Shown for any non-standard base.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Finding log₂(1000) using change of base.',
      inputs: [
        { label: 'Number', value: '1000' },
        { label: 'Base', value: '2' }
      ],
      steps: [
        'log₂(1000) = ln(1000) ÷ ln(2).',
        'ln(1000) = 6.9078, ln(2) = 0.6931.',
        '6.9078 ÷ 0.6931 = 9.966.',
        'Check: 2⁹·⁹⁶⁶ ≈ 1000. ✓'
      ],
      result: 'log₂(1000) ≈ 9.966',
      takeaway: 'This says roughly ten doublings reach 1000 — which is why 2¹⁰ = 1024 is so close to a thousand, and why kilobytes were originally 1024 bytes.'
    },
    sections: [
      {
        id: 'log-rules',
        title: 'The rules that make logs useful',
        paragraphs: ['These identities are why logarithms simplify hard problems:'],
        bullets: [
          'log(xy) = log(x) + log(y) — multiplication becomes addition.',
          'log(x/y) = log(x) − log(y) — division becomes subtraction.',
          'log(xⁿ) = n × log(x) — powers become multiplication.',
          'log_b(b) = 1 and log_b(1) = 0 for any valid base.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the difference between log and ln?', answer: 'log normally means base 10; ln is the natural logarithm with base e (about 2.718). Which one a formula intends matters, since substituting one changes the answer.' },
      { question: 'Why can I not take the log of a negative number?', answer: 'Because no real power of a positive base produces a negative result. Logarithms of negative numbers exist only in complex analysis.' },
      { question: 'What is the change-of-base formula for?', answer: 'It lets you compute a log in any base using only the ln or log₁₀ buttons a calculator provides: log_b(x) = ln(x) ÷ ln(b).' }
    ]
  },

  'gcf-calculator': {
    calculatorId: 'gcf-calculator',
    title: 'GCF Calculator',
    subtitle: 'Find the greatest common factor of any set of numbers, with prime factorisation and the Euclidean method shown.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'The greatest common factor is the largest number that divides every value in a set exactly. It is what you use to simplify fractions and reduce ratios to their lowest terms.'
    ],
    formulaCard: {
      title: 'Euclidean Algorithm',
      formula: 'GCF(a, b) = GCF(b, a mod b), until b = 0',
      explanation: 'Repeatedly replace the larger number with the remainder of dividing it by the smaller. When the remainder reaches zero, the last non-zero value is the GCF.',
      variables: [
        { symbol: 'a mod b', meaning: 'Remainder when a is divided by b' },
        { symbol: 'Coprime', meaning: 'Numbers whose GCF is 1' },
        { symbol: 'GCF × LCM', meaning: 'Equals a × b for any two numbers' }
      ]
    },
    howToSteps: {
      title: 'How to Use the GCF Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter two or more numbers', description: 'Separated by commas.' },
        { stepNumber: 2, title: 'Review both methods', description: 'Prime factorisation shows why; the Euclidean algorithm shows the fastest route.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Finding the GCF of 48 and 180.',
      inputs: [{ label: 'Numbers', value: '48 and 180' }],
      steps: [
        'Euclidean: 180 mod 48 = 36.',
        '48 mod 36 = 12.',
        '36 mod 12 = 0 → GCF = 12.',
        'Check by factorisation: 48 = 2⁴ × 3, 180 = 2² × 3² × 5. Shared = 2² × 3 = 12.'
      ],
      result: 'GCF(48, 180) = 12',
      takeaway: 'The Euclidean algorithm took three steps without needing to factorise anything, which is why it is used in practice for large numbers.'
    },
    faqs: [
      { question: 'What is the GCF used for?', answer: 'Mainly simplifying fractions and ratios. Dividing 48/180 by their GCF of 12 gives 4/15, the fraction in lowest terms.' },
      { question: 'What if two numbers have no common factor?', answer: 'Their GCF is 1 and they are called coprime. The fraction formed from them is already in lowest terms.' },
      { question: 'How is GCF related to LCM?', answer: 'For any two numbers, GCF × LCM = the product of the numbers. So knowing one gives you the other immediately.' }
    ]
  },

  'lcm-calculator': {
    calculatorId: 'lcm-calculator',
    title: 'LCM Calculator',
    subtitle: 'Find the least common multiple of two or more numbers, with the working shown step by step.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'The least common multiple is the smallest number that every value in a set divides into exactly. It is what you need to add fractions with different denominators, and to work out when repeating cycles coincide.'
    ],
    formulaCard: {
      title: 'LCM from GCF',
      formula: 'LCM(a, b) = (a × b) ÷ GCF(a, b)',
      explanation: 'For more than two numbers, apply it cumulatively: LCM(a, b, c) = LCM(LCM(a, b), c).',
      variables: [
        { symbol: 'Multiple', meaning: 'A number divisible by the original' },
        { symbol: 'LCD', meaning: 'Lowest common denominator — the LCM of denominators' }
      ]
    },
    howToSteps: {
      title: 'How to Use the LCM Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter your numbers', description: 'Two or more, comma separated.' },
        { stepNumber: 2, title: 'Review the working', description: 'Both the GCF route and prime factorisation are shown.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Finding the LCM of 12 and 18.',
      inputs: [{ label: 'Numbers', value: '12 and 18' }],
      steps: [
        'GCF(12, 18) = 6.',
        'LCM = (12 × 18) ÷ 6 = 216 ÷ 6 = 36.',
        'By factorisation: 12 = 2² × 3, 18 = 2 × 3². Take the highest power of each: 2² × 3² = 36.'
      ],
      result: 'LCM(12, 18) = 36',
      takeaway: 'For prime factorisation, take the highest power of every prime that appears in any number. For GCF, take the lowest power of the primes common to all.'
    },
    faqs: [
      { question: 'What is the LCM used for?', answer: 'Most commonly to find a common denominator when adding or subtracting fractions. It also solves cycle problems — when two repeating events next coincide.' },
      { question: 'How do I find the LCM of three numbers?', answer: 'Apply it cumulatively. Find the LCM of the first two, then the LCM of that result with the third.' },
      { question: 'Is the LCM always bigger than the numbers?', answer: 'It is at least as large as the biggest one. If one number divides the other exactly, the LCM is simply the larger — LCM(4, 12) = 12.' }
    ]
  },

  'prime-factorization-calculator': {
    calculatorId: 'prime-factorization-calculator',
    title: 'Prime Factorization Calculator',
    subtitle: 'Break any number into its prime factors, with a factor tree and the result in exponent form.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Every whole number above 1 is either prime or can be written as a unique product of primes. That uniqueness is the fundamental theorem of arithmetic, and it underpins GCF, LCM and a great deal of number theory.'
    ],
    formulaCard: {
      title: 'Trial Division',
      formula: 'Divide by 2, 3, 5, 7, 11 … until the quotient is 1',
      explanation: 'You only need to test primes up to the square root of the number. If nothing divides it by then, what remains is itself prime.',
      variables: [
        { symbol: 'Prime', meaning: 'Divisible only by 1 and itself' },
        { symbol: 'Composite', meaning: 'Has factors other than 1 and itself' },
        { symbol: 'Exponent form', meaning: '360 = 2³ × 3² × 5' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter a whole number', description: 'Greater than 1.' },
        { stepNumber: 2, title: 'Review the factor tree', description: 'Shows each division step visually.' },
        { stepNumber: 3, title: 'Use the exponent form', description: 'The compact way to write the result and the easiest for GCF and LCM work.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Factorising 360.',
      inputs: [{ label: 'Number', value: '360' }],
      steps: [
        '360 ÷ 2 = 180 · 180 ÷ 2 = 90 · 90 ÷ 2 = 45.',
        '45 ÷ 3 = 15 · 15 ÷ 3 = 5.',
        '5 ÷ 5 = 1.',
        'Factors: 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5.'
      ],
      result: '360 = 2³ × 3² × 5',
      takeaway: 'Always divide out all copies of the smallest prime before moving to the next. It keeps the numbers small and avoids missing repeated factors.'
    },
    faqs: [
      { question: 'What is prime factorisation used for?', answer: 'Finding GCF and LCM, simplifying fractions and radicals, and in cryptography — where the difficulty of factorising very large numbers is what makes RSA encryption secure.' },
      { question: 'Is 1 a prime number?', answer: 'No. Primes have exactly two distinct factors, and 1 has only one. Excluding it is what makes prime factorisation unique.' },
      { question: 'How do I know when to stop testing divisors?', answer: 'Once you pass the square root of the remaining number. If nothing has divided it by then, the remainder is prime.' }
    ]
  }
};
