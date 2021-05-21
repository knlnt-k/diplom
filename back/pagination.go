package back

import "fmt"

type Pagination struct {
	Limit int `json:"limit"`
	Offset int `json:"offset"`
}

func (paginate *Pagination) GetSQLRequest() string {
	return fmt.Sprintf("LIMIT %d OFFSET %d", paginate.Limit, paginate.Offset)
}