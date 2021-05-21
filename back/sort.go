package back

import "fmt"

type Sort struct {
	Field string `json:"field"`
	Asc bool `json:"asc"`
}

func (sort *Sort) GetSortSQLString() string {
	query := fmt.Sprintf(" ORDER BY `%s`", sort.Field)
	if sort.Asc { query += " ASC" } else { query += " DESC" }

	return query
}
