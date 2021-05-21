import {
  RequestGetUsers,
  ResponseGetUsers
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
      .catch((error: ErrorRequest) => ({ answer: undefined, error: (error && error.response && error.response.data) || { message: ERROR_MSG } }));
  }
}
