package handler

import (
	"diplom/back"
	"github.com/gin-gonic/gin"
	"net/http"
)

const (
	LOG_COMMENTS_TASKS_MSG = "handler > task > "
)

func(handler *Handler) setComment(ctx *gin.Context) {
	var request back.CommentsTasks

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_COMMENTS_TASKS_MSG + "setComment > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
	if error.Log != "" || len(users) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_COMMENTS_TASKS_MSG + "setComment > handler.services.User.GetUsers + " + error.Log,
			"Пользователь не найден",
		})
		return
	}

	tasks, error := handler.services.Task.GetTasks([]int{request.TaskID}, back.TaskFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(tasks) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_COMMENTS_TASKS_MSG + "setComment > handler.services.Task.GetTasks + " + error.Log,
			"Задача не найдена",
		})
		return
	}

	id, error := handler.services.CommentsTasks.Set(request)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (handler *Handler) updateComment(ctx *gin.Context) {
	var request back.CommentsTasks

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_COMMENTS_TASKS_MSG + "updateComment > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	users, error := handler.services.User.GetUsers([]int{request.UserID}, back.UserFilter{})
	if error.Log != "" || len(users) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_COMMENTS_TASKS_MSG + "updateComment > handler.services.User.GetUsers + " + error.Log,
			"Пользователь не найден",
		})
		return
	}

	tasks, error := handler.services.Task.GetTasks([]int{request.TaskID}, back.TaskFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(tasks) == 0 {
		NewErrorResponse(ctx, http.StatusBadRequest, back.Error{
			LOG_COMMENTS_TASKS_MSG + "updateTime > handler.services.Task.GetTasks + " + error.Log,
			"Задача не найдена",
		})
		return
	}

	id, error := handler.services.CommentsTasks.Update(request)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

type requestGetComments struct {
	Filter back.CommentsTasksFilter `json:"filter"`
	Sort back.Sort `json:"sort"`
}

func (handler *Handler) getComments(ctx *gin.Context) {
	var request requestGetComments

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_COMMENTS_TASKS_MSG + "getComments > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	comments, error := handler.services.CommentsTasks.Get(request.Filter, request.Sort)
	if error.Log != "" {
		NewErrorResponse(ctx, http.StatusInternalServerError, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"comments": comments,
	})
}

type requestDeleteComments struct {
	Ids []int `json:"ids" binding:"required"`
}

func (handler *Handler) deleteComments(ctx *gin.Context) {
	var request requestDeleteComments

	if error := ctx.BindJSON(&request); error != nil {
		NewErrorResponse(
			ctx,
			http.StatusBadRequest,
			back.Error{
				LOG_COMMENTS_TASKS_MSG + "deleteComments > binding JSON - " + error.Error(),
				"Не корректно заполнены поля"},
		)
		return
	}

	if error := handler.services.CommentsTasks.Delete(request.Ids); error.Log != "" {
		NewErrorResponse(ctx, http.StatusBadRequest, error)
		return
	}

	ctx.JSON(http.StatusOK, map[string][]int{ "ids": request.Ids })
}
