package main

import (
	"example/Go_API/handlers"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main(){
	router := gin.Default()

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allows all origins - restrict in production
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Dude, you actually overcomplicated things, just use render instead, Welcome to Compound Interest Calculator API ESTE MENSAJE VIAJO DESDE YOPAL HASTA NORTH VIRGINIA Y LUEGO A BOGOTA",
            "endpoints": gin.H{
                "calculation": "/calculation",
            },
        })
    })
	
	router.GET("/calculation", handlers.GetCalculation)

	router.Run(":3536")
}
