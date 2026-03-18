import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  PackageSearch, 
  TrendingUp,
  Settings,
  Brain,
  UploadCloud,
  Lightbulb
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Executive Dashboard' },
    { path: '/demand', icon: <BarChart3 size={20} />, label: 'Demand Analytics' },
    { path: '/dealers', icon: <Users size={20} />, label: 'Dealer Intelligence' },
    { path: '/inventory', icon: <PackageSearch size={20} />, label: 'Inventory & Supply' },
    { path: '/competitors', icon: <TrendingUp size={20} />, label: 'Competitive Market' },
    { path: '/maintenance', icon: <Settings size={20} />, label: 'Predictive Maintenance' },
    { path: '/forecasting', icon: <Brain size={20} />, label: 'AI Forecasting' },
    { path: '/upload', icon: <UploadCloud size={20} />, label: 'Data Upload' },
    { path: '/insights', icon: <Lightbulb size={20} />, label: 'Insights & Recs' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span>NBC NAIP</span>
          <span>Aftermarket Intelligence</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
