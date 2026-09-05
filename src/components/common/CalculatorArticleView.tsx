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

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  // Google Rich Snippet FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Calculator360 Scientific Editorial Board'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculator360',
      url: window.location.origin
    }
  };

  return (
    <article className="m3-article-wrapper">
      {/* Schema Injection for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header & Title Section */}
      <header className="m3-article-header">
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
            <ShieldCheck size={16} color="#146c2e" />
            <span style={{ color: '#146c2e', fontWeight: 700 }}>
              ✓ Fact-Checked & Verified
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
              <span>Updated: {article.author.lastUpdated}</span>
            </div>
          )}
        </div>
      </header>

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--md-sys-color-primary)', fontWeight: 800, fontSize: '0.95rem' }}>
                <Calculator size={18} />
                <span>{article.formulaCard.title}</span>
              </div>

              <div className="m3-formula-badge">
                {article.formulaCard.formula}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: article.formulaCard.variables ? '1rem' : 0 }}>
                {article.formulaCard.explanation}
              </p>

              {article.formulaCard.variables && article.formulaCard.variables.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Variable Definitions:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {article.formulaCard.variables.map(v => (
                      <span
                        key={v.symbol}
                        className="m3-card-filled"
                        style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem', background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)' }}
                      >
                        <strong style={{ color: 'var(--md-sys-color-primary)', fontFamily: 'var(--font-mono)' }}>{v.symbol}:</strong>{' '}
                        {v.meaning}
                      </span>
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
              <CheckCircle2 size={22} color="var(--md-sys-color-primary)" />
              <span>{article.howToSteps.title}</span>
            </h3>

            <div className="m3-steps-grid">
              {article.howToSteps.steps.map(step => (
                <div key={step.stepNumber} className="m3-step-card">
                  <div className="m3-step-badge">{step.stepNumber}</div>
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--md-sys-color-primary)' }}>
                  Case Study Walkthrough
                </span>
                <span className="glass-pill" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                  Real-World Calculation
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
                {article.workedExample.title}
              </h4>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {article.workedExample.scenario}
              </p>

              {/* Given Inputs */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {article.workedExample.inputs.map(inp => (
                  <div
                    key={inp.label}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--md-sys-shape-xs)',
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.8rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{inp.label}:</span>{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>{inp.value}</strong>
                  </div>
                ))}
              </div>

              {/* Step by step calculation */}
              <div style={{ marginBottom: '1.25rem' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  Calculation Steps:
                </strong>
                <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: 0 }}>
                  {article.workedExample.steps.map((st, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {st}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Result Pill */}
              <div style={{
                padding: '0.85rem 1.15rem',
                borderRadius: 'var(--md-sys-shape-md)',
                background: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-on-primary-container)',
                fontWeight: 800,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle2 size={18} />
                <span>Result: {article.workedExample.result}</span>
              </div>

              {article.workedExample.takeaway && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0 }}>
                  💡 {article.workedExample.takeaway}
                </p>
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
                  {section.callout.type === 'tip' && <Lightbulb size={17} />}
                  {section.callout.type === 'warning' && <AlertTriangle size={17} />}
                  {section.callout.type === 'info' && <Info size={17} />}
                  <span>{section.callout.title}</span>
                </div>
                <div className="m3-callout-text">{section.callout.text}</div>
              </div>
            )}

            {section.bullets && (
              <ul style={{ paddingLeft: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                {section.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
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
            <HelpCircle size={22} color="var(--md-sys-color-primary)" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
            {article.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="m3-faq-card">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="m3-faq-trigger"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--md-sys-color-primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
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
