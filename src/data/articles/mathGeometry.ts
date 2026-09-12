import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator360 Editorial Team',
  role: 'Education & Mathematics Desk',
  lastUpdated: 'September 2026'
};

/** Geometry, trigonometry and algebra articles. */
export const MATH_GEOMETRY_ARTICLES: Record<string, CalculatorArticle> = {
  'triangle-calculator': {
    calculatorId: 'triangle-calculator',
    title: 'Triangle Calculator',
    subtitle: 'Solve any triangle from three known values using the sine and cosine rules, with area and all remaining sides and angles.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Any triangle can be solved from three known values, provided at least one is a side. Three angles alone define the shape but not the size, so they are not enough.',
      'Which rule applies depends on which three values you have — this calculator selects the right one and shows the working.'
    ],
    formulaCard: {
      title: 'Sine and Cosine Rules',
      formula: 'a ÷ sin A = b ÷ sin B = c ÷ sin C',
      explanation: 'The cosine rule handles cases the sine rule cannot: a² = b² + c² − 2bc·cos A. Use the sine rule when you have an angle opposite a known side, and the cosine rule for three sides or two sides with the angle between them.',
      variables: [
        { symbol: 'a, b, c', meaning: 'Side lengths' },
        { symbol: 'A, B, C', meaning: 'Angles opposite the matching sides' },
        { symbol: 'Area', meaning: '½ab·sin C, or Heron\'s formula from three sides' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Triangle Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter any three values', description: 'At least one must be a side length.' },
        { stepNumber: 2, title: 'Label consistently', description: 'Angle A sits opposite side a. Mislabelling is the most common source of wrong answers.' },
        { stepNumber: 3, title: 'Check which rule was applied', description: 'Shown alongside the result.' },
        { stepNumber: 4, title: 'Watch for the ambiguous case', description: 'Two sides and a non-included angle can produce two valid triangles.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A triangle with sides a = 8, b = 11 and the included angle C = 37°.',
      inputs: [
        { label: 'Side a', value: '8' },
        { label: 'Side b', value: '11' },
        { label: 'Angle C', value: '37°' }
      ],
      steps: [
        'Cosine rule: c² = 8² + 11² − 2(8)(11)·cos 37°.',
        'c² = 64 + 121 − 176 × 0.7986 = 185 − 140.6 = 44.4.',
        'c = √44.4 = 6.66.',
        'Area = ½ × 8 × 11 × sin 37° = 44 × 0.6018 = 26.5.'
      ],
      result: 'c ≈ 6.66 · Area ≈ 26.5 square units',
      takeaway: 'With two sides and the angle between them, the cosine rule gives the third side directly. The sine rule cannot start here because no angle is paired with a known opposite side.'
    },
    sections: [
      {
        id: 'ambiguous-case',
        title: 'The ambiguous case',
        paragraphs: [
          'When you know two sides and an angle that is not between them, there can be two different triangles that fit. This happens because the sine of an angle and the sine of its supplement are equal.',
          'The calculator flags this and shows both solutions where they exist. In a real problem, context usually rules one out — a triangle in a physical layout cannot normally have two different shapes.'
        ],
        callout: { type: 'info', title: 'Angles always sum to 180°', text: 'A quick check on any solved triangle. If your three angles do not total 180, something has gone wrong.' }
      }
    ],
    faqs: [
      { question: 'Can I solve a triangle from three angles?', answer: 'No. Three angles fix the shape but not the size — infinitely many similar triangles share them. You need at least one side length.' },
      { question: 'When do I use the sine rule versus the cosine rule?', answer: 'Sine rule when you have an angle and its opposite side plus one more value. Cosine rule for three sides, or two sides with the angle between them.' },
      { question: 'What is Heron\'s formula?', answer: 'A way to find area from three sides without any angle. With s as half the perimeter, area = √[s(s−a)(s−b)(s−c)].' }
    ]
  },

  'right-triangle-calculator': {
    calculatorId: 'right-triangle-calculator',
    title: 'Right Triangle Calculator',
    subtitle: 'Solve a right triangle from any two values, with the trigonometric ratios and the working shown.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'A right triangle only needs two known values to solve completely, because the 90° angle is already given. That makes it far simpler than the general case.',
      'Everything follows from Pythagoras for the sides and the three basic trigonometric ratios for the angles.'
    ],
    formulaCard: {
      title: 'Trigonometric Ratios',
      formula: 'sin θ = opposite ÷ hypotenuse · cos θ = adjacent ÷ hypotenuse · tan θ = opposite ÷ adjacent',
      explanation: 'Remembered as SOH-CAH-TOA. The hypotenuse is always the longest side, opposite the right angle. To find an angle from a ratio, use the inverse functions.',
      variables: [
        { symbol: 'Hypotenuse', meaning: 'Longest side, opposite the right angle' },
        { symbol: 'Opposite', meaning: 'The side across from the angle you are working with' },
        { symbol: 'Adjacent', meaning: 'The side next to it that is not the hypotenuse' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Right Triangle Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter any two values', description: 'Two sides, or one side and one acute angle.' },
        { stepNumber: 2, title: 'Identify the sides relative to your angle', description: 'Opposite and adjacent swap depending on which angle you use.' },
        { stepNumber: 3, title: 'Read all remaining values', description: 'Sides, both acute angles, area and perimeter.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A right triangle with a hypotenuse of 13 and one leg of 5.',
      inputs: [
        { label: 'Hypotenuse', value: '13' },
        { label: 'Known leg', value: '5' }
      ],
      steps: [
        'Other leg: √(13² − 5²) = √(169 − 25) = √144 = 12.',
        'Angle opposite the 5 side: sin θ = 5/13 = 0.3846 → θ = 22.6°.',
        'Third angle = 90 − 22.6 = 67.4°.',
        'Area = ½ × 5 × 12 = 30.'
      ],
      result: 'Sides 5, 12, 13 · Angles 22.6°, 67.4°, 90° · Area 30',
      takeaway: '5-12-13 is a Pythagorean triple — three whole numbers satisfying a² + b² = c². Recognising the common ones (3-4-5, 5-12-13, 8-15-17) saves time.'
    },
    sections: [
      {
        id: 'applications',
        title: 'Where right triangles turn up',
        paragraphs: ['This is the most practically useful shape in geometry:'],
        bullets: [
          'Roof pitch and stair rise-over-run in construction.',
          'Ramp gradients and accessibility slopes.',
          'Diagonal bracing and checking a frame is square.',
          'Distance and bearing problems in navigation.',
          'Resolving forces into components in physics.'
        ],
        callout: { type: 'tip', title: 'Check squareness with 3-4-5', text: 'Measure 3 units along one edge and 4 along the other. If the diagonal between those marks is exactly 5, the corner is a true right angle.' }
      }
    ],
    faqs: [
      { question: 'How many values do I need to solve a right triangle?', answer: 'Two, as long as at least one is a side. Two angles alone are not enough because they do not fix the size.' },
      { question: 'What does SOH-CAH-TOA mean?', answer: 'A mnemonic for the three ratios: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent.' },
      { question: 'How do I find an angle from two sides?', answer: 'Use the inverse trigonometric function. If the opposite is 5 and the hypotenuse 13, the angle is arcsin(5/13) = 22.6°.' }
    ]
  },

  'pythagorean-theorem-calculator': {
    calculatorId: 'pythagorean-theorem-calculator',
    title: 'Pythagorean Theorem Calculator',
    subtitle: 'Find the hypotenuse or either leg using a² + b² = c², with the rearranged formula and steps shown.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'The Pythagorean theorem relates the three sides of a right triangle: the square of the hypotenuse equals the sum of the squares of the other two sides.',
      'It works only for right triangles. For any other triangle the cosine rule generalises it.'
    ],
    formulaCard: {
      title: 'The Theorem',
      formula: 'a² + b² = c²',
      explanation: 'Rearranged to find a leg: a = √(c² − b²). The hypotenuse c is always the longest side and always opposite the right angle.',
      variables: [
        { symbol: 'a, b', meaning: 'The two legs forming the right angle' },
        { symbol: 'c', meaning: 'The hypotenuse' },
        { symbol: 'Triple', meaning: 'Whole-number solution such as 3-4-5' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the two values you know', description: 'Either both legs, or one leg and the hypotenuse.' },
        { stepNumber: 2, title: 'Identify the hypotenuse correctly', description: 'It must be the longest side. If a leg exceeds it, the triangle is impossible.' },
        { stepNumber: 3, title: 'Read the missing side', description: 'With the rearranged formula shown.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A ladder reaching 9 metres up a wall with its base 4 metres out.',
      inputs: [
        { label: 'Height up wall', value: '9 m' },
        { label: 'Distance from wall', value: '4 m' }
      ],
      steps: [
        'The ladder is the hypotenuse.',
        'c² = 9² + 4² = 81 + 16 = 97.',
        'c = √97 = 9.85 m.',
        'So the ladder must be at least 9.85 m long.'
      ],
      result: 'Ladder length ≈ 9.85 m',
      takeaway: 'A practical check where the diagonal is what you need to buy. Note it is only slightly longer than the vertical reach — the horizontal offset contributes less than intuition suggests.'
    },
    sections: [
      {
        id: 'converse',
        title: 'Using it in reverse',
        paragraphs: [
          'The converse also holds: if a² + b² = c² for three lengths, the triangle they form must contain a right angle. This is what makes the 3-4-5 method work for checking a corner is square.',
          'If a² + b² is greater than c² the triangle is acute; if smaller, it is obtuse. That gives a quick classification from side lengths alone.'
        ]
      }
    ],
    faqs: [
      { question: 'Does the Pythagorean theorem work for all triangles?', answer: 'No, only right triangles. For others, the cosine rule generalises it by adding a correction term based on the included angle.' },
      { question: 'What are Pythagorean triples?', answer: 'Sets of three whole numbers satisfying the theorem — 3-4-5, 5-12-13, 8-15-17, 7-24-25. Any multiple of a triple is also a triple, so 6-8-10 works too.' },
      { question: 'How do I find a leg rather than the hypotenuse?', answer: 'Rearrange to a = √(c² − b²). Subtract rather than add, and make sure you subtract the leg from the hypotenuse, not the other way round.' }
    ]
  },

  'volume-calculator': {
    calculatorId: 'volume-calculator',
    title: 'Volume Calculator',
    subtitle: 'Calculate volume for ten 3D shapes, with each formula shown and results in the unit you choose.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Volume measures the space a solid occupies, always in cubic units. The formula depends on the shape, but most reduce to either base area times height, or a fraction of that for shapes that taper.'
    ],
    formulaCard: {
      title: 'Common Volume Formulas',
      formula: 'Cylinder: πr²h · Sphere: (4/3)πr³ · Cone: (1/3)πr²h',
      explanation: 'Prisms and cylinders are base area × height. Cones and pyramids are exactly one third of the prism or cylinder that would contain them.',
      variables: [
        { symbol: 'r', meaning: 'Radius — half the diameter' },
        { symbol: 'h', meaning: 'Perpendicular height, not slant length' },
        { symbol: 'Cubic units', meaning: 'Volume always scales with the cube of linear size' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Volume Calculator',
      steps: [
        { stepNumber: 1, title: 'Choose the shape', description: 'Cube, cylinder, sphere, cone, pyramid, prism and others.' },
        { stepNumber: 2, title: 'Enter the dimensions', description: 'Use radius rather than diameter where asked — halving errors are the most common mistake.' },
        { stepNumber: 3, title: 'Select your units', description: 'All inputs must share the same unit.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A cylindrical water tank 1.2 m in diameter and 1.8 m tall.',
      inputs: [
        { label: 'Diameter', value: '1.2 m' },
        { label: 'Height', value: '1.8 m' }
      ],
      steps: [
        'Radius = 1.2 ÷ 2 = 0.6 m.',
        'V = π × 0.6² × 1.8 = π × 0.36 × 1.8.',
        'V = 2.036 m³.',
        'In litres: 2.036 × 1000 = 2,036 litres.'
      ],
      result: 'Volume ≈ 2.04 m³ (2,036 litres)',
      takeaway: 'One cubic metre is exactly 1,000 litres, which makes metric volume conversions straightforward. Using diameter instead of radius here would have given four times the answer.'
    },
    sections: [
      {
        id: 'scaling',
        title: 'Why doubling the size makes it eight times bigger',
        paragraphs: [
          'Volume scales with the cube of linear dimensions. Doubling every dimension of a shape multiplies its volume by 2³ = 8, while its surface area only multiplies by 4.',
          'This has real consequences: a pizza of twice the diameter gives four times the food, and large animals need proportionally different structures from small ones because mass grows faster than the cross-section of bone supporting it.'
        ],
        callout: { type: 'warning', title: 'Radius, not diameter', text: 'Every circular formula uses radius. Entering diameter instead gives four times the answer for area and eight times for a sphere.' }
      }
    ],
    faqs: [
      { question: 'How do I convert between volume units?', answer: 'One cubic metre is 1,000 litres. One cubic foot is about 28.3 litres. Remember that cubic conversions use the cube of the linear factor — one metre is 3.28 feet, but one cubic metre is 3.28³ = 35.3 cubic feet.' },
      { question: 'Why is a cone one third of a cylinder?', answer: 'It follows from integration, though it can be demonstrated physically: filling a cone and emptying it into a cylinder of the same base and height takes exactly three fills.' },
      { question: 'What is the difference between volume and capacity?', answer: 'Volume is the space a solid occupies; capacity is how much a container holds. For a container with thin walls they are nearly identical, but a thick-walled vessel has less capacity than its external volume.' }
    ]
  },

  'surface-area-calculator': {
    calculatorId: 'surface-area-calculator',
    title: 'Surface Area Calculator',
    subtitle: 'Calculate total and lateral surface area for spheres, cylinders, cones, prisms and pyramids.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Surface area is the total area of all faces of a solid — what you would need to cover, paint or wrap it. It is measured in square units, not cubic.',
      'Many practical problems need lateral area rather than total: painting the walls of a cylindrical tank does not include the top and bottom.'
    ],
    formulaCard: {
      title: 'Common Surface Area Formulas',
      formula: 'Sphere: 4πr² · Cylinder: 2πr² + 2πrh · Cone: πr² + πrl',
      explanation: 'For a cylinder, 2πr² is the two circular ends and 2πrh is the curved side. For a cone, l is the slant height, not the vertical height.',
      variables: [
        { symbol: 'Lateral area', meaning: 'Curved or side surfaces only, excluding ends' },
        { symbol: 'Total area', meaning: 'Lateral plus all end faces' },
        { symbol: 'l', meaning: 'Slant height of a cone: √(r² + h²)' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Surface Area Calculator',
      steps: [
        { stepNumber: 1, title: 'Select the shape', description: 'Each has its own formula.' },
        { stepNumber: 2, title: 'Enter the dimensions', description: 'Cones need slant height; the calculator derives it from radius and height if needed.' },
        { stepNumber: 3, title: 'Choose total or lateral', description: 'Lateral excludes the end faces, which is usually what coating problems need.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Painting the curved side and top of a cylindrical silo, radius 3 m and height 8 m.',
      inputs: [
        { label: 'Radius', value: '3 m' },
        { label: 'Height', value: '8 m' }
      ],
      steps: [
        'Lateral area = 2πrh = 2 × π × 3 × 8 = 150.8 m².',
        'Top circle = πr² = π × 9 = 28.3 m².',
        'Total to paint = 150.8 + 28.3 = 179.1 m².',
        'At 10 m² per litre, that needs about 18 litres per coat.'
      ],
      result: 'Area to paint ≈ 179.1 m² · about 18 litres per coat',
      takeaway: 'Including the base would have added another 28.3 m² and roughly three litres of paint that would never be used.'
    },
    sections: [
      {
        id: 'ratio',
        title: 'Surface area to volume ratio',
        paragraphs: [
          'As objects get larger, volume grows faster than surface area. A sphere of twice the radius has four times the surface area but eight times the volume.',
          'This explains a great deal: why small animals lose heat faster and must eat more relative to their size, why crushed ice melts faster than a block, and why cells stay microscopic — beyond a certain size the membrane cannot supply the interior.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the difference between total and lateral surface area?', answer: 'Lateral covers only the sides or curved surface. Total adds the end faces. Painting a pipe exterior needs lateral; wrapping a closed tin needs total.' },
      { question: 'What is slant height?', answer: 'The distance from the apex of a cone down its sloping side to the base edge, found as √(r² + h²). Using vertical height instead understates the cone\'s surface area.' },
      { question: 'Why does a sphere have the smallest surface area for its volume?', answer: 'It is a geometric property — no shape encloses a given volume with less surface. It is why bubbles and droplets form spheres, since surface tension minimises area.' }
    ]
  },

  'quadratic-formula-calculator': {
    calculatorId: 'quadratic-formula-calculator',
    title: 'Quadratic Formula Calculator',
    subtitle: 'Solve any quadratic equation, including complex roots, with the discriminant explained and every step shown.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'A quadratic equation has the form ax² + bx + c = 0. The quadratic formula solves all of them, including those that do not factorise neatly.',
      'The discriminant — the part under the square root — tells you what kind of solutions to expect before you finish the calculation.'
    ],
    formulaCard: {
      title: 'The Quadratic Formula',
      formula: 'x = [−b ± √(b² − 4ac)] ÷ 2a',
      explanation: 'The discriminant b² − 4ac determines the nature of the roots: positive gives two real roots, zero gives one repeated root, negative gives two complex roots.',
      variables: [
        { symbol: 'a', meaning: 'Coefficient of x², cannot be zero' },
        { symbol: 'b', meaning: 'Coefficient of x' },
        { symbol: 'c', meaning: 'Constant term' },
        { symbol: 'Δ', meaning: 'Discriminant, b² − 4ac' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Quadratic Calculator',
      steps: [
        { stepNumber: 1, title: 'Rearrange to standard form', description: 'Everything on one side, equal to zero, before reading off a, b and c.' },
        { stepNumber: 2, title: 'Enter the coefficients', description: 'Include signs. A missing x term means b = 0.' },
        { stepNumber: 3, title: 'Check the discriminant', description: 'It tells you immediately whether real solutions exist.' },
        { stepNumber: 4, title: 'Review the steps', description: 'Each substitution is shown for checking your own working.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Solving 2x² − 7x + 3 = 0.',
      inputs: [
        { label: 'a', value: '2' },
        { label: 'b', value: '−7' },
        { label: 'c', value: '3' }
      ],
      steps: [
        'Discriminant = (−7)² − 4(2)(3) = 49 − 24 = 25.',
        'Positive, so two distinct real roots.',
        '√25 = 5.',
        'x = (7 ± 5) ÷ 4 → x = 12/4 = 3, or x = 2/4 = 0.5.'
      ],
      result: 'x = 3 and x = 0.5',
      takeaway: 'A perfect-square discriminant means the equation factorises cleanly: 2x² − 7x + 3 = (2x − 1)(x − 3). Checking the discriminant first tells you whether factorising is worth attempting.'
    },
    sections: [
      {
        id: 'discriminant',
        title: 'Reading the discriminant',
        paragraphs: ['It tells you the answer\'s shape before you compute it:'],
        bullets: [
          'Δ > 0 — two distinct real roots; the parabola crosses the x-axis twice.',
          'Δ = 0 — one repeated root; the parabola touches the axis at its vertex.',
          'Δ < 0 — two complex conjugate roots; the parabola never meets the axis.',
          'Δ a perfect square — the roots are rational and the expression factorises over the integers.'
        ],
        callout: { type: 'info', title: 'The vertex comes free', text: 'The turning point sits at x = −b ÷ 2a, exactly halfway between the roots. Substituting back gives the maximum or minimum value.' }
      }
    ],
    faqs: [
      { question: 'What does a negative discriminant mean?', answer: 'There are no real solutions — the parabola never crosses the x-axis. The roots are complex conjugates involving i, the square root of −1.' },
      { question: 'When should I factorise instead of using the formula?', answer: 'When the discriminant is a small perfect square, factorising is usually quicker. The formula always works, so it is the safe choice when factors are not obvious.' },
      { question: 'What if a equals zero?', answer: 'Then it is not quadratic but linear, bx + c = 0, solved simply as x = −c/b. The quadratic formula would divide by zero.' }
    ]
  },

  'slope-calculator': {
    calculatorId: 'slope-calculator',
    title: 'Slope Calculator',
    subtitle: 'Find the slope between two points, plus the line equation, distance, midpoint and angle of incline.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Slope measures steepness — how much a line rises for each unit it runs horizontally. It is the foundation of linear equations and turns up everywhere from road gradients to rates of change.'
    ],
    formulaCard: {
      title: 'Slope and Line Equation',
      formula: 'm = (y₂ − y₁) ÷ (x₂ − x₁)',
      explanation: 'Once you have m, the line equation follows as y = mx + b, where b is found by substituting either point. A vertical line has undefined slope because the denominator is zero.',
      variables: [
        { symbol: 'm', meaning: 'Slope — rise over run' },
        { symbol: 'b', meaning: 'y-intercept, where the line crosses the y-axis' },
        { symbol: 'Angle', meaning: 'arctan(m) gives the incline in degrees' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Slope Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter two points', description: 'As (x₁, y₁) and (x₂, y₂).' },
        { stepNumber: 2, title: 'Read the slope and equation', description: 'Both slope-intercept and standard forms are given.' },
        { stepNumber: 3, title: 'Check the extras', description: 'Distance, midpoint and angle of incline come from the same two points.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'The line through (2, 3) and (8, 15).',
      inputs: [
        { label: 'Point 1', value: '(2, 3)' },
        { label: 'Point 2', value: '(8, 15)' }
      ],
      steps: [
        'm = (15 − 3) ÷ (8 − 2) = 12 ÷ 6 = 2.',
        'Substituting (2, 3): 3 = 2(2) + b → b = −1.',
        'Equation: y = 2x − 1.',
        'Angle = arctan(2) = 63.4°. Distance = √(6² + 12²) = 13.42.'
      ],
      result: 'Slope 2 · y = 2x − 1 · Angle 63.4°',
      takeaway: 'A slope of 2 means two units up for every one across — steep. Slope and angle are not proportional: a slope of 1 is 45°, but a slope of 2 is only 63°, not 90°.'
    },
    sections: [
      {
        id: 'interpreting',
        title: 'Reading slope in practice',
        paragraphs: ['The sign and size both carry meaning:'],
        bullets: [
          'Positive — the line rises left to right.',
          'Negative — it falls.',
          'Zero — horizontal line, y = constant.',
          'Undefined — vertical line, where run is zero and division fails.',
          'Perpendicular lines have slopes whose product is −1; parallel lines have equal slopes.'
        ]
      }
    ],
    faqs: [
      { question: 'What does a slope of zero mean?', answer: 'The line is horizontal — no vertical change as you move along it. This is different from undefined slope, which means a vertical line.' },
      { question: 'How do I convert slope to a percentage gradient?', answer: 'Multiply by 100. A slope of 0.08 is an 8% gradient, which is how road signs express steepness.' },
      { question: 'How do I find the slope of a perpendicular line?', answer: 'Take the negative reciprocal. If the original slope is 2, the perpendicular slope is −1/2, because their product must be −1.' }
    ]
  }
};
