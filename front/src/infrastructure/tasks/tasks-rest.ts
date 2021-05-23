import {
  RequestChangeStatusTask,
  RequestCreateTask,
  RequestDeleteTask,
  RequestGetTasks,
  RequestUpdateTask,
  ResponseChangeStatusTask,
  ResponseCreateTask,
  ResponseDeleteTask,
  ResponseGetTasks,
  ResponseUpdateTask
} from "@/infrastructure/tasks/i-external";
import { query } from "@/infrastructure/config/query";
import { ErrorRequest } from "@/infrastructure/i-external";
import { ERROR_MSG } from "@/constants";

export default class TasksRest {
  static createTask(data: RequestCreateTask) {
    return query({ point: "api/create-task", method: "POST", data })
      .then((response: ResponseCreateTask) => ({
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

  static getTasks(data: RequestGetTasks) {
    return query({ point: "api/get-tasks", method: "POST", data })
      .then((response: ResponseGetTasks) => ({
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

  static updateTask(data: RequestUpdateTask) {
    return query({ point: "api/update-task", method: "PUT", data })
      .then((response: ResponseUpdateTask) => ({
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

  static deleteTasks(data: RequestDeleteTask) {
    return query({ point: "api/delete-tasks", method: "DELETE", data })
      .then((response: ResponseDeleteTask) => ({
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

  static changeStatus(data: RequestChangeStatusTask) {
    return query({ point: "api/change-status-task", method: "POST", data })
      .then((response: ResponseChangeStatusTask) => ({
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
