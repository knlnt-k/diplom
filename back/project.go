package back

type Project struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" db:"name" binding:"required"`
	Description string `json:"description" db:"description"`
	CompanyID int `json:"company_id" db:"company_id" binding:"required"`
	Created int `json:"created" db:"created"`
}

type ProjectFilter struct {
	Text string `json:"text"`
	CompanyIDs []int `json:"company_ids"`
}