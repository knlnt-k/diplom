import { SignInResponse } from "@/infrastructure/auth/i-external";

export const signInResponseToToken = (response: SignInResponse) =>
  response.token;
