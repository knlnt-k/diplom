package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

type TimesService struct {
	repo repository.Times
}

func NewTimes(repo repository.Times) *TimesService {
	return &TimesService{repo}
}

func(service *TimesService) Set(data back.Times) (int64, back.Error) {
	return service.repo.Set(data)
}

func(service *TimesService) Update(data back.Times) (int64, back.Error) {
	return service.repo.Update(data)
}

func(service *TimesService) Get(filter back.TimesFilter, sort back.Sort) ([]back.Times, back.Error) {
	return service.repo.Get(filter, sort)
}