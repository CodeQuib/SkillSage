import React from 'react';

/* No hooks used — pure inline-style hover via onMouseEnter/Leave */

const DIFFICULTY_STYLES = {
  'Beginner':     { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80', border: 'rgba(34,197,94,0.3)'   },
  'Intermediate': { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)'  },
  'Advanced':     { bg: 'rgba(239,68,68,0.12)',   color: '#f87171', border: 'rgba(239,68,68,0.3)'   },
  'Mixed':        { bg: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: 'rgba(167,139,250,0.3)' },
};

const CERT_STYLES = {
  'SPECIALIZATION':           { bg: 'rgba(99,102,241,0.15)',  color: '#a5b4fc' },
  'COURSE':                   { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8' },
  'PROFESSIONAL CERTIFICATE': { bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24' },
};

function starSVG(filled) {
  return (
    <svg
      key={filled}
      style={{ width: 14, height: 14, color: filled ? '#facc15' : '#334155', flexShrink: 0 }}
      fill="currentColor" viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }) {
  const num = parseFloat(rating) || 0;
  const stars = Math.round(num);
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => starSVG(i <= stars))}
      <span style={{ marginLeft: 6, fontSize: 13, color: '#cbd5e1', fontWeight: 700 }}>
        {num.toFixed(1)}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────── */
export default function CourseCard({ course, index }) {
  const { title, platform, rating, difficulty, certificate_type, students_enrolled, url } = course;

  const diffStyle = DIFFICULTY_STYLES[difficulty] || DIFFICULTY_STYLES['Mixed'];
  const certStyle = CERT_STYLES[certificate_type] || CERT_STYLES['COURSE'];

  const cardBase = {
    background: 'rgba(30,41,59,0.65)',
    backdropFilter: 'blur(12px)',
    border: '1.5px solid rgba(99,102,241,0.18)',
    borderRadius: 20,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: 'all 0.25s ease',
    animation: `slideUp 0.4s ease both ${(index || 0) * 0.08}s`,
  };

  /* Hover handled via ref mutation — zero hooks needed */
  function onEnter(e) {
    const el = e.currentTarget;
    el.style.transform = 'translateY(-5px)';
    el.style.border = '1.5px solid rgba(99,102,241,0.5)';
    el.style.background = 'rgba(30,41,59,0.9)';
    el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(99,102,241,0.12)';
  }
  function onLeave(e) {
    const el = e.currentTarget;
    el.style.transform = 'translateY(0)';
    el.style.border = '1.5px solid rgba(99,102,241,0.18)';
    el.style.background = 'rgba(30,41,59,0.65)';
    el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
  }

  return (
    <div style={cardBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>

      {/* Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
          padding: '4px 12px', borderRadius: 99,
          background: certStyle.bg, color: certStyle.color,
        }}>
          {certificate_type || 'COURSE'}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700,
          padding: '4px 12px', borderRadius: 99,
          background: diffStyle.bg, color: diffStyle.color,
          border: `1px solid ${diffStyle.border}`,
        }}>
          {difficulty || 'N/A'}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 15, fontWeight: 700, lineHeight: 1.5, color: '#f1f5f9',
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
        margin: 0,
      }}>
        {title}
      </h3>

      {/* Platform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'rgba(99,102,241,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg style={{ width: 17, height: 17, color: '#818cf8' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
          </svg>
        </div>
        <span style={{ fontSize: 13, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {platform}
        </span>
      </div>

      {/* Rating + students */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <StarRating rating={rating} />
        {students_enrolled && (
          <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
            </svg>
            {students_enrolled} enrolled
          </span>
        )}
      </div>

      {/* View button */}
      <div style={{ borderTop: '1px solid rgba(51,65,85,0.7)', paddingTop: 16, marginTop: 'auto' }}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 0', borderRadius: 13,
            fontSize: 14, fontWeight: 700,
            background: 'rgba(99,102,241,0.14)',
            color: '#a5b4fc',
            border: '1px solid rgba(99,102,241,0.25)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.3)'; e.currentTarget.style.color = '#c7d2fe'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)'; e.currentTarget.style.color = '#a5b4fc'; }}
        >
          View Course
          <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
