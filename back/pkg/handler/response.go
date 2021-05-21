package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"log"
)

func NewErrorResponse(ctx *gin.Context, httpStatusCode int, err back.Error) {
	log.Printf(err.Log)
	ctx.AbortWithStatusJSON(httpStatusCode, map[string]interface{}{
		"message": err.Message,
	})
}
