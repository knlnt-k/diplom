package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

type CompanyService struct {
	repo repository.Company
}

func NewCompanyService(repo repository.Company) *CompanyService {
	return &CompanyService{repo: repo}
}

func (service CompanyService) GetCompanies(ids []int, filter back.CompanyFilter) ([]back.Company, back.Error) {
	return service.repo.GetCompanies(ids, filter)
}
