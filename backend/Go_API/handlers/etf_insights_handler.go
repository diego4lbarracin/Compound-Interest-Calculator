package handlers

import (
	"example/Go_API/models"
	"example/Go_API/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ETFInsightsHandler handles ETF information requests
type ETFInsightsHandler struct {
    etfService *services.ETFInformationService
}

// NewETFInsightsHandler creates a new ETF insights handler
func NewETFInsightsHandler() *ETFInsightsHandler {
    return &ETFInsightsHandler{
        etfService: services.NewETFInformationService(),
    }
}

// GetETFInformation handles GET /etf_information?interest_rate=8.5
func (h *ETFInsightsHandler) GetETFInformation(c *gin.Context) {
    // Extract interest_rate parameter from query
    interestRateStr := c.Query("interest_rate")

    if interestRateStr == "" {
        c.JSON(http.StatusBadRequest, models.ETFInformationResponse{
            Success: false,
            Error:   "interest_rate parameter is required",
        })
        return
    }

    // Parse interest rate to float64
    interestRate, err := strconv.ParseFloat(interestRateStr, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, models.ETFInformationResponse{
            Success: false,
            Error:   "interest_rate must be a valid number",
        })
        return
    }

    // Validate interest rate is reasonable
    if interestRate < 0 || interestRate > 100 {
        c.JSON(http.StatusBadRequest, models.ETFInformationResponse{
            Success: false,
            Error:   "interest_rate must be between 0 and 100",
        })
        return
    }

    // Call service to get ETF information
    etfs, err := h.etfService.GetETFInformation(interestRate)
    if err != nil {
        c.JSON(http.StatusInternalServerError, models.ETFInformationResponse{
            Success: false,
            Error:   err.Error(),
        })
        return
    }

    // Build and send successful response
    c.JSON(http.StatusOK, models.ETFInformationResponse{
        Success: true,
        Data:    etfs,
        Count:   len(etfs),
    })
}