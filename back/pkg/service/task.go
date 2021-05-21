package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

const (
	LOG_TASK_MSG = "service > task > "
)

type TaskService struct {
	repo repository.Task
	repoProject repository.Project
}

func NewTaskService(repo repository.Task, repoProject repository.Project) *TaskService {
	return &TaskService{repo: repo, repoProject: repoProject}
}

func (service *TaskService) CreateTask(task back.Task) (int64, back.Error) {
	projects, error := service.repoProject.GetProjects([]int{task.ProjectID}, back.ProjectFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(projects) == 0 {
		return 0, back.Error{
			LOG_TASK_MSG + "CreateTask > service.repoProject.GetProjects + \n" + error.Log,
			"Выбранный проект не найден",
		}
	}

	return service.repo.CreateTask(task)
}

func (service *TaskService) UpdateTask(task back.Task) (int64, back.Error) {
	return service.repo.UpdateTask(task)
}

func (service *TaskService) GetTasks(ids []int, filter back.TaskFilter, sort back.Sort, pagination back.Pagination) ([]back.Task, back.Error) {
	return service.repo.GetTasks(ids, filter, sort, pagination)
}

func (service *TaskService) DeleteTasks(ids []int) back.Error {
	return service.repo.DeleteTasks(ids)
}
