import React, { useState } from 'react';
import { mockSalesData } from '../data/mockData';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ZAxis,
  BarChart, Bar
} from 'recharts';
import { Trophy, TrendingUp, AlertTriangle, Map } from 'lucide-react';

const DealerIntelligence = () => {
  const getDealerMetrics = () => {
    const dMap = {};
    mockSalesData.forEach(d => {
      if (!dMap[d.Dealer_ID]) {
        dMap[d.Dealer_ID] = { id: d.Dealer_ID, revenue: 0, orders: 0, stockOuts: 0, growth: Math.floor(Math.random() * 40) - 10 };
      }
      dMap[d.Dealer_ID].revenue += d.Revenue;
      dMap[d.Dealer_ID].orders += 1;
      if (d.Inventory_Status === 'Out of Stock') dMap[d.Dealer_ID].stockOuts += 1;
    });
    return Object.values(dMap).sort((a,b) => b.revenue - a.revenue);
  };

  const dealerData = getDealerMetrics();
  const top20Dealers = dealerData.slice(0, Math.ceil(dealerData.length * 0.2));
  const scatterData = dealerData.map(d => ({ revenue: d.revenue / 100000, orders: d.orders, growth: d.growth, id: d.id }));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dealer Intelligence Dashboard</h1>
          <p className="page-subtitle">Network performance and growth opportunities</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Trophy size={16} /> Top 20% Dealers Rev
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--success)' }}>72%</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avg Repeat Frequency</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--nbc-blue)' }}>3.4x /yr</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <TrendingUp size={16} /> Network Growth
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--success)' }}>+14.2%</div>
        </div>
        <div className="card">
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <AlertTriangle size={16} color="var(--danger)" /> Stock-Out Revenue Loss
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--danger)' }}>₹4.2 Cr</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Scatter: Orders vs Revenue vs Growth */}
        <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Dealer Performance Matrix</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>X: Order Volume, Y: Revenue (Lakhs), Bubble Size: Growth %</p>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" dataKey="orders" name="Orders" axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="revenue" name="Revenue" axisLine={false} tickLine={false} />
                <ZAxis type="number" dataKey="growth" range={[50, 400]} name="Growth YoY %" />
                <RechartsTooltip cursor={{strokeDasharray: '3 3'}} formatter={(value, name) => [value, name]} />
                <Scatter name="Dealers" data={scatterData} fill="var(--nbc-blue)" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top List & Map Proxy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem' }}>Top 5 Premium Dealers</h3>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {top20Dealers.slice(0,5).map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{d.id}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--success)' }}>+{d.growth}% Growth</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--nbc-blue)' }}>₹{(d.revenue/10000000).toFixed(2)}Cr</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card" style={{ height: '200px', backgroundColor: 'var(--nbc-blue-dark)', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Map size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h4>Dealer Density Map</h4>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>Geospatial view expanding next sprint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerIntelligence;
