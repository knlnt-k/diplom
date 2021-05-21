import { query } from "@/infrastructure/config/query";
import { GetCompaniesRequest } from "@/infrastructure/companies/i-external";
import { ERROR_MSG } from "@/constants";

export default class AuthRest {
  static getCompanies(request: GetCompaniesRequest) {
    return query({
      point: "auth/get-companies",
      data: request,
      method: "POST",
      isAuth: false
    })
      .then(response => ({ answer: response.data, error: undefined }))
      .catch(error => ({ answer: [], error: (error && error.response && error.response.data) || { message: ERROR_MSG } }));
  }
}
