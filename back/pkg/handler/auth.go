package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_AUTH_MSG = "handler > auth > "
)

type requestSignUpCompany struct {
	back.Company
}

type requestSignInCompany struct {
	Login string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type requestSignUpUser struct {
	back.RequiredUser
}

type requestSignInUser struct {
	Login string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
	CompanyID int `json:"company_id" binding:"required"`
}

func (handler *Handler) signUpCompany(ctx *gin.Context) {
	var request requestSignUpCompany
	var id int64

	if err := ctx.BindJSON(&request); err != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				"handler > auth > sigUpCompany > binding JSON - " + err.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	existCompanies, error := handler.services.Company.GetCompanies([]int{}, back.CompanyFilter{request.Name, request.Login})
	if error.Log != "" || len(existCompanies) != 0 {
		NewErrorResponse(ctx, http.StatusInternalServerError, back.Error{
			LOG_AUTH_MSG + "signUpCompany > handler.services.Company.GetCompanies + " + error.Log,
			"Компания с такими данными уже существует",
		})
		return
	}

	id, err := handler.services.Authorization.CreateCompany(request.Company)
	if err.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (handler *Handler) signInCompany(ctx *gin.Context) {
	var request requestSignInCompany

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				"handler > auth > signInCompany > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	token, error := handler.services.Authorization.GenerateTokenForCompany(request.Login, request.Password)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"token": token,
	})
}

func (handler *Handler) signUpUser(ctx *gin.Context) {
	var request requestSignUpUser
	var id int64

	if err := ctx.BindJSON(&request); err != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				"handler > auth > signUpUser > binding JSON - " + err.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	existUsers, error := handler.services.User.GetUsers([]int{}, back.UserFilter{request.Login, []int{}})
	if error.Log != "" || len(existUsers) != 0 {
		NewErrorResponse(ctx, http.StatusInternalServerError, back.Error{
			LOG_AUTH_MSG + "signUpUser > handler.services.User.GetUsers + " + error.Log,
			"Пользователь с таким логином уже существует",
		})
		return
	}

	existCompanies, error := handler.services.Company.GetCompanies([]int{request.CompanyID}, back.CompanyFilter{})
	if error.Log != "" || len(existCompanies) == 0 {
		NewErrorResponse(ctx, http.StatusInternalServerError, back.Error{
			LOG_AUTH_MSG + "signUpUser > handler.services.Company.GetCompanies + " + error.Log,
			"Компания не найдена",
		})
		return
	}

	id, err := handler.services.Authorization.CreateUser(request.RequiredUser)
	if err.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (handler *Handler) signInUser(ctx *gin.Context) {
	var request requestSignInUser

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				"handler > auth > signInUser > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	token, error := handler.services.Authorization.GenerateTokenForUser(request.Login, request.Password, request.CompanyID)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"token": token,
	})
}
