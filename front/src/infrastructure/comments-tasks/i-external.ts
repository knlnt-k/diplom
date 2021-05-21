import { Sort } from "@/infrastructure/i-external";

export interface CommentsTasks {
  id?: number;
  task_id: number;
  user_id: number;
  comment: string;
  created?: number;
}

export type RequestSetComment = CommentsTasks;
export interface ResponseSetComment {
  id: number;
}

export type RequestUpdateComment = CommentsTasks;
export type ResponseUpdateComment = ResponseSetComment;

export interface RequestGetComments {
  filter?: {
    task_ids?: number[];
    user_ids?: number[];
  };
  sort?: Sort;
}
export interface ResponseGetComments {
  comments: CommentsTasks[];
}

export interface RequestDeleteComments {
  ids: number[];
}
export type ResponseDeleteComments = RequestDeleteComments;
