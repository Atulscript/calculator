import { CalculatorArticle } from '../../types/article';

const AUTHOR = {
  name: 'Calculator11 Editorial Team',
  role: 'Science & Engineering Desk',
  lastUpdated: 'September 2026'
};

/** Physics, electrical and developer-utility articles. */
export const SCIENCE_ARTICLES: Record<string, CalculatorArticle> = {
  'speed-distance-time-calculator': {
    calculatorId: 'speed-distance-time-calculator',
    title: 'Speed, Distance & Time Calculator',
    subtitle: 'Solve for speed, distance or time from the other two, in any combination of metric and imperial units.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Three quantities, one relationship, and knowing any two gives the third. It underpins journey planning, physics problems and pace calculations alike.',
      'The only real pitfall is unit consistency — mixing km with hours and metres with seconds is where most wrong answers come from.'
    ],
    formulaCard: {
      title: 'The Speed Triangle',
      formula: 'Speed = Distance ÷ Time',
      explanation: 'Rearranged: Distance = Speed × Time, and Time = Distance ÷ Speed. Units must be consistent throughout — km/h with hours, m/s with seconds.',
      variables: [
        { symbol: 'Speed', meaning: 'Distance covered per unit time' },
        { symbol: 'Average speed', meaning: 'Total distance ÷ total time, including stops' },
        { symbol: 'm/s to km/h', meaning: 'Multiply by 3.6' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Speed Distance Time Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the two values you know', description: 'Leave the third blank.' },
        { stepNumber: 2, title: 'Check your units match', description: 'The calculator converts, but consistency matters if you are checking by hand.' },
        { stepNumber: 3, title: 'Decide average or instantaneous', description: 'Average speed includes stops; instantaneous is the speed at a moment.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 340 km journey with an average speed of 85 km/h, plus a 40-minute break.',
      inputs: [
        { label: 'Distance', value: '340 km' },
        { label: 'Average driving speed', value: '85 km/h' },
        { label: 'Break', value: '40 minutes' }
      ],
      steps: [
        'Driving time = 340 ÷ 85 = 4 hours.',
        'Total elapsed time = 4 h + 40 min = 4 h 40 min.',
        'Overall average including the break = 340 ÷ 4.667 = 72.9 km/h.'
      ],
      result: 'Driving 4 hours · Total 4h 40m · Overall average 72.9 km/h',
      takeaway: 'A single 40-minute stop cut the effective average by 12 km/h. Journey planning that ignores stops consistently underestimates arrival times.'
    },
    faqs: [
      { question: 'How do I convert m/s to km/h?', answer: 'Multiply by 3.6. So 15 m/s is 54 km/h. Going the other way, divide by 3.6.' },
      { question: 'What is the difference between speed and velocity?', answer: 'Speed is a scalar — magnitude only. Velocity is a vector with both magnitude and direction. Driving in a circle back to your start gives a non-zero average speed but zero average velocity.' },
      { question: 'Why does my journey take longer than the calculation?', answer: 'Because average speed rarely holds. Traffic, junctions, speed limit changes and stops all reduce it. Planning at a lower effective average than your cruising speed is more realistic.' }
    ]
  },

  'density-mass-volume-calculator': {
    calculatorId: 'density-mass-volume-calculator',
    title: 'Density Calculator',
    subtitle: 'Solve the density triangle for any missing value, with a reference table of common material densities.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Density is mass per unit volume — how much matter is packed into a given space. It determines whether something floats, and it lets you convert between mass and volume for any material.',
      'It is the reason a kilogram of feathers and a kilogram of lead occupy such different spaces.'
    ],
    formulaCard: {
      title: 'Density Relationship',
      formula: 'ρ = m ÷ V',
      explanation: 'Rearranged: m = ρ × V, and V = m ÷ ρ. Water is the convenient reference at 1,000 kg/m³, or 1 g/cm³.',
      variables: [
        { symbol: 'ρ', meaning: 'Density, commonly kg/m³ or g/cm³' },
        { symbol: 'm', meaning: 'Mass' },
        { symbol: 'V', meaning: 'Volume' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Density Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the two known values', description: 'Any two of density, mass and volume.' },
        { stepNumber: 2, title: 'Pick consistent units', description: 'g/cm³ and kg/m³ differ by a factor of 1,000.' },
        { stepNumber: 3, title: 'Use the reference table', description: 'For common materials when density is unknown.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Finding the mass of a 0.35 m³ block of oak, density 750 kg/m³.',
      inputs: [
        { label: 'Volume', value: '0.35 m³' },
        { label: 'Density of oak', value: '750 kg/m³' }
      ],
      steps: [
        'm = ρ × V = 750 × 0.35 = 262.5 kg.',
        'Water at the same volume would be 1,000 × 0.35 = 350 kg.',
        'Oak is less dense than water, so it floats.'
      ],
      result: 'Mass = 262.5 kg · floats in water',
      takeaway: 'Anything with a density below 1,000 kg/m³ floats in water. That single comparison answers most buoyancy questions without further calculation.'
    },
    sections: [
      {
        id: 'common-densities',
        title: 'Reference densities',
        paragraphs: ['Useful anchors in kg/m³:'],
        bullets: [
          'Air ≈ 1.2 · Water = 1,000 · Ice ≈ 917 (which is why it floats).',
          'Oak ≈ 750 · Pine ≈ 500 · Concrete ≈ 2,400.',
          'Aluminium ≈ 2,700 · Steel ≈ 7,850 · Lead ≈ 11,340 · Gold ≈ 19,300.'
        ],
        callout: { type: 'info', title: 'Density changes with temperature', text: 'Most materials expand when heated and become less dense. Water is unusual — it is densest at 4°C, which is why ice floats and lakes freeze from the top.' }
      }
    ],
    faqs: [
      { question: 'How do I know if something will float?', answer: 'Compare its density to the fluid. Anything less dense than water (1,000 kg/m³) floats in water. Shape matters too — a steel ship floats because its average density including internal air is below that of water.' },
      { question: 'What is the difference between density and specific gravity?', answer: 'Specific gravity is density relative to water, so it is a dimensionless ratio. A specific gravity of 2.7 means 2,700 kg/m³.' },
      { question: 'How do I convert g/cm³ to kg/m³?', answer: 'Multiply by 1,000. Water is 1 g/cm³ and 1,000 kg/m³ — the same density in different units.' }
    ]
  },

  'force-calculator': {
    calculatorId: 'force-calculator',
    title: 'Force Calculator',
    subtitle: 'Calculate force, mass or acceleration from the other two, using Newton\'s second law.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Newton\'s second law states that force equals mass times acceleration. It is the foundation of classical mechanics and explains why heavier objects need more force to accelerate at the same rate.',
      'Weight is a particular case: the force gravity exerts on a mass.'
    ],
    formulaCard: {
      title: "Newton's Second Law",
      formula: 'F = m × a',
      explanation: 'Rearranged: m = F ÷ a, and a = F ÷ m. One newton is the force that accelerates 1 kg at 1 m/s². Weight is mass × 9.81 m/s² at Earth\'s surface.',
      variables: [
        { symbol: 'F', meaning: 'Force in newtons' },
        { symbol: 'm', meaning: 'Mass in kilograms' },
        { symbol: 'a', meaning: 'Acceleration in m/s²' },
        { symbol: 'g', meaning: '9.81 m/s² — Earth\'s gravitational acceleration' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Force Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter two known values', description: 'Force and mass, force and acceleration, or mass and acceleration.' },
        { stepNumber: 2, title: 'Use SI units', description: 'Newtons, kilograms and m/s². Mixing in pounds or grams is the usual error.' },
        { stepNumber: 3, title: 'For weight, use g as acceleration', description: '9.81 m/s² at Earth\'s surface.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 1,400 kg car accelerating from rest to 27 m/s in 9 seconds.',
      inputs: [
        { label: 'Mass', value: '1,400 kg' },
        { label: 'Velocity change', value: '0 to 27 m/s' },
        { label: 'Time', value: '9 s' }
      ],
      steps: [
        'a = Δv ÷ t = 27 ÷ 9 = 3 m/s².',
        'F = m × a = 1,400 × 3 = 4,200 N.',
        'The car\'s weight for comparison = 1,400 × 9.81 = 13,734 N.'
      ],
      result: 'Force required = 4,200 N',
      takeaway: 'The accelerating force is under a third of the car\'s weight. This is the net force — actual engine output must also overcome drag and rolling resistance.'
    },
    faqs: [
      { question: 'What is the difference between mass and weight?', answer: 'Mass is the amount of matter, measured in kilograms, and does not change with location. Weight is the force gravity exerts on that mass, measured in newtons, and changes with gravitational field strength.' },
      { question: 'What is a newton?', answer: 'The force needed to accelerate one kilogram at one metre per second squared. On Earth, a 1 kg mass weighs about 9.81 N.' },
      { question: 'Does this work for objects at constant speed?', answer: 'Constant velocity means zero acceleration, so the net force is zero. Applied forces still exist — they simply balance, as when a car cruises with engine thrust exactly cancelling drag.' }
    ]
  },

  'ohms-law-calculator': {
    calculatorId: 'ohms-law-calculator',
    title: "Ohm's Law Calculator",
    subtitle: 'Solve for voltage, current, resistance or power from any two known values, with the full power wheel explained.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Electrical work carries risk of injury and fire. Mains wiring should be carried out by a qualified electrician in accordance with local regulations.',
    overview: [
      "Ohm's law relates voltage, current and resistance in an electrical circuit. Combined with the power equation, any two of the four quantities give the other two.",
      'It is the single most useful relationship in practical electronics, from sizing a resistor to checking whether a circuit will overheat.'
    ],
    formulaCard: {
      title: "Ohm's Law and Power",
      formula: 'V = I × R · P = V × I',
      explanation: 'Combining them gives P = I²R and P = V²/R. That is the power wheel — twelve rearrangements covering every pair of known values.',
      variables: [
        { symbol: 'V', meaning: 'Voltage in volts — the electrical pressure' },
        { symbol: 'I', meaning: 'Current in amperes — the rate of flow' },
        { symbol: 'R', meaning: 'Resistance in ohms — opposition to flow' },
        { symbol: 'P', meaning: 'Power in watts — energy per second' }
      ]
    },
    howToSteps: {
      title: "How to Use the Ohm's Law Calculator",
      steps: [
        { stepNumber: 1, title: 'Enter any two values', description: 'The other two are derived automatically.' },
        { stepNumber: 2, title: 'Watch the prefixes', description: 'Milliamps, kilohms and megohms are easy to mis-enter by a factor of a thousand.' },
        { stepNumber: 3, title: 'Check the power figure', description: 'Components must be rated above the power they will dissipate.' }
      ]
    },
    workedExample: {
      title: 'Worked Example: Sizing an LED Resistor',
      scenario: 'Driving an LED that needs 2.1 V at 20 mA from a 12 V supply.',
      inputs: [
        { label: 'Supply voltage', value: '12 V' },
        { label: 'LED forward voltage', value: '2.1 V' },
        { label: 'Desired current', value: '20 mA (0.02 A)' }
      ],
      steps: [
        'Voltage across the resistor = 12 − 2.1 = 9.9 V.',
        'R = V ÷ I = 9.9 ÷ 0.02 = 495 Ω → use 470 Ω or 510 Ω.',
        'Power dissipated = V × I = 9.9 × 0.02 = 0.198 W.',
        'A 0.25 W resistor is adequate but close; 0.5 W gives more headroom.'
      ],
      result: 'Use roughly 500 Ω, rated at 0.25 W or higher',
      takeaway: 'Checking dissipated power is the step most often skipped. A correctly valued resistor with too low a power rating will overheat and fail.'
    },
    sections: [
      {
        id: 'series-parallel',
        title: 'Series and parallel resistance',
        paragraphs: ['How components combine changes the total:'],
        bullets: [
          'Series: R_total = R₁ + R₂ + R₃. Current is the same through each; voltage divides.',
          'Parallel: 1/R_total = 1/R₁ + 1/R₂. Voltage is the same across each; current divides.',
          'Parallel resistance is always lower than the smallest individual resistor.',
          'Two equal resistors in parallel give exactly half the value.'
        ],
        callout: { type: 'warning', title: 'Ohm\'s law has limits', text: 'It applies to ohmic conductors. Diodes, LEDs, transistors and filament lamps are non-ohmic — their resistance changes with voltage or temperature.' }
      }
    ],
    faqs: [
      { question: "What is Ohm's law in simple terms?", answer: 'Voltage equals current times resistance. Raising voltage across a fixed resistance increases current proportionally; raising resistance at fixed voltage reduces it.' },
      { question: 'How do I calculate power without knowing voltage?', answer: 'Use P = I²R if you know current and resistance, or P = V²/R if you know voltage and resistance. Any two of the four quantities give the rest.' },
      { question: 'Why does my circuit not match the calculation?', answer: 'Common causes are wire resistance on long runs, contact resistance, component tolerance of 5–10%, and temperature effects. Non-ohmic components such as LEDs will not follow the law at all.' }
    ]
  },

  'voltage-drop-calculator': {
    calculatorId: 'voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    subtitle: 'Calculate voltage drop over a cable run and check whether your conductor size stays within the 3% guideline.',
    readTimeMinutes: 4,
    author: AUTHOR,
    disclaimer: 'Cable sizing must comply with local electrical codes, which account for grouping, ambient temperature, installation method and protection. Consult a qualified electrician for installations.',
    overview: [
      'Every conductor has resistance, so voltage falls along its length. On short runs this is negligible; on long ones it causes dim lights, poor motor starting and wasted energy.',
      'Most codes recommend keeping drop below 3% for a final circuit and 5% overall.'
    ],
    formulaCard: {
      title: 'Voltage Drop',
      formula: 'V_drop = (2 × L × I × R) ÷ 1000  (single phase)',
      explanation: 'L is one-way length in metres, I the current, R the resistance in ohms per kilometre. The factor of 2 accounts for both the outgoing and return conductor. Three-phase uses √3 instead of 2.',
      variables: [
        { symbol: 'L', meaning: 'One-way cable length' },
        { symbol: 'R', meaning: 'Conductor resistance per km, from cable tables' },
        { symbol: '3% limit', meaning: 'Common guideline for final circuits' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Voltage Drop Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the one-way run length', description: 'The calculator doubles it for the return path.' },
        { stepNumber: 2, title: 'Enter the load current', description: 'Use the design current, not the breaker rating.' },
        { stepNumber: 3, title: 'Select conductor size and material', description: 'Copper has lower resistance than aluminium for the same size.' },
        { stepNumber: 4, title: 'Compare against the limit', description: 'If the drop exceeds it, increase conductor size.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'A 45 m run carrying 20 A on 2.5 mm² copper at 230 V.',
      inputs: [
        { label: 'Length', value: '45 m one way' },
        { label: 'Current', value: '20 A' },
        { label: 'Conductor', value: '2.5 mm² copper (7.41 Ω/km)' }
      ],
      steps: [
        'V_drop = (2 × 45 × 20 × 7.41) ÷ 1000 = 13.3 V.',
        'As a percentage: 13.3 ÷ 230 = 5.8%.',
        'That exceeds the 3% guideline.',
        'Moving to 6 mm² (3.08 Ω/km) gives 5.5 V, or 2.4% — within limits.'
      ],
      result: '2.5 mm²: 5.8% (too high) · 6 mm²: 2.4% (acceptable)',
      takeaway: 'Voltage drop, not current capacity, is often what forces a larger cable on long runs. The 2.5 mm² conductor could carry 20 A safely but would deliver poor voltage at the far end.'
    },
    faqs: [
      { question: 'What is an acceptable voltage drop?', answer: 'Commonly 3% for a final circuit and 5% total from the supply origin. Exact limits are set by local codes and may differ for lighting and power circuits.' },
      { question: 'Does voltage drop waste energy?', answer: 'Yes. The dropped voltage is dissipated as heat in the cable. A 5% drop means roughly 5% of the delivered energy is lost warming the conductor.' },
      { question: 'Why multiply the length by two?', answer: 'Because current flows out along one conductor and back along another, so it travels twice the run length. Three-phase circuits use √3 instead, reflecting the different current paths.' }
    ]
  },

  'electricity-calculator': {
    calculatorId: 'electricity-calculator',
    title: 'Electricity Cost Calculator',
    subtitle: 'Work out what an appliance costs to run per day, month and year from its wattage and your tariff.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Electricity is billed per kilowatt-hour — one kilowatt drawn for one hour. Converting an appliance\'s wattage and usage into kWh shows what it actually costs to run.',
      'The results often surprise. Low-power devices left on permanently frequently cost more annually than high-power ones used briefly.'
    ],
    formulaCard: {
      title: 'Running Cost',
      formula: 'Cost = (Watts ÷ 1000) × Hours × Rate per kWh',
      explanation: 'Dividing by 1,000 converts watts to kilowatts. Multiply by hours of use to get kWh, then by your tariff rate.',
      variables: [
        { symbol: 'kWh', meaning: 'One kilowatt for one hour — the billing unit' },
        { symbol: 'Rate', meaning: 'Your tariff cost per kWh' },
        { symbol: 'Standby', meaning: 'Power drawn while nominally off' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Electricity Cost Calculator',
      steps: [
        { stepNumber: 1, title: 'Find the appliance wattage', description: 'On the rating plate or in the manual.' },
        { stepNumber: 2, title: 'Enter typical hours of use', description: 'Per day or per week.' },
        { stepNumber: 3, title: 'Enter your tariff rate', description: 'From your bill, per kWh.' },
        { stepNumber: 4, title: 'Account for cycling appliances', description: 'Fridges and heaters do not draw full power continuously — use an average.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Comparing a 2,000 W heater used 3 hours a day against a 120 W games console left on 24/7, at 28p per kWh.',
      inputs: [
        { label: 'Heater', value: '2,000 W, 3 h/day' },
        { label: 'Console idle', value: '120 W, 24 h/day' },
        { label: 'Rate', value: '28p per kWh' }
      ],
      steps: [
        'Heater: (2000 ÷ 1000) × 3 = 6 kWh/day → £1.68/day → £613/year.',
        'Console: (120 ÷ 1000) × 24 = 2.88 kWh/day → £0.81/day → £294/year.',
        'The heater costs more, but only because it is genuinely high power.',
        'Turning the console off when unused would save nearly £294 a year.'
      ],
      result: 'Heater £613/yr · Console left on £294/yr',
      takeaway: 'A device drawing one sixteenth the power still costs half as much, purely because it runs eight times longer. Duration matters as much as wattage.'
    },
    faqs: [
      { question: 'How do I find an appliance\'s wattage?', answer: 'Check the rating plate, usually on the back or underside, or the manual. A plug-in energy monitor gives real consumption, which is more useful for appliances that cycle.' },
      { question: 'Does standby power actually matter?', answer: 'Individually it is small, but it accumulates. A household with many devices on standby can lose a noticeable share of its annual bill to equipment doing nothing.' },
      { question: 'Why does my bill not match the calculation?', answer: 'Bills include standing charges, taxes and sometimes tiered rates. Appliances that cycle, like fridges, also do not draw rated power continuously, so estimates based on nameplate wattage overstate their use.' }
    ]
  },

  'ip-subnet-calculator': {
    calculatorId: 'ip-subnet-calculator',
    title: 'Subnet Calculator',
    subtitle: 'Calculate network address, broadcast, usable host range and mask from any IPv4 address and CIDR prefix.',
    readTimeMinutes: 4,
    author: AUTHOR,
    overview: [
      'Subnetting divides an IP network into smaller segments. The CIDR prefix states how many leading bits identify the network, leaving the rest for hosts.',
      'Everything else — mask, network address, broadcast address and usable range — follows from the address and prefix.'
    ],
    formulaCard: {
      title: 'Hosts from Prefix',
      formula: 'Usable hosts = 2^(32 − prefix) − 2',
      explanation: 'The two subtracted are the network address and the broadcast address, neither assignable to a host. A /24 gives 2⁸ − 2 = 254 usable addresses.',
      variables: [
        { symbol: 'Prefix', meaning: 'Network bits, e.g. /24' },
        { symbol: 'Network address', meaning: 'All host bits zero' },
        { symbol: 'Broadcast', meaning: 'All host bits one' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Subnet Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter an IPv4 address', description: 'Any address within the subnet works.' },
        { stepNumber: 2, title: 'Enter the CIDR prefix or mask', description: 'Either /24 or 255.255.255.0.' },
        { stepNumber: 3, title: 'Read the results', description: 'Network, broadcast, first and last usable host, and total count.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'The address 192.168.10.73 with a /26 prefix.',
      inputs: [
        { label: 'IP address', value: '192.168.10.73' },
        { label: 'Prefix', value: '/26' }
      ],
      steps: [
        'Mask = 255.255.255.192, leaving 6 host bits.',
        'Block size = 2⁶ = 64, so subnets start at .0, .64, .128, .192.',
        '73 falls in the .64 block → network address 192.168.10.64.',
        'Broadcast = 192.168.10.127. Usable range .65 to .126, giving 62 hosts.'
      ],
      result: 'Network .64 · Broadcast .127 · Usable .65–.126 (62 hosts)',
      takeaway: 'Finding the block size from the prefix and stepping through multiples is the fastest way to locate a subnet boundary without converting to binary.'
    },
    sections: [
      {
        id: 'common-prefixes',
        title: 'Common prefixes and their sizes',
        paragraphs: ['Worth committing to memory:'],
        bullets: [
          '/24 — 256 addresses, 254 usable. The standard small network.',
          '/25 — 128 addresses, 126 usable.',
          '/26 — 64 addresses, 62 usable.',
          '/30 — 4 addresses, 2 usable. Used for point-to-point links.',
          '/31 — 2 addresses, both usable on point-to-point links under RFC 3021.'
        ]
      }
    ],
    faqs: [
      { question: 'Why are two addresses unusable in each subnet?', answer: 'The first is the network address identifying the subnet itself, and the last is the broadcast address for reaching all hosts. Neither can be assigned to a device.' },
      { question: 'What does the /24 notation mean?', answer: 'The number of leading bits that identify the network. /24 means the first 24 bits are network and the remaining 8 are host, equivalent to a 255.255.255.0 mask.' },
      { question: 'How do I choose a subnet size?', answer: 'Pick the smallest prefix that accommodates your hosts plus growth. Needing 50 hosts means a /26 giving 62 usable, since a /27 would only give 30.' }
    ]
  },

  'bandwidth-calculator': {
    calculatorId: 'bandwidth-calculator',
    title: 'Bandwidth Calculator',
    subtitle: 'Estimate how long a file takes to download at a given connection speed, with bits and bytes kept straight.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'The most common confusion here is bits versus bytes. Connection speeds are advertised in megabits per second, file sizes are in megabytes, and there are eight bits in a byte.',
      'That factor of eight is why a 100 Mbps connection downloads at around 12.5 MB/s rather than 100.'
    ],
    formulaCard: {
      title: 'Download Time',
      formula: 'Time (s) = (File size MB × 8) ÷ Speed Mbps',
      explanation: 'Multiplying by 8 converts megabytes to megabits so the units match. Real throughput is typically 10–20% below the advertised rate due to protocol overhead.',
      variables: [
        { symbol: 'Mbps', meaning: 'Megabits per second — connection speed' },
        { symbol: 'MB', meaning: 'Megabytes — file size' },
        { symbol: '×8', meaning: 'Bits per byte' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Bandwidth Calculator',
      steps: [
        { stepNumber: 1, title: 'Enter the file size', description: 'In MB or GB.' },
        { stepNumber: 2, title: 'Enter your connection speed', description: 'In Mbps, as advertised by your provider.' },
        { stepNumber: 3, title: 'Allow for overhead', description: 'Real-world throughput is generally below the headline figure.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Downloading a 4.7 GB file on a 200 Mbps connection.',
      inputs: [
        { label: 'File size', value: '4.7 GB (4,700 MB)' },
        { label: 'Connection', value: '200 Mbps' }
      ],
      steps: [
        'Convert: 4,700 MB × 8 = 37,600 megabits.',
        'Time = 37,600 ÷ 200 = 188 seconds, about 3 minutes 8 seconds.',
        'At 85% real throughput: 188 ÷ 0.85 = 221 seconds, about 3 minutes 41 seconds.'
      ],
      result: 'Theoretical 3m 08s · Realistic ≈ 3m 41s',
      takeaway: 'Dividing file size directly by connection speed without the factor of eight would suggest 23 seconds — wrong by a factor of eight.'
    },
    faqs: [
      { question: 'Why is my download slower than my connection speed?', answer: 'Partly the bits-versus-bytes conversion, partly real overhead. Protocol overhead, server limits, Wi-Fi conditions and network congestion typically reduce throughput 10–20% below the advertised figure.' },
      { question: 'What is the difference between Mbps and MB/s?', answer: 'Mbps is megabits per second, MB/s is megabytes per second. Divide Mbps by 8 for MB/s — a 100 Mbps connection gives about 12.5 MB/s.' },
      { question: 'Does upload speed matter?', answer: 'It does for video calls, cloud backups, streaming and sending large files. Many consumer connections are asymmetric with much lower upload than download.' }
    ]
  },

  'base64-encode-decode': {
    calculatorId: 'base64-encode-decode',
    title: 'Base64 Encoder and Decoder',
    subtitle: 'Encode text to Base64 or decode it back, entirely in your browser — nothing is uploaded.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'Base64 represents binary data using 64 printable ASCII characters. It exists so that binary can travel safely through systems designed for text, such as email or JSON.',
      'It is an encoding, not encryption. Anyone can decode it instantly — it provides no security whatsoever.'
    ],
    formulaCard: {
      title: 'How Base64 Works',
      formula: '3 bytes (24 bits) → 4 characters (6 bits each)',
      explanation: 'Input is taken three bytes at a time and split into four 6-bit groups, each mapped to one of 64 characters. Output is always about 33% larger than the input.',
      variables: [
        { symbol: 'Alphabet', meaning: 'A–Z, a–z, 0–9, plus + and /' },
        { symbol: 'Padding', meaning: '= characters pad the final group' },
        { symbol: 'Size increase', meaning: 'Roughly 4/3 of the original' }
      ]
    },
    howToSteps: {
      title: 'How to Use the Base64 Tool',
      steps: [
        { stepNumber: 1, title: 'Paste your text or Base64 string', description: 'Both directions are supported.' },
        { stepNumber: 2, title: 'Choose encode or decode', description: 'Decoding requires valid Base64 including any padding.' },
        { stepNumber: 3, title: 'Copy the result', description: 'Everything runs locally; nothing is transmitted.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Encoding the word "Cat".',
      inputs: [{ label: 'Input', value: 'Cat' }],
      steps: [
        'ASCII values: C = 67, a = 97, t = 116.',
        'As binary: 01000011 01100001 01110100 — 24 bits.',
        'Split into 6-bit groups: 010000 110110 000101 110100 → 16, 54, 5, 52.',
        'Mapped to the alphabet: Q, 2, F, 0 → "Q2F0".'
      ],
      result: '"Cat" encodes to "Q2F0"',
      takeaway: 'Three input characters became four output characters exactly, with no padding needed. Inputs not divisible by three get = padding to complete the final group.'
    },
    sections: [
      {
        id: 'uses',
        title: 'Where Base64 is used',
        paragraphs: ['It appears wherever binary must survive a text-only channel:'],
        bullets: [
          'Email attachments under MIME.',
          'Data URIs embedding images directly in HTML or CSS.',
          'JSON Web Tokens, whose segments are Base64url encoded.',
          'HTTP Basic authentication headers — encoded, and therefore not secure without HTTPS.',
          'Embedding binary in XML or JSON payloads.'
        ],
        callout: { type: 'warning', title: 'Base64 is not encryption', text: 'It offers no confidentiality at all. Anything sensitive needs real encryption; Base64 only makes data transport-safe.' }
      }
    ],
    faqs: [
      { question: 'Is Base64 encryption?', answer: 'No. It is a reversible encoding with no key and no secrecy. Anyone can decode it instantly. Use it for compatibility, never for protection.' },
      { question: 'Why does Base64 make files bigger?', answer: 'Because it represents 3 bytes using 4 characters, increasing size by roughly 33%. That is the cost of making binary safe for text-only channels.' },
      { question: 'What are the = characters at the end?', answer: 'Padding. Base64 works in 3-byte blocks, so inputs that are not a multiple of three are padded with one or two = signs to complete the final group.' }
    ]
  },

  'url-encode-decode': {
    calculatorId: 'url-encode-decode',
    title: 'URL Encoder and Decoder',
    subtitle: 'Percent-encode text for safe use in URLs, or decode an encoded string back to readable text.',
    readTimeMinutes: 3,
    author: AUTHOR,
    overview: [
      'URLs may only contain a limited set of characters. Anything outside that set — spaces, accents, ampersands, question marks — must be percent-encoded to avoid breaking the URL structure.',
      'This matters most in query strings, where an unencoded ampersand silently splits one parameter into two.'
    ],
    formulaCard: {
      title: 'Percent Encoding',
      formula: 'Character → % + two hex digits of its byte value',
      explanation: 'A space becomes %20, an ampersand %26, a question mark %3F. Non-ASCII characters are encoded as UTF-8 bytes, so each may produce several percent groups.',
      variables: [
        { symbol: 'Unreserved', meaning: 'A–Z, a–z, 0–9, hyphen, underscore, period, tilde — never encoded' },
        { symbol: 'Reserved', meaning: 'Characters with structural meaning: / ? # & = :' },
        { symbol: 'Space', meaning: '%20, or + within query strings' }
      ]
    },
    howToSteps: {
      title: 'How to Use the URL Encoder',
      steps: [
        { stepNumber: 1, title: 'Paste your text or encoded string', description: 'Both directions are supported.' },
        { stepNumber: 2, title: 'Choose encode or decode', description: 'Encoding is for values you are placing into a URL.' },
        { stepNumber: 3, title: 'Encode values, not whole URLs', description: 'Encoding an entire URL would escape the separators that make it work.' }
      ]
    },
    workedExample: {
      title: 'Worked Example',
      scenario: 'Encoding the search term "coffee & tea 50%" for a query string.',
      inputs: [{ label: 'Input', value: 'coffee & tea 50%' }],
      steps: [
        'Space → %20, ampersand → %26, percent → %25.',
        'Result: coffee%20%26%20tea%2050%25.',
        'Used as: ?q=coffee%20%26%20tea%2050%25.',
        'Without encoding, the & would start a new parameter and the query would break.'
      ],
      result: 'coffee%20%26%20tea%2050%25',
      takeaway: 'The ampersand is the dangerous one. Unencoded, it silently truncates your value and creates a spurious second parameter rather than producing a visible error.'
    },
    faqs: [
      { question: 'When do I need to URL-encode?', answer: 'Whenever a value placed in a URL might contain spaces, ampersands, question marks, slashes, accented characters or any other reserved or non-ASCII character.' },
      { question: 'What is the difference between %20 and + for a space?', answer: 'Both appear. %20 is correct percent-encoding and valid anywhere in a URL. The + form comes from HTML form submission and is only valid within a query string.' },
      { question: 'Should I encode the whole URL?', answer: 'No. That would escape the slashes, colons and separators that give the URL its structure. Encode individual parameter values only.' }
    ]
  }
};
