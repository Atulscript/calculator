import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, AlertCircle, Info, Mail } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="m3-card-elevated"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-solid)',
          borderRadius: 'var(--md-sys-shape-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {type === 'privacy' && <ShieldCheck size={22} color="var(--accent-emerald)" />}
            {type === 'terms' && <FileText size={22} color="var(--primary-600)" />}
            {type === 'disclaimer' && <AlertCircle size={22} color="#f59e0b" />}
            {type === 'about' && <Info size={22} color="var(--primary-500)" />}
            {type === 'contact' && <Mail size={22} color="var(--primary-500)" />}

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'disclaimer' && 'Legal & Medical Disclaimer'}
              {type === 'about' && 'About Calculator360'}
              {type === 'contact' && 'Contact Us & Feedback'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '0.35rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65
        }}>
          {type === 'privacy' && (
            <div>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <strong>Effective Date:</strong> September 11, 2026 • <strong>Compliance:</strong> Google AdSense Policies, GDPR, CCPA/CPRA, COPPA
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>1. 100% Client-Side Privacy Guarantee</h4>
              <p>
                At Calculator360, every calculation executes locally inside your web browser using HTML5 and client-side JavaScript. We do not transmit, log, store, or sell any salaries, loan balances, birth dates, or health measurements you enter.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>2. Google AdSense & DoubleClick DART Cookies</h4>
              <p>
                Google is a third-party vendor on our site. Google uses cookies, known as DART cookies, to serve ads to our visitors based upon their visit to our website and other sites across the internet.
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                <li>Third-party vendors, including Google, use cookies to serve ads based on prior visits.</li>
                <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>Google Ads Settings</a>.</li>
                <li>Alternatively, you can opt out through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>www.aboutads.info</a> or <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-500)', textDecoration: 'underline' }}>optout.networkadvertising.org</a>.</li>
              </ul>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>3. Log Files & Cookies</h4>
              <p>
                We use standard technical log files (IP addresses, browser type, ISP, timestamps) for CDN load balancing and site security. Local storage is used strictly to remember your chosen theme (Dark/Light) and currency preference.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>4. CCPA/CPRA & GDPR Data Rights</h4>
              <p>
                We do not sell personal calculation information. European and California residents retain full statutory rights regarding data access, deletion, and opt-outs. For inquiries, email <a href="mailto:privacy@calculator360.com" style={{ color: 'var(--primary-500)' }}>privacy@calculator360.com</a>.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>5. COPPA (Children's Privacy)</h4>
              <p>
                Calculator360 is not directed to children under 13 and does not knowingly collect personal data from minors.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <strong>Effective Date:</strong> September 11, 2026 • <strong>Platform Terms</strong>
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>1. Educational & Estimation Nature</h4>
              <p>
                All 150+ calculators are provided free of charge for informational and educational estimation purposes only. Output values do not constitute formal lending agreements, tax filings, legal counsel, or medical prescriptions.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>2. Display Advertising Disclosures (AdSense Compliant)</h4>
              <p>
                To maintain free access, Calculator360 displays third-party programmatic advertisements (such as Google AdSense). Ads are clearly segregated from calculator calculation controls in accordance with Google Publisher Policies. Advertising content does not constitute endorsement by Calculator360.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>3. Acceptable Use</h4>
              <p>
                Users agree not to scrape, reverse-engineer, disrupt server availability, or inject malicious code into the platform.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>4. Limitation of Liability</h4>
              <p>
                Calculator360 is provided on an "AS IS" basis. The platform is not liable for financial, tax, or health decisions made based on estimations.
              </p>
            </div>
          )}

          {type === 'disclaimer' && (
            <div>
              <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <strong>Comprehensive Disclaimers:</strong> Financial, Medical, Construction & Advertising
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>1. FTC Advertising Disclosure</h4>
              <p>
                Calculator360 is funded through digital display advertising programs including <strong>Google AdSense</strong>. Third-party advertising partners serve commercial banners that help keep all tools 100% free. Advertising relationships have zero influence on our calculation models or formulas.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>2. Financial & Mortgage Disclaimer</h4>
              <p>
                Mortgage, loan, EMI, and investment figures are simulated projections. Real-world interest compounding, points, property taxes, insurance, and lender fees vary. Consult a certified financial advisor or mortgage broker before signing binding documents.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>3. Medical & Health Disclaimer</h4>
              <p>
                BMI, caloric goals, and cardio metrics are statistical population estimates based on WHO and scientific research. They do not replace personalized diagnosis, medical advice, or clinical evaluations by licensed healthcare professionals.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>4. Construction & Engineering Disclaimer</h4>
              <p>
                Estimations for concrete, square footage, roofing squares, and electrical voltage drops are guidelines. Always verify with licensed contractors and municipal building codes.
              </p>
            </div>
          )}

          {type === 'about' && (
            <div>
              <p style={{ marginBottom: '1rem' }}>
                <strong>Calculator360 — Precision Mathematics for Everyday Life</strong>
              </p>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>1. Our Core Mission</h4>
              <p>
                Calculator360 was built to replace bloated, ad-cluttered, and privacy-invasive calculator tools with high-speed, 100% private, client-side precision software. We offer over 150 verified calculators spanning personal finance, health biomarkers, construction estimations, mathematical geometry, and everyday life.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>2. Rigorous Verification & Editorial Integrity</h4>
              <p>
                Every algorithm on Calculator360 is audited against peer-reviewed formulas and institutional benchmarks:
              </p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li><strong>Financial Models:</strong> Standard amortization schedules, compound frequency compounding, and real APR physics.</li>
                <li><strong>Clinical Health:</strong> World Health Organization (WHO) BMI classifications, Mifflin-St Jeor BMR, and Katch-McArdle metabolic calculations.</li>
                <li><strong>Time & Astronomy:</strong> Astronomical leap-second rules, Gregorian calendar norms, and planetary orbit ratios.</li>
                <li><strong>Conversions:</strong> Exact NIST (National Institute of Standards and Technology) conversion factors.</li>
              </ul>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1rem 0 0.4rem' }}>3. Zero-Knowledge Architecture</h4>
              <p>
                Unlike conventional financial platforms, Calculator360 never requires an account, email sign-up, or cloud synchronization. Your financial salaries, loan debt, birth dates, and weight metrics never leave your computer or phone.
              </p>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <p style={{ marginBottom: '1rem' }}>
                <strong>We'd Love to Hear From You</strong>
              </p>
              <p>
                Have a suggestion for a new calculator? Found a rounding anomaly? Need a specialized formula for your trade or business? Our engineering and editorial team reviews every message.
              </p>

              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, margin: '1.25rem 0 0.4rem' }}>Direct Inquiries</h4>
              <div style={{
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                margin: '0.75rem 0 1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>Formula Suggestions & General Feedback</span>
                  <div style={{ fontWeight: 700, color: 'var(--primary-500)', fontSize: '0.95rem' }}>
                    <a href="mailto:feedback@calculator360.com" style={{ color: 'inherit', textDecoration: 'none' }}>feedback@calculator360.com</a>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>Technical Support & Bug Reports</span>
                  <div style={{ fontWeight: 700, color: 'var(--primary-500)', fontSize: '0.95rem' }}>
                    <a href="mailto:support@calculator360.com" style={{ color: 'inherit', textDecoration: 'none' }}>support@calculator360.com</a>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ⚡ We typically review and respond to feedback and formula requests within 24–48 business hours.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--surface-subtle)'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
