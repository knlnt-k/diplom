package back

type Company struct {
	Id int64 `json:"id" db:"id"`
	Name string `json:"name" binding:"required" db:"name"`
	Login string `json:"login" binding:"required" db:"login"`
	Password string `json:"password" binding:"required" db:"password"`
}

type CompanyFilter struct {
	Name string `json:"name"`
	Login string `json:"login"`
}
