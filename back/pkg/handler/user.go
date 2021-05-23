package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_USER_MSG = "handler > user > "
)

type requestGetUsers struct {
	Ids []int `json:"ids"`
	Filter back.UserFilter `json:"filter"`
}

func (handler *Handler) getUsers(ctx *gin.Context) {
	var request requestGetUsers

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_USER_MSG + "getUsers > binding JSON - " + error.Error(),
			"Не корректный запрос",
		})
		return
	}

	users, error := handler.services.User.GetUsers(request.Ids, request.Filter)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"users": users,
	})
}

func (handler *Handler) updateUser(ctx *gin.Context) {
	var request back.User

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_USER_MSG + "updateUser > binding JSON - " + error.Error(),
			"Не корректный запрос",
		})
		return
	}

	companyID, isCompany := ctx.Get("companyID")
	userID, isUser := ctx.Get("userID")

	if isCompany && companyID != int64(request.CompanyID) {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{"", "Вы не можете управлять данным пользователем" })
		return
	} else if isUser && userID != request.Id {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{"", "Вы не можете управлять данным пользователем" })
		return
	} else {
		id, error := handler.services.User.UpdateUser(request)
		if error.Log != "" { NewErrorResponse(ctx, http.StatusBadRequest, error); return }

		ctx.JSON(http.StatusOK, map[string]interface{} { "id": id })
	}
}