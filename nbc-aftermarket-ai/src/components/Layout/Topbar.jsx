import React from 'react';
import { Bell, Search } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
        <Search size={20} />
        <span style={{ fontSize: '0.9rem' }}>Search insights, dealers, parts...</span>
      </div>
      <div className="topbar-right">
        <Bell size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
        <div className="user-profile">
          <div className="avatar">A</div>
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
