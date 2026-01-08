# Compound-Interest-Calculator

A full-stack compound interest calculator built with **Go** (backend) and **React + TypeScript** (frontend).

## Architecture

- **Backend**: Go API deployed on Render
  - Endpoint: `http://back-end-compound-interest-calculator.onrender.com/calculation`
  - Handles compound interest calculations with various compounding frequencies
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
  - Interactive calculator UI with dark mode
  - Real-time chart visualization with dual-line display
  - ETF recommendations based on target returns (frontend-based)

## Features

✨ Calculate compound interest with different compounding frequencies  
📊 Interactive line chart showing principal vs. total amount growth  
💡 Smart ETF recommendations matching your target interest rate  
🌓 Dark/Light theme toggle  
📱 Fully responsive design

## Getting Started

### Backend (Go API)

```bash
cd backend/Go_API
go run main.go
```

### Frontend

```bash
cd frontend/project
npm install
npm run dev
```

## API Usage

```
GET /calculation?initial_investment=860000&monthly_contribution=2400&saving_years=4&interest_rate=5&compound_frequency=monthly
```

**Response Format:**

```json
[
  {
    "year": 0,
    "current_principal": 860000,
    "interest_earned": 0,
    "total_amount": 860000
  },
  {
    "year": 1,
    "current_principal": 888800,
    "interest_earned": 44668.485358168604,
    "total_amount": 933468.4853581686
  }
]
```

## Tech Stack

**Backend**: Go, Gin Framework  
**Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide Icons  
**Deployment**: Render (Backend)

## ETF Recommendations

The ETF recommendation feature uses **hardcoded data** stored in the frontend component. When you calculate with a target interest rate, the app filters ETFs within ±3% of your rate and displays the best matches. No external API calls are required.

---

Developed with ❤️ by diego4lbarracin
