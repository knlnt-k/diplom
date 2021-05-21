export interface ICurrentAccount {
  id: number;
  isCompany: boolean;
  name: string;
  access: number;
  isAuth: boolean;
  companyID: number;
}

export interface IIsCan {
  deleteProject: boolean;
  editProject: boolean;
  deleteTask: boolean;
  editTask: boolean;
}
