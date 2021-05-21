export interface AuthRequest {
  login: string;
  password: string;
}

export interface SignUpCompanyRequest extends AuthRequest {
  name: string;
}

export interface SignUpUserRequest extends AuthRequest {
  name: string;
  company_id: number;
}

export interface SignInUserRequest extends AuthRequest {
  company_id: number;
}

export interface SignInResponse {
  token: string;
}
