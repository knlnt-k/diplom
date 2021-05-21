import axios from "axios";
import { AUTH_HEADERS, URL_API } from "@/infrastructure/config/config";

interface Options {
  point: string;
  method?:
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "purge"
    | "PURGE"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK";
  data: Record<string, any>;
  isAuth?: boolean;
}

export const query = ({
  point,
  method = "GET",
  data,
  isAuth = true
}: Options) => {
  const url = URL_API + point;
  const config: {
    method: Options["method"];
    data: Record<string, any>;
    headers: Record<string, any>;
  } = {
    method,
    data,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (isAuth) {
    config.headers.Authorization = AUTH_HEADERS.Authorization;
  }

  return axios(url, config);
};
