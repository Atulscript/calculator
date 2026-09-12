import React, { useRef, useState } from 'react';
import { AgeCalculationResult } from '../../../types/age';
import { formatFriendlyDate, formatNumber } from '../../../utils/dateUtils';
import { X, Download, Share2, Check, Calculator } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AgeCalculationResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, result }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}${window.location.pathname}?dob=${result.birthDate.toISOString().split('T')[0]}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.98, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `Age-Certificate-${result.exactAge.years}yrs.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--surface-solid)',
          padding: '1.75rem',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Share Your Age Milestone Card
        </h3>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Download an official summary badge or share your calculation link with friends.
        </p>

        {/* Printable / Downloadable Card Node */}
        <div
          ref={cardRef}
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '1.5rem'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calculator size={18} color="#fff" />
              </div>
              <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.1rem' }}>
                Calculator360
              </span>
            </div>

            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.25)'
            }}>
              OFFICIAL AGE BADGE
            </div>
          </div>

          {/* Big Age */}
          <div style={{ textAlign: 'center', margin: '1.25rem 0' }}>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>
              Exact Age
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '3.2rem',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em'
            }}>
              {result.exactAge.years} Years
            </div>
            <div style={{ fontSize: '1.15rem', opacity: 0.95, marginTop: '0.25rem' }}>
              {result.exactAge.months} Months & {result.exactAge.days} Days
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.18)',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.5rem',
            textAlign: 'center',
            fontSize: '0.8rem'
          }}>
            <div>
              <div style={{ opacity: 0.8, fontSize: '0.7rem' }}>Total Days</div>
              <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{formatNumber(result.totals.totalDays)}</div>
            </div>
            <div>
              <div style={{ opacity: 0.8, fontSize: '0.7rem' }}>Zodiac</div>
              <div style={{ fontWeight: 700 }}>{result.zodiac.western.sign}</div>
            </div>
            <div>
              <div style={{ opacity: 0.8, fontSize: '0.7rem' }}>Birth Day</div>
              <div style={{ fontWeight: 700 }}>{result.dayOfWeekBorn}</div>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            opacity: 0.75,
            marginTop: '1.25rem'
          }}>
            Born on {formatFriendlyDate(result.birthDate)} • Generated via calculator360.com
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={downloadImage}
            disabled={isExporting}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            <Download size={16} />
            <span>{isExporting ? 'Generating Image...' : 'Download Card (PNG)'}</span>
          </button>

          <button
            onClick={copyLink}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            {isCopied ? <Check size={16} color="var(--accent-emerald)" /> : <Share2 size={16} />}
            <span>{isCopied ? 'Link Copied!' : 'Copy Share URL'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
