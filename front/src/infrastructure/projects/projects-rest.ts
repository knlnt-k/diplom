import { query } from "@/infrastructure/config/query";
import {
  RequestCreateProject,
  RequestDeleteProjects,
  RequestGetProjects,
  RequestUpdateProject,
  ResponseCreateProject,
  ResponseDeleteProjects,
  ResponseGetProjects,
  ResponseUpdateProject
} from "@/infrastructure/projects/i-external";
import { ErrorRequest } from "@/infrastructure/i-external";
import { ERROR_MSG } from "@/constants";

export default class ProjectsRest {
  static getProjects(data: RequestGetProjects) {
    return query({ point: "api/get-projects", method: "POST", data })
      .then((response: ResponseGetProjects) => ({
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

  static createProject(data: RequestCreateProject) {
    return query({ point: "api/create-project", method: "POST", data })
      .then((response: ResponseCreateProject) => ({
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

  static deleteProjects(data: RequestDeleteProjects) {
    return query({ point: "api/delete-projects", method: "DELETE", data })
      .then((response: ResponseDeleteProjects) => ({
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

  static updateProject(data: RequestUpdateProject) {
    return query({ point: "api/update-project", method: "PUT", data })
      .then((response: ResponseUpdateProject) => ({
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
