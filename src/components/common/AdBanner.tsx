import React, { useEffect } from 'react';

export type AdSlotType = 'leaderboard' | 'rectangle' | 'skyscraper' | 'in-feed';

interface AdBannerProps {
  slotType: AdSlotType;
  className?: string;
  adClient?: string;
  adSlotId?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotType,
  className = '',
  adClient,
  adSlotId
}) => {
  const effectiveClient = adClient || (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (!effectiveClient) return;

    // Dynamically ensure Google AdSense script is present
    const scriptId = 'google-adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${effectiveClient}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    try {
      if (typeof window !== 'undefined' && adSlotId) {
        // @ts-expect-error - adsbygoogle is loaded via external Google script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn('AdSense push error:', e);
    }
  }, [effectiveClient, adSlotId]);

  // If no AdSense client is configured and we are in production, don't show empty dummy boxes to AdSense crawlers
  if (!effectiveClient && !isDev) {
    return null;
  }

  const getDimensions = () => {
    switch (slotType) {
      case 'leaderboard':
        return { minHeight: '90px', maxWidth: '728px', width: '100%' };
      case 'rectangle':
        return { minHeight: '250px', maxWidth: '336px', width: '100%' };
      case 'skyscraper':
        return { minHeight: '600px', maxWidth: '300px', width: '100%' };
      case 'in-feed':
        return { minHeight: '100px', maxWidth: '100%', width: '100%' };
      default:
        return { minHeight: '90px', width: '100%' };
    }
  };

  const dim = getDimensions();

  return (
    <aside
      aria-label="Advertisement"
      className={`ad-container ${className}`}
      style={{
        margin: '1.5rem auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}
    >
      <div style={{
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '0.35rem',
        fontWeight: 600
      }}>
        Advertisement
      </div>

      <div
        className="ad-box-placeholder"
        style={{
          ...dim,
          background: 'var(--surface-subtle)',
          border: effectiveClient ? 'none' : '1px dashed var(--border-subtle)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: effectiveClient ? '0' : '1rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.2s ease'
        }}
      >
        {effectiveClient && adSlotId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={effectiveClient}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Display Ad Slot (Development Preview)</span>
            <span>
              {slotType === 'leaderboard' && 'Leaderboard (728x90 / Responsive)'}
              {slotType === 'rectangle' && 'Medium Rectangle (300x250)'}
              {slotType === 'skyscraper' && 'Sticky Skyscraper (300x600)'}
              {slotType === 'in-feed' && 'In-Feed Responsive Banner'}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
