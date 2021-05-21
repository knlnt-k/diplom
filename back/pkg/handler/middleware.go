package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

const (
	AUTHORIZATION_HEADER = "Authorization"
)

func (handler *Handler) tokenIdentity(ctx *gin.Context) {
	var ctxKey = "companyID"
	header := ctx.GetHeader(AUTHORIZATION_HEADER)
	if header == "" {
		NewErrorResponse(
			ctx,
			http.StatusUnauthorized,
			back.Error{"middleware > tokenIdentity - header is empty", "Отсутствует токен"},
		)
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		NewErrorResponse(
			ctx,
			http.StatusUnauthorized,
			back.Error{"middleware > tokenIdentity - token not valid", "Не валидный токен"},
		)
		return
	}

	tokenInfo, error := handler.services.Authorization.ParseToken(headerParts[1])
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusUnauthorized, error)
		return
	}

	if !tokenInfo.IsCompany { ctxKey = "userID" }

	ctx.Set(ctxKey, tokenInfo.Id)
	ctx.Set("access", tokenInfo.Access)
}

func (handler *Handler) accessEditTaskIdentity(ctx *gin.Context) {
	if !(ctx.Keys["access"] == back.ACCESSES["admin"] || ctx.Keys["access"] == back.ACCESSES["task_editor"]) {
		NewErrorResponse(
			ctx,
			http.StatusForbidden,
			back.Error{
				LOG_TASK_MSG + "accessEditTaskIdentity - not access",
				"У вас нет прав для создания и редактирования задач",
			},
		)
		return
	}
}

func (handler *Handler) accessEditProjectIdentity(ctx *gin.Context) {
	if ctx.Keys["access"] != back.ACCESSES["admin"] {
		NewErrorResponse(
			ctx,
			http.StatusForbidden,
			back.Error{
				LOG_TASK_MSG + "accessEditProjectIdentity - not access",
				"У вас нет прав для создания и редактирования проектов",
			},
		)
		return
	}
}