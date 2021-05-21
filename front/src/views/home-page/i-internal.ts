export interface IFormData {
  isCompany: boolean;
  isSignUp: boolean;
  name: string;
  login: string;
  password: string;
  companyID: number;
}

export interface Company {
  id: number;
  name: string;
}
