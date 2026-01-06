package main

import (
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Interest_Calculation struct{
	//Compounding period (year 1, 2, 3, ...).
	Year int `json:"year"`
	//Current principal amount: initial investment + total contributions for that period.
	Current_principal float64 `json:"current_principal"`
	//Interest earned during that period.
	Interest_earned float64 `json:"interest_earned"`
	//Total amount at the end of that period. (current principal + interest earned)
	Total_amount float64 `json:"total_amount"`
}

// getCompoundFrequency returns the number of times interest is compounded per year
func getCompoundFrequency(frequency string) (int, error) {
	switch strings.ToLower(frequency) {
	case "annually":
		return 1, nil
	case "semiannually":
		return 2, nil
	case "quarterly":
		return 4, nil
	case "monthly":
		return 12, nil
	case "daily":
		return 365, nil
	default:
		// Try to parse as integer
		n, err := strconv.Atoi(frequency)
		if err != nil {
			return 0, err
		}
		return n, nil
	}
}

func getCalculation(c *gin.Context){
	// Extract query parameters
	initialInvestmentStr := c.Query("initial_investment")
	monthlyContributionStr := c.Query("monthly_contribution")
	savingYearsStr := c.Query("saving_years")
	interestRateStr := c.Query("interest_rate")
	compoundFrequencyStr := c.Query("compound_frequency")
	
	// Convert to appropriate types
	initialInvestment, err := strconv.ParseFloat(initialInvestmentStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid initial_investment value"})
		return
	}

	monthlyContribution, err := strconv.ParseFloat(monthlyContributionStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid monthly_contribution value"})
		return
	}

	savingYears, err := strconv.Atoi(savingYearsStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid saving_years value"})
		return
	}

	interestRate, err := strconv.ParseFloat(interestRateStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid interest_rate value"})
		return
	}

	compoundFrequency, err := getCompoundFrequency(compoundFrequencyStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid compound_frequency. Use: annually, semiannually, quarterly, monthly, daily, or a number"})
		return
	}

	// Create array to store results for each year
	var results []Interest_Calculation

	// Calculate compound interest for each year
	r := interestRate / 100.0                // Convert percentage to decimal
	n := float64(compoundFrequency)          // Compounds per year
	ratePerPeriod := r / n                   // Rate per compound period
	
	// Year 0: Initial state
	results = append(results, Interest_Calculation{
		Year:              0,
		Current_principal: initialInvestment,
		Interest_earned:   0,
		Total_amount:      initialInvestment,
	})
	
	balance := initialInvestment
	
	for year := 1; year <= savingYears; year++ {
		
		// Process each month in the year
		for month := 1; month <= 12; month++ {
			// Determine how many times to compound this month
			// For quarterly: compound every 3 months (months 3, 6, 9, 12)
			// For monthly: compound every month
			// For annually: compound only at month 12
			shouldCompound := false
			
			if compoundFrequency == 12 { // Monthly
				shouldCompound = true
			} else if compoundFrequency == 4 { // Quarterly
				shouldCompound = (month % 3 == 0)
			} else if compoundFrequency == 2 { // Semiannually
				shouldCompound = (month % 6 == 0)
			} else if compoundFrequency == 1 { // Annually
				shouldCompound = (month == 12)
			} else if compoundFrequency == 365 { // Daily - approximate by compounding every month
				// For daily, we need to compound after each day
				daysInMonth := 30.0 // Approximation
				balance = balance * math.Pow(1 + ratePerPeriod, daysInMonth)
				shouldCompound = false // Already compounded above
			}
			
			if shouldCompound {
				balance = balance * (1 + ratePerPeriod)
			}
			
			// Add monthly contribution at the end of the month (after compounding)
			balance += monthlyContribution
		}
		
		// Calculate values for this year
		totalContributions := initialInvestment + (float64(year) * 12 * monthlyContribution)
		interestEarned := balance - totalContributions
		
		result := Interest_Calculation{
			Year:              year,
			Current_principal: totalContributions,
			Interest_earned:   interestEarned,
			Total_amount:      balance,
		}
		results = append(results, result)
	}

	// Send back the response as JSON
	c.JSON(http.StatusOK, results)
}


func main(){
	router := gin.Default()

	router.GET("/calculation", getCalculation)

	router.Run("localhost:8080")
}