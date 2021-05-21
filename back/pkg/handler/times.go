package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_TIMES_MSG = "handler > task > "
)

func(handler *Handler) setTime(ctx *gin.Context) {
	var request back.Times

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TIMES_MSG + "setTime > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	if request.UserID != back.ID_ADMIN_USER {
		users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
		if error.Log != "" || len(users) == 0 {
			NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
				LOG_TIMES_MSG + "setTime > handler.services.User.GetUsers + " + error.Log,
				"Пользователь, на которого вы пытаетесь установить затраченное время, не найден",
			})
			return
		}
	}

	tasks, error := handler.services.Task.GetTasks([]int{request.TaskID}, back.TaskFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(tasks) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_TIMES_MSG + "setTime > handler.services.Task.GetTasks + " + error.Log,
			"Задача, на которую вы пытаетесь установить затраченное время, не найдена",
		})
		return
	}

	id, error := handler.services.Times.Set(request)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (handler *Handler) updateTime(ctx *gin.Context) {
	var request back.Times

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TIMES_MSG + "updateTime > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	if request.UserID != back.ID_ADMIN_USER {
		users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
		if error.Log != "" || len(users) == 0 {
			NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
				LOG_TIMES_MSG + "updateTime > handler.services.User.GetUsers + " + error.Log,
				"Пользователь, на которого вы пытаетесь установить затраченное время, не найден",
			})
			return
		}
	}

	tasks, error := handler.services.Task.GetTasks([]int{request.TaskID}, back.TaskFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(tasks) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_TIMES_MSG + "updateTime > handler.services.Task.GetTasks + " + error.Log,
			"Задача, на которую вы пытаетесь установить затраченное время, не найдена",
		})
		return
	}

	id, error := handler.services.Times.Update(request)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestGetTimes struct {
	Filter back.TimesFilter `json:"filter"`
	Sort back.Sort `json:"sort"`
}

func (handler *Handler) getTimes(ctx *gin.Context) {
	var request requestGetTimes

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_TIMES_MSG + "getTimes > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	times, error := handler.services.Times.Get(request.Filter, request.Sort)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"times": times,
	})
}
