package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
)

const (
	LOG_MSG_USER = "repository > user-mysql > "
)

type UserMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewUserMySQL(db *sqlx.DB) *UserMySQL {
	return &UserMySQL{db, &back.Common{}}
}

func (repo *UserMySQL) GetUsers(ids []int, filter back.UserFilter) ([]back.User, back.Error) {
	var users []back.User
	isAnd := false

	isExistFilter := filter.Login != "" || len(filter.CompanyIDs) != 0

	query := fmt.Sprintf("SELECT * FROM `%s`", USERS_TABLE_NAME)

	if len(ids) != 0 || isExistFilter { query += " WHERE " }
	if len(ids) != 0 {
		query += repo.common.GetInSQLString(ids, "id")
		isAnd = true
	}

	if isExistFilter {
		if filter.Login != "" {
			if isAnd { query += " AND " }
			query += fmt.Sprintf("(`login`='%s')", filter.Login)
			isAnd = true
		}

		if(len(filter.CompanyIDs) != 0) {
			if isAnd { query += " AND " }
			query += repo.common.GetInSQLString(filter.CompanyIDs, "company_id")
		}
	}

	error := repo.db.Select(&users, query)

	if error != nil {
		return nil, back.Error{ LOG_MSG_USER + "GetUsers > repo.db.Select - " + error.Error(), "" }
	}

	return users, back.Error{}
}