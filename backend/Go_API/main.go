package main

import (
	"example/Go_API/handlers"

	"github.com/gin-gonic/gin"
)

func main(){
	router := gin.Default()

	router.GET("/calculation", handlers.GetCalculation)

	router.Run(":8080")
}
