import { query } from "@/infrastructure/config/query";
import {
  RequestDeleteComments,
  RequestGetComments,
  RequestSetComment,
  RequestUpdateComment,
  ResponseDeleteComments,
  ResponseGetComments,
  ResponseSetComment,
  ResponseUpdateComment
} from "@/infrastructure/comments-tasks/i-external";
import { ErrorRequest } from "@/infrastructure/i-external";
import { ERROR_MSG } from "@/constants";

export default class CommentsTasksRest {
  static get(data: RequestGetComments) {
    return query({ point: "api/get-comments", method: "POST", data })
      .then((response: ResponseGetComments) => ({
        answer: response.data || undefined,
        error: undefined
      }))
      .catch((error: ErrorRequest) => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static set(data: RequestSetComment) {
    return query({ point: "api/set-comment", method: "POST", data })
      .then((response: ResponseSetComment) => ({
        answer: response.data || undefined,
        error: undefined
      }))
      .catch((error: ErrorRequest) => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static update(data: RequestUpdateComment) {
    return query({ point: "api/update-comment", method: "PUT", data })
      .then((response: ResponseUpdateComment) => ({
        answer: response.data || undefined,
        error: undefined
      }))
      .catch((error: ErrorRequest) => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static delete(data: RequestDeleteComments) {
    return query({ point: "api/delete-comments", method: "DELETE", data })
      .then((response: ResponseDeleteComments) => ({
        answer: response.data || undefined,
        error: undefined
      }))
      .catch((error: ErrorRequest) => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }
}
