package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

const (
	COMPANIES_TABLE_NAME = "companies"
	USERS_TABLE_NAME = "users"
	TASKS_TABLE_NAME = "tasks"
	PROJECTS_TABLE_NAME = "projects"
	TIMES_TABLE_NAME = "times"
	COMMENTS_TASKS_TABLE_NAME = "comments_tasks"
)

type Config struct {
	Host string
	Port string
	User string
	Password string
	DBName string
}

func NewMySQLDB(config Config) (*sqlx.DB, error) {
	db, error := sqlx.Open(
		"mysql",
		fmt.Sprintf(
			"%s:%s@tcp(%s:%s)/%s?parseTime=true",
			config.User, config.Password, config.Host, config.Port, config.DBName,
			),
		)
	if error != nil {
		return nil, error
	}

	error = db.Ping()
	if error != nil {
		return nil, error
	}

	return db, nil
}
