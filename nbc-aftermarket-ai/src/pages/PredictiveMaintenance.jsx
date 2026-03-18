import React from 'react';
import { mockSalesData } from '../data/mockData';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Activity, Thermometer, Clock, ShieldAlert } from 'lucide-react';

const PredictiveMaintenance = () => {
  // Prep scatter data: Risk vs Temp vs Age
  const riskData = mockSalesData.slice(0, 300).map(d => ({
    risk: d.Failure_Risk_Score,
    temp: d.Operating_Temperature_C,
    age: d.Machine_Age_Years,
    industry: d.Industry
  }));

  const getIndustryRisk = () => {
    const indMap = {};
    mockSalesData.forEach(d => {
      if (!indMap[d.Industry]) indMap[d.Industry] = { count: 0, totalRisk: 0 };
      indMap[d.Industry].count++;
      indMap[d.Industry].totalRisk += d.Failure_Risk_Score;
    });
    return Object.entries(indMap).map(([name, data]) => ({
      name,
      avgRisk: Number((data.totalRisk / data.count).toFixed(1))
    })).sort((a,b) => b.avgRisk - a.avgRisk);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Predictive Maintenance Intelligence</h1>
          <p className="page-subtitle">Operational data analysis for proactive replacements</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldAlert size={32} style={{ color: 'var(--danger)' }} />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>High Risk Assets</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>42</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Activity size={32} style={{ color: 'var(--nbc-blue)' }} />
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Network Health</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>86%</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Risk Scatter Plot */}
        <div className="card" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Failure Risk vs Operating Temperature</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Bubble size indicates Machine Age (Years)</p>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" dataKey="temp" name="Temperature °C" axisLine={false} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <YAxis type="number" dataKey="risk" name="Failure Risk %" axisLine={false} tickLine={false} />
                <ZAxis type="number" dataKey="age" range={[50, 400]} name="Machine Age (Yrs)" />
                <RechartsTooltip cursor={{strokeDasharray: '3 3'}} />
                <Scatter name="Assets" data={riskData} fill="var(--danger)" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Industry Risk Bar */}
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Highest Risk Industries</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getIndustryRisk()} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                  <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                  <Bar dataKey="avgRisk" name="Avg Risk Score" fill="var(--warning)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="card" style={{ backgroundColor: 'var(--nbc-blue-dark)', color: 'white' }}>
            <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} /> Preventive Action Alert
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              12 Steel Industry conveyor motors in East region are predicted to fail within 4 weeks. Deploy service team with TRB replacements immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveMaintenance;
