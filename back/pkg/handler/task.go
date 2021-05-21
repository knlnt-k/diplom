package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_TASK_MSG = "handler > task > "
)

type requestCreateTask struct {
	back.Task
}

func (handler *Handler) createTask(ctx *gin.Context) {
	var request requestCreateTask

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TASK_MSG + "createTask > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	if request.UserID != 0 {
		users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
		if error.Log != "" || len(users) == 0 {
			NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
				LOG_TASK_MSG + "createTask > handler.services.User.GetUsers + " + error.Log,
				"Пользователь, на которого вы пытаетесь установить задачу, не найден",
			})
			return
		}
	}

	projects, error := handler.services.Project.GetProjects([]int{request.ProjectID}, back.ProjectFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(projects) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_TASK_MSG + "createTask > handler.services.Project.GetProjects + " + error.Log,
			"Проект, для которого вы пытаетесь установить задачу, не найден",
		})
		return
	}

	id, error := handler.services.Task.CreateTask(request.Task)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestUpdateTask struct {
	back.Task
}

func (handler *Handler) updateTask(ctx *gin.Context) {
	var request requestUpdateTask

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TASK_MSG + "updateTask > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	if request.UserID != 0 {
		users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
		if error.Log != "" || len(users) == 0 {
			NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
				LOG_TASK_MSG + "updateTask > handler.services.User.GetUsers + " + error.Log,
				"Пользователь не найден",
			})
			return
		}
	}

	projects, error := handler.services.Project.GetProjects([]int{request.ProjectID}, back.ProjectFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(projects) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_TASK_MSG + "updateTask > handler.services.Project.GetProjects + " + error.Log,
			"Проект не найден",
		})
		return
	}

	id, error := handler.services.Task.UpdateTask(request.Task)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestGetTasks struct {
	Ids []int `json:"ids" binding:"required"`
	Filter back.TaskFilter `json:"filter"`
	Sort back.Sort `json:"sort"`
	Pagination back.Pagination `json:"pagination"`
}

func (handler *Handler) getTasks(ctx *gin.Context) {
	var request requestGetTasks
	var total = 0

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TASK_MSG + "getTasks > binding JSON - " + error.Error(),
				"Не корректный запрос",
			},
		)
		return
	}

	tasks, error := handler.services.Task.GetTasks(request.Ids, request.Filter, request.Sort, request.Pagination)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	total = len(tasks)

	if request.Pagination.Limit != 0 {
		tasksWithoutLimit, error := handler.services.Task.GetTasks(request.Ids, request.Filter, request.Sort, back.Pagination{})
		if error.Log != "" {
			NewErrorResponse(ctx, http.StatusBadRequest, error)
			return
		}

		total = len(tasksWithoutLimit)
	}


	ctx.JSON(http.StatusOK, map[string]interface{}{
		"tasks": tasks,
		"total": total,
	})
}

type requestDeleteTask struct {
	Ids []int `json:"ids" binding:"required"`
}

func (handler *Handler) deleteTasks(ctx *gin.Context) {
	var request requestDeleteTask

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_TASK_MSG + "deleteTask > binding JSON - " + error.Error(),
			"Не корректный запрос",
		})
		return
	}

	if error := handler.services.Task.DeleteTasks(request.Ids); error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string][]int{ "ids": request.Ids })
}