package handler

import (
	"diplom/back/pkg/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (handler *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	v1 := router.Group("/v1")
	{
		auth := v1.Group("/auth")
		{
			auth.POST("sign-up-company", handler.signUpCompany)
			auth.POST("sign-in-company", handler.signInCompany)
			auth.POST("sign-up-user", handler.signUpUser)
			auth.POST("sign-in-user", handler.signInUser)
			auth.POST("get-companies", handler.GetCompanies)
		}

		api := v1.Group("/api", handler.tokenIdentity)
		{
			task := api.Group("", handler.accessEditTaskIdentity)
			{
				task.POST("create-task", handler.createTask)
				task.PUT("update-task", handler.updateTask)
				task.DELETE("delete-tasks", handler.deleteTasks)
			}
			api.POST("get-tasks", handler.getTasks)

			project := api.Group("", handler.accessEditProjectIdentity)
			{
				project.POST("create-project", handler.createProject)
				project.PUT("update-project", handler.updateProject)
				project.DELETE("delete-projects", handler.deleteProjects)
			}
			api.POST("get-projects", handler.getProjects)

			api.POST("/set-time", handler.setTime)
			api.PUT("/update-time", handler.updateTime)
			api.POST("/get-times", handler.getTimes)

			api.POST("/set-comment", handler.setComment)
			api.PUT("/update-comment", handler.updateComment)
			api.POST("/get-comments", handler.getComments)
			api.DELETE("/delete-comments", handler.deleteComments)

			api.POST("/get-users", handler.getUsers)
		}
	}

	return router
}