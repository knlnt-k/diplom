export interface Sort {
  field: string;
  asc: boolean;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface ErrorRequest {
  response: {
    data: {
      message: string;
    };
  };
}
