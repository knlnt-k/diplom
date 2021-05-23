export interface User {
  id?: number;
  name: string;
  last_name?: string;
  login: string;
  company_id: number;
  profession?: number;
  access?: number;
}

export interface RequestGetUsers {
  ids: number[];
  filter: {
    login?: string;
    companyIDs: number[];
  };
}

export interface ResponseGetUsers {
  data: {
    users: User[];
  };
}

export interface ResponseUpdateUser {
  data: {
    id: number;
  };
}
