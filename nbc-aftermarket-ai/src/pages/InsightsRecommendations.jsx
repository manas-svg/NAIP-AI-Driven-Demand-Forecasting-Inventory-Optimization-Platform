import React from 'react';
import { getAIInsights } from '../services/api';
import { Lightbulb, ChevronRight, MessageSquareCode } from 'lucide-react';

const InsightsRecommendations = () => {
  const insights = getAIInsights();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Insights & Strategic Recommendations</h1>
          <p className="page-subtitle">Generative AI assistant analysis of aftermarket trends</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        
        {/* Categories */}
        <div className="card" style={{ height: 'fit-content', padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none' }}>
            {['All Insights', 'Inventory Optimization', 'Dealer Performance', 'Competitive Intelligence', 'Demand Forecasting'].map((cat, i) => (
              <li 
                key={i} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  cursor: 'pointer', 
                  borderLeft: i === 0 ? '3px solid var(--nbc-blue)' : '3px solid transparent',
                  backgroundColor: i === 0 ? 'var(--bg-color)' : 'transparent',
                  fontWeight: i === 0 ? 600 : 400,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: i === 0 ? 'var(--nbc-blue)' : 'inherit'
                }}
              >
                {cat} <ChevronRight size={16} />
              </li>
            ))}
          </ul>
        </div>

        {/* Insight Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Virtual Assistant Prompt */}
          <div className="card" style={{ backgroundColor: '#002b6b', color: 'white' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquareCode size={20} /> Explain Data Trends
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Ask NAIP Assistant (e.g., 'Why did South region sales drop in Q2?')" 
                style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '4px', border: 'none', outline: 'none' }}
              />
              <button className="btn" style={{ backgroundColor: 'white', color: 'var(--nbc-blue)' }}>Ask AI</button>
            </div>
          </div>

          <h3 style={{ marginTop: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Automated Feed</h3>

          {insights.map((insight, idx) => (
            <div key={idx} className="card" style={{ borderLeft: `4px solid ${
              insight.type === 'inventory' ? 'var(--success)' :
              insight.type === 'dealer' ? 'var(--nbc-blue)' :
              insight.type === 'competitor' ? 'var(--danger)' :
              'var(--warning)'
            }` }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '50%' }}>
                  <Lightbulb size={24} style={{ color: 'var(--nbc-blue)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                    {insight.type.toUpperCase()} INTELLIGENCE
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 500 }}>{insight.text}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    Recommendation based on pattern analysis of trailing 12-month data against current pipeline. 
                    Implementing this action has an estimated confidence score of 89%.
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Take Action</button>
                    <button className="btn" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default InsightsRecommendations;
