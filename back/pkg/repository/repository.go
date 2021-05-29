package repository

import (
	"diplom/back"
	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateCompany(company back.Company) (int64, back.Error)
	CreateUser(user back.RequiredUser) (int64, back.Error)
	GetCompany(login, password string) (back.Company, back.Error)
	GetUser(login, password string, companyID int) (back.RequiredUser, back.Error)
}

type Company interface {
	GetCompanies(ids []int, filter back.CompanyFilter) ([]back.Company, back.Error)
}

type Task interface {
	CreateTask(task back.Task) (int64, back.Error)
	UpdateTask(task back.Task) (int64, back.Error)
	GetTasks(ids []int, filter back.TaskFilter, sort back.Sort, pagination back.Pagination) ([]back.Task, back.Error)
	DeleteTasks(ids []int) back.Error
	ChangeStatus(id int, status int, closed int) back.Error
}

type Project interface {
	CreateProject(project back.Project) (int64, back.Error)
	UpdateProject(project back.Project) (int64, back.Error)
	GetProjects(ids []int, filter back.ProjectFilter, sort back.Sort, pagination back.Pagination) ([]back.Project, back.Error)
	DeleteProjects(ids []int) back.Error
}

type User interface {
	GetUsers(ids []int, filter back.UserFilter) ([]back.User, back.Error)
	UpdateUser(user back.User) (int, back.Error)
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

type Repository struct {
	Authorization
	Company
	Task
	Project
	User
	Times
	CommentsTasks
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthMySQL(db),
		Company: NewCompanyMySQL(db),
		Task: NewTaskMySQL(db),
		Project: NewProjectMySQL(db),
		User: NewUserMySQL(db),
		Times: NewTimesMySQL(db),
		CommentsTasks: NewCommentsTasksMySQL(db),
	}
}
