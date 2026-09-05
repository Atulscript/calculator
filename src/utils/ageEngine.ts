import {
  AgeCalculationResult,
  AgeComparisonResult,
  ExactAge,
  PlanetaryAge,
  ReverseDobResult,
  TotalTimeBreakdown,
  ZodiacInfo
} from '../types/age';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Calculates accurate chronological age between two timestamps/dates
 */
export function calculateExactAge(startDate: Date, endDate: Date): ExactAge {
  if (endDate.getTime() < startDate.getTime()) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  let hours = endDate.getHours() - startDate.getHours();
  let minutes = endDate.getMinutes() - startDate.getMinutes();
  let seconds = endDate.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow days from previous month
    const prevMonthIndex = (endDate.getMonth() - 1 + 12) % 12;
    const prevMonthYear = prevMonthIndex === 11 ? endDate.getFullYear() - 1 : endDate.getFullYear();
    days += getDaysInMonth(prevMonthYear, prevMonthIndex);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds)
  };
}

/**
 * Calculates total time breakdown across various units
 */
export function calculateTotals(startDate: Date, endDate: Date): TotalTimeBreakdown {
  const diffMs = Math.max(0, endDate.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Total months approximation (average 30.4375 days per month)
  const totalMonths = Math.floor(totalDays / 30.4375);
  const decimalYears = Number((totalDays / 365.2425).toFixed(2));

  return {
    totalMonths,
    totalWeeks,
    remainingDays,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    decimalYears
  };
}

/**
 * Determines Western Zodiac Sign
 */
export function getWesternZodiac(month: number, day: number): ZodiacInfo['western'] {
  // month is 1-indexed (1 = Jan, 12 = Dec)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      sign: 'Aries',
      symbol: '♈ The Ram',
      dates: 'Mar 21 - Apr 19',
      element: 'Fire 🔥',
      rulingPlanet: 'Mars',
      traits: ['Courageous', 'Passionate', 'Confident', 'Energetic']
    };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      sign: 'Taurus',
      symbol: '♉ The Bull',
      dates: 'Apr 20 - May 20',
      element: 'Earth 🌍',
      rulingPlanet: 'Venus',
      traits: ['Reliable', 'Patient', 'Practical', 'Devoted']
    };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      sign: 'Gemini',
      symbol: '♊ The Twins',
      dates: 'May 21 - Jun 20',
      element: 'Air 💨',
      rulingPlanet: 'Mercury',
      traits: ['Adaptable', 'Outgoing', 'Intelligent', 'Curious']
    };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      sign: 'Cancer',
      symbol: '♋ The Crab',
      dates: 'Jun 21 - Jul 22',
      element: 'Water 💧',
      rulingPlanet: 'Moon',
      traits: ['Intuitive', 'Empathetic', 'Protective', 'Loyal']
    };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      sign: 'Leo',
      symbol: '♌ The Lion',
      dates: 'Jul 23 - Aug 22',
      element: 'Fire 🔥',
      rulingPlanet: 'Sun',
      traits: ['Generous', 'Warmhearted', 'Creative', 'Enthusiastic']
    };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      sign: 'Virgo',
      symbol: '♍ The Maiden',
      dates: 'Aug 23 - Sep 22',
      element: 'Earth 🌍',
      rulingPlanet: 'Mercury',
      traits: ['Analytical', 'Meticulous', 'Helpful', 'Reliable']
    };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      sign: 'Libra',
      symbol: '♎ The Scales',
      dates: 'Sep 23 - Oct 22',
      element: 'Air 💨',
      rulingPlanet: 'Venus',
      traits: ['Diplomatic', 'Gracious', 'Fair-minded', 'Charming']
    };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      sign: 'Scorpio',
      symbol: '♏ The Scorpion',
      dates: 'Oct 23 - Nov 21',
      element: 'Water 💧',
      rulingPlanet: 'Pluto & Mars',
      traits: ['Resourceful', 'Powerful', 'Brave', 'Passionate']
    };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      sign: 'Sagittarius',
      symbol: '♐ The Archer',
      dates: 'Nov 22 - Dec 21',
      element: 'Fire 🔥',
      rulingPlanet: 'Jupiter',
      traits: ['Optimistic', 'Free-spirited', 'Generous', 'Philosophical']
    };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      sign: 'Capricorn',
      symbol: '♑ The Goat',
      dates: 'Dec 22 - Jan 19',
      element: 'Earth 🌍',
      rulingPlanet: 'Saturn',
      traits: ['Disciplined', 'Responsible', 'Tenacious', 'Strategic']
    };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      sign: 'Aquarius',
      symbol: '♒ The Water Bearer',
      dates: 'Jan 20 - Feb 18',
      element: 'Air 💨',
      rulingPlanet: 'Uranus & Saturn',
      traits: ['Progressive', 'Original', 'Independent', 'Humanitarian']
    };
  }
  return {
    sign: 'Pisces',
    symbol: '♓ The Fish',
    dates: 'Feb 19 - Mar 20',
    element: 'Water 💧',
    rulingPlanet: 'Neptune & Jupiter',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Wise']
  };
}

/**
 * Determines Chinese Zodiac Animal and Element
 */
export function getChineseZodiac(year: number): ZodiacInfo['chinese'] {
  const animals = [
    'Rat 🐀', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇',
    'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐',
    'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖'
  ];
  // 1900 was Year of the Rat
  const animalIndex = (year - 4) % 12;
  const animal = animals[(animalIndex + 12) % 12];

  const elements = ['Metal 🪙', 'Water 💧', 'Wood 🌲', 'Fire 🔥', 'Earth 🪨'];
  const elementIndex = Math.floor(((year - 4) % 10) / 2);
  const element = elements[(elementIndex + 5) % 5];

  const yinYang = year % 2 === 0 ? 'Yang (Active)' : 'Yin (Receptive)';

  // Deterministic lucky numbers from year seed
  const luckyNumbers = [
    ((year * 3) % 9) + 1,
    ((year * 7) % 9) + 1,
    ((year * 11) % 9) + 1
  ].filter((v, i, a) => a.indexOf(v) === i);

  return {
    animal,
    element,
    yinYang,
    luckyNumbers
  };
}

/**
 * Birthstone by Month (1-12)
 */
export function getBirthstone(month: number) {
  const birthstones = [
    { name: 'Garnet', color: 'Deep Burgundy Red', meaning: 'Protection, strength, and constancy' },
    { name: 'Amethyst', color: 'Royal Violet', meaning: 'Peace, wisdom, and inner balance' },
    { name: 'Aquamarine', color: 'Crystal Sea Blue', meaning: 'Serenity, clarity, and youth' },
    { name: 'Diamond', color: 'Brilliant White', meaning: 'Invincibility, purity, and everlasting love' },
    { name: 'Emerald', color: 'Lush Forest Green', meaning: 'Rebirth, prosperity, and intuition' },
    { name: 'Pearl & Alexandrite', color: 'Moonlit Opal / Iridescent', meaning: 'Purity, harmony, and good fortune' },
    { name: 'Ruby', color: 'Vibrant Crimson', meaning: 'Passion, vitality, and courage' },
    { name: 'Peridot', color: 'Lime Olive Green', meaning: 'Healing, positive energy, and light' },
    { name: 'Sapphire', color: 'Deep Celestial Blue', meaning: 'Truth, nobility, and faithfulness' },
    { name: 'Opal & Tourmaline', color: 'Prismatic Rainbow', meaning: 'Creativity, hope, and inspiration' },
    { name: 'Topaz & Citrine', color: 'Golden Amber', meaning: 'Joy, abundance, and warmth' },
    { name: 'Tanzanite & Turquoise', color: 'Vibrant Azure Blue', meaning: 'Transformation, peace, and protection' }
  ];
  return birthstones[month - 1] || birthstones[0];
}

/**
 * Birth Flower by Month (1-12)
 */
export function getBirthFlower(month: number) {
  const flowers = [
    { name: 'Carnation & Snowdrop', meaning: 'Admiration, devotion, and hope' },
    { name: 'Violet & Primrose', meaning: 'Modesty, faithfulness, and virtue' },
    { name: 'Daffodil & Jonquil', meaning: 'New beginnings, rebirth, and joy' },
    { name: 'Daisy & Sweet Pea', meaning: 'Innocence, blissful pleasure, and cheer' },
    { name: 'Lily of the Valley & Hawthorn', meaning: 'Sweetness, purity, and protection' },
    { name: 'Rose & Honeysuckle', meaning: 'Love, beauty, and devoted affection' },
    { name: 'Larkspur & Water Lily', meaning: 'Open heart, positivity, and grace' },
    { name: 'Gladiolus & Poppy', meaning: 'Strength of character, integrity, and remembrance' },
    { name: 'Aster & Morning Glory', meaning: 'Wisdom, elegance, and affectionate love' },
    { name: 'Marigold & Cosmos', meaning: 'Warmth, fierce creativity, and balance' },
    { name: 'Chrysanthemum & Peony', meaning: 'Longevity, optimism, and celebration' },
    { name: 'Narcissus & Holly', meaning: 'Good wishes, celebration, and renewal' }
  ];
  return flowers[month - 1] || flowers[0];
}

/**
 * Planetary Ages relative to Earth Solar Days
 */
export function calculatePlanetaryAges(totalDays: number): PlanetaryAge[] {
  const planets = [
    { planet: 'Mercury', orbitalPeriodDays: 87.97, emoji: '🪐' },
    { planet: 'Venus', orbitalPeriodDays: 224.7, emoji: '🌕' },
    { planet: 'Earth', orbitalPeriodDays: 365.256, emoji: '🌍' },
    { planet: 'Mars', orbitalPeriodDays: 686.98, emoji: '🔴' },
    { planet: 'Jupiter', orbitalPeriodDays: 4332.59, emoji: '🟤' },
    { planet: 'Saturn', orbitalPeriodDays: 10759.22, emoji: '🪐' },
    { planet: 'Uranus', orbitalPeriodDays: 30685.4, emoji: '🔵' },
    { planet: 'Neptune', orbitalPeriodDays: 60189.0, emoji: '🌌' }
  ];

  return planets.map(p => {
    const age = totalDays / p.orbitalPeriodDays;
    const currentPlanetCycleDays = totalDays % p.orbitalPeriodDays;
    const nextBirthdayInPlanetDays = Math.max(0, p.orbitalPeriodDays - currentPlanetCycleDays);

    return {
      planet: p.planet,
      orbitalPeriodDays: p.orbitalPeriodDays,
      ageInPlanetYears: Number(age.toFixed(2)),
      nextBirthdayInPlanetDays: Math.round(nextBirthdayInPlanetDays),
      emoji: p.emoji
    };
  });
}

/**
 * Biological stats estimation based on days lived
 */
export function calculateBioStats(totalDays: number, totalMinutes: number) {
  // ~80 heartbeats per minute on average
  const estimatedHeartbeats = totalMinutes * 80;
  // ~16 breaths per minute
  const estimatedBreaths = totalMinutes * 16;
  // ~8 hours of sleep per day
  const estimatedSleepHours = totalDays * 8;
  // ~3 meals per day
  const estimatedMealsEaten = totalDays * 3;
  // ~15 laughs per day
  const timesLaughed = totalDays * 15;

  return {
    estimatedHeartbeats,
    estimatedBreaths,
    estimatedSleepHours,
    estimatedMealsEaten,
    timesLaughed
  };
}

/**
 * Next Birthday & Upcoming Birthday schedule calculation
 */
export function calculateNextBirthday(birthDate: Date, targetDate: Date) {
  const targetYear = targetDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  // Test if birthday happened this year yet
  let nextBdayYear = targetYear;
  let nextBday = new Date(nextBdayYear, birthMonth, birthDay);

  // Handle Feb 29 in non-leap year: defaults to Feb 28 or Mar 1
  if (birthMonth === 1 && birthDay === 29 && !isLeapYear(nextBdayYear)) {
    nextBday = new Date(nextBdayYear, 1, 28);
  }

  if (nextBday.getTime() < targetDate.getTime()) {
    nextBdayYear += 1;
    nextBday = new Date(nextBdayYear, birthMonth, birthDay);
    if (birthMonth === 1 && birthDay === 29 && !isLeapYear(nextBdayYear)) {
      nextBday = new Date(nextBdayYear, 1, 28);
    }
  }

  const diffMs = nextBday.getTime() - targetDate.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const daysRemaining = Math.floor(totalSeconds / 86400);
  const hoursRemaining = Math.floor((totalSeconds % 86400) / 3600);
  const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
  const secondsRemaining = totalSeconds % 60;

  const turningAge = nextBdayYear - birthDate.getFullYear();
  const dayOfWeek = DAYS_OF_WEEK[nextBday.getDay()];

  // Progress percentage through the current age year
  const lastBdayYear = nextBdayYear - 1;
  let lastBday = new Date(lastBdayYear, birthMonth, birthDay);
  if (birthMonth === 1 && birthDay === 29 && !isLeapYear(lastBdayYear)) {
    lastBday = new Date(lastBdayYear, 1, 28);
  }

  const totalYearMs = nextBday.getTime() - lastBday.getTime();
  const elapsedMs = targetDate.getTime() - lastBday.getTime();
  const progressPercentage = Math.min(100, Math.max(0, Number(((elapsedMs / totalYearMs) * 100).toFixed(1))));

  // Half birthday: 6 months after birthDate in current cycle
  const halfBirthdayDate = new Date(lastBday);
  halfBirthdayDate.setMonth(halfBirthdayDate.getMonth() + 6);

  // Upcoming 5 birthdays
  const upcomingBirthdays = [];
  for (let i = 0; i < 5; i++) {
    const year = nextBdayYear + i;
    let bDate = new Date(year, birthMonth, birthDay);
    if (birthMonth === 1 && birthDay === 29 && !isLeapYear(year)) {
      bDate = new Date(year, 1, 28);
    }
    const dow = DAYS_OF_WEEK[bDate.getDay()];
    upcomingBirthdays.push({
      year,
      age: year - birthDate.getFullYear(),
      dayOfWeek: dow,
      isWeekend: bDate.getDay() === 0 || bDate.getDay() === 6
    });
  }

  return {
    nextBirthdayDate: nextBday,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    dayOfWeek,
    turningAge,
    progressPercentage,
    halfBirthdayDate,
    upcomingBirthdays
  };
}

/**
 * Main Full Age Calculation Engine
 */
export function computeFullAge(birthDateInput: Date | string, targetDateInput: Date | string = new Date()): AgeCalculationResult {
  const birthDate = typeof birthDateInput === 'string' ? new Date(birthDateInput) : birthDateInput;
  const targetDate = typeof targetDateInput === 'string' ? new Date(targetDateInput) : targetDateInput;

  const exactAge = calculateExactAge(birthDate, targetDate);
  const totals = calculateTotals(birthDate, targetDate);
  const nextBirthday = calculateNextBirthday(birthDate, targetDate);

  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();

  const dayOfWeekBorn = DAYS_OF_WEEK[birthDate.getDay()];
  const isLeapYearBorn = isLeapYear(year);

  // Day of the year born
  const startOfYear = new Date(year, 0, 1);
  const dayOfYearBorn = Math.floor((birthDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const westernZodiac = getWesternZodiac(month, day);
  const chineseZodiac = getChineseZodiac(year);
  const birthstone = getBirthstone(month);
  const birthFlower = getBirthFlower(month);
  const planetaryAges = calculatePlanetaryAges(totals.totalDays);
  const bioStats = calculateBioStats(totals.totalDays, totals.totalMinutes);

  return {
    birthDate,
    targetDate,
    exactAge,
    totals,
    nextBirthday,
    dayOfWeekBorn,
    isLeapYearBorn,
    dayOfYearBorn,
    zodiac: {
      western: westernZodiac,
      chinese: chineseZodiac
    },
    birthstone,
    birthFlower,
    planetaryAges,
    bioStats
  };
}

/**
 * Compare two ages
 */
export function compareAges(
  p1Name: string,
  p1Dob: Date,
  p2Name: string,
  p2Dob: Date,
  referenceDate: Date = new Date()
): AgeComparisonResult {
  const p1Age = calculateExactAge(p1Dob, referenceDate);
  const p1Totals = calculateTotals(p1Dob, referenceDate);

  const p2Age = calculateExactAge(p2Dob, referenceDate);
  const p2Totals = calculateTotals(p2Dob, referenceDate);

  let olderPerson: 'person1' | 'person2' | 'same' = 'same';
  let diffStartDate = p1Dob;
  let diffEndDate = p2Dob;

  if (p1Dob.getTime() < p2Dob.getTime()) {
    olderPerson = 'person1';
    diffStartDate = p1Dob;
    diffEndDate = p2Dob;
  } else if (p2Dob.getTime() < p1Dob.getTime()) {
    olderPerson = 'person2';
    diffStartDate = p2Dob;
    diffEndDate = p1Dob;
  }

  const differenceExact = calculateExactAge(diffStartDate, diffEndDate);
  const diffDiffTotals = calculateTotals(diffStartDate, diffEndDate);

  const maxDays = Math.max(p1Totals.totalDays, p2Totals.totalDays, 1);
  const percentageDiff = Number(((diffDiffTotals.totalDays / maxDays) * 100).toFixed(1));

  return {
    person1: {
      name: p1Name || 'Person 1',
      birthDate: p1Dob,
      exactAge: p1Age,
      totalDays: p1Totals.totalDays
    },
    person2: {
      name: p2Name || 'Person 2',
      birthDate: p2Dob,
      exactAge: p2Age,
      totalDays: p2Totals.totalDays
    },
    olderPerson,
    differenceExact,
    differenceDays: diffDiffTotals.totalDays,
    differenceHours: diffDiffTotals.totalHours,
    percentageDiff
  };
}

/**
 * Reverse DOB calculation: calculates birth date given an age (Y/M/D) and reference date
 */
export function findReverseDob(
  years: number,
  months: number,
  days: number,
  targetDate: Date = new Date()
): ReverseDobResult {
  const d = new Date(targetDate);
  d.setFullYear(d.getFullYear() - years);
  d.setMonth(d.getMonth() - months);
  d.setDate(d.getDate() - days);

  const dayOfWeek = DAYS_OF_WEEK[d.getDay()];

  return {
    targetDate,
    ageInput: { years, months, days },
    calculatedBirthDate: d,
    dayOfWeek
  };
}

export { MONTH_NAMES, DAYS_OF_WEEK };
