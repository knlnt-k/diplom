import { IToken } from "@/infrastructure/i-internal";
import jwtDecode from "jwt-decode";

export const URL_API = "/v1/";
export const TOKEN_NAME = "token";
export const TOKEN_STRING = localStorage.getItem(TOKEN_NAME);
export const TOKEN: IToken | undefined = TOKEN_STRING
  ? (jwtDecode(TOKEN_STRING) as IToken)
  : undefined;
export const AUTH_HEADERS = {
  Authorization: "Bearer " + TOKEN_STRING
};
