export const generateMockData = (count = 500) => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const industries = ['Steel', 'Mining', 'Power', 'Cement', 'Automotive', 'Railway', 'Textile'];
  const applications = ['Conveyor', 'Motor', 'Pump', 'Compressor', 'Gearbox', 'Turbine'];
  const bearingTypes = ['DGBB', 'SRB', 'TRB', 'CRB', 'Spherical', 'Thrust'];
  const competitors = ['SKF', 'Schaeffler', 'Timken', 'NRB', 'Chinese Imports'];
  const warehouses = ['WH-Delhi', 'WH-Mumbai', 'WH-Chennai', 'WH-Kolkata', 'WH-Pune'];
  const inventoryStatus = ['In Stock', 'Low Stock', 'Out of Stock'];

  const data = [];
  
  for (let i = 0; i < count; i++) {
    const year = 2020 + Math.floor(Math.random() * 6); // 2020 - 2025
    const month = Math.ceil(Math.random() * 12);
    const region = regions[Math.floor(Math.random() * regions.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const bearingType = bearingTypes[Math.floor(Math.random() * bearingTypes.length)];
    const application = applications[Math.floor(Math.random() * applications.length)];
    const qty = Math.floor(Math.random() * 5000) + 50;
    const price = Math.floor(Math.random() * 5000) + 100;
    
    data.push({
      id: i + 1,
      Year: year,
      Month: month,
      Region: region,
      Industry: industry,
      Application: application,
      Bearing_Type: bearingType,
      Sales_Channel: Math.random() > 0.3 ? 'Dealer' : 'Direct',
      Buyer_Category: 'OEM',
      Buyer_Tier: ['Tier 1', 'Tier 2', 'Tier 3'][Math.floor(Math.random() * 3)],
      Product_Class: ['Premium', 'Standard', 'Economy'][Math.floor(Math.random() * 3)],
      Dealer_ID: `DLR-${Math.floor(Math.random() * 100) + 1000}`,
      Repeat_Order_Count: Math.floor(Math.random() * 20),
      Order_Quantity: qty,
      Price_Per_Unit: price,
      Revenue: qty * price,
      Lead_Time: Math.floor(Math.random() * 45) + 5, // days
      Inventory_Status: inventoryStatus[Math.floor(Math.random() * inventoryStatus.length)],
      Warehouse: warehouses[Math.floor(Math.random() * warehouses.length)],
      Competitor_Brand: competitors[Math.floor(Math.random() * competitors.length)],
      Competitor_Price_Index: Number((Math.random() * 0.4 + 0.8).toFixed(2)), // 0.8 to 1.2
      Failure_Risk_Score: Number((Math.random() * 100).toFixed(1)),
      Operating_Temperature_C: Math.floor(Math.random() * 150) + 50,
      Contract_Length_Years: Math.floor(Math.random() * 5),
      Machine_Age_Years: Math.floor(Math.random() * 20) + 1,
    });
  }
  return data;
};

export const mockSalesData = generateMockData(1500);

export const revenueTrendData = [
  { year: '2020', revenue: 45000000 },
  { year: '2021', revenue: 52000000 },
  { year: '2022', revenue: 61000000 },
  { year: '2023', revenue: 68000000 },
  { year: '2024', revenue: 82000000 },
  { year: '2025', revenue: 95000000 },
];

export const industryDemandData = [
  { name: 'Steel', value: 35 },
  { name: 'Mining', value: 25 },
  { name: 'Power', value: 20 },
  { name: 'Cement', value: 10 },
  { name: 'Automotive', value: 10 },
];

export const regionalRevenueData = [
  { region: 'North', revenue: 25000000 },
  { region: 'South', revenue: 32000000 },
  { region: 'West', revenue: 28000000 },
  { region: 'East', revenue: 15000000 },
  { region: 'Central', revenue: 5000000 },
];
