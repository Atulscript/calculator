import React from 'react';
import { ChevronRight, Home, ArrowRight, Info, Star } from 'lucide-react';
import { AdBanner } from '../components/common/AdBanner';
import { getHubBySlug, resolveCalculators, CATEGORY_HUBS } from '../data/categoryHubs';

interface CategoryHubPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const CategoryHubPage: React.FC<CategoryHubPageProps> = ({ slug, onNavigate }) => {
  const hub = getHubBySlug(slug);
  if (!hub) return null;

  const flagships = resolveCalculators(hub.flagshipSlugs);
  const totalTools = hub.groups.reduce((n, g) => n + g.slugs.length, 0);
  const relatedHubs = hub.relatedHubs
    .map(s => CATEGORY_HUBS.find(h => h.slug === s))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '1rem 1rem 3rem' }}>
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem'
        }}
      >
        <button
          onClick={() => onNavigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontWeight: 500,
            padding: 0
          }}
        >
          <Home size={14} />
          <span>Calculators</span>
        </button>
        <ChevronRight size={13} />
        <span style={{ fontWeight: 600, color: 'var(--primary-500)' }}>{hub.name}</span>
      </nav>

      <header style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: 'clamp(1.85rem, 4vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            lineHeight: 1.15,
            marginBottom: '0.35rem'
          }}
        >
          {hub.h1}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1rem' }}>
          {totalTools} calculators
        </p>
        {hub.intro.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '760px',
              marginBottom: '0.85rem'
            }}
          >
            {p}
          </p>
        ))}
      </header>

      {hub.notice && (
        <div
          className="m3-callout-card warning"
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginTop: 0 }}
        >
          <Info size={18} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{hub.notice}</p>
        </div>
      )}

      {flagships.length > 0 && (
        <section style={{ marginBottom: '2.75rem' }} aria-labelledby="hub-popular">
          <h2
            id="hub-popular"
            style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Star size={18} color="var(--md-sys-color-primary)" />
            Most used
          </h2>
          <div className="category-cards-grid">
            {flagships.map(calc => (
              <button
                key={calc.slug}
                onClick={() => onNavigate(`/${calc.slug}`)}
                className="m3-card-elevated"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem',
                  font: 'inherit'
                }}
              >
                <span style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {calc.title}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {calc.shortDescription}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <AdBanner slotType="leaderboard" />

      {hub.groups.map(group => {
        const tools = resolveCalculators(group.slugs);
        if (!tools.length) return null;
        const groupId = group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <section key={group.title} style={{ marginBottom: '2.75rem' }} aria-labelledby={groupId}>
            <h2
              id={groupId}
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: group.blurb ? '0.3rem' : '1rem',
                letterSpacing: '-0.015em'
              }}
            >
              {group.title}
            </h2>
            {group.blurb && (
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem',
                  maxWidth: '680px',
                  lineHeight: 1.6
                }}
              >
                {group.blurb}
              </p>
            )}

            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                gap: '0.6rem'
              }}
            >
              {tools.map(calc => (
                <li key={calc.slug}>
                  <a
                    href={`/${calc.slug}`}
                    onClick={e => {
                      e.preventDefault();
                      onNavigate(`/${calc.slug}`);
                    }}
                    className="hub-tool-link"
                  >
                    <span className="hub-tool-text">
                      <span className="hub-tool-title">{calc.title}</span>
                      <span className="hub-tool-desc">{calc.shortDescription}</span>
                    </span>
                    <ArrowRight size={15} className="hub-tool-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {hub.closing && (
        <section className="m3-card-elevated" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}
          >
            {hub.closing.title}
          </h2>
          {hub.closing.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '0.85rem'
              }}
            >
              {p}
            </p>
          ))}
        </section>
      )}

      {hub.faqs && hub.faqs.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }} aria-labelledby="hub-faq">
          <h2
            id="hub-faq"
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              letterSpacing: '-0.015em'
            }}
          >
            Common questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hub.faqs.map(faq => (
              <details key={faq.question} className="m3-card-filled hub-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedHubs.length > 0 && (
        <section aria-labelledby="hub-related">
          <h2
            id="hub-related"
            style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}
          >
            Other calculator categories
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {relatedHubs.map(rh => (
              <a
                key={rh.slug}
                href={`/${rh.slug}`}
                onClick={e => {
                  e.preventDefault();
                  onNavigate(`/${rh.slug}`);
                }}
                className="m3-chip"
                style={{ textDecoration: 'none' }}
              >
                {rh.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
