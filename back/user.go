package back

const ID_ADMIN_USER = -1

type User struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" binding:"required" db:"name"`
	LastName string `json:"last_name" db:"last_name"`
	Login string `json:"login" binding:"required" db:"login"`
	Password string `json:"password" binding:"required" db:"password"`
	CompanyID int `json:"company_id" binding:"required" db:"company_id"`
	Price int `json:"price" db:"price"`
	Profession int `json:"profession" db:"profession"`
	Access int `json:"access" db:"access"`
	DateChangePrice int `json:"date_change_price" db:"date_change_price"`
}

var ACCESSES = map[string]int{
	"admin": 1,
	"task_editor": 2,
}

type UserFilter struct {
	Login string `json:"login"`
	CompanyIDs []int `json:"company_ids"`
}
