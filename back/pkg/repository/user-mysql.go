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

	query := fmt.Sprintf("SELECT `id`, `name`, `last_name`, `login`, `company_id`, `profession`, `access` FROM `%s`", USERS_TABLE_NAME)

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

func (repo *UserMySQL) UpdateUser(user back.User) (int, back.Error) {
	query := fmt.Sprintf(
		"UPDATE `%s` SET `name`='%s', `last_name`='%s', `profession`=%d, `access`=%d WHERE `id`=%d",
		USERS_TABLE_NAME,
		user.Name, user.LastName, user.Profession, user.Access, user.Id,
	)

	result, error := repo.db.Exec(query)

	if error != nil || result == nil {
		return 0, back.Error{
			LOG_MSG_USER + "UpdateUser > repo.db.Exec - " + error.Error(),
			"При редактировании профиля произошла ошибка",
		}
	}

	return int(user.Id), back.Error{}
}