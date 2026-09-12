import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, AlertCircle, Info, Mail } from 'lucide-react';
import { usePageSeo } from '../hooks/usePageSeo';

export type PolicyType = 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact';

interface InfoPolicyPageProps {
  type: PolicyType;
  onNavigate: (path: string) => void;
}

export const InfoPolicyPage: React.FC<InfoPolicyPageProps> = ({ type, onNavigate }) => {
  const titles: Record<PolicyType, string> = {
    about: 'About Calculator360 – Mission & Precision Standards',
    contact: 'Contact & Feedback – Support & Inquiries | Calculator360',
    privacy: 'Privacy Policy – 100% Client-Side Protection | Calculator360',
    terms: 'Terms of Service – Usage Guidelines | Calculator360',
    disclaimer: 'Legal, Financial & Medical Disclaimer | Calculator360'
  };

  const descriptions: Record<PolicyType, string> = {
    about: 'Learn about Calculator360, our editorial accuracy standards, client-side zero-knowledge architecture, and suite of 150+ free online calculators.',
    contact: 'Contact the Calculator360 engineering and editorial team. Request custom calculators, report formula discrepancies, or submit user feedback.',
    privacy: 'Calculator360 Privacy Policy: Zero data transmission, zero server tracking, and 100% local in-browser computation. Fully AdSense & GDPR compliant.',
    terms: 'Calculator360 Terms of Service: Guidelines, educational disclaimers, and programmatic advertising policies for using our 150+ free web calculators.',
    disclaimer: 'Calculator360 Legal, Financial and Medical Disclaimer: Numerical estimations for educational use. Consult certified professionals for formal advice.'
  };

  usePageSeo({
    title: titles[type] || 'Information – Calculator360',
    description: descriptions[type] || 'Calculator360 information and policies.',
    canonicalPath: `/${type}`
  });

  return (
    <div style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '2rem 1.5rem 4rem'
    }}>
      {/* Top Header & Breadcrumb */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 0.9rem',
            fontSize: '0.85rem',
            borderRadius: '10px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Calculators</span>
        </button>

        {/* Policy Switcher Quick Tabs */}
        <nav
          aria-label="Policy Navigation"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            background: 'var(--surface-hover)',
            padding: '0.3rem',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {[
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms' },
            { id: 'disclaimer', label: 'Disclaimer' },
            { id: 'about', label: 'About Us' },
            { id: 'contact', label: 'Contact' }
          ].map(tab => {
            const isActive = type === tab.id;
            return (
              <a
                key={tab.id}
                href={`/${tab.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${tab.id}`);
                }}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: isActive ? 'var(--surface-solid)' : 'transparent',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="m3-card-elevated" style={{
        padding: '2.25rem',
        borderRadius: '20px',
        background: 'var(--surface-solid)',
        border: '1.5px solid var(--border-subtle)',
        boxShadow: '0 4px 24px -2px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Header Badge & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {type === 'privacy' && <ShieldCheck size={24} />}
            {type === 'terms' && <FileText size={24} />}
            {type === 'disclaimer' && <AlertCircle size={24} />}
            {type === 'about' && <Info size={24} />}
            {type === 'contact' && <Mail size={24} />}
          </div>

          <div>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'disclaimer' && 'Legal & Medical Disclaimer'}
              {type === 'about' && 'About Calculator360'}
              {type === 'contact' && 'Contact Us & Feedback'}
            </h1>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Updated: September 2026 • Google AdSense & International Privacy Compliant
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div style={{
          fontSize: '0.96rem',
          lineHeight: 1.75,
          color: 'var(--text-secondary)'
        }}>
          {type === 'about' && (
            <div>
              <p>
                <strong>Calculator360</strong> is an open web suite of over 150 high-precision online calculators engineered for speed, accuracy, and absolute user privacy. Whether evaluating mortgage refinance options, monitoring cardiovascular health indicators, calculating compound investment trajectories, or solving complex geometry, Calculator360 provides instant results directly in your browser.
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.6rem' }}>
                Our 3 Engineering Principles
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '1.25rem', margin: '1.25rem 0' }}>
                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-500)', marginBottom: '0.35rem' }}>1. Zero-Data Ingestion</h3>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Every single computation executes locally using client-side JavaScript. We never transmit your income, debt, date of birth, or health measurements to any remote server.</p>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.35rem' }}>2. Verified Formulas</h3>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Formulas adhere to institutional standards: WHO clinical criteria, standard compound amortization schedules, and NIST scientific conversion tables.</p>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-purple)', marginBottom: '0.35rem' }}>3. Free & Unrestricted</h3>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>Zero paywalls, zero email sign-ups, and zero intrusive forms. All 150+ calculators are 100% free and open to everyone worldwide.</p>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.6rem' }}>
                Which formulas we implement
              </h2>
              <p>
                Vague assurances about accuracy are not much use, so here is the specific list. Every
                calculator names its formula on the page, and where a recognised standard exists we
                implement that standard rather than a simplified approximation.
              </p>
              <ul style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0' }}>
                <li><strong>Metabolic rate and calories</strong> — the Mifflin-St Jeor equation, which has outperformed the older Harris-Benedict formula in validation studies.</li>
                <li><strong>Kidney function</strong> — the 2021 CKD-EPI equation, which removed the race coefficient used in earlier versions.</li>
                <li><strong>Body fat</strong> — the US Navy circumference method. Ideal weight shows Devine, Robinson, Miller and Hamwi side by side, because they disagree and the spread is the honest answer.</li>
                <li><strong>BMI</strong> — WHO classification, with the lower Asian cut-offs shown alongside, since health risk rises at a lower BMI in those populations.</li>
                <li><strong>Loans and mortgages</strong> — standard reducing-balance amortisation. Regional pages follow local convention, including semi-annual compounding for Canadian mortgages.</li>
                <li><strong>Pregnancy dating</strong> — Naegele&rsquo;s rule, with the caveat that first-trimester ultrasound is more accurate and should take precedence.</li>
                <li><strong>Strength training</strong> — both the Epley and Brzycki one-rep-max formulas, since they diverge at higher repetition counts.</li>
                <li><strong>Dates</strong> — Gregorian calendar rules including the century leap-year exception, calculated against your local date rather than UTC.</li>
                <li><strong>Unit conversion</strong> — exact defined factors, such as one inch being precisely 25.4&nbsp;mm, rather than rounded approximations that drift when chained.</li>
              </ul>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.6rem' }}>
                What these tools are not
              </h2>
              <p>
                Being clear about the limits matters more than claiming authority. These calculators
                produce estimates from the numbers you enter. They are not financial, medical, legal or
                engineering advice, and they cannot account for your individual circumstances.
              </p>
              <p>
                Health tools in particular are screening and planning aids, not diagnostics — every one
                states who it tends to be inaccurate for. Pages covering tax, stamp duty and
                jurisdiction-specific lending encode rules that governments change, so confirm current
                rates with the relevant authority before relying on a figure. For any decision with real
                consequences, check the result against a qualified professional.
              </p>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '0.6rem' }}>
                Corrections
              </h2>
              <p>
                If a calculation looks wrong, telling us is the single most useful thing you can do. Send
                the calculator name, the values you entered and the result you expected, and we will check
                the formula against its source. Content is written and maintained by the Calculator360
                editorial team; where a page implements a published standard, that standard is named on
                the page so you can verify it independently rather than take our word for it.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <p>
                We welcome bug reports, formula adjustments, and new calculator requests from mathematicians, engineers, students, contractors, and consumers.
              </p>

              <div style={{
                background: 'var(--surface-subtle)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '1.5rem',
                margin: '1.75rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>General Feedback & Formula Requests</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-500)' }}>
                    <a href="mailto:feedback@calculator360.com" style={{ color: 'inherit', textDecoration: 'none' }}>feedback@calculator360.com</a>
                  </p>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>Technical Assistance & Corrections</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-500)' }}>
                    <a href="mailto:support@calculator360.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@calculator360.com</a>
                  </p>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Our editorial team typically reviews and replies to all inquiries within 24 to 48 business hours.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div>
              <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <strong>Effective Date:</strong> September 11, 2026 • <strong>Compliance:</strong> Google AdSense Program Policies, GDPR, CCPA/CPRA, CalOPPA, COPPA
              </p>

              <p>
                At <strong>Calculator360</strong> (accessible from <a href="https://calculator360.com" style={{ color: 'var(--primary-500)' }}>https://calculator360.com</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by Calculator360 and how we use it, with particular focus on our zero-server calculation model and compliance with third-party display advertising networks including Google AdSense.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                1. 100% Client-Side In-Browser Computation Guarantee
              </h2>
              <p>
                Calculator360 is engineered as a client-side web application. All calculation algorithms—including mortgage loan amortization, salary deductions, age chronologies, BMI and body fat metrics, scientific arithmetic, and unit conversions—execute locally within your web browser using HTML5 and JavaScript.
              </p>
              <p style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
                ✓ We do NOT send, transmit, intercept, log, or store your numbers, salaries, loan terms, birth dates, or health metrics on our servers or databases.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                2. Log Files
              </h2>
              <p>
                Calculator360 follows a standard procedure of using log files through our hosting and CDN infrastructure (e.g. Cloudflare / Vercel / GitHub Pages). The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement around the website, and gathering demographic information to ensure network security and optimal server load balancing.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                3. Cookies and Web Beacons
              </h2>
              <p>
                Like any other website, Calculator360 uses 'cookies' and browser local storage. These cookies are used to store information including visitors' preferences (such as Light or Dark theme mode and your chosen world currency), and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and device capabilities.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                4. Google AdSense & DoubleClick DART Cookies
              </h2>
              <p>
                Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <a href="https://calculator360.com" style={{ color: 'var(--primary-500)' }}>www.calculator360.com</a> and other sites on the internet.
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>Google Ads Settings</a>.
                </li>
                <li>
                  Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>www.aboutads.info</a> or the Network Advertising Initiative at <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>optout.networkadvertising.org</a>.
                </li>
              </ul>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                5. Third-Party Advertising Partners & Privacy Policies
              </h2>
              <p>
                Some of the advertisers on our site may use cookies and web beacons. Our advertising partners may include:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <li><strong>Google AdSense / Google Ad Manager:</strong> <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)' }}>https://policies.google.com/technologies/ads</a></li>
              </ul>
              <p>
                These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on Calculator360, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Calculator360 has no access to or control over these cookies that are used by third-party advertisers.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                6. CCPA / CPRA Privacy Rights (Do Not Sell My Personal Information)
              </h2>
              <p>
                Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California consumers have the right to:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells or shares a consumer's personal data, not sell or share the consumer's personal data.</li>
              </ul>
              <p>
                Because Calculator360 does not collect, store, or sell user personal calculation data, we never monetize your inputs. If you make a request regarding any technical log data, we have one month to respond to you. Please contact us at <a href="mailto:privacy@calculator360.com" style={{ color: 'var(--primary-500)' }}>privacy@calculator360.com</a>.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                7. GDPR Data Protection Rights
              </h2>
              <p>
                We want to make sure you are fully aware of all of your data protection rights. Every user in the European Economic Area (EEA) and the United Kingdom is entitled to the right to access, the right to rectification, the right to erasure, the right to restrict processing, the right to object to processing, and the right to data portability. Contact our Data Protection Officer at <a href="mailto:privacy@calculator360.com" style={{ color: 'var(--primary-500)' }}>privacy@calculator360.com</a>.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                8. Children's Online Privacy Protection (COPPA Compliance)
              </h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. Calculator360 does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                9. Contact Us
              </h2>
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@calculator360.com" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>privacy@calculator360.com</a>.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <strong>Effective Date:</strong> September 11, 2026 • <strong>Publisher:</strong> Calculator360 Platform
              </p>

              <p>
                Welcome to Calculator360! By accessing and using our website (<a href="https://calculator360.com" style={{ color: 'var(--primary-500)' }}>https://calculator360.com</a>) and our suite of over 150 calculators, you accept and agree to be bound by these Terms of Service.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                1. Nature of Service & Educational Use
              </h2>
              <p>
                Calculator360 provides free, interactive web calculators designed to assist users with everyday numerical estimations across finance, health, arithmetic, construction, and conversions. All calculations are provided strictly for informational and educational purposes. No output from this site constitutes certified financial underwriting, bank sanction, formal tax filing advice, legal opinion, structural engineering approval, or clinical medical diagnosis.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                2. Advertising and Commercial Disclosures (Google AdSense Friendly)
              </h2>
              <p>
                To provide free access to all calculators without requiring mandatory paid subscriptions or gated accounts, Calculator360 displays third-party programmatic advertisements (including Google AdSense, display banners, and sponsored placements).
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>
                  Advertisements are automatically selected and served by third-party ad networks. Calculator360 does not explicitly endorse, guarantee, or underwrite any products, mortgage lenders, loan offerings, health supplements, or software advertised in these commercial banners.
                </li>
                <li>
                  Our editorial calculation algorithms are completely independent of advertiser influence. Formulas adhere strictly to established mathematical and clinical standards.
                </li>
                <li>
                  Ad placements are clearly delineated from interactive calculator input fields and controls in accordance with Google AdSense Publisher Policies to prevent accidental clicks.
                </li>
              </ul>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                3. Acceptable Use Policy
              </h2>
              <p>
                You agree to use Calculator360 only for lawful personal, professional, or educational purposes. You agree not to:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Engage in automated scraping, bot crawling, or denial-of-service activities that degrade site availability for other users.</li>
                <li>Attempt to reverse-engineer, inject malicious scripts, or manipulate advertisement delivery systems.</li>
                <li>Frame or mirror our tools on other websites without proper attribution or prior written authorization.</li>
              </ul>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                4. Intellectual Property Rights
              </h2>
              <p>
                The Calculator360 logo, branding, custom UI components, responsive layout styling, documentation, and tailored algorithmic code are the intellectual property of Calculator360. Mathematical equations and universally recognized formulas (such as the Pythagorean theorem, standard compound interest, and BMI formulas) belong to the public domain.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                5. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                Calculator360 is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. Under no circumstances shall Calculator360, its authors, or affiliates be held liable for any financial decisions, loan contracts, penalties, medical consequences, or missed calculations resulting from your use of this platform.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                6. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable internet publishing laws and international digital commerce standards.
              </p>
            </div>
          )}

          {type === 'disclaimer' && (
            <div>
              <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <strong>Comprehensive Disclaimers:</strong> Financial, Medical, Construction, Advertising & Affiliate Disclosures
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                1. FTC Advertising & Commercial Disclosure
              </h2>
              <p>
                In compliance with Federal Trade Commission (FTC) guidelines and programmatic advertising regulations:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.65rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <li>
                  Calculator360 participates in digital display advertising programs, including <strong>Google AdSense</strong>, which provides compensation to fund ongoing development, server infrastructure, and mathematical research.
                </li>
                <li>
                  The display of advertisements, sponsored links, or contextual banners on this site does not constitute an endorsement, recommendation, or warranty of the third-party goods or services advertised.
                </li>
                <li>
                  Advertisers and sponsors do not influence our calculation formulas, math models, or editorial guides.
                </li>
              </ul>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                2. Financial & Mortgage Calculations Disclaimer
              </h2>
              <p>
                All loan calculators, mortgage monthly payments (PITI), amortization tables, SIP investment forecasts, and tax tools are simulated projections based on standard mathematical equations. Actual bank loans, interest charges, points, origination fees, closing costs, and tax withholdings will vary depending on your credit score, lending institution, local tax codes, and regulatory changes. You should always consult with a licensed financial advisor, Certified Public Accountant (CPA), or certified mortgage loan officer before executing legal commitments.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                3. Health, Diet & Medical Disclaimer
              </h2>
              <p>
                Health calculators including Body Mass Index (BMI), Total Daily Energy Expenditure (TDEE), target heart rate zones, and pregnancy due dates are educational tools grounded in public statistical formulas (such as World Health Organization criteria and the Mifflin-St Jeor equation). These estimations do not consider individual medical conditions, prescription medications, body composition variations, or acute illnesses. <strong>Nothing on Calculator360 should be used as a substitute for professional medical advice, clinical diagnosis, or medical treatment.</strong> Always seek the advice of your physician with any questions regarding health conditions.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                4. Construction & Engineering Disclaimer
              </h2>
              <p>
                Calculators for concrete volume, square footage, roofing squares, gravel, and electrical voltage drops are estimated guides. On-site job requirements, material waste factors, soil settling, and local municipal building codes require certified professional review by a licensed architect, general contractor, or master electrician.
              </p>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '1.75rem', marginBottom: '0.5rem' }}>
                5. Mathematical Accuracy & Error Reporting
              </h2>
              <p>
                While our engineering team works diligently to verify algorithm integrity, Calculator360 makes no guarantee of 100% error-free operation across all browser combinations or extreme floating-point edge cases. If you discover a discrepancy, please alert our team at <a href="mailto:support@calculator360.com" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>support@calculator360.com</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
