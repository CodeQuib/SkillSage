import React from 'react';

const DEMO_SKILLS = ['Machine Learning', 'Web Development', 'Data Science', 'Python', 'AI', 'Digital Marketing', 'Cloud Computing', 'UX Design'];
const STATS = [
  { label: 'Courses Indexed', value: '892+' },
  { label: 'Top Platforms', value: '50+' },
  { label: 'Topics Covered', value: '200+' },
  { label: 'AI Accuracy', value: '~95%' },
];

/* Landing page as class component too, for consistency */
class LandingPage extends React.Component {
  goTo(prefill) {
    if (prefill) {
      /* Push state so RecommendPage can read it via window.history.state */
      window.history.pushState({ usr: { prefill } }, '', '/recommend');
    } else {
      window.history.pushState({}, '', '/recommend');
    }
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        {/* Background glows */}
        <div style={{ position: 'fixed', top: '-150px', left: '-100px', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0, animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'fixed', top: '25%', right: '-150px', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0, animation: 'float 10s ease-in-out infinite 2s' }} />
        <div style={{ position: 'fixed', bottom: '-100px', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0, animation: 'float 12s ease-in-out infinite 4s' }} />

        {/* ── Navbar ── */}
        <nav style={{ position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(51,65,85,0.4)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 8px 20px rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg style={{ width: 22, height: 22, color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <span style={{ fontWeight: 900, fontSize: 22, color: '#f1f5f9', letterSpacing: '-0.03em' }}>SkillSage</span>
            </div>
            <button
              onClick={() => this.goTo()}
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 12, padding: '10px 22px', color: '#a5b4fc', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#c7d2fe'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.color = '#a5b4fc'; }}
            >
              Try Now →
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '80px 48px 60px', textAlign: 'center' }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 99, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', marginBottom: 44 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#a5b4fc', letterSpacing: '0.01em' }}>AI-Powered · Content-Based Recommendations</span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 32, color: '#f1f5f9' }}>
              Your{' '}
              <span className="gradient-text">Smart Guide</span>
              <br />
              to Learning
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: '#94a3b8', maxWidth: 680, margin: '0 auto 52px', lineHeight: 1.7 }}>
              Tell us your interests or career goals and our AI will instantly surface the most relevant courses from{' '}
              <strong style={{ color: '#e2e8f0', fontWeight: 700 }}>900+ offerings</strong> — tailored just for you.
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginBottom: 60 }}>
              <button
                onClick={() => this.goTo()}
                style={{
                  padding: '20px 48px',
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  color: 'white', fontWeight: 800, fontSize: 18,
                  border: 'none', borderRadius: 18, cursor: 'pointer',
                  boxShadow: '0 12px 36px rgba(99,102,241,0.45)',
                  display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'all 0.2s',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(99,102,241,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(99,102,241,0.45)'; }}
              >
                Get AI Recommendations
                <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <span style={{ color: '#475569', fontSize: 14, fontWeight: 500 }}>Free · No sign up required</span>
            </div>

            {/* Popular searches */}
            <div>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', fontWeight: 700, marginBottom: 16 }}>
                Popular searches
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                {DEMO_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => this.goTo(skill)}
                    style={{
                      padding: '10px 24px',
                      background: 'rgba(30,41,59,0.7)',
                      border: '1px solid rgba(99,102,241,0.18)',
                      borderRadius: 99, color: '#94a3b8', fontSize: 14, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'; e.currentTarget.style.background = 'rgba(30,41,59,0.7)'; }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── Stats ── */}
        <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(51,65,85,0.5)', padding: '40px 48px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
            {STATS.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 36, fontWeight: 900, background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 40%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</span>
                <span style={{ fontSize: 12, color: '#475569', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </footer>
      </div>
    );
  }
}

export default LandingPage;
