# NBC Aftermarket Intelligence Platform (NAIP)

AI-Driven Analytics for Industrial Bearing Aftermarket Operations

---

## Overview

The **NBC Aftermarket Intelligence Platform (NAIP)** is an AI-powered analytics system designed to help **NBC Bearings (National Engineering Industries Ltd.)** improve decision-making in its industrial aftermarket business.

NBC Bearings is one of India's largest bearing manufacturers, producing **200+ million bearings annually** across thousands of variants and serving industries such as automotive, steel, power, mining, and railways. The company distributes products through a **large network of authorized dealers and retailers across India**.

Despite strong manufacturing capacity, aftermarket sales often rely on **dealer demand signals, manual forecasting, and reactive inventory planning**.

This project demonstrates how **AI-driven analytics, dealer intelligence, and predictive modeling** can transform NBC’s aftermarket operations into a **data-driven decision system**.

---

# Problem Statement

Industrial bearing aftermarket sales face several operational challenges:

• Limited visibility into **dealer-level demand patterns**
• Difficulty forecasting **regional demand spikes**
• Inventory imbalances across warehouses
• Competitive pressure from **low-cost imports**
• Reactive maintenance and replacement cycles

These inefficiencies can lead to:

• Stock-outs of critical bearings
• Excess inventory in low-demand regions
• Lost aftermarket revenue opportunities

---

# Project Objective

The goal of this platform is to build an **AI-driven aftermarket analytics system** capable of:

• Predicting bearing demand across industries and regions
• Analyzing dealer performance and repeat orders
• Identifying inventory risks and stock-outs
• Benchmarking competitor pressure in different segments
• Providing actionable insights for sales and supply chain teams

---

# Dataset Description

Since NBC’s internal data is proprietary, this project uses a **synthetic dataset designed to replicate realistic aftermarket business patterns**.

### Dataset Size

* **3400 rows**
* **2020–2025 historical data**
* **24+ analytical columns**

---

## Dataset Features

| Column                  | Description                                 |
| ----------------------- | ------------------------------------------- |
| Year                    | Sales year (2020–2025)                      |
| Month                   | Sales month with Q4 demand spike            |
| Region                  | North, East, West, South                    |
| Industry                | Steel, Power, Cement, Mining, Paper, Others |
| Application             | Industrial equipment application            |
| Bearing_Type            | Bearing category (SRB, TRB, Ball, etc.)     |
| Sales_Channel           | RFQ or Rate Contract                        |
| Buyer_Category          | OEM, PSU, Distributor, Dealer               |
| Buyer_Tier              | Top 20% buyers vs others                    |
| Product_Class           | Store Item, Insurance Spare, Stranger       |
| Dealer_ID               | Unique dealer identifier                    |
| Repeat_Order_Count      | Number of repeat purchases                  |
| Order_Quantity          | Quantity ordered                            |
| Price_Per_Unit          | Price of bearing                            |
| Revenue                 | Total order value                           |
| Lead_Time               | Delivery time category                      |
| Inventory_Status        | Stock availability                          |
| Warehouse               | Regional warehouse                          |
| Competitor_Brand        | Major competitor brand                      |
| Competitor_Price_Index  | Competitor price comparison                 |
| Failure_Risk_Score      | Predictive maintenance risk                 |
| Operating_Temperature_C | Equipment operating temperature             |
| Contract_Length_Years   | Rate contract duration                      |
| Machine_Age_Years       | Age of industrial equipment                 |

---

# Platform Features

The AI platform contains several modules designed for **aftermarket decision intelligence**.

---

## Executive Dashboard

Provides high-level performance indicators including:

* Total aftermarket revenue
* Active dealer network size
* Regional sales distribution
* Repeat order frequency

---

## Demand Analytics

Analyzes industrial demand patterns.

Capabilities include:

* Region-wise demand analysis
* Industry-specific bearing demand
* Bearing type market trends
* Seasonal demand forecasting

---

## Dealer Intelligence

Evaluates dealer performance across NBC’s distribution network.

Key insights:

* Top revenue-generating dealers
* Dealer repeat order behavior
* Regional dealer demand clusters
* Underperforming dealer segments

---

## Inventory Intelligence

Improves supply chain efficiency.

Analytics include:

* Warehouse inventory utilization
* Lead time distribution
* Stock-out probability analysis
* AI-driven inventory reallocation recommendations

---

## Competitive Intelligence

Analyzes market pressure from competing brands.

Competitors analyzed include:

* SKF
* Schaeffler
* Timken
* NRB
* Chinese import brands

The platform evaluates:

* Price competitiveness
* Market penetration by industry
* Competitive pressure across regions

---

## Predictive Maintenance Insights

Industrial equipment conditions affect bearing replacement cycles.

Using machine parameters such as:

* Operating temperature
* Machine age
* Failure risk scores

The platform predicts:

* Maintenance cycles
* High failure risk segments
* Preventive replacement opportunities

---

# AI & Analytics Capabilities

The platform integrates machine learning models for:

### Demand Forecasting

Predicts future bearing demand across industries.

### Dealer Segmentation

Identifies high-value and low-performance dealers.

### Inventory Optimization

Suggests warehouse inventory redistribution.

### Failure Prediction

Estimates bearing replacement likelihood.

---

# Technology Stack

Frontend
React / Next.js
Tailwind CSS
Chart.js / Recharts

Backend
Python (FastAPI) or Node.js

Data Processing
Pandas
NumPy

Machine Learning
Scikit-Learn
XGBoost

Visualization
Power BI / D3.js

---

# Key Business Impact

If deployed within NBC’s aftermarket ecosystem, this system can enable:

• 8–12% improvement in aftermarket sales capture
• Reduction in inventory imbalances
• Better dealer engagement
• Improved demand forecasting accuracy

Ultimately, this enables NBC Bearings to move toward a **digitally integrated aftermarket ecosystem**.

---

# Project Structure

```
NBC_Aftermarket_AI
│
├── dataset
│   └── NBC_Aftermarket_Bearing_Dataset_2020_2025.csv
│
├── backend
│   └── api_server
│
├── frontend
│   └── analytics_dashboard
│
├── models
│   └── demand_forecasting_model
│
└── README.md
```

---

# Future Improvements

Potential extensions for this platform include:

* Integration with **real dealer POS data**
* Real-time inventory tracking
* IoT-based bearing condition monitoring
* Digital spare parts marketplace integration

---
