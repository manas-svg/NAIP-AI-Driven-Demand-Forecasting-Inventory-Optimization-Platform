import React, { useState } from 'react';
import { mockSalesData } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line
} from 'recharts';
import { Filter, Calendar, MapPin, Factory, Settings } from 'lucide-react';

const DemandAnalytics = () => {
  const [year, setYear] = useState('All');
  const [region, setRegion] = useState('All');

  // Simple aggregators for mock data
  const getMonthlyDemand = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, i) => {
      const monthData = mockSalesData.filter(d => 
        d.Month === i + 1 && 
        (year === 'All' || d.Year.toString() === year) &&
        (region === 'All' || d.Region === region)
      );
      const originalDemand = monthData.reduce((acc, curr) => acc + curr.Order_Quantity, 0);
      return {
        name: m,
        Actual: originalDemand,
        Forecast: Math.floor(originalDemand * (1 + (Math.random() * 0.2 - 0.05))) // +15% to -5% variance
      };
    });
  };

  const getBearingTypeDemand = () => {
    const types = {};
    mockSalesData.forEach(d => {
      if ((year === 'All' || d.Year.toString() === year) && (region === 'All' || d.Region === region)) {
        types[d.Bearing_Type] = (types[d.Bearing_Type] || 0) + d.Order_Quantity;
      }
    });
    return Object.entries(types).map(([name, Demand]) => ({ name, Demand })).sort((a,b) => b.Demand - a.Demand);
  };

  const getRegionVsIndustry = () => {
    // simplified heatmap representation using bar chart
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    return regions.map(r => {
      const rData = mockSalesData.filter(d => d.Region === r && (year === 'All' || d.Year.toString() === year));
      return {
        region: r,
        Steel: rData.filter(d=>d.Industry==='Steel').reduce((a,c)=>a+c.Order_Quantity,0),
        Mining: rData.filter(d=>d.Industry==='Mining').reduce((a,c)=>a+c.Order_Quantity,0),
        Power: rData.filter(d=>d.Industry==='Power').reduce((a,c)=>a+c.Order_Quantity,0),
        Automotive: rData.filter(d=>d.Industry==='Automotive').reduce((a,c)=>a+c.Order_Quantity,0),
      };
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Aftermarket Demand Analytics</h1>
          <p className="page-subtitle">Granular volume analysis and forecasting</p>
        </div>
        
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <Calendar size={16} />
            <select style={{ border: 'none', outline: 'none', background: 'transparent' }} value={year} onChange={e => setYear(e.target.value)}>
              <option value="All">All Years</option>
              {[2020, 2021, 2022, 2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <MapPin size={16} />
            <select style={{ border: 'none', outline: 'none', background: 'transparent' }} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="All">All Regions</option>
              {['North', 'South', 'East', 'West', 'Central'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Filter size={16} /> Advanced Filters</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Monthly Forecasting */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Monthly Demand Forecasting Comparison</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={getMonthlyDemand()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                <Legend />
                <Bar dataKey="Actual" fill="var(--nbc-blue-light)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                <Line type="monotone" dataKey="Forecast" stroke="var(--warning)" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Region vs Industry */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Factory size={20} /> Region vs Key Industry Demand
          </h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getRegionVsIndustry()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="region" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                <Legend />
                <Bar dataKey="Steel" stackId="a" fill="#003A8F" />
                <Bar dataKey="Mining" stackId="a" fill="#3362a5" />
                <Bar dataKey="Power" stackId="a" fill="#0056b3" />
                <Bar dataKey="Automotive" stackId="a" fill="#a0c4ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bearing Types */}
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} /> Bearing Type Demand Portfolio
          </h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getBearingTypeDemand()} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                <Bar dataKey="Demand" fill="var(--nbc-blue)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandAnalytics;
