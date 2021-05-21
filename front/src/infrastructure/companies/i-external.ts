export interface GetCompaniesResponse {
  companies: {
    id: number;
    name: string;
    login: string;
  }[];
}

export interface GetCompaniesRequest {
  ids: number[];
  filter?: {
    name?: string;
    login?: string;
  };
}
