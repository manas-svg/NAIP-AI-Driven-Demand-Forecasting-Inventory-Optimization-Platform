import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DemandAnalytics from './pages/DemandAnalytics';
import DealerIntelligence from './pages/DealerIntelligence';
import InventorySupply from './pages/InventorySupply';
import CompetitiveMarket from './pages/CompetitiveMarket';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import AIForecasting from './pages/AIForecasting';
import DataUpload from './pages/DataUpload';
import InsightsRecommendations from './pages/InsightsRecommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="demand" element={<DemandAnalytics />} />
          <Route path="dealers" element={<DealerIntelligence />} />
          <Route path="inventory" element={<InventorySupply />} />
          <Route path="competitors" element={<CompetitiveMarket />} />
          <Route path="maintenance" element={<PredictiveMaintenance />} />
          <Route path="forecasting" element={<AIForecasting />} />
          <Route path="upload" element={<DataUpload />} />
          <Route path="insights" element={<InsightsRecommendations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
