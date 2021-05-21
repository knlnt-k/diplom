package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

type Authorization interface {
	CreateCompany(company back.Company) (int64, back.Error)
	CreateUser(user back.User) (int64, back.Error)
	GenerateTokenForCompany(login, password string) (string, back.Error)
	GenerateTokenForUser(login, password string, companyID int) (string, back.Error)
	ParseToken(token string) (*tokenClaims, back.Error)
}

type Company interface {
	GetCompanies(ids []int, filter back.CompanyFilter) ([]back.Company, back.Error)
}

type Task interface {
	CreateTask(task back.Task) (int64, back.Error)
	UpdateTask(task back.Task) (int64, back.Error)
	GetTasks(ids []int, filter back.TaskFilter, sort back.Sort, pagination back.Pagination) ([]back.Task, back.Error)
	DeleteTasks(ids []int) back.Error
}

type Project interface {
	CreateProject(task back.Project) (int64, back.Error)
	UpdateProject(task back.Project) (int64, back.Error)
	GetProjects(ids []int, filter back.ProjectFilter, sort back.Sort, pagination back.Pagination) ([]back.Project, back.Error)
	DeleteProjects(ids []int) back.Error
}

type User interface {
	GetUsers(ids []int, filter back.UserFilter) ([]back.User, back.Error)
}

type Times interface {
	Set(data back.Times) (int64, back.Error)
	Update(data back.Times) (int64, back.Error)
	Get(filter back.TimesFilter, sort back.Sort) ([]back.Times, back.Error)
}

type CommentsTasks interface {
	Set(data back.CommentsTasks) (int64, back.Error)
	Update(data back.CommentsTasks) (int64, back.Error)
	Get(filter back.CommentsTasksFilter, sort back.Sort) ([]back.CommentsTasks, back.Error)
	Delete(ids []int) back.Error
}

type Service struct {
	Authorization
	Company
	Task
	Project
	User
	Times
	CommentsTasks
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repo.Authorization),
		Company: NewCompanyService(repo.Company),
		Task: NewTaskService(repo.Task, repo.Project),
		Project: NewProjectService(repo.Project, repo.Task),
		User: NewUserService(repo.User),
		Times: NewTimes(repo.Times),
		CommentsTasks: NewCommentsTasksService(repo.CommentsTasks),
	}
}