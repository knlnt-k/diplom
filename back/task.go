package back

var STATUSES = map[string]int{
	"canDo": 0,
	"develop": 1,
	"reopen": 2,
	"cancel": 3,
	"correct": 4,
	"check": 5,
	"finish": 6,
}

type Task struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" db:"name" binding:"required"`
	Description string `json:"description" db:"description"`
	UserID int `json:"user_id" db:"user_id"`
	Priority int `json:"priority" db:"priority"`
	ProjectID int `json:"project_id" db:"project_id" binding:"required"`
	CompanyID int `json:"company_id" db:"company_id" binding:"required"`
	Status int `json:"status" db:"status"`
	Created int `json:"created" db:"created"`
	Closed int `json:"closed" db:"closed"`
}

type TaskFilter struct {
	Text string `json:"text"`
	UserIDs []int `json:"user_ids"`
	Priorities []int `json:"priorities"`
	ProjectIDs []int `json:"project_ids"`
	CompanyIDs []int `json:"company_ids"`
	Statuses []int `json:"statuses"`
}