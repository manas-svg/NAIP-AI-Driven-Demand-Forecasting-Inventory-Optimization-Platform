import React from 'react';
import { getCompetitorMetrics } from '../services/api';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { Target, Search } from 'lucide-react';

const CompetitiveMarket = () => {
  const compMetrics = getCompetitorMetrics();
  
  // Convert object to array for radar chart
  const priceIndexData = Object.entries(compMetrics).map(([brand, data]) => ({
    brand: brand.toUpperCase(),
    priceIndex: data.priceIndex
  }));

  const marketShareData = Object.entries(compMetrics).map(([brand, data]) => ({
    brand: brand.toUpperCase(),
    share: data.marketShare
  })).sort((a,b) => b.share - a.share);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Competitive Market Intelligence</h1>
          <p className="page-subtitle">NBC vs Competitors Benchmark Analysis</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--danger)', backgroundColor: 'rgba(211, 47, 47, 0.02)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
          <Target size={20} /> Competitive Threats AI Insight
        </h3>
        <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>
          NBC is losing 15% of aftermarket bids in the <b>Cement Industry</b> to <b>SKF</b> due to perceived lifetime value differences.
          Meanwhile, <b>Chinese Imports</b> have captured 17% of the low-end agricultural motor market purely on price.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Radar: Price Index */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Price Competitiveness Index</h3>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>(NBC Baseline = 1.0)</p>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={priceIndexData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="brand" tick={{ fill: 'var(--text-main)', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 1.3]} />
                <Radar name="Price Index" dataKey="priceIndex" stroke="var(--nbc-blue)" fill="var(--nbc-blue-light)" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar: Market Share */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Estimated Aftermarket Share</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketShareData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="brand" type="category" axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} formatter={(val) => `${val}%`} />
                <Bar dataKey="share" name="Market Share %" radius={[0, 4, 4, 0]}>
                  {marketShareData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.brand === 'NBC' ? 'var(--nbc-blue)' : '#a0c4ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompetitiveMarket;
