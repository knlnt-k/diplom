package back

type CommentsTasks struct {
	Id int64 `json:"id" db:"id"`
	TaskID int `json:"task_id" db:"task_id" binding:"required"`
	UserID int `json:"user_id" db:"user_id" binding:"required"`
	Comment string `json:"comment" db:"comment" binding:"required"`
	Created int `json:"created" db:"created"`
}

type CommentsTasksFilter struct {
	TaskIDs []int `json:"task_ids"`
	UserIDs []int `json:"user_ids"`
}