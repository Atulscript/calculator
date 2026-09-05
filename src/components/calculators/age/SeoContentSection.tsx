import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, Calculator } from 'lucide-react';

export const SeoContentSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Age Calculator determine exact chronological age?',
      a: 'The Age Calculator uses the Gregorian calendar standard (ISO 8601). It computes the difference between your date of birth and the target date across three units: years, months, and days. When the target day is smaller than the birth day, the algorithm borrows the precise number of days from the preceding month (28, 29, 30, or 31 days depending on that specific calendar month and leap year), ensuring 100% calendrical accuracy.'
    },
    {
      q: 'How are leap years handled for individuals born on February 29th?',
      a: 'February 29 occurs only during leap years (years divisible by 4, with century years divisible by 400). In non-leap years (which contain 365 days), common legal standards evaluate age on either February 28 or March 1. For example, in the United Kingdom and Hong Kong, a person born on February 29 legally turns a year older on March 1, whereas in other jurisdictions it is observed on February 28. Our calculator tracks total leap days lived and accurately projects next leap anniversaries.'
    },
    {
      q: 'Can I calculate what age I will be on a future date?',
      a: 'Yes. By switching to the "Age on Specific Date" mode, you can enter any future date—such as an upcoming graduation, wedding anniversary, retirement milestone, or the year 2050—and the tool will compute your exact age, total days lived, and countdown until that date.'
    },
    {
      q: 'What are Planetary Ages and how are they calculated?',
      a: 'A year is defined as the time an astronomical body takes to complete one orbit around the Sun. Earth takes approximately 365.256 days. Because Mercury orbits in 87.97 Earth days, your age in Mercury years is higher (Earth Age × 365.25 / 87.97). Conversely, Mars takes 686.98 days, so your Martian age is roughly half your Earth age.'
    },
    {
      q: 'What is the difference between chronological age and biological age?',
      a: 'Chronological age is the exact elapsed time since your birth date based on the calendar. Biological age measures physiological health, cellular integrity, and biomarker vitality, which can be influenced by diet, physical activity, sleep, and genetics.'
    },
    {
      q: 'Why do month-based calculations differ between simple division and calendar subtraction?',
      a: 'A simplified division (total days divided by 30 or 30.4375) produces a decimal approximation. In contrast, calendar subtraction tracks the exact length of each specific month lived (January has 31, February has 28 or 29, April has 30, etc.). Our calculator employs precise calendar subtraction to ensure legal and administrative accuracy.'
    }
  ];

  // FAQ Schema for Google Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <article className="glass-panel" style={{ padding: '2rem', marginTop: '2.5rem', background: 'var(--surface-solid)' }}>
      {/* Google FAQ Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
        <BookOpen size={22} color="var(--primary-500)" />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          How Chronological Age Is Calculated: Complete Mathematical Guide
        </h2>
      </div>

      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
        <p style={{ marginBottom: '1rem' }}>
          Chronological age is defined as the exact measure of time that has elapsed from an individual’s birth to a specified target or current date. In standard international systems (ISO 8601), age is expressed in completed years, remaining months, and remaining days.
        </p>

        {/* Mathematical Formula Box */}
        <div style={{
          background: 'var(--surface-subtle)',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          margin: '1.5rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-500)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <Calculator size={16} />
            <span>The Calendar Subtraction Algorithm:</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', background: 'var(--surface-solid)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>
            Years = Target_Year - Birth_Year<br />
            Months = Target_Month - Birth_Month<br />
            Days = Target_Day - Birth_Day<br />
            * If Days &lt; 0: Borrow days from (Target_Month - 1) and decrement Months by 1<br />
            * If Months &lt; 0: Add 12 to Months and decrement Years by 1
          </div>
        </div>

        {/* Step-by-Step Practical Example */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '1.5rem 0 0.5rem' }}>
          Step-by-Step Worked Example
        </h3>
        <p style={{ marginBottom: '0.75rem' }}>
          Suppose an individual was born on <strong>March 25, 1998</strong>, and we want to calculate their age as of <strong>September 10, 2026</strong>:
        </p>
        <ol style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li><strong>Days calculation:</strong> 10 - 25 = -15. Since days are negative, we borrow the number of days in the preceding month (August has 31 days). 10 + 31 - 25 = <strong>16 Days</strong>.</li>
          <li><strong>Months calculation:</strong> September is month 9. Since we borrowed 1 month, it becomes month 8. 8 - 3 = <strong>5 Months</strong>.</li>
          <li><strong>Years calculation:</strong> 2026 - 1998 = <strong>28 Years</strong>.</li>
          <li><strong>Final Exact Age:</strong> <strong>28 Years, 5 Months, and 16 Days</strong>.</li>
        </ol>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '1.5rem 0 0.5rem' }}>
          Leap Year Rules in the Gregorian Calendar
        </h3>
        <p style={{ marginBottom: '0.75rem' }}>
          A calendar year is normally 365 days long. Because Earth takes approximately 365.24219 days to orbit the Sun, an intercalary leap day is added every four years to maintain seasonal alignment:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <li>Every year divisible by 4 is a leap year (e.g., 2020, 2024, 2028).</li>
          <li>Century years (ending in 00) are <em>not</em> leap years unless they are also divisible by 400 (e.g., 2000 was a leap year, but 1900 was not and 2100 will not be).</li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '1.5rem 0 0.5rem' }}>
          Common Legal and Administrative Use Cases
        </h3>
        <p>
          Precise age calculation is legally required for voting qualification, obtaining a driver’s license, legal age of majority, insurance underwriting actuarial calculations, retirement and pension vesting dates, and competitive athletic age groups.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
          <HelpCircle size={18} color="var(--primary-500)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.15rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: isOpen ? 'var(--primary-500)' : 'var(--text-primary)'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.15rem 1.15rem',
                    fontSize: '0.825rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.75rem'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};
