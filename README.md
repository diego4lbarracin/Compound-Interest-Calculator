# Compound-Interest-Calculator

A full-stack compound interest calculator built with **Go** (backend) and **React + TypeScript** (frontend).

## Architecture

- **Backend**: Go API deployed on Render
  - Compound Interest Calculation: `/calculation`
  - AI-Powered ETF Recommendations: `/etf_information`
  - Base URL: `https://back-end-compound-interest-calculator.onrender.com`
  - Integrates with OpenAI GPT-4o-mini for intelligent ETF analysis
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
  - Interactive calculator UI with dark mode
  - Real-time chart visualization with dual-line display (Recharts)
  - ETF recommendations based on target returns

## Features

✨ Calculate compound interest with different compounding frequencies  
📊 Interactive line chart showing principal vs. total amount growth  
💡 AI-powered ETF recommendations using OpenAI GPT-4o-mini  
🤖 Real-time market analysis for personalized investment suggestions  
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

Endpoints

### 1. Compound Interest Calculation

**Endpoint:** `GET /calculation`

**Query Parameters:**

- `initial_investment` (number, required) - Starting investment amount
- `monthly_contribution` (number, required) - Monthly contribution amount
- `saving_years` (number, required) - Investment period in years
- `interest_rate` (number, required) - Annual interest rate percentage
- `compound_frequency` (string, required) - Compounding frequency: `monthly`, `quarterly`, `annually`

**Example Request:**

```bash
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

### 2. AI-Powered ETF Recommendations (NEW! 🚀)

**Endpoint:** `GET /etf_information`

**Description:** Leverages OpenAI's GPT-4o-mini to analyze US markets and provide personalized ETF recommendations based on your target interest rate.

**Query Parameters:**

- `interest_rate` (number, required) - Target annual return percentage (0-100)

**Example Request:**

```bash
GET /etf_information?interest_rate=8.5
```

**Response Format:**

```json
{
  "success": true,
  "data": [
    {
      "etf_symbol": "SPY",
      "etf_name": "SPDR S&P 500 ETF Trust",
      "etf_avg_return": 10.5,
      "etf_description": "Tracks the S&P 500 index, providing broad exposure to large-cap US equities."
    },
    {
      "etf_symbol": "QQQ",
      "etf_name": "Invesco QQQ Trust",
      "etf_avg_return": 15.2,
      "etf_description": "Tracks the Nasdaq-100 Index, focused on large-cap technology stocks."
    }
    // ... up to 10 ETF recommendations
  ],
  "count": 10
}
```

**Features:**

- 🤖 AI-powered analysis using OpenAI GPT-4o-mini
- 📊 Returns up to 10 ETF recommendations
- 🎯 Matches ETFs with historical returns close to your target rate
- 📈 Includes ticker symbol, name, average return, and detailed description
- ⚡ Fast response time with intelligent caching

**Error Response:**

```json
{
  "success": false,
  "error": "interest_rate must be between 0 and 100"
}
```

**Try it:**

```bash
# Production
curl "https://back-end-compound-interest-calculator.onrender.com/etf_information?interest_rate=8.5"

# Local
curl "http://localhost:3536/etf_information?interest_rate=8.5"
```

## Tech Stack

**Backend**:

- Go 1.21+
- Gin Framework (HTTP router)
- OpenAI Go SDK (AI-powered recommendations)
- CORS middleware

**Frontend**:

- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Recharts (data visualization)
- Lucide React (icons)

**AI/ML**:

- OpenAI GPT-4o-mini (ETF analysis and recommendations)

**Deployment**:

- Backend: Render
- Frontend: GitHub Pages

## Environment Variables

### Backend (Required for ETF Recommendations)

Create a `.env` file in `backend/Go_API/`:

```env
OPENAI_API_KEY=your-openai-api-key-here
USE_MOCK_ETF_DATA=false  # Set to true for development without OpenAI credits
```

**For Production (Render):**
Set environment variables in Render Dashboard:

- `OPENAI_API_KEY` - Your OpenAI API key
- `GIN_MODE` - `release`

### Frontend (Optional)

Create a `.env` file in `frontend/project/`:

```env
VITE_CMPI_BACK_GO_API=https://back-end-compound-interest-calculator.onrender.com
```

## Project Structure

```
Compound-Interest-Calculator/
├── backend/
│   └── Go_API/
│       ├── handlers/           # HTTP request handlers
│       │   ├── calculation_handler.go
│       │   └── etf_insights_handler.go
│       ├── services/           # Business logic layer
│       │   ├── calculation_service.go
│       │   └── etf_information_service.go
│       ├── models/             # Data structures
│       │   ├── calculation.go
│       │   └── etf_information.go
│       ├── main.go             # Application entry point
│       └── Dockerfile
├── frontend/
│   └── project/
│       ├── src/
│       │   ├── components/     # React components
│       │   │   ├── CalculatorForm.tsx
│       │   │   ├── CompoundChart.tsx (Recharts)
│       │   │   ├── ETFSection.tsx
│       │   │   ├── Header.tsx
│       │   │   └── Footer.tsx
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── public/             # Static assets
└── .github/
    └── workflows/              # CI/CD pipelines
        └── frontCICD.yml
```

## API Architecture

```
Client Request → Handler (HTTP) → Service (Business Logic) → External API/Database → Response
```

**Example Flow - ETF Recommendations:**

1. Client sends GET request to `/etf_information?interest_rate=8.5`
2. `ETFInsightsHandler` validates the interest_rate parameter
3. `ETFInformationService` builds an AI prompt
4. Service calls OpenAI GPT-4o-mini API
5. AI analyzes market data and generates ETF recommendations
6. Service parses JSON response
7. Handler wraps data in response format
8. Client receives personalized ETF recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

## MIT License - feel free to use this project for learning and development

Developed with ❤️ by diego4lbarracin
