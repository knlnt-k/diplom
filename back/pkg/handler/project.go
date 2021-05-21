package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_PROJECT_MSG = "handler > project > "
)

type requestCreateProject struct {
	back.Project
}

func (handler *Handler) createProject(ctx *gin.Context) {
	var request requestCreateProject

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_PROJECT_MSG + "createProject > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	companies, error := handler.services.Company.GetCompanies([]int{request.CompanyID}, back.CompanyFilter{})
	if error.Log != "" || len(companies) == 0 {
		NewErrorResponse(
			ctx,
			http.StatusInternalServerError,
			back.Error{
				LOG_PROJECT_MSG + "createProject > handler.services.Company.GetCompanies",
				"Не возмонжо создать проект, компания не найдена",
			},
		)
		return
	}

	id, error := handler.services.Project.CreateProject(request.Project)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestUpdateProject struct {
	back.Project
}

func (handler *Handler) updateProject(ctx *gin.Context) {
	var request requestUpdateProject

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_PROJECT_MSG + "updateProject > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	companies, error := handler.services.Company.GetCompanies([]int{request.CompanyID}, back.CompanyFilter{})
	if error.Log != "" || len(companies) == 0 {
		NewErrorResponse(
			ctx,
			http.StatusInternalServerError,
			back.Error{
				LOG_PROJECT_MSG + "updateProject > handler.services.Company.GetCompanies",
				"Не возмонжо обновить проект, компания не найдена",
			},
		)
		return
	}

	id, error := handler.services.Project.UpdateProject(request.Project)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestGetProjects struct {
	Ids []int `json:"ids" binding:"required"`
	Filter back.ProjectFilter `json:"filter"`
	Sort back.Sort `json:"sort"`
	Pagination back.Pagination `json:"pagination"`
}

func (handler *Handler) getProjects(ctx *gin.Context) {
	var request requestGetProjects
	var total = 0

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_PROJECT_MSG + "getProjects > binding JSON - " + error.Error(),
				"Не корректный запрос",
			},
		)
		return
	}

	projects, error := handler.services.Project.GetProjects(request.Ids, request.Filter, request.Sort, request.Pagination)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	total = len(projects)

	if request.Pagination.Limit != 0 {
		projectsWithoutLimit, error := handler.services.Project.GetProjects(request.Ids, request.Filter, request.Sort, back.Pagination{})
		if error.Log != "" {
			NewErrorResponse(ctx, http.StatusBadRequest, error)
			return
		}

		total = len(projectsWithoutLimit)
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"projects": projects,
		"total": total,
	})
}

type requestDeleteProject struct {
	Ids []int `json:"ids" binding:"required"`
}

func (handler *Handler) deleteProjects(ctx *gin.Context) {
	var request requestDeleteProject

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_PROJECT_MSG + "deleteProject > binding JSON - " + error.Error(),
			"Не корректный запрос",
		})
		return
	}

	if error := handler.services.Project.DeleteProjects(request.Ids); error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string][]int{ "ids": request.Ids })
}