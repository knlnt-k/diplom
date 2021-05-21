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

type responseGetUsers struct {
	Id int64 `json:"id"`
	Name string `json:"name" binding:"required"`
	LastName string `json:"last_name"`
	Login string `json:"login" binding:"required"`
	CompanyID int `json:"company_id" binding:"required"`
	Price int `json:"price"`
	Profession int `json:"profession"`
	Access int `json:"access"`
}

func (handler *Handler) getUsers(ctx *gin.Context) {
	var request requestGetUsers
	var response []responseGetUsers

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

	for _, user := range users {
		response = append(response, responseGetUsers{
			user.Id,
			user.Name,
			user.LastName,
			user.Login,
			user.CompanyID,
			user.Price,
			user.Profession,
			user.Access,
		})
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"users": response,
	})
}