import React from 'react';
import { mockSalesData } from '../data/mockData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { Package, Truck, AlertOctagon, Lightbulb } from 'lucide-react';

const InventorySupply = () => {
  const getWarehouseData = () => {
    const whMap = {};
    mockSalesData.forEach(d => {
      if (!whMap[d.Warehouse]) {
        whMap[d.Warehouse] = { name: d.Warehouse, demand: 0, stock: Math.floor(Math.random() * 5000) + 1000 };
      }
      whMap[d.Warehouse].demand += d.Order_Quantity;
    });
    return Object.values(whMap).map(w => ({ ...w, utilization: Math.min(100, Math.floor((w.demand / (w.stock + w.demand)) * 100)) }));
  };

  const getLeadTimeDist = () => {
    const bins = {'<10 Days': 0, '10-20 Days': 0, '20-30 Days': 0, '>30 Days': 0};
    mockSalesData.forEach(d => {
      if (d.Lead_Time < 10) bins['<10 Days']++;
      else if (d.Lead_Time <= 20) bins['10-20 Days']++;
      else if (d.Lead_Time <= 30) bins['20-30 Days']++;
      else bins['>30 Days']++;
    });
    return Object.entries(bins).map(([name, count]) => ({ name, count }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory & Supply Chain Intelligence</h1>
          <p className="page-subtitle">Warehouse utilization and fulfillment tracking</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(0, 58, 143, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Package size={24} style={{ color: 'var(--nbc-blue)' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Warehouse Utilization</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>76%</div>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(237, 108, 2, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Truck size={24} style={{ color: 'var(--warning)' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Lead Time</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>24 Days</div>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'rgba(211, 47, 47, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <AlertOctagon size={24} style={{ color: 'var(--danger)' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Stock-Outs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8%</div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Panel */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#f0f4f8', border: '1px solid #c7dfff' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nbc-blue)' }}>
          <Lightbulb size={20} /> AI Stock Balancing Recommendations
        </h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'white', borderRadius: '4px' }}>
            <span>Move <strong style={{ color: 'var(--nbc-blue)' }}>2,000 SRB Bearings</strong> from <b>WH-Pune</b> to <b>WH-Kolkata</b></span>
            <span className="badge badge-success">High Impact (Prevents ₹1.2Cr Loss)</span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'white', borderRadius: '4px' }}>
            <span>Restock <strong style={{ color: 'var(--nbc-blue)' }}>DGBB Series</strong> at <b>WH-Chennai</b> immediately</span>
            <span className="badge badge-warning">Medium Impact</span>
          </li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Warehouse Demand vs Capacity</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getWarehouseData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'var(--bg-color)'}} />
                <Bar dataKey="demand" name="Current Demand" fill="var(--nbc-blue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="stock" name="Stock Capacity" fill="#a0c4ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Lead Time Distribution</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getLeadTimeDist()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" name="Orders Count" stroke="var(--warning)" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySupply;
