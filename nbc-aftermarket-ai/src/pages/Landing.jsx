import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, UploadCloud, Settings, Settings2 } from 'lucide-react';
import { getDashboardMetrics } from '../services/api';

const Landing = () => {
  const navigate = useNavigate();
  const metrics = getDashboardMetrics();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--nbc-blue)', color: 'white', padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <Settings2 size={64} style={{ color: '#a0c4ff', marginBottom: '1.5rem', opacity: 0.8 }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
            AI-Powered Aftermarket Intelligence for NBC Bearings
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', lineHeight: 1.6 }}>
            Transforming industrial bearing aftermarket analysis using predictive analytics and dealer intelligence.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" style={{ backgroundColor: 'white', color: 'var(--nbc-blue)' }} onClick={() => navigate('/dashboard')}>
              Explore Dashboard <BarChart3 size={18} />
            </button>
            <button className="btn" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }} onClick={() => navigate('/dealers')}>
              Dealer Intelligence <Users size={18} />
            </button>
            <button className="btn" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }} onClick={() => navigate('/upload')}>
              Upload Dataset <UploadCloud size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div style={{ maxWidth: '1200px', margin: '-3rem auto 3rem', padding: '0 2rem', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          
          <div className="card card-hover" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Revenue</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--nbc-blue)' }}>{metrics.totalRevenue}</div>
          </div>
          
          <div className="card card-hover" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Active Dealers</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--nbc-blue)' }}>{metrics.activeDealers}</div>
          </div>
          
          <div className="card card-hover" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Repeat Orders Rate</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--nbc-blue)' }}>{metrics.repeatOrderRate}</div>
          </div>
          
          <div className="card card-hover" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Stock-Out Risk</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--danger)' }}>{metrics.stockOutRisk}</div>
          </div>

        </div>
      </div>

      {/* Features Outline */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem' }}>Core Capabilities</h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-blue)', margin: '1rem auto' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={24} style={{ color: 'var(--nbc-blue)' }} /> Demand Analytics
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Advanced visualizations for monthly forecasting, regional performance, and bearing type demand comparisons.
            </p>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => navigate('/demand')}>Explore <ArrowRight size={16} /></span>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={24} style={{ color: 'var(--nbc-blue)' }} /> Predictive Maintenance
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Assess failure risks based on operating temperature and machine age to proactively supply replacement bearings.
            </p>
            <span style={{ color: 'var(--accent-blue)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }} onClick={() => navigate('/maintenance')}>Explore <ArrowRight size={16} /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
