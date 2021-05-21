import { query } from "@/infrastructure/config/query";
import { ErrorRequest } from "@/infrastructure/i-external";
import { ERROR_MSG } from "@/constants";
import {
  RequestGetTimes,
  RequestSetTime,
  RequestUpdateTime,
  ResponseGetTimes,
  ResponseSetTime,
  ResponseUpdateTime
} from "@/infrastructure/times/i-external";

export default class TimesRest {
  static setTime(data: RequestSetTime) {
    return query({ point: "api/set-time", method: "POST", data })
      .then((response: ResponseSetTime) => ({
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

  static getTimes(data: RequestGetTimes) {
    return query({ point: "api/get-times", method: "POST", data })
      .then((response: ResponseGetTimes) => ({
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

  static updateTime(data: RequestUpdateTime) {
    return query({ point: "api/update-time", method: "PUT", data })
      .then((response: ResponseUpdateTime) => ({
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
