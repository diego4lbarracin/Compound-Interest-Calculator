package handlers

import (
	"example/Go_API/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetCalculation(c *gin.Context){
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

	compoundFrequency, err := services.GetCompoundFrequency(compoundFrequencyStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid compound_frequency. Use: annually, semiannually, quarterly, monthly, daily, or a number"})
		return
	}

	// Call the calculation function
	results := services.CalculateCompoundInterest(initialInvestment, monthlyContribution, interestRate, savingYears, compoundFrequency)

	// Send back the response as JSON
	c.JSON(http.StatusOK, results)
}
