package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"
)

const (
	LOG_MSG_COMMENTS = "repository > comments-tasks-mysql > "
)

type CommentsTasksMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewCommentsTasksMySQL(db *sqlx.DB) *CommentsTasksMySQL {
	return &CommentsTasksMySQL{db, &back.Common{}}
}

func (repo *CommentsTasksMySQL) Set(data back.CommentsTasks) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s` (`task_id`, `user_id`, `comment`, `created`) VALUES (%d, %d, '%s', %d)",
		COMMENTS_TASKS_TABLE_NAME,
		data.TaskID, data.UserID, data.Comment, time.Now().Unix(),
	)

	result, error := repo.db.Exec(query)
	if error != nil {
		return 0, back.Error{LOG_MSG_COMMENTS + "Set > repo.db.Exec" + error.Error(), ""}
	}

	id, error := result.LastInsertId()
	if error != nil {
		return 0, back.Error{LOG_MSG_COMMENTS + "Set > result.LastInsertId()" + error.Error(), ""}
	}

	return id, back.Error{}
}

func (repo *CommentsTasksMySQL) Update(data back.CommentsTasks) (int64, back.Error) {
	query := fmt.Sprintf("UPDATE `%s` SET `comment` = '%s' WHERE `id` = %d", COMMENTS_TASKS_TABLE_NAME, data.Comment, data.Id)
	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return 0, back.Error{LOG_MSG_COMMENTS + "Update > repo.db.Exec - " + error.Error(), ""}
	}

	return data.Id, back.Error{}
}

func (repo *CommentsTasksMySQL) Get(filter back.CommentsTasksFilter, sort back.Sort) ([]back.CommentsTasks, back.Error) {
	var results []back.CommentsTasks
	isExistFilter := len(filter.UserIDs) != 0 || len(filter.TaskIDs) != 0
	isAnd := false
	query := fmt.Sprintf("SELECT * FROM `%s`", COMMENTS_TASKS_TABLE_NAME)

	if isExistFilter {
		query += " WHERE "

		if len(filter.UserIDs) != 0 {
			query += repo.common.GetInSQLString(filter.UserIDs, "user_id")
			isAnd = true
		}

		if len(filter.TaskIDs) != 0 {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.TaskIDs, "task_id")
		}
	}

	if sort.Field != "" { query += sort.GetSortSQLString() }

	error := repo.db.Select(&results, query)

	if error != nil {
		return nil, back.Error{ LOG_MSG_COMMENTS + "Get > repo.db.Select - " + error.Error(), "" }
	}

	return results, back.Error{}
}

func (repo *CommentsTasksMySQL) Delete(ids []int) back.Error {
	query := fmt.Sprintf("DELETE FROM `%s` WHERE %s", COMMENTS_TASKS_TABLE_NAME, repo.common.GetInSQLString(ids, "id"))
	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return back.Error{ LOG_MSG_COMMENTS + "Delete > repo.db.Exec - " + error.Error(), "Не удалось удалить комментарий" }
	}

	return back.Error{}
}