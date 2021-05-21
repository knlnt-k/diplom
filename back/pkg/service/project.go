package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

type ProjectService struct {
	repo repository.Project
	repoTask repository.Task
}

func NewProjectService(repo repository.Project, repoTask repository.Task) *ProjectService {
	return &ProjectService{repo: repo, repoTask: repoTask}
}

func (service *ProjectService) CreateProject(project back.Project) (int64, back.Error) {
	return service.repo.CreateProject(project)
}

func (service *ProjectService) UpdateProject(project back.Project) (int64, back.Error) {
	return service.repo.UpdateProject(project)
}

func (service *ProjectService) GetProjects(ids []int, filter back.ProjectFilter, sort back.Sort, pagination back.Pagination) ([]back.Project, back.Error) {
	return service.repo.GetProjects(ids, filter, sort, pagination)
}

func (service *ProjectService) DeleteProjects(ids []int) back.Error {
	filter := back.TaskFilter{"", []int{}, []int{}, ids, []int{}, []int{}}
	tasks, error := service.repoTask.GetTasks([]int{}, filter, back.Sort{}, back.Pagination{})
	if error.Log == "" && len(tasks) != 0 {
		var ids []int

		for _, task := range tasks {
			ids = append(ids, int(task.Id))
		}

		service.repoTask.DeleteTasks(ids)
	}

	return service.repo.DeleteProjects(ids)
}
