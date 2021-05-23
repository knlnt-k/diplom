import {
  RequestGetUsers,
  ResponseGetUsers,
  ResponseUpdateUser,
  User
} from "@/infrastructure/users/i-external";
import { query } from "@/infrastructure/config/query";
import { ErrorRequest } from "@/infrastructure/i-external";
import { ERROR_MSG } from "@/constants";

export default class UsersRest {
  static getUsers(data: RequestGetUsers) {
    return query({ point: "api/get-users", method: "POST", data })
      .then((response: ResponseGetUsers) => ({
        answer: response.data,
        error: undefined
      }))
      .catch((error: ErrorRequest) => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static updateUser(data: User) {
    return query({ point: "api/update-user", method: "PUT", data })
      .then((response: ResponseUpdateUser) => ({
        answer: response.data,
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
