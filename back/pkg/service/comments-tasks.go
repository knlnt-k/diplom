package service

import (
	"diplom/back"
	"diplom/back/pkg/repository"
)

type CommentsTasksService struct {
	repo repository.CommentsTasks
}

func NewCommentsTasksService(repo repository.CommentsTasks) *CommentsTasksService {
	return &CommentsTasksService{repo}
}

func(service *CommentsTasksService) Set(data back.CommentsTasks) (int64, back.Error) {
	return service.repo.Set(data)
}

func(service *CommentsTasksService) Update(data back.CommentsTasks) (int64, back.Error) {
	return service.repo.Update(data)
}

func(service *CommentsTasksService) Get(filter back.CommentsTasksFilter, sort back.Sort) ([]back.CommentsTasks, back.Error) {
	return service.repo.Get(filter, sort)
}

func(service *CommentsTasksService) Delete(ids []int) back.Error {
	return service.repo.Delete(ids)
}