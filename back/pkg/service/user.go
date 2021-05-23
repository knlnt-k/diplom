package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

const (
	LOG_USER_MSG = "service > user > "
)

type UserService struct {
	repo repository.User
}

func NewUserService(repo repository.User) *UserService {
	return &UserService{repo}
}

func (service *UserService) GetUsers(ids []int, filter back.UserFilter) ([]back.User, back.Error) {
	return service.repo.GetUsers(ids, filter)
}

func (service *UserService) UpdateUser(user back.User) (int, back.Error) {
	return service.repo.UpdateUser(user)
}