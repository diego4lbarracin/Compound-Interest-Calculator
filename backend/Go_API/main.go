package main

import (
	"example/Go_API/handlers"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
    // Load .env file
    if err := godotenv.Load(); err != nil {
        log.Println("Warning: .env file not found, using system environment variables")
    }

    router := gin.Default()

    // Configure CORS
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: false,
        MaxAge:           12 * time.Hour,
    }))

    // Initialize handlers
    etfInsightsHandler := handlers.NewETFInsightsHandler()

    // Root endpoint
    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Welcome to Compound Interest Calculator API",
            "endpoints": gin.H{
                "calculation":     "/calculation?initial_investment=1000&monthly_contribution=100&saving_years=10&interest_rate=8&compound_frequency=monthly",
                "etf_information": "/etf_information?interest_rate=8.5",
                "health":          "/health",
            },
        })
    })

    // Existing calculation endpoint
    router.GET("/calculation", handlers.GetCalculation)

    // New ETF information endpoint
    router.GET("/etf_information", etfInsightsHandler.GetETFInformation)

    // Health check
    router.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "healthy"})
    })

    // Test the ETF service with a random interest rate on startup
    fmt.Println("\n=== Testing ETF Information Service ===")
    testInterestRate := 8.5
    fmt.Printf("Fetching ETF recommendations for %.2f%% interest rate...\n\n", testInterestRate)

    // Uncomment to test on startup
    /*
    etfService := services.NewETFInformationService()
    etfs, err := etfService.GetETFInformation(testInterestRate)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Successfully retrieved %d ETFs:\n", len(etfs))
        for i, etf := range etfs {
            fmt.Printf("\n%d. %s (%s)\n", i+1, etf.EtfName, etf.EtfSymbol)
            fmt.Printf("   Average Return: %.2f%%\n", etf.EtfAvgReturn)
            fmt.Printf("   Description: %s\n", etf.EtfDescription)
        }
    }
    */
    
    fmt.Println("\n=== Server Starting ===")
    fmt.Println("Server running on http://localhost:3536")

    router.Run(":3536")
}