package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
	"time"
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

func (service *TaskService) changeClosedTimeForTask(id int64, status int) (int, back.Error) {
	var closed int64;
	existTask, err := service.repo.GetTasks([]int{int(id)}, back.TaskFilter{}, back.Sort{}, back.Pagination{})

	closed = int64(existTask[0].Closed)

	if err.Log != "" || existTask == nil { return 0, err }
	if existTask[0].Status != status && status == back.STATUSES["finish"] { closed = time.Now().Unix() }
	if existTask[0].Status != back.STATUSES["finish"] && existTask[0].Closed != 0 { closed = 0 }

	return int(closed), back.Error{}
}

func (service *TaskService) UpdateTask(task back.Task) (int64, back.Error) {

	closed, error := service.changeClosedTimeForTask(task.Id, task.Status)

	if error.Log != "" { return 0, error }

	task.Closed = closed

	return service.repo.UpdateTask(task)
}

func (service *TaskService) GetTasks(ids []int, filter back.TaskFilter, sort back.Sort, pagination back.Pagination) ([]back.Task, back.Error) {
	return service.repo.GetTasks(ids, filter, sort, pagination)
}

func (service *TaskService) DeleteTasks(ids []int) back.Error {
	return service.repo.DeleteTasks(ids)
}

func (service *TaskService) ChangeStatus(id int, status int)  back.Error {

	closed, error := service.changeClosedTimeForTask(int64(id), status)

	if error.Log != "" { return error }

	return service.repo.ChangeStatus(id, status, closed)
}
