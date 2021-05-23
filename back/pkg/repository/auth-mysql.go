package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
)

const(
	LOG_MSG_AUTH = "repository > auth-mysql > "
)

type AuthMySQL struct {
	db *sqlx.DB
}

func NewAuthMySQL(db *sqlx.DB) *AuthMySQL {
	return &AuthMySQL{db: db}
}

func (repo *AuthMySQL) CreateCompany(company back.Company) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s` (`name`, `login`, `password`) VALUES ('%s', '%s', '%s')",
		COMPANIES_TABLE_NAME, company.Name, company.Login, company.Password,
		)
	result, error := repo.db.Exec(query)

	if error != nil {
		return 0, back.Error{LOG_MSG_AUTH + "CreateCompany > repo.db.Exec - " + error.Error(), "При регистрации компании произошла ошибка"}
	}

	id, error := result.LastInsertId()

	if error != nil {
		return 0, back.Error{LOG_MSG_AUTH + "CreateCompany > result.LastInsertId - " + error.Error(), "При регистрации компании произошла ошибка"}
	}

	return id, back.Error{}
}

func (repo *AuthMySQL) CreateUser(user back.RequiredUser) (int64, back.Error) {
	query := fmt.Sprintf(
		"INSERT INTO `%s`" +
			" (`name`, `last_name`, `login`, `password`, `company_id`, `profession`, `access`) " +
			"VALUES ('%s', '', '%s', '%s', %d, 0, 0)",
		USERS_TABLE_NAME, user.Name, user.Login, user.Password, user.CompanyID,
	)
	result, error := repo.db.Exec(query)

	if error != nil {
		return 0, back.Error{LOG_MSG_AUTH + "CreateUser > repo.db.Exec- " + error.Error(), "При регистрации пользователя произошла ошибка"}
	}

	id, error := result.LastInsertId()

	if error != nil {
		return 0, back.Error{LOG_MSG_AUTH + "CreateUser > result.LastInsertId - " + error.Error(), "При регистрации пользователя произошла ошибка"}
	}

	return id, back.Error{}
}

func (repo *AuthMySQL) GetCompany(login, password string) (back.Company, back.Error) {
	var company back.Company
	query := fmt.Sprintf(
		"SELECT * FROM `%s` WHERE `login`='%s' AND `password`='%s'",
		COMPANIES_TABLE_NAME, login, password,
		)
	error := repo.db.Get(&company, query)
	if error != nil {
		return company,	back.Error{LOG_MSG_AUTH + "GetCompany - " + error.Error(), "Компания с такими данными не найдена"}
	}

	return company, back.Error{}
}

func (repo *AuthMySQL) GetUser(login, password string, companyID int) (back.RequiredUser, back.Error) {
	var user back.RequiredUser
	query := fmt.Sprintf(
		"SELECT * FROM `%s` WHERE `login`='%s' AND `password`='%s' AND `company_id`=%d",
		USERS_TABLE_NAME, login, password, companyID,
	)
	error := repo.db.Get(&user, query)
	if error != nil {
		return user, back.Error{LOG_MSG_AUTH + "GetUser - " + error.Error(), "Пользователь с такими данными не найден"}
	}

	return user, back.Error{}
}
