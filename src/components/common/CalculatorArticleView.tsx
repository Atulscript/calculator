import React, { useState } from 'react';
import { CalculatorArticle } from '../../types/article';
import { getCalculatorArticle } from '../../data/calculatorArticles';
import {
  BookOpen,
  HelpCircle,
  Calculator,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  Info,
  Bookmark,
  ExternalLink
} from 'lucide-react';

interface CalculatorArticleViewProps {
  calculatorId: string;
  calculatorName?: string;
  categoryName?: string;
  customArticle?: CalculatorArticle;
}

export const CalculatorArticleView: React.FC<CalculatorArticleViewProps> = ({
  calculatorId,
  calculatorName = 'Calculator',
  categoryName = 'Utility',
  customArticle
}) => {
  const article: CalculatorArticle =
    customArticle || getCalculatorArticle(calculatorId, calculatorName, categoryName);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedFormula, setCopiedFormula] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const handleCopyFormula = (formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  // Structured data for this page is emitted centrally by
  // seoRegistry.updateDocumentSeo(), which already includes Article, FAQPage
  // and HowTo. Emitting a second graph here produced duplicate @ids, two
  // WebApplication entities and a breadcrumb pointing at a non-existent hub.

  return (
    <article className="m3-article-wrapper">
      {/* Header & Title Section */}
      <header className="m3-article-header">
        <div className="m3-article-eyebrow">
          <BookOpen size={13} />
          <span>Scientific Guide & Reference</span>
        </div>

        <h2 className="m3-article-title">{article.title}</h2>
        <p className="m3-article-subtitle">{article.subtitle}</p>

        {/* Editorial Trust & Verification Meta Bar */}
        <div className="m3-article-meta-bar">
          <div className="m3-meta-item">
            <UserCheck size={16} color="var(--md-sys-color-primary)" />
            <span>
              Author: <strong>{article.author?.name || 'Calculator360 Editorial Team'}</strong>
              {article.author?.role && ` (${article.author.role})`}
            </span>
          </div>

          <div className="m3-meta-item">
            <ShieldCheck size={16} color="var(--accent-emerald)" />
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
              Formula &amp; sources shown
            </span>
          </div>

          {article.readTimeMinutes && (
            <div className="m3-meta-item">
              <Clock size={15} color="var(--text-muted)" />
              <span>{article.readTimeMinutes} min read</span>
            </div>
          )}

          {article.author?.lastUpdated && (
            <div className="m3-meta-item">
              <span>Updated: <strong>{article.author.lastUpdated}</strong></span>
            </div>
          )}
        </div>
      </header>

      {/* YMYL Regulatory / Medical / Financial Disclaimer */}
      {article.disclaimer && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.85rem',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--md-sys-shape-corner-medium, 12px)',
          background: 'color-mix(in srgb, var(--accent-amber, #b45309) 12%, transparent)',
          border: '1.5px solid color-mix(in srgb, var(--accent-amber, #b45309) 35%, transparent)',
          margin: '1.25rem 0 1.75rem 0'
        }}>
          <AlertTriangle size={20} color="var(--accent-amber, #b45309)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>
              Important Disclaimer
            </strong>
            {article.disclaimer}
          </div>
        </div>
      )}

      {/* Quick Jump Table of Contents Pills */}
      <nav className="m3-toc-scroll-bar" aria-label="Table of contents">
        <a href="#overview" className="m3-toc-pill">
          <BookOpen size={14} />
          <span>Overview</span>
        </a>
        {article.formulaCard && (
          <a href="#formula" className="m3-toc-pill">
            <Calculator size={14} />
            <span>Formula</span>
          </a>
        )}
        {article.howToSteps && (
          <a href="#how-to-use" className="m3-toc-pill">
            <CheckCircle2 size={14} />
            <span>How to Use</span>
          </a>
        )}
        {article.workedExample && (
          <a href="#worked-example" className="m3-toc-pill">
            <Bookmark size={14} />
            <span>Worked Example</span>
          </a>
        )}
        {article.sections?.map(sec => (
          <a key={sec.id} href={`#${sec.id}`} className="m3-toc-pill">
            <span>{sec.title}</span>
          </a>
        ))}
        <a href="#faqs" className="m3-toc-pill">
          <HelpCircle size={14} />
          <span>FAQs</span>
        </a>
      </nav>

      {/* Article Body Content */}
      <div className="m3-article-body">
        {/* 1. Overview */}
        <section id="overview">
          {article.overview.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </section>

        {/* 2. Formula Showcase Card */}
        {article.formulaCard && (
          <section id="formula">
            <div className="m3-formula-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--md-sys-color-primary)', fontWeight: 800, fontSize: '1rem' }}>
                  <Calculator size={20} />
                  <span>{article.formulaCard.title}</span>
                </div>

                <button
                  type="button"
                  onClick={() => article.formulaCard && handleCopyFormula(article.formulaCard.formula)}
                  className="glass-pill"
                  style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  title="Copy Formula"
                >
                  {copiedFormula ? <CheckCircle2 size={13} color="var(--accent-emerald)" /> : <Bookmark size={13} />}
                  <span>{copiedFormula ? '✓ Copied Formula' : 'Copy Formula'}</span>
                </button>
              </div>

              <div className="m3-formula-badge">
                {article.formulaCard.formula}
              </div>

              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: article.formulaCard.variables ? '1.25rem' : 0 }}>
                {article.formulaCard.explanation}
              </p>

              {article.formulaCard.variables && article.formulaCard.variables.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.15rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                    Variable Definitions:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '0.65rem' }}>
                    {article.formulaCard.variables.map(v => (
                      <div
                        key={v.symbol}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          flexWrap: 'wrap',
                          gap: '0.6rem',
                          padding: '0.55rem 0.85rem',
                          borderRadius: '10px',
                          background: 'var(--surface-subtle)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.86rem',
                          lineHeight: 1.5
                        }}
                      >
                        <span style={{
                          padding: '0.15rem 0.45rem',
                          borderRadius: '6px',
                          background: 'var(--md-sys-color-primary-container)',
                          color: 'var(--md-sys-color-primary)',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          flexShrink: 0,
                          maxWidth: '100%',
                          overflowWrap: 'anywhere'
                        }}>
                          {v.symbol}
                        </span>
                        <span style={{ color: 'var(--text-secondary)', minWidth: 0, flex: '1 1 8rem' }}>
                          {v.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. Step-by-Step Instructions */}
        {article.howToSteps && (
          <section id="how-to-use">
            <h3 className="m3-article-h2">
              <CheckCircle2 size={24} color="var(--md-sys-color-primary)" />
              <span>{article.howToSteps.title}</span>
            </h3>

            <div className="m3-steps-grid">
              {article.howToSteps.steps.map(step => (
                <div key={step.stepNumber} className="m3-step-card">
                  <div className="m3-step-badge">
                    Step 0{step.stepNumber}
                  </div>
                  <div className="m3-step-title">{step.title}</div>
                  <div className="m3-step-desc">{step.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Worked Practical Example */}
        {article.workedExample && (
          <section id="worked-example">
            <div className="m3-example-box">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-sys-color-primary)' }}>
                  Case Study Walkthrough
                </span>
                <span className="glass-pill" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                  Real-World Calculation
                </span>
              </div>

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.015em' }}>
                {article.workedExample.title}
              </h4>

              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {article.workedExample.scenario}
              </p>

              {/* Given Inputs Table / Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                background: 'var(--surface-subtle)',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)'
              }}>
                {article.workedExample.inputs.map(inp => (
                  <div key={inp.label}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {inp.label}
                    </div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {inp.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step by step calculation */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                  Stepped Mathematical Execution:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {article.workedExample.steps.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '12px',
                        background: 'var(--surface-subtle)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--md-sys-color-primary-container)',
                        color: 'var(--md-sys-color-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        flexShrink: 0,
                        marginTop: '0.15rem'
                      }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.65, minWidth: 0, overflowWrap: 'anywhere' }}>
                        {st}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Banner */}
              <div style={{
                padding: '1.15rem 1.4rem',
                borderRadius: '14px',
                background: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-on-primary-container)',
                fontWeight: 800,
                fontSize: '1.05rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
              }}>
                <CheckCircle2 size={22} color="var(--md-sys-color-primary)" />
                <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>Calculated Result: <strong>{article.workedExample.result}</strong></span>
              </div>

              {article.workedExample.takeaway && (
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  marginTop: '1rem',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'var(--text-primary)'
                }}>
                  <Lightbulb size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong style={{ color: 'var(--accent-emerald)' }}>Key Insight: </strong>
                    {article.workedExample.takeaway}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Custom Thematic Sections */}
        {article.sections?.map(section => (
          <section key={section.id} id={section.id}>
            <h3 className="m3-article-h2">{section.title}</h3>

            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {section.callout && (
              <div className={`m3-callout-card ${section.callout.type}`}>
                <div className="m3-callout-title">
                  {section.callout.type === 'tip' && <Lightbulb size={18} />}
                  {section.callout.type === 'warning' && <AlertTriangle size={18} />}
                  {section.callout.type === 'info' && <Info size={18} />}
                  <span>{section.callout.title}</span>
                </div>
                <div className="m3-callout-text">{section.callout.text}</div>
              </div>
            )}

            {section.bullets && (
              <ul style={{ paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                {section.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* 6. Frequently Asked Questions (FAQ) Accordion */}
        <section id="faqs">
          <h3 className="m3-article-h2">
            <HelpCircle size={24} color="var(--md-sys-color-primary)" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div style={{ marginTop: '1.25rem', marginBottom: '2.5rem' }}>
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`m3-faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="m3-faq-trigger"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={20} color="var(--md-sys-color-primary)" />
                    ) : (
                      <ChevronDown size={20} color="var(--text-muted)" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="m3-faq-content">
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Authoritative References & Citations */}
        {article.references && article.references.length > 0 && (
          <footer style={{
            marginTop: '2.5rem',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--md-sys-shape-md)',
            background: 'var(--surface-subtle)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.825rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              References & Scientific Standards
            </div>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {article.references.map((ref, idx) => (
                <li key={idx}>
                  <strong>{ref.title}</strong> — {ref.source}
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--md-sys-color-primary)', marginLeft: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </article>
  );
};
