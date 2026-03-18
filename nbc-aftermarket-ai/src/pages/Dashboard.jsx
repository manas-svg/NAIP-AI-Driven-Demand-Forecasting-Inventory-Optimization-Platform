import React from 'react';
import { getDashboardMetrics, getAIInsights } from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const metrics = getDashboardMetrics();
  const insights = getAIInsights();
  const COLORS = ['#003A8F', '#3362a5', '#0056b3', '#a0c4ff', '#e1e8ed'];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Executive Dashboard</h1>
          <p className="page-subtitle">Overview of aftermarket performance and AI summary</p>
        </div>
      </div>

      {/* AI Summary Panel */}
      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-blue)', backgroundColor: 'rgba(0, 58, 143, 0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(0, 58, 143, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
            <Brain size={24} style={{ color: 'var(--nbc-blue)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>AI Executive Summary</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>{metrics.insightSummary}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top Row: Revenue Trend & Industry Demand */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} /> Revenue Trend (2020-2025)
            </h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.revenueTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--nbc-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--nbc-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/10000000}Cr`} />
                  <Tooltip formatter={(value) => `₹${(value/10000000).toFixed(1)} Cr`} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--nbc-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Industry Demand</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.industryDemand}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {metrics.industryDemand.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {metrics.industryDemand.slice(0,3).map((ind, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[i], borderRadius: '2px' }}></div>
                  {ind.name} ({ind.value}%)
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Region Heatmap Proxy & Top Dealer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Regional Revenue Distribution</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.regionalRevenue} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(val) => `${val/10000000}Cr`} />
                  <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => `₹${(value/10000000).toFixed(1)} Cr`} cursor={{fill: 'var(--bg-color)'}} />
                  <Bar dataKey="revenue" fill="var(--nbc-blue-light)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ height: '350px' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} style={{ color: 'var(--warning)' }} /> Stock-Out Probability Alerts
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>SRB Bearings (East Region)</span>
                  <span className="badge badge-danger">85% Risk</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>WH-Kolkata pipeline delayed. Recommendation: Route from WH-Delhi.</div>
              </li>
              <li style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Thrust Bearings (South Region)</span>
                  <span className="badge badge-warning">60% Risk</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Unusual demand spike in Cement industry.</div>
              </li>
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Top Performing Dealer</h4>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--nbc-blue)' }}>{metrics.topDealer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
