# Compound-Interest-Calculator

[Click Here to Test the Live Application :)](https://diego4lbarracin.github.io/Compound-Interest-Calculator/)

![Project Screenshot](https://raw.githubusercontent.com/diego4lbarracin/Diego_Personal_Website/refs/heads/main/public/images/projects/Compund_Interest_Calculator.jpg)

This is a Compound Interest Calculator that allows users to simulate how compound interest could help them increase their savings and obtain investing insights for replicating the values obtained in the calculation using ETFs whose average return has been close to the one selected by the user for the simulation in the last 5 years. The application is accessible through the internet and follows an API REST architecture, where the frontend sends a HTTP request with the parameters for the calculation to the backend, which handles the request by executing a method that receives the parameters and returns an array with the calculation for each year and, while doing that, makes a call to the OpenAI API and obtains information about 10 ETFS that have had an average return similar to the one obtained by parameter from the HTTP request, includes the ETF symbol, ETF Provider (iShares, Vanguard, etc.) and a brief description of the ETF, then organizes the response in an JSON file and sends it back to the frontend where finally, both the calculation and the investment insights are displayed to the user.

---

## Features

- Available for mobile and desktop.
- Calculate compound interest with different compounding frequencies (Daily, Monthly, Annually, Semiannually).
- Interactive line chart where the principal vs. total amount growth is displayed.
- 10 ETF recommendations for US stock markets using OpenAI API (GPT-4o-mini) whose performance in the previous 5 years is close to the interest rate typed by the user.
- Dark/Light theme.

---

## Endpoints

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
  //Until the year obtained from the GET request.
]
```

### 2. ETF Recommendations using AI

**Endpoint:** `GET /etf_information`

**Description:** The API executes an API call to the OpenAI's API, and using the model GPT-4o-mini, analyze US stock markets and returns a JSON file with personalized ETF recommendations based on the user's target interest rate from the simulation.

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

**Error Response:**

```json
{
  "success": false,
  "error": "interest_rate must be between 0 and 100"
}
```

**Test it :D :**

```bash
# Production
curl "https://back-end-compound-interest-calculator.onrender.com/etf_information?interest_rate=8.5"

# Local
curl "http://localhost:3536/etf_information?interest_rate=8.5"
```

---

## Technologies Used

**Backend**:

- Go 1.25.
- Gin Framework (HTTP router).
- OpenAI Go SDK (AI-powered recommendations).
- CORS middleware.
- Docker.

**Frontend**:

- React
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)

**AI/ML**:

- OpenAI GPT-4o-mini (ETF analysis and recommendations)

---

## Deployment

The **backend** is currently containerized and running on Render, where the repository is linked and the folder `/backend/GO_API` is set a root folder and, after a successful pull request to the main branch, follows the instructions in the Dockerfile, builds and run the container.

The **frontend** is deployed on GitHub pages using a CI/CD pipeline using GitHub Actions and workflows. Each workflow is executed after a successful pull request to the main branch.

- Backend: Render
- Frontend: GitHub Pages

**Fun fact:** The backend was deployed at first on the AWS cloud, with the respective CI/CD pipeline created using a workflow executed by GitHub actions, which was configured to use the EC2 instance on AWS as runner. I decided to switch to Render to reduce hosting costs for the project, but it was a great educational experience though.

---

## (Current) Project Structure

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
    └── workflows/              # CI/CD pipeline
        └── frontCICD.yml
```

## API Architecture

```
[Client Request] (Frontend) ⇄ [Handler (HTTP) ⇄ Service (Business Logic and API Calls to External Service)] (Backend) ⇄ External OpenAI's API
```

---

Developed by diego4lbarracin
