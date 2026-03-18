import React from 'react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Target, TrendingUp, Cpu } from 'lucide-react';

const AIForecasting = () => {
  // Generate predictive future data
  const generateForecast = () => {
    const historicalAvg = 45000;
    const months = ['Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026'];
    return months.map((m, i) => {
      const actual = i < 2 ? Math.floor(historicalAvg * (1 + (Math.random() * 0.1 - 0.05))) : null;
      const forecast = Math.floor(historicalAvg * (1 + (i * 0.05) + (Math.random() * 0.05)));
      return {
        month: m,
        Actual: actual,
        'Predicted Demand': forecast,
        'Upper Bound': Math.floor(forecast * 1.15),
        'Lower Bound': Math.floor(forecast * 0.85)
      };
    });
  };

  const getIndustryGrowth = () => [
    { name: 'Power', growth: 12.4, color: '#0056b3' },
    { name: 'Mining', growth: 8.7, color: '#3362a5' },
    { name: 'Steel', growth: 5.2, color: '#003A8F' },
    { name: 'Cement', growth: 2.1, color: '#a0c4ff' },
    { name: 'Automotive', growth: -1.5, color: 'var(--danger)' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Sales Forecasting Engine</h1>
          <p className="page-subtitle">Machine learning backed demand prediction models</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--nbc-blue)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={16} /> Model Accuracy: 92.4%
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <TrendingUp size={16} /> 6-Month Projected Revenue Add
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--nbc-blue)' }}>+₹18.4 Cr</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Top Growth SKU</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Spherical Roller (SRB)</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--success)', marginTop: '0.25rem' }}>+15% Expected Demand</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Target size={16} /> Recommended Q3 Target
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>₹25.0 Cr</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Forecast Line/Area */}
        <div className="card" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>6-Month Volume Demand Forecast vs Actuals</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={generateForecast()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                <Legend />
                <Bar dataKey="Actual" fill="var(--nbc-blue)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line type="monotone" dataKey="Predicted Demand" stroke="var(--warning)" strokeWidth={3} dot={{r: 4}} />
                <Line type="monotone" dataKey="Upper Bound" stroke="#e1e8ed" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="Lower Bound" stroke="#e1e8ed" strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Predictions */}
        <div className="card" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Predicted Industry Growth (H2)</h3>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            {getIndustryGrowth().map((ind, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{ind.name}</span>
                  <span style={{ color: ind.growth >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                    {ind.growth > 0 ? '+' : ''}{ind.growth}%
                  </span>
                </div>
                <div style={{ width: '100%', backgroundColor: 'var(--border-color)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  {ind.growth > 0 ? (
                    <div style={{ width: `${Math.min(100, ind.growth * 5)}%`, backgroundColor: ind.color, height: '100%' }}></div>
                  ) : (
                    <div style={{ width: `${Math.abs(ind.growth) * 5}%`, backgroundColor: 'var(--danger)', height: '100%', float: 'right' }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIForecasting;
