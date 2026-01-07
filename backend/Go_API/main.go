package main

import (
	"example/Go_API/handlers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main(){
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Welcome to Compound Interest Calculator API",
            "endpoints": gin.H{
                "calculation": "/calculation",
            },
        })
    })
	
	router.GET("/calculation", handlers.GetCalculation)

	router.Run(":3536")
}
