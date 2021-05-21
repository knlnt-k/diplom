package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"
)

const (
	LOG_MSG_TASK = "repository > task-mysql > "
)

type TaskMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewTaskMySQL (db *sqlx.DB) *TaskMySQL {
	return &TaskMySQL{db: db, common: &back.Common{}}
}

func (repo *TaskMySQL) CreateTask(task back.Task) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s` (`name`, `description`, `user_id`, `priority`, `project_id`, `status`, `created`, `company_id`) VALUES ('%s', '%s', %d, %d, %d, 0, %d, %d)",
		TASKS_TABLE_NAME,
		task.Name, task.Description, task.UserID, task.Priority, task.ProjectID, time.Now().Unix(), task.CompanyID,
	)
	result, error := repo.db.Exec(query)

	if error != nil {
		return 0, back.Error{
			LOG_MSG_TASK + "CreateTask > repo.db.Exec - " + error.Error(),
			"При создании задачи произошла ошибка",
		}
	}

	id, error := result.LastInsertId()

	if error != nil {
		return 0, back.Error{
			LOG_MSG_TASK + "CreateTask > result.LastInsertId - " + error.Error(),
			"При создании задачи произошла ошибка",
		}
	}

	return id, back.Error{}
}

func (repo *TaskMySQL) UpdateTask(task back.Task) (int64, back.Error) {
	query := fmt.Sprintf(
		"UPDATE `%s` SET `name` = '%s', `description` = '%s', `user_id` = %d, `priority` = %d, `status` = %d WHERE `id` = %d",
		TASKS_TABLE_NAME,
		task.Name, task.Description, task.UserID, task.Priority, task.Status, task.Id,
	)
	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return 0, back.Error{
			LOG_MSG_TASK + "UpdateTask > repo.db.Exec - " + error.Error(),
			"При редактировании задачи произошла ошибка",
		}
	}

	return task.Id, back.Error{}
}

func (repo *TaskMySQL) GetTasks(ids []int, filter back.TaskFilter, sort back.Sort, pagination back.Pagination) ([]back.Task, back.Error) {
	var tasks []back.Task
	isExistFilter := filter.Text != "" ||
		len(filter.UserIDs) != 0 ||
		len(filter.Priorities) != 0 ||
		len(filter.ProjectIDs) != 0 ||
		len(filter.Statuses) != 0 ||
		len(filter.CompanyIDs) != 0
	var isAnd = false

	query := fmt.Sprintf("SELECT * FROM `%s`", TASKS_TABLE_NAME)

	if len(ids) != 0 || isExistFilter { query += " WHERE " }
	if len(ids) != 0 { query += repo.common.GetInSQLString(ids, "id"); isAnd = true }

	if isExistFilter {
		if filter.Text != "" {
			if isAnd { query += " AND " }
			query += fmt.Sprintf("(`name` LIKE '%%%s%%' OR `description` LIKE '%%%s%%')", filter.Text, filter.Text)
			isAnd = true
		}

		if len(filter.UserIDs) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.UserIDs, "user_id")
			isAnd = true
		}

		if len(filter.Priorities) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.Priorities, "priority")
			isAnd = true
		}

		if len(filter.ProjectIDs) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.ProjectIDs, "project_id")
			isAnd = true
		}

		if len(filter.Statuses) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.Statuses, "status")
			isAnd = true
		}

		if len(filter.CompanyIDs) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.CompanyIDs, "company_id")
		}
	}

	if sort.Field != "" { query += sort.GetSortSQLString() }
	if pagination.Limit != 0 { query += " " + pagination.GetSQLRequest() }

	error := repo.db.Select(&tasks, query)

	if error != nil {
		return nil, back.Error{ LOG_MSG_TASK + "GetTasks > repo.db.Select - " + error.Error(), "" }
	}

	return tasks, back.Error{}
}

func (repo *TaskMySQL) DeleteTasks(ids []int) back.Error {
	tasks, err := repo.GetTasks(ids, back.TaskFilter{}, back.Sort{}, back.Pagination{})
	if err.Log != "" || len(tasks) == 0 {
		return back.Error{ LOG_MSG_TASK + "DeleteTask > repo.GetTasks", "Задача не найдена" }
	}

	query := fmt.Sprintf("DELETE FROM `%s` WHERE %s", TASKS_TABLE_NAME, repo.common.GetInSQLString(ids, "id"))
	result, error := repo.db.Exec(query)

	repo.db.Exec(fmt.Sprintf("DELETE FROM `%s` WHERE %s", TIMES_TABLE_NAME, repo.common.GetInSQLString(ids, "task_id")))

	if error != nil || result == nil {
		return back.Error{ LOG_MSG_TASK + "DeleteTask > repo.db.Exec - " + error.Error(), "Не удалось удалить задачу" }
	}

	return back.Error{}
}
