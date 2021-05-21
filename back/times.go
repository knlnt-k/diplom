package back

type Times struct {
	Id int64 `json:"id" db:"id"`
	TaskID int `json:"task_id" db:"task_id" binding:"required"`
	UserID int `json:"user_id" db:"user_id" binding:"required"`
	Time int `json:"time" db:"time" binding:"required"`
	Created int `json:"created" db:"created"`
}

type TimesFilter struct {
	TaskIDs []int `json:"task_ids"`
	UserIDs []int `json:"user_ids"`
}