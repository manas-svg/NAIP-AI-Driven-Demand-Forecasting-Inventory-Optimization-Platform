import { mockSalesData, revenueTrendData, industryDemandData, regionalRevenueData } from '../data/mockData';

export const getDashboardMetrics = () => {
  return {
    totalRevenue: '₹82.5 Cr',
    activeDealers: 342,
    repeatOrderRate: '68%',
    stockOutRisk: '12%',
    revenueTrend: revenueTrendData,
    industryDemand: industryDemandData,
    regionalRevenue: regionalRevenueData,
    topDealer: 'DLR-1045 (₹4.2 Cr)',
    insightSummary: 'Revenue grew by 18% YoY driven by Steel and Mining sectors. However, stock-out risk in Eastern region WH-Kolkata remains high for SRB bearings.'
  };
};

export const getCompetitorMetrics = () => {
  return {
    skf: { priceIndex: 1.15, marketShare: 28 },
    schaeffler: { priceIndex: 1.10, marketShare: 22 },
    timken: { priceIndex: 1.05, marketShare: 18 },
    nbc: { priceIndex: 1.00, marketShare: 15 },
    chinese: { priceIndex: 0.65, marketShare: 17 }
  };
};

export const getAIInsights = () => {
  return [
    { type: 'inventory', text: 'Increase SRB inventory in East region due to projected 15% demand spike.' },
    { type: 'dealer', text: 'Top 10 dealers driving 40% revenue. Recommend loyalty program extension.' },
    { type: 'competitor', text: 'Chinese imports impacting low price segments in Central region.' },
    { type: 'demand', text: 'Power industry expected to grow demand by 12% in Q3.' }
  ];
};
