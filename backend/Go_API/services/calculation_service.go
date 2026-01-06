package services

import (
	"example/Go_API/models"
	"math"
	"strconv"
	"strings"
)

// GetCompoundFrequency returns the number of times interest is compounded per year
func GetCompoundFrequency(frequency string) (int, error) {
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

// CalculateCompoundInterest performs the compound interest calculation and returns the results
func CalculateCompoundInterest(initialInvestment, monthlyContribution, interestRate float64, savingYears, compoundFrequency int) []models.Interest_Calculation {
	// Create array to store results for each year
	var results []models.Interest_Calculation

	// Calculate compound interest for each year
	r := interestRate / 100.0                // Convert percentage to decimal
	
	// Year 0: Initial state
	results = append(results, models.Interest_Calculation{
		Year:              0,
		Current_principal: initialInvestment,
		Interest_earned:   0,
		Total_amount:      initialInvestment,
	})
	
	balance := initialInvestment
	
	// Determine months per compounding period
	var monthsPerPeriod int
	if compoundFrequency == 1 { // Annually
		monthsPerPeriod = 12
	} else if compoundFrequency == 2 { // Semiannually
		monthsPerPeriod = 6
	} else if compoundFrequency == 4 { // Quarterly
		monthsPerPeriod = 3
	} else if compoundFrequency == 12 { // Monthly
		monthsPerPeriod = 1
	} else if compoundFrequency == 365 { // Daily
		monthsPerPeriod = 0 // Handle separately
	}
	
	for year := 1; year <= savingYears; year++ {
		
		if compoundFrequency == 365 { // Daily compounding
			// For daily compounding, compound each day and add monthly contribution at end of each month
			dailyRate := r / 365.0
			
			for month := 1; month <= 12; month++ {
				daysInMonth := 30 // Approximation
				// Compound daily for the month
				balance = balance * math.Pow(1 + dailyRate, float64(daysInMonth))
				// Add monthly contribution at end of month
				balance += monthlyContribution
			}
		} else {
			// For other frequencies, process by compounding periods
			periodsPerYear := 12 / monthsPerPeriod
			ratePerPeriod := r / float64(compoundFrequency)
			
			for period := 0; period < periodsPerYear; period++ {
				// Compound the current balance
				balance = balance * (1 + ratePerPeriod)
				// Add contributions made during this period (at the end)
				balance += monthlyContribution * float64(monthsPerPeriod)
			}
		}
		
		// Calculate values for this year
		totalContributions := initialInvestment + (float64(year) * 12 * monthlyContribution)
		interestEarned := balance - totalContributions
		
		result := models.Interest_Calculation{
			Year:              year,
			Current_principal: totalContributions,
			Interest_earned:   interestEarned,
			Total_amount:      balance,
		}
		results = append(results, result)
	}

	return results
}
