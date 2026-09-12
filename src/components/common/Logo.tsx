import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  onClick,
  className = ''
}) => {
  // Size configurations
  const config = {
    sm: {
      iconSize: 28,
      fontSize: '1.05rem',
      badgeFontSize: '0.825rem',
      badgePadding: '0.12rem 0.4rem',
      subtitleSize: '0.65rem',
      gap: '0.5rem'
    },
    md: {
      iconSize: 36,
      fontSize: '1.3rem',
      badgeFontSize: '0.95rem',
      badgePadding: '0.15rem 0.45rem',
      subtitleSize: '0.72rem',
      gap: '0.65rem'
    },
    lg: {
      iconSize: 44,
      fontSize: '1.65rem',
      badgeFontSize: '1.15rem',
      badgePadding: '0.2rem 0.55rem',
      subtitleSize: '0.8rem',
      gap: '0.85rem'
    }
  }[size];

  return (
    <div
      onClick={onClick}
      className={`calculator360-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: config.gap,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        textDecoration: 'none'
      }}
      role={onClick ? 'button' : undefined}
      aria-label="Calculator360"
    >
      {/* Precision Geometric Emblem (Pure SVG - No raster images) */}
      <div
        style={{
          width: `${config.iconSize}px`,
          height: `${config.iconSize}px`,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0b57d0 0%, #1a73e8 50%, #00639b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(11, 87, 208, 0.25)',
          position: 'relative'
        }}
      >
        <svg
          width={config.iconSize * 0.62}
          height={config.iconSize * 0.62}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer 360° Orbital Compass Arc */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="45 15"
            opacity="0.95"
          />
          {/* Internal Minimal Calculation Operators (+ & =) */}
          <path
            d="M8 12H16M12 8V16"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="logo-wordmark" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: config.fontSize,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)'
            }}
          >
            Calculator
          </span>

          {/* 360 High-Contrast Material Badge with 360° Degree Mark */}
          <span
            className="logo-degree-badge"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: config.badgeFontSize,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              background: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              padding: config.badgePadding,
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 1px 3px rgba(11, 87, 208, 0.2)',
              marginLeft: '0.15rem'
            }}
          >
            360
            <span
              style={{
                fontSize: '0.75em',
                fontWeight: 900,
                marginLeft: '1px',
                transform: 'translateY(-2px)',
                display: 'inline-block'
              }}
            >
              °
            </span>
          </span>
        </div>

        {showSubtitle && (
          <span
            className="logo-tagline-desktop"
            style={{
              fontSize: config.subtitleSize,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginTop: '0.25rem',
              whiteSpace: 'nowrap'
            }}
          >
            All-Around Online Calculators
          </span>
        )}
      </div>
    </div>
  );
};
