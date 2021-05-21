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

func(repo *CommentsTasksService) Set(data back.CommentsTasks) (int64, back.Error) {
	return repo.Set(data)
}

func(repo *CommentsTasksService) Update(data back.CommentsTasks) (int64, back.Error) {
	return repo.Update(data)
}

func(repo *CommentsTasksService) Get(filter back.CommentsTasksFilter, sort back.Sort) ([]back.CommentsTasks, back.Error) {
	return repo.Get(filter, sort)
}

func(repo *CommentsTasksService) Delete(ids []int) back.Error {
	return repo.Delete(ids)
}