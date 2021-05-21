package repository

import (
	"diplom/back"
	"fmt"
	"github.com/jmoiron/sqlx"
)

const(
	LOG_MSG_COMPANY = "repository > company-mysql > "
)

type CompanyMySQL struct {
	db *sqlx.DB
	common *back.Common
}

func NewCompanyMySQL(db *sqlx.DB) *CompanyMySQL {
	return &CompanyMySQL{db: db, common: &back.Common{}}
}

func (repo *CompanyMySQL) GetCompanies(ids []int, filter back.CompanyFilter) ([]back.Company, back.Error) {
	var companies []back.Company
	isExistFilter := filter.Name != "" || filter.Login != ""
	var isAnd = false
	var isOr = false

	query := fmt.Sprintf("SELECT * FROM `%s`", COMPANIES_TABLE_NAME)

	if len(ids) != 0 || isExistFilter { query += " WHERE " }
	if len(ids) != 0 { query += repo.common.GetInSQLString(ids, "id"); isAnd = true }

	if isExistFilter {
		if filter.Name != "" {
			if isAnd { query += " AND " }
			query += fmt.Sprintf("`name`='%s'", filter.Name)
			isAnd = false
			isOr = true
		}

		if filter.Login != "" {
			if isAnd { query += " AND " }
			if isOr { query += " OR " }
			query += fmt.Sprintf("`login`='%s'", filter.Login)
		}
	}

	error := repo.db.Select(&companies, query)

	if error != nil {
		return nil, back.Error{LOG_MSG_COMPANY + "GetCompanies - " + error.Error(), "Не удалось получить список компаний"}
	}

	return companies, back.Error{}
}