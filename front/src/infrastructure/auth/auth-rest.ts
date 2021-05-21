import { query } from "@/infrastructure/config/query";
import {
  AuthRequest,
  SignInUserRequest,
  SignUpCompanyRequest,
  SignUpUserRequest
} from "@/infrastructure/auth/i-external";
import { ERROR_MSG } from "@/constants";

export default class AuthRest {
  static signUpCompany(data: SignUpCompanyRequest) {
    return query({
      point: "auth/sign-up-company",
      data,
      method: "POST",
      isAuth: false
    })
      .then(response => ({ answer: response.data, error: undefined }))
      .catch(error => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static signInCompany(data: AuthRequest) {
    return query({
      point: "auth/sign-in-company",
      data,
      method: "POST",
      isAuth: false
    })
      .then(response => ({ answer: response.data, error: undefined }))
      .catch(error => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static signUpUser(data: SignUpUserRequest) {
    return query({
      point: "auth/sign-up-user",
      data,
      method: "POST",
      isAuth: false
    })
      .then(response => ({ answer: response.data, error: undefined }))
      .catch(error => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }

  static signInUser(data: SignInUserRequest) {
    return query({
      point: "auth/sign-in-user",
      data,
      method: "POST",
      isAuth: false
    })
      .then(response => ({ answer: response.data, error: undefined }))
      .catch(error => ({
        answer: undefined,
        error: (error && error.response && error.response.data) || {
          message: ERROR_MSG
        }
      }));
  }
}
