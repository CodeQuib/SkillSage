import React from 'react';
import CourseCard from '../components/CourseCard';
import { getRecommendations } from '../api/recommend.js';

const SUGGESTIONS = [
  'Machine Learning', 'Python Programming', 'Data Science',
  'Web Development', 'Digital Marketing', 'Cloud Computing',
  'Deep Learning', 'UX Design', 'Finance', 'Cybersecurity',
];

/* ─── Spinner ─────────────────────────────────────────────── */
function Spinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '80px 0' }}>
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '4px solid #1e3a5f',
        }} />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#6366f1',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 10, borderRadius: '50%',
          border: '4px solid transparent',
          borderTopColor: '#22c55e',
          animation: 'spin 0.6s linear infinite reverse',
        }} />
      </div>
      <p style={{ color: '#94a3b8', fontSize: 15, fontWeight: 500 }}>
        Analyzing your interests with AI…
      </p>
    </div>
  );
}

/* ─── RecommendPage as class component – avoids ALL hook issues ─ */
class RecommendPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      courses: [],
      loading: false,
      error: '',
      hasSearched: false,
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    /* Check if prefill was passed via history state */
    try {
      const nav = window.history.state;
      const prefill = nav && nav.usr && nav.usr.prefill;
      if (prefill) {
        this.setState({ query: prefill }, () => this.runSearch(prefill));
      }
    } catch (_) {}
  }

  async runSearch(q) {
    const trimmed = (q || '').trim();
    if (!trimmed) {
      this.setState({ error: 'Please enter a skill, interest, or career goal.' });
      return;
    }
    this.setState({ error: '', loading: true, hasSearched: true, courses: [] });
    try {
      const results = await getRecommendations(trimmed);
      this.setState({ courses: results, loading: false });
    } catch (err) {
      const msg = (err.response && err.response.data && err.response.data.error)
        ? err.response.data.error
        : err.message || 'Something went wrong.';
      const friendly = (msg.includes('ECONNREFUSED') || msg.includes('Network') || msg.includes('unavailable'))
        ? '⚠️ Cannot reach the server. Make sure all 3 services are running (Python port 5001, Node port 5000).'
        : msg;
      this.setState({ error: friendly, loading: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.runSearch(this.state.query);
  };

  handleChip = (chip) => {
    this.setState({ query: chip }, () => this.runSearch(chip));
  };

  handleReset = () => {
    this.setState({ courses: [], hasSearched: false, query: '', error: '' });
    setTimeout(() => { if (this.inputRef.current) this.inputRef.current.focus(); }, 50);
  };

  render() {
    const { query, courses, loading, error, hasSearched } = this.state;

    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Ambient glows */}
        <div style={{
          position: 'fixed', top: '-100px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── Header ─────────────────────────────────────────── */}
        <header style={{
          position: 'relative', zIndex: 10,
          borderBottom: '1px solid rgba(51,65,85,0.5)',
          padding: '0',
        }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => window.history.back()}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 10, padding: '8px 16px', color: '#94a3b8',
                fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
            >
              ← Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg style={{ width: 18, height: 18, color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: 19, color: '#f1f5f9', letterSpacing: '-0.02em' }}>SkillSage</span>
            </div>
          </div>
        </header>

        {/* ── Main ───────────────────────────────────────────── */}
        <main style={{ position: 'relative', zIndex: 10, flex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '60px 48px 80px' }}>
          
          {/* Page heading */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 18 }}>
              Find Your Next{' '}
              <span className="gradient-text">Course</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 19, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
              Enter a skill, topic, or career goal — our AI matches you with the best courses instantly.
            </p>
          </div>

          {/* Search form */}
          <form
            onSubmit={this.handleSubmit}
            style={{ display: 'flex', gap: 14, maxWidth: 760, margin: '0 auto 32px', flexWrap: 'wrap' }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <div style={{
                position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
                color: '#475569', pointerEvents: 'none',
              }}>
                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={this.inputRef}
                type="text"
                value={query}
                placeholder="e.g. machine learning, web development, finance…"
                onChange={e => this.setState({ query: e.target.value, error: '' })}
                style={{
                  width: '100%',
                  paddingLeft: 52, paddingRight: 20, paddingTop: 18, paddingBottom: 18,
                  borderRadius: 16,
                  background: 'rgba(30,41,59,0.8)',
                  border: '2px solid rgba(99,102,241,0.2)',
                  color: '#f1f5f9', fontSize: 16, outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(99,102,241,0.2)'; }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '18px 36px',
                background: loading ? '#4338ca' : 'linear-gradient(135deg, #6366f1, #7c3aed)',
                color: 'white', fontWeight: 700, fontSize: 16,
                border: 'none', borderRadius: 16, cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                display: 'flex', alignItems: 'center', gap: 10,
                whiteSpace: 'nowrap', transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Thinking…
                </>
              ) : (
                <>
                  ✦ Recommend
                </>
              )}
            </button>
          </form>

          {/* Suggestion chips */}
          {!hasSearched && (
            <div style={{ maxWidth: 760, margin: '0 auto 40px', textAlign: 'center' }}>
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', fontWeight: 700, marginBottom: 14 }}>
                Popular searches
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => this.handleChip(s)}
                    style={{
                      padding: '9px 20px',
                      background: 'rgba(30,41,59,0.7)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      borderRadius: 99, color: '#94a3b8', fontSize: 14, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; e.currentTarget.style.background = 'rgba(30,41,59,0.7)'; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              maxWidth: 760, margin: '0 auto 32px',
              padding: '16px 20px', borderRadius: 14,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5', fontSize: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Loading */}
          {loading && <Spinner />}

          {/* Results */}
          {!loading && courses.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0' }}>
                  <span className="gradient-text">{courses.length}</span> courses recommended for you
                </h2>
                <button
                  onClick={this.handleReset}
                  style={{
                    background: 'none', border: 'none', color: '#6366f1',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  ← New search
                </button>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24,
              }}>
                {courses.map((course, i) => (
                  <CourseCard key={i} course={course} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && hasSearched && courses.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
              <p style={{ fontSize: 18, fontWeight: 600 }}>No courses found</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Try different keywords like "python" or "marketing"</p>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default RecommendPage;
