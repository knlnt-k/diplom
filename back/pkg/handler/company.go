package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

type company struct {
	Id int64 `json:"id"`
	Name string `json:"name"`
}

type responseGetCompanies struct {
	Companies []company `json:"companies"`
}

type requestGetCompanies struct {
	IDs []int `json:"ids"`
	Filter back.CompanyFilter `json:"filter"`
}

func (handler *Handler) GetCompanies(ctx *gin.Context) {
	var request requestGetCompanies

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_PROJECT_MSG + "GetCompanies > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	companies, error := handler.services.Company.GetCompanies(request.IDs, request.Filter)
	answer := new(responseGetCompanies)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	for _, value := range companies{
		answer.Companies = append(answer.Companies, company{value.Id, value.Name})
	}

	ctx.JSON(http.StatusOK, answer)
}
