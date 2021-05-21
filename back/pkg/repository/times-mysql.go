package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"
)

const (
	LOG_MSG_TIMES = "repository > times > "
)

type TimesMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewTimesMySQL(db *sqlx.DB) *TimesMySQL {
	return &TimesMySQL{db, &back.Common{}}
}

func (repo *TimesMySQL) Set(data back.Times) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s` (`task_id`, `user_id`, `time`, `created`) VALUES (%d, %d, %d, %d)",
		TIMES_TABLE_NAME,
		data.TaskID, data.UserID, data.Time, time.Now().Unix(),
	)

	result, error := repo.db.Exec(query)
	if error != nil {
		return 0, back.Error{LOG_MSG_TIMES + "Set > repo.db.Exec" + error.Error(), ""}
	}

	id, error := result.LastInsertId()
	if error != nil {
		return 0, back.Error{LOG_MSG_TIMES + "Set > result.LastInsertId()" + error.Error(), ""}
	}

	return id, back.Error{}
}

func (repo *TimesMySQL) Update(data back.Times) (int64, back.Error) {
	query := fmt.Sprintf("UPDATE `%s` SET `time` = %d WHERE `id` = %d", TIMES_TABLE_NAME, data.Time, data.Id)
	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return 0, back.Error{LOG_MSG_TIMES + "Update > repo.db.Exec - " + error.Error(), ""}
	}

	return data.Id, back.Error{}
}

func (repo *TimesMySQL) Get(filter back.TimesFilter, sort back.Sort) ([]back.Times, back.Error) {
	var results []back.Times
	isExistFilter := len(filter.UserIDs) != 0 || len(filter.TaskIDs) != 0
	isAnd := false
	query := fmt.Sprintf("SELECT * FROM `%s`", TIMES_TABLE_NAME)

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
		return nil, back.Error{ LOG_MSG_TIMES + "Get > repo.db.Select - " + error.Error(), "" }
	}

	return results, back.Error{}
}