package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"
)

const (
	LOG_MSG_PROJECT = "repository > project-mysql > "
)

type ProjectMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewProjectMySQL (db *sqlx.DB) *ProjectMySQL {
	return &ProjectMySQL{db: db, common: &back.Common{}}
}

func (repo *ProjectMySQL) CreateProject(project back.Project) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s` (`name`, `description`, `company_id`, `created`) VALUES ('%s', '%s', %d, %d)",
		PROJECTS_TABLE_NAME, project.Name, project.Description, project.CompanyID, time.Now().Unix(),
	)
	result, error := repo.db.Exec(query)

	if error != nil {
		return 0, back.Error{
			LOG_MSG_PROJECT + "CreateProject > repo.db.Exec - " + error.Error(),
			"При создании проекта произошла ошибка",
		}
	}

	id, error := result.LastInsertId()

	if error != nil {
		return 0, back.Error{
			LOG_MSG_PROJECT + "CreateProject > result.LastInsertId - " + error.Error(),
			"При создании проекта произошла ошибка",
		}
	}

	return id, back.Error{}
}

func (repo *ProjectMySQL) UpdateProject(project back.Project) (int64, back.Error) {
	query := fmt.Sprintf(
		"UPDATE `%s` SET `name` = '%s', `description` = '%s' WHERE `id` = %d",
		PROJECTS_TABLE_NAME, project.Name, project.Description, project.Id,
	)
	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return 0, back.Error{
			LOG_MSG_PROJECT + "UpdateProject > repo.db.Exec - " + error.Error(),
			"При редактировании проекта произошла ошибка",
		}
	}

	return project.Id, back.Error{}
}

func (repo *ProjectMySQL) GetProjects(ids []int, filter back.ProjectFilter, sort back.Sort, pagination back.Pagination) ([]back.Project, back.Error) {
	var projects []back.Project
	isExistFilter := filter.Text != "" || len(filter.CompanyIDs) != 0
	var isAnd = false

	query := fmt.Sprintf("SELECT * FROM `%s`", PROJECTS_TABLE_NAME)

	if len(ids) != 0 || isExistFilter { query += " WHERE " }
	if len(ids) != 0 { query += repo.common.GetInSQLString(ids, "id"); isAnd = true }

	if isExistFilter {
		if filter.Text != "" {
			if isAnd { query += " AND " }
			query += fmt.Sprintf("(`name` LIKE '%%%s%%' OR `description` LIKE '%%%s%%')", filter.Text, filter.Text)
			isAnd = true
		}

		if len(filter.CompanyIDs) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.CompanyIDs, "company_id")
		}
	}

	if sort.Field != "" { query += sort.GetSortSQLString() }
	if pagination.Limit != 0 { query += " " + pagination.GetSQLRequest() }

	error := repo.db.Select(&projects, query)

	if error != nil {
		return nil, back.Error{ LOG_MSG_PROJECT + "GetProjects > repo.db.Exec - " + error.Error(), "" }
	}

	return projects, back.Error{}
}

func (repo *ProjectMySQL) DeleteProjects(ids []int) back.Error {
	projects, error := repo.GetProjects(ids, back.ProjectFilter{}, back.Sort{}, back.Pagination{})
	if error.Log != "" || len(projects) == 0 {
		return back.Error{ LOG_MSG_PROJECT + "DeleteProject > repo.GetTasks", "Проект не найден" }
	}

	query := fmt.Sprintf("DELETE FROM `%s` WHERE %s", PROJECTS_TABLE_NAME, repo.common.GetInSQLString(ids, "id"))
	result, err := repo.db.Exec(query)

	if err != nil || result == nil {
		return back.Error{ LOG_MSG_PROJECT + "DeleteProject > repo.db.Exec - " + err.Error(), "Не удалось удалить проект" }
	}

	return back.Error{}
}
