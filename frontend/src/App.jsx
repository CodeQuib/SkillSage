import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecommendPage from './pages/RecommendPage';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '40px', textAlign: 'center', gap: 20,
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f87171' }}>Something went wrong</h2>
          <pre style={{
            background: '#1e293b', padding: 16, borderRadius: 12,
            fontSize: 12, color: '#94a3b8', maxWidth: 600, overflowX: 'auto',
            border: '1px solid #334155'
          }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
            style={{
              padding: '12px 32px', borderRadius: 12, background: '#6366f1',
              color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 15
            }}
          >
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
